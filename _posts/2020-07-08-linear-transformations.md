---
layout: single
title: "Linear transformations"
description: Diving into essence of vectors and matrices
category: "Linear Algebra"
tags: matrix vector vector-space dimensions span basis unit-vector linear-equations inverse determinant
date: 2020-07-15
---
 
Linear algebra is all about making transformations of linear combinations of numbers, called vectors, and arrays of vectors, called matrices. The elements of linear combinations can be added and multiplied together but may also represent more complex forms of transformation. Linear algebra proves to be of great importance for performing mathematical operations on voluminous data, so having a grasp of it is a must-have skill for a data scientist.
 
## What are vectors

Vectors may be viewed as pointers in space (called vector space), where the number of elements of a vector represents the number of dimensions in which the vector is pointing. The general attributes of vectors are direction and magnitude, which are defined by the elements of a vector and their volume respectively. Actually each element represents the volume of stretching a vector in a specific dimension.
 
Addition of vectors results into a vector which shows the combined movement represented by all of the added ones.<br>
Multiplication of a vector by scalar results in a scaled version of a vector where all of its elements are scaled appropriately while the general direction of the vector stays the same.
 
![](/assets/images/linear_algebra/simple_vectors.png){: .align-center}
 
One common concept in linear algebra regarding vectors is unit vectors. Unit vector is a vector which has only one non-zero element which is equal to one indicating direction in a single dimension. The length of this vector therefore is also one. Unit vectors are the minimal structure in vector space, and they serve as the basis for all other vectors, as they can be easily scaled and added together. Roughly speaking, for any $n$-dimensional space there exists $n$ basis vectors which are pointing in different dimensions, and which may be linearly combined to construct any vector in that space. A set of all possible linear combinations of vectors is called vector span, and the set of independent vectors which can form the full span (not necessarily unit vectors) are called basis. Vectors are linearly independent if none of them can be represented as a linear combination of the others.
 
# What are matrices
 
As stated before, matrix is an array of vectors. What it means is that matrices can package together linear combinations represented by multiple vectors. Each column of a matrix can be viewed as a vector, so matrix transformation can be considered as applying all of the vector transformations at once.

It is worth pointing out a special case of matrices called the identity matrices. These matrices are square with diagonal elements equal to 1 and other elements equal to 0. In the literature these matrices are often denoted as $I$ and they mean no transformation. In fact the identity matrices stretch in each direction of a vector space by a single unit, forming the basis of it with the unit vectors. If we take any matrix or vector and multiply it with the identity matrix, we will end up with the same original matrix or vector.

Applying matrix transformation is essentially the same as multiplying by a matrix from the left. Here is an example of what happens if a vector is multiplied by a matrix:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$
\left[\begin{array}{cccc}
a_{11} & a_{12} & ... & a_{1n} \\
a_{21} & a_{22} & ... & a_{2n} \\
... & ... & ... & ... \\
a_{m1} & a_{m2} & ... & a_{mn}
\end{array} \right]
\left[\begin{array}{c}
v_{1} \\
v_{2} \\
... \\
v_{m}    
\end{array} \right]
= v_{1}    
\left[\begin{array}{c}
a_{11} \\
a_{21} \\
... \\
a_{m1}    
\end{array} \right]
+ v_{2}    
\left[\begin{array}{c}
a_{12} \\
a_{22} \\
... \\
a_{m2}    
\end{array} \right]
$$

$$
v_{1}    
\left[\begin{array}{c}
a_{11} \\
a_{21} \\
... \\
a_{m1}    
\end{array} \right]
+ v_{2}    
\left[\begin{array}{c}
a_{12} \\
a_{22} \\
... \\
a_{m2}    
\end{array} \right]
+ ...
+ v_{m}    
\left[\begin{array}{c}
a_{1n} \\
a_{2n} \\
... \\
a_{mn}    
\end{array} \right]
$$


$$
= \left[\begin{array}{c}
v_1 a_{11} + v_2 a_{12} + ... + v_m a_{1n} \\
v_1 a_{21} + v_2 a_{22} + ... + v_m a_{2n} \\
... \\
v_1 a_{m1} + v_2 a_{m2} + ... + v_m a_{mn}
\end{array} \right]
$$
 
As we see, the result of such operation is the sum of scaled versions of the vectors from the matrix where each vector is scaled with the corresponding element from the vector which is being multiplied with the matrix.
 
Multiplying a matrix by another matrix results in a composition matrix which represents linear transformation of the two original matrices applied in particular order (from right to left because order does matter im matrix multiplication). So, for example if matrix A is first applied to vector $v$ and then matrix B is applied to the new vector, this will be equivalent to applying the product of B and A to the vector $v$.  
 
