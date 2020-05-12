---
layout: single
title: "Vector projection"
description: Explaining what vector projection is, how it is done and what is the role of dot product and cosine in it
category: "Linear Algebra"
tags: cosine dot-product vector-length vector-multiplication
date: 2020-03-04
---
 
In order to understand more advanced concepts from vector operations it is good to have an intuition on such terms as vector projection.  
Below is a two-dimensional example but its understanding will help us build intuition behind vector projection in any number of dimensions. So suppose we want to know the projection of vector $\overrightarrow{a}$ on vector $\overrightarrow{b}$:

$a_{1}$

$\|\|a_{1}\|\|$
 
![](/assets/images/linear_algebra/vectors_and_cosine.png){: .align-center}
 
In this example we want to calculate vector $\overrightarrow{a_{1}}$ which has the same direction as vector $\overrightarrow{b}$ but the length of which is restricted by the span of vector $\overrightarrow{a}$ in the direction of $\overrightarrow{b}$.  
 
Let's recall that in rectangular triangle cosine of an angle is the ratio between the adjacent side and the hypotenuse. Therefore, \$$\left|\left|a_{1}\right|\right|$$

, 

known as scalar projection, can be expressed as 

&nbsp;&nbsp;&nbsp;&nbsp;
$\left|\left|a\right|\right| \cos{\alpha}$

,

test

where $\alpha$ is an angle between $\overrightarrow{a}$ and $\overrightarrow{b}$. The vector projection will be equal to scalar projection multiplied by direction of $\overrightarrow{b}$:  
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\overrightarrow{a_{1}} = \left|\left|a_{1}\right|\right|\frac{b}{\left|\left|b\right|\right|} = \left|\left|a\right|\right| \cos{\alpha}\frac{b}{\left|\left|b\right|\right|}$
 
The direction of $\overrightarrow{b}$ is a unit vector expressed as a scaled version of $\overrightarrow{b}$.
 
## Cosine calculation  
 
When $\alpha$ is not known the cosine of $\alpha$ can be be expressed as follows:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\cos{\alpha} = \frac{\overrightarrow{a} \cdot \overrightarrow{b}}{\left|\left|a\right|\right| \cdot \left|\left|b\right|\right|}$,
 
where $\overrightarrow{a} \cdot \overrightarrow{b}$ is the dot product of two vectors.
 
The formula is based on the Law of cosines which states that for any triangle the following holds true:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$c^{2} = a^{2} + b^{2} - 2ab \cos{\alpha}$
 
In terms of vectors of our example we can write it down like this:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\left|\left|a_2\right|\right|^2 = \left|\left|a\right|\right|^2 + \left|\left|a_1\right|\right|^2 - 2 \left|\left|a\right|\right| \left|\left|a_1\right|\right| \cos{\alpha}$,  
 
where $\overrightarrow{a_2}$ can be expressed as $\overrightarrow{a} - \overrightarrow{a_1}$.
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(\left|\left|a - a_1\right|\right|) (\left|\left|a - a_1\right|\right|) = \left|\left|a\right|\right|^2 + \left|\left|a_1\right|\right|^2 - 2 \left|\left|a\right|\right| \left|\left|a_1\right|\right| \cos{\alpha}$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\left|\left|a\right|\right|^2 + \left|\left|a_1\right|\right|^2 - 2 \overrightarrow{a} \cdot \overrightarrow{a_1} = \left|\left|a\right|\right|^2 + \left|\left|a_1\right|\right|^2 - 2 \left|\left|a\right|\right| \left|\left|a_1\right|\right| \cos{\alpha}$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$\overrightarrow{a} \cdot \overrightarrow{a_1} = \left|\left|a\right|\right| \left|\left|a_1\right|\right| \cos{\alpha}$
 
The key takeaway from it is that the dot product of two vectors is useful in calculation of vector projection.
