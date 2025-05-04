//parametric curves
setFunction({
  name: 'pAstroid',
  type: 'combineCoord',
  inputs: [
    {
      type: 'float',
      name: 'e',
      default: '1.0',
  },
  {
      type: 'float',
      name: 'a',
      default: '1.0',
  },
  ],
  glsl: `
      float u = length(_c0);
      float x = a*pow(cos(u), 3.0);
      float y = a*pow(sin(u), 3.0);
      return vec2(_st.x + e*x, _st.y + e*y);
  `
})

setFunction({
  name: 'pEpicycloid',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 1.0},
  {type: 'float', name: 'n', default: 2.0},
  ],
  glsl: `
      float u = length(_c0);
      float x = _st.x;
      float y = _st.y;
      float a = .19*pow(pow(n, .7) + pow(n, -.1), .5);
      float b = 1.0/n;
      float v = (a + b)*cos(u) - b*cos((a/b + 1.0)*u);
      float w = (a + b)*sin(u) - b*sin((a/b + 1.0)*u);
      return vec2(e*v + x, e*w + y);
  `
})

setFunction({
  name: 'pLissajous',
  type: 'combineCoord',
  inputs: [
    {
      type: 'float',
      name: 'e0',
      default: 1.0,
    },
    {
      type: 'float',
      name: 'n',
      default: 7.0,
    }, // parameter for frequency of first sine wave
    {
      type: 'float',
      name: 'a',
      default: 1.0,
    },
    {
      type: 'float',
      name: 'b',
      default: 1.0,
    }, // parameter for amplitude of second sine wave
    {
      type: 'float',
      name: 'phase',
      default: 1.7,
    }, // optional phase shift
  ],
  glsl: `
    float colorLength = length(_c0); // Use color length as control parameter
    float angle = colorLength; // Treat color length as the angle
    float e = .5*e0;
    float x = a * sin(n * angle + phase);  // Use 'n' for frequency and 'a' for amplitude
    float y = b * sin(angle);                // Use 'b' for amplitude
    return vec2(e*x + _st.x, e*y + _st.y);
  `,
})

setFunction({
  name: 'pTalbot',
  type: 'combineCoord',
  inputs: [
    {
      type: 'float',
      name: 'e',
      default: 1.0,
    },
    {
      type: 'float',
      name: 'a',
      default: 1.0,
    }, // parameter for frequency of first sine wave
    {
      type: 'float',
      name: 'b',
      default: 1.0,
    },
    {
      type: 'float',
      name: 'f',
      default: 1.0,
    }, // parameter for amplitude of second sine wave
  ],
  glsl: `
    float u = length(_c0); // Use color length as control parameter
    float x = (a*a + f*f*pow(sin(u), 2.0))*cos(u)/a;  // Use 'n' for frequency and 'a' for amplitude
    float y = (a*a - 2.0*f*f + f*f*pow(sin(u), 2.0))*sin(u)/b;                // Use 'b' for amplitude
    return vec2(e*x + _st.x, e*y + _st.y);
  `,
})

setFunction({
  name: 'pWitch',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 1.0},
  {type: 'float', name: 'a', default: 0.2},
  ],
  glsl: `
      float u = length(_c0);
      
      float v = a*u;
      float w = a/(1.0 + u*u);
      return vec2(e*v + _st.x, e*w + _st.y);
  `
})

setFunction({
  name: 'pTricuspoid',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 1.0},
  {type: 'float', name: 'a', default: 0.2},
  ],
  glsl: `
      float u = length(_c0);
      
      
      float v = a*(2.0*cos(u) + cos(2.0*u));
      float w = a*(2.0*sin(u) - sin(2.0*u));
      return vec2(e*v + _st.x, e*w + _st.y);
  `
})

