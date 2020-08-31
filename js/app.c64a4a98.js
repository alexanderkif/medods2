(function(e){function t(t){for(var i,o,a=t[0],l=t[1],c=t[2],h=0,f=[];h<a.length;h++)o=a[h],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&f.push(r[o][0]),r[o]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(e[i]=l[i]);u&&u(t);while(f.length)f.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],i=!0,a=1;a<n.length;a++){var l=n[a];0!==r[l]&&(i=!1)}i&&(s.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},r={app:0},s=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/medods2/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],l=a.push.bind(a);a.push=t,a=a.slice();for(var c=0;c<a.length;c++)t(a[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"3e9f":function(e,t,n){},5667:function(e,t,n){"use strict";var i=n("dc4f"),r=n.n(i);r.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Game",{staticClass:"flex-center"})],1)},s=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"game"},e._l(e.colors,(function(t,i){return n("ColorArea",{key:i,ref:"colorArea",refInFor:!0,class:e.nine?"game__area game__area_nine":"game__area",attrs:{indx:i+1,color:t,listenUser:e.listenUser},on:{clickColorArea:e.checkChain}})})),1),n("Options",{attrs:{listenUser:e.listenUser,isGame:e.isGame,status:e.status},on:{"start-game":e.startGame,"change-level":function(t){return e.level=t},"click-nine":function(t){return e.nine=t}}})],1)},a=[],l=(n("fb6a"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"color-area",style:"background-color:"+e.color,on:{click:function(t){return t.preventDefault(),e.clickColorArea()}}})}),c=[],u=(n("a9e3"),{name:"ColorArea",props:{indx:Number,color:String,listenUser:Boolean},methods:{clickColorArea:function(){this.listenUser&&(this.$emit("clickColorArea",this.indx),this.pushColorArea())},pushColorArea:function(){var e=this;this.$el.classList.add("color-area_active"),this.playSound(),setTimeout((function(){e.$el.classList.remove("color-area_active")}),200)},playSound:function(){var e=new Audio("sound/".concat(this.indx,".mp3"));e.play()}}}),h=u,f=(n("de37"),n("2877")),p=Object(f["a"])(h,l,c,!1,null,null,null),d=p.exports,m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"options"},[n("div",{class:"options__status "+(e.isGame?"":"options__status_game-over")},[e._v(e._s(e.status))]),n("div",{class:e.listenUser?"options__listen":"options__repeat"},[e._v(" "+e._s(e.isGame?e.listenUser?"Повторяем":"Слушаем":"")+" ")]),n("div",{staticClass:"options__level"},e._l(e.$options.levels,(function(t){return n("div",{key:t.index},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.level,expression:"level"}],staticClass:"options__input",attrs:{type:"radio"},domProps:{value:t.wait,checked:e._q(e.level,t.wait)},on:{change:[function(n){e.level=t.wait},function(t){return e.$emit("change-level",e.level)}]}}),n("label",[e._v(e._s(t.title))])])})),0),n("div",{staticClass:"options__toggle-nine"},[n("button",{attrs:{disabled:e.isGame},on:{click:e.clickNine}},[e._v(" "+e._s(e.nine?"Верни четыре!":"Дай девять!")+" ")])]),n("div",{staticClass:"options__start-button"},[n("button",{attrs:{disabled:e.isGame},on:{click:function(t){return e.$emit("start-game")}}},[e._v("Начать игру")])])])},v=[],_={name:"Option",props:{listenUser:Boolean,isGame:Boolean,status:String},levels:[{title:"Легкий",wait:1500},{title:"Средний",wait:1e3},{title:"Сложный",wait:400}],data:function(){return{level:1500,nine:!1}},created:function(){this.$emit("change-level",this.level)},methods:{clickNine:function(){this.nine=!this.nine,this.$emit("click-nine",this.nine)}}},g=_,b=(n("5667"),Object(f["a"])(g,m,v,!1,null,null,null)),y=b.exports,C={name:"Game",components:{ColorArea:d,Options:y},data:function(){return{level:0,isGame:!1,chain:[],status:"",listenUser:!1,currentStep:0,timer:{},round:1,nine:!1}},methods:{startGame:function(){this.isGame=!0,this.chain=[],this.round=1,this.nextRound()},nextRound:function(){this.status="Раунд ".concat(this.round),this.currentStep=0,this.addRandomNumber(),this.listenUser=!1,this.playChain(this.chain)},stopGame:function(){this.isGame=!1,this.chain=[],this.currentStep=0,this.listenUser=!1},checkChain:function(e){var t=this;if(this.listenUser){if(clearTimeout(this.timer),this.chain[this.currentStep]!==e)return this.stopGame(),this.status="Ошибка",!1;if(this.chain.length-1===this.currentStep)return this.round++,this.timer=setTimeout((function(){t.nextRound()}),this.level),!1;this.currentStep++,this.timer=setTimeout((function(){t.stopGame(),t.status="Таймаут"}),this.level)}},playChain:function(e){var t=this;e.length?(setTimeout((function(){t.playChain(e.slice(1))}),this.level>700?700:this.level),this.$refs.colorArea[e[0]-1].pushColorArea()):this.listenUser=!0},addRandomNumber:function(){this.chain.push(this.randomInteger(1,this.nine?9:4))},randomInteger:function(e,t){var n=e+Math.random()*(t+1-e);return Math.floor(n)}},computed:{colors:function(){return this.nine?["blue","red","green","orange","violet","yellow","lightgreen","coral","indigo"]:["blue","red","green","orange"]}}},k=C,w=(n("6285"),Object(f["a"])(k,o,a,!1,null,null,null)),x=w.exports,G={name:"App",components:{Game:x}},O=G,S=(n("cf25"),Object(f["a"])(O,r,s,!1,null,null,null)),A=S.exports;i["a"].config.productionTip=!1,i["a"].config.devtools=!0,new i["a"]({render:function(e){return e(A)}}).$mount("#app")},6285:function(e,t,n){"use strict";var i=n("db69"),r=n.n(i);r.a},cf25:function(e,t,n){"use strict";var i=n("fea6"),r=n.n(i);r.a},db69:function(e,t,n){},dc4f:function(e,t,n){},de37:function(e,t,n){"use strict";var i=n("3e9f"),r=n.n(i);r.a},fea6:function(e,t,n){}});
//# sourceMappingURL=app.c64a4a98.js.map