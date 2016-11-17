module.exports = function(data) {

    return new Promise((resolve, reject) => {

        const math = require('mathjs');
        const costFunction = require('./costFunction');

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

        // Scale features to optimize algorithm (Step 1 & 2)

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

        // Step 2 is iterating through matrix X and replace each value with scaled value (except first column)
        let xScaled = x.map((value, index) => {
            if (index[1] == 0) return 1;
            else return (value - featuresAverage[index[1]]) / featuresRange[index[1]];
        });

        // Run gradient descent
        while (iterations >= 0) {
            
            // Call cost function and store in array
            costFunctionResults.push(costFunction({xScaled, y, thetas}));

            let hypothesis = math.multiply(xScaled, thetas);
            let errors = math.subtract(hypothesis, y);
            let tick = math.multiply(math.multiply(alpha * 1 / trainingExamples, math.transpose(errors)), xScaled);
            
            // Update thetas
            thetas = math.subtract(thetas, math.transpose(tick));

            // Decrement iterations counter
            iterations --;
        }
        
        // Double check results of gradient descent using normal equation method
        checkThetas = math.multiply(math.multiply(math.inv(math.multiply(math.transpose(xScaled), xScaled)), math.transpose(xScaled)), y);

        // Return results
        if (thetas && checkThetas) {
            resolve({
                thetas,
                checkThetas,
                costFunctionResult: math.format(costFunctionResults[costFunctionResults.length - 1], {notation: 'exponential'})      
            });
        } else {
            reject(Error('Gradient descent algorithm not converging'));
        }

    });

}