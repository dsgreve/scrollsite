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

	// triggersDown = [
	// 	"#slide02-pos",
	// 	"#slide03-pos",
	// 	"#slide04-pos",
	// 	"#slide05-pos",
	// 	"#slide06-pos",
	// 	"#slide07-pos",
	// 	"#slide08-pos",
	// 	"#slide09-pos"
	// ]

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

	// Navigation timeline
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
				crossFade($slideOut, $slideIn, direction, slideIndex);
			})
			// .addIndicators({
			// 	name: 'triggerDown',
			// 	indent: 520,
			// 	colorStart: 'yellow',
			// 	colorTrigger: 'yellow'
			// })
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
		setTimeout(function () {
			//prevent flicker on load
			TweenMax.set($body, { autoAlpha: 1 });
			//animate first slide in
			animationIn($slideIn);
		}, 500);
	}
	init();
	//Cross Fade
	function crossFade($slideOut, $slideIn, direction, slideIndex) {
		var slideOutID = $slideOut.attr('id').substring(5, 7),
			slideInID = $slideIn.attr('id').substring(5, 7)

		// slide out
		$slideOutBcg = $slideOut.find('.bcg-color'),
			$slideOutTitle = $slideOut.find('.title .fade-txt'),
			$slideOutNumber = $slideOut.find('.number'),

			// slide In
			$slideInBcg = $slideIn.find('.bcg-color'),
			$slideInTitle = $slideIn.find('.title .fade-txt'),
			$slideInNumber = $slideIn.find('.number'),
			$slideInBcgWhite = $slideIn.find('.primary .bcg')
			;


		//update nav
		updateNav(slideOutID, slideInID);

		// remove class active from all slides
		TweenMax.set($slide, { className: '-=active' })

		// add class active to the current slide
		TweenMax.set($('#slide' + slideIndex), { className: '+=active' });

		// Cross fade timeline
		var crossFadeTl = new TimelineMax();

		crossFadeTl
			.set($slideIn, { autoAlpha: 1 })
			.set([$slideInTitle, $slideInNumber, $slideInBcgWhite], { autoAlpha: 0 })
			.to([$slideOutTitle, $slideOutNumber], 0.3, { autoAlpha: 0, ease: Linear.easeNone })
			.set($main, { className: 'slide' + slideInID + '-active' })
			.set($slideInNumber, { text: '0' })
			.to($slideInNumber, 1.2, { autoAlpha: 1, ease: Linear.easeNone })
			;
	}



	function updateNav(slideOutID, slideInID) {
		//remove active class from dots
		$('.nav-items li').removeClass('active');

		//add  active class to new active slide
		TweenMax.set($('.nav-items li.nav-item' + slideInID), { className: '+=active' })
	}

	//animate slide IN on pageload
	function animationIn($slideIn) {

		var $slideInNumber = $slideIn.find('.number'),
			$slideInTitle = $slideIn.find('.fade-txt'),
			$primaryBcg = $slideIn.find('.primary .bcg'),
			$whiteBcg = $slideIn.find('.bcg-white'),
			transitionInTl = new TimelineMax();

		transitionInTl
			.set([$slide, $slideInNumber, $nav, $logo], { autoAlpha: 0 })
			.set($slideIn, { autoAlpha: 1 })
			.set($whiteBcg, { scaleX: 1 })
			.set($primaryBcg, { scaleX: 0 })
			.to($whiteBcg, 0.4, { scaleX: 0.63, ease: Power2.easeIn })
			.to($primaryBcg, 0.4, { scaleX: 1, ease: Power2.easeOut, clearProps: 'all' })
			.add('fadeInLogo')
			.to($whiteBcg, 0.6, { scaleX: 0, ease: Power4.easeIn }, 'fadeInLogo+=0.3')
			.to([$logo, $slideInNumber], 0.2, { autoAlpha: 1, ease: Linear.easeNone }, 'fadeInLogo-=0.2')
			.staggerFrom($slideInTitle, 0.3, { autoAlpha: 0, x: '-=60', ease: Power1.easeOut }, 0.1, 'fadeInLogo+=0.9')
			.fromTo($nav, 0.3, { y: -15, autoAlpha: 0 }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 'fadeInLogo+=1.5')
			;

		//speed up animation during dev
		transitionInTl.timeScale(3);
	}

});
