await loadScript('https://hyper-hydra.glitch.me/hydra-pixels.js');
await loadScript("https://cdn.jsdelivr.net/gh/atfornes/Hydra-strudel-extension@1/hydra-strudel.js");
await loadScript("https://cdn.statically.io/gh/ymaltsman/Hydra-FCS/55a80a3/HydraFCS.js");
await initHydraStrudel();

update = ()=> {
  x1 = .5;
  y1 = .5;
  pixel1 = o0.read(width*x1,height*y1);
  rThresh = (pixel1[0] > 125) ? 1.1:0;
  gThresh = (pixel1[1] > 125) ? 2:0;
  bThresh = (pixel1[2] > 125) ? 1.1:0;
}



pattern1 = ref(()=>'<' + ' ' + (() => pixel1[0] % 8)() + ' ' + '>')

pattern2 = ref(()=>'<' + ' ' + (() => pixel1[1] % 8)() + '*2, ' + (() => pixel1[1] % 8)() + '*3 >')

//viz here
pTorus()
	.hpTorus(pSphere()
            .pLissajous(osc())).luma()
	.out()

//sound here
stack(
  		
  		n(pattern2) //can switch to pattern1
                  .off(1/2, add(ref(()=>rThresh)))
                          .off(1/3, add(4))		  
  				   .clip(ref(()=>gThresh))
                  .scale("D:major")
                  .lpf(1000)
  		
	)
	.play()
