var Bezier = function (t) { function n(i) { if (r[i]) return r[i].exports; var e = r[i] = { exports: {}, id: i, loaded: !1 }; return t[i].call(e.exports, e, e.exports, n), e.loaded = !0, e.exports } var r = {}; return n.m = t, n.c = r, n.p = "", n(0) }([function (t, n, r) { "use strict"; t.exports = r(1) }, function (t, n, r) { "use strict"; var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) { return typeof t } : function (t) { return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t }; !function () { function n(t, n, r, i, e) { "undefined" == typeof e && (e = .5); var o = y.projectionratio(e, t), s = 1 - o, u = { x: o * n.x + s * i.x, y: o * n.y + s * i.y }, a = y.abcratio(e, t), f = { x: r.x + (r.x - u.x) / a, y: r.y + (r.y - u.y) / a }; return { A: f, B: r, C: u } } var e = Math.abs, o = Math.min, s = Math.max, u = Math.cos, a = Math.sin, f = Math.acos, c = Math.sqrt, h = Math.PI, x = { x: 0, y: 0, z: 0 }, y = r(2), p = r(3), l = function (t) { var n = t && t.forEach ? t : [].slice.call(arguments), r = !1; if ("object" === i(n[0])) { r = n.length; var o = []; n.forEach(function (t) { ["x", "y", "z"].forEach(function (n) { "undefined" != typeof t[n] && o.push(t[n]) }) }), n = o } var s = !1, u = n.length; if (r) { if (r > 4) { if (1 !== arguments.length) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves"); s = !0 } } else if (6 !== u && 8 !== u && 9 !== u && 12 !== u && 1 !== arguments.length) throw new Error("Only new Bezier(point[]) is accepted for 4th and higher order curves"); var a = !s && (9 === u || 12 === u) || t && t[0] && "undefined" != typeof t[0].z; this._3d = a; for (var f = [], c = 0, h = a ? 3 : 2; u > c; c += h) { var x = { x: n[c], y: n[c + 1] }; a && (x.z = n[c + 2]), f.push(x) } this.order = f.length - 1, this.points = f; var p = ["x", "y"]; a && p.push("z"), this.dims = p, this.dimlen = p.length, function (t) { for (var n = t.order, r = t.points, i = y.align(r, { p1: r[0], p2: r[n] }), o = 0; o < i.length; o++)if (e(i[o].y) > 1e-4) return void (t._linear = !1); t._linear = !0 }(this), this._t1 = 0, this._t2 = 1, this.update() }; l.fromSVG = function (t) { var n = t.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat), r = /[cq]/.test(t); return r ? (n = n.map(function (t, r) { return 2 > r ? t : t + n[r % 2] }), new l(n)) : new l(n) }, l.quadraticFromPoints = function (t, r, i, e) { if ("undefined" == typeof e && (e = .5), 0 === e) return new l(r, r, i); if (1 === e) return new l(t, r, r); var o = n(2, t, r, i, e); return new l(t, o.A, i) }, l.cubicFromPoints = function (t, r, i, e, o) { "undefined" == typeof e && (e = .5); var s = n(3, t, r, i, e); "undefined" == typeof o && (o = y.dist(r, s.C)); var u = o * (1 - e) / e, a = y.dist(t, i), f = (i.x - t.x) / a, c = (i.y - t.y) / a, h = o * f, x = o * c, p = u * f, v = u * c, d = { x: r.x - h, y: r.y - x }, m = { x: r.x + p, y: r.y + v }, g = s.A, z = { x: g.x + (d.x - g.x) / (1 - e), y: g.y + (d.y - g.y) / (1 - e) }, b = { x: g.x + (m.x - g.x) / e, y: g.y + (m.y - g.y) / e }, _ = { x: t.x + (z.x - t.x) / e, y: t.y + (z.y - t.y) / e }, w = { x: i.x + (b.x - i.x) / (1 - e), y: i.y + (b.y - i.y) / (1 - e) }; return new l(t, _, w, i) }; var v = function () { return y }; l.getUtils = v, l.prototype = { getUtils: v, valueOf: function () { return this.toString() }, toString: function () { return y.pointsToString(this.points) }, toSVG: function (t) { if (this._3d) return !1; for (var n = this.points, r = n[0].x, i = n[0].y, e = ["M", r, i, 2 === this.order ? "Q" : "C"], o = 1, s = n.length; s > o; o++)e.push(n[o].x), e.push(n[o].y); return e.join(" ") }, update: function () { this.dpoints = []; for (var t = this.points, n = t.length, r = n - 1; n > 1; n-- , r--) { for (var i, e = [], o = 0; r > o; o++)i = { x: r * (t[o + 1].x - t[o].x), y: r * (t[o + 1].y - t[o].y) }, this._3d && (i.z = r * (t[o + 1].z - t[o].z)), e.push(i); this.dpoints.push(e), t = e } this.computedirection() }, computedirection: function () { var t = this.points, n = y.angle(t[0], t[this.order], t[1]); this.clockwise = n > 0 }, length: function () { return y.length(this.derivative.bind(this)) }, _lut: [], getLUT: function (t) { if (t = t || 100, this._lut.length === t) return this._lut; this._lut = []; for (var n = 0; t >= n; n++)this._lut.push(this.compute(n / t)); return this._lut }, on: function (t, n) { n = n || 5; for (var r, i = this.getLUT(), e = [], o = 0, s = 0; s < i.length; s++)r = i[s], y.dist(r, t) < n && (e.push(r), o += s / i.length); return e.length ? o /= e.length : !1 }, project: function (t) { var n = this.getLUT(), r = n.length - 1, i = y.closest(n, t), e = i.mdist, o = i.mpos; if (0 === o || o === r) { var s = o / r, u = this.compute(s); return u.t = s, u.d = e, u } var a, s, f, c, h = (o - 1) / r, x = (o + 1) / r, p = .1 / r; for (e += 1, s = h, a = s; x + p > s; s += p)f = this.compute(s), c = y.dist(t, f), e > c && (e = c, a = s); return f = this.compute(a), f.t = a, f.d = e, f }, get: function (t) { return this.compute(t) }, point: function (t) { return this.points[t] }, compute: function (t) { if (0 === t) return this.points[0]; if (1 === t) return this.points[this.order]; var n = this.points, r = 1 - t; if (1 === this.order) return f = { x: r * n[0].x + t * n[1].x, y: r * n[0].y + t * n[1].y }, this._3d && (f.z = r * n[0].z + t * n[1].z), f; if (this.order < 4) { var i, e, o, s = r * r, u = t * t, a = 0; 2 === this.order ? (n = [n[0], n[1], n[2], x], i = s, e = r * t * 2, o = u) : 3 === this.order && (i = s * r, e = s * t * 3, o = r * u * 3, a = t * u); var f = { x: i * n[0].x + e * n[1].x + o * n[2].x + a * n[3].x, y: i * n[0].y + e * n[1].y + o * n[2].y + a * n[3].y }; return this._3d && (f.z = i * n[0].z + e * n[1].z + o * n[2].z + a * n[3].z), f } for (var c = JSON.parse(JSON.stringify(this.points)); c.length > 1;) { for (var h = 0; h < c.length - 1; h++)c[h] = { x: c[h].x + (c[h + 1].x - c[h].x) * t, y: c[h].y + (c[h + 1].y - c[h].y) * t }, "undefined" != typeof c[h].z && (c[h] = c[h].z + (c[h + 1].z - c[h].z) * t); c.splice(c.length - 1, 1) } return c[0] }, raise: function () { for (var t, n, r, i = this.points, e = [i[0]], o = i.length, t = 1; o > t; t++)n = i[t], r = i[t - 1], e[t] = { x: (o - t) / o * n.x + t / o * r.x, y: (o - t) / o * n.y + t / o * r.y }; return e[o] = i[o - 1], new l(e) }, derivative: function (t) { var n, r, i = 1 - t, e = 0, o = this.dpoints[0]; 2 === this.order && (o = [o[0], o[1], x], n = i, r = t), 3 === this.order && (n = i * i, r = i * t * 2, e = t * t); var s = { x: n * o[0].x + r * o[1].x + e * o[2].x, y: n * o[0].y + r * o[1].y + e * o[2].y }; return this._3d && (s.z = n * o[0].z + r * o[1].z + e * o[2].z), s }, inflections: function () { return y.inflections(this.points) }, normal: function (t) { return this._3d ? this.__normal3(t) : this.__normal2(t) }, __normal2: function (t) { var n = this.derivative(t), r = c(n.x * n.x + n.y * n.y); return { x: -n.y / r, y: n.x / r } }, __normal3: function (t) { var n = this.derivative(t), r = this.derivative(t + .01), i = c(n.x * n.x + n.y * n.y + n.z * n.z), e = c(r.x * r.x + r.y * r.y + r.z * r.z); n.x /= i, n.y /= i, n.z /= i, r.x /= e, r.y /= e, r.z /= e; var o = { x: r.y * n.z - r.z * n.y, y: r.z * n.x - r.x * n.z, z: r.x * n.y - r.y * n.x }, s = c(o.x * o.x + o.y * o.y + o.z * o.z); o.x /= s, o.y /= s, o.z /= s; var u = [o.x * o.x, o.x * o.y - o.z, o.x * o.z + o.y, o.x * o.y + o.z, o.y * o.y, o.y * o.z - o.x, o.x * o.z - o.y, o.y * o.z + o.x, o.z * o.z], a = { x: u[0] * n.x + u[1] * n.y + u[2] * n.z, y: u[3] * n.x + u[4] * n.y + u[5] * n.z, z: u[6] * n.x + u[7] * n.y + u[8] * n.z }; return a }, hull: function (t) { var n, r = this.points, i = [], e = [], o = 0, s = 0, u = 0; for (e[o++] = r[0], e[o++] = r[1], e[o++] = r[2], 3 === this.order && (e[o++] = r[3]); r.length > 1;) { for (i = [], s = 0, u = r.length - 1; u > s; s++)n = y.lerp(t, r[s], r[s + 1]), e[o++] = n, i.push(n); r = i } return e }, split: function (t, n) { if (0 === t && n) return this.split(n).left; if (1 === n) return this.split(t).right; var r = this.hull(t), i = { left: new l(2 === this.order ? [r[0], r[3], r[5]] : [r[0], r[4], r[7], r[9]]), right: new l(2 === this.order ? [r[5], r[4], r[2]] : [r[9], r[8], r[6], r[3]]), span: r }; if (i.left._t1 = y.map(0, 0, 1, this._t1, this._t2), i.left._t2 = y.map(t, 0, 1, this._t1, this._t2), i.right._t1 = y.map(t, 0, 1, this._t1, this._t2), i.right._t2 = y.map(1, 0, 1, this._t1, this._t2), !n) return i; n = y.map(n, t, 1, 0, 1); var e = i.right.split(n); return e.left }, extrema: function () { var t, n, r = this.dims, i = {}, e = []; return r.forEach(function (r) { n = function (t) { return t[r] }, t = this.dpoints[0].map(n), i[r] = y.droots(t), 3 === this.order && (t = this.dpoints[1].map(n), i[r] = i[r].concat(y.droots(t))), i[r] = i[r].filter(function (t) { return t >= 0 && 1 >= t }), e = e.concat(i[r].sort()) }.bind(this)), e = e.sort().filter(function (t, n) { return e.indexOf(t) === n }), i.values = e, i }, bbox: function () { var t = this.extrema(), n = {}; return this.dims.forEach(function (r) { n[r] = y.getminmax(this, r, t[r]) }.bind(this)), n }, overlaps: function (t) { var n = this.bbox(), r = t.bbox(); return y.bboxoverlap(n, r) }, offset: function (t, n) { if ("undefined" != typeof n) { var r = this.get(t), i = this.normal(t), e = { c: r, n: i, x: r.x + i.x * n, y: r.y + i.y * n }; return this._3d && (e.z = r.z + i.z * n), e } if (this._linear) { var o = this.normal(0), s = this.points.map(function (n) { var r = { x: n.x + t * o.x, y: n.y + t * o.y }; return n.z && i.z && (r.z = n.z + t * o.z), r }); return [new l(s)] } var u = this.reduce(); return u.map(function (n) { return n.scale(t) }) }, simple: function () { if (3 === this.order) { var t = y.angle(this.points[0], this.points[3], this.points[1]), n = y.angle(this.points[0], this.points[3], this.points[2]); if (t > 0 && 0 > n || 0 > t && n > 0) return !1 } var r = this.normal(0), i = this.normal(1), o = r.x * i.x + r.y * i.y; this._3d && (o += r.z * i.z); var s = e(f(o)); return h / 3 > s }, reduce: function () { var t, n, r = 0, i = 0, o = .01, s = [], u = [], a = this.extrema().values; for (-1 === a.indexOf(0) && (a = [0].concat(a)), -1 === a.indexOf(1) && a.push(1), r = a[0], t = 1; t < a.length; t++)i = a[t], n = this.split(r, i), n._t1 = r, n._t2 = i, s.push(n), r = i; return s.forEach(function (t) { for (r = 0, i = 0; 1 >= i;)for (i = r + o; 1 + o >= i; i += o)if (n = t.split(r, i), !n.simple()) { if (i -= o, e(r - i) < o) return []; n = t.split(r, i), n._t1 = y.map(r, 0, 1, t._t1, t._t2), n._t2 = y.map(i, 0, 1, t._t1, t._t2), u.push(n), r = i; break } 1 > r && (n = t.split(r, 1), n._t1 = y.map(r, 0, 1, t._t1, t._t2), n._t2 = t._t2, u.push(n)) }), u }, scale: function (t) { var n = this.order, r = !1; if ("function" == typeof t && (r = t), r && 2 === n) return this.raise().scale(r); var i = this.clockwise, e = r ? r(0) : t, o = r ? r(1) : t, s = [this.offset(0, 10), this.offset(1, 10)], u = y.lli4(s[0], s[0].c, s[1], s[1].c); if (!u) throw new Error("cannot scale this curve. Try reducing it first."); var a = this.points, f = []; return [0, 1].forEach(function (t) { var r = f[t * n] = y.copy(a[t * n]); r.x += (t ? o : e) * s[t].n.x, r.y += (t ? o : e) * s[t].n.y }.bind(this)), r ? ([0, 1].forEach(function (e) { if (2 !== this.order || !e) { var o = a[e + 1], s = { x: o.x - u.x, y: o.y - u.y }, h = r ? r((e + 1) / n) : t; r && !i && (h = -h); var x = c(s.x * s.x + s.y * s.y); s.x /= x, s.y /= x, f[e + 1] = { x: o.x + h * s.x, y: o.y + h * s.y } } }.bind(this)), new l(f)) : ([0, 1].forEach(function (t) { if (2 !== this.order || !t) { var r = f[t * n], i = this.derivative(t), e = { x: r.x + i.x, y: r.y + i.y }; f[t + 1] = y.lli4(r, e, u, a[t + 1]) } }.bind(this)), new l(f)) }, outline: function (t, n, r, i) { function e(t, n, r, i, e) { return function (o) { var s = i / r, u = (i + e) / r, a = n - t; return y.map(o, 0, 1, t + s * a, t + u * a) } } n = "undefined" == typeof n ? t : n; var o, s = this.reduce(), u = s.length, a = [], f = [], c = 0, h = this.length(), x = "undefined" != typeof r && "undefined" != typeof i; s.forEach(function (o) { _ = o.length(), x ? (a.push(o.scale(e(t, r, h, c, _))), f.push(o.scale(e(-n, -i, h, c, _)))) : (a.push(o.scale(t)), f.push(o.scale(-n))), c += _ }), f = f.map(function (t) { return o = t.points, o[3] ? t.points = [o[3], o[2], o[1], o[0]] : t.points = [o[2], o[1], o[0]], t }).reverse(); var l = a[0].points[0], v = a[u - 1].points[a[u - 1].points.length - 1], d = f[u - 1].points[f[u - 1].points.length - 1], m = f[0].points[0], g = y.makeline(d, l), z = y.makeline(v, m), b = [g].concat(a).concat([z]).concat(f), _ = b.length; return new p(b) }, outlineshapes: function (t, n, r) { n = n || t; for (var i = this.outline(t, n).curves, e = [], o = 1, s = i.length; s / 2 > o; o++) { var u = y.makeshape(i[o], i[s - o], r); u.startcap.virtual = o > 1, u.endcap.virtual = s / 2 - 1 > o, e.push(u) } return e }, intersects: function (t, n) { return t ? t.p1 && t.p2 ? this.lineIntersects(t) : (t instanceof l && (t = t.reduce()), this.curveintersects(this.reduce(), t, n)) : this.selfintersects(n) }, lineIntersects: function (t) { var n = o(t.p1.x, t.p2.x), r = o(t.p1.y, t.p2.y), i = s(t.p1.x, t.p2.x), e = s(t.p1.y, t.p2.y), u = this; return y.roots(this.points, t).filter(function (t) { var o = u.get(t); return y.between(o.x, n, i) && y.between(o.y, r, e) }) }, selfintersects: function (t) { var n, r, i, e, o = this.reduce(), s = o.length - 2, u = []; for (n = 0; s > n; n++)i = o.slice(n, n + 1), e = o.slice(n + 2), r = this.curveintersects(i, e, t), u = u.concat(r); return u }, curveintersects: function (t, n, r) { var i = []; t.forEach(function (t) { n.forEach(function (n) { t.overlaps(n) && i.push({ left: t, right: n }) }) }); var e = []; return i.forEach(function (t) { var n = y.pairiteration(t.left, t.right, r); n.length > 0 && (e = e.concat(n)) }), e }, arcs: function (t) { t = t || .5; var n = []; return this._iterate(t, n) }, _error: function (t, n, r, i) { var o = (i - r) / 4, s = this.get(r + o), u = this.get(i - o), a = y.dist(t, n), f = y.dist(t, s), c = y.dist(t, u); return e(f - a) + e(c - a) }, _iterate: function (t, n) { var r, i = 0, e = 1; do { r = 0, e = 1; var o, s, f, c, h, x = this.get(i), p = !1, l = !1, v = e, d = 1, m = 0; do { l = p, c = f, v = (i + e) / 2, m++ , o = this.get(v), s = this.get(e), f = y.getccenter(x, o, s), f.interval = { start: i, end: e }; var g = this._error(f, x, i, e); if (p = t >= g, h = l && !p, h || (d = e), p) { if (e >= 1) { if (f.interval.end = d = 1, c = f, e > 1) { var z = { x: f.x + f.r * u(f.e), y: f.y + f.r * a(f.e) }; f.e += y.angle({ x: f.x, y: f.y }, z, this.get(1)) } break } e += (e - i) / 2 } else e = v } while (!h && r++ < 100); if (r >= 100) break; c = c ? c : f, n.push(c), i = d } while (1 > e); return n } }, t.exports = l }() }, function (t, n, r) { "use strict"; !function () { var n = Math.abs, i = Math.cos, e = Math.sin, o = Math.acos, s = Math.atan2, u = Math.sqrt, a = Math.pow, f = function (t) { return 0 > t ? -a(-t, 1 / 3) : a(t, 1 / 3) }, c = Math.PI, h = 2 * c, x = c / 2, y = 1e-6, p = Number.MAX_SAFE_INTEGER, l = Number.MIN_SAFE_INTEGER, v = { Tvalues: [-.06405689286260563, .06405689286260563, -.1911188674736163, .1911188674736163, -.3150426796961634, .3150426796961634, -.4337935076260451, .4337935076260451, -.5454214713888396, .5454214713888396, -.6480936519369755, .6480936519369755, -.7401241915785544, .7401241915785544, -.820001985973903, .820001985973903, -.8864155270044011, .8864155270044011, -.9382745520027328, .9382745520027328, -.9747285559713095, .9747285559713095, -.9951872199970213, .9951872199970213], Cvalues: [.12793819534675216, .12793819534675216, .1258374563468283, .1258374563468283, .12167047292780339, .12167047292780339, .1155056680537256, .1155056680537256, .10744427011596563, .10744427011596563, .09761865210411388, .09761865210411388, .08619016153195327, .08619016153195327, .0733464814110803, .0733464814110803, .05929858491543678, .05929858491543678, .04427743881741981, .04427743881741981, .028531388628933663, .028531388628933663, .0123412297999872, .0123412297999872], arcfn: function (t, n) { var r = n(t), i = r.x * r.x + r.y * r.y; return "undefined" != typeof r.z && (i += r.z * r.z), u(i) }, between: function (t, n, r) { return t >= n && r >= t || v.approximately(t, n) || v.approximately(t, r) }, approximately: function (t, r, i) { return n(t - r) <= (i || y) }, length: function (t) { var n, r, i = .5, e = 0, o = v.Tvalues.length; for (n = 0; o > n; n++)r = i * v.Tvalues[n] + i, e += v.Cvalues[n] * v.arcfn(r, t); return i * e }, map: function (t, n, r, i, e) { var o = r - n, s = e - i, u = t - n, a = u / o; return i + s * a }, lerp: function (t, n, r) { var i = { x: n.x + t * (r.x - n.x), y: n.y + t * (r.y - n.y) }; return n.z && r.z && (i.z = n.z + t * (r.z - n.z)), i }, pointToString: function (t) { var n = t.x + "/" + t.y; return "undefined" != typeof t.z && (n += "/" + t.z), n }, pointsToString: function (t) { return "[" + t.map(v.pointToString).join(", ") + "]" }, copy: function (t) { return JSON.parse(JSON.stringify(t)) }, angle: function (t, n, r) { var i = n.x - t.x, e = n.y - t.y, o = r.x - t.x, u = r.y - t.y, a = i * u - e * o, f = i * o + e * u; return s(a, f) }, round: function (t, n) { var r = "" + t, i = r.indexOf("."); return parseFloat(r.substring(0, i + 1 + n)) }, dist: function (t, n) { var r = t.x - n.x, i = t.y - n.y; return u(r * r + i * i) }, closest: function (t, n) { var r, i, e = a(2, 63); return t.forEach(function (t, o) { i = v.dist(n, t), e > i && (e = i, r = o) }), { mdist: e, mpos: r } }, abcratio: function (t, r) { if (2 !== r && 3 !== r) return !1; if ("undefined" == typeof t) t = .5; else if (0 === t || 1 === t) return t; var i = a(t, r) + a(1 - t, r), e = i - 1; return n(e / i) }, projectionratio: function (t, n) { if (2 !== n && 3 !== n) return !1; if ("undefined" == typeof t) t = .5; else if (0 === t || 1 === t) return t; var r = a(1 - t, n), i = a(t, n) + r; return r / i }, lli8: function (t, n, r, i, e, o, s, u) { var a = (t * i - n * r) * (e - s) - (t - r) * (e * u - o * s), f = (t * i - n * r) * (o - u) - (n - i) * (e * u - o * s), c = (t - r) * (o - u) - (n - i) * (e - s); return 0 == c ? !1 : { x: a / c, y: f / c } }, lli4: function (t, n, r, i) { var e = t.x, o = t.y, s = n.x, u = n.y, a = r.x, f = r.y, c = i.x, h = i.y; return v.lli8(e, o, s, u, a, f, c, h) }, lli: function (t, n) { return v.lli4(t, t.c, n, n.c) }, makeline: function (t, n) { var i = r(1), e = t.x, o = t.y, s = n.x, u = n.y, a = (s - e) / 3, f = (u - o) / 3; return new i(e, o, e + a, o + f, e + 2 * a, o + 2 * f, s, u) }, findbbox: function (t) { var n = p, r = p, i = l, e = l; return t.forEach(function (t) { var o = t.bbox(); n > o.x.min && (n = o.x.min), r > o.y.min && (r = o.y.min), i < o.x.max && (i = o.x.max), e < o.y.max && (e = o.y.max) }), { x: { min: n, mid: (n + i) / 2, max: i, size: i - n }, y: { min: r, mid: (r + e) / 2, max: e, size: e - r } } }, shapeintersections: function (t, n, r, i, e) { if (!v.bboxoverlap(n, i)) return []; var o = [], s = [t.startcap, t.forward, t.back, t.endcap], u = [r.startcap, r.forward, r.back, r.endcap]; return s.forEach(function (n) { n.virtual || u.forEach(function (i) { if (!i.virtual) { var s = n.intersects(i, e); s.length > 0 && (s.c1 = n, s.c2 = i, s.s1 = t, s.s2 = r, o.push(s)) } }) }), o }, makeshape: function (t, n, r) { var i = n.points.length, e = t.points.length, o = v.makeline(n.points[i - 1], t.points[0]), s = v.makeline(t.points[e - 1], n.points[0]), u = { startcap: o, forward: t, back: n, endcap: s, bbox: v.findbbox([o, t, n, s]) }, a = v; return u.intersections = function (t) { return a.shapeintersections(u, u.bbox, t, t.bbox, r) }, u }, getminmax: function (t, n, r) { if (!r) return { min: 0, max: 0 }; var i, e, o = p, s = l; -1 === r.indexOf(0) && (r = [0].concat(r)), -1 === r.indexOf(1) && r.push(1); for (var u = 0, a = r.length; a > u; u++)i = r[u], e = t.get(i), e[n] < o && (o = e[n]), e[n] > s && (s = e[n]); return { min: o, mid: (o + s) / 2, max: s, size: s - o } }, align: function (t, n) { var r = n.p1.x, o = n.p1.y, u = -s(n.p2.y - o, n.p2.x - r), a = function (t) { return { x: (t.x - r) * i(u) - (t.y - o) * e(u), y: (t.x - r) * e(u) + (t.y - o) * i(u) } }; return t.map(a) }, roots: function (t, n) { n = n || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } }; var r = t.length - 1, e = v.align(t, n), s = function (t) { return t >= 0 && 1 >= t }; if (2 === r) { var a = e[0].y, c = e[1].y, x = e[2].y, y = a - 2 * c + x; if (0 !== y) { var p = -u(c * c - a * x), l = -a + c, d = -(p + l) / y, m = -(-p + l) / y; return [d, m].filter(s) } return c !== x && 0 === y ? [(2 * c - x) / 2 * (c - x)].filter(s) : [] } var g, d, z, b, _, w = e[0].y, E = e[1].y, S = e[2].y, M = e[3].y, y = -w + 3 * E - 3 * S + M, a = (3 * w - 6 * E + 3 * S) / y, c = (-3 * w + 3 * E) / y, x = w / y, e = (3 * c - a * a) / 3, k = e / 3, O = (2 * a * a * a - 9 * a * c + 27 * x) / 27, T = O / 2, N = T * T + k * k * k; if (0 > N) { var j = -e / 3, I = j * j * j, A = u(I), C = -O / (2 * A), F = -1 > C ? -1 : C > 1 ? 1 : C, q = o(F), U = f(A), B = 2 * U; return z = B * i(q / 3) - a / 3, b = B * i((q + h) / 3) - a / 3, _ = B * i((q + 2 * h) / 3) - a / 3, [z, b, _].filter(s) } if (0 === N) return g = 0 > T ? f(-T) : -f(T), z = 2 * g - a / 3, b = -g - a / 3, [z, b].filter(s); var G = u(N); return g = f(-T + G), d = f(T + G), [g - d - a / 3].filter(s) }, droots: function (t) { if (3 === t.length) { var n = t[0], r = t[1], i = t[2], e = n - 2 * r + i; if (0 !== e) { var o = -u(r * r - n * i), s = -n + r, a = -(o + s) / e, f = -(-o + s) / e; return [a, f] } return r !== i && 0 === e ? [(2 * r - i) / (2 * (r - i))] : [] } if (2 === t.length) { var n = t[0], r = t[1]; return n !== r ? [n / (n - r)] : [] } }, inflections: function (t) { if (t.length < 4) return []; var n = v.align(t, { p1: t[0], p2: t.slice(-1)[0] }), r = n[2].x * n[1].y, i = n[3].x * n[1].y, e = n[1].x * n[2].y, o = n[3].x * n[2].y, s = 18 * (-3 * r + 2 * i + 3 * e - o), u = 18 * (3 * r - i - 3 * e), a = 18 * (e - r); if (v.approximately(s, 0)) { if (!v.approximately(u, 0)) { var f = -a / u; if (f >= 0 && 1 >= f) return [f] } return [] } var c = u * u - 4 * s * a, h = Math.sqrt(c), o = 2 * s; return v.approximately(o, 0) ? [] : [(h - u) / o, -(u + h) / o].filter(function (t) { return t >= 0 && 1 >= t }) }, bboxoverlap: function (t, r) { var i, e, o, s, u, a = ["x", "y"], f = a.length; for (i = 0; f > i; i++)if (e = a[i], o = t[e].mid, s = r[e].mid, u = (t[e].size + r[e].size) / 2, n(o - s) >= u) return !1; return !0 }, expandbox: function (t, n) { n.x.min < t.x.min && (t.x.min = n.x.min), n.y.min < t.y.min && (t.y.min = n.y.min), n.z && n.z.min < t.z.min && (t.z.min = n.z.min), n.x.max > t.x.max && (t.x.max = n.x.max), n.y.max > t.y.max && (t.y.max = n.y.max), n.z && n.z.max > t.z.max && (t.z.max = n.z.max), t.x.mid = (t.x.min + t.x.max) / 2, t.y.mid = (t.y.min + t.y.max) / 2, t.z && (t.z.mid = (t.z.min + t.z.max) / 2), t.x.size = t.x.max - t.x.min, t.y.size = t.y.max - t.y.min, t.z && (t.z.size = t.z.max - t.z.min) }, pairiteration: function (t, n, r) { var i = t.bbox(), e = n.bbox(), o = 1e5, s = r || .5; if (i.x.size + i.y.size < s && e.x.size + e.y.size < s) return [(o * (t._t1 + t._t2) / 2 | 0) / o + "/" + (o * (n._t1 + n._t2) / 2 | 0) / o]; var u = t.split(.5), a = n.split(.5), f = [{ left: u.left, right: a.left }, { left: u.left, right: a.right }, { left: u.right, right: a.right }, { left: u.right, right: a.left }]; f = f.filter(function (t) { return v.bboxoverlap(t.left.bbox(), t.right.bbox()) }); var c = []; return 0 === f.length ? c : (f.forEach(function (t) { c = c.concat(v.pairiteration(t.left, t.right, s)) }), c = c.filter(function (t, n) { return c.indexOf(t) === n })) }, getccenter: function (t, n, r) { var o, u = n.x - t.x, a = n.y - t.y, f = r.x - n.x, c = r.y - n.y, y = u * i(x) - a * e(x), p = u * e(x) + a * i(x), l = f * i(x) - c * e(x), d = f * e(x) + c * i(x), m = (t.x + n.x) / 2, g = (t.y + n.y) / 2, z = (n.x + r.x) / 2, b = (n.y + r.y) / 2, _ = m + y, w = g + p, E = z + l, S = b + d, M = v.lli8(m, g, _, w, z, b, E, S), k = v.dist(M, t), O = s(t.y - M.y, t.x - M.x), T = s(n.y - M.y, n.x - M.x), N = s(r.y - M.y, r.x - M.x); return N > O ? ((O > T || T > N) && (O += h), O > N && (o = N, N = O, O = o)) : T > N && O > T ? (o = N, N = O, O = o) : N += h, M.s = O, M.e = N, M.r = k, M } }; t.exports = v }() }, function (t, n, r) { "use strict"; !function () { var n = r(2), i = function (t) { this.curves = [], this._3d = !1, t && (this.curves = t, this._3d = this.curves[0]._3d) }; i.prototype = { valueOf: function () { return this.toString() }, toString: function () { return "[" + this.curves.map(function (t) { return n.pointsToString(t.points) }).join(", ") + "]" }, addCurve: function (t) { this.curves.push(t), this._3d = this._3d || t._3d }, length: function () { return this.curves.map(function (t) { return t.length() }).reduce(function (t, n) { return t + n }) }, curve: function (t) { return this.curves[t] }, bbox: function e() { for (var t = this.curves, e = t[0].bbox(), r = 1; r < t.length; r++)n.expandbox(e, t[r].bbox()); return e }, offset: function o(t) { var o = []; return this.curves.forEach(function (n) { o = o.concat(n.offset(t)) }), new i(o) } }, t.exports = i }() }]);

(function (window, document, Laya) {
	var __un = Laya.un, __uns = Laya.uns, __static = Laya.static, __class = Laya.class, __getset = Laya.getset, __newvec = Laya.__newvec;

	var Arith = laya.maths.Arith, Bezier = laya.maths.Bezier, Bitmap = laya.resource.Bitmap, Browser = laya.utils.Browser;
	var Byte = laya.utils.Byte, Color = laya.utils.Color, ColorFilter = laya.filters.ColorFilter, Config = Laya.Config, Context = laya.resource.Context;
	var Event = laya.events.Event, Filter = laya.filters.Filter, Graphics = laya.display.Graphics, HTMLCanvas = laya.resource.HTMLCanvas;
	var HTMLChar = laya.utils.HTMLChar, HTMLImage = laya.resource.HTMLImage, HTMLSubImage = laya.resource.HTMLSubImage;
	var Handler = laya.utils.Handler, Loader = laya.net.Loader, Matrix = laya.maths.Matrix, Point = laya.maths.Point, Rectangle = laya.maths.Rectangle;
	var Render = laya.renders.Render, RenderContext = laya.renders.RenderContext, RenderSprite = laya.renders.RenderSprite;
	var Resource = laya.resource.Resource, ResourceManager = laya.resource.ResourceManager, RunDriver = laya.utils.RunDriver;
	var Sprite = laya.display.Sprite, Stage = laya.display.Stage, Stat = laya.utils.Stat, StringKey = laya.utils.StringKey;
	var Style = laya.display.css.Style, System = laya.system.System, Text = laya.display.Text, Texture = laya.resource.Texture;
	var TransformInfo = laya.display.css.TransformInfo, URL = laya.net.URL, Utils = laya.utils.Utils, VectorGraphManager = laya.utils.VectorGraphManager;
	var WordText = laya.utils.WordText;
	Laya.interface('laya.webgl.shapes.IShape');
	Laya.interface('laya.webgl.submit.ISubmit');
	Laya.interface('laya.webgl.text.ICharSegment');
	Laya.interface('laya.webgl.canvas.save.ISaveData');
	Laya.interface('laya.webgl.resource.IMergeAtlasBitmap');
	Laya.interface('laya.filters.IFilterActionGL', 'laya.filters.IFilterAction');
	//class laya.webgl.canvas.save.SaveBase
	var SaveBase = (function () {
		function SaveBase() {
			//this._valueName=null;
			//this._value=null;
			//this._dataObj=null;
			//this._newSubmit=false;
		}

		__class(SaveBase, 'laya.webgl.canvas.save.SaveBase');
		var __proto = SaveBase.prototype;
		Laya.imps(__proto, { "laya.webgl.canvas.save.ISaveData": true })
		__proto.isSaveMark = function () { return false; }
		__proto.restore = function (context) {
			this._dataObj[this._valueName] = this._value;
			SaveBase._cache[SaveBase._cache._length++] = this;
			this._newSubmit && (context._curSubmit = Submit.RENDERBASE, context._renderKey = 0);
		}

		SaveBase._createArray = function () {
			var value = [];
			value._length = 0;
			return value;
		}

		SaveBase._init = function () {
			var namemap = SaveBase._namemap = {};
			namemap[0x1] = "ALPHA";
			namemap[0x2] = "fillStyle";
			namemap[0x8] = "font";
			namemap[0x100] = "lineWidth";
			namemap[0x200] = "strokeStyle";
			namemap[0x2000] = "_mergeID";
			namemap[0x400] = namemap[0x800] = namemap[0x1000] = [];
			namemap[0x4000] = "textBaseline";
			namemap[0x8000] = "textAlign";
			namemap[0x10000] = "_nBlendType";
			namemap[0x100000] = "shader";
			namemap[0x200000] = "filters";
			return namemap;
		}

		SaveBase.save = function (context, type, dataObj, newSubmit) {
			if ((context._saveMark._saveuse & type) !== type) {
				context._saveMark._saveuse |= type;
				var cache = SaveBase._cache;
				var o = cache._length > 0 ? cache[--cache._length] : (new SaveBase());
				o._value = dataObj[o._valueName = SaveBase._namemap[type]];
				o._dataObj = dataObj;
				o._newSubmit = newSubmit;
				var _save = context._save;
				_save[_save._length++] = o;
			}
		}

		__static(SaveBase,
			['_cache', function () { return this._cache = laya.webgl.canvas.save.SaveBase._createArray(); }, '_namemap', function () { return this._namemap = SaveBase._init(); }
			]);
		return SaveBase;
	})()


	//class laya.filters.webgl.FilterActionGL
	var FilterActionGL = (function () {
		function FilterActionGL() { }
		__class(FilterActionGL, 'laya.filters.webgl.FilterActionGL');
		var __proto = FilterActionGL.prototype;
		Laya.imps(__proto, { "laya.filters.IFilterActionGL": true })
		__proto.setValue = function (shader) { }
		__proto.setValueMix = function (shader) { }
		__proto.apply3d = function (scope, sprite, context, x, y) { return null; }
		__proto.apply = function (srcCanvas) { return null; }
		__getset(0, __proto, 'typeMix', function () {
			return 0;
		});

		return FilterActionGL;
	})()


	//class laya.webgl.shader.ShaderValue
	var ShaderValue = (function () {
		function ShaderValue() { }
		__class(ShaderValue, 'laya.webgl.shader.ShaderValue');
		return ShaderValue;
	})()


	//class laya.webgl.atlas.AtlasGrid
	var AtlasGrid = (function () {
		var TexRowInfo, TexMergeTexSize;
		function AtlasGrid(width, height, atlasID) {
			this._atlasID = 0;
			this._width = 0;
			this._height = 0;
			this._texCount = 0;
			this._rowInfo = null;
			this._cells = null;
			this._failSize = new TexMergeTexSize();
			(width === void 0) && (width = 0);
			(height === void 0) && (height = 0);
			(atlasID === void 0) && (atlasID = 0);
			this._cells = null;
			this._rowInfo = null;
			this._init(width, height);
			this._atlasID = atlasID;
		}

		__class(AtlasGrid, 'laya.webgl.atlas.AtlasGrid');
		var __proto = AtlasGrid.prototype;
		//------------------------------------------------------------------------------
		__proto.getAltasID = function () {
			return this._atlasID;
		}

		//------------------------------------------------------------------------------
		__proto.setAltasID = function (atlasID) {
			if (atlasID >= 0) {
				this._atlasID = atlasID;
			}
		}

		//------------------------------------------------------------------
		__proto.addTex = function (type, width, height) {
			var result = this._get(width, height);
			if (result.ret == false) {
				return result;
			}
			this._fill(result.x, result.y, width, height, type);
			this._texCount++;
			return result;
		}

		//------------------------------------------------------------------------------
		__proto._release = function () {
			if (this._cells != null) {
				this._cells.length = 0;
				this._cells = null;
			}
			if (this._rowInfo) {
				this._rowInfo.length = 0;
				this._rowInfo = null;
			}
		}

		//------------------------------------------------------------------------------
		__proto._init = function (width, height) {
			this._width = width;
			this._height = height;
			this._release();
			if (this._width == 0) return false;
			this._cells = new Uint8Array(this._width * this._height * 3);
			this._rowInfo = __newvec(this._height);
			for (var i = 0; i < this._height; i++) {
				this._rowInfo[i] = new TexRowInfo();
			}
			this._clear();
			return true;
		}

		//------------------------------------------------------------------
		__proto._get = function (width, height) {
			var pFillInfo = new MergeFillInfo();
			if (width >= this._failSize.width && height >= this._failSize.height) {
				return pFillInfo;
			};
			var rx = -1;
			var ry = -1;
			var nWidth = this._width;
			var nHeight = this._height;
			var pCellBox = this._cells;
			for (var y = 0; y < nHeight; y++) {
				if (this._rowInfo[y].spaceCount < width) continue;
				for (var x = 0; x < nWidth;) {
					var tm = (y * nWidth + x) * 3;
					if (pCellBox[tm] != 0 || pCellBox[tm + 1] < width || pCellBox[tm + 2] < height) {
						x += pCellBox[tm + 1];
						continue;
					}
					rx = x;
					ry = y;
					for (var xx = 0; xx < width; xx++) {
						if (pCellBox[3 * xx + tm + 2] < height) {
							rx = -1;
							break;
						}
					}
					if (rx < 0) {
						x += pCellBox[tm + 1];
						continue;
					}
					pFillInfo.ret = true;
					pFillInfo.x = rx;
					pFillInfo.y = ry;
					return pFillInfo;
				}
			}
			return pFillInfo;
		}

		//------------------------------------------------------------------
		__proto._fill = function (x, y, w, h, type) {
			var nWidth = this._width;
			var nHeghit = this._height;
			this._check((x + w) <= nWidth && (y + h) <= nHeghit);
			for (var yy = y; yy < (h + y); ++yy) {
				this._check(this._rowInfo[yy].spaceCount >= w);
				this._rowInfo[yy].spaceCount -= w;
				for (var xx = 0; xx < w; xx++) {
					var tm = (x + yy * nWidth + xx) * 3;
					this._check(this._cells[tm] == 0);
					this._cells[tm] = type;
					this._cells[tm + 1] = w;
					this._cells[tm + 2] = h;
				}
			}
			if (x > 0) {
				for (yy = 0; yy < h; ++yy) {
					var s = 0;
					for (xx = x - 1; xx >= 0; --xx, ++s) {
						if (this._cells[((y + yy) * nWidth + xx) * 3] != 0) break;
					}
					for (xx = s; xx > 0; --xx) {
						this._cells[((y + yy) * nWidth + x - xx) * 3 + 1] = xx;
						this._check(xx > 0);
					}
				}
			}
			if (y > 0) {
				for (xx = x; xx < (x + w); ++xx) {
					s = 0;
					for (yy = y - 1; yy >= 0; --yy, s++) {
						if (this._cells[(xx + yy * nWidth) * 3] != 0) break;
					}
					for (yy = s; yy > 0; --yy) {
						this._cells[(xx + (y - yy) * nWidth) * 3 + 2] = yy;
						this._check(yy > 0);
					}
				}
			}
		}

		__proto._check = function (ret) {
			if (ret == false) {
				console.log("xtexMerger 错误啦");
			}
		}

		//------------------------------------------------------------------
		__proto._clear = function () {
			this._texCount = 0;
			for (var y = 0; y < this._height; y++) {
				this._rowInfo[y].spaceCount = this._width;
			}
			for (var i = 0; i < this._height; i++) {
				for (var j = 0; j < this._width; j++) {
					var tm = (i * this._width + j) * 3;
					this._cells[tm] = 0;
					this._cells[tm + 1] = this._width - j;
					this._cells[tm + 2] = this._width - i;
				}
			}
			this._failSize.width = this._width + 1;
			this._failSize.height = this._height + 1;
		}

		AtlasGrid.__init$ = function () {
			//------------------------------------------------------------------------------
			//class TexRowInfo
			TexRowInfo = (function () {
				function TexRowInfo() {
					this.spaceCount = 0;
				}
				__class(TexRowInfo, '');
				return TexRowInfo;
			})()
			//------------------------------------------------------------------------------
			//class TexMergeTexSize
			TexMergeTexSize = (function () {
				function TexMergeTexSize() {
					this.width = 0;
					this.height = 0;
				}
				__class(TexMergeTexSize, '');
				return TexMergeTexSize;
			})()
		}

		return AtlasGrid;
	})()


	//class laya.webgl.atlas.AtlasResourceManager
	var AtlasResourceManager = (function () {
		function AtlasResourceManager(width, height, gridSize, maxTexNum) {
			this._currentAtlasCount = 0;
			this._maxAtlaserCount = 0;
			this._width = 0;
			this._height = 0;
			this._gridSize = 0;
			this._gridNumX = 0;
			this._gridNumY = 0;
			this._init = false;
			this._curAtlasIndex = 0;
			this._setAtlasParam = false;
			this._atlaserArray = null;
			this._needGC = false;
			this._setAtlasParam = true;
			this._width = width;
			this._height = height;
			this._gridSize = gridSize;
			this._maxAtlaserCount = maxTexNum;
			this._gridNumX = width / gridSize;
			this._gridNumY = height / gridSize;
			this._curAtlasIndex = 0;
			this._atlaserArray = [];
		}

		__class(AtlasResourceManager, 'laya.webgl.atlas.AtlasResourceManager');
		var __proto = AtlasResourceManager.prototype;
		__proto.setAtlasParam = function (width, height, gridSize, maxTexNum) {
			if (this._setAtlasParam == true) {
				AtlasResourceManager._sid_ = 0;
				this._width = width;
				this._height = height;
				this._gridSize = gridSize;
				this._maxAtlaserCount = maxTexNum;
				this._gridNumX = width / gridSize;
				this._gridNumY = height / gridSize;
				this._curAtlasIndex = 0;
				this.freeAll();
				return true;
			} else {
				console.log("设置大图合集参数错误，只能在开始页面设置各种参数");
				throw -1;
				return false;
			}
			return false;
		}

		//添加 图片到大图集
		__proto.pushData = function (texture) {
			var bitmap = texture.bitmap;
			var nWebGLImageIndex = -1;
			var curAtlas = null;
			var i = 0, n = 0, altasIndex = 0;
			for (i = 0, n = this._atlaserArray.length; i < n; i++) {
				altasIndex = (this._curAtlasIndex + i) % n;
				curAtlas = this._atlaserArray[altasIndex];
				nWebGLImageIndex = curAtlas.findBitmapIsExist(bitmap);
				if (nWebGLImageIndex != -1) {
					break;
				}
			}
			if (nWebGLImageIndex != -1) {
				var offset = curAtlas.InAtlasWebGLImagesOffsetValue[nWebGLImageIndex];
				offsetX = offset[0];
				offsetY = offset[1];
				curAtlas.addToAtlas(texture, offsetX, offsetY);
				return true;
			} else {
				var tex = texture;
				this._setAtlasParam = false;
				var bFound = false;
				var nImageGridX = (Math.ceil((texture.bitmap.width + 2) / this._gridSize));
				var nImageGridY = (Math.ceil((texture.bitmap.height + 2) / this._gridSize));
				var bSuccess = false;
				for (var k = 0; k < 2; k++) {
					var maxAtlaserCount = this._maxAtlaserCount;
					for (i = 0; i < maxAtlaserCount; i++) {
						altasIndex = (this._curAtlasIndex + i) % maxAtlaserCount;
						(this._atlaserArray.length - 1 >= altasIndex) || (this._atlaserArray.push(new Atlaser(this._gridNumX, this._gridNumY, this._width, this._height, AtlasResourceManager._sid_++)));
						var atlas = this._atlaserArray[altasIndex];
						var offsetX = 0, offsetY = 0;
						var fillInfo = atlas.addTex(1, nImageGridX, nImageGridY);
						if (fillInfo.ret) {
							offsetX = fillInfo.x * this._gridSize + 1;
							offsetY = fillInfo.y * this._gridSize + 1;
							bitmap.lock = true;
							atlas.addToAtlasTexture((bitmap), offsetX, offsetY);
							atlas.addToAtlas(texture, offsetX, offsetY);
							bSuccess = true;
							this._curAtlasIndex = altasIndex;
							break;
						}
					}
					if (bSuccess)
						break;
					this._atlaserArray.push(new Atlaser(this._gridNumX, this._gridNumY, this._width, this._height, AtlasResourceManager._sid_++));
					this._needGC = true;
					this.garbageCollection();
					this._curAtlasIndex = this._atlaserArray.length - 1;
				}
				if (!bSuccess) {
					console.log(">>>AtlasManager pushData error");
				}
				return bSuccess;
			}
		}

		__proto.addToAtlas = function (tex) {
			laya.webgl.atlas.AtlasResourceManager.instance.pushData(tex);
		}

		/**
		*回收大图合集,不建议手动调用
		*@return
		*/
		__proto.garbageCollection = function () {
			if (this._needGC === true) {
				var n = this._atlaserArray.length - this._maxAtlaserCount;
				for (var i = 0; i < n; i++) {
					this._atlaserArray[i].dispose();
					console.log("AtlasResourceManager:Dispose the inner Atlas。");
				}
				console.log(">>>>altas garbageCollection =" + n);
				this._atlaserArray.splice(0, n);
				this._needGC = false;
			}
			return true;
		}

		__proto.freeAll = function () {
			for (var i = 0, n = this._atlaserArray.length; i < n; i++) {
				this._atlaserArray[i].dispose();
			}
			this._atlaserArray.length = 0;
			this._curAtlasIndex = 0;
		}

		__proto.getAtlaserCount = function () {
			return this._atlaserArray.length;
		}

		__proto.getAtlaserByIndex = function (index) {
			return this._atlaserArray[index];
		}

		__getset(1, AtlasResourceManager, 'instance', function () {
			if (!AtlasResourceManager._Instance) {
				AtlasResourceManager._Instance = new AtlasResourceManager(laya.webgl.atlas.AtlasResourceManager.atlasTextureWidth, laya.webgl.atlas.AtlasResourceManager.atlasTextureHeight,/*CLASS CONST:laya.webgl.atlas.AtlasResourceManager.gridSize*/16, laya.webgl.atlas.AtlasResourceManager.maxTextureCount);
			}
			return AtlasResourceManager._Instance;
		});

		__getset(1, AtlasResourceManager, 'enabled', function () {
			return Config.atlasEnable;
		});

		__getset(1, AtlasResourceManager, 'atlasLimitWidth', function () {
			return AtlasResourceManager._atlasLimitWidth;
		}, function (value) {
			AtlasResourceManager._atlasLimitWidth = value;
		});

		__getset(1, AtlasResourceManager, 'atlasLimitHeight', function () {
			return AtlasResourceManager._atlasLimitHeight;
		}, function (value) {
			AtlasResourceManager._atlasLimitHeight = value;
		});

		AtlasResourceManager._enable = function () {
			Config.atlasEnable = true;
		}

		AtlasResourceManager._disable = function () {
			Config.atlasEnable = false;
		}

		AtlasResourceManager.__init__ = function () {
			AtlasResourceManager.atlasTextureWidth = 2048;
			AtlasResourceManager.atlasTextureHeight = 2048;
			AtlasResourceManager.maxTextureCount = 6;
			AtlasResourceManager.atlasLimitWidth = 512;
			AtlasResourceManager.atlasLimitHeight = 512;
		}

		AtlasResourceManager._atlasLimitWidth = 0;
		AtlasResourceManager._atlasLimitHeight = 0;
		AtlasResourceManager.gridSize = 16;
		AtlasResourceManager.atlasTextureWidth = 0;
		AtlasResourceManager.atlasTextureHeight = 0;
		AtlasResourceManager.maxTextureCount = 0;
		AtlasResourceManager._atlasRestore = 0;
		AtlasResourceManager.BOARDER_TYPE_NO = 0;
		AtlasResourceManager.BOARDER_TYPE_RIGHT = 1;
		AtlasResourceManager.BOARDER_TYPE_LEFT = 2;
		AtlasResourceManager.BOARDER_TYPE_BOTTOM = 4;
		AtlasResourceManager.BOARDER_TYPE_TOP = 8;
		AtlasResourceManager.BOARDER_TYPE_ALL = 15;
		AtlasResourceManager._sid_ = 0;
		AtlasResourceManager._Instance = null;
		return AtlasResourceManager;
	})()


	//class laya.webgl.atlas.MergeFillInfo
	var MergeFillInfo = (function () {
		function MergeFillInfo() {
			this.x = 0;
			this.y = 0;
			this.ret = false;
			this.ret = false;
			this.x = 0;
			this.y = 0;
		}

		__class(MergeFillInfo, 'laya.webgl.atlas.MergeFillInfo');
		return MergeFillInfo;
	})()


		;
	//class laya.webgl.canvas.BlendMode
	var BlendMode = (function () {
		function BlendMode() { }
		__class(BlendMode, 'laya.webgl.canvas.BlendMode');
		BlendMode._init_ = function (gl) {
			BlendMode.fns = [BlendMode.BlendNormal, BlendMode.BlendAdd, BlendMode.BlendMultiply, BlendMode.BlendScreen, BlendMode.BlendOverlay, BlendMode.BlendLight, BlendMode.BlendMask, BlendMode.BlendDestinationOut];
			BlendMode.targetFns = [BlendMode.BlendNormalTarget, BlendMode.BlendAddTarget, BlendMode.BlendMultiplyTarget, BlendMode.BlendScreenTarget, BlendMode.BlendOverlayTarget, BlendMode.BlendLightTarget, BlendMode.BlendMask, BlendMode.BlendDestinationOut];
		}

		BlendMode.BlendNormal = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303);
		}

		BlendMode.BlendAdd = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.DST_ALPHA*/0x0304);
		}

		BlendMode.BlendMultiply = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.DST_COLOR*/0x0306,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303);
		}

		BlendMode.BlendScreen = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE*/1);
		}

		BlendMode.BlendOverlay = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_COLOR*/0x0301);
		}

		BlendMode.BlendLight = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE*/1);
		}

		BlendMode.BlendNormalTarget = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303);
		}

		BlendMode.BlendAddTarget = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.DST_ALPHA*/0x0304);
		}

		BlendMode.BlendMultiplyTarget = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.DST_COLOR*/0x0306,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_ALPHA*/0x0303);
		}

		BlendMode.BlendScreenTarget = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE*/1);
		}

		BlendMode.BlendOverlayTarget = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE_MINUS_SRC_COLOR*/0x0301);
		}

		BlendMode.BlendLightTarget = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ONE*/1,/*laya.webgl.WebGLContext.ONE*/1);
		}

		BlendMode.BlendMask = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ZERO*/0,/*laya.webgl.WebGLContext.SRC_ALPHA*/0x0302);
		}

		BlendMode.BlendDestinationOut = function (gl) {
			gl.blendFunc(/*laya.webgl.WebGLContext.ZERO*/0,/*laya.webgl.WebGLContext.ZERO*/0);
		}

		BlendMode.activeBlendFunction = null;
		BlendMode.NORMAL = "normal";
		BlendMode.ADD = "add";
		BlendMode.MULTIPLY = "multiply";
		BlendMode.SCREEN = "screen";
		BlendMode.LIGHT = "light";
		BlendMode.OVERLAY = "overlay";
		BlendMode.DESTINATIONOUT = "destination-out";
		BlendMode.fns = [];
		BlendMode.targetFns = [];
		__static(BlendMode,
			['NAMES', function () { return this.NAMES = ["normal", "add", "multiply", "screen", "overlay", "light", "mask", "destination-out"]; }, 'TOINT', function () { return this.TOINT = { "normal": 0, "add": 1, "multiply": 2, "screen": 3, "lighter": 1, "overlay": 4, "light": 5, "mask": 6, "destination-out": 7 }; }
			]);
		return BlendMode;
	})()


	//class laya.webgl.canvas.DrawStyle
	var DrawStyle = (function () {
		function DrawStyle(value) {
			this._color = Color.create("black");
			this.setValue(value);
		}

		__class(DrawStyle, 'laya.webgl.canvas.DrawStyle');
		var __proto = DrawStyle.prototype;
		__proto.setValue = function (value) {
			if (value) {
				if ((typeof value == 'string')) {
					this._color = Color.create(value);
					return;
				}
				if ((value instanceof laya.utils.Color)) {
					this._color = value;
					return;
				}
			}
		}

		__proto.reset = function () {
			this._color = Color.create("black");
		}

		__proto.equal = function (value) {
			if ((typeof value == 'string')) return this._color.strColor === value;
			if ((value instanceof laya.utils.Color)) return this._color.numColor === (value).numColor;
			return false;
		}

		__proto.toColorStr = function () {
			return this._color.strColor;
		}

		DrawStyle.create = function (value) {
			if (value) {
				var color;
				if ((typeof value == 'string')) color = Color.create(value);
				else if ((value instanceof laya.utils.Color)) color = value;
				if (color) {
					return color._drawStyle || (color._drawStyle = new DrawStyle(value));
				}
			}
			return null;
		}

		__static(DrawStyle,
			['DEFAULT', function () { return this.DEFAULT = new DrawStyle("#000000"); }
			]);
		return DrawStyle;
	})()


	//class laya.webgl.canvas.Path
	var Path = (function () {
		function Path() {
			this._x = 0;
			this._y = 0;
			//this._rect=null;
			//this.ib=null;
			//this.vb=null;
			this.dirty = false;
			//this.geomatrys=null;
			//this._curGeomatry=null;
			this.offset = 0;
			this.count = 0;
			this.geoStart = 0;
			this.tempArray = [];
			this.closePath = false;
			this.geomatrys = [];
			var gl = WebGL.mainContext;
			this.ib = IndexBuffer2D.create(/*laya.webgl.WebGLContext.DYNAMIC_DRAW*/0x88E8);
			this.vb = VertexBuffer2D.create(5);
		}

		__class(Path, 'laya.webgl.canvas.Path');
		var __proto = Path.prototype;
		__proto.addPoint = function (pointX, pointY) {
			this.tempArray.push(pointX, pointY);
		}

		__proto.getEndPointX = function () {
			return this.tempArray[this.tempArray.length - 2];
		}

		__proto.getEndPointY = function () {
			return this.tempArray[this.tempArray.length - 1];
		}

		__proto.polygon = function (x, y, points, color, borderWidth, borderColor) {
			var geo;
			this.geomatrys.push(this._curGeomatry = geo = new Polygon(x, y, points, color, borderWidth, borderColor));
			if (!color) geo.fill = false;
			if (borderColor == undefined) geo.borderWidth = 0;
			return geo;
		}

		__proto.setGeomtry = function (shape) {
			this.geomatrys.push(this._curGeomatry = shape);
		}

		__proto.drawLine = function (x, y, points, width, color) {
			var geo;
			if (this.closePath) {
				this.geomatrys.push(this._curGeomatry = geo = new LoopLine(x, y, points, width, color));
			} else {
				this.geomatrys.push(this._curGeomatry = geo = new Line(x, y, points, width, color));
			}
			geo.fill = false;
			return geo;
		}

		__proto.update = function () {
			var si = this.ib._byteLength;
			var len = this.geomatrys.length;
			this.offset = si;
			for (var i = this.geoStart; i < len; i++) {
				this.geomatrys[i].getData(this.ib, this.vb, this.vb._byteLength / 20);
			}
			this.geoStart = len;
			this.count = (this.ib._byteLength - si) / CONST3D2D.BYTES_PIDX;
		}

		__proto.reset = function () {
			this.vb.clear();
			this.ib.clear();
			this.offset = this.count = this.geoStart = 0;
			this.geomatrys.length = 0;
		}

		__proto.recover = function () {
			this._curGeomatry = null;
			this.vb.destory();
			this.vb = null;
			this.ib.destory();
			this.ib = null;
		}

		return Path;
	})()


	//class laya.webgl.canvas.save.SaveClipRect
	var SaveClipRect = (function () {
		function SaveClipRect() {
			//this._clipSaveRect=null;
			//this._submitScissor=null;
			this._clipRect = new Rectangle();
		}

		__class(SaveClipRect, 'laya.webgl.canvas.save.SaveClipRect');
		var __proto = SaveClipRect.prototype;
		Laya.imps(__proto, { "laya.webgl.canvas.save.ISaveData": true })
		__proto.isSaveMark = function () { return false; }
		__proto.restore = function (context) {
			context._clipRect = this._clipSaveRect;
			SaveClipRect._cache[SaveClipRect._cache._length++] = this;
			this._submitScissor.submitLength = context._submits._length - this._submitScissor.submitIndex;
			context._curSubmit = Submit.RENDERBASE;
			context._renderKey = 0;
		}

		SaveClipRect.save = function (context, submitScissor) {
			if ((context._saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT*/0x20000) ==/*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT*/0x20000) return;
			context._saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT*/0x20000;
			var cache = SaveClipRect._cache;
			var o = cache._length > 0 ? cache[--cache._length] : (new SaveClipRect());
			o._clipSaveRect = context._clipRect;
			context._clipRect = o._clipRect.copyFrom(context._clipRect);
			o._submitScissor = submitScissor;
			var _save = context._save;
			_save[_save._length++] = o;
		}

		__static(SaveClipRect,
			['_cache', function () { return this._cache = SaveBase._createArray(); }
			]);
		return SaveClipRect;
	})()


	//class laya.webgl.canvas.save.SaveClipRectStencil
	var SaveClipRectStencil = (function () {
		function SaveClipRectStencil() {
			//this._clipSaveRect=null;
			//this._saveMatrix=null;
			this._contextX = 0;
			this._contextY = 0;
			//this._submitStencil=null;
			this._clipRect = new Rectangle();
			this._rect = new Rectangle();
			this._matrix = new Matrix();
		}

		__class(SaveClipRectStencil, 'laya.webgl.canvas.save.SaveClipRectStencil');
		var __proto = SaveClipRectStencil.prototype;
		Laya.imps(__proto, { "laya.webgl.canvas.save.ISaveData": true })
		__proto.isSaveMark = function () { return false; }
		__proto.restore = function (context) {
			SubmitStencil.restore(context, this._rect, this._saveMatrix, this._contextX, this._contextY);
			context._clipRect = this._clipSaveRect;
			context._curMat = this._saveMatrix;
			context._x = this._contextX;
			context._y = this._contextY;
			SaveClipRectStencil._cache[SaveClipRectStencil._cache._length++] = this;
			context._curSubmit = Submit.RENDERBASE;
		}

		SaveClipRectStencil.save = function (context, submitStencil, x, y, width, height, clipX, clipY, clipWidth, clipHeight) {
			if ((context._saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT_STENCIL*/0x40000) ==/*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT_STENCIL*/0x40000) return;
			context._saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_CLIPRECT_STENCIL*/0x40000;
			var cache = SaveClipRectStencil._cache;
			var o = cache._length > 0 ? cache[--cache._length] : (new SaveClipRectStencil());
			o._clipSaveRect = context._clipRect;
			o._clipRect.setTo(clipX, clipY, clipWidth, clipHeight);
			context._clipRect = o._clipRect;
			o._rect.x = x;
			o._rect.y = y;
			o._rect.width = width;
			o._rect.height = height;
			o._contextX = context._x;
			o._contextY = context._y;
			o._saveMatrix = context._curMat;
			context._curMat.copyTo(o._matrix);
			context._curMat = o._matrix;
			o._submitStencil = submitStencil;
			var _save = context._save;
			_save[_save._length++] = o;
		}

		__static(SaveClipRectStencil,
			['_cache', function () { return this._cache = SaveBase._createArray(); }
			]);
		return SaveClipRectStencil;
	})()


	//class laya.webgl.canvas.save.SaveMark
	var SaveMark = (function () {
		function SaveMark() {
			this._saveuse = 0;
			//this._preSaveMark=null;
			;
		}

		__class(SaveMark, 'laya.webgl.canvas.save.SaveMark');
		var __proto = SaveMark.prototype;
		Laya.imps(__proto, { "laya.webgl.canvas.save.ISaveData": true })
		__proto.isSaveMark = function () {
			return true;
		}

		__proto.restore = function (context) {
			context._saveMark = this._preSaveMark;
			SaveMark._no[SaveMark._no._length++] = this;
		}

		SaveMark.Create = function (context) {
			var no = SaveMark._no;
			var o = no._length > 0 ? no[--no._length] : (new SaveMark());
			o._saveuse = 0;
			o._preSaveMark = context._saveMark;
			context._saveMark = o;
			return o;
		}

		__static(SaveMark,
			['_no', function () { return this._no = SaveBase._createArray(); }
			]);
		return SaveMark;
	})()


	//class laya.webgl.canvas.save.SaveTransform
	var SaveTransform = (function () {
		function SaveTransform() {
			//this._savematrix=null;
			this._matrix = new Matrix();
		}

		__class(SaveTransform, 'laya.webgl.canvas.save.SaveTransform');
		var __proto = SaveTransform.prototype;
		Laya.imps(__proto, { "laya.webgl.canvas.save.ISaveData": true })
		__proto.isSaveMark = function () { return false; }
		__proto.restore = function (context) {
			context._curMat = this._savematrix;
			SaveTransform._no[SaveTransform._no._length++] = this;
		}

		SaveTransform.save = function (context) {
			var _saveMark = context._saveMark;
			if ((_saveMark._saveuse & /*laya.webgl.canvas.save.SaveBase.TYPE_TRANSFORM*/0x800) ===/*laya.webgl.canvas.save.SaveBase.TYPE_TRANSFORM*/0x800) return;
			_saveMark._saveuse |=/*laya.webgl.canvas.save.SaveBase.TYPE_TRANSFORM*/0x800;
			var no = SaveTransform._no;
			var o = no._length > 0 ? no[--no._length] : (new SaveTransform());
			o._savematrix = context._curMat;
			context._curMat = context._curMat.copyTo(o._matrix);
			var _save = context._save;
			_save[_save._length++] = o;
		}

		__static(SaveTransform,
			['_no', function () { return this._no = SaveBase._createArray(); }
			]);
		return SaveTransform;
	})()


	//class laya.webgl.canvas.save.SaveTranslate
	var SaveTranslate = (function () {
		function SaveTranslate() {
			//this._x=NaN;
			//this._y=NaN;
		}

		__class(SaveTranslate, 'laya.webgl.canvas.save.SaveTranslate');
		var __proto = SaveTranslate.prototype;
		Laya.imps(__proto, { "laya.webgl.canvas.save.ISaveData": true })
		__proto.isSaveMark = function () { return false; }
		__proto.restore = function (context) {
			var mat = context._curMat;
			context._x = this._x;
			context._y = this._y;
			SaveTranslate._no[SaveTranslate._no._length++] = this;
		}

		SaveTranslate.save = function (context) {
			var no = SaveTranslate._no;
			var o = no._length > 0 ? no[--no._length] : (new SaveTranslate());
			o._x = context._x;
			o._y = context._y;
			var _save = context._save;
			_save[_save._length++] = o;
		}

		__static(SaveTranslate,
			['_no', function () { return this._no = SaveBase._createArray(); }
			]);
		return SaveTranslate;
	})()


	//class laya.webgl.resource.RenderTargetMAX
	var RenderTargetMAX = (function () {
		function RenderTargetMAX() {
			//public var targets:Vector.<OneTarget>;//没用到
			this.target = null;
			this.repaint = false;
			this._width = NaN;
			this._height = NaN;
			this._sp = null;
			this._clipRect = new Rectangle();
		}

		__class(RenderTargetMAX, 'laya.webgl.resource.RenderTargetMAX');
		var __proto = RenderTargetMAX.prototype;
		__proto.setSP = function (sp) {
			this._sp = sp;
		}

		__proto.size = function (w, h) {
			var _$this = this;
			if (this._width === w && this._height === h) {
				this.target.size(w, h);
				return;
			}
			this.repaint = true;
			this._width = w;
			this._height = h;
			if (!this.target)
				this.target = RenderTarget2D.create(w, h);
			else
				this.target.size(w, h);
			if (!this.target.hasListener(/*laya.events.Event.RECOVERED*/"recovered")) {
				this.target.on(/*laya.events.Event.RECOVERED*/"recovered", this, function (e) {
					Laya.timer.callLater(_$this._sp, _$this._sp.repaint);
				});
			}
		}

		__proto._flushToTarget = function (context, target) {
			if (target._destroy) return;
			var worldScissorTest = RenderState2D.worldScissorTest;
			var preworldClipRect = RenderState2D.worldClipRect;
			RenderState2D.worldClipRect = this._clipRect;
			this._clipRect.x = this._clipRect.y = 0;
			this._clipRect.width = this._width;
			this._clipRect.height = this._height;
			RenderState2D.worldScissorTest = false;
			WebGL.mainContext.disable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
			var preAlpha = RenderState2D.worldAlpha;
			var preMatrix4 = RenderState2D.worldMatrix4;
			var preMatrix = RenderState2D.worldMatrix;
			var preFilters = RenderState2D.worldFilters;
			var preShaderDefines = RenderState2D.worldShaderDefines;
			RenderState2D.worldMatrix = Matrix.EMPTY;
			RenderState2D.restoreTempArray();
			RenderState2D.worldMatrix4 = RenderState2D.TEMPMAT4_ARRAY;
			RenderState2D.worldAlpha = 1;
			RenderState2D.worldFilters = null;
			RenderState2D.worldShaderDefines = null;
			BaseShader.activeShader = null;
			target.start();
			Config.showCanvasMark ? target.clear(0, 1, 0, 0.3) : target.clear(0, 0, 0, 0);
			context.flush();
			target.end();
			BaseShader.activeShader = null;
			RenderState2D.worldAlpha = preAlpha;
			RenderState2D.worldMatrix4 = preMatrix4;
			RenderState2D.worldMatrix = preMatrix;
			RenderState2D.worldFilters = preFilters;
			RenderState2D.worldShaderDefines = preShaderDefines;
			RenderState2D.worldScissorTest = worldScissorTest
			if (worldScissorTest) {
				var y = RenderState2D.height - preworldClipRect.y - preworldClipRect.height;
				WebGL.mainContext.scissor(preworldClipRect.x, y, preworldClipRect.width, preworldClipRect.height);
				WebGL.mainContext.enable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
			}
			RenderState2D.worldClipRect = preworldClipRect;
		}

		__proto.flush = function (context) {
			if (this.repaint) {
				this._flushToTarget(context, this.target);
				this.repaint = false;
			}
		}

		__proto.drawTo = function (context, x, y, width, height) {
			context.drawTexture(this.target.getTexture(), x, y, width, height, 0, 0);
		}

		__proto.destroy = function () {
			if (this.target) {
				this.target.destroy();
				this.target = null;
				this._sp = null;
			}
		}

		return RenderTargetMAX;
	})()


	//class laya.webgl.shader.d2.Shader2D
	var Shader2D = (function () {
		function Shader2D() {
			this.ALPHA = 1;
			//this.glTexture=null;
			//this.shader=null;
			//this.filters=null;
			this.shaderType = 0;
			//this.colorAdd=null;
			//this.strokeStyle=null;
			//this.fillStyle=null;
			this.defines = new ShaderDefines2D();
		}

		__class(Shader2D, 'laya.webgl.shader.d2.Shader2D');
		var __proto = Shader2D.prototype;
		__proto.destroy = function () {
			this.defines = null;
			this.filters = null;
			this.glTexture = null;
			this.strokeStyle = null;
			this.fillStyle = null;
		}

		Shader2D.__init__ = function () {
			Shader.addInclude("parts/ColorFilter_ps_uniform.glsl", "uniform vec4 colorAlpha;\nuniform mat4 colorMat;");
			Shader.addInclude("parts/ColorFilter_ps_logic.glsl", "mat4 alphaMat =colorMat;\n\nalphaMat[0][3] *= gl_FragColor.a;\nalphaMat[1][3] *= gl_FragColor.a;\nalphaMat[2][3] *= gl_FragColor.a;\n\ngl_FragColor = gl_FragColor * alphaMat;\ngl_FragColor += colorAlpha/255.0*gl_FragColor.a;\n");
			Shader.addInclude("parts/GlowFilter_ps_uniform.glsl", "uniform vec4 u_color;\nuniform float u_strength;\nuniform float u_blurX;\nuniform float u_blurY;\nuniform float u_offsetX;\nuniform float u_offsetY;\nuniform float u_textW;\nuniform float u_textH;");
			Shader.addInclude("parts/GlowFilter_ps_logic.glsl", "const float c_IterationTime = 10.0;\nfloat floatIterationTotalTime = c_IterationTime * c_IterationTime;\nvec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\nvec2 vec2FilterDir = vec2(-(u_offsetX)/u_textW,-(u_offsetY)/u_textH);\nvec2 vec2FilterOff = vec2(u_blurX/u_textW/c_IterationTime * 2.0,u_blurY/u_textH/c_IterationTime * 2.0);\nfloat maxNum = u_blurX * u_blurY;\nvec2 vec2Off = vec2(0.0,0.0);\nfloat floatOff = c_IterationTime/2.0;\nfor(float i = 0.0;i<=c_IterationTime; ++i){\n	for(float j = 0.0;j<=c_IterationTime; ++j){\n		vec2Off = vec2(vec2FilterOff.x * (i - floatOff),vec2FilterOff.y * (j - floatOff));\n		vec4Color += texture2D(texture, v_texcoord + vec2FilterDir + vec2Off)/floatIterationTotalTime;\n	}\n}\ngl_FragColor = vec4(u_color.rgb,vec4Color.a * u_strength);\ngl_FragColor.rgb *= gl_FragColor.a;");
			Shader.addInclude("parts/BlurFilter_ps_logic.glsl", "gl_FragColor =   blur();\ngl_FragColor.w*=alpha;");
			Shader.addInclude("parts/BlurFilter_ps_uniform.glsl", "uniform vec4 strength_sig2_2sig2_gauss1;\nuniform vec2 blurInfo;\n\n#define PI 3.141593\n\n//float sigma=strength/3.0;//3σ以外影响很小。即当σ=1的时候，半径为3\n//float sig2 = sigma*sigma;\n//float _2sig2 = 2.0*sig2;\n//return 1.0/(2*PI*sig2)*exp(-(x*x+y*y)/_2sig2)\n//float gauss1 = 1.0/(2.0*PI*sig2);\n\nfloat getGaussian(float x, float y){\n    return strength_sig2_2sig2_gauss1.w*exp(-(x*x+y*y)/strength_sig2_2sig2_gauss1.z);\n}\n\nvec4 blur(){\n    const float blurw = 9.0;\n    vec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\n    vec2 halfsz=vec2(blurw,blurw)/2.0/blurInfo;    \n    vec2 startpos=v_texcoord-halfsz;\n    vec2 ctexcoord = startpos;\n    vec2 step = 1.0/blurInfo;  //每个像素      \n    \n    for(float y = 0.0;y<=blurw; ++y){\n        ctexcoord.x=startpos.x;\n        for(float x = 0.0;x<=blurw; ++x){\n            //TODO 纹理坐标的固定偏移应该在vs中处理\n            vec4Color += texture2D(texture, ctexcoord)*getGaussian(x-blurw/2.0,y-blurw/2.0);\n            ctexcoord.x+=step.x;\n        }\n        ctexcoord.y+=step.y;\n    }\n    return vec4Color;\n}");
			Shader.addInclude("parts/ColorAdd_ps_uniform.glsl", "uniform vec4 colorAdd;\n");
			Shader.addInclude("parts/ColorAdd_ps_logic.glsl", "gl_FragColor = vec4(colorAdd.rgb,colorAdd.a*gl_FragColor.a);\ngl_FragColor.xyz *= colorAdd.a;");
			var vs, ps;
			vs = "attribute vec4 position;\nattribute vec2 texcoord;\nuniform vec2 size;\n\n#ifdef WORLDMAT\nuniform mat4 mmat;\n#endif\nvarying vec2 v_texcoord;\nvoid main() {\n  #ifdef WORLDMAT\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  #else\n  gl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n  #endif\n  \n  v_texcoord = texcoord;\n}";
			ps = "precision mediump float;\n//precision highp float;\nvarying vec2 v_texcoord;\nuniform sampler2D texture;\nuniform float alpha;\n#include?BLUR_FILTER  \"parts/BlurFilter_ps_uniform.glsl\";\n#include?COLOR_FILTER \"parts/ColorFilter_ps_uniform.glsl\";\n#include?GLOW_FILTER \"parts/GlowFilter_ps_uniform.glsl\";\n#include?COLOR_ADD \"parts/ColorAdd_ps_uniform.glsl\";\n\nvoid main() {\n   vec4 color= texture2D(texture, v_texcoord);\n   color.a*=alpha;\n   color.rgb*=alpha;\n   gl_FragColor=color;\n   #include?COLOR_ADD \"parts/ColorAdd_ps_logic.glsl\";   \n   #include?BLUR_FILTER  \"parts/BlurFilter_ps_logic.glsl\";\n   #include?COLOR_FILTER \"parts/ColorFilter_ps_logic.glsl\";\n   #include?GLOW_FILTER \"parts/GlowFilter_ps_logic.glsl\";\n}";
			Shader.preCompile2D(0,/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, vs, ps, null);
			vs = "attribute vec4 position;\nuniform vec2 size;\nuniform mat4 mmat;\nvoid main() {\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n}";
			ps = "precision mediump float;\nuniform vec4 color;\nuniform float alpha;\n#include?COLOR_FILTER \"parts/ColorFilter_ps_uniform.glsl\";\nvoid main() {\n	vec4 a = vec4(color.r, color.g, color.b, color.a);\n	a.w = alpha;\n	a.xyz *= alpha;\n	gl_FragColor = a;\n	#include?COLOR_FILTER \"parts/ColorFilter_ps_logic.glsl\";\n}";
			Shader.preCompile2D(0,/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, vs, ps, null);
			vs = "attribute vec4 position;\nattribute vec3 a_color;\nuniform mat4 mmat;\nuniform mat4 u_mmat2;\nuniform vec2 u_pos;\nuniform vec2 size;\nvarying vec3 color;\nvoid main(){\n  vec4 tPos = vec4(position.x + u_pos.x,position.y + u_pos.y,position.z,position.w);\n  vec4 pos=mmat*u_mmat2*tPos;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  color=a_color;\n}";
			ps = "precision mediump float;\n//precision mediump float;\nvarying vec3 color;\nuniform float alpha;\nvoid main(){\n	//vec4 a=vec4(color.r, color.g, color.b, 1);\n	//a.a*=alpha;\n    gl_FragColor=vec4(color.r, color.g, color.b, alpha);\n	gl_FragColor.rgb*=alpha;\n}";
			Shader.preCompile2D(0,/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, vs, ps, null);
			vs = "attribute vec4 position;\nattribute vec2 texcoord;\nuniform vec2 size;\n\n#ifdef WORLDMAT\nuniform mat4 mmat;\n#endif\nvarying vec2 v_texcoord;\nvoid main() {\n  #ifdef WORLDMAT\n  vec4 pos=mmat*position;\n  gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  #else\n  gl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\n  #endif\n  \n  v_texcoord = texcoord;\n}";
			ps = "#ifdef FSHIGHPRECISION\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n//precision highp float;\nvarying vec2 v_texcoord;\nuniform sampler2D texture;\nuniform float alpha;\nuniform vec4 u_TexRange;\nuniform vec2 u_offset;\n#include?BLUR_FILTER  \"parts/BlurFilter_ps_uniform.glsl\";\n#include?COLOR_FILTER \"parts/ColorFilter_ps_uniform.glsl\";\n#include?GLOW_FILTER \"parts/GlowFilter_ps_uniform.glsl\";\n#include?COLOR_ADD \"parts/ColorAdd_ps_uniform.glsl\";\n\nvoid main() {\n   vec2 newTexCoord;\n   newTexCoord.x = mod(u_offset.x + v_texcoord.x,u_TexRange.y) + u_TexRange.x;\n   newTexCoord.y = mod(u_offset.y + v_texcoord.y,u_TexRange.w) + u_TexRange.z;\n   vec4 color= texture2D(texture, newTexCoord);\n   color.a*=alpha;\n   gl_FragColor=color;\n   #include?COLOR_ADD \"parts/ColorAdd_ps_logic.glsl\";   \n   #include?BLUR_FILTER  \"parts/BlurFilter_ps_logic.glsl\";\n   #include?COLOR_FILTER \"parts/ColorFilter_ps_logic.glsl\";\n   #include?GLOW_FILTER \"parts/GlowFilter_ps_logic.glsl\";\n}";
			Shader.preCompile2D(0,/*laya.webgl.shader.d2.ShaderDefines2D.FILLTEXTURE*/0x100, vs, ps, null);
			vs = "attribute vec2 position;\nattribute vec2 texcoord;\nattribute vec4 color;\nuniform vec2 size;\nuniform float offsetX;\nuniform float offsetY;\nuniform mat4 mmat;\nuniform mat4 u_mmat2;\nvarying vec2 v_texcoord;\nvarying vec4 v_color;\nvoid main() {\n  vec4 pos=mmat*u_mmat2*vec4(offsetX+position.x,offsetY+position.y,0,1 );\n  gl_Position = vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\n  v_color = color;\n  v_color.rgb *= v_color.a;\n  v_texcoord = texcoord;  \n}";
			ps = "precision mediump float;\nvarying vec2 v_texcoord;\nvarying vec4 v_color;\nuniform sampler2D texture;\nuniform float alpha;\nvoid main() {\n	vec4 t_color = texture2D(texture, v_texcoord);\n	gl_FragColor = t_color.rgba * v_color;\n	gl_FragColor *= alpha;\n}";
			Shader.preCompile2D(0,/*laya.webgl.shader.d2.ShaderDefines2D.SKINMESH*/0x200, vs, ps, null);
		}

		return Shader2D;
	})()


	//class laya.webgl.shader.ShaderDefines
	var ShaderDefines = (function () {
		function ShaderDefines(name2int, int2name, int2nameMap) {
			this._value = 0;
			//this._name2int=null;
			//this._int2name=null;
			//this._int2nameMap=null;
			this._name2int = name2int;
			this._int2name = int2name;
			this._int2nameMap = int2nameMap;
		}

		__class(ShaderDefines, 'laya.webgl.shader.ShaderDefines');
		var __proto = ShaderDefines.prototype;
		__proto.add = function (value) {
			if ((typeof value == 'string')) value = this._name2int[value];
			this._value |= value;
			return this._value;
		}

		__proto.addInt = function (value) {
			this._value |= value;
			return this._value;
		}

		__proto.remove = function (value) {
			if ((typeof value == 'string')) value = this._name2int[value];
			this._value &= (~value);
			return this._value;
		}

		__proto.isDefine = function (def) {
			return (this._value & def) === def;
		}

		__proto.getValue = function () {
			return this._value;
		}

		__proto.setValue = function (value) {
			this._value = value;
		}

		__proto.toNameDic = function () {
			var r = this._int2nameMap[this._value];
			return r ? r : ShaderDefines._toText(this._value, this._int2name, this._int2nameMap);
		}

		ShaderDefines._reg = function (name, value, _name2int, _int2name) {
			_name2int[name] = value;
			_int2name[value] = name;
		}

		ShaderDefines._toText = function (value, _int2name, _int2nameMap) {
			var r = _int2nameMap[value];
			if (r) return r;
			var o = {};
			var d = 1;
			for (var i = 0; i < 32; i++) {
				d = 1 << i;
				if (d > value) break;
				if (value & d) {
					var name = _int2name[d];
					name && (o[name] = "");
				}
			}
			_int2nameMap[value] = o;
			return o;
		}

		ShaderDefines._toInt = function (names, _name2int) {
			var words = names.split('.');
			var num = 0;
			for (var i = 0, n = words.length; i < n; i++) {
				var value = _name2int[words[i]];
				if (!value) throw new Error("Defines to int err:" + names + "/" + words[i]);
				num |= value;
			}
			return num;
		}

		return ShaderDefines;
	})()


	/**
	*这里销毁的问题，后面待确认
	*/
	//class laya.webgl.shader.d2.skinAnishader.SkinMesh
	var SkinMesh = (function () {
		function SkinMesh() {
			this.mVBBuffer = null;
			this.mIBBuffer = null;
			this.mVBData = null;
			this.mIBData = null;
			this.mEleNum = 0;
			this.mTexture = null;
			this.transform = null;
			this._vs = null;
			this._ps = null;
			this._indexStart = -1;
			this._verticles = null;
			this._uvs = null;
			this._tempMatrix = new Matrix();
		}

		__class(SkinMesh, 'laya.webgl.shader.d2.skinAnishader.SkinMesh');
		var __proto = SkinMesh.prototype;
		__proto.init = function (texture, vs, ps) {
			if (vs) {
				this._vs = vs;
			} else {
				this._vs = [];
				var tWidth = texture.width;
				var tHeight = texture.height;
				var tRed = 1;
				var tGreed = 1;
				var tBlue = 1;
				var tAlpha = 1;
				this._vs.push(0, 0, 0, 0, tRed, tGreed, tBlue, tAlpha);
				this._vs.push(tWidth, 0, 1, 0, tRed, tGreed, tBlue, tAlpha);
				this._vs.push(tWidth, tHeight, 1, 1, tRed, tGreed, tBlue, tAlpha);
				this._vs.push(0, tHeight, 0, 1, tRed, tGreed, tBlue, tAlpha);
			}
			if (ps) {
				this._ps = ps;
			} else {
				if (!SkinMesh._defaultPS) {
					SkinMesh._defaultPS = [];
					SkinMesh._defaultPS.push(0, 1, 3, 3, 1, 2);
				}
				this._ps = SkinMesh._defaultPS;
			}
			this.mVBData = new Float32Array(this._vs);
			this.mIBData = new Uint16Array(this._ps.length);
			this.mIBData["start"] = -1;
			this.mEleNum = this._ps.length;
			this.mTexture = texture;
		}

		__proto.init2 = function (texture, vs, ps, verticles, uvs) {
			if (this.transform) this.transform = null;
			if (ps) {
				this._ps = ps;
			} else {
				this._ps = [];
				this._ps.push(0, 1, 3, 3, 1, 2);
			}
			this._verticles = verticles;
			this._uvs = uvs;
			this.mEleNum = this._ps.length;
			this.mTexture = texture;
			if (Render.isConchNode || Render.isConchApp) {
				this._initMyData();
				this.mVBData = new Float32Array(this._vs);
			}
		}

		__proto._initMyData = function () {
			var vsI = 0;
			var vI = 0;
			var vLen = this._verticles.length;
			var tempVLen = vLen * 4;
			this._vs = SkinMesh._tempVS;
			var insertNew = false;
			if (Render.isConchNode || Render.isConchApp) {
				this._vs.length = tempVLen;
				insertNew = true;
			} else {
				if (this._vs.length < tempVLen) {
					this._vs.length = tempVLen;
					insertNew = true;
				}
			}
			SkinMesh._tVSLen = tempVLen;
			if (insertNew) {
				while (vsI < tempVLen) {
					this._vs[vsI] = this._verticles[vI];
					this._vs[vsI + 1] = this._verticles[vI + 1];
					this._vs[vsI + 2] = this._uvs[vI];
					this._vs[vsI + 3] = this._uvs[vI + 1];
					this._vs[vsI + 4] = 1;
					this._vs[vsI + 5] = 1;
					this._vs[vsI + 6] = 1;
					this._vs[vsI + 7] = 1;
					vsI += 8;
					vI += 2;
				}
			} else {
				while (vsI < tempVLen) {
					this._vs[vsI] = this._verticles[vI];
					this._vs[vsI + 1] = this._verticles[vI + 1];
					this._vs[vsI + 2] = this._uvs[vI];
					this._vs[vsI + 3] = this._uvs[vI + 1];
					vsI += 8;
					vI += 2;
				}
			}
		}

		__proto.getData2 = function (vb, ib, start) {
			this.mVBBuffer = vb;
			this.mIBBuffer = ib;
			this._initMyData();
			vb.appendEx2(this._vs, Float32Array, SkinMesh._tVSLen, 4);
			this._indexStart = ib._byteLength;
			var tIB;
			tIB = SkinMesh._tempIB;
			if (tIB.length < this._ps.length) {
				tIB.length = this._ps.length;
			}
			for (var i = 0, n = this._ps.length; i < n; i++) {
				tIB[i] = this._ps[i] + start;
			}
			ib.appendEx2(tIB, Uint16Array, this._ps.length, 2);
		}

		__proto.getData = function (vb, ib, start) {
			this.mVBBuffer = vb;
			this.mIBBuffer = ib;
			vb.append(this.mVBData);
			this._indexStart = ib._byteLength;
			if (this.mIBData["start"] != start) {
				for (var i = 0, n = this._ps.length; i < n; i++) {
					this.mIBData[i] = this._ps[i] + start;
				}
				this.mIBData["start"] = start;
			}
			ib.append(this.mIBData);
		}

		__proto.render = function (context, x, y) {
			if (Render.isWebGL && this.mTexture) {
				context._renderKey = 0;
				context._shader2D.glTexture = null;
				SkinMeshBuffer.getInstance().addSkinMesh(this);
				var tempSubmit = Submit.createShape(context, this.mIBBuffer, this.mVBBuffer, this.mEleNum, this._indexStart, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.SKINMESH*/0x200, 0));
				this.transform || (this.transform = Matrix.EMPTY);
				this.transform.translate(x, y);
				Matrix.mul(this.transform, context._curMat, this._tempMatrix);
				this.transform.translate(-x, -y);
				var tShaderValue = tempSubmit.shaderValue;
				var tArray = tShaderValue.u_mmat2 || RenderState2D.getMatrArray();
				RenderState2D.mat2MatArray(this._tempMatrix, tArray);
				tShaderValue.textureHost = this.mTexture;
				tShaderValue.offsetX = 0;
				tShaderValue.offsetY = 0;
				tShaderValue.u_mmat2 = tArray;
				tShaderValue.ALPHA = context._shader2D.ALPHA;
				context._submits[context._submits._length++] = tempSubmit;
			}
			else if (Render.isConchApp && this.mTexture) {
				this.transform || (this.transform = Matrix.EMPTY);
				context.setSkinMesh && context.setSkinMesh(x, y, this._ps, this.mVBData, this.mEleNum, 0, this.mTexture, this.transform);
			}
		}

		SkinMesh._tempVS = [];
		SkinMesh._tempIB = [];
		SkinMesh._defaultPS = null;
		SkinMesh._tVSLen = 0;
		return SkinMesh;
	})()


	//class laya.webgl.shader.d2.skinAnishader.SkinMeshBuffer
	var SkinMeshBuffer = (function () {
		function SkinMeshBuffer() {
			this.ib = null;
			this.vb = null;
			var gl = WebGL.mainContext;
			this.ib = IndexBuffer2D.create(/*laya.webgl.WebGLContext.DYNAMIC_DRAW*/0x88E8);
			this.vb = VertexBuffer2D.create(8);
		}

		__class(SkinMeshBuffer, 'laya.webgl.shader.d2.skinAnishader.SkinMeshBuffer');
		var __proto = SkinMeshBuffer.prototype;
		__proto.addSkinMesh = function (skinMesh) {
			skinMesh.getData2(this.vb, this.ib, this.vb._byteLength / 32);
		}

		__proto.reset = function () {
			this.vb.clear();
			this.ib.clear();
		}

		SkinMeshBuffer.getInstance = function () {
			return SkinMeshBuffer.instance = SkinMeshBuffer.instance || new SkinMeshBuffer();
		}

		SkinMeshBuffer.instance = null;
		return SkinMeshBuffer;
	})()


	//此类可以减少代码
	//class laya.webgl.shapes.BasePoly
	var BasePoly = (function () {
		function BasePoly(x, y, width, height, edges, color, borderWidth, borderColor, round) {
			//this.x=NaN;
			//this.y=NaN;
			//this.r=NaN;
			//this.width=NaN;
			//this.height=NaN;
			//this.edges=NaN;
			this.r0 = 0
			//this.color=0;
			//this.borderColor=NaN;
			//this.borderWidth=NaN;
			//this.round=0;
			this.fill = true;
			//this.mUint16Array=null;
			//this.mFloat32Array=null;
			this.r1 = Math.PI / 2;
			(round === void 0) && (round = 0);
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			this.edges = edges;
			this.color = color;
			this.borderWidth = borderWidth;
			this.borderColor = borderColor;
		}

		__class(BasePoly, 'laya.webgl.shapes.BasePoly');
		var __proto = BasePoly.prototype;
		Laya.imps(__proto, { "laya.webgl.shapes.IShape": true })
		__proto.getData = function (ib, vb, start) { }
		__proto.rebuild = function (points) { }
		__proto.setMatrix = function (mat) { }
		__proto.needUpdate = function (mat) {
			return true;
		}

		__proto.sector = function (outVert, outIndex, start) {
			var x = this.x, y = this.y, edges = this.edges, seg = (this.r1 - this.r0) / edges;
			var w = this.width, h = this.height, color = this.color;
			var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
			outVert.push(x, y, r, g, b);
			for (var i = 0; i < edges + 1; i++) {
				outVert.push(x + Math.sin(seg * i + this.r0) * w, y + Math.cos(seg * i + this.r0) * h);
				outVert.push(r, g, b);
			}
			for (i = 0; i < edges; i++) {
				outIndex.push(start, start + i + 1, start + i + 2);
			}
		}

		//用于画线
		__proto.createLine2 = function (p, indices, lineWidth, len, outVertex, indexCount) {
			var points = p.concat();
			var result = outVertex;
			var color = this.borderColor;
			var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
			var length = points.length / 2;
			var iStart = len, w = lineWidth / 2;
			var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
			var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
			var a1, b1, c1, a2, b2, c2;
			var denom, pdist, dist;
			p1x = points[0];
			p1y = points[1];
			p2x = points[2];
			p2y = points[3];
			perpx = -(p1y - p2y);
			perpy = p1x - p2x;
			dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx = perpx / dist * w;
			perpy = perpy / dist * w;
			result.push(p1x - perpx + this.x, p1y - perpy + this.y, r, g, b, p1x + perpx + this.x, p1y + perpy + this.y, r, g, b);
			for (var i = 1; i < length - 1; i++) {
				p1x = points[(i - 1) * 2];
				p1y = points[(i - 1) * 2 + 1];
				p2x = points[(i) * 2];
				p2y = points[(i) * 2 + 1];
				p3x = points[(i + 1) * 2];
				p3y = points[(i + 1) * 2 + 1];
				perpx = -(p1y - p2y);
				perpy = p1x - p2x;
				dist = Math.sqrt(perpx * perpx + perpy * perpy);
				perpx = perpx / dist * w;
				perpy = perpy / dist * w;
				perp2x = -(p2y - p3y);
				perp2y = p2x - p3x;
				dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
				perp2x = perp2x / dist * w;
				perp2y = perp2y / dist * w;
				a1 = (-perpy + p1y) - (-perpy + p2y);
				b1 = (-perpx + p2x) - (-perpx + p1x);
				c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
				a2 = (-perp2y + p3y) - (-perp2y + p2y);
				b2 = (-perp2x + p2x) - (-perp2x + p3x);
				c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
				denom = a1 * b2 - a2 * b1;
				if (Math.abs(denom) < 0.1) {
					denom += 10.1;
					result.push(p2x - perpx + this.x, p2y - perpy + this.y, r, g, b, p2x + perpx + this.x, p2y + perpy + this.y, r, g, b);
					continue;
				}
				px = (b1 * c2 - b2 * c1) / denom;
				py = (a2 * c1 - a1 * c2) / denom;
				pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
				result.push(px + this.x, py + this.y, r, g, b, p2x - (px - p2x) + this.x, p2y - (py - p2y) + this.y, r, g, b);
			}
			p1x = points[points.length - 4];
			p1y = points[points.length - 3];
			p2x = points[points.length - 2];
			p2y = points[points.length - 1];
			perpx = -(p1y - p2y);
			perpy = p1x - p2x;
			dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx = perpx / dist * w;
			perpy = perpy / dist * w;
			result.push(p2x - perpx + this.x, p2y - perpy + this.y, r, g, b, p2x + perpx + this.x, p2y + perpy + this.y, r, g, b);
			var groupLen = indexCount;
			for (i = 1; i < groupLen; i++) {
				indices.push(iStart + (i - 1) * 2, iStart + (i - 1) * 2 + 1, iStart + i * 2 + 1, iStart + i * 2 + 1, iStart + i * 2, iStart + (i - 1) * 2);
			}
			return result;
		}

		// /*,outVertex:Array,outIndex:Array*/
		__proto.createLine = function (p, indices, lineWidth, len) {
			var points = p.concat();
			var result = p;
			var color = this.borderColor;
			var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
			points.splice(0, 5);
			var length = points.length / 5;
			var iStart = len, w = lineWidth / 2;
			var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
			var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
			var a1, b1, c1, a2, b2, c2;
			var denom, pdist, dist;
			p1x = points[0];
			p1y = points[1];
			p2x = points[5];
			p2y = points[6];
			perpx = -(p1y - p2y);
			perpy = p1x - p2x;
			dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx = perpx / dist * w;
			perpy = perpy / dist * w;
			result.push(p1x - perpx, p1y - perpy, r, g, b, p1x + perpx, p1y + perpy, r, g, b);
			for (var i = 1; i < length - 1; i++) {
				p1x = points[(i - 1) * 5];
				p1y = points[(i - 1) * 5 + 1];
				p2x = points[(i) * 5];
				p2y = points[(i) * 5 + 1];
				p3x = points[(i + 1) * 5];
				p3y = points[(i + 1) * 5 + 1];
				perpx = -(p1y - p2y);
				perpy = p1x - p2x;
				dist = Math.sqrt(perpx * perpx + perpy * perpy);
				perpx = perpx / dist * w;
				perpy = perpy / dist * w;
				perp2x = -(p2y - p3y);
				perp2y = p2x - p3x;
				dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
				perp2x = perp2x / dist * w;
				perp2y = perp2y / dist * w;
				a1 = (-perpy + p1y) - (-perpy + p2y);
				b1 = (-perpx + p2x) - (-perpx + p1x);
				c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
				a2 = (-perp2y + p3y) - (-perp2y + p2y);
				b2 = (-perp2x + p2x) - (-perp2x + p3x);
				c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
				denom = a1 * b2 - a2 * b1;
				if (Math.abs(denom) < 0.1) {
					denom += 10.1;
					result.push(p2x - perpx, p2y - perpy, r, g, b, p2x + perpx, p2y + perpy, r, g, b);
					continue;
				}
				px = (b1 * c2 - b2 * c1) / denom;
				py = (a2 * c1 - a1 * c2) / denom;
				pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
				result.push(px, py, r, g, b, p2x - (px - p2x), p2y - (py - p2y), r, g, b);
			}
			p1x = points[points.length - 10];
			p1y = points[points.length - 9];
			p2x = points[points.length - 5];
			p2y = points[points.length - 4];
			perpx = -(p1y - p2y);
			perpy = p1x - p2x;
			dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx = perpx / dist * w;
			perpy = perpy / dist * w;
			result.push(p2x - perpx, p2y - perpy, r, g, b, p2x + perpx, p2y + perpy, r, g, b);
			var groupLen = this.edges + 1;
			for (i = 1; i < groupLen; i++) {
				indices.push(iStart + (i - 1) * 2, iStart + (i - 1) * 2 + 1, iStart + i * 2 + 1, iStart + i * 2 + 1, iStart + i * 2, iStart + (i - 1) * 2);
			}
			return result;
		}

		//闭合路径
		__proto.createLoopLine = function (p, indices, lineWidth, len, outVertex, outIndex) {
			var points = p.concat();
			var result = outVertex ? outVertex : p;
			var color = this.borderColor;
			var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
			points.splice(0, 5);
			var firstPoint = [points[0], points[1]];
			var lastPoint = [points[points.length - 5], points[points.length - 4]];
			var midPointX = lastPoint[0] + (firstPoint[0] - lastPoint[0]) * 0.5;
			var midPointY = lastPoint[1] + (firstPoint[1] - lastPoint[1]) * 0.5;
			points.unshift(midPointX, midPointY, 0, 0, 0);
			points.push(midPointX, midPointY, 0, 0, 0);
			var length = points.length / 5;
			var iStart = len, w = lineWidth / 2;
			var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
			var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
			var a1, b1, c1, a2, b2, c2;
			var denom, pdist, dist;
			p1x = points[0];
			p1y = points[1];
			p2x = points[5];
			p2y = points[6];
			perpx = -(p1y - p2y);
			perpy = p1x - p2x;
			dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx = perpx / dist * w;
			perpy = perpy / dist * w;
			result.push(p1x - perpx, p1y - perpy, r, g, b, p1x + perpx, p1y + perpy, r, g, b);
			for (var i = 1; i < length - 1; i++) {
				p1x = points[(i - 1) * 5];
				p1y = points[(i - 1) * 5 + 1];
				p2x = points[(i) * 5];
				p2y = points[(i) * 5 + 1];
				p3x = points[(i + 1) * 5];
				p3y = points[(i + 1) * 5 + 1];
				perpx = -(p1y - p2y);
				perpy = p1x - p2x;
				dist = Math.sqrt(perpx * perpx + perpy * perpy);
				perpx = perpx / dist * w;
				perpy = perpy / dist * w;
				perp2x = -(p2y - p3y);
				perp2y = p2x - p3x;
				dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
				perp2x = perp2x / dist * w;
				perp2y = perp2y / dist * w;
				a1 = (-perpy + p1y) - (-perpy + p2y);
				b1 = (-perpx + p2x) - (-perpx + p1x);
				c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
				a2 = (-perp2y + p3y) - (-perp2y + p2y);
				b2 = (-perp2x + p2x) - (-perp2x + p3x);
				c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
				denom = a1 * b2 - a2 * b1;
				if (Math.abs(denom) < 0.1) {
					denom += 10.1;
					result.push(p2x - perpx, p2y - perpy, r, g, b, p2x + perpx, p2y + perpy, r, g, b);
					continue;
				}
				px = (b1 * c2 - b2 * c1) / denom;
				py = (a2 * c1 - a1 * c2) / denom;
				pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
				result.push(px, py, r, g, b, p2x - (px - p2x), p2y - (py - p2y), r, g, b);
			}
			if (outIndex) {
				indices = outIndex;
			};
			var groupLen = this.edges + 1;
			for (i = 1; i < groupLen; i++) {
				indices.push(iStart + (i - 1) * 2, iStart + (i - 1) * 2 + 1, iStart + i * 2 + 1, iStart + i * 2 + 1, iStart + i * 2, iStart + (i - 1) * 2);
			}
			indices.push(iStart + (i - 1) * 2, iStart + (i - 1) * 2 + 1, iStart + 1, iStart + 1, iStart, iStart + (i - 1) * 2);
			return result;
		}

		return BasePoly;
	})()


	//class laya.webgl.shapes.GeometryData
	var GeometryData = (function () {
		function GeometryData(lineWidth, lineColor, lineAlpha, fillColor, fillAlpha, fill, shape) {
			//this.lineWidth=NaN;
			//this.lineColor=NaN;
			//this.lineAlpha=NaN;
			//this.fillColor=NaN;
			//this.fillAlpha=NaN;
			//this.shape=null;
			//this.fill=false;
			this.lineWidth = lineWidth;
			this.lineColor = lineColor;
			this.lineAlpha = lineAlpha;
			this.fillColor = fillColor;
			this.fillAlpha = fillAlpha;
			this.shape = shape;
			this.fill = fill;
		}

		__class(GeometryData, 'laya.webgl.shapes.GeometryData');
		var __proto = GeometryData.prototype;
		__proto.clone = function () {
			return new GeometryData(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape);
		}

		__proto.getIndexData = function () {
			return null;
		}

		__proto.getVertexData = function () {
			return null;
		}

		__proto.destroy = function () {
			this.shape = null;
		}

		return GeometryData;
	})()


	//class laya.webgl.shapes.Vertex
	var Vertex = (function () {
		function Vertex(p) {
			//this.points=null;
			if ((p instanceof Float32Array))
				this.points = p;
			else if ((p instanceof Array)) {
				var len = p.length;
				this.points = new Float32Array(p);
			}
		}

		__class(Vertex, 'laya.webgl.shapes.Vertex');
		var __proto = Vertex.prototype;
		Laya.imps(__proto, { "laya.webgl.shapes.IShape": true })
		__proto.getData = function (ib, vb, start) { }
		__proto.needUpdate = function (mat) {
			return false;
		}

		__proto.rebuild = function (points) { }
		// TODO Auto Generated method stub
		__proto.setMatrix = function (mat) { }
		return Vertex;
	})()


	//class laya.webgl.submit.Submit
	var Submit = (function () {
		function Submit(renderType) {
			//this._selfVb=null;
			//this._ib=null;
			//this._blendFn=null;
			//this._renderType=0;
			//this._vb=null;
			// 从VB中什么地方开始画，画到哪
			//this._startIdx=0;
			//this._numEle=0;
			//this.shaderValue=null;
			(renderType === void 0) && (renderType = 10000);
			this._renderType = renderType;
		}

		__class(Submit, 'laya.webgl.submit.Submit');
		var __proto = Submit.prototype;
		Laya.imps(__proto, { "laya.webgl.submit.ISubmit": true })
		__proto.releaseRender = function () {
			var cache = Submit._cache;
			cache[cache._length++] = this;
			this.shaderValue.release();
			this._vb = null;
		}

		__proto.getRenderType = function () {
			return this._renderType;
		}

		__proto.renderSubmit = function () {
			if (this._numEle === 0) return 1;
			var _tex = this.shaderValue.textureHost;
			if (_tex) {
				var source = _tex.source;
				if (!_tex.bitmap || !source)
					return 1;
				this.shaderValue.texture = source;
			}
			this._vb.bind_upload(this._ib);
			var gl = WebGL.mainContext;
			this.shaderValue.upload();
			if (BlendMode.activeBlendFunction !== this._blendFn) {
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				this._blendFn(gl);
				BlendMode.activeBlendFunction = this._blendFn;
			}
			Stat.drawCall++;
			Stat.trianglesFaces += this._numEle / 3;
			gl.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004, this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403, this._startIdx);
			return 1;
		}

		Submit.__init__ = function () {
			var s = Submit.RENDERBASE = new Submit(-1);
			s.shaderValue = new Value2D(0, 0);
			s.shaderValue.ALPHA = -1234;
		}

		Submit.createSubmit = function (context, ib, vb, pos, sv) {
			var o = Submit._cache._length ? Submit._cache[--Submit._cache._length] : new Submit();
			if (vb == null) {
				vb = o._selfVb || (o._selfVb = VertexBuffer2D.create(-1));
				vb.clear();
				pos = 0;
			}
			o._ib = ib;
			o._vb = vb;
			o._startIdx = pos * CONST3D2D.BYTES_PIDX;
			o._numEle = 0;
			var blendType = context._nBlendType;
			o._blendFn = context._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
			o.shaderValue = sv;
			o.shaderValue.setValue(context._shader2D);
			var filters = context._shader2D.filters;
			filters && o.shaderValue.setFilters(filters);
			return o;
		}

		Submit.createShape = function (ctx, ib, vb, numEle, offset, sv) {
			var o = (!Submit._cache._length) ? (new Submit()) : Submit._cache[--Submit._cache._length];
			o._ib = ib;
			o._vb = vb;
			o._numEle = numEle;
			o._startIdx = offset;
			o.shaderValue = sv;
			o.shaderValue.setValue(ctx._shader2D);
			var blendType = ctx._nBlendType;
			o._blendFn = ctx._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
			return o;
		}

		Submit.TYPE_2D = 10000;
		Submit.TYPE_CANVAS = 10003;
		Submit.TYPE_CMDSETRT = 10004;
		Submit.TYPE_CUSTOM = 10005;
		Submit.TYPE_BLURRT = 10006;
		Submit.TYPE_CMDDESTORYPRERT = 10007;
		Submit.TYPE_DISABLESTENCIL = 10008;
		Submit.TYPE_OTHERIBVB = 10009;
		Submit.TYPE_PRIMITIVE = 10010;
		Submit.TYPE_RT = 10011;
		Submit.TYPE_BLUR_RT = 10012;
		Submit.TYPE_TARGET = 10013;
		Submit.TYPE_CHANGE_VALUE = 10014;
		Submit.TYPE_SHAPE = 10015;
		Submit.TYPE_TEXTURE = 10016;
		Submit.TYPE_FILLTEXTURE = 10017;
		Submit.RENDERBASE = null;
		__static(Submit,
			['_cache', function () { return this._cache = (Submit._cache = [], Submit._cache._length = 0, Submit._cache); }
			]);
		return Submit;
	})()


	//class laya.webgl.submit.SubmitCMD
	var SubmitCMD = (function () {
		function SubmitCMD() {
			this.fun = null;
			this.args = null;
		}

		__class(SubmitCMD, 'laya.webgl.submit.SubmitCMD');
		var __proto = SubmitCMD.prototype;
		Laya.imps(__proto, { "laya.webgl.submit.ISubmit": true })
		__proto.renderSubmit = function () {
			this.fun.apply(null, this.args);
			return 1;
		}

		__proto.getRenderType = function () {
			return 0;
		}

		__proto.releaseRender = function () {
			var cache = SubmitCMD._cache;
			cache[cache._length++] = this;
		}

		SubmitCMD.create = function (args, fun) {
			var o = SubmitCMD._cache._length ? SubmitCMD._cache[--SubmitCMD._cache._length] : new SubmitCMD();
			o.fun = fun;
			o.args = args;
			return o;
		}

		__static(SubmitCMD,
			['_cache', function () { return this._cache = (SubmitCMD._cache = [], SubmitCMD._cache._length = 0, SubmitCMD._cache); }
			]);
		return SubmitCMD;
	})()


	//class laya.webgl.submit.SubmitCMDScope
	var SubmitCMDScope = (function () {
		function SubmitCMDScope() {
			this.variables = {};
		}

		__class(SubmitCMDScope, 'laya.webgl.submit.SubmitCMDScope');
		var __proto = SubmitCMDScope.prototype;
		__proto.getValue = function (name) {
			return this.variables[name];
		}

		__proto.addValue = function (name, value) {
			return this.variables[name] = value;
		}

		__proto.setValue = function (name, value) {
			if (this.variables.hasOwnProperty(name)) {
				return this.variables[name] = value;
			}
			return null;
		}

		__proto.clear = function () {
			for (var key in this.variables) {
				delete this.variables[key];
			}
		}

		__proto.recycle = function () {
			this.clear();
			SubmitCMDScope.POOL.push(this);
		}

		SubmitCMDScope.create = function () {
			var scope = SubmitCMDScope.POOL.pop();
			scope || (scope = new SubmitCMDScope());
			return scope;
		}

		SubmitCMDScope.POOL = [];
		return SubmitCMDScope;
	})()


	//class laya.webgl.submit.SubmitOtherIBVB
	var SubmitOtherIBVB = (function () {
		function SubmitOtherIBVB() {
			this.offset = 0;
			//this._vb=null;
			//this._ib=null;
			//this._blendFn=null;
			//this._mat=null;
			//this._shader=null;
			//this._shaderValue=null;
			//this._numEle=0;
			this.startIndex = 0;
			;
			this._mat = Matrix.create();
		}

		__class(SubmitOtherIBVB, 'laya.webgl.submit.SubmitOtherIBVB');
		var __proto = SubmitOtherIBVB.prototype;
		Laya.imps(__proto, { "laya.webgl.submit.ISubmit": true })
		__proto.releaseRender = function () {
			var cache = SubmitOtherIBVB._cache;
			cache[cache._length++] = this;
		}

		__proto.getRenderType = function () {
			return /*laya.webgl.submit.Submit.TYPE_OTHERIBVB*/10009;
		}

		__proto.renderSubmit = function () {
			var _tex = this._shaderValue.textureHost;
			if (_tex) {
				var source = _tex.source;
				if (!_tex.bitmap || !source)
					return 1;
				this._shaderValue.texture = source;
			}
			this._vb.bind_upload(this._ib);
			var w = RenderState2D.worldMatrix4;
			var wmat = Matrix.TEMP;
			Matrix.mulPre(this._mat, w[0], w[1], w[4], w[5], w[12], w[13], wmat);
			var tmp = RenderState2D.worldMatrix4 = SubmitOtherIBVB.tempMatrix4;
			tmp[0] = wmat.a;
			tmp[1] = wmat.b;
			tmp[4] = wmat.c;
			tmp[5] = wmat.d;
			tmp[12] = wmat.tx;
			tmp[13] = wmat.ty;
			this._shader._offset = this.offset;
			this._shaderValue.refresh();
			this._shader.upload(this._shaderValue);
			this._shader._offset = 0;
			var gl = WebGL.mainContext;
			if (BlendMode.activeBlendFunction !== this._blendFn) {
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				this._blendFn(gl);
				BlendMode.activeBlendFunction = this._blendFn;
			}
			Stat.drawCall++;
			Stat.trianglesFaces += this._numEle / 3;
			gl.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004, this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403, this.startIndex);
			RenderState2D.worldMatrix4 = w;
			BaseShader.activeShader = null;
			return 1;
		}

		SubmitOtherIBVB.create = function (context, vb, ib, numElement, shader, shaderValue, startIndex, offset, type) {
			(type === void 0) && (type = 0);
			var o = (!SubmitOtherIBVB._cache._length) ? (new SubmitOtherIBVB()) : SubmitOtherIBVB._cache[--SubmitOtherIBVB._cache._length];
			o._ib = ib;
			o._vb = vb;
			o._numEle = numElement;
			o._shader = shader;
			o._shaderValue = shaderValue;
			var blendType = context._nBlendType;
			o._blendFn = context._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
			switch (type) {
				case 0:
					o.offset = 0;
					o.startIndex = offset / (CONST3D2D.BYTES_PE * vb.vertexStride) * 1.5;
					o.startIndex *= CONST3D2D.BYTES_PIDX;
					break;
				case 1:
					o.startIndex = startIndex;
					o.offset = offset;
					break;
			}
			return o;
		}

		__static(SubmitOtherIBVB,
			['_cache', function () { return this._cache = (SubmitOtherIBVB._cache = [], SubmitOtherIBVB._cache._length = 0, SubmitOtherIBVB._cache); }, 'tempMatrix4', function () { return this.tempMatrix4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,]; }
			]);
		return SubmitOtherIBVB;
	})()


	//class laya.webgl.submit.SubmitScissor
	var SubmitScissor = (function () {
		function SubmitScissor() {
			this.submitIndex = 0;
			this.submitLength = 0;
			this.context = null;
			this.clipRect = new Rectangle();
			this.screenRect = new Rectangle();
		}

		__class(SubmitScissor, 'laya.webgl.submit.SubmitScissor');
		var __proto = SubmitScissor.prototype;
		Laya.imps(__proto, { "laya.webgl.submit.ISubmit": true })
		__proto._scissor = function (x, y, w, h) {
			var m = RenderState2D.worldMatrix4;
			var a = m[0], d = m[5], tx = m[12], ty = m[13];
			x = x * a + tx;
			y = y * d + ty;
			w *= a;
			h *= d;
			if (w < 1 || h < 1) {
				return false;
			};
			var r = x + w;
			var b = y + h;
			x < 0 && (x = 0, w = r - x);
			y < 0 && (y = 0, h = b - y);
			var screen = RenderState2D.worldClipRect;
			x = Math.max(x, screen.x);
			y = Math.max(y, screen.y);
			w = Math.min(r, screen.right) - x;
			h = Math.min(b, screen.bottom) - y;
			if (w < 1 || h < 1) {
				return false;
			};
			var worldScissorTest = RenderState2D.worldScissorTest;
			this.screenRect.copyFrom(screen);
			screen.x = x;
			screen.y = y;
			screen.width = w;
			screen.height = h;
			RenderState2D.worldScissorTest = true;
			y = RenderState2D.height - y - h;
			WebGL.mainContext.scissor(x, y, w, h);
			WebGL.mainContext.enable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
			this.context.submitElement(this.submitIndex, this.submitIndex + this.submitLength);
			if (worldScissorTest) {
				y = RenderState2D.height - this.screenRect.y - this.screenRect.height;
				WebGL.mainContext.scissor(this.screenRect.x, y, this.screenRect.width, this.screenRect.height);
				WebGL.mainContext.enable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
			}
			else {
				WebGL.mainContext.disable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
				RenderState2D.worldScissorTest = false;
			}
			screen.copyFrom(this.screenRect);
			return true;
		}

		__proto._scissorWithTagart = function (x, y, w, h) {
			if (w < 1 || h < 1) {
				return false;
			};
			var r = x + w;
			var b = y + h;
			x < 0 && (x = 0, w = r - x);
			y < 0 && (y = 0, h = b - y);
			var screen = RenderState2D.worldClipRect;
			x = Math.max(x, screen.x);
			y = Math.max(y, screen.y);
			w = Math.min(r, screen.right) - x;
			h = Math.min(b, screen.bottom) - y;
			if (w < 1 || h < 1) {
				return false;
			};
			var worldScissorTest = RenderState2D.worldScissorTest;
			this.screenRect.copyFrom(screen);
			RenderState2D.worldScissorTest = true;
			screen.x = x;
			screen.y = y;
			screen.width = w;
			screen.height = h;
			y = RenderState2D.height - y - h;
			WebGL.mainContext.scissor(x, y, w, h);
			WebGL.mainContext.enable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
			this.context.submitElement(this.submitIndex, this.submitIndex + this.submitLength);
			if (worldScissorTest) {
				y = RenderState2D.height - this.screenRect.y - this.screenRect.height;
				WebGL.mainContext.scissor(this.screenRect.x, y, this.screenRect.width, this.screenRect.height);
				WebGL.mainContext.enable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
			}
			else {
				WebGL.mainContext.disable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
				RenderState2D.worldScissorTest = false;
			}
			screen.copyFrom(this.screenRect);
			return true;
		}

		__proto.renderSubmit = function () {
			this.submitLength = Math.min(this.context._submits._length - 1, this.submitLength);
			if (this.submitLength < 1 || this.clipRect.width < 1 || this.clipRect.height < 1)
				return this.submitLength + 1;
			if (this.context._targets)
				this._scissorWithTagart(this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height);
			else this._scissor(this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height);
			return this.submitLength + 1;
		}

		__proto.getRenderType = function () {
			return 0;
		}

		__proto.releaseRender = function () {
			var cache = SubmitScissor._cache;
			cache[cache._length++] = this;
			this.context = null;
		}

		SubmitScissor.create = function (context) {
			var o = SubmitScissor._cache._length ? SubmitScissor._cache[--SubmitScissor._cache._length] : new SubmitScissor();
			o.context = context;
			return o;
		}

		__static(SubmitScissor,
			['_cache', function () { return this._cache = (SubmitScissor._cache = [], SubmitScissor._cache._length = 0, SubmitScissor._cache); }
			]);
		return SubmitScissor;
	})()


	//class laya.webgl.submit.SubmitStencil
	var SubmitStencil = (function () {
		function SubmitStencil() {
			this.step = 0;
			this.blendMode = null;
			this.level = 0;
		}

		__class(SubmitStencil, 'laya.webgl.submit.SubmitStencil');
		var __proto = SubmitStencil.prototype;
		Laya.imps(__proto, { "laya.webgl.submit.ISubmit": true })
		__proto.renderSubmit = function () {
			switch (this.step) {
				case 1:
					this.do1();
					break;
				case 2:
					this.do2();
					break;
				case 3:
					this.do3();
					break;
				case 4:
					this.do4();
					break;
				case 5:
					this.do5();
					break;
				case 6:
					this.do6();
					break;
				case 7:
					this.do7();
					break;
				case 8:
					this.do8();
					break;
			}
			return 1;
		}

		__proto.getRenderType = function () {
			return 0;
		}

		__proto.releaseRender = function () {
			var cache = SubmitStencil._cache;
			cache[cache._length++] = this;
		}

		__proto.do1 = function () {
			var gl = WebGL.mainContext;
			gl.enable(/*laya.webgl.WebGLContext.STENCIL_TEST*/0x0B90);
			gl.clear(/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400);
			gl.colorMask(false, false, false, false);
			gl.stencilFunc(/*laya.webgl.WebGLContext.EQUAL*/0x0202, this.level, 0xFF);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.INCR*/0x1E02);
		}

		//gl.stencilOp(WebGLContext.KEEP,WebGLContext.KEEP,WebGLContext.INVERT);//测试通过给模版缓冲 写入值 一开始是0 现在是 0xFF (模版缓冲中不知道是多少位的数据)
		__proto.do2 = function () {
			var gl = WebGL.mainContext;
			gl.stencilFunc(/*laya.webgl.WebGLContext.EQUAL*/0x0202, this.level + 1, 0xFF);
			gl.colorMask(true, true, true, true);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00);
		}

		__proto.do3 = function () {
			var gl = WebGL.mainContext;
			gl.colorMask(true, true, true, true);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00);
			gl.clear(/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400);
			gl.disable(/*laya.webgl.WebGLContext.STENCIL_TEST*/0x0B90);
		}

		__proto.do4 = function () {
			var gl = WebGL.mainContext;
			if (this.level == 0) {
				gl.enable(/*laya.webgl.WebGLContext.STENCIL_TEST*/0x0B90);
				gl.clear(/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400);
			}
			gl.colorMask(false, false, false, false);
			gl.stencilFunc(/*laya.webgl.WebGLContext.ALWAYS*/0x0207, 0, 0xFF);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.INCR*/0x1E02);
		}

		__proto.do5 = function () {
			var gl = WebGL.mainContext;
			gl.stencilFunc(/*laya.webgl.WebGLContext.EQUAL*/0x0202, this.level, 0xFF);
			gl.colorMask(true, true, true, true);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00);
		}

		__proto.do6 = function () {
			var gl = WebGL.mainContext;
			BlendMode.targetFns[BlendMode.TOINT[this.blendMode]](gl);
		}

		__proto.do7 = function () {
			var gl = WebGL.mainContext;
			gl.colorMask(false, false, false, false);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.DECR*/0x1E03);
		}

		__proto.do8 = function () {
			var gl = WebGL.mainContext;
			gl.colorMask(true, true, true, true);
			gl.stencilFunc(/*laya.webgl.WebGLContext.EQUAL*/0x0202, this.level, 0xFF);
			gl.stencilOp(/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00,/*laya.webgl.WebGLContext.KEEP*/0x1E00);
		}

		SubmitStencil.restore = function (context, clip, m, _x, _y) {
			var submitStencil;
			context._renderKey = 0;
			if (SubmitStencil._mask > 0) {
				SubmitStencil._mask--;
			}
			if (SubmitStencil._mask == 0) {
				submitStencil = laya.webgl.submit.SubmitStencil.create(3);
				context.addRenderObject(submitStencil);
				context._curSubmit = Submit.RENDERBASE;
			}
			else {
				submitStencil = laya.webgl.submit.SubmitStencil.create(7);
				context.addRenderObject(submitStencil);
				var vb = context._vb;
				var nPos = (vb._byteLength >> 2);
				if (GlUtils.fillRectImgVb(vb, null, clip.x, clip.y, clip.width, clip.height, Texture.DEF_UV, m, _x, _y, 0, 0)) {
					var shader = context._shader2D;
					shader.glTexture = null;
					var submit = context._curSubmit = Submit.createSubmit(context, context._ib, vb, ((vb._byteLength -/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16 */*laya.webgl.utils.Buffer2D.FLOAT32*/4) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, 0));
					submit.shaderValue.ALPHA = 1.0;
					context._submits[context._submits._length++] = submit;
					context._curSubmit._numEle += 6;
					context._curSubmit = Submit.RENDERBASE;
				} else {
					alert("clipRect calc stencil rect error");
				}
				submitStencil = laya.webgl.submit.SubmitStencil.create(8);
				context.addRenderObject(submitStencil);
			}
		}

		SubmitStencil.restore2 = function (context, submit) {
			var submitStencil;
			context._renderKey = 0;
			if (SubmitStencil._mask > 0) {
				SubmitStencil._mask--;
			}
			if (SubmitStencil._mask == 0) {
				submitStencil = laya.webgl.submit.SubmitStencil.create(3);
				context.addRenderObject(submitStencil);
				context._curSubmit = Submit.RENDERBASE;
			}
			else {
				submitStencil = laya.webgl.submit.SubmitStencil.create(7);
				context.addRenderObject(submitStencil);
				context._submits[context._submits._length++] = submit;
				submitStencil = laya.webgl.submit.SubmitStencil.create(8);
				context.addRenderObject(submitStencil);
			}
		}

		SubmitStencil.create = function (step) {
			var o = SubmitStencil._cache._length ? SubmitStencil._cache[--SubmitStencil._cache._length] : new SubmitStencil();
			o.step = step;
			if (step == 5)
				++SubmitStencil._mask;
			o.level = SubmitStencil._mask;
			return o;
		}

		SubmitStencil._mask = 0;
		__static(SubmitStencil,
			['_cache', function () { return this._cache = (SubmitStencil._cache = [], SubmitStencil._cache._length = 0, SubmitStencil._cache); }
			]);
		return SubmitStencil;
	})()


	//class laya.webgl.submit.SubmitTarget
	var SubmitTarget = (function () {
		function SubmitTarget() {
			this._renderType = 0;
			this._vb = null;
			this._ib = null;
			this._startIdx = 0;
			this._numEle = 0;
			this.shaderValue = null;
			this.blendType = 0;
			this.proName = null;
			this.scope = null;
		}

		__class(SubmitTarget, 'laya.webgl.submit.SubmitTarget');
		var __proto = SubmitTarget.prototype;
		Laya.imps(__proto, { "laya.webgl.submit.ISubmit": true })
		__proto.renderSubmit = function () {
			this._vb.bind_upload(this._ib);
			var target = this.scope.getValue(this.proName);
			if (target) {
				this.shaderValue.texture = target.source;
				if (this.shaderValue["strength"] && !this.shaderValue["blurInfo"]) {
					this.shaderValue["blurInfo"] = [target.width, target.height];
				}
				this.shaderValue.upload();
				this.blend();
				Stat.drawCall++;
				Stat.trianglesFaces += this._numEle / 3;
				WebGL.mainContext.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004, this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403, this._startIdx);
			}
			return 1;
		}

		__proto.blend = function () {
			if (BlendMode.activeBlendFunction !== BlendMode.fns[this.blendType]) {
				var gl = WebGL.mainContext;
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				BlendMode.fns[this.blendType](gl);
				BlendMode.activeBlendFunction = BlendMode.fns[this.blendType];
			}
		}

		__proto.getRenderType = function () {
			return 0;
		}

		__proto.releaseRender = function () {
			var cache = SubmitTarget._cache;
			cache[cache._length++] = this;
		}

		SubmitTarget.create = function (context, ib, vb, pos, sv, proName) {
			var o = SubmitTarget._cache._length ? SubmitTarget._cache[--SubmitTarget._cache._length] : new SubmitTarget();
			o._ib = ib;
			o._vb = vb;
			o.proName = proName;
			o._startIdx = pos * CONST3D2D.BYTES_PIDX;
			o._numEle = 0;
			o.blendType = context._nBlendType;
			o.shaderValue = sv;
			o.shaderValue.setValue(context._shader2D);
			return o;
		}

		__static(SubmitTarget,
			['_cache', function () { return this._cache = (SubmitTarget._cache = [], SubmitTarget._cache._length = 0, SubmitTarget._cache); }
			]);
		return SubmitTarget;
	})()


	/**
	*...特殊的字符，如泰文，必须重新实现这个类
	*/
	//class laya.webgl.text.CharSegment
	var CharSegment = (function () {
		function CharSegment() {
			this._sourceStr = null;
		}

		__class(CharSegment, 'laya.webgl.text.CharSegment');
		var __proto = CharSegment.prototype;
		Laya.imps(__proto, { "laya.webgl.text.ICharSegment": true })
		__proto.textToSpit = function (str) {
			this._sourceStr = str;
		}

		__proto.getChar = function (i) {
			return this._sourceStr.charAt(i);
		}

		__proto.getCharCode = function (i) {
			return this._sourceStr.charCodeAt(i);
		}

		__proto.length = function () {
			return this._sourceStr.length;
		}

		return CharSegment;
	})()


	//class laya.webgl.text.DrawText
	var DrawText = (function () {
		var CharValue;
		function DrawText() { }
		__class(DrawText, 'laya.webgl.text.DrawText');
		DrawText.__init__ = function () {
			DrawText._charsTemp = new Array;
			DrawText._drawValue = new CharValue();
			DrawText._charSeg = new CharSegment();
		}

		DrawText.customCharSeg = function (charseg) {
			DrawText._charSeg = charseg;
		}

		DrawText.getChar = function (char, id, drawValue) {
			var result = WebGLCharImage.createOneChar(char, drawValue);
			if (id != -1)
				DrawText._charsCache[id] = result;
			return result;
		}

		DrawText._drawSlow = function (save, ctx, txt, words, curMat, font, textAlign, fillColor, borderColor, lineWidth, x, y, sx, sy, underLine) {
			var drawValue = DrawText._drawValue.value(font, fillColor, borderColor, lineWidth, sx, sy, underLine);
			var i = 0, n = 0;
			var chars = DrawText._charsTemp;
			var width = 0, oneChar, htmlWord, id = NaN;
			if (words) {
				chars.length = words.length;
				for (i = 0, n = words.length; i < n; i++) {
					htmlWord = words[i];
					id = htmlWord.charNum + drawValue.txtID;
					chars[i] = oneChar = DrawText._charsCache[id] || DrawText.getChar(htmlWord.char, id, drawValue);
					oneChar.active();
				}
			} else {
				var text = ((txt instanceof laya.utils.WordText)) ? txt.toString() : txt;
				if (Text.CharacterCache) {
					DrawText._charSeg.textToSpit(text);
					var len =/*if err,please use iflash.method.xmlLength()*/DrawText._charSeg.length();
					chars.length = len;
					for (i = 0, n = len; i < n; i++) {
						id = DrawText._charSeg.getCharCode(i) + drawValue.txtID;
						chars[i] = oneChar = DrawText._charsCache[id] || DrawText.getChar(DrawText._charSeg.getChar(i), id, drawValue);
						oneChar.active();
						width += oneChar.cw;
					}
				}
				else {
					chars.length = 0;
					oneChar = DrawText.getChar(text, -1, drawValue);
					oneChar.active();
					width += oneChar.cw;
					chars[0] = oneChar;
				}
			};
			var dx = 0;
			if (textAlign !== null && textAlign !== "left")
				dx = -(textAlign == "center" ? (width / 2) : width);
			var uv, bdSz = NaN, texture, value, saveLength = 0;
			if (words) {
				for (i = 0, n = chars.length; i < n; i++) {
					oneChar = chars[i];
					if (!oneChar.isSpace) {
						htmlWord = words[i];
						bdSz = oneChar.borderSize;
						texture = oneChar.texture;
						ctx._drawText(texture, x + dx + htmlWord.x * sx - bdSz, y + htmlWord.y * sy - bdSz, texture.width, texture.height, curMat, 0, 0, 0, 0);
					}
				}
			} else {
				for (i = 0, n = chars.length; i < n; i++) {
					oneChar = chars[i];
					if (!oneChar.isSpace) {
						bdSz = oneChar.borderSize;
						texture = oneChar.texture;
						ctx._drawText(texture, x + dx - bdSz, y - bdSz, texture.width, texture.height, curMat, 0, 0, 0, 0);
						save && (value = save[saveLength++], value || (value = save[saveLength - 1] = []), value[0] = texture, value[1] = dx - bdSz, value[2] = -bdSz);
					}
					dx += oneChar.cw;
				}
				save && (save.length = saveLength);
			}
		}

		DrawText._drawFast = function (save, ctx, curMat, x, y) {
			var texture, value;
			for (var i = 0, n = save.length; i < n; i++) {
				value = save[i];
				texture = value[0];
				texture.active();
				ctx._drawText(texture, x + value[1], y + value[2], texture.width, texture.height, curMat, 0, 0, 0, 0);
			}
		}

		DrawText.drawText = function (ctx, txt, words, curMat, font, textAlign, fillColor, borderColor, lineWidth, x, y, underLine) {
			(underLine === void 0) && (underLine = 0);
			if ((txt && txt.length === 0) || (words && words.length === 0))
				return;
			var sx = curMat.a, sy = curMat.d;
			(curMat.b !== 0 || curMat.c !== 0) && (sx = sy = 1);
			var scale = sx !== 1 || sy !== 1;
			if (scale && Laya.stage.transform) {
				var t = Laya.stage.transform;
				scale = t.a === sx && t.d === sy;
			} else scale = false;
			if (scale) {
				curMat = curMat.copyTo(WebGLContext2D._tmpMatrix);
				var tempTx = curMat.tx;
				var tempTy = curMat.ty;
				curMat.scale(1 / sx, 1 / sy);
				curMat._checkTransform();
				x *= sx;
				y *= sy;
				x += tempTx - curMat.tx;
				y += tempTy - curMat.ty;
			} else sx = sy = 1;
			if (words) {
				DrawText._drawSlow(null, ctx, txt, words, curMat, font, textAlign, fillColor, borderColor, lineWidth, x, y, sx, sy, underLine);
			} else {
				if (txt.toUpperCase === null) {
					var idNum = sx + sy * 100000;
					var myCache = txt;
					if (!myCache.changed && myCache.id === idNum) {
						DrawText._drawFast(myCache.save, ctx, curMat, x, y);
					} else {
						myCache.id = idNum;
						myCache.changed = false;
						DrawText._drawSlow(myCache.save, ctx, txt, words, curMat, font, textAlign, fillColor, borderColor, lineWidth, x, y, sx, sy, underLine);
					}
					return;
				};
				var id = txt + font.toString() + fillColor + borderColor + lineWidth + sx + sy + textAlign;
				var cache = DrawText._textsCache[id];
				if (Text.CharacterCache) {
					if (cache) {
						DrawText._drawFast(cache, ctx, curMat, x, y);
					} else {
						DrawText._textsCache.__length || (DrawText._textsCache.__length = 0);
						if (DrawText._textsCache.__length > Config.WebGLTextCacheCount) {
							DrawText._textsCache = {};
							DrawText._textsCache.__length = 0;
							DrawText._curPoolIndex = 0;
						}
						DrawText._textCachesPool[DrawText._curPoolIndex] ? (cache = DrawText._textsCache[id] = DrawText._textCachesPool[DrawText._curPoolIndex], cache.length = 0) : (DrawText._textCachesPool[DrawText._curPoolIndex] = cache = DrawText._textsCache[id] = []);
						DrawText._textsCache.__length++
						DrawText._curPoolIndex++;
						DrawText._drawSlow(cache, ctx, txt, words, curMat, font, textAlign, fillColor, borderColor, lineWidth, x, y, sx, sy, underLine);
					}
				}
				else {
					DrawText._drawSlow(cache, ctx, txt, words, curMat, font, textAlign, fillColor, borderColor, lineWidth, x, y, sx, sy, underLine);
				}
			}
		}

		DrawText._charsTemp = null;
		DrawText._textCachesPool = [];
		DrawText._curPoolIndex = 0;
		DrawText._charsCache = {};
		DrawText._textsCache = {};
		DrawText._drawValue = null;
		DrawText.d = [];
		DrawText._charSeg = null;
		DrawText.__init$ = function () {
			//class CharValue
			CharValue = (function () {
				function CharValue() {
					//this.txtID=NaN;
					//this.font=null;
					//this.fillColor=null;
					//this.borderColor=null;
					//this.lineWidth=0;
					//this.scaleX=NaN;
					//this.scaleY=NaN;
					//this.underLine=0;
				}
				__class(CharValue, '');
				var __proto = CharValue.prototype;
				__proto.value = function (font, fillColor, borderColor, lineWidth, scaleX, scaleY, underLine) {
					this.font = font;
					this.fillColor = fillColor;
					this.borderColor = borderColor;
					this.lineWidth = lineWidth;
					this.scaleX = scaleX;
					this.scaleY = scaleY;
					this.underLine = underLine;
					var key = font.toString() + scaleX + scaleY + lineWidth + fillColor + borderColor + underLine;
					this.txtID = CharValue._keymap[key];
					if (!this.txtID) {
						this.txtID = (++CharValue._keymapCount) * 0.0000001;
						CharValue._keymap[key] = this.txtID;
					}
					return this;
				}
				CharValue.clear = function () {
					CharValue._keymap = {};
					CharValue._keymapCount = 1;
				}
				CharValue._keymap = {};
				CharValue._keymapCount = 1;
				return CharValue;
			})()
		}

		return DrawText;
	})()


	//class laya.webgl.text.FontInContext
	var FontInContext = (function () {
		function FontInContext(font) {
			//this._text=null;
			//this._words=null;
			this._index = 0;
			this._size = 14;
			this._italic = -2;
			FontInContext._cache2 = FontInContext._cache2 || [];
			this.setFont(font || "14px Arial");
		}

		__class(FontInContext, 'laya.webgl.text.FontInContext');
		var __proto = FontInContext.prototype;
		__proto.setFont = function (value) {
			var arr = FontInContext._cache2[value];
			if (!arr) {
				this._words = value.split(' ');
				for (var i = 0, n = this._words.length; i < n; i++) {
					if (this._words[i].indexOf('px') > 0) {
						this._index = i;
						break;
					}
				}
				this._size = parseInt(this._words[this._index]);
				FontInContext._cache2[value] = [this._words, this._size];
			} else {
				this._words = arr[0];
				this._size = arr[1];
			}
			this._text = null;
			this._italic = -2;
		}

		__proto.getItalic = function () {
			this._italic === -2 && (this._italic = this.hasType("italic"));
			return this._italic;
		}

		__proto.hasType = function (name) {
			for (var i = 0, n = this._words.length; i < n; i++)
				if (this._words[i] === name) return i;
			return -1;
		}

		__proto.removeType = function (name) {
			for (var i = 0, n = this._words.length; i < n; i++)
				if (this._words[i] === name) {
					this._words.splice(i, 1);
					if (this._index > i) this._index--;
					break;
				}
			this._text = null;
			this._italic = -2;
		}

		__proto.copyTo = function (dec) {
			dec._text = this._text;
			dec._size = this._size;
			dec._index = this._index;
			dec._words = this._words.slice();
			dec._italic = -2;
			return dec;
		}

		__proto.toString = function () {
			return this._text ? this._text : (this._text = this._words.join(' '));
		}

		__getset(0, __proto, 'size', function () {
			return this._size;
		}, function (value) {
			this._size = value;
			this._words[this._index] = value + "px";
			this._text = null;
		});

		FontInContext.create = function (font) {
			var r = FontInContext._cache[font];
			if (r) return r;
			r = FontInContext._cache[font] = new FontInContext(font);
			return r;
		}

		FontInContext._cache = {};
		FontInContext._cache2 = null;
		__static(FontInContext,
			['EMPTY', function () { return this.EMPTY = new FontInContext(); }
			]);
		return FontInContext;
	})()


	//class laya.webgl.utils.CONST3D2D
	var CONST3D2D = (function () {
		function CONST3D2D() { }
		__class(CONST3D2D, 'laya.webgl.utils.CONST3D2D');
		CONST3D2D._TMPARRAY = [];
		CONST3D2D._OFFSETX = 0;
		CONST3D2D._OFFSETY = 0;
		__static(CONST3D2D,
			['BYTES_PE', function () { return this.BYTES_PE =/*__JS__ */Float32Array.BYTES_PER_ELEMENT; }, 'BYTES_PIDX', function () { return this.BYTES_PIDX =/*__JS__ */Uint16Array.BYTES_PER_ELEMENT; }, 'defaultMatrix4', function () { return this.defaultMatrix4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }, 'defaultMinusYMatrix4', function () { return this.defaultMinusYMatrix4 = [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }, 'uniformMatrix3', function () { return this.uniformMatrix3 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0]; }
			]);
		return CONST3D2D;
	})()


	//class laya.webgl.utils.GlUtils
	var GlUtils = (function () {
		function GlUtils() { }
		__class(GlUtils, 'laya.webgl.utils.GlUtils');
		GlUtils.make2DProjection = function (width, height, depth) {
			return [2.0 / width, 0, 0, 0, 0, -2.0 / height, 0, 0, 0, 0, 2.0 / depth, 0, -1, 1, 0, 1,];
		}

		GlUtils.fillIBQuadrangle = function (buffer, count) {
			if (count > 65535 / 4) {
				throw Error("IBQuadrangle count:" + count + " must<:" + Math.floor(65535 / 4));
				return false;
			}
			count = Math.floor(count);
			buffer._resizeBuffer((count + 1) * 6 */*laya.webgl.utils.Buffer2D.SHORT*/2, false);
			buffer.byteLength = buffer.bufferLength;
			var bufferData = buffer.getUint16Array();
			var idx = 0;
			for (var i = 0; i < count; i++) {
				bufferData[idx++] = i * 4;
				bufferData[idx++] = i * 4 + 2;
				bufferData[idx++] = i * 4 + 1;
				bufferData[idx++] = i * 4;
				bufferData[idx++] = i * 4 + 3;
				bufferData[idx++] = i * 4 + 2;
			}
			buffer.setNeedUpload();
			return true;
		}

		GlUtils.expandIBQuadrangle = function (buffer, count) {
			buffer.bufferLength >= (count * 6 */*laya.webgl.utils.Buffer2D.SHORT*/2) || GlUtils.fillIBQuadrangle(buffer, count);
		}

		GlUtils.mathCeilPowerOfTwo = function (value) {
			value--;
			value |= value >> 1;
			value |= value >> 2;
			value |= value >> 4;
			value |= value >> 8;
			value |= value >> 16;
			value++;
			return value;
		}

		GlUtils.fillQuadrangleImgVb = function (vb, x, y, point4, uv, m, _x, _y) {
			'use strict';
			var vpos = (vb._byteLength >> 2) +/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vb.byteLength = (vpos << 2);
			var vbdata = vb.getFloat32Array();
			vpos -=/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vbdata[vpos + 2] = uv[0];
			vbdata[vpos + 3] = uv[1];
			vbdata[vpos + 6] = uv[2];
			vbdata[vpos + 7] = uv[3];
			vbdata[vpos + 10] = uv[4];
			vbdata[vpos + 11] = uv[5];
			vbdata[vpos + 14] = uv[6];
			vbdata[vpos + 15] = uv[7];
			var a = m.a, b = m.b, c = m.c, d = m.d;
			if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
				m.bTransform = true;
				var tx = m.tx + _x, ty = m.ty + _y;
				vbdata[vpos] = (point4[0] + x) * a + (point4[1] + y) * c + tx;
				vbdata[vpos + 1] = (point4[0] + x) * b + (point4[1] + y) * d + ty;
				vbdata[vpos + 4] = (point4[2] + x) * a + (point4[3] + y) * c + tx;
				vbdata[vpos + 5] = (point4[2] + x) * b + (point4[3] + y) * d + ty;
				vbdata[vpos + 8] = (point4[4] + x) * a + (point4[5] + y) * c + tx;
				vbdata[vpos + 9] = (point4[4] + x) * b + (point4[5] + y) * d + ty;
				vbdata[vpos + 12] = (point4[6] + x) * a + (point4[7] + y) * c + tx;
				vbdata[vpos + 13] = (point4[6] + x) * b + (point4[7] + y) * d + ty;
			} else {
				m.bTransform = false;
				x += m.tx + _x;
				y += m.ty + _y;
				vbdata[vpos] = x + point4[0];
				vbdata[vpos + 1] = y + point4[1];
				vbdata[vpos + 4] = x + point4[2];
				vbdata[vpos + 5] = y + point4[3];
				vbdata[vpos + 8] = x + point4[4];
				vbdata[vpos + 9] = y + point4[5];
				vbdata[vpos + 12] = x + point4[6];
				vbdata[vpos + 13] = y + point4[7];
			}
			vb._upload = true;
			return true;
		}

		GlUtils.fillTranglesVB = function (vb, x, y, points, m, _x, _y) {
			var vpos = (vb._byteLength >> 2) + points.length;
			vb.byteLength = (vpos << 2);
			var vbdata = vb.getFloat32Array();
			vpos -= points.length;
			var len = points.length;
			var a = m.a, b = m.b, c = m.c, d = m.d;
			for (var i = 0; i < len; i += 4) {
				vbdata[vpos + i + 2] = points[i + 2];
				vbdata[vpos + i + 3] = points[i + 3];
				if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
					m.bTransform = true;
					var tx = m.tx + _x, ty = m.ty + _y;
					vbdata[vpos + i] = (points[i] + x) * a + (points[i + 1] + y) * c + tx;
					vbdata[vpos + i + 1] = (points[i] + x) * b + (points[i + 1] + y) * d + ty;
				} else {
					m.bTransform = false;
					x += m.tx + _x;
					y += m.ty + _y;
					vbdata[vpos + i] = x + points[i];
					vbdata[vpos + i + 1] = y + points[i + 1];
				}
			}
			vb._upload = true;
			return true;
		}

		GlUtils.copyPreImgVb = function (vb, dx, dy) {
			var vpos = (vb._byteLength >> 2);
			vb.byteLength = ((vpos +/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16) << 2);
			var vbdata = vb.getFloat32Array();
			for (var i = 0, ci = vpos - 16; i < 4; i++) {
				vbdata[vpos] = vbdata[ci] + dx;
				++vpos;
				++ci;
				vbdata[vpos] = vbdata[ci] + dy;
				++vpos;
				++ci;
				vbdata[vpos] = vbdata[ci];
				++vpos;
				++ci;
				vbdata[vpos] = vbdata[ci];
				++vpos;
				++ci;
			}
			vb._upload = true;
		}

		GlUtils.fillRectImgVb = function (vb, clip, x, y, width, height, uv, m, _x, _y, dx, dy, round) {
			(round === void 0) && (round = false);
			var mType = 1;
			var toBx, toBy, toEx, toEy;
			var cBx, cBy, cEx, cEy;
			var w0, h0, tx, ty;
			var finalX, finalY, offsetX, offsetY;
			var a = m.a, b = m.b, c = m.c, d = m.d;
			var useClip = clip && clip.width < /*laya.webgl.canvas.WebGLContext2D._MAXSIZE*/99999999;
			if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
				m.bTransform = true;
				if (b === 0 && c === 0) {
					mType = 23;
					w0 = width + x, h0 = height + y;
					tx = m.tx + _x, ty = m.ty + _y;
					toBx = a * x + tx;
					toEx = a * w0 + tx;
					toBy = d * y + ty;
					toEy = d * h0 + ty;
				}
			} else {
				mType = 23;
				m.bTransform = false;
				toBx = x + m.tx + _x;
				toEx = toBx + width;
				toBy = y + m.ty + _y;
				toEy = toBy + height;
			}
			if (useClip) {
				cBx = clip.x, cBy = clip.y, cEx = clip.width + cBx, cEy = clip.height + cBy;
			}
			if (mType !== 1) {
				if (Math.min(toBx, toEx) >= cEx) return false;
				if (Math.min(toBy, toEy) >= cEy) return false;
				if (Math.max(toEx, toBx) <= cBx) return false;
				if (Math.max(toEy, toBy) <= cBy) return false;
			};
			var vpos = (vb._byteLength >> 2);
			vb.byteLength = ((vpos +/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16) << 2);
			var vbdata = vb.getFloat32Array();
			vbdata[vpos + 2] = uv[0];
			vbdata[vpos + 3] = uv[1];
			vbdata[vpos + 6] = uv[2];
			vbdata[vpos + 7] = uv[3];
			vbdata[vpos + 10] = uv[4];
			vbdata[vpos + 11] = uv[5];
			vbdata[vpos + 14] = uv[6];
			vbdata[vpos + 15] = uv[7];
			switch (mType) {
				case 1:
					tx = m.tx + _x, ty = m.ty + _y;
					w0 = width + x, h0 = height + y;
					var w1 = x, h1 = y;
					var aw1 = a * w1, ch1 = c * h1, dh1 = d * h1, bw1 = b * w1;
					var aw0 = a * w0, ch0 = c * h0, dh0 = d * h0, bw0 = b * w0;
					if (round) {
						finalX = aw1 + ch1 + tx;
						offsetX = Math.round(finalX) - finalX;
						finalY = dh1 + bw1 + ty;
						offsetY = Math.round(finalY) - finalY;
						vbdata[vpos] = finalX + offsetX;
						vbdata[vpos + 1] = finalY + offsetY;
						vbdata[vpos + 4] = aw0 + ch1 + tx + offsetX;
						vbdata[vpos + 5] = dh1 + bw0 + ty + offsetY;
						vbdata[vpos + 8] = aw0 + ch0 + tx + offsetX;
						vbdata[vpos + 9] = dh0 + bw0 + ty + offsetY;
						vbdata[vpos + 12] = aw1 + ch0 + tx + offsetX;
						vbdata[vpos + 13] = dh0 + bw1 + ty + offsetY;
					} else {
						vbdata[vpos] = aw1 + ch1 + tx;
						vbdata[vpos + 1] = dh1 + bw1 + ty;
						vbdata[vpos + 4] = aw0 + ch1 + tx;
						vbdata[vpos + 5] = dh1 + bw0 + ty;
						vbdata[vpos + 8] = aw0 + ch0 + tx;
						vbdata[vpos + 9] = dh0 + bw0 + ty;
						vbdata[vpos + 12] = aw1 + ch0 + tx;
						vbdata[vpos + 13] = dh0 + bw1 + ty;
					}
					break;
				case 23:
					if (round) {
						finalX = toBx + dx;
						offsetX = Math.round(finalX) - finalX;
						finalY = toBy;
						offsetY = Math.round(finalY) - finalY;
						vbdata[vpos] = finalX + offsetX;
						vbdata[vpos + 1] = finalY + offsetY;
						vbdata[vpos + 4] = toEx + dx + offsetX;
						vbdata[vpos + 5] = toBy + offsetY;
						vbdata[vpos + 8] = toEx + offsetX;
						vbdata[vpos + 9] = toEy + offsetY;
						vbdata[vpos + 12] = toBx + offsetX;
						vbdata[vpos + 13] = toEy + offsetY;
					} else {
						vbdata[vpos] = toBx + dx;
						vbdata[vpos + 1] = toBy;
						vbdata[vpos + 4] = toEx + dx;
						vbdata[vpos + 5] = toBy;
						vbdata[vpos + 8] = toEx;
						vbdata[vpos + 9] = toEy;
						vbdata[vpos + 12] = toBx;
						vbdata[vpos + 13] = toEy;
					}
					break;
			}
			vb._upload = true;
			return true;
		}

		GlUtils.fillLineVb = function (vb, clip, fx, fy, tx, ty, width, mat) {
			'use strict';
			var linew = width * .5;
			var data = GlUtils._fillLineArray;
			var perpx = -(fy - ty), perpy = fx - tx;
			var dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx /= dist, perpy /= dist, perpx *= linew, perpy *= linew;
			data[0] = fx - perpx, data[1] = fy - perpy, data[4] = fx + perpx, data[5] = fy + perpy, data[8] = tx + perpx, data[9] = ty + perpy, data[12] = tx - perpx, data[13] = ty - perpy;
			mat && mat.transformPointArray(data, data);
			var vpos = (vb._byteLength >> 2) +/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16;
			vb.byteLength = (vpos << 2);
			vb.insertData(data, vpos -/*laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16);
			return true;
		}

		__static(GlUtils,
			['_fillLineArray', function () { return this._fillLineArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; }
			]);
		return GlUtils;
	})()


	//class laya.webgl.utils.MatirxArray
	var MatirxArray = (function () {
		function MatirxArray() { }
		__class(MatirxArray, 'laya.webgl.utils.MatirxArray');
		MatirxArray.ArrayMul = function (a, b, o) {
			if (!a) {
				MatirxArray.copyArray(b, o);
				return;
			}
			if (!b) {
				MatirxArray.copyArray(a, o);
				return;
			};
			var ai0 = NaN, ai1 = NaN, ai2 = NaN, ai3 = NaN;
			for (var i = 0; i < 4; i++) {
				ai0 = a[i];
				ai1 = a[i + 4];
				ai2 = a[i + 8];
				ai3 = a[i + 12];
				o[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
				o[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
				o[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
				o[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
			}
		}

		MatirxArray.copyArray = function (f, t) {
			if (!f) return;
			if (!t) return;
			for (var i = 0; i < f.length; i++) {
				t[i] = f[i];
			}
		}

		return MatirxArray;
	})()


	//class laya.webgl.utils.RenderState2D
	var RenderState2D = (function () {
		function RenderState2D() { }
		__class(RenderState2D, 'laya.webgl.utils.RenderState2D');
		RenderState2D.getMatrArray = function () {
			return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		}

		RenderState2D.mat2MatArray = function (mat, matArray) {
			var m = mat;
			var m4 = matArray;
			m4[0] = m.a;
			m4[1] = m.b;
			m4[2] = RenderState2D.EMPTYMAT4_ARRAY[2];
			m4[3] = RenderState2D.EMPTYMAT4_ARRAY[3];
			m4[4] = m.c;
			m4[5] = m.d;
			m4[6] = RenderState2D.EMPTYMAT4_ARRAY[6];
			m4[7] = RenderState2D.EMPTYMAT4_ARRAY[7];
			m4[8] = RenderState2D.EMPTYMAT4_ARRAY[8];
			m4[9] = RenderState2D.EMPTYMAT4_ARRAY[9];
			m4[10] = RenderState2D.EMPTYMAT4_ARRAY[10];
			m4[11] = RenderState2D.EMPTYMAT4_ARRAY[11];
			m4[12] = m.tx;
			m4[13] = m.ty;
			m4[14] = RenderState2D.EMPTYMAT4_ARRAY[14];
			m4[15] = RenderState2D.EMPTYMAT4_ARRAY[15];
			return matArray;
		}

		RenderState2D.restoreTempArray = function () {
			RenderState2D.TEMPMAT4_ARRAY[0] = 1;
			RenderState2D.TEMPMAT4_ARRAY[1] = 0;
			RenderState2D.TEMPMAT4_ARRAY[4] = 0;
			RenderState2D.TEMPMAT4_ARRAY[5] = 1;
			RenderState2D.TEMPMAT4_ARRAY[12] = 0;
			RenderState2D.TEMPMAT4_ARRAY[13] = 0;
		}

		RenderState2D.clear = function () {
			RenderState2D.worldScissorTest = false;
			RenderState2D.worldShaderDefines = null;
			RenderState2D.worldFilters = null;
			RenderState2D.worldAlpha = 1;
			RenderState2D.worldClipRect.x = RenderState2D.worldClipRect.y = 0;
			RenderState2D.worldClipRect.width = RenderState2D.width;
			RenderState2D.worldClipRect.height = RenderState2D.height;
			RenderState2D.curRenderTarget = null;
		}

		RenderState2D._MAXSIZE = 99999999;
		RenderState2D.worldAlpha = 1.0;
		RenderState2D.worldScissorTest = false;
		RenderState2D.worldFilters = null;
		RenderState2D.worldShaderDefines = null;
		RenderState2D.curRenderTarget = null;
		RenderState2D.width = 0;
		RenderState2D.height = 0;
		__static(RenderState2D,
			['EMPTYMAT4_ARRAY', function () { return this.EMPTYMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }, 'TEMPMAT4_ARRAY', function () { return this.TEMPMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }, 'worldMatrix4', function () { return this.worldMatrix4 = RenderState2D.TEMPMAT4_ARRAY; }, 'worldMatrix', function () { return this.worldMatrix = new Matrix(); }, 'worldClipRect', function () { return this.worldClipRect = new Rectangle(0, 0, 99999999, 99999999); }
			]);
		return RenderState2D;
	})()


	/**
	*@private
	*<code>ShaderCompile</code> 类用于实现Shader编译。
	*/
	//class laya.webgl.utils.ShaderCompile
	var ShaderCompile = (function () {
		var ShaderNode, InlcudeFile;
		function ShaderCompile(name, vs, ps, nameMap) {
			//this._nameMap=null;
			//this._VS=null;
			//this._PS=null;
			var _$this = this;
			function _compile(script) {
				var includefiles = [];
				var top = new ShaderNode(includefiles);
				_$this._compileToTree(top, script.split('\n'), 0, includefiles);
				return top;
			};
			var startTime = Browser.now();
			this._VS = _compile(vs);
			this._PS = _compile(ps);
			this._nameMap = nameMap;
			if ((Browser.now() - startTime) > 2)
				console.log("ShaderCompile use time:" + (Browser.now() - startTime) + "  size:" + vs.length + "/" + ps.length);
		}

		__class(ShaderCompile, 'laya.webgl.utils.ShaderCompile');
		var __proto = ShaderCompile.prototype;
		__proto._compileToTree = function (parent, lines, start, includefiles) {
			var node, preNode;
			var text, name, fname;
			var ofs = 0, words, noUseNode;
			for (var i = start; i < lines.length; i++) {
				text = lines[i];
				if (text.length < 1) continue;
				ofs = text.indexOf("//");
				if (ofs === 0) continue;
				if (ofs >= 0) text = text.substr(0, ofs);
				node = noUseNode || new ShaderNode(includefiles);
				noUseNode = null;
				node.text = text;
				node.noCompile = true;
				if ((ofs = text.indexOf("#")) >= 0) {
					name = "#";
					for (var j = ofs + 1, n = text.length; j < n; j++) {
						var c = text.charAt(j);
						if (c === ' ' || c === '\t' || c === '?') break;
						name += c;
					}
					node.name = name;
					switch (name) {
						case "#ifdef":
						case "#ifndef":
							node.src = text;
							node.noCompile = text.match(/[!&|()=<>]/) != null;
							if (!node.noCompile) {
								words = text.replace(/^\s*/, '').split(/\s+/);
								node.setCondition(words[1], name === "#ifdef" ? 1 : 2);
								node.text = "//" + node.text;
							} else {
								console.log("function():Boolean{return " + text.substr(ofs + node.name.length) + "}");
							}
							node.setParent(parent);
							parent = node;
							continue;
						case "#if":
							node.src = text;
							node.noCompile = true;
							node.setParent(parent);
							parent = node;
							continue;
						case "#else":
							node.src = text;
							parent = parent.parent;
							preNode = parent.childs[parent.childs.length - 1];
							node.noCompile = preNode.noCompile;
							if (!node.noCompile) {
								node.condition = preNode.condition;
								node.conditionType = preNode.conditionType == 1 ? 2 : 1;
								node.text = "//" + node.text + " " + preNode.text + " " + node.conditionType;
							}
							node.setParent(parent);
							parent = node;
							continue;
						case "#endif":
							parent = parent.parent;
							preNode = parent.childs[parent.childs.length - 1];
							node.noCompile = preNode.noCompile;
							if (!node.noCompile) {
								node.text = "//" + node.text;
							}
							node.setParent(parent);
							continue;
						case "#include":
							words = ShaderCompile.splitToWords(text, null);
							var inlcudeFile = ShaderCompile.includes[words[1]];
							if (!inlcudeFile) {
								throw "ShaderCompile error no this include file:" + words[1];
								return;
							}
							if ((ofs = words[0].indexOf("?")) < 0) {
								node.setParent(parent);
								text = inlcudeFile.getWith(words[2] == 'with' ? words[3] : null);
								this._compileToTree(node, text.split('\n'), 0, includefiles);
								node.text = "";
								continue;
							}
							node.setCondition(words[0].substr(ofs + 1), 1);
							node.text = inlcudeFile.getWith(words[2] == 'with' ? words[3] : null);
							break;
						case "#import":
							words = ShaderCompile.splitToWords(text, null);
							fname = words[1];
							includefiles.push({ node: node, file: ShaderCompile.includes[fname], ofs: node.text.length });
							continue;
					}
				} else {
					preNode = parent.childs[parent.childs.length - 1];
					if (preNode && !preNode.name) {
						includefiles.length > 0 && ShaderCompile.splitToWords(text, preNode);
						noUseNode = node;
						preNode.text += "\n" + text;
						continue;
					}
					includefiles.length > 0 && ShaderCompile.splitToWords(text, node);
				}
				node.setParent(parent);
			}
		}

		__proto.createShader = function (define, shaderName, createShader) {
			var defMap = {};
			var defineStr = "";
			if (define) {
				for (var i in define) {
					defineStr += "#define " + i + "\n";
					defMap[i] = true;
				}
			};
			var vs = this._VS.toscript(defMap, []);
			var ps = this._PS.toscript(defMap, []);
			return (createShader || Shader.create)(defineStr + vs.join('\n'), defineStr + ps.join('\n'), shaderName, this._nameMap);
		}

		ShaderCompile._parseOne = function (attributes, uniforms, words, i, word, b) {
			var one = { type: ShaderCompile.shaderParamsMap[words[i + 1]], name: words[i + 2], size: isNaN(parseInt(words[i + 3])) ? 1 : parseInt(words[i + 3]) };
			if (b) {
				if (word == "attribute") {
					attributes.push(one);
				} else {
					uniforms.push(one);
				}
			}
			if (words[i + 3] == ':') {
				one.type = words[i + 4];
				i += 2;
			}
			i += 2;
			return i;
		}

		ShaderCompile.addInclude = function (fileName, txt) {
			if (!txt || txt.length === 0)
				throw new Error("add shader include file err:" + fileName);
			if (ShaderCompile.includes[fileName])
				throw new Error("add shader include file err, has add:" + fileName);
			ShaderCompile.includes[fileName] = new InlcudeFile(txt);
		}

		ShaderCompile.preGetParams = function (vs, ps) {
			var text = [vs, ps];
			var result = {};
			var attributes = [];
			var uniforms = [];
			var definesInfo = {};
			var definesName = [];
			result.attributes = attributes;
			result.uniforms = uniforms;
			result.defines = definesInfo;
			var i = 0, n = 0, one;
			for (var s = 0; s < 2; s++) {
				text[s] = text[s].replace(ShaderCompile._removeAnnotation, "");
				var words = text[s].match(ShaderCompile._reg);
				var tempelse;
				for (i = 0, n = words.length; i < n; i++) {
					var word = words[i];
					if (word != "attribute" && word != "uniform") {
						if (word == "#define") {
							word = words[++i];
							definesName[word] = 1;
							continue;
						} else if (word == "#ifdef") {
							tempelse = words[++i];
							var def = definesInfo[tempelse] = definesInfo[tempelse] || [];
							for (i++; i < n; i++) {
								word = words[i];
								if (word != "attribute" && word != "uniform") {
									if (word == "#else") {
										for (i++; i < n; i++) {
											word = words[i];
											if (word != "attribute" && word != "uniform") {
												if (word == "#endif") {
													break;
												}
												continue;
											}
											i = ShaderCompile._parseOne(attributes, uniforms, words, i, word, !definesName[tempelse]);
										}
									}
									continue;
								}
								i = ShaderCompile._parseOne(attributes, uniforms, words, i, word, definesName[tempelse]);
							}
						}
						continue;
					}
					i = ShaderCompile._parseOne(attributes, uniforms, words, i, word, true);
				}
			}
			return result;
		}

		ShaderCompile.splitToWords = function (str, block) {
			var out = [];
			var c;
			var ofs = -1;
			var word;
			for (var i = 0, n = str.length; i < n; i++) {
				c = str.charAt(i);
				if (" \t=+-*/&%!<>()'\",;".indexOf(c) >= 0) {
					if (ofs >= 0 && (i - ofs) > 1) {
						word = str.substr(ofs, i - ofs);
						out.push(word);
					}
					if (c == '"' || c == "'") {
						var ofs2 = str.indexOf(c, i + 1);
						if (ofs2 < 0) {
							throw "Sharder err:" + str;
							return null;
						}
						out.push(str.substr(i + 1, ofs2 - i - 1));
						i = ofs2;
						ofs = -1;
						continue;
					}
					if (c == '(' && block && out.length > 0) {
						word = out[out.length - 1] + ";";
						if ("vec4;main;".indexOf(word) < 0)
							block.useFuns += word;
					}
					ofs = -1;
					continue;
				}
				if (ofs < 0) ofs = i;
			}
			if (ofs < n && (n - ofs) > 1) {
				word = str.substr(ofs, n - ofs);
				out.push(word);
			}
			return out;
		}

		ShaderCompile.IFDEF_NO = 0;
		ShaderCompile.IFDEF_YES = 1;
		ShaderCompile.IFDEF_ELSE = 2;
		ShaderCompile.IFDEF_PARENT = 3;
		ShaderCompile.includes = {};
		__static(ShaderCompile,
			['_removeAnnotation', function () { return this._removeAnnotation = new RegExp("(/\\*([^*]|[\\r\\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/)|(//.*)", "g"); }, '_reg', function () { return this._reg = new RegExp("(\".*\")|('.*')|([#\\w\\*-\\.+/()=<>{}\\\\]+)|([,;:\\\\])", "g"); }, '_splitToWordExps', function () { return this._splitToWordExps = new RegExp("[(\".*\")]+|[('.*')]+|([ \\t=\\+\\-*/&%!<>!%\(\),;])", "g"); }, 'shaderParamsMap', function () { return this.shaderParamsMap = { "float":/*laya.webgl.WebGLContext.FLOAT*/0x1406, "int":/*laya.webgl.WebGLContext.INT*/0x1404, "bool":/*laya.webgl.WebGLContext.BOOL*/0x8B56, "vec2":/*laya.webgl.WebGLContext.FLOAT_VEC2*/0x8B50, "vec3":/*laya.webgl.WebGLContext.FLOAT_VEC3*/0x8B51, "vec4":/*laya.webgl.WebGLContext.FLOAT_VEC4*/0x8B52, "ivec2":/*laya.webgl.WebGLContext.INT_VEC2*/0x8B53, "ivec3":/*laya.webgl.WebGLContext.INT_VEC3*/0x8B54, "ivec4":/*laya.webgl.WebGLContext.INT_VEC4*/0x8B55, "bvec2":/*laya.webgl.WebGLContext.BOOL_VEC2*/0x8B57, "bvec3":/*laya.webgl.WebGLContext.BOOL_VEC3*/0x8B58, "bvec4":/*laya.webgl.WebGLContext.BOOL_VEC4*/0x8B59, "mat2":/*laya.webgl.WebGLContext.FLOAT_MAT2*/0x8B5A, "mat3":/*laya.webgl.WebGLContext.FLOAT_MAT3*/0x8B5B, "mat4":/*laya.webgl.WebGLContext.FLOAT_MAT4*/0x8B5C, "sampler2D":/*laya.webgl.WebGLContext.SAMPLER_2D*/0x8B5E, "samplerCube":/*laya.webgl.WebGLContext.SAMPLER_CUBE*/0x8B60 }; }
			]);
		ShaderCompile.__init$ = function () {
			//class ShaderNode
			ShaderNode = (function () {
				function ShaderNode(includefiles) {
					this.childs = [];
					this.text = "";
					this.parent = null;
					this.name = null;
					this.noCompile = false;
					this.includefiles = null;
					this.condition = null;
					this.conditionType = 0;
					this.useFuns = "";
					this.z = 0;
					this.src = null;
					this.includefiles = includefiles;
				}
				__class(ShaderNode, '');
				var __proto = ShaderNode.prototype;
				__proto.setParent = function (parent) {
					parent.childs.push(this);
					this.z = parent.z + 1;
					this.parent = parent;
				}
				__proto.setCondition = function (condition, type) {
					if (condition) {
						this.conditionType = type;
						condition = condition.replace(/(\s*$)/g, "");
						this.condition = function () {
							return this[condition];
						}
						this.condition.__condition = condition;
					}
				}
				__proto.toscript = function (def, out) {
					return this._toscript(def, out, ++ShaderNode.__id);
				}
				__proto._toscript = function (def, out, id) {
					if (this.childs.length < 1 && !this.text) return out;
					var outIndex = out.length;
					if (this.condition) {
						var ifdef = !!this.condition.call(def);
						this.conditionType ===/*laya.webgl.utils.ShaderCompile.IFDEF_ELSE*/2 && (ifdef = !ifdef);
						if (!ifdef) return out;
					}
					this.text && out.push(this.text);
					this.childs.length > 0 && this.childs.forEach(function (o, index, arr) {
						o._toscript(def, out, id);
					});
					if (this.includefiles.length > 0 && this.useFuns.length > 0) {
						var funsCode;
						for (var i = 0, n = this.includefiles.length; i < n; i++) {
							if (this.includefiles[i].curUseID == id) {
								continue;
							}
							funsCode = this.includefiles[i].file.getFunsScript(this.useFuns);
							if (funsCode.length > 0) {
								this.includefiles[i].curUseID = id;
								out[0] = funsCode + out[0];
							}
						}
					}
					return out;
				}
				ShaderNode.__id = 1;
				return ShaderNode;
			})()
			//class InlcudeFile
			InlcudeFile = (function () {
				function InlcudeFile(txt) {
					this.script = null;
					this.codes = {};
					this.funs = {};
					this.curUseID = -1;
					this.funnames = "";
					this.script = txt;
					var begin = 0, ofs = 0, end = 0;
					while (true) {
						begin = txt.indexOf("#begin", begin);
						if (begin < 0) break;
						end = begin + 5;
						while (true) {
							end = txt.indexOf("#end", end);
							if (end < 0) break;
							if (txt.charAt(end + 4) === 'i')
								end += 5;
							else break;
						}
						if (end < 0) {
							throw "add include err,no #end:" + txt;
							return;
						}
						ofs = txt.indexOf('\n', begin);
						var words = ShaderCompile.splitToWords(txt.substr(begin, ofs - begin), null);
						if (words[1] == 'code') {
							this.codes[words[2]] = txt.substr(ofs + 1, end - ofs - 1);
						} else if (words[1] == 'function') {
							ofs = txt.indexOf("function", begin);
							ofs += "function".length;
							this.funs[words[3]] = txt.substr(ofs + 1, end - ofs - 1);
							this.funnames += words[3] + ";";
						}
						begin = end + 1;
					}
				}
				__class(InlcudeFile, '');
				var __proto = InlcudeFile.prototype;
				__proto.getWith = function (name) {
					var r = name ? this.codes[name] : this.script;
					if (!r) {
						throw "get with error:" + name;
					}
					return r;
				}
				__proto.getFunsScript = function (funsdef) {
					var r = "";
					for (var i in this.funs) {
						if (funsdef.indexOf(i + ";") >= 0) {
							r += this.funs[i];
						}
					}
					return r;
				}
				return InlcudeFile;
			})()
		}

		return ShaderCompile;
	})()


	/**
	*@private
	*/
	//class laya.webgl.WebGL
	var WebGL = (function () {
		function WebGL() { }
		__class(WebGL, 'laya.webgl.WebGL');
		WebGL._uint8ArraySlice = function () {
			var _this =/*__JS__ */this;
			var sz = _this.length;
			var dec = new Uint8Array(_this.length);
			for (var i = 0; i < sz; i++)dec[i] = _this[i];
			return dec;
		}

		WebGL._float32ArraySlice = function () {
			var _this =/*__JS__ */this;
			var sz = _this.length;
			var dec = new Float32Array(_this.length);
			for (var i = 0; i < sz; i++)dec[i] = _this[i];
			return dec;
		}

		WebGL._uint16ArraySlice = function (__arg) {
			var arg = arguments;
			var _this =/*__JS__ */this;
			var sz = 0;
			var dec;
			var i = 0;
			if (arg.length === 0) {
				sz = _this.length;
				dec = new Uint16Array(sz);
				for (i = 0; i < sz; i++)
					dec[i] = _this[i];
			} else if (arg.length === 2) {
				var start = arg[0];
				var end = arg[1];
				if (end > start) {
					sz = end - start;
					dec = new Uint16Array(sz);
					for (i = start; i < end; i++)
						dec[i - start] = _this[i];
				} else {
					dec = new Uint16Array(0);
				}
			}
			return dec;
		}

		WebGL.expandContext = function () {
			var from = Context.prototype;
			var to =/*__JS__ */CanvasRenderingContext2D.prototype;
			to.fillTrangles = from.fillTrangles;
			Buffer2D.__int__(null);
			to.setIBVB = function (x, y, ib, vb, numElement, mat, shader, shaderValues, startIndex, offset) {
				(startIndex === void 0) && (startIndex = 0);
				(offset === void 0) && (offset = 0);
				if (ib === null) {
					this._ib = this._ib || IndexBuffer2D.QuadrangleIB;
					ib = this._ib;
					GlUtils.expandIBQuadrangle(ib, (vb._byteLength / (4 * 16) + 8));
				}
				this._setIBVB(x, y, ib, vb, numElement, mat, shader, shaderValues, startIndex, offset);
			};
			to.fillTrangles = function (tex, x, y, points, m) {
				this._curMat = this._curMat || Matrix.create();
				this._vb = this._vb || VertexBuffer2D.create();
				if (!this._ib) {
					this._ib = IndexBuffer2D.create();
					GlUtils.fillIBQuadrangle(this._ib, length / 4);
				};
				var vb = this._vb;
				var length = points.length >> 4;
				GlUtils.fillTranglesVB(vb, x, y, points, m || this._curMat, 0, 0);
				GlUtils.expandIBQuadrangle(this._ib, (vb._byteLength / (4 * 16) + 8));
				var shaderValues = new Value2D(0x01, 0);
				shaderValues.textureHost = tex;
				var sd = new Shader2X("attribute vec2 position; attribute vec2 texcoord; uniform vec2 size; uniform mat4 mmat; varying vec2 v_texcoord; void main() { vec4 p=vec4(position.xy,0.0,1.0);vec4 pos=mmat*p; gl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0); v_texcoord = texcoord; }", "precision mediump float; varying vec2 v_texcoord; uniform sampler2D texture; void main() {vec4 color= texture2D(texture, v_texcoord); color.a*=1.0; gl_FragColor= color;}");
			/*__JS__ */vb._vertType = 3;
				this._setIBVB(x, y, this._ib, vb, length * 6, m, sd, shaderValues, 0, 0);
			}
		}

		WebGL.enable = function () {
			Browser.__init__();
			if (Render.isConchApp) {
				if (!Render.isConchWebGL) {
					RunDriver.skinAniSprite = function () {
						var tSkinSprite = new SkinMesh()
						return tSkinSprite;
					}
					WebGL.expandContext();
					return false;
				}
			}
			RunDriver.getWebGLContext = function getWebGLContext(canvas) {
				var gl;
				var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
				for (var i = 0; i < names.length; i++) {
					try {
						gl = canvas.getContext(names[i], { stencil: Config.isStencil, alpha: Config.isAlpha, antialias: Config.isAntialias, premultipliedAlpha: Config.premultipliedAlpha, preserveDrawingBuffer: Config.preserveDrawingBuffer });
					} catch (e) { }
					if (gl)
						return gl;
				}
				return null;
			}
			WebGL.mainContext = RunDriver.getWebGLContext(Render._mainCanvas);
			if (WebGL.mainContext == null)
				return false;
			if (Render.isWebGL) return true;
			HTMLImage.create = function (src, def) {
				return new WebGLImage(src, def);
			}
			HTMLSubImage.create = function (canvas, offsetX, offsetY, width, height, atlasImage, src) {
				return new WebGLSubImage(canvas, offsetX, offsetY, width, height, atlasImage, src);
			}
			Render.WebGL = WebGL;
			Render.isWebGL = true;
			DrawText.__init__();
			RunDriver.createRenderSprite = function (type, next) {
				return new RenderSprite3D(type, next);
			}
			RunDriver.createWebGLContext2D = function (c) {
				return new WebGLContext2D(c);
			}
			RunDriver.changeWebGLSize = function (width, height) {
				laya.webgl.WebGL.onStageResize(width, height);
			}
			RunDriver.createGraphics = function () {
				return new GraphicsGL();
			};
			var action = RunDriver.createFilterAction;
			RunDriver.createFilterAction = action ? action : function (type) {
				return new ColorFilterActionGL()
			}
			RunDriver.clear = function (color) {
				RenderState2D.worldScissorTest && laya.webgl.WebGL.mainContext.disable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
				var ctx = Render.context.ctx;
				var c = (ctx._submits._length == 0 || Config.preserveDrawingBuffer) ? Color.create(color)._color : Stage._wgColor;
				if (c) ctx.clearBG(c[0], c[1], c[2], c[3]);
				RenderState2D.clear();
			}
			RunDriver.addToAtlas = function (texture, force) {
				(force === void 0) && (force = false);
				var bitmap = texture.bitmap;
				if (!Render.optimizeTextureMemory(texture.url, texture)) {
					(bitmap).enableMerageInAtlas = false;
					return;
				}
				if ((Laya.__typeof(bitmap, 'laya.webgl.resource.IMergeAtlasBitmap')) && ((bitmap).allowMerageInAtlas)) {
					bitmap.on(/*laya.events.Event.RECOVERED*/"recovered", texture, texture.addTextureToAtlas);
				}
			}
			RunDriver.isAtlas = function (bitmap) {
				return (bitmap instanceof laya.webgl.atlas.AtlasWebGLCanvas);
			}
			AtlasResourceManager._enable();
			RunDriver.beginFlush = function () {
				var atlasResourceManager = AtlasResourceManager.instance;
				var count = atlasResourceManager.getAtlaserCount();
				for (var i = 0; i < count; i++) {
					var atlerCanvas = atlasResourceManager.getAtlaserByIndex(i).texture;
					(atlerCanvas._flashCacheImageNeedFlush) && (RunDriver.flashFlushImage(atlerCanvas));
				}
			}
			RunDriver.drawToCanvas = function (sprite, _renderType, canvasWidth, canvasHeight, offsetX, offsetY) {
				offsetX -= sprite.x;
				offsetY -= sprite.y;
				var renderTarget = RenderTarget2D.create(canvasWidth, canvasHeight,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, 0, false);
				renderTarget.start();
				Render.context.clear();
				sprite.render(Render.context, offsetX, RenderState2D.height - canvasHeight + offsetY);
				Render.context.flush();
				renderTarget.end();
				var pixels = renderTarget.getData(0, 0, renderTarget.width, renderTarget.height);
				renderTarget.recycle();
				var htmlCanvas = new WebGLCanvas();
				htmlCanvas._canvas = Browser.createElement("canvas");
				htmlCanvas.size(canvasWidth, canvasHeight);
				var context = htmlCanvas._canvas.getContext('2d');
				Browser.canvas.size(canvasWidth, canvasHeight);
				var tempContext = Browser.context;
				var imgData = tempContext.createImageData(canvasWidth, canvasHeight);
				imgData.data.set(/*__JS__ */new Uint8ClampedArray(pixels.buffer));
				htmlCanvas._imgData = imgData;
				tempContext.putImageData(imgData, 0, 0);
				context.save();
				context.translate(0, canvasHeight);
				context.scale(1, -1);
				context.drawImage(Browser.canvas.source, 0, 0);
				context.restore();
				return htmlCanvas;
			}
			RunDriver.createFilterAction = function (type) {
				var action;
				switch (type) {
					case /*laya.filters.Filter.COLOR*/0x20:
						action = new ColorFilterActionGL();
						break;
				}
				return action;
			}
			RunDriver.addTextureToAtlas = function (texture) {
				texture._uvID++;
				AtlasResourceManager._atlasRestore++;
				((texture.bitmap).enableMerageInAtlas) && (AtlasResourceManager.instance.addToAtlas(texture));
			}
			RunDriver.getTexturePixels = function (value, x, y, width, height) {
				(Render.context.ctx).clear();
				var tSprite = new Sprite();
				tSprite.graphics.drawTexture(value, -x, -y);
				var tRenderTarget = RenderTarget2D.create(width, height);
				tRenderTarget.start();
				tRenderTarget.clear(0, 0, 0, 0);
				tSprite.render(Render.context, 0, 0);
				(Render.context.ctx).flush();
				tRenderTarget.end();
				var tUint8Array = tRenderTarget.getData(0, 0, width, height);
				var tArray = [];
				var tIndex = 0;
				for (var i = height - 1; i >= 0; i--) {
					for (var j = 0; j < width; j++) {
						tIndex = (i * width + j) * 4;
						tArray.push(tUint8Array[tIndex]);
						tArray.push(tUint8Array[tIndex + 1]);
						tArray.push(tUint8Array[tIndex + 2]);
						tArray.push(tUint8Array[tIndex + 3]);
					}
				}
				return tArray;
			}
			RunDriver.skinAniSprite = function () {
				var tSkinSprite = new SkinMesh()
				return tSkinSprite;
			}
			Filter._filterStart = function (scope, sprite, context, x, y) {
				var b = scope.getValue("bounds");
				var source = RenderTarget2D.create(b.width, b.height);
				source.start();
				source.clear(0, 0, 0, 0);
				scope.addValue("src", source);
				scope.addValue("ScissorTest", RenderState2D.worldScissorTest);
				if (RenderState2D.worldScissorTest) {
					var tClilpRect = new Rectangle();
					tClilpRect.copyFrom((context.ctx)._clipRect)
					scope.addValue("clipRect", tClilpRect);
					RenderState2D.worldScissorTest = false;
					laya.webgl.WebGL.mainContext.disable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
				}
			}
			Filter._filterEnd = function (scope, sprite, context, x, y) {
				var b = scope.getValue("bounds");
				var source = scope.getValue("src");
				source.end();
				var out = RenderTarget2D.create(b.width, b.height);
				out.start();
				out.clear(0, 0, 0, 0);
				scope.addValue("out", out);
				sprite._set$P('_filterCache', out);
				sprite._set$P('_isHaveGlowFilter', scope.getValue("_isHaveGlowFilter"));
			}
			Filter._EndTarget = function (scope, context) {
				var source = scope.getValue("src");
				source.recycle();
				var out = scope.getValue("out");
				out.end();
				var b = scope.getValue("ScissorTest");
				if (b) {
					RenderState2D.worldScissorTest = true;
					laya.webgl.WebGL.mainContext.enable(/*laya.webgl.WebGLContext.SCISSOR_TEST*/0x0C11);
					context.ctx.save();
					var tClipRect = scope.getValue("clipRect");
					(context.ctx).clipRect(tClipRect.x, tClipRect.y, tClipRect.width, tClipRect.height);
				}
			}
			Filter._useSrc = function (scope) {
				var source = scope.getValue("out");
				source.end();
				source = scope.getValue("src");
				source.start();
				source.clear(0, 0, 0, 0);
			}
			Filter._endSrc = function (scope) {
				var source = scope.getValue("src");
				source.end();
			}
			Filter._useOut = function (scope) {
				var source = scope.getValue("src");
				source.end();
				source = scope.getValue("out");
				source.start();
				source.clear(0, 0, 0, 0);
			}
			Filter._endOut = function (scope) {
				var source = scope.getValue("out");
				source.end();
			}
			Filter._recycleScope = function (scope) {
				scope.recycle();
			}
			Filter._filter = function (sprite, context, x, y) {
				var next = this._next;
				if (next) {
					var filters = sprite.filters, len = filters.length;
					if (len == 1 && (filters[0].type ==/*laya.filters.Filter.COLOR*/0x20)) {
						context.ctx.save();
						context.ctx.setFilters([filters[0]]);
						next._fun.call(next, sprite, context, x, y);
						context.ctx.restore();
						return;
					};
					var shaderValue;
					var b;
					var scope = SubmitCMDScope.create();
					var p = Point.TEMP;
					var tMatrix = context.ctx._getTransformMatrix();
					var mat = Matrix.create();
					tMatrix.copyTo(mat);
					var tPadding = 0;
					var tHalfPadding = 0;
					var tIsHaveGlowFilter = false;
					var out = sprite._$P._filterCache ? sprite._$P._filterCache : null;
					if (!out || sprite._repaint) {
						tIsHaveGlowFilter = sprite._isHaveGlowFilter();
						scope.addValue("_isHaveGlowFilter", tIsHaveGlowFilter);
						if (tIsHaveGlowFilter) {
							tPadding = 50;
							tHalfPadding = 25;
						}
						b = new Rectangle();
						b.copyFrom((sprite).getSelfBounds());
						b.x += (sprite).x;
						b.y += (sprite).y;
						b.x -= (sprite).pivotX + 4;
						b.y -= (sprite).pivotY + 4;
						var tSX = b.x;
						var tSY = b.y;
						b.width += (tPadding + 8);
						b.height += (tPadding + 8);
						p.x = b.x * mat.a + b.y * mat.c;
						p.y = b.y * mat.d + b.x * mat.b;
						b.x = p.x;
						b.y = p.y;
						p.x = b.width * mat.a + b.height * mat.c;
						p.y = b.height * mat.d + b.width * mat.b;
						b.width = p.x;
						b.height = p.y;
						if (b.width <= 0 || b.height <= 0) {
							return;
						}
						out && out.recycle();
						scope.addValue("bounds", b);
						var submit = SubmitCMD.create([scope, sprite, context, 0, 0], Filter._filterStart);
						context.addRenderObject(submit);
						(context.ctx)._renderKey = 0;
						(context.ctx)._shader2D.glTexture = null;
						var tX = sprite.x - tSX + tHalfPadding;
						var tY = sprite.y - tSY + tHalfPadding;
						next._fun.call(next, sprite, context, tX, tY);
						submit = SubmitCMD.create([scope, sprite, context, 0, 0], Filter._filterEnd);
						context.addRenderObject(submit);
						for (var i = 0; i < len; i++) {
							if (i != 0) {
								submit = SubmitCMD.create([scope], Filter._useSrc);
								context.addRenderObject(submit);
								shaderValue = Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0);
								Matrix.TEMP.identity();
								context.ctx.drawTarget(scope, 0, 0, b.width, b.height, Matrix.TEMP, "out", shaderValue, null, BlendMode.TOINT.overlay);
								submit = SubmitCMD.create([scope], Filter._useOut);
								context.addRenderObject(submit);
							};
							var fil = filters[i];
							fil.action.apply3d(scope, sprite, context, 0, 0);
						}
						submit = SubmitCMD.create([scope, context], Filter._EndTarget);
						context.addRenderObject(submit);
					} else {
						tIsHaveGlowFilter = sprite._$P._isHaveGlowFilter ? sprite._$P._isHaveGlowFilter : false;
						if (tIsHaveGlowFilter) {
							tPadding = 50;
							tHalfPadding = 25;
						}
						b = sprite.getBounds();
						if (b.width <= 0 || b.height <= 0) {
							return;
						}
						b.width += tPadding;
						b.height += tPadding;
						p.x = b.x * mat.a + b.y * mat.c;
						p.y = b.y * mat.d + b.x * mat.b;
						b.x = p.x;
						b.y = p.y;
						p.x = b.width * mat.a + b.height * mat.c;
						p.y = b.height * mat.d + b.width * mat.b;
						b.width = p.x;
						b.height = p.y;
						scope.addValue("out", out);
					}
					x = x - tHalfPadding - sprite.x;
					y = y - tHalfPadding - sprite.y;
					p.setTo(x, y);
					mat.transformPoint(p);
					x = p.x + b.x;
					y = p.y + b.y;
					shaderValue = Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0);
					Matrix.TEMP.identity();
					(context.ctx).drawTarget(scope, x, y, b.width, b.height, Matrix.TEMP, "out", shaderValue, null, BlendMode.TOINT.overlay);
					submit = SubmitCMD.create([scope], Filter._recycleScope);
					context.addRenderObject(submit);
					mat.destroy();
				}
			}
			Float32Array.prototype.slice || (Float32Array.prototype.slice = WebGL._float32ArraySlice);
			Uint16Array.prototype.slice || (Uint16Array.prototype.slice = WebGL._uint16ArraySlice);
			Uint8Array.prototype.slice || (Uint8Array.prototype.slice = WebGL._uint8ArraySlice);
			return true;
		}

		WebGL.onStageResize = function (width, height) {
			if (WebGL.mainContext == null) return;
			WebGL.mainContext.viewport(0, 0, width, height);
			RenderState2D.width = width;
			RenderState2D.height = height;
		}

		WebGL.onInvalidGLRes = function () {
			AtlasResourceManager.instance.freeAll();
			ResourceManager.releaseContentManagers(true);
			WebGL.doNodeRepaint(Laya.stage);
			WebGL.mainContext.viewport(0, 0, RenderState2D.width, RenderState2D.height);
			Laya.stage.event(/*laya.events.Event.DEVICE_LOST*/"devicelost");
		}

		WebGL.doNodeRepaint = function (sprite) {
			(sprite.numChildren == 0) && (sprite.repaint());
			for (var i = 0; i < sprite.numChildren; i++)
				WebGL.doNodeRepaint(sprite.getChildAt(i));
		}

		WebGL.init = function (canvas, width, height) {
			WebGL.mainCanvas = canvas;
			HTMLCanvas._createContext = function (canvas) {
				return new WebGLContext2D(canvas);
			};
			var gl = laya.webgl.WebGL.mainContext;
			if (gl.getShaderPrecisionFormat != null) {
				var vertexPrecisionFormat = gl.getShaderPrecisionFormat(/*laya.webgl.WebGLContext.VERTEX_SHADER*/0x8B31,/*laya.webgl.WebGLContext.HIGH_FLOAT*/0x8DF2);
				var framePrecisionFormat = gl.getShaderPrecisionFormat(/*laya.webgl.WebGLContext.FRAGMENT_SHADER*/0x8B30,/*laya.webgl.WebGLContext.HIGH_FLOAT*/0x8DF2);
				WebGL.shaderHighPrecision = (vertexPrecisionFormat.precision && framePrecisionFormat.precision) ? true : false;
			} else {
				WebGL.shaderHighPrecision = false;
			}
			WebGL.compressAstc = gl.getExtension("WEBGL_compressed_texture_astc");
			WebGL.compressAtc = gl.getExtension("WEBGL_compressed_texture_atc");
			WebGL.compressEtc = gl.getExtension("WEBGL_compressed_texture_etc");
			WebGL.compressEtc1 = gl.getExtension("WEBGL_compressed_texture_etc1");
			WebGL.compressPvrtc = gl.getExtension("WEBGL_compressed_texture_pvrtc");
			WebGL.compressS3tc = gl.getExtension("WEBGL_compressed_texture_s3tc");
			WebGL.compressS3tc_srgb = gl.getExtension("WEBGL_compressed_texture_s3tc_srgb");
			gl.deleteTexture1 = gl.deleteTexture;
			gl.deleteTexture = function (t) {
				if (t == WebGLContext.curBindTexValue) {
					WebGLContext.curBindTexValue = null;
				}
				gl.deleteTexture1(t);
			}
			WebGL.onStageResize(width, height);
			if (WebGL.mainContext == null)
				throw new Error("webGL getContext err!");
			System.__init__();
			AtlasResourceManager.__init__();
			ShaderDefines2D.__init__();
			Submit.__init__();
			WebGLContext2D.__init__();
			Value2D.__init__();
			Shader2D.__init__();
			Buffer2D.__int__(gl);
			BlendMode._init_(gl);
			if (Render.isConchApp) {
			/*__JS__ */conch.setOnInvalidGLRes(WebGL.onInvalidGLRes);
			}
		}

		WebGL.compressAstc = null;
		WebGL.compressAtc = null;
		WebGL.compressEtc = null;
		WebGL.compressEtc1 = null;
		WebGL.compressPvrtc = null;
		WebGL.compressS3tc = null;
		WebGL.compressS3tc_srgb = null;
		WebGL.mainCanvas = null;
		WebGL.mainContext = null;
		WebGL.antialias = true;
		WebGL.shaderHighPrecision = false;
		__static(WebGL,
			['_bg_null', function () { return this._bg_null = [0, 0, 0, 0]; }
			]);
		return WebGL;
	})()


	//class laya.webgl.WebGLContext
	var WebGLContext = (function () {
		function WebGLContext() { }
		__class(WebGLContext, 'laya.webgl.WebGLContext');
		WebGLContext.UseProgram = function (program) {
			if (WebGLContext._useProgram === program) return false;
			WebGL.mainContext.useProgram(program);
			WebGLContext._useProgram = program;
			return true;
		}

		WebGLContext.setDepthTest = function (gl, value) {
			value !== WebGLContext._depthTest && (WebGLContext._depthTest = value, value ? gl.enable(/*CLASS CONST:laya.webgl.WebGLContext.DEPTH_TEST*/0x0B71) : gl.disable(/*CLASS CONST:laya.webgl.WebGLContext.DEPTH_TEST*/0x0B71));
		}

		WebGLContext.setDepthMask = function (gl, value) {
			value !== WebGLContext._depthMask && (WebGLContext._depthMask = value, gl.depthMask(value));
		}

		WebGLContext.setDepthFunc = function (gl, value) {
			value !== WebGLContext._depthFunc && (WebGLContext._depthFunc = value, gl.depthFunc(value));
		}

		WebGLContext.setBlend = function (gl, value) {
			value !== WebGLContext._blend && (WebGLContext._blend = value, value ? gl.enable(/*CLASS CONST:laya.webgl.WebGLContext.BLEND*/0x0BE2) : gl.disable(/*CLASS CONST:laya.webgl.WebGLContext.BLEND*/0x0BE2));
		}

		WebGLContext.setBlendFunc = function (gl, sFactor, dFactor) {
			(sFactor !== WebGLContext._sFactor || dFactor !== WebGLContext._dFactor) && (WebGLContext._sFactor = sFactor, WebGLContext._dFactor = dFactor, gl.blendFunc(sFactor, dFactor));
		}

		WebGLContext.setCullFace = function (gl, value) {
			value !== WebGLContext._cullFace && (WebGLContext._cullFace = value, value ? gl.enable(/*CLASS CONST:laya.webgl.WebGLContext.CULL_FACE*/0x0B44) : gl.disable(/*CLASS CONST:laya.webgl.WebGLContext.CULL_FACE*/0x0B44));
		}

		WebGLContext.setFrontFace = function (gl, value) {
			value !== WebGLContext._frontFace && (WebGLContext._frontFace = value, gl.frontFace(value));
		}

		WebGLContext.bindTexture = function (gl, target, texture) {
			gl.bindTexture(target, texture);
			WebGLContext.curBindTexTarget = target;
			WebGLContext.curBindTexValue = texture;
		}

		WebGLContext.DEPTH_BUFFER_BIT = 0x00000100;
		WebGLContext.STENCIL_BUFFER_BIT = 0x00000400;
		WebGLContext.COLOR_BUFFER_BIT = 0x00004000;
		WebGLContext.POINTS = 0x0000;
		WebGLContext.LINES = 0x0001;
		WebGLContext.LINE_LOOP = 0x0002;
		WebGLContext.LINE_STRIP = 0x0003;
		WebGLContext.TRIANGLES = 0x0004;
		WebGLContext.TRIANGLE_STRIP = 0x0005;
		WebGLContext.TRIANGLE_FAN = 0x0006;
		WebGLContext.ZERO = 0;
		WebGLContext.ONE = 1;
		WebGLContext.SRC_COLOR = 0x0300;
		WebGLContext.ONE_MINUS_SRC_COLOR = 0x0301;
		WebGLContext.SRC_ALPHA = 0x0302;
		WebGLContext.ONE_MINUS_SRC_ALPHA = 0x0303;
		WebGLContext.DST_ALPHA = 0x0304;
		WebGLContext.ONE_MINUS_DST_ALPHA = 0x0305;
		WebGLContext.DST_COLOR = 0x0306;
		WebGLContext.ONE_MINUS_DST_COLOR = 0x0307;
		WebGLContext.SRC_ALPHA_SATURATE = 0x0308;
		WebGLContext.FUNC_ADD = 0x8006;
		WebGLContext.BLEND_EQUATION = 0x8009;
		WebGLContext.BLEND_EQUATION_RGB = 0x8009;
		WebGLContext.BLEND_EQUATION_ALPHA = 0x883D;
		WebGLContext.FUNC_SUBTRACT = 0x800A;
		WebGLContext.FUNC_REVERSE_SUBTRACT = 0x800B;
		WebGLContext.BLEND_DST_RGB = 0x80C8;
		WebGLContext.BLEND_SRC_RGB = 0x80C9;
		WebGLContext.BLEND_DST_ALPHA = 0x80CA;
		WebGLContext.BLEND_SRC_ALPHA = 0x80CB;
		WebGLContext.CONSTANT_COLOR = 0x8001;
		WebGLContext.ONE_MINUS_CONSTANT_COLOR = 0x8002;
		WebGLContext.CONSTANT_ALPHA = 0x8003;
		WebGLContext.ONE_MINUS_CONSTANT_ALPHA = 0x8004;
		WebGLContext.BLEND_COLOR = 0x8005;
		WebGLContext.ARRAY_BUFFER = 0x8892;
		WebGLContext.ELEMENT_ARRAY_BUFFER = 0x8893;
		WebGLContext.ARRAY_BUFFER_BINDING = 0x8894;
		WebGLContext.ELEMENT_ARRAY_BUFFER_BINDING = 0x8895;
		WebGLContext.STREAM_DRAW = 0x88E0;
		WebGLContext.STATIC_DRAW = 0x88E4;
		WebGLContext.DYNAMIC_DRAW = 0x88E8;
		WebGLContext.BUFFER_SIZE = 0x8764;
		WebGLContext.BUFFER_USAGE = 0x8765;
		WebGLContext.CURRENT_VERTEX_ATTRIB = 0x8626;
		WebGLContext.FRONT = 0x0404;
		WebGLContext.BACK = 0x0405;
		WebGLContext.CULL_FACE = 0x0B44;
		WebGLContext.FRONT_AND_BACK = 0x0408;
		WebGLContext.BLEND = 0x0BE2;
		WebGLContext.DITHER = 0x0BD0;
		WebGLContext.STENCIL_TEST = 0x0B90;
		WebGLContext.DEPTH_TEST = 0x0B71;
		WebGLContext.SCISSOR_TEST = 0x0C11;
		WebGLContext.POLYGON_OFFSET_FILL = 0x8037;
		WebGLContext.SAMPLE_ALPHA_TO_COVERAGE = 0x809E;
		WebGLContext.SAMPLE_COVERAGE = 0x80A0;
		WebGLContext.NO_ERROR = 0;
		WebGLContext.INVALID_ENUM = 0x0500;
		WebGLContext.INVALID_VALUE = 0x0501;
		WebGLContext.INVALID_OPERATION = 0x0502;
		WebGLContext.OUT_OF_MEMORY = 0x0505;
		WebGLContext.CW = 0x0900;
		WebGLContext.CCW = 0x0901;
		WebGLContext.LINE_WIDTH = 0x0B21;
		WebGLContext.ALIASED_POINT_SIZE_RANGE = 0x846D;
		WebGLContext.ALIASED_LINE_WIDTH_RANGE = 0x846E;
		WebGLContext.CULL_FACE_MODE = 0x0B45;
		WebGLContext.FRONT_FACE = 0x0B46;
		WebGLContext.DEPTH_RANGE = 0x0B70;
		WebGLContext.DEPTH_WRITEMASK = 0x0B72;
		WebGLContext.DEPTH_CLEAR_VALUE = 0x0B73;
		WebGLContext.DEPTH_FUNC = 0x0B74;
		WebGLContext.STENCIL_CLEAR_VALUE = 0x0B91;
		WebGLContext.STENCIL_FUNC = 0x0B92;
		WebGLContext.STENCIL_FAIL = 0x0B94;
		WebGLContext.STENCIL_PASS_DEPTH_FAIL = 0x0B95;
		WebGLContext.STENCIL_PASS_DEPTH_PASS = 0x0B96;
		WebGLContext.STENCIL_REF = 0x0B97;
		WebGLContext.STENCIL_VALUE_MASK = 0x0B93;
		WebGLContext.STENCIL_WRITEMASK = 0x0B98;
		WebGLContext.STENCIL_BACK_FUNC = 0x8800;
		WebGLContext.STENCIL_BACK_FAIL = 0x8801;
		WebGLContext.STENCIL_BACK_PASS_DEPTH_FAIL = 0x8802;
		WebGLContext.STENCIL_BACK_PASS_DEPTH_PASS = 0x8803;
		WebGLContext.STENCIL_BACK_REF = 0x8CA3;
		WebGLContext.STENCIL_BACK_VALUE_MASK = 0x8CA4;
		WebGLContext.STENCIL_BACK_WRITEMASK = 0x8CA5;
		WebGLContext.VIEWPORT = 0x0BA2;
		WebGLContext.SCISSOR_BOX = 0x0C10;
		WebGLContext.COLOR_CLEAR_VALUE = 0x0C22;
		WebGLContext.COLOR_WRITEMASK = 0x0C23;
		WebGLContext.UNPACK_ALIGNMENT = 0x0CF5;
		WebGLContext.PACK_ALIGNMENT = 0x0D05;
		WebGLContext.MAX_TEXTURE_SIZE = 0x0D33;
		WebGLContext.MAX_VIEWPORT_DIMS = 0x0D3A;
		WebGLContext.SUBPIXEL_BITS = 0x0D50;
		WebGLContext.RED_BITS = 0x0D52;
		WebGLContext.GREEN_BITS = 0x0D53;
		WebGLContext.BLUE_BITS = 0x0D54;
		WebGLContext.ALPHA_BITS = 0x0D55;
		WebGLContext.DEPTH_BITS = 0x0D56;
		WebGLContext.STENCIL_BITS = 0x0D57;
		WebGLContext.POLYGON_OFFSET_UNITS = 0x2A00;
		WebGLContext.POLYGON_OFFSET_FACTOR = 0x8038;
		WebGLContext.TEXTURE_BINDING_2D = 0x8069;
		WebGLContext.SAMPLE_BUFFERS = 0x80A8;
		WebGLContext.SAMPLES = 0x80A9;
		WebGLContext.SAMPLE_COVERAGE_VALUE = 0x80AA;
		WebGLContext.SAMPLE_COVERAGE_INVERT = 0x80AB;
		WebGLContext.NUM_COMPRESSED_TEXTURE_FORMATS = 0x86A2;
		WebGLContext.COMPRESSED_TEXTURE_FORMATS = 0x86A3;
		WebGLContext.DONT_CARE = 0x1100;
		WebGLContext.FASTEST = 0x1101;
		WebGLContext.NICEST = 0x1102;
		WebGLContext.GENERATE_MIPMAP_HINT = 0x8192;
		WebGLContext.BYTE = 0x1400;
		WebGLContext.UNSIGNED_BYTE = 0x1401;
		WebGLContext.SHORT = 0x1402;
		WebGLContext.UNSIGNED_SHORT = 0x1403;
		WebGLContext.INT = 0x1404;
		WebGLContext.UNSIGNED_INT = 0x1405;
		WebGLContext.FLOAT = 0x1406;
		WebGLContext.DEPTH_COMPONENT = 0x1902;
		WebGLContext.ALPHA = 0x1906;
		WebGLContext.RGB = 0x1907;
		WebGLContext.RGBA = 0x1908;
		WebGLContext.LUMINANCE = 0x1909;
		WebGLContext.LUMINANCE_ALPHA = 0x190A;
		WebGLContext.UNSIGNED_SHORT_4_4_4_4 = 0x8033;
		WebGLContext.UNSIGNED_SHORT_5_5_5_1 = 0x8034;
		WebGLContext.UNSIGNED_SHORT_5_6_5 = 0x8363;
		WebGLContext.FRAGMENT_SHADER = 0x8B30;
		WebGLContext.VERTEX_SHADER = 0x8B31;
		WebGLContext.MAX_VERTEX_ATTRIBS = 0x8869;
		WebGLContext.MAX_VERTEX_UNIFORM_VECTORS = 0x8DFB;
		WebGLContext.MAX_VARYING_VECTORS = 0x8DFC;
		WebGLContext.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 0x8B4D;
		WebGLContext.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0x8B4C;
		WebGLContext.MAX_TEXTURE_IMAGE_UNITS = 0x8872;
		WebGLContext.MAX_FRAGMENT_UNIFORM_VECTORS = 0x8DFD;
		WebGLContext.SHADER_TYPE = 0x8B4F;
		WebGLContext.DELETE_STATUS = 0x8B80;
		WebGLContext.LINK_STATUS = 0x8B82;
		WebGLContext.VALIDATE_STATUS = 0x8B83;
		WebGLContext.ATTACHED_SHADERS = 0x8B85;
		WebGLContext.ACTIVE_UNIFORMS = 0x8B86;
		WebGLContext.ACTIVE_ATTRIBUTES = 0x8B89;
		WebGLContext.SHADING_LANGUAGE_VERSION = 0x8B8C;
		WebGLContext.CURRENT_PROGRAM = 0x8B8D;
		WebGLContext.NEVER = 0x0200;
		WebGLContext.LESS = 0x0201;
		WebGLContext.EQUAL = 0x0202;
		WebGLContext.LEQUAL = 0x0203;
		WebGLContext.GREATER = 0x0204;
		WebGLContext.NOTEQUAL = 0x0205;
		WebGLContext.GEQUAL = 0x0206;
		WebGLContext.ALWAYS = 0x0207;
		WebGLContext.KEEP = 0x1E00;
		WebGLContext.REPLACE = 0x1E01;
		WebGLContext.INCR = 0x1E02;
		WebGLContext.DECR = 0x1E03;
		WebGLContext.INVERT = 0x150A;
		WebGLContext.INCR_WRAP = 0x8507;
		WebGLContext.DECR_WRAP = 0x8508;
		WebGLContext.VENDOR = 0x1F00;
		WebGLContext.RENDERER = 0x1F01;
		WebGLContext.VERSION = 0x1F02;
		WebGLContext.NEAREST = 0x2600;
		WebGLContext.LINEAR = 0x2601;
		WebGLContext.NEAREST_MIPMAP_NEAREST = 0x2700;
		WebGLContext.LINEAR_MIPMAP_NEAREST = 0x2701;
		WebGLContext.NEAREST_MIPMAP_LINEAR = 0x2702;
		WebGLContext.LINEAR_MIPMAP_LINEAR = 0x2703;
		WebGLContext.TEXTURE_MAG_FILTER = 0x2800;
		WebGLContext.TEXTURE_MIN_FILTER = 0x2801;
		WebGLContext.TEXTURE_WRAP_S = 0x2802;
		WebGLContext.TEXTURE_WRAP_T = 0x2803;
		WebGLContext.TEXTURE_2D = 0x0DE1;
		WebGLContext.TEXTURE = 0x1702;
		WebGLContext.TEXTURE_CUBE_MAP = 0x8513;
		WebGLContext.TEXTURE_BINDING_CUBE_MAP = 0x8514;
		WebGLContext.TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
		WebGLContext.TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
		WebGLContext.TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
		WebGLContext.TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
		WebGLContext.TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
		WebGLContext.TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
		WebGLContext.MAX_CUBE_MAP_TEXTURE_SIZE = 0x851C;
		WebGLContext.TEXTURE0 = 0x84C0;
		WebGLContext.TEXTURE1 = 0x84C1;
		WebGLContext.TEXTURE2 = 0x84C2;
		WebGLContext.TEXTURE3 = 0x84C3;
		WebGLContext.TEXTURE4 = 0x84C4;
		WebGLContext.TEXTURE5 = 0x84C5;
		WebGLContext.TEXTURE6 = 0x84C6;
		WebGLContext.TEXTURE7 = 0x84C7;
		WebGLContext.TEXTURE8 = 0x84C8;
		WebGLContext.TEXTURE9 = 0x84C9;
		WebGLContext.TEXTURE10 = 0x84CA;
		WebGLContext.TEXTURE11 = 0x84CB;
		WebGLContext.TEXTURE12 = 0x84CC;
		WebGLContext.TEXTURE13 = 0x84CD;
		WebGLContext.TEXTURE14 = 0x84CE;
		WebGLContext.TEXTURE15 = 0x84CF;
		WebGLContext.TEXTURE16 = 0x84D0;
		WebGLContext.TEXTURE17 = 0x84D1;
		WebGLContext.TEXTURE18 = 0x84D2;
		WebGLContext.TEXTURE19 = 0x84D3;
		WebGLContext.TEXTURE20 = 0x84D4;
		WebGLContext.TEXTURE21 = 0x84D5;
		WebGLContext.TEXTURE22 = 0x84D6;
		WebGLContext.TEXTURE23 = 0x84D7;
		WebGLContext.TEXTURE24 = 0x84D8;
		WebGLContext.TEXTURE25 = 0x84D9;
		WebGLContext.TEXTURE26 = 0x84DA;
		WebGLContext.TEXTURE27 = 0x84DB;
		WebGLContext.TEXTURE28 = 0x84DC;
		WebGLContext.TEXTURE29 = 0x84DD;
		WebGLContext.TEXTURE30 = 0x84DE;
		WebGLContext.TEXTURE31 = 0x84DF;
		WebGLContext.ACTIVE_TEXTURE = 0x84E0;
		WebGLContext.REPEAT = 0x2901;
		WebGLContext.CLAMP_TO_EDGE = 0x812F;
		WebGLContext.MIRRORED_REPEAT = 0x8370;
		WebGLContext.FLOAT_VEC2 = 0x8B50;
		WebGLContext.FLOAT_VEC3 = 0x8B51;
		WebGLContext.FLOAT_VEC4 = 0x8B52;
		WebGLContext.INT_VEC2 = 0x8B53;
		WebGLContext.INT_VEC3 = 0x8B54;
		WebGLContext.INT_VEC4 = 0x8B55;
		WebGLContext.BOOL = 0x8B56;
		WebGLContext.BOOL_VEC2 = 0x8B57;
		WebGLContext.BOOL_VEC3 = 0x8B58;
		WebGLContext.BOOL_VEC4 = 0x8B59;
		WebGLContext.FLOAT_MAT2 = 0x8B5A;
		WebGLContext.FLOAT_MAT3 = 0x8B5B;
		WebGLContext.FLOAT_MAT4 = 0x8B5C;
		WebGLContext.SAMPLER_2D = 0x8B5E;
		WebGLContext.SAMPLER_CUBE = 0x8B60;
		WebGLContext.VERTEX_ATTRIB_ARRAY_ENABLED = 0x8622;
		WebGLContext.VERTEX_ATTRIB_ARRAY_SIZE = 0x8623;
		WebGLContext.VERTEX_ATTRIB_ARRAY_STRIDE = 0x8624;
		WebGLContext.VERTEX_ATTRIB_ARRAY_TYPE = 0x8625;
		WebGLContext.VERTEX_ATTRIB_ARRAY_NORMALIZED = 0x886A;
		WebGLContext.VERTEX_ATTRIB_ARRAY_POINTER = 0x8645;
		WebGLContext.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 0x889F;
		WebGLContext.COMPILE_STATUS = 0x8B81;
		WebGLContext.LOW_FLOAT = 0x8DF0;
		WebGLContext.MEDIUM_FLOAT = 0x8DF1;
		WebGLContext.HIGH_FLOAT = 0x8DF2;
		WebGLContext.LOW_INT = 0x8DF3;
		WebGLContext.MEDIUM_INT = 0x8DF4;
		WebGLContext.HIGH_INT = 0x8DF5;
		WebGLContext.FRAMEBUFFER = 0x8D40;
		WebGLContext.RENDERBUFFER = 0x8D41;
		WebGLContext.RGBA4 = 0x8056;
		WebGLContext.RGB5_A1 = 0x8057;
		WebGLContext.RGB565 = 0x8D62;
		WebGLContext.DEPTH_COMPONENT16 = 0x81A5;
		WebGLContext.STENCIL_INDEX = 0x1901;
		WebGLContext.STENCIL_INDEX8 = 0x8D48;
		WebGLContext.DEPTH_STENCIL = 0x84F9;
		WebGLContext.RENDERBUFFER_WIDTH = 0x8D42;
		WebGLContext.RENDERBUFFER_HEIGHT = 0x8D43;
		WebGLContext.RENDERBUFFER_INTERNAL_FORMAT = 0x8D44;
		WebGLContext.RENDERBUFFER_RED_SIZE = 0x8D50;
		WebGLContext.RENDERBUFFER_GREEN_SIZE = 0x8D51;
		WebGLContext.RENDERBUFFER_BLUE_SIZE = 0x8D52;
		WebGLContext.RENDERBUFFER_ALPHA_SIZE = 0x8D53;
		WebGLContext.RENDERBUFFER_DEPTH_SIZE = 0x8D54;
		WebGLContext.RENDERBUFFER_STENCIL_SIZE = 0x8D55;
		WebGLContext.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 0x8CD0;
		WebGLContext.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 0x8CD1;
		WebGLContext.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 0x8CD2;
		WebGLContext.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 0x8CD3;
		WebGLContext.COLOR_ATTACHMENT0 = 0x8CE0;
		WebGLContext.DEPTH_ATTACHMENT = 0x8D00;
		WebGLContext.STENCIL_ATTACHMENT = 0x8D20;
		WebGLContext.DEPTH_STENCIL_ATTACHMENT = 0x821A;
		WebGLContext.NONE = 0;
		WebGLContext.FRAMEBUFFER_COMPLETE = 0x8CD5;
		WebGLContext.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 0x8CD6;
		WebGLContext.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 0x8CD7;
		WebGLContext.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 0x8CD9;
		WebGLContext.FRAMEBUFFER_UNSUPPORTED = 0x8CDD;
		WebGLContext.FRAMEBUFFER_BINDING = 0x8CA6;
		WebGLContext.RENDERBUFFER_BINDING = 0x8CA7;
		WebGLContext.MAX_RENDERBUFFER_SIZE = 0x84E8;
		WebGLContext.INVALID_FRAMEBUFFER_OPERATION = 0x0506;
		WebGLContext.UNPACK_FLIP_Y_WEBGL = 0x9240;
		WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 0x9241;
		WebGLContext.CONTEXT_LOST_WEBGL = 0x9242;
		WebGLContext.UNPACK_COLORSPACE_CONVERSION_WEBGL = 0x9243;
		WebGLContext.BROWSER_DEFAULT_WEBGL = 0x9244;
		WebGLContext._useProgram = null;
		WebGLContext._depthTest = true;
		WebGLContext._depthMask = true;
		WebGLContext._blend = false;
		WebGLContext._cullFace = false;
		WebGLContext.curBindTexTarget = null;
		WebGLContext.curBindTexValue = null;
		__static(WebGLContext,
			['_depthFunc', function () { return this._depthFunc =/*CLASS CONST:laya.webgl.WebGLContext.LESS*/0x0201; }, '_sFactor', function () { return this._sFactor =/*CLASS CONST:laya.webgl.WebGLContext.ONE*/1; }, '_dFactor', function () { return this._dFactor =/*CLASS CONST:laya.webgl.WebGLContext.ZERO*/0; }, '_frontFace', function () { return this._frontFace =/*CLASS CONST:laya.webgl.WebGLContext.CCW*/0x0901; }
			]);
		return WebGLContext;
	})()


	//class laya.webgl.display.GraphicsGL extends laya.display.Graphics
	var GraphicsGL = (function (_super) {
		function GraphicsGL() {
			GraphicsGL.__super.call(this);
		}

		__class(GraphicsGL, 'laya.webgl.display.GraphicsGL', _super);
		var __proto = GraphicsGL.prototype;
		__proto.setShader = function (shader) {
			this._saveToCmd(Render.context._setShader, [shader]);
		}

		__proto.setIBVB = function (x, y, ib, vb, numElement, shader) {
			this._saveToCmd(Render.context._setIBVB, [x, y, ib, vb, numElement, shader]);
		}

		__proto.drawParticle = function (x, y, ps) {
			var pt = RunDriver.createParticleTemplate2D(ps);
			pt.x = x;
			pt.y = y;
			this._saveToCmd(Render.context._drawParticle, [pt]);
		}

		return GraphicsGL;
	})(Graphics)


	//class laya.webgl.canvas.WebGLContext2D extends laya.resource.Context
	var WebGLContext2D = (function (_super) {
		var ContextParams;
		function WebGLContext2D(c) {
			this._x = 0;
			this._y = 0;
			this._id = ++WebGLContext2D._COUNT;
			//this._other=null;
			this._path = null;
			//this._primitiveValue2D=null;
			this._drawCount = 1;
			this._maxNumEle = 0;
			this._clear = false;
			this._isMain = false;
			this._atlasResourceChange = 0;
			this._submits = null;
			this._curSubmit = null;
			this._ib = null;
			this._vb = null;
			//this._curMat=null;
			this._nBlendType = 0;
			//this._save=null;
			//this._targets=null;
			//this._renderKey=NaN;
			this._saveMark = null;
			this._shader2D = null;
			/**所cacheAs精灵*/
			//this.sprite=null;
			/*******************************************start矢量绘制***************************************************/
			this.mId = -1;
			this.mHaveKey = false;
			this.mHaveLineKey = false;
			this.mX = 0;
			this.mY = 0;
			WebGLContext2D.__super.call(this);
			this._width = 99999999;
			this._height = 99999999;
			this._clipRect = WebGLContext2D.MAXCLIPRECT;
			this.mOutPoint
			this._canvas = c;
			WebGLContext2D._contextcount++;
			if (Render.isFlash) {
				this._ib = IndexBuffer2D.create(/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
				GlUtils.fillIBQuadrangle(this._ib, 16);
			} else
				this._ib = IndexBuffer2D.QuadrangleIB;
			this.clear();
		}

		__class(WebGLContext2D, 'laya.webgl.canvas.WebGLContext2D', _super);
		var __proto = WebGLContext2D.prototype;
		__proto.setIsMainContext = function () {
			this._isMain = true;
		}

		__proto.clearBG = function (r, g, b, a) {
			var gl = WebGL.mainContext;
			gl.clearColor(r, g, b, a);
			gl.clear(/*laya.webgl.WebGLContext.COLOR_BUFFER_BIT*/0x00004000);
		}

		__proto._getSubmits = function () {
			return this._submits;
		}

		__proto._releaseMem = function () {
			if (!this._submits)
				return;
			this._curMat.destroy();
			this._curMat = null;
			this._shader2D.destroy();
			this._shader2D = null;
			for (var i = 0, n = this._submits._length; i < n; i++)
				this._submits[i].releaseRender();
			this._submits.length = 0;
			this._submits._length = 0;
			this._submits = null;
			this._curSubmit = null;
			this._path && this._path.recover();
			this._path = null;
			this._other && (this._other.font = null);
			this._save = null;
			if (this._vb) {
				this._vb.releaseResource();
				this._vb.dispose();
				this._vb.destory();
				this._vb = null;
			}
		}

		__proto.destroy = function () {
			--WebGLContext2D._contextcount;
			this.sprite = null;
			this._releaseMem();
			this._targets && this._targets.destroy();
			this._targets = null;
			this._canvas = null;
			this._ib && (this._ib != IndexBuffer2D.QuadrangleIB) && this._ib.releaseResource();
		}

		__proto.clear = function () {
			if (!this._submits) {
				this._other = ContextParams.DEFAULT;
				this._curMat = Matrix.create();
				this._vb = VertexBuffer2D.create(-1);
				this._submits = [];
				this._save = [SaveMark.Create(this)];
				this._save.length = 10;
				this._shader2D = new Shader2D();
			}
			this._vb.clear();
			this._targets && (this._targets.repaint = true);
			this._other = ContextParams.DEFAULT;
			this._clear = true;
			this._repaint = false;
			this._drawCount = 1;
			this._renderKey = 0;
			this._other.lineWidth = this._shader2D.ALPHA = 1.0;
			this._nBlendType = 0;
			this._clipRect = WebGLContext2D.MAXCLIPRECT;
			this._curSubmit = Submit.RENDERBASE;
			this._shader2D.glTexture = null;
			this._shader2D.fillStyle = this._shader2D.strokeStyle = DrawStyle.DEFAULT;
			for (var i = 0, n = this._submits._length; i < n; i++)
				this._submits[i].releaseRender();
			this._submits._length = 0;
			this._curMat.identity();
			this._other.clear();
			this._saveMark = this._save[0];
			this._save._length = 1;
		}

		__proto.size = function (w, h) {
			if (this._width != w || this._height != h) {
				if (w == 0 || h == 0) {
					if (this._vb._byteLength != 0) {
						this._width = w;
						this._height = h;
						this._vb.clear();
						this._vb.upload();
					}
					for (var i = 0, n = this._submits._length; i < n; i++)
						this._submits[i].releaseRender();
					this._submits.length = 0;
					this._submits._length = 0;
					this._curSubmit = null;
					this._path && this._path.recover();
					this._path = null;
					this.sprite = null;
					this._targets && (this._targets.destroy());
					this._targets = null;
				} else {
					this._width = w;
					this._height = h;
					this._targets && (this._targets.size(w, h));
					this._canvas.memorySize -= this._canvas.memorySize;
				}
			}
			if (w === 0 && h === 0) this._releaseMem();
		}

		__proto._getTransformMatrix = function () {
			return this._curMat;
		}

		__proto.translate = function (x, y) {
			if (x !== 0 || y !== 0) {
				SaveTranslate.save(this);
				if (this._curMat.bTransform) {
					SaveTransform.save(this);
					this._curMat.transformPointN(Point.TEMP.setTo(x, y));
					x = Point.TEMP.x;
					y = Point.TEMP.y;
				}
				this._x += x;
				this._y += y;
			}
		}

		__proto.save = function () {
			this._save[this._save._length++] = SaveMark.Create(this);
		}

		__proto.restore = function () {
			var sz = this._save._length;
			if (sz < 1)
				return;
			for (var i = sz - 1; i >= 0; i--) {
				var o = this._save[i];
				o.restore(this);
				if (o.isSaveMark()) {
					this._save._length = i;
					return;
				}
			}
		}

		__proto._fillText = function (txt, words, x, y, fontStr, color, strokeColor, lineWidth, textAlign, underLine) {
			(underLine === void 0) && (underLine = 0);
			var shader = this._shader2D;
			var curShader = this._curSubmit.shaderValue;
			var font = fontStr ? FontInContext.create(fontStr) : this._other.font;
			if (AtlasResourceManager.enabled) {
				if (shader.ALPHA !== curShader.ALPHA)
					shader.glTexture = null;
				DrawText.drawText(this, txt, words, this._curMat, font, textAlign || this._other.textAlign, color, strokeColor, lineWidth, x, y, underLine);
			} else {
				var preDef = this._shader2D.defines.getValue();
				var colorAdd = color ? Color.create(color)._color : shader.colorAdd;
				if (shader.ALPHA !== curShader.ALPHA || colorAdd !== shader.colorAdd || curShader.colorAdd !== shader.colorAdd) {
					shader.glTexture = null;
					shader.colorAdd = colorAdd;
				}
				DrawText.drawText(this, txt, words, this._curMat, font, textAlign || this._other.textAlign, color, strokeColor, lineWidth, x, y, underLine);
			}
		}

		//TODO:实现下划线
		__proto.fillWords = function (words, x, y, fontStr, color, underLine) {
			this._fillText(null, words, x, y, fontStr, color, null, -1, null, underLine);
		}

		__proto.fillBorderWords = function (words, x, y, font, color, borderColor, lineWidth) {
			this._fillBorderText(null, words, x, y, font, color, borderColor, lineWidth, null);
		}

		__proto.fillText = function (txt, x, y, fontStr, color, textAlign) {
			this._fillText(txt, null, x, y, fontStr, color, null, -1, textAlign);
		}

		__proto.strokeText = function (txt, x, y, fontStr, color, lineWidth, textAlign) {
			this._fillText(txt, null, x, y, fontStr, null, color, lineWidth || 1, textAlign);
		}

		__proto.fillBorderText = function (txt, x, y, fontStr, fillColor, borderColor, lineWidth, textAlign) {
			this._fillBorderText(txt, null, x, y, fontStr, fillColor, borderColor, lineWidth, textAlign);
		}

		__proto._fillBorderText = function (txt, words, x, y, fontStr, fillColor, borderColor, lineWidth, textAlign) {
			if (!AtlasResourceManager.enabled) {
				this._fillText(txt, words, x, y, fontStr, null, borderColor, lineWidth || 1, textAlign);
				this._fillText(txt, words, x, y, fontStr, fillColor, null, -1, textAlign);
				return;
			};
			var shader = this._shader2D;
			var curShader = this._curSubmit.shaderValue;
			if (shader.ALPHA !== curShader.ALPHA)
				shader.glTexture = null;
			var font = fontStr ? (WebGLContext2D._fontTemp.setFont(fontStr), WebGLContext2D._fontTemp) : this._other.font;
			DrawText.drawText(this, txt, words, this._curMat, font, textAlign || this._other.textAlign, fillColor, borderColor, lineWidth || 1, x, y, 0);
		}

		__proto.fillRect = function (x, y, width, height, fillStyle) {
			var vb = this._vb;
			if (GlUtils.fillRectImgVb(vb, this._clipRect, x, y, width, height, Texture.DEF_UV, this._curMat, this._x, this._y, 0, 0)) {
				this._renderKey = 0;
				var pre = this._shader2D.fillStyle;
				fillStyle && (this._shader2D.fillStyle = DrawStyle.create(fillStyle));
				var shader = this._shader2D;
				var curShader = this._curSubmit.shaderValue;
				if (shader.fillStyle !== curShader.fillStyle || shader.ALPHA !== curShader.ALPHA) {
					shader.glTexture = null;
					var submit = this._curSubmit = Submit.createSubmit(this, this._ib, vb, ((vb._byteLength - 16 */*laya.webgl.utils.Buffer2D.FLOAT32*/4) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, 0));
					submit.shaderValue.color = shader.fillStyle._color._color;
					submit.shaderValue.ALPHA = shader.ALPHA;
					this._submits[this._submits._length++] = submit;
				}
				this._curSubmit._numEle += 6;
				this._shader2D.fillStyle = pre;
			}
		}

		__proto.fillTexture = function (texture, x, y, width, height, type, offset, other) {
			if (!(texture.loaded && texture.bitmap && texture.source)) {
				if (this.sprite) {
					Laya.timer.callLater(this, this._repaintSprite);
				}
				return;
			};
			var vb = this._vb;
			var w = texture.bitmap.width, h = texture.bitmap.height, uv = texture.uv;
			var ox = offset.x % texture.width, oy = offset.y % texture.height;
			if (w != other.w || h != other.h) {
				if (!other.w && !other.h) {
					other.oy = other.ox = 0;
					switch (type) {
						case "repeat":
							other.width = width;
							other.height = height;
							break;
						case "repeat-x":
							other.width = width;
							if (oy < 0) {
								if (texture.height + oy > height) {
									other.height = height;
								} else {
									other.height = texture.height + oy;
								}
							} else {
								other.oy = oy;
								if (texture.height + oy > height) {
									other.height = height - oy;
								} else {
									other.height = texture.height;
								}
							}
							break;
						case "repeat-y":
							if (ox < 0) {
								if (texture.width + ox > width) {
									other.width = width;
								} else {
									other.width = texture.width + ox;
								}
							} else {
								other.ox = ox;
								if (texture.width + ox > width) {
									other.width = width - ox;
								} else {
									other.width = texture.width;
								}
							}
							other.height = height;
							break;
						default:
							other.width = width;
							other.height = height;
							break;
					}
				}
				other.w = w;
				other.h = h;
				other.uv = [0, 0, other.width / w, 0, other.width / w, other.height / h, 0, other.height / h];
			}
			x += other.ox;
			y += other.oy;
			ox -= other.ox;
			oy -= other.oy;
			if (GlUtils.fillRectImgVb(vb, this._clipRect, x, y, other.width, other.height, other.uv, this._curMat, this._x, this._y, 0, 0)) {
				this._renderKey = 0;
				var submit = SubmitTexture.create(this, this._ib, vb, ((vb._byteLength - 16 */*laya.webgl.utils.Buffer2D.FLOAT32*/4) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.FILLTEXTURE*/0x100, 0));
				this._submits[this._submits._length++] = submit;
				var shaderValue = submit.shaderValue;
				shaderValue.textureHost = texture;
				var tTextureX = uv[0] * w;
				var tTextureY = uv[1] * h;
				var tTextureW = (uv[2] - uv[0]) * w;
				var tTextureH = (uv[5] - uv[3]) * h;
				var tx = -ox / w;
				var ty = -oy / h;
				shaderValue.u_TexRange[0] = tTextureX / w;
				shaderValue.u_TexRange[1] = tTextureW / w;
				shaderValue.u_TexRange[2] = tTextureY / h;
				shaderValue.u_TexRange[3] = tTextureH / h;
				shaderValue.u_offset[0] = tx;
				shaderValue.u_offset[1] = ty;
				if (AtlasResourceManager.enabled && !this._isMain)
					submit.addTexture(texture, (vb._byteLength >> 2) -/*CLASS CONST:laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16);
				this._curSubmit = submit;
				submit._renderType =/*laya.webgl.submit.Submit.TYPE_FILLTEXTURE*/10017;
				submit._numEle += 6;
			}
		}

		__proto.setShader = function (shader) {
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_SHADER*/0x100000, this._shader2D, true);
			this._shader2D.shader = shader;
		}

		__proto.setFilters = function (value) {
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_FILTERS*/0x200000, this._shader2D, true);
			this._shader2D.filters = value;
			this._curSubmit = Submit.RENDERBASE;
			this._renderKey = 0;
			this._drawCount++;
		}

		__proto.drawTexture = function (tex, x, y, width, height, tx, ty) {
			this._drawTextureM(tex, x, y, width, height, tx, ty, null, 1);
		}

		__proto.addTextureVb = function (invb, x, y) {
			var finalVB = this._curSubmit._vb || this._vb;
			var vpos = (finalVB._byteLength >> 2);
			finalVB.byteLength = ((vpos +/*CLASS CONST:laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16) << 2);
			var vbdata = finalVB.getFloat32Array();
			for (var i = 0, ci = 0; i < 16; i += 4) {
				vbdata[vpos++] = invb[i] + x;
				vbdata[vpos++] = invb[i + 1] + y;
				vbdata[vpos++] = invb[i + 2];
				vbdata[vpos++] = invb[i + 3];
			}
			this._curSubmit._numEle += 6;
			this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle);
			finalVB._upload = true;
		}

		__proto.willDrawTexture = function (tex, alpha) {
			if (!(tex.loaded && tex.bitmap && tex.source)) {
				if (this.sprite) {
					Laya.timer.callLater(this, this._repaintSprite);
				}
				return 0;
			};
			var webGLImg = tex.bitmap;
			var rid = webGLImg.id + this._shader2D.ALPHA * alpha +/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016;
			if (rid == this._renderKey) return rid;
			var shader = this._shader2D;
			var preAlpha = shader.ALPHA;
			var curShader = this._curSubmit.shaderValue;
			shader.ALPHA *= alpha;
			this._renderKey = rid;
			this._drawCount++;
			shader.glTexture = webGLImg;
			var vb = this._vb;
			var submit = null;
			var vbSize = (vb._byteLength / 32) * 3;
			submit = SubmitTexture.create(this, this._ib, vb, vbSize, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0));
			this._submits[this._submits._length++] = submit;
			submit.shaderValue.textureHost = tex;
			submit._renderType =/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016;
			submit._preIsSameTextureShader = this._curSubmit._renderType ===/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016 && shader.ALPHA === curShader.ALPHA;
			this._curSubmit = submit;
			shader.ALPHA = preAlpha;
			return rid;
		}

		__proto.drawTextures = function (tex, pos, tx, ty) {
			if (!(tex.loaded && tex.bitmap && tex.source)) {
				this.sprite && Laya.timer.callLater(this, this._repaintSprite);
				return;
			};
			var pre = this._clipRect;
			this._clipRect = WebGLContext2D.MAXCLIPRECT;
			if (!this._drawTextureM(tex, pos[0], pos[1], tex.width, tex.height, tx, ty, null, 1)) {
				alert("drawTextures err");
				return;
			}
			this._clipRect = pre;
			Stat.drawCall++;
			if (pos.length < 4)
				return;
			var finalVB = this._curSubmit._vb || this._vb;
			var sx = this._curMat.a, sy = this._curMat.d;
			for (var i = 2, sz = pos.length; i < sz; i += 2) {
				GlUtils.copyPreImgVb(finalVB, (pos[i] - pos[i - 2]) * sx, (pos[i + 1] - pos[i - 1]) * sy);
				this._curSubmit._numEle += 6;
			}
			this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle);
		}

		__proto._drawTextureM = function (tex, x, y, width, height, tx, ty, m, alpha) {
			if (!(tex.loaded && tex.source)) {
				if (this.sprite) {
					Laya.timer.callLater(this, this._repaintSprite);
				}
				return false;
			};
			var finalVB = this._curSubmit._vb || this._vb;
			var webGLImg = tex.bitmap;
			x += tx;
			y += ty;
			this._drawCount++;
			var rid = webGLImg.id + this._shader2D.ALPHA * alpha +/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016;
			if (rid != this._renderKey) {
				this._renderKey = rid;
				var curShader = this._curSubmit.shaderValue;
				var shader = this._shader2D;
				var alphaBack = shader.ALPHA;
				shader.ALPHA *= alpha;
				shader.glTexture = webGLImg;
				var vb = this._vb;
				var submit = null;
				var vbSize = (vb._byteLength / 32) * 3;
				submit = SubmitTexture.create(this, this._ib, vb, vbSize, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0));
				this._submits[this._submits._length++] = submit;
				submit.shaderValue.textureHost = tex;
				submit._renderType =/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016;
				submit._preIsSameTextureShader = this._curSubmit._renderType ===/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016 && shader.ALPHA === curShader.ALPHA;
				this._curSubmit = submit;
				finalVB = this._curSubmit._vb || this._vb;
				shader.ALPHA = alphaBack;
			}
			if (GlUtils.fillRectImgVb(finalVB, this._clipRect, x, y, width || tex.width, height || tex.height, tex.uv, m || this._curMat, this._x, this._y, 0, 0)) {
				if (AtlasResourceManager.enabled && !this._isMain)
					(this._curSubmit).addTexture(tex, (finalVB._byteLength >> 2) -/*CLASS CONST:laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16);
				this._curSubmit._numEle += 6;
				this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle);
				return true;
			}
			return false;
		}

		__proto._repaintSprite = function () {
			if (this.sprite)
				this.sprite.repaint();
		}

		//}
		__proto._drawText = function (tex, x, y, width, height, m, tx, ty, dx, dy) {
			var webGLImg = tex.bitmap;
			this._drawCount++;
			var rid = webGLImg.id + this._shader2D.ALPHA +/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016;
			if (rid != this._renderKey) {
				this._renderKey = rid;
				var curShader = this._curSubmit.shaderValue;
				var shader = this._shader2D;
				shader.glTexture = webGLImg;
				var vb = this._vb;
				var submit = null;
				var submitID = NaN;
				var vbSize = (vb._byteLength / 32) * 3;
				if (AtlasResourceManager.enabled) {
					submit = SubmitTexture.create(this, this._ib, vb, vbSize, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0));
				} else {
					submit = SubmitTexture.create(this, this._ib, vb, vbSize, TextSV.create());
				}
				submit._preIsSameTextureShader = this._curSubmit._renderType ===/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016 && shader.ALPHA === curShader.ALPHA;
				this._submits[this._submits._length++] = submit;
				submit.shaderValue.textureHost = tex;
				submit._renderType =/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016;
				this._curSubmit = submit;
			}
			tex.active();
			var finalVB = this._curSubmit._vb || this._vb;
			if (GlUtils.fillRectImgVb(finalVB, this._clipRect, x + tx, y + ty, width || tex.width, height || tex.height, tex.uv, m || this._curMat, this._x, this._y, dx, dy, true)) {
				if (AtlasResourceManager.enabled && !this._isMain) {
					(this._curSubmit).addTexture(tex, (finalVB._byteLength >> 2) -/*CLASS CONST:laya.webgl.canvas.WebGLContext2D._RECTVBSIZE*/16);
				}
				this._curSubmit._numEle += 6;
				this._maxNumEle = Math.max(this._maxNumEle, this._curSubmit._numEle);
			}
		}

		__proto.drawTextureWithTransform = function (tex, x, y, width, height, transform, tx, ty, alpha) {
			if (!transform) {
				this._drawTextureM(tex, x, y, width, height, tx, ty, null, alpha);
				return;
			};
			var curMat = this._curMat;
			var prex = this._x;
			var prey = this._y;
			(tx !== 0 || ty !== 0) && (this._x = tx * curMat.a + ty * curMat.c, this._y = ty * curMat.d + tx * curMat.b);
			if (transform && curMat.bTransform) {
				Matrix.mul(transform, curMat, WebGLContext2D._tmpMatrix);
				transform = WebGLContext2D._tmpMatrix;
				transform._checkTransform();
			} else {
				this._x += curMat.tx;
				this._y += curMat.ty;
			}
			this._drawTextureM(tex, x, y, width, height, 0, 0, transform, alpha);
			this._x = prex;
			this._y = prey;
		}

		__proto.fillQuadrangle = function (tex, x, y, point4, m) {
			var submit = this._curSubmit;
			var vb = this._vb;
			var shader = this._shader2D;
			var curShader = submit.shaderValue;
			this._renderKey = 0;
			if (tex.bitmap) {
				var t_tex = tex.bitmap;
				if (shader.glTexture != t_tex || shader.ALPHA !== curShader.ALPHA) {
					shader.glTexture = t_tex;
					submit = this._curSubmit = Submit.createSubmit(this, this._ib, vb, ((vb._byteLength) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0));
					submit.shaderValue.glTexture = t_tex;
					this._submits[this._submits._length++] = submit;
				}
				GlUtils.fillQuadrangleImgVb(vb, x, y, point4, tex.uv, m || this._curMat, this._x, this._y);
			} else {
				if (!submit.shaderValue.fillStyle || !submit.shaderValue.fillStyle.equal(tex) || shader.ALPHA !== curShader.ALPHA) {
					shader.glTexture = null;
					submit = this._curSubmit = Submit.createSubmit(this, this._ib, vb, ((vb._byteLength) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, 0));
					submit.shaderValue.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02);
					submit.shaderValue.fillStyle = DrawStyle.create(tex);
					this._submits[this._submits._length++] = submit;
				}
				GlUtils.fillQuadrangleImgVb(vb, x, y, point4, Texture.DEF_UV, m || this._curMat, this._x, this._y);
			}
			submit._numEle += 6;
		}

		__proto.drawTexture2 = function (x, y, pivotX, pivotY, transform, alpha, blendMode, args) {
			if (alpha == 0) return;
			var curMat = this._curMat;
			this._x = x * curMat.a + y * curMat.c;
			this._y = y * curMat.d + x * curMat.b;
			if (transform) {
				if (curMat.bTransform || transform.bTransform) {
					Matrix.mul(transform, curMat, WebGLContext2D._tmpMatrix);
					transform = WebGLContext2D._tmpMatrix;
				} else {
					this._x += transform.tx + curMat.tx;
					this._y += transform.ty + curMat.ty;
					transform = Matrix.EMPTY;
				}
			}
			if (alpha === 1 && !blendMode)
				this._drawTextureM(args[0], args[1] - pivotX, args[2] - pivotY, args[3], args[4], 0, 0, transform, 1);
			else {
				var preAlpha = this._shader2D.ALPHA;
				var preblendType = this._nBlendType;
				this._shader2D.ALPHA = alpha;
				blendMode && (this._nBlendType = BlendMode.TOINT(blendMode));
				this._drawTextureM(args[0], args[1] - pivotX, args[2] - pivotY, args[3], args[4], 0, 0, transform, 1);
				this._shader2D.ALPHA = preAlpha;
				this._nBlendType = preblendType;
			}
			this._x = this._y = 0;
		}

		__proto.drawCanvas = function (canvas, x, y, width, height) {
			var src = canvas.context;
			this._renderKey = 0;
			if (src._targets) {
				this._submits[this._submits._length++] = SubmitCanvas.create(src, 0, null);
				this._curSubmit = Submit.RENDERBASE;
				src._targets.drawTo(this, x, y, width, height);
			} else {
				var submit = this._submits[this._submits._length++] = SubmitCanvas.create(src, this._shader2D.ALPHA, this._shader2D.filters);
				var sx = width / canvas.width;
				var sy = height / canvas.height;
				var mat = submit._matrix;
				this._curMat.copyTo(mat);
				sx != 1 && sy != 1 && mat.scale(sx, sy);
				var tx = mat.tx, ty = mat.ty;
				mat.tx = mat.ty = 0;
				mat.transformPoint(Point.TEMP.setTo(x, y));
				mat.translate(Point.TEMP.x + tx, Point.TEMP.y + ty);
				this._curSubmit = Submit.RENDERBASE;
			}
			if (Config.showCanvasMark) {
				this.save();
				this.lineWidth = 4;
				this.strokeStyle = src._targets ? "yellow" : "green";
				this.strokeRect(x - 1, y - 1, width + 2, height + 2, 1);
				this.strokeRect(x, y, width, height, 1);
				this.restore();
			}
		}

		__proto.drawTarget = function (scope, x, y, width, height, m, proName, shaderValue, uv, blend) {
			(blend === void 0) && (blend = -1);
			var vb = this._vb;
			if (GlUtils.fillRectImgVb(vb, this._clipRect, x, y, width, height, uv || Texture.DEF_UV, m || this._curMat, this._x, this._y, 0, 0)) {
				this._renderKey = 0;
				var shader = this._shader2D;
				shader.glTexture = null;
				var curShader = this._curSubmit.shaderValue;
				var submit = this._curSubmit = SubmitTarget.create(this, this._ib, vb, ((vb._byteLength - 16 */*laya.webgl.utils.Buffer2D.FLOAT32*/4) / 32) * 3, shaderValue, proName);
				if (blend == -1) {
					submit.blendType = this._nBlendType;
				} else {
					submit.blendType = blend;
				}
				submit.scope = scope;
				this._submits[this._submits._length++] = submit;
				this._curSubmit._numEle += 6;
			}
		}

		__proto.transform = function (a, b, c, d, tx, ty) {
			SaveTransform.save(this);
			Matrix.mul(Matrix.TEMP.setTo(a, b, c, d, tx, ty), this._curMat, this._curMat);
			this._curMat._checkTransform();
		}

		__proto.setTransformByMatrix = function (value) {
			value.copyTo(this._curMat);
		}

		__proto.transformByMatrix = function (value) {
			SaveTransform.save(this);
			Matrix.mul(value, this._curMat, this._curMat);
			this._curMat._checkTransform();
		}

		__proto.rotate = function (angle) {
			SaveTransform.save(this);
			this._curMat.rotateEx(angle);
		}

		__proto.scale = function (scaleX, scaleY) {
			SaveTransform.save(this);
			this._curMat.scaleEx(scaleX, scaleY);
		}

		__proto.clipRect = function (x, y, width, height) {
			if (this._curMat.b != 0 || this._curMat.c != 0) {
				this._renderKey = 0;
				var submitStencil0 = SubmitStencil.create(4);
				this.addRenderObject(submitStencil0);
				var vb = this._vb;
				var nPos = (vb._byteLength >> 2);
				if (GlUtils.fillRectImgVb(vb, null, x, y, width, height, Texture.DEF_UV, this._curMat, this._x, this._y, 0, 0)) {
					var shader = this._shader2D;
					shader.glTexture = null;
					var submit = this._curSubmit = Submit.createSubmit(this, this._ib, vb, ((vb._byteLength - 16 */*laya.webgl.utils.Buffer2D.FLOAT32*/4) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, 0));
					submit.shaderValue.ALPHA = 1.0;
					this._submits[this._submits._length++] = submit;
					this._curSubmit._numEle += 6;
				} else {
					alert("clipRect calc stencil rect error");
				};
				var submitStencil1 = SubmitStencil.create(5);
				this.addRenderObject(submitStencil1);
				var vbdata = vb.getFloat32Array();
				var minx = Math.min(Math.min(Math.min(vbdata[nPos + 0], vbdata[nPos + 4]), vbdata[nPos + 8]), vbdata[nPos + 12]);
				var maxx = Math.max(Math.max(Math.max(vbdata[nPos + 0], vbdata[nPos + 4]), vbdata[nPos + 8]), vbdata[nPos + 12]);
				var miny = Math.min(Math.min(Math.min(vbdata[nPos + 1], vbdata[nPos + 5]), vbdata[nPos + 9]), vbdata[nPos + 13]);
				var maxy = Math.max(Math.max(Math.max(vbdata[nPos + 1], vbdata[nPos + 5]), vbdata[nPos + 9]), vbdata[nPos + 13]);
				SaveClipRectStencil.save(this, submitStencil1, x, y, width, height, minx, miny, maxx - minx, maxy - miny);
				this._curSubmit = Submit.RENDERBASE;
			} else {
				width *= this._curMat.a;
				height *= this._curMat.d;
				var p = Point.TEMP;
				this._curMat.transformPoint(p.setTo(x, y));
				if (width < 0) {
					p.x = p.x + width;
					width = -width;
				}
				if (height < 0) {
					p.y = p.y + height;
					height = -height;
				}
				this._renderKey = 0;
				var submitSc = this._curSubmit = SubmitScissor.create(this);
				this._submits[this._submits._length++] = submitSc;
				submitSc.submitIndex = this._submits._length;
				submitSc.submitLength = 9999999;
				SaveClipRect.save(this, submitSc);
				var clip = this._clipRect;
				var x1 = clip.x, y1 = clip.y;
				var r = p.x + width, b = p.y + height;
				x1 < p.x && (clip.x = p.x);
				y1 < p.y && (clip.y = p.y);
				clip.width = Math.min(r, x1 + clip.width) - clip.x;
				clip.height = Math.min(b, y1 + clip.height) - clip.y;
				this._shader2D.glTexture = null;
				submitSc.clipRect.copyFrom(clip);
				this._curSubmit = Submit.RENDERBASE;
			}
		}

		__proto.setIBVB = function (x, y, ib, vb, numElement, mat, shader, shaderValues, startIndex, offset, type) {
			(startIndex === void 0) && (startIndex = 0);
			(offset === void 0) && (offset = 0);
			(type === void 0) && (type = 0);
			if (ib === null) {
				if (!Render.isFlash) {
					ib = this._ib;
				} else {
					var falshVB = vb;
					(falshVB._selfIB) || (falshVB._selfIB = IndexBuffer2D.create(/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4));
					falshVB._selfIB.clear();
					ib = falshVB._selfIB;
				}
				GlUtils.expandIBQuadrangle(ib, (vb._byteLength / (/*laya.webgl.utils.Buffer2D.FLOAT32*/4 * vb.vertexStride * 4)));
			}
			if (!shaderValues || !shader)
				throw Error("setIBVB must input:shader shaderValues");
			var submit = SubmitOtherIBVB.create(this, vb, ib, numElement, shader, shaderValues, startIndex, offset, type);
			mat || (mat = Matrix.EMPTY);
			mat.translate(x, y);
			Matrix.mul(mat, this._curMat, submit._mat);
			mat.translate(-x, -y);
			this._submits[this._submits._length++] = submit;
			this._curSubmit = Submit.RENDERBASE;
			this._renderKey = 0;
		}

		__proto.addRenderObject = function (o) {
			this._submits[this._submits._length++] = o;
		}

		__proto.fillTrangles = function (tex, x, y, points, m) {
			var submit = this._curSubmit;
			var vb = this._vb;
			var shader = this._shader2D;
			var curShader = submit.shaderValue;
			var length = points.length >> 4;
			var t_tex = tex.bitmap;
			this._renderKey = 0;
			if (shader.glTexture != t_tex || shader.ALPHA !== curShader.ALPHA) {
				submit = this._curSubmit = Submit.createSubmit(this, this._ib, vb, ((vb._byteLength) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0));
				submit.shaderValue.textureHost = tex;
				this._submits[this._submits._length++] = submit;
			}
			GlUtils.fillTranglesVB(vb, x, y, points, m || this._curMat, this._x, this._y);
			submit._numEle += length * 6;
		}

		__proto.submitElement = function (start, end) {
			var renderList = this._submits;
			end < 0 && (end = renderList._length);
			while (start < end) {
				start += renderList[start].renderSubmit();
			}
		}

		__proto.finish = function () {
			WebGL.mainContext.finish();
		}

		__proto.flush = function () {
			var maxNum = Math.max(this._vb._byteLength / (/*laya.webgl.utils.Buffer2D.FLOAT32*/4 * 16), this._maxNumEle / 6) + 8;
			if (maxNum > (this._ib.bufferLength / (6 */*laya.webgl.utils.Buffer2D.SHORT*/2))) {
				GlUtils.expandIBQuadrangle(this._ib, maxNum);
			}
			if (!this._isMain && AtlasResourceManager.enabled && AtlasResourceManager._atlasRestore > this._atlasResourceChange) {
				this._atlasResourceChange = AtlasResourceManager._atlasRestore;
				var renderList = this._submits;
				for (var i = 0, s = renderList._length; i < s; i++) {
					var submit = renderList[i];
					if (submit.getRenderType() ===/*laya.webgl.submit.Submit.TYPE_TEXTURE*/10016)
						(submit).checkTexture();
				}
			}
			this.submitElement(0, this._submits._length);
			this._path && this._path.reset();
			SkinMeshBuffer.instance && SkinMeshBuffer.getInstance().reset();
			this._curSubmit = Submit.RENDERBASE;
			this._renderKey = 0;
			return this._submits._length;
		}

		__proto.setPathId = function (id) {
			this.mId = id;
			if (this.mId != -1) {
				this.mHaveKey = false;
				var tVGM = VectorGraphManager.getInstance();
				if (tVGM.shapeDic[this.mId]) {
					this.mHaveKey = true;
				}
				this.mHaveLineKey = false;
				if (tVGM.shapeLineDic[this.mId]) {
					this.mHaveLineKey = true;
				}
			}
		}

		__proto.movePath = function (x, y) {
			var _x1 = x, _y1 = y;
			x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
			y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			this.mX += x;
			this.mY += y;
		}

		__proto.beginPath = function () {
			var tPath = this._getPath();
			tPath.tempArray.length = 0;
			tPath.closePath = false;
			this.mX = 0;
			this.mY = 0;
		}

		__proto.closePath = function () {
			this._path.closePath = true;
		}

		__proto.fill = function (isConvexPolygon) {
			(isConvexPolygon === void 0) && (isConvexPolygon = false);
			var tPath = this._getPath();
			this.drawPoly(0, 0, tPath.tempArray, this.fillStyle._color.numColor, 0, 0, isConvexPolygon);
		}

		__proto.stroke = function () {
			var tPath = this._getPath();
			if (this.lineWidth > 0) {
				if (this.mId == -1) {
					tPath.drawLine(0, 0, tPath.tempArray, this.lineWidth, this.strokeStyle._color.numColor);
				} else {
					if (this.mHaveLineKey) {
						var tShapeLine = VectorGraphManager.getInstance().shapeLineDic[this.mId];
						tShapeLine.rebuild(tPath.tempArray);
						tPath.setGeomtry(tShapeLine);
					} else {
						VectorGraphManager.getInstance().addLine(this.mId, tPath.drawLine(0, 0, tPath.tempArray, this.lineWidth, this.strokeStyle._color.numColor));
					}
				}
				tPath.update();
				var tPosArray = [this.mX, this.mY];
				var tempSubmit = Submit.createShape(this, tPath.ib, tPath.vb, tPath.count, tPath.offset, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0));
				tempSubmit.shaderValue.ALPHA = this._shader2D.ALPHA;
				(tempSubmit.shaderValue).u_pos = tPosArray;
				tempSubmit.shaderValue.u_mmat2 = RenderState2D.TEMPMAT4_ARRAY;
				this._submits[this._submits._length++] = tempSubmit;
			}
		}

		__proto.line = function (fromX, fromY, toX, toY, lineWidth, mat) {
			var submit = this._curSubmit;
			var vb = this._vb;
			if (GlUtils.fillLineVb(vb, this._clipRect, fromX, fromY, toX, toY, lineWidth, mat)) {
				this._renderKey = 0;
				var shader = this._shader2D;
				var curShader = submit.shaderValue;
				if (shader.strokeStyle !== curShader.strokeStyle || shader.ALPHA !== curShader.ALPHA) {
					shader.glTexture = null;
					submit = this._curSubmit = Submit.createSubmit(this, this._ib, vb, ((vb._byteLength - 16 */*laya.webgl.utils.Buffer2D.FLOAT32*/4) / 32) * 3, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, 0));
					submit.shaderValue.strokeStyle = shader.strokeStyle;
					submit.shaderValue.mainID =/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02;
					submit.shaderValue.ALPHA = shader.ALPHA;
					this._submits[this._submits._length++] = submit;
				}
				submit._numEle += 6;
			}
		}

		__proto.moveTo = function (x, y, b) {
			(b === void 0) && (b = true);
			var tPath = this._getPath();
			if (b) {
				var _x1 = x, _y1 = y;
				x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
				y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			}
			tPath.addPoint(x, y);
		}

		__proto.lineTo = function (x, y, b) {
			(b === void 0) && (b = true);
			var tPath = this._getPath();
			if (b) {
				var _x1 = x, _y1 = y;
				x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
				y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			}
			tPath.addPoint(x, y);
		}

		__proto.drawCurves = function (x, y, args) {
			this.setPathId(-1);
			this.beginPath();
			this.strokeStyle = args[3];
			this.lineWidth = args[4];
			var points = args[2];
			x += args[0], y += args[1];
			this.movePath(x, y);
			this.moveTo(points[0], points[1]);
			var i = 2, n = points.length;
			while (i < n) {
				this.quadraticCurveTo(points[i++], points[i++], points[i++], points[i++]);
			}
			this.stroke();
		}

		__proto.arcTo = function (x1, y1, x2, y2, r) {
			if (this.mId != -1) {
				if (this.mHaveKey) {
					return;
				}
			};
			var i = 0;
			var x = 0, y = 0;
			var tPath = this._getPath();
			this._curMat.copyTo(WebGLContext2D._tmpMatrix);
			WebGLContext2D._tmpMatrix.tx = WebGLContext2D._tmpMatrix.ty = 0;
			WebGLContext2D._tempPoint.setTo(tPath.getEndPointX(), tPath.getEndPointY());
			WebGLContext2D._tmpMatrix.invertTransformPoint(WebGLContext2D._tempPoint);
			var dx = WebGLContext2D._tempPoint.x - x1;
			var dy = WebGLContext2D._tempPoint.y - y1;
			var len1 = Math.sqrt(dx * dx + dy * dy);
			if (len1 <= 0.000001) {
				return;
			};
			var ndx = dx / len1;
			var ndy = dy / len1;
			var dx2 = x2 - x1;
			var dy2 = y2 - y1;
			var len22 = dx2 * dx2 + dy2 * dy2;
			var len2 = Math.sqrt(len22);
			if (len2 <= 0.000001) {
				return;
			};
			var ndx2 = dx2 / len2;
			var ndy2 = dy2 / len2;
			var odx = ndx + ndx2;
			var ody = ndy + ndy2;
			var olen = Math.sqrt(odx * odx + ody * ody);
			if (olen <= 0.000001) {
				return;
			};
			var nOdx = odx / olen;
			var nOdy = ody / olen;
			var alpha = Math.acos(nOdx * ndx + nOdy * ndy);
			var halfAng = Math.PI / 2 - alpha;
			len1 = r / Math.tan(halfAng);
			var ptx1 = len1 * ndx + x1;
			var pty1 = len1 * ndy + y1;
			var orilen = Math.sqrt(len1 * len1 + r * r);
			var orix = x1 + nOdx * orilen;
			var oriy = y1 + nOdy * orilen;
			var ptx2 = len1 * ndx2 + x1;
			var pty2 = len1 * ndy2 + y1;
			var dir = ndx * ndy2 - ndy * ndx2;
			var fChgAng = 0;
			var sinx = 0.0;
			var cosx = 0.0;
			if (dir >= 0) {
				fChgAng = halfAng * 2;
				var fda = fChgAng / WebGLContext2D.SEGNUM;
				sinx = Math.sin(fda);
				cosx = Math.cos(fda);
			}
			else {
				fChgAng = -halfAng * 2;
				fda = fChgAng / WebGLContext2D.SEGNUM;
				sinx = Math.sin(fda);
				cosx = Math.cos(fda);
			}
			x = this._curMat.a * ptx1 + this._curMat.c * pty1 + this._curMat.tx;
			y = this._curMat.b * ptx1 + this._curMat.d * pty1 + this._curMat.ty;
			if (x != this._path.getEndPointX() || y != this._path.getEndPointY()) {
				tPath.addPoint(x, y);
			};
			var cvx = ptx1 - orix;
			var cvy = pty1 - oriy;
			var tx = 0.0;
			var ty = 0.0;
			for (i = 0; i < WebGLContext2D.SEGNUM; i++) {
				var cx = cvx * cosx + cvy * sinx;
				var cy = -cvx * sinx + cvy * cosx;
				x = cx + orix;
				y = cy + oriy;
				x1 = this._curMat.a * x + this._curMat.c * y + this._curMat.tx;
				y1 = this._curMat.b * x + this._curMat.d * y + this._curMat.ty;
				x = x1;
				y = y1;
				if (x != this._path.getEndPointX() || y != this._path.getEndPointY()) {
					tPath.addPoint(x, y);
				}
				cvx = cx;
				cvy = cy;
			}
		}

		__proto.arc = function (cx, cy, r, startAngle, endAngle, counterclockwise, b) {
			(counterclockwise === void 0) && (counterclockwise = false);
			(b === void 0) && (b = true);
			if (this.mId != -1) {
				var tShape = VectorGraphManager.getInstance().shapeDic[this.mId];
				if (tShape) {
					if (this.mHaveKey && !tShape.needUpdate(this._curMat))
						return;
				}
				cx = 0;
				cy = 0;
			};
			var a = 0, da = 0, hda = 0, kappa = 0;
			var dx = 0, dy = 0, x = 0, y = 0, tanx = 0, tany = 0;
			var px = 0, py = 0, ptanx = 0, ptany = 0;
			var i = 0, ndivs = 0, nvals = 0;
			da = endAngle - startAngle;
			if (!counterclockwise) {
				if (Math.abs(da) >= Math.PI * 2) {
					da = Math.PI * 2;
				} else {
					while (da < 0.0) {
						da += Math.PI * 2;
					}
				}
			} else {
				if (Math.abs(da) >= Math.PI * 2) {
					da = -Math.PI * 2;
				} else {
					while (da > 0.0) {
						da -= Math.PI * 2;
					}
				}
			}
			if (r < 101) {
				ndivs = Math.max(10, da * r / 5);
			} else if (r < 201) {
				ndivs = Math.max(10, da * r / 20);
			} else {
				ndivs = Math.max(10, da * r / 40);
			}
			hda = (da / ndivs) / 2.0;
			kappa = Math.abs(4 / 3 * (1 - Math.cos(hda)) / Math.sin(hda));
			if (counterclockwise)
				kappa = -kappa;
			nvals = 0;
			var tPath = this._getPath();
			var _x1 = NaN, _y1 = NaN;
			for (i = 0; i <= ndivs; i++) {
				a = startAngle + da * (i / ndivs);
				dx = Math.cos(a);
				dy = Math.sin(a);
				x = cx + dx * r;
				y = cy + dy * r;
				if (b) {
					_x1 = x, _y1 = y;
					x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
					y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
				}
				if (x != this._path.getEndPointX() || y != this._path.getEndPointY()) {
					tPath.addPoint(x, y);
				}
			}
			dx = Math.cos(endAngle);
			dy = Math.sin(endAngle);
			x = cx + dx * r;
			y = cy + dy * r;
			if (b) {
				_x1 = x, _y1 = y;
				x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
				y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			}
			if (x != this._path.getEndPointX() || y != this._path.getEndPointY()) {
				tPath.addPoint(x, y);
			}
		}

		__proto.quadraticCurveTo = function (cpx, cpy, x, y) {
			var tBezier = Bezier.I;
			var tResultArray = [];
			var _x1 = x, _y1 = y;
			x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
			y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			_x1 = cpx, _y1 = cpy;
			cpx = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
			cpy = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			var tArray = tBezier.getBezierPoints([this._path.getEndPointX(), this._path.getEndPointY(), cpx, cpy, x, y], 30, 2);
			for (var i = 0, n = tArray.length / 2; i < n; i++) {
				this.lineTo(tArray[i * 2], tArray[i * 2 + 1], false);
			}
			this.lineTo(x, y, false);
		}

		__proto.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y) {
			var tBezier = Bezier.I;
			var tResultArray = [];
			var _x1 = x, _y1 = y;
			x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
			y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			_x1 = cp1x, _y1 = cp1y;
			cp1x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
			cp1y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			_x1 = cp2x, _y1 = cp2y;
			cp2x = this._curMat.a * _x1 + this._curMat.c * _y1 + this._curMat.tx;
			cp2y = this._curMat.b * _x1 + this._curMat.d * _y1 + this._curMat.ty;
			var sx = this._path.getEndPointX();
			var sy = this._path.getEndPointY();
			if (sx == undefined || isNaN(sx)) {
				sx = 0;
			}
			if (sy == undefined || isNaN(sy)) {
				sy = 0;
			}
			var bezier = new window.Bezier(sx, sy, cp1x, cp1y, cp2x, cp2y, x, y);
			var arr = bezier.getLUT(Math.ceil(bezier.length()));
			for (var index = 0; index < arr.length; index++) {
				var pt = arr[index];
				this.lineTo(pt.x, pt.y, false);
			}
			this.lineTo(x, y, false);
		}

		__proto.rect = function (x, y, width, height) {
			this._other = this._other.make();
			this._other.path || (this._other.path = new Path());
			this._other.path.rect(x, y, width, height);
		}

		__proto.strokeRect = function (x, y, width, height, parameterLineWidth) {
			var tW = parameterLineWidth * 0.5;
			this.line(x - tW, y, x + width + tW, y, parameterLineWidth, this._curMat);
			this.line(x + width, y, x + width, y + height, parameterLineWidth, this._curMat);
			this.line(x, y, x, y + height, parameterLineWidth, this._curMat);
			this.line(x - tW, y + height, x + width + tW, y + height, parameterLineWidth, this._curMat);
		}

		__proto.clip = function () { }
		/**
		*画多边形(用)
		*@param x
		*@param y
		*@param points
		*/
		__proto.drawPoly = function (x, y, points, color, lineWidth, boderColor, isConvexPolygon) {
			(isConvexPolygon === void 0) && (isConvexPolygon = false);
			this._renderKey = 0;
			this._shader2D.glTexture = null;
			var tPath = this._getPath();
			if (this.mId == -1) {
				tPath.polygon(x, y, points, color, lineWidth ? lineWidth : 1, boderColor)
			} else {
				if (this.mHaveKey) {
					var tShape = VectorGraphManager.getInstance().shapeDic[this.mId];
					tShape.setMatrix(this._curMat);
					tShape.rebuild(tPath.tempArray);
					tPath.setGeomtry(tShape);
				} else {
					var t = tPath.polygon(x, y, points, color, lineWidth ? lineWidth : 1, boderColor);
					VectorGraphManager.getInstance().addShape(this.mId, t);
					t.setMatrix(this._curMat);
				}
			}
			tPath.update();
			var tPosArray = [this.mX, this.mY];
			var tempSubmit;
			if (!isConvexPolygon) {
				var submit = SubmitStencil.create(4);
				this.addRenderObject(submit);
				tempSubmit = Submit.createShape(this, tPath.ib, tPath.vb, tPath.count, tPath.offset, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0));
				tempSubmit.shaderValue.ALPHA = this._shader2D.ALPHA;
				(tempSubmit.shaderValue).u_pos = tPosArray;
				tempSubmit.shaderValue.u_mmat2 = RenderState2D.EMPTYMAT4_ARRAY;
				this._submits[this._submits._length++] = tempSubmit;
				submit = SubmitStencil.create(5);
				this.addRenderObject(submit);
			}
			tempSubmit = Submit.createShape(this, tPath.ib, tPath.vb, tPath.count, tPath.offset, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0));
			tempSubmit.shaderValue.ALPHA = this._shader2D.ALPHA;
			(tempSubmit.shaderValue).u_pos = tPosArray;
			tempSubmit.shaderValue.u_mmat2 = RenderState2D.EMPTYMAT4_ARRAY;
			this._submits[this._submits._length++] = tempSubmit;
			if (!isConvexPolygon) {
				tempSubmit = Submit.createShape(this, tPath.ib, tPath.vb, tPath.count, tPath.offset, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0));
				tempSubmit.shaderValue.ALPHA = this._shader2D.ALPHA;
				(tempSubmit.shaderValue).u_pos = tPosArray;
				tempSubmit.shaderValue.u_mmat2 = RenderState2D.EMPTYMAT4_ARRAY;
				SubmitStencil.restore2(this, tempSubmit);
			}
			if (lineWidth > 0) {
				if (this.mHaveLineKey) {
					var tShapeLine = VectorGraphManager.getInstance().shapeLineDic[this.mId];
					tShapeLine.rebuild(tPath.tempArray);
					tPath.setGeomtry(tShapeLine);
				} else {
					VectorGraphManager.getInstance().addShape(this.mId, tPath.drawLine(x, y, points, lineWidth, boderColor));
				}
				tPath.update();
				tempSubmit = Submit.createShape(this, tPath.ib, tPath.vb, tPath.count, tPath.offset, Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0));
				tempSubmit.shaderValue.ALPHA = this._shader2D.ALPHA;
				tempSubmit.shaderValue.u_mmat2 = RenderState2D.EMPTYMAT4_ARRAY;
				this._submits[this._submits._length++] = tempSubmit;
			}
		}

		/*******************************************end矢量绘制***************************************************/
		__proto.drawParticle = function (x, y, pt) {
			pt.x = x;
			pt.y = y;
			this._submits[this._submits._length++] = pt;
		}

		__proto._getPath = function () {
			return this._path || (this._path = new Path());
		}

		/*,_shader2D.ALPHA=1*/
		__getset(0, __proto, 'globalCompositeOperation', function () {
			return BlendMode.NAMES[this._nBlendType];
		}, function (value) {
			var n = BlendMode.TOINT[value];
			n == null || (this._nBlendType === n) || (SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_GLOBALCOMPOSITEOPERATION*/0x10000, this, true), this._curSubmit = Submit.RENDERBASE, this._renderKey = 0, this._nBlendType = n);
		});

		__getset(0, __proto, 'strokeStyle', function () {
			return this._shader2D.strokeStyle;
		}, function (value) {
			this._shader2D.strokeStyle.equal(value) || (SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_STROKESTYLE*/0x200, this._shader2D, false), this._shader2D.strokeStyle = DrawStyle.create(value));
		});

		__getset(0, __proto, 'globalAlpha', function () {
			return this._shader2D.ALPHA;
		}, function (value) {
			value = Math.floor(value * 1000) / 1000;
			if (value != this._shader2D.ALPHA) {
				SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_ALPHA*/0x1, this._shader2D, true);
				this._shader2D.ALPHA = value;
			}
		});

		__getset(0, __proto, 'asBitmap', null, function (value) {
			if (value) {
				this._targets || (this._targets = new RenderTargetMAX());
				this._targets.repaint = true;
				if (!this._width || !this._height)
					throw Error("asBitmap no size!");
				this._targets.setSP(this.sprite);
				this._targets.size(this._width, this._height);
			} else
				this._targets = null;
		});

		__getset(0, __proto, 'fillStyle', function () {
			return this._shader2D.fillStyle;
		}, function (value) {
			this._shader2D.fillStyle.equal(value) || (SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_FILESTYLE*/0x2, this._shader2D, false), this._shader2D.fillStyle = DrawStyle.create(value));
		});

		__getset(0, __proto, 'textAlign', function () {
			return this._other.textAlign;
		}, function (value) {
			(this._other.textAlign === value) || (this._other = this._other.make(), SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_TEXTALIGN*/0x8000, this._other, false), this._other.textAlign = value);
		});

		__getset(0, __proto, 'lineWidth', function () {
			return this._other.lineWidth;
		}, function (value) {
			(this._other.lineWidth === value) || (this._other = this._other.make(), SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_LINEWIDTH*/0x100, this._other, false), this._other.lineWidth = value);
		});

		__getset(0, __proto, 'textBaseline', function () {
			return this._other.textBaseline;
		}, function (value) {
			(this._other.textBaseline === value) || (this._other = this._other.make(), SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_TEXTBASELINE*/0x4000, this._other, false), this._other.textBaseline = value);
		});

		__getset(0, __proto, 'font', null, function (str) {
			if (str == this._other.font.toString())
				return;
			this._other = this._other.make();
			SaveBase.save(this,/*laya.webgl.canvas.save.SaveBase.TYPE_FONT*/0x8, this._other, false);
			this._other.font === FontInContext.EMPTY ? (this._other.font = new FontInContext(str)) : (this._other.font.setFont(str));
		});

		WebGLContext2D.__init__ = function () {
			ContextParams.DEFAULT = new ContextParams();
		}

		WebGLContext2D._SUBMITVBSIZE = 32000;
		WebGLContext2D._MAXSIZE = 99999999;
		WebGLContext2D._RECTVBSIZE = 16;
		WebGLContext2D._COUNT = 0;
		WebGLContext2D.SEGNUM = 32;
		WebGLContext2D._contextcount = 0;
		__static(WebGLContext2D,
			['_tempPoint', function () { return this._tempPoint = new Point(); }, 'MAXCLIPRECT', function () { return this.MAXCLIPRECT = new Rectangle(0, 0, 99999999, 99999999); }, '_tmpMatrix', function () { return this._tmpMatrix = new Matrix(); }, '_fontTemp', function () { return this._fontTemp = new FontInContext(); }, '_drawStyleTemp', function () { return this._drawStyleTemp = new DrawStyle(null); }
			]);
		WebGLContext2D.__init$ = function () {
			//class ContextParams
			ContextParams = (function () {
				function ContextParams() {
					this.lineWidth = 1;
					this.path = null;
					this.textAlign = null;
					this.textBaseline = null;
					this.font = FontInContext.EMPTY;
				}
				__class(ContextParams, '');
				var __proto = ContextParams.prototype;
				__proto.clear = function () {
					this.lineWidth = 1;
					this.path && this.path.clear();
					this.textAlign = this.textBaseline = null;
					this.font = FontInContext.EMPTY;
				}
				__proto.make = function () {
					return this === ContextParams.DEFAULT ? new ContextParams() : this;
				}
				ContextParams.DEFAULT = null;
				return ContextParams;
			})()
		}

		return WebGLContext2D;
	})(Context)


	//class laya.webgl.shader.d2.value.Value2D extends laya.webgl.shader.ShaderValue
	var Value2D = (function (_super) {
		function Value2D(mainID, subID) {
			this.size = [0, 0];
			this.alpha = 1.0;
			//this.mmat=null;
			this.ALPHA = 1.0;
			//this.shader=null;
			//this.mainID=0;
			this.subID = 0;
			//this.filters=null;
			//this.textureHost=null;
			//this.texture=null;
			//this.fillStyle=null;
			//this.color=null;
			//this.strokeStyle=null;
			//this.colorAdd=null;
			//this.glTexture=null;
			//this.u_mmat2=null;
			//this._inClassCache=null;
			this._cacheID = 0;
			Value2D.__super.call(this);
			this.defines = new ShaderDefines2D();
			this.position = Value2D._POSITION;
			this.mainID = mainID;
			this.subID = subID;
			this.textureHost = null;
			this.texture = null;
			this.fillStyle = null;
			this.color = null;
			this.strokeStyle = null;
			this.colorAdd = null;
			this.glTexture = null;
			this.u_mmat2 = null;
			this._cacheID = mainID | subID;
			this._inClassCache = Value2D._cache[this._cacheID];
			if (mainID > 0 && !this._inClassCache) {
				this._inClassCache = Value2D._cache[this._cacheID] = [];
				this._inClassCache._length = 0;
			}
			this.clear();
		}

		__class(Value2D, 'laya.webgl.shader.d2.value.Value2D', _super);
		var __proto = Value2D.prototype;
		__proto.setValue = function (value) { }
		//throw new Error("todo in subclass");
		__proto.refresh = function () {
			var size = this.size;
			size[0] = RenderState2D.width;
			size[1] = RenderState2D.height;
			this.alpha = this.ALPHA * RenderState2D.worldAlpha;
			this.mmat = RenderState2D.worldMatrix4;
			return this;
		}

		__proto._ShaderWithCompile = function () {
			return Shader.withCompile2D(0, this.mainID, this.defines.toNameDic(), this.mainID | this.defines._value, Shader2X.create);
		}

		__proto._withWorldShaderDefines = function () {
			var defs = RenderState2D.worldShaderDefines;
			var sd = Shader.sharders[this.mainID | this.defines._value | defs.getValue()];
			if (!sd) {
				var def = {};
				var dic;
				var name;
				dic = this.defines.toNameDic(); for (name in dic) def[name] = "";
				dic = defs.toNameDic(); for (name in dic) def[name] = "";
				sd = Shader.withCompile2D(0, this.mainID, def, this.mainID | this.defines._value | defs.getValue(), Shader2X.create);
			};
			var worldFilters = RenderState2D.worldFilters;
			if (!worldFilters) return sd;
			var n = worldFilters.length, f;
			for (var i = 0; i < n; i++) {
				((f = worldFilters[i])) && f.action.setValue(this);
			}
			return sd;
		}

		__proto.upload = function () {
			var renderstate2d = RenderState2D;
			this.alpha = this.ALPHA * renderstate2d.worldAlpha;
			if (RenderState2D.worldMatrix4 !== RenderState2D.TEMPMAT4_ARRAY) this.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.WORLDMAT*/0x80);
			(WebGL.shaderHighPrecision) && (this.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.SHADERDEFINE_FSHIGHPRECISION*/0x400));
			var sd = renderstate2d.worldShaderDefines ? this._withWorldShaderDefines() : (Shader.sharders[this.mainID | this.defines._value] || this._ShaderWithCompile());
			var params;
			this.size[0] = renderstate2d.width, this.size[1] = renderstate2d.height;
			this.mmat = renderstate2d.worldMatrix4;
			if (BaseShader.activeShader !== sd) {
				if (sd._shaderValueWidth !== renderstate2d.width || sd._shaderValueHeight !== renderstate2d.height) {
					sd._shaderValueWidth = renderstate2d.width;
					sd._shaderValueHeight = renderstate2d.height;
				}
				else {
					params = sd._params2dQuick2 || sd._make2dQuick2();
				}
				sd.upload(this, params);
			}
			else {
				if (sd._shaderValueWidth !== renderstate2d.width || sd._shaderValueHeight !== renderstate2d.height) {
					sd._shaderValueWidth = renderstate2d.width;
					sd._shaderValueHeight = renderstate2d.height;
				}
				else {
					params = (sd._params2dQuick1) || sd._make2dQuick1();
				}
				sd.upload(this, params);
			}
		}

		__proto.setFilters = function (value) {
			this.filters = value;
			if (!value)
				return;
			var n = value.length, f;
			for (var i = 0; i < n; i++) {
				f = value[i];
				if (f) {
					this.defines.add(f.type);
					f.action.setValue(this);
				}
			}
		}

		__proto.clear = function () {
			this.defines.setValue(this.subID);
		}

		__proto.release = function () {
			this._inClassCache[this._inClassCache._length++] = this;
			this.fillStyle = null;
			this.strokeStyle = null;
			this.clear();
		}

		Value2D._initone = function (type, classT) {
			Value2D._typeClass[type] = classT;
			Value2D._cache[type] = [];
			Value2D._cache[type]._length = 0;
		}

		Value2D.__init__ = function () {
			Value2D._POSITION = [2,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, 4 * CONST3D2D.BYTES_PE, 0];
			Value2D._TEXCOORD = [2,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, 4 * CONST3D2D.BYTES_PE, 2 * CONST3D2D.BYTES_PE];
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, Color2dSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, PrimitiveSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.FILLTEXTURE*/0x100, FillTextureSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.SKINMESH*/0x200, SkinSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, TextureSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01 | /*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40, TextSV);
			Value2D._initone(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01 | /*laya.webgl.shader.d2.ShaderDefines2D.FILTERGLOW*/0x08, TextureSV);
		}

		Value2D.create = function (mainType, subType) {
			var types = Value2D._cache[mainType | subType];
			if (types._length)
				return types[--types._length];
			else
				return new Value2D._typeClass[mainType | subType](subType);
		}

		Value2D._POSITION = null;
		Value2D._TEXCOORD = null;
		Value2D._cache = [];
		Value2D._typeClass = [];
		__static(Value2D,
			['TEMPMAT4_ARRAY', function () { return this.TEMPMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; }
			]);
		return Value2D;
	})(ShaderValue)


	//class laya.webgl.utils.RenderSprite3D extends laya.renders.RenderSprite
	var RenderSprite3D = (function (_super) {
		function RenderSprite3D(type, next) {
			RenderSprite3D.__super.call(this, type, next);
		}

		__class(RenderSprite3D, 'laya.webgl.utils.RenderSprite3D', _super);
		var __proto = RenderSprite3D.prototype;
		__proto.onCreate = function (type) {
			switch (type) {
				case 0x08:
					this._fun = this._blend;
					return;
				case 0x04:
					this._fun = this._transform;
					return;
			}
		}

		__proto._mask = function (sprite, context, x, y) {
			var next = this._next;
			var mask = sprite.mask;
			var submitCMD;
			var submitStencil;
			if (mask) {
				context.ctx.save();
				var preBlendMode = (context.ctx).globalCompositeOperation;
				var tRect = new Rectangle();
				tRect.copyFrom(mask.getBounds());
				tRect.width = Math.round(tRect.width);
				tRect.height = Math.round(tRect.height);
				tRect.x = Math.round(tRect.x);
				tRect.y = Math.round(tRect.y);
				if (tRect.width > 0 && tRect.height > 0) {
					var tf = sprite._style._tf;
					var scope = SubmitCMDScope.create();
					scope.addValue("bounds", tRect);
					submitCMD = SubmitCMD.create([scope, context], laya.webgl.utils.RenderSprite3D.tmpTarget);
					context.addRenderObject(submitCMD);
					mask.render(context, -tRect.x, -tRect.y);
					submitCMD = SubmitCMD.create([scope], laya.webgl.utils.RenderSprite3D.endTmpTarget);
					context.addRenderObject(submitCMD);
					context.ctx.save();
					context.clipRect(x - tf.translateX + tRect.x, y - tf.translateY + tRect.y, tRect.width, tRect.height);
					next._fun.call(next, sprite, context, x, y);
					context.ctx.restore();
					submitStencil = SubmitStencil.create(6);
					preBlendMode = (context.ctx).globalCompositeOperation;
					submitStencil.blendMode = "mask";
					context.addRenderObject(submitStencil);
					Matrix.TEMP.identity();
					var shaderValue = Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0);
					var uv = Texture.INV_UV;
					var w = tRect.width;
					var h = tRect.height;
					var tempLimit = 32;
					if (tRect.width < tempLimit || tRect.height < tempLimit) {
						uv = RenderSprite3D.tempUV;
						uv[0] = 0;
						uv[1] = 0;
						uv[2] = (tRect.width >= 32) ? 1 : tRect.width / tempLimit;
						uv[3] = 0
						uv[4] = (tRect.width >= 32) ? 1 : tRect.width / tempLimit;
						uv[5] = (tRect.height >= 32) ? 1 : tRect.height / tempLimit;
						uv[6] = 0;
						uv[7] = (tRect.height >= 32) ? 1 : tRect.height / tempLimit;
						tRect.width = (tRect.width >= 32) ? tRect.width : tempLimit;
						tRect.height = (tRect.height >= 32) ? tRect.height : tempLimit;
						uv[1] *= -1; uv[3] *= -1; uv[5] *= -1; uv[7] *= -1;
						uv[1] += 1; uv[3] += 1; uv[5] += 1; uv[7] += 1;
					}
					(context.ctx).drawTarget(scope, x + tRect.x - tf.translateX, y + tRect.y - tf.translateY, w, h, Matrix.TEMP, "tmpTarget", shaderValue, uv, 6);
					submitCMD = SubmitCMD.create([scope], laya.webgl.utils.RenderSprite3D.recycleTarget);
					context.addRenderObject(submitCMD);
					submitStencil = SubmitStencil.create(6);
					submitStencil.blendMode = preBlendMode;
					context.addRenderObject(submitStencil);
				}
				context.ctx.restore();
			}
			else {
				next._fun.call(next, sprite, context, x, y);
			}
		}

		__proto._blend = function (sprite, context, x, y) {
			var style = sprite._style;
			var next = this._next;
			if (style.blendMode) {
				context.ctx.save();
				context.ctx.globalCompositeOperation = style.blendMode;
				next._fun.call(next, sprite, context, x, y);
				context.ctx.restore();
			}
			else {
				next._fun.call(next, sprite, context, x, y);
			}
		}

		__proto._transform = function (sprite, context, x, y) {
			'use strict';
			var transform = sprite.transform, _next = this._next;
			if (transform && _next != RenderSprite.NORENDER) {
				var ctx = context.ctx;
				var style = sprite._style;
				transform.tx = x;
				transform.ty = y;
				var m2 = ctx._getTransformMatrix();
				var m1 = m2.clone();
				Matrix.mul(transform, m2, m2);
				m2._checkTransform();
				transform.tx = transform.ty = 0;
				_next._fun.call(_next, sprite, context, 0, 0);
				m1.copyTo(m2);
				m1.destroy();
			} else {
				_next._fun.call(_next, sprite, context, x, y);
			}
		}

		RenderSprite3D.tmpTarget = function (scope, context) {
			var b = scope.getValue("bounds");
			var tmpTarget = RenderTarget2D.create(b.width, b.height);
			tmpTarget.start();
			tmpTarget.clear(0, 0, 0, 0);
			scope.addValue("tmpTarget", tmpTarget);
		}

		RenderSprite3D.endTmpTarget = function (scope) {
			var tmpTarget = scope.getValue("tmpTarget");
			tmpTarget.end();
		}

		RenderSprite3D.recycleTarget = function (scope) {
			var tmpTarget = scope.getValue("tmpTarget");
			tmpTarget.recycle();
			scope.recycle();
		}

		__static(RenderSprite3D,
			['tempUV', function () { return this.tempUV = new Array(8); }
			]);
		return RenderSprite3D;
	})(RenderSprite)


	//class laya.filters.webgl.ColorFilterActionGL extends laya.filters.webgl.FilterActionGL
	var ColorFilterActionGL = (function (_super) {
		function ColorFilterActionGL() {
			this.data = null;
			ColorFilterActionGL.__super.call(this);
		}

		__class(ColorFilterActionGL, 'laya.filters.webgl.ColorFilterActionGL', _super);
		var __proto = ColorFilterActionGL.prototype;
		Laya.imps(__proto, { "laya.filters.IFilterActionGL": true })
		__proto.setValue = function (shader) {
			shader.colorMat = this.data._mat;
			shader.colorAlpha = this.data._alpha;
		}

		__proto.apply3d = function (scope, sprite, context, x, y) {
			var b = scope.getValue("bounds");
			var shaderValue = Value2D.create(/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, 0);
			shaderValue.setFilters([this.data]);
			var tMatrix = Matrix.TEMP;
			tMatrix.identity();
			context.ctx.drawTarget(scope, 0, 0, b.width, b.height, tMatrix, "src", shaderValue);
		}

		return ColorFilterActionGL;
	})(FilterActionGL)


	//class laya.webgl.atlas.Atlaser extends laya.webgl.atlas.AtlasGrid
	var Atlaser = (function (_super) {
		function Atlaser(gridNumX, gridNumY, width, height, atlasID) {
			this._atlasCanvas = null;
			this._inAtlasTextureKey = null;
			this._inAtlasTextureBitmapValue = null;
			this._inAtlasTextureOriUVValue = null;
			this._InAtlasWebGLImagesKey = null;
			this._InAtlasWebGLImagesOffsetValue = null;
			Atlaser.__super.call(this, gridNumX, gridNumY, atlasID);
			this._inAtlasTextureKey = [];
			this._inAtlasTextureBitmapValue = [];
			this._inAtlasTextureOriUVValue = [];
			this._InAtlasWebGLImagesKey = {};
			this._InAtlasWebGLImagesOffsetValue = [];
			this._atlasCanvas = new AtlasWebGLCanvas();
			this._atlasCanvas._atlaser = this;
			this._atlasCanvas.width = width;
			this._atlasCanvas.height = height;
			this._atlasCanvas.activeResource();
			this._atlasCanvas.lock = true;
		}

		__class(Atlaser, 'laya.webgl.atlas.Atlaser', _super);
		var __proto = Atlaser.prototype;
		__proto.computeUVinAtlasTexture = function (texture, oriUV, offsetX, offsetY) {
			var tex = texture;
			var _width = AtlasResourceManager.atlasTextureWidth;
			var _height = AtlasResourceManager.atlasTextureHeight;
			var u1 = offsetX / _width, v1 = offsetY / _height, u2 = (offsetX + texture.bitmap.width) / _width, v2 = (offsetY + texture.bitmap.height) / _height;
			var inAltasUVWidth = texture.bitmap.width / _width, inAltasUVHeight = texture.bitmap.height / _height;
			texture.uv = [u1 + oriUV[0] * inAltasUVWidth, v1 + oriUV[1] * inAltasUVHeight, u2 - (1 - oriUV[2]) * inAltasUVWidth, v1 + oriUV[3] * inAltasUVHeight, u2 - (1 - oriUV[4]) * inAltasUVWidth, v2 - (1 - oriUV[5]) * inAltasUVHeight, u1 + oriUV[6] * inAltasUVWidth, v2 - (1 - oriUV[7]) * inAltasUVHeight];
		}

		__proto.findBitmapIsExist = function (bitmap) {
			if ((bitmap instanceof laya.webgl.resource.WebGLImage)) {
				var webImage = bitmap;
				var sUrl = webImage.url;
				var object = this._InAtlasWebGLImagesKey[sUrl ? sUrl : webImage.id]
				if (object) {
					return object.offsetInfoID;
				}
			}
			return -1;
		}

		/**
		*
		*@param inAtlasRes
		*@return 是否已经存在队列中
		*/
		__proto.addToAtlasTexture = function (mergeAtlasBitmap, offsetX, offsetY) {
			if ((mergeAtlasBitmap instanceof laya.webgl.resource.WebGLImage)) {
				var webImage = mergeAtlasBitmap;
				var sUrl = webImage.url;
				this._InAtlasWebGLImagesKey[sUrl ? sUrl : webImage.id] = { bitmap: mergeAtlasBitmap, offsetInfoID: this._InAtlasWebGLImagesOffsetValue.length };
				this._InAtlasWebGLImagesOffsetValue.push([offsetX, offsetY]);
			}
			this._atlasCanvas.texSubImage2D(offsetX, offsetY, mergeAtlasBitmap.atlasSource);
			mergeAtlasBitmap.clearAtlasSource();
		}

		__proto.addToAtlas = function (texture, offsetX, offsetY) {
			texture._atlasID = this._inAtlasTextureKey.length;
			var oriUV = texture.uv.slice();
			var oriBitmap = texture.bitmap;
			this._inAtlasTextureKey.push(texture);
			this._inAtlasTextureOriUVValue.push(oriUV);
			this._inAtlasTextureBitmapValue.push(oriBitmap);
			this.computeUVinAtlasTexture(texture, oriUV, offsetX, offsetY);
			texture.bitmap = this._atlasCanvas;
		}

		__proto.clear = function () {
			for (var i = 0, n = this._inAtlasTextureKey.length; i < n; i++) {
				this._inAtlasTextureKey[i].bitmap = this._inAtlasTextureBitmapValue[i];
				this._inAtlasTextureKey[i].uv = this._inAtlasTextureOriUVValue[i];
				this._inAtlasTextureKey[i]._atlasID = -1;
				this._inAtlasTextureKey[i].bitmap.lock = false;
				this._inAtlasTextureKey[i].bitmap.releaseResource();
			}
			this._inAtlasTextureKey.length = 0;
			this._inAtlasTextureBitmapValue.length = 0;
			this._inAtlasTextureOriUVValue.length = 0;
			this._InAtlasWebGLImagesKey = null;
			this._InAtlasWebGLImagesOffsetValue.length = 0;
		}

		__proto.dispose = function () {
			this.clear();
			this._atlasCanvas.dispose();
		}

		__getset(0, __proto, 'InAtlasWebGLImagesOffsetValue', function () {
			return this._InAtlasWebGLImagesOffsetValue;
		});

		__getset(0, __proto, 'texture', function () {
			return this._atlasCanvas;
		});

		__getset(0, __proto, 'inAtlasWebGLImagesKey', function () {
			return this._InAtlasWebGLImagesKey;
		});

		return Atlaser;
	})(AtlasGrid)


	//class laya.webgl.shader.d2.ShaderDefines2D extends laya.webgl.shader.ShaderDefines
	var ShaderDefines2D = (function (_super) {
		function ShaderDefines2D() {
			ShaderDefines2D.__super.call(this, ShaderDefines2D.__name2int, ShaderDefines2D.__int2name, ShaderDefines2D.__int2nameMap);
		}

		__class(ShaderDefines2D, 'laya.webgl.shader.d2.ShaderDefines2D', _super);
		ShaderDefines2D.__init__ = function () {
			ShaderDefines2D.reg("TEXTURE2D", 0x01);
			ShaderDefines2D.reg("COLOR2D", 0x02);
			ShaderDefines2D.reg("PRIMITIVE", 0x04);
			ShaderDefines2D.reg("GLOW_FILTER", 0x08);
			ShaderDefines2D.reg("BLUR_FILTER", 0x10);
			ShaderDefines2D.reg("COLOR_FILTER", 0x20);
			ShaderDefines2D.reg("COLOR_ADD", 0x40);
			ShaderDefines2D.reg("WORLDMAT", 0x80);
			ShaderDefines2D.reg("FILLTEXTURE", 0x100);
			ShaderDefines2D.reg("FSHIGHPRECISION", 0x400);
		}

		ShaderDefines2D.reg = function (name, value) {
			ShaderDefines._reg(name, value, ShaderDefines2D.__name2int, ShaderDefines2D.__int2name);
		}

		ShaderDefines2D.toText = function (value, int2name, int2nameMap) {
			return ShaderDefines._toText(value, int2name, int2nameMap);
		}

		ShaderDefines2D.toInt = function (names) {
			return ShaderDefines._toInt(names, ShaderDefines2D.__name2int);
		}

		ShaderDefines2D.TEXTURE2D = 0x01;
		ShaderDefines2D.COLOR2D = 0x02;
		ShaderDefines2D.PRIMITIVE = 0x04;
		ShaderDefines2D.FILTERGLOW = 0x08;
		ShaderDefines2D.FILTERBLUR = 0x10;
		ShaderDefines2D.FILTERCOLOR = 0x20;
		ShaderDefines2D.COLORADD = 0x40;
		ShaderDefines2D.WORLDMAT = 0x80;
		ShaderDefines2D.FILLTEXTURE = 0x100;
		ShaderDefines2D.SKINMESH = 0x200;
		ShaderDefines2D.SHADERDEFINE_FSHIGHPRECISION = 0x400;
		ShaderDefines2D.__name2int = {};
		ShaderDefines2D.__int2name = [];
		ShaderDefines2D.__int2nameMap = [];
		return ShaderDefines2D;
	})(ShaderDefines)


	//class laya.webgl.shapes.Ellipse extends laya.webgl.shapes.BasePoly
	var Ellipse = (function (_super) {
		function Ellipse(x, y, width, height, color, borderWidth, borderColor) {
			Ellipse.__super.call(this, x, y, width, height, 40, color, borderWidth, borderColor);
		}

		__class(Ellipse, 'laya.webgl.shapes.Ellipse', _super);
		return Ellipse;
	})(BasePoly)


	//class laya.webgl.shapes.Line extends laya.webgl.shapes.BasePoly
	var Line = (function (_super) {
		function Line(x, y, points, borderWidth, color) {
			this._points = [];
			this.rebuild(points);
			Line.__super.call(this, x, y, 0, 0, 0, color, borderWidth, color, 0);
		}

		__class(Line, 'laya.webgl.shapes.Line', _super);
		var __proto = Line.prototype;
		__proto.rebuild = function (points) {
			var len = points.length;
			var preLen = this._points.length;
			if (len != preLen) {
				this.mUint16Array = new Uint16Array((len / 2 - 1) * 6);
				this.mFloat32Array = new Float32Array(len * 5);
			}
			this._points.length = 0;
			var tCurrX = NaN;
			var tCurrY = NaN;
			var tLastX = -1;
			var tLastY = -1;
			var tLen = points.length / 2;
			for (var i = 0; i < tLen; i++) {
				tCurrX = points[i * 2];
				tCurrY = points[i * 2 + 1];
				if (Math.abs(tLastX - tCurrX) > 0.01 || Math.abs(tLastY - tCurrY) > 0.01) {
					this._points.push(tCurrX, tCurrY);
				}
				tLastX = tCurrX;
				tLastY = tCurrY;
			}
		}

		__proto.getData = function (ib, vb, start) {
			var indices = [];
			var verts = [];
			(this.borderWidth > 0) && this.createLine2(this._points, indices, this.borderWidth, start, verts, this._points.length / 2);
			this.mUint16Array.set(indices, 0);
			this.mFloat32Array.set(verts, 0);
			ib.append(this.mUint16Array);
			vb.append(this.mFloat32Array);
		}

		return Line;
	})(BasePoly)


	//class laya.webgl.shapes.LoopLine extends laya.webgl.shapes.BasePoly
	var LoopLine = (function (_super) {
		function LoopLine(x, y, points, width, color) {
			this._points = [];
			var tCurrX = NaN;
			var tCurrY = NaN;
			var tLastX = -1;
			var tLastY = -1;
			var tLen = points.length / 2 - 1;
			for (var i = 0; i < tLen; i++) {
				tCurrX = points[i * 2];
				tCurrY = points[i * 2 + 1];
				if (Math.abs(tLastX - tCurrX) > 0.01 || Math.abs(tLastY - tCurrY) > 0.01) {
					this._points.push(tCurrX, tCurrY);
				}
				tLastX = tCurrX;
				tLastY = tCurrY;
			}
			tCurrX = points[tLen * 2];
			tCurrY = points[tLen * 2 + 1];
			tLastX = this._points[0];
			tLastY = this._points[1];
			if (Math.abs(tLastX - tCurrX) > 0.01 || Math.abs(tLastY - tCurrY) > 0.01) {
				this._points.push(tCurrX, tCurrY);
			}
			LoopLine.__super.call(this, x, y, 0, 0, this._points.length / 2, 0, width, color);
		}

		__class(LoopLine, 'laya.webgl.shapes.LoopLine', _super);
		var __proto = LoopLine.prototype;
		__proto.getData = function (ib, vb, start) {
			if (this.borderWidth > 0) {
				var color = this.color;
				var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
				var verts = [];
				var tLastX = -1, tLastY = -1;
				var tCurrX = 0, tCurrY = 0;
				var indices = [];
				var tLen = Math.floor(this._points.length / 2);
				for (var i = 0; i < tLen; i++) {
					tCurrX = this._points[i * 2];
					tCurrY = this._points[i * 2 + 1];
					verts.push(this.x + tCurrX, this.y + tCurrY, r, g, b);
				}
				this.createLoopLine(verts, indices, this.borderWidth, start + verts.length / 5);
				ib.append(new Uint16Array(indices));
				vb.append(new Float32Array(verts));
			}
		}

		__proto.createLoopLine = function (p, indices, lineWidth, len, outVertex, outIndex) {
			var tLen = p.length / 5;
			var points = p.concat();
			var result = outVertex ? outVertex : p;
			var color = this.borderColor;
			var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
			var firstPoint = [points[0], points[1]];
			var lastPoint = [points[points.length - 5], points[points.length - 4]];
			var midPointX = lastPoint[0] + (firstPoint[0] - lastPoint[0]) * 0.5;
			var midPointY = lastPoint[1] + (firstPoint[1] - lastPoint[1]) * 0.5;
			points.unshift(midPointX, midPointY, 0, 0, 0);
			points.push(midPointX, midPointY, 0, 0, 0);
			var length = points.length / 5;
			var iStart = len, w = lineWidth / 2;
			var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
			var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
			var a1, b1, c1, a2, b2, c2;
			var denom, pdist, dist;
			p1x = points[0];
			p1y = points[1];
			p2x = points[5];
			p2y = points[6];
			perpx = -(p1y - p2y);
			perpy = p1x - p2x;
			dist = Math.sqrt(perpx * perpx + perpy * perpy);
			perpx = perpx / dist * w;
			perpy = perpy / dist * w;
			result.push(p1x - perpx, p1y - perpy, r, g, b, p1x + perpx, p1y + perpy, r, g, b);
			for (var i = 1; i < length - 1; i++) {
				p1x = points[(i - 1) * 5];
				p1y = points[(i - 1) * 5 + 1];
				p2x = points[(i) * 5];
				p2y = points[(i) * 5 + 1];
				p3x = points[(i + 1) * 5];
				p3y = points[(i + 1) * 5 + 1];
				perpx = -(p1y - p2y);
				perpy = p1x - p2x;
				dist = Math.sqrt(perpx * perpx + perpy * perpy);
				perpx = perpx / dist * w;
				perpy = perpy / dist * w;
				perp2x = -(p2y - p3y);
				perp2y = p2x - p3x;
				dist = Math.sqrt(perp2x * perp2x + perp2y * perp2y);
				perp2x = perp2x / dist * w;
				perp2y = perp2y / dist * w;
				a1 = (-perpy + p1y) - (-perpy + p2y);
				b1 = (-perpx + p2x) - (-perpx + p1x);
				c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
				a2 = (-perp2y + p3y) - (-perp2y + p2y);
				b2 = (-perp2x + p2x) - (-perp2x + p3x);
				c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);
				denom = a1 * b2 - a2 * b1;
				if (Math.abs(denom) < 0.1) {
					denom += 10.1;
					result.push(p2x - perpx, p2y - perpy, r, g, b, p2x + perpx, p2y + perpy, r, g, b);
					continue;
				}
				px = (b1 * c2 - b2 * c1) / denom;
				py = (a2 * c1 - a1 * c2) / denom;
				pdist = (px - p2x) * (px - p2x) + (py - p2y) + (py - p2y);
				result.push(px, py, r, g, b, p2x - (px - p2x), p2y - (py - p2y), r, g, b);
			}
			if (outIndex) {
				indices = outIndex;
			};
			var groupLen = this.edges + 1;
			for (i = 1; i < groupLen; i++) {
				indices.push(iStart + (i - 1) * 2, iStart + (i - 1) * 2 + 1, iStart + i * 2 + 1, iStart + i * 2 + 1, iStart + i * 2, iStart + (i - 1) * 2);
			}
			indices.push(iStart + (i - 1) * 2, iStart + (i - 1) * 2 + 1, iStart + 1, iStart + 1, iStart, iStart + (i - 1) * 2);
			return result;
		}

		return LoopLine;
	})(BasePoly)


	//class laya.webgl.shapes.Polygon extends laya.webgl.shapes.BasePoly
	var Polygon = (function (_super) {
		function Polygon(x, y, points, color, borderWidth, borderColor) {
			this._points = null;
			this._start = -1;
			this._repaint = false;
			this._mat = Matrix.create();
			this._points = points.slice(0, points.length);
			Polygon.__super.call(this, x, y, 0, 0, this._points.length / 2, color, borderWidth, borderColor);
		}

		__class(Polygon, 'laya.webgl.shapes.Polygon', _super);
		var __proto = Polygon.prototype;
		__proto.rebuild = function (point) {
			if (!this._repaint) {
				this._points.length = 0;
				this._points = this._points.concat(point);
			}
		}

		__proto.setMatrix = function (mat) {
			mat.copyTo(this._mat);
		}

		__proto.needUpdate = function (mat) {
			this._repaint = (this._mat.a == mat.a && this._mat.b == mat.b && this._mat.c == mat.c && this._mat.d == mat.d && this._mat.tx == mat.tx && this._mat.ty == mat.ty);
			return !this._repaint;
		}

		__proto.getData = function (ib, vb, start) {
			var indices, i = 0;
			var tArray = this._points;
			var tLen = 0;
			if (this.mUint16Array && this.mFloat32Array && this._repaint) {
				if (this._start != start) {
					this._start = start;
					indices = [];
					tLen = Math.floor(tArray.length / 2);
					for (i = 2; i < tLen; i++) {
						indices.push(start, start + i - 1, start + i);
					}
					this.mUint16Array = new Uint16Array(indices);
				}
			}
			else {
				this._start = start;
				indices = [];
				var verts = [];
				var color = this.color;
				var r = ((color >> 16) & 0x0000ff) / 255, g = ((color >> 8) & 0xff) / 255, b = (color & 0x0000ff) / 255;
				tLen = Math.floor(tArray.length / 2);
				for (i = 0; i < tLen; i++) {
					verts.push(this.x + tArray[i * 2], this.y + tArray[i * 2 + 1], r, g, b);
				}
				for (i = 2; i < tLen; i++) {
					indices.push(start, start + i - 1, start + i);
				}
				this.mUint16Array = new Uint16Array(indices);
				this.mFloat32Array = new Float32Array(verts);
			}
			ib.append(this.mUint16Array);
			vb.append(this.mFloat32Array);
		}

		return Polygon;
	})(BasePoly)


	//class laya.webgl.submit.SubmitCanvas extends laya.webgl.submit.Submit
	var SubmitCanvas = (function (_super) {
		function SubmitCanvas() {
			//this._ctx_src=null;
			this._matrix = new Matrix();
			this._matrix4 = CONST3D2D.defaultMatrix4.concat();
			SubmitCanvas.__super.call(this,/*laya.webgl.submit.Submit.TYPE_2D*/10000);
			this.shaderValue = new Value2D(0, 0);
		}

		__class(SubmitCanvas, 'laya.webgl.submit.SubmitCanvas', _super);
		var __proto = SubmitCanvas.prototype;
		__proto.renderSubmit = function () {
			if (this._ctx_src._targets) {
				this._ctx_src._targets.flush(this._ctx_src);
				return 1;
			};
			var preAlpha = RenderState2D.worldAlpha;
			var preMatrix4 = RenderState2D.worldMatrix4;
			var preMatrix = RenderState2D.worldMatrix;
			var preFilters = RenderState2D.worldFilters;
			var preWorldShaderDefines = RenderState2D.worldShaderDefines;
			var v = this.shaderValue;
			var m = this._matrix;
			var m4 = this._matrix4;
			var mout = Matrix.TEMP;
			Matrix.mul(m, preMatrix, mout);
			m4[0] = mout.a;
			m4[1] = mout.b;
			m4[4] = mout.c;
			m4[5] = mout.d;
			m4[12] = mout.tx;
			m4[13] = mout.ty;
			RenderState2D.worldMatrix = mout.clone();
			RenderState2D.worldMatrix4 = m4;
			RenderState2D.worldAlpha = RenderState2D.worldAlpha * v.alpha;
			if (v.filters && v.filters.length) {
				RenderState2D.worldFilters = v.filters;
				RenderState2D.worldShaderDefines = v.defines;
			}
			this._ctx_src.flush();
			RenderState2D.worldAlpha = preAlpha;
			RenderState2D.worldMatrix4 = preMatrix4;
			RenderState2D.worldMatrix.destroy();
			RenderState2D.worldMatrix = preMatrix;
			RenderState2D.worldFilters = preFilters;
			RenderState2D.worldShaderDefines = preWorldShaderDefines;
			return 1;
		}

		__proto.releaseRender = function () {
			var cache = SubmitCanvas._cache;
			this._ctx_src = null;
			cache[cache._length++] = this;
		}

		__proto.getRenderType = function () {
			return /*laya.webgl.submit.Submit.TYPE_CANVAS*/10003;
		}

		SubmitCanvas.create = function (ctx_src, alpha, filters) {
			var o = (!SubmitCanvas._cache._length) ? (new SubmitCanvas()) : SubmitCanvas._cache[--SubmitCanvas._cache._length];
			o._ctx_src = ctx_src;
			var v = o.shaderValue;
			v.alpha = alpha;
			v.defines.setValue(0);
			filters && filters.length && v.setFilters(filters);
			return o;
		}

		__static(SubmitCanvas,
			['_cache', function () { return this._cache = (SubmitCanvas._cache = [], SubmitCanvas._cache._length = 0, SubmitCanvas._cache); }
			]);
		return SubmitCanvas;
	})(Submit)


	//class laya.webgl.submit.SubmitTexture extends laya.webgl.submit.Submit
	var SubmitTexture = (function (_super) {
		function SubmitTexture(renderType) {
			this._preIsSameTextureShader = false;
			this._isSameTexture = true;
			this._texs = new Array;
			this._texsID = new Array;
			this._vbPos = new Array;
			(renderType === void 0) && (renderType = 10000);
			SubmitTexture.__super.call(this, renderType);
		}

		__class(SubmitTexture, 'laya.webgl.submit.SubmitTexture', _super);
		var __proto = SubmitTexture.prototype;
		__proto.releaseRender = function () {
			var cache = SubmitTexture._cache;
			cache[cache._length++] = this;
			this.shaderValue.release();
			this._preIsSameTextureShader = false;
			this._vb = null;
			this._texs.length = 0;
			this._vbPos.length = 0;
			this._isSameTexture = true;
		}

		__proto.addTexture = function (tex, vbpos) {
			this._texsID[this._texs.length] = tex._uvID;
			this._texs.push(tex);
			this._vbPos.push(vbpos);
		}

		//检查材质是否修改，修改UV，设置是否是同一材质
		__proto.checkTexture = function () {
			if (this._texs.length < 1) {
				this._isSameTexture = true;
				return;
			};
			var _tex = this.shaderValue.textureHost;
			var webGLImg = _tex.bitmap;
			if (webGLImg === null) return;
			var vbdata = this._vb.getFloat32Array();
			for (var i = 0, s = this._texs.length; i < s; i++) {
				var tex = this._texs[i];
				tex.active();
				var newUV = tex.uv;
				if (this._texsID[i] !== tex._uvID) {
					this._texsID[i] = tex._uvID;
					var vbPos = this._vbPos[i];
					vbdata[vbPos + 2] = newUV[0];
					vbdata[vbPos + 3] = newUV[1];
					vbdata[vbPos + 6] = newUV[2];
					vbdata[vbPos + 7] = newUV[3];
					vbdata[vbPos + 10] = newUV[4];
					vbdata[vbPos + 11] = newUV[5];
					vbdata[vbPos + 14] = newUV[6];
					vbdata[vbPos + 15] = newUV[7];
					this._vb.setNeedUpload();
				}
				if (tex.bitmap !== webGLImg) {
					this._isSameTexture = false;
				}
			}
		}

		__proto.renderSubmit = function () {
			if (this._numEle === 0) {
				SubmitTexture._shaderSet = false;
				return 1;
			};
			var _tex = this.shaderValue.textureHost;
			if (_tex) {
				var source = _tex.source;
				if (!_tex.bitmap || !source) {
					SubmitTexture._shaderSet = false;
					return 1;
				}
				this.shaderValue.texture = source;
			}
			this._vb.bind_upload(this._ib);
			var gl = WebGL.mainContext;
			if (BlendMode.activeBlendFunction !== this._blendFn) {
				gl.enable(/*laya.webgl.WebGLContext.BLEND*/0x0BE2);
				this._blendFn(gl);
				BlendMode.activeBlendFunction = this._blendFn;
			}
			Stat.drawCall++;
			Stat.trianglesFaces += this._numEle / 3;
			if (this._preIsSameTextureShader && BaseShader.activeShader && SubmitTexture._shaderSet)
				(BaseShader.activeShader).uploadTexture2D(this.shaderValue.texture);
			else this.shaderValue.upload();
			SubmitTexture._shaderSet = true;
			if (this._texs.length > 1 && !this._isSameTexture) {
				var webGLImg = _tex.bitmap;
				var index = 0;
				var shader = BaseShader.activeShader;
				for (var i = 0, s = this._texs.length; i < s; i++) {
					var tex2 = this._texs[i];
					if (tex2.bitmap !== webGLImg || (i + 1) === s) {
						shader.uploadTexture2D(tex2.source);
						gl.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004, (i - index + 1) * 6,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403, this._startIdx + index * 6 * CONST3D2D.BYTES_PIDX);
						webGLImg = tex2.bitmap;
						index = i;
					}
				}
			} else {
				gl.drawElements(/*laya.webgl.WebGLContext.TRIANGLES*/0x0004, this._numEle,/*laya.webgl.WebGLContext.UNSIGNED_SHORT*/0x1403, this._startIdx);
			}
			return 1;
		}

		SubmitTexture.create = function (context, ib, vb, pos, sv) {
			var o = SubmitTexture._cache._length ? SubmitTexture._cache[--SubmitTexture._cache._length] : new SubmitTexture();
			if (vb == null) {
				vb = o._selfVb || (o._selfVb = VertexBuffer2D.create(-1));
				vb.clear();
				pos = 0;
			}
			o._ib = ib;
			o._vb = vb;
			o._startIdx = pos * CONST3D2D.BYTES_PIDX;
			o._numEle = 0;
			var blendType = context._nBlendType;
			o._blendFn = context._targets ? BlendMode.targetFns[blendType] : BlendMode.fns[blendType];
			o.shaderValue = sv;
			o.shaderValue.setValue(context._shader2D);
			var filters = context._shader2D.filters;
			filters && o.shaderValue.setFilters(filters);
			return o;
		}

		SubmitTexture._shaderSet = true;
		__static(SubmitTexture,
			['_cache', function () { return this._cache = (SubmitTexture._cache = [], SubmitTexture._cache._length = 0, SubmitTexture._cache); }
			]);
		return SubmitTexture;
	})(Submit)


	/**
	*...
	*@author ...
	*/
	//class laya.webgl.shader.BaseShader extends laya.resource.Resource
	var BaseShader = (function (_super) {
		function BaseShader() {
			BaseShader.__super.call(this);
		}

		__class(BaseShader, 'laya.webgl.shader.BaseShader', _super);
		BaseShader.activeShader = null;
		BaseShader.bindShader = null;
		return BaseShader;
	})(Resource)


	//class laya.webgl.resource.RenderTarget2D extends laya.resource.Texture
	var RenderTarget2D = (function (_super) {
		function RenderTarget2D(width, height, surfaceFormat, surfaceType, depthStencilFormat, mipMap, repeat, minFifter, magFifter) {
			this._type = 0;
			this._svWidth = NaN;
			this._svHeight = NaN;
			this._preRenderTarget = null;
			//TODO:.........................................................
			this._alreadyResolved = false;
			this._looked = false;
			this._surfaceFormat = 0;
			this._surfaceType = 0;
			this._depthStencilFormat = 0;
			this._mipMap = false;
			this._repeat = false;
			this._minFifter = 0;
			this._magFifter = 0;
			this._destroy = false;
			(surfaceFormat === void 0) && (surfaceFormat =/*laya.webgl.WebGLContext.RGBA*/0x1908);
			(surfaceType === void 0) && (surfaceType =/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401);
			(depthStencilFormat === void 0) && (depthStencilFormat =/*laya.webgl.WebGLContext.DEPTH_STENCIL*/0x84F9);
			(mipMap === void 0) && (mipMap = false);
			(repeat === void 0) && (repeat = false);
			(minFifter === void 0) && (minFifter = -1);
			(magFifter === void 0) && (magFifter = -1);
			this._type = 1;
			this._w = width;
			this._h = height;
			this._surfaceFormat = surfaceFormat;
			this._surfaceType = surfaceType;
			this._depthStencilFormat = depthStencilFormat;
			this._mipMap = mipMap;
			this._repeat = repeat;
			this._minFifter = minFifter;
			this._magFifter = magFifter;
			this._createWebGLRenderTarget();
			this.bitmap.lock = true;
			RenderTarget2D.__super.call(this, this.bitmap, Texture.INV_UV);
		}

		__class(RenderTarget2D, 'laya.webgl.resource.RenderTarget2D', _super);
		var __proto = RenderTarget2D.prototype;
		Laya.imps(__proto, { "laya.resource.IDispose": true })
		//TODO:临时......................................................
		__proto.getType = function () {
			return this._type;
		}

		//*/
		__proto.getTexture = function () {
			return this;
		}

		__proto.size = function (w, h) {
			if (this._w == w && this._h == h) return;
			this._w = w;
			this._h = h;
			this.release();
			if (this._w != 0 && this._h != 0) this._createWebGLRenderTarget();
		}

		__proto.release = function () {
			this.destroy();
		}

		__proto.recycle = function () {
			RenderTarget2D.POOL.push(this);
		}

		__proto.start = function () {
			var gl = WebGL.mainContext;
			this._preRenderTarget = RenderState2D.curRenderTarget;
			RenderState2D.curRenderTarget = this;
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, this.bitmap.frameBuffer);
			this._alreadyResolved = false;
			if (this._type == 1) {
				gl.viewport(0, 0, this._w, this._h);
				this._svWidth = RenderState2D.width;
				this._svHeight = RenderState2D.height;
				RenderState2D.width = this._w;
				RenderState2D.height = this._h;
				BaseShader.activeShader = null;
			}
			return this;
		}

		__proto.clear = function (r, g, b, a) {
			(r === void 0) && (r = 0.0);
			(g === void 0) && (g = 0.0);
			(b === void 0) && (b = 0.0);
			(a === void 0) && (a = 1.0);
			var gl = WebGL.mainContext;
			gl.clearColor(r, g, b, a);
			var clearFlag =/*laya.webgl.WebGLContext.COLOR_BUFFER_BIT*/0x00004000;
			switch (this._depthStencilFormat) {
				case /*laya.webgl.WebGLContext.DEPTH_COMPONENT16*/0x81A5:
					clearFlag |=/*laya.webgl.WebGLContext.DEPTH_BUFFER_BIT*/0x00000100;
					break;
				case /*laya.webgl.WebGLContext.STENCIL_INDEX8*/0x8D48:
					clearFlag |=/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400;
					break;
				case /*laya.webgl.WebGLContext.DEPTH_STENCIL*/0x84F9:
					clearFlag |=/*laya.webgl.WebGLContext.DEPTH_BUFFER_BIT*/0x00000100;
					clearFlag |=/*laya.webgl.WebGLContext.STENCIL_BUFFER_BIT*/0x00000400
					break;
			}
			gl.clear(clearFlag);
		}

		__proto.end = function () {
			var gl = WebGL.mainContext;
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, this._preRenderTarget ? this._preRenderTarget.bitmap.frameBuffer : null);
			this._alreadyResolved = true;
			RenderState2D.curRenderTarget = this._preRenderTarget;
			if (this._type == 1) {
				gl.viewport(0, 0, this._svWidth, this._svHeight);
				RenderState2D.width = this._svWidth;
				RenderState2D.height = this._svHeight;
				BaseShader.activeShader = null;
			} else gl.viewport(0, 0, Laya.stage.width, Laya.stage.height);
		}

		__proto.getData = function (x, y, width, height) {
			var gl = WebGL.mainContext;
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, (this.bitmap).frameBuffer);
			var canRead = (gl.checkFramebufferStatus(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40) ===/*laya.webgl.WebGLContext.FRAMEBUFFER_COMPLETE*/0x8CD5);
			if (!canRead) {
				gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, null);
				return null;
			};
			var pixels = new Uint8Array(this._w * this._h * 4);
			gl.readPixels(x, y, width, height, this._surfaceFormat, this._surfaceType, pixels);
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, null);
			return pixels;
		}

		/**彻底清理资源,注意会强制解锁清理*/
		__proto.destroy = function (foreDiposeTexture) {
			(foreDiposeTexture === void 0) && (foreDiposeTexture = false);
			if (!this._destroy) {
				this._loaded = false;
				this.bitmap.offAll();
				this.bitmap.detoryResource();
				this.bitmap.dispose();
				this.offAll();
				this.bitmap = null;
				this._alreadyResolved = false;
				this._destroy = true;
				_super.prototype.destroy.call(this);
			}
		}

		//待测试
		__proto.dispose = function () { }
		__proto._createWebGLRenderTarget = function () {
			this.bitmap = new WebGLRenderTarget(this.width, this.height, this._surfaceFormat, this._surfaceType, this._depthStencilFormat, this._mipMap, this._repeat, this._minFifter, this._magFifter);
			this.bitmap.activeResource();
			this._alreadyResolved = true;
			this._destroy = false;
			this._loaded = true;
			this.bitmap.on(/*laya.events.Event.RECOVERED*/"recovered", this, function (e) {
				this.event(/*laya.events.Event.RECOVERED*/"recovered");
			})
		}

		__getset(0, __proto, 'surfaceFormat', function () {
			return this._surfaceFormat;
		});

		__getset(0, __proto, 'magFifter', function () {
			return this._magFifter;
		});

		__getset(0, __proto, 'surfaceType', function () {
			return this._surfaceType;
		});

		__getset(0, __proto, 'mipMap', function () {
			return this._mipMap;
		});

		__getset(0, __proto, 'depthStencilFormat', function () {
			return this._depthStencilFormat;
		});

		//}
		__getset(0, __proto, 'minFifter', function () {
			return this._minFifter;
		});

		/**返回RenderTarget的Texture*/
		__getset(0, __proto, 'source', function () {
			if (this._alreadyResolved)
				return Laya.superGet(Texture, this, 'source');
			return null;
		});

		RenderTarget2D.create = function (w, h, surfaceFormat, surfaceType, depthStencilFormat, mipMap, repeat, minFifter, magFifter) {
			(surfaceFormat === void 0) && (surfaceFormat =/*laya.webgl.WebGLContext.RGBA*/0x1908);
			(surfaceType === void 0) && (surfaceType =/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401);
			(depthStencilFormat === void 0) && (depthStencilFormat =/*laya.webgl.WebGLContext.DEPTH_STENCIL*/0x84F9);
			(mipMap === void 0) && (mipMap = false);
			(repeat === void 0) && (repeat = false);
			(minFifter === void 0) && (minFifter = -1);
			(magFifter === void 0) && (magFifter = -1);
			var t = RenderTarget2D.POOL.pop();
			t || (t = new RenderTarget2D(w, h));
			if (!t.bitmap || t._w != w || t._h != h || t._surfaceFormat != surfaceFormat || t._surfaceType != surfaceType || t._depthStencilFormat != depthStencilFormat || t._mipMap != mipMap || t._repeat != repeat || t._minFifter != minFifter || t._magFifter != magFifter) {
				t._w = w;
				t._h = h;
				t._surfaceFormat = surfaceFormat;
				t._surfaceType = surfaceType;
				t._depthStencilFormat = depthStencilFormat;
				t._mipMap = mipMap;
				t._repeat = repeat;
				t._minFifter = minFifter;
				t._magFifter = magFifter;
				t.release();
				t._createWebGLRenderTarget();
			}
			return t;
		}

		RenderTarget2D.TYPE2D = 1;
		RenderTarget2D.TYPE3D = 2;
		RenderTarget2D.POOL = [];
		return RenderTarget2D;
	})(Texture)


	//class laya.webgl.utils.Buffer extends laya.resource.Resource
	var Buffer = (function (_super) {
		function Buffer() {
			this._glBuffer = null;
			this._buffer = null;
			//可能为Float32Array、Uint16Array、Uint8Array、ArrayBuffer等。
			this._bufferType = 0;
			this._bufferUsage = 0;
			this._byteLength = 0;
			Buffer.__super.call(this);
			Buffer._gl = WebGL.mainContext;
		}

		__class(Buffer, 'laya.webgl.utils.Buffer', _super);
		var __proto = Buffer.prototype;
		__proto._bind = function () {
			this.activeResource();
			if (Buffer._bindActive[this._bufferType] !== this._glBuffer) {
				(this._bufferType ===/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892) && (Buffer._bindVertexBuffer = this._glBuffer);
				Buffer._gl.bindBuffer(this._bufferType, Buffer._bindActive[this._bufferType] = this._glBuffer);
				BaseShader.activeShader = null;
			}
		}

		__proto.recreateResource = function () {
			this._glBuffer || (this._glBuffer = Buffer._gl.createBuffer());
			this.completeCreate();
		}

		__proto.detoryResource = function () {
			if (this._glBuffer) {
				WebGL.mainContext.deleteBuffer(this._glBuffer);
				this._glBuffer = null;
			}
			this.memorySize = 0;
		}

		__getset(0, __proto, 'bufferUsage', function () {
			return this._bufferUsage;
		});

		Buffer._gl = null;
		Buffer._bindActive = {};
		Buffer._bindVertexBuffer = null;
		Buffer._enableAtributes = [];
		return Buffer;
	})(Resource)


	//class laya.webgl.shader.d2.skinAnishader.SkinSV extends laya.webgl.shader.d2.value.Value2D
	var SkinSV = (function (_super) {
		function SkinSV(type) {
			this.texcoord = null;
			this.offsetX = 300;
			this.offsetY = 0;
			SkinSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.SKINMESH*/0x200, 0);
			var _vlen = 8 * CONST3D2D.BYTES_PE;
			this.position = [2,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, _vlen, 0];
			this.texcoord = [2,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, _vlen, 2 * CONST3D2D.BYTES_PE];
			this.color = [4,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, _vlen, 4 * CONST3D2D.BYTES_PE];
		}

		__class(SkinSV, 'laya.webgl.shader.d2.skinAnishader.SkinSV', _super);
		return SkinSV;
	})(Value2D)


	//class laya.webgl.shader.d2.value.Color2dSV extends laya.webgl.shader.d2.value.Value2D
	var Color2dSV = (function (_super) {
		function Color2dSV(args) {
			Color2dSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.COLOR2D*/0x02, 0);
			this.color = [];
		}

		__class(Color2dSV, 'laya.webgl.shader.d2.value.Color2dSV', _super);
		var __proto = Color2dSV.prototype;
		__proto.setValue = function (value) {
			value.fillStyle && (this.color = value.fillStyle._color._color);
			value.strokeStyle && (this.color = value.strokeStyle._color._color);
		}

		return Color2dSV;
	})(Value2D)


	//class laya.webgl.shader.d2.value.FillTextureSV extends laya.webgl.shader.d2.value.Value2D
	var FillTextureSV = (function (_super) {
		function FillTextureSV(type) {
			this.u_colorMatrix = null;
			this.strength = 0;
			this.colorMat = null;
			this.colorAlpha = null;
			this.u_TexRange = [0, 1, 0, 1];
			this.u_offset = [0, 0];
			this.texcoord = Value2D._TEXCOORD;
			FillTextureSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.FILLTEXTURE*/0x100, 0);
		}

		__class(FillTextureSV, 'laya.webgl.shader.d2.value.FillTextureSV', _super);
		var __proto = FillTextureSV.prototype;
		//this.color=[4,WebGLContext.FLOAT,false,_vlen,4 *CONST3D2D.BYTES_PE];
		__proto.setValue = function (vo) {
			this.ALPHA = vo.ALPHA;
			vo.filters && this.setFilters(vo.filters);
		}

		__proto.clear = function () {
			this.texture = null;
			this.shader = null;
			this.defines.setValue(0);
		}

		return FillTextureSV;
	})(Value2D)


	//class laya.webgl.shader.d2.value.TextureSV extends laya.webgl.shader.d2.value.Value2D
	var TextureSV = (function (_super) {
		function TextureSV(subID) {
			this.u_colorMatrix = null;
			this.strength = 0;
			this.blurInfo = null;
			this.colorMat = null;
			this.colorAlpha = null;
			this.texcoord = Value2D._TEXCOORD;
			(subID === void 0) && (subID = 0);
			TextureSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01, subID);
		}

		__class(TextureSV, 'laya.webgl.shader.d2.value.TextureSV', _super);
		var __proto = TextureSV.prototype;
		__proto.setValue = function (vo) {
			this.ALPHA = vo.ALPHA;
			vo.filters && this.setFilters(vo.filters);
		}

		__proto.clear = function () {
			this.texture = null;
			this.shader = null;
			this.defines.setValue(0);
		}

		return TextureSV;
	})(Value2D)


	//class laya.webgl.shader.d2.value.PrimitiveSV extends laya.webgl.shader.d2.value.Value2D
	var PrimitiveSV = (function (_super) {
		function PrimitiveSV(args) {
			this.a_color = null;
			this.u_pos = [0, 0];
			PrimitiveSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.PRIMITIVE*/0x04, 0);
			this.position = [2,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, 5 * CONST3D2D.BYTES_PE, 0];
			this.a_color = [3,/*laya.webgl.WebGLContext.FLOAT*/0x1406, false, 5 * CONST3D2D.BYTES_PE, 2 * CONST3D2D.BYTES_PE];
		}

		__class(PrimitiveSV, 'laya.webgl.shader.d2.value.PrimitiveSV', _super);
		return PrimitiveSV;
	})(Value2D)


	//class laya.webgl.atlas.AtlasWebGLCanvas extends laya.resource.Bitmap
	var AtlasWebGLCanvas = (function (_super) {
		function AtlasWebGLCanvas() {
			this._atlaser = null;
			/**兼容Stage3D使用*/
			this._flashCacheImage = null;
			this._flashCacheImageNeedFlush = false;
			AtlasWebGLCanvas.__super.call(this);
		}

		__class(AtlasWebGLCanvas, 'laya.webgl.atlas.AtlasWebGLCanvas', _super);
		var __proto = AtlasWebGLCanvas.prototype;
		/***重新创建资源*/
		__proto.recreateResource = function () {
			var gl = WebGL.mainContext;
			var glTex = this._source = gl.createTexture();
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, glTex);
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0,/*laya.webgl.WebGLContext.RGBA*/0x1908, this._w, this._h, 0,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, null);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801,/*laya.webgl.WebGLContext.LINEAR*/0x2601);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800,/*laya.webgl.WebGLContext.LINEAR*/0x2601);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
			this.memorySize = this._w * this._h * 4;
			this.completeCreate();
		}

		/***销毁资源*/
		__proto.detoryResource = function () {
			if (this._source) {
				WebGL.mainContext.deleteTexture(this._source);
				this._source = null;
				this.memorySize = 0;
			}
		}

		/**采样image到WebGLTexture的一部分*/
		__proto.texSubImage2D = function (xoffset, yoffset, bitmap) {
			if (!Render.isFlash) {
				var gl = WebGL.mainContext;
				var preTarget = WebGLContext.curBindTexTarget;
				var preTexture = WebGLContext.curBindTexValue;
				WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source);
				gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, true);
				(xoffset - 1 >= 0) && (gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset - 1, yoffset,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, bitmap));
				(xoffset + 1 <= this._w) && (gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset + 1, yoffset,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, bitmap));
				(yoffset - 1 >= 0) && (gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset, yoffset - 1,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, bitmap));
				(yoffset + 1 <= this._h) && (gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset, yoffset + 1,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, bitmap));
				gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset, yoffset,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, bitmap);
				gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, false);
				(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
			} else {
				if (!this._flashCacheImage) {
					this._flashCacheImage = HTMLImage.create("");
					this._flashCacheImage._image.createCanvas(this._w, this._h);
				};
				var bmData = bitmap.bitmapdata;
				this._flashCacheImage._image.copyPixels(bmData, 0, 0, bmData.width, bmData.height, xoffset, yoffset);
				(this._flashCacheImageNeedFlush) || (this._flashCacheImageNeedFlush = true);
			}
		}

		/**采样image到WebGLTexture的一部分*/
		__proto.texSubImage2DPixel = function (xoffset, yoffset, width, height, pixel) {
			var gl = WebGL.mainContext;
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source);
			var pixels = new Uint8Array(pixel.data);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, true);
			gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset, yoffset, width, height,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, pixels);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, false);
			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
		}

		/***
		*设置图片宽度
		*@param value 图片宽度
		*/
		__getset(0, __proto, 'width', _super.prototype._$get_width, function (value) {
			this._w = value;
		});

		/***
		*设置图片高度
		*@param value 图片高度
		*/
		__getset(0, __proto, 'height', _super.prototype._$get_height, function (value) {
			this._h = value;
		});

		return AtlasWebGLCanvas;
	})(Bitmap)


	//class laya.webgl.resource.WebGLCanvas extends laya.resource.Bitmap
	var WebGLCanvas = (function (_super) {
		function WebGLCanvas() {
			//this._ctx=null;
			/**HTML Canvas*/
			//this._canvas=null;
			//this._imgData=null;
			//}
			//this.iscpuSource=false;
			WebGLCanvas.__super.call(this);
		}

		__class(WebGLCanvas, 'laya.webgl.resource.WebGLCanvas', _super);
		var __proto = WebGLCanvas.prototype;
		//}
		__proto.getCanvas = function () {
			return this._canvas;
		}

		__proto.clear = function () {
			this._ctx && this._ctx.clear();
		}

		__proto.destroy = function () {
			this._ctx && this._ctx.destroy();
			this._ctx = null;
		}

		__proto._setContext = function (context) {
			this._ctx = context;
		}

		__proto.getContext = function (contextID, other) {
			return this._ctx ? this._ctx : (this._ctx = WebGLCanvas._createContext(this));
		}

		/*override public function copyTo(dec:Bitmap):void {
		super.copyTo(dec);
		(dec as WebGLCanvas)._ctx=_ctx;
	}*/


		__proto.size = function (w, h) {
			if (this._w != w || this._h != h) {
				this._w = w;
				this._h = h;
				this._ctx && this._ctx.size(w, h);
				this._canvas && (this._canvas.height = h, this._canvas.width = w);
			}

		}


		__proto.recreateResource = function () {
			this.createWebGlTexture();
			this.completeCreate();
		}


		__proto.detoryResource = function () {
			if (this._source && !this.iscpuSource) {
				WebGL.mainContext.deleteTexture(this._source);
				this._source = null;
				this.memorySize = 0;
			}

		}


		__proto.createWebGlTexture = function () {
			var gl = WebGL.mainContext;
			if (!this._canvas) {
				throw "create GLTextur err:no data:" + this._canvas;
			};

			var glTex = this._source = gl.createTexture();
			this.iscpuSource = false;
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, glTex);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_FLIP_Y_WEBGL*/0x9240, 1);
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, this._imgData);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800,/*laya.webgl.WebGLContext.LINEAR*/0x2601);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801,/*laya.webgl.WebGLContext.LINEAR*/0x2601);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_FLIP_Y_WEBGL*/0x9240, 0);
			this.memorySize = this._w * this._h * 4;
			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
		}


		//_canvas=null;
		__proto.texSubImage2D = function (webglCanvas, xoffset, yoffset) {
			var gl = WebGL.mainContext;
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, true);
			gl.texSubImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, xoffset, yoffset,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, webglCanvas._source);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, false);
			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
		}


		__getset(0, __proto, 'context', function () {
			return this._ctx;
		});


		__getset(0, __proto, 'asBitmap', null, function (value) {
			this._ctx && (this._ctx.asBitmap = value);
		});


		WebGLCanvas._createContext = null;
		return WebGLCanvas;
	})(Bitmap)


	//class laya.webgl.resource.WebGLCharImage extends laya.resource.Bitmap
	var WebGLCharImage = (function (_super) {
		function WebGLCharImage(content, drawValue) {
			this.CborderSize = 12;
			//this._ctx=null;
			/***是否创建私有Source*/
			//this._allowMerageInAtlas=false;
			/**是否允许加入大图合集*/
			//this._enableMerageInAtlas=false;
			/**HTML Canvas，绘制字符载体,非私有数据载体*/
			//this.canvas=null;
			/**********************************************************************************/
			//this.cw=NaN;
			//this.ch=NaN;
			//this.xs=NaN;
			//this.ys=NaN;
			//this.char=null;
			//this.fillColor=null;
			//this.borderColor=null;
			//this.borderSize=0;
			//this.font=null;
			//this.fontSize=0;
			//this.texture=null;
			//this.lineWidth=0;
			//this.UV=null;
			//this.isSpace=false;
			//this.underLine=0;
			WebGLCharImage.__super.call(this);
			this.char = content;
			this.isSpace = content === ' ';
			this.xs = drawValue.scaleX;
			this.ys = drawValue.scaleY;
			this.font = drawValue.font.toString();
			this.fontSize = drawValue.font.size;
			this.fillColor = drawValue.fillColor;
			this.borderColor = drawValue.borderColor;
			this.lineWidth = drawValue.lineWidth;
			this.underLine = drawValue.underLine;
			var bIsConchApp = Render.isConchApp;
			var pCanvas;
			if (bIsConchApp) {
			/*__JS__ */pCanvas = ConchTextCanvas;
			/*__JS__ */pCanvas._source = ConchTextCanvas;
			/*__JS__ */pCanvas._source.canvas = ConchTextCanvas;
			} else {
				pCanvas = Browser.canvas.source;
			}
			this.canvas = pCanvas;
			this._enableMerageInAtlas = true;
			if (bIsConchApp) {
			/*__JS__ */this._ctx = pCanvas;
			} else {
				this._ctx = this.canvas.getContext('2d', undefined);
			};
			var t = Utils.measureText(this.char, this.font);
			this.cw = t.width * this.xs;
			this.ch = (t.height || this.fontSize) * this.ys;
			this.onresize(this.cw + this.CborderSize * 2, this.ch + this.CborderSize * 2);
			this.texture = new Texture(this);
		}

		__class(WebGLCharImage, 'laya.webgl.resource.WebGLCharImage', _super);
		var __proto = WebGLCharImage.prototype;
		Laya.imps(__proto, { "laya.webgl.resource.IMergeAtlasBitmap": true })
		__proto.active = function () {
			this.texture.active();
		}

		__proto.recreateResource = function () {
			var bIsConchApp = Render.isConchApp;
			this.onresize(this.cw + this.CborderSize * 2, this.ch + this.CborderSize * 2);
			this.canvas && (this.canvas.height = this._h, this.canvas.width = this._w);
			if (bIsConchApp) {
				var nFontSize = this.fontSize;
				if (this.xs != 1 || this.ys != 1) {
					nFontSize = parseInt(nFontSize * ((this.xs > this.ys) ? this.xs : this.ys) + "");
				};
				var sFont = "normal 100 " + nFontSize + "px Arial";
				if (this.borderColor) {
					sFont += " 1 " + this.borderColor;
				}
				this._ctx.font = sFont;
				this._ctx.textBaseline = "top";
				this._ctx.fillStyle = this.fillColor;
				this._ctx.fillText(this.char, this.CborderSize, this.CborderSize, null, null, null);
			} else {
				this._ctx.save();
				(this._ctx).clearRect(0, 0, this.cw + this.CborderSize * 2, this.ch + this.CborderSize * 2);
				this._ctx.font = this.font;
				if (Text.RightToLeft) {
					this._ctx.textAlign = "end";
				}
				this._ctx.textBaseline = "top";
				this._ctx.translate(this.CborderSize, this.CborderSize);
				if (this.xs != 1 || this.ys != 1) {
					this._ctx.scale(this.xs, this.ys);
				}
				if (this.fillColor && this.borderColor) {
					this._ctx.strokeStyle = this.borderColor;
					this._ctx.lineWidth = this.lineWidth;
					this._ctx.strokeText(this.char, 0, 0, null, null, 0, null);
					this._ctx.fillStyle = this.fillColor;
					this._ctx.fillText(this.char, 0, 0, null, null, null);
				} else {
					if (this.lineWidth === -1) {
						this._ctx.fillStyle = this.fillColor ? this.fillColor : "white";
						this._ctx.fillText(this.char, 0, 0, null, null, null);
					} else {
						this._ctx.strokeStyle = this.borderColor ? this.borderColor : 'white';
						this._ctx.lineWidth = this.lineWidth;
						this._ctx.strokeText(this.char, 0, 0, null, null, 0, null);
					}
				}
				if (this.underLine) {
					this._ctx.lineWidth = 1;
					this._ctx.strokeStyle = this.fillColor;
					this._ctx.beginPath();
					this._ctx.moveTo(0, this.fontSize + 1);
					var nW = this._ctx.measureText(this.char).width + 1;
					this._ctx.lineTo(nW, this.fontSize + 1);
					this._ctx.stroke();
				}
				this._ctx.restore();
			}
			this.borderSize = this.CborderSize;
			this.completeCreate();
		}

		__proto.onresize = function (w, h) {
			this._w = w;
			this._h = h;
			this._allowMerageInAtlas = true;
		}

		__proto.clearAtlasSource = function () { }
		/**
		*是否创建私有Source
		*@return 是否创建
		*/
		__getset(0, __proto, 'allowMerageInAtlas', function () {
			return this._allowMerageInAtlas;
		});

		__getset(0, __proto, 'atlasSource', function () {
			return this.canvas;
		});

		/**
		*是否创建私有Source,通常禁止修改
		*@param value 是否创建
		*/
		/**
		*是否创建私有Source
		*@return 是否创建
		*/
		__getset(0, __proto, 'enableMerageInAtlas', function () {
			return this._enableMerageInAtlas;
		}, function (value) {
			this._enableMerageInAtlas = value;
		});

		WebGLCharImage.createOneChar = function (content, drawValue) {
			var char = new WebGLCharImage(content, drawValue);
			return char;
		}

		return WebGLCharImage;
	})(Bitmap)


	//class laya.webgl.resource.WebGLRenderTarget extends laya.resource.Bitmap
	var WebGLRenderTarget = (function (_super) {
		function WebGLRenderTarget(width, height, surfaceFormat, surfaceType, depthStencilFormat, mipMap, repeat, minFifter, magFifter) {
			//this._frameBuffer=null;
			//this._depthStencilBuffer=null;
			//this._surfaceFormat=0;
			//this._surfaceType=0;
			//this._depthStencilFormat=0;
			//this._mipMap=false;
			//this._repeat=false;
			//this._minFifter=0;
			//this._magFifter=0;
			(surfaceFormat === void 0) && (surfaceFormat =/*laya.webgl.WebGLContext.RGBA*/0x1908);
			(surfaceType === void 0) && (surfaceType =/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401);
			(depthStencilFormat === void 0) && (depthStencilFormat =/*laya.webgl.WebGLContext.DEPTH_STENCIL*/0x84F9);
			(mipMap === void 0) && (mipMap = false);
			(repeat === void 0) && (repeat = false);
			(minFifter === void 0) && (minFifter = -1);
			(magFifter === void 0) && (magFifter = 1);
			WebGLRenderTarget.__super.call(this);
			this._w = width;
			this._h = height;
			this._surfaceFormat = surfaceFormat;
			this._surfaceType = surfaceType;
			this._depthStencilFormat = depthStencilFormat;
			this._mipMap = mipMap;
			this._repeat = repeat;
			this._minFifter = minFifter;
			this._magFifter = magFifter;
		}

		__class(WebGLRenderTarget, 'laya.webgl.resource.WebGLRenderTarget', _super);
		var __proto = WebGLRenderTarget.prototype;
		__proto.recreateResource = function () {
			var gl = WebGL.mainContext;
			this._frameBuffer || (this._frameBuffer = gl.createFramebuffer());
			this._source || (this._source = gl.createTexture());
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source);
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0,/*laya.webgl.WebGLContext.RGBA*/0x1908, this._w, this._h, 0, this._surfaceFormat, this._surfaceType, null);
			var minFifter = this._minFifter;
			var magFifter = this._magFifter;
			var repeat = this._repeat ? /*laya.webgl.WebGLContext.REPEAT*/0x2901 :/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F;
			var isPot = Arith.isPOT(this._w, this._h);
			if (isPot) {
				if (this._mipMap)
					(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR_MIPMAP_LINEAR*/0x2703);
				else
			(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter !== -1) || (magFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802, repeat);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803, repeat);
				this._mipMap && gl.generateMipmap(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1);
			} else {
				(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter !== -1) || (magFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			}
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, this._frameBuffer);
			gl.framebufferTexture2D(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,/*laya.webgl.WebGLContext.COLOR_ATTACHMENT0*/0x8CE0,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, this._source, 0);
			if (this._depthStencilFormat) {
				this._depthStencilBuffer || (this._depthStencilBuffer = gl.createRenderbuffer());
				gl.bindRenderbuffer(/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41, this._depthStencilBuffer);
				gl.renderbufferStorage(/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41, this._depthStencilFormat, this._w, this._h);
				switch (this._depthStencilFormat) {
					case /*laya.webgl.WebGLContext.DEPTH_COMPONENT16*/0x81A5:
						gl.framebufferRenderbuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,/*laya.webgl.WebGLContext.DEPTH_ATTACHMENT*/0x8D00,/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41, this._depthStencilBuffer);
						break;
					case /*laya.webgl.WebGLContext.STENCIL_INDEX8*/0x8D48:
						gl.framebufferRenderbuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,/*laya.webgl.WebGLContext.STENCIL_ATTACHMENT*/0x8D20,/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41, this._depthStencilBuffer);
						break;
					case /*laya.webgl.WebGLContext.DEPTH_STENCIL*/0x84F9:
						gl.framebufferRenderbuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40,/*laya.webgl.WebGLContext.DEPTH_STENCIL_ATTACHMENT*/0x821A,/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41, this._depthStencilBuffer);
						break;
				}
			}
			gl.bindFramebuffer(/*laya.webgl.WebGLContext.FRAMEBUFFER*/0x8D40, null);
			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
			gl.bindRenderbuffer(/*laya.webgl.WebGLContext.RENDERBUFFER*/0x8D41, null);
			this.memorySize = this._w * this._h * 4;
			this.completeCreate();
		}

		__proto.detoryResource = function () {
			if (this._frameBuffer) {
				WebGL.mainContext.deleteTexture(this._source);
				WebGL.mainContext.deleteFramebuffer(this._frameBuffer);
				WebGL.mainContext.deleteRenderbuffer(this._depthStencilBuffer);
				this._source = null;
				this._frameBuffer = null;
				this._depthStencilBuffer = null;
				this.memorySize = 0;
			}
		}

		__getset(0, __proto, 'depthStencilBuffer', function () {
			return this._depthStencilBuffer;
		});

		__getset(0, __proto, 'frameBuffer', function () {
			return this._frameBuffer;
		});

		return WebGLRenderTarget;
	})(Bitmap)


	//class laya.webgl.resource.WebGLSubImage extends laya.resource.Bitmap
	var WebGLSubImage = (function (_super) {
		function WebGLSubImage(canvas, offsetX, offsetY, width, height, atlasImage, src) {
			/**HTML Context*/
			//this._ctx=null;
			/***是否创建私有Source,值为false时不根据src创建私有WebGLTexture,同时销毁时也只清空source=null,不调用WebGL.mainContext.deleteTexture类似函数，调用资源激活前有效*/
			//this._allowMerageInAtlas=false;
			/**是否允许加入大图合集*/
			//this._enableMerageInAtlas=false;
			/**HTML Canvas，绘制子图载体,非私有数据载体*/
			//this.canvas=null;
			/**是否使用重复模式纹理寻址*/
			//this.repeat=false;
			/**是否使用mipLevel*/
			//this.mipmap=false;
			/**缩小过滤器*/
			//this.minFifter=0;
			/**放大过滤器*/
			//this.magFifter=0;
			//动态默认值，判断是否可生成miplevel
			//this.atlasImage=null;
			this.offsetX = 0;
			this.offsetY = 0;
			//this.src=null;
			WebGLSubImage.__super.call(this);
			this.repeat = true;
			this.mipmap = false;
			this.minFifter = -1;
			this.magFifter = -1;
			this.atlasImage = atlasImage;
			this.canvas = canvas;
			this._ctx = canvas.getContext('2d', undefined);
			this._w = width;
			this._h = height;
			this.offsetX = offsetX;
			this.offsetY = offsetY;
			this.src = src;
			this._enableMerageInAtlas = true;
			(AtlasResourceManager.enabled) && (this._w < AtlasResourceManager.atlasLimitWidth && this._h < AtlasResourceManager.atlasLimitHeight) ? this._allowMerageInAtlas = true : this._allowMerageInAtlas = false;
		}

		__class(WebGLSubImage, 'laya.webgl.resource.WebGLSubImage', _super);
		var __proto = WebGLSubImage.prototype;
		Laya.imps(__proto, { "laya.webgl.resource.IMergeAtlasBitmap": true })
		/*override public function copyTo(dec:Bitmap):void {
		var d:WebGLSubImage=dec as WebGLSubImage;
		super.copyTo(dec);
		d._ctx=_ctx;
	}*/


		__proto.size = function (w, h) {
			this._w = w;
			this._h = h;
			this._ctx && this._ctx.size(w, h);
			this.canvas && (this.canvas.height = h, this.canvas.width = w);
		}


		__proto.recreateResource = function () {
			this.size(this._w, this._h);
			this._ctx.drawImage(this.atlasImage, this.offsetX, this.offsetY, this._w, this._h, 0, 0, this._w, this._h);
			(!(this._allowMerageInAtlas && this._enableMerageInAtlas)) ? (this.createWebGlTexture()) : (this.memorySize = 0);
			this.completeCreate();
		}


		__proto.createWebGlTexture = function () {
			var gl = WebGL.mainContext;
			if (!this.canvas) {
				throw "create GLTextur err:no data:" + this.canvas;
			};

			var glTex = this._source = gl.createTexture();
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, glTex);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, true);
			gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, this.canvas);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, false);
			var minFifter = this.minFifter;
			var magFifter = this.magFifter;
			var repeat = this.repeat ? /*laya.webgl.WebGLContext.REPEAT*/0x2901 :/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F;
			var isPOT = Arith.isPOT(this.width, this.height);
			if (isPOT) {
				if (this.mipmap)
					(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR_MIPMAP_LINEAR*/0x2703);
				else
		(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter !== -1) || (magFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802, repeat);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803, repeat);
				this.mipmap && gl.generateMipmap(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1);
			} else {
				(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter !== -1) || (magFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			}

			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
			this.canvas = null;
			this.memorySize = this._w * this._h * 4;
		}


		__proto.detoryResource = function () {
			if (!(AtlasResourceManager.enabled && this._allowMerageInAtlas) && this._source) {
				WebGL.mainContext.deleteTexture(this._source);
				this._source = null;
				this.memorySize = 0;
			}

		}


		//}
		__proto.clearAtlasSource = function () { }
		/**
		*是否创建私有Source
		*@return 是否创建
		*/
		__getset(0, __proto, 'allowMerageInAtlas', function () {
			return this._allowMerageInAtlas;
		});


		//public var createFromPixel:Boolean=true;
		__getset(0, __proto, 'atlasSource', function () {
			return this.canvas;
		});


		/**
		*是否创建私有Source,通常禁止修改
		*@param value 是否创建
		*/
		/**
		*是否创建私有Source
		*@return 是否创建
		*/
		__getset(0, __proto, 'enableMerageInAtlas', function () {
			return this._allowMerageInAtlas;
		}, function (value) {

			this._allowMerageInAtlas = value;
		});


		return WebGLSubImage;
	})(Bitmap)


	//class laya.webgl.shader.Shader extends laya.webgl.shader.BaseShader
	var Shader = (function (_super) {
		function Shader(vs, ps, saveName, nameMap) {
			this.customCompile = false;
			//this._nameMap=null;
			//shader参数别名，语义
			//this._vs=null;
			//this._ps=null;
			this._curActTexIndex = 0;
			//this._reCompile=false;
			//存储一些私有变量
			this.tag = {};
			//this._vshader=null;
			//this._pshader=null;
			this._program = null;
			this._params = null;
			this._paramsMap = {};
			this._offset = 0;
			//this._id=0;
			Shader.__super.call(this);
			if ((!vs) || (!ps)) throw "Shader Error";
			if (Render.isConchApp || Render.isFlash) {
				this.customCompile = true;
			}
			this._id = ++Shader._count;
			this._vs = vs;
			this._ps = ps;
			this._nameMap = nameMap ? nameMap : {};
			saveName != null && (Shader.sharders[saveName] = this);
		}

		__class(Shader, 'laya.webgl.shader.Shader', _super);
		var __proto = Shader.prototype;
		__proto.recreateResource = function () {
			this._compile();
			this.completeCreate();
			this.memorySize = 0;
		}

		//忽略尺寸尺寸
		__proto.detoryResource = function () {
			WebGL.mainContext.deleteShader(this._vshader);
			WebGL.mainContext.deleteShader(this._pshader);
			WebGL.mainContext.deleteProgram(this._program);
			this._vshader = this._pshader = this._program = null;
			this._params = null;
			this._paramsMap = {};
			this.memorySize = 0;
			this._curActTexIndex = 0;
		}

		__proto._compile = function () {
			if (!this._vs || !this._ps || this._params)
				return;
			this._reCompile = true;
			this._params = [];
			var text = [this._vs, this._ps];
			var result;
			if (this.customCompile)
				result = ShaderCompile.preGetParams(this._vs, this._ps);
			var gl = WebGL.mainContext;
			this._program = gl.createProgram();
			this._vshader = Shader._createShader(gl, text[0],/*laya.webgl.WebGLContext.VERTEX_SHADER*/0x8B31);
			this._pshader = Shader._createShader(gl, text[1],/*laya.webgl.WebGLContext.FRAGMENT_SHADER*/0x8B30);
			gl.attachShader(this._program, this._vshader);
			gl.attachShader(this._program, this._pshader);
			gl.linkProgram(this._program);
			if (!this.customCompile && !gl.getProgramParameter(this._program,/*laya.webgl.WebGLContext.LINK_STATUS*/0x8B82)) {
				throw gl.getProgramInfoLog(this._program);
			};
			var one, i = 0, j = 0, n = 0, location;
			var attribNum = this.customCompile ? result.attributes.length : gl.getProgramParameter(this._program,/*laya.webgl.WebGLContext.ACTIVE_ATTRIBUTES*/0x8B89);
			for (i = 0; i < attribNum; i++) {
				var attrib = this.customCompile ? result.attributes[i] : gl.getActiveAttrib(this._program, i);
				location = gl.getAttribLocation(this._program, attrib.name);
				one = { vartype: "attribute", glfun: null, ivartype: 0, attrib: attrib, location: location, name: attrib.name, type: attrib.type, isArray: false, isSame: false, preValue: null, indexOfParams: 0 };
				this._params.push(one);
			};
			var nUniformNum = this.customCompile ? result.uniforms.length : gl.getProgramParameter(this._program,/*laya.webgl.WebGLContext.ACTIVE_UNIFORMS*/0x8B86);
			for (i = 0; i < nUniformNum; i++) {
				var uniform = this.customCompile ? result.uniforms[i] : gl.getActiveUniform(this._program, i);
				location = gl.getUniformLocation(this._program, uniform.name);
				one = { vartype: "uniform", glfun: null, ivartype: 1, attrib: attrib, location: location, name: uniform.name, type: uniform.type, isArray: false, isSame: false, preValue: null, indexOfParams: 0 };
				if (one.name.indexOf('[0]') > 0) {
					one.name = one.name.substr(0, one.name.length - 3);
					one.isArray = true;
					one.location = gl.getUniformLocation(this._program, one.name);
				}
				this._params.push(one);
			}
			for (i = 0, n = this._params.length; i < n; i++) {
				one = this._params[i];
				one.indexOfParams = i;
				one.index = 1;
				one.value = [one.location, null];
				one.codename = one.name;
				one.name = this._nameMap[one.codename] ? this._nameMap[one.codename] : one.codename;
				this._paramsMap[one.name] = one;
				one._this = this;
				one.uploadedValue = [];
				if (one.vartype === "attribute") {
					one.fun = this._attribute;
					continue;
				}
				switch (one.type) {
					case /*laya.webgl.WebGLContext.INT*/0x1404:
						one.fun = one.isArray ? this._uniform1iv : this._uniform1i;
						break;
					case /*laya.webgl.WebGLContext.FLOAT*/0x1406:
						one.fun = one.isArray ? this._uniform1fv : this._uniform1f;
						break;
					case /*laya.webgl.WebGLContext.FLOAT_VEC2*/0x8B50:
						one.fun = one.isArray ? this._uniform_vec2v : this._uniform_vec2;
						break;
					case /*laya.webgl.WebGLContext.FLOAT_VEC3*/0x8B51:
						one.fun = one.isArray ? this._uniform_vec3v : this._uniform_vec3;
						break;
					case /*laya.webgl.WebGLContext.FLOAT_VEC4*/0x8B52:
						one.fun = one.isArray ? this._uniform_vec4v : this._uniform_vec4;
						break;
					case /*laya.webgl.WebGLContext.SAMPLER_2D*/0x8B5E:
						one.fun = this._uniform_sampler2D;
						break;
					case /*laya.webgl.WebGLContext.SAMPLER_CUBE*/0x8B60:
						one.fun = this._uniform_samplerCube;
						break;
					case /*laya.webgl.WebGLContext.FLOAT_MAT4*/0x8B5C:
						one.glfun = gl.uniformMatrix4fv;
						one.fun = this._uniformMatrix4fv;
						break;
					case /*laya.webgl.WebGLContext.BOOL*/0x8B56:
						one.fun = this._uniform1i;
						break;
					case /*laya.webgl.WebGLContext.FLOAT_MAT2*/0x8B5A:
					case /*laya.webgl.WebGLContext.FLOAT_MAT3*/0x8B5B:
						throw new Error("compile shader err!");
						break;
					default:
						throw new Error("compile shader err!");
						break;
				}
			}
		}

		/**
		*根据变量名字获得
		*@param name
		*@return
		*/
		__proto.getUniform = function (name) {
			return this._paramsMap[name];
		}

		__proto._attribute = function (one, value) {
			var gl = WebGL.mainContext;
			var enableAtributes = Buffer._enableAtributes;
			var location = one.location;
			(enableAtributes[location]) || (gl.enableVertexAttribArray(location));
			gl.vertexAttribPointer(location, value[0], value[1], value[2], value[3], value[4] + this._offset);
			enableAtributes[location] = Buffer._bindVertexBuffer;
			return 1;
		}

		__proto._uniform1f = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value) {
				WebGL.mainContext.uniform1f(one.location, uploadedValue[0] = value);
				return 1;
			}
			return 0;
		}

		__proto._uniform1fv = function (one, value) {
			if (value.length < 4) {
				var uploadedValue = one.uploadedValue;
				if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
					WebGL.mainContext.uniform1fv(one.location, value);
					uploadedValue[0] = value[0];
					uploadedValue[1] = value[1];
					uploadedValue[2] = value[2];
					uploadedValue[3] = value[3];
					return 1;
				}
				return 0;
			} else {
				WebGL.mainContext.uniform1fv(one.location, value);
				return 1;
			}
		}

		__proto._uniform_vec2 = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1]) {
				WebGL.mainContext.uniform2f(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1]);
				return 1;
			}
			return 0;
		}

		__proto._uniform_vec2v = function (one, value) {
			if (value.length < 2) {
				var uploadedValue = one.uploadedValue;
				if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
					WebGL.mainContext.uniform2fv(one.location, value);
					uploadedValue[0] = value[0];
					uploadedValue[1] = value[1];
					uploadedValue[2] = value[2];
					uploadedValue[3] = value[3];
					return 1;
				}
				return 0;
			} else {
				WebGL.mainContext.uniform2fv(one.location, value);
				return 1;
			}
		}

		__proto._uniform_vec3 = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2]) {
				WebGL.mainContext.uniform3f(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2]);
				return 1;
			}
			return 0;
		}

		__proto._uniform_vec3v = function (one, value) {
			WebGL.mainContext.uniform3fv(one.location, value);
			return 1;
		}

		__proto._uniform_vec4 = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
				WebGL.mainContext.uniform4f(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2], uploadedValue[3] = value[3]);
				return 1;
			}
			return 0;
		}

		__proto._uniform_vec4v = function (one, value) {
			WebGL.mainContext.uniform4fv(one.location, value);
			return 1;
		}

		__proto._uniformMatrix2fv = function (one, value) {
			WebGL.mainContext.uniformMatrix2fv(one.location, false, value);
			return 1;
		}

		__proto._uniformMatrix3fv = function (one, value) {
			WebGL.mainContext.uniformMatrix3fv(one.location, false, value);
			return 1;
		}

		__proto._uniformMatrix4fv = function (one, value) {
			WebGL.mainContext.uniformMatrix4fv(one.location, false, value);
			return 1;
		}

		__proto._uniform1i = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value) {
				WebGL.mainContext.uniform1i(one.location, uploadedValue[0] = value);
				return 1;
			}
			return 0;
		}

		__proto._uniform1iv = function (one, value) {
			WebGL.mainContext.uniform1iv(one.location, value);
			return 1;
		}

		__proto._uniform_ivec2 = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1]) {
				WebGL.mainContext.uniform2i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1]);
				return 1;
			}
			return 0;
		}

		__proto._uniform_ivec2v = function (one, value) {
			WebGL.mainContext.uniform2iv(one.location, value);
			return 1;
		}

		__proto._uniform_vec3i = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2]) {
				WebGL.mainContext.uniform3i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2]);
				return 1;
			}
			return 0;
		}

		__proto._uniform_vec3vi = function (one, value) {
			WebGL.mainContext.uniform3iv(one.location, value);
			return 1;
		}

		__proto._uniform_vec4i = function (one, value) {
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] !== value[0] || uploadedValue[1] !== value[1] || uploadedValue[2] !== value[2] || uploadedValue[3] !== value[3]) {
				WebGL.mainContext.uniform4i(one.location, uploadedValue[0] = value[0], uploadedValue[1] = value[1], uploadedValue[2] = value[2], uploadedValue[3] = value[3]);
				return 1;
			}
			return 0;
		}

		__proto._uniform_vec4vi = function (one, value) {
			WebGL.mainContext.uniform4iv(one.location, value);
			return 1;
		}

		__proto._uniform_sampler2D = function (one, value) {
			var gl = WebGL.mainContext;
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] == null) {
				uploadedValue[0] = this._curActTexIndex;
				gl.uniform1i(one.location, this._curActTexIndex);
				gl.activeTexture(Shader._TEXTURES[this._curActTexIndex]);
				WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, value);
				this._curActTexIndex++;
				return 1;
			} else {
				gl.activeTexture(Shader._TEXTURES[uploadedValue[0]]);
				WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, value);
				return 0;
			}
		}

		__proto._uniform_samplerCube = function (one, value) {
			var gl = WebGL.mainContext;
			var uploadedValue = one.uploadedValue;
			if (uploadedValue[0] == null) {
				uploadedValue[0] = this._curActTexIndex;
				gl.uniform1i(one.location, this._curActTexIndex);
				gl.activeTexture(Shader._TEXTURES[this._curActTexIndex]);
				WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_CUBE_MAP*/0x8513, value);
				this._curActTexIndex++;
				return 1;
			} else {
				gl.activeTexture(Shader._TEXTURES[uploadedValue[0]]);
				WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_CUBE_MAP*/0x8513, value);
				return 0;
			}
		}

		__proto._noSetValue = function (one) {
			console.log("no....:" + one.name);
		}

		//throw new Error("upload shader err,must set value:"+one.name);
		__proto.uploadOne = function (name, value) {
			this.activeResource();
			WebGLContext.UseProgram(this._program);
			var one = this._paramsMap[name];
			one.fun.call(this, one, value);
		}

		__proto.uploadTexture2D = function (value) {
			Stat.shaderCall++;
			var gl = WebGL.mainContext;
			gl.activeTexture(/*laya.webgl.WebGLContext.TEXTURE0*/0x84C0);
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, value);
		}

		/**
		*提交shader到GPU
		*@param shaderValue
		*/
		__proto.upload = function (shaderValue, params) {
			BaseShader.activeShader = BaseShader.bindShader = this;
			this._lastUseFrameCount === Stat.loopCount || this.activeResource();
			WebGLContext.UseProgram(this._program);
			if (this._reCompile) {
				params = this._params;
				this._reCompile = false;
			} else {
				params = params || this._params;
			};
			var gl = WebGL.mainContext;
			var one, value, n = params.length, shaderCall = 0;
			for (var i = 0; i < n; i++) {
				one = params[i];
				if ((value = shaderValue[one.name]) !== null)
					shaderCall += one.fun.call(this, one, value);
			}
			Stat.shaderCall += shaderCall;
		}

		/**
		*按数组的定义提交
		*@param shaderValue 数组格式[name,value,...]
		*/
		__proto.uploadArray = function (shaderValue, length, _bufferUsage) {
			BaseShader.activeShader = this;
			BaseShader.bindShader = this;
			this.activeResource();
			WebGLContext.UseProgram(this._program);
			var params = this._params, value;
			var one, shaderCall = 0;
			for (var i = length - 2; i >= 0; i -= 2) {
				one = this._paramsMap[shaderValue[i]];
				if (!one)
					continue;
				value = shaderValue[i + 1];
				if (value != null) {
					_bufferUsage && _bufferUsage[one.name] && _bufferUsage[one.name].bind();
					shaderCall += one.fun.call(this, one, value);
				}
			}
			Stat.shaderCall += shaderCall;
		}

		/**
		*得到编译后的变量及相关预定义
		*@return
		*/
		__proto.getParams = function () {
			return this._params;
		}

		Shader.getShader = function (name) {
			return Shader.sharders[name];
		}

		Shader.create = function (vs, ps, saveName, nameMap) {
			return new Shader(vs, ps, saveName, nameMap);
		}

		Shader.withCompile = function (nameID, define, shaderName, createShader) {
			if (shaderName && Shader.sharders[shaderName])
				return Shader.sharders[shaderName];
			var pre = Shader._preCompileShader[0.0002 * nameID];
			if (!pre)
				throw new Error("withCompile shader err!" + nameID);
			return pre.createShader(define, shaderName, createShader);
		}

		Shader.withCompile2D = function (nameID, mainID, define, shaderName, createShader) {
			if (shaderName && Shader.sharders[shaderName])
				return Shader.sharders[shaderName];
			var pre = Shader._preCompileShader[0.0002 * nameID + mainID];
			if (!pre)
				throw new Error("withCompile shader err!" + nameID + " " + mainID);
			return pre.createShader(define, shaderName, createShader);
		}

		Shader.addInclude = function (fileName, txt) {
			ShaderCompile.addInclude(fileName, txt);
		}

		Shader.preCompile = function (nameID, vs, ps, nameMap) {
			var id = 0.0002 * nameID;
			Shader._preCompileShader[id] = new ShaderCompile(id, vs, ps, nameMap);
		}

		Shader.preCompile2D = function (nameID, mainID, vs, ps, nameMap) {
			var id = 0.0002 * nameID + mainID;
			Shader._preCompileShader[id] = new ShaderCompile(id, vs, ps, nameMap);
		}

		Shader._createShader = function (gl, str, type) {
			var shader = gl.createShader(type);
			gl.shaderSource(shader, str);
			gl.compileShader(shader);
			return shader;
		}

		Shader._count = 0;
		Shader._preCompileShader = {};
		Shader.SHADERNAME2ID = 0.0002;
		__static(Shader,
			['_TEXTURES', function () { return this._TEXTURES = [ /*laya.webgl.WebGLContext.TEXTURE0*/0x84C0,/*laya.webgl.WebGLContext.TEXTURE1*/0x84C1,/*laya.webgl.WebGLContext.TEXTURE2*/0x84C2,/*laya.webgl.WebGLContext.TEXTURE3*/0x84C3,/*laya.webgl.WebGLContext.TEXTURE4*/0x84C4,/*laya.webgl.WebGLContext.TEXTURE5*/0x84C5,/*laya.webgl.WebGLContext.TEXTURE6*/0x84C6, ,/*laya.webgl.WebGLContext.TEXTURE7*/0x84C7,/*laya.webgl.WebGLContext.TEXTURE8*/0x84C8]; }, 'nameKey', function () { return this.nameKey = new StringKey(); }, 'sharders', function () { return this.sharders = (Shader.sharders = [], Shader.sharders.length = 0x20, Shader.sharders); }
			]);
		return Shader;
	})(BaseShader)


	//class laya.webgl.utils.Buffer2D extends laya.webgl.utils.Buffer
	var Buffer2D = (function (_super) {
		function Buffer2D() {
			this._maxsize = 0;
			this._upload = true;
			this._uploadSize = 0;
			Buffer2D.__super.call(this);
			this.lock = true;
		}

		__class(Buffer2D, 'laya.webgl.utils.Buffer2D', _super);
		var __proto = Buffer2D.prototype;
		__proto._bufferData = function () {
			this._maxsize = Math.max(this._maxsize, this._byteLength);
			if (Stat.loopCount % 30 == 0) {
				if (this._buffer.byteLength > (this._maxsize + 64)) {
					this.memorySize = this._buffer.byteLength;
					this._buffer = this._buffer.slice(0, this._maxsize + 64);
					this._checkArrayUse();
				}
				this._maxsize = this._byteLength;
			}
			if (this._uploadSize < this._buffer.byteLength) {
				this._uploadSize = this._buffer.byteLength;
				Buffer._gl.bufferData(this._bufferType, this._uploadSize, this._bufferUsage);
				this.memorySize = this._uploadSize;
			}
			Buffer._gl.bufferSubData(this._bufferType, 0, this._buffer);
		}

		__proto._bufferSubData = function (offset, dataStart, dataLength) {
			(offset === void 0) && (offset = 0);
			(dataStart === void 0) && (dataStart = 0);
			(dataLength === void 0) && (dataLength = 0);
			this._maxsize = Math.max(this._maxsize, this._byteLength);
			if (Stat.loopCount % 30 == 0) {
				if (this._buffer.byteLength > (this._maxsize + 64)) {
					this.memorySize = this._buffer.byteLength;
					this._buffer = this._buffer.slice(0, this._maxsize + 64);
					this._checkArrayUse();
				}
				this._maxsize = this._byteLength;
			}
			if (this._uploadSize < this._buffer.byteLength) {
				this._uploadSize = this._buffer.byteLength;
				Buffer._gl.bufferData(this._bufferType, this._uploadSize, this._bufferUsage);
				this.memorySize = this._uploadSize;
			}
			if (dataStart || dataLength) {
				var subBuffer = this._buffer.slice(dataStart, dataLength);
				Buffer._gl.bufferSubData(this._bufferType, offset, subBuffer);
			} else {
				Buffer._gl.bufferSubData(this._bufferType, offset, this._buffer);
			}
		}

		__proto._checkArrayUse = function () { }
		__proto._bind_upload = function () {
			if (!this._upload)
				return false;
			this._upload = false;
			this._bind();
			this._bufferData();
			return true;
		}

		__proto._bind_subUpload = function (offset, dataStart, dataLength) {
			(offset === void 0) && (offset = 0);
			(dataStart === void 0) && (dataStart = 0);
			(dataLength === void 0) && (dataLength = 0);
			if (!this._upload)
				return false;
			this._upload = false;
			this._bind();
			this._bufferSubData(offset, dataStart, dataLength);
			return true;
		}

		__proto._resizeBuffer = function (nsz, copy) {
			if (nsz < this._buffer.byteLength)
				return this;
			this.memorySize = nsz;
			if (copy && this._buffer && this._buffer.byteLength > 0) {
				var newbuffer = new ArrayBuffer(nsz);
				var n = new Uint8Array(newbuffer);
				n.set(new Uint8Array(this._buffer), 0);
				this._buffer = newbuffer;
			} else
				this._buffer = new ArrayBuffer(nsz);
			this._checkArrayUse();
			this._upload = true;
			return this;
		}

		__proto.append = function (data) {
			this._upload = true;
			var byteLen = 0, n;
			byteLen = data.byteLength;
			if ((data instanceof Uint8Array)) {
				this._resizeBuffer(this._byteLength + byteLen, true);
				n = new Uint8Array(this._buffer, this._byteLength);
			} else if ((data instanceof Uint16Array)) {
				this._resizeBuffer(this._byteLength + byteLen, true);
				n = new Uint16Array(this._buffer, this._byteLength);
			} else if ((data instanceof Float32Array)) {
				this._resizeBuffer(this._byteLength + byteLen, true);
				n = new Float32Array(this._buffer, this._byteLength);
			}
			n.set(data, 0);
			this._byteLength += byteLen;
			this._checkArrayUse();
		}

		__proto.appendEx = function (data, type) {
			this._upload = true;
			var byteLen = 0, n;
			byteLen = data.byteLength;
			this._resizeBuffer(this._byteLength + byteLen, true);
			n = new type(this._buffer, this._byteLength);
			n.set(data, 0);
			this._byteLength += byteLen;
			this._checkArrayUse();
		}

		__proto.appendEx2 = function (data, type, dataLen, perDataLen) {
			(perDataLen === void 0) && (perDataLen = 1);
			this._upload = true;
			var byteLen = 0, n;
			byteLen = dataLen * perDataLen;
			this._resizeBuffer(this._byteLength + byteLen, true);
			n = new type(this._buffer, this._byteLength);
			var i = 0;
			for (i = 0; i < dataLen; i++) {
				n[i] = data[i];
			}
			this._byteLength += byteLen;
			this._checkArrayUse();
		}

		__proto.getBuffer = function () {
			return this._buffer;
		}

		__proto.setNeedUpload = function () {
			this._upload = true;
		}

		__proto.getNeedUpload = function () {
			return this._upload;
		}

		__proto.upload = function () {
			var scuess = this._bind_upload();
			Buffer._gl.bindBuffer(this._bufferType, null);
			Buffer._bindActive[this._bufferType] = null;
			BaseShader.activeShader = null
			return scuess;
		}

		__proto.subUpload = function (offset, dataStart, dataLength) {
			(offset === void 0) && (offset = 0);
			(dataStart === void 0) && (dataStart = 0);
			(dataLength === void 0) && (dataLength = 0);
			var scuess = this._bind_subUpload();
			Buffer._gl.bindBuffer(this._bufferType, null);
			Buffer._bindActive[this._bufferType] = null;
			BaseShader.activeShader = null
			return scuess;
		}

		__proto.detoryResource = function () {
			_super.prototype.detoryResource.call(this);
			this._upload = true;
			this._uploadSize = 0;
		}

		__proto.clear = function () {
			this._byteLength = 0;
			this._upload = true;
		}

		__getset(0, __proto, 'bufferLength', function () {
			return this._buffer.byteLength;
		});

		__getset(0, __proto, 'byteLength', null, function (value) {
			if (this._byteLength === value)
				return;
			value <= this._buffer.byteLength || (this._resizeBuffer(value * 2 + 256, true));
			this._byteLength = value;
		});

		Buffer2D.__int__ = function (gl) {
			IndexBuffer2D.QuadrangleIB = IndexBuffer2D.create(/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
			GlUtils.fillIBQuadrangle(IndexBuffer2D.QuadrangleIB, 16);
		}

		Buffer2D.FLOAT32 = 4;
		Buffer2D.SHORT = 2;
		return Buffer2D;
	})(Buffer)


	//class laya.webgl.shader.d2.value.GlowSV extends laya.webgl.shader.d2.value.TextureSV
	var GlowSV = (function (_super) {
		function GlowSV(args) {
			this.u_blurX = false;
			this.u_color = null;
			this.u_offset = null;
			this.u_strength = NaN;
			this.u_texW = 0;
			this.u_texH = 0;
			GlowSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.FILTERGLOW*/0x08 | /*laya.webgl.shader.d2.ShaderDefines2D.TEXTURE2D*/0x01);
		}

		__class(GlowSV, 'laya.webgl.shader.d2.value.GlowSV', _super);
		var __proto = GlowSV.prototype;
		__proto.setValue = function (vo) {
			_super.prototype.setValue.call(this, vo);
		}

		__proto.clear = function () {
			_super.prototype.clear.call(this);
		}

		return GlowSV;
	})(TextureSV)


	//class laya.webgl.shader.d2.value.TextSV extends laya.webgl.shader.d2.value.TextureSV
	var TextSV = (function (_super) {
		function TextSV(args) {
			TextSV.__super.call(this,/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
			this.defines.add(/*laya.webgl.shader.d2.ShaderDefines2D.COLORADD*/0x40);
		}

		__class(TextSV, 'laya.webgl.shader.d2.value.TextSV', _super);
		var __proto = TextSV.prototype;
		__proto.release = function () {
			TextSV.pool[TextSV._length++] = this;
			this.clear();
		}

		__proto.clear = function () {
			_super.prototype.clear.call(this);
		}

		TextSV.create = function () {
			if (TextSV._length) return TextSV.pool[--TextSV._length];
			else return new TextSV(null);
		}

		TextSV.pool = [];
		TextSV._length = 0;
		return TextSV;
	})(TextureSV)


	//class laya.webgl.shader.d2.Shader2X extends laya.webgl.shader.Shader
	var Shader2X = (function (_super) {
		function Shader2X(vs, ps, saveName, nameMap) {
			this._params2dQuick1 = null;
			this._params2dQuick2 = null;
			this._shaderValueWidth = NaN;
			this._shaderValueHeight = NaN;
			Shader2X.__super.call(this, vs, ps, saveName, nameMap);
		}

		__class(Shader2X, 'laya.webgl.shader.d2.Shader2X', _super);
		var __proto = Shader2X.prototype;
		__proto.upload2dQuick1 = function (shaderValue) {
			this.upload(shaderValue, this._params2dQuick1 || this._make2dQuick1());
		}

		__proto._make2dQuick1 = function () {
			if (!this._params2dQuick1) {
				this.activeResource();
				this._params2dQuick1 = [];
				var params = this._params, one;
				for (var i = 0, n = params.length; i < n; i++) {
					one = params[i];
					if (!Render.isFlash && (one.name === "size" || one.name === "position" || one.name === "texcoord")) continue;
					this._params2dQuick1.push(one);
				}
			}
			return this._params2dQuick1;
		}

		__proto.detoryResource = function () {
			_super.prototype.detoryResource.call(this);
			this._params2dQuick1 = null;
			this._params2dQuick2 = null;
		}

		__proto.upload2dQuick2 = function (shaderValue) {
			this.upload(shaderValue, this._params2dQuick2 || this._make2dQuick2());
		}

		__proto._make2dQuick2 = function () {
			if (!this._params2dQuick2) {
				this.activeResource();
				this._params2dQuick2 = [];
				var params = this._params, one;
				for (var i = 0, n = params.length; i < n; i++) {
					one = params[i];
					if (!Render.isFlash && (one.name === "size")) continue;
					this._params2dQuick2.push(one);
				}
			}
			return this._params2dQuick2;
		}

		Shader2X.create = function (vs, ps, saveName, nameMap) {
			return new Shader2X(vs, ps, saveName, nameMap);
		}

		return Shader2X;
	})(Shader)


	//class laya.webgl.utils.IndexBuffer2D extends laya.webgl.utils.Buffer2D
	var IndexBuffer2D = (function (_super) {
		function IndexBuffer2D(bufferUsage) {
			this._uint8Array = null;
			this._uint16Array = null;
			(bufferUsage === void 0) && (bufferUsage =/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
			IndexBuffer2D.__super.call(this);
			this._bufferUsage = bufferUsage;
			this._bufferType =/*laya.webgl.WebGLContext.ELEMENT_ARRAY_BUFFER*/0x8893;
			Render.isFlash || (this._buffer = new ArrayBuffer(8));
		}

		__class(IndexBuffer2D, 'laya.webgl.utils.IndexBuffer2D', _super);
		var __proto = IndexBuffer2D.prototype;
		__proto._checkArrayUse = function () {
			this._uint8Array && (this._uint8Array = new Uint8Array(this._buffer));
			this._uint16Array && (this._uint16Array = new Uint16Array(this._buffer));
		}

		__proto.getUint8Array = function () {
			return this._uint8Array || (this._uint8Array = new Uint8Array(this._buffer));
		}

		__proto.getUint16Array = function () {
			return this._uint16Array || (this._uint16Array = new Uint16Array(this._buffer));
		}

		__proto.destory = function () {
			this._uint16Array = null;
			this._uint8Array = null;
			this._buffer = null;
		}

		IndexBuffer2D.QuadrangleIB = null;
		IndexBuffer2D.create = function (bufferUsage) {
			(bufferUsage === void 0) && (bufferUsage =/*laya.webgl.WebGLContext.STATIC_DRAW*/0x88E4);
			return new IndexBuffer2D(bufferUsage);
		}

		return IndexBuffer2D;
	})(Buffer2D)


	//class laya.webgl.utils.VertexBuffer2D extends laya.webgl.utils.Buffer2D
	var VertexBuffer2D = (function (_super) {
		function VertexBuffer2D(vertexStride, bufferUsage) {
			this._floatArray32 = null;
			this._vertexStride = 0;
			VertexBuffer2D.__super.call(this);
			this._vertexStride = vertexStride;
			this._bufferUsage = bufferUsage;
			this._bufferType =/*laya.webgl.WebGLContext.ARRAY_BUFFER*/0x8892;
			Render.isFlash || (this._buffer = new ArrayBuffer(8));
			this.getFloat32Array();
		}

		__class(VertexBuffer2D, 'laya.webgl.utils.VertexBuffer2D', _super);
		var __proto = VertexBuffer2D.prototype;
		__proto.getFloat32Array = function () {
			return this._floatArray32 || (this._floatArray32 = new Float32Array(this._buffer));
		}

		__proto.bind = function (ibBuffer) {
			(ibBuffer) && (ibBuffer._bind());
			this._bind();
		}

		__proto.insertData = function (data, pos) {
			var vbdata = this.getFloat32Array();
			vbdata.set(data, pos);
			this._upload = true;
		}

		__proto.bind_upload = function (ibBuffer) {
			(ibBuffer._bind_upload()) || (ibBuffer._bind());
			(this._bind_upload()) || (this._bind());
		}

		__proto._checkArrayUse = function () {
			this._floatArray32 && (this._floatArray32 = new Float32Array(this._buffer));
		}

		__proto.detoryResource = function () {
			_super.prototype.detoryResource.call(this);
			var enableAtributes = Buffer._enableAtributes;
			for (var i = 0; i < 10; i++) {
				WebGL.mainContext.disableVertexAttribArray(i);
				enableAtributes[i] = null;
			}
		}

		//}
		__proto.destory = function () {
			this._byteLength = 0;
			this._upload = true;
			this._buffer = null;
			this._floatArray32 = null;
		}

		__getset(0, __proto, 'vertexStride', function () {
			return this._vertexStride;
		});

		VertexBuffer2D.create = function (vertexStride, bufferUsage) {
			(bufferUsage === void 0) && (bufferUsage =/*laya.webgl.WebGLContext.DYNAMIC_DRAW*/0x88E8);
			return new VertexBuffer2D(vertexStride, bufferUsage);
		}

		return VertexBuffer2D;
	})(Buffer2D)


	//class laya.webgl.resource.WebGLImage extends laya.resource.HTMLImage
	var WebGLImage = (function (_super) {
		function WebGLImage(data, def, format, mipmap) {
			/**@private */
			this._format = 0;
			/**@private */
			this._mipmap = false;
			/***是否创建私有Source,值为false时不根据src创建私有WebGLTexture,同时销毁时也只清空source=null,不调用WebGL.mainContext.deleteTexture类似函数，调用资源激活前有效*/
			this._allowMerageInAtlas = false;
			/**是否允许加入大图合集*/
			this._enableMerageInAtlas = false;
			/**是否使用重复模式纹理寻址*/
			this.repeat = false;
			/**@private */
			this._image = null;
			/**缩小过滤器*/
			this.minFifter = 0;
			/**放大过滤器*/
			this.magFifter = 0;
			(format === void 0) && (format =/*laya.webgl.WebGLContext.RGBA*/0x1908);
			(mipmap === void 0) && (mipmap = true);
			WebGLImage.__super.call(this, data, def);
			this._format = format;
			this._mipmap = mipmap;
			this.repeat = false;
			this.minFifter = -1;
			this.magFifter = -1;
			if ((typeof data == 'string')) {
				this.url = data;
				this._src = data;
				this._image = new Browser.window.Image();
				if (def) {
					def.onload && (this.onload = def.onload);
					def.onerror && (this.onerror = def.onerror);
					def.onCreate && def.onCreate(this);
				}
				this._image.crossOrigin = (data && (data.indexOf("data:") == 0)) ? null : "";
				(data) && (this._image.src = data);
			} else if ((data instanceof ArrayBuffer)) {
				this._src = def;
				this.url = this._src;
				var readData = new Byte(data);
				var magicNumber = readData.readUTFBytes(4);
				var version = readData.readUTFBytes(2);
				var dataType = readData.getInt16();
				readData.endian =/*laya.utils.Byte.BIG_ENDIAN*/"bigEndian";
				this._w = readData.getInt16();
				this._h = readData.getInt16();
				var originalWidth = readData.getInt16();
				var originalHeight = readData.getInt16();
				this._image = new Uint8Array(data, readData.pos);
				this._format = WebGL.compressEtc1.COMPRESSED_RGB_ETC1_WEBGL;
				(AtlasResourceManager.enabled) && (this._w < AtlasResourceManager.atlasLimitWidth && this._h < AtlasResourceManager.atlasLimitHeight) ? this._allowMerageInAtlas = true : this._allowMerageInAtlas = false;
			} else {
				this._src = def;
				this.url = this._src;
				this._image = data["source"] || data;
				this.onresize();
			}
			this._$5__enableMerageInAtlas = true;
		}

		__class(WebGLImage, 'laya.webgl.resource.WebGLImage', _super);
		var __proto = WebGLImage.prototype;
		Laya.imps(__proto, { "laya.webgl.resource.IMergeAtlasBitmap": true })
		__proto._init_ = function (src, def) { }
		__proto._createWebGlTexture = function () {
			if (!this._image) {
				throw "create GLTextur err:no data:" + this._image;
			};
			var gl = WebGL.mainContext;
			var glTex = this._source = gl.createTexture();
			var preTarget = WebGLContext.curBindTexTarget;
			var preTexture = WebGLContext.curBindTexValue;
			WebGLContext.bindTexture(gl,/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, glTex);
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, true);
			switch (this._format) {
				case /*laya.webgl.WebGLContext.RGBA*/0x1908:
					gl.texImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, this._format,/*laya.webgl.WebGLContext.RGBA*/0x1908,/*laya.webgl.WebGLContext.UNSIGNED_BYTE*/0x1401, this._image);
					break;
				case WebGL.compressEtc1.COMPRESSED_RGB_ETC1_WEBGL:
					gl.compressedTexImage2D(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1, 0, this._format, this._w, this._h, 0, this._image);
					break;
			}
			gl.pixelStorei(/*laya.webgl.WebGLContext.UNPACK_PREMULTIPLY_ALPHA_WEBGL*/0x9241, false);
			var minFifter = this.minFifter;
			var magFifter = this.magFifter;
			var repeat = this.repeat ? /*laya.webgl.WebGLContext.REPEAT*/0x2901 :/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F;
			var isPot = Arith.isPOT(this._w, this._h);
			if (isPot) {
				if (this.mipmap)
					(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR_MIPMAP_LINEAR*/0x2703);
				else
			(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter !== -1) || (magFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802, repeat);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803, repeat);
				this.mipmap && gl.generateMipmap(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1);
			} else {
				(minFifter !== -1) || (minFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				(magFifter !== -1) || (magFifter =/*laya.webgl.WebGLContext.LINEAR*/0x2601);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MIN_FILTER*/0x2801, minFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_MAG_FILTER*/0x2800, magFifter);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_S*/0x2802,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
				gl.texParameteri(/*laya.webgl.WebGLContext.TEXTURE_2D*/0x0DE1,/*laya.webgl.WebGLContext.TEXTURE_WRAP_T*/0x2803,/*laya.webgl.WebGLContext.CLAMP_TO_EDGE*/0x812F);
			}
			(preTarget && preTexture) && (WebGLContext.bindTexture(gl, preTarget, preTexture));
			this._image.onload = null;
			this._image = null;
			if (isPot)
				this.memorySize = this._w * this._h * 4 * (1 + 1 / 3);
			else
				this.memorySize = this._w * this._h * 4;
			this._recreateLock = false;
		}

		/***重新创建资源，如果异步创建中被强制释放再创建，则需等待释放完成后再重新加载创建。*/
		__proto.recreateResource = function () {
			var _$this = this;
			if (this._src == null || this._src === "")
				return;
			this._needReleaseAgain = false;
			if (!this._image) {
				this._recreateLock = true;
				var _this = this;
				this._image = new Browser.window.Image();
				this._image.crossOrigin = this._src.indexOf("data:") == 0 ? null : "";
				this._image.onload = function () {
					if (_this._needReleaseAgain) {
						_this._needReleaseAgain = false;
						_this._image.onload = null;
						_this._image = null;
						return;
					}
					(!(_this._allowMerageInAtlas && _this._enableMerageInAtlas)) ? (_this._createWebGlTexture()) : (_$this.memorySize = 0, _$this._recreateLock = false);
					_this.completeCreate();
				};
				this._image.src = this._src;
			} else {
				if (this._recreateLock) {
					return;
				}
				(!(this._allowMerageInAtlas && this._$5__enableMerageInAtlas)) ? (this._createWebGlTexture()) : (this.memorySize = 0, this._recreateLock = false);
				this.completeCreate();
			}
		}

		/***销毁资源*/
		__proto.detoryResource = function () {
			if (this._recreateLock) {
				this._needReleaseAgain = true;
			}
			if (this._source) {
				WebGL.mainContext.deleteTexture(this._source);
				this._source = null;
				this._image = null;
				this.memorySize = 0;
			}
		}

		/***调整尺寸*/
		__proto.onresize = function () {
			this._w = this._image.width;
			this._h = this._image.height;
			(AtlasResourceManager.enabled) && (this._w < AtlasResourceManager.atlasLimitWidth && this._h < AtlasResourceManager.atlasLimitHeight) ? this._allowMerageInAtlas = true : this._allowMerageInAtlas = false;
		}

		__proto.clearAtlasSource = function () {
			this._image = null;
		}

		/**
		*获取纹理格式。
		*/
		__getset(0, __proto, 'format', function () {
			return this._format;
		});

		/**
		*是否创建私有Source,通常禁止修改
		*@param value 是否创建
		*/
		/**
		*是否创建私有Source
		*@return 是否创建
		*/
		__getset(0, __proto, 'enableMerageInAtlas', function () {
			return this._$5__enableMerageInAtlas;
		}, function (value) {
			this._$5__enableMerageInAtlas = value;
		});

		/**
		*获取是否具有mipmap。
		*/
		__getset(0, __proto, 'mipmap', function () {
			return this._mipmap;
		});

		/**
		*是否创建私有Source
		*@return 是否创建
		*/
		__getset(0, __proto, 'allowMerageInAtlas', function () {
			return this._allowMerageInAtlas;
		});

		__getset(0, __proto, 'atlasSource', function () {
			return this._image;
		});

		/***
		*设置onload函数
		*@param value onload函数
		*/
		__getset(0, __proto, 'onload', null, function (value) {
			var _$this = this;
			this._onload = value;
			this._image && (this._image.onload = this._onload != null ? (function () {
				_$this.onresize();
				_$this._onload();
			}) : null);
		});

		/***
		*设置onerror函数
		*@param value onerror函数
		*/
		__getset(0, __proto, 'onerror', null, function (value) {
			var _$this = this;
			this._onerror = value;
			this._image && (this._image.onerror = this._onerror != null ? (function () {
				_$this._onerror()
			}) : null);
		});

		return WebGLImage;
	})(HTMLImage)


	Laya.__init([DrawText, AtlasGrid, WebGLContext2D, ShaderCompile]);
})(window, document, Laya);

if (typeof define === 'function' && define.amd) {
	define('laya.core', ['require', "exports"], function (require, exports) {
		'use strict';
		Object.defineProperty(exports, '__esModule', { value: true });
		for (var i in Laya) {
			var o = Laya[i];
			o && o.__isclass && (exports[i] = o);
		}
	});
}