!function(e, t, n) {
    "use strict";
    var a = n.util
      , i = n.TranslateApplication
      , s = i.extend({
        init: function() {
            var t = this
              , i = this._settings = new n.Storage({},{
                name: "yTrSettings"
            })
              , s = this.getView()
              , r = this.getModel();
            i.on("change", function(e, n, a) {
                switch (e) {
                case "auto":
                    t.emit("optionsChanged", e, n);
                    break;
                case "dictExpanded":
                    t.emit("dictArticleToggle", n);
                    break;
                case "textboxHeight":
                    t.emit("resizerResize", a)
                }
            }),
            i.isOptionEnabled = function(e) {
                return (this.hasProperty("disabledOptions") ? this.getProperty("disabledOptions").split(";") : []).indexOf(e) < 0
            }
            ,
            s.on("tap", function(e) {
                var n = this.getClosest(e.target, function(e) {
                    return e.hasAttribute("data-external-name")
                });
                n && t.emit("externalClick", n.getAttribute("data-external-name"))
            }).on("copy", function(t) {
                if ("emj" !== r.getProperty("dstLang")) {
                    var n = e.getSelection().toString()
                      , i = t.clipboardData || e.clipboardData;
                    n && i && !1 !== i.setData("Text", n) && a.preventEvent(t)
                }
            }).bindDOMEvents("copy"),
            r.on("change", function(e, n, a) {
                switch (e) {
                case "text":
                    switch (a.sender) {
                    case "dictionary":
                        t.emit("dictLinkClick", n, a);
                        break;
                    case "synonyms":
                        t.emit("synonymsInsert", n, a);
                        break;
                    case "favourites":
                        t.emit("favInsert")
                    }
                    break;
                case "srcLang":
                case "dstLang":
                    switch (a.sender) {
                    case "langHistory":
                    case "langSelect":
                        t.emit("langChanged", e, a)
                    }
                    break;
                case "complaint":
                    t.emit("dictComplaintToggle", n, a)
                }
            })
        },
        getSpellerSavedWords: function() {
            var e = this._settings.getProperty("savedSpellerItems");
            return e ? e.split(";") : []
        },
        hasSpellerSavedWord: function(e, t) {
            var n = this.getSpellerSavedWords();
            return t = t || this.getModel().getProperty("srcLang"),
            -1 !== n.indexOf(t + ":" + e)
        },
        initSound: function(e) {
            var t = this
              , i = {
                format: e.TTS_FORMAT,
                chunked: 0,
                quality: e.TTS_QUALITY,
                "mock-ranges": 1
            }
              , s = this.getModel()
              , r = s.toJSON()
              , o = {
                lang: function(e) {
                    return e
                },
                text: function(t) {
                    return t && t.length <= e.MAX_TTS_LENGTH && a.hasAlphaOrDigit(t) && !a.isUrl(t)
                }
            }
              , l = new n.SpeakerPresenter({
                view: new n.SpeakerView({
                    element: e.ELEMENTS.textSpeaker,
                    cacheEnabled: !0
                }),
                model: new n.SpeakerModel(i,{
                    url: e.TTS_URL,
                    validators: o
                })
            })
              , c = new n.SpeakerPresenter({
                view: new n.SpeakerView({
                    element: e.ELEMENTS.translatorSpeaker,
                    cacheEnabled: !0
                }),
                model: new n.SpeakerModel(i,{
                    url: e.TTS_URL,
                    validators: o
                })
            });
            return this.on("nativeSpeakerAction", function() {
                l.stopPlaying(),
                c.stopPlaying()
            }).on("visibilityChange", function(e) {
                e && (l.stopPlaying(),
                c.stopPlaying())
            }),
            s.on("change", function(t, a) {
                switch (t) {
                case "text":
                    l.setText(n.SpeakerView.normalizeText(a));
                    break;
                case "srcLang":
                    l.setLanguage(e.TTS_LANGS[a] || "");
                    break;
                case "dstLang":
                    c.setLanguage(e.TTS_LANGS[a] || "");
                    break;
                case "translation":
                    c.setText(n.SpeakerView.normalizeText(a))
                }
            }),
            l.on("play", function(e) {
                t.emit("speakerAction", e),
                c.stopPlaying()
            }).on("error", function(e) {
                e.error = !0,
                t.emit("speakerAction", e)
            }),
            c.on("play", function(e) {
                t.emit("speakerAction", e),
                l.stopPlaying()
            }).on("error", function(e) {
                e.error = !0,
                t.emit("speakerAction", e)
            }),
            r.text && l.setText(n.SpeakerView.normalizeText(r.text)),
            r.srcLang = e.TTS_LANGS[r.srcLang],
            r.srcLang && l.setLanguage(r.srcLang),
            r.dstLang = e.TTS_LANGS[r.dstLang],
            r.dstLang && c.setLanguage(r.dstLang),
            r.translation && c.setText(n.SpeakerView.normalizeText(r.translation)),
            this
        },
        initLangs: function(t) {
            var s = this
              , r = this._settings
              , o = this.getModel()
              , l = new n.TouchView({
                element: t.ELEMENTS.srcLangButton,
                DOMEvents: "keydown keypress",
                activateFocus: !0
            })
              , c = new n.TouchView({
                element: t.ELEMENTS.dstLangButton,
                DOMEvents: "keydown keypress",
                activateFocus: !0
            })
              , u = t.DEFAULT_SRC_LANG || !t.DEFAULT_TEXT && r.getProperty("srcLang") || i.DEFAULT_SRC_LANG
              , g = t.DEFAULT_DST_LANG || !t.DEFAULT_TEXT && r.getProperty("dstLang") || (t.UI_LANG !== i.DEFAULT_SRC_LANG ? t.UI_LANG : i.DEFAULT_DST_LANG)
              , p = new n.ListboxPresenter({
                view: new n.ListboxViewKB({
                    element: t.ELEMENTS.srcLangListbox,
                    template: t.TEMPLATES.listbox2,
                    partials: {
                        items: t.TEMPLATES.listbox,
                        extras: t.TEMPLATES.langTags
                    },
                    contentElement: t.ELEMENTS.srcLangListboxContent,
                    stopDefaultAction: !0
                }),
                model: new n.ListboxModel({},{
                    validators: {
                        value: function(e) {
                            return a.hasProperty(t.TRANSLATOR_LANGS, e)
                        }
                    }
                })
            })
              , h = new n.ListboxPresenter({
                view: new n.ListboxViewKB({
                    element: t.ELEMENTS.dstLangListbox,
                    template: t.TEMPLATES.listbox2,
                    partials: {
                        items: t.TEMPLATES.listbox,
                        extras: t.TEMPLATES.langTags
                    },
                    contentElement: t.ELEMENTS.dstLangListboxContent,
                    stopDefaultAction: !0
                }),
                model: new n.ListboxModel({},{
                    validators: {
                        value: function(e) {
                            return a.hasProperty(t.TRANSLATOR_LANGS, e)
                        }
                    }
                })
            })
              , d = p.getView()
              , T = h.getView();
            return this.on("resize", function() {
                d.setVisible(!1),
                T.setVisible(!1)
            }),
            o.on("change", function(e, t) {
                switch (e) {
                case "srcLang":
                    p.setValue(t);
                    break;
                case "dstLang":
                    h.setValue(t)
                }
            }),
            l.on("tap", function() {
                this.setFocus(!0),
                d.setVisible()
            }).on("keydown", function(e) {
                var t;
                if (d.isVisible())
                    switch (e.keyCode) {
                    case n.InputView.keys.UP:
                    case n.InputView.keys.LEFT:
                        a.preventEvent(e),
                        d.highlightPrev();
                        break;
                    case n.InputView.keys.DOWN:
                    case n.InputView.keys.RIGHT:
                        a.preventEvent(e),
                        d.highlightNext();
                        break;
                    case n.InputView.keys.ENTER:
                        (t = d.getHighlightedElement()) && (a.preventEvent(e),
                        p.setValue(t.getAttribute(n.ListboxView.VALUE_ATTR)));
                        break;
                    case n.InputView.keys.ESCAPE:
                        d.setVisible(!1)
                    }
            }).on("keypress", function(t) {
                t.which && d.isVisible() && (a.preventEvent(t),
                d.highlightByText(e.String.fromCharCode(t.which)))
            }).on("stateChanged:focused", function(e) {
                e || d.setVisible(!1)
            }),
            c.on("tap", function() {
                this.setFocus(!0),
                T.setVisible()
            }).on("keydown", function(e) {
                var t;
                if (T.isVisible())
                    switch (e.keyCode) {
                    case n.InputView.keys.UP:
                    case n.InputView.keys.LEFT:
                        T.highlightPrev();
                        break;
                    case n.InputView.keys.DOWN:
                    case n.InputView.keys.RIGHT:
                        T.highlightNext();
                        break;
                    case n.InputView.keys.ENTER:
                        (t = T.getHighlightedElement()) && (a.preventEvent(e),
                        h.setValue(t.getAttribute(n.ListboxView.VALUE_ATTR)));
                        break;
                    case n.InputView.keys.ESCAPE:
                        T.setVisible(!1)
                    }
            }).on("keypress", function(t) {
                t.which && T.isVisible() && (a.preventEvent(t),
                T.highlightByText(e.String.fromCharCode(t.which)))
            }).on("stateChanged:focused", function(e) {
                e || T.setVisible(!1)
            }),
            p.prepareData = h.prepareData = function(n) {
                var a, i = this.getValue(), s = {
                    cols: []
                };
                for (a = e.Object.keys(n).map(function(e) {
                    var a = {};
                    return (t.TRANSLATOR_LANGS_TAGS[e] || []).forEach(function(e) {
                        a[e] = !0
                    }),
                    {
                        tags: a,
                        text: n[e],
                        value: e,
                        selected: e === i
                    }
                }); a.length; )
                    s.cols.push({
                        items: a.splice(0, t.MAX_COL_LENGTH)
                    });
                return s
            }
            ,
            p.on("itemSelected", function() {
                d.setVisible(!1)
            }).on("valueChanged", function(e) {
                r.setProperty("srcLang", e),
                o.setProperty("srcLang", e, {
                    sender: "langSelect"
                }),
                l.setContent(t.TRANSLATOR_LANGS[e], {
                    asText: !0
                })
            }),
            h.on("itemSelected", function() {
                T.setVisible(!1)
            }).on("valueChanged", function(e) {
                r.setProperty("dstLang", e),
                o.setProperty("dstLang", e, {
                    sender: "langSelect"
                }),
                c.setContent(t.TRANSLATOR_LANGS[e], {
                    asText: !0
                })
            }),
            d.on("stateChanged:hidden", function(e) {
                e || (s.emit("langSelectOpen", p.toJSON()),
                this.setPosition(l.getRect(), !0).highlightByValue(p.getValue())),
                l.setState("expanded", !e)
            }),
            T.on("stateChanged:hidden", function(e) {
                e || (s.emit("langSelectOpen", h.toJSON()),
                this.setPosition(c.getRect(), !0).highlightByValue(h.getValue())),
                c.setState("expanded", !e)
            }),
            p.setItems(t.TRANSLATOR_LANGS).setValue(u),
            h.setItems(t.TRANSLATOR_LANGS).setValue(g),
            this
        },
        initTooltip: function(e) {
            var t = new n.TooltipView({
                element: e.ELEMENTS.tooltip,
                targetView: this.getView()
            });
            return this.getModel().on("set:tooltip", function(e, n) {
                t.setTooltip(e, n)
            }),
            this
        },
        initTableau: function(t) {
            var a, i = new n.TouchView({
                element: t.ELEMENTS.logo
            }), s = new n.TouchView({
                element: t.ELEMENTS.header
            }), r = new n.TableauPresenter({
                view: new n.TouchView({
                    element: t.ELEMENTS.tableau,
                    contentElement: t.ELEMENTS.tableauFrame,
                    hideAfterTransition: !0
                }),
                model: new n.TableauModel({
                    url: t.TABLEAU_URL,
                    lang: t.UI_LANG,
                    domain: t.DOMAIN,
                    preset: t.TABLEAU_PRESET,
                    service: "translate"
                })
            }), o = this.getModel(), l = function(e) {
                e.length <= t.MAX_SHARE_TEXTLENGTH && r.setText(e)
            }, c = r.getView();
            return r.on("ready", function() {
                i.on(n.TouchView.eventTypes.OUT, function() {
                    e.clearTimeout(a)
                }).on(n.TouchView.eventTypes.MOVE, function() {
                    e.clearTimeout(a),
                    a = e.setTimeout(function() {
                        c.setVisible(!0)
                    }, t.TABLEAU_DELAY)
                }).on(n.TouchView.eventTypes.START, function() {
                    e.clearTimeout(a)
                }).bindDOMEvents([n.TouchView.eventTypes.OUT, n.TouchView.eventTypes.MOVE]),
                s.on("mouseleave", function() {
                    e.clearTimeout(a),
                    c.setVisible(!1)
                }).bindDOMEvents("mouseleave"),
                o.on("change:text", l),
                c.setState("hidden2", !0),
                l(o.getProperty("text"))
            }),
            this
        },
        initUrlView: function(e) {
            var t = new n.TemplateView({
                element: e.ELEMENTS.url,
                template: e.TEMPLATES.url
            })
              , i = this.getView()
              , s = this.getModel();
            return this.on("action:translatePage", function() {
                t.isEnabled() && (this.emit("translatePage"),
                t.getElement().submit())
            }),
            t.on("stateChanged:hidden", function(e) {
                i.setState("url", !e)
            }),
            s.on("change", function(n, i) {
                var s;
                switch (n) {
                case "text":
                case "srcLang":
                case "dstLang":
                    if (s = this.toJSON(),
                    s.text = a.trim(s.text),
                    !s.text) {
                        t.setVisible(!1);
                        break
                    }
                    a.isUrl(s.text) && (this.setProperty({
                        trText: s.text,
                        translation: s.text
                    }),
                    t.renderData({
                        ui: e.UI_LANG,
                        url: s.text,
                        lang: s.srcLang + "-" + s.dstLang
                    }).setVisible(!0).setEnabled(!a.hasProperty(e.INVALID_URL_LANGS, s.srcLang) && !a.hasProperty(e.INVALID_URL_LANGS, s.dstLang)));
                    break;
                case "translation":
                    i && !a.isUrl(i) && t.setVisible(!1)
                }
            }),
            this
        },
        initResizer: function(t) {
            var a = this
              , i = this.getView()
              , s = this._settings
              , r = this.getModel()
              , o = new n.TouchView({
                element: t.ELEMENTS.resizer,
                stopDefaultAction: !0
            })
              , l = new n.TemplateView({
                element: t.ELEMENTS.textLayer,
                template: t.TEMPLATES.measurer
            })
              , c = i.getContentElement("[data-resizer-spacer]")
              , u = i.getContentElement("[data-resizer-target]")
              , g = new n.TemplateView({
                element: t.ELEMENTS.translationLayer,
                template: t.TEMPLATES.measurer
            })
              , p = function(e) {
                var t = e ? "on" : "off";
                a[t]("resize", h),
                a[t]("containerHeightChanged", h),
                i[t]("stateChanged", function(e) {
                    switch (e) {
                    case "longtext":
                    case "keyboard":
                    case "allowed_footer-promo":
                        h()
                    }
                }),
                r[t]("change", function(e, t) {
                    switch (e) {
                    case "text":
                        l.renderData({
                            text: t,
                            rightText: this.getProperty("sourceTranslit")
                        });
                        break;
                    case "sourceTranslit":
                        l.renderData({
                            text: this.getProperty("text"),
                            rightText: t
                        });
                        break;
                    case "targetTranslit":
                        g.renderData({
                            text: this.getProperty("translation"),
                            rightText: t
                        });
                        break;
                    case "translation":
                    case "userTranslation":
                        g.renderData({
                            text: t,
                            rightText: this.getProperty("targetTranslit")
                        })
                    }
                }),
                o.setVisible(!e),
                l[t]("contentChanged", h),
                g[t]("contentChanged", h)
            }
              , h = function() {
                var t = e.Math.max(l.getContentElement().clientHeight, g.getContentElement().clientHeight);
                u.style.height = t + "px",
                i.setState("autoheight", u.clientHeight >= t)
            };
            return this.on("optionsChanged", function(e, t) {
                "autoheight" === e && (p(t),
                t ? (l.renderData({
                    text: r.getProperty("text"),
                    rightText: r.getProperty("sourceTranslit")
                }),
                g.renderData({
                    text: r.getProperty("translation"),
                    rightText: r.getProperty("targetTranslit")
                })) : i.setState("autoheight", !1))
            }),
            i.bindDOMEvents(n.TouchView.eventTypes.MOVE),
            o.on(n.TouchView.eventTypes.START, function(t) {
                var a = t.clientY
                  , r = u.clientHeight
                  , o = c.clientHeight
                  , l = function() {
                    i.off(n.TouchView.eventTypes.END, l).off(n.TouchView.eventTypes.MOVE, g).off(n.TouchView.eventTypes.CANCEL, l),
                    u.style.height && s.setProperty("textboxHeight", u.style.height, {
                        oldHeight: r,
                        newHeight: u.clientHeight,
                        mainHeight: o
                    })
                }
                  , g = function(t) {
                    u.style.height = e.Math.max(0, e.Math.min(100, 100 / o * (t.clientY + r - a))) + "%"
                };
                i.on(n.TouchView.eventTypes.END, l).on(n.TouchView.eventTypes.MOVE, g).on(n.TouchView.eventTypes.CANCEL, l)
            }),
            s.isOptionEnabled("autoheight") ? p(!0) : s.hasProperty("textboxHeight") && (u.style.height = s.getProperty("textboxHeight")),
            this
        },
        initAutoSpeller: function(e) {
            var t, i = this, s = this._settings, r = this.getView(), o = this.getModel(), l = new n.SpellerPresenter({
                view: new n.TemplateView({
                    element: e.ELEMENTS.speller,
                    template: e.TEMPLATES.speller
                }),
                model: new n.SpellerModel({
                    sid: e.SID,
                    url: e.SPELLER_URL,
                    options: n.SpellerModel.options.IGNORE_URLS + n.SpellerModel.options.IGNORE_CAPITALIZATION
                },{
                    validators: {
                        text: function(t) {
                            return t && a.trim(t) && t.length <= e.MAX_SPELLER_LENGTH && s.isOptionEnabled("speller")
                        },
                        lang: function(t) {
                            return a.hasProperty(e.SPELLER_LANGS, t)
                        }
                    }
                })
            }), c = l.getView(), u = function() {
                c.scrollTo(o.getProperty("textScrollY") * c.getScrollInfo().maxTop / 100)
            }, g = new n.TouchView({
                element: e.ELEMENTS.spellerButton
            }), p = new n.ListboxView({
                element: e.ELEMENTS.spellerPopup,
                template: e.TEMPLATES.empty,
                contentElement: e.ELEMENTS.spellerPopupContent,
                stopDefaultAction: !0
            }), h = new n.ListboxPresenter({
                view: new n.ListboxView({
                    element: e.ELEMENTS.spellerListbox,
                    template: e.TEMPLATES.listbox,
                    stopDefaultAction: !0
                }),
                model: new n.ListboxModel
            }), d = h.getView(), T = function() {
                p.setVisible(!1),
                d.setVisible(!1)
            }, E = function(e, t) {
                var n, a, r = i.getSpellerSavedWords();
                return t = t || o.getProperty("srcLang"),
                n = t + ":" + e,
                (a = r.indexOf(n)) < 0 ? r.push(n) : r.splice(a, 1),
                s.setProperty("savedSpellerItems", r.join(";"))
            };
            return this.on("textTap", function(e) {
                var n, a, r, o, u, g = l.getData();
                for (n = 0,
                a = g.length; n < a; n++)
                    if (g[n].pos < e && g[n].pos + g[n].len > e) {
                        r = g[n];
                        break
                    }
                r && (u = s.getProperty("autospeller") && !i.hasSpellerSavedWord(r.word),
                i.emit("spellerClick", r, r.s.length && u)),
                t = r && r.s.length ? r : null,
                T(),
                t && (o = c.getContentElement('[data-index="' + n + '"]').getBoundingClientRect(),
                u ? (p.setContent(r.s[0]),
                p.setPosition(o, !0),
                p.setVisible(!0)) : (h.setItems(r.s),
                d.setPosition(o, !0),
                d.setVisible(!0)))
            }).on("action:spellerReturn", function() {
                var e;
                t && (i.emit("spellerDecline", t),
                (e = l.getData()).some(function(e) {
                    return !(!e.s || !e.s.length) && t.word === e.word
                }) && E(t.word),
                i.updateTrText(),
                l.setData(e),
                p.setVisible(!1))
            }).on("textFocus", function(e) {
                e || T()
            }).on("textKeydown", T).on("optionsChanged", function(t, n) {
                var a;
                "speller" === t && (a = n && e.AUTO_SPELLER_LANGS[o.getProperty("srcLang")],
                g.setEnabled(a),
                s.setProperty("autospeller", a && g.hasState("active")),
                n ? l.setText(o.getProperty("text")).requestData() : l.setText(""))
            }),
            l.on("response", function() {
                s.getProperty("autospeller") && o.setProperty("trText", a.trim(o.getProperty("text")), {
                    sender: "autoSpeller"
                })
            }).on("dataChanged", function(e) {
                o.setProperty("spellerData", e)
            }),
            l.prepareData = function(e) {
                var t = 0
                  , n = {
                    items: []
                };
                return e.data ? (JSON.parse(e.data).forEach(function(a, r) {
                    var o;
                    n.items.push({
                        value: e.text.slice(t, a.pos)
                    }),
                    t = a.pos + a.len,
                    o = i.hasSpellerSavedWord(a.word) || !s.getProperty("autospeller") ? "ready" : "changed",
                    n.items.push({
                        type: a.s.length ? o : "empty",
                        index: r,
                        value: e.text.slice(a.pos, t)
                    })
                }),
                n.items.push({
                    value: e.text.slice(t)
                }),
                n) : n
            }
            ,
            r.on("stateChanged:longtext", u),
            o.on("change", function(t, a, r) {
                var o;
                switch (t) {
                case "text":
                    l.setText(a).syncData(a.length - r.oldValue.length);
                    break;
                case "trText":
                    "autoSpeller" === r.sender && i.emit("autocorrect");
                    break;
                case "srcLang":
                    o = e.AUTO_SPELLER_LANGS[a],
                    l.setLang(a).setOption(n.SpellerModel.options.ONLY_AUTOCORRECTIONS, o && o.auto),
                    g.setEnabled(o && s.isOptionEnabled("speller"));
                    break;
                case "textScrollY":
                    u(),
                    T()
                }
            }),
            o.setFilter("trText", function(e) {
                var t = 0
                  , n = o.getProperty("text").search(/\S/)
                  , a = l.getData();
                return a && s.getProperty("autospeller") ? (a.forEach(function(a) {
                    var s, r, o;
                    a.s && a.s.length && (i.hasSpellerSavedWord(a.word) || (o = a.s[0],
                    r = t + a.pos - n,
                    s = t + a.pos + a.len - n,
                    e = e.slice(0, r) + o + e.slice(s),
                    t += o.length - a.len))
                }),
                e) : e
            }),
            s.on("change:autospeller", function(e) {
                o.setProperty("trText", a.trim(o.getProperty("text")), {
                    sender: e ? "autoSpeller" : "speller"
                }),
                l.setData(l.getData())
            }).setProperty("savedSpellerItems", ""),
            c.on("contentChanged", u),
            g.on("tap", function() {
                var e = this.hasState("active");
                this.setState("active", !e),
                i.emit("autoSpellerClick", !e)
            }).on("stateChanged", function(e) {
                switch (e) {
                case "active":
                case "disabled":
                    s.setProperty("autospeller", this.hasState("active") && this.isEnabled())
                }
            }).setState("active", s.isOptionEnabled("speller") && (!s.hasProperty("autospeller") || s.getProperty("autospeller"))),
            p.on("tap", function(e) {
                var n;
                e.target === this.getContentElement() && (n = o.getProperty("text"),
                t && (i.emit("spellerApply", {
                    item: t,
                    accept: !0,
                    replacement: t.s[0]
                }),
                n = n.slice(0, t.pos) + t.s[0] + n.slice(t.pos + t.len),
                o.setProperty("text", n, {
                    sender: "speller",
                    caret: t.pos + t.s[0].length
                })),
                p.setVisible(!1))
            }),
            h.on("itemSelected", function(e) {
                var n = o.getProperty("text");
                t && (i.emit("spellerApply", {
                    item: t,
                    replacement: e
                }),
                n = n.slice(0, t.pos) + e + n.slice(t.pos + t.len),
                o.setProperty("text", n, {
                    sender: "speller",
                    caret: t.pos + e.length
                }),
                E(t.word)),
                d.setVisible(!1)
            }),
            h.prepareData = function(e) {
                var t = {};
                return e && (t.items = e.map(function(e) {
                    return {
                        text: e,
                        value: e
                    }
                })),
                t
            }
            ,
            this
        },
        initOptions: function(t) {
            var a = this
              , i = this._settings
              , s = e.Object.keys(t.OPTIONS)
              , r = new n.TouchView({
                element: t.ELEMENTS.optionsButton,
                activateFocus: !0
            })
              , o = new n.ListboxMultiplePresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.optionsListbox,
                    template: t.TEMPLATES.listbox,
                    stopDefaultAction: !0
                }),
                model: new n.ListboxModel
            })
              , l = o.getView();
            return r.on("tap", function() {
                this.setFocus(!0),
                l.setVisible()
            }).on("stateChanged:focused", function(e) {
                e || l.setVisible(!1)
            }),
            o.on("valueChanged", function() {
                var e = this.getValue();
                i.setProperty("disabledOptions", s.filter(function(t) {
                    return e.indexOf(t) < 0
                }).join(";"))
            }).on("itemSelected", function(e) {
                a.emit("optionsChanged", e, i.isOptionEnabled(e))
            }),
            o.prepareData = function(t) {
                var n = this.getValue()
                  , a = {};
                return a.items = e.Object.keys(t).map(function(e) {
                    return {
                        text: t[e],
                        value: e,
                        multiple: !0,
                        selected: n.indexOf(e) >= 0
                    }
                }),
                a
            }
            ,
            o.setItems(t.OPTIONS).setValue(s.filter(function(e) {
                return i.isOptionEnabled(e)
            })),
            l.on("stateChanged:hidden", function(e) {
                r.setState("expanded", !e)
            }),
            this
        },
        initHistory: function(t) {
            var n = this
              , a = this.getModel();
            return e.addEventListener("popstate", function(e) {
                var t = {}
                  , n = e.state;
                n && (t.text = n.trText || "",
                n.srcLang && (t.srcLang = n.srcLang),
                n.dstLang && (t.dstLang = n.dstLang),
                a.setProperty(t, {
                    sender: "history"
                }))
            }, !1),
            a.on("set:translation", function(a) {
                var i = e.history.state
                  , s = this.toJSON()
                  , r = {
                    trText: s.trText,
                    srcLang: s.srcLang,
                    dstLang: s.dstLang
                };
                if (!i || e.JSON.stringify(i) !== e.JSON.stringify(r))
                    try {
                        e.history[i && a ? "pushState" : "replaceState"](a ? r : i, "", s.trText.length > t.MAX_SHARE_TEXTLENGTH ? "" : n.getLink({
                            includeSearch: !0
                        }))
                    } catch (e) {}
            }),
            this
        },
        initKeyboard: function(t) {
            var a = this
              , i = this.getView()
              , s = new e.Keyboard(t.ELEMENTS.keyboard)
              , r = new n.TouchView({
                element: t.ELEMENTS.keyboardButton
            })
              , o = new n.TouchView({
                element: t.ELEMENTS.keyboardContainer,
                contentElement: t.ELEMENTS.keyboardLang
            });
            return this.on("action:closeKeyboard", function() {
                o.setVisible(!1),
                a.emit("keyboardOpen", {
                    open: !1,
                    type: "cross"
                })
            }),
            r.on("tap", function() {
                o.setVisible(),
                a.emit("keyboardOpen", {
                    open: o.isVisible(),
                    type: "icon"
                })
            }),
            this.getModel().on("change:srcLang", function(n) {
                s.setLang(n),
                e.Keyboard.layouts[n] || (o.setVisible(!1),
                a.emit("keyboardOpen", {
                    open: !1,
                    type: "lang"
                })),
                r.setEnabled(e.Keyboard.layouts[n]),
                o.setContent(t.TRANSLATOR_LANGS[n], {
                    asText: !0
                })
            }),
            o.on("stateChanged:hidden", function(e) {
                e || s.setExtra(!1).setShifted(!1),
                i.setState("keyboard", !e),
                s.setActive(!e),
                r.setState("active", !e)
            }),
            this
        },
        initSynonyms: function(t) {
            var i = this
              , s = []
              , r = this._settings
              , o = this.getModel()
              , l = o.toJSON()
              , c = new n.ListboxPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.synonymsTabs,
                    template: t.TEMPLATES.listbox
                }),
                model: new n.ListboxModel
            })
              , u = new n.DictionaryPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.synonyms,
                    template: t.TEMPLATES.synonyms,
                    contentElement: t.ELEMENTS.synonymsContent
                }),
                model: new n.DictionaryMultipleModel({
                    ui: t.UI_LANG,
                    srv: t.SRV,
                    sid: t.SID,
                    url: t.DICTIONARY_URL
                },{
                    validators: {
                        text: function(e) {
                            return e && !/[\n\r]/.test(e) && e.length <= t.MAX_DICT_QUERY && a.getValueTokens(e).length <= t.MAX_DICT_WORD_COUNT && r.isOptionEnabled("dictionary") && !a.isUrl(e) && a.hasAlpha(e)
                        },
                        srcLang: function(e) {
                            var n = this.getProperty("dstLang");
                            return e === n && a.hasProperty(t.DICTIONARY_LANGS, e + "-" + n)
                        },
                        dstLang: function(e) {
                            var n = this.getProperty("srcLang");
                            return n === e && a.hasProperty(t.DICTIONARY_LANGS, n + "-" + e)
                        }
                    }
                })
            })
              , g = u.getView();
            return this.on("action", function(e) {
                switch (e) {
                case "retry":
                    u.requestData();
                    break;
                case "synToggleComplaintMode":
                    o.getProperty("complaint") && !g.hasState("complaint") && o.setProperty("complaint", !1, {
                        type: "auto",
                        sender: "syn"
                    }),
                    g.setState("complaint")
                }
            }).on("optionsChanged", function(e, t) {
                "dictionary" === e && (t ? u.setText(o.getProperty("trText")).requestData() : u.setText(""))
            }),
            o.on("change", function(e, a) {
                switch (e) {
                case "trText":
                case "selText":
                    u.setText(a);
                    break;
                case "srcLang":
                    u.setType(n.DictionaryPresenter.types.ANT, t.ANT_LANGS[a]).setType(n.DictionaryPresenter.types.DERIV, t.DERIV_LANGS[a]).setSrcLanguage(a).setDstLanguage(a);
                    break;
                case "complaint":
                    a || g.setState("complaint", !1)
                }
            }),
            c.prepareData = function(e) {
                var t = this.getValue();
                return {
                    items: e.map(function(e) {
                        return e.selected = e.value === t,
                        e
                    })
                }
            }
            ,
            c.on("valueChanged", function(e, t) {
                s.forEach(function(t) {
                    t.setAttribute("data-expanded", t.getAttribute("data-tab") === e)
                }),
                t && i.emit("dictTabToggle", {
                    name: e
                }),
                r.setProperty("synonymsTab", e)
            }),
            u.setType(n.DictionaryPresenter.types.SYN, !0).setFlag(n.DictionaryPresenter.flags.MORPHO, !0).setFlag(n.DictionaryPresenter.flags.FAMILY, t.FAMILY).setFlag(n.DictionaryPresenter.flags.SHORT_POS, !0).setFlag(n.DictionaryPresenter.flags.TOOLTIPS, !0),
            u.prepareData = function(n) {
                var a, s, r, l = o.getProperty("srcLang"), u = [], g = t.SYN_TITLES, p = {
                    articles: []
                };
                if (n = e.JSON.parse(n),
                !(a = n[l]))
                    return null;
                for (s in g)
                    a[s] && a[s].length && (u.push({
                        text: g[s],
                        value: s
                    }),
                    r = {
                        tab: s,
                        items: function(e, n) {
                            var a = ""
                              , i = ""
                              , s = [];
                            return e.forEach(function(e) {
                                var r = {
                                    lines: []
                                };
                                i = e.text,
                                r.title = {
                                    title: e.text
                                },
                                e.pos && (a = e.pos.code,
                                r.title.tooltip = e.pos.tooltip,
                                r.title.partOfSpeech = e.pos.text),
                                e.tr.forEach(function(e, s) {
                                    var o = [{
                                        name: n,
                                        value: e.text,
                                        title: i,
                                        groupIndex: s,
                                        partOfSpeech: a
                                    }];
                                    e.syn && e.syn.forEach(function(e) {
                                        o.push({
                                            name: n,
                                            value: e.text,
                                            title: i,
                                            groupIndex: s,
                                            partOfSpeech: a
                                        })
                                    }),
                                    o.length > t.MAX_SYNONYMS_ITEMS && (o.length = t.MAX_SYNONYMS_ITEMS),
                                    o[o.length - 1].isLast = !0,
                                    r.lines.push({
                                        meanings: o
                                    })
                                }),
                                r.lines.length > t.MAX_SYNONYMS_ITEMS && (r.lines.length = t.MAX_SYNONYMS_ITEMS),
                                s.push(r)
                            }),
                            s
                        }(a[s], s)
                    },
                    "deriv" === s && r.items.forEach(function(e) {
                        e.lines = e.lines.reduce(function(e, t) {
                            return e.meanings = e.meanings.concat(t.meanings),
                            e
                        }),
                        e.lines.meanings.map(function(e, t, n) {
                            return e.isLast = !n[t + 1],
                            e
                        })
                    }),
                    p.articles.push(r));
                return p.articles.length ? (i.emit("synRendered"),
                c.setItems(u),
                p) : null
            }
            ,
            u.on("valueSelected", function(e) {
                g.hasState("complaint") || o.setProperty("text", e, {
                    sender: "synonyms"
                })
            }),
            g.on("scroll", function() {
                i.emit("dictScrolled")
            }).on("contentChanged", function() {
                var e = c.getItems().map(function(e) {
                    return e.value
                })
                  , t = r.getProperty("synonymsTab");
                e.indexOf(t) < 0 && (t = e[0]),
                s = this.getContentElement("[data-tab]", !0),
                c.setValue("", {
                    silent: !0
                }).setValue(t)
            }).on("stateChanged:complaint", function(e) {
                o.setProperty("complaint", e, {
                    type: "toggle",
                    sender: "syn"
                })
            }).bindDOMEvents("scroll", !0),
            l.trText && u.setText(l.trText),
            l.srcLang && u.setSrcLanguage(l.srcLang).setDstLanguage(l.srcLang),
            this
        },
        initUserButton: function(e) {
            var t = new n.TouchView({
                element: e.ELEMENTS.userButton,
                activateFocus: !0
            })
              , a = new n.TouchView({
                element: e.ELEMENTS.userListbox,
                stopDefaultAction: !0
            });
            return t.on("tap", function() {
                this.setFocus(!0),
                a.setVisible()
            }).on("stateChanged:focused", function(e) {
                e || a.setVisible(!1)
            }),
            this
        },
        initSpeechKit: function(e, t) {
            t.settings && t.isWebAudioSupported() && t.settings.langWhitelist.splice(t.settings.langWhitelist.indexOf("en-GB"), 1);
            var a = this
              , i = this.getView()
              , s = this.getModel()
              , r = new n.TemplateView({
                element: e.ELEMENTS.interim,
                template: e.TEMPLATES.measurer
            })
              , o = new t.SpeechRecognition
              , l = t.isWebAudioSupported() ? n.SpeechRecognizerView.langs : n.SpeechKitRecognizerView.langs
              , c = new n.AudioVisualizerView({
                colors: ["#ffd326", "#ffdc61", "#ffeaa0"],
                element: e.ELEMENTS.volume,
                levelPayload: 19
            })
              , u = ""
              , g = new n.SpeechKitRecognizerPresenter({
                view: new n.SpeechKitRecognizerView({
                    element: e.ELEMENTS.microphone,
                    timeout: e.SPEECHKIT_TIMEOUT,
                    recognition: o,
                    recognitionOptions: {
                        apikey: e.SPEECHKIT_KEY,
                        format: t.FORMAT.OPUS || t.FORMAT.PCM16,
                        punctuation: !0,
                        partialResults: !0,
                        utteranceSilence: 80
                    }
                }),
                model: new n.SpeechRecognizerModel({},{
                    validators: {
                        lang: function(e) {
                            return e
                        }
                    }
                })
            });
            return i.on("stateChanged:listening", function(e) {
                e || g.stop()
            }),
            s.on("change:srcLang", function(e) {
                g.setLanguage(l[e] || "")
            }),
            g.on("end", function(e) {
                a.emit("asrEnd", e, u),
                i.setState("listening", !1),
                r.setContent(""),
                c.setVisible(!1).stopVisualization(),
                u = ""
            }).on("start", function(e) {
                var t = o.recorder.getAnalyserNode();
                a.emit("asrStart", e),
                i.setState("listening", !0),
                t.fftSize = 256,
                t.smoothingTimeConstant = .9,
                c.setVisible(!0).setAnalyserNode(t).startVisualization(),
                u = e
            }).on("recognize", function(e) {
                var t = s.getProperty("text")
                  , n = /\S/.test(t.slice(-1)) ? " " : "";
                e.final ? (t += n + e.value,
                s.setProperty("text", t, {
                    sender: "microphone"
                }),
                r.setContent(""),
                a.emit("asrResult", e, u)) : r.renderData({
                    text: n + e.value,
                    leftText: t
                }).scrollTo(r.getScrollInfo().maxTop / 100 * s.getProperty("textScrollY"))
            }).setLanguage(l[s.getProperty("srcLang")] || ""),
            g.getView().on("stateChanged:invalid", function(e) {
                this.setEnabled(!e)
            }),
            this
        },
        initPredictor: function(e) {
            var t = this
              , i = this.getView()
              , s = this._settings
              , r = this.getModel()
              , o = r.toJSON()
              , l = new n.TemplateView({
                element: e.ELEMENTS.measurer,
                template: e.TEMPLATES.measurer
            })
              , c = new n.PredictorPresenter({
                view: new n.ListboxView({
                    element: e.ELEMENTS.predictor,
                    template: e.TEMPLATES.predictor
                }),
                model: new n.PredictorModel({
                    srv: e.SRV,
                    sid: e.SID,
                    limit: e.MAX_PREDICTOR_ITEMS,
                    detectOptions: n.PredictorPresenter.detectOptions.KBD
                },{
                    url: e.PREDICTOR_URL,
                    detectUrl: e.DETECTOR_URL,
                    validators: {
                        text: function(t) {
                            return t && t.length <= e.MAX_PREDICTOR_QUERY && "sjn" !== this.getProperty("srcLang") && !a.isUrl(a.trim(t))
                        },
                        srcLang: function(t) {
                            return a.hasProperty(e.PREDICTOR_LANGS, t)
                        }
                    }
                })
            })
              , u = c.getView();
            return this.on("textTap", function() {
                u.setEnabled(!1)
            }).on("textFocus", function(e) {
                e && u.setEnabled(!1)
            }).on("textKeydown", function(e) {
                switch (e.keyCode) {
                case n.InputView.keys.ENTER:
                    if (e.shiftKey)
                        break;
                    s.isOptionEnabled("shift") && a.preventEvent(e),
                    u.isEnabled() && (a.preventEvent(e),
                    c.setValue(u.getValues()[0], {
                        enter: !0
                    })),
                    this.updateTrText("enter");
                    break;
                default:
                    e.keyCode === n.InputView.keys.ESCAPE && u.isEnabled() && this.updateTrText("escape"),
                    u.setEnabled(!1)
                }
            }),
            this.on("action:toggleAuto", function() {
                c.toggleAuto()
            }),
            r.on("change", function(t, a, i) {
                var s, r;
                switch (t) {
                case "text":
                    if ("url" === i.sender && e.DEFAULT_SRC_LANG)
                        return;
                    r = this.toJSON(),
                    s = i.caret ? i.caret + a.slice(i.caret).search(/\s|$/) : 0,
                    c.setText(n.PredictorPresenter.extractWords(a.slice(0, s), "paste" === i.reason ? e.MAX_PREDICTOR_WORDS : e.MIN_PREDICTOR_WORDS), i.sender || i.reason).setIndex(s).setSrcLanguage(r.srcLang).setDstLanguage(r.dstLang);
                    break;
                case "srcLang":
                    c.setSrcLanguage(a, {
                        reason: "lang"
                    });
                    break;
                case "dstLang":
                    c.setDstLanguage(a);
                    break;
                case "textScrollY":
                    u.setEnabled(!1)
                }
            }),
            c.prepareData = function(e) {
                return {
                    value: e[0]
                }
            }
            ,
            c.on("auto", function(e) {
                i.setState("auto", e),
                s.setProperty("auto", e)
            }).on("ready", function(e) {
                var a, i = r.getProperty("text");
                return "input" === e.reason && s.isOptionEnabled("suggest") && (a = n.PredictorPresenter.createRange(i, e)) ? (l.renderData({
                    text: i.slice(a.start, a.end) || ".",
                    leftText: i.slice(0, a.start),
                    rightText: i.slice(a.end)
                }).scrollTo(l.getScrollInfo().maxTop / 100 * r.getProperty("textScrollY")),
                u.setPosition(l.getContentElement("[data-measurer-target]").getBoundingClientRect()),
                void t.emit("predictorShow", e)) : u.setEnabled(!1)
            }).on("detect", function(e, n) {
                n || t.setSrcLanguage(e)
            }).on("predict", function(e, a) {
                var i = n.PredictorPresenter.prepareValue(r.getProperty("text"), e);
                r.setProperty("text", i.text, {
                    caret: i.caret,
                    sender: "predictor"
                }),
                t.emit("predictorApply", e, a.enter)
            }).on("endOfWord", function() {
                t.updateTrText()
            }),
            o.srcLang && c.setSrcLanguage(o.srcLang),
            o.dstLang && c.setDstLanguage(o.dstLang),
            c.toggleAuto(!s.hasProperty("auto") || s.getProperty("auto")),
            this
        },
        initPhraseBook: function(t) {
            var i = this
              , r = !1
              , o = this.getView()
              , l = this._settings
              , c = {}
              , u = this.getModel()
              , g = new n.TouchView({
                element: t.ELEMENTS.favButton
            })
              , p = new n.TouchView({
                element: t.ELEMENTS.sortButton,
                activateFocus: !0
            })
              , h = new n.ListboxPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.sortListbox,
                    template: t.TEMPLATES.listbox,
                    stopDefaultAction: !0
                }),
                model: new n.ListboxModel
            })
              , d = h.getView()
              , T = new n.PhraseBookPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.favWrapper,
                    template: t.TEMPLATES.favourites,
                    partials: {
                        value: t.TEMPLATES.emojiValue
                    },
                    contentElement: t.ELEMENTS.favContent,
                    debounceRendering: !0,
                    hideAfterTransition: !0
                }),
                model: new n.PhraseBookModel({
                    srv: t.SRV,
                    uid: t.UID,
                    url: t.FAV_URL,
                    limit: t.MAX_FAV_ITEMS,
                    stoken: t.STOKEN
                },{
                    validators: {
                        text: function(e) {
                            return e && e.length <= t.MAX_FAV_TEXTLENGTH && !a.isUrl(e)
                        },
                        items: function(e) {
                            return e && this.getItems().length < this.getProperty("limit")
                        },
                        srcLang: function(e) {
                            return e
                        },
                        dstLang: function(e) {
                            return e
                        },
                        translation: function(e) {
                            return e && e.length <= t.MAX_FAV_TEXTLENGTH
                        }
                    }
                })
            })
              , E = T.getView()
              , m = T.getModel()
              , S = new n.InputPresenter({
                view: new n.InputView({
                    element: t.ELEMENTS.favFilter,
                    activateFocus: !0,
                    contentElement: t.ELEMENTS.favInput
                }),
                model: new n.InputModel
            })
              , f = S.getView()
              , L = function() {
                g.setEnabled(g.hasState("favourite") || m.isValid())
            };
            return this.on("action", function(e) {
                switch (e) {
                case "expandSearch":
                case "collapseSearch":
                    E.setState("search"),
                    S.setValue(""),
                    f.setFocus("expandSearch" === e)
                }
            }),
            T.prepareData = function(e) {
                var t = {};
                return e.length ? (e = e.filter(function(e) {
                    return !e[4]
                }),
                t.empty = !e.length,
                t.items = e.map(function(e) {
                    var t = e[1].split("-");
                    return {
                        id: e[0],
                        text: s.getValuesWithEmoji(e[2]),
                        book: c[e[0].split(".")[1]],
                        srcDir: a.isRTLLang(t[0]) ? "rtl" : "ltr",
                        dstDir: a.isRTLLang(t[1]) ? "rtl" : "ltr",
                        srcLang: t[0],
                        dstLang: t[1],
                        translation: s.getValuesWithEmoji(e[3])
                    }
                }),
                t) : t
            }
            ,
            T.on("favAdd", function() {
                i.emit("favAdd"),
                o.setState("favlimit", T.getItems().length >= m.getProperty("limit")),
                L()
            }).on("favSync", function(n) {
                var s = function() {
                    var e = this.toJSON();
                    T.setText(e.trText).setSrcLanguage(e.srcLang).setDstLanguage(e.dstLang).setTranslation(e.translation),
                    L()
                };
                o.setState("favlimit", n.count >= n.limit),
                c = n.books,
                r || (r = !0,
                i.on("action", function(t, n) {
                    switch (t) {
                    case "clearFav":
                        e.confirm(n.getAttribute("data-confirm")) && (T.deleteItem(T.getItems().map(function(e) {
                            return e[0]
                        })),
                        this.emit("favClear"));
                        break;
                    case "toggleFav":
                        E.setVisible();
                        break;
                    case "clearFavInput":
                        S.setValue(""),
                        f.setFocus(!0);
                        break;
                    case "deleteFavItem":
                        T.deleteItem(n.getAttribute("data-index"))
                    }
                }),
                g.on("tap", function() {
                    this.setEnabled(!1),
                    T[this.hasState("favourite") ? "deleteItem" : "addItem"]()
                }).on("stateChanged:favourite", function(e) {
                    this.getElement().setAttribute("data-tooltip", e ? t.TOOLTIPS.favourite2 : t.TOOLTIPS.favourite)
                }),
                u.on("set:translation", s),
                E.on("stateChanged:hidden", function(e) {
                    i.emit("favToggle", e),
                    this.setState("search", !1),
                    o.setState("favourite", !e),
                    e || S.setValue("")
                }),
                S.on("input", function(e) {
                    var t = T.getItems();
                    e = a.trim(e).toLowerCase(),
                    t.forEach(function(t) {
                        t[4] = t[2].toLowerCase().indexOf(e) < 0 && t[3].toLowerCase().indexOf(e) < 0
                    }),
                    T.setItems(t, {
                        dontCompare: !0
                    })
                }),
                f.on("stateChanged:focused", function(e) {
                    e && i.emit("favFilterActivate")
                }),
                s.call(u))
            }).on("favError", function(e) {
                e.code === n.PhraseBookModel.codes.BAD_VERSION && this.sync(),
                i.emit("favError", e),
                L()
            }).on("favDelete", function() {
                i.emit("favDelete"),
                o.setState("favlimit", T.getItems().length >= m.getProperty("limit")),
                L()
            }).on("favChange", function(e) {
                g.setState("favourite", e)
            }).on("itemSelected", function(e) {
                var t, n;
                (t = this.getItems().filter(function(t) {
                    return t[0] === e
                })[0]) && (n = t[1].split("-"),
                u.setProperty({
                    text: t[2],
                    srcLang: n[0],
                    dstLang: n[1]
                }, {
                    sender: "favourites"
                })),
                E.setVisible(!1)
            }).sync(),
            p.on("tap", function() {
                this.setFocus(!0),
                d.setVisible()
            }).on("stateChanged:focused", function(e) {
                e || d.setVisible(!1)
            }),
            h.prepareData = function(t) {
                var n = this.getValue();
                return t ? {
                    items: e.Object.keys(t).map(function(e) {
                        return {
                            text: t[e],
                            value: e,
                            selected: e === n
                        }
                    })
                } : {}
            }
            ,
            h.on("itemSelected", function() {
                d.setVisible(!1)
            }).on("valueChanged", function(e) {
                l.setProperty("favSort", e),
                T.setSort(e),
                p.setContent(t.FAV_SORT_ITEMS[e], {
                    asText: !0
                })
            }).setValue(l.getProperty("favSort") || t.DEFAULT_FAV_SORT).setItems(t.FAV_SORT_ITEMS),
            d.on("stateChanged:hidden", function(e) {
                p.setState("expanded", !e)
            }),
            this
        },
        initCopying: function(e) {
            var t = this
              , i = this.getModel()
              , s = new n.TouchView({
                element: e.ELEMENTS.copyButton
            });
            return i.on("change", function(e, t) {
                switch (e) {
                case "dstLang":
                    s.setState("download", "sjn" === t && s.hasState("copy"));
                    break;
                case "translation":
                    s.setEnabled(t)
                }
            }),
            s.on("tap", function() {
                var n;
                if (this.hasState("download"))
                    return t.emit("textDownload");
                this.hasState("copy") && a.copyText(i.getProperty("translation")) && (n = !0,
                i.setProperty("tooltip", e.TOOLTIPS.copy2)),
                t.emit("textCopy", n)
            }).on("stateChanged", function(t, n) {
                var a = this.getElement();
                switch (t) {
                case "copy":
                    a.setAttribute("data-tooltip-nohide", n),
                    a.setAttribute("data-tooltip", e.TOOLTIPS.copy);
                    break;
                case "download":
                    a.setAttribute("data-tooltip", n ? e.TOOLTIPS.download : e.TOOLTIPS.copy)
                }
            }).setState("copy", a.copySupported),
            this
        },
        initAlignment: function(e) {
            var t = this
              , a = this._settings
              , i = this.getModel()
              , s = new n.TemplateView({
                element: e.ELEMENTS.alignment,
                template: e.TEMPLATES.measurer
            });
            return this.on("trAlign", function(e) {
                var n, r;
                if (!e)
                    return s.setVisible(!1);
                r = i.getProperty("text"),
                n = function(e) {
                    var n = {
                        start: 0,
                        end: 0
                    }
                      , s = i.getProperty("spellerData");
                    return s && a.getProperty("autospeller") ? (JSON.parse(s).forEach(function(a) {
                        a.s.length && !t.hasSpellerSavedWord(a.word) && (a.pos + a.len <= e[0] + n.start ? (n.start += a.len - a.s[0].length,
                        n.end += a.len - a.s[0].length) : a.pos <= e[1] + n.end && (n.end += a.len - a.s[0].length))
                    }),
                    n) : n
                }(e),
                s.renderData({
                    text: r.slice(e[0] + n.start, e[1] + n.end),
                    leftText: r.slice(0, e[0] + n.start),
                    rightText: r.slice(e[1] + n.end)
                }).setVisible(!0).scrollTo(s.getScrollInfo().maxTop / 100 * i.getProperty("textScrollY"))
            }),
            i.on("change", function(e) {
                switch (e) {
                case "text":
                case "textScrollY":
                case "translation":
                    s.setVisible(!1)
                }
            }),
            this
        },
        initSourceTranslit: function(e) {
            var t = this
              , i = this.getView()
              , s = this._settings
              , r = this.getModel()
              , o = new n.TranslitModel({
                url: e.TRANSLIT_URL
            },{
                validators: {
                    lang: function(t) {
                        return a.hasProperty(e.TRANSLIT_LANGS, t)
                    },
                    text: function(t) {
                        return t && t.length <= e.MAX_TRANSLIT_TEXTLENGTH
                    }
                }
            })
              , l = new n.TouchView({
                element: e.ELEMENTS.sourceTranslitButton
            })
              , c = new n.TranslitPresenter({
                model: o
            });
            return i.on("stateChanged:translit_source", function(e) {
                t.emit("containerHeightChanged"),
                s.setProperty("sourceTranslitEnabled", e),
                c.setLang(r.getProperty("srcLang")).setText(r.getProperty("text"))
            }).setState("translit_source", s.getProperty("sourceTranslitEnabled")),
            r.on("change", function(e) {
                switch (e) {
                case "text":
                case "srcLang":
                    l.setVisible(o.isValid("lang", this.getProperty("srcLang")) && o.isValid("text", this.getProperty("text")))
                }
            }).on("set:translation", function() {
                i.hasState("translit_source") ? c.setLang(this.getProperty("srcLang")).setText(this.getProperty("text")) : c.setText("")
            }),
            l.on("tap", function() {
                t.emit("translitToggle", "source", i.hasState("translit_source")),
                i.setState("translit_source")
            }).on("stateChanged:hidden", function(e) {
                e ? c.setText("") : t.emit("translitTogglerShown", "source")
            }),
            c.on("error", function() {
                t.emit("translitError", "source")
            }).on("result", function(e) {
                r.setProperty("sourceTranslit", e)
            }),
            this
        },
        initTargetTranslit: function(e) {
            var t = this
              , i = this.getView()
              , s = this._settings
              , r = this.getModel()
              , o = new n.TranslitModel({
                url: e.TRANSLIT_URL
            },{
                validators: {
                    lang: function(t) {
                        return a.hasProperty(e.TRANSLIT_LANGS, t)
                    },
                    text: function(t) {
                        return t && t.length <= e.MAX_TRANSLIT_TEXTLENGTH
                    }
                }
            })
              , l = new n.TouchView({
                element: e.ELEMENTS.targetTranslitButton
            })
              , c = new n.TranslitPresenter({
                model: o
            });
            return i.on("stateChanged:translit_target", function(e) {
                t.emit("containerHeightChanged"),
                s.setProperty("targetTranslitEnabled", e),
                c.setLang(r.getProperty("dstLang")).setText(r.getProperty("translation"))
            }).setState("translit_target", s.getProperty("targetTranslitEnabled")),
            r.on("change", function(e) {
                switch (e) {
                case "dstLang":
                case "translation":
                    l.setVisible(o.isValid("lang", this.getProperty("dstLang")) && o.isValid("text", this.getProperty("translation")))
                }
            }).on("set:translation", function(e) {
                i.hasState("translit_target") ? c.setLang(this.getProperty("dstLang")).setText(e) : c.setText("")
            }),
            l.on("tap", function() {
                t.emit("translitToggle", "target", i.hasState("translit_target")),
                i.setState("translit_target")
            }).on("stateChanged:hidden", function(e) {
                e ? c.setText("") : t.emit("translitTogglerShown", "target")
            }),
            c.on("error", function() {
                t.emit("translitError", "target")
            }).on("result", function(e) {
                r.setProperty("targetTranslit", e)
            }),
            this
        },
        initTranslator: function(i) {
            var r = this
              , o = this.getModel()
              , l = o.toJSON()
              , c = new n.TranslatorPresenter({
                view: new n.TemplateView({
                    element: i.ELEMENTS.textbox2,
                    template: i.TEMPLATES.translator,
                    partials: {
                        value: i.TEMPLATES.emojiValue
                    },
                    activateFocus: !0,
                    contentElement: i.ELEMENTS.translation
                }),
                model: new n.TranslatorModel2({
                    srv: i.SRV,
                    sid: i.SID,
                    url: i.TRANSLATOR_URL,
                    options: n.TranslatorModel.options.ALIGN
                },{
                    validators: {
                        text: function() {
                            var e = this.getText().join("\n");
                            return e && e.length <= i.MAX_TRANSLATOR_QUERY && !a.isUrl(e)
                        },
                        srcLang: function(e) {
                            return a.hasProperty(i.TRANSLATOR_LANGS, e) && e !== this.getProperty("dstLang")
                        },
                        dstLang: function(e) {
                            return a.hasProperty(i.TRANSLATOR_LANGS, e) && e !== this.getProperty("srcLang")
                        }
                    }
                })
            })
              , u = c.getView();
            return this.on("textCopy", function() {
                a.selectElement(u.getContentElement())
            }).on("action:retry", function() {
                c.requestTranslation()
            }).on("textDownload", function() {
                c.renderToImage(i.TR_FILENAME)
            }).on("editorResult", function(e) {
                c.getModel().setProperty("translation", e),
                u.setState("modified", !0)
            }),
            o.on("change", function(e, t, n) {
                var s, r;
                switch (e) {
                case "trText":
                    if ("auto" === n.reason && t.length > i.MAX_SYNC_LENGTH)
                        break;
                    c.setText(a.truncateText(t, i.MAX_TRANSLATOR_QUERY), n.reason);
                    break;
                case "srcLang":
                    c.setSrcLanguage(t);
                    break;
                case "dstLang":
                    c.setDstLanguage(t),
                    u.setLanguage(t);
                    break;
                case "targetTranslit":
                    u.getContentElement().setAttribute("data-translit", t);
                    break;
                case "complaint":
                    r = !(s = this.getProperty("selText")) || s === this.getProperty("trText"),
                    u.setState("complaint", t && r),
                    u.getContentElement("[data-complaint-target]").setAttribute("data-complaint-target", r);
                    break;
                case "textScrollY":
                    n.userScroll && u.scrollTo(u.getScrollInfo().maxTop / 100 * t);
                    break;
                case "translation":
                    u.setState("modified", !1)
                }
            }),
            o.on("set:trText", function(e, t) {
                "enter" === t.reason && c.setText(a.truncateText(e, i.MAX_TRANSLATOR_QUERY), t.reason)
            }),
            c.on("error", function(e) {
                r.emit("translationError", e)
            }).on("query", function() {
                r.emit("translateQuery")
            }).on("result", function(e) {
                o.setProperty("translation", e)
            }).on("expired", function(e) {
                r.emit("refreshAlertShow", e)
            }),
            c.prepareData = function(t, n) {
                var a = 0
                  , i = []
                  , r = o.getProperty("text").search(/\S/);
                return n.split(";").forEach(function(n) {
                    n.split(",").slice(1).forEach(function(n) {
                        var o, l;
                        o = (n = n.split("-"))[0].split(":").map(e.Number),
                        l = n[1].split(":").map(e.Number),
                        o[0] += r,
                        t.slice(a, l[0]).split("\n").forEach(function(e, t, n) {
                            i.push({
                                values: s.getValuesWithEmoji(e),
                                needLineBreak: null != n[t + 1]
                            })
                        }),
                        a = l[0] + l[1],
                        i.push({
                            values: s.getValuesWithEmoji(t.slice(l[0], a)),
                            align: [o[0], o[0] + o[1]].join(":")
                        })
                    })
                }),
                t.slice(a).split("\n").forEach(function(e, t, n) {
                    i.push({
                        values: s.getValuesWithEmoji(e),
                        needLineBreak: null != n[t + 1]
                    })
                }),
                {
                    chunks: i
                }
            }
            ,
            c.renderToImage = function(n) {
                var i, s = t.createElement("canvas"), r = s.getContext("2d"), o = u.getContentElement();
                return i = a.getStyle(o),
                s.width = o.scrollWidth + 20,
                s.height = o.scrollHeight + 30 + 14,
                r.rect(0, 0, s.width, s.height),
                r.fillStyle = "#fff",
                r.fill(),
                r.font = [i.fontSize, i.fontFamily].join(" "),
                r.fillStyle = i.color,
                r.textBaseline = "top",
                a.wrapCanvasText(r, this.getModel().getProperty("translation"), 10, 10, o.scrollWidth, e.parseFloat(i.lineHeight)),
                r.font = "14px Arial, Helvetica, sans-serif",
                r.fillStyle = "rgba(0, 0, 0, 0.5)",
                r.fillText(t.location.hostname, 10, s.height - 14 - 10),
                s.msToBlob ? e.navigator.msSaveBlob(s.msToBlob(), n) : a.downloadFile(s.toDataURL("image/png"), n),
                this
            }
            ,
            u.on("scroll", function(e) {
                var t;
                e.target === this.getContentElement() && (t = this.getScrollInfo(),
                o.setProperty("translationScrollY", 100 / t.maxTop * t.top, {
                    userScroll: this.userScroll
                }),
                this.userScroll || (this.userScroll = !0))
            }).on("keydown", function(e) {
                var t = this.getContentElement();
                a.hasCtrlKey(e) && e.target === t && e.keyCode === n.InputView.keys.A && (a.preventEvent(e),
                a.selectElement(t))
            }).on("contentChanged", function() {
                this.scrollTo(this.getScrollInfo().maxTop / 100 * o.getProperty("textScrollY"))
            }).on(n.TouchView.eventTypes.OUT, function() {
                r.emit("trAlign", null)
            }).on(n.TouchView.eventTypes.OVER, function(t) {
                var n, a = this.getClosest(t.target, function(e) {
                    return e.hasAttribute("data-align")
                }, !0);
                (n = a && a.getAttribute("data-align")) && !this.hasState("complaint") && r.emit("trAlign", n.split(":").map(e.Number))
            }).bindDOMEvents("scroll", !0).bindDOMEvents(["keydown", n.TouchView.eventTypes.OUT, n.TouchView.eventTypes.OVER]),
            l.trText && c.setText(a.truncateText(l.trText, i.MAX_TRANSLATOR_QUERY), "auto"),
            l.srcLang && c.setSrcLanguage(l.srcLang),
            l.dstLang && (c.setDstLanguage(l.dstLang),
            u.setLanguage(l.dstLang)),
            this
        },
        initDictionary: function(t) {
            var i = this
              , s = this._settings
              , r = this.getView()
              , o = this.getModel()
              , l = o.toJSON()
              , c = new n.ListboxPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.dictionaryTabs,
                    template: t.TEMPLATES.listbox
                }),
                model: new n.ListboxModel
            })
              , u = new n.DictionaryPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.dictionary,
                    template: t.TEMPLATES.dictionary,
                    DOMEvents: {
                        scroll: !0
                    },
                    contentElement: t.ELEMENTS.dictionaryContent
                }),
                model: new n.DictionaryMultipleModel({
                    ui: t.UI_LANG,
                    srv: t.SRV,
                    sid: t.SID,
                    url: t.DICTIONARY_URL
                },{
                    validators: {
                        text: function(e) {
                            return e && !/[\n\r]/.test(e) && e.length <= t.MAX_DICT_QUERY && a.getValueTokens(e).length <= t.MAX_DICT_WORD_COUNT && s.isOptionEnabled("dictionary") && !a.isUrl(e) && a.hasAlpha(e)
                        },
                        srcLang: function(e) {
                            var n = this.getProperty("dstLang");
                            return e !== n && a.hasProperty(t.DICTIONARY_LANGS, e + "-" + n)
                        },
                        dstLang: function(e) {
                            var n = this.getProperty("srcLang");
                            return n !== e && a.hasProperty(t.DICTIONARY_LANGS, n + "-" + e)
                        }
                    }
                })
            })
              , g = u.getView();
            return this.on("optionsChanged", function(e, t) {
                "dictionary" === e && (r.setState("no_dict", !t),
                t ? u.setText(o.getProperty("trText")).requestData() : u.setText(""))
            }).on("action", function(e) {
                switch (e) {
                case "retry":
                    u.requestData();
                    break;
                case "toggleExamples":
                    g.setState("expanded"),
                    s.setProperty("dictExpanded", g.hasState("expanded"));
                    break;
                case "toggleComplaintMode":
                    o.getProperty("complaint") && !g.hasState("complaint") && o.setProperty("complaint", !1, {
                        type: "auto",
                        sender: "dict"
                    }),
                    g.setState("complaint")
                }
            }),
            r.setState("no_dict", !s.isOptionEnabled("dictionary")),
            o.on("change", function(e, a, s) {
                switch (e) {
                case "text":
                    "dictionary" === s.sender && "tr" === s.type && i.swapDirection();
                    break;
                case "trText":
                case "selText":
                    u.setText(a);
                    break;
                case "srcLang":
                    u.setSrcLanguage(a);
                    break;
                case "dstLang":
                    u.setDstLanguage(a).setFlag(n.DictionaryPresenter.flags.DEFINITIONS, a === t.UI_LANG);
                    break;
                case "complaint":
                    a || g.setState("complaint", !1)
                }
            }),
            c.prepareData = function(e) {
                var t = this.getValue();
                return {
                    items: e.map(function(e) {
                        return e.selected = e.value === t,
                        e
                    })
                }
            }
            ,
            c.on("valueChanged", function(e, t) {
                g.getContentElement("[data-tab]", !0).forEach(function(t) {
                    t.setAttribute("data-expanded", t.getAttribute("data-tab") === e)
                }),
                t && i.emit("dictTabToggle", {
                    name: e
                }),
                s.setProperty("dictionaryTab", e)
            }),
            u.setType(n.DictionaryPresenter.types.REGULAR, !0).setFlag(n.DictionaryPresenter.flags.MORPHO, !0).setFlag(n.DictionaryPresenter.flags.FAMILY, t.FAMILY).setFlag(n.DictionaryPresenter.flags.SHORT_POS, !0).setFlag(n.DictionaryPresenter.flags.TOOLTIPS, !0).setFlag(n.DictionaryPresenter.flags.LONG_EXAMPLES, !0),
            u.prepareData = function(a) {
                var s, r = "", l = "", u = [{
                    text: t.DICT_TITLES.regular,
                    value: "regular"
                }], p = o.getProperty("srcLang") + "-" + o.getProperty("dstLang"), h = !0, d = {
                    longExamples: []
                };
                return (a = e.JSON.parse(a))[p] && (s = a[p][a.head.card ? n.DictionaryPresenter.types.DEF : n.DictionaryPresenter.types.REGULAR]) && s.length ? (d.hasModernLabel = s.some(function(e) {
                    return e.new
                }),
                d.items = s.map(function(e) {
                    var t = {
                        meanings: [],
                        definition: {}
                    }
                      , n = function(e) {
                        var t = [];
                        return e.gen && t.push({
                            value: e.gen.text,
                            title: e.gen.tooltip
                        }),
                        e.num && t.push({
                            value: e.num.text,
                            title: e.num.tooltip
                        }),
                        e.dia && t.push({
                            value: e.dia.text,
                            title: e.dia.tooltip
                        }),
                        t
                    };
                    return t.title = {
                        title: e.text,
                        marks: n(e)
                    },
                    e.text !== l && e.fl && (t.title.fl = e.fl),
                    l = e.text,
                    e.pos && (r = e.pos.code,
                    t.title.tooltip = e.pos.tooltip,
                    t.title.partOfSpeech = e.pos.text),
                    e.ts && (t.title.transcription = e.ts),
                    e.tr.forEach(function(e, a) {
                        var i, s = {
                            examples: [],
                            hasExamples: function() {
                                return !!this.examples.length
                            },
                            hasTranslations: function() {
                                return !!this.meaningTrs.length
                            }
                        }, o = [], c = [{
                            title: l,
                            value: e.text,
                            marks: n(e),
                            groupIndex: a,
                            partOfSpeech: r
                        }];
                        e.def ? t.definition = {
                            imgUrl: e.img,
                            origUrl: e.orig,
                            textVal: e.def.split(/<|>/).map(function(e, t) {
                                return {
                                    text: e,
                                    highlighted: t % 2 != 0
                                }
                            }),
                            altText: e.text,
                            sourceUrl: e.ref.url,
                            sourceName: e.ref.name
                        } : (e.syn && e.syn.forEach(function(e) {
                            c.push({
                                title: l,
                                value: e.text,
                                marks: n(e),
                                groupIndex: a,
                                partOfSpeech: r
                            })
                        }),
                        e.mean && e.mean.forEach(function(e) {
                            o.push({
                                title: l,
                                value: e.text,
                                groupIndex: a,
                                partOfSpeech: r
                            })
                        }),
                        c[c.length - 1].isLast = !0,
                        o.length && (o[o.length - 1].isLast = !0),
                        s.meaningTrs = o,
                        s.meaningVals = c,
                        e.ex && (e.ex.forEach(function(e) {
                            var t = [];
                            e.tr && e.tr.forEach(function(e) {
                                t.push(e.text)
                            }),
                            s.examples.push({
                                title: l,
                                exampleVal: e.text,
                                exampleTrs: t.join(", "),
                                groupIndex: a,
                                partOfSpeech: r
                            })
                        }),
                        h = !1),
                        e.exl && (d.longExamples = d.longExamples.concat(e.exl.map(function(t) {
                            var n = []
                              , a = [];
                            return i !== e.text && (i = e.text,
                            n = c),
                            t.tr && (a = t.tr.map(function(e) {
                                return e.text
                            })),
                            {
                                hasTrs: function() {
                                    return this.exampleTrs.length > 0
                                },
                                exampleVal: t.text.split(/<|>/).map(function(e, t) {
                                    return {
                                        text: e,
                                        highlighted: t % 2 != 0
                                    }
                                }),
                                exampleTrs: a.join(", ").split(/<|>/).map(function(e, t) {
                                    return {
                                        text: e,
                                        highlighted: t % 2 != 0
                                    }
                                }),
                                meaningVals: n
                            }
                        }))),
                        t.meanings.push(s))
                    }),
                    t
                }),
                d.hasLongExamples = d.longExamples.length > 0,
                d.hasLongExamples && u.push({
                    text: t.DICT_TITLES.examples,
                    value: "examples"
                }),
                c.setItems(u),
                g.setState({
                    definition: a.head.card,
                    no_examples: h,
                    long_meanings: d.items.some(function(e) {
                        return e.meanings.length >= 10
                    })
                }),
                i.emit("dictRendered", {
                    expanded: g.hasState("expanded"),
                    noExamples: h,
                    definition: a.head.card
                }),
                d) : null
            }
            ,
            u.on("valueSelected", function(e) {
                g.hasState("complaint") || (e = e.split(":"),
                o.setProperty("text", e[1], {
                    type: e[0],
                    sender: "dictionary"
                }))
            }),
            g.on("scroll", function() {
                i.emit("dictScrolled")
            }).on("stateChanged:complaint", function(e) {
                o.setProperty("complaint", e, {
                    type: "toggle",
                    sender: "dict"
                })
            }).on("contentChanged", function() {
                var e = c.getItems().map(function(e) {
                    return e.value
                })
                  , t = s.getProperty("dictionaryTab");
                e.indexOf(t) < 0 && (t = e[0]),
                c.setValue("", {
                    silent: !0
                }).setValue(t)
            }).setState("expanded", s.getProperty("dictExpanded")),
            l.trText && u.setText(l.trText),
            l.srcLang && u.setSrcLanguage(l.srcLang),
            l.dstLang && u.setDstLanguage(l.dstLang),
            this
        },
        initComplaintPopup: function(e) {
            var t, a = this, i = this.getView(), s = this.getModel(), r = new n.ListboxView({
                element: e.ELEMENTS.complaintPopup,
                template: e.TEMPLATES.empty
            }), o = new n.InputPresenter({
                view: new n.InputView({
                    element: e.ELEMENTS.complaintPopupComment,
                    activateFocus: !0,
                    contentElement: e.ELEMENTS.complaintPopupCommentInput
                }),
                model: new n.InputModel
            }), l = new n.InputPresenter({
                view: new n.InputView({
                    element: e.ELEMENTS.complaintPopupProposal,
                    activateFocus: !0,
                    contentElement: e.ELEMENTS.complaintPopupProposalInput
                }),
                model: new n.InputModel
            }), c = function() {
                r.setVisible(!1)
            };
            return this.on("complaintStatus", function(e) {
                r.setState({
                    error: e,
                    success: !e
                })
            }).on("action", function(e) {
                switch (e) {
                case "sendComplaint":
                case "retryComplaint":
                    r.setState("error", !1),
                    t && this.emit("dictComplaint", {
                        type: t.getAttribute("data-complaint-type"),
                        name: t.getAttribute("data-dict-type"),
                        title: t.getAttribute("data-title"),
                        value: t.textContent,
                        comment: o.getValue(),
                        proposal: l.getValue(),
                        groupNumber: +t.getAttribute("data-group-index") + 1,
                        partOfSpeech: t.getAttribute("data-part-of-speech")
                    });
                    break;
                case "cancelComplaintMode":
                    s.setProperty("complaint", !1, {
                        type: "cancel",
                        name: t.getAttribute("data-dict-type")
                    })
                }
            }),
            r.on("stateChanged:hidden", function(e) {
                var t = e ? "off" : "once";
                a[t]("resize", c)[t]("dictScrolled", c),
                e || this.setState({
                    error: !1,
                    success: !1
                })
            }),
            i.on("tap", function(e) {
                var n = e.target
                  , a = r.getElement();
                s.getProperty("complaint") && !a.contains(n) && (c(),
                (t = this.getClosest(n, function(e) {
                    return "true" === e.getAttribute("data-complaint-target")
                })) && (t.setAttribute("data-highlighted", !0),
                a.setAttribute("data-complaint-type", t.getAttribute("data-complaint-type")),
                r.setVisible(!0).setPosition(t.getBoundingClientRect(), !0)))
            }),
            s.on("change", function(e) {
                switch (e) {
                case "trText":
                case "selText":
                case "srcLang":
                case "dstLang":
                    this.getProperty("complaint") && this.setProperty("complaint", !1, {
                        type: "change"
                    });
                    break;
                case "complaint":
                    c()
                }
            }),
            r.on("stateChanged:hidden", function(e) {
                e ? t && (t.removeAttribute("data-highlighted"),
                t = null) : (o.setValue(""),
                l.setValue(""))
            }),
            this
        },
        initLangHistory: function(t) {
            var i = this
              , s = this._settings
              , r = this.getModel()
              , o = r.toJSON()
              , l = new n.ListboxPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.srcLangHistory,
                    template: t.TEMPLATES.listbox,
                    partials: {
                        extras: t.TEMPLATES.pin
                    },
                    contentElement: t.ELEMENTS.srcLangHistoryContent
                }),
                model: new n.ListboxModel({},{
                    validators: {
                        value: function(e) {
                            return a.hasProperty(t.TRANSLATOR_LANGS, e)
                        }
                    }
                })
            })
              , c = new n.ListboxPresenter({
                view: new n.ListboxView({
                    element: t.ELEMENTS.dstLangHistory,
                    template: t.TEMPLATES.listbox,
                    partials: {
                        extras: t.TEMPLATES.pin
                    },
                    contentElement: t.ELEMENTS.dstLangHistoryContent
                }),
                model: new n.ListboxModel({},{
                    validators: {
                        value: function(e) {
                            return a.hasProperty(t.TRANSLATOR_LANGS, e)
                        }
                    }
                })
            })
              , u = function(e) {
                var t = {};
                return (e = e ? e.split(";") : []).forEach(function(e) {
                    e = e.split(":"),
                    t[e[0]] = !!+e[1]
                }),
                t
            }
              , g = function(t) {
                return e.Object.keys(t).map(function(e) {
                    return [e, +!!t[e]].join(":")
                }).join(";")
            };
            return this.on("action", function(e, t) {
                var n, a, s, r;
                switch (e) {
                case "pinLang":
                case "unpinLang":
                    n = t.getAttribute("data-type"),
                    a = t.getAttribute("data-lang"),
                    (s = (r = "src" === n ? l : c).getItems())[a] = "pinLang" === e,
                    r.setItems(s),
                    i.emit("langPinned", {
                        type: n,
                        lang: a,
                        pinned: "pinLang" === e
                    })
                }
            }),
            r.on("change", function(e, t) {
                switch (e) {
                case "srcLang":
                    l.setValue(t);
                    break;
                case "dstLang":
                    c.setValue(t)
                }
            }).on("set:translation", function(e) {
                e && (l.sortItems(t.MAX_RECENT_LANGUAGES),
                c.sortItems(t.MAX_RECENT_LANGUAGES))
            }),
            l.sortItems = c.sortItems = function(t) {
                var n, a = this.getItems(), i = this.getValue(), s = {}, r = [], o = [];
                if (!(a[i] || (e.Object.keys(a).forEach(function(e) {
                    a[e] ? r.push(e) : o.push(e)
                }),
                (t -= r.length) <= 0)))
                    return (n = o.indexOf(i)) >= 0 && o.splice(n, 1),
                    o.unshift(i) > t && (o.length = t),
                    r.forEach(function(e) {
                        s[e] = !0
                    }),
                    o.forEach(function(e) {
                        s[e] = !1
                    }),
                    this.setItems(s)
            }
            ,
            l.prepareData = c.prepareData = function(n) {
                var a = this === l ? "src" : "dst";
                return {
                    items: e.Object.keys(n).map(function(e) {
                        return {
                            type: a,
                            text: t.TRANSLATOR_LANGS[e],
                            value: e,
                            pinned: n[e]
                        }
                    })
                }
            }
            ,
            l.on("valueChanged", function(e) {
                i.setSrcLanguage(e, {
                    sender: "langHistory"
                })
            }).on("itemsChanged", function() {
                s.setProperty("srcLangHistory", g(this.getItems()))
            }),
            c.on("valueChanged", function(e) {
                i.setDstLanguage(e, {
                    sender: "langHistory"
                })
            }).on("itemsChanged", function() {
                s.setProperty("dstLangHistory", g(this.getItems()))
            }),
            l.setItems(u(s.getProperty("srcLangHistory"))),
            c.setItems(u(s.getProperty("dstLangHistory"))),
            o.srcLang && l.setValue(o.srcLang),
            o.dstLang && c.setValue(o.dstLang),
            this
        },
        initNativeSound: function(e) {
            var t = this
              , i = this.getModel()
              , s = i.toJSON()
              , r = {
                text: function(t) {
                    return t && t.length <= e.MAX_NATIVE_TTS_LENGTH && a.hasAlphaOrDigit(t) && !a.isUrl(t)
                },
                voice: function(e) {
                    return n.NativeSpeakerView.getVoiceByLanguage(e)
                }
            }
              , o = new n.NativeSpeakerPresenter({
                view: new n.NativeSpeakerView({
                    rate: e.TTS_RATE,
                    element: e.ELEMENTS.textNativeSpeaker
                }),
                model: new n.NativeSpeakerModel({},{
                    validators: r
                })
            })
              , l = new n.NativeSpeakerPresenter({
                view: new n.NativeSpeakerView({
                    rate: e.TTS_RATE,
                    element: e.ELEMENTS.translatorNativeSpeaker
                }),
                model: new n.NativeSpeakerModel({},{
                    validators: r
                })
            });
            return this.on("speakerAction", function() {
                o.stopSpeaking(),
                l.stopSpeaking()
            }).on("visibilityChange", function(e) {
                e && (o.stopSpeaking(),
                l.stopSpeaking())
            }),
            i.on("change", function(e, t) {
                switch (e) {
                case "text":
                    o.setText(a.trim(t));
                    break;
                case "srcLang":
                    o.setVoice(t);
                    break;
                case "dstLang":
                    l.setVoice(t);
                    break;
                case "translation":
                    l.setText(a.trim(t))
                }
            }),
            o.on("speak", function(e) {
                t.emit("nativeSpeakerAction", e),
                l.stopSpeaking()
            }).on("error", function(e) {
                e.error = !0,
                t.emit("nativeSpeakerAction", e)
            }),
            l.on("speak", function(e) {
                t.emit("nativeSpeakerAction", e),
                o.stopSpeaking()
            }).on("error", function(e) {
                e.error = !0,
                t.emit("nativeSpeakerAction", e)
            }),
            s.text && o.setText(a.trim(s.text)),
            s.srcLang && o.setVoice(s.srcLang),
            s.dstLang && l.setVoice(s.dstLang),
            s.translation && l.setText(a.trim(s.translation)),
            this
        },
        initShareButton: function(i) {
            var s = this
              , r = this.getModel()
              , o = new n.TouchView({
                element: i.ELEMENTS.shareInput,
                stopDefaultAction: !0
            })
              , l = new n.TouchView({
                element: i.ELEMENTS.shareButton,
                activateFocus: !0
            })
              , c = new n.TouchView({
                element: i.ELEMENTS.shareCopyLink,
                stopDefaultAction: !0
            })
              , u = new n.SharePresenter({
                view: new n.ListboxView({
                    element: i.ELEMENTS.share,
                    template: i.TEMPLATES.listbox,
                    contentElement: i.ELEMENTS.shareContent,
                    stopDefaultAction: !0
                }),
                model: new n.ShareModel({
                    url: i.SHARE_URL,
                    title: t.title
                })
            })
              , g = u.getView()
              , p = function(e) {
                var t;
                l.setEnabled(e && e.length <= i.MAX_SHARE_TEXTLENGTH),
                e && (t = s.getLink({
                    absolute: !0
                }),
                o.setContent(t, {
                    asText: !0
                }),
                u.setLink(t).setDescription(e))
            };
            return this.on("action", function(t) {
                switch (t) {
                case "mailTo":
                    u.write();
                    break;
                case "openSearch":
                    this.emit("textSearch"),
                    e.open(i.SEARCH_URL + "?" + a.toQueryString({
                        text: '"' + r.getProperty("translation") + '"'
                    }))
                }
            }),
            r.on("set:translation", p),
            o.on("tap", function() {
                a.selectElement(this.getElement()),
                l.setFocus(!0)
            }),
            l.on("tap", function() {
                this.setFocus(!0),
                s.emit("sharingOpen"),
                g.setVisible()
            }).on("stateChanged:focused", function(e) {
                e || g.setVisible(!1)
            }),
            u.prepareData = function(e) {
                var t = {};
                return t.items = e.map(function(e) {
                    return {
                        value: e,
                        title: i.SOCIAL_SERVICES[e]
                    }
                }),
                t
            }
            ,
            u.on("share", function(e) {
                s.emit("shareData", e)
            }).on("write", function(e) {
                s.emit("writeMail", e)
            }).setItems(e.Object.keys(i.SOCIAL_SERVICES)),
            c.on("tap", function() {
                this.hasState("copy") && a.copyText(s.getLink({
                    absolute: !0
                })) && r.setProperty("tooltip", i.TOOLTIPS.copyLink2),
                a.selectElement(o.getElement()),
                l.setFocus(!0)
            }).on("stateChanged:copy", function(e) {
                var t = this.getElement();
                t.setAttribute("data-tooltip-nohide", e),
                t.setAttribute("data-tooltip", i.TOOLTIPS.copyLink)
            }).setState("copy", a.copySupported),
            g.on("stateChanged:hidden", function(e) {
                e || this.setPosition(l.getRect(), !0)
            }),
            p(r.getProperty("translation")),
            this
        },
        initExternalView: function(t) {
            var i = this.getModel()
              , s = new n.TemplateView({
                element: t.ELEMENTS.external,
                template: t.TEMPLATES.external,
                contentElement: t.ELEMENTS.externalContent
            })
              , r = function(n) {
                var i;
                n && (i = this.toJSON(),
                s.renderData({
                    items: e.Object.keys(t.EXTERNAL_SERVICES).map(function(e) {
                        var n = {}
                          , s = t.EXTERNAL_SERVICES[e];
                        return n[s.textParam] = i.trText,
                        n[s.srcLangParam] = i.srcLang,
                        n[s.dstLangParam] = i.dstLang,
                        {
                            text: e,
                            name: e,
                            href: s.href + "?" + a.toQueryString(n)
                        }
                    })
                })),
                s.setVisible(n && n.length <= t.MAX_SHARE_TEXTLENGTH)
            };
            return i.on("set:translation", r),
            r.call(i, i.getProperty("translation")),
            this
        },
        initTranslationVote: function(e) {
            var t = this
              , i = this.getView()
              , s = this.getModel()
              , r = new n.TouchView({
                element: e.ELEMENTS.goodVoteButton
            })
              , o = new n.TouchView({
                element: e.ELEMENTS.badVoteButton
            })
              , l = new n.TouchView({
                element: e.ELEMENTS.editorButton
            })
              , c = new n.InputView({
                element: e.ELEMENTS.textarea2
            })
              , u = new n.InputPresenter({
                view: c,
                model: new n.InputModel
            });
            return this.on("action", function(e) {
                switch (e) {
                case "openEditing":
                    i.setState({
                        editing: !0,
                        vote_bad: !1
                    }),
                    this.emit("editorToggle", {
                        type: "vote",
                        open: !0,
                        value: c.getValue()
                    });
                    break;
                case "sendEditing":
                    i.hasState("allowed_editing") && (this.emit("editorResult", a.trim(c.getValue()), s.getProperty("translation")),
                    i.setState({
                        edited: !0,
                        editing: !1
                    }));
                    break;
                case "cancelEditing":
                    this.emit("editorToggle", {
                        type: "cancel",
                        value: c.getValue()
                    }),
                    i.setState("editing", !1);
                    break;
                case "refuseEditing":
                    i.setState("vote_bad", !1)
                }
            }),
            i.on("stateChanged", function(e, n) {
                switch (e) {
                case "editing":
                    n ? (this.setState("edited", !1),
                    c.setFocus(!0)) : this.setState("allowed_editing", !1),
                    t.emit("containerHeightChanged"),
                    c.setValue(s.getProperty("translation"))
                }
            }),
            s.on("change", function(n, s) {
                var u;
                switch (n) {
                case "trText":
                case "srcLang":
                case "dstLang":
                    i.hasState("editing") && t.emit("editorToggle", {
                        type: "change",
                        value: c.getValue()
                    }),
                    i.setState({
                        edited: !1,
                        editing: !1,
                        vote_bad: !1,
                        vote_good: !1
                    });
                    break;
                case "translation":
                    if (i.hasState("editing"))
                        break;
                    u = s && s.length <= e.MAX_EDITOR_TEXTLENGTH && !a.isUrl(s),
                    o.setState("voted", !1).setEnabled(u),
                    r.setState("voted", !1).setEnabled(u),
                    l.setEnabled(u);
                    break;
                case "userTranslation":
                    s = a.trim(s),
                    i.setState("allowed_editing", s && s !== this.getProperty("translation"))
                }
            }),
            o.on("tap", function() {
                i.setState("vote_bad", !0),
                this.setState("voted", !0).setEnabled(!1),
                r.setEnabled(!1),
                t.emit("translationVoted", s.getProperty("translation"))
            }),
            r.on("tap", function() {
                i.setState("vote_good", !0),
                this.setState("voted", !0).setEnabled(!1),
                o.setEnabled(!1),
                t.emit("translationVoted", s.getProperty("translation"), !0)
            }),
            l.on("tap", function() {
                var e = i.hasState("editing");
                i.setState({
                    editing: !e,
                    vote_bad: !1,
                    vote_good: !1
                }),
                t.emit("editorToggle", {
                    type: "toggle",
                    open: !e,
                    value: c.getValue()
                })
            }),
            u.on("input", function(e) {
                s.setProperty("userTranslation", e)
            }),
            this
        },
        initSmsBlock: function(e) {
            var t = this
              , a = new n.InputView({
                element: e.ELEMENTS.smsPhone,
                activateFocus: !0,
                contentElement: e.ELEMENTS.smsPhoneInput
            })
              , i = new n.InputPresenter({
                view: a,
                model: new n.InputModel
            })
              , s = new n.TouchView({
                element: e.ELEMENTS.smsBlock
            })
              , r = new n.SmsBlockPresenter({
                view: s,
                model: new n.SmsBlockModel({
                    ui: e.UI_LANG,
                    srv: e.SRV,
                    sid: e.SID,
                    ver: e.VER,
                    url: e.SMSBLOCK_URL,
                    stoken: e.STOKEN
                },{
                    validators: {
                        phone: function(t) {
                            switch (e.DOMAIN) {
                            case "ru":
                                return 11 === t.length && /^[78]9/.test(t);
                            case "ua":
                                return 12 === t.length && /^380/.test(t);
                            case "tr":
                                return 12 === t.length && /^905/.test(t);
                            default:
                                return !1
                            }
                        }
                    }
                })
            });
            return this.on("action", function(e) {
                var t, n;
                switch (e) {
                case "clearSmsPhoneInput":
                    a.setFocus(!0),
                    i.setValue("");
                    break;
                case "sendSms":
                    t = r.toJSON(),
                    n = !s.hasState("invalid"),
                    this.emit("sendSms", t, n),
                    n ? r.send() : (a.setFocus(!0),
                    s.setState("alert", !0));
                    break;
                case "smsTryAgain":
                    r.reset(),
                    a.setFocus(!0)
                }
            }),
            i.on("input", function(t) {
                s.setState("alert", !1),
                r.reset(),
                t = t.replace(/\D+/g, ""),
                r.setPhone(t),
                i.setValue(n.SmsBlockPresenter.prepareNumber(e.DOMAIN, t))
            }),
            r.on("error", function(e) {
                a.setFocus(!0),
                t.emit("smsError", this.toJSON(), e)
            }),
            a.on("stateChanged:focused", function(e) {
                e || s.setState({
                    alert: !1,
                    error_param: !1,
                    error_connection: !1
                })
            }),
            this
        },
        initTextCounter: function(e) {
            var t = this.getModel()
              , a = new n.TouchView({
                element: e.ELEMENTS.textCounter,
                contentElement: e.ELEMENTS.textCounterContent
            })
              , i = function(t) {
                var n = t.length;
                a.setState("warning", n > e.MAX_TRANSLATOR_QUERY).setContent(n, {
                    asText: !0
                })
            };
            return t.on("change", function(e, t) {
                "text" === e && i(t)
            }),
            i(t.getProperty("text")),
            this
        },
        initFooterPromo: function(t) {
            var n, a = this.getView(), i = this._settings, s = i.getProperty("footerPromoExpDate");
            return s && (n = new e.Date(s),
            (s = new e.Date).setDate(s.getDate() - t.FOOTERPROMO_EXP_DAYS),
            n >= s) ? this : (this.on("action:closePromoFooter", function() {
                a.setState("allowed_footer-promo", !1),
                i.setProperty("footerPromoExpDate", new e.Date)
            }),
            a.setState("allowed_footer-promo", !0),
            this.emit("expandFooterPromo"))
        },
        initDescription: function(e) {
            var t = this.getView()
              , a = this.getModel()
              , i = new n.TouchView({
                element: e.ELEMENTS.serviceDescription
            });
            return a.on("change", function(e, n, a) {
                switch (e) {
                case "trText":
                    n && i.setVisible(!1);
                    break;
                case "srcLang":
                case "dstLang":
                    a.oldValue && t.setState("hidden_service-description", !0)
                }
            }),
            this
        },
        initDescriptionDict: function(e) {
            var t = this.getView()
              , a = this.getModel()
              , i = new n.TouchView({
                element: e.ELEMENTS.serviceDescription
            });
            return a.on("change", function(e, n, a) {
                switch (e) {
                case "trText":
                case "srcLang":
                case "dstLang":
                    a.oldValue && (t.setState("hidden_service-description", !0),
                    i.setVisible(!1))
                }
            }),
            this
        },
        initLangSwitcher: function(e) {
            var t = new n.TouchView({
                element: e.ELEMENTS.langSwitcherButton,
                activateFocus: !0
            })
              , a = new n.TouchView({
                element: e.ELEMENTS.langSwitcherListbox,
                stopDefaultAction: !0
            });
            return t.on("tap", function() {
                this.setFocus(!0),
                a.setVisible()
            }).on("stateChanged:focused", function(e) {
                e || a.setVisible(!1)
            }),
            this
        },
        initTextArea: function(t) {
            var i = this
              , s = t.USE_FAKEAREA && n.InputView.fakeAreaSupported
              , r = this.getView()
              , o = this._settings
              , l = new n.InputView({
                element: t.ELEMENTS.textbox,
                activateFocus: !0,
                contentElement: s ? n.InputView.makeFakeArea(t.ELEMENTS.fakeArea) : t.ELEMENTS.textarea
            })
              , c = new n.InputPresenter({
                view: l,
                model: new n.InputModel
            })
              , u = this.getModel()
              , g = new n.TouchView({
                element: t.ELEMENTS.clearButton
            });
            return this.on("pageReady", function() {
                var e = t.DEFAULT_TEXT || "";
                l.setFocus(!0).setValue(e, {
                    caret: e.length,
                    sender: "url"
                })
            }).on("keyboardOpen", function() {
                l.setFocus(!0)
            }),
            this.on("action", function(t) {
                var n;
                switch (t) {
                case "swapDirection":
                    (n = u.getProperty("translation")) && u.setProperty("text", n, {
                        sender: "translator"
                    }),
                    this.swapDirection();
                    break;
                case "expiredRefresh":
                    o.setProperty("savedText", u.getProperty("trText")),
                    e.location.href = e.location.href
                }
            }),
            this.on("refreshAlertShow", function() {
                l.setFocus(!1),
                r.setState("expired", !0)
            }),
            r.on("stateChanged:longtext", function() {
                l.getContentElement().value += ""
            }).setState("faked", s),
            l.on("tap", function() {
                i.emit("textTap", c.getCaret()),
                r.setState("listening", !1)
            }).on("paste", function() {
                this.userPaste = !0
            }).on("scroll", function(e) {
                var t;
                e.target === this.getContentElement() && (t = this.getScrollInfo(),
                u.setProperty("textScrollY", 100 / t.maxTop * t.top, {
                    userScroll: this.userScroll
                }),
                this.userScroll || (this.userScroll = !0))
            }).on("select", function() {
                e.setTimeout(function() {
                    var e = l.getSelection();
                    e.start !== e.end && (e.trim = !0,
                    u.setProperty("selText", c.getValue(e) || u.getProperty("trText")))
                }, 0)
            }).on("keydown", function(e) {
                i.emit("textKeydown", e)
            }).on("stateChanged:empty", function(e) {
                r.setState("empty", e)
            }).on("stateChanged:focused", function(e) {
                i.emit("textFocus", e),
                e || i.updateTrText()
            }).bindDOMEvents("scroll", !0).bindDOMEvents("paste select keydown"),
            u.setFilter("selText", function(e) {
                var t = this.getProperty("spellerData");
                if (!t || !o.getProperty("autospeller"))
                    return e;
                try {
                    t = JSON.parse(t)
                } catch (t) {
                    return e
                }
                return a.isArray(t) && t.forEach(function(t) {
                    t.s && t.s.length && e === t.word && (i.hasSpellerSavedWord(t.word) || (e = t.s[0]))
                }),
                e
            }),
            c.on("input", function(e, t) {
                l.userPaste && (l.userPaste = !1,
                i.emit("textPaste", e, t.oldValue)),
                t.caret = t.caret || this.getCaret(),
                i.setText(e, t)
            }),
            u.on("change", function(n, s, o) {
                var u, p, h, d;
                switch (n) {
                case "text":
                    this.setProperty("timestamp", e.Date.now()),
                    u = s.length,
                    l.setFocus(!0),
                    r.setState("longtext", u > t.LONGTEXT_LENGTH),
                    "synonyms" === o.sender && (p = l.getSelection()).start !== p.end && (d = o.oldValue.slice(p.start, p.end),
                    p.start += d.search(/\S/),
                    p.end -= d.length - d.search(/\s*$/),
                    a.extend(o, p),
                    o.caret = p.start + u),
                    c.setValue(s, o),
                    o.caret && c.setCaret(o.caret),
                    h = l.getScrollInfo(),
                    this.setProperty("textScrollY", 100 / h.maxTop * h.top),
                    g.setEnabled(s);
                    break;
                case "trText":
                    this.setProperty("selText", "", {
                        silent: !0
                    });
                    break;
                case "srcLang":
                    l.setFocus(!0),
                    l.setLanguage(s);
                    break;
                case "dstLang":
                    l.setFocus(!0);
                    break;
                case "timestamp":
                    s - o.oldValue > t.SESSION_RESUME_TIME && i.emit("sessionResumed", s - o.oldValue);
                    break;
                case "sourceTranslit":
                    l.getContentElement().setAttribute("data-translit", s);
                    break;
                case "translationScrollY":
                    o.userScroll && l.scrollTo(l.getScrollInfo().maxTop / 100 * s)
                }
            }),
            g.on("tap", function() {
                i.emit("textDelete"),
                u.setProperty("text", "")
            }),
            o.hasProperty("savedText") && (t.DEFAULT_TEXT = o.getProperty("savedText"),
            o.setProperty("savedText", null)),
            l.setValue(""),
            this
        }
    }, {
        getTwemojiCode: function(e) {
            var t = e.indexOf("‍") < 0 ? e.replace(/\ufe0f/g, "") : e;
            return a.getEmojiCodes(t).join("-")
        },
        getValuesWithEmoji: function(e) {
            var t = 0
              , n = [];
            return a.getEmoji(e).forEach(function(a) {
                t !== a.index && n.push({
                    value: e.slice(t, a.index)
                }),
                t = a.index + a.value.length,
                n.push({
                    value: a.value,
                    emojiCode: this.getTwemojiCode(a.value)
                })
            }, this),
            t < e.length && n.push({
                value: e.slice(t)
            }),
            n
        }
    });
    n.DesktopTranslateApplication = s
}(this, this.document, this.yandexTranslate);
