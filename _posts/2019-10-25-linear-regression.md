---
layout: single
title: "Linear regression"
description: Explaining linear regression and its properties
category: "Regression"
tags: multiple-regression linear-regression multivariable-regression gaussian-noise normal-distribution homoscedasticity multicollinearity correlation-coefficient heteroscedasticity hypothesis-testing autocorrelation residuals error-term Cochrane–Orcutt-estimation Prais–Winsten-estimation
date: 2021-07-09
---

Regression analysis is used for estimating the relationship between variables, usually one dependent and one or several independent variables. Having a regression model at hand, we can predict some continuous value of the dependent variable based on the values of independent variables.

## In this article
* [What is linear regression](#introduction)
* [Gaussian noise](#gaussian_noise)
* [Matrix notation](#matrix_notation)
* [Confidence intervals of the coefficients](#confidence_interval_coef)
* [Other assumptions](#other_assumptions)
* [Hypothesis testing in linear regression](#hypothesis_tests)
  * [Significance of the parameters](#significance_of_params)
  * [Significance of the model](#significance_of_model)
* [Validation of assumptions](#validation)
  * [Linear relationship](#validation_of_linear)
  * [Absence of perfect multicollinearity among predictors](#validation_of_multicolinear)
  * [Independence of errors](#independence_of_errors)

<div id='introduction'/>
## What is linear regression

Single variable linear regression explains the relationship between single input variable and the output:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$y = a + bx + \varepsilon$,
 
where $a$ and $b$ are parameters which explain the behaviour of the dependent variable according to the values of the independent one, and $\varepsilon$ is the residual.
 
The general form of linear regression however is the multivariable one where multiple predictors are taken into consideration:

&nbsp;&nbsp;&nbsp;&nbsp;
$y = \beta_0 + \sum_{i=1}^n \beta_i x_i + \varepsilon$,
 
where $\beta_i$ are the weights of each independent variable.

A key feature of linear regression models is that it is assumed that a certain change in the variables causes proportional change in the output (which is not the case in non-linear models). The output is basically treated as a linear combination of predictors. In the real life scenarios this behaviour can only be observed for short periods of time as many natural and social processes tend to have non-linear rate of change.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='gaussian_noise'/>
## Gaussian noise
 
In practice there are always factors which are impossible to explain and predict and which may cause surprisingly different results from those that we expect. Therefore there is always going to be some difference between estimated (predicted) and actually observed values - the residuals, even for the variables which seem to be perfectly correlated.
 
It is common to view the relationship between two observed variables on a scatterplot. Seeing each individual observation helps to estimate the level of variation of the dependent variable, as well as to identify outliers. Below is an example of a nearly linear relationship between two variables which exhibits a certain amount of variation.
 
![](/assets/images/regression/residuals_demo.png){: .align-center}
 
According to the Central Limit Theorem if the number of observations is large enough - the residuals have [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) with the mean value of 0. This basically means that for a modeled relationship between two or more variables the observed variation is mainly clustered around the estimated values. Since normal distribution is also called Gaussian distribution, the distribution of residuals around estimated values is called Gaussian noise.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='matrix_notation'/>
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
 
where $\beta$ is the vector of parameters (weights) of each predictor, and $\varepsilon$ is the vector of errors (Gaussian noise). This variable captures all other factors which influence the dependent variable y other than the regressors.
 
The parameters $\beta$ of such equation are usually estimated with [least squares]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %}), however other methods such as maximum likelihood or robust estimation techniques can be employed.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='confidence_interval_coef'/>
## Confidence intervals of the coefficients

[Recall]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence interval) that the confidence interval from a sample is the region around the sample mean, which with a certain probability contains the true mean.

&nbsp;&nbsp;&nbsp;&nbsp;
$(\bar X - Z \cdot SE; \bar X + Z \cdot SE)$

where $Z$ is the critical value for a given significance level (confidence level minus 1), and $SE$ is the [standard error]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#sample_mean_variance).

In case of the linear regression the coefficients are calculated based on sample data so they should be viewed as sample means. The variances of the coefficients may be estimated with the covariance matrix, as described [here]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}#variance_coefficients). Then the standard error can be obtained by dividing them by the square root of the number of observations.

When we are dealing with a sample, and the true variance is unknown, instead of the critical value $Z$, which assumes the [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution), the $t$-value from the [$t$-distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#student_distribution) is used. The number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) for the $t$-value in case of the linear regression is ($n$-$m$-1), where $n$ is the number of observations, and $m$ is the number of independent variables.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='other_assumptions'/>
## Other assumptions
 
Apart from the linear nature of relationship between predictors and the output the linear regression estimation relies on a number of other assumptions:

* Absence of perfect multicollinearity among predictors - that is that none of the predictors can be expressed as a copy or a linear combination of other predictors.
* Independence of errors - absence of correlation among errors in different output values.
* Normal distribution of the error term with the mean value of 0.
* [Homoscedasticity]({{ site.baseurl }}{% link _posts/2019-08-18-heteroscedasticity.md %}) - constant variance of the error term regardless of the values of independent variables.

If not all of the assumptions are satisfied then the model might not have some of the required variables which explain the behaviour of errors, or instead might have redundant variables causing multicollinearity. Or maybe the relationship among variables is non-linear.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='hypothesis_tests'/>
## Hypothesis testing in linear regression

In scope of linear regression we may want to test the significance of the model in general, and the significance of each individual parameter.

<div id='significance_of_params'/>
### Significance of the parameters

When testing the parameters we perform the [hypothesis test]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) of whether a given parameter is equal to 0:

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \beta_i = 0$

&nbsp;&nbsp;&nbsp;&nbsp;
$H_a: \beta_i \ne 0.6$

So for a given significance level the $t$-statistic is calculated:

&nbsp;&nbsp;&nbsp;&nbsp;
$t = \frac{\beta_i - 0}{SE_i}$

where $SE_i$ is the [standard error]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#sample_mean_variance) of the $i$th coefficient.

If the resulting $t$-statistic has corresponding $p$-value less than the significance level then the null hypothesis is rejected, and the parameter of the regression is considered significant.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='significance_of_model'/>
### Significance of the model

In essence this test checks whether inclusion of independent variables (all at once) makes a better model than the model without independent variables.

The null hypothesis here implies that all of the coefficients at independent variables are equal to 0, and the alternative would mean that at least one of them is not equal to zero. The test statistic in this case would be [F-test]({{ site.baseurl }}{% link _posts/2021-03-22-hypothesis-test-parametric-statistics.md %}#mean_more_samples).

On the whole, there might be cases when the model in general is statistically significant but each individual coefficient is not. This happens when the predictor variables are highly correlated among themselves. Due to multicollinearity the coefficient values become unstable, and their confidence intervals inflated, so these intervals include 0.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='validation'/>
## Validation of assumptions

Linear regression is safe to apply if all of the assumptions are satisfied. Using the Boston houses prices dataset let's perform a typical check in order to ascertain whether it is reasonable to apply linear regression to predict prices.

<div id='validation_of_linear'/>
### Linear relationship

This can be validated by checking [correlation coefficients]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) between predictors and the dependent variable. Coefficients with absolute values closer 1 hint at linear relationship between variables. Below is the plot of the relationship between price and some of the predictors.

![](/assets/images/regression/correlation_example2.png){: .align-center}

As we see, the percentage of lower status population, and number of rooms are somewhat linearly correlated with the price, pupil-teacher ratio shows weak correlation, and the distance to the employment centers doesn't seem to matter at all, so we exclude this particular variable from further use.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='validation_of_multicolinear'/>
### Absence of perfect multicollinearity among predictors

Similarly, in order to detect multicollinearity we may check correlation coefficients between predictors. In our example among three remaining variables the correlation coefficient between the percentage of lower status population and the number of rooms is -0.61, which makes perfect sense as these categories are certainly related but not fully.

And yet, checking pairwise correlation coefficients alone is not enough since any variable may be dependent on multiple other variables. To tackle this problem we should check variance inflation inflation factor (more to in can be found [here]({{ site.baseurl }}{% link _posts/2019-10-27-linear-least-squares.md %})), as it measures the variance in coefficients caused by multicollinearity in the variables of the model.

For our example we get the following values of VIF for the variables:

|Variable name|VIF|
|:---:|:---:|
|% of lower status population|5.9|
|Number of rooms|36.1|
|Pupil-teacher ratio|51.8|

Therefore, either the number of rooms or pupil-teacher ration should be removed as the variance of their coefficients is inflated due to multicollinearity.

Multicollinearity could also be detected when the sign coefficient at a certain parameter is not what we would expect. This happens if the model tries to compensate for the effect of several correlated predictors. Also, if the coefficients are estimated multiple times using different samples - as the consequence of the inflated variance the estimations of highly correlated variables will be unstable. This leads to the situations when the overall significance of the model is high while each individual predictor is not statistically significant.

High [condition number]({{ site.baseurl }}{% link _posts/2019-11-08-matrix-properties.md %}) of the [covariance matrix]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) of predictor variables means that there is at least one direction in which the variance is almost non-existent. This also indicates multicollinearity because the number of dimensions may be reduced without losing much of the variation. Some methods, such as [singular value decomposition]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}) may be used to deal with multicollinearity internally by extracting new fully independent features, and selecting among them only those that capture the most of the variance in the dataset.

Eventually we decide to include only two variables (the percentage of lower status population and the number of rooms) in the model and estimate parameters for them. This is the model that we've got:

&nbsp;&nbsp;&nbsp;&nbsp;
$y = -1.3583 - 0.6424 x_1 + 5.09482 x_2$
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='independence_of_errors'/>
### Independence of errors

This assumption basically means that the residuals of the obtained regression model do not form any pattern, and that there is no autocorrelation. Usually autocorrelation is present if some of the important predictor variables are omitted or if the model exhibits [non-linear]({{ site.baseurl }}{% link _posts/2020-05-07-non-linear-regression.md %}) behaviour.

In our example we see that residuals still form some non-linear pattern with respect to the predicted variables.

![](/assets/images/regression/independence_of_errors.png){: .align-center}

The [Durbin-Watson test]({{ site.baseurl }}{% link _posts/2019-07-12-time-series-tests.md %}#durbin_watson) produces value 0.834 (from the possible range of 0-4) which is an evidence of the positive autocorrelation of the residuals of the model at lag 1. Also the [Breusch–Godfrey test]({{ site.baseurl }}{% link _posts/2019-07-12-time-series-tests.md %}#breusch_godfrey) produces the $p$-value close to 0 for all cases when up to 10 lags are taken into consideration, which is a strong evidence of autocorrelation.

The obvious way to remove the autocorrelation of the error term is to add some of the omitted variables if they are known. However in practice this information is usually absent, so another way to deal with it is to add the lag of the dependent variable as an additional predictor. Let's take a look at the Cochrane–Orcutt estimation which was designed specifically for this purpose. Suppose we have regression in form of

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t = \alpha + \beta X_t + \varepsilon_t$

And autocorrelation of the residuals at lag 1:

&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon_t = \rho \varepsilon_{t-1} + u_t$

where $u$ is the white noise, and $\rho$ is some coefficient which takes values from -1 and 1. By taking the difference (adjusted by $\rho$) between the residuals of consecutive results it is possible to replace the autocorrelated residuals with the white noise.

&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon_t - \rho \varepsilon_{t-1} = u_t$

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t - \alpha - \beta X_t - \rho(y_{t-1} - \alpha - \beta X_{t-1}) = u_t$

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t - \rho y_{t-1} =  \alpha (1 - \rho) + \beta (X_t - \rho X_{t-1}) + u_t$

In order to find the coefficients of this final equation, first the values of $\alpha$ and $\beta$ from the base regression need to be estimated. Then through iterations $\rho$ is estimated from the residuals, and $\alpha$ and $\beta$ are estimated with respect to the latest value of $\rho$ until the convergence is reached.

A slightly better alternative would be Prais–Winsten estimation which is basically based on the Cochrane–Orcutt estimation but it doesn't remove the first observation from the series when calculating lags. Intead, for $t$=1 it adds this expression:

&nbsp;&nbsp;&nbsp;&nbsp;
$\sqrt{1-\rho^2} y_1 = \alpha \sqrt{1-\rho^2} + \beta \sqrt{1-\rho^2} X_1 + \sqrt{1-\rho^2} \varepsilon_1$

After applying this to our model of Boston houses prices we get the following equation:

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t = -1.09 + 4.9365(x_{1,t} - 0.65x_{1,t-1}) - 0.4286(x_{2,t} - 0.65x_{2,t-1}) + 0.65 y_{t-1} $
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>