---
layout: single
title: "Loss functions"
description: Explaining what the loss function is and how machine learning utilizes it
category: "Regression"
tags: machine-learning loss-function penalization mse l2 mean-square-error quadratic-loss l1 mean-absolute-error mae
date: 2021-01-20
---

In machine learning the loss function is something that lets the machine to actually "learn". The loss function is the function of parameters, it evaluates the error of a model by comparing each predicted result with the actually observed data, thus measuring the residuals for different set of parameters. Then it aggregates all individual residuals and comes up with a single value which generally describes how badly the function fits to the actual input data: the greater the value of the loss function - the worse is the model. Using different optimization techniques the loss function is minimized to a reasonable extent, thus making a machine learning model better.

Depending on specific situations, different types of the loss function may be employed. Among the factors that help to choose which loss function to use are the type of machine learning model, the presence of outliers, complexity of calculating the derivatives, and the confidence level.

In a broad sense, with respect to the type of machine learning problem, the two main categrories are regression losses and classification losses. Below I am going to outline the most used ones.

## Regression losses

### Mean square error/quadratic loss/L2 loss

&nbsp;&nbsp;&nbsp;&nbsp;
$MSE = \frac{\sum_{i=1}^n (\hat{y} - y_i)^2}{n}$

Mean square error is in fact the average of the squared distance between predicted and observed values.<br>
This function results into a single positive number regardless of the direction of the error. In addition, squaring bigger residuals produces even bigger values for the loss function, therefore, the function heavily penalizes significant deviations of the model compared to the lesser ones. So to speak, missing by a little lots of times is considered better than missing by a lot a few times. One has to be careful careful when applying this function to the data with outliers.

Other than that, the function has nice mathematical properties, in particular regarding calculation of [gradient descent]({{ site.baseurl }}{% link _posts/2019-10-15-gradient-descent.md %}), since calculation of a derivative of quadratic function and finding the point of its minimum is quite straightforward.

### Mean absolute error/L1 loss

&nbsp;&nbsp;&nbsp;&nbsp;
$MAE = \frac{\sum_{i=1}^n |\hat{y} - y_i|}{n}$

Mean square error is in fact the average of the squared distance between predicted and observed values<br>
Like MSE this function does not consider the direction of errors and always results into positive number. However, MAE is harder to use when calculating gradient descent. On the other hand, this function is more robust to the effect of outliers.

## Classification losses

One important consideration when choosing loss function for classification is how the error impacts the end user. Depending on the domain, false positives and false negatives might be penalized differently. For example, when detecting fraudulent operations it may be acceptable to wrongly identify a regular operation as fraudulent,  while allowing the actual fraud should be considered as a serious problem.