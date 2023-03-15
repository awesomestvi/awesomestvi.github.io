$(document).ready(function(){
	var w;
	var cal = 50;
	$(window).resize(function(){
		w = $(window).width();		
		$('.sidebar_menu').width(w-cal);
		$('.sidebar_menu').transition({x:-(w-cal)});
		$('.mobile_view').transition({x:0});
		$('.mobile_view').removeClass('active');
		$('.mobile_view').removeAttr('style');					
		$('.mobile_view').width(w);
		
		if(w<768){
			$('body').addClass('mobile');
		}else{
			$('body').removeClass('mobile');
		}
		
		$(".mobile .dash_search").mouseenter(function(){
			$('.search_txt').show();
			$('.search_txt').transition({x:-49,opacity:1});			
		});
		
		$(".mobile .dash_search").mouseleave(function(){
			$('.search_txt').transition({x:0,opacity:0}, function(){
				$('.search_txt').hide();
			});
		});
		
	}).resize();				

	$(window).load(function(){
		$('.stars, .grid_web').parallax();
		var a = window.location.href.split("#")[1];
		$('.auto_nav a').removeClass('active').addClass('not_active');
		$(".auto_nav a[href='#"+a+"']").addClass('active').removeClass('not_active');
		$(".auto_nav .active").siblings().fadeIn();
		$(".tc_nav.auto_nav a.not_active").mouseenter(function(){
			$(this).siblings().fadeIn();
		});
		$(".tc_nav.auto_nav a").mouseleave(function(){					
			$(".auto_nav a.not_active").siblings().stop().fadeOut();
		});
		$(".page1 .mainCenter .char").mouseenter(function(){
			var c = $(this).children().attr('src');
			var b = c.split(".")[0];					
			var d = b.split("_")[0];					
			$(this).children().attr('src',''+d+'_hovered.png');
		});
		$(".page1 .mainCenter .char").mouseleave(function(){
			var c = $(this).children().attr('src');
			var b = c.split("_")[0];					
			$(this).children().attr('src',''+b+'.png');
		});
		$(".parallaxe .page4 .mainCenter .cir").mouseenter(function(){
			var c = $(this).attr('src');
			var b = c.split(".")[0];					
			$(this).attr('src',''+b+'_hovered.png');
		});
		$(".parallaxe .page4 .mainCenter .cir").mouseleave(function(){
			var c = $(this).attr('src');
			var b = c.split("_")[0];					
			$(this).attr('src',''+b+'.png');
		});
		
		$('.navbar-toggle').click(function(){
			if($('.mobile_view').hasClass('active')){ /*Close*/						
				$('.mobile_view').transition({x:0});
				$('.sidebar_menu').transition({x:-(w-cal)}, function(){
					$('.mobile_view').removeAttr('style');					
				});
				$('.mobile_view').removeClass('active');				
			}else{ /*Open*/				
				$('.mobile_view').width(w);
				$('.mobile_view').addClass('active');
				$('.sidebar_menu').transition({x:0});						
				$('.mobile_view').transition({x:(w-cal)});
			}										
		});
		
		$('.menu_list li a, .mobile_logo a').click(function(){
			if($('.mobile_view').hasClass('active')){ /*Close*/						
				$('.mobile_view').transition({x:0});
				$('.sidebar_menu').transition({x:-(w-cal)}, function(){
					$('.mobile_view').removeAttr('style');								
				});
				$('.mobile_view').removeClass('active');							
			}
		});		
	});
	
	$('.tc_tabs_wrap .tc_tab').click(function(){
		var dashtab = $(this).attr('rel');		
		$(this).closest('.tc_tabs_wrap').find('a').removeClass('selected');		
		$(this).addClass('selected');					
		$('.dash_tab_wrapper .'+dashtab).fadeIn().siblings().hide();
	});
	
	$(".tc_accrd").click(function(){
		if($(this).hasClass('active')){			
			$(this).closest('.tc_accrd_wrap').find('.tc_child_dd').slideUp();
			$(this).closest('.tc_accrd_wrap').find('.tc_accrd').removeClass('active');
			$(this).closest('.tc_accrd_wrap').find('.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
		}else{
			$(this).closest('.tc_accrd_wrap').find('.tc_child_dd').slideUp();			
			$(this).closest('.tc_accrd_wrap').find('.tc_accrd').removeClass('active');
			$(this).closest('.tc_accrd_wrap').find('.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
			$(this).addClass('active').children('.glyphicon').addClass('glyphicon-minus');			
			$(this).next().slideDown();
		}		
	});
	
	$('.tc_profile').click(function(){
		$('.profile_dropdown').fadeIn(100);
	});
	$('.tc_dashlogin').mouseleave(function(){
		$('.tc_child_dd').slideUp();
		$('.tc_accrd').removeClass('active');
		$('.profile_dropdown').fadeOut(100);		
	});
	
	$('.dropdown-menu li a').click(function(e){
		var value = $(this).text();		
		$(this).offsetParent('ul').siblings('.btn').find('.btn_value').text(value);
	});
	
});

$(window).load(function(){
	$('.grid_web').parallax();	
	$('input').iCheck({
		checkboxClass: 'icheckbox_minimal',
		radioClass: 'iradio_minimal'
	});
	$('#login_box').popup({
		blur : false,
		transition: 'all 0.3s'
	});
	$('#shopping_cart').popup({
		blur : false,
		transition: 'all 0.3s'
	});
});			

$(".flipper_cont").on({
	mouseenter: function(){
		$(this).children('.flipper').addClass("rotated");
		$(this).find('.flip_back').fadeIn();
	},
	mouseleave: function(){
		$(this).children('.flipper').removeClass("rotated");
		$('.flip_back').stop().fadeOut();
	}
});

$(window).on('hashchange', function() {
	var a = window.location.href.split("#")[1];
	$('.auto_nav a').removeClass('active').addClass('not_active');
	$(".auto_nav a[href='#"+a+"']").addClass('active').removeClass('not_active');
	$(".auto_nav a.not_active").siblings().fadeOut();
	$(".auto_nav a.active").siblings().fadeIn();
});