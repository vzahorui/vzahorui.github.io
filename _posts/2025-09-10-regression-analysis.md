---
layout: single
title: "Regression Analysis"
category: "Regression"
tags: statistics statistical-inference linear-regression non-linear-regression time-series
date: 2025-09-10
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

[Statistical inference]({{ site.baseurl }}{% link _posts/2025-09-01-statistical-inference.md %}) allows making educated guesses about a population using a sample. Regression analysis extends this idea by providing means to understand and model the relationship between two or more variables. It is a foundational tool used to understand how changes in one variable are associated with changes in another, allowing for both explanation and prediction.

## Regression as a Form of Statistical Inference

At its core, regression analysis is a form of statistical inference. By analyzing data from a sample, a regression model provides point estimates for the true, unknown parameters of a population. For example, in a model predicting housing prices, the regression coefficients are estimates for the true effect of a variable like "square footage" on price.

This process allows for a powerful type of inference:

* Explanation: Understanding how and why variables are related.
* Prediction: Using the model to forecast outcomes for new, unseen data.

## Core Paths of Regression

Regression models can be broadly categorized based on the nature of the relationship they are designed to capture. By navigating between these different types of models, one can choose the right tool to uncover meaningful insights and make informed decisions from data.

1. Linear Models

The simplest and most widely used form of regression assumes a straight-line relationship between the variables. This approach is powerful and provides a solid foundation for understanding more complex models. The method for fitting these models often involves minimizing the sum of squared errors between the data points and the line. To dive into the specifics of this approach, including the key assumptions and the method of fitting a best-fit line, see our article on [Linear Regression]({{ site.baseurl }}{% link _posts/2019-10-25-linear-regression.md %}).

2. Beyond Linearity: When the Relationship Isn't a Straight Line

In many real-world scenarios, the relationship between variables is not a straight line. Regression analysis has evolved to handle these non-linear patterns.

**[Non-Linear Regression]({{ site.baseurl }}{% link _posts/2020-05-07-non-linear-regression.md %})**: This category includes models that capture curved relationships, where the effect of the independent variable on the dependent variable changes as the independent variable itself changes..

**[Logistic Regression]({{ site.baseurl }}{% link _posts/2022-09-25-logistic-regresion.md %})**: This is a specialized form of regression used for classification problems, where the dependent variable is categorical (e.g., "yes" or "no"). Instead of predicting a continuous value, it predicts the probability of an outcome.

### A Special Application: Time Series Analysis

[Time series analysis]({{ site.baseurl }}{% link _posts/2025-09-10-time-series.md %}) is a specialized field of regression that deals with data points collected over time (e.g., stock prices, temperature readings, sales data). The defining feature of time series data is that observations are not independent; each data point is often influenced by its past values. Many time series models, particularly autoregressive (AR) models, are a direct application of regression principles. These models use a variable's past values to predict its future values, effectively treating past observations as independent variables.
