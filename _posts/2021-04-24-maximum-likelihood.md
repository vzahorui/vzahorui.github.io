---
layout: single
title: "Maximum likelihood estimation"
description: Explaining maximum likelihood for statistical inference
category: "Probability"
tags: probability-distribution statistical-inference likelihood-function goodness-of-fit MLE joint-probability log-likelihood
date: 2021-06-16
---

In statistics the likelihood function is used to estimate the goodness of fit of the parameters to the observed data. The maximum likelihood estimation (MLE) is a method which relies on the likelihood function in order to determine the set of parameters which fits best to the data from a sample.

## The concept of likelihood

In case of discrete distribution it is possible to measure the joint probability of the observed data given parameters of the population.

&nbsp;&nbsp;&nbsp;&nbsp;
$P(X=x \mid \theta)$

where $X$ is the population data, $x$ is the sample data, and $\theta$ is the set of parameters. The resulting value is also the likelihood of those parameters given the data.

&nbsp;&nbsp;&nbsp;&nbsp;
$\mathcal {L}(\theta \mid x)$

For example, when tossing a fair coin and getting two heads out of two experiments, the joint probability of this outcome will be 0.5 $\times$ 0.5, that is 0.25. At the same time the likelihood of the coin being fair (having probability of 0.5 for getting a head) is also 0.25 provided that there were two heads in two experiments.

&nbsp;&nbsp;&nbsp;&nbsp;
$P(HH \mid p=0.5) = \mathcal {L}(p=0.5 \mid HH) = 0.25$

For this dummy example we can also see that it would be likely for the coin to have probability of 1 of getting heads, since having this probability for a single experiment, getting 2 heads out of two has 100% chance of happening. Therefore the likelihood of $p$ being equal to 1 in this case is 1.

An important notion is that the term likelihood is ***not*** the same as the conditional probability of a certain set of parameters provided the data. Instead, it's a measure of the goodness of fit of the parameters to the data.

When dealing with continuously distributed variables, the probability of observing an exact value is equal to zero. Therefore instead of the probability of observing an exact value given the parameters, the probability density function is used.

&nbsp;&nbsp;&nbsp;&nbsp;
$f(x \mid \theta) = \mathcal {L}(\theta \mid x)$

One the whole, $\mathcal {L}(\theta \mid x)$ is the likelihood function of the joint density of observations from a sample, which depends on the vector of parameters $\theta$. Each observation is assumed to be independent, so the joint probability is calculated as a product of probability densities around values of each observation.

## Maximum likelihood estimation

When fitting parameters to the sample data the aim is to maximize the likelihood of the fit. In other words, the parameters should be estimated as such that make the observed values from the sample the most probable.

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat \theta = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\,\mathcal {L}_{n}(\theta \mid x)$

Maximization is done in the hyperspace of $\theta$, where the point of local maximum is found where the [gradient]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) with respect to all individual parameters is equal to zero. Since the maximum point in practice can rarely be found analytically, the search is done with iterative optimization techniques, such as [gradient descent]({{ site.baseurl }}{% link _posts/2019-10-15-gradient-descent.md %}) (or rather ascent) or [quasi-Newton methods]({{ site.baseurl }}{% link _posts/2020-07-29-quasi-newton-methods.md %}).

Since for obtaining the joint probability of observations the product of the PDF of each individual datapoint is used, for convenience log transformation of this product is used instead. The logarithm of the product equals the sum of logarithms of individual densities, so it makes computation of the derivative easier. Also since logarithmic functions are strictly increasing, maximizing the function is equivalent to maximizing its logarithm. This is why the term log-likelihood is commonly used in the context of MLE.

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat \theta = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\,\mathcal {L}_{n}(\theta \mid x) = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\, \prod_{i=1}^n f(x_{i} \mid \theta)$

&nbsp;&nbsp;&nbsp;&nbsp;
$\hat \theta = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\,\mathcal {L}_{n}(\theta \mid x) = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\, \prod_{i=1}^n f(x_{i} \mid \theta) = \underset{\theta \in \Theta}{\operatorname{arg\;max}}\, \sum_{i=1}^n \log f(x_{i} \mid \theta)$

## Likelihood ratio

This is just the ratio of two likelihoods built for the same sample data using different parameter sets.

&nbsp;&nbsp;&nbsp;&nbsp;
$\Lambda(\theta_{1}:\theta_{2} \mid x) = \frac{\mathcal {L}(\theta_{1}\mid x)}{\mathcal {L}(\theta_{2}\mid x)}$

The likelihood ratio is used as a test statistic when determining which set of parameters provides better fit to the data.
