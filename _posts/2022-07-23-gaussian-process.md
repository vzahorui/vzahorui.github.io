---
layout: single
title: "Gaussian process"
category: "Regression"
tags: normal-distribution gaussian-distribution covariance PDF probability-density-function conditional-probability
date: 2022-07-28
---

The Gaussian process is a prediction technique which mainly solves regression problems by fitting a line to some given data (although it may be extended for classification and clustering problems as well).

In the essence the Gaussian process takes an infinite number of all possible regression estimations, and using the [normal distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) it assigns probability to each of them. Then, the mean value and the standard deviation of in the space of those estimations can be used for making predictions and building the confidence intervals.

<div id='multivariate_gaussian_distribution'/>
## Multivariate Gaussian distribution

The [Gaussian distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#normal_distribution) is a core element upon which the whole idea of the Gaussian process is built.

Let's take a look at two-dimensional examples of the Gaussian distribution with the mean at the origin and variance of 1 along each of the dimensions:

![](/assets/images/distributions/2d_gaussian_distribution.png){: .align-center}

On the left-hand side the [covariance]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) is 0, which means that both dimensions are independent. So for example if an observation is spotted with a value greater than the mean along $X_1$ (like $X_1$ = 1.1 on the plot above) it has equal chances of being higher or lower than the mean along $X_2$.

On the contrary, if there is some non-zero covariance between two dimensions, then the distribution is no longer centered around the origin. As we see on the right-hand side of the charts above, the covariance is a positive number. So at $X_1$ = 1.1, which is greater than the mean along $X_1$, it is more likely that its value along $X_2$ is also greater than its corresponding mean.

All things considered, it makes sense to operate in terms of conditional probability, where the expected values of one variable (in our case $X_2$) depends on the observed value of another ($X_1$ in our example). Here is a neat mathematical property: if one normally distributed variable is conditioned on another normally distributed variable, then the resulting conditional distribution is also normal. On the visualization above we can see a familiar bell-shaped curve where a plane ($X_1$ = 1.1) slices through a bivariate normal distribution. This curve exactly defines the probability density function of the conditional distribution here.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

## Conditional distribution properties

Suppose there is a set of variables which is split into two parts: $X$ and $Y$. Either of them may be a single dimension or a vector containing multiple dimensions. Assuming that both $X$ and $Y$ are normally distributed, it is possible to calculate the conditional mean and the conditional covariance matrix. As stated above, the resulting conditional distribution will be also Gaussian.

$$
\left(\begin{array}{c}X\\ 
Y \end{array}\right) \sim N \left(\left(\begin{array}{c}\mu_X\\ 
\mu_Y \end{array}\right), \left(\begin{array}{cc} \Sigma_{XX} & \Sigma_{XY} \\ 
\Sigma_{YX} & \Sigma_{YY} \end{array}\right)\right)
$$
