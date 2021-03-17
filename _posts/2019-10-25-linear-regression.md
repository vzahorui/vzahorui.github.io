---
layout: single
title: "Linear regression"
description: Explaining linear regression and its properties
category: "Regression"
tags: multiple-regression linear-regression multivariable-regression gaussian-noise normal-distribution homoscedasticity multicolinearity correlation-coefficient
date: 2021-02-28
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

A key feature of linear regression models is that it is assumed that a certain change in the variables causes proportional change in the output (which is not the case in non-linear models). The output is basically treated as a linear combination of predictors. In the real life scenarios this behaviour can only be observed for short periods of time as many natural and social processes tend to have non-linear rate of change.

## Gaussian noise
 
In practice there are always factors which are impossible to explain and predict and which may cause surprisingly different results from those that we expect. Therefore there is always going to be some difference between estimated (predicted) and actually observed values - the residuals, even for the variables which seem to be perfectly correlated.
 
It is common to view the relationship between two observed variables on a scatterplot. Seeing each individual observation helps to estimate the level of variation of the dependent variable, as well as to identify outliers. Below is an example of a nearly linear relationship between two variables which exhibits a certain amount of variation.
 
![](/assets/images/regression/residuals_demo.png){: .align-center}
 
According to the Central Limit Theorem if the number of observations is large enough - the residuals have [normal distribution]({{ site.baseurl }}{% link _posts/2019-07-28-normal-ditribution.md %}) with the mean value of 0. This basically means that for a modeled relationship between two or more variables the observed variation is mainly clustered around the estimated values. Since normal distribution is also called Gaussian distribution, the distribution of residuals around estimated values is called Gaussian noise.

## Matrix notation

For computation purposes it is better to represent the relationship between the dependent and independent variables with matrix notation:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$Y = X \beta + \varepsilon$,
 
where $Y$ is the group of all outputs and $X$ is the composition of all predictors for each particular output:
 
$$
Y = \left[ \begin{array}{c}
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
\end{array} \right]
$$
 
$\beta$ is the vector of parameters (weights) of each predictor,<br>
$\varepsilon$ is the vector of errors (Gaussian noise). This variable captures all other factors which influence the dependent variable y other than the regressors.
 
The parameters $\beta$ of such equation are usually estimated with [least squares]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}), however other methods such as maximum likelihood or robust estimation techniques can be employed.
 
## Other assumptions
 
Apart from the linear nature of relationship between predictors and the output the linear regression estimation relies on a number of other assumptions:

* Absence of perfect multicollinearity among predictors - that is that none of the predictors can be expressed as a copy or a linear combination of other predictors.
* Independence of errors - absence of correlation among errors in different output values.
* Normal distribution of the error term with the mean value of 0.
* Homoscedasticity - constant variance of error regardless of the values of independent variables.

If not all of the assumptions satisfied then the model might not have some of the required variables which explain the bahaviour of errors, or instead might have redundant variables causing multicolinearity.  

## Validation of assumptions 

Linear regression is safe to apply if all of the assumptions are satisfied. Using the Boston house prices dataset I'll perform a typical check in order to ascertain whether it is reasonable to apply linear regression to predict prices.

### Linear relationship

This can be validated by checking [correlation coefficients]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}) between predictors and the dependent variable. Coefficients with absolute values closer 1 hint at linear relationship between variables. Below is the plot of the relationship between price and some of the predictors.

![](/assets/images/regression/correlation_example2.png){: .align-center}

As we see, the percentage of lower status population, and number of rooms are somewhat linearly correlated with the price, pupil-teacher ratio shows weak correlation, and the distance to the employment centers doesn't seem to matter at all, so we exclude this particular variable from further use.

### Absence of perfect multicolinearity among predictors

Similarly, in order to detect multicolinearity we may check correletion coefficients between predictors. In our example among three remaining variables the correlation coefficients between the percentage of lower status population and the number of rooms is -0.61, which makes perfect sense as these categories are certainly related but not fully. 

And yet, checking pairwise correlation coefficinets alone is not enough as ony variable may be dependent on multiple other variables. To tackle this problem we should check variance inflation inflation factor (more to in can be found [here]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %})), as it measures the variance in coefficients caused by multicolinearity in the variables of the model.

For our example we get the following values of VIF for the variables:

|Varaible name|VIF|
|:---:|:---:|
|% of lower status population|5.9|
|Number of rooms|36.1|
|Pupil-teacher ratio|51.8|

Therefore, either the number of rooms or pupil-teacher ration should be removed as the variance of their coefficients is inflated due to multicollinearity.

Multicolinearity could also be detected when the sign at coefficient at a certain parameter is not what we would expect. This happens if the model tries to compensate the effect of several correlated predictors. Also, if the coefficients are estimated multiple times using different samples - as the consequence of the inflated variance the estimations of highly correlated variables will be unstable.

High [condition number]({{ site.baseurl }}{% link _posts/2019-11-08-matrix-properties.md %}) of the [covariance matrix]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) of predictor variables means that there is at least one direction in which the variance is almost non-existant. This indicates multicolinearity as the number of dimensions may be reduced without losing much of the variation. Some methods, such as [singular value decomposition]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}) may be used to deal with multicolinearity internally by extracting new fully independent features, and selecting among them only those that capture the most of the variance in the dataset.

Eventually we decide to include only three variables in the model and estimate parametrers for them. This is the model that we've got:

&nbsp;&nbsp;&nbsp;&nbsp;
$y = 18.57 - 0.93x_1 + 4.52x_2 - 0.57x_3$

Multicolinearity 
 - non-significant coefficients
 
Some methods of finding coefficients of linear regression for example as 


### Independence of errors

