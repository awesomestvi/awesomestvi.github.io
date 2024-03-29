function setup_sidebar_menu() {
    if (public_vars.$sidebarMenu.length) {
        var e = public_vars.$sidebarMenu.find("li:has(> ul)"),
            t = public_vars.$sidebarMenu.hasClass("toggle-others");
        e.filter(".active").addClass("expanded"), is("largescreen") && 0 == public_vars.$sidebarMenu.hasClass("collapsed") && $(window).on("resize", function() {
            is("tabletscreen") ? (public_vars.$sidebarMenu.addClass("collapsed"), ps_destroy()) : is("largescreen") && (public_vars.$sidebarMenu.removeClass("collapsed"), ps_init())
        }), e.each(function(e, a) {
            var n = jQuery(a),
                i = n.children("a"),
                r = n.children("ul");
            n.addClass("has-sub"), i.on("click", function(e) {
                if (e.preventDefault(), public_vars.$sidebarMenu.hasClass("collapsed") && n.parent().is(".main-menu")) {
                    var a = "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
                    return void(a ? (n.siblings().not(n).find("> a").data("urlJump", 0), i.data("urlJump") > 1 && (window.location.href = i.attr("href")), "undefined" == typeof i.data("urlJump") ? i.data("urlJump", 1) : i.data("urlJump", i.data("urlJump") + 1)) : window.location.href = i.attr("href"))
                }
                t && sidebar_menu_close_items_siblings(n), n.hasClass("expanded") || n.hasClass("opened") ? sidebar_menu_item_collapse(n, r) : sidebar_menu_item_expand(n, r)
            })
        })
    }
}

function sidebar_menu_item_expand(e, t) {
    if (!(e.data("is-busy") || e.parent(".main-menu").length && public_vars.$sidebarMenu.hasClass("collapsed"))) {
        e.addClass("expanded").data("is-busy", !0), t.show();
        var a = t.children(),
            n = t.outerHeight(),
            i = (jQuery(window).height(), e.outerHeight(), public_vars.$sidebarMenu.scrollTop());
        e.position().top + i, public_vars.$sidebarMenu.hasClass("fit-in-viewport");
        a.addClass("is-hidden"), t.height(0), TweenMax.to(t, sm_duration, {
            css: {
                height: n
            },
            onUpdate: ps_update,
            onComplete: function() {
                t.height("")
            }
        });
        var r = e.data("sub_i_1"),
            s = e.data("sub_i_2");
        window.clearTimeout(r), r = setTimeout(function() {
            a.each(function(e, t) {
                var a = jQuery(t);
                a.addClass("is-shown")
            });
            var t = sm_transition_delay * a.length,
                n = parseFloat(a.eq(0).css("transition-duration")),
                i = parseFloat(a.last().css("transition-delay"));
            n && i && (t = 1e3 * (n + i)), window.clearTimeout(s), s = setTimeout(function() {
                a.removeClass("is-hidden is-shown")
            }, t), e.data("is-busy", !1)
        }, 0), e.data("sub_i_1", r), e.data("sub_i_2", s)
    }
}

function sidebar_menu_item_collapse(e, t) {
    if (!e.data("is-busy")) {
        var a = t.children();
        e.removeClass("expanded").data("is-busy", !0), a.addClass("hidden-item"), TweenMax.to(t, sm_duration, {
            css: {
                height: 0
            },
            onUpdate: ps_update,
            onComplete: function() {
                e.data("is-busy", !1).removeClass("opened"), t.removeAttr("style"), a.removeClass("hidden-item"), e.find("li.expanded ul").attr("style", "").hide().parent().removeClass("expanded"), ps_update(!0)
            }
        })
    }
}

function sidebar_menu_close_items_siblings(e) {
    e.siblings().not(e).filter(".expanded, .opened").each(function(e, t) {
        var a = jQuery(t),
            n = a.children("ul");
        sidebar_menu_item_collapse(a, n)
    })
}

