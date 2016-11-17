module.exports = function(data) {

    const math = require('mathjs');

    // Cost function takes in matrix data and returns cost
    const {xScaled:x, y, thetas} = data;
    const trainingExamples = x.size()[0];
    const hypothesis = math.multiply(x, thetas);
    const squareErrorsVector = math.square(math.subtract(hypothesis, y));
    let cost = 0;
    squareErrorsVector.forEach((value) => cost += value);
    return 1 / (2 * trainingExamples) * cost;

}