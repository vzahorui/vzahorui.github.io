---
layout: single
title: "Cox Proportional Hazards Model"
category: "Survival Analysis"
tags: survival-analysis hazard-function log-likelihood partial-likelihood confidence-interval
date: 2025-10-06
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

While the [Kaplan–Meier estimator]({{ site.baseurl }}{% link _posts/2025-10-05-kaplan-meier-estimator.md %}) tells us how [survival probability]({{ site.baseurl }}{% link _posts/2025-10-01-survival-analysis.md %}) changes over time, it doesn’t explain why — it cannot handle predictors or covariates.

The Cox model answers that question by linking covariates (e.g., age, treatment, income) to the hazard rate, i.e., the instantaneous risk of the event occurring.

## The Model Structure

The hazard for individual $i$ with covariates $X_i = (X_{i1}, X_{i2}, ..., X_{im})$

$$h(t|X_i) = h_0(t)\exp(\beta_1 X_{i1} + \beta_2 X_{i2} + ... + \beta_n X_{im})$$

where:
* $h_0(t)$ is the baseline hazard function — unspecified (non-parametric).
* $\exp(\beta_j)$ is the multiplicative effect of covariate $X_j$ on the hazard.
* $\beta_j$ is the log-hazard ratio coefficient.

Each covariate $X_k$ multiplies the hazard by a fixed proportion $e^{\beta_k}$.

So, for example if $\beta_k = 0.7$, then one-unit increase in $X_k$ increases the hazard by $e^{0.7} \approx 2.01$ times. And if $\beta_k = -0.7$, for example, then the hazard is multiplied by $e^{-0.7} \approx 0.5$, so it's effectively halved.

Crucially, this increase/decrease is proportionate, not absolute — it scales the whole hazard curve up or down, keeping its shape over time identical.

The hazard ratio between two individuals $i$ and $j$ with covariate vectors $X_i$ and $X_j$ is:

$$\frac{h(t|X_i)}{h(t|X_j)} = \exp(\beta^{T} (X_i - X_j))$$

Notice how the baseline hazard function disappeared. Importantly, this ratio is independent of time, which is the assumption of proportional hazards model.  

## Partial Likelihood Estimation

Unlike parametric models, the Cox model doesn’t specify $h_0(t)$. Yet, we still want to estimate the regression coefficients $\beta$ the effect of covariates on the hazard. The partial likelihood cleverly eliminates $h_0(t)$ by conditioning on the set of individuals who are at risk when an event occurs.

If the ordered event times are $t_{(1)}, t_{(2)}, ..., t_{(n)}$, and $R(t_{(k)})$ is the risk set (subjects still under observation just before $t_{(k)}$), the partial likelihood is:

$$L(\beta) = \prod_{k=1}^n \frac{\exp(\beta^T X_{(k)})}{\sum_{j \in R(t_{(k)})} \exp(\beta^T X_{j})}$$

Taking logs gives the partial log-likelihood, which is [maximized]({{ site.baseurl }}{% link _posts/2021-04-24-maximum-likelihood.md %}) to estimate $\hat \beta$. 

This method automatically accounts for right-censoring, because censored individuals remain in the risk sets up to their censoring time.

## Interpretation of Hazard Ratio

Each coefficient $\beta_j$ corresponds to a log hazard ratio:

$$HR_j = \exp(\beta_j)$$

$$\ln HR_j = \beta_j$$

* $HR_j > 1$: higher risk of the event.
* $HR_j < 1$: protective (lower risk).
* $HR_j = 1$: no effect.

[Confidence intervals]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#confidence_interval) for $HR_j$ are constructed as:

$$\exp(\beta_j \pm z_{\alpha/2 \text{SE}(\beta_j)})$$

## Extensions of the Cox Model

### Stratified Cox Model

Used when the baseline hazard differs across subgroups (e.g., men vs. women), but covariate effects are assumed common.

$$h(t|X, \text{stratum}=s) = h_{0s}(t)\exp(\beta^T X)$$

Each stratum has its own $h_{0s}(t)$, but a shared $\beta$. This allows the shape and level of the hazard over time to differ across groups — while keeping the same multiplicative effect of covariates on the hazard within each stratum.

Partial likelihood is constructed is constructed per stratum, and then multiplied together:

$$L(\beta) = \prod_{s=1}^S \prod_{k=1}^n \frac{\exp(\beta^T X_{(k)})}{\sum_{j \in R(t_{(k)})} \exp(\beta^T X_{j})}$$

### Time-Dependent Covariates

Some covariates change over time — e.g., blood pressure, medication status.
These are modeled as $X_i (t)$:

$$h(t|X_i (t)) = h_{0}(t)\exp(\beta^T X)$$

This allows modeling dynamic effects such as the impact of treatment after initiation.

### Non-Proportional Hazards and Interactions

If the proportionality assumption fails, interactions with time can be added:

$$h(t|X_i (t)) = h_{0}(t)\exp(\beta_1 X + \beta_2 X \cdot g(t))$$

where $g(t)$  might be $\log t$, $t$, or a spline term, allowing covariate effects to vary over time.
