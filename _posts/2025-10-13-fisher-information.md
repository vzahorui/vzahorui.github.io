---
layout: single
title: "Fisher Information"
category: "Probability & Statistics"
tags: maximum-likelihood-estimation MLE hessian derivative variance Cramér-Rao-lower-bound
date: 2025-10-13
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

Fisher Information, denoted $I(\theta)$, is a foundational concept in mathematical statistics. It quantifies the amount of information that an observable random variable $X$ carries about an unknown parameter $\theta$ of its [probability distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}).

In simple terms, Fisher Information measures how sensitive the [likelihood function]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) is to small changes in the parameter $\theta$. A high Fisher Information value indicates that the likelihood function is sharply peaked, meaning the data provides a strong signal about the true value of $\theta$, leading to more precise estimators.

## The Derivation of Fisher Information

The definition of Fisher Information arises directly from the [Maximum Likelihood Estimation]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) (MLE) process. We consider a random variable $X$ drawn from a distribution $f(X;\theta)$, where $\theta$ is the parameter of interest.

The Maximum Likelihood Estimator ($\theta_{MLE}$​) is found by maximizing the log-likelihood function $l(\theta)$, which means setting the first [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) to zero.

The first derivative of the log-likelihood function with respect to $\theta$ is called the score function, $S(\theta)$:

$$S(\theta) = \frac{\partial}{\partial \theta} l(\theta) = \frac{\partial}{\partial \theta} \ln f(X; \theta)$$

The expected value of the score function is a key property: for a well-behaved density function, the expected score is zero.

$$E[S(\theta)] = E\left[\frac{\partial}{\partial \theta} \ln f(X; \theta)\right] = 0$$

This means that on average, the score function is centered around zero when evaluated at the true parameter value $\theta$.

Fisher Information is defined as the variance of the score function. Since the expected value of the score is zero, its variance is simply the expected value of the score squared (from the expression of variance via the mean as $E[Y^2]−(E[Y])^2$):

$$I(\theta) = Var[S(\theta)] = E\left[\left(\frac{\partial}{\partial \theta} \ln f(X; \theta)\right)^2\right] $$

## Alternative Definition via the Second Derivative

Under regularity conditions (specifically, that the order of integration and differentiation can be interchanged), a more computationally convenient definition of Fisher Information involves the second derivative of the log-likelihood function.

By taking the derivative of $E[S(\theta)]=0$ with respect to $\theta$, and applying a key algebraic manipulation, we arrive at:

$$I(\theta) = - E\left[\frac{\partial^2}{\partial \theta^2} \ln f(X; \theta)\right] $$

This second definition is the one most commonly used in practice because the second derivative measures the curvature of the log-likelihood function. A high (negative) curvature means a sharp peak, which corresponds to high information.

## Key Applications of Fisher Information

### The Cramér-Rao Lower Bound (CRLB)

The most important application of Fisher Information is defining the Cramér-Rao Lower Bound. The CRLB states that for any unbiased estimator $\hat \theta$ of $\theta$, the variance of that estimator must be greater than or equal to the inverse of the Fisher Information:

$$Var(\hat \theta) \geq \frac{1}{I(\theta)}$$

The CRLB sets a theoretical minimum variance. No matter how clever an unbiased estimator you design, its precision can never exceed this limit. Estimators that achieve this minimum bound are called efficient estimators.

### Asymptotic Variance of the MLE

The Maximum Likelihood Estimator ($\theta_{MLE}$​) is a cornerstone of frequentist statistics. A key property is its asymptotic efficiency:

* As the sample size $n$ tends to infinity, the distribution of the MLE approaches a normal distribution with a mean equal to the true parameter $\theta$ and a variance equal to the inverse of the sample Fisher Information:

$$\theta_{MLE} \sim \mathcal{N}\left(\theta, \frac{1}{I(\theta)}\right)$$

Since we can calculate the Fisher Information analytically, we can use ists inverse as a readily available estimate of the variance of the MLE, which is crucial for constructing [confidence intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval) and performing [hypothesis tests]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}).

### Optimal Experimental Design

Fisher Information is used to design experiments or observational studies that maximize the precision of parameter estimates.

In a design problem, the Fisher Information often depends on the design variables (e.g., sample sizes, spacing of observation points). By choosing the design that maximizes $I(\theta)$, researchers ensure they collect data that is maximally informative about the parameters of interest, thereby minimizing the cost and effort required to achieve a target level of statistical precision.

### Statistical Tests

The Fisher Information matrix (the multidimensional generalization for multiple parameters) is integral to three major hypothesis tests:

* [Wald Test]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}#wald_test): Uses the estimated inverse Fisher Information matrix to calculate the standard error of the parameter estimates.

* Score Test: Uses the score function and the Fisher Information evaluated under the null hypothesis to test the significance of a parameter.

* [Likelihood Ratio Test]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}#likelihood_ratio): Although it doesn't explicitly use the Fisher Information in its calculation, its asymptotic properties and derivation are closely related to the concepts that lead to Fisher Information.