var my_mute=false;
var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 50, 200/200, 1, 20000 );

			var renderer = new THREE.CanvasRenderer({alpha:true});
			renderer.setSize( 200, 200 );
			$('.el').append( renderer.domElement );
			var el = $('.el');
			var geometry = new THREE.IcosahedronGeometry( 100,1);
			var material = new THREE.MeshBasicMaterial({ color: 0xffffff,wireframe:true,opacity:0.3});
			var sphere = new THREE.Mesh( geometry, material );
			//sphere.scale.set(0.0001,0.0001,0.0001);
			scene.add( sphere );

			camera.position.z = 400;
			var overX=0,overY=0,offsetX=0,offsetY=0,shouldRender=true;
			var goToCorner=function(){
				
				//el.style.cursor = 'pointer';
				TweenMax.to(el,2,{top:'165px',right:'150px',ease:Expo.easeInOut,delay:1});
				TweenMax.to($('#preloader'),2,{css:{ opacity:0},ease:Expo.easeInOut,delay:1,onComplete:function(){
					$('#preloader').css('display','none');
					shouldRender=true;
					loop.play();
					
				}});
				
			}
			var onOver=function(){


				overX = 2;
					overY = 2;
					TweenMax.to(sphere.scale,0.7,{bezier:[{x:1.1,y:1.1,z:1.1},{x:1,y:1,z:1}],ease:Expo.easeOut});
					
					TweenMax.to(sphere.material,0.7,{bezier:[{opacity:1},{opacity:0.3}],ease:Expo.easeOut});
					if(!my_mute)
						sphereenter.play();
			}
			var onOver2=function(){


				overX = 2;
					overY = 2;
					TweenMax.to(sphere.scale,0.7,{bezier:[{x:1.1,y:1.1,z:1.1},{x:1,y:1,z:1}],ease:Expo.easeOut});
					
					TweenMax.to(sphere.material,0.7,{bezier:[{opacity:1},{opacity:0.3}],ease:Expo.easeOut});
					if(!my_mute)
						sphereleave.play();
			}
			el.mouseenter(onOver);
			el.mouseleave(onOver2);
			var animateIn=function(){

				//that.shouldRender = true;
				start();
				shouldRender = true;
				TweenMax.to(sphere.scale,0.5,{x:1,y:1,z:1,ease:Expo.easeOut});
			}
			var animateOut=function(){
				
				TweenMax.to(sphere.scale,0.5,{x:0.0001,y:0.0001,z:0.0001,ease:Expo.easeOut,onComplete:function(){
					shouldRender = false;
				}});
			}
			var disable=function(){
				TweenMax.to(sphere.material,0.5,{opacity:0.1});
				$(el).unbind('hover');
				$(el).unbind('click');
			}

			var enable=function(){
				

				console.log('enable');

				TweenMax.to(sphere.material,0.5,{opacity:0.3});
				
				$(el).hover(function(){
					onOver();
				},null);

				$(el).click(function(){
					//site.openMenu();
					//$.address.path('menu');  
					//document.location.hash = '';
					//soundManager.play('click');
				});
			}
			var start=function(){
				animate();
			}
			var animate=function(){
				sphere.rotation.x = Math.sin(offsetX)*2*overX;
				sphere.rotation.y = Math.sin(offsetY)*2*overY;
				
				overY += (1-overY)*0.1;
				overX += (1-overX)*0.1;
				offsetX+=0.01;
				offsetY+=0.01;

				renderer.render(scene,camera);
				
				if(shouldRender){
					requestAnimationFrame($.proxy(animate,this));
				}
			}
			start();
	$('.top-right a').hover(function() {
			// TweenMax.fromTo(that.btnFollow,.35,{borderColor: 'rgba(255,255,255,0)'},{borderColor: 'rgba(255,255,255,1)'});
			TweenMax.to($(this),.35,{opacity:1});
			TweenMax.to($(this),.35,{bezier:[{borderColor:'rgba(255,255,255,.3)'},{borderColor:'rgba(255,255,255,.1)'},{borderColor:'rgba(255,255,255,.6)'},{borderColor:'rgba(255,255,255,.2)'},{borderColor:'rgba(255,255,255,1)'},{borderColor:'rgba(255,255,255,.4)'},{borderColor:'rgba(255,255,255,1)'}],delay:0});
			//soundManager.play('roll'+Math.floor(Math.random()*2));
		}, function() {
			TweenMax.to($(this),.35,{borderColor: 'rgba(255,255,255,0)'});
			TweenMax.to($(this),.35,{opacity:.5});
		});	
		
$('#toggle_sound').bind('click', function(){

    if(!my_mute){
		loop.pause();
	}
	else{
		loop.play();
	}
    my_mute = !my_mute;
	if(my_mute){
		$(this).html('<img src="images/audio_off.gif">');
	}
	else{
		$(this).html('<img src="images/audio_on.gif">');
	}
});
$('a,li').mouseover(function(){
	if(!my_mute)
		audio.play();
});

