!function(t,e,a){"use strict";t(document).ready(function(){t(".page-loading-overlay").length?t(e).on("load",function(){setTimeout(n,200)}):n()});var n=function(){t("[data-from][data-to]").each(function(e,a){var n=t(a),r=scrollMonitor.create(a);r.fullyEnterViewport(function(){var t={useEasing:attrDefault(n,"easing",!0),useGrouping:attrDefault(n,"grouping",!0),separator:attrDefault(n,"separator",","),decimal:attrDefault(n,"decimal","."),prefix:attrDefault(n,"prefix",""),suffix:attrDefault(n,"suffix","")},e="this"==attrDefault(n,"count","this")?n:n.find(n.data("count")),a=attrDefault(n,"from",0),o=attrDefault(n,"to",100),i=attrDefault(n,"duration",2.5),l=attrDefault(n,"delay",0),u=new String(o).match(/\.([0-9]+)/)?new String(o).match(/\.([0-9]+)$/)[1].length:0,f=new countUp(e.get(0),a,o,u,i,t);setTimeout(function(){f.start()},1e3*l),r.destroy()})}),t("[data-fill-from][data-fill-to]").each(function(e,a){var n=t(a),r=scrollMonitor.create(a);r.fullyEnterViewport(function(){var t={current:null,from:attrDefault(n,"fill-from",0),to:attrDefault(n,"fill-to",100),property:attrDefault(n,"fill-property","width"),unit:attrDefault(n,"fill-unit","%")},e={current:t.to,onUpdate:function(){n.css(t.property,t.current+t.unit)},delay:attrDefault(n,"delay",0)},a=attrDefault(n,"fill-easing",!0),o=attrDefault(n,"fill-duration",2.5);a&&(e.ease=Sine.easeOut),t.current=t.from,TweenMax.to(t,o,e),r.destroy()})}),t(".xe-todo-list").on("change",'input[type="checkbox"]',function(e){var a=t(this),n=a.closest("li");n.removeClass("done"),a.is(":checked")&&n.addClass("done")}),t(".xe-status-update").each(function(a,n){function r(t){u=(u+t)%l.length,0>u&&(u=l.length-1);var e=l.filter(".active"),a=l.eq(u);e.removeClass("active"),a.addClass("active").fadeTo(0,0).fadeTo(320,1)}var o=t(n),i=o.find(".xe-nav a"),l=o.find(".xe-body li"),u=l.filter(".active").index(),f=attrDefault(o,"auto-switch",0),c=0;f>0&&(c=setInterval(function(){r(1)},1e3*f),o.hover(function(){e.clearInterval(c)},function(){c=setInterval(function(){r(1)},1e3*f)})),i.on("click",function(e){e.preventDefault();var a=t(this).hasClass("xe-prev")?-1:1;r(a)})})}}(jQuery,window);