// Function used to calculate cost function result from X, y and thetas
module.exports = function(data) {

    const math = require('mathjs');

    // Define matrices and number of training examples
    const {xScaled:x, y, thetas} = data;
    const trainingExamples = x.size()[0];

    // Calculate hypothesis 
    const hypothesis = math.multiply(x, thetas);

    // Calculate vector of square errors
    const squareErrorsVector = math.square(math.subtract(hypothesis, y));
    
    // Calculate cost function result
    let cost = 0;
    squareErrorsVector.forEach((value) => cost += value);
    return 1 / (2 * trainingExamples) * cost;

}