function setup_horizontal_menu() {
    if (public_vars.$horizontalMenu.length) {
        var e = public_vars.$horizontalMenu.find("li:has(> ul)"),
            t = public_vars.$horizontalMenu.hasClass("click-to-expand");
        t && public_vars.$mainContent.add(public_vars.$sidebarMenu).on("click", function(t) {
            e.removeClass("hover")
        }), e.each(function(a, n) {
            var i = jQuery(n),
                r = i.children("a"),
                s = i.children("ul"),
                o = i.parent().is(".navbar-nav");
            i.addClass("has-sub"), r.on("click", function(e) {
                isxs() && (e.preventDefault(), sidebar_menu_close_items_siblings(i), i.hasClass("expanded") || i.hasClass("opened") ? sidebar_menu_item_collapse(i, s) : sidebar_menu_item_expand(i, s))
            }), t ? r.on("click", function(t) {
                if (t.preventDefault(), !isxs())
                    if (o) e.filter(function(e, t) {
                        return jQuery(t).parent().is(".navbar-nav")
                    }).not(i).removeClass("hover"), i.toggleClass("hover");
                    else {
                        var a;
                        0 == i.hasClass("expanded") ? (i.addClass("expanded"), s.addClass("is-visible"), a = s.outerHeight(), s.height(0), TweenLite.to(s, .15, {
                            css: {
                                height: a
                            },
                            ease: Sine.easeInOut,
                            onComplete: function() {
                                s.attr("style", "")
                            }
                        }), i.siblings().find("> ul.is-visible").not(s).each(function(e, t) {
                            var n = jQuery(t);
                            a = n.outerHeight(), n.removeClass("is-visible").height(a), n.parent().removeClass("expanded"), TweenLite.to(n, .15, {
                                css: {
                                    height: 0
                                },
                                onComplete: function() {
                                    n.attr("style", "")
                                }
                            })
                        })) : (a = s.outerHeight(), i.removeClass("expanded"), s.removeClass("is-visible").height(a), TweenLite.to(s, .15, {
                            css: {
                                height: 0
                            },
                            onComplete: function() {
                                s.attr("style", "")
                            }
                        }))
                    }
            }) : i.hoverIntent({
                over: function() {
                    isxs() || (o ? i.addClass("hover") : (s.addClass("is-visible"), sub_height = s.outerHeight(), s.height(0), TweenLite.to(s, .25, {
                        css: {
                            height: sub_height
                        },
                        ease: Sine.easeInOut,
                        onComplete: function() {
                            s.attr("style", "")
                        }
                    })))
                },
                out: function() {
                    isxs() || (o ? i.removeClass("hover") : (sub_height = s.outerHeight(), i.removeClass("expanded"), s.removeClass("is-visible").height(sub_height), TweenLite.to(s, .25, {
                        css: {
                            height: 0
                        },
                        onComplete: function() {
                            s.attr("style", "")
                        }
                    })))
                },
                timeout: 200,
                interval: o ? 10 : 100
            })
        })
    }
}

function stickFooterToBottom() {
    if (public_vars.$mainFooter.add(public_vars.$mainContent).add(public_vars.$sidebarMenu).attr("style", ""), isxs()) return !1;
    if (public_vars.$mainFooter.hasClass("sticky")) {
        var e = jQuery(window).height(),
            t = public_vars.$mainFooter.outerHeight(!0),
            a = public_vars.$mainFooter.position().top + t,
            n = public_vars.$horizontalNavbar.outerHeight();
        e > a - parseInt(public_vars.$mainFooter.css("marginTop"), 10) && public_vars.$mainFooter.css({
            marginTop: e - a - n
        })
    }
}

function ps_update(e) {
    if (!isxs() && jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
        if (public_vars.$sidebarMenu.hasClass("collapsed")) return;
        public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar("update"), e && (ps_destroy(), ps_init())
    }
}

function ps_init() {
    if (!isxs() && jQuery.isFunction(jQuery.fn.perfectScrollbar)) {
        if (public_vars.$sidebarMenu.hasClass("collapsed") || !public_vars.$sidebarMenu.hasClass("fixed")) return;
        public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar({
            wheelSpeed: 1,
            wheelPropagation: public_vars.wheelPropagation
        })
    }
}

function ps_destroy() {
    jQuery.isFunction(jQuery.fn.perfectScrollbar) && public_vars.$sidebarMenu.find(".sidebar-menu-inner").perfectScrollbar("destroy")
}

