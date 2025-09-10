---
layout: single
title: "Statistical Inference"
category: "Probability & Statistics"
tags: statistics sample sampling-distribution
date: 2025-09-09
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

## Introduction

While [descriptive statistics]({{ site.baseurl }}{% link _posts/2025-09-01-descriptive-statistics.md %}) helps us summarize and describe the characteristics of a dataset, statistical inference is a powerful framework that allows us to go one step further. It is the process of using data from a small, representative sample to draw conclusions and make predictions about a larger population from which the sample was drawn.

Imagine a manufacturer wants to know the average lifespan of a new lightbulb model. It's impossible to test every single bulb, so they test a small sample and use statistical inference to estimate the average lifespan for the entire production run.

This process is built on the foundation of the [sampling distribution]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}), which provides a theoretical map of how our sample statistics are likely to behave. With this knowledge, we can answer two fundamental questions: "What is the true value of the population parameter?" and "Is a claim about the population likely to be true?"

## The Two Pillars of Statistical Inference

Statistical inference is primarily carried out using two key methods: estimation and hypothesis testing.

1. Estimation: Guessing with Precision

Estimation is the process of estimating a population parameter (like the mean, variance, or proportion) using a sample statistic. The most common form of estimation is the interval estimate, or confidence interval, which provides a range of values that, with a certain degree of confidence (e.g., 95%), contains the true population parameter. For a detailed look into the mathematics and interpretation of confidence intervals, see the article on the [sampling distribution]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}).

2. Hypothesis Testing: The Formal Proof

[Hypothesis testing]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) is a structured procedure for making a decision about a claim regarding a population. It is a formal process for using our sample data to determine if a statement is likely to be true or false. The process involves setting up two competing statements:

* The Null Hypothesis (H0​): A statement of no effect or no difference. It is the default assumption, and the one we are trying to find evidence against. For example, "H0​: The new medicine has no effect on blood pressure."

* The Alternative Hypothesis (H1​ or HA​): A statement that we are trying to find evidence for. This is the logical opposite of the null hypothesis. For example, "H1​: The new medicine lowers blood pressure."

The process then involves collecting sample data and calculating a p-value. The p-value is the probability of observing our sample data if the Null Hypothesis were true.

A small p-value (typically less than 0.05) provides strong evidence against the null hypothesis, allowing us to reject it and conclude that our claim is likely to be true.

## The Role of Estimation Techniques

Before we can make an inference, we must first estimate the population parameters that define its underlying [probability distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}).

[Maximum Likelihood Estimation (MLE)]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) is a powerful and widely used method for finding the best estimates for these parameters. It works by finding the parameter values that make the observed data the most probable to have occurred. The estimates derived from MLE are then used as the basis for both hypothesis testing and confidence interval construction.

## Making Sense of Relationships: Regression Analysis

Another key area of statistical inference is understanding and modeling the relationships between variables. [Regression analysis]({{ site.baseurl }}{% link _posts/2025-09-10-regression-analysis.md %}) is a broad field of study dedicated to this. Its most basic form, linear regression, fits a straight line to the data to model the relationship between a dependent variable and one or more independent variables.

Regression is a crucial tool for making inferences about a population. For example, a regression model can be used to infer the impact of a marketing budget on sales, or to predict future trends based on past data. The parameters of the regression model are also estimated and tested using the principles of statistical inference.
