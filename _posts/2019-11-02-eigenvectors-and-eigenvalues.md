---
layout: single
title: "Eigenvectors and eigenvalues"
description: "Explaining eigenvectors and eigenvalues"   
category: "Linear Algebra"
tags: vector identity-matrix determinant matrix matrix-diagonalization column-space basis PCA principal-component-analysis SVD singular-value-decomposition
date: 2020-07-26
---
 
In machine learning eigenvectors and eigenvalues is one of the heavily used concepts, which among other things is fundamental for dimension reduction and finding principal components.
 
Let's recall that matrices represent linear transformations and their columns are just vectors of some specific length pointing in certain directions. Performing matrix vector multiplication results in a scaled linear combination of the vectors of a matrix, and the set of all possible combinations spanning the vector space is called column space of a matrix.  
 
A matrix usually has eigenvectors - such special vectors which by multiplying with the matrix do not change their direction. These vectors belong to the lines in space, around which the whole matrix column space spans, so they serve as some sort of axes. Eigenvectors may be only stretched or shrunk reflecting the volume of a linear transformation, and the factor by which an eigenvector is scaled is called eigenvalue. Representing matrix through eigenvectors and eigenvalues makes the whole linear transformation easier to understand because in this case it becomes just scaling by factor of eigenvalues along principal direction (eigenvectors).
 
Essentially, eigenvectors are such special cases of vectors which by multiplying with a square matrix result into their own scaled version:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M \cdot v = \lambda \cdot v$

where $v$ is the eigenvector, $\lambda$ is the eigenvalue and $M$ is some square matrix.
 
It is worth mentioning that not all matrices have eigenvectors. For example if all that a matrix represents is just 2-dimensional clockwise rotation then there will be no vector which will still be pointing into the same direction after applying matrix transformation to it.

## Calculation
 
Let's rewrite the equation above:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M v - \lambda v = 0$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$M v - \lambda I v = 0$
 
&nbsp;&nbsp;&nbsp;&nbsp;
$(M - \lambda I)v = 0$
 
By itself multiplication by identity matrix $I$ doesn't change anything. The identity matrix is only used in order for the operation in parenthesis to be valid. Matrix $M - \lambda I$ is just matrix $M$ where $\lambda$ is subtracted from its diagonal elements.
 
The expression $(M - \lambda I)v$ is certainly zero if $v$ is a zero vector. Also recall that if a matrix has zero determinant it represents squishing into lower dimensional space. So if $M - \lambda I$ has zero determinant then it squishes any vector into zero vector. From here we must find such $\lambda$ where $det(M - \lambda I) = 0$.<br>
 
After finding values of $\lambda$ we can find eigenvectors $v$ for each of them by plugging already known $\lambda$ into the same equation $(M - \lambda I)v = 0$ and solving a system of linear equations for each $\lambda$:
 
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
 
## Matrix diagonalization
 
Diagonal matrices are extremely useful in linear algebra because they make it easy working with them, including solving systems of linear equations represented with these matrices.
 
If there are enough eigenvectors of a matrix to span the full column space then it is possible to select eigenvectors to form a [new basis]({{ site.baseurl }}{% link _posts/2020-07-17-change-of-basis.md %}) with them. Intuitively, in a new basis consisting of eigenvectors the same matrix shows how far each of the basis vectors span, and for that diagonal matrix of eigenvalues suits the most.  
 
For our well known formula $M \cdot v = \lambda \cdot v$ instead of single eigenvector we can take a whole set of eigenvectors and put them into another matrix $V$, while representing eigenvalues as a diagonal matrix $\Lambda$ with non-zero values equal to the respective eigenvalues. Multiplication $V \Lambda$ will make the same effect on the eigenvectors as multiplying them separately with their respective eigenvalues. Now let's take a look at how we can rearrange the equation:
 
&nbsp;&nbsp;&nbsp;&nbsp;
$MV = V \Lambda$ <br>
&nbsp;&nbsp;&nbsp;&nbsp;
$V^{-1}MV = V^{-1}V\Lambda$ <br>
&nbsp;&nbsp;&nbsp;&nbsp;
$V^{-1}MV = \Lambda$
 
At the end we landed with the expression for the [change of basis]({{ site.baseurl }}{% link _posts/2020-07-17-change-of-basis.md %}). From here follows a very important conclusion: a matrix translated to the basis of its eigenvectors becomes diagonal with the eigenvalues as its elements.

Interestingly, the determinant of the original matrix representing is equal to the product of eigenvalues. One intuitive explanation is that the determinant represents the volume of the linear transformation encoded in a matrix. Eigenvalues, on the other hand, show how much the matrix spans in each of its principal directions which also can be seen as a measure of volume of transformation. In addition, if at least one eignevalue of a matrix is zero then its determinant is zero and its vectors are not linearly independent.

Apart from being easy to manipulate, the diagonal matrix of eigenvalues provides useful information as to how much the eigenvectors span, which is useful in determining the importance of so-called components which define matrix transformation. Bigger eigenvalues correspond with bigger variation along certain eigenvectors so they are more important to consider when thinking about matrix transformation. This is the central idea in principal component analysis (PCA) and [singular value decomposition]({{ site.baseurl }}{% link _posts/2019-11-03-singular-value-decomposition.md %}) (SVD).