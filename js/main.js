$(document).ready(function () {

	//variables
	var controller,
		$navItem = $('.nav-items li').not('.active'),
		$navTrigger = $('.nav-trigger'),
		getTriggersDown = $('.slide-pos'),
		triggersDown = [],
		getTriggersUp = $('.slide-pos-reverse'),
		triggersUp = [],
		$slideIn = $('.slide.active'),
		$logo = $('.logo'),
		$main = $('#main'),
		$body = ('body'),
		$slide = ('.slide'),
		$nav = ('nav');

	// triggers on way down
	$.each(getTriggersDown, function (key, value) {
		var id = '#' + value.id;
		triggersDown.push(id);
		// console.log(triggersDown[key]);
	});

	// triggers on way up
	$.each(getTriggersUp, function (key, value) {
		var id = '#' + value.id;
		triggersUp.push(id);
		// console.log(triggersUp[key]);
	});
	//init ScrollMagic Controller
	controller = new ScrollMagic.Controller();

	//scene 1 - pin main section
	var pinScene01 = new ScrollMagic.Scene({
		triggerElement: '#main',
		triggerHook: 0,
		duration: '900%'
	})
		.setPin("#main .pin-wrapper", { pushFollowers: false })
		.addTo(controller);

	var navTl = new TimelineMax();


	//move navigation left or right 26px for each item
	$navItem.each(function () {
		var slideHREF = $(this).find('a').attr('href'),
			slideID = slideHREF.substr(slideHREF.length - 7),
			moveNav = TweenMax.to($('.nav-active'), 1, { x: '+=26', ease: Linear.easeNone });
		//add individual tweens to timeline
		navTl.add(moveNav, slideID);
	});
	// Scene 2 - move navigation
	var navScene = new ScrollMagic.Scene({
		triggerElement: $navTrigger,
		duration: '800%'
	})
		.setTween(navTl)
		.addTo(controller);

	// Scene 3 - trigger the right animation on way DOWN
	triggersDown.forEach(function (triggerDown, index) {
		var triggerTransitionToNext = new ScrollMagic.Scene({
			triggerElement: triggerDown,
			triggerHook: 0.6
		})
			.on('enter', function (e) {
				// console.log('Crossfade to Next' + triggerDown);
				var $slideOut = $('.slide.active'),
					slideIndex = triggerDown.substring(6, 8),
					$slideIn = $('#slide' + slideIndex),
					direction = e.scrollDirection;
				console.log(e.scrollDirection);
				crossFade();
			})
			.addIndicators({
				name: "triggerDown",
				indent: 900,
				colorStart: 'green',
				colorTrigger: 'green'
			})
			.addTo(controller);
	});

	// Scene 4 - trigger the right animation on way UP
	triggersUp.forEach(function (triggerUp, index) {
		var triggerTransitionToPrevious = new ScrollMagic.Scene({
			triggerElement: triggerUp,
			triggerHook: 0.49
		})
			.on('leave', function (e) {

				//console.log('Crossfade to Previous' + triggerUp);
			})
			// .addIndicators({
			// 	name: "triggerUp",
			// 	indent: 120,
			// 	colorStart: 'red',
			// 	colorTrigger: 'red'
			// })
			.addTo(controller);
	});

	function init() {
		AnimationTimeline($slideIn);
	}
	init();
	//Cross Fade
	function crossFade($slideOut, $slideIn, direction) {

	}

	//animate slide IN on pageload
	function animationIn($slideIn) {
		var $slideInNumber = $slideIn.find('.number'),
			$slideInTitle = $slideIn.find('.fade-txt'),
			$primaryBcg = $slideIn.find('.fade-txt');
	}

});
