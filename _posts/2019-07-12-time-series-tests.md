---
layout: single
title: "Time series tests"
category: "Time series"
tags: stationarity hypothesis-testing autocorrelation Durbin–Watson-test Durbin–Watson-statistic residuals white-noise error-term Breusch–Godfrey-test hypothesis-testing t-test AR unit-root ADF KPSS Kwiatkowski-Phillips-Schmidt-Shin-test Dickey-Fuller-test
date: 2023-01-11
---

This article makes an overview of most commonly used [statistical tests]({{ site.baseurl }}{% link _posts/2021-01-21-hypothesis-testing.md %}) used in validation of the assumptions of the time series.

## In this article

* [Stationarity tests](#stationarity_tests)
  * [Dickey-Fuller test](#dickey_fuller_test)
  * [Augmented Dickey-Fuller (ADF) test](#augmented_dickey_fuller_test)
  * [Kwiatkowski-Phillips-Schmidt-Shin (KPSS) test](#kpss_test)
  * [Combining ADF and KPPS](#combine_ADF_and_KPSS)
* [Autocorrelation tests](#autocorrelation_tests)
  * [Durbin-Watson test](#durbin_watson)
  * [Breusch–Godfrey test](#breusch_godfrey)

<div id='stationarity_tests'/>
## Stationarity tests

It is known that some of the time series models are based on the assumption of the series being stationary. Below are the common statistical tests of determining whether the time series is stationary or not. It is important to note that the Dickey-Fuller and KPSS tests are not interchangeable, and should instead complement each other.

<div id='dickey_fuller_test'/>
### Dickey-Fuller test

Given test may be applicable only to [AR(1) process]({{ site.baseurl }}{% link _posts/2022-12-11-ARIMA-models.md %}#ar_models) which has the following equation:

$$y_t = \varphi y_{t-1} + \varepsilon_t$$

Under the null hypothesis, the time series is non-stationary, or to be more precise, it represents the random walk. Here we test whether $\varphi$ equals 1.

&nbsp;&nbsp;&nbsp;&nbsp;
$H_0: \rho = 1$ <br>
&nbsp;&nbsp;&nbsp;&nbsp;
$H_1: \rho < 1$

We cannot simply test if $\varphi$ equals 1 because both $y_t$ and $y_{t-1}$ under the null hypothesis are non-stationary. Thus we need to apply the test to the difference $y_t - y_{t-1}$. We get the following equation:

$$\Delta y_t = \gamma y_{t-1} + \varepsilon_t$$

where $\gamma = \varphi - 1$.

The parameter $\gamma$ is estimated from the AR model and then tested for being equal to zero under the null hypothesis. Under the alternative hypothesis $\gamma$ is less than zero.

The standard [one-sample $t$-test]({{ site.baseurl }}{% link _posts/2021-03-22-hypothesis-test-parametric-statistics.md %}#mean_sample_and_population) cannot be used here though. That is because under the null hypothesis $y_{t-1}$ is non-stationary, so the [Central limit theorem]({{ site.baseurl }}{% link _posts/2021-01-16-sampling-distribution.md %}#sample_mean_expectation) cannot be applied to the observed values. Therefore, the calculated $t$-statistic is compared to the critical value from a special Dickey–Fuller table, and if it is less than the critical value under the given level of significance then the null hypothesis is rejected, and we fail to conclude that the time series is non-stationary.

There are three main versions of the test:

1. Test for a unit root:<br>
$\Delta y_{t}$ = $\gamma y_{t-1} + \varepsilon_t$
2. Test for a unit root with drift:<br>
$\Delta y_{t}$ = $\alpha + \gamma y_{t-1} + \varepsilon_t$
3. Test for a unit root with drift and deterministic time trend:<br>
$\Delta y_{t}$ = $\alpha + \beta t + \gamma y_{t-1} + \varepsilon_t$

Each version of the test has its own critical value which depends on the size of the sample.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='augmented_dickey_fuller_test'/>
### Augmented Dickey-Fuller (ADF) test

This is a generalization of the Dickey–Fuller test which can employ the AR models of higher order. The differenced model looks like this:

$$\Delta y_{t} = \alpha + \beta t + \gamma y_{t-1} + \delta_1 \Delta y_{t-1} + ... + \delta_{p-1} \Delta y_{t-p+1} + \varepsilon_t$$

where $p$ is the order of lag used in the AR process.

Under the null hypothesis $\gamma$ equals to 0. Just like the original Dickey-Fuller test, this version also has three flavors depending on the assumptions on the presence of the drift and deterministic trend in the unit root.

The length of the AR process can be determined by applying the standard $t$-test to the coefficients $\delta$ by testing their equality to 0, or by using information criteria such as AIC.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='kpss_test'/>
### Kwiatkowski-Phillips-Schmidt-Shin (KPSS) test

This test, unlike the Dickey-Fuller test, assumes under the null hypothesis that the time series is trend-stationary. The alternative hypothesis here is that the time series has the unit root.

The time series is expressed as the sum of the deterministic trend, random walk, and stationary error:

$$y_t =  \beta t + \alpha + r_t + \varepsilon_t$$

where $r_t$ is the random walk which in turn is represented as $r_{t-1} + e_t$, where $e_t$ is the error term which is an independent and identically distributed random variable with mean equal to zero.

According to the null hypothesis the variance of $e_t$ is zero. Therefore, $r_t$ is always the same as $r_0$ - its initial value, and the final time series expression becomes just the sum of the trend, some constant, and the error term.
<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='combine_ADF_and_KPSS'/>
### Combining ADF and KPPS

It should be obvious that if both ADF and KPSS lead to the same conclusion there is no need to look further. However if the results are different then one should pay attention to the way the hypotheses are constructed in each of the tests: the ADF test relies on the differenced series, while the KPSS test assumes trend stationarity.

If both tests fail to reject the null hypothesis, that is the series is stationary according to the KPSS test, and has the unit root per ADF test, then there is not enough data. It is possible that after removing the trend, the unit root will be gone according to the ADF test.

If both tests reject the null hypothesis, that is the series has the unit root according to the KPPS test, and does not have it according to the ADF test, then the differencing should be applied and the KPSS test performed again on the differenced series. If the results won't change then there might be the case of heteroscedasticity and structural changes in the data.
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