await loadScript('https://hyper-hydra.glitch.me/hydra-pixels.js')
await loadScript("https://cdn.jsdelivr.net/gh/atfornes/Hydra-strudel-extension@1/hydra-strudel.js")
await loadScript("https://cdn.statically.io/gh/ymaltsman/Hydra-FCS/3449358/HydraFCS.js")
await initHydraStrudel();

update = ()=> {
  xc = .5
  yc = .5
  pixel1 = o0.read(width*xc,yc*height)
}



pattern1 = ref(()=>'<' + ' ' + (() => pixel1[0] % 12)() + ' ' + '>')
pTorus(1, .2, .3).hue().luma(.5).ipTorus(pSteiner(), 3).rotate(()=>2*time).scale(3).out()


stack(
  		n(pattern1)
  		.euclid(3, 8)
  		.lastOf(4, x=>x.off(1/3, add(2))
                .off(1/2, add(4)))
  		.lastOf(8, x=> x.clip(ref(() => pixel1[1] % 30)))
  		.room(1)
  		.s("triangle")
  			.gain("1.5 1 1.5 1.5")
  		//.off(1/3, add(2))
             //.off(1/2, add(4))
  		
  		.scale("D:dorian")
  		
  		
	)
	.play()




