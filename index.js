const path = require('path');
const math = require('mathjs');
const loadData = require('./loadData');
const gradientDescent = require('./gradientDescent');

// Define location of training set (a simple CSV file)
const filePath = path.join(__dirname, '/data/training-set.txt');

// Load training set
loadData(filePath)
    .then(data => {

        // Once training set data is ready, define learning rate alpha, number of iterations and initialize parameters
        data.alpha = 0.3;
        data.iterations = 20000;
        data.thetas = math.zeros(1, data.x.size()[1]);
        
        // Run gradient descent function
        console.log("\nCalculating parameters vector...");
        gradientDescent(data)
            .then(data => {

                // Print results
                console.log("\nParameters vector calculated using the gradient descent algorithm:");
                console.log(data.thetas._data);    

                console.log("\nParameters vector calculated using the normal equation method:");
                console.log(data.checkThetas._data);    

                console.log("\nValue of minimized cost function:");
                console.log(data.costFunctionResult);            

            })
            .catch(err => {
                console.error(err);
            }); 
    })
    .catch(err => {
        console.error(err);
    });      