const path = require('path');
const math = require('mathjs');
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
    
    // Once training set data is ready, define learning rate alpha, number of iterations and initialize parameters
    data.alpha = 0.5;
    data.iterations = 10000;
    data.thetas = math.zeros(1, data.x.size()[1]);
    
    // Run gradient descent function
    console.log("Calculating parameters vector...");
    gradientDescent(data)
        .then(data => {

            // Print results
            console.log("\nParameters vector calculated using the gradient descent algorithm:");
            console.log(data.thetas._data);    

            console.log("\nParameters vector calculated using the normal equation method:");
            console.log(data.checkThetas._data);    

            console.log("\nValue of minimized cost function: " + data.costFunctionResult);
            
            const elapsed = new Date().getTime() - start;
            console.log("\nTime elapsed (s): " + elapsed / 1000 + "\n");          

        })
        .catch(err => {
            console.error(err);
        });

});