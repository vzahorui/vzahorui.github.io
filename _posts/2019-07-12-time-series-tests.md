---
layout: single
title: "Time series stationarity tests"
category: "Time series"
tags: stationarity hypothesis-testing autocorrelation Durbin–Watson-test Durbin–Watson-statistic residuals white-noise error-term Breusch–Godfrey-test hypothesis-testing
date: 2021-07-08
---

## In this article
* [Stationarity tests](#stationarity_tests)
* [Autocorrelation tests](#autocorrelation_tests)
  * [Durbin-Watson test](#durbin_watson)
  * [Breusch–Godfrey test](#breusch_godfrey)

It is known that in order to make predictions with any time-series it needs to be stationarized. Below I will describe common methods of determining if the time series is stationary.

<div id='stationarity_tests'/>
## Stationarity tests

It is known that in order to make predictions with any time-series it needs to be stationarized. Below I will describe common methods of determining if the time series is stationary.

### Dickey-Fuller test

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
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

### Augmented Dickey-Fuller (ADF) test

The testing procedure for the ADF test is the same as for the Dickey–Fuller test but it is applied to the model:<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$\Delta y_{t}$ = $\alpha$ + $bt$ + $\gamma y_{t-1}$ + $\delta_1 \Delta y_{t-1}$ + ... + $\delta_{p-1} \Delta y_{t-p+1}$ + $\varepsilon_t$,<br>
where $p$ is the order of lag used in the AR process.

According to the Null Hypothesis, $\gamma$ equals to 0. <br>
<br>
By including lags of the order $p$ the ADF formulation allows for higher-order autoregressive processes. This means that the lag length $p$ has to be determined when applying the test. One possible approach is to test down from high orders and examine the $t$-values on coefficients $\delta_i$.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

### Kwiatkowski-Phillips-Schmidt-Shin (KPSS) test

In KPSS test a time series is expressed as the sum of deterministic trend, random walk, and stationary error:<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t$ = $\alpha$ + $\rho y_{t-1}$ + $\varepsilon_t$

Under the Null Hypothesis a time series is trend stationary, that is its random walk variance equals to 0.

<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='autocorrelation_tests'/>
## Autocorrelation tests

<div id='durbin_watson'/>
### Durbin-Watson test

Let's take a look at the following simple autoregressive model (AR1) of the error term.

&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon_t = \rho \varepsilon_{t-1} + u_t$

where $u$ is the white noise, and $\rho$ is some coefficient which takes values from -1 and 1. If $\rho$ is equal to 0 then there is no autocorrelation, and the error term is just noise - that will be the null hypothesis of the test. The Durbin-Watson test is aimed at detecting autocorrelation of the residuals at lag 1 using the following statistic:

&nbsp;&nbsp;&nbsp;&nbsp;
$DW = \frac{\sum_{i=2}^n (\varepsilon_t - \varepsilon_{t-1})^2}{\sum_{i=1}^n \varepsilon_t^2}$

The possible values lie within 0 and 4. If the statistic is close to 0 then there is a positive autocorrelation in the series, meaning that the neighboring error terms are likely to have similar values forming clusters of errors. And if it's close to 4 then there is a negative autocorrelation, which implies that an error term is likely to be close to the opposite values of the previous observation. Values close to 2 can be interpreted as no autocorrelation or that its effect is not significant.

The Durbin-Watson statistic follows an appropriate distribution for which it is possible to calculate critical values given the significance level and the number of observations.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='breusch_godfrey'/>
### Breusch–Godfrey test

Unlike the Durbin-Watson test, this test allows detection of autocorrelation of higher order (not only at lag 1). However, the Durbin-Watson test is considered more powerful when the aim is to detect only the first order autocorrelation.

This test is applicable for testing the autocorrelation of the residuals of the [linear regression]({{ site.baseurl }}{% link _posts/2019-10-25-linear-regression.md %}), so at first the coefficients of the regression are calculated, and then the residuals are represented as autoregression:

&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon_t = \rho_1 \varepsilon_{t-1} + \rho_2 \varepsilon_{t-2} + ... + \rho_p \varepsilon_{t-p} + u_t$

where $u$ is the white noise.

Then the following auxiliary regression is fitted:

&nbsp;&nbsp;&nbsp;&nbsp;
$\varepsilon_t = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + ... \beta_m x_m + \rho_1 \varepsilon_{t-1} + \rho_2 \varepsilon_{t-2} + ... + \rho_p \varepsilon_{t-p} + u_t$

For which [the coefficient of determination]({{ site.baseurl }}{% link _posts/2019-08-10-correlation.md %}) (R-squared) is calculated. Then the expression $(T-p) R^2$ (where $T$ is the number of observations) is asymptotically [chi-square distributed]({{ site.baseurl }}{% link _posts/2021-03-27-statistical-distributions.md %}#chi_distribution) with the [degrees of freedom]({{ site.baseurl }}{% link _posts/2021-03-19-degrees-of-freedom.md %}) equal to $p$, that is the number of included periods of autocorrelation.

The null hypothesis states that all coefficients $\rho$ are equal to zero, which means no autocorrelation in the residuals. If the obtained statistic is bigger than the critical value of the chi-squared for a given significance level, then the null hypothesis is rejected. 
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>