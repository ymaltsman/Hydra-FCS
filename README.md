# Hydra-FCS
Functional Curves and Surfaces (FCS) is an extension to Hydra for composing patterns inspired by algebraic geometry.
To create visuals with FCS, go to [Hydra](https://hydra.ojack.xyz/) and include the following line at the top:
```
await loadScript("https://cdn.statically.io/gh/ymaltsman/Hydra-FCS/3102e33/HydraFCS.js")
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

Some curves can also be represented parametrically, or explicitly. For example, we can draw a circle by plotting the points

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
Surfaces can also be represented parametrically with two control parameters. They thus constiture maps from 2 to 3 dimensions, so we can use them to map from position to RGB color. For example:
```
pTorus().out()
```
Lastly, surfaces can be represented with implicit equations (closely related to Signed Distance Fields). These are maps from 3 to 1 dimensions, enabling us to map from rgb to greyscale. 
```
pSphere().iTorus().out()
```
We can feed these maps between each other in a large variety of ways. For example:
```
pTorus().
  pCardioid(iCardioid().pAstroid(pSphere())).
  iSphere().
  out()
```
You can see all of the available functions and their parameters in HydraFCS.js. Feel free to reach out, raise an issue, or PR.
## List of Functions and their default parameters
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
