this.yandexTranslate = this.yandexTranslate || {},
function(t, e, n, i, s) {
    "use strict";
    var r = 0
      , u = /^(https?:\/\/)?(([\w\-\xc0-\uffef]+\.)+([\w\-\xc0-\uffef]+))(:\d+)?(\/\S*)?$/i
      , a = /\ud83d[\udc68-\udc69](?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92])|(?:\ud83c[\udfcb\udfcc]|\ud83d\udd75|\u26f9)(?:\ufe0f|\ud83c[\udffb-\udfff])\u200d[\u2640\u2642]\ufe0f|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd37-\udd39\udd3d\udd3e\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|(?:[\u0023\u002a\u0030-\u0039])\ufe0f?\u20e3|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddd1-\udddd]|[\u270a\u270b])(?:\ud83c[\udffb-\udfff]|)|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud800\udc00|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a-\udc6d\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\udeeb\udeec\udef4-\udef8]|\ud83e[\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd40-\udd45\udd47-\udd4c\udd50-\udd6b\udd80-\udd97\uddc0\uddd0\uddde-\udde6]|[\u23e9-\u23ec\u23f0\u23f3\u2640\u2642\u2695\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a]|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u00a9\u00ae\u203c\u2049\u2122\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2694\u2696\u2697\u2699\u269b\u269c\u26a0\u26a1\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))/g
      , o = "ae,ar,at,au,az,be,bg,biz,br,by,ca,cc,ch,cl,club,cn,co,com,cz,de,dk,edu,ee,es,eu,fi,fr,gg,gov,gr,hk,hr,hu,id,ie,il,in,info,io,ir,it,jp,kr,kz,lt,lv,market,me,mobi,mx,my,net,news,nl,no,nz,online,org,pe,ph,pk,pl,pro,pt,pw,ro,rs,ru,se,sg,si,sk,su,th,tj,tk,top,tr,tv,tw,ua,uk,us,ve,vn,ws,xn--p1ai,xyz,za,рф".split(",")
      , d = {
        ar: !0,
        fa: !0,
        he: !0,
        ur: !0,
        yi: !0
    }
      , c = n.userAgent.toLowerCase()
      , h = [[223, 223], [880, 1791], [2304, 3711], [4256, 4351], [12352, 12543], [19968, 40879], [44032, 55215]]
      , l = [/(\n+)/, /([.!?;\u0964](?:\s+|$))/, /([\-\u2012-\u2015](?:\s+|$))/, /([,:](?:\s+|$))/, /([\u3002\uff01\uff1f\uff1b\u2026])/, /([\uff0c\uff1a])/, /(\s+)/]
      , f = h.length
      , g = !!e.documentElement.classList && !!e.createElementNS("http://www.w3.org/2000/svg", "svg").classList;
    t.URL = t.URL || t.webkitURL,
    t.cancelAnimationFrame = t.cancelAnimationFrame || t.mozCancelAnimationFrame || t.webkitCancelAnimationFrame || function(t) {
        this.clearTimeout(t)
    }
    ,
    t.requestAnimationFrame = t.requestAnimationFrame || t.mozRequestAnimationFrame || t.webkitRequestAnimationFrame || function(t) {
        return this.setTimeout(t, 1e3 / 60)
    }
    ,
    i.util = {
        mob: /mobi|tablet/.test(c),
        iOS: function(e) {
            var n;
            return /ip(hone|ad|od)/.test(e) ? (n = e.match(/os ([0-9_]+)/)) ? t.parseFloat(n[1].replace(/_/g, ".")) : 1 : 0
        }(c),
        noop: function() {},
        trim: function(t) {
            return this.isString(t) ? t.trim() : t
        },
        bind: function(t, e, n, i) {
            t.addEventListener(e, n, !!i)
        },
        isIP4: function(e) {
            var n = e.split(".").map(t.Number);
            return 4 === n.length && n.every(function(t) {
                return t >= 0 && t < 256
            })
        },
        isUrl: function(e) {
            return !/\s/.test(e) && u.test(e) && (this.isIP4(t.RegExp.$2) || o.indexOf(t.RegExp.$4.toLowerCase()) >= 0)
        },
        isEmail: function(t) {
            return /^[a-zA-Z0-9\+\.\_\%\-\+]{1,256}\@[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}(\.[a-zA-Z0-9][a-zA-Z0-9\-]{0,25})+$/.test(t)
        },
        clone: function(t) {
            return this.isArray(t) ? t.slice() : this.isObject(t) ? this.extend({}, t) : t
        },
        slice: function(t, e, n) {
            return Array.prototype.slice.call(t, e, n)
        },
        unbind: function(t, e, n, i) {
            t.removeEventListener(e, n, !!i)
        },
        extend: Object.assign || function(t) {
            var e, n, i, s = this.slice(arguments, 1);
            for (n = s.length,
            t = t || {},
            e = 0; e < n; e++)
                (i = s[e]) && Object.keys(i).forEach(function(e) {
                    t[e] = i[e]
                });
            return t
        }
        ,
        android: function(e) {
            var n = c.match(/android ([0-9.]*)/);
            return n ? t.parseFloat(n[1] || 1) : 0
        }(),
        isAlpha: function(t) {
            var e, n;
            if (t.toLowerCase() !== t.toUpperCase())
                return !0;
            for (e = 0,
            n = t.charCodeAt(0); e < f; e++)
                if (n >= h[e][0] && n <= h[e][1])
                    return !0;
            return !1
        },
        isDigit: function(t) {
            var e = t.charCodeAt(0);
            return e >= 48 && e <= 57
        },
        isEqual: Object.is || function(t, e) {
            return t === e ? 0 !== t || 1 / t == 1 / e : t != t && e != e
        }
        ,
        isArray: Array.isArray,
        isEmpty: function(t) {
            return !t || (this.isArray(t) ? 0 === t.length : !!this.isObject(t) && 0 === Object.keys(t).length)
        },
        forEach: function(t, e, n) {
            var i, s = t.length;
            for (i = 0; i < s && !1 !== e.call(n, t[i], i, t); i++)
                ;
        },
        hasAlpha: function(t) {
            var e, n;
            if (!t)
                return !1;
            for (e = 0,
            n = t.length; e < n; e++)
                if (this.isAlpha(t.charAt(e)))
                    return !0;
            return !1
        },
        hasDigit: function(t) {
            var e, n;
            if (!t)
                return !1;
            for (e = 0,
            n = t.length; e < n; e++)
                if (this.isDigit(t.charAt(e)))
                    return !0;
            return !1
        },
        getEmoji: function(t) {
            for (var e, n = []; e = a.exec(t); )
                n.push({
                    value: e[0],
                    index: e.index
                });
            return n
        },
        getEmojiCodes: function(t) {
            for (var e, n, i = 0, s = t.length, r = []; i < s; )
                (e = t.charCodeAt(i++)) >= 55296 && e <= 56319 ? n = e : (n && (e = e - 56320 + (n - 55296 << 10) + 65536,
                n = 0),
                r.push(e.toString(16)));
            return r
        },
        getValueTokens: function(t, e) {
            return this.trim(t).split(/\s+/, e)
        },
        hasAlphaOrDigit: function(t) {
            return this.hasAlpha(t) || this.hasDigit(t)
        },
        getStyle: function(e, n) {
            var i = t.getComputedStyle(e, null) || e.style;
            return n ? i[n] : i
        },
        debounce: function(e, n) {
            var i;
            return n = this.isNumber(n) ? n : 50,
            function() {
                var s = this
                  , r = arguments;
                return t.clearTimeout(i),
                i = t.setTimeout(function() {
                    e.apply(s, r)
                }, n),
                this
            }
        },
        hasClass: g ? function(t, e) {
            return t.classList.contains(e)
        }
        : function(t, e) {
            var n = t.getAttributeNS(null, "class");
            return !!n && (" " + n + " ").replace(/\s+/g, " ").indexOf(" " + e + " ") >= 0
        }
        ,
        saveFile: function(i, s, r) {
            var u;
            return n.msSaveBlob ? n.msSaveBlob(new t.Blob([r],{
                type: s
            }), i) : (u = "data:" + s + ";charset=" + (e.charset || e.characterSet) + "," + t.encodeURIComponent(r),
            this.downloadFile(u, i))
        },
        copyText: t.clipboardData ? function(e) {
            return t.clipboardData.setData("Text", e)
        }
        : function(t) {
            var n, i = !1;
            if (!e.queryCommandSupported || !e.queryCommandSupported("copy"))
                return !1;
            (n = e.createElement("textarea")).value = t,
            n.setAttribute("readonly", ""),
            n.style.position = "fixed",
            e.body.appendChild(n),
            n.setSelectionRange(0, n.value.length),
            n.focus();
            try {
                i = e.execCommand("copy")
            } catch (t) {}
            return n.blur(),
            e.body.removeChild(n),
            i
        }
        ,
        isRTLLang: function(t) {
            return this.hasProperty(d, t)
        },
        hasCtrlKey: function(t) {
            return !(!t.metaKey && !t.ctrlKey)
        },
        escapeHTML: function(e) {
            return t.String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
        },
        generateId: function(t) {
            return (t = t || "") + ++r
        },
        canPlayMpeg: function(e) {
            var n, i, s = new Audio;
            s.volume = 0,
            s.onerror = s.oncanplay = function(i) {
                t.clearTimeout(n),
                e("canplay" === i.type)
            }
            ;
            try {
                s.src = "data:audio/mpeg;base64,//MUxAAAAAHkAAAAADv/o+7/9OxZhVf1//MUxAsCIAH4AAjEALHV5BXqduYhekZ///MUxA0BUAX4AAAAAP/Wpbv3iv3//9b6//MUxBICYAX4AAAAAEWV7irhFxE+z+6p//MUxBMCUAH4AAAAAExBTUUzLjk5LjNV//MUxBQCMAHoAAAAAFVVVVVVVVVVVVVV//MUxBYAAAEQAAAAAFVVVVVVVVVVVVVV",
                n = t.setTimeout(function() {
                    s.onerror = null,
                    s.oncanplay = null,
                    e(!1)
                }, 1e3),
                (i = s.play()) && (t.clearTimeout(n),
                i.catch(this.noop))
            } catch (t) {
                e(!1)
            }
        },
        hasProperty: function(e, n) {
            return t.Object.prototype.hasOwnProperty.call(e, n)
        },
        parseString: function(t) {
            var e;
            return t ? (e = this.slice(arguments, 1),
            t.replace(/\{([0-9]+)\}/g, function(t, n) {
                return e[n]
            })) : ""
        },
        toggleClass: g ? function(t, e) {
            return t.classList.toggle(e)
        }
        : function(t, e) {
            var n = this.hasClass(t, e)
              , i = t.getAttributeNS(null, "class") || "";
            return n ? i = (" " + i + " ").replace(/\s+/g, " ").replace(" " + e + " ", " ") : i += " " + e,
            t.setAttributeNS(null, "class", this.trim(i)),
            !n
        }
        ,
        createEvent: function(t, n, i) {
            var s;
            try {
                s = new Event(t,{
                    bubbles: n,
                    cancelable: i
                })
            } catch (r) {
                (s = e.createEvent("Event")).initEvent(t, n, i)
            }
            return s
        },
        preventEvent: function(t) {
            t.cancelable && t.preventDefault()
        },
        shuffleArray: function(e) {
            for (var n, i, s = e.length; s; )
                n = t.Math.floor(t.Math.random() * s--),
                i = e[s],
                e[s] = e[n],
                e[n] = i;
            return e
        },
        downloadFile: function(n, i) {
            var s = e.createElement("a");
            return s.href = n,
            "download"in s ? s.download = i : s.target = "_blank",
            s.dispatchEvent(new t.MouseEvent("click"))
        },
        truncateText: function(t, e) {
            var n, i, s = 0;
            if (t.length <= e)
                return t;
            for (i = t.slice(0, e); n = l[s++]; )
                if (n.test(i)) {
                    t = i.split(n).slice(0, -1).join("");
                    break
                }
            return t
        },
        escapeRegExp: function(e) {
            return t.String(e).replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")
        },
        dataURLToBlob: function(e) {
            var n, i, s, r, u, a = e.slice(5).split(",");
            for (a[0] = a[0].split(";"),
            r = a[0][0] || "text/plain",
            n = 0,
            i = (u = "base64" === a[0][1] ? t.atob(a[1]) : a[1]).length,
            s = new t.Uint8Array(i); n < i; n++)
                s[n] = u.charCodeAt(n);
            return new t.Blob([s.buffer],{
                type: r
            })
        },
        selectElement: function(n) {
            var i = e.createRange()
              , s = t.getSelection();
            return s.rangeCount && s.removeAllRanges(),
            i.selectNodeContents(n),
            s.addRange(i),
            s
        },
        isAlphaOrDigit: function(t) {
            return this.isAlpha(t) || this.isDigit(t)
        },
        isString: function(t) {
            return "string" == typeof t
        },
        isNumber: function(e) {
            return "number" == typeof e && t.isFinite(e)
        },
        isObject: function(t) {
            return "object" == typeof t && null !== t
        },
        isFunction: function(t) {
            return "function" == typeof t
        },
        isNullOrUndefined: function(t) {
            return null === t || void 0 === t
        },
        toQueryString: function(e, n) {
            var i = this;
            return e ? t.Object.keys(e).reduce(function(n, s) {
                var r = e[s];
                return i.isArray(r) || (r = [r]),
                s = t.encodeURIComponent(s),
                n.concat(r.map(function(e) {
                    return i.isNullOrUndefined(e) ? s : s + "=" + t.encodeURIComponent(e)
                }))
            }, []).join(n || "&") : ""
        },
        wrapCanvasText: function(t, e, n, i, s, r) {
            var u, a, o, d, c, h, l, f, g = e.split("\n");
            for (u = 0,
            o = g.length; u < o; u++) {
                for (c = g[u].indexOf(" ") < 0 ? "" : " ",
                l = (h = g[u].split(c))[0],
                a = 1,
                d = h.length; a < d; a++)
                    f = l + c + h[a],
                    t.measureText(f).width > s ? (t.fillText(l, n, i),
                    l = h[a],
                    i += r) : l = f;
                t.fillText(l, n, i),
                i += r
            }
        },
        copySupported: "clipboardData"in t || function(t) {
            var e = t.match(/(opr|edge)\/(\d+)/) || t.match(/(chrome|firefox)\/(\d+)/) || t.match(/(version)\/(\d+).+?safari/);
            if (e)
                switch (e[2] = +e[2],
                e[1]) {
                case "opr":
                    return e[2] >= 29;
                case "edge":
                    return e[2] >= 12;
                case "chrome":
                    return e[2] >= 43;
                case "firefox":
                    return e[2] >= 41;
                case "version":
                    return e[2] >= 10
                }
            return !1
        }(c),
        fromQueryString: function(e) {
            var n, i, s, r = {};
            if (!e)
                return r;
            for (n = 0,
            i = (e = e.split("&")).length; n < i; n++)
                s = (s = e[n]).replace(/\+/g, " ").split("="),
                r[t.decodeURIComponent(s[0])] = t.decodeURIComponent(s[1]);
            return r
        },
        prepareCSVValue: function(t) {
            return '"' + t.replace(/"/g, '""') + '"'
        },
        isCrossOriginUrl: function(n) {
            var i = e.createElement("a");
            return i.href = n,
            (n = i.href).indexOf(t.location.protocol + "//" + t.location.host) < 0
        },
        isSelectedElement: function(n) {
            var i, s, r, u = t.getSelection();
            if (u.isCollapsed)
                return !1;
            for ((r = e.createRange()).selectNodeContents(n),
            i = 0; i < u.rangeCount; i++)
                if ((s = u.getRangeAt(i)).compareBoundaryPoints(s.END_TO_START, r) < 0 && s.compareBoundaryPoints(s.START_TO_END, r) > 0)
                    return !0;
            return !1
        },
        getImageOrientation: function(e) {
            var n, i, s, r, u, a, o, d, c = new t.Uint8Array(e), h = 1;
            if (255 !== c[0] || 216 !== c[1])
                return h;
            for (s = 2,
            r = c.length; s < r && (255 !== c[s] || 218 !== c[s + 1]); ) {
                if (a = s + 256 * c[s + 2] + c[s + 3] + 2,
                255 === c[s] && 225 === c[s + 1]) {
                    for (d = (o = 77 === (u = c.subarray(s, a))[10]) ? 256 * u[18] + u[19] : u[18] + 256 * u[19],
                    n = 0; n < d; n++)
                        if (i = u.subarray(20 + 12 * n, 32 + 12 * n),
                        o && 18 === i[1] || !o && 18 === i[0]) {
                            h = o ? i[9] : i[8];
                            break
                        }
                    break
                }
                s = a
            }
            return h
        }
    }
}(this, this.document, this.navigator, this.yandexTranslate),
function(t, e, n, i) {
    "use strict";
    var s = i.util
      , r = i.Base = function() {}
    ;
    r.extend = function(t, e) {
        var n, i;
        return n = function() {
            this.constructor = i
        }
        ,
        i = function() {
            i.__parentProto__ && i.__parentProto__.constructor.apply(this, arguments),
            s.hasProperty(i.prototype, "init") && i.prototype.init.apply(this, arguments)
        }
        ,
        s.extend(i, this, e),
        n.prototype = i.__parentProto__ = this.prototype,
        i.prototype = new n,
        t && s.extend(i.prototype, t),
        i
    }
    ;
    var u = i.Emitter = r.extend({
        init: function() {
            this._handlers = {}
        },
        on: function(t, e, n) {
            var i = this._handlers;
            return s.isObject(t) ? (Object.keys(t).forEach(function(n) {
                this.on(n, t[n], e)
            }, this),
            this) : t && s.isFunction(e) ? ((i[t] = i[t] || []).push({
                handler: e,
                context: n
            }),
            this) : this
        },
        off: function(t, e, n) {
            var i, r, u = arguments.length, a = this._handlers[t];
            if (!u)
                return this.init(),
                this;
            if (s.isObject(t))
                return Object.keys(t).forEach(function(n) {
                    this.off(n, t[n], e)
                }, this),
                this;
            if (!a)
                return this;
            if (1 === u)
                return delete this._handlers[t],
                this;
            for (i = 0; r = a[i]; i++)
                if (r.context === n && (r.handler === e || r.handler.sourceHandler === e)) {
                    a.splice(i, 1);
                    break
                }
            return this
        },
        once: function(t, e, n) {
            var i, r = this;
            return s.isObject(t) ? (Object.keys(t).forEach(function(n) {
                this.once(n, t[n], e)
            }, this),
            this) : t && s.isFunction(e) ? (i = function() {
                r.off(t, i, n),
                e.apply(this, arguments)
            }
            ,
            i.sourceHandler = e,
            this.on(t, i, n)) : this
        },
        emit: function(t) {
            var e, n, i = s.slice(arguments, 1), r = this._handlers[t], u = this._handlers["*"];
            if (s.isObject(t))
                return Object.keys(t).forEach(function(e) {
                    this.emit(e, t[e])
                }, this),
                this;
            if ("*" !== t && r)
                for (r = s.slice(r),
                e = 0; n = r[e]; e++)
                    n.handler.apply(n.context || this, i);
            if (u)
                for (u = s.slice(u),
                e = 0; n = u[e]; e++)
                    n.handler.apply(n.context || this, arguments);
            return this
        }
    })
      , a = i.View = u.extend({
        init: function(t) {
            t = t || {},
            this._DOMEvents = {},
            this._statePrefix = t.statePrefix || "state-",
            this.setElement(t.element, t)
        },
        getId: function() {
            return this._id
        },
        destroy: function() {
            var t = this._element;
            return t.parentNode && t.parentNode.removeChild(t),
            this.setElement(null),
            this.emit("destroy").off()
        },
        getRect: function() {
            return this._element.getBoundingClientRect()
        },
        hasState: function(t) {
            return s.hasClass(this._element, this._statePrefix + t)
        },
        setState: function(t, e) {
            var n;
            return s.isObject(t) ? (Object.keys(t).forEach(function(e) {
                this.setState(e, t[e])
            }, this),
            this) : t ? (n = this.hasState(t),
            (e = arguments.length < 2 ? !n : !!e) === n ? this : (this.emit("stateSet", t, e).emit("stateSet:" + t, e),
            s.toggleClass(this._element, this._statePrefix + t),
            this.emit("stateChanged", t, e).emit("stateChanged:" + t, e),
            this)) : this
        },
        setStyle: function(t, e) {
            return this._element.style[t] = e,
            this
        },
        isVisible: function() {
            return !this.hasState("hidden")
        },
        isEnabled: function() {
            return !this.hasState("disabled")
        },
        getElement: function() {
            return this._element
        },
        setElement: function(t, n) {
            var i = s.clone(this._DOMEvents);
            return n = n || {},
            t = t || e.createElement("div"),
            this.unbindDOMEvents(i),
            this._id = t.id || this._id || s.generateId("vid"),
            this._element = t,
            this._contentElement = n.contentElement || t,
            (n.rebind || (i = n.DOMEvents)) && this.bindDOMEvents(i),
            this
        },
        setContent: function(t, n) {
            var i = this.getContentElement();
            return (n = n || {}).append || (i.innerHTML = ""),
            n.asText ? i.appendChild(e.createTextNode(t)) : i.insertAdjacentHTML("beforeend", t),
            this.emit("contentChanged", t, n)
        },
        setVisible: function(t) {
            var e = ["hidden"];
            return arguments.length && e.push(!t),
            this.setState.apply(this, e)
        },
        setEnabled: function(t) {
            var e = ["disabled"];
            return arguments.length && e.push(!t),
            this.setState.apply(this, e)
        },
        handleEvent: function(t) {
            this.emit(t.type, t)
        },
        bindDOMEvents: function(t, e) {
            var n, i, r, u = this._DOMEvents;
            if (!t)
                return this;
            if (s.isObject(t) && !s.isArray(t))
                return Object.keys(t).forEach(function(e) {
                    this.bindDOMEvents(e, t[e])
                }, this),
                this;
            for (s.isString(t) && (t = s.getValueTokens(t)),
            n = 0,
            i = t.length; n < i; n++)
                (r = t[n]) && !s.hasProperty(u, r) && (u[r] = !!e,
                s.bind(this._element, r, this, e));
            return this
        },
        unbindDOMEvents: function(e) {
            var n, i, r, u = this._DOMEvents;
            for (e = e || u,
            s.isString(e) ? e = s.getValueTokens(e) : s.isObject(e) && !s.isArray(e) && (e = t.Object.keys(e)),
            n = 0,
            i = e.length; n < i; n++)
                r = e[n],
                s.hasProperty(u, r) && (s.unbind(this._element, r, this, u[r]),
                delete u[r]);
            return this
        },
        getContentElement: function(t, e) {
            var n = this._contentElement;
            return t && (n = e ? s.slice(n.querySelectorAll(t)) : n.querySelector(t)),
            n
        }
    })
      , o = i.Model = u.extend({
        init: function(t, e) {
            e = e || {},
            this._id = e.id || s.generateId("mid"),
            this._props = {},
            this._invalid = [],
            this._filters = {},
            this._validators = {},
            e.filters && this.setFilter(e.filters),
            e.validators && this.setValidator(e.validators),
            this.setProperty(s.extend(this.getDefaults(), t), e)
        },
        getId: function() {
            return this._id
        },
        clone: function(t) {
            return new this.constructor(this._props,t)
        },
        clear: function(t) {
            return this.setProperty(null, t)
        },
        reset: function(t) {
            return this.setProperty(this.getDefaults(), t)
        },
        toJSON: function() {
            return s.clone(this._props)
        },
        isValid: function(t, e) {
            var n = {}
              , i = [];
            switch (arguments.length) {
            case 0:
                n = this.toJSON();
                break;
            case 1:
                n[t] = this.getProperty(t);
                break;
            default:
                n[t] = e
            }
            return Object.keys(n).forEach(function(t) {
                var e = n[t]
                  , s = this._validators[t];
                s && !s.call(this, e) && i.push(t)
            }, this),
            this._invalid = i,
            !i.length
        },
        getInvalid: function() {
            return s.clone(this._invalid)
        },
        getDefaults: function() {
            return {}
        },
        hasProperty: function(t) {
            return s.hasProperty(this._props, t)
        },
        getProperty: function(t) {
            return this._props[t]
        },
        setProperty: function(t, e, n) {
            var i, r, u = this.toJSON();
            if (null === t || s.isObject(t))
                return n = e || {},
                t ? (Object.keys(t).forEach(function(e) {
                    this.setProperty(e, t[e], n)
                }, this),
                this) : (Object.keys(u).forEach(function(t) {
                    this.setProperty(t, null, n)
                }, this),
                this);
            if (n = n || {},
            s.isNullOrUndefined(e)) {
                if (!this.hasProperty(t))
                    return this;
                e = void 0,
                r = delete this._props[t]
            } else
                (i = this._filters[t]) && (e = i.call(this, e)),
                s.isEqual(u[t], e) || (r = !0,
                this._props[t] = e);
            return this.emit("set", t, e, n).emit("set:" + t, e, n),
            r && !n.silent && (n.invalid = !this.isValid(t, e),
            n.oldValue = u[t],
            n.invalid && this.emit("invalid", t, e, n).emit("invalid:" + t, e, n),
            this.emit("change", t, e, n).emit("change:" + t, e, n)),
            this
        },
        setFilter: function(t, e) {
            return s.isObject(t) ? (Object.keys(t).forEach(function(e) {
                this.setFilter(e, t[e])
            }, this),
            this) : null === t ? (this._filters = {},
            this) : null === e ? (delete this._filters[t],
            this) : (t && s.isFunction(e) && (this._filters[t] = e),
            this)
        },
        setValidator: function(t, e) {
            return s.isObject(t) ? (Object.keys(t).forEach(function(e) {
                this.setValidator(e, t[e])
            }, this),
            this) : null === t ? (this._validators = {},
            this) : null === e ? (delete this._validators[t],
            this) : (t && s.isFunction(e) && (this._validators[t] = e),
            this)
        }
    });
    i.Storage = o.extend({
        init: function(e, n) {
            var i;
            i = (n = n || {}).name || "mTr";
            try {
                this.setProperty(t.JSON.parse(t.localStorage[i]))
            } catch (t) {}
            this.on("change", function() {
                try {
                    t.localStorage[i] = t.JSON.stringify(this)
                } catch (t) {
                    this.emit("error", t)
                }
            })
        }
    });
    var d = i.Template = r.extend({
        init: function(e, n) {
            if (n = n || {},
            !e || !s.isString(e))
                throw new t.Error("Bad template!");
            this._tags = d.prepareTags(n.tags),
            this._tokens = d.parseTemplate(e, this._tags)
        },
        compileTemplate: function(t, e) {
            return d.renderTokens(this._tokens, t, {
                tags: this._tags,
                partials: e
            })
        }
    }, {
        cache: {},
        defaultTags: ["{{", "}}"],
        prepareTags: function(t) {
            return s.isString(t) && (t = s.getValueTokens(t, 2)),
            s.isArray(t) ? t : null
        },
        parseTemplate: function(e, n) {
            var i = []
              , r = [];
            return n = n || this.defaultTags,
            e = e.replace(new t.RegExp("\\}?" + s.escapeRegExp(n[1]),"g"), n[0]),
            s.forEach(e.split(n[0]), function(e, n) {
                var u, a, o, d;
                if (e)
                    if (n % 2 != 0)
                        switch (a = e.charAt(0),
                        u = s.trim(e.slice(1)),
                        a) {
                        case "!":
                            break;
                        case "#":
                        case "^":
                            d = [],
                            r.push({
                                type: a,
                                name: u,
                                value: d
                            }),
                            i.push({
                                name: u,
                                root: r
                            }),
                            r = d;
                            break;
                        case ">":
                            r.push({
                                type: a,
                                name: u
                            });
                            break;
                        case "&":
                        case "{":
                            r.push({
                                type: "&",
                                name: u
                            });
                            break;
                        case "/":
                            if (!(o = i.pop()))
                                throw new t.Error('Unopened template section "' + u + '"!');
                            if (u !== o.name)
                                throw new t.Error('Unclosed template section "' + o.name + '"!');
                            r = o.root;
                            break;
                        default:
                            r.push({
                                type: "name",
                                name: s.trim(e)
                            })
                        }
                    else
                        r.push({
                            type: "text",
                            value: e
                        })
            }),
            r
        },
        getContextValue: function(t, e) {
            var n, i, r, u;
            if (t.indexOf(".") > 0)
                for (n = 0,
                i = e,
                u = (r = t.split(".")).length; i && n < u; )
                    i = i[r[n++]];
            else
                i = e[t];
            return s.isFunction(i) && (i = i.call(e)),
            i
        },
        renderTokens: function(e, n, i) {
            var r = this
              , u = [];
            return n = n || {},
            i = i || {},
            s.forEach(e, function(e) {
                var a;
                switch (e.type) {
                case "^":
                    a = r.getContextValue(e.name, n),
                    s.isEmpty(a) && u.push(r.renderTokens(e.value, n, i));
                    break;
                case "#":
                    if (a = r.getContextValue(e.name, n),
                    s.isEmpty(a))
                        return;
                    s.isArray(a) ? s.forEach(a, function(t) {
                        var n = s.isObject(t) ? t : {
                            ".": t
                        };
                        u.push(r.renderTokens(e.value, n, i))
                    }) : u.push(r.renderTokens(e.value, s.isObject(a) ? a : n, i));
                    break;
                case ">":
                    if (!s.isObject(i.partials))
                        return;
                    if (!(a = r.getContextValue(e.name, i.partials)) || !s.isString(a))
                        return;
                    u.push(r.renderTokens(r.parseTemplate(a, i.tags), n, i));
                    break;
                case "&":
                case "name":
                    if (a = r.getContextValue(e.name, n),
                    s.isNullOrUndefined(a))
                        return;
                    a = t.String(a),
                    u.push("&" === e.type ? a : s.escapeHTML(a));
                    break;
                case "text":
                    u.push(e.value)
                }
            }),
            u.join("")
        }
    })
      , c = i.TouchView = a.extend({
        init: function(n) {
            var i, r;
            this.resetCount(),
            n = n || {},
            this._tapThreshold = +n.tapThreshold || 10,
            this._ignoreSelection = !!n.ignoreSelection,
            n.stopDefaultAction && this.on(c.eventTypes.START, s.preventEvent).on(c.eventTypes.END, s.preventEvent),
            n.hideAfterTransition && this.on("stateSet:hidden", function(t) {
                t || (this.setState("hidden2", !1),
                this.getElement().offsetWidth)
            }).on(c.eventTypes.TRANSITION_END, function(t) {
                "visibility" !== t.propertyName || t.target !== t.currentTarget || this.isVisible() || this.setState("hidden2", !0)
            }).bindDOMEvents(c.eventTypes.TRANSITION_END),
            this.on(c.eventTypes.START, function(e) {
                var n = e.touches;
                "button"in e && 0 !== e.button || (this._pointCount = t.Math.min(n ? n.length : this._pointCount + 1, c.maxPointCount[n ? "touch" : e.pointType || "mouse"]),
                this._tapPoint = 1 !== this._pointCount ? null : c.getPoints(e)[0])
            }).on(c.eventTypes.END, function(e) {
                var n, i = e.touches, r = this._tapPoint, u = e.changedTouches;
                "button"in e && 0 !== e.button || (this._pointCount = i ? i.length : t.Math.max(0, this._pointCount - 1),
                r && (n = {
                    x: u ? u[0].pageX : e.pageX,
                    y: u ? u[0].pageY : e.pageY
                },
                this.isEnabled() && t.Math.abs(n.x - r.x) <= this._tapThreshold && t.Math.abs(n.y - r.y) <= this._tapThreshold && (this._ignoreSelection || !s.isSelectedElement(this.getElement())) && this.emit("tap", e),
                this._tapPoint = null))
            }).on(c.eventTypes.CANCEL, this.resetCount).bindDOMEvents([c.eventTypes.END, c.eventTypes.START, c.eventTypes.CANCEL]),
            n.activateFocus && this.on("focus", function() {
                this.setFocus(!0).setState("focused", !0)
            }).on("blur", function() {
                var n = this
                  , i = this.getElement();
                t.setTimeout(function() {
                    (e.hasFocus && !e.hasFocus() || !i.contains(e.activeElement)) && n.setState("focused", !1)
                }, 0)
            }).bindDOMEvents("focus blur", !0),
            n.delegateActiveState && (r = function() {
                i && (i.setAttribute("data-pressed", !1),
                i = null)
            }
            ,
            this.on(c.eventTypes.START, function(t) {
                var e = t.target;
                r(),
                (e = this.getClosest(e, function(t) {
                    return t.hasAttribute("data-active-target")
                })) && (i = e).setAttribute("data-pressed", !0)
            }).on(c.eventTypes.END, r).on(c.eventTypes.CANCEL, r))
        },
        setFocus: function(t) {
            return this.getContentElement()[t ? "focus" : "blur"](),
            this
        },
        scrollTo: function(t, e) {
            var n = this.getContentElement()
              , i = "rtl" === s.getStyle(n, "direction") ? n.scrollWidth : 0;
            return this.userScroll = !1,
            n.scrollTop = s.isNumber(t) ? t : 0,
            n.scrollLeft = s.isNumber(e) ? e : i,
            this
        },
        resetCount: function() {
            return this._tapPoint = null,
            this._pointCount = 0,
            this
        },
        getClosest: function(t, e, n) {
            var i = n ? this.getContentElement() : this.getElement();
            if (i.contains(t))
                for (; t && t !== i; ) {
                    if (e(t))
                        return t;
                    t = t.parentElement
                }
            return null
        },
        setLanguage: function(t) {
            return this.setState("right", s.isRTLLang(t)),
            this.getElement().setAttribute("lang", t),
            this
        },
        getScrollInfo: function() {
            var t = this.getContentElement();
            return {
                top: t.scrollTop,
                left: t.scrollLeft,
                maxTop: t.scrollHeight - t.clientHeight,
                maxLeft: t.scrollWidth - t.clientWidth
            }
        }
    }, {
        getPoint: function(t) {
            return {
                x: t.pageX,
                y: t.pageY
            }
        },
        getPoints: function(e) {
            return e.touches ? t.Array.prototype.map.call(e.touches, this.getPoint) : [this.getPoint(e)]
        },
        getMidpoint: function(t, e) {
            return {
                x: (t.x + e.x) / 2,
                y: (t.y + e.y) / 2
            }
        },
        getDistance: function(e, n) {
            var i = t.Math.abs(n.x - e.x)
              , s = t.Math.abs(n.y - e.y);
            return t.Math.sqrt(i * i + s * s)
        }
    });
    c.eventTypes = {
        END: "mouseup",
        OUT: "mouseout",
        OVER: "mouseover",
        MOVE: "mousemove",
        START: "mousedown",
        WHEEL: "wheel",
        CANCEL: "mouseleave"
    },
    "ontouchstart"in t && (s.mob || s.iOS || s.android) ? c.eventTypes = {
        END: "touchend",
        MOVE: "touchmove",
        START: "touchstart",
        CANCEL: "touchcancel"
    } : !t.PointerEvent || "pointerEnabled"in n && !n.pointerEnabled ? t.MSPointerEvent && n.msPointerEnabled && s.extend(c.eventTypes, {
        END: "MSPointerUp",
        OUT: "MSPointerOut",
        OVER: "MSPointerOver",
        MOVE: "MSPointerMove",
        START: "MSPointerDown",
        CANCEL: "MSPointerCancel"
    }) : s.extend(c.eventTypes, {
        END: "pointerup",
        OUT: "pointerout",
        OVER: "pointerover",
        MOVE: "pointermove",
        START: "pointerdown",
        CANCEL: "pointercancel"
    }),
    c.eventTypes.TRANSITION_END = "WebkitTransition"in e.documentElement.style ? "webkitTransitionEnd" : "transitionend",
    c.maxPointCount = {
        pen: 1,
        mouse: 1,
        touch: 10
    };
    var h, l, f, g = i.SwipableView = c.extend({
        init: function(t) {
            t = t || {},
            this._rect = null,
            this._startX = 0,
            this._startT = 0,
            this._screenX = 0,
            this._targetX = 0,
            this._pointerX = 0,
            this._velocityX = t.velocity || 1.5,
            this._direction = t.direction,
            this._threshold = t.threshold || .25,
            this._updatePos = this._updatePos.bind(this),
            this._minDistance = s.isNumber(t.minDistance) ? t.minDistance : 25,
            this._easingFactor = t.easingFactor || 4,
            this._rotationAngle = t.rotationAngle || 0,
            this.on(c.eventTypes.CANCEL, this._onEnd).on(c.eventTypes.START, this._onStart).on(c.eventTypes.MOVE, this._onMove).on(c.eventTypes.END, this._onEnd).bindDOMEvents([c.eventTypes.CANCEL, c.eventTypes.START, c.eventTypes.MOVE, c.eventTypes.END])
        },
        swipe: function(t) {
            switch (this._onStart({
                pageX: 1
            }),
            t) {
            case g.directions.LEFT:
                this._targetX = -this._rect.width;
                break;
            case g.directions.RIGHT:
                this._targetX = this._rect.width
            }
            return this._startX = 0,
            this
        },
        _reset: function() {
            var t = this.getElement();
            t.style.willChange = "initial",
            t.style.transform = "none",
            t.style.opacity = 1,
            this.setState("swipable", !1)
        },
        _onEnd: function() {
            var e, n, i;
            this._startX && (e = this._pointerX - this._startX,
            n = this._rect.width * this._threshold,
            i = t.Math.sqrt(e * e) / (t.Date.now() - this._startT),
            this._startX = this._targetX = 0,
            (t.Math.abs(e) > n || i > this._velocityX) && (this._targetX = this._rect.width * (e > 0 ? 1 : -1)))
        },
        _onMove: function(e) {
            var n, i, s;
            this._startX && (n = (i = e.pageX || e.touches[0].pageX) - this._startX,
            t.Math.abs(n) < this._minDistance || (this._pointerX = i + this._minDistance * (n < 0 ? 1 : -1),
            s = n < 0 ? g.directions.LEFT : g.directions.RIGHT,
            this._direction && this._direction !== s && (this._startX = this._pointerX)))
        },
        _onStart: function(e) {
            this._startX || (this.setState("swipable", !0),
            this._rect = this.getRect(),
            this._startT = t.Date.now(),
            this._startX = this._pointerX = e.pageX || e.touches[0].pageX,
            this.getElement().style.willChange = "transform",
            this._updatePos())
        },
        _updatePos: function() {
            var e, n, i, s, r = this.getElement();
            if (this._startX ? this._screenX = this._pointerX - this._startX : this._screenX += (this._targetX - this._screenX) / this._easingFactor,
            e = 1 - t.Math.abs(this._screenX) / this._rect.width,
            n = this._screenX < 0 ? g.directions.LEFT : g.directions.RIGHT,
            s = "translateX(" + this._screenX + "px)",
            this._rotationAngle && (s += " rotate(" + (this._screenX < 0 ? -1 : 1) * (this._rotationAngle * (1 - e)) + "deg)"),
            (+r.style.opacity).toFixed(4) !== e.toFixed(4) && this.emit("update", e, n),
            r.style.opacity = e,
            r.style.transform = s,
            i = e < .01,
            !this._startX && (i || e > .99))
                return this._reset(),
                void (i && this.emit("done", n));
            t.requestAnimationFrame(this._updatePos)
        }
    }, {
        directions: {
            LEFT: "left",
            RIGHT: "right"
        }
    }), p = i.SwipableView2 = c.extend({
        init: function(t) {
            t = t || {},
            this._swiping = !1,
            this._holding = !1,
            this._downPoint = null,
            this._scrolling = !1,
            this._startX = 0,
            this._startT = 0,
            this._deltaX = 0,
            this._targetX = 0,
            this._pointerX = 0,
            this._distance = 0,
            this._velocityX = t.velocity || p.DEFAULT_VELOCITY,
            this._threshold = t.threshold || p.DEFAULT_THRESHOLD,
            this._widthFactor = t.widthFactor || p.DEFAULT_WIDTH_FACTOR,
            this._updatePos = this._updatePos.bind(this),
            this._minDistance = s.isNumber(t.minDistance) ? t.minDistance : p.DEFAULT_MIN_DISTANCE,
            this._easingFactor = t.easingFactor || p.DEFAULT_EASING_FACTOR,
            this._rotationAngle = t.rotationAngle || p.DEFAULT_ROTATION_ANGLE,
            this.on(c.eventTypes.CANCEL, this._onEnd).on(c.eventTypes.START, this._onStart).on(c.eventTypes.MOVE, this._onMove).on(c.eventTypes.END, this._onEnd).bindDOMEvents([c.eventTypes.CANCEL, c.eventTypes.START, c.eventTypes.MOVE, c.eventTypes.END])
        },
        swipe: function(t) {
            switch (t) {
            case g.directions.LEFT:
                this._targetX = -this._distance;
                break;
            case g.directions.RIGHT:
                this._targetX = this._distance
            }
            return this._handle({
                pageX: 1,
                pageY: 1
            }),
            this
        },
        _reset: function() {
            this._swiping = !1,
            this.setStyle("willChange", "").setStyle("transform", "").setStyle("opacity", "").setState("swiping", !1).emit("reset")
        },
        _handle: function(t) {
            this.setState("swiping", !0),
            this._distance = this.getRect().width * this._widthFactor,
            this._startT = Date.now(),
            this._startX = this._pointerX = c.getPoints(t)[0].x,
            this.setStyle("willChange", "transform, opacity"),
            this._updatePos()
        },
        _onStart: function(t) {
            this._swiping || (this._holding = !1,
            this._scrolling = !1,
            this._downPoint = c.getPoints(t)[0])
        },
        _onMove: function(t) {
            var e, n, i = c.getPoints(t)[0];
            this._holding ? this._pointerX = i.x : !this._scrolling && this._downPoint && (e = Math.abs(i.x - this._downPoint.x) > this._minDistance,
            n = Math.abs(i.y - this._downPoint.y) > this._minDistance,
            this._holding = this._swiping = e && !n,
            this._scrolling = n && !e,
            this._holding && this._handle(t))
        },
        _onEnd: function() {
            var t, e, n;
            this._holding && (t = this._deltaX,
            this._startX = this._targetX = 0,
            e = this._distance * this._threshold,
            n = Math.abs(t / (Date.now() - this._startT)),
            (Math.abs(t) > e || n > this._velocityX) && (this._targetX = this._distance * (t > 0 ? 1 : -1))),
            this._holding = !1,
            this._downPoint = null,
            this._scrolling = !1
        },
        _updatePos: function() {
            var e, n, i, s = this.getElement();
            if (this._holding ? this._deltaX = this._pointerX - this._startX : (this._deltaX += (this._targetX - this._deltaX) / this._easingFactor,
            Math.abs(this._deltaX - this._targetX) < 1 && (this._deltaX = this._targetX)),
            e = 1 - Math.abs(this._deltaX) / this._distance,
            i = "translateX(" + this._deltaX + "px)",
            n = this._deltaX < 0 ? g.directions.LEFT : g.directions.RIGHT,
            this._rotationAngle && (i += " rotate(" + (this._deltaX < 0 ? -1 : 1) * (this._rotationAngle * (1 - e)) + "deg)"),
            p.formatOpacity(e) !== p.formatOpacity(s.style.opacity) && this.emit("update", e, n),
            this.setStyle("opacity", e).setStyle("transform", i),
            !this._holding && this._deltaX === this._targetX)
                return this._reset(),
                void (Math.abs(this._targetX) === this._distance && (this.setState("hidden", !0),
                this.emit("done", n)));
            t.requestAnimationFrame(this._updatePos)
        }
    }, {
        formatOpacity: function(t) {
            return (+t).toFixed(4)
        },
        directions: {
            LEFT: "left",
            RIGHT: "right"
        },
        DEFAULT_VELOCITY: 1.5,
        DEFAULT_THRESHOLD: .25,
        DEFAULT_WIDTH_FACTOR: .75,
        DEFAULT_MIN_DISTANCE: 8,
        DEFAULT_EASING_FACTOR: 3,
        DEFAULT_ROTATION_ANGLE: 0
    }), m = i.TemplateView = c.extend({
        init: function(t) {
            t = t || {},
            this._partials = t.partials,
            this._template = new d(t.template || "",t),
            t.debounceRendering && (this.renderData = s.debounce(m.prototype.renderData))
        },
        renderData: function(t, e) {
            return (e = e || {}).dontResetScroll || this.scrollTo(),
            this.setContent(this._template.compileTemplate(t, this._partials), e)
        }
    }), y = i.Presenter = u.extend({
        init: function(t) {
            t = t || {},
            this._view = t.view || new a,
            this._model = t.model || new o
        },
        toJSON: function() {
            return this._model.toJSON()
        },
        getView: function() {
            return this._view
        },
        getModel: function() {
            return this._model
        },
        prepareData: function(t) {
            return t
        }
    });
    h = i.HTTPError = r.extend({
        init: function(t, e) {
            this.code = t || 0,
            this.message = e || ""
        }
    }, {
        ABORT: -1,
        TIMEOUT: -2
    }),
    t.XDomainRequest && function(e) {
        e.nativeOpen = e.open,
        e.nativeSend = e.send,
        e.nativeAbort = e.abort,
        e.setRequestHeader = s.noop,
        e.getResponseHeader = function(t) {
            return this.responseText && "Content-Type" === t ? "application/json" : null
        }
        ,
        e.onreadystatechange = s.noop,
        e.getAllResponseHeaders = function() {
            return ""
        }
        ,
        e.open = function(t, e) {
            this.url = e
        }
        ,
        e.send = function(e) {
            var n = this
              , i = this.url;
            e && (i += (i.indexOf("?") < 0 ? "?" : "&") + e),
            n.onload = n.onerror = function(t) {
                "load" === t.type && (this.status = 200),
                this.readyState = 4,
                this.onreadystatechange()
            }
            ,
            n.ontimeout = s.noop,
            n.onprogress = s.noop,
            n.nativeOpen("GET", i),
            t.setTimeout(function() {
                n.nativeSend()
            }, 0)
        }
        ,
        e.abort = function() {
            this.nativeAbort(),
            this.readyState = 4,
            this.onreadystatechange()
        }
        ,
        e.status = e.readyState = 0,
        e.statusText = ""
    }(t.XDomainRequest.prototype),
    l = i.HTTPRequest = u.extend({
        init: function(e) {
            var n, i = this;
            if (!e)
                throw new t.Error("HTTPRequest: invalid url!");
            (n = l.createNativeRequest(e)).onreadystatechange = function() {
                var e;
                if (i.isDone())
                    if (t.clearTimeout(i._timer),
                    i._aborted)
                        i.emit("error", new h(i._timedout ? h.TIMEOUT : h.ABORT));
                    else {
                        if (e = new f(this),
                        e.requestTimestamp = i._timestamp,
                        this.status >= l.codes.OK && this.status < 300)
                            return i.emit("response", e);
                        i.emit("error", e)
                    }
            }
            ,
            this._xhr = n,
            this._url = e,
            this._data = null,
            this._params = null,
            this._method = l.methods.GET,
            this._headers = {},
            this._timeout = 1e4,
            this._timestamp = 0
        },
        send: function(e) {
            var n = this._xhr
              , i = this._url
              , r = this
              , u = l.serializeData(this._data, this.getType())
              , a = s.toQueryString(this._params)
              , o = this._headers;
            return s.isFunction(e) && this.on("error", function(t) {
                e(t)
            }).on("response", function(t) {
                e(null, t)
            }),
            a && (i += (i.indexOf("?") < 0 ? "?" : "&") + a),
            n.open(this._method, i),
            Object.keys(o).forEach(function(t) {
                n.setRequestHeader(t, o[t])
            }),
            this._timeout && (this._timer = t.setTimeout(function() {
                r._timedout = !0,
                r.abort()
            }, this._timeout)),
            this._timestamp = t.Date.now(),
            n.send(u),
            this
        },
        abort: function() {
            return this._aborted || this.isDone() ? this : (this._aborted = !0,
            this._xhr.abort(),
            this.emit("abort"))
        },
        isDone: function() {
            return 4 === this._xhr.readyState
        },
        getType: function() {
            return this.getHeader("Content-Type")
        },
        setType: function(t) {
            return this.setHeader("Content-Type", t)
        },
        setData: function(t) {
            return this._data = t,
            this
        },
        setMethod: function(t) {
            return this._method = t,
            this
        },
        setParams: function(t) {
            return this._params = t,
            this
        },
        getHeader: function(t) {
            return this._headers[t]
        },
        setHeader: function(t, e) {
            return this._headers[t] = e,
            this
        },
        setTimeout: function(t) {
            return this._timeout = t,
            this
        },
        setResponseType: function(t) {
            return this._xhr.responseType = t,
            this
        }
    }, {
        get: function(t, e, n) {
            var i = new this(t);
            return s.isFunction(e) && (n = e,
            e = null),
            i.setParams(e),
            i.send(n)
        },
        post: function(t, e, n) {
            var i = new this(t);
            return s.isFunction(e) && (n = e,
            e = null),
            i.setType(this.types.FORM).setData(e).setMethod(this.methods.POST),
            i.send(n)
        },
        codes: {
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202
        },
        types: {
            XML: "text/xml",
            XML2: "application/xml",
            HTML: "text/html",
            TEXT: "text/plain",
            JSON: "application/json",
            FORM: "application/x-www-form-urlencoded"
        },
        methods: {
            GET: "GET",
            POST: "POST"
        },
        serializeData: function(t, e) {
            switch (e) {
            case l.types.JSON:
                return JSON.stringify(t);
            case l.types.FORM:
                return s.toQueryString(t);
            default:
                return t
            }
        },
        createNativeRequest: function(e) {
            return !t.XDomainRequest || !s.isCrossOriginUrl(e) || "withCredentials"in t.XMLHttpRequest.prototype ? new t.XMLHttpRequest : new t.XDomainRequest
        }
    }),
    f = i.HTTPResponse = r.extend({
        init: function(t) {
            var e = t.getResponseHeader("Content-Type");
            this.code = t.status,
            this.type = e ? e.split(";")[0] : "",
            this.text = t.responseType && t.responseType !== f.types.TEXT ? "" : t.responseText,
            this.body = this.text ? f.parseResponse(t, this.type) : t.response || null,
            this.message = t.statusText,
            this.headers = f.parseResponseHeaders(t.getAllResponseHeaders())
        }
    }, {
        types: {
            BLOB: "blob",
            JSON: "json",
            TEXT: "text",
            DOCUMENT: "document",
            ARRAYBUFFER: "arraybuffer"
        },
        parseResponse: function(t, e) {
            switch (e) {
            case l.types.XML:
            case l.types.XML2:
                return t.responseXML;
            case l.types.TEXT:
                return t.responseText;
            case l.types.JSON:
                return JSON.parse(t.responseText);
            case l.types.FORM:
                return s.fromQueryString(t.responseText);
            default:
                return null
            }
        },
        parseResponseHeaders: function(t) {
            var e = {};
            return t ? (s.trim(t).split("\n").forEach(function(t) {
                t = t.split(":"),
                e[s.trim(t[0]).toLowerCase()] = s.trim(t[1])
            }),
            e) : e
        }
    }),
    i.InputView = c.extend({
        init: function() {
            var t, n = this, i = this.getContentElement();
            i.disabled = this.hasState("disabled"),
            this.on("stateChanged:disabled", function(t) {
                i.disabled = t
            }),
            this.bindDOMEvents("input"),
            9 === e.documentMode && (t = function() {
                n.emit("input", {
                    target: i
                })
            }
            ,
            this.on("stateChanged:focused", function(n) {
                e[(n ? "add" : "remove") + "EventListener"]("selectionchange", t, !1)
            }))
        },
        getName: function() {
            return this.getContentElement().name
        },
        getValue: function() {
            return this.getContentElement().value
        },
        setValue: function(t, e) {
            var n, i, r = this.getContentElement(), u = this.getValue();
            return t === u ? this : (e = e || {},
            n = e.end,
            i = e.start,
            s.isNumber(i) ? (n = s.isNumber(n) ? n : u.length,
            r.value = u.slice(0, i) + t + u.slice(n)) : r.value = t,
            this.emit("input", {
                target: r,
                detail: e
            }))
        },
        getSelection: function() {
            var t = this.getContentElement();
            return {
                end: t.selectionEnd,
                start: t.selectionStart
            }
        },
        setSelection: function(e) {
            var n = this.getContentElement();
            return e = e || {},
            t.setTimeout(function() {
                n.focus(),
                n.setSelectionRange(e.start, e.end || e.start)
            }, 0),
            this
        },
        setPlaceholder: function(t) {
            return this.getContentElement().placeholder = t,
            this
        }
    }, {
        keys: {
            A: 65,
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ENTER: 13,
            ESCAPE: 27
        },
        makeFakeArea: function(n) {
            return s.bind(n, "blur", function() {
                this.selectionRange = this.getSelectionRange()
            }),
            s.bind(n, "focus", function() {
                this.selectionRange && this.setSelectionRange(this.selectionRange.start, this.selectionRange.end)
            }),
            s.bind(n, "mouseup", function() {
                var t = this.getSelectionRange();
                t.start !== t.end && this.dispatchEvent(s.createEvent("select", !0, !0))
            }),
            n.getRangeData = function(t) {
                for (var n, i = this, s = e.createTreeWalker(this, NodeFilter.SHOW_TEXT, null, !1); s.nextNode() && (i = s.currentNode,
                n = i.length,
                t > n); )
                    t -= n;
                return {
                    node: i,
                    offset: t
                }
            }
            ,
            n.getInnerText = function() {
                var n, i, s = e.createRange(), r = t.getSelection();
                return r.rangeCount > 0 && (n = r.getRangeAt(0)),
                s.selectNodeContents(this),
                r.removeAllRanges(),
                r.addRange(s),
                i = r.toString(),
                r.removeAllRanges(),
                n && r.addRange(n),
                i
            }
            ,
            n.getSelectionRange = function() {
                var e, n, i = {
                    end: 0,
                    start: 0
                }, s = t.getSelection();
                return s.rangeCount > 0 && ((e = (n = s.getRangeAt(0)).cloneRange()).selectNodeContents(this),
                e.setEnd(n.endContainer, n.endOffset),
                i.end = e.toString().length,
                e.setEnd(n.startContainer, n.startOffset),
                i.start = e.toString().length),
                i
            }
            ,
            n.setSelectionRange = function(n, i) {
                var s, r = e.createRange(), u = t.getSelection(), a = this.value.length;
                return i < 0 && (i = 0),
                n < 0 && (n = 0),
                i > a && (i = a),
                n > a && (n = a),
                n > i && (n = i),
                s = this.getRangeData(i),
                r.setEnd(s.node, s.offset),
                s = this.getRangeData(n),
                r.setStart(s.node, s.offset),
                u.removeAllRanges(),
                u.addRange(r),
                this
            }
            ,
            Object.defineProperty(n, "value", {
                get: function() {
                    return this.getInnerText()
                },
                set: function(t) {
                    this.textContent = "",
                    this.appendChild(e.createTextNode(t)),
                    this.selectionStart = t.length
                }
            }),
            Object.defineProperty(n, "disabled", {
                get: function() {
                    return this.hasAttribute("contenteditable") && "false" === this.contentEditable
                },
                set: function(t) {
                    this.contentEditable = !t && "plaintext-only"
                }
            }),
            Object.defineProperty(n, "selectionEnd", {
                get: function() {
                    return this.getSelectionRange().end
                },
                set: function(t) {
                    this.setSelectionRange(t, t)
                }
            }),
            Object.defineProperty(n, "selectionStart", {
                get: function() {
                    return this.getSelectionRange().start
                },
                set: function(t) {
                    this.setSelectionRange(t, t)
                }
            }),
            n
        },
        fakeAreaSupported: function() {
            var t = e.createElement("div");
            try {
                return t.contentEditable = "plaintext-only",
                !0
            } catch (t) {}
            return !1
        }()
    }),
    i.InputModel = o.extend({
        getDefaults: function() {
            return {
                caret: 0,
                value: ""
            }
        }
    }),
    i.InputPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            e.on("input", function(t) {
                n.setProperty("value", this.getValue(), t.detail)
            }),
            n.on("change:value", function(n, i) {
                e.setState("empty", !n),
                t.emit("input", n, i)
            })
        },
        getValue: function(t) {
            var e = this.getModel().getProperty("value");
            return t = t || {},
            e = e.slice(t.start, t.end),
            t.trim ? s.trim(e) : e
        },
        setValue: function(t, e) {
            return this.getView().setValue(t, e),
            this
        },
        getCaret: function() {
            return this.getView().getSelection().end
        },
        setCaret: function(t) {
            return t === this.getCaret() ? this : (this.getView().setSelection({
                start: t
            }),
            this.emit("navigate", t))
        }
    });
    var _ = i.SyncModel = o.extend({
        init: function() {
            this.on("invalid", this.abort)
        },
        abort: function() {
            return this._activeRequest && (this._activeRequest.abort(),
            this._activeRequest = null),
            this
        },
        setRequest: function(t) {
            return this.abort(),
            this._activeRequest = t,
            this
        }
    });
    i.SpellerModel = _.extend({
        getParams: function() {
            var t = this.toJSON();
            return {
                sid: t.sid,
                text: t.text,
                lang: t.lang,
                options: t.options
            }
        },
        getDefaults: function() {
            return {
                url: "/",
                sid: this.getId(),
                text: "",
                lang: "",
                data: "",
                options: 0
            }
        },
        requestData: function() {
            var t = this;
            return this.abort(),
            this.isValid() ? this.setRequest(l.post(this.getProperty("url"), this.getParams(), function(e, n) {
                if (e)
                    return t.emit("error", e);
                t.emit("response", n.text)
            })) : this
        }
    }, {
        options: {
            IGNORE_UPPERCASE: 1,
            IGNORE_DIGITS: 2,
            IGNORE_URLS: 4,
            FIND_REPEAT_WORDS: 8,
            IGNORE_LATIN: 16,
            NO_SUGGEST: 32,
            FLAG_LATIN: 128,
            BY_WORDS: 256,
            IGNORE_CAPITALIZATION: 512,
            IGNORE_ROMAN_NUMERALS: 2048,
            ONLY_AUTOCORRECTIONS: 4096
        }
    });
    var v = i.SpellerPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            this.requestData = s.debounce(v.prototype.requestData, 200),
            n.on("change", function(e) {
                switch (e) {
                case "text":
                case "lang":
                case "options":
                    t.requestData()
                }
            }).on("invalid", function() {
                e.setContent(""),
                this.setProperty("data", "")
            }).on("response", function(e) {
                this.setProperty("data", e),
                e && JSON.parse(e).length && t.emit("response")
            }).on("set:data", function(n) {
                t.emit("dataChanged", n),
                n && e.renderData(t.prepareData(this.toJSON()))
            })
        },
        getData: function() {
            var t = this.getModel().getProperty("data");
            return t && (t = JSON.parse(t)),
            t
        },
        setData: function(t) {
            return this.getModel().setProperty("data", JSON.stringify(t || [])),
            this
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        setLang: function(t) {
            return this.getModel().setProperty("lang", t),
            this
        },
        syncData: function(t) {
            var e, n, i, r, u, a, o = this.getData(), d = this.getModel().getProperty("text"), c = [], h = 0, l = [];
            if (!(n = o.length))
                return this;
            for (e = 0; e < n && (i = o[e].pos,
            r = o[e].len,
            u = d.slice(i, i + r),
            a = d.charAt(i + r),
            u === o[e].word && !s.isAlphaOrDigit(a)); e++)
                c.push(o[e]),
                o[e] = null,
                h = i;
            for (; n-- && o[n] && (i = o[n].pos + t,
            r = o[n].len,
            u = d.slice(i, i + r),
            a = d.charAt(i - 1),
            i > h && u === o[n].word && !s.isAlphaOrDigit(a)); )
                o[n].pos = i,
                l.push(o[n]);
            return this.setData(c.concat(l.reverse()))
        },
        hasOption: function(t) {
            return (this.getModel().getProperty("options") & t) === t
        },
        setOption: function(t, e) {
            var n = this.getModel()
              , i = n.getProperty("options");
            return (e = !!e) === this.hasOption(t) ? this : (i += t * (e ? 1 : -1),
            n.setProperty("options", i),
            this)
        },
        requestData: function() {
            return this.getModel().requestData(),
            this
        }
    })
      , T = i.SpeechRecognizerView = c.extend({
        init: function(e) {
            var n = this
              , i = this._recognition = new t.webkitSpeechRecognition;
            e = e || {},
            i.continuous = e.continuous,
            i.interimResults = e.interimResults,
            i.onstart = function() {
                n.emit("start").setState({
                    listening: !0,
                    preparing: !1
                })
            }
            ,
            i.onerror = i.onend = function(t) {
                n.emit("end", "error" === t.type ? t.error : "").setState({
                    listening: !1,
                    preparing: !1
                })
            }
            ,
            i.onresult = function(t) {
                n.emit("recognize", t)
            }
        },
        stopListening: function() {
            return this._recognition.abort(),
            this
        },
        startListening: function(t) {
            var e = this._recognition;
            return n.onLine ? (this.setState("preparing", !0),
            e.lang = t,
            e.start(),
            this) : this.emit("end", T.errorMap.NETWORK)
        }
    }, {
        langs: {
            ar: "ar-EG",
            bg: "bg-BG",
            ca: "ca-ES",
            cs: "cs-CZ",
            da: "da-DK",
            de: "de-DE",
            el: "el-GR",
            en: "en-GB",
            es: "es-ES",
            fi: "fi-FI",
            fr: "fr-FR",
            he: "he-IL",
            hr: "hr_HR",
            hu: "hu-HU",
            id: "id-ID",
            is: "is-IS",
            it: "it-IT",
            ja: "ja-JP",
            ko: "ko-KR",
            lt: "lt-LT",
            ms: "ms-MY",
            nl: "nl-NL",
            no: "nb-NO",
            pl: "pl-PL",
            pt: "pt-PT",
            ro: "ro-RO",
            ru: "ru-RU",
            sk: "sk-SK",
            sl: "sl-SI",
            sr: "sr-RS",
            sv: "sv-SE",
            th: "th-TH",
            tr: "tr-TR",
            uk: "uk-UA",
            vi: "vi-VN",
            zh: "cmn-Hans-CN"
        },
        errorMap: {
            ABORTED: "aborted",
            NETWORK: "network",
            NOT_ALLOWED: "not-allowed"
        },
        isAvailable: function() {
            return "webkitSpeechRecognition"in t && !/opr|yabrowser/.test(n.userAgent.toLowerCase())
        }
    });
    i.SpeechRecognizerModel = o.extend({
        getDefaults: function() {
            return {
                lang: "",
                index: 0
            }
        },
        increaseIndex: function() {
            return this.setProperty("index", this.getProperty("index") + 1)
        }
    });
    var b = i.SpeechRecognizerPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            e.on("end", function(e) {
                e !== T.errorMap.ABORTED && (t.emit("end", {
                    error: e,
                    index: n.getProperty("index")
                }),
                n.increaseIndex())
            }).on("tap", function() {
                this.hasState("invalid") || (this.hasState("preparing") || this.hasState("listening") ? this.stopListening() : this.startListening(n.getProperty("lang")))
            }).on("start", function(e) {
                t.emit("start", e)
            }).on("recognize", function(e) {
                t.emit("recognize", t.prepareData(e))
            }),
            n.on("change", function(t) {
                "lang" === t && e.stopListening(),
                e.setState("invalid", !this.isValid())
            })
        },
        stop: function() {
            return this.getView().stopListening(),
            this
        },
        setLanguage: function(t) {
            return this.getModel().setProperty("lang", t),
            this
        },
        prepareData: function(t) {
            var e, n, i = "", r = t.results;
            for (e = t.resultIndex,
            n = r.length; e < n; e++)
                r[e].isFinal && (i += r[e][0].transcript);
            return {
                final: !0,
                value: s.trim(i),
                index: this.getModel().getProperty("index"),
                resultIndex: t.resultIndex
            }
        }
    });
    i.SpeechKitRecognizerView = c.extend({
        init: function(t) {
            t = t || {},
            this._timer = 0,
            this._timeout = t.timeout || 0,
            this._resultIndex = 0,
            this._recognition = t.recognition,
            this._recognitionOptions = t.recognitionOptions || {}
        },
        _onAbort: function(e) {
            return t.clearTimeout(this._timer),
            this.hasState("listening") || this.hasState("preparing") ? (this.setState({
                listening: !1,
                preparing: !1
            }),
            this.emit("end", e)) : this
        },
        _onStart: function(t, e, n) {
            return this._resultIndex = 0,
            this.setState({
                listening: !0,
                preparing: !1
            }).setTimeout(),
            this.emit("start", n)
        },
        _onResult: function(t, e) {
            var n = {
                text: t,
                final: e,
                resultIndex: this._resultIndex
            };
            return t && this.setTimeout(),
            e && (this._resultIndex += 1),
            this.emit("recognize", n)
        },
        setTimeout: function() {
            return this._timeout && (t.clearTimeout(this._timer),
            this._timer = t.setTimeout(this.stopListening.bind(this), this._timeout)),
            this
        },
        stopListening: function() {
            return this._recognition.abort(),
            this
        },
        startListening: function(t) {
            var e = s.clone(this._recognitionOptions);
            return s.extend(e, {
                lang: t,
                initCallback: this._onStart.bind(this),
                stopCallback: this._onAbort.bind(this),
                dataCallback: this._onResult.bind(this),
                errorCallback: this._onAbort.bind(this)
            }),
            this.setState("preparing", !0),
            this._recognition.start(e),
            this
        }
    }, {
        langs: {
            en: "en-GB",
            ru: "ru-RU",
            tr: "tr-TR",
            uk: "uk-UA"
        }
    }),
    i.SpeechKitRecognizerPresenter = b.extend({
        prepareData: function(t) {
            return {
                value: s.trim(t.text),
                final: t.final,
                index: this.getModel().getProperty("index"),
                resultIndex: t.resultIndex
            }
        }
    });
    var S = i.ListboxView = m.extend({
        init: function() {
            this.on("tap", function(t) {
                var e = this.getClosest(t.target, function(t) {
                    return t.hasAttribute(S.VALUE_ATTR)
                }, !0);
                e && (s.preventEvent(t),
                this.emit("itemSelected", e.getAttribute(S.VALUE_ATTR)))
            })
        },
        getValues: function() {
            return this.getContentElement("[" + S.VALUE_ATTR + "]", !0).map(function(t) {
                return t.getAttribute(S.VALUE_ATTR)
            })
        },
        setPosition: function(t, n) {
            var i, s, r = t.left, u = t.bottom, a = this.getElement(), o = this.getRect();
            switch (a.getAttribute("data-align")) {
            case "right":
                r = t.right - o.width;
                break;
            case "center":
                r = t.left + t.width / 2 - o.width / 2
            }
            return n && (i = e.documentElement.clientWidth,
            s = e.documentElement.clientHeight,
            r + o.width > i && o.width < i && (r -= r + o.width - i),
            s - t.bottom < o.height && t.top >= o.height && (u = t.top - o.height)),
            a.style.top = u + "px",
            a.style.left = r + "px",
            this
        }
    }, {
        VALUE_ATTR: "data-value"
    })
      , E = i.ListboxViewKB = S.extend({
        init: function(t) {
            t = t || {},
            this._elements = [],
            this.resetText(),
            this.resetText = s.debounce(this.resetText, t.textResetDelay || 1e3),
            this.on("contentChanged", function() {
                this._elements = this.getContentElement("[" + S.VALUE_ATTR + "]", !0)
            }).on(c.eventTypes.OVER, function(t) {
                var e = this.getClosest(t.target, function(t) {
                    return t.hasAttribute(S.VALUE_ATTR)
                }, !0);
                this.highlightElement(e)
            }).bindDOMEvents(c.eventTypes.OVER)
        },
        resetText: function() {
            return this._text = "",
            this
        },
        getElements: function() {
            return s.slice(this._elements)
        },
        highlightPrev: function() {
            var t = this.getElements()
              , e = t.indexOf(this.getHighlightedElement()) - 1;
            return e < 0 && (e = t.length - 1),
            this.highlightElement(t[e])
        },
        highlightNext: function() {
            var t = this.getElements()
              , e = (t.indexOf(this.getHighlightedElement()) + 1) % t.length;
            return this.highlightElement(t[e])
        },
        highlightByText: function(t) {
            var e, n, i = this.getElements();
            for (this._text += t.toLowerCase(),
            e = 0,
            n = i.length; e < n; e++)
                if (0 === i[e].textContent.toLowerCase().indexOf(this._text)) {
                    this.highlightElement(i[e]);
                    break
                }
            return this.resetText()
        },
        highlightByValue: function(t) {
            var e, n, i = this.getElements();
            for (e = 0,
            n = i.length; e < n; e++)
                if (i[e].getAttribute(S.VALUE_ATTR) === t) {
                    this.highlightElement(i[e]);
                    break
                }
            return this
        },
        highlightElement: function(t) {
            var e = this.getHighlightedElement();
            return e && e.removeAttribute(E.HIGHLIGHT_ATTR),
            t && t.setAttribute(E.HIGHLIGHT_ATTR, !0),
            this
        },
        getHighlightedElement: function() {
            return this.getContentElement("[" + E.HIGHLIGHT_ATTR + "]")
        }
    }, {
        HIGHLIGHT_ATTR: "data-highlighted"
    })
      , x = i.ListboxModel = o.extend({
        isEmpty: function(t) {
            return s.isEmpty(t || this.getItems())
        },
        getItems: function() {
            var t = this.getProperty("items");
            try {
                t = JSON.parse(t)
            } catch (t) {}
            return t
        },
        setItems: function(t, e) {
            return this.setProperty("items", t && JSON.stringify(t), e)
        },
        getDefaults: function() {
            return {
                value: "",
                items: ""
            }
        }
    })
      , A = i.ListboxPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            e.on("itemSelected", function(e) {
                t.setValue(e).emit("itemSelected", e)
            }),
            n.on("change", function(n, i, s) {
                var r;
                switch (n) {
                case "value":
                case "items":
                    r = this.getItems(),
                    "items" === n && e.setState("empty", this.isEmpty(r)),
                    e.renderData(t.prepareData(r), s).setEnabled(!0),
                    t.emit(n + "Changed", i, s.oldValue)
                }
            })
        },
        getItems: function() {
            return this.getModel().getItems()
        },
        setItems: function(t, e) {
            return this.getModel().setItems(t, e),
            this
        },
        getValue: function() {
            return this.getModel().getProperty("value")
        },
        setValue: function(t, e) {
            var n = this.getModel();
            return n.isValid("value", t) && n.setProperty("value", t, e),
            this
        }
    });
    i.ListboxMultiplePresenter = A.extend({
        getValue: function() {
            var e = this.getModel().getProperty("value");
            return e ? t.JSON.parse(e) : []
        },
        setValue: function(e, n) {
            var i, r;
            return s.isArray(e) ? i = e : (r = (i = this.getValue()).indexOf(e)) < 0 ? i.push(e) : i.splice(r, 1),
            this.getModel().setProperty("value", t.JSON.stringify(i), n),
            this
        }
    });
    var P = i.TTSPlayer = u.extend({
        init: function() {},
        play: function() {},
        stop: function() {},
        isValid: function(t, e) {
            return this.isTextSupported(t) && this.isTextSizeBelowLimit(t) && this.isLangSupported(e)
        },
        isActive: function() {},
        isAvailable: function() {},
        isLangSupported: function() {},
        isTextSupported: function() {},
        isTextSizeBelowLimit: function() {}
    }, {
        actions: {
            LOAD: "load",
            PLAY: "play",
            STOP: "stop",
            ERROR: "error",
            UPDATE: "update"
        },
        states: {
            OK: "ok",
            TEXT_NOT_SUPPORTED: "textNotSupported",
            LANG_NOT_SUPPORTED: "langNotSupported",
            TEXT_SIZE_EXCEEDED: "textSizeExceeded"
        }
    })
      , O = i.TTSOnlinePlayer = i.TTSPlayer.extend({
        init: function(e) {
            var n = this
              , i = this._audio = new t.Audio;
            e = e || {},
            this._currentSrc = "",
            this._url = e.speakerUrl,
            this._langs = e.speakerLangs,
            this._maxTextLength = e.maxTextLength,
            this._cacheEnabled = !!e.cacheEnabled,
            this._params = e.params,
            this.on("action", function(t) {
                n.emit("actionStarted", {
                    action: t,
                    playerType: O.TYPE
                })
            }),
            i.addEventListener("error", function() {
                n.emit("action", P.actions.ERROR)
            }, !1),
            i.addEventListener("ended", function() {
                n.emit("action", P.actions.STOP)
            }, !1),
            i.addEventListener("pause", function() {
                n.emit("action", P.actions.STOP)
            }, !1),
            i.addEventListener("playing", function() {
                n.emit("action", P.actions.PLAY)
            }, !1)
        },
        getSrc: function(t, e) {
            var n = s.extend({}, this._params);
            return n.text = t,
            n.lang = this._langs[e],
            this._url + "?" + s.toQueryString(n)
        },
        play: function(t, e) {
            var n, i = this._audio;
            return !!this.isValid(t, e) && (n = this.getSrc(t, e),
            this.emit("action", P.actions.LOAD),
            this._currentSrc === n && this._cacheEnabled && i.readyState ? i.currentTime = 0 : i.src = this._currentSrc = n,
            i.play(),
            !0)
        },
        stop: function() {
            this.isActive() && this._audio.pause()
        },
        isActive: function() {
            return !this._audio.paused
        },
        isLangSupported: function(t) {
            return this._langs[t]
        },
        isTextSupported: function(t) {
            return s.hasAlphaOrDigit(t) && !s.isUrl(t)
        },
        isTextSizeBelowLimit: function(t) {
            return t && t.length <= this._maxTextLength
        }
    }, {
        TYPE: "yandex",
        codecs: function() {
            var t = /^no$/
              , n = e.createElement("audio")
              , i = {};
            return n.canPlayType && (i = {
                AAC: n.canPlayType("audio/aac").replace(t, ""),
                MP3: n.canPlayType("audio/mpeg").replace(t, ""),
                WAV: n.canPlayType('audio/wav; codecs="1"').replace(t, ""),
                OGG: n.canPlayType('audio/ogg; codecs="vorbis"').replace(t, "")
            }),
            i
        }(),
        isAvailable: function(t) {
            return t && this.codecs[t.toUpperCase()]
        }
    })
      , L = i.TTSNativePlayer = i.TTSPlayer.extend({
        init: function(e) {
            var n = this;
            e = e || {},
            this.on("action", function(t) {
                n.emit("actionStarted", {
                    action: t,
                    playerType: L.TYPE
                })
            }),
            "addEventListener"in t.speechSynthesis && t.speechSynthesis.addEventListener("voiceschanged", function() {
                n.emit("action", P.actions.UPDATE)
            }, !1),
            this._rate = s.isNumber(e.rate) ? e.rate : 1,
            this._pitch = s.isNumber(e.pitch) ? e.pitch : 1,
            this._volume = s.isNumber(e.volume) ? e.volume : 1,
            this._maxTextLength = e.maxTextLength
        },
        play: function(e, n) {
            return !!this.isValid(e, n) && (this._active = !0,
            this.emit("action", P.actions.LOAD),
            t.speechSynthesis.speak(this.createUtterance(e, L.getVoice(n))),
            !0)
        },
        stop: function() {
            this.isActive() && t.speechSynthesis.cancel()
        },
        isActive: function() {
            return this._active
        },
        createUtterance: function(e, n) {
            var i = new t.SpeechSynthesisUtterance;
            return i.rate = this._rate,
            i.pitch = this._pitch,
            i.volume = this._volume,
            i.text = e,
            i.lang = n ? n.lang : "",
            i.voice = n,
            i.onend = this._onStop.bind(this),
            i.onerror = this._onError.bind(this),
            i.onstart = this._onStart.bind(this),
            i
        },
        _onStop: function() {
            this._active = !1,
            this.emit("action", P.actions.STOP)
        },
        _onError: function() {
            this._active = !1,
            this.emit("action", P.actions.ERROR)
        },
        _onStart: function() {
            this.emit("action", P.actions.PLAY)
        },
        isLangSupported: function(t) {
            return L.getVoice(t)
        },
        isTextSupported: function(t) {
            return s.hasAlphaOrDigit(t) && !s.isUrl(t)
        },
        isTextSizeBelowLimit: function(t) {
            return t && t.length <= this._maxTextLength
        }
    }, {
        TYPE: "native",
        isAvailable: function() {
            return "speechSynthesis"in t && "SpeechSynthesisUtterance"in t
        },
        langRegions: {
            de: "DE",
            en: "GB",
            es: "ES",
            fr: "FR",
            it: "IT",
            nl: "NL",
            pt: "PT",
            ru: "RU",
            zh: "CN"
        },
        getVoice: function(t) {
            return s.isNumber(t) ? this.getVoiceByIndex(t) : s.isString(t) ? this.getVoiceByLanguage(t) : null
        },
        getVoiceByIndex: function(e) {
            return t.speechSynthesis.getVoices()[e] || null
        },
        getVoiceByLanguage: function(e) {
            var n = this.langRegions[e]
              , i = []
              , s = t.speechSynthesis.getVoices();
            return s = s.filter(function(t) {
                return 0 === t.lang.indexOf(e)
            }),
            n && (i = s.filter(function(t) {
                var e = t.lang.replace(/_/g, "-").split("-")[1];
                return e && e.toUpperCase() === n
            })),
            i[0] || s[0] || null
        }
    })
      , R = i.TTSPresenter = i.Presenter.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            this._players = [],
            e.on("tap", function() {
                this.hasState("invalid") ? t.emit("invalidState", n.toJSON()) : t.toggle()
            }),
            n.on("change", function(n, i) {
                var s;
                switch (n) {
                case "text":
                case "lang":
                    t.stop(),
                    s = t.getPlayerState(this.getProperty("text"), this.getProperty("lang")),
                    e.setState("invalid", s !== P.states.OK),
                    this.setProperty("state", s)
                }
            })
        },
        stop: function() {
            this._players.forEach(function(t) {
                t.stop()
            })
        },
        play: function() {
            var t = this.toJSON();
            return this._players.some(function(e) {
                return e.play(t.text, t.lang)
            })
        },
        toggle: function() {
            var t = this.isActive();
            return t ? this.stop() : this.play(),
            !t
        },
        getPlayerState: function(t, e) {
            var n = this._players.slice();
            return (n = n.filter(function(t) {
                return t.isLangSupported(e)
            })).length ? (n = n.filter(function(e) {
                return e.isTextSupported(t)
            })).length ? (n = n.filter(function(e) {
                return e.isTextSizeBelowLimit(t)
            })).length ? P.states.OK : P.states.TEXT_SIZE_EXCEEDED : P.states.TEXT_NOT_SUPPORTED : P.states.LANG_NOT_SUPPORTED
        },
        isActive: function() {
            return this._players.some(function(t) {
                return t.isActive()
            })
        },
        addPlayer: function(t) {
            t.on("actionStarted", this._onActionStarted.bind(this)),
            this._players.push(t)
        },
        setText: function(t) {
            return this.getModel().setProperty("text", R.normalizeText(t)),
            this
        },
        setLanguage: function(t) {
            return this.getModel().setProperty("lang", t),
            this
        },
        _onActionStarted: function(t) {
            var e = this.getView()
              , n = s.extend(t, this.toJSON())
              , i = t.action;
            e.setState({
                silent: "stop" === i,
                loading: "load" === i,
                playing: "play" === i
            }),
            this.emit("actionStarted", n)
        }
    }, {
        normalizeText: function(t) {
            return s.trim(t.replace(/[^\S\r\n]+/g, " "))
        }
    });
    i.SpeakerView = c.extend({
        init: function(e) {
            var n = this
              , i = this._audio = new t.Audio;
            this.reset(),
            this._currentSrc = "",
            e = e || {},
            this._cacheEnabled = !!e.cacheEnabled,
            i.addEventListener("error", function() {
                n.reset().emit("error")
            }, !1),
            i.addEventListener("ended", function() {
                n.reset()
            }, !1),
            i.addEventListener("playing", function() {
                if (n.hasState("silent"))
                    return n.stopPlaying();
                n.setState({
                    loading: !1,
                    playing: !0
                })
            }, !1)
        },
        reset: function() {
            return this.setState({
                silent: !0,
                loading: !1,
                playing: !1
            }),
            this
        },
        stopPlaying: function() {
            return this._audio.pause(),
            this.reset()
        },
        startPlaying: function(t) {
            var e = this._audio;
            return this.setState({
                silent: !1,
                loading: !0
            }),
            this._currentSrc === t && this._cacheEnabled && e.readyState ? e.currentTime = 0 : e.src = this._currentSrc = t,
            e.play(),
            this
        }
    }, {
        normalizeText: function(t) {
            return s.trim(t.replace(/[^\S\r\n]+/g, " "))
        }
    }),
    i.SpeakerModel = o.extend({
        init: function(t, e) {
            e = e || {},
            this._url = e.url
        },
        getSrc: function() {
            return this._url + "?" + s.toQueryString(this.toJSON())
        },
        getDefaults: function() {
            return {
                text: "",
                lang: "",
                format: "mp3",
                quality: "hi",
                platform: "web",
                application: "translate"
            }
        }
    }),
    i.SpeakerPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            e.on("tap", function() {
                this.hasState("silent") ? t.startPlaying() : t.stopPlaying()
            }).on("error", function() {
                t.emit("error", n.toJSON())
            }),
            n.on("change", function() {
                t.stopPlaying(),
                e.setEnabled(this.isValid())
            })
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        setLanguage: function(t) {
            return this.getModel().setProperty("lang", t),
            this
        },
        stopPlaying: function() {
            return this.getView().stopPlaying(),
            this
        },
        startPlaying: function() {
            var t = this.getView()
              , e = this.getModel();
            return this.emit("play", e.toJSON()),
            t.startPlaying(e.getSrc()),
            this
        }
    }, {
        codecs: function() {
            var t = /^no$/
              , n = e.createElement("audio")
              , i = {};
            return n.canPlayType && (i = {
                AAC: n.canPlayType("audio/aac").replace(t, ""),
                MP3: n.canPlayType("audio/mpeg").replace(t, ""),
                WAV: n.canPlayType('audio/wav; codecs="1"').replace(t, ""),
                OGG: n.canPlayType('audio/ogg; codecs="vorbis"').replace(t, "")
            }),
            i
        }()
    });
    var D = i.NativeSpeakerView = c.extend({
        init: function(e) {
            var n = this;
            "addEventListener"in t.speechSynthesis && t.speechSynthesis.addEventListener("voiceschanged", function() {
                n.emit("update")
            }, !1),
            this.reset(),
            e = e || {},
            this._rate = s.isNumber(e.rate) ? e.rate : 1,
            this._pitch = s.isNumber(e.pitch) ? e.pitch : 1,
            this._volume = s.isNumber(e.volume) ? e.volume : 1
        },
        reset: function() {
            return this.setState({
                silent: !0,
                pending: !1,
                speaking: !1
            }),
            this
        },
        stopSpeaking: function() {
            return t.speechSynthesis.cancel(),
            this.reset()
        },
        startSpeaking: function(e, n) {
            return this.setState({
                silent: !1,
                pending: !0
            }),
            t.speechSynthesis.speak(this._createUtterance(e, D.getVoice(n))),
            this
        },
        _onStop: function() {
            this.reset()
        },
        _onError: function() {
            this.emit("error").reset()
        },
        _onStart: function() {
            if (this.hasState("silent"))
                return this.stopSpeaking();
            this.setState({
                pending: !1,
                speaking: !0
            })
        },
        _createUtterance: function(e, n) {
            var i = new t.SpeechSynthesisUtterance;
            return i.rate = this._rate,
            i.pitch = this._pitch,
            i.volume = this._volume,
            i.text = e,
            i.lang = n ? n.lang : "",
            i.voice = n,
            i.onend = this._onStop.bind(this),
            i.onerror = this._onError.bind(this),
            i.onstart = this._onStart.bind(this),
            i
        }
    }, {
        isAvailable: function() {
            return "speechSynthesis"in t && "SpeechSynthesisUtterance"in t
        },
        langRegions: {
            de: "DE",
            en: "GB",
            es: "ES",
            fr: "FR",
            it: "IT",
            nl: "NL",
            pt: "PT",
            ru: "RU",
            zh: "CN"
        },
        getVoice: function(t) {
            return s.isNumber(t) ? this.getVoiceByIndex(t) : s.isString(t) ? this.getVoiceByLanguage(t) : null
        },
        getVoiceByIndex: function(e) {
            return t.speechSynthesis.getVoices()[e] || null
        },
        getVoiceByLanguage: function(e) {
            var n = this.langRegions[e]
              , i = []
              , s = t.speechSynthesis.getVoices();
            return s = s.filter(function(t) {
                return 0 === t.lang.indexOf(e)
            }),
            n && (i = s.filter(function(t) {
                var e = t.lang.replace(/_/g, "-").split("-")[1];
                return e && e.toUpperCase() === n
            })),
            i[0] || s[0] || null
        }
    });
    i.NativeSpeakerModel = o.extend({
        getDefaults: function() {
            return {
                text: "",
                voice: -1
            }
        }
    }),
    i.NativeSpeakerPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            e.on("tap", function() {
                this.hasState("silent") ? t.startSpeaking() : t.stopSpeaking()
            }).on("update", function() {
                this.hasState("silent") && this.setEnabled(n.isValid())
            }).on("error", function() {
                t.emit("error", n.toJSON())
            }),
            n.on("change", function() {
                t.stopSpeaking(),
                e.setEnabled(this.isValid())
            })
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        setVoice: function(t) {
            return this.getModel().setProperty("voice", t),
            this
        },
        stopSpeaking: function() {
            return this.getView().stopSpeaking(),
            this
        },
        startSpeaking: function() {
            var t = this.toJSON();
            return this.emit("speak", t),
            this.getView().startSpeaking(t.text, t.voice),
            this
        }
    }),
    i.TranslitModel = _.extend({
        getParams: function() {
            var t = this.toJSON();
            return {
                lang: t.lang,
                text: t.text
            }
        },
        getDefaults: function() {
            return {
                url: "/",
                lang: "",
                text: "",
                translit: ""
            }
        },
        requestTranslit: function() {
            var t = this;
            return this.abort(),
            this.isValid() ? this.setRequest(l.post(this.getProperty("url"), this.getParams(), function(e, n) {
                e && t.emit("error", e),
                t.setProperty("translit", e ? "" : n.body)
            })) : this
        }
    }),
    i.TranslitPresenter = y.extend({
        init: function(t) {
            var e = this
              , n = this.getView();
            t = t || {},
            this.getModel().on("error", function(t) {
                e.emit("error", t)
            }).on("change", function(t, i) {
                switch (t) {
                case "lang":
                case "text":
                    e.requestTranslit();
                    break;
                case "translit":
                    e.emit("result", i),
                    n.setVisible(i).setContent(i, {
                        asText: !0
                    })
                }
            }).on("invalid", function() {
                this.setProperty("translit", "")
            }),
            this.requestTranslit = s.debounce(this.requestTranslit, t.debounceDelay || 200)
        },
        setLang: function(t) {
            return this.getModel().setProperty("lang", t),
            this
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        requestTranslit: function() {
            return this.getModel().requestTranslit(),
            this
        }
    });
    var C = i.TranslatorModel = o.extend({
        init: function(t, e) {
            e = e || {},
            this.resetCache(),
            this._cacheEnabled = !!e.cacheEnabled
        },
        reset: function() {
            return this._activeRequest && (this._activeRequest.abort(),
            this._activeRequest = null),
            this
        },
        getData: function() {
            return {
                text: this.getText(),
                options: this.getProperty("options")
            }
        },
        getText: function() {
            var t = this.getProperty("text");
            return t ? JSON.parse(t) : []
        },
        setText: function(t, e) {
            return this.setProperty("text", t && JSON.stringify(t), e)
        },
        getParams: function() {
            var t = this.toJSON();
            return {
                id: [t.sid, t.counter - 1, 0].join("-"),
                srv: t.srv,
                lang: t.srcLang + "-" + t.dstLang,
                reason: t.reason
            }
        },
        resetCache: function() {
            return this._cache = {},
            this
        },
        getDefaults: function() {
            return {
                srv: "",
                url: "/",
                text: "",
                reason: "",
                counter: 0,
                options: 0,
                srcLang: "",
                dstLang: "",
                translation: "",
                sid: this.getId()
            }
        },
        _getCacheKey: function(t) {
            return [this.getProperty("srcLang"), this.getProperty("dstLang"), t].join("-")
        },
        _getFromCache: function(t) {
            return this._cache[this._getCacheKey(t)] || ""
        },
        increaseCounter: function() {
            return this.setProperty("counter", this.getProperty("counter") + 1)
        },
        requestTranslation: function() {
            var t, e, n, i, r = this;
            return this.reset(),
            this.isValid() ? (t = this.getData(),
            this.increaseCounter(),
            e = this.getParams(),
            n = new l(this.getProperty("url")),
            this.emit("query", s.extend({}, t, e)),
            this._cacheEnabled && (i = t.text,
            t.text = i.filter(function(t) {
                return !r._getFromCache(t)
            }),
            !t.text.length) ? this.setProperty("translation", i.map(this._getFromCache, this).join("\n")) : (this._activeRequest = n.setType(l.types.FORM).setData(t).setParams(e).setMethod(l.methods.POST).send(function(e, n) {
                var s, u = e ? e.code : n.body.code;
                if (r._activeRequest = null,
                u === l.codes.OK)
                    s = n.body.text,
                    r._cacheEnabled && (t.text.forEach(function(t, e) {
                        r._cache[r._getCacheKey(t)] = s[e]
                    }),
                    s = i.map(r._getFromCache, r)),
                    r.setProperty("translation", s.join("\n"), {
                        align: n.body.align && n.body.align[0]
                    });
                else if (u !== h.ABORT)
                    return e = e || new h(u,n.body.message),
                    r.emit("error", e)
            }),
            this)) : this
        }
    }, {
        options: {
            ALIGN: 4
        },
        errorMap: {
            INVALID_SESSION: 405,
            EXPIRED_SESSION: 406
        }
    })
      , M = (i.TranslatorModel2 = C.extend({
        init: function(t) {
            t = t || {},
            this._chunks = [],
            this._chunkSize = t.chunkSize || 600,
            this._maxThreads = t.maxThreads || 4,
            this._activeRequests = [],
            this.on("invalid", this.reset)
        },
        reset: function() {
            return this._index = 0,
            this._align = "",
            this._chunks.length = 0,
            this._activeRequests.forEach(function(t) {
                t.abort()
            }),
            this._activeRequests.length = 0,
            this._completedThreads = 0,
            this
        },
        getData: function(t) {
            var e = C.prototype.getData.call(this);
            return t && (e.text = [t]),
            e
        },
        getParams: function(t) {
            var e = C.prototype.getParams.call(this);
            return t && (e.id = e.id.replace(/\d+$/, t)),
            e
        },
        makeChunks: function() {
            for (var t, e = this.getText().join("\n"); e; )
                t = s.truncateText(e, this._chunkSize),
                this._chunks.push(t),
                e = e.slice(t.length);
            return this
        },
        requestTranslation: function() {
            var t;
            if (!this.isValid())
                return this;
            for (this.reset(),
            this.makeChunks(),
            this.increaseCounter(),
            this.emit("query", s.extend(this.getData(), this.getParams())),
            t = 0; t < this._maxThreads; t++)
                this.translateNextChunk();
            return this
        },
        translateNextChunk: function() {
            var t, e, n = this._chunks.length;
            if (!n)
                return this;
            if (t = this._index++,
            e = this._chunks[t],
            t < n) {
                if (e.length > this._chunkSize || !s.trim(e))
                    return this.translateNextChunk();
                this._activeRequests.push(new l(this.getProperty("url")).setType(l.types.FORM).setData(this.getData(e)).setParams(this.getParams(t)).setMethod(l.methods.POST).send(this._handleChunkResponse.bind(this, t)))
            } else
                ++this._completedThreads === this._maxThreads && this.setProperty("translation", this._chunks.join(""), {
                    align: this._align
                });
            return this
        },
        _handleChunkResponse: function(t, e, n) {
            var i = e ? e.code : n.body.code;
            i === l.codes.OK ? (this._chunks[t] = n.body.text.join("\n"),
            n.body.align && 1 === this._chunks.length && (this._align = n.body.align[0]),
            this.translateNextChunk()) : i !== h.ABORT && this.reset().emit("error", e || new h(i,n.body.message))
        }
    }),
    i.TranslatorPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            this.requestTranslation = s.debounce(M.prototype.requestTranslation),
            n.on("error", function(n) {
                var i = n.body && n.body.code;
                if (e.setState("fetching", !1),
                i === this.constructor.errorMap.INVALID_SESSION || i === this.constructor.errorMap.EXPIRED_SESSION)
                    return t.emit("expired", i);
                e.setState("error", !0).setVisible(!1),
                t.emit("error", n)
            }).on("query", function(n) {
                e.setState("fetching", !0),
                t.emit("query", n)
            }).on("change", function(e, n, i) {
                switch (e) {
                case "text":
                case "srcLang":
                case "dstLang":
                    i.reason && this.setProperty("reason", i.reason),
                    t.requestTranslation()
                }
            }).on("invalid:text", function() {
                this.reset().setProperty("translation", "")
            }).on("set:translation", function(n, i) {
                if (e.setState({
                    error: !1,
                    fetching: !1
                }),
                t.emit("result", n),
                !n)
                    return e.setVisible(!1);
                e.renderData(t.prepareData(n, i.align || "")).setVisible(!0)
            })
        },
        setText: function(t, e) {
            return t && !s.isArray(t) && (t = [t]),
            this.getModel().setText(t, {
                reason: e
            }),
            this
        },
        setSrcLanguage: function(t) {
            return this.getModel().setProperty("srcLang", t),
            this
        },
        setDstLanguage: function(t) {
            return this.getView().setLanguage(t),
            this.getModel().setProperty("dstLang", t),
            this
        },
        requestTranslation: function() {
            return this.getModel().requestTranslation(),
            this
        }
    }));
    i.PredictorModel = x.extend({
        init: function(t, e) {
            e = e || {},
            this._url = e.url,
            this._counter = 0,
            this._detectUrl = e.detectUrl,
            this._detectCounter = 0
        },
        getParams: function() {
            var t = this.toJSON();
            return {
                q: t.text,
                srv: t.srv,
                sid: t.sid,
                lang: t.srcLang,
                limit: t.limit
            }
        },
        getDefaults: function() {
            return {
                pos: 0,
                srv: "",
                text: "",
                auto: !1,
                index: 0,
                value: "",
                items: "",
                limit: 10,
                reason: "",
                srcLang: "",
                dstLang: "",
                endOfWord: !1,
                sid: this.getId()
            }
        },
        detectLanguage: function() {
            var t, e, n = this;
            return this.canDetectLanguage() ? (t = this.getDetectParams(),
            e = ++this._detectCounter,
            l.get(this._detectUrl, t, function(i, s) {
                var r;
                if (e === n._detectCounter && JSON.stringify(t) === JSON.stringify(n.getDetectParams())) {
                    if ((r = i ? i.code : s.body.code) !== l.codes.OK)
                        return i = i || new h(r,s.body.message),
                        n.emit("detectError", i);
                    s.body.lang && n.setProperty("srcLang", s.body.lang, {
                        kbd: !!s.body.kbd,
                        detected: !0
                    })
                }
            }),
            this) : this
        },
        getDetectParams: function() {
            var t = this.toJSON();
            return {
                sid: t.sid,
                srv: t.srv,
                text: s.trim(t.text),
                hint: [t.srcLang, t.dstLang].join(","),
                options: t.detectOptions
            }
        },
        canDetectLanguage: function() {
            return this.isValid("text")
        },
        requestSuggestion: function() {
            var t, e, n = this;
            return this.canRequestSuggestion() ? (t = this.getParams(),
            e = ++this._counter,
            this.emit("query", t),
            l.get(this._url, t, function(i, s) {
                if (e === n._counter && JSON.stringify(t) === JSON.stringify(n.getParams()))
                    return i ? n.emit("error", i) : void n.setProperty({
                        pos: s.body.pos,
                        endOfWord: s.body.endOfWord
                    }).setItems(s.body.text && s.body.text.length ? s.body.text : "")
            }),
            this) : this
        },
        canRequestSuggestion: function() {
            return this.isValid()
        }
    });
    var N = i.PredictorPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel()
              , i = function() {
                e.setVisible(!1).setEnabled(!1)
            };
            this.detectLanguage = s.debounce(N.prototype.detectLanguage, 200),
            this.requestSuggestion = s.debounce(N.prototype.requestSuggestion, 200),
            e.on("tap", s.preventEvent).on("itemSelected", function(e) {
                e && t.setValue(e)
            }),
            n.on("set", function(n, s, r) {
                var u;
                switch (n) {
                case "items":
                    return s ? (u = this.toJSON(),
                    u.items = this.getItems() || [],
                    e.renderData(t.prepareData(u.items)).setEnabled(!0).setVisible(!0),
                    t.emit("ready", u)) : i();
                case "value":
                    return u = this.toJSON(),
                    u.items = this.getItems() || [],
                    t.emit("predict", u, r);
                case "endOfWord":
                    s && t.emit("endOfWord")
                }
            }).on("error", i).on("change", function(n, i, s) {
                switch (n) {
                case "auto":
                    return t.detectLanguage(),
                    t.emit("auto", i);
                case "text":
                case "limit":
                case "srcLang":
                    return e.setEnabled(!1),
                    s.reason && this.setProperty("reason", s.reason),
                    "text" === n && t.detectLanguage(),
                    "srcLang" === n && s.detected && t.emit("detect", i, s.kbd),
                    t.requestSuggestion()
                }
            }).on("invalid", i)
        },
        isAuto: function() {
            return this.getModel().getProperty("auto")
        },
        setText: function(t, e) {
            return this.getModel().setProperty("text", t, {
                reason: e
            }),
            this
        },
        setIndex: function(t) {
            return this.getModel().setProperty("index", t),
            this
        },
        setValue: function(t, e) {
            return this.getModel().setProperty("value", t, e),
            this
        },
        toggleAuto: function(t) {
            return this.getModel().setProperty("auto", arguments.length ? !!t : !this.isAuto()),
            this
        },
        setSrcLanguage: function(t, e) {
            return this.getModel().setProperty("srcLang", t, e),
            this
        },
        setDstLanguage: function(t, e) {
            return this.getModel().setProperty("dstLang", t, e),
            this
        },
        detectLanguage: function() {
            return this.isAuto() && this.getModel().detectLanguage(),
            this
        },
        requestSuggestion: function() {
            return this.getModel().requestSuggestion(),
            this
        }
    }, {
        createRange: function(t, e) {
            var n = {};
            if (e.pos < 0)
                n.end = e.index,
                n.start = n.end + e.pos;
            else {
                if (e.index !== t.length || " " !== t.charAt(e.index - 1))
                    return null;
                n.end = n.start = e.index
            }
            return n
        },
        prepareValue: function(e, n) {
            var i = n.pos
              , s = n.index
              , r = n.value;
            return i < 0 ? s += i : r = new t.Array(i + 1).join(" ") + r,
            {
                text: e.slice(0, s) + r + e.slice(n.index),
                caret: s + r.length
            }
        },
        extractWords: function(t, e) {
            var n;
            return s.trim(t) ? (n = t.match(/(\S+\s*)/g),
            e = e ? -e : 0,
            n ? n.slice(e).join("") : "") : ""
        },
        detectOptions: {
            KBD: 1
        }
    });
    i.DictionaryModel = _.extend({
        getParams: function() {
            var t = this.toJSON();
            return {
                ui: t.ui,
                srv: t.srv,
                sid: t.sid,
                text: t.text,
                type: t.type,
                lang: t.srcLang + "-" + t.dstLang,
                flags: t.flags
            }
        },
        getDefaults: function() {
            return {
                ui: "",
                srv: "",
                url: "/",
                data: "",
                text: "",
                type: "",
                flags: 0,
                srcLang: "",
                dstLang: "",
                sid: this.getId()
            }
        },
        requestData: function() {
            var t = this;
            return this.abort(),
            this.isValid() ? this.setRequest(l.get(this.getProperty("url"), this.getParams(), function(e, n) {
                var i = e ? e.code : l.codes.OK;
                i === l.codes.OK ? t.setProperty("data", n.text) : i !== h.ABORT && t.emit("error", e)
            })) : this
        }
    }),
    i.DictionaryMultipleModel = i.DictionaryModel.extend({
        getParams: function() {
            var t, e, n = this.toJSON(), i = n.type.split(","), s = [];
            for (t = 0,
            e = i.length; t < e; t++)
                i[t] === w.types.REGULAR ? s.push(n.srcLang + "-" + n.dstLang + "." + i[t]) : s.push(n.srcLang + "." + i[t]);
            return {
                ui: n.ui,
                srv: n.srv,
                sid: n.sid,
                text: n.text,
                dict: s.join(","),
                flags: n.flags
            }
        }
    });
    var w = i.DictionaryPresenter = y.extend({
        init: function() {
            var t = this
              , e = this.getView()
              , n = this.getModel();
            this.requestData = s.debounce(w.prototype.requestData),
            e.on("itemSelected", function(e) {
                e && t.emit("valueSelected", e)
            }),
            n.on("change", function(e) {
                switch (e) {
                case "ui":
                case "text":
                case "type":
                case "flags":
                case "srcLang":
                case "dstLang":
                    t.requestData()
                }
            }).on("error", function(e) {
                t.emit("error", e)
            }).on("invalid", function() {
                this.setProperty("data", "")
            }).on("set:data", function(n) {
                n && (n = t.prepareData(n)) && e.renderData(n),
                e.setVisible(n)
            })
        },
        setText: function(t) {
            return this.getModel().setProperty("text", t),
            this
        },
        hasFlag: function(t) {
            return (this.getModel().getProperty("flags") & t) === t
        },
        setFlag: function(t, e) {
            var n = this.getModel()
              , i = n.getProperty("flags");
            return (e = !!e) === this.hasFlag(t) ? this : (i += t * (e ? 1 : -1),
            n.setProperty("flags", i),
            this)
        },
        setType: function(t, e) {
            var n, i = this.getModel(), s = i.getProperty("type");
            return s = s ? s.split(",") : [],
            n = s.indexOf(t),
            (e = !!e) == n >= 0 ? this : (e ? s.push(t) : s.splice(n, 1),
            i.setProperty("type", s.join(",")),
            this)
        },
        requestData: function() {
            return this.getModel().requestData(),
            this
        },
        setSrcLanguage: function(t, e) {
            return this.getModel().setProperty("srcLang", t, e),
            this
        },
        setDstLanguage: function(t, e) {
            return this.getModel().setProperty("dstLang", t, e),
            this
        }
    }, {
        flags: {
            NONE: 0,
            FAMILY: 1,
            SHORT_POS: 2,
            MORPHO: 4,
            RELIABLE: 16,
            TOOLTIPS: 32,
            LONG_EXAMPLES: 64,
            DEFINITIONS: 128
        },
        types: {
            SYN: "syn",
            ANT: "ant",
            DEF: "def",
            DERIV: "deriv",
            REGULAR: "regular"
        }
    });
    i.BaseApplication = y.extend({
        init: function() {
            var n = this
              , i = this.getView()
              , r = function(t) {
                var n, i;
                if ("hidden"in e)
                    return "hidden";
                for (n = 0; i = t[n]; n++)
                    if ((i += "Hidden")in e)
                        return i;
                return ""
            }(["webkit", "moz", "ms", "o"])
              , u = s.debounce(function() {
                n.emit("resize")
            });
            e.addEventListener("DOMContentLoaded", function() {
                i.setState("unresolved", !1),
                n.emit("pageReady")
            }, !1),
            t.addEventListener("load", function t() {
                n.emit("pageLoaded"),
                this.removeEventListener("load", t, !1)
            }, !1),
            t.addEventListener("resize", u, !1),
            t.addEventListener("orientationchange", u, !1),
            r && e.addEventListener(r.replace(/hidden/i, "") + "visibilitychange", function() {
                n.emit("visibilityChange", e[r])
            }, !1),
            i.on("tap", function(t) {
                var e, i = this.getClosest(t.target, function(t) {
                    return t.hasAttribute("data-action")
                }), r = this.getClosest(t.target, function(t) {
                    return t.hasAttribute("data-tracker-goal")
                });
                i && (e = i.getAttribute("data-action"),
                s.preventEvent(t),
                n.emit("action", e, i).emit("action:" + e, i)),
                r && n.emit("track", r.getAttribute("data-tracker-goal"))
            })
        }
    }),
    i.TranslateApplication = i.BaseApplication.extend({
        init: function() {
            var t = this;
            this.getModel().on("change", function(e, n, i) {
                switch (e) {
                case "srcLang":
                    n === this.getProperty("dstLang") && t.setDstLanguage(i.oldValue);
                    break;
                case "dstLang":
                    n === this.getProperty("srcLang") && t.setSrcLanguage(i.oldValue)
                }
            })
        },
        getLink: function(e) {
            var n, i = this.toJSON(), r = {}, u = "/";
            return (e = e || {}).includePathname && (u = t.location.pathname),
            e.includeSearch && (r = s.fromQueryString(t.location.search.slice(1))),
            n = e.absolute ? t.location.protocol + "//" + t.location.hostname + u : u,
            r.lang = i.srcLang + "-" + i.dstLang,
            i.trText ? r.text = i.trText : delete r.text,
            n + "?" + s.toQueryString(r)
        },
        setText: function(e, n) {
            var i, r, u, a = this.getModel(), o = s.trim(e);
            return n = n || {},
            n.caret = n.caret || 0,
            n.oldValue = n.oldValue || "",
            i = e.length - n.oldValue.length,
            r = t.Math.abs(i) > 1,
            u = e.charAt(n.caret - 1),
            n.reason = r ? i < 0 ? "cut" : "paste" : "input",
            a.setProperty("text", e, n),
            (!o || r || n.sender || i > 0 && !s.isAlphaOrDigit(u)) && (r || (n.reason = "\n" === u ? "enter" : "auto"),
            a.setProperty("trText", o, n)),
            this
        },
        updateTrText: function(t) {
            var e = this.getModel();
            return e.setProperty("trText", s.trim(e.getProperty("text")), {
                reason: t || "auto"
            }),
            this
        },
        swapDirection: function() {
            return this.setSrcLanguage(this.getModel().getProperty("dstLang")),
            this
        },
        setSrcLanguage: function(t, e) {
            var n = this.getModel();
            return n.isValid("srcLang", t) && n.setProperty("srcLang", t, e),
            this
        },
        setDstLanguage: function(t, e) {
            var n = this.getModel();
            return n.isValid("dstLang", t) && n.setProperty("dstLang", t, e),
            this
        }
    }, {
        DEFAULT_SRC_LANG: "en",
        DEFAULT_DST_LANG: "ru",
        isHistoryAvailable: function() {
            return !!t.history && "state"in t.history
        }
    })
}(this, this.document, this.navigator, this.yandexTranslate);