function cbr_replace() {
    var e = jQuery('input[type="checkbox"].cbr, input[type="radio"].cbr').filter(":not(.cbr-done)"),
        t = '<div class="cbr-replaced"><div class="cbr-input"></div><div class="cbr-state"><span></span></div></div>';
    e.each(function(e, a) {
        var n = jQuery(a),
            i = n.is(":radio"),
            r = n.is(":checkbox"),
            s = n.is(":disabled"),
            o = ["primary", "secondary", "success", "danger", "warning", "info", "purple", "blue", "red", "gray", "pink", "yellow", "orange", "turquoise"];
        if (i || r) {
            n.after(t), n.addClass("cbr-done");
            var l = n.next();
            l.find(".cbr-input").append(n), i && l.addClass("cbr-radio"), s && l.addClass("cbr-disabled"), n.is(":checked") && l.addClass("cbr-checked"), jQuery.each(o, function(e, t) {
                var a = "cbr-" + t;
                n.hasClass(a) && (l.addClass(a), n.removeClass(a))
            }), l.on("click", function(e) {
                i && n.prop("checked") || l.parent().is("label") || 0 == jQuery(e.target).is(n) && (n.prop("checked", !n.is(":checked")), n.trigger("change"))
            }), n.on("change", function(e) {
                l.removeClass("cbr-checked"), n.is(":checked") && l.addClass("cbr-checked"), cbr_recheck()
            })
        }
    })
}

function cbr_recheck() {
    var e = jQuery("input.cbr-done");
    e.each(function(e, t) {
        var a = jQuery(t),
            n = a.is(":radio"),
            i = (a.is(":checkbox"), a.is(":disabled")),
            r = a.closest(".cbr-replaced");
        i && r.addClass("cbr-disabled"), n && !a.prop("checked") && r.hasClass("cbr-checked") && r.removeClass("cbr-checked")
    })
}

function attrDefault(e, t, a) {
    return "undefined" != typeof e.data(t) ? e.data(t) : a
}

function callback_test() {
    alert("Callback function executed! No. of arguments: " + arguments.length + "\n\nSee console log for outputed of the arguments."), console.log(arguments)
}

