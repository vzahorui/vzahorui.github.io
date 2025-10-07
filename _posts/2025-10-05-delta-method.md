---
layout: single
title: "Delta Method"
category: "Probability & Statistics"
tags: taylor-series function variance non-linearity normal-distribution central-limit-theorem law-of-large-numbers convergence
date: 2025-10-05
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

## The Big Idea: Linearizing the Non-Linear

The Delta Method is a powerful analytical tool in [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}) that allows us to find the approximate variance (or standard error) of a complicated, non-linear function of an estimator.

Imagine you have a reliable statistical estimate, $\hat \theta$, of a true population parameter, $\theta$. You also know the variance of this estimate, $Var(\hat \theta)$.

Now, suppose your real interest lies in a transformed version of $\hat \theta$, represented by a non-linear function $g(\hat \theta)$ (e.g., $g(\hat \theta)=\log(\hat \theta)$ or $g(\hat \theta)=\theta^2$). Calculating the exact variance, $Var(g(\hat \theta))$, is often analytically impossible or very difficult due to the non-linear nature of $g$.

The Delta Method's solution is simple: It replaces the complicated non-linear function with a simple linear one.

## How it Works: The First-Order Taylor Approximation

The method's foundation is the first-order [Taylor Series]({{ site.baseurl }}{% link _posts/2020-05-08-taylor-series.md %}) approximation from calculus. This technique allows us to approximate a complex function $g(\hat \theta)$ near a known point $\theta$ with a tangent line:

$$g(\hat \theta) \approx g(\theta) + g'(\theta) (\hat \theta−\theta)$$

In this approximation:

* $g(\theta)$ is the value of the function at the true (but unknown) parameter $\theta$.
* $g′(\theta)$ is the slope (the first derivative) of the function $g$ evaluated at $\theta$.
* $(\hat \theta − \theta)$ is the error, or the difference between our estimate and the true value.

Since the right side is a linear expression, we can easily apply the standard rules for the variance of a linear transformation: $Var(aX+b)=a^{2}Var(X)$.

* $g(\theta)$ is a constant, so its variance is 0.
* $g'(\theta)$ is a fixed slope (a constant, $a$).
* $\hat \theta−\theta$ has the same variance as $\hat \theta$ (since subtracting a constant doesn't change variance).

Applying the variance rules to the approximation yields the Delta Method formula for the approximate variance:

$$Var(g(\hat \theta)) \approx [g'(\theta)]^{2} \cdot Var(\hat \theta)$$

The approximate variance of the transformed statistic is the original variance, scaled by the square of the function's derivative (slope) evaluated at the true value.

* Slope effect: If the absolute value of the slope is small $(∣g′(\theta)∣<1)$, the transformation compresses the estimate's variability, resulting in a smaller approximate variance. If the slope is large $(∣g′(\theta)∣>1)$, the variability is stretched, resulting in a larger approximate variance.

## Asymptotic Theory and the Role of $\sqrt{n}$

The Delta Method is most powerful when viewed through the lens of asymptotic theory (the behavior of statistics as the sample size $n$ approaches infinity).

### The Problem of Collapsing Variance

By the Law of Large Numbers, the difference between the estimate and the true value, $(\hat \theta − \theta)$, must converge to 0 as $n \rightarrow \infty$. This means the variance also collapses to 0. An estimate that always converges to a single point is useless for statistical inference (like creating confidence intervals).

To prevent this "collapse" and derive a meaningful, non-degenerate distribution, statisticians use a normalizing factor, which is where $\sqrt{n}$​ comes in.

The scaling factor $\sqrt{n}$ counteracts the $\frac{1}{n}$​ decrease in variance that is typical for sample means (whose variance is $\frac{\sigma^2}{n}$​) and other common estimators. By multiplying by $\sqrt{n}$​, we "magnify" the difference just enough to keep the variance from disappearing, allowing the distribution to converge to a non-degenerate, finite distribution (the [Normal distribution]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %})). The constant $\sqrt{n}$ gets squared so it cancels out with the denominator $n$ of the estimate.

### Application of $\sqrt{n}$ in the Delta Method

The method is typically applied to estimators that are root-n consistent, meaning their normalized error converges to a normal distribution, usually based on the [Central Limit Theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#central_limit) (CLT):

$$\sqrt{n} (\hat \theta_n - \theta) \xrightarrow {d} \mathcal {N} (0, Var)$$

where $Var$ is the asymptotic variance of $\hat \theta_n$

The Delta Method theorem formally proves that if the original estimator $\hat \theta_n$​ has this property, the transformed estimator $g(\hat \theta_n$) will also be asymptotically normal:

$$n​(g(\hat \theta_n​)−g(\theta)) \xrightarrow {d} \mathcal {N} (0,[g′(\theta)]^2⋅Var​)$$

In practice we don't know the true value of $\theta$ but we do have a consistent estimator $\hat \theta$, and as the sample grows it coverges to $\theta$. In practice, we can plug $\hat \theta$ in place of $\theta$ when we calculate the derivative. 

## Why is It Useful

Once we have established the asymptotic normality and found the approximate variance of the transformed statistic, we can move from theoretical approximation to practical inference:

* Calculate the Standard Error (SE): The SE is simply the square root of the final approximate variance.
* Construct [Confidence Intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval): Using the property of asymptotic normality, we can build large-sample confidence intervals for the transformed parameter $g(θ)$.
* Perform [Hypothesis Tests]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}): The approximate normal distribution allows us to calculate z-scores and p-values for transformed quantities.