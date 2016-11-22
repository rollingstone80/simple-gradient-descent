// Function used to load and format data from training set (a CSV file)
module.exports = function(filePath, callback) {

    const fs = require('fs');
    const v = require('vectorious');
    const Matrix = v.Matrix;
    const scaleFeatures = require('./scaleFeatures');

    // Read data from training set
    fs.readFile(filePath, 'ascii', function(err, data) { 
        if(err) {
            throw new Error(err);
        }

        // Convert data from string to nested array of numbers
        data = data.split("\n"); 
        data = data.map((value) => value.split(",").map(Number));
        
        // Build matrix from data and extract number of rows and columns
        const matrix = new Matrix(data);
        const rows = matrix.shape[0];
        const cols = matrix.shape[1];

        // Create two subsets of matrix: one subset for features matrix "X", one subset for vector of values "y"
        const matrixArray = matrix.toArray();
        let x = [],
            y = [];

        matrixArray.forEach(function(elem, key) {
            x[key] = [];
            y[key] = [];
            elem.forEach(function(innerElem, innerKey) {
                if(innerKey != cols - 1) x[key][innerKey] = innerElem;
                else y[key][0] = innerElem;
            });
        });
        
        // Convert arrays to matrices
        x = new Matrix(x);
        y = new Matrix(y);

        // Scale and normalize features matrix X
        x = scaleFeatures(x);
        
        // Add to X first column of ones (representative of the feature x0)
        x = Matrix.augment(Matrix.ones(rows, 1), x);

        // Return data object
        return callback(err, {x, y});

    });

}