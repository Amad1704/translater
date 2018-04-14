!function(t, e, i, n) {
    "use strict";
    var s = n.util
      , r = n.Base
      , a = n.View
      , o = n.Model
      , h = n.Emitter
      , c = n.SyncModel
      , l = n.HTTPError
      , u = n.Presenter
      , d = n.TouchView
      , g = n.HTTPRequest
      , f = n.TemplateView
      , m = n.ListboxModel
      , p = n.ListboxPresenter
      , v = n.ScalableView = f.extend({
        init: function(t) {
            t = t || {},
            this._minScale = v.MIN_SCALE,
            this._maxScale = t.maxScale || v.MAX_SCALE,
            this.on(d.eventTypes.CANCEL, this._onEnd).on(d.eventTypes.WHEEL, this._onWheel).on(d.eventTypes.START, this._onStart).on(d.eventTypes.MOVE, this._onMove).on(d.eventTypes.END, this._onEnd).bindDOMEvents([d.eventTypes.CANCEL, d.eventTypes.WHEEL, d.eventTypes.START, d.eventTypes.MOVE, d.eventTypes.END]).reset()
        },
        reset: function() {
            return this._dx = 0,
            this._dy = 0,
            this._scale = 1,
            this._lastPoints = [],
            this.update()
        },
        update: function(t) {
            var e = this.getElement().style
              , i = ["translate(", this._dx + "px,", this._dy + "px", ") ", "scale(", this._scale, ")"];
            return t && i.push(" translateZ(0)"),
            e.transform = e.MozTransform = e.WebkitTransform = i.join(""),
            this.emit("update", this._scale)
        },
        setScale: function(t, e) {
            var i = this.getRect();
            return e = e || {
                x: 0,
                y: 0
            },
            t = Math.max(this._minScale / this._scale, Math.min(t, this._maxScale / this._scale)),
            this._scale *= t,
            this._dy -= (e.y - i.top) * (t - 1),
            this._dx -= (e.x - i.left) * (t - 1),
            this._dx = Math.min(0, Math.max(this._dx, (i.width / this._scale - i.width) * t)),
            this._dy = Math.min(0, Math.max(this._dy, (i.height / this._scale - i.height) * t)),
            this
        },
        _onWheel: function(t) {
            var e, i = t.deltaY;
            t.deltaMode === WheelEvent.DOM_DELTA_LINE && (i *= v.WHEEL_PX_PER_LINE),
            e = -(i = Math.max(-v.WHEEL_PX_LIMIT, Math.min(i, v.WHEEL_PX_LIMIT))) / v.WHEEL_PX_FACTOR + 1,
            s.preventEvent(t),
            this.setScale(e, {
                x: t.pageX,
                y: t.pageY
            }),
            this.update()
        },
        _onStart: function(t) {
            "button"in t && 0 !== t.button || (s.preventEvent(t),
            this._lastPoints = d.getPoints(t))
        },
        _onMove: function(t) {
            var e, i, n, r = 1;
            !this._pointCount || this._pointCount < 2 && !this.hasState("moved") || (s.preventEvent(t),
            i = (e = d.getPoints(t)).reduce(d.getMidpoint),
            n = this._lastPoints.reduce(d.getMidpoint),
            this._dx += i.x - n.x,
            this._dy += i.y - n.y,
            e[1] && (r = d.getDistance(e[0], e[1]) / d.getDistance(this._lastPoints[0], this._lastPoints[1])),
            this.setScale(r, i),
            this.update(!0),
            this._lastPoints = e)
        },
        _onEnd: function(t) {
            s.preventEvent(t),
            this._lastPoints = d.getPoints(t),
            this.update()
        }
    }, {
        MIN_SCALE: 1,
        MAX_SCALE: 5,
        WHEEL_PX_LIMIT: 60,
        WHEEL_PX_FACTOR: 300,
        WHEEL_PX_PER_LINE: 15
    });
    n.TooltipView = d.extend({
        init: function(t) {
            var e = this;
            return (t = t || {}).targetView instanceof d && t.targetView.on(d.eventTypes.OUT, function() {
                e.setVisible(!1)
            }).on(d.eventTypes.OVER, function(t) {
                var i = this.getClosest(t.target, function(t) {
                    return t.hasAttribute("data-tooltip")
                });
                i && e.setTooltip(i.getAttribute("data-tooltip"), {
                    rect: i.getBoundingClientRect(),
                    position: i.getAttribute("data-tooltip-position")
                })
            }).on(d.eventTypes.START, function(t) {
                this.getClosest(t.target, function(t) {
                    return t.hasAttribute("data-tooltip-nohide")
                }) || e.setVisible(!1)
            }).bindDOMEvents([d.eventTypes.OUT, d.eventTypes.OVER]),
            this.on("contentChanged", this.updatePosition),
            this
        },
        setTooltip: function(t, e) {
            return e = e || {},
            t ? (this.setVisible(!0).setContent(t, {
                asText: !0
            }),
            e.rect && this.setPosition(e.rect, e.position),
            this) : this.setVisible(!1)
        },
        setPosition: function(t, e) {
            return this._rect = t,
            this._position = e,
            this.updatePosition()
        },
        updatePosition: function() {
            var t, e, i, n, s = this._rect, r = this._position || "bottom";
            if (!s)
                return this;
            switch (i = this.getElement(),
            n = this.getRect(),
            r) {
            case "top":
            case "bottom":
                t = "top" === r ? s.top - n.height : s.bottom,
                e = s.left - (n.width - s.width) / 2;
                break;
            case "left":
            case "right":
                t = s.top - (n.height - s.height) / 2,
                e = "left" === r ? s.left - n.width : s.right
            }
            return i.style.top = t + "px",
            i.style.left = e + "px",
            i.setAttribute("data-position", r),
            this
        }
    }),
    n.ToastModel = o.extend({
        resetTimer: function() {
            return t.clearTimeout(this.getProperty("timer")),
            this
        },
        _onTimeout: function() {
            return this.emit("timedout")
        },
        setTimeout: function(e) {
            return this.setProperty("timer", t.setTimeout(this._onTimeout.bind(this), e || this.getProperty("delay")))
        },
        getDefaults: function() {
            return {
                text: "",
                timer: 0,
                delay: 2e3
            }
        }
    }),
    n.ToastPresenter = u.extend({
        init: function() {
            var t = this.getView()
              , e = this.getModel();
            t.on("tap", function() {
                e.resetTimer(),
                this.setVisible(!1)
            }),
            e.on("timedout", function() {
                t.setVisible(!1)
            }).on("set:text", function(e, i) {
                this.resetTimer(),
                t.setContent(e, {
                    asText: !0
                }).setVisible(!0),
                this.setTimeout(i.delay)
            })
        },
        showToast: function(t, e) {
            return this.getModel().setProperty("text", t, {
                delay: e
            }),
            this
        }
    }),
    n.TableauModel = o.extend({
        getSrc: function() {
            var t = this.toJSON();
            return t.url + "?" + s.toQueryString({
                lang: t.lang,
                preset: t.preset,
                domain: t.domain,
                device: t.device,
                "service-id": t.service
            })
        },
        getDefaults: function() {
            return {
                url: "/",
                text: "",
                lang: "",
                domain: "",
                device: "desktop",
                service: ""
            }
        }
    });
    var y = n.TableauPresenter = u.extend({
        init: function() {
            var e = this
              , i = this.getView()
              , n = this.getModel();
            t.addEventListener("message", function(t) {
                var n = t.data;
                if (y.isValidMessage(n))
                    switch ((n = n.split(":"))[0].split(".")[1]) {
                    case "close":
                        i.setVisible(!1);
                        break;
                    case "height":
                        i.getElement().style.height = n[1] + "px",
                        e.emit("ready")
                    }
            }, !1),
            n.on("change", function(t, i) {
                switch (t) {
                case "text":
                    e.postData({
                        fnName: "updateUrls",
                        fnArgs: [{
                            text: i,
                            serviceId: this.getProperty("service")
                        }]
                    });
                    break;
                default:
                    e.sync()
                }
            }),
            this.sync()
        },
        sync: function() {
            return this.getView().getContentElement().src = this.getModel().getSrc(),
            this
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        postData: function(e) {
            var i = this.getView().getContentElement().contentWindow;
            return i && (s.isString(e) || (e = t.JSON.stringify(e)),
            i.postMessage(e, "*")),
            this
        }
    }, {
        messagePrefix: "tableau",
        isValidMessage: function(t) {
            return s.isString(t) && 0 === t.indexOf(this.messagePrefix)
        }
    });
    n.RatingModel = c.extend({
        getDefaults: function() {
            return {
                ui: "",
                srv: "",
                ver: "",
                url: "/",
                sid: this.getId(),
                text: "",
                rating: "",
                stoken: this.getId()
            }
        },
        getParams: function() {
            var t = this.toJSON();
            return {
                ui: t.ui,
                srv: t.srv,
                sid: t.sid,
                ver: t.ver,
                text: t.text,
                stars: t.rating,
                stoken: t.stoken
            }
        },
        submit: function() {
            var t = this;
            return this.setRequest(g.post(this.getProperty("url"), this.getParams(), function(e, i) {
                i && 0 !== i.body.code && ((e = new l(i.body.code,i.body.message)).internal = !0,
                i = null),
                t.emit("result", e, i)
            }))
        }
    }),
    n.RatingPresenter = u.extend({
        init: function() {
            var t = this
              , e = this.getView();
            this.getModel().on("change", function() {
                e.setState("invalid", !this.isValid())
            }).on("result", function(i, n) {
                i ? e.setState("error_internal", i.internal) : t.emit("complete"),
                e.setState({
                    error: i,
                    success: n,
                    sending: !1
                })
            })
        },
        abort: function() {
            return this.getModel().abort(),
            this
        },
        reset: function() {
            return this.getView().setState({
                error: !1,
                success: !1,
                sending: !1
            }),
            this
        },
        submit: function() {
            var t = this.getView();
            return t.hasState("invalid") ? this.reset() : (this.emit("submit"),
            t.setState({
                error: !1,
                success: !1,
                sending: !0
            }),
            this.getModel().submit(),
            this)
        },
        setText: function(t) {
            return this.getModel().setProperty("text", s.trim(t)),
            this
        },
        setRating: function(t) {
            return this.getModel().setProperty("rating", t),
            this
        }
    });
    var x = n.AudioVisualizerView = a.extend({
        init: function(t) {
            t = t || {},
            this._colors = t.colors || [],
            this._levelWidth = t.levelWidth || 10,
            this._levelPayload = t.levelPayload || 10
        },
        draw: function(e) {
            var i, n = this.getElement(), s = n.width / 2 * e / 2, r = n.getContext("2d");
            for (i = t.Math.min(this._colors.length, t.Math.ceil(s / this._levelWidth)),
            r.clearRect(0, 0, n.width, n.height); i--; )
                r.beginPath(),
                r.fillStyle = this._colors[i],
                r.arc(n.width / 2, n.height / 2, t.Math.min(this._levelWidth * (i + 1), s) + this._levelPayload, 0, 2 * t.Math.PI, !0),
                r.closePath(),
                r.fill()
        },
        setAnalyserNode: function(t) {
            return this._analyserNode = t,
            this
        },
        stopVisualization: function() {
            return t.cancelAnimationFrame(this._frameId),
            this
        },
        startVisualization: function() {
            var e = this._analyserNode
              , i = new t.Uint8Array(e.frequencyBinCount);
            e.getByteFrequencyData(i),
            this.draw(x.extractVolume(i)),
            this._frameId = t.requestAnimationFrame(this.startVisualization.bind(this))
        }
    }, {
        extractVolume: function(t) {
            var e, i, n = 0;
            for (e = 0,
            i = t.length; e < i; e++)
                n < t[e] && (n = t[e]);
            return n / 255
        }
    })
      , S = n.TransformMatrix = r.extend({
        init: function() {
            this.reset()
        },
        skew: function(t, e) {
            return this.shear(Math.tan(t), Math.tan(e))
        },
        reset: function() {
            return this.a = this.d = 1,
            this.b = this.c = this.e = this.f = 0,
            this
        },
        flipX: function() {
            return this.transform(-1, 0, 0, 1, 0, 0)
        },
        flipY: function() {
            return this.transform(1, 0, 0, -1, 0, 0)
        },
        shear: function(t, e) {
            return this.transform(1, e, t, 1, 0, 0)
        },
        scale: function(t, e) {
            return this.transform(t, 0, 0, e, 0, 0)
        },
        rotate: function(t) {
            var e = Math.cos(t)
              , i = Math.sin(t);
            return this.transform(e, i, -i, e, 0, 0)
        },
        translate: function(t, e) {
            return this.transform(1, 0, 0, 1, t, e)
        },
        transform: function(t, e, i, n, s, r) {
            var a = this.a
              , o = this.b
              , h = this.c
              , c = this.d
              , l = this.e
              , u = this.f;
            return this.a = a * t + h * e,
            this.b = o * t + c * e,
            this.c = a * i + h * n,
            this.d = o * i + c * n,
            this.e = a * s + h * r + l,
            this.f = o * s + c * r + u,
            this
        },
        toArray: function() {
            return [this.a, this.b, this.c, this.d, this.e, this.f]
        },
        toString: function() {
            return "" + this.toArray()
        }
    });
    n.CardTranslationModel = o.extend({
        getDefaults: function() {
            return {
                text: "",
                srcLang: "",
                dstLang: "",
                translation: ""
            }
        }
    }),
    n.CardTranslationPresenter = u.extend({
        init: function(e) {
            var i = this
              , s = this.getView()
              , r = this.getModel()
              , a = e.translationView
              , o = new n.TranslatorPresenter({
                view: a,
                model: e.translationModel
            })
              , h = e.dictionaryView
              , c = new n.DictionaryPresenter({
                view: h,
                model: e.dictionaryModel
            })
              , l = new n.TTSPresenter({
                view: new n.TouchView({
                    element: e.srcSpeaker,
                    stopDefaultAction: !0
                }),
                model: new n.Model
            })
              , u = new n.TTSPresenter({
                view: new n.TouchView({
                    element: e.dstSpeaker,
                    stopDefaultAction: !0
                }),
                model: new n.Model
            })
              , d = n.TTSPlayer.actions
              , g = e.shortModeLength;
            n.TTSNativePlayer.isAvailable() && (l.addPlayer(new n.TTSNativePlayer(e.nativePlayerProps)),
            u.addPlayer(new n.TTSNativePlayer(e.nativePlayerProps))),
            n.TTSOnlinePlayer.isAvailable(e.format.toUpperCase()) && (l.addPlayer(new n.TTSOnlinePlayer(e.onlinePlayerProps)),
            u.addPlayer(new n.TTSOnlinePlayer(e.onlinePlayerProps))),
            s.on("stateChanged:hidden", function(t) {
                t && (l.stop(),
                u.stop(),
                r.setProperty({
                    text: "",
                    translation: ""
                }),
                this.setState({
                    error: !1,
                    has_dict: !1
                }))
            }),
            r.on("change", function(t, e, i) {
                switch (t) {
                case "text":
                    e && s.setState("short", e.length <= g),
                    s.setContent(e).setVisible(e),
                    o.setText(e, i.reason),
                    c.setText(e),
                    l.setText(e);
                    break;
                case "srcLang":
                    c.setSrcLanguage(e),
                    o.setSrcLanguage(e),
                    l.setLanguage(e);
                    break;
                case "dstLang":
                    c.setDstLanguage(e),
                    o.setDstLanguage(e),
                    u.setLanguage(e);
                    break;
                case "translation":
                    u.setText(e)
                }
            }),
            o.on("result", function(t) {
                r.setProperty("translation", t),
                a.setState("short", t.length <= g)
            }),
            o.prepareData = function(t) {
                return {
                    translation: t
                }
            }
            ,
            h.on("stateChanged:hidden", function(t) {
                s.setState("has_dict", !t)
            }),
            c.prepareData = function(e) {
                var i, s = "", a = "", o = r.getProperty("srcLang") + "-" + r.getProperty("dstLang"), h = {
                    items: []
                };
                return (e = t.JSON.parse(e))[o] && (i = e[o][n.DictionaryPresenter.types.REGULAR]) && i.length ? (h.items = i.map(function(t) {
                    var e = {
                        meanings: []
                    }
                      , i = function(t) {
                        var e = [];
                        return t.gen && e.push(t.gen.text),
                        t.num && e.push(t.num.text),
                        t.dia && e.push(t.dia.text),
                        e.join(", ")
                    };
                    return e.title = {
                        title: t.text,
                        marks: i(t)
                    },
                    t.text !== a && t.fl && (e.title.fl = t.fl),
                    a = t.text,
                    t.pos && (s = t.pos.code,
                    e.title.partOfSpeech = t.pos.text),
                    t.ts && (e.title.transcription = t.ts),
                    t.tr.forEach(function(t, n) {
                        var r = {
                            examples: [],
                            hasExamples: function() {
                                return !!this.examples.length
                            },
                            hasTranslations: function() {
                                return !!this.meaningTrs.length
                            }
                        }
                          , o = []
                          , h = [{
                            title: a,
                            value: t.text,
                            marks: i(t),
                            groupIndex: n,
                            partOfSpeech: s
                        }];
                        t.syn && t.syn.forEach(function(t) {
                            h.push({
                                title: a,
                                value: t.text,
                                marks: i(t),
                                groupIndex: n,
                                partOfSpeech: s
                            })
                        }),
                        t.mean && t.mean.forEach(function(t) {
                            o.push({
                                title: a,
                                value: t.text,
                                groupIndex: n,
                                partOfSpeech: s
                            })
                        }),
                        h[h.length - 1].isLast = !0,
                        o.length && (o[o.length - 1].isLast = !0),
                        r.meaningTrs = o,
                        r.meaningVals = h,
                        e.meanings.push(r)
                    }),
                    e
                }),
                h) : null
            }
            ,
            c.setType(n.DictionaryPresenter.types.REGULAR, !0).setFlag(n.DictionaryPresenter.flags.MORPHO, !0).setFlag(n.DictionaryPresenter.flags.FAMILY, e.familyFlag).setFlag(n.DictionaryPresenter.flags.SHORT_POS, !0),
            l.on("actionStarted", function(t) {
                switch (t.action) {
                case d.LOAD:
                    u.stop();
                    break;
                case d.PLAY:
                case d.ERROR:
                    i.emit("speakerAction", t)
                }
            }).on("invalidState", function(t) {
                i.emit("invalidState", t)
            }),
            u.on("actionStarted", function(t) {
                switch (t.action) {
                case d.LOAD:
                    l.stop();
                    break;
                case d.PLAY:
                case d.ERROR:
                    i.emit("speakerAction", t)
                }
            }).on("invalidState", function(t) {
                i.emit("invalidState", t)
            })
        },
        getText: function() {
            return this.getModel().getProperty("text")
        },
        setText: function(t, e) {
            return this.getModel().setProperty("text", t, {
                reason: e
            }),
            this
        },
        setSrcLanguage: function(t) {
            return this.getModel().setProperty("srcLang", t),
            this
        },
        setDstLanguage: function(t) {
            return this.getModel().setProperty("dstLang", t),
            this
        }
    }),
    n.ImageRecognizerView = v.extend({
        init: function(t) {
            var i = this;
            t = t || {},
            this._image = new Image,
            this._image.onload = function() {
                i.emit("load", this)
            }
            ,
            this._selectionRubber = e.createElementNS(this.getElement().namespaceURI, "rect"),
            this._selectionRubber.setAttributeNS(null, "class", t.rubberStyleName || "rubber"),
            this.on(d.eventTypes.CANCEL, this.removeSelection)
        },
        _onEnd: function(t) {
            var e = this._selectionRubber;
            this.setState("moved", !1),
            v.prototype._onEnd.call(this, t),
            this._startPoint && (this.removeSelection(),
            this.emit("selectionChange", {
                x: Math.round(e.x.baseVal.value),
                y: Math.round(e.y.baseVal.value),
                w: Math.round(e.width.baseVal.value),
                h: Math.round(e.height.baseVal.value)
            }))
        },
        _onMove: function(t) {
            var e, i, n, r = this._startPoint, a = this._selectionRubber;
            v.prototype._onMove.call(this, t),
            r && (s.preventEvent(t),
            e = (n = this.convertScreenPoint(d.getPoints(t)[0], this._scrMatrix)).x - r.x,
            i = n.y - r.y,
            a.x.baseVal.value = e > 0 ? r.x : n.x,
            a.y.baseVal.value = i > 0 ? r.y : n.y,
            a.width.baseVal.value = Math.max(1, Math.abs(e)),
            a.height.baseVal.value = Math.max(1, Math.abs(i)))
        },
        _onStart: function(t) {
            var e = this._selectionRubber;
            if (this.setState("moved", s.hasCtrlKey(t)),
            v.prototype._onStart.call(this, t),
            1 !== this._pointCount || this.hasState("moved"))
                return this.removeSelection();
            this._scrMatrix = this.getScreenMatrix(),
            this._startPoint = this.convertScreenPoint(d.getPoints(t)[0], this._scrMatrix),
            e.x.baseVal.value = this._startPoint.x,
            e.y.baseVal.value = this._startPoint.y,
            e.width.baseVal.value = 1,
            e.height.baseVal.value = 1,
            this.getElement().appendChild(e)
        },
        getImage: function() {
            return this._image
        },
        setImage: function(t) {
            return this.reset().setContent(""),
            this._image.src = t,
            this
        },
        setViewBox: function(t, e) {
            return (this.getElement().viewBox.baseVal || {})[t] = e,
            this
        },
        setContent: function(t, i) {
            var n, r = this.getContentElement();
            if (!(i = i || {}).append)
                for (; r.firstChild; )
                    r.removeChild(r.firstChild);
            return i.asText ? r.appendChild(e.createTextNode(t)) : ((n = e.createElement("div")).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + t + "</svg>",
            s.slice(n.firstChild.childNodes).forEach(function(t) {
                r.appendChild(t)
            })),
            this.emit("contentChanged", t, i)
        },
        getScreenMatrix: function() {
            var t, e, i, n = this.getElement(), s = this.getRect(), r = n.createSVGMatrix(), a = n.viewBox.baseVal.width, o = n.viewBox.baseVal.height;
            return a && o ? (t = Math.min(s.width / a, s.height / o),
            e = a * t,
            i = o * t,
            r.a = e / this._scale / a,
            r.d = i / this._scale / o,
            r.f = s.top + (s.height - i) / 2,
            r.e = s.left + (s.width - e) / 2,
            r.inverse()) : r
        },
        removeSelection: function() {
            return this._startPoint = null,
            this._selectionRubber.parentNode && this._selectionRubber.parentNode.removeChild(this._selectionRubber),
            this
        },
        convertScreenPoint: function(t, e) {
            return e = e || this.getScreenMatrix(),
            {
                x: e.a * (t.x / this._scale) + e.e / this._scale,
                y: e.d * (t.y / this._scale) + e.f / this._scale
            }
        }
    });
    var P = n.ImageRecognizerView2 = n.ImageRecognizerView.extend({
        init: function(t) {
            t = t || {},
            this._selectionRubber = e.createElementNS(this.getElement().namespaceURI, "path"),
            this._selectionRubber.setAttributeNS(null, "class", t.rubberStyleName || "selection-path"),
            this._pathData = []
        },
        _onStart: function(t) {
            var e = this._selectionRubber;
            return this.hasState("words") ? (this._pathData = [],
            this.setState("moved", s.hasCtrlKey(t)),
            v.prototype._onStart.call(this, t),
            1 !== this._pointCount || this.hasState("moved") ? this.removeSelection() : (this._scrMatrix = this.getScreenMatrix(),
            this._startPoint = this.convertScreenPoint(d.getPoints(t)[0], this._scrMatrix),
            this._pathData.push({
                x: this._startPoint.x,
                y: this._startPoint.y
            }),
            e.setAttributeNS(null, "d", this.convertToPath()),
            void this.getElement().appendChild(e))) : this.removeSelection()
        },
        _onMove: function(t) {
            var e, i = this._startPoint, n = this._selectionRubber;
            v.prototype._onMove.call(this, t),
            i && (s.preventEvent(t),
            e = this.convertScreenPoint(d.getPoints(t)[0], this._scrMatrix),
            this._pathData.push({
                x: e.x,
                y: e.y
            }),
            n.setAttributeNS(null, "d", this.convertToPath()))
        },
        _onEnd: function(t) {
            this.setState("moved", !1),
            v.prototype._onEnd.call(this, t),
            this._startPoint && (this.removeSelection(),
            this.emit("selectionChange", this._pathData))
        },
        convertToPath: function() {
            var t = "";
            return this._pathData.forEach(function(e, i) {
                t += (0 === i ? P.pathTypes.MOVE : P.pathTypes.LINE) + e.x + "," + e.y
            }),
            t
        }
    }, {
        pathTypes: {
            MOVE: "M",
            LINE: "L"
        },
        SELECTION_ADJUST: 8
    });
    n.ImageRecognizerModel = c.extend({
        abort: function() {
            return c.prototype.abort.call(this),
            this.setProperty("blocks", "")
        },
        getDefaults: function() {
            return {
                sid: "",
                srv: "",
                url: "",
                mode: "",
                lang: "",
                href: "",
                auto: !1,
                type: "image/jpeg",
                angle: 0,
                width: 0,
                height: 0,
                blocks: "",
                dataURL: "",
                timeout: 1e3,
                quality: .75,
                selection: "",
                blocksAngle: 0,
                viewboxWidth: 0,
                viewboxHeight: 0
            }
        },
        requestBlocks: function() {
            var t = this
              , e = new FormData
              , i = this.toJSON()
              , n = {
                srv: i.srv,
                sid: i.sid,
                lang: i.lang
            }
              , r = new g(i.url);
            return this.abort(),
            this.isValid() ? (this.emit("query"),
            i.auto && (n.rotate = "auto"),
            e.append("file", s.dataURLToBlob(i.dataURL)),
            this.setRequest(r.setData(e).setMethod(g.methods.POST).setParams(n).setTimeout(i.timeout).send(function(e, n) {
                var s, r = e ? "error" : n.body.status;
                "success" === r ? (s = n.body.data,
                t.setProperty("blocksAngle", s.rotate ? -s.rotate : i.angle),
                s.detected_lang && (t.setProperty("lang", s.detected_lang, {
                    silent: !0
                }),
                t.emit("detect", s.detected_lang)),
                t.setProperty("blocks", JSON.stringify(s.blocks))) : (e = e || new l(n.code,r),
                n = null),
                t.emit("result", e, n)
            }))) : this
        }
    }, {
        errors: {
            INVALID_SESSION: 403
        }
    });
    var b = n.ImageRecognizerPresenter = u.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , i = this.getModel();
            this.requestBlocks = s.debounce(b.prototype.requestBlocks, 200),
            e.on("load", function() {
                t.updateImage()
            }).on("selectionChange", function(e) {
                i.setProperty("selection", JSON.stringify(e)),
                t.emit("selectionChange", e)
            }),
            i.on("query", function() {
                t.emit("query"),
                e.setState({
                    error: !1,
                    empty: !1,
                    loading: !0,
                    rotated: !1
                })
            }).on("detect", function(e) {
                t.emit("detect", e)
            }).on("result", function(i, n) {
                if (e.setState("loading", !1),
                i && i.code === this.constructor.errors.INVALID_SESSION)
                    return t.emit("expired");
                e.setState({
                    error: i && i.code !== l.ABORT,
                    empty: n && !t.getBlocksByMode().length
                }),
                t.emit("result", i, n)
            }).on("change", function(i, n) {
                var s, r, a;
                switch (i) {
                case "lang":
                case "dataURL":
                    t.requestBlocks();
                    break;
                case "href":
                case "mode":
                case "angle":
                case "width":
                case "blocks":
                case "height":
                case "selection":
                    "selection" !== i && this.setProperty("selection", "", {
                        silent: !0
                    }),
                    "angle" === i && (s = n / 90 % 2,
                    r = this.getProperty("width"),
                    a = this.getProperty("height"),
                    this.setProperty({
                        viewboxWidth: s ? a : r,
                        viewboxHeight: s ? r : a
                    })),
                    e.renderData(t.prepareData(this.toJSON()));
                    break;
                case "blocksAngle":
                    t.rotateImage(n);
                    break;
                case "viewboxWidth":
                case "viewboxHeight":
                    e.setViewBox("viewboxWidth" === i ? "width" : "height", n)
                }
            })
        },
        getHref: function() {
            return this.getModel().getProperty("href")
        },
        setMode: function(t) {
            return this.getModel().setProperty("mode", t),
            this
        },
        setAuto: function(t) {
            return this.getModel().setProperty("auto", !!t),
            this
        },
        setImage: function(t) {
            return this.getModel().setProperty({
                href: t,
                angle: 0,
                width: 0,
                height: 0,
                blocks: "",
                dataURL: "",
                selection: "",
                blocksAngle: 0,
                viewboxWidth: 0,
                viewboxHeight: 0
            }),
            this.getView().setState({
                error: !1,
                empty: !1,
                loading: !1,
                rotated: !1
            }).setImage(t),
            this.emit("imageChange", t)
        },
        setLanguage: function(t) {
            return this.getModel().setProperty("lang", t),
            this
        },
        updateImage: function() {
            return this.getModel().setProperty(b.prepareImage(this.getView().getImage(), this.toJSON())),
            this
        },
        rotateImage: function(t, e) {
            var i = this.getView()
              , n = this.getModel()
              , s = n.getProperty("angle");
            return s = (e ? s : 0) + t,
            s %= 360,
            n.setProperty("angle", s),
            i.setState("rotated", i.hasState("empty") || s !== n.getProperty("blocksAngle")),
            this
        },
        prepareData: function(t) {
            return {
                href: t.href,
                width: t.width,
                items: this.getBlocksByMode(t),
                height: t.height,
                transform: "matrix(" + b.getImageTransform(t.width, t.height, t.angle) + ")"
            }
        },
        requestBlocks: function() {
            return this.getModel().requestBlocks(),
            this
        },
        clearSelection: function() {
            return this.getModel().setProperty("selection", ""),
            this
        },
        getBlocksByMode: function(t) {
            var e, i, n = [];
            switch (t = t || this.toJSON(),
            e = t.blocks ? JSON.parse(t.blocks) : [],
            t.mode) {
            case b.modes.WORDS:
                e.forEach(function(t) {
                    t.boxes.forEach(function(t) {
                        n = n.concat(t.words)
                    })
                });
                break;
            case b.modes.LINES:
                e.forEach(function(t) {
                    n = n.concat(t.boxes)
                });
                break;
            case b.modes.BLOCKS:
                n = e.map(function(t) {
                    return t.text = t.boxes.map(function(t) {
                        return t.text
                    }).join(" "),
                    t.lineCount = t.boxes.length,
                    t
                })
            }
            return t.selection && (i = JSON.parse(t.selection),
            n = n.map(function(t) {
                return t.selected = !(t.x + t.w < i.x || t.y + t.h < i.y || i.x + i.w < t.x || i.y + i.h < t.y),
                t
            })),
            n
        },
        getSelectedBlocks: function() {
            return this.getBlocksByMode().filter(function(t) {
                return !!t.selected
            })
        },
        prepareTranslation: function(t) {
            return {
                items: this.getSelectedBlocks().map(function(e, i) {
                    var n, s, r = "", a = t[i], o = [];
                    return e.lineCount ? (n = e.h / e.lineCount,
                    s = Math.ceil(a.length / e.lineCount),
                    a.split(/(\s+)/).forEach(function(t) {
                        if (t.length > s) {
                            for (t = r + t; t; )
                                o.push(t.slice(0, s)),
                                t = t.slice(s);
                            r = o.pop()
                        } else
                            (r += t).length >= s && (o.push(r),
                            r = "")
                    }),
                    r && o.push(r),
                    e.texts = o.map(function(t, i) {
                        return {
                            y: i,
                            w: e.w,
                            h: n,
                            text: t
                        }
                    })) : e.texts = [{
                        y: 0,
                        w: e.w,
                        h: e.h,
                        text: a
                    }],
                    e
                })
            }
        }
    }, {
        modes: {
            WORDS: "words",
            LINES: "lines",
            BLOCKS: "blocks"
        },
        isAvailable: function() {
            return !!t.URL && "Blob"in t && "FormData"in t && "FileReader"in t && "ArrayBuffer"in t && "click"in t.HTMLElement.prototype
        },
        orientations: {
            UP: 1,
            UP_MIRRORED: 2,
            DOWN: 3,
            DOWN_MIRRORED: 4,
            LEFT_MIRRORED: 5,
            LEFT: 6,
            RIGHT_MIRRORED: 7,
            RIGHT: 8
        },
        MAX_IMAGE_WIDTH: 1024,
        prepareImage: function(t, i) {
            var n, s, r, a, o = e.createElement("canvas"), h = o.getContext("2d"), c = this.MAX_IMAGE_WIDTH < t.width ? this.MAX_IMAGE_WIDTH / t.width : 1, l = t.width * c, u = t.height * c;
            for (a = (i = i || {}).angle / 90 % 2,
            o.width = a ? u : l,
            o.height = a ? l : u,
            h.setTransform.apply(h, this.getImageTransform(l, u, i.angle).toArray()),
            h.drawImage(t, 0, 0, l, u),
            n = 0,
            s = (r = h.getImageData(0, 0, o.width, o.height)).data.length; n < s; n += 4)
                r.data[n] = r.data[n + 1] = r.data[n + 2] = (r.data[n] + r.data[n + 1] + r.data[n + 2]) / 3;
            return h.putImageData(r, 0, 0),
            {
                width: l,
                height: u,
                viewboxWidth: o.width,
                viewboxHeight: o.height,
                dataURL: o.toDataURL(i.type, i.quality)
            }
        },
        getImageTransform: function(t, e, i) {
            var n = new S;
            switch (n.rotate(i / 180 * Math.PI),
            i) {
            case -90:
            case 270:
                n.translate(-t, 0);
                break;
            case 180:
            case -180:
                n.translate(-t, -e);
                break;
            case 90:
            case -270:
                n.translate(0, -e)
            }
            return n
        },
        normalizeImageOrientation: function(t, i, n) {
            var r = t.width
              , a = t.height
              , o = e.createElement("canvas")
              , h = o.getContext("2d")
              , c = new S;
            switch (o.width = i > this.orientations.DOWN_MIRRORED ? a : r,
            o.height = i > this.orientations.DOWN_MIRRORED ? r : a,
            i) {
            case this.orientations.UP_MIRRORED:
                c.translate(r, 0).scale(-1, 1);
                break;
            case this.orientations.DOWN:
                c.translate(r, a).rotate(Math.PI);
                break;
            case this.orientations.DOWN_MIRRORED:
                c.translate(0, a).scale(1, -1);
                break;
            case this.orientations.LEFT_MIRRORED:
                c.rotate(.5 * Math.PI).scale(1, -1);
                break;
            case this.orientations.LEFT:
                c.rotate(.5 * Math.PI).translate(0, -a);
                break;
            case this.orientations.RIGHT_MIRRORED:
                c.rotate(.5 * Math.PI).translate(r, -a).scale(-1, 1);
                break;
            case this.orientations.RIGHT:
                c.rotate(-.5 * Math.PI).translate(-r, 0)
            }
            h.setTransform.apply(h, c.toArray()),
            h.drawImage(t, 0, 0, r, a),
            o.toBlob ? o.toBlob(n) : n(o.msToBlob ? o.msToBlob() : s.dataURLToBlob(o.toDataURL()))
        }
    });
    n.ImageRecognizerPresenter2 = n.ImageRecognizerPresenter.extend({
        prepareData: function(t) {
            return t.mode = b.modes.WORDS,
            b.prototype.prepareData.call(this, t)
        },
        getBlocksByMode: function(t) {
            var e, i, n = [];
            switch (t = t || this.toJSON(),
            e = t.blocks ? JSON.parse(t.blocks) : [],
            t.mode) {
            case b.modes.WORDS:
                e.forEach(function(t) {
                    t.boxes.forEach(function(t) {
                        n = n.concat(t.words)
                    })
                });
                break;
            case b.modes.LINES:
                e.forEach(function(t) {
                    n = n.concat(t.boxes)
                })
            }
            return t.selection && (i = JSON.parse(t.selection),
            n = n.map(function(t) {
                var e = t.x
                  , n = t.y
                  , s = t.x + t.w
                  , r = t.y + t.h;
                return t.selected = i.some(function(t) {
                    return e < t.x + P.SELECTION_ADJUST && t.x - P.SELECTION_ADJUST < s && n < t.y + P.SELECTION_ADJUST && t.y - P.SELECTION_ADJUST < r
                }),
                t
            })),
            n
        },
        getSelectedBlocks: function() {
            var t = this.toJSON();
            return t.mode = b.modes.WORDS,
            this.getBlocksByMode(t).filter(function(t) {
                return !!t.selected
            })
        },
        getTextFromBlocks: function(t) {
            var e = "";
            return (t = t || this.getBlocksByMode()).length && (e = t.map(function(t) {
                return t.text
            })),
            e
        },
        prepareTranslation: function(t) {
            var e = this.toJSON();
            return {
                items: this.getBlocksByMode().map(function(e, i) {
                    return e.texts = [{
                        y: 0,
                        w: e.w,
                        h: e.h,
                        text: t[i]
                    }],
                    e
                }),
                overlay: {
                    width: e.width,
                    height: e.height,
                    transform: "matrix(" + b.getImageTransform(e.width, e.height, e.angle) + ")"
                }
            }
        }
    }),
    n.FullscreenView = d.extend({
        fitText: function(t, e) {
            for (var i, n = this.getElement(), s = n.clientWidth, r = n.clientHeight, a = this.getContentElement(); t <= e; )
                i = Math.floor((t + e) / 2),
                a.style.fontSize = i + "px",
                a.offsetWidth <= s && a.offsetHeight <= r ? t = i + 1 : e = i - 1;
            return a.style.fontSize = i - 1 + "px",
            this.emit("fit")
        }
    }),
    n.FullscreenModel = o.extend({
        getDefaults: function() {
            return {
                text: "",
                minFontSize: 8,
                maxFontSize: 72
            }
        }
    }),
    n.FullscreenPresenter = u.extend({
        init: function() {
            var t = this
              , e = this.getView();
            this.getModel().on("change", function(i, n) {
                "text" === i && e.setContent(n, {
                    asText: !0
                }),
                t.fitText()
            })
        },
        fitText: function() {
            var t = this.getView()
              , e = this.toJSON();
            return t.isVisible() && t.fitText(e.minFontSize, e.maxFontSize),
            this
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        }
    });
    var M = n.PhraseBookModel = m.extend({
        sync: function() {
            var t = this;
            return g.post(this.getProperty("url") + "/get", this.getBaseParams(), function(e, i) {
                var n = i && i.body;
                n && n.code === M.codes.OK && (n.limit && t.setProperty("limit", n.limit),
                n.version && t.setProperty("version", n.version),
                t.emit("sync", n))
            }),
            this
        },
        addItem: function() {
            var t, e = this;
            return this.isValid() ? (t = this.getParams(),
            g.post(this.getProperty("url") + "/add", t, function(i, n) {
                if (i || n.body.code !== M.codes.OK)
                    return e.emit("error", i || new l(n.body.code,n.body.message));
                t.id = n.body.id,
                n.body.version && e.setProperty("version", n.body.version),
                e.emit("add", t)
            }),
            this) : this
        },
        setItems: function(t, e) {
            var i = M.compareRules[this.getProperty("sort").toUpperCase()];
            return e = e || {},
            i && !e.dontCompare && (t = t.sort(i)),
            M.__parentProto__.setItems.call(this, t, e),
            this
        },
        getParams: function() {
            var t = this.toJSON();
            return {
                srv: t.srv,
                uid: t.uid,
                text: t.text,
                tran: t.translation,
                lang: t.srcLang + "-" + t.dstLang,
                stoken: t.stoken,
                version: t.version
            }
        },
        deleteItem: function(t) {
            var e = this
              , i = this.toJSON()
              , n = {
                srv: i.srv,
                uid: i.uid,
                stoken: i.stoken,
                version: i.version
            };
            return t = t || i.value,
            n.id = s.isArray(t) ? t : [t],
            g.post(i.url + "/delete", n, function(t, i) {
                if (t || i.body.code !== M.codes.OK)
                    return e.emit("error", t || new l(i.body.code,i.body.message));
                i.body.version && e.setProperty("version", i.body.version),
                e.emit("delete", n.id)
            }),
            this
        },
        getDefaults: function() {
            return {
                srv: "",
                uid: "",
                url: "/",
                sort: "",
                text: "",
                limit: 0,
                value: "",
                items: "",
                stoken: "",
                version: 0,
                srcLang: "",
                dstLang: "",
                translation: ""
            }
        },
        getBaseParams: function() {
            var t = this.toJSON();
            return {
                srv: t.srv,
                uid: t.uid,
                stoken: t.stoken
            }
        }
    }, {
        codes: {
            OK: 0,
            BAD_VERSION: 16
        },
        compareRules: {
            DATE: function(t, e) {
                return t[0] < e[0] ? 1 : -1
            },
            NAME: function(t, e) {
                return t[2].localeCompare(e[2])
            },
            LENGTH: function(t, e) {
                return t[2].length - e[2].length
            }
        }
    });
    n.PhraseBookPresenter = p.extend({
        init: function() {
            var t = this;
            this.setItems([]),
            this.getModel().on("add", function(e) {
                var i = this.getItems();
                i.push([e.id, e.lang, e.text, e.tran]),
                t.setItems(i).emit("favAdd")
            }).on("sync", function(e) {
                t.emit("favSync", e).setItems(e.records)
            }).on("error", function(e) {
                t.emit("favError", e)
            }).on("change", function(e, i) {
                var n, s, r;
                switch (e) {
                case "sort":
                    this.setItems(this.getItems());
                    break;
                case "text":
                case "items":
                case "srcLang":
                case "dstLang":
                case "translation":
                    n = this.toJSON(),
                    s = n.srcLang + "-" + n.dstLang,
                    r = this.getItems().filter(function(t) {
                        return t[1] === s && t[2] === n.text && t[3] === n.translation
                    })[0],
                    t.setValue(r ? r[0] : "");
                    break;
                case "value":
                    (r = i && this.getItems().filter(function(t) {
                        return t[0] === i
                    })[0]) && (s = r[1].split("-"),
                    this.setProperty({
                        text: r[2],
                        srcLang: s[0],
                        dstLang: s[1],
                        translation: r[3]
                    }, {
                        silent: !0
                    })),
                    t.emit("favChange", r)
                }
            }).on("delete", function(e) {
                var i = this.getItems().filter(function(t) {
                    return e.indexOf(t[0]) < 0
                });
                t.setItems(i, {
                    dontResetScroll: !0
                }).emit("favDelete", e)
            })
        },
        sync: function() {
            return this.getModel().sync(),
            this
        },
        addItem: function() {
            return this.getModel().addItem(),
            this
        },
        setSort: function(t) {
            return this.getModel().setProperty("sort", t),
            this
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        deleteItem: function(t) {
            return this.getModel().deleteItem(t),
            this
        },
        setSrcLanguage: function(t) {
            return this.getModel().setProperty("srcLang", t),
            this
        },
        setDstLanguage: function(t) {
            return this.getModel().setProperty("dstLang", t),
            this
        },
        setTranslation: function(t) {
            return this.getModel().setProperty("translation", t),
            this
        }
    });
    var _ = n.PhraseBookModel2 = m.extend({
        sync: function() {
            var t = this
              , e = this.getSyncData();
            return new g(this.getProperty("url") + "/sync").setData(e).setType(g.types.JSON).setMethod(g.methods.POST).setHeader("X-CSRF-Token", this.getProperty("xtoken")).setParams(M.prototype.getBaseParams.call(this)).send(function(e, i) {
                if (e)
                    return t.emit("error", e);
                t.mergeItems(i.body.favorites)
            }),
            this
        },
        toCSV: function() {
            var t = []
              , e = this.getItems();
            return Object.keys(e).forEach(function(i) {
                var n = e[i];
                n.deleted || t.push([s.prepareCSVValue(n.text), s.prepareCSVValue(n.translation), s.prepareCSVValue(n.srcLang + "-" + n.dstLang)].join(","))
            }),
            t.join("\r\n")
        },
        filter: function(t) {
            var e = this.getItems();
            return t = s.trim(t).toLowerCase(),
            Object.keys(e).forEach(function(i) {
                var n = e[i];
                n.filtered = t && (n.deleted || n.text.toLowerCase().indexOf(t) < 0 && n.translation.toLowerCase().indexOf(t) < 0)
            }),
            this.setItems(e)
        },
        isEmpty: function(t) {
            return t = t || this.getItems(),
            !Object.keys(t).filter(function(e) {
                return !t[e].hidden
            }).length
        },
        addItem: function() {
            var t, e, i;
            return this.isValid() ? (t = Date.now(),
            i = this.toJSON(),
            e = this.getItems(),
            e["_" + t.toString(36)] = {
                text: i.text,
                srcLang: i.srcLang,
                dstLang: i.dstLang,
                translation: i.translation,
                creationTimestamp: t / 1e3
            },
            this.setItems(e).emit("add")) : this
        },
        cleanUp: function() {
            var t = this.getItems();
            return this.deleteItem(Object.keys(t).filter(function(e) {
                return !!t[e].deleted
            })).filter("")
        },
        getItems: function() {
            return m.prototype.getItems.call(this) || {}
        },
        mergeItems: function(t) {
            var e = this.getItems();
            return t.forEach(function(t) {
                var i, n;
                switch (t.score = t.score || 0,
                t.timestamp = t.timestamp || 0,
                t.action) {
                case _.actions.ADD:
                    n = t.lang.split("-"),
                    e[t.id] = {
                        text: t.text,
                        synced: !0,
                        srcLang: n[0],
                        dstLang: n[1],
                        timestamp: t.timestamp,
                        translation: t.translation,
                        trainingScore: t.score,
                        creationTimestamp: t.creationTimestamp
                    };
                    break;
                case _.actions.DROP:
                case _.actions.DELETE:
                    delete e[t.id || t.tmpId];
                    break;
                case _.actions.UPDATE:
                    (i = e[t.id]).timestamp = t.timestamp,
                    i.trainingScore = t.score;
                    break;
                case _.actions.POSTPONE:
                    e[t.tmpId].ignored = !0;
                    break;
                case _.actions.REGISTER:
                    e[t.tmpId].synced = !0,
                    e[t.id] = e[t.tmpId],
                    delete e[t.tmpId]
                }
            }),
            this.setItems(e).emit("sync")
        },
        deleteItem: function(t) {
            var e = this.getItems();
            return t = t || this.getProperty("value"),
            s.isArray(t) || (t = [t]),
            t.forEach(function(t) {
                var i = e[t];
                i.synced ? (i.hidden = !0,
                i.deleted = !0) : delete e[t]
            }),
            this.setItems(e).emit("delete", t)
        },
        getSyncData: function() {
            var t = this.getItems();
            return {
                favorites: Object.keys(t).filter(function(e) {
                    var i = t[e];
                    return i.synced || !i.deleted
                }).map(function(e) {
                    var i = t[e];
                    return i.timestamp = i.timestamp || 0,
                    i.trainingScore = i.trainingScore || 0,
                    i.synced ? i.deleted ? {
                        id: e,
                        status: _.statuses.DELETED
                    } : {
                        id: e,
                        status: _.statuses.UPDATED,
                        score: i.trainingScore,
                        timestamp: i.timestamp
                    } : {
                        tmpId: e,
                        status: _.statuses.ADDED,
                        lang: i.srcLang + "-" + i.dstLang,
                        text: i.text,
                        score: i.trainingScore,
                        timestamp: i.timestamp,
                        translation: i.translation,
                        creationTimestamp: i.creationTimestamp
                    }
                })
            }
        },
        getDefaults: function() {
            return {
                srv: "",
                uid: "",
                url: "/",
                sort: "",
                text: "",
                limit: 0,
                value: "",
                items: "",
                stoken: "",
                xtoken: "",
                srcLang: "",
                dstLang: "",
                translation: ""
            }
        }
    }, {
        actions: {
            ADD: 1,
            DELETE: 2,
            UPDATE: 3,
            REGISTER: 4,
            DROP: 5,
            POSTPONE: 6
        },
        statuses: {
            ADDED: 1,
            DELETED: 2,
            UPDATED: 3
        }
    });
    n.PhraseBookPresenter2 = p.extend({
        init: function() {
            var t = this;
            this.getModel().on("add", function() {
                t.emit("favAdd")
            }).on("sync", function() {
                t.emit("favSync")
            }).on("error", function(e) {
                t.emit("favSync", e)
            }).on("change", function(e, i) {
                var n, s, r, a;
                switch (e) {
                case "sort":
                    this.setItems(this.getItems());
                    break;
                case "text":
                case "items":
                case "srcLang":
                case "dstLang":
                case "translation":
                    r = this.toJSON(),
                    a = this.getItems(),
                    n = Object.keys(a).filter(function(t) {
                        var e = a[t];
                        return !e.deleted && e.text === r.text && e.srcLang === r.srcLang && e.dstLang === r.dstLang && e.translation === r.translation
                    })[0],
                    t.setValue(n || "", {
                        dontResetScroll: !0
                    });
                    break;
                case "value":
                    (s = i && this.getItems()[i]) && this.setProperty(s, {
                        silent: !0
                    }),
                    t.emit("favChange", s)
                }
            }).on("delete", function(e) {
                t.emit("favDelete", e)
            })
        },
        sync: function() {
            return this.getModel().sync(),
            this
        },
        toCSV: function() {
            return this.getModel().toCSV()
        },
        clear: function() {
            return this.getModel().deleteItem(Object.keys(this.getItems())),
            this
        },
        filter: function(t) {
            return this.getModel().filter(t),
            this
        },
        cleanUp: function() {
            return this.getModel().cleanUp(),
            this
        },
        addItem: function() {
            return this.getModel().addItem(),
            this
        },
        setSort: function(t) {
            return this.getModel().setProperty("sort", t),
            this
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        deleteItem: function(t) {
            return this.getModel().deleteItem(t),
            this
        },
        setSrcLanguage: function(t) {
            return this.getModel().setProperty("srcLang", t),
            this
        },
        setDstLanguage: function(t) {
            return this.getModel().setProperty("dstLang", t),
            this
        },
        setTranslation: function(t) {
            return this.getModel().setProperty("translation", t),
            this
        }
    }),
    n.ShareModel = m.extend({
        share: function() {
            t.open(this.getProperty("url") + "?" + s.toQueryString(this.getParams()))
        },
        write: function() {
            t.location.href = "mailto:?" + s.toQueryString(this.getMailParams())
        },
        getParams: function() {
            var t = this.toJSON();
            return {
                url: t.link,
                title: t.title,
                service: t.value,
                description: t.description
            }
        },
        getDefaults: function() {
            return {
                url: "",
                link: "",
                title: "",
                value: "",
                items: "",
                description: ""
            }
        },
        getMailParams: function() {
            var t = this.toJSON();
            return {
                subject: t.title,
                body: t.description
            }
        }
    }),
    n.SharePresenter = p.extend({
        init: function() {
            this.on("itemSelected", function() {
                this.share()
            })
        },
        share: function() {
            var t = this.getModel();
            return t.share(),
            this.emit("share", t.getParams())
        },
        write: function() {
            var t = this.getModel();
            return t.write(),
            this.emit("write", t.getMailParams())
        },
        setLink: function(t) {
            return this.getModel().setProperty("link", t),
            this
        },
        setTitle: function(t) {
            return this.getModel().setProperty("title", t),
            this
        },
        setDescription: function(t) {
            return this.getModel().setProperty("description", t),
            this
        }
    }),
    n.PageTranslatorModel = o.extend({
        getDefaults: function() {
            return {
                ui: "",
                url: "/"
            }
        }
    }),
    n.PageTranslatorPresenter = u.extend({
        init: function() {
            var e = this
              , i = this.getView();
            t.addEventListener("message", function(t) {
                var n = t.data;
                try {
                    n = JSON.parse(n)
                } catch (t) {
                    n = null
                }
                if (n && t.source === e.getWindow()) {
                    switch (n.type) {
                    case "error":
                    case "inited":
                        i.setState("loading", !1);
                        break;
                    case "ready":
                        e.sendMessage("create")
                    }
                    e.emit("message", n)
                }
            })
        },
        load: function(t, e, i) {
            var n = this.toJSON();
            return this.getView().setState("loading", !0),
            this.setSrc(n.url + "?" + s.toQueryString({
                ui: n.ui,
                url: t,
                lang: e + "-" + i
            })),
            this
        },
        reset: function() {
            return this.sendMessage("halt"),
            this.setSrc("about:blank")
        },
        setSrc: function(t) {
            return this.getView().getContentElement().src = t,
            this
        },
        getName: function() {
            return this.getView().getContentElement().name
        },
        getWindow: function() {
            return this.getView().getContentElement().contentWindow
        },
        sendMessage: function(t, e) {
            var i = this.getWindow();
            return i && i.postMessage(JSON.stringify({
                type: t,
                data: e
            }), "*"),
            this
        }
    }),
    n.TumblerModel = o.extend({
        getDefaults: function() {
            return {
                textOn: "",
                textOff: "",
                checked: !1
            }
        }
    }),
    n.TumblerPresenter = u.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , i = this.getModel();
            e.on("tap", function() {
                i.setProperty("checked", !i.getProperty("checked"))
            }),
            i.on("change", function(i, n, s) {
                switch (i) {
                case "textOn":
                case "textOff":
                    e.renderData(this.toJSON());
                    break;
                case "checked":
                    e.setState("checked", n),
                    t.emit("change", n, s)
                }
            })
        },
        isChecked: function() {
            return this.getModel().getProperty("checked")
        },
        setTextOn: function(t) {
            return this.getModel().setProperty("textOn", t),
            this
        },
        setTextOff: function(t) {
            return this.getModel().setProperty("textOff", t),
            this
        },
        setEnabled: function(t) {
            return this.getView().setEnabled(t),
            this
        },
        setChecked: function(t, e) {
            return this.getModel().setProperty("checked", t, e),
            this
        }
    }),
    n.ViewRouter = h.extend({
        init: function() {
            var e = this;
            this._views = [],
            this.on("activate", function(t) {
                this._views.forEach(function(e) {
                    e.setVisible(e.getId() === t)
                })
            }),
            t.addEventListener("popstate", function(t) {
                var i = t.state;
                e.emit("activate", i && i.viewId)
            }, !1)
        },
        activateView: function(e) {
            try {
                t.history.pushState({
                    viewId: e
                }, "")
            } catch (t) {}
            return this.emit("activate", e)
        },
        registerView: function(t) {
            return t instanceof a && this._views.push(t),
            this
        }
    }),
    n.ViewRouter2 = h.extend({
        init: function() {
            this._views = [],
            this.on("activate", function(t) {
                this._views.forEach(function(e) {
                    e.setVisible(e.getId() === t)
                })
            })
        },
        activateView: function(t) {
            return this.emit("activate", t)
        },
        registerView: function(t) {
            return t instanceof a && this._views.push(t),
            this
        }
    }),
    n.SmsBlockModel = o.extend({
        getDefaults: function() {
            return {
                ui: "",
                srv: "",
                url: "/",
                sid: this.getId(),
                phone: "",
                stoken: this.getId()
            }
        },
        getParams: function() {
            var t = this.toJSON();
            return {
                ui: t.ui,
                srv: t.srv,
                phone: "+" + t.phone.replace(/^8/, "7"),
                stoken: t.stoken
            }
        },
        send: function() {
            var t = this;
            return this.isValid() ? (g.get(this.getProperty("url"), this.getParams(), function(e, i) {
                if (i && 0 !== i.body.code) {
                    switch ((e = new l(i.body.code,i.body.message)).code) {
                    case w.errorMap.INVALID_PARAM:
                    case w.errorMap.PHONE_BLOCKED:
                        e.param = !0
                    }
                    i = null
                }
                t.emit("result", e, i)
            }),
            this) : this
        }
    });
    var w = n.SmsBlockPresenter = u.extend({
        init: function() {
            var t = this
              , e = this.getView();
            this.getModel().on("change", function() {
                e.setState("invalid", !this.isValid())
            }).on("result", function(i, n) {
                i && t.emit("error", i),
                e.setState({
                    error_param: i && i.param,
                    error_connection: i && !i.param,
                    success: n
                })
            })
        },
        reset: function() {
            return this.getView().setState({
                error_param: !1,
                error_connection: !1,
                success: !1
            }),
            this
        },
        send: function() {
            return this.getView().setState({
                error_param: !1,
                error_connection: !1,
                success: !1
            }),
            this.getModel().send(),
            this
        },
        setPhone: function(t) {
            return this.getModel().setProperty("phone", t),
            this
        }
    }, {
        errorMap: {
            INVALID_PARAM: 1,
            INVALID_SESSION: 2,
            TOO_MANY_REQUESTS: 11,
            BAD_RESPONSE: 12,
            PHONE_BLOCKED: 13,
            SERVICE_UNAVAIL: 99
        },
        prepareNumber: function(t, e) {
            switch (t) {
            case "ru":
                return s.trim([e.slice(0, 1), e.slice(1, 4), e.slice(4)].join(" "));
            case "ua":
                return s.trim([e.slice(0, 3), e.slice(3, 5), e.slice(5)].join(" "));
            case "tr":
                return s.trim([e.slice(0, 2), e.slice(2, 5), e.slice(5)].join(" "));
            default:
                return e
            }
        }
    })
}(this, this.document, this.navigator, this.yandexTranslate);
