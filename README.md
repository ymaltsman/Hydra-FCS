# Hydra-FCS
Functional Curves and Surfaces (FCS) is an extension to Hydra for composing patterns inspired by algebraic geometry.
To create visuals with FCS, go to [Hydra](https://hydra.ojack.xyz/) and include the following line at the top:
```
await loadScript("https://cdn.statically.io/gh/ymaltsman/Hydra-FCS/3d96bff/HydraFCS.js")
```
FCS consists of four types of functions which can be composed with each other and with other Hydra functions to create time varying visual patterns: implicit curves, parametric curves, implicit surfaces, and parametric surfaces.

A curve can be represented implicitly if there is some equation whose solution constitutes the points making up the curve. For example, a circle can be represented implicitly with the equation:

$$
f(x,y) = x^2 + y^2 - 1.0
$$

Implicit curves thus map from two dimensions to one dimension, so we use them to map positions on the screen to a greyscale color. Try the following code:
```
iCircle(1).out()
```
Changing the number in the parantheses changes the frequency of the visual.

For some implicit equations, we can rearrange them to solve for $y$ \textit{explicitly} as a function of $x$. With the circle example above, if we set the function to 0 and solve for $y$ we get

$$
y = \pm \sqrt{1 - x^2}
$$

Explicit equations offer a map from one dimension to one dimension, which we utilize as a map from greyscale color space to itself. For example:
```
iCissoid().eCircle(2, 5).eStrophoid(1,10).out()
```

Some curves can also be represented parametrically. For example, we can draw a circle by plotting the points

$$
x(t) = cos(t)
$$

$$
y(t) = sin(t)
$$

for $t \in [0, 2\pi]$. Parametric equations are maps from 1 to 2 dimensions, so we use them to modulate position based on an input texture. For example:
```
iCircle().pSpiral(iCardioid()).out()
```


Surfaces can also be represented parametrically with two control parameters. For example, one can construct a torus of outer radius $c$ and tube radius $a$ by varying the parameters $\theta$ and $\phi$ from $0$ to $2\pi$ and plotting the equations

$$
x(\theta, \phi) = (c + a\cos(\phi))\cos(\theta)
$$

$$
y(\theta, \phi) = (c + a\cos(\phi))\sin(\theta)
$$

$$
z(\theta, \phi) = a\sin(\phi)
$$

They thus constiture maps from 2 to 3 dimensions, so we can use them to map from position to RGB color:
```
pTorus(1, .2, .1).out()
```
Here the first parameter corresponds to the time frequency, and the next two correspond to $c$ and $a$, respectively.

Surfaces can be represented with implicit equations (closely related to Signed Distance Fields). These are maps from 3 to 1 dimensions, enabling us to map from rgb to greyscale. A sphere can be represented implicitly with the equation
$$
f(x,y,z) = x^2 + y^2 + z^2 - 1.0
$$
The following code converts the RGB colors produced by a parametric sphere to greyscale with an implicit Torus:
```
pSphere().iTorus().out()
```
We can feed these maps between each other in a large variety of ways. For example:
```
pTorus().
  pCardioid(iCardioid().pAstroid(pSphere())).
  kaleid().
  iSphere().
  out()
```
We can modulate screen coordinates with RGB textures using inverse parametric surfaces and parametric hypersurfaces. To obtain an inverse parametric surface, we solve for the two control parameters in the equation for a parametric surfaces. FOr example, if we consider the above equations for a torus and solve for $\theta$ and $\phi$ we get

$$
\theta = \arctan(y/x)
$$

$$
\phi = \arcsin(z/a)
$$

We scale screen coordinates with the two values obtained at every point. A code example:
```
iDevil().ipCylinder(pCrossCap().repeat()).out()
```
Finally, to parameterize a four dimensional hypersurface we use three control parameters. For example we can obtain a 3-sphere with the equations:

$$
x(\theta_1, \theta_2, \theta_3) = R\cos(\theta_1)
$$

$$
y(\theta_1, \theta_2, \theta_3) = R\sin(\theta_1)\cos(\theta_2)
$$

$$
z(\theta_1, \theta_2, \theta_3) = R\sin(\theta_1)\sin(\theta_2)\cos(\theta_3)
$$

$$
w(\theta_1, \theta_2, \theta_3) = R\sin(\theta_1)\sin(\theta_2)\sin(\theta_3).
$$

Thus a parametric 4d surface takes three inputs and spits out four outputs, so we can use it as a map taking a RGB color as input and outputting the entries of 2x2 matrix, transforming screen position:
```
iSpiral(1, .5).hpCone(pMobiusStrip(1, 7).pSpiral(iCircle()), .6).out()
```

You can see all of the available functions and their parameters in HydraFCS.js. Feel free to reach out, raise an issue, or PR.
## List of Functions and their default parameters 
This is not even close to an exhaustive list of cool curves and surfaces that are out there See e.g. [fifty famous curves](https://elepa.me/wp-content/uploads/2013/11/fifty-famous-curves.pdf) and [3DXM surface gallery](https://virtualmathmuseum.org/Surface/gallery_o.html). Feel free to add more functions to the library. There are also potentially other interesting ways of mapping curves and surfaces to visuals, and if you have any ideas feel free to reach out to me or raise an issue to discuss.
### Implicit Curves
The convention for implicit curves is that frequency in time is always the first parameter.
```
iCardioid(1,1)
iBicorn(1,1,1)
iAstroid(1,1,1)
iCircle(1)
iCassOval(1,1,1,1)
iSextic(1,1,1)
iCochleoid(1,1,1)
iCissoid(1,1,10)
iSluzeConchoid(1,3,1)
iDevil(1,4,1,3)
iDFolium(1,3)
iSpiral(1,3,1)
iFermatSpiral(1,1,1)
iFreethNephroid(1,1,2)
iInvoluteCircle(1,10)
```
### Parametric Curves
```
pAstroid(1)
pSpiral()
pCardioid(1,2)
pConchoid(1)
pEpicycloid(1,1)
pDescartesFolium(1,1)
pHypocycloid(1,2)
pHypotrochoid(1,2,1)
pInvoluteCircle(1)
pCircle(1)
pLissajous(5,1,1,0)
pNephroid(1)
pPlateau(2,1)
pTalbot(1)
```
### Explicit Curves
Explicit curves also animate over time, and the first parameter is always the temporal frequency.
```
eCircle(1,1)
eBicorn(1)
eCatenary(1)
eCissoid(1,2)
eLame(2, 2.5, 3, 2)
eNewton(2, .4, 1, .8)
ePearl(2, 1, 1, 1, 1, 1)
ePear(2, 2, 9)
eStrophoid(2, 5)
eTrisectrix(2, 1)
```
### Parametric Surfaces
As with implicit curves (above), the convention here is that the first parameter is frequency in time.
```
pSphere(1,1)
pMobiusStrip(1,1)
pCylinder(1,1)
pKleinBottle(1,1)
pCrossCap(1,1)
pSteiner(1,1)
pTorus(1,1,.5)
```
### Implicit Surfaces
```
iSphere()
iCube()
iTorus(.5, 1)
iPlane(1,1,1)
iSteiner(1)
iWineGlass(3.2)
iGenus2()
```
### Inverse Parametric Surfaces
```
ipSphere(1)
ipTorus(1)
ipMobiusStrip()
ipCylinder()
ipKleinBottle()
ipCrossCap(1)
```
### Parametric Hypersurfaces
```
hpSphere(1)
hpTorus(1, .5)
hpCone(1)
hpConeOblique(1,1,1,1)
```
