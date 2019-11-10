---
layout: single
title: "Matrix properties"
description: Explaining some of the properties of matrices
category: "Linear Algebra"
tags: inverse rank full-rank-matrix determinant vector condition-number ill-conditioned-matrix
date: 2019-11-08
---
 
Below I've provided intuition behind some of the properties of matrices, which are useful to understand in order to apply them in more complex algorithms.  
 
## Rank of a matrix
 
Rank of matrix is defined as a number of linearly independent rows (or columns) in the matrix.<br>
If all rows (or columns) of a matrix are independent then such matrix is call full-rank matrix. That being said, in a full rank matrix there are none vectors which can be represented as a linear combination of other vectors of this matrix.
 
## Matrix inverse
 
The inverse of a matrix represents opposite transformations to those of the original matrix - they bear the same magnitude but the direction is opposite. Multiplication of a matrix and its inverse always produces the identity matrix, so to speak transformations of each of the matrices cancel each other out:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$AA^{-1} = A^{-1}A = I$
 
The inverse can only be found for a square matrix.  
 
## Determinant
 
The volume of the identity matrix $I$ is 1, as it spans along each of the orthogonal axes exactly by 1. The determinant of the identity matrix is 1. However, if we take any row from it and multiply it by some number $k$, the length of the vector along correspond axis will be scaled by $k$. So is the determinant, which will be become $1 \cdot k$.
 
Any matrix can be viewed as a linear transformation. The identity matrix $I$ represents no transformation to the object, and if we take any matrix or vector and multiply it with identity matrix (regardless if right or left), we will end up with the same original matrix or vector. <br>
By scaling a single row of the identity matrix we changed the way it transfroms other matrices along the appropriate axis. So to speak, determinant can be seen as a scaling factor of the volume of linear transformation with regard to the identity matrix.  
 
If the determinant of a matrix is -1 then the whole transformation of a matrix is just reversing its direction along each of its axes. In other words, negative determinant apart from scaling means also reverting direction of transformation.
 
If the determinant of a matrix equals zero then the matrix is not invertible and has zero volume, which can be interpreted as squishing into null space. Such matrices are called degenerate or singular matrices.<br>
In addition, the rows of such matrix represent linearly dependent equations, while the columns are linearly dependent vectors.

## Poorly conditioned matrices
 
Also called ill-conditioned matrices have high relation between their biggest and smallest eigenvalues. Such relation is actually called a condition number, and it is used to estimate how hard it would be to invert a matrix. High condition number means that at least one vector is highly correlated with the others and represents mainly noise in the input data. Computation of the inverse of such matrix may be inaccurate due to the rounding in floating point numbers. 