var truecolors = {}    
var andrzejdus = {
    utils: {}
};
andrzejdus.utils.Utils = {};
var Utils = {
    delegate: function(a, b) {
        return function() {
            return b.apply(a, arguments)
        }
    },
    getComputedStyle: function(a, b) {
        return a.currentStyle ? a.currentStyle[b] : window.getComputedStyle(a)[b]
    },
    addEventListener: function(a, b, d) {
        a.addEventListener ? a.addEventListener(b, d) : a.attachEvent && a.attachEvent(b, d)
    },
    removeEventListener: function(a, b, d) {
        a.removeEventListener ? a.removeEventListener(b, d) : a.detachEvent && a.detachEvent(b, d)
    }
};
truecolors.ParallaxerGroup = {};
var ParallaxerGroup = function(a, b, d, c) {
    ParallaxerGroup.HORIZONTAL = "horizontal";
    ParallaxerGroup.VERTICAL = "vertical";
    var e = null,
        f = Utils.delegate(this, function() {
            void 0 === c && (c = ParallaxerGroup.VERTICAL);
            var a = $(b).first().css("top");			
            e = Number("auto" === a ? 0 : a.replace(/px/, ""));			
            $(b).first().css("top", "0");
            $(b).first().css("height", "0")
        });
    this.add = function(b, f) {
        return a.addElement($(b).get(0), d * f, e, c)
    };
    this.getContainerVisiblePosition = function() {
        return e
    };
    this.getReferenceSpeed = function() {
        return d
    };
    f()
};
andrzejdus.utils.RequestAnimationFrame = {};
(function() {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], d = 0; d < b.length && !window.requestAnimationFrame; ++d) window.requestAnimationFrame = window[b[d] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[d] + "CancelAnimationFrame"] || window[b[d] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function(b, d) {
        var f = (new Date).getTime(),
            g = Math.max(0, 16 - (f - a)),
            m = window.setTimeout(function() {
                b(f + g)
            }, g);
        a = f + g;
        return m
    });
    window.cancelAnimationFrame || (window.cancelAnimationFrame =
        function(a) {
            clearTimeout(a)
        })
})();
andrzejdus.utils.events = {};
andrzejdus.utils.events.EventManager = {};

function EventManager(a) {
    var b = [];
    this.addEventListener = function(a) {
        a instanceof Function ? b.push(a) : console.error("Couldn't add event listener. Target isn't a function.")
    };
    this.removeEventListener = function(a) {
        if (a instanceof Function) {
            for (var c = [], e = 0; e < b.length; e++) {
                var f = b[e];
                f !== a && c.push(f)
            }
            b = c
        } else console.error("Couldn't remove event listener. Target isn't a function.")
    };
    this.dispatch = function(d) {
        a && console.log("Dispatching to event listeners. Targets serialization: " + JSON.stringify(b));
        for (var c =
            0; c < b.length; c++) b[c].apply(this, arguments)
    }
};
andrzejdus.utils.events.EventsManager = {};

function EventsManager(a) {
    var b = {};
    this.registerType = function(d) {
        a && console.log('Registering type "' + d + '".');
        void 0 === b[d] ? b[d] = new EventManager(a) : console.error('Type "' + JSON.stringify(d) + '" already registered.')
    };
    this.addEventListener = function(d, c) {
        a && console.log('Adding event listener for "' + d + '".');
        b[d] ? b[d].addEventListener(c) : console.error("Couldn't add event. Type \"" + JSON.stringify(d) + '" doesn\'t exist. Please use "registerType" method first.')
    };
    this.removeEventListener = function(d, c) {
        a && console.log('Removing event listener for "' +
            d + '".');
        b[d] ? b[d].removeEventListener(c) : console.error("Couldn't remove event. Type \"" + JSON.stringify(d) + '" doesn\'t exist. Please use "registerType" method first.')
    };
    this.dispatch = function(d) {
        a && console.log('Dispatching to event listeners for "' + d + '". Event managers serialization: ' + JSON.stringify(b));
        if (b[d]) {
            var c = Array.prototype.slice.call(arguments);
            c.shift();
            b[d].dispatch.apply(this, c)
        } else console.error("Couldn't dispatch event. Type \"" + JSON.stringify(d) + '" doesn\'t exist. Please use "registerType" method first.')
    }
};
andrzejdus.utils.Log = {};
var DEBUG = !0,
    Log = function() {
        this.l = function(a) {
            try {
                console
            } catch (b) {
                console = {}
            }
            if (DEBUG && console && console.log) {
                var d = Error();
                if ((d = d ? d.stack : null) && console.groupCollapsed && console.groupEnd) {
                    var c = 2;
                    0 <= d.search("Error") && (c = 3);
                    var e = null;
                    d.split("\n").length >= c && (e = d.split("\n"));
                    console.groupCollapsed(a + " [" + e[c - 1].split("/").pop().replace(/\)*\n\s*/g, "") + "]");
                    console.log(d.replace(/^Error/, "STACK TRACE"));
                    console.groupEnd()
                } else console.log(a)
            }
        };
        return this
    }();
