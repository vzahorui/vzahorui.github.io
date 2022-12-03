---
layout: single
title: "Simplex method"
description: Here I am going to explain how simplex method can be used in optimization problems
category: "Optimization"
tags: linear-programming constraints simplex objective-function maximization
date: 2020-08-29
---
 
Linear programming aims at finding the best outcome of mathematical problems provided constraints. The requirements for the linear programming problems are divided into two groups - constraints and the objective function, and can be represented as linear relationships. Simplex method is one common algorithm for solving linear programming and this article describes the mechanics of it.
 
In geometry, a simplex is a special type of polytope in $n$-dimensional space which has $n+1$ vertices, that is the points where lines meet. For example, in 2-dimensional space a simplex will assume the form a triangle, and in 3-dimensional space it will become a tetrahedron.

The simplex method employs the idea of simplex by projecting the whole subspace of all possible solutions onto a polytope. The shape of this polytope is defined by the constraints of the problem, and the optimal solution is found at some specific vertex. 

Suppose the company is engaged in manufacturing of black, milk and white chocolate. Each product is sold by its own price and is made by three ingredients: cocoa, milk and sugar. The company has only limited supply of ingredients and thus is bound by certain restrictions.<br>
Let’s define black, milk and white chocolate as $x_1$, $x_2$ and $x_3$ and ingredients as $a$, $b$ and $c$. Bearing in mind that each type of chocolate requires different amount of ingredients for manufacturing, we can write down a system of equations which represents restrictions due to the limited ingredients supply.

$$\begin{cases}
3x_1+5x_2+2x_3 \leq 189 \\
4x_1+2x_2+x_3 \leq 300 \\
2x_1+4x_2+7x_3 \leq 250
\end{cases}$$

The company aims at maximizing its revenue by selling finished products by their respective prices:

&nbsp;&nbsp;&nbsp;&nbsp;
$12x_1 + 13x_2 + 16x_3 \rightarrow \max $

In this example we already have a standard form of a linear program. Otherwise additional steps would have to be undertaken in order to obtain the standard form:<br>
* If the objective is minimization, we need to convert it into maximization by multiplying both parts of objective equation by (-1). 
* All variables should be non-negative. If we have negative variable constraint we can make them non-negative by applying substitution. A negative variable can be substituted with a difference of two non-negative variables.
* If we have an equality among our constraints we have to substitute it with two inequalities as in the example below:

$$2x_1+x_2 = 7 \rightarrow
\begin{cases}
2x_1+x_2 \leq 7 \\ 
2x_1+x_2 \geq 7
\end{cases}$$

* We need to make sure that all constraints are less or equal to some constant. If they are not this can be achieved by multiplying by (-1).

The next step is converting standard form into slack form. For this we need to add slack variables, which represent the difference between left and right sides of inequalities. "Slack" as it is "taking up slack".<br>
As in example with the chocolate manufacturing we get the following form of constraints:

$$
\begin{cases}
3x_1+5x_2+2x_3 + s_1 = 189 \\ 
4x_1+2x_2+x_3 + s_2 = 300 \\ 
2x_1+4x_2+7x_3 + s_3 = 250
\end{cases}
$$

The optimization function will take up the following form:

$Z = 12x_1 + 13x_2 + 16x_3$

We can write down a tableau of equations where each row consists of variable coefficients, and where the last row is from the objective function:

|$x_1$|$x_2$|$x_3$|$s_1$|$s_2$|$s_3$| $Z$ |     |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  3  |  5  |  2  |  1  |  0  |  0  |  0  | 189 |
|  4  |  2  |  1  |  0  |  1  |  0  |  0  | 300 |
|  2  |  4  |  7  |  0  |  0  |  1  |  0  | 250 |
|**-12**|**-13**|**-16**|**0**|**0**|**0**|**1**|**0**|

