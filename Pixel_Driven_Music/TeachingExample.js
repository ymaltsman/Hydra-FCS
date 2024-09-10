await loadScript('https://hyper-hydra.glitch.me/hydra-pixels.js')
await loadScript("https://cdn.jsdelivr.net/gh/atfornes/Hydra-strudel-extension@1/hydra-strudel.js")
await loadScript("https://cdn.statically.io/gh/ymaltsman/Hydra-FCS/55a80a3/HydraFCS.js")
await initHydraStrudel();

update = ()=> {
  xc = .5
  yc = .5
  pixel1 = o0.read(width*xc,yc*height)
}


pattern = ref(()=>'<' + (() => pixel1[0] % 12)() + '>') //red


pTorus()
	.ipCylinder(pSphere())
	.pCircle(iSpiral())
	.out()

stack(
  		
  		n(pattern)
  			.scale("C:major")
  			.clip(2)
  			.delay(ref(() => pixel1[1] % 5)) //green

	)
	.play()
