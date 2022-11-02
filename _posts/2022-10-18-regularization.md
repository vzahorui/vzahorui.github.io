---
layout: single
title: "Regularization"
category: "Optimization"
tags: loss-function overfittings L2-regularization L1-regularization Ridge-regularization Lasso-regularization Ridge-regression Lasso-regression Elastic-Net
date: 2022-11-02
---

Regularization is a process of simplifying complex machine learning models in order to prevent overfitting. It may be applied explicitly by adding a penalty term to [the loss function]({{ site.baseurl }}{% link _posts/2019-10-14-loss-functions.md %}), or implicitly by providing constraints, removing outliers, using robust algorithms, or applying early stopping.

As a general case, the regularized loss which needs to be minimized looks like this:

$$ \min_{f}\sum_{i=1}^{n}L(f(x_{i}),y_{i})+\lambda R(f)$$

where $L$ is the estimator which compares the predicted values with the actual ones, and $R(f)$ is the function that does regularization, $\lambda$ is the parameter which determines the strength of regularization. Below is an overview of the main techniques of regularization.

## Ridge regularization

Also known as Ridge regression, or L2 regularization, it employs the penalty function which sums up the squares of the weights of the model features, so that the optimization problem looks like this:

$$ \min_{f}\sum_{i=1}^{n}L(f(x_{i}),y_{i})+\lambda \sum_{j=i}^m \beta_{j}^2$$

This type of penalization prevents the coefficients from being too far from zero. If there are many variables, some of which exhibit multicollinearity, ridge regression may improve the predictive properties of the model.

## Lasso regularization

Also known as Lasso regression, or L1 regularization, it employs the penalty function which sums up the absolute weights of the model features, so that the optimization problem looks like this:

$$ \min_{f}\sum_{i=1}^{n}L(f(x_{i}),y_{i})+\lambda \sum_{j=i}^m \lvert\beta_j \rvert$$

Unlike Ridge regularization, Lasso forces some of the coefficients to be exactly zero thus removing the features from the model. This happens because calculating [the derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) for the penalizing term is not possible, so the optimizing algorithm can consider only dropping some of the features in order to test whether the regularized loss reduces or not.

Apart from reducing overfitting, the Lasso regularization may also improve interpretability of the model.

## Elastec Net

Including both Rindge and Lasso penalty terms to the loss function is known as Elastic Net regularization:

$$ \min_{f}\sum_{i=1}^{n}L(f(x_{i}),y_{i})+ \lambda_1 \sum_{j=i}^m \lvert\beta_j \rvert + \lambda_2 \sum_{j=i}^m \beta_{j}^2$$

A special case of Elastic Net may become either Lasso or Ridge regularization if $\lambda_1$ or $\lambda_2$ is zero.