setFunction({
  name: 'pPlateau',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 1.0},
    {type: 'float', name: 'n', default: 7.0},
  ],
  glsl: `
      float u = length(_c0);
      u = u*6.0 - 6.0;
      float a = 1.0;
      float m = 1.0;
      float v = a*sin(u*(m+n))/sin((m-n)*u);
      float w = 2.0*a*sin(m*u)*sin(n*u)/sin(u*(m-n));
      return vec2(e*v + _st.x, e*w + _st.y);
  `
})

//implicit curves

setFunction({
  name: 'iCardioid',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'a',
      default: 1.0,
      },
      
  ],
  glsl:
  `   
      _st = _st*2.0 - 1.0;
      float x = _st.x;
      float y = _st.y;
      float u = pow(x*x + y*y - 2.0*a*sin(time*sinF + 3.14/2.0)*x, 2.0) - 4.0*a*a*cos(cosF*time)*(x*x - y*y);
      return vec4(u, u, u, 1.0);`
})

setFunction({
  name: 'iBicorn',
  type: 'src',
  inputs: [
    	 {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'a_exp',
      default: 1.0,
      },
      {
      type: 'float',
      name: 'a',
      default: 1.0,
      },
      
  ],
  glsl:
  `   
      _st = _st*4.0 - 2.0;
      float x = _st.x;
      float y = _st.y;
      float u = y*y*(a*a*cos(time*cosF) - x*x) - pow(x*x + 2.0*a*sin(3.14/2.0 + sinF*time)*y - a, 2.0*a_exp);
      return vec4(u, u, u, 1.0);`
})

setFunction({
  name: 'iAstroid',
  type: 'src',
  inputs: [
     {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'amp',
      default: '1.0',
      },
  ],
  glsl:
  `   
      _st = _st*2.0 - 1.0;
      float x = _st.x;
      float y = _st.y;
      float u = pow(pow(x, 2.0), .33*sin(time*sinF + 3.14/2.0)) + pow(pow(y, 2.0), .33)- pow(pow(amp*cos(time*cosF), 2.0), .33);
      return vec4(u, u, u, 1.0);`
  })

