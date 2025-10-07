---
layout: single
title: "Survival Analysis"
category: "Probability & Statistics"
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

A subject is only observed (and enters the risk set) if their event has not yet occurred by a certain time $L$ (the entry time). In other words, for a subject to be included, their true event time $T$ must be greater than their time of entry L ($T \geq L$).

**Example**: Studying the progression of a chronic disease where the disease onset occurred 10 years ago. A subject is only recruited if they have survived for at least 10 years. If a person died 5 years after the disease onset, they would be "left truncated" from the study, leading to a sample that inherently appears healthier (has longer survival times) than the true population.

Survival analysis models must explicitly account for truncation to prevent biased estimation of the survival function and hazard rates.

## Core Mathematical Functions

Survival analysis is built around two core functions that describe the probabilistic behavior of the time-to-event variable $T$.

The relationships described below are fundamental: knowing any one of $S(t)$, $h(t)$, $f(t)$ allows you to compute the others.

### The Survival Function

$$S(t)=P(T>t)$$

It gives the probability that the event has not yet occurred by time $t$.

$S(t)$ is always monotonically decreasing, starting at $S(0)=1$ (everyone survives at time zero) and approaching 0 as $t \rightarrow \infty$.

Intuitively, it’s a cumulative complement of the distribution function $F(t)=P(T=\leq t)$.

$$S(t) = 1 - F(t)$$

### The Hazard Function

$$h(t)= \lim_{\Delta t \rightarrow 0} \frac{P(t < T \leq t + \Delta t| T > t)}{\Delta t}​$$

This is the instantaneous failure rate — the risk of the event occurring at time $t$, given that it has not occurred before.

The hazard function can increase, decrease, or remain constant over time, reflecting how the risk changes (e.g., risk of infant mortality decreases over time, while risk of chronic disease increases with age).

It connects to the survival function through:

$$S(t) = \exp(-\int_0^t h(u) du)$$

and conversely,

$$h(t) = - \frac{d}{dt} \ln S(t)$$

### The Density Function

The event time also has a probability density:

$$f(t) = - \frac{dS(t)}{dt} = h(t)S(t)$$

This expresses the intuitive link. Namely, the probability of failure at time $t$ equals the chance of surviving up to $t$, times the instantaneous risk of failure then.

## Classes of Models in Survival Analysis

Different estimators model $S(t)$ and $h(t)$ with different levels of structure.

|Approach | Parametric Assumption | Typical Use| Example model|
|:---:|:---:|:---:|:---:|
|Non-Parametric|No assumption on $S(t)$ and $h(t)$|Exploratory, baseline estimation|[Kaplan-Meier Estimator]({{ site.baseurl }}{% link _posts/2025-10-05-kaplan-meier-estimator.md %})|
|Semi-Parametric|Functional form for covariate effects, but $h_0(t)$ is free|Regression analysis of risk factors|[Cox Proportional Hazards Model]({{ site.baseurl }}{% link _posts/2025-10-06-cox-proportional-hazards.md %})|
|Parametric|Fully specified distribution (Exponential, Weibull, Log-Logistic, etc.)|Forecasting, reliability, extrapolation|[Parametric Survival Models]({{ site.baseurl }}{% link _posts/2025-10-06-parametric-survival-models.md %})|

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
