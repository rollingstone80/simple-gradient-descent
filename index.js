const path = require('path');
const v = require('vectorious');
const Matrix = v.Matrix;
const loadData = require('./functions/loadData');
const gradientDescent = require('./functions/gradientDescent');

// Define location of training set (a simple CSV file) and initialize timer
const filePath = path.join(__dirname, '/data/training-set.txt');
const start = new Date().getTime();

// Load training set
loadData(filePath, function(err, data) {

    if(err) {
        throw new Error(err);
    }
    
    // Once training set data is ready, define learning rate alpha and number of iterations 
    data.alpha = 0.3;
    data.iterations = 10000;

    // Initialize parameters to a zero vector
    data.thetas = Matrix.zeros(1, data.x.shape[1]);

    // Run gradient descent function
    console.log("Calculating parameters vector...");
    gradientDescent(data)
        .then(data => {

            // Print results
            console.log("\nParameters vector calculated using the gradient descent algorithm:");
            console.log(data.thetas.toArray());    

            console.log("\nParameters vector calculated using the normal equation method:");
            console.log(data.checkThetas.toArray());    

            console.log("\nValue of minimized cost function: " + data.costFunctionResult);
            
            const elapsed = new Date().getTime() - start;
            console.log("\nTime elapsed (s): " + elapsed / 1000 + "\n");          

        })
        .catch(err => {
            console.error(err);
        });

});