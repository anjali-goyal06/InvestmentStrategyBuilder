
![Logo](https://github.com/anjali-goyal06/InvestmentStrategyBuilder/blob/master/src/readmeData/logo.png)



# Investment Strategy Builder 

There are many financial instruments available in the stock market for investors to invest their money.
Some of these are primary instruments like Stocks and some are derivatives like Futures and Options. Futures and Options are complex and powerful derivative instruments that are used to enhance an individual’s portfolio. They are generally used for speculative purposes or as an effective hedge against a declining stock market to limit downside losses.


We have built an investment strategy builder which enables the traders to build custom strategies using different combinations of building blocks like stocks, futures and options. The user can also use pre-defined standard strategies already stored in the application like the Covered Call, Long Call, Butterfly Spread, etc. The user can also reuse any of the saved custom strategies and analyse the outputs like payoff graph at expiration. It can help the investors visualise their investment strategies to make informed decisions in order to maximise their gains and minimise their losses.



## Demo
Working video of our project

https://www.youtube.com/watch?v=RGussaf8E4Y

https://youtu.be/IYpTE8iA_GY


## Tech Stack and Concepts Used

We have built the web application using  
* React
* HTML/CSS
* Node
* Express
* MySQL
* JEST framework for testing

Following are the concepts involved:
 * Database Management System
 * Object Oriented Programming
 * Design Patterns for backend

## Key Features
* Enables the user to directly implement pre-defined investment strategies like Covered Call, Long Call, Butterfly Spread, etc.
* The user can add more than one financial instrument like call option, put option, Stock future, stock, etc and our strategy builder will give the cumulative profit and loss graph of this custom strategy.
*  Users will also be able to save any custom made strategy for future use cases.

## Run Locally

Clone the project

```bash
  git clone https://github.com/anjali-goyal06/InvestmentStrategyBuilder
```

Go to the InvestmentStrategyBuilder directory

```bash
  cd src\nodejs\InvestmentStrategyBuilder
```

Install dependencies

```bash
  cd backend
  npm install
  cd ..
  cd frontend
  npm install
```

Compile the ts files

```bash
  cd backend
  tsc
```
Start the backend server

```bash
  cd backend
  node index.js
```

Start the frontend server

```bash
  cd frontend
  npm start
```


## Running Tests

To run tests go to the backend folder and run the following commands

```bash
  npm install --save-dev jest
  npm run test
```

The tests for the business logic can be found in the /backend/test folder.It contains test cases for testing the make plot functions
 used to plot the graphs for the instruments and the investment strategies.

## Authors

- [@Anjali Goyal](https://github.com/anjali-goyal06)
- [@Mokshika Mitra](https://github.com/MokshikaMitra)
- [@Ishita Nigam](https://github.com/ishi-10)
- [@Alak Koul](https://github.com/alakKoul)
- @Aditi Goyal
