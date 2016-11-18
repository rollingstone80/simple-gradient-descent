# Machine Learning in Javascript

A very simple example of gradient descent algorithm in Javascript, used to solve a linear regression problem: estimate function to predict house prices in central Milan. The set of features used include: square meters, number of rooms, number of bathrooms, floor where the house is located, year of construction. The output of the function is the parameters vector "theta", which is then also calculated using the normal equation method, to double check results. 

## Installation

Download or clone the repo.

Run the following to install dependencies

```
npm install
```

Start the script

```
npm start
```

That's it! Takes roughly 10 seconds on my machine with 0.5 learning rate and 10,000 iterations.

## Built With

* Node version 6.7.0
* [Mathjs](http://mathjs.org/) - Math library

## Author

Enrico Maini

## License

This project is licensed under the MIT License

## Acknowledgments

* Inspired by the great Andrew Ng, an incredibly talented Stanford teacher - thank you for explaining such a difficult topic in such simple words!