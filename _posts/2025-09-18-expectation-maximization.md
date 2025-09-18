---
layout: single
title: "Expectation Maximization"
category: "Probability & Statistics"
tags: hidden-variables kalman-filter MLE maximum-likelihood
date: 2025-09-18
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

The Expectation-Maximization (EM) algorithm is a powerful iterative method used in [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}) to find the [maximum likelihood]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) or [maximum a posteriori]({{ site.baseurl }}{% link _posts/2022-07-15-bayesian-inference.md %}#map) (MAP) estimates of parameters in statistical models. It is particularly useful when the model depends on unobserved (or latent) variables.

The EM algorithm provides a robust framework for problems that would otherwise be unsolvable using direct optimization methods. It offers an elegant solution by breaking the complex problem into two more manageable steps: an expectation step and a maximization step.

## The Core Idea: Expectation and Maximization

The EM algorithm operates by iteratively improving an initial guess for the model parameters. Each iteration consists of two main steps:

**Expectation (E) Step**: In this step, the algorithm uses the current parameter estimates to compute the "expected" values of the latent variables. Essentially, it fills in the missing data with the most probable values given the current model.

**Maximization (M) Step**: The algorithm then treats the "expected" values from the E-step as if they were the true, observed data. It then finds new parameter estimates that maximize the likelihood of the observed data, which in turn leads to a new, better model.

This two-step process repeats until the parameter estimates converge to a stable solution, representing the local maximum of the likelihood function.

## A Classic Example: Gaussian Mixture Models (GMM)

A classic application of the EM algorithm is in Gaussian Mixture Models (GMMs), a common [clustering]({{ site.baseurl }}{% link _posts/2021-01-03-clustering-overview.md %}) technique.

Imagine you have a dataset of points, but you don't know which cluster each point belongs to. The cluster assignment is the latent variable. Our goal is to find the mean, variance, and weight of each cluster that best explains the observed data.

Here's how EM solves this problem:

1. Initialize Parameters: Make an initial guess for the parameters of each Gaussian cluster (mean, variance, and the mixing weight).

2. E-Step (Soft Assignment): For each data point, calculate the probability that it belongs to each cluster, using the current parameter estimates. Instead of a hard assignment (e.g., "point 1 belongs to cluster A"), this is a "soft" assignment (e.g., "point 1 has a 70% probability of belonging to cluster A and a 30% probability of belonging to cluster B"). This fills in our missing cluster assignment data with probabilistic expectations.

3. M-Step (Parameter Update): Using the soft assignments from the E-step, update the parameters of each cluster. For example:

* The new mean of a cluster is the weighted average of all data points, where the weights are the soft assignment probabilities calculated in the E-step.
* The new variance is also calculated from the weighted data.
* The new mixing weight for a cluster is simply the sum of all soft assignment probabilities for that cluster.

These two steps are repeated. With each iteration, the cluster assignments become more certain and the parameters converge to a solution that best fits the underlying data structure.

![](/assets/images/clustering/gaussian_mix_expectation_maximization.gif){: .align-center}

## General Framework and Applications

The EM algorithm is a powerful tool because it turns a hard optimization problem (finding parameters when data is missing) into a sequence of simpler ones. Its general framework can be applied to many different models, including:

* [Kalman Filters]({{ site.baseurl }}{% link _posts/2025-09-10-time-series-smoothing.md %}#kalman_filter): The EM algorithm is used to estimate the unknown process and measurement noise covariances ($Q$ and $R$) from time series data. In this case, the latent variables are the true, unobserved states of the system.

* Hidden Markov Models (HMMs): The EM algorithm is used to learn the transition and observation probabilities for a system with hidden states.

* Topic Modeling: Algorithms like Latent Dirichlet Allocation (LDA) use a form of EM to infer the topic mixture of a document and the word distribution of each topic.

In all of these cases, the EM algorithm provides an elegant solution by iteratively refining its beliefs about the unobserved variables and updating the model parameters to best fit those beliefs.
