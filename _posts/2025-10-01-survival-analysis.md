---
layout: single
title: "Survival Analysis"
category: "Survival Analysis"
tags: statistics probability censoring Kaplan-Meier-Estimator density-function cumulative-distribution-function survival-function hazard-function life-table
date: 2025-10-06
toc: true
toc_label: "Table of Contents"
toc_icon: "book-reader"
toc_sticky: true
toc_min_level: 2
toc_max_level: 3
---

Survival Analysis, also known as Time-to-Event Analysis, is a specialized branch of [statistics]({{ site.baseurl }}{% link _posts/2025-08-18-probability-statistics.md %}) focused on analyzing the time until an event of interest occurs. 

While it originated in medical research — modeling how long patients survive after treatment — today it spans a wide range of applications:

* Medicine: Time until disease recurrence or recovery.
* Engineering: Time until component failure.
* Economics: Duration of unemployment.
* Finance and Business: Time until customer churn or loan default.

What distinguishes survival analysis from ordinary regression is its explicit treatment of censoring — the fact that for many observations, the exact event time is not fully observed.

## Key Concepts in Survival Analysis

Three fundamental elements define any survival problem:

1. The Event (Failure or Hazard)

The event is the outcome of interest—the "failure" being studied. It must be clearly defined. Despite the common terminology, the event not necessarily should mean something bad. 

* In Medicine: Death, recurrence of disease, recovery.
* In Engineering: Failure of a component, equipment breakdown.
* In Business: Customer canceling a subscription, default on a loan.

2. The Time Variable

This is the duration from a defined starting point (e.g., date of treatment, product installation, purchase date) until the event occurs. Time is always positive and continuous.

Crucially, in experiments involving multiple subjects, while they may have vastly different absolute start times (e.g., different calendar dates of enrollment), the analysis normalizes them. The clock is effectively reset for each subject, and the variable used in the models is the relative duration (time elapsed) from their individual starting point to the event. This ensures that the focus remains solely on the duration of survival or exposure, rather than the calendar date.

3. Censoring: The Unique Challenge

Censoring occurs when we do not observe the event for a subject during the study period. This is the central mathematical challenge in survival analysis, as standard methods cannot simply ignore or discard these incomplete observations.

The most common type is Right Censoring:

* Loss to Follow-up: A patient leaves the study before the event occurs.
* Study Termination: The study concludes before the event occurs for some subjects.

For a Right-censored observation, we know the event time is greater than the recorded observation time ($T$>$t$), but we don't know the exact time of failure. Survival analysis methods are specifically designed to incorporate this partial information.

On the contrary, Left-censoring occurs when we know that the event time is less than the recorded observation time ($T$<$t$).

There is also a type of censoring known as Interval censoring where we know that the event time is between two values.

### Truncation in the Data

While censoring deals with incomplete event times within the study duration, truncation deals with bias in the selection of subjects for the study itself. A truncated observation is one where the subject is only included in the analysis if their observed event time $T$ falls within a specified window.

The most common form is Left Truncation:

A subject is only observed (and enters the risk set) if their event has not yet occurred by a certain time $L$ (the entry time). In other words, for a subject to be included, their true event time $T$ must be greater than their time of entry $L$ ($T \geq L$).

**Example**: Studying the progression of a chronic disease where the disease onset occurred 10 years ago. A subject is only recruited if they have survived for at least 10 years. If a person died 5 years after the disease onset, they would be "left truncated" from the study, leading to a sample that inherently appears healthier (has longer survival times) than the true population.

Survival analysis models must explicitly account for truncation to prevent biased estimation of the survival function and hazard rates.

## Core Mathematical Functions

Survival analysis is built around several core functions that describe the probabilistic behavior of the time-to-event variable $T$.

The relationships described below are fundamental: knowing any one of $S(t)$, $h(t)$, $f(t)$ allows you to compute the others.

### The Survival Function

$$S(t)=P(T>t)$$

It gives the probability that the event has not yet occurred by time $t$.

$S(t)$ is always monotonically decreasing, starting at $S(0)=1$ (everyone survives at time zero) and approaching 0 as $t \rightarrow \infty$.

### The Density Function

The event time also has a [probability density function (PDF)]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}), $f(t)$, which represents the probability density of the event occurring at time $t$.

$$f(t) = \lim_{\Delta t \rightarrow 0} \frac{P(t \leq T < t + \Delta t)}{\Delta t}$$

**Connection to the Survival Function**: The slope of a survival function is always negative; a steeper negative slope means a faster decrease in survival and thus a higher probability density of the event. Therefore, the density function can be expressed as the negative [derivative]({{ site.baseurl }}{% link _posts/2019-09-14-derivatives.md %}) of the survival function with respect to time.

