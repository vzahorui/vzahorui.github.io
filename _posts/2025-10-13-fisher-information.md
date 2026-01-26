---
layout: single
title: "Fisher Information"
category: "Probability & Statistics"
tags: maximum-likelihood-estimation MLE hessian derivative variance Cramér-Rao-lower-bound
date: 2025-12-26
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

Fisher Information, denoted $I(\theta)$, is a foundational concept in mathematical [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}). It quantifies the amount of information that an observable random variable $X$ carries about an unknown parameter $\theta$ of its [probability distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}).

Essentially, Fisher Information measures how sensitive the [likelihood function]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) is to small changes in the parameter $\theta$. A high Fisher Information value indicates that small changes in the parameter result in large changes in the likelihood (the likelihood function is sharply peaked), meaning the data provides a strong signal about the true value of $\theta$, leading to more precise estimators.

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

Intuitively, high variance of the score function indicates high certainty with regards to the direction in which $\theta$ should be nudged in order to reach 0 (and the maximum of the likelihood function).

## Alternative Definition via the Second Derivative

Under regularity conditions (specifically, that the order of integration and differentiation can be interchanged), a more computationally convenient definition of Fisher Information involves the second derivative of the log-likelihood function.

$$I(\theta) = - E\left[\frac{\partial^2}{\partial \theta^2} \ln f(X; \theta)\right] $$

This second definition is often used in practice because the second derivative measures the curvature of the log-likelihood function. A high (negative) curvature means a sharp peak, which corresponds to high information. 

While these two definitions are mathematically equivalent in expectation, the second derivative version highlights why the Information Matrix represents the curvature of our knowledge, while the squared score version highlights why it represents the precision (inverse variance) of our estimate.


## Key Applications of Fisher Information

Because a high Fisher Information value indicates high certainty in the parameter estimate, it implies that the estimator has low variance. In this sense, Fisher Information and variance are inversely related: high information corresponds to low uncertainty. In practice, we invert the Fisher Information Matrix to obtain the Covariance Matrix, which provides a direct measure of the estimator's uncertainty.

### Asymptotic Variance of the MLE

This relationship is formalized by the Asymptotic [Normality]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %}) of the MLE. According to the [Central Limit Theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#central_limit), as the sample size $n$ grows large, the Maximum Likelihood Estimator converges in distribution to a normal distribution centered at the true parameter $\theta$, with a variance equal to the inverse Fisher Information:

$$\hat \theta_{MLE} \xrightarrow {d} \mathcal {N} (\theta, I(\theta)^{-1})$$

Since we can calculate the Fisher Information analytically, we can use its inverse as a readily available estimate of the variance of the MLE, which is crucial for constructing [confidence intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval) and performing [hypothesis tests]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}).

### The Cramér-Rao Lower Bound (CRLB)

The most important application of Fisher Information is defining the Cramér-Rao Lower Bound. The CRLB states that for any unbiased estimator $\hat \theta$ of $\theta$, the variance of that estimator must be greater than or equal to the inverse of the Fisher Information:

$$Var(\hat \theta) \geq \frac{1}{I(\theta)}$$

The CRLB sets a theoretical minimum variance. No matter how clever an unbiased estimator you design, its precision can never exceed this limit. Estimators that achieve this minimum bound are called efficient estimators.

### Optimal Experimental Design

Fisher Information is used to design experiments or observational studies that maximize the precision of parameter estimates.

In a design problem, the Fisher Information often depends on the design variables (e.g., sample sizes, spacing of observation points). By choosing the design that maximizes $I(\theta)$, researchers ensure they collect data that is maximally informative about the parameters of interest, thereby minimizing the cost and effort required to achieve a target level of statistical precision.

### Statistical Tests

The Fisher Information matrix (the multidimensional generalization for multiple parameters) is integral to three major hypothesis tests:

* [Wald Test]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}#wald_test): Uses the estimated inverse Fisher Information matrix to calculate the standard error of the parameter estimates.

* Score Test: Uses the score function and the Fisher Information evaluated under the null hypothesis to test the significance of a parameter.

* [Likelihood Ratio Test]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}#likelihood_ratio): Although it doesn't explicitly use the Fisher Information in its calculation, its asymptotic properties and derivation are closely related to the concepts that lead to Fisher Information.