function date(e, t) {
    var a, n, i = this,
        r = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        s = /\\?(.?)/gi,
        o = function(e, t) {
            return n[e] ? n[e]() : t
        },
        l = function(e, t) {
            for (e = String(e); e.length < t;) e = "0" + e;
            return e
        };
    return n = {
        d: function() {
            return l(n.j(), 2)
        },
        D: function() {
            return n.l().slice(0, 3)
        },
        j: function() {
            return a.getDate()
        },
        l: function() {
            return r[n.w()] + "day"
        },
        N: function() {
            return n.w() || 7
        },
        S: function() {
            var e = n.j(),
                t = e % 10;
            return 3 >= t && 1 == parseInt(e % 100 / 10, 10) && (t = 0), ["st", "nd", "rd"][t - 1] || "th"
        },
        w: function() {
            return a.getDay()
        },
        z: function() {
            var e = new Date(n.Y(), n.n() - 1, n.j()),
                t = new Date(n.Y(), 0, 1);
            return Math.round((e - t) / 864e5)
        },
        W: function() {
            var e = new Date(n.Y(), n.n() - 1, n.j() - n.N() + 3),
                t = new Date(e.getFullYear(), 0, 4);
            return l(1 + Math.round((e - t) / 864e5 / 7), 2)
        },
        F: function() {
            return r[6 + n.n()]
        },
        m: function() {
            return l(n.n(), 2)
        },
        M: function() {
            return n.F().slice(0, 3)
        },
        n: function() {
            return a.getMonth() + 1
        },
        t: function() {
            return new Date(n.Y(), n.n(), 0).getDate()
        },
        L: function() {
            var e = n.Y();
            return e % 4 === 0 & e % 100 !== 0 | e % 400 === 0
        },
        o: function() {
            var e = n.n(),
                t = n.W(),
                a = n.Y();
            return a + (12 === e && 9 > t ? 1 : 1 === e && t > 9 ? -1 : 0)
        },
        Y: function() {
            return a.getFullYear()
        },
        y: function() {
            return n.Y().toString().slice(-2)
        },
        a: function() {
            return a.getHours() > 11 ? "pm" : "am"
        },
        A: function() {
            return n.a().toUpperCase()
        },
        B: function() {
            var e = 3600 * a.getUTCHours(),
                t = 60 * a.getUTCMinutes(),
                n = a.getUTCSeconds();
            return l(Math.floor((e + t + n + 3600) / 86.4) % 1e3, 3)
        },
        g: function() {
            return n.G() % 12 || 12
        },
        G: function() {
            return a.getHours()
        },
        h: function() {
            return l(n.g(), 2)
        },
        H: function() {
            return l(n.G(), 2)
        },
        i: function() {
            return l(a.getMinutes(), 2)
        },
        s: function() {
            return l(a.getSeconds(), 2)
        },
        u: function() {
            return l(1e3 * a.getMilliseconds(), 6)
        },
        e: function() {
            throw "Not supported (see source code of date() for timezone on how to add support)"
        },
        I: function() {
            var e = new Date(n.Y(), 0),
                t = Date.UTC(n.Y(), 0),
                a = new Date(n.Y(), 6),
                i = Date.UTC(n.Y(), 6);
            return e - t !== a - i ? 1 : 0
        },
        O: function() {
            var e = a.getTimezoneOffset(),
                t = Math.abs(e);
            return (e > 0 ? "-" : "+") + l(100 * Math.floor(t / 60) + t % 60, 4)
        },
        P: function() {
            var e = n.O();
            return e.substr(0, 3) + ":" + e.substr(3, 2)
        },
        T: function() {
            return "UTC"
        },
        Z: function() {
            return 60 * -a.getTimezoneOffset()
        },
        c: function() {
            return "Y-m-d\\TH:i:sP".replace(s, o)
        },
        r: function() {
            return "D, d M Y H:i:s O".replace(s, o)
        },
        U: function() {
            return a / 1e3 | 0
        }
    }, this.date = function(e, t) {
        return i = this, a = void 0 === t ? new Date : t instanceof Date ? new Date(t) : new Date(1e3 * t), e.replace(s, o)
    }, this.date(e, t)
}
var public_vars = public_vars || {};
! function(e, t, a) {
    "use strict";
    e(document).ready(function() {
        if (public_vars.$body = e("body"), public_vars.$pageContainer = public_vars.$body.find(".page-container"), public_vars.$chat = public_vars.$pageContainer.find("#chat"), public_vars.$sidebarMenu = public_vars.$pageContainer.find(".sidebar-menu"), public_vars.$sidebarProfile = public_vars.$sidebarMenu.find(".sidebar-user-info"), public_vars.$mainMenu = public_vars.$sidebarMenu.find(".main-menu"), public_vars.$horizontalNavbar = public_vars.$body.find(".navbar.horizontal-menu"), public_vars.$horizontalMenu = public_vars.$horizontalNavbar.find(".navbar-nav"), public_vars.$mainContent = public_vars.$pageContainer.find(".main-content"), public_vars.$mainFooter = public_vars.$body.find("footer.main-footer"), public_vars.$userInfoMenuHor = public_vars.$body.find(".navbar.horizontal-menu"), public_vars.$userInfoMenu = public_vars.$body.find("nav.navbar.user-info-navbar"), public_vars.$settingsPane = public_vars.$body.find(".settings-pane"), public_vars.$settingsPaneIn = public_vars.$settingsPane.find(".settings-pane-inner"), public_vars.wheelPropagation = !0, public_vars.$pageLoadingOverlay = public_vars.$body.find(".page-loading-overlay"), public_vars.defaultColorsPalette = ["#68b828", "#7c38bc", "#0e62c7", "#fcd036", "#4fcdfc", "#00b19d", "#ff6264", "#f7aa47"], public_vars.$pageLoadingOverlay.length && e(t).load(function() {
                public_vars.$pageLoadingOverlay.addClass("loaded")
            }), t.onerror = function() {
                public_vars.$pageLoadingOverlay.addClass("loaded")
            }, setup_sidebar_menu(), setup_horizontal_menu(), public_vars.$mainFooter.hasClass("sticky") && (stickFooterToBottom(), e(t).on("xenon.resized", stickFooterToBottom)), e.isFunction(e.fn.perfectScrollbar)) {
            public_vars.$sidebarMenu.hasClass("fixed") && ps_init(), e(".ps-scrollbar").each(function(t, a) {
                var n = e(a);
                n.hasClass("ps-scroll-down") && n.scrollTop(n.prop("scrollHeight")), n.perfectScrollbar({
                    wheelPropagation: !1
                })
            });
            var a = public_vars.$pageContainer.find("#chat .chat-inner");
            a.parent().hasClass("fixed") && a.css({
                maxHeight: e(t).height()
            }).perfectScrollbar(), e(".dropdown:has(.ps-scrollbar)").each(function(t, a) {
                var n = e(this).find(".ps-scrollbar");
                e(this).on("click", '[data-toggle="dropdown"]', function(e) {
                    e.preventDefault(), setTimeout(function() {
                        n.perfectScrollbar("update")
                    }, 1)
                })
            }), e("div.scrollable").each(function(t, a) {
                var n = e(a),
                    i = parseInt(attrDefault(n, "max-height", 200), 10);
                i = 0 > i ? 200 : i, n.css({
                    maxHeight: i
                }).perfectScrollbar({
                    wheelPropagation: !0
                })
            })
        }
        var n = e(".user-info-menu .search-form, .nav.navbar-right .search-form");
        if (n.each(function(t, a) {
                var n = e(a).find(".form-control");
                e(a).on("click", ".btn", function(e) {
                    return 0 == n.val().trim().length ? (jQuery(a).addClass("focused"), setTimeout(function() {
                        n.focus()
                    }, 100), !1) : void 0
                }), n.on("blur", function() {
                    jQuery(a).removeClass("focused")
                })
            }), public_vars.$mainFooter.hasClass("fixed") && public_vars.$mainContent.css({
                paddingBottom: public_vars.$mainFooter.outerHeight(!0)
            }), e("body").on("click", 'a[rel="go-top"]', function(a) {
                a.preventDefault();
                var n = {
                    pos: e(t).scrollTop()
                };
                TweenLite.to(n, .3, {
                    pos: 0,
                    ease: Power4.easeOut,
                    onUpdate: function() {
                        e(t).scrollTop(n.pos)
                    }
                })
            }), public_vars.$userInfoMenu.length && public_vars.$userInfoMenu.find(".user-info-menu > li").css({
                minHeight: public_vars.$userInfoMenu.outerHeight() - 1
            }), e.isFunction(e.fn.autosize) && e(".autosize, .autogrow").autosize(), cbr_replace(), e(".breadcrumb.auto-hidden").each(function(t, a) {
                var n = e(a),
                    i = n.find("li a"),
                    r = (i.width(), 0);
                i.each(function(t, a) {
                    var n = e(a);
                    r = n.outerWidth(!0) + 5, n.addClass("collapsed").width(r), n.hover(function() {
                        n.removeClass("collapsed")
                    }, function() {
                        n.addClass("collapsed")
                    })
                })
            }), e(t).on("keydown", function(t) {
                27 == t.keyCode && public_vars.$body.hasClass("modal-open") && e(".modal-open .modal:visible").modal("hide")
            }), e(".input-group.input-group-minimal:has(.form-control)").each(function(t, a) {
                var n = e(a),
                    i = n.find(".form-control");
                i.on("focus", function() {
                    n.addClass("focused")
                }).on("blur", function() {
                    n.removeClass("focused")
                })
            }), e(".input-group.spinner").each(function(t, a) {
                var n = e(a),
                    i = n.find('[data-type="decrement"]'),
                    r = n.find('[data-type="increment"]'),
                    s = n.find(".form-control"),
                    o = attrDefault(n, "step", 1),
                    l = attrDefault(n, "min", 0),
                    u = attrDefault(n, "max", 0),
                    c = u > l;
                i.on("click", function(e) {
                    e.preventDefault();
                    var t = new Number(s.val()) - o;
                    c && l >= t && (t = l), s.val(t)
                }), r.on("click", function(e) {
                    e.preventDefault();
                    var t = new Number(s.val()) + o;
                    c && t >= u && (t = u), s.val(t)
                })
            }), e.isFunction(e.fn.select2) && (e(".select2").each(function(t, a) {
                var n = e(a),
                    i = {
                        allowClear: attrDefault(n, "allowClear", !1),
                        dropdownAutoWidth: !0
                    };
                n.select2(i), n.addClass("visible")
            }), e.isFunction(e.fn.niceScroll) && e(".select2-results").niceScroll({
                cursorcolor: "#d4d4d4",
                cursorborder: "1px solid #ccc",
                railpadding: {
                    right: 3
                }
            })), e.isFunction(e.fn.selectBoxIt) && e("select.selectboxit").each(function(t, a) {
                var n = e(a),
                    i = {
                        showFirstOption: attrDefault(n, "first-option", !0),
                        "native": attrDefault(n, "native", !1),
                        defaultText: attrDefault(n, "text", "")
                    };
                n.addClass("visible"), n.selectBoxIt(i)
            }), e.isFunction(e.fn.datepicker) && e(".datepicker").each(function(t, a) {
                var n = e(a),
                    i = {
                        format: attrDefault(n, "format", "mm/dd/yyyy"),
                        startDate: attrDefault(n, "startDate", ""),
                        endDate: attrDefault(n, "endDate", ""),
                        daysOfWeekDisabled: attrDefault(n, "disabledDays", ""),
                        startView: attrDefault(n, "startView", 0),
                        //rtl: rtl()
                    },
                    r = n.next(),
                    s = n.prev();
                n.datepicker(i), r.is(".input-group-addon") && r.has("a") && r.on("click", function(e) {
                    e.preventDefault(), n.datepicker("show")
                }), s.is(".input-group-addon") && s.has("a") && s.on("click", function(e) {
                    e.preventDefault(), n.datepicker("show")
                })
            }), e.isFunction(e.fn.daterangepicker) && e(".daterange").each(function(t, a) {
                var n = {
                        Today: [moment(), moment()],
                        Yesterday: [moment().subtract("days", 1), moment().subtract("days", 1)],
                        "Last 7 Days": [moment().subtract("days", 6), moment()],
                        "Last 30 Days": [moment().subtract("days", 29), moment()],
                        "This Month": [moment().startOf("month"), moment().endOf("month")],
                        "Last Month": [moment().subtract("month", 1).startOf("month"), moment().subtract("month", 1).endOf("month")]
                    },
                    i = e(a),
                    r = {
                        format: attrDefault(i, "format", "MM/DD/YYYY"),
                        timePicker: attrDefault(i, "timePicker", !1),
                        timePickerIncrement: attrDefault(i, "timePickerIncrement", !1),
                        separator: attrDefault(i, "separator", " - ")
                    },
                    s = attrDefault(i, "minDate", ""),
                    o = attrDefault(i, "maxDate", ""),
                    l = attrDefault(i, "startDate", ""),
                    u = attrDefault(i, "endDate", "");
                i.hasClass("add-ranges") && (r.ranges = n), s.length && (r.minDate = s), o.length && (r.maxDate = o), l.length && (r.startDate = l), u.length && (r.endDate = u), i.daterangepicker(r, function(e, t) {
                    var a = i.data("daterangepicker");
                    i.is("[data-callback]") && callback_test(e, t), i.hasClass("daterange-inline") && i.find("span").html(e.format(a.format) + a.separator + t.format(a.format))
                }), "object" == typeof r.ranges && i.data("daterangepicker").container.removeClass("show-calendar")
            }), e.isFunction(e.fn.timepicker) && e(".timepicker").each(function(t, a) {
                var n = e(a),
                    i = {
                        template: attrDefault(n, "template", !1),
                        showSeconds: attrDefault(n, "showSeconds", !1),
                        defaultTime: attrDefault(n, "defaultTime", "current"),
                        showMeridian: attrDefault(n, "showMeridian", !0),
                        minuteStep: attrDefault(n, "minuteStep", 15),
                        secondStep: attrDefault(n, "secondStep", 15)
                    },
                    r = n.next(),
                    s = n.prev();
                n.timepicker(i), r.is(".input-group-addon") && r.has("a") && r.on("click", function(e) {
                    e.preventDefault(), n.timepicker("showWidget")
                }), s.is(".input-group-addon") && s.has("a") && s.on("click", function(e) {
                    e.preventDefault(), n.timepicker("showWidget")
                })
            }), e.isFunction(e.fn.colorpicker) && e(".colorpicker").each(function(t, a) {
                var n = e(a),
                    i = {},
                    r = n.next(),
                    s = n.prev(),
                    o = n.siblings(".input-group-addon").find(".color-preview");
                n.colorpicker(i), r.is(".input-group-addon") && r.has("a") && r.on("click", function(e) {
                    e.preventDefault(), n.colorpicker("show")
                }), s.is(".input-group-addon") && s.has("a") && s.on("click", function(e) {
                    e.preventDefault(), n.colorpicker("show")
                }), o.length && (n.on("changeColor", function(e) {
                    o.css("background-color", e.color.toHex())
                }), n.val().length && o.css("background-color", n.val()))
            }), e.isFunction(e.fn.validate) && e("form.validate").each(function(t, a) {
                var n = e(a),
                    i = {
                        rules: {},
                        messages: {},
                        errorElement: "span",
                        errorClass: "validate-has-error",
                        highlight: function(t) {
                            e(t).closest(".form-group").addClass("validate-has-error")
                        },
                        unhighlight: function(t) {
                            e(t).closest(".form-group").removeClass("validate-has-error")
                        },
                        errorPlacement: function(e, t) {
                            t.closest(".has-switch").length ? e.insertAfter(t.closest(".has-switch")) : t.parent(".checkbox, .radio").length || t.parent(".input-group").length ? e.insertAfter(t.parent()) : e.insertAfter(t)
                        }
                    },
                    r = n.find("[data-validate]");
                r.each(function(t, a) {
                    var n = e(a),
                        r = n.attr("name"),
                        s = attrDefault(n, "validate", "").toString(),
                        o = s.split(",");
                    for (var l in o) {
                        var u, c, d = o[l];
                        "undefined" == typeof i.rules[r] && (i.rules[r] = {}, i.messages[r] = {}), -1 != e.inArray(d, ["required", "url", "email", "number", "date", "creditcard"]) ? (i.rules[r][d] = !0, c = n.data("message-" + d), c && (i.messages[r][d] = c)) : (u = d.match(/(\w+)\[(.*?)\]/i)) && -1 != e.inArray(u[1], ["min", "max", "minlength", "maxlength", "equalTo"]) && (i.rules[r][u[1]] = u[2], c = n.data("message-" + u[1]), c && (i.messages[r][u[1]] = c))
                    }
                }), n.validate(i)
            }), e.isFunction(e.fn.inputmask) && e("[data-mask]").each(function(t, a) {
                var n = e(a),
                    i = n.data("mask").toString(),
                    r = {
                        numericInput: attrDefault(n, "numeric", !1),
                        radixPoint: attrDefault(n, "radixPoint", ""),
                        rightAlign: "right" == attrDefault(n, "numericAlign", "left")
                    },
                    s = attrDefault(n, "placeholder", ""),
                    o = attrDefault(n, "isRegex", "");
                switch (s.length && (r[s] = s), i.toLowerCase()) {
                    case "phone":
                        i = "(999) 999-9999";
                        break;
                    case "currency":
                    case "rcurrency":
                        var l = attrDefault(n, "sign", "$");
                        i = "999,999,999.99", "rcurrency" == n.data("mask").toLowerCase() ? i += " " + l : i = l + " " + i, r.numericInput = !0, r.rightAlignNumerics = !1, r.radixPoint = ".";
                        break;
                    case "email":
                        i = "Regex", r.regex = "[a-zA-Z0-9._%-]+@[a-zA-Z0-9-]+\\.[a-zA-Z]{2,4}";
                        break;
                    case "fdecimal":
                        i = "decimal", e.extend(r, {
                            autoGroup: !0,
                            groupSize: 3,
                            radixPoint: attrDefault(n, "rad", "."),
                            groupSeparator: attrDefault(n, "dec", ",")
                        })
                }
                o && (r.regex = i, i = "Regex"), n.inputmask(i, r)
            }), e.isFunction(e.fn.bootstrapWizard) && e(".form-wizard").each(function(t, a) {
                var n = e(a),
                    i = n.find("> .tabs > li"),
                    r = n.find(".progress-indicator"),
                    s = n.find("> ul > li.active").index(),
                    o = function(e, t, a) {
                        if (n.hasClass("validate")) {
                            var i = n.valid();
                            if (!i) return n.data("validator").focusInvalid(), !1
                        }
                        return !0
                    };
                s > 0 && (r.css({
                    width: s / i.length * 100 + "%"
                }), i.removeClass("completed").slice(0, s).addClass("completed")), n.bootstrapWizard({
                    tabClass: "",
                    onTabShow: function(e, t, a) {
                        var n = i.eq(a).position().left / i.parent().width() * 100;
                        i.removeClass("completed").slice(0, a).addClass("completed"), r.css({
                            width: n + "%"
                        })
                    },
                    onNext: o,
                    onTabClick: o
                }), n.data("bootstrapWizard").show(s), n.find(".pager a").on("click", function(e) {
                    e.preventDefault()
                })
            }), e.isFunction(e.fn.slider) && e(".slider").each(function(t, a) {
                var n = e(a),
                    i = e('<span class="ui-label"></span>'),
                    r = i.clone(),
                    s = 0 != attrDefault(n, "vertical", 0) ? "vertical" : "horizontal",
                    o = attrDefault(n, "prefix", ""),
                    l = attrDefault(n, "postfix", ""),
                    u = attrDefault(n, "fill", ""),
                    c = e(u),
                    d = attrDefault(n, "step", 1),
                    f = attrDefault(n, "value", 5),
                    p = attrDefault(n, "min", 0),
                    h = attrDefault(n, "max", 100),
                    v = attrDefault(n, "min-val", 10),
                    m = attrDefault(n, "max-val", 90),
                    b = n.is("[data-min-val]") || n.is("[data-max-val]"),
                    g = 0;
                if (b) {
                    n.slider({
                        range: !0,
                        orientation: s,
                        min: p,
                        max: h,
                        values: [v, m],
                        step: d,
                        slide: function(e, t) {
                            var a = (o ? o : "") + t.values[0] + (l ? l : ""),
                                n = (o ? o : "") + t.values[1] + (l ? l : "");
                            i.html(a), r.html(n), u && c.val(a + "," + n), g++
                        },
                        change: function(e, t) {
                            if (1 == g) {
                                var a = (o ? o : "") + t.values[0] + (l ? l : ""),
                                    n = (o ? o : "") + t.values[1] + (l ? l : "");
                                i.html(a), r.html(n), u && c.val(a + "," + n)
                            }
                            g = 0
                        }
                    });
                    var _ = n.find(".ui-slider-handle");
                    i.html((o ? o : "") + v + (l ? l : "")), _.first().append(i), r.html((o ? o : "") + m + (l ? l : "")), _.last().append(r)
                } else {
                    n.slider({
                        range: attrDefault(n, "basic", 0) ? !1 : "min",
                        orientation: s,
                        min: p,
                        max: h,
                        value: f,
                        step: d,
                        slide: function(e, t) {
                            var a = (o ? o : "") + t.value + (l ? l : "");
                            i.html(a), u && c.val(a), g++
                        },
                        change: function(e, t) {
                            if (1 == g) {
                                var a = (o ? o : "") + t.value + (l ? l : "");
                                i.html(a), u && c.val(a)
                            }
                            g = 0
                        }
                    });
                    var _ = n.find(".ui-slider-handle");
                    i.html((o ? o : "") + f + (l ? l : "")), _.html(i)
                }
            }), e.isFunction(e.fn.knob) && e(".knob").knob({
                change: function(e) {},
                release: function(e) {},
                cancel: function() {},
                draw: function() {
                    if ("tron" == this.$.data("skin")) {
                        var e, t = this.angle(this.cv),
                            a = this.startAngle,
                            n = this.startAngle,
                            i = n + t,
                            r = 1;
                        return this.g.lineWidth = this.lineWidth, this.o.cursor && (n = i - .3) && (i += .3), this.o.displayPrevious && (e = this.startAngle + this.angle(this.v), this.o.cursor && (a = e - .3) && (e += .3), this.g.beginPath(), this.g.strokeStyle = this.pColor, this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a, e, !1), this.g.stroke()), this.g.beginPath(), this.g.strokeStyle = r ? this.o.fgColor : this.fgColor, this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, n, i, !1), this.g.stroke(), this.g.lineWidth = 2, this.g.beginPath(), this.g.strokeStyle = this.o.fgColor, this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + 2 * this.lineWidth / 3, 0, 2 * Math.PI, !1), this.g.stroke(), !1
                    }
                }
            }), e.isFunction(e.fn.wysihtml5) && e(".wysihtml5").each(function(t, a) {
                var n = e(a),
                    i = attrDefault(n, "stylesheet-url", "");
                e(".wysihtml5").wysihtml5({
                    size: "white",
                    stylesheets: i.split(","),
                    html: attrDefault(n, "html", !0),
                    color: attrDefault(n, "colors", !0)
                })
            }), e.isFunction(e.fn.ckeditor) && e(".ckeditor").ckeditor({
                contentsLangDirection: rtl() ? "rtl" : "ltr"
            }), "undefined" != typeof Dropzone && (Dropzone.autoDiscover = !1, e(".dropzone[action]").each(function(t, a) {
                e(a).dropzone()
            })), e.isFunction(e.fn.tocify) && e("#toc").length) {
            e("#toc").tocify({
                context: ".tocify-content",
                selectors: "h2,h3,h4,h5"
            });
            var i = e(".tocify"),
                r = scrollMonitor.create(i.get(0));
            i.width(i.parent().width()), r.lock(), r.stateChange(function() {
                e(i.get(0)).toggleClass("fixed", this.isAboveViewport)
            })
        }
        e(".login-form .form-group:has(label)").each(function(t, a) {
            var n = e(a),
                i = n.find("label"),
                r = n.find(".form-control");
            r.on("focus", function() {
                n.addClass("is-focused")
            }), r.on("keydown", function() {
                n.addClass("is-focused")
            }), r.on("blur", function() {
                n.removeClass("is-focused"), r.val().trim().length > 0 && n.addClass("is-focused")
            }), i.on("click", function() {
                r.focus()
            }), r.val().trim().length > 0 && n.addClass("is-focused")
        })
    });
    var n = 0;
    e(t).resize(function() {
        clearTimeout(n), n = setTimeout(trigger_resizable, 200)
    })
}(jQuery, window);
var sm_duration = .2,
    sm_transition_delay = 150;