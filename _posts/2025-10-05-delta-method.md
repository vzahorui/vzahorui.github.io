---
layout: single
title: "Delta Method"
category: "Probability & Statistics"
tags: taylor-series function variance non-linearity normal-distribution central-limit-theorem law-of-large-numbers convergence
date: 2025-12-08
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

## The Big Idea: Linearizing the Non-Linear

The Delta Method is a powerful analytical tool in [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}) used to find the approximate variance (or standard error) of a complicated, non-linear function of an estimator.

Imagine you have a reliable statistical estimate, $\hat \theta$, of a true population parameter, $\theta$. You also know the variance of this estimate, $Var(\hat \theta)$. 

**The Problem**: Now, suppose your real interest lies in a transformed version of $\hat \theta$, represented by a non-linear function $g(\hat \theta)$ (e.g., $g(\hat \theta)=\log(\hat \theta)$ or $g(\hat \theta)=\theta^2$). Calculating the exact variance, $Var(g(\hat \theta))$, is often analytically impossible because non-linear functions warp distributions.

**The Solution**: The Delta Method's solution is simple: It replaces the complicated non-linear function with a simple linear one by applying first-order [Taylor Approximation]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}). 

## Step 1: The Intuitive Approach (Taylor Approximation)

Recall that a [Taylor Series]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}) approximates a complex function near a known point with a tangent line. In our case, we approximate our transformed estimator $g(\hat \theta)$ near the true value $\theta$:

$$g(\hat \theta) \approx g(\theta) + g'(\theta) (\hat \theta−\theta)$$

In this approximation:

* $g(\theta)$ is the value of the function at the true (but unknown) parameter $\theta$.
* $g'(\theta)$ is the slope (the first derivative) of the function $g$ evaluated at the true value.
* $(\hat \theta − \theta)$ is the error of our estimate.

If we subtract $g(\theta)$ from both sides, we get an equation that links the error of the output directly to the error of the input:

$$g(\hat \theta) - g(\theta) \approx g'(\theta) \cdot (\hat \theta−\theta)$$

This equation reveals the core mechanism: the error in our new metric is simply the original error multiplied by the slope $g'(\theta)$.

Since variance is just the average squared error, we can easily apply the standard rules for the variance of a linear transformation: $Var(aX+b)=a^{2}Var(X)$.

* $g(\theta)$ is a constant, so its variance is 0.
* $g'(\theta)$ is a fixed slope (a constant multiplier).
* $\hat \theta−\theta$ has the same variance as $\hat \theta$ (since subtracting a constant doesn't change variance).

Applying the variance rules to the approximation yields the Delta Method formula for the approximate variance:

$$Var(g(\hat \theta)) \approx [g'(\theta)]^{2} \cdot Var(\hat \theta)$$

The approximate variance of the transformed statistic is the original variance, scaled by the square of the function's derivative (slope) evaluated at the true value.

* If the absolute value of the slope is small $(∣g′(\theta)∣<1)$, the transformation compresses the variability.
* If the slope is large $(∣g′(\theta)∣>1)$, the transformation stretches the variability.

## Step 2: The Formal Approach (Asymptotic Theory)

The derivation above is intuitive, but to use this for [Hypothesis Tests]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) or [Confidence Intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval), we need to prove that the resulting distribution is actually [Normal]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %}). This requires Asymptotic Theory (what happens as sample size $n$ approaches infinity).

### The Problem of Collapsing Variance

By the Law of Large Numbers, our estimator $\hat \theta_n$​ gets closer to $\theta$ as $n$ increases. Consequently, the error $(\hat \theta_{n}−\theta)$ shrinks to zero. We can see this clearly with the [sample mean]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#sample_mean_variance) $\bar X$. Its variance is:

$$\text{Var}(\bar X) = \frac{\sigma^2}{n}$$

As $n \rightarrow \infty$, the distribution collapses into a single point. A single point has no "shape," so we cannot calculate probabilities or confidence intervals.

### The Fix: Magnifying the Error

To study the shape of the distribution before it vanishes, we put it under a "microscope." We scale the error up by $\sqrt{n}$​.

* The variance shrinks by $\frac{1}{n}$​.
* Multiplying the error by $\sqrt{n}$​ scales the variance by $(\sqrt{n})^2 = n$.
* This perfectly cancels the shrinkage, stabilizing the distribution so it converges to a non-degenerate [Normal distribution]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %}).

### The Formal Statement

We assume our original estimator satisfies the [Central Limit Theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#central_limit). This theorem describes the distribution of the magnified error:

$$\sqrt{n}(\hat \theta_{n}−\theta) \xrightarrow {d} \mathcal {N} (0, \sigma^{2})$$

The Delta Method Theorem simply applies our linear approximation from Step 1 to this magnified error:

$$\sqrt{n}​(g(\hat \theta_n​)−g(\theta)) \xrightarrow {d} \mathcal {N} (0,[g'(\theta)]^2 \cdot \sigma^{2}​)$$

This confirms that the transformed error also follows a Normal distribution, with the variance scaled by the slope squared.

In practice we don't know the true value of $\theta$ but we do have a consistent estimator $\hat \theta$, and as the sample grows it coverges to $\theta$. Therefore, we can plug $\hat \theta$ in place of $\theta$ when we calculate the derivative. 

## Why is It Useful

Once we have established the asymptotic normality and found the approximate variance of the transformed statistic, we can move from theoretical approximation to practical inference:

* Calculate the Standard Error (SE): The SE is simply the square root of the final approximate variance.
* Construct [Confidence Intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval): Using the property of asymptotic normality, we can build large-sample confidence intervals for the transformed parameter $g(θ)$.
* Perform [Hypothesis Tests]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}): The approximate normal distribution allows us to calculate z-scores and p-values for transformed quantities.