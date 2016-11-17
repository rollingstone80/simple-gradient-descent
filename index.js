const fs = require('fs');
const path = require('path');
const math = require('mathjs');
require('console.table');

// Define location of training set (a CSV file)
const filePath = path.join(__dirname, '/data/training-set.txt');

// Define cost function
function costFunction(data) {
    const {xScaled:x, y, thetas} = data;
    const trainingExamples = x.size()[0];
    const hypothesis = math.multiply(x, thetas);
    const squareErrorsVector = math.square(math.subtract(hypothesis, y));
    let cost = 0;
    squareErrorsVector.forEach((value) => cost += value);
    return 1 / (2 * trainingExamples) * cost;
}

// Define gradient descent function
function gradientDescent(data) {

    // Define variables for gradient descent from the data object
    const {x, y, alpha} = data; 
    let {thetas, iterations} = data;
    thetas = math.transpose(thetas);
    
    // Define other useful variables (number of training examples and number of features)
    const trainingExamples = x.size()[0];
    const features = x.size()[1];
    const trainingArrayKeys = Array.from(Array(trainingExamples).keys());
    
    // Define empty array that will be used to store results of cost function
    const costFunctionResults = [];

    // Scale features to optimize algorithm

    // Step 1 is calculating range and average for each set of features
    const featuresRange = [];
    const featuresAverage = [];
    
    for(let i = 0; i < features; i++) {
        
        // Build subset of matrix of features, one column at a time
        let subset = x.subset(math.index(trainingArrayKeys, i));
        
        // Extract range and average and store it
        featuresRange.push(math.max(subset) - math.min(subset));
        featuresAverage.push(math.mean(subset));
    }

    // Step 2 is iterating through matrix x and replace each value with scaled value (except first column)
    let xScaled = x.map((value, index) => {
        if (index[1] == 0) return 1;
        else return (value - featuresAverage[index[1]]) / featuresRange[index[1]];
    });

    while (iterations >= 0) {
        
        // Call cost function
        costFunctionResults.push(costFunction({xScaled, y, thetas}));

        let hypothesis = math.multiply(xScaled, thetas);
        let errors = math.subtract(hypothesis, y);
        let newDecrement = math.multiply(math.multiply(alpha * 1 / trainingExamples, math.transpose(errors)), xScaled);
        thetas = math.subtract(thetas, math.transpose(newDecrement));

        // Decrement iterations counter
        iterations --;
    }
    
    // Print cost function results (useful in debugging to see algorithm is converging)
    console.log(math.format(costFunctionResults[costFunctionResults.length - 1], {notation: 'exponential'}));

    console.log("\nCalculating parameters vector using the grandient descent algorithm:");
    console.log(thetas._data);

    console.log("\nCalculating parameters vector using the normal equation method:");
    thetas = math.multiply(math.multiply(math.inv(math.multiply(math.transpose(xScaled), xScaled)), math.transpose(xScaled)), y);
    console.log(thetas._data);

}

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
    matrix.rows = matrix.size()[0]; // number of training sets
    matrix.columns = matrix.size()[1]; // number of features "X" + result "y"
    matrix.rowRange = Array.from(Array(matrix.rows).keys());
    matrix.colRange = Array.from(Array(matrix.columns - 1).keys());
    
    // Build matrix of features "X" (x1, x2, ..., xn) and vector of values "y"
    let x = matrix.subset(math.index(matrix.rowRange, matrix.colRange)),
        y = matrix.subset(math.index(matrix.rowRange, matrix.colRange.length));

    // Add to X first column of ones (representative of the feature x0)
    let ones = math.ones(x.size()[0], 1);
    x = math.concat(ones, x);
    
    // Initialize parameters
    let thetas = math.zeros(1, x.size()[1]);

    // Define learning rate alpha and number of iterations
    const alpha = 0.3,
          iterations = 20000;

    // Define data object to call gradient descent function
    data = {x, y, thetas, alpha, iterations};

    // Call gradient descent function
    gradientDescent(data);
        
});

