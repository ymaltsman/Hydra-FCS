//Implicit Curves


setFunction({
    name: 'iCardioid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
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
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = pow(x*x + y*y - 2.0*a*x, 2.0) - 4.0*sin(freq*time)*a*a*(x*x - y*y);
        return vec4(u, u, u, 1.0);`
})

//
setFunction({
    name: 'iBicorn',
    type: 'src',
    inputs: [
          {
          type: 'float',
          name: 'freq',
          default: 1.0,
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
        float u = y*y*(a*a - x*x) - pow(x*x + sin(freq*time-y)*a*y - a, 3.0*a_exp);
        return vec4(u, u, u, 1.0);`
})

setFunction({
    name: 'iAstroid',
    type: 'src',
    inputs: [
          {
          type: 'float',
          name: 'freq',
          default: 1.0,
        },
        {
        type: 'float',
        name: 'wrap',
        default: 1.0,
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
        float u = pow(pow(x, 2.0), .33) + pow(pow(y, 2.0), .33*sin(freq*time-x))- pow(pow(amp*sin(freq*time), 2.0), .33);
        u = mod(u, wrap*5.0);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iCircle',
    type: 'src',
    inputs: [
            {
        type: 'float',
        name: 'freq',
        default: '1',
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = x*x + y*y - 1.0;
        u = fract(freq*time-u);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iCassOval',
    type: 'src',
    inputs: [
            {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'mult',
        default: 1.0,
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
        float u = pow(x*x + y*y, 2.0) - sin(freq*time- mult*y*x)*2.0*a*a*(x*x - y*y) - pow(a, 4.0) + pow(c, 4.0);
        
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iSextic',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq1',
        default: 1.0,
        },
            {
            type: 'float',
            name: 'freq2',
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
        _st = _st*3.0 - 1.5;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r*sin(1.1*freq2*time) - 4.0*a*pow(cos(theta/3.0), 3.0);
        u = fract(u+1.2*freq1*time);
        return vec4(u, u, u, 1.0);`
    })
    //
setFunction({
    name: 'iCochleoid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq1',
        default: 1.0,
        },
            {
        type: 'float',
        name: 'freq2',
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
        _st = _st*3.0 - 1.5;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r - a*(sin(theta-freq1*time)/(theta));
        u = mod(u, 10.0*cos(time*freq2-y) + 10.0*sin(time*freq2-x));
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iCissoid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'wrap',
        default: 10.0,
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
        u = mod(u, wrap*sin(freq*time-x)+wrap+1.0);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iSluzeConchoid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 3.0,
        },
        {
        type: 'float',
        name: 'k',
        default: 1.0,
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = a*(r*cos(theta)-a) - k*pow(cos(theta), 2.0);
        u = fract(u-freq*time);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iDevil',
    type: 'src',
    inputs: [
            
        {type: 'float', name: 'freq', default: 1.0},
        {type: 'float', name: 'wrap', default: 4.0},
        {
        type: 'float',
        name: 'k',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 3.0,
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = pow(y, 4.0)- pow(x, 4.0) + a*y*y + k*x*x;
        u = mod(u, wrap*sin(freq*time-y*x)+wrap);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iDFolium',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 3.0,
        },
    
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r - 4.0*a*cos(theta)*pow(sin(theta+freq*time), 2.0);
            return vec4(u, u, u, 1.0);`
    })


setFunction({
    name: 'iSpiral',
    type: 'src',
    inputs: [
            {type: 'float', name: 'freq', default: 1.0,},
        {
        type: 'float', name: 'a', default: 3.0,
        },
        { type: 'float', name: 'b', default: 1.0,},
        
    
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r -a*exp(theta*(1.0/tan(b)));
        u = fract(u-freq*time);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iFermatSpiral',
    type: 'src',
    inputs: [
        {
        type: 'float', name: 'freq', default: 1.0,
        },
        {
        type: 'float', name: 'a', default: 1.0,
        },
        { type: 'float', name: 'b', default: 1.0,},
        
    
    ],
    glsl:
    `   
        _st = _st*3.0 - 1.5;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r*r*cos(freq*time-theta) - a*a*theta;
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iFreethNephroid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq1',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'freq2',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 2.0,
        },
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y / x);
        float u = r - a * (1.0 + 2.0*sin(.5*theta-.5*freq2*time)); 
        u = fract(u-freq1*time);
        return vec4(u, u, u, 1.0);
    `,
    })

setFunction({
    name: 'iInvoluteCircle',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0, 
        },
        {
        type: 'float',
        name: 'wrap',
        default: 10.0,
        },
        
    ],
    glsl: `
        _st = _st * 4.0 - 2.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r*r - cos(theta+freq*time)*theta - 1.0;
        u = 1.0-mod(u, wrap);
        //u = fract(u-time);
        return vec4(u, u, u, 1.0);
    `,
    })

    

