// Function used to calculate vector of parameters thetas
module.exports = function(data) {

    return new Promise((resolve, reject) => {

        const v = require('vectorious');
        const Matrix = v.Matrix;
        const costFunction = require('./costFunction');

        // Define variables for gradient descent from the data object
        const {x, y, alpha} = data; 
        let {thetas, iterations} = data;
        thetas = thetas.transpose();
        const trainingExamples = x.shape[0];
        
        // Define empty array that will be used to store results of cost function
        const costFunctionResults = [];

        // Run gradient descent algorithm
        while (iterations >= 0) {
            
            // Call cost function and store in array
            costFunctionResults.push(costFunction({x, y, thetas}));

            let hypothesis = Matrix.multiply(x, thetas);
            let errors = Matrix.subtract(hypothesis, y);
            let tick = Matrix.multiply(Matrix.scale(errors.transpose(), alpha * 1 / trainingExamples), x);

            // Update thetas
            thetas = Matrix.subtract(thetas, tick.transpose());

            // Decrement iterations counter
            iterations --;
        }
        
        // Double check results of gradient descent using normal equation method
        checkThetas = Matrix.multiply(Matrix.multiply(Matrix.multiply(x.transpose(), x).inverse(), x.transpose()), y);

        // Return results
        if (thetas && checkThetas) {
            resolve({
                thetas,
                checkThetas,
                costFunctionResult: Math.round(costFunctionResults[costFunctionResults.length - 1])
            });
        } else {
            reject(Error('Gradient descent algorithm not converging'));
        }

    });

}