andrzejdus.parallaxer = {};
andrzejdus.parallaxer.ParallaxerEvent = {};
var ParallaxerEvent = function(a) {
    this.source = a
};
ParallaxerEvent.CURRENT_POSITION_CHANGED = "current_position_changed";
ParallaxerEvent.TARGET_POSITION_CHANGED = "target_position_changed";
ParallaxerEvent.AFTER_FIRST_DRAW = "after_first_draw";
ParallaxerEvent.AFTER_LOOP_STOP = "after_loop_stop";
andrzejdus.utils.Looper = {};
var Looper = function(a) {
    var b = !1,
        d = null,
        c = null;
    this.start = function() {
        !1 === b && (b = !0, c = (new Date).getTime() - 1, e())
    };
    this.stop = function() {
        !0 === b && (b = !1)
    };
    var e = function() {
        if (!0 === b) {
            var f = (new Date).getTime();
            d = f - c;
            c = f;
            requestAnimationFrame(e);
            a(d)
        }
    }
};
andrzejdus.parallaxer.drawer = {};
andrzejdus.parallaxer.drawer.Cache = {};
var Cache = function(a) {
    var b = {};
    this.get = function(d) {
        var c = b[d];
        c || (c = a(d), b[d] = c);
        return c
    }
};
andrzejdus.parallaxer.drawer.VisibilityChecker = {};
var VisibilityChecker = function() {
    var a = null,
        b = null,
        d = Utils.delegate(this, function() {
            e();			
            $(window).on("resize", c)
        });
    this.isVisible = function(c, d) {
        var e = !1;
        if (c >= a && c <= b || d >= a && d <= b || c < a && d > b) e = !0;
        return e
    };
    var c = function() {
            e()
        },
        e = function() {
            a = 0;
            b = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight
        };		
    d()
};
andrzejdus.parallaxer.drawer.DrawerObject = {};
var DrawerObject = function(a, b, d) {
    var c = !0;
    this.getElement = function() {
        return a
    };
    this.getOffset = function() {
        return d		
    };
    this.setOffset = function(a) {
        d = a
    };
    this.getType = function() {
        return b
    };
    this.isVisible = function() {
        return c
    };
    this.updateVisibility = function(a) {
        c = a
    }
};
DrawerObject.HORIZONTAL = "horizontal";
DrawerObject.VERTICAL = "vertical";
andrzejdus.parallaxer.drawer.Drawer = {};
var Drawer = function() {
    var a = Modernizr.prefixed("transform"),
        b = a ? !0 : !1,
        d = {},
        c = {},
        e = null,
        f = new VisibilityChecker,
        g = Utils.delegate(this, function() {
            e = new Cache(function(a) {})
        });
    this.addObject = function(a, b, e, f) {
        d[a] = new DrawerObject(b, e, f);
        c = {}
    };
    this.startFrame = function() {
        c = {}
    };
    this.updateOffset = function(a, b) {
        var g = d[a];
        if (g) {
            g.setOffset(b);
            var h = g.getElement();
            g.updateVisibility(f.isVisible(g.getOffset(), e.get(h)));			
            c[a] = g
        } else console.error("Unknown object id " + a)
    };
    this.draw = Utils.delegate(this, function() {
        for (var d in c) {
            var e =
                c[d],
                f = e.getElement();				
            f && (b ? f.style[a] = "translate" + (e.getType() === DrawerObject.HORIZONTAL ? "X" : "Y") + "(" + (e.getOffset() + 27) + "px) translateZ(0px)" : f.style[e.getType() === DrawerObject.HORIZONTAL ? "left" : "top"] = e.getOffset() + "px")
        }
    });
    g()
};
andrzejdus.parallaxer.Parallaxer = {};
var Parallaxer = function(a) {
    var b = null,
        d = null,
        c = null,
        e = null,
        f = null,
        g = [],
        m = new Drawer,
        k = null,
        l = Utils.delegate(this, function() {
            e = c = a;
            b = new EventsManager;
            b.registerType(ParallaxerEvent.CURRENT_POSITION_CHANGED);
            b.registerType(ParallaxerEvent.TARGET_POSITION_CHANGED);
            b.registerType(ParallaxerEvent.AFTER_FIRST_DRAW);
            b.registerType(ParallaxerEvent.AFTER_LOOP_STOP);
            f = d = !1;
            k = new Looper(h)
        });
    this.addEventListener = function(a, c) {
        b.addEventListener(a, c)
    };
    this.removeEventListener = function(a, c) {
        b.removeEventListener(a,
            c)
    };
    this.addElement = function(a, b, c, e) {
        var f = null;
        a && (f = {
            id: g.length,
            element: a,
            speed: b,
            type: e,
            scrollOffset: c
        }, g.push(f));
        d = !1;
        return f
    };
    this.refresh = function() {
        n(0, !0)
    };
    this.isSmoothScrollEnabled = function() {
        return f
    };
    this.setSmoothScrollEnabled = function(a) {
        f = a
    };
    this.getCurrentScrollPosition = function() {
        return c
    };
    this.getTargetScrollPosition = function() {
        return e
    };
    this.setTargetScrollPosition = function(a) {
        e !== a && (e = a, b.dispatch(ParallaxerEvent.TARGET_POSITION_CHANGED, new ParallaxerEvent(this)), d && k.start())
    };
    var h = Utils.delegate(this, function(a) {
            !1 === n(a, !1) && (k.stop(), b.dispatch(ParallaxerEvent.AFTER_LOOP_STOP, new ParallaxerEvent(this)))
        }),
        n = Utils.delegate(this, function(a, q) {
            var h = e - c,
                l = Math.abs(h),
                k = !1;
            if (0.2 < l || q) {
                if (!1 === d)
                    for (var n in g) {
                        var k = g[n],
                            t = k.element,
                            u = 0,
                            x = Utils.getComputedStyle(t, k.type == Parallaxer.HORIZONTAL ? "left" : "top");
                        "auto" !== x && (u += Number(x.replace(/px/, "")), t.style[k.type == Parallaxer.HORIZONTAL ? "left" : "top"] = "0");
                        k.initialVisiblePosition = u;
                        m.addObject(k.id, t, k.type === Parallaxer.HORIZONTAL ?
                            DrawerObject.HORIZONTAL : DrawerObject.VERTICAL, 0)
                    }
                k = !0;
                f ? (h = h / 30 * (a / (1E3 / 60)), 1 > Math.abs(h) && (h = 1 * (0 < h ? 1 : -1)), c += h, 0 > l - Math.abs(h) && (c = e)) : c = e;
                b.dispatch(ParallaxerEvent.CURRENT_POSITION_CHANGED, new ParallaxerEvent(this));
                m.startFrame();
                var l = c,
                    y;
                for (y in g) h = g[y], m.updateOffset(h.id, Math.floor(h.initialVisiblePosition + (h.scrollOffset - l) * h.speed));
                m.draw();
                !1 === d && (d = !0, b.dispatch(ParallaxerEvent.AFTER_FIRST_DRAW, new ParallaxerEvent(this)))
            }
            return k
        });
    l()
};
Parallaxer.HORIZONTAL = "horizontal";
Parallaxer.VERTICAL = "vertical";
truecolors.ParallaxeLoader = {};
var ParallaxeLoader = function(a, b) {
    var d = null,
        c = {},
        e = null,
        f = null,
        g = $(document),
        m = Utils.delegate(this, function() {
            d = new Parallaxer(-1500);
            c.preloader = new ParallaxerGroup(d, ".page0", 0.45);            
            c.preloader.add(".page0 .layer.logo", 1);
			
            c.blue = new ParallaxerGroup(d, ".page1", 0.45);
            c.blue.add(".page1 .layer.background", 1);
            c.blue.add(".page1 .layer.mainCenter", 1.25);            
            c.blue.add(".page1 .layer.main.mainLeft", 1.65);
            c.blue.add(".page1 .layer.main.mainRight", 1.65);
            c.blue.add(".page1 .layer.gift_layer", 1.95);
			
            c.orange = new ParallaxerGroup(d, ".page2", 0.45);
            c.orange.add(".page2 .layer.background3", 1);           
            c.orange.add(".page2 .layer.background2", 1.1);
            c.orange.add(".page2 .layer.background1", 1.22);
            c.orange.add(".page2 .layer.mainCenter", 1.6);
            c.orange.add(".page2 .layer.mainLeft", 2.1);
            c.orange.add(".page2 .layer.mainRight", 2.1);			
            
            c.green = new ParallaxerGroup(d, ".page3", 0.67);
            c.green.add(".page3 .layer.background", 1);            
            c.green.add(".page3 .layer.mainCenter", 1.25);
            c.green.add(".page3 .layer.mainRight", 1.75);
            c.green.add(".page3 .layer.mainLeft", 1);
            c.green.add(".page3 .layer.header", 1);
            c.green.add(".page3 .layer.air_ballon", 0.1);
			
			c.gold = new ParallaxerGroup(d, ".page4", 0.70);
            c.green.add(".page4 .layer.clouds1", 1);
			c.gold.add(".page4 .layer.background", 1.2);			
			c.gold.add(".page4 .layer.clouds3", 1.45);            
            c.gold.add(".page4 .layer.mainCenter", 1.60);
            c.gold.add(".page4 .layer.mainLeft", 1.75);
            c.gold.add(".page4 .layer.mainRight", 2.1);            
			
            c.services = new ParallaxerGroup(d, ".page5", 0.80);
            c.services.add(".page5 .layer.background3", 1);
            c.services.add(".page5 .layer.background2", 1.05);
            c.services.add(".page5 .layer.background1", 1.15);
            c.services.add(".page5 .layer.mainLeft", 1.45);
            c.services.add(".page5 .layer.mainRight", 1.45);
			c.services.add(".page5 .layer.mainCenter", 1.6);
			
			c.shop = new ParallaxerGroup(d, ".page6", 1.1);
            c.shop.add(".page6 .layer.background", 1);
			c.shop.add(".page6 .layer.deepsea_rocks2", 1.15);
            c.shop.add(".page6 .layer.deepsea_rocks1", 1.2);
            c.shop.add(".page6 .layer.mainCenter", 1.25);
            c.shop.add(".page6 .layer.mainRight", 1.25);
            c.shop.add(".page6 .layer.mainLeft", 1.25);			
            c.shop.add(".page6 .layer.creatures", 1.25);			
			
			e = c.footer = new ParallaxerGroup(d, ".page7", 1.1);
            c.footer.add(".page7 .layer.background3", 1);           
            c.footer.add(".page7 .layer.background2", 1.1);
            c.footer.add(".page7 .layer.background1", 1.2);
            c.footer.add(".page7 .layer.mainCenter", 1.1);            
			f = c.footer.add(".page7 .layer.mainBottom", 1);
						
			(new ParallaxerGroup(d, ".page2", 0.2, ParallaxerGroup.HORIZONTAL)).add(".page2 .layer.background1 .wave", 1);
            (new ParallaxerGroup(d, ".page2", -0.2, ParallaxerGroup.HORIZONTAL)).add(".page2 .layer.background2 .wave", 1);
			(new ParallaxerGroup(d, ".page3", 0.2, ParallaxerGroup.HORIZONTAL)).add(".page3 .layer.header .columnRight", 1);
			(new ParallaxerGroup(d, ".page3", -0.05, ParallaxerGroup.HORIZONTAL)).add(".page3 .layer .green_cloud1", 1);
			(new ParallaxerGroup(d, ".page3", 0.02, ParallaxerGroup.HORIZONTAL)).add(".page3 .layer .green_cloud2", 1);
			(new ParallaxerGroup(d, ".page3", 0.02, ParallaxerGroup.HORIZONTAL)).add(".page3 .layer .green_cloud3", 1);
            (new ParallaxerGroup(d, ".page5", -0.03, ParallaxerGroup.HORIZONTAL)).add(".page4 .layer .bird1", 1);
            (new ParallaxerGroup(d, ".page5", -0.04, ParallaxerGroup.HORIZONTAL)).add(".page4 .layer .bird2", 1);
            (new ParallaxerGroup(d, ".page5", -0.15, ParallaxerGroup.HORIZONTAL)).add(".page5 .layer.background1 .wave", 1);
            (new ParallaxerGroup(d, ".page5", 0.25, ParallaxerGroup.HORIZONTAL)).add(".page5 .layer.background2 .wave", 1);
            (new ParallaxerGroup(d, ".page5", -0.03, ParallaxerGroup.HORIZONTAL)).add(".page5 .layer.background3 .wave", 1);
            (new ParallaxerGroup(d, ".page5", 0.03, ParallaxerGroup.HORIZONTAL)).add(".page5 .layer .fish1", 1);
            (new ParallaxerGroup(d, ".page5", -0.03, ParallaxerGroup.HORIZONTAL)).add(".page5 .layer .fish2", 1);
            !1 === Modernizr.touch && d.setSmoothScrollEnabled(!0)
        });
    this.init = function() {
        d.refresh();
        n()
    };
    this.start = function() {
        $(window).on("scroll", k);
        $(window).on("resize", l);
        k()
    };
    this.getParallaxer = function() {
        return d
    };
    this.getGroupScrollPosition = function(a) {
        var b = 0;
        c[a] && (b = c[a].getContainerVisiblePosition());
        return b
    };
    var k = function() {
            var a = g.scrollTop();
            d.setTargetScrollPosition(a);
            h(a)
        },
        l = function() {
            n();
            d.refresh();
            h(g.scrollTop())
        },
        h = Utils.delegate(this, function(b) {
            var d = $(window).height() / 2;
			b + d / c.orange.getReferenceSpeed() < this.getGroupScrollPosition("orange") ? a.saveLocation("blue") : b + d / c.green.getReferenceSpeed() < this.getGroupScrollPosition("green") ? a.saveLocation("orange") : b + d / c.gold.getReferenceSpeed() < this.getGroupScrollPosition("gold") ? a.saveLocation("green") : b + d / c.services.getReferenceSpeed() < this.getGroupScrollPosition("services") ? a.saveLocation("gold") : b + d / c.shop.getReferenceSpeed() < this.getGroupScrollPosition("shop") ? a.saveLocation("services") : b + d / c.footer.getReferenceSpeed() < this.getGroupScrollPosition("footer") ? a.saveLocation("shop") : a.saveLocation("footer")
        }),
        n = function() {
            var a = f.speed,
                a = e.getContainerVisiblePosition() + $(window).height() + (f.initialVisiblePosition + 173 - $(window).height()) / a; /* 173 */
            $(".streacher").height(a)
        };
    m()
};
truecolors.locationHandler = {};
truecolors.locationHandler.LocationHandler = {};
var LocationHandler = function() {
    this.LOCATION_CHANGED = "location_changed";
    var a = null,
        b = !0,
        d = Utils.delegate(this, function() {
            a = new EventsManager;
            a.registerType(this.LOCATION_CHANGED);
            $(window).on("hashchange", c)
        });
    this.addEventListener = function(b, c) {
        a.addEventListener(b, c)
    };
    this.getLocation = function() {
        return window.location.href.split("#")[1]
    };
    this.goToLocation = function(a) {
        var c = window.location.href.split("#");
        c[1] !== a && (b = !1, c[1] = a, window.location.href = c.join("#"))
    };
    this.saveLocation = function(a) {
        var d =
            window.location.href.split("#");
        d[1] !== a && (b = !1, d[1] = a, $(window).off("hashchange", c), window.location.href = d.join("#"), $(window).on("hashchange", c))
    };
    var c = function() {
            b && e();
            b = !0
        },
        e = Utils.delegate(this, function() {
            a.dispatch(this.LOCATION_CHANGED, {
                name: window.location.href.split("#")[1] || ""
            })
        });
    d()
};
truecolors.scrollindicator = {};
truecolors.scrollindicator.ScrollIndicator = {};
var ScrollIndicator = function(a) {
    this.POSITION_CHANGED = "position_changed";
    var b = null,
        d = null,
        c = null,
        e = null,
        f = null,
        g = null,
        m = Utils.delegate(this, function() {
            b = new EventsManager;
            b.registerType(this.POSITION_CHANGED);
            e = !1;
            f = 0;
            c = Utils.getComputedStyle(a, "height").replace(/px$/, "");
            d = window.innerHeight;
            Utils.addEventListener(window, "resize", function() {
                d = window.innerHeight
            });
            var g = null,
                h = Modernizr.prefixed("user-select");
            Utils.addEventListener(a, "mousedown", function() {
                e = !0;
                g = $("body").css(Modernizr.prefixed("user-select"));
                !1 !== h && $("body").css(h, "none")
            });
            Utils.addEventListener(window, "mouseup", function() {
                e = !1;
                !1 !== h && $("body").css(h, g)
            });
            Utils.addEventListener(window, "mousemove", Utils.delegate(this, function(a) {
                p();
                e && (f = a.clientY / (d - c), l(), k())
            }));
            p()
        });
    this.addEventListener = function(a, c) {
        b.addEventListener(a, c)
    };
    this.setPosition = function(a) {
        !1 === e && (f = a, l())
    };
    var k = Utils.delegate(this, function() {
            b.dispatch(this.POSITION_CHANGED, {
                position: f
            })
        }),
        l = function() {
            0 > f ? f = 0 : 1 < f && (f = 1);
            a.style.top = f * (d - c) + "px";
            p()
        },
        h = !1,
        n = !1,
        p = function() {
            !0 === h && ($(a).stop(), h = !1);
            !1 === n && (n = !0, $(a).fadeTo(500, 1, function() {
                n = !1
            }));
            null !== g && clearTimeout(g);
            g = setTimeout(function() {
                g = null;
                !0 === n && ($(a).stop(), n = !1);
                !1 === h && (h = !0, $(a).fadeTo(1E3, 0, function() {
                    h = !1
                }))
            }, 2E3)
        };
    m()
};
truecolors.Main = {};
var Main = function() {
    var a = null,
        b = null,
        d = null,
        c = null,
        e = null,
        f = 0,
        g = 0,
        m = !1,
        k = !1,
        l = 0,
		widthtc = $(window).width(),		
        h = function(){
            w();
			/*$(window).resize(function(){
				if(widthtc <= 768){
					location.reload();
				}
			});*/
            e ? ($("html").addClass("no-parallaxe"), $(".page1").attr("id", "blue"), $(".page2").attr("id", "orange"), $(".page3").attr("id", "green"), $(".page4").attr("id", "gold"), $(".page5").attr("id", "services"), $(".page6").attr("id", "shop"), $(".page7").attr("id", "footer")) : $("html").addClass("parallaxe");
            var a = $(".page0 img");
			if (!1 == e){			
                var a = $(".page0 img");				
                g = a.length;
                a.each(function(a, b) {
                    var c = $(b);					
                    0 < c.height() ? p() : c.load(p)
                })
            } else q(), r()
        },
        n = function() {
            k = !0;
            !0 === m && !0 === k && r()
        },
        p = function() {
            f++;
            g === f && q()
        },
        q = function() {
            l = (new Date).getTime();
            $("body").addClass("preloader-ready");
            !1 === e ? (a = new LocationHandler, d = new ParallaxeLoader(a, b), c = d.getParallaxer(), a.addEventListener(a.LOCATION_CHANGED, function(a) {
                a = d.getGroupScrollPosition(a.name);
                $(document).scrollTop(a)
            }), Modernizr.csstransforms, c.addEventListener(ParallaxerEvent.AFTER_FIRST_DRAW, s), d.init()) : v()
        },
        s = function() {
            c.removeEventListener(ParallaxerEvent.AFTER_FIRST_DRAW,
                v);
            v()
        },
        v = function() {
            !1 === e && $(".page0").hide();
            $(".page0").css("visibility", "visible");
            !1 === e && $(".page0").fadeIn(1E3, function() {
                m = !0;
                !0 === m && !0 === k && r()
            })
        },
        r = function(){            
            !1 === e && (b = a.getLocation(), 0 === window.pageYOffset && (b ? (b = d.getGroupScrollPosition(b), $(document).scrollTop(b)) : $(document).scrollTop(d.getGroupScrollPosition("blue"))));
            t()
        },
        w = function() {
            var a = null;			
            navigator && navigator.userAgent && (a = navigator.userAgent);			
            e = -1 !== a.search(/mobile/i);
			if(widthtc <= 768){
				e = true;
			}
        },
        t = function() {
            var a = Math.max(0, 3E3 - ((new Date).getTime() - l));
			if(widthtc <= 768){
				u()
			}else{
				$(".page0 .loading").delay(a).fadeOut(function() {
					u()
				})
			}			
        },
        u = function() {
            $(".page").css("visibility", "visible");
            !1 === e && (c.addEventListener(ParallaxerEvent.AFTER_LOOP_STOP, function() {
                $(".page0").remove()
            }), d.start())
        };
    Utils.delegate(this, function() {
        $(window).ready(h);
        $(window).load(n)       
    })()
};