In a nutshell, multiplying one matrix with the other is the same as applying matrix A to each of the vectors from matrix B separately and combining the resulting vectors into a new matrix.

&nbsp;&nbsp;&nbsp;&nbsp;
$$
\left[\begin{array}{cccc}
a_{11} & a_{12} & ... & a_{1n} \\
a_{21} & a_{22} & ... & a_{2n} \\
... & ... & ... & ... \\
a_{n1} & a_{n2} & ... & a_{nn}
\end{array} \right]
\left[\begin{array}{cccc}
b_{11} & b_{12} & ... & b_{1n} \\
b_{21} & b_{22} & ... & b_{2n} \\
... & ... & ... & ... \\
b_{n1} & b_{n2} & ... & b_{nn}
\end{array} \right] = 
$$

some text

$$
= \left[\begin{array}{cccc}
b_{11} a_{11} + b_{21} a_{12} + ... + b_{n1} a_{1n} & b_{12} a_{11} + b_{22} a_{12} + ... + b_{n2} a_{1n} & ... & b_{1n} a_{11} + b_{2n} a_{12} + ... + b_{nn} a_{1n} \\
b_{11} a_{21} + b_{21} a_{22} + ... + b_{n1} a_{2n} & b_{12} a_{21} + b_{22} a_{22} + ... + b_{n2} a_{2n} & ... & b_{1n} a_{21} + b_{2n} a_{22} + ... + b_{nn} a_{2n} \\
... & ... & ... & ... \\
b_{11} a_{n1} + b_{21} a_{n2} + ... + b_{n1} a_{nn} & b_{12} a_{n1} + b_{22} a_{n2} + ... + b_{n2} a_{nn} & ... & b_{1n} a_{n1} + b_{2n} a_{n2} + ... + b_{nn} a_{nn} 
\end{array} \right]
$$

### Matrix inverse

The inverse of a matrix represents opposite transformations to those of the original matrix - they bear the same magnitude but the direction is opposite. Multiplication of a matrix and its inverse always produces the identity matrix, so to speak transformations of each of the matrices cancel each other out:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$AA^{-1} = A^{-1}A = I$
 
The inverse can only be found for a square matrix.
 
### Determinant
 
The determinant can be defined only for square matrices and it represents the hypervolume (area for 2-dimensional space, volume for 3-dimensional space and so on) of these matrices in $n$-dimension space.
 
The most simple example is the determinant of the identity matrix. The identity matrix stretches in each direction of a vector space by a single unit so the volume of the space covered by such matrix is 1. The determinant of the identity matrix is therefore 1. However, if we take any row from it and multiply it by some number $k$, the length of the vector along the corresponding axis will be scaled by $k$, so is the volume of the space covered with the vectors. By scaling a single row of the identity matrix we changed the way it transforms other matrices along the appropriate axis. So to speak, determinant can be seen as a scaling factor of the volume of linear transformation. Negative determinant apart from scaling means also reverting direction of transformation.

If the determinant of a matrix is zero then the matrix is not invertible and has zero volume, so it can be interpreted as something that has zero volume, like a line or a dot. Such matrices are called degenerate or singular matrices.<br>
In addition, the rows of such matrices represent linearly dependent equations, while the columns are linearly dependent vectors.
 
## Linear equations
 
Matrices and vectors are generally used for solving systems of linear equations like these:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$\begin{cases}
a_{11} x_1 + a_{12} x_2 + ... + a_{1n} x_n = b_1 \\
a_{21} x_1 + a_{22} x_2 + ... + a_{2n} x_n = b_2 \\
.......................... \\
a_{m1} x_1 + a_{m2} x_2 + ... + a_{mn} x_n = b_m
\end{cases}$$
 
In these systems matrices are used to scale variables, so that each vector of a matrix scales the same variable in each equation appropriately. In addition, the whole system looks like matrix vector multiplication, so it could be rewritten as $Ax = b$. With the knowledge of matrix inverse we can solve the system of equations for $x$ just by multiplying both sides with the inverse of $A$:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$A^{-1}Ax = A^{-1}b$<br>
&nbsp;&nbsp;&nbsp;&nbsp;
$x = A^{-1}b$<br>
 
However, if the determinant of matrix $A$ is zero then it is impossible to calculate the inverse of it. If this is the case then the solution to the system of equations exists only in those rare situations when vector $b$ belongs to the plane or line represented by the matrix $A$, and there will be infinitely many such solutions.

This article covers the basics of linear transformation, whereas more about matrix properties can be found [here]({{ site.baseurl }}{% link _posts/2019-11-08-matrix-properties.md %}).
