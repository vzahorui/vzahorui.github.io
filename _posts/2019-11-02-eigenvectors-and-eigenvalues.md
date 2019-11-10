---
layout: single
title: "Eigenvectors and eigenvalues"
description: "Explaining eigenvectors and eigenvalues"  
category: "Linear Algebra"
tags: vector identity-matrix determinant matrix matrix-diagonalization  
date: 2019-11-02
---
 
Eigenvectors and eigenvalues are heavily used in dimension reduction and finding principle components.   
 
Essentially, eigenvectors are such special cases of vectors which by multiplying with a square matrix result into their own scaled version:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M \cdot x = \lambda \cdot v$,<br>
where $v$ is the eigenvector, $\lambda$ is the eigenvalue and $M$ is some square matrix.   
 
The direction of the eigenvector is not changing after performing transformation on it. In fact, eigenvectors just form a basis for particular matrix, which may only be scaled if the matrix is multiplied by this vector. In other words, scaling is all that matrix does for their own basis vectors - that is eigenvectors.
 
## Calculation   
 
Let's rewrite the equation above:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M v - \lambda v = 0$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M v - \lambda I v = 0$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(M - \lambda I)v = 0$
 
By itself multiplication by identity matrix $I$ doesn't change anything. The identity matrix is only used in order for the operation in parenthesis to be valid.

The expression $(M - \lambda I)v$ equals to the null space if either $v$ or $M - \lambda I$ equals to zero. Since we want to find a non-zero solution to eigenvectors, we want to know when the expression $(M - \lambda I)$ represents squishing into the null space. Matrices, as well as vectors, represent linear transformations. The determinant of a matrix represents volume by which the matrix transformation is scaled with respect to the identity matrix (identity matrix represents no transformation). If the determinant of a matrix is equal to zero then such transformation represents exactly squishing into the null space. From here we must find such $\lambda$ where $det(M - \lambda I) = 0$.<br>
The number of eigenvalues of a matrix equals to the number of dimensions of the matrix, however not all of them may be unique.

After finding values of $\lambda$ we can find eigenvectors $v$ for each of them by plugging already known $\lambda$ into the same equation:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(M - \lambda I)v = 0$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$
\left[\begin{array}{cccc}
a_{11}-\lambda & a_{12} & ... & a_{1n} \\
a_{21} & a_{22}-\lambda & ... & a_{2n} \\
... & ... & ... & ... \\
a_{n1} & a_{n2} & ... & v_{nn}-\lambda
\end{array} \right]
\left[\begin{array}{c}
v_{1} \\
v_{2} \\
... \\
v_{n}  
\end{array} \right]
=   
\left[\begin{array}{c}
0 \\
0 \\
... \\
0  
\end{array} \right]
$$
 
The rows of the matrix represent coefficients of the equations equaling zero. The aim is to find such values of variables which would satisfy all equations.<br>
It should be noted however that there is an infinite number of solutions to the eigenvectors given a particular eigenvalue.
 
## Matrix diagonalization
 
Suppose we have a system of orthogonal vectors which form a basis for a matrix $M$.  
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$\begin{cases}
Mv_1 = \lambda_1 v_1 \\  
Mv_2 = \lambda_2 v_2
\end{cases}$$
 
In this case eigenvectors form a matrix of eigenvectors:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$$
M \left[\begin{array}{cc}
 \\
x_1 & x_2\\  
\\
\end{array} \right] =
\left[\begin{array}{cc}
 \\
\lambda_1 x_1 & \lambda_2 x_2\\  
\\
\end{array} \right] =
\left[\begin{array}{cc}
 \\
x_1 & x_2\\  
\\
\end{array} \right]
\left[\begin{array}{cc}
\lambda_1 & 0 \\
0 & \lambda_2 \\  
\end{array} \right]
$$
 
From here we have a general notation for such transformation as $MV = V \Lambda$, where $\Lambda$ is a diagonal matrix with the eigenvalues as its diagonal elements. Furthermore, by multiplying both parts of the equation by $V^{-1}$ from the right we get this:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M = V \Lambda V^{-1}$
 
From this follows that any square matrix can be transformed into a combination a special matrices, which will share its fundamental properties.
