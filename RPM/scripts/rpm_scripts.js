$(document).ready(function(){
	var h, w,
	sidebar_menu, sidebar_2nd, social_media,
	social_box, right_section,
	main_wrapper, sidebar_wrapper, jumbo_wrapper, nav_a, tab_rel, navbar, mobile_wrapper, mob_sidebar, navbar_toggle, homeSlide, $window;
	sidebar_menu = $('.sidebar_menu');
	sidebar_2nd = $('.sidebar_2nd');	
	right_section = $('.right_section');
	sidebar_wrapper = $('.sidebar_wrapper');
	main_wrapper = $('.main_wrapper');				
	jumbo_wrapper = $(".jumbo_wrapper");				
	nav_a = $('#nav .nav_a');
	navbar = $('.navbar');
	mobile_wrapper = $('.mobile_wrapper');
	navbar_toggle = $('.navbar-toggle');
	mob_sidebar = $('.mob_sidebar');
	homeSlide = $('.homeSlide');
	$window = $(window);
	resize_window = $('.resize_window');
	hsContainer = $('.hsContainer');
	
	if (!$.support.transition)
	$.fn.transition = $.fn.animate;
	
	$(window).resize(function(){
		h = $window.height();
		w = $window.width();		
		mob_sidebar.height(h);		
		navbar.width(w);		
		if(w<=767){
			main_wrapper.removeClass('positioning');
			jumbo_wrapper.removeClass('xl_width');
			main_wrapper.css({"max-width":""});
			homeSlide.removeAttr('style');			
			main_wrapper.removeAttr('style');
			mobile_wrapper.swipe({		
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
					if(direction == "left"){
						closeMenu();
					}
				},
				swipeRight:function(event, direction, distance, duration, fingerCount) {
					if(direction == "right"){
						openMenu();
					}
				}		
			});
		}else{			
			main_wrapper.addClass('positioning');
			main_wrapper.css({"max-width":(w-210)+"px"});
			jumbo_wrapper.addClass('xl_width');
			homeSlide.css({'min-height':h});			
			main_wrapper.height(h);
			sidebar_menu.height(h);						
		}
		if(w<=991){
			resize_window.removeAttr('style');
		}else{
			resize_window.height(h-185);
		}
	}).resize();
	
	navbar_toggle.click(function(){
		if(mobile_wrapper.hasClass('active')){						
			closeMenu();
		}else{						
			openMenu();
		}
	});

	function closeMenu(){
		mob_sidebar.transition({x:-250});
		mobile_wrapper.transition({x:0}, function(){
			$(this).removeAttr('style');
			$(this).removeClass('fixed');
		});
		mobile_wrapper.removeClass('active');		
	}
	
	function openMenu(){
		mob_sidebar.transition({x:0});						
		mobile_wrapper.transition({x:250});
		mobile_wrapper.addClass('active');
		mobile_wrapper.addClass('fixed');
		$('.modal').modal('hide');
	}
	
	nav_a.click(function(){		
		tab_rel = $(this).attr('rel');		
		setTimeout(function(){open2ndMenu()}, 300);		
	});
	
	$('.nav_a.active').mouseenter(function(){		
		tab_rel = $(this).attr('rel');		
		open2ndMenu();		
	});
	
	$('.mob_sidebar').mouseleave(function(){					
		close2ndMenu();
	});
	
	function open2ndMenu(){		
		$('.'+tab_rel).parent().siblings().transition({x:0}, 500);
		$('.'+tab_rel).parent().transition({x:195}, 500);
		if(w>=768){
			main_wrapper.transition({x:195}, 500);
		}		
	}
	
	function close2ndMenu(){					
		sidebar_2nd.transition({x:0}, 500);
		main_wrapper.transition({x:0}, 500);
	}	
	
	$('.tile').mouseenter(function(){
		$(this).children('.curtain').transition({opacity:0.5});
		$(this).children('.tile_red').transition({y:0,opacity:0.92}).stop();
	});
	$('.tile').mouseleave(function(){
		$(this).children('.curtain').stop().transition({opacity:1});
		$(this).children('.tile_red').transition({opacity:0,y:-150});
	});
	
	$("#rpm_carousel").swipe({		
		swipeLeft:function(event, direction, distance, duration, fingerCount){
			if(direction == "left"){
				$(this).carousel('next');
			}
		},
		swipeRight:function(event, direction, distance, duration, fingerCount){
			if(direction == "right"){
				$(this).carousel('prev');
			}
		}		
	});
	
	$('#rpm_carousel').carousel({
		interval: 10000
	});
	
	$('.current-year').html((new Date).getFullYear());
});

$(window).load(function(){
	setTimeout(function(){$('.bolt_img').transition({x:0},2000, 'easeOutExpo')}, 300);
	setTimeout(function(){$('.bolt_text').transition({x:0},2000, 'easeOutCirc')}, 700);
});	