Looking at the last row we should pick the element with the most negative number. That will be a factor which leads to the biggest maximization of the function. In our case the most expensive type of chocolate, which generates the biggest revenue. Here the third column will be considered as a pivot column because its bottom row has the most negative number (-16).<br>
If we divide values in the right column by the corresponding values in the pivot column, we will see how many products can be made using supply of each of the ingredients. That is, we can manufacture up to 94 bars (189/2) of white chocolate before we use up all the cocoa, 300 bars (300/1) before we use up all the milk, and only 35 bars (250/7) before we use up all the sugar. Since we are constrained by the smallest ratio, 35 bars of white chocolate is the maximum that can be manufactured. At the end, we spend ingredients on manufacturing white chocolate only, consume sugar completely and end up with the revenue of $16 \times 35 = 560$, which is better then not manufacturing anything.

The third row will be the pivot row and number 7 - the intersection between the pivot column and pivot row - will be the pivot element. We transform our tableau by dividing each element of the pivot row by the pivot element. Now this row intuitively represents a scaled version with the measuring unit as sugar per bar of white chocolate. The number in the right column represents the maximum of possible manufacturing.

$$
|$x_1$|$x_2$|$x_3$|$s_1$|$s_2$|$s_3$| $Z$ |     |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  3  |  5  |  2  |  1  |  0  |  0  |  0  | 189 |
|  4  |  2  |  1  |  0  |  1  |  0  |  0  | 300 |
|$\frac{2}{7}$|$\frac{4}{7}$|**1**|  0  |  0  |$\frac{1}{7}$|  0  |$\frac{250}{7}$|
|-12|-13|-16|0|0|0|1|0|
$$

Then we transform the rest of the rows with the pivot row by making zeros in the pivot column (by consistent subtracting of the values of the pivot row). Thus we reflect in other equations that the resource sugar is completely used up. With that, the utility of additional manufacturing of white chocolate is also used up.

|$x_1$|$x_2$|$x_3$|$s_1$|$s_2$|$s_3$| $Z$ |     |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|$\frac{17}{7}$|$\frac{27}{7}$|  0  |  1  |  0  |-$\frac{2}{7}$|  0  |$\frac{823}{7}$|
|$\frac{26}{7}$|$\frac{10}{7}$|  0  |  0  |  1  |-$\frac{1}{7}$|  0  |$\frac{1850}{7}$|
|$\frac{2}{7}$|$\frac{4}{7}$|**1**|  0  |  0  |$\frac{1}{7}$|  0  |$\frac{250}{7}$|
|-$\frac{52}{7}$|-$\frac{16}{7}$|0|0|0|$\frac{16}{7}$|1|$\frac{4000}{7}$|

The remaining negative numbers in the bottom row under the variables of products represent additional utility from manufacturing those products, hence we can further optimize our system. Therefore, the process of finding the most negative number in the bottom row, finding a pivot element and transforming tableau is repeated until there is no negative numbers in the bottom row left.<br>
On the second iteration we see that the most negative number in the bottom row is $-\frac{52}{7}$, hence the first column is the pivot column. More additional value will be generated by manufacturing black chocolate rather than milk chocolate. The tightest restriction for manufacturing is in the first row so the next pivot element is $\frac{17}{7}$. We will be trying to use up all cocoa and manufacture as much of black chocolate as possible provided that we are already manufacturing white chocolate. In other words, we'll be manufacturing black chocolate all the while adjusting the number of manufactured white chocolate (making it less) until the utility of additional manufactured bar of black chocolate is zero. The new transformed tableau will look like this: 

|$x_1$|$x_2$|$x_3$|$s_1$|$s_2$|$s_3$| $Z$ |     |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|1|$\frac{27}{17}$|  0  |$\frac{7}{17}$|  0  |-$\frac{2}{17}$|  0  |$\frac{823}{17}$|
|0|$\frac{532}{119}$|  0  |-$\frac{182}{119}$|  1  |$\frac{35}{119}$|  0  |$\frac{10052}{119}$|
|0|$\frac{14}{119}$|1|-$\frac{14}{119}$|  0  |$\frac{21}{119}$|  0  |$\frac{2604}{119}$|
|0|$\frac{1132}{119}$|0|$\frac{364}{119}$|0|$\frac{168}{119}$|1|$\frac{110796}{119}$|

At this point we are making 21 bars (2604/119) of white chocolate and 48 bars (823/17) of black chocolate, and the revenue will be equal to 912. Now, when there are no more non-negative numbers in the last row, all further iterations won't lead to further optimization. 




