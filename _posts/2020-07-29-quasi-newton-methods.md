---
layout: single
title: "Quasi-Newton methods"
description: Comparing quasi-Newton methods with Netwon's method and giving description of the most common ones 
category: "Optimization"
tags: hessian second-derivative loss-function
date: 2020-08-01
---
 
Under condition of big data [Newton's method]({{ site.baseurl }}{% link _posts/2020-07-05-newton-method.md %}) is known for being computationaly expensive when it comes to calculating the Hessian matrix and its inverse at each iteration. Quasi-Newton methods were developed as an alternative which calculates only apporximation of the Hessian and thus achieves faster computation speed. Althogh Hessian approxiamtion is less precise than the true Hessian, quasi-Newton methods might require more iterations for convergence, which however is compensated by the increased computation speed.



 quasi-Newton methods