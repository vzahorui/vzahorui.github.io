---
layout: single
title: "Time series stationarity tests"
category: "Time series"
date: 2019-07-12
---
It is known that in order to make predictions with any time-series it needs to be stationarized. Below I will describe common methods of determining if the time series is stationary.
## Dickey-Fuller test
Given test may be applicable only to AR(1) process which has the following equation: <br>

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t = \alpha + \rho y_{t-1} + \varepsilon_t$

Under the Null Hypothesis times series is non-stationary, namely the time series represents *__random walk__*. Here we test whether $\rho$ equals to 1. <br>

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \rho = 1$ <br>
&nbsp;&nbsp;&nbsp;&nbsp;
$H_1: \rho < 1$

If $\alpha$ equals to 0 then we have random walk without drift. If $\alpha$ not equal to 0 then it is random walk with drift. If we reject the Null Hypothesis then we have not enough evidence to conclude that time series is non-stationary.<br>
We cannot simply test if $\rho$ equals to 1 because both $y_t$ and $y_{t-1}$ under the Null Hypothesis are non-stationary. Thus we need to test the difference $y_t - y_{t-1}$. We get the following equation:<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$\Delta y = \alpha + \beta y_{t-1} + \varepsilon_t$,
where $\beta = \rho - 1$<br>

Under the Null Hypothesis $\beta$ equals to 0 and thus $\beta y_{t-1}$ from the last equation equals to 0 as well. Henceforth, we have equation where only one variable ($\Delta y$) is non-stationary. From here our goal is to test whether $\beta$ equals to 0. <br>

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \beta = 0$ <br>
&nbsp;&nbsp;&nbsp;&nbsp;
$H_1: \beta < 0$

Having time series we estimate from its values parameter $\beta$. Then we test if it equals to 0 by comparing its $t$-statistic with critical value for a given significance level. If the calculated $t$-statistic is less than the critical value under the given level of significance then the Null Hypothesis is to be rejected. Hence we fail to conclude that the time series is non-stationary.<br>
<br>
Since the test is done over the residual term rather than raw data, it is not possible to use standard $t$-distribution to provide critical values. Therefore, specific distribution, known as Dickey–Fuller table is used.<br>
<br>
The Dickey–Fuller statistic, used in the test, is a negative number. The more negative it is, the stronger the rejection of the hypothesis that there is a unit root at some level of confidence.<br>
<br>
There are three main versions of the test:

1. Test for a unit root:<br>
$\Delta y_{t}$ = $\beta y_{t-1}$ + $\varepsilon_t$
2. Test for a unit root with drift:<br>
$\Delta y_{t}$ = $\alpha$ + $\beta y_{t-1}$ + $\varepsilon_t$
3. Test for a unit root with drift and deterministic time trend:<br>
$\Delta y_{t}$ = $\alpha$ + $bt$ + $\beta y_{t-1}$ + $\varepsilon_t$

Each version of the test has its own critical value which depends on the size of the sample.
## Augmented Dickey-Fuller (ADF) test
The testing procedure for the ADF test is the same as for the Dickey–Fuller test but it is applied to the model:<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$\Delta y_{t}$ = $\alpha$ + $bt$ + $\gamma y_{t-1}$ + $\delta_1 \Delta y_{t-1}$ + ... + $\delta_{p-1} \Delta y_{t-p+1}$ + $\varepsilon_t$,<br>
where $p$ is the order of lag used in the AR process.

According to the Null Hypothesis, $\gamma$ equals to 0. <br>
<br>
By including lags of the order $p$ the ADF formulation allows for higher-order autoregressive processes. This means that the lag length $p$ has to be determined when applying the test. One possible approach is to test down from high orders and examine the $t$-values on coefficients $\delta_i$.

## Kwiatkowski-Phillips-Schmidt-Shin (KPSS) test

In KPSS test a time series is expressed as the sum of deterministic trend, random walk, and stationary error:<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t$ = $\alpha$ + $\rho y_{t-1}$ + $\varepsilon_t$

Under the Null Hypothesis a time series is trend stationary, that is its random walk variance equals to 0.<br>
