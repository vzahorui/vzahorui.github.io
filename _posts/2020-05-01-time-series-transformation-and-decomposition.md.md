---
layout: single
title: "Time series transformation and decomposition"
description: Explaining how to make time series stationary and how to decompose it into components
category: "Time series"
tags: trend seasonality residuals stationarity additive-models multiplicative-models STL white-noise
date: 2020-05-01
---

Oftentimes it is required to transform time series data in order to build a model on it and make predictions. For example, making time series stationary is required by a number of models, as it makes the properties of these time series independent of time, thus making the model more robust.

## Stationarity terms

Stationary time series have constant mean and constant variance. It means that for any observation the value will not be influenced by trend or seasonality, and that it will be equal to the mean of the time series adjusted by statistical error. The shocks represented by statistical error do not have permanent effect on the time series. So to speak, its values always tend to return to its mean.

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t = \mu + \varepsilon_t$

Below is an example of a stationary time series with $\mu$ = 10.

![](/assets/images/time_series/stationary_time_series.png){: .align-center}

As we see, this time series exhibits a certain amount of random fluctuations, and yet its values remain close to its mean. A special case of stationary time series with mean value of zero is also called "white noise".

You may be wondering if predicting a stationary time series is as trivial as claiming that its futute values will be equal to its mean. Yes and no, as many models are trying to take into account the impact of random fluctuations from previous periods. In other words, they predict future values adjusting them to the impact of the past events. 

Basically any time series can be made stationary. If we observe a trend then the most common approach is to apply first-order differencing, that is taking a difference between neighbouring data points (lag-1) instead of using the actual values. Sometimes differencing has to be performed twice or even more times until the time-series is stationary, which is often the case with non-linear trends. Other options for making time series stationary include taking logarithm of the values, applying power functions and combining multiple types of transformation. However, differencing should be more preferable as it is easily interpretable.

Increasing the lag in differencing may help in eliminating seasonality. In other words, we can take difference between same seasons of different periods (lag-m, where m is number of seasons), and see if we obtain stationary time series. Second-order differencing of this sort may be also applied.<br>
One thing to note is that applying seasonal differenncing before explicitly removing trend may already make time series stationary, while detrending seasonal data first will still require further elimination of seasonal component.

After making predictions upon such transformed stationary time series we should reverse all transformations in order to get the final predicted value of the original series.

## Seasonal-Trend decomposition procedure based on LOESS

In case when time series is affected by seasonal changes of varying length and intensity then the differencing techniques may become misleading as they will treat changes casued by seasonal factor as noise. This is where Seasonal-Trend decomposition procedure based on [LOESS]({{ site.baseurl }}{% link _posts/2020-05-05-loess.md %}) (locally estimated scatterplot smoothing), or simply STL, comes to aid.
 

Thus dealing with the missing data points. 

Thus, STL provides mechanism for modeling each of the times series components separately so that they can be combined into an additive model.<br>
Although STL provides facilities only for additive decomposition, the original data may be log transformed before applying STL so that the combined result after the decomposition can be backtransfromed into its original form.



Below is a toy example of time series which changes over time and has seasonal component as well. Suppose it's ice cream prices.

![](/assets/images/time_series/toy_ice_cream_prices.png){: .align-center}

We can remove trend by simply taking the first difference, however in order to remove seasonality we have to perform differencing of higher order. In this particular case we have to take a difference of a whole year, which means subtracting values from a year ago from values of current date.<br>
The drawback of this sort of transformation is that we lose the first historical data point. Since we have only data from restricted time period we cannot take the difference for the whole first year.
UA

![](/assets/images/time_series/toy_ice_cream_prices_transformed.png){: .align-center}

The second image displays transformed data after taking the whole year difference and it looks like white noise. Hence we may conclude that we got stationary time series.<br>
We can further test time series for stationarity by using Augmented Dickey-Fuller (ADF) and Kwiatkowski–Phillips–Schmidt–Shin (KPSS) tests. Mechanics of both tests is described [here]({{ site.baseurl }}{% link _posts/2019-07-12-time-series-stationarity-tests.md %}).

