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

That's it! Takes roughly 0.8 seconds on my machine, with learning rate alpha set at 0.3 and 10,000 iterations.

## Built With

* Node version 6.7.0
* [Vectorious](https://github.com/mateogianolio/vectorious) - Linear algebra library

## Author

Enrico Maini

## License

This project is licensed under the MIT License

## Acknowledgments

* Inspired by the great Andrew Ng, an incredibly talented Stanford teacher - thank you for explaining such a difficult topic in such simple words!