setFunction({
  name: 'iCircle',
  type: 'src',
  inputs: [
     {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
    {type: 'float', name: 'r', default: 1.0}
  ],
  glsl:
  `   
      _st = _st*2.0 - 1.0;
      float x = _st.x;
      float y = _st.y;
      float u = x*x*sin(time*sinF + 3.14/2.0) + y*y - r*cos(time*cosF);
      return vec4(u, u, u, 1.0);`
  })

setFunction({
  name: 'iSextic',
  type: 'src',
  inputs: [
     {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'a',
      default: 1.0,
      },
  ],
  glsl:
  `   
      _st = _st*3.0 - 1.5;
      float x = _st.x;
      float y = _st.y;
      float r = length(_st);
      float theta = atan(y/x);
      float u = r - 4.0*a*cos(cosF*time)*pow(cos((theta)/3.0 - sinF*time), 3.0);
      
      return vec4(u, u, u, 1.0);`
  })

setFunction({
  name: 'iCassOval',
  type: 'src',
  inputs: [
    	  {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'a',
      default: 1.0,
      },
      {
      type: 'float',
      name: 'c',
      default: '1.0',
      }
  ],
  glsl:
  `   
      _st = _st*2.0 - 1.0;
      float x = _st.x;
      float y = _st.y;
      float u = pow(x*x + y*y, 2.0*cos(time*cosF)) - 2.0*a*a*sin(time*sinF + 3.14/2.0)*(x*x - y*y) - pow(a, 4.0) + pow(c, 4.0);
      
      return vec4(u, u, u, 1.0);`
  })


setFunction({
  name: 'iCochleoid',
  type: 'src',
  inputs: [
      {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'a',
      default: 1.0,
      },
  ],
  glsl:
  `   
      _st = _st*3.0 - 1.5;
      float x = _st.x;
      float y = _st.y;
      float r = length(_st);
      float theta = atan(y/x);
      float u = r - a*sin(sinF*time + 3.14/2.0)*(sin(theta - cosF*time)/(theta));
      return vec4(u, u, u, 1.0);`
  })


setFunction({
  name: 'iCissoid',
  type: 'src',
  inputs: [
      {
      type: 'float',
      name: 'sinF',
      default: 0.0,
      },
    {
      type: 'float',
      name: 'cosF',
      default: 0.0,
      },
      {
      type: 'float',
      name: 'a',
      default: 1.0,
      },
  ],
  glsl:
  `   
      _st = _st*10.0 - 5.0;
      float x = _st.x;
      float y = _st.y;
      float r = length(_st);
      float theta = atan(y/x);
      float u = r - 2.0*a*tan(theta*cos(time*cosF))*sin(theta-sinF*time);
      return vec4(u, u, u, 1.0);`
  })


setFunction({
  name: 'pClelia',
  type: 'color',
  inputs: [
   {type: 'float', name: 'n', default: 1.33}],
  glsl: `
    
      float u = length(_c0);
      float r = 0.3;
      float x = cos(n*u)*cos(u);
      float y = cos(n*u)*sin(u);
      float z = sin(n*u);
      vec3 p = normalize(vec3(x,y,z));
      p = .5*p + .5;
      return vec4(p, 1.0);
  `
})

setFunction({
  name: 'pSphericalHelix',
  type: 'color',
  inputs: [
   {type: 'float', name: 'k', default: 0.56}],
  glsl: `
    
      float u = length(_c0);
      float q = (2.0*k/(1.0 - k));
      float r = 0.3;
      float a = q*r/(q+2.0);
      float x = a*((q+1.0)*cos(u) - u*cos(q+1.0));
      float y = a*((q+1.0)*sin(u) - u*sin(q+1.0));
      float z = 2.0*a*pow(q+1.0, .5)*cos(q/2.0)*u;
      vec3 position = normalize(vec3(x,y,z));

      // Scale and translate to fit within the RGB cube:
      position = position * 0.5 + 0.5;
      
      return vec4(position, 1.0);
  `
})


setFunction({
  name: 'rotateRGB',
  type: 'color',
  inputs: [
   {type: 'float', name: 'a', default: 0.5},
  {type: 'float', name: 'b', default: 0.5},
  {type: 'float', name: 'c', default: 0.5},],
  glsl: `
    
      mat3 mx = mat3(1.0, 0.0, 0.0, 0.0, cos(a), -sin(a),0.0, sin(a), cos(a));
      mat3 my = mat3(cos(b), 0.0, sin(b), 0.0, 1.0, 0.0, -sin(b), 0.0, cos(b) );
       mat3 mz = mat3(cos(c), -sin(c), 0.0, sin(c), cos(c), 0.0, 0.0,0.0, 1.0);
      vec3 k = _c0.xyz*mx*my*mz;
      return vec4(k,1.0);
  `
})


setFunction({
  name: 'noiseRGB',
  type: 'color',
  inputs: [
   {type: 'float', name: 'n', default: .10}],
  glsl: `
    
      vec3 d = _c0.xyz*(vec3(1.0) + n*vec3(sin(100.0*_c0.x + cos(_c0.y))*sin(100.0*_c0.y + cos(_c0.z))*sin(100.0*_c0.z)));
      return vec4(d,1.0);
  `
})

//parametric surfaces

setFunction({
  name: 'pSphere',
  type: 'src',
  inputs: [
    {type: 'float', name: 'CosF', default: 0.0},
    {type: 'float', name: 'SinF', default: 0.0},
  ],
  glsl: `
      _st = _st * 2.0 - 1.0;
      float x = (_st.x*2.0*3.14);
      float y = (_st.y*2.0*3.14);
      float r = 0.5 + .5*cos(x - CosF*time)*sin(y-SinF*time);
      float g = .5 + .5*sin(x-SinF*time)*sin(y - SinF*time);
      float b = .5 + .5*cos(y - CosF*time);
      return vec4(r, g, b, 1.0);
    `,
})

setFunction({
  name: 'pMobiusStrip',
  type: 'src',
  inputs: [ 
  ],
  glsl: `
      _st = _st * 2.0 - 1.0;
      float x = (_st.x*2.0*3.14);
      float y = _st.y - .5;
      float r = .5 + (.3 + y/2.0*cos(x/2.0))*cos(x);
      float g = .5 + (.3 + y/2.0*cos(x/2.0))*sin(x);
      float b = .3 + sin(x/2.0)*y/2.0;
      return vec4(r, g, b, 1.0);
    `,
})

setFunction({
  name: 'pKleinBottle',
  type: 'src',
  inputs: [
    {type: 'float', name: 'freq', default: 1.0},
    {
      type: 'float',
      name: 'r',
      default: 0.5,
    },
    
    

  ],
  glsl: `
      _st = _st * 2.0 - 1.0;
      float u = (_st.x*2.0*3.14);
      float v = (_st.y*2.0*3.14);
      
    float x = (r + cos(u / 2.0) * sin(v) - sin(u / 2.0) * sin(2.0 * v)) * cos(u);
    float y = (r + cos(u / 2.0) * sin(v) - sin(u / 2.0) * sin(2.0 * v)) * sin(u);
    float z = sin(u / 2.0) * sin(v) + cos(u / 2.0) * sin(2.0 * v);
      vec3 col = vec3(x,y,z) + 1.0;
      col = normalize(col);
      return vec4(col, 1.0);
    `,
})

setFunction({
  name: 'pCrossCap',
  type: 'src',
  inputs: [
    {type: 'float', name: 'freq', default: 1.0},
    {
      type: 'float',
      name: 'aa',
      default: 1.0,
    },
    
    

  ],
  glsl: `
      _st = _st * 2.0 - 1.0;
      float u = (_st.x*2.0*3.14);
      float v = (_st.y*2.0*3.14);
      float r = (aa * aa) * (sin(u) * sin(2.0 * v) / 2.0);
      float g = (aa * aa) * (sin(2.0 * u) * cos(v) * cos(v));
      float b = (aa * aa) * (cos(2.0 * u) * cos(v) * cos(v));
      vec3 col = vec3(r,g,b) + 1.0;
      col = normalize(col);
      return vec4(col, 1.0);
    `,
})

setFunction({
  name: 'pSteiner',
  type: 'src',
  inputs: [
    {type: 'float', name: 'freq', default: 1.0},
    {
      type: 'float',
      name: 'aa',
      default: 1.0,
    },
    
    

  ],
  glsl: `
      _st = _st * 2.0 - 1.0;
      float u = (_st.x*2.0*3.14);
      float v = (_st.y*2.0*3.14);
      float r = (aa * aa / 2.0) * (sin(2.0 * u) * cos(v) * cos(v));
      float g = (aa * aa / 2.0) * (sin(u) * sin(2.0 * v));
      float b = (aa * aa / 2.0) * (cos(u) * sin(2.0 * v));
      vec3 col = vec3(r,g,b) + 1.0;
      col = normalize(col);
      return vec4(col, 1.0);
    `,
})

setFunction({
  name: 'pTorus',
  type: 'src',
  inputs: [
    {type: 'float', name: 'freq', default: 1.0},
    {
      type: 'float',
      name: 'a',
      default: 1.0,
    },
    {
      type: 'float', name: 'c', default: .5,
    },
  ],
  glsl: `
      _st = _st * 2.0 - 1.0;
      float u = (_st.x*2.0*3.14);
      float v = (_st.y*2.0*3.14);
      float r = (c + a*cos(v))*cos(u);
      float g = (c + a*cos(v))*sin(u);
      float b = a*sin(v);
      vec3 col = vec3(r,g,b) + 1.0;
      col = normalize(col);
      return vec4(col, 1.0);
    `,
})

//implicit surfaces

setFunction({
  name: 'iCube',
  type: 'color',
  inputs: [],
  glsl: `
    
      float r = abs(_c0.r);
      float g = abs(_c0.g);
      float b = abs(_c0.b);
      float u = max(max(r, g), b) - 1.0;
      u = fract(u);
      return vec4(u,u,u,1.0);
  `
})

setFunction({
  name: 'iTorus',
  type: 'color',
  inputs: [
    {type: 'float', name: 'c', default: 0.5},
    {type: 'float', name: 'a', default: 1.0},
  ],
  glsl: `
    
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      float u = pow(a - sqrt(r*r - g*g), 2.0) + b*b - c*c;
      u = fract(u);
      return vec4(u,u,u,1.0);
  `
})

setFunction({
  name: 'iPlane',
  type: 'color',
  inputs: [
    {type: 'float', name: 'nx', default: 1.0}, //charge value
    {type: 'float', name: 'ny', default: 1.0},
    {type: 'float', name: 'nz', default: 1.0},
  ],
  glsl: `
    
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      float u = nx*r + ny*g + nz*b;
      u = fract(u);
      return vec4(u,u,u,1.0);
  `
})

setFunction({
  name: 'iSteiner',
  type: 'color',
  inputs: [
    {type: 'float', name: 'a', default: 1.0},
  ],
  glsl: `
    
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      float u = pow(r*g,2.0) + pow(g*b, 2.0) + pow(b*r, 2.0) - a*a*r*g*b;
      u = fract(u);
      return vec4(u,u,u,1.0);
  `
})

setFunction({
  name: 'iWineGlass',
  type: 'color',
  inputs: [
    {type: 'float', name: 'k', default: 3.2},
  ],
  glsl: `
    
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      float u = r*r + g*g - pow(log(b + k), 2.0) - .02;
      u = fract(u);
      return vec4(u,u,u,1.0);
  `
})

setFunction({
  name: 'iGenus2',
  type: 'color',
  inputs: [
    
  ],
  glsl: `
    
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      float u = 2.0*g*(g*g - 3.0*r*r)*(1.0-b*b) + pow(r*r + g*g, 2.0) - (9.0*b*b - 1.0)*(1.0 - b*b);
      u = fract(u);
      return vec4(u,u,u,1.0);
  `
})



setFunction({
  name: 'ipSphere',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 0.1},
    {type: 'float', name: 'a', default: 1.0},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x = atan(g/r); 
    float y = acos(b/a);
    
    return vec2(x + e*_st.x, y + e*_st.y);
  `,
})

setFunction({
  name: 'ipTorus',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 0.1},
    {type: 'float', name: 'a', default: 1.0},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x = atan(g/r); 
    float y = asin(b/a);
    
    return vec2(x + e*_st.x, y + e*_st.y);
  `,
})

