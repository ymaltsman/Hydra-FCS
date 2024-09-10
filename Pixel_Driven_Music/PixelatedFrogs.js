
await loadScript('https://hyper-hydra.glitch.me/hydra-pixels.js')
await loadScript("https://cdn.jsdelivr.net/gh/atfornes/Hydra-strudel-extension@1/hydra-strudel.js")
await loadScript("https://cdn.statically.io/gh/ymaltsman/Hydra-FCS/55a80a3/HydraFCS.js")
await initHydraStrudel();

update = ()=> {
  xc = .5
  yc = .5
  pixel1 = o0.read(width*xc,yc*height)
}

bpm = 10
polymeter = ref(()=>'<' + (() => pixel1[0] % 12)() + ',' + ' ' + (() => pixel1[1] % 12)() + ' ' + (() => pixel1[2] % 12)() +  + ' ' + ', ' + (() => pixel1[1] % 12)() + ' ' + (() => pixel1[0] % 12)() + '>*5')

pattern1 = ref(()=>'<' + ' ' + (() => pixel1[1] % 12)() + ' ' + '>*<2, 2.1>')
percussion = ref(()=> ' ' + (() => pixel1[0] % 12)() + ' ' + (() => pixel1[0] % 11)() + ' ~ ' + ' ')
pMobiusStrip([.1, .5])
        .hue([.2, .5, .8, .95]).iCube()
		.pLissajous(iCircle([.2,.5, .1]).pixelate())
			.rotate([time, -time, time, -time, -time]) 
        .scale(2)
  .out()


stack(
  		
  		n(percussion).euclid(ref(()=>3 + pixel1[1] % 3), ref(()=>pixel1[0] % 7 + 5))
  				.delay(ref(() => pixel1[2] % 3))
  				.off(1/2, add("<2 5>"))
  				.off(1/3, add(4))
  			.s("sawtooth:<16 12 16 32> square")
  				.penv("<<0 3>, <2 -2>>")
  			.lpf("500").lpenv(5)
  		
  		
  		
  		
	)
	.play()
