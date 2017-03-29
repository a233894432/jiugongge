(function(h, k) { "function" === typeof define && (define.amd || define.cmd) ? define(k) : (h.app = h.app || {}, h.app.validate = k()) })(this, function() {
    function h(a, b, c) {
        this.options = a;
        this.success = b;
        this.error = c;
        this.init()
    }

    function k(a) {
        a = document.getElementsByName(a);
        var b = [];
        switch (a[0].type) {
            case "radio":
            case "select-one":
                b = 0 <= a[0].selectedIndex ? a[0].options[a[0].selectedIndex].value : "";
                break;
            case "checkbox":
            case "select-multiple":
                g(a, function(a) { a.checked && b.push(a.value || 0) });
                break;
            default:
                b = a[0].value
        }
        return b
    }

    function g(a, b, c) {
        var e, d, f = 0;
        e = !!a && "length" in a && a.length;
        d = Object.prototype.toString.call(a);
        d = d.split(" ").pop();
        d = d.substring(0, d.length - 1).toLowerCase();
        e = "function" === d || null != a && a === a.window ? !1 : "array" === d || 0 === e || "number" === typeof e && 0 < e && e - 1 in a;
        if (e)
            for (e = a.length; f < e && (d = b.call(a[f], a[f], f), !c || d); f++);
        else
            for (f in a)
                if (d = b.call(a[f], a[f], f), c && !d) break
    }
    var r = /[, ]+/g,
        t = /^1[345678]\d{9}$/,
        u = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
        v = /^\d+(\.\d+)?$/,
        w = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
        m = Array.prototype,
        l = {},
        q = {
            required: function(a) { return "undefined" !== typeof a && "" !== a },
            tel: function(a) { return t.test(a) },
            number: function(a) { return v.test(a) },
            email: function(a) { return u.test(a) },
            password: function(a) { return w.test(a) },
            compare: function() {
                var a = m.shift.call(arguments),
                    b = m.slice.call(arguments, 0),
                    c = !0;
                g(b, function(e) { return c = document.getElementsByName(e) && a == k(e) }, !0);
                return q.required(a) && c
            },
            lengthLimi: function(a, b, c) {
                if ("undefined" == typeof a) return !1;
                a = a.length;
                return c ? a >= b && a <= c : a >=
                    b
            }
        },
        x = { required: "\u6b64\u5143\u7d20\u4e0d\u80fd\u4e3a\u7a7a", tel: "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801", email: "\u8bf7\u8f93\u5165\u6b63\u786e\u683c\u5f0f\u7684\u90ae\u7bb1", password: "\u5bc6\u7801\u4e3a8-16\u4f4d\u5b57\u6bcd\u4e0e\u6570\u5b57\u7ec4\u5408", compare: "\u4e8c\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4", lengthLimi: "\u8bf7\u8f93\u5165\u6307\u5b9a\u8303\u56f4\u5185", number: "\u8bf7\u8f93\u5165\u6570\u5b57\u7c7b\u578b" },
        n = function() {
            var a = 0,
                b = [];
            return {
                getEle: function() {
                    a > b.length -
                        1 && (b[a] = document.createElement("span"), b[a].className = "err-msg");
                    var c = b[a];
                    a++;
                    return c
                },
                reset: function() { a = 0 },
                append: function(a, e, d) {
                    a = document.getElementsByName(e)[0].parentNode;
                    e = a.querySelector(".err-msg");
                    d && (e || (e = n.getEle(), a.appendChild(e)), e.innerText = d)
                },
                remove: function() {
                    for (var c = 0; c < a; c++) b[c].parentNode && b[c].parentNode.removeChild(b[c]);
                    n.reset()
                }
            }
        }(),
        y = function(a) {
            var b = {};
            return function() {
                b[a] = b[a] || {};
                var c = b[a];
                return {
                    listen: function(a, d) {
                        c[a] = c[a] || [];
                        var b = !0;
                        g(c[a], function(a) {
                            a.type ==
                                d.type && (b = !1, g(d, function(b, d) { a[d] = b }));
                            return b
                        }, !0);
                        b && c[a].push(d)
                    },
                    remove: function(a, b) {
                        var f = c[a];
                        f && (b ? g(f, function(a, c) { return a.type == b ? (f.splice(c, 1), !1) : !0 }, !0) : (f = null, delete c[a]))
                    },
                    getAll: function() { return c },
                    trigger: function() {
                        var a = m.shift.apply(arguments),
                            b = c[a],
                            f = !0,
                            p, h = arguments,
                            k = m.slice.call(arguments, 0, 1)[0];
                        g(b, function(b) {
                            b.param && m.push.apply(h, b.param);
                            var c = b.fn.apply(this, h);
                            "undefined" == c && console.log(b.fn + " \u6b64\u51fd\u6570\u672a\u6b63\u786e\u8fd4\u56deboolean\u503c");
                            c || (b.error || n.append).call(this, k, a, b.message, void 0);
                            b.success && !p && (p = b.success);
                            f && !c && (f = !1);
                            return c
                        }, !0);
                        f && p && p.call(this, k, a);
                        return f
                    }
                }
            }()
        },
        z = function() { var a = 0; return function() { a++; return y(a) } }();
    h.prototype = {
        constructor: h,
        init: function() {
            var a = this;
            this._event = z();
            g(a.options, function(b) { a.add(b) })
        },
        add: function(a) {
            var b = this,
                c = a.name;
            a.type && g(a.type, function(d) {
                var f;
                d = d.split("|");
                var e = d.shift();
                0 < d.length && (f = d.shift().split(r));
                f = { type: e, param: f };
                if (d = q[f.type]) f.fn = d, f.message =
                    a.message && a.message[f.type] || x[f.type], f.success = a.success, f.error = a.error, b._event.listen(c, f)
            });
            if (a.userDefined) {
                var e = a.userDefined;
                e.fn && this._event.listen(c, {
                    type: "userDefined",
                    fn: e.fn,
                    message: a.message && a.message.userDefined,
                    success: function() {
                        var b = document.getElementsByName(c)[0].parentNode.querySelector(".err-msg");
                        b && (b.innerText = "");
                        a.success && a.success()
                    },
                    error: a.error
                });
                e.type && (l[c + e.type] = function() {
                    var a = k(c);
                    b._event.trigger(c, a)
                }, g(document.getElementsByName(c), function(a) {
                    a.addEventListener(e.type,
                        l[c + e.type], !1)
                }))
            }
        },
        remove: function(a, b) {
            var c = this;
            if (b) {
                var e = b.types,
                    d = b.userType;
                e && g(e, function(b) { c._event.remove(a, b) });
                if (d) {
                    var f = l[a + d];
                    c._event.remove(a, "userDefined");
                    g(document.getElementsByName(a), function(a) { a.removeEventListener(d, f, !1) })
                }
            } else {
                c._event.remove(a);
                var h = new RegExp("/^" + a + "w+");
                g(l, function(a, b) { h.test(b) && (l[b] = null, delete l[b]) })
            }
        },
        checkOne: function(a) { var b = k(a); return this._event.trigger(a, b) },
        checkAll: function() {
            var a = this,
                b = !0;
            n.remove();
            g(a._event.getAll(), function(c,
                e) {
                var d = a.checkOne(e);
                b && !d && (b = !1)
            });
            b ? this.success && this.success() : this.error && this.error()
        }
    };
    return h
});