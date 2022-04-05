-- This file contains the sql commands for creating the database tables

-- User Table
CREATE TABLE if not exists user(name varchar(50),
                                id int(10) primary key AUTO_INCREMENT, 
                                email varchar(50),
                                password varchar(1000));

-- OptionSkeleton Table
CREATE TABLE if not exists OptionSkeleton (Id int PRIMARY KEY AUTO_INCREMENT, 
                                           Side varchar(15) NOT NULL, 
                                           Type varchar(15) NOT NULL, 
                                           InvestmentStrategySkeletonId int, 
                                           FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id));

-- FutureSkeleton Table
CREATE TABLE if not exists FutureSkeleton (Id int PRIMARY KEY AUTO_INCREMENT, 
                                           Side varchar(15) NOT NULL, 
                                           InvestmentStrategySkeletonId int, 
                                           FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id));

-- StockSkeleton Table
CREATE TABLE if not exists StockSkeleton (Id int PRIMARY KEY AUTO_INCREMENT, 
                                          Side varchar(15) NOT NULL, 
                                          InvestmentStrategySkeletonId int, 
                                          FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id));

-- InvestmentStrategySkeleton Table
CREATE TABLE if not exists InvestmentStrategySkeleton(Id int PRIMARY KEY AUTO_INCREMENT, 
                                                      StrategyName varchar(30) NOT NULL, 
                                                      Description varchar(5000), 
                                                      UserId int(50), 
                                                      FOREIGN KEY (UserId) REFERENCES user(Id)); 

-- InvestmentStrategy Table
CREATE TABLE if not exists InvestmentStrategy(Id int PRIMARY KEY AUTO_INCREMENT,
                                              Name varchar(60) NOT NULL UNIQUE, 
                                              StockName varchar(50) NOT NULL, 
                                              Ticker varchar(50) NOT NULL, 
                                              ExpiryDate date NOT NULL, 
                                              userId int, Description varchar(5000), 
                                              InvestmentStrategySkeletonId int, 
                                              FOREIGN KEY (UserId) REFERENCES user(Id), 
                                              FOREIGN KEY (InvestmentStrategySkeletonId) REFERENCES InvestmentStrategySkeleton(Id));

-- Stock Table
CREATE TABLE if not exists Stock(Id int PRIMARY KEY AUTO_INCREMENT, 
                                 Price double NOT NULL, 
                                 Quantity int NOT NULL, 
                                 StockSkeletonId int, 
                                 InvestmentStrategyId int,  
                                 FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), 
                                 FOREIGN KEY (StockSkeletonId) REFERENCES StockSkeleton(Id));

-- Future Table
CREATE TABLE if not exists Future(Id int PRIMARY KEY AUTO_INCREMENT, 
                                  Price double NOT NULL, 
                                  Quantity int NOT NULL, 
                                  FutureSkeletonId int, 
                                  InvestmentStrategyId int, 
                                  FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), 
                                  FOREIGN KEY (FutureSkeletonId) REFERENCES FutureSkeleton(Id));

-- Options Table
CREATE TABLE if not exists Options(Id int(50) PRIMARY KEY AUTO_INCREMENT, 
                                   StrikePrice double NOT NULL, 
                                   Premium double NOT NULL, 
                                   Quantity int NOT NULL, 
                                   OptionSkeletonId int(50), 
                                   InvestmentStrategyId int, 
                                   FOREIGN KEY(InvestmentStrategyId) REFERENCES InvestmentStrategy(Id), 
                                   FOREIGN KEY (OptionSkeletonId) REFERENCES OptionSkeleton(Id));
