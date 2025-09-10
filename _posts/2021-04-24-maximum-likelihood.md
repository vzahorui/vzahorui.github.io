---
layout: single
title: "Maximum Likelihood Estimation"
description: Explaining maximum likelihood for statistical inference
category: "Probability & Statistics"
tags: probability-distribution statistical-inference likelihood-function goodness-of-fit MLE joint-probability log-likelihood likelihood-ratio likelihood-ratio-test Wald-test Wald-statistic chi-squre-distribution Lagrange-multiplier-test score-test
date: 2025-09-10
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

In [statistical inference]({{ site.baseurl }}{% link _posts/2025-09-01-statistical-inference.md %}), the likelihood function is used to estimate the goodness of fit of the parameters to the observed data. The maximum likelihood estimation (MLE) is a method which relies on the likelihood function in order to determine the set of parameters which fits best to the data from a sample.

<div id='concept_likelihood'/>
## The Concept of Likelihood

In case of discrete [distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) it is possible to measure the joint probability of the observed data given parameters of the population.

$$P(X=x \mid \theta)$$

where $X$ is the population data, $x$ is the sample data, and $\theta$ is the set of parameters. The resulting value is also the likelihood of those parameters given the data.

$$\mathcal {L}(\theta \mid x)$$

For example, when tossing a fair coin and getting two heads out of two experiments, the joint probability of this outcome will be 0.5 $\times$ 0.5, that is 0.25. At the same time the likelihood of the coin being fair (having probability of 0.5 for getting a head) is also 0.25 provided that there were two heads in two experiments.

$$P(HH \mid p=0.5) = \mathcal {L}(p=0.5 \mid HH) = 0.25$$

For this simple example, if we were to calculate probability of obtaining heads using the observed data, we will get 1.
Having this probability for a single experiment, getting 2 heads out of two has 100% chance of happening. Therefore the likelihood of $p$ being equal to 1 in this case is 1.

An important notion is that the term likelihood is ***not*** the same as the conditional probability of a certain set of parameters provided the data. Instead, it's a measure of the goodness of fit of the parameters to the data.

When dealing with continuously distributed variables, the probability of observing an exact value is equal to zero. Therefore instead of the probability of observing an exact value given the parameters, the probability density function is used.

$$f(x \mid \theta) = \mathcal {L}(\theta \mid x)$$

For a sample of independent observations $\mathcal {L}(\theta \mid x)$ is the likelihood function of the joint probability of observations, which in case of a continuous variable is a product of [probability density functions]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}) around values of each observation.

$$\mathcal {L}(\theta \mid x) = \prod_{i=1}^n f(x_{i} \mid \theta)$$

In a general senese the likelihood function depends on the vector of parameters $\theta$.

<div id='mle'/>
## Maximum Likelihood Estimation

When fitting parameters to the sample data the aim is to maximize the likelihood of the fit. In other words, the parameters should be estimated as such that make the observed values from the sample the most probable.

$$\hat \theta = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\,\mathcal {L}_{n}(\theta \mid x)$$

Maximization is done in the hyperspace of $\theta$, where the point of local maximum is found where the [gradient]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) with respect to all individual parameters is equal to zero. Since the maximum point in practice can rarely be found analytically, the search is done with iterative optimization techniques, such as [gradient descent]({{ site.baseurl }}{% link _posts/2019-10-15-gradient-descent.md %}) (or rather ascent) or [quasi-Newton methods]({{ site.baseurl }}{% link _posts/2020-07-29-quasi-newton-methods.md %}).

Since for obtaining the joint probability of observations the product of the PDF of each individual datapoint is used, for convenience log transformation of this product is used instead. The logarithm of the product equals the sum of logarithms of individual densities, so it makes computation of the derivative easier. Also because logarithmic functions are strictly increasing, maximizing the function is equivalent to maximizing its logarithm. This is why the term log-likelihood is commonly used in the context of MLE.

$$\hat \theta = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\, \prod_{i=1}^n f(x_{i} \mid \theta) = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\, \sum_{i=1}^n \ln f(x_{i} \mid \theta)$$

<div id='likelihood_tests'/>
## Likelihood Tests

There are practical situations when we might need to decide whether to include or not an additional set of parameters in a model. Introduction of new variables may improve the goodness of fit but this is not always the case. Nevertheless, if a simpler model performs no worse than a more complex one, then the former one is preferred.

