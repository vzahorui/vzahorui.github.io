---
layout: single
title: "Trust region"
description: "Explaining trust region strategy in optimizaton problems"
category: "Optimization"
tags: nonlinear-regression loss-function minimization
date: 2020-09-10
---

Trust region is a general strategy of optimization of an objective function by constructing an approximation of the function around a certain point and measuring its values at the nearest regions so as to select the correct direction for parameters change. While in [line search]({{ site.baseurl }}{% link _posts/2020-08-08-line-search.md %}) strategy the optimal step size is selected based on the specified direction, in trust region the step size is defined by the maximum size of the trust region and only then the direction is determined. 

