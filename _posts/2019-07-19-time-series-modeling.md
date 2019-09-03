---
layout: single
title: "Time series modeling"
category: "Time series"
date: 2019-07-19
---
## Stationarity terms
The methods described here require time series to be stationary. Stationary time series have constant mean and constant variance.
It means that for any future observation the expected value will be equal to the mean of time series with injection of statistical error. The shocks represented by statistical error do not have permanent effect on the time series. So to speak its values always tend to return to its mean value.<br>

&nbsp;&nbsp;&nbsp;&nbsp;
$y_t = + \mu + \varepsilon_t$

Below is an example of stationary time series with $\mu$ = 10.

![](/assets/images/time_series/stationary_time_series.png){: .align-center}

As we can see, this time series exhibits a certain amount of random fluctuations, and yet its values remain close to its mean.<br>
<br>
You may ask if it means that when we are making predictions upon stationary time series we are basically saying that it will be equal to its mean, right?<br>
Not quite.<br>
The models described here are trying to take into account the impact of random fluctuations from previous periods. Plainly speaking, they predict future values which are adjusted by the past events. More to it later.<br>
<br>
Another important question may arise. If we can predict only stationary time series, does it mean that we cannot make meaningful predictions, that is predicting something that changes over time?<br>
To this question the answer is no.<br>
Basically any time series can be transformed into stationary terms. The most common approach is differencing, that is taking a difference between neighbouring data points (lag-1) instead of using the actual values. Sometimes differencing has to be performed again and multiple times until the time-series is stationary. This is often the case with non-linear time series. Also, increasing the lag in differencing may help in eliminating seasonality. <br>
Other options for making time series include taking $\log$ of the values, applying power function and combining multiple types of transformation.<br>
After making predictions upon such transformed stationary time series we should reverse all transformations in order to get the final predicted value.<br>
<br>
Below is a toy example of time series which changes over time and has seasonal component as well. Suppose it's ice cream prices.

![](/assets/images/time_series/toy_ice_cream_prices.png){: .align-center}

We can remove trend by simply taking the first difference, however in order to remove seasonality we have to perform differencing of higher order. In this particular case we have to take a difference of a whole year, which means subtracting values from a year ago from values of current date.<br>
The drawback of this sort of transformation is that we lose the first historical data point. Since we have only data from restricted time period we cannot take the difference for the whole first year.
UA

![](/assets/images/time_series/toy_ice_cream_prices_transformed.png){: .align-center}

The second image displays transformed data after taking the whole year difference and it looks like white noise. Hence we may conclude that we got stationary time series.<br>
We can further test time series for stationarity by using Augmented Dickey-Fuller (ADF) and Kwiatkowski–Phillips–Schmidt–Shin (KPSS) tests. Mechanics of both tests is described [here]({{ site.baseurl }}{% link _posts/2019-07-12-time-series-stationarity-tests.md %}).

## AR models 


