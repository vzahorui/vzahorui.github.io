---
layout: single
title: "Bayesian inference"
category: "Probability"
tags: prior-probability Bayes-theorem likelihood-function maximum-likelihood-estimation MLE posteriror-probability conditional-probability
date: 2022-07-16
---

Bayesian inference is the method of statistical inference where an estimated probability is updated when new data arrives. In a way, it may be viewed as an upgrade of the [maximum likelihood estimation]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %})(MLE) when some prior knowledge of probability is taken into account. 

According to the Bayes' theorem the posterior probability is calculated like this:

&nbsp;&nbsp;&nbsp;&nbsp;
$P(\theta \mid X) = \frac{P(X \mid \theta) \cdot P(\theta)}{P(X)}$

Here $\theta$ stands for a hypothesis or a set of parameters according to a particular hypothesis, and $P(\theta)$ is the prior probability which is known before observing the data.<br>
$P(\theta \mid X)$ is the posterior probability of the hypothesis after observing the data $X$.<br>
$P(X \mid \theta)$ is the probbility of the data $X$ given the hypothesis $\theta$, in other words, the likelihood function.
$P(X)$ is the probability of observing the data regardless from any hypotheses.

The Bayes' theorem is derived from the notion of conditional probability. Let's say we have two events: $A$ and $B$. The conditional probability $P(A\mid B)$ can be intuitively understood as the fraction of probability of event $B$ which intersects with the probability of event $A$: $\frac{P(A\cap B)}{P(B)}$. 

Returning to the Bayes' theorem, both $P(\theta \mid X)$ and $P(X \mid \theta)$ can be expresed is a similar mannor using the intersecting probability. Then

&nbsp;&nbsp;&nbsp;&nbsp;
$P(\theta \mid X) \cdot P(X) = P(X \mid \theta) \cdot P(\theta)$

&nbsp;&nbsp;&nbsp;&nbsp;
$\frac{P(\theta \cap X)}{P(X)} \cdot P(X) = \frac{P(\theta \cap X)}{P(\theta)} \cdot P(\theta)$

which proves the original formula.

