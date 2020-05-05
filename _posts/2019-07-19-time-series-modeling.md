---
layout: single
title: "Time series modeling"
description: Explaining what times series modeling is and making an overview of the common models
category: "Time series"
date: 2020-04-23
---

Time series is simply a series of data which is ordered in time. Almost any social, economical or natural process can be modeled with the time series as it takes into account only historical values of this process, be it population of a certain region, tomato prices or redioactive decay. 

In time series the values which are close in time are more related than those that are further apart. Indeed, in any process each next observation represents development from its previous state, which may be caused by some trend, random fluctuation or reverting to its normal state after earlier fluctuations. Hence, there are various models of time series which make predictions based on combinations of values of the most recent observations. 

## Decomposition of time series

One way to create a time series model is to view it as a process with a certain structure. Two elements which are usually taken into consideration are trend and some random component (or remainder). While trend defines the general direction in which values of the times series change, the random component represents shocks caused by events which could not be foreseen. Below is an example of time series of Tesla stock prices, which exhibits some sort of upward trend, and which is also heavily impacted by randomness, as the chart is not quite linear. 

![](/assets/images/time_series/stock_prices_example.png){: .align-center}

Some processes are also influenced by seasonal factor (or cyclical in other words), and thus the element of seasonality should also be included in the models of such processes. Among examples of cyclical time series are prices for seasonal goods, like ice-cream, number of gym-related searches in Google, daily temperature, heart-beat rate, and many others. Below is an example of daily amount of consumed energy according to PGM, which clearly exhibits seasonal component (and doesn't seem to have any significant trend).

![](/assets/images/time_series/daily_energy_consumption_example.png){: .align-center}

Each component of the time series can be modeled separately, and their compound effect makes up the predicted value. This compound effect may be either modeled as a sum or a multiplication of all three components producing either additive or a multiplicative model respectively. It should be noted that multiplicative models may be applied in case when variability of time series changes over time.

## Model selection

When selecting a model to predict time series various factors may be considered, such as the nature of underlying process, presence of seasonality, autocorrelation and heteroscedasticity. Also available data on related metrics, which may be impacting bahaviour of the predicted time series, could be used to enhance the model.

Usually many models are being tested and the one which provides the best score is selected.

### Model validation

Often the simplest possible model is used as a benchmark for further comparison with the other more sophisticated ones. In time series forecasting the Naïve model could be used for such purposes.

### Naïve models

According to the simplest approach the value of the next predicted observation will be equal to the value of the previous one. 

## AR models 


