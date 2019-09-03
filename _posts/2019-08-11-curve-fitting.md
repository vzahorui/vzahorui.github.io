---
layout: single
title: "Curve fitting"
description: Here I am going to explain some of the curve fitting methods such as least squares and least absolutes
category: "Regression"
tags: least-squares residuals regression absolute-residuals maximum-likelihood  curve-fitting
date: 2019-08-11
---

In regression analysis we estimate the relationship among variables, usually one dependent and one or several independent variables. Having a regression model at hand, we can predict how dependent variable will be changing if one or several independent are changing. 
It two-dimensional space we can draw a curve which approximates the relationship between two variables. So to speak, such curve best fit distribution of observed variables. Having such line we can project future observations as such that belong to the line (accounting for a certain amount of randomness). Regression is not bounded to two-dimensional space of course, and can predict surfaces in a multidimensional space - in this case there will be several independent variables which predict one dependent.<br>

In the reality there are always factors which are impossible to explain and predict and which cause surprisingly different results from those that we expect. Therefore there is always going to be some difference between the actually observed values and the values from the line which is fitted - the residuals. The magnitude of residuals tell us how well we fit the line and, so we want to minimize it. <br>
A good model does not need to fully fit into all observed values. Instead it needs to be able to generalize well so that predictions for the new observations will not be affected by the random noise of the prior points.<br>

In order to measure the magnitude of residuals we need to calculate some aggregated metric. Some of the residuals are positive while others are negative, so we cannot simply sum them all up - many of them will cancel each other out. <br>

One option is to take absolute values of residuals and sum them all up, (known as L1-estimator): <br>

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^n |\hat{y} - y_i| \rightarrow \min $

Another, generally more preferred method is to square the residuals and sum them all up.<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$\sum_{i=1}^n (\hat{y} - y_i)^2 \rightarrow \min $

## Arguments for using least squared distance<br>

If we square the residuals we will obtain bigger numbers for larger residuals. Thus by fitting the line we are minimizing the effect of outliers. So to speak, missing by a little lots of times is considered better than missing by a lot a few times. <br>

Another important notation is that by solving least squares problem we obtain a single solution whereas by minimizing the sum of absolute residuals it is possible that there may be an infinite number of lines that all have the same sum of absolute residuals (the minimum).<br>

From the probabilistic point of view the least-squares solution is known to be the maximum likelihood estimate, provided that all residuals are independent and normally distributed random variables.<br>

## Arguments for using least absolute distance<br>

Using the sum of absolute residuals is more robust however.  The least-squares solution can become biased in the presence of outliers. Consider the example below:

Another situation where least-squares solution may not perform well is heteroscedasticity of residuals. Heteroscedasticity allows the variance to be dependent on x, which is more accurate for many real scenarios. For example, the variance of expenditure is often larger for individuals with higher income than for individuals with lower incomes. 