setFunction({
  name: 'ipMobiusStrip',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 0.1},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x = atan(g/r); 
    float y = b/sin(x/2.0);
    
    return vec2(x + e*_st.x, y + e*_st.y);
  `,
})

setFunction({
  name: 'ipCylinder',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 0.1},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x = r; 
    float y = atan(b/g);
    
    return vec2(x + e*_st.x, y + e*_st.y);
  `,
})

setFunction({
  name: 'ipKleinBottle',
  type: 'combineCoord',
  inputs: [
    {type: 'float', name: 'e', default: 0.1},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float y = atan(g/r); 
    float x = 2.0 * atan ( ((b / sin(y/2.0)) - cos(y/2.0) * tan(y))/ (sin(y/2.0) * (1.0 + tan(y)*tan(y))) );
    
    return vec2(x + e*_st.x, y + e*_st.y);
  `,
})

setFunction({
  name: 'ipCrossCap',
  type: 'combineCoord',
  inputs: [
    
    {type: 'float', name: 'e', default: 0.1},
    {type: 'float', name: 'a', default: 1.0},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x = 0.5*atan(g/b);
    float y = 0.5*asin((2.0/(a*a))*r*(1.0/sin(x)));
    
    return vec2(x + e*_st.x, y + e*_st.y);
  `,
})

//iCissoid().pEpicycloid(iCircle()).pSphericalHelix().out()

//parametric hypersurfaces 

setFunction({
  name: 'hpSphere',
  type: 'color',
  inputs: [
    {type: 'float', name: 'a', default: 1.0},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x11 = a*cos(r);
    float x12 = a*sin(r)*cos(g);
    float x21 = a*sin(g)*cos(b);
    float x22 = a*sin(r)*sin(g)*sin(b);
    vec4 s = vec4(x11, x12, x21, x22) + 1.0;
    s = normalize(s);
    

    
    return s;
  `,
})

setFunction({
  //source: https://people.math.harvard.edu/~knill/teaching/math22a2018/exhibits/threetorus/index.html
  name: 'hpTorus',
  type: 'color',
  inputs: [
    {type: 'float', name: 'c', default: 1.0},
    {type: 'float', name: 'a', default: .5},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x11 = (c + a*cos(r))*cos(g);
    float x12 = (c + a*cos(r))*sin(g);
    float x21 = (c + a*sin(r))*cos(b);
    float x22 = (c + a*sin(r))*sin(b);
    vec4 s = vec4(x11, x12, x21, x22) + 1.0;
    s = normalize(s);
    
    return s;
  `,
})

setFunction({
  //source: https://en.wikipedia.org/wiki/Hypercone
  name: 'hpCone',
  type: 'color',
  inputs: [
    {type: 'float', name: 'c', default: 1.0},
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x11 = b*c*cos(r)*cos(g);
    float x12 = b*c*cos(r)*sin(g);
    float x21 = b*c*sin(r);
    float x22 = b;
    vec4 s = vec4(x11, x12, x21, x22);
    s = normalize(s + 1.0);
    
    return s;
  `,
})


setFunction({
name: 'rotateRGBA',
type: 'color',
inputs: [
  { type: 'float', name: 'a', default: 0.5 },
  { type: 'float', name: 'b', default: 0.5 },
  { type: 'float', name: 'c', default: 0.5 },
  { type: 'float', name: 'd', default: 0.5 }
],
glsl: `
  mat4 mx = mat4(
    1.0,     0.0,       0.0,       0.0,
    0.0,     cos(a),   -sin(a),    0.0,
    0.0,     sin(a),    cos(a),    0.0,
    0.0,     0.0,       0.0,       1.0
  );

  mat4 my = mat4(
    cos(b),  0.0,     sin(b),    0.0,
    0.0,     1.0,     0.0,       0.0,
   -sin(b),  0.0,     cos(b),    0.0,
    0.0,     0.0,     0.0,       1.0
  );

  mat4 mz = mat4(
    cos(c), -sin(c),  0.0,      0.0,
    sin(c),  cos(c),  0.0,      0.0,
    0.0,     0.0,     1.0,      0.0,
    0.0,     0.0,     0.0,      1.0
  );

  mat4 mw = mat4(
    cos(d), 0.0,   0.0,   -sin(d),
    0.0,    1.0,   0.0,    0.0,
    0.0,    0.0,   1.0,    0.0,
    sin(d), 0.0,   0.0,    cos(d)
  );

  vec4 k = _c0 * mx * my*mz*mw;
  return k;
  `,
})



setFunction({
  //source: https://en.wikipedia.org/wiki/Hypercone
  name: 'hpConeOblique',
  type: 'color',
  inputs: [
    {type: 'float', name: 'c', default: 1.0},
    {type: 'float', name: 'vx', default: 1.0},
    {type: 'float', name: 'vy', default: 1.0},
    {type: 'float', name: 'vz', default: 1.0},
    
  ], 
  glsl: `
    float r = _c0.r;
    float g = _c0.g;
    float b = _c0.b;
    
    float x11 = vx*b + b*c*cos(r)*cos(g);
    float x12 = vy*b + b*c*cos(r)*sin(g);
    float x21 = b*vz + b*c*sin(r);
    float x22 = b;
    vec4 s = vec4(x11, x12, x21, x22);  
    return s;
  `,
})