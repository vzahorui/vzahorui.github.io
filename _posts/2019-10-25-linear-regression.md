---
layout: single
title: "Linear regression"
description: Explaining linear regression and its properties
category: "Regression"
tags: multiple-regression linear-regression multivariable-regression gaussian-noise
date: 2020-05-06
---
 
Regression analysis is used for estimating the relationship between variables, usually one dependent and one or several independent variables. Having a regression model at hand, we can predict some continuous value of the dependent variable based on the values of independent variables.

Single variable linear regression explains the relationship between single input variable and the output:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$y = a + bx + \varepsilon$,
 
where $a$ and $b$ are parameters which explain the behaviour of the dependent variable according to the values of the independent one, and $\varepsilon$ is the residual.
 
The general form of linear regression however is the multivariable one where multiple predictors are taken into consideration:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$y = \beta_0 + \sum_{i=1}^n \beta_i x_i + \varepsilon$,
 
where $\beta_i$ are the weights of each independent variable.
 
## Gaussian noise
 
In practice there are always factors which are impossible to explain and predict and which may cause surprisingly different results from those that we expect. Therefore there is always going to be some difference between estimated (predicted) and actually observed values - the residuals, even for the variables which seem to be perfectly correlated.
 
It is common to view the relationship between two observed variables on a scatterplot. Seeing each individual observation helps to estimate the level of variation of the dependent variable, as well as to identify outliers. Below is an example of a nearly linear relationship between two variables which exhibits a certain amount of variation.
 
![](/assets/images/regression/residuals_demo.png){: .align-center}
 
According to the Central Limit Theorem if the number of observations is large enough - the residuals have normal distribution with the mean value of 0. This basically means that for a modeled relationship between two or more variables the observed variation is mainly clustered around the estimated values. Since normal distribution is also called Gaussian distribution, the distribution of residuals around estimated values is called Gaussian noise.
 
## Assumptions
 
Linear regression estimation relies on a number of assumptions about the predictor variables and their relationship with the output:
 
* Homoscedasticity - constant variance of error regardless of the values of independent variables.
* Independence of errors - absence of correlation among errors in different output values.
* Absence of perfect multicollinearity among predictors - that is that none of the predictors can be expressed as a copy or a linear combination of other predictors.
 
In addition, linear regression by itself assumes that the variables are linearly dependent, that is a certain change in independent variable leads to proportional changes in the dependent one. However, inreal life scenarios such behaviour can be observed only for short periods of time as many natural and social processes tend to have non-linear rate of change.
 
## Matrix notation
 
For computation purposes it is better to represent the relationship between the dependent and independent variables with matrix notation:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$Y = \beta X + \varepsilon$,
 
where $Y$ is the group of all outputs and $X$ is the composition of all predictors for each particular output:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$Y = \left[ \begin{array}{c}
y_1 \\
y_2 \\
... \\
y_n
\end{array} \right]
\text{ }
X = \left[ \begin{array}{ccccc}
1 & x_11 & x_12 & ... & x_1n \\
1 & x_21 & x_22 & ... & x_2n \\
... & ... & ... & ... & ... \\
1 & x_n1 & x_n2 & ... & x_nn
\end{array} \right]$$
 
$\beta$ is the vector of parameters (weights) of each predictor,<br>
$\varepsilon$ is the vector of errors (Gaussian noise). This variable captures all other factors which influence the dependent variable y other than the regressors.
 
The parameters $\beta$ of such equation are usually estimated with [least squares]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}), however other methods such as maximum likelihood or robust estimation techniques can be employed.