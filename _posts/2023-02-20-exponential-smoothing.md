---
layout: single
title: "Exponential smooting models"
category: "Time series"
tags: trend lag seasonal-component level-component Holt-linear-trend
date: 2023-02-20
---

In this article we shall make a breakdown of the exponential smoothing models which are used in time series forecasting.

* [Simple exponential smooting model](#simple_es)
* [Exponential smooting with trend](#es_trend)


<div id='simple_es'/>
## Simple exponential smooting model

Similarly to [ARIMA models]({{ site.baseurl }}{% link _posts/2022-12-11-ARIMA-models.md %}) the idea upon which the exponential smooting models are built is that the most recent observations contribute to the currently observed values of a series. Unlike ARIMA models however they do not require the time series to be stationary, and the weights with which the recent observation influence the current one decay exponentialy, hence the name. 

This is how the relationship between the observations can be expressed:

$$\hat{y}_{t+1|t}=\alpha y_{t} + (1-\alpha) \alpha y_{t-1} + (1-\alpha)^{2} \alpha y_{t-2} + \cdots$$

Here $\alpha$ is the parameter which controlls the strength of the relationship between the currently observed value and the values at different lags: the higher the value of $\alpha$ - the bigger weight is placed on the most recent observation, and the quicker the weight of each further previous observation decays. In other words the most recent observation has weight equal to $\alpha$, and all other observations combined have weight $(1-\alpha)$ with respect to $y_{t+1}$. At the same time $y_t$ is also defined via exponential smooting, and it places weight $\alpha$ to $y_{t-1}$ and weight $(1-\alpha)$ to all other previous observations. The same is true for all other previous observations which explains the final form of the equation above.

Notice that there is no explicit error term because it is believed to be incorporated within the past observed values. The model makes a forecast based on the previous disturbance so for now it has only a single term - the level component which can also be described like this:  

$$\ell_{t} = \alpha y_{t} + (1 - \alpha)\ell_{t-1}$$

Let's introduce the component form of the forecast equation above which for now will include only the level component. 

$$\hat{y}_{t+h|t} = \ell_{t}$$

Here $h$ is the step size for the forecast. That is $\hat{y}_{t+h|t}$ is the forecast for the point $y_{t+h}$ given the observed values up until $y_t$.

The component form is is a usefull representation of the exponential smooting model bacause it can later be extended to include the trend and seasonal components (and this where where the step size $h$ will actually start to matter).

<a href="#page-title" class="back-to-top">{{ site.data.ui-text[site.locale].back_to_top | default: 'Back to Top' }} &uarr;</a>

<div id='es_trend'/>
## Exponential smooting with trend