Likelihood tests are meant to answer the question whether a model performs worse without a certain set of parameters, by making the use of [statistical significance]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}). Below is an overview of some of the well-known tests.

<div id='likelihood_ratio'/>
### Likelihood Ratio Test (LRT)

This test is based on the likelihood ratio, which is the ratio of two likelihoods built for the same sample data but using different parameter sets.

$$\Lambda(\theta_{1}:\theta_{2} \mid x) = \frac{\mathcal {L}(\theta_{1}\mid x)}{\mathcal {L}(\theta_{2}\mid x)}$$

The resulting value should be between 0 and 1. By taking the logarithm of it and multiplying by -2 it also becomes asymptotically equivalent to a [chi-square distributed]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) variable with the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) equal to the number of omitted variables in the simpler model.

$$\Lambda_{LR} = -2 \ln \left( \frac{\mathcal {L}(\theta_{1}\mid x)}{\mathcal {L}(\theta_{2}\mid x)} \right)$$

Which is also equivalent to this:

$$2(\ln(\mathcal {L}(\theta_{2}\mid x)) - \ln(\mathcal {L}(\theta_{1}\mid x)))$$

Then for a given significance level the likelihood ratio statistic is compared with the critical value of chi-square distribution. If the calculated statistic is bigger than the critical value, then the resulting $p$-value is smaller than the significance level, which means that the null hypothesis of no significant difference in the models should be rejected.

<div id='wald_test'/>
### Wald Test

Here the idea is to test some of the parameters whether they are simultaneously equal to zero. If they are, then it could be a reason to remove them from the model. If the null hypothesis is rejected then the model with all parameters included is considered to be significantly better.

This test is actually an approximation of the likelihood ratio test, and it is also based on [chi-square distribution]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) with the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) equal to the number of tested parameters.

First let's take a look at the statistic with only one parameter.

$$W = \frac{(\hat \theta - \theta_0)^2}{Var(\hat \theta)}$$

where $\hat \theta$ is the maximum likelihood estimate of the parameter, and $\theta_0$ is some hypothesized value of the parameter, usually zero.

This statistic is chi-square distributed with one degree of freedom, and by taking is squre root - it becomes the $z$-score of [normal distribution]({{ site.baseurl }}{% link _posts/2025-08-23-normal-distribution.md %}).

In the general case with more than one parameter the expression above is expanded to look like this:

$$W = (\hat \theta - \theta_0)^T Var(\hat \theta)^{-1} (\hat \theta - \theta_0)$$

where $\hat \theta$ and $\theta_0$ become vectors of parameters.

<div id='lagrange_multiplier'/>
### Lagrange Multiplier Test 

Sometimes known as the score test, this is yet another approximation of the likelihood ratio test. In this test the term "score" means the [gradient]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) of the likelihood function with respect to the parameters. In case of the likelihood function the point where the derivative is equal to zero corresponds to the critical point of the function - namely its maximum. So at the point of the maximum likelihood estimation the gradient should be equal to zero.

The Lagrange multiplier test assesses a hypothetical set of parameters as to whether it produces the zero gradient of the likelihood function. Here is an example of the statistic for a case of a model with one parameter value:

$$LM = \frac{U(\theta_0)^2}{Var(\theta_0)}$$

where $\theta_0$ is the hypothesized parameter value, and $U(\theta_0)$ is the derivative of the likelihood function with respect to the parameter.

The test statistic is approximately [chi-square distributed]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) with the number of [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) equal to the number of parameters which are tested to be zero. As we can see the mechanism of the test is quite similar to that of the Wald test but instead of testing the coefficients being equal to zero, the gradient of the likelihood is tested.

The formula to the general case of multiple parameters takes the following form:

$$LM = U(\theta_0)^T Var(\theta_0)^{-1} U(\theta_0)$$

### Choosing the Right Likelihood Test

When deciding which test to use, it's helpful to understand that all three are asymptotically equivalent; with a very large sample size, they will give the same result. The choice between them often comes down to computational convenience and statistical power.

In practice, the Likelihood Ratio Test is the preferred choice for its superior statistical properties, and it is the test you will most often encounter in statistical software. The other two tests are primarily used when computational constraints make the LRT impractical.