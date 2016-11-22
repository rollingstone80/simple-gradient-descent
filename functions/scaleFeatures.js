// Function used to scale and normalize features matrix X
module.exports = function(x) {

    const v = require('vectorious');
    const Matrix = v.Matrix;

    // Transpose matrix and set to array for easier calculations
    let data = x.transpose();
    data = data.toArray();

    // Build arrays of average and range values
    const average = [],
          range = [];
    
    // Iterate through trasposed array of features x
    data.forEach(function(elem) {
        
        // Calculate average of each row and store it into average array
        let sum = elem.reduce(function(a, b) {
            return a + b;
        });
        average.push(sum / elem.length);

        // Calculate range of each row and store it into range array
        range.push(Math.max(...elem) - Math.min(...elem));

    });

    // Iterate through matrix X, scale and normalize each feature
    x = x.toArray();

    x.forEach(function(elem, key) {
        elem.forEach(function(innerElem, innerKey, elem) {
            elem[innerKey] = (innerElem - average[innerKey]) / range[innerKey];
        });
    });
    
    // Transform back to matrix
    x = new Matrix(x);

    // Return matrix
    return x;

}