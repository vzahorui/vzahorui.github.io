---
layout: single
title: "Linear regression"
description: Explaining linear regression and its properties
category: "Regression"
tags: multiple-regression linear-regression
date: 2019-10-25
---

Regression analysis is used for estimating the relationship between variables, usually one dependent and one or several independent variables. Having a regression model at hand, we can predict some continuous value of the dependent variable based on the values of independent variables.

Single Variable Linear Regression explains the relationship between single input variable and the output:

&nbsp;&nbsp;&nbsp;&nbsp;
$y = a + bx + \varepsilon$

The general form of linear regression however is the multivariable one where multiple predictors are taken into consideration:

&nbsp;&nbsp;&nbsp;&nbsp;
$y = \beta_0 + \sum_{i=1}^n \beta_i x_i + \varepsilon$,<br>
where $a_i$ are the weights of each independent variable.

## Gaussian noise

In practice there are always factors which are impossible to explain and predict and which cause surprisingly different results from those that we expect. Therefore there is always going to be some difference between the predicted and actually observed values - the residuals.

According to the Central Limit Theorem if the number of observations is large enough - the residuals have normal distribution with the mean value of 0.

## Assumptions

Linear regression estimation relies on a number of assumptions about the predictor variables and their relationship with the output:

* Homoscedasticity - constant variance of error regardless of the values of independent variables.
* Independence of errors - absence of correlation among errors in different the output values.
* Absence of perfect multicollinearity among predictors - that is that none of the predictors can be expressed as a copy or a linear combination of other predictors.

## Matrix notation

For computation purposes it is better to represent the relationship with matrix notation:

&nbsp;&nbsp;&nbsp;&nbsp;
$Y = \beta X + \varepsilon$,<br>
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
$\varepsilon$ is the vector of errors (the noise). This variable captures all other factors which influence the dependent variable y other than the regressors.
