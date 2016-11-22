// Function used to calculate cost function result from X, y and thetas
module.exports = function(data) {

    const v = require('vectorious');
    const Matrix = v.Matrix;

    // Define matrices and number of training examples
    const {x, y, thetas} = data;
    const trainingExamples = x.shape[0];

    // Calculate hypothesis 
    const hypothesis = Matrix.multiply(x, thetas);

    // Calculate vector of square errors
    let errorsVector = Matrix.subtract(hypothesis, y);
    errorsVector = errorsVector.map(value => value * value); 
        
    // Calculate cost function result
    let cost = errorsVector.reduce(function(a, b) {
        return a + b;
    });
    return 1 / (2 * trainingExamples) * cost;

}