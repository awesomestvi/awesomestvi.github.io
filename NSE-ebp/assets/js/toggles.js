!function(e,t,a){"use strict";e(document).ready(function(){e('a[data-toggle="chat"]').each(function(a,n){e(n).on("click",function(a){a.preventDefault(),public_vars.$body.toggleClass("chat-open"),e.isFunction(e.fn.perfectScrollbar)&&setTimeout(function(){public_vars.$chat.find(".chat_inner").perfectScrollbar("update"),e(t).trigger("xenon.resize")},1)})}),e('a[data-toggle="settings-pane"]').each(function(a,n){e(n).on("click",function(a){a.preventDefault();var s=attrDefault(e(n),"animate",!1)&&!isxs(),i={top:e(document).scrollTop(),toTop:0};public_vars.$body.hasClass("settings-pane-open")&&(i.toTop=i.top),TweenMax.to(i,s?.1:0,{top:i.toTop,roundProps:["top"],ease:i.toTop<10?null:Sine.easeOut,onUpdate:function(){e(t).scrollTop(i.top)},onComplete:function(){if(s)if(public_vars.$settingsPaneIn.addClass("with-animation"),public_vars.$settingsPane.is(":visible"))public_vars.$settingsPaneIn.addClass("closing"),TweenMax.to(public_vars.$settingsPane,.25,{css:{height:0},delay:.15,ease:Power1.easeInOut,onComplete:function(){public_vars.$body.removeClass("settings-pane-open"),public_vars.$settingsPane.css({height:""}),public_vars.$settingsPaneIn.removeClass("closing visible")}});else{public_vars.$body.addClass("settings-pane-open");var e=public_vars.$settingsPane.outerHeight(!0);public_vars.$settingsPane.css({height:0}),TweenMax.to(public_vars.$settingsPane,.25,{css:{height:e},ease:Circ.easeInOut,onComplete:function(){public_vars.$settingsPane.css({height:""})}}),public_vars.$settingsPaneIn.addClass("visible")}else public_vars.$body.toggleClass("settings-pane-open"),public_vars.$settingsPaneIn.removeClass("visible"),public_vars.$settingsPaneIn.removeClass("with-animation")}})})}),e('a[data-toggle="sidebar"]').each(function(a,n){e(n).on("click",function(a){a.preventDefault(),public_vars.$sidebarMenu.hasClass("collapsed")?(public_vars.$sidebarMenu.removeClass("collapsed"),ps_init()):(public_vars.$sidebarMenu.addClass("collapsed"),public_vars.$sidebarMenu.find("ul").removeAttr("style"),ps_destroy()),e(t).trigger("xenon.resize")})}),e('a[data-toggle="mobile-menu"]').on("click",function(e){e.preventDefault(),public_vars.$mainMenu.add(public_vars.$sidebarProfile).toggleClass("mobile-is-visible"),ps_destroy()}),e('a[data-toggle="mobile-menu-horizontal"]').on("click",function(e){e.preventDefault(),public_vars.$horizontalMenu.toggleClass("mobile-is-visible")}),e('a[data-toggle="mobile-menu-both"]').on("click",function(e){e.preventDefault(),public_vars.$mainMenu.toggleClass("mobile-is-visible both-menus-visible"),public_vars.$horizontalMenu.toggleClass("mobile-is-visible both-menus-visible")}),e('a[data-toggle="user-info-menu"]').on("click",function(e){e.preventDefault(),public_vars.$userInfoMenu.toggleClass("mobile-is-visible")}),e('a[data-toggle="user-info-menu-horizontal"]').on("click",function(e){e.preventDefault(),public_vars.$userInfoMenuHor.find(".nav.nav-userinfo").toggleClass("mobile-is-visible")}),e("body").on("click",'.panel a[data-toggle="remove"]',function(t){t.preventDefault();var a=e(this).closest(".panel"),n=a.parent();a.remove(),0==n.children().length&&n.remove()}),e("body").on("click",'.panel a[data-toggle="reload"]',function(t){t.preventDefault();var a=e(this).closest(".panel");a.append('<div class="panel-disabled"><div class="loader-1"></div></div>');var n=a.find(".panel-disabled");setTimeout(function(){n.fadeOut("fast",function(){n.remove()})},500+300*(5*Math.random()))}),e("body").on("click",'.panel a[data-toggle="panel"]',function(t){t.preventDefault();var a=e(this).closest(".panel");a.toggleClass("collapsed")}),e("[data-loading-text]").each(function(t,a){var n=e(a);n.on("click",function(e){n.button("loading"),setTimeout(function(){n.button("reset")},1800)})}),e('[data-toggle="popover"]').each(function(t,a){var n=e(a),s=attrDefault(n,"placement","right"),i=attrDefault(n,"trigger","click"),o=n.get(0).className.match(/(popover-[a-z0-9]+)/i);n.popover({placement:s,trigger:i}),o&&(n.removeClass(o[1]),n.on("show.bs.popover",function(e){setTimeout(function(){var e=n.next();e.addClass(o[1])},0)}))}),e('[data-toggle="tooltip"]').each(function(t,a){var n=e(a),s=attrDefault(n,"placement","top"),i=attrDefault(n,"trigger","hover"),o=n.get(0).className.match(/(tooltip-[a-z0-9]+)/i);n.tooltip({placement:s,trigger:i}),o&&(n.removeClass(o[1]),n.on("show.bs.tooltip",function(e){setTimeout(function(){var e=n.next();e.addClass(o[1])},0)}))})})}(jQuery,window);