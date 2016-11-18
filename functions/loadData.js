// Function used to load and format data from training set file
module.exports = function(filePath, callback) {

    const fs = require('fs');
    const math = require('mathjs');

    // Read data from training set
    fs.readFile(filePath, 'ascii', function(err, data) { 

        if(err) {
            throw new Error(err);
        }
        
        // Convert data from string to nested array of numbers
        data = data.split("\n");
        let arr = [];
        for(var value of data) {
            arr.push(value.split(',').map(Number));
        }
        
        // Import data into matrix object 
        let matrix = math.matrix(arr);
        
        // Define some useful properties for later use
        matrix.rows = matrix.size()[0]; // i.e. number of training sets
        matrix.columns = matrix.size()[1]; // i.e. number of features "X" + result "y"
        matrix.rowRange = Array.from(Array(matrix.rows).keys());
        matrix.colRange = Array.from(Array(matrix.columns - 1).keys());
        
        // Build matrix of features "X" (x1, x2, ..., xn) and vector of values "y"
        let x = matrix.subset(math.index(matrix.rowRange, matrix.colRange)),
            y = matrix.subset(math.index(matrix.rowRange, matrix.colRange.length));

        // Add to X first column of ones (representative of the feature x0)
        let ones = math.ones(x.size()[0], 1);
        x = math.concat(ones, x);
        
        // Return data object
        return callback(err, {x, y});

    });

}