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
      name: 'a',
      default: 1.0,
      },
      
  ],
  glsl:
  `   
      _st = _st*2.0 - 1.0;
      float x = _st.x;
      float y = _st.y;
      float u = pow(x*x + y*y - 2.0*a*x, 2.0) - 4.0*a*a*(x*x - y*y);
      return vec4(u, u, u, 1.0);`
})

setFunction({
  name: 'iBicorn',
  type: 'src',
  inputs: [
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
      float u = y*y*(a*a - x*x) - pow(x*x + 2.0*a*y - a, 2.0*a_exp);
      return vec4(u, u, u, 1.0);`
})

setFunction({
  name: 'iAstroid',
  type: 'src',
  inputs: [
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
      float u = pow(pow(x, 2.0), .33) + pow(pow(y, 2.0), .33)- pow(pow(amp, 2.0), .33);
      return vec4(u, u, u, 1.0);`
  })

setFunction({
  name: 'iCircle',
  type: 'src',
  inputs: [
    {type: 'float', name: 'r', default: 1.0}
  ],
  glsl:
  `   
      _st = _st*2.0 - 1.0;
      float x = _st.x;
      float y = _st.y;
      float u = x*x + y*y - r;
      return vec4(u, u, u, 1.0);`
  })

setFunction({
  name: 'iSextic',
  type: 'src',
  inputs: [
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
      float u = r - 4.0*a*pow(cos(theta/3.0), 3.0);
      return vec4(u, u, u, 1.0);`
  })

setFunction({
  name: 'iCassOval',
  type: 'src',
  inputs: [
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
      float u = pow(x*x + y*y, 2.0) - 2.0*a*a*(x*x - y*y) - pow(a, 4.0) + pow(c, 4.0);
      
      return vec4(u, u, u, 1.0);`
  })


setFunction({
  name: 'iCochleoid',
  type: 'src',
  inputs: [
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
      float u = r - a*(sin(theta)/(theta));
      return vec4(u, u, u, 1.0);`
  })


setFunction({
  name: 'iCissoid',
  type: 'src',
  inputs: [
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
      float u = r - 2.0*a*tan(theta)*sin(theta);
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

//iCissoid().pEpicycloid(iCircle()).pSphericalHelix().out()