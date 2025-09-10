---
layout: single
title: "Probability & Statistics"
category: "Probability & Statistics"
tags: distribution sample probability statistics hypothesis-testing inference
date: 2025-09-01
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

## Introduction

While often taught together, probability and statistics approach problems from opposite directions, focusing on the relationship between parameters (the true, unknown characteristics of a population) and data (the observed information).

### Probability: Modeling the Data from Known Parameters

Probability is a branch of mathematics that uses a deductive approach. It assumes we know the true parameters of a population or process and, based on these parameters, it provides a model for how the data should behave.

Think of it this way: a fair coin's parameter is that the probability of landing on heads is exactly 0.5. Probability uses this known parameter to predict the behavior of the data—for example, modeling the likelihood of getting 5 heads in a row. It moves from the parameters to the data.

### Statistics: Inferring Parameters from Observed Data

Statistics uses an inductive approach. It starts with a sample of observed data and uses it to make inferences or draw conclusions about the true, unknown parameters of the entire population or process.

For example, imagine you are given a coin and told to determine if it's fair. You flip the coin 100 times and observe 90 heads. Statistics would use this specific sample of data to infer that the true parameter (the probability of heads) is likely not 0.5. It moves from the data to the parameters.

### The Inference-and-Prediction Cycle

In the real world, probability and statistics form a continuous cycle. We first use statistics to analyze a sample of data, inferring the underlying parameters that govern a process or population. Once we've established these parameters, we can then use probability to model the system and make predictions about future events.

## Foundations of Probability

**Probability Theory({{ site.baseurl }}{% link _posts/2025-09-01-main-probability-concepts.md %})**: This page defines key terms like event, outcome, and random variable. It covers the basic rules of probability (e.g., addition and multiplication rules) and conditional probability.

**[Probability Distributions]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %})**: This page introduces the concept of a probability distribution as a function that describes the likelihood of obtaining the possible values that a random variable can take. It covers both discrete and continuous distributions, including examples.

**[Normal Distribution]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %})**: A more in-depth discussion of the most important distribution used for modeling real-world data and in statistical inference.

## The Core of Statistics

**[Descriptive Statistics]({{ site.baseurl }}{% link _posts/2025-09-01-descriptive-statistics.md %})**: This page should cover methods for summarizing and describing data, such as measures of central tendency (mean, median, mode) and measures of variability (variance, standard deviation). This provides a necessary foundation before moving on to inference.

**[Sampling Distribution]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %})**: This page fits here as it is the theoretical foundation for statistical inference. It explains what a sampling distribution is and how it relates to the Central Limit Theorem.

**[Statistical Inference]({{ site.baseurl }}{% link _posts/2025-09-01-statistical-inference.md %})**: This is a crucial page that acts as the bridge between descriptive statistics and more advanced topics. It should define statistical inference as the process of drawing conclusions about a population based on a sample. This is where we introduce the two main pillars of inference: estimation and hypothesis testing.

## Inferential Techniques

**[Confidence Interval]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval)**. An important part of statistical inference allowing to produce a range of values used to estimate the true value of a population parameter with certain confidence.

**[Hypothesis testing]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %})** is a fundamental statistical method which uses a sample of data to make an informed decision about the parameters of a population. Then, given these parameters one can model various scenarios and make a conclusion on whether there is a difference between two groups (or the same group before and after some treatment). 

### Types of Statistical Tests

Parametric Tests: This page should cover tests that assume the data follow a specific distribution (typically normal). This is where you can detail tests like the t-test, ANOVA, and correlation. Explain the conditions under which they are appropriate.

Non-Parametric Tests: This page should cover tests that do not make assumptions about the population distribution. It can include examples like the Mann-Whitney U test or the Chi-squared test. Explain when these are used instead of their parametric counterparts.

## Advanced Topics and Bridge Concepts

**[Regression Analysis]({{ site.baseurl }}{% link _posts/2025-09-10-regression-analysis.md %})**: a powerful tool for modeling relationships between variables.

**[Bayesian Inference]({{ site.baseurl }}{% link _posts/2022-07-15-bayesian-inference.md %})** as an alternative to the frequentist approach, which uses prior knowledge and Bayes' Theorem to update beliefs about a hypothesis.