$$f(t) = - \frac{dS(t)}{dt} = \frac{d}{dt}(1-S(t))$$

The Cumulative Distribution Function (CDF), $F(t)$, is the complement of the survival function. It represents the probability that the event has occurred by time $t$ ($P(T \leq t)$) and can be obtained by [integrating]({{ site.baseurl }}{% link _posts/2019-09-24-integrals.md %}) the density function from 0 to $t$.

$$F(t) = \int_0^t f(t) = \int_0^t \frac{d}{dt}(1-S(t)) = 1 - S(t)$$

### The Hazard Function

The hazard function, $h(t)$, is the instantaneous rate of the event occurring at time $t$, given that the individual has survived up to time $t$.

$$h(t)= \lim_{\Delta t \rightarrow 0} \frac{P(t < T \leq t + \Delta t| T > t)}{\Delta t}​$$

The hazard function can increase, decrease, or remain constant over time, reflecting how the risk changes (e.g., risk of infant mortality decreases over time, while risk of many chronic diseases increases with age).

The hazard function is an instantaneous rate based on a conditional probability. By definition $P(A \mid B)=\frac{P(A\cap B)}{P(B)}​$. We can view $A$ as the event occurring in the small interval $[t, t+\Delta t)$ and $B$ as survival up to $t$. $P(A\cap B)$ is $P(A)$, as $A$ implies $B$ (you must survive to time $t$ to have the event at time $t$).

This simplifies to:

$$h(t) = \frac{f(t)}{S(t)}$$

Furthermore, since $f(t) = -S'(t)$, we can see that:

$$h(t) = \frac{-S'(t)}{S(t)} = -\frac{d}{dt}\ln S(t)$$

By integrating both sides, we can express the cumulative hazard function, $H(t)$:

$$H(t) = \int_0^t h(u) du= - [ \ln S(t) - \ln S(0) ] = - \ln S(t)$$

Therefore, if you know one of these functions, you can derive the others. For example, $S(t) = e^{-H(t)}$.

## Classes of Models in Survival Analysis

Different estimators model $S(t)$ and $h(t)$ with different levels of structure.

|Approach | Parametric Assumption | Typical Use| Example model|
|:---:|:---:|:---:|:---:|
|Non-Parametric|No assumption on $S(t)$ and $h(t)$|Exploratory, baseline estimation|[Kaplan-Meier Estimator]({{ site.baseurl }}{% link _posts/2025-10-05-kaplan-meier-estimator.md %})|
|Semi-Parametric|Functional form for covariate effects, but $h_0(t)$ is free|Regression analysis of risk factors|[Cox Proportional Hazards Model]({{ site.baseurl }}{% link _posts/2025-10-06-cox-proportional-hazards.md %})|
|Parametric|Fully specified distribution (Exponential, Weibull, Log-Logistic, etc.)|Forecasting, reliability, extrapolation|[Parametric Survival Models]({{ site.baseurl }}{% link _posts/2025-10-06-parametric-survival-models.md %})|

Typically, you build a [Kaplan-Meier Estimator]({{ site.baseurl }}{% link _posts/2025-10-05-kaplan-meier-estimator.md %}) for exploratory analysis. However, for regression analysis, such as determining the impact of different variables on the survival rate and expected useful life, you will have to build either a semi-parametric [Cox Model]({{ site.baseurl }}{% link _posts/2025-10-06-cox-proportional-hazards.md %}) or a [fully parametric one]({{ site.baseurl }}{% link _posts/2025-10-06-parametric-survival-models.md %}). The latter is better if you need to forecast beyond the observable time period.

[Tree-based models]({{ site.baseurl }}{% link _posts/2023-03-28-tree-like-algorithms.md %}) such as random forest and gradient boosting can also be applied for regression analysis. They typically outperform in terms of predictive accuracy within the observable time period because they can capture non-linear relationships and interactions between variables. However, they are not suited for forecasting beyond the observable time window and do not provide the same level of coefficient interpretability.

### The Life Tables

The Life Table, or Actuarial Method, is an early non-parametric technique based on grouped intervals (e.g., ages, 5-year windows). It summarizes survival in discrete steps rather than at exact event times.

Typical columns include:

|Symbol|Meaning|Formula|
|:---:|:---:|:---:|
|$P_x$|Number at risk at stage $x$|—|
|$D_x$|Deaths between $x$ and $x+1$|—|
|$q_x$|Probability of dying between $x$ and $x+1$|$D_x/P_x$|
|$p_x$|Probability of surviving one interval|$1-q_x$|
|$l_x$|Hypothetical survivors at age $x$|$l_0 \prod_{i<x}p_i$|
|$d_x$|Hypothetical deaths at age $x$|$l_x - l_{x+1}$|

It is still widely used in demography, insurance, and actuarial science.
