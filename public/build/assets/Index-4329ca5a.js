import{r as Z,c as pt,g as Mn,R as zn,a as i,j as E,F as It,b as Fn}from"./app-ed6a17c1.js";import{A as Un}from"./AuthenticatedLayout-5026d4ac.js";import{M as Ln}from"./Modal-e76960a7.js";import{P as Re}from"./PrimaryButton-c7f8bf6d.js";import"./ApplicationLogo-9d6af40b.js";import"./transition-7ada1861.js";var _t={exports:{}};/*!
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */_t.exports;(function(p,f){(function(w,S){p.exports=S(Z)})(self,w=>(()=>{var S={703:(a,u,j)=>{var _=j(414);function m(){}function tt(){}tt.resetWarningCache=m,a.exports=function(){function v(A,yt,kt,C,at,gt){if(gt!==_){var ct=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw ct.name="Invariant Violation",ct}}function R(){return v}v.isRequired=v;var B={array:v,bigint:v,bool:v,func:v,number:v,object:v,string:v,symbol:v,any:v,arrayOf:R,element:v,elementType:v,instanceOf:R,node:v,objectOf:R,oneOf:R,oneOfType:R,shape:R,exact:R,checkPropTypes:tt,resetWarningCache:m};return B.PropTypes=B,B}},697:(a,u,j)=>{a.exports=j(703)()},414:a=>{a.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},787:a=>{a.exports=w}},O={};function b(a){var u=O[a];if(u!==void 0)return u.exports;var j=O[a]={exports:{}};return S[a](j,j.exports,b),j.exports}b.n=a=>{var u=a&&a.__esModule?()=>a.default:()=>a;return b.d(u,{a:u}),u},b.d=(a,u)=>{for(var j in u)b.o(u,j)&&!b.o(a,j)&&Object.defineProperty(a,j,{enumerable:!0,get:u[j]})},b.o=(a,u)=>Object.prototype.hasOwnProperty.call(a,u),b.r=a=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})};var W={};return(()=>{b.r(W),b.d(W,{CKEditor:()=>J,CKEditorContext:()=>Rt});var a=b(787),u=b.n(a),j=b(697),_=b.n(j);const m=new Array(256).fill("").map((t,e)=>("0"+e.toString(16)).slice(-2));class tt{constructor(e){if(this.crashes=[],this.state="initializing",this._now=Date.now,this.crashes=[],this._crashNumberLimit=typeof e.crashNumberLimit=="number"?e.crashNumberLimit:3,this._minimumNonErrorTimePeriod=typeof e.minimumNonErrorTimePeriod=="number"?e.minimumNonErrorTimePeriod:5e3,this._boundErrorHandler=r=>{const n="error"in r?r.error:r.reason;n instanceof Error&&this._handleError(n,r)},this._listeners={},!this._restart)throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.")}destroy(){this._stopErrorHandling(),this._listeners={}}on(e,r){this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push(r)}off(e,r){this._listeners[e]=this._listeners[e].filter(n=>n!==r)}_fire(e,...r){const n=this._listeners[e]||[];for(const o of n)o.apply(this,[null,...r])}_startErrorHandling(){window.addEventListener("error",this._boundErrorHandler),window.addEventListener("unhandledrejection",this._boundErrorHandler)}_stopErrorHandling(){window.removeEventListener("error",this._boundErrorHandler),window.removeEventListener("unhandledrejection",this._boundErrorHandler)}_handleError(e,r){if(this._shouldReactToError(e)){this.crashes.push({message:e.message,stack:e.stack,filename:r instanceof ErrorEvent?r.filename:void 0,lineno:r instanceof ErrorEvent?r.lineno:void 0,colno:r instanceof ErrorEvent?r.colno:void 0,date:this._now()});const n=this._shouldRestart();this.state="crashed",this._fire("stateChange"),this._fire("error",{error:e,causesRestart:n}),n?this._restart():(this.state="crashedPermanently",this._fire("stateChange"))}}_shouldReactToError(e){return e.is&&e.is("CKEditorError")&&e.context!==void 0&&e.context!==null&&this.state==="ready"&&this._isErrorComingFromThisItem(e)}_shouldRestart(){return this.crashes.length<=this._crashNumberLimit?!0:(this.crashes[this.crashes.length-1].date-this.crashes[this.crashes.length-1-this._crashNumberLimit].date)/this._crashNumberLimit>this._minimumNonErrorTimePeriod}}function v(t,e=new Set){const r=[t],n=new Set;let o=0;for(;r.length>o;){const s=r[o++];if(!n.has(s)&&R(s)&&!e.has(s))if(n.add(s),Symbol.iterator in s)try{for(const c of s)r.push(c)}catch{}else for(const c in s)c!=="defaultValue"&&r.push(s[c])}return n}function R(t){const e=Object.prototype.toString.call(t),r=typeof t;return!(r==="number"||r==="boolean"||r==="string"||r==="symbol"||r==="function"||e==="[object Date]"||e==="[object RegExp]"||e==="[object Module]"||t==null||t._watchdogExcluded||t instanceof EventTarget||t instanceof Event)}function B(t,e,r=new Set){if(t===e&&typeof(n=t)=="object"&&n!==null)return!0;var n;const o=v(t,r),s=v(e,r);for(const c of o)if(s.has(c))return!0;return!1}const A=function(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")},yt=typeof pt=="object"&&pt&&pt.Object===Object&&pt;var kt=typeof self=="object"&&self&&self.Object===Object&&self;const C=yt||kt||Function("return this")(),at=function(){return C.Date.now()};var gt=/\s/;const ct=function(t){for(var e=t.length;e--&&gt.test(t.charAt(e)););return e};var De=/^\s+/;const Ie=function(t){return t&&t.slice(0,ct(t)+1).replace(De,"")},H=C.Symbol;var Mt=Object.prototype,ke=Mt.hasOwnProperty,Me=Mt.toString,et=H?H.toStringTag:void 0;const ze=function(t){var e=ke.call(t,et),r=t[et];try{t[et]=void 0;var n=!0}catch{}var o=Me.call(t);return n&&(e?t[et]=r:delete t[et]),o};var Fe=Object.prototype.toString;const Ue=function(t){return Fe.call(t)};var zt=H?H.toStringTag:void 0;const k=function(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":zt&&zt in Object(t)?ze(t):Ue(t)},I=function(t){return t!=null&&typeof t=="object"},Le=function(t){return typeof t=="symbol"||I(t)&&k(t)=="[object Symbol]"};var qe=/^[-+]0x[0-9a-f]+$/i,Be=/^0b[01]+$/i,$e=/^0o[0-7]+$/i,He=parseInt;const Ft=function(t){if(typeof t=="number")return t;if(Le(t))return NaN;if(A(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=A(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Ie(t);var r=Be.test(t);return r||$e.test(t)?He(t.slice(2),r?2:8):qe.test(t)?NaN:+t};var Ve=Math.max,Qe=Math.min;const Ke=function(t,e,r){var n,o,s,c,h,g,y=0,ft=!1,U=!1,T=!0;if(typeof t!="function")throw new TypeError("Expected a function");function X(x){var D=n,q=o;return n=o=void 0,y=x,c=t.apply(q,D)}function st(x){var D=x-g;return g===void 0||D>=e||D<0||U&&x-y>=s}function L(){var x=at();if(st(x))return P(x);h=setTimeout(L,function(D){var q=e-(D-g);return U?Qe(q,s-(D-y)):q}(x))}function P(x){return h=void 0,T&&n?X(x):(n=o=void 0,c)}function N(){var x=at(),D=st(x);if(n=arguments,o=this,g=x,D){if(h===void 0)return function(q){return y=q,h=setTimeout(L,e),ft?X(q):c}(g);if(U)return clearTimeout(h),h=setTimeout(L,e),X(g)}return h===void 0&&(h=setTimeout(L,e)),c}return e=Ft(e)||0,A(r)&&(ft=!!r.leading,s=(U="maxWait"in r)?Ve(Ft(r.maxWait)||0,e):s,T="trailing"in r?!!r.trailing:T),N.cancel=function(){h!==void 0&&clearTimeout(h),y=0,n=g=o=h=void 0},N.flush=function(){return h===void 0?c:P(at())},N},Ge=function(t,e,r){var n=!0,o=!0;if(typeof t!="function")throw new TypeError("Expected a function");return A(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),Ke(t,e,{leading:n,maxWait:e,trailing:o})},Ye=function(){this.__data__=[],this.size=0},Ut=function(t,e){return t===e||t!=t&&e!=e},ht=function(t,e){for(var r=t.length;r--;)if(Ut(t[r][0],e))return r;return-1};var Je=Array.prototype.splice;const Xe=function(t){var e=this.__data__,r=ht(e,t);return!(r<0)&&(r==e.length-1?e.pop():Je.call(e,r,1),--this.size,!0)},Ze=function(t){var e=this.__data__,r=ht(e,t);return r<0?void 0:e[r][1]},tr=function(t){return ht(this.__data__,t)>-1},er=function(t,e){var r=this.__data__,n=ht(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this};function V(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}V.prototype.clear=Ye,V.prototype.delete=Xe,V.prototype.get=Ze,V.prototype.has=tr,V.prototype.set=er;const ut=V,rr=function(){this.__data__=new ut,this.size=0},nr=function(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r},or=function(t){return this.__data__.get(t)},ir=function(t){return this.__data__.has(t)},Lt=function(t){if(!A(t))return!1;var e=k(t);return e=="[object Function]"||e=="[object GeneratorFunction]"||e=="[object AsyncFunction]"||e=="[object Proxy]"},bt=C["__core-js_shared__"];var qt=function(){var t=/[^.]+$/.exec(bt&&bt.keys&&bt.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();const sr=function(t){return!!qt&&qt in t};var ar=Function.prototype.toString;const M=function(t){if(t!=null){try{return ar.call(t)}catch{}try{return t+""}catch{}}return""};var cr=/^\[object .+?Constructor\]$/,hr=Function.prototype,ur=Object.prototype,dr=hr.toString,lr=ur.hasOwnProperty,fr=RegExp("^"+dr.call(lr).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");const pr=function(t){return!(!A(t)||sr(t))&&(Lt(t)?fr:cr).test(M(t))},_r=function(t,e){return t==null?void 0:t[e]},z=function(t,e){var r=_r(t,e);return pr(r)?r:void 0},rt=z(C,"Map"),nt=z(Object,"create"),yr=function(){this.__data__=nt?nt(null):{},this.size=0},gr=function(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e};var br=Object.prototype.hasOwnProperty;const mr=function(t){var e=this.__data__;if(nt){var r=e[t];return r==="__lodash_hash_undefined__"?void 0:r}return br.call(e,t)?e[t]:void 0};var vr=Object.prototype.hasOwnProperty;const wr=function(t){var e=this.__data__;return nt?e[t]!==void 0:vr.call(e,t)},jr=function(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=nt&&e===void 0?"__lodash_hash_undefined__":e,this};function Q(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Q.prototype.clear=yr,Q.prototype.delete=gr,Q.prototype.get=mr,Q.prototype.has=wr,Q.prototype.set=jr;const Bt=Q,xr=function(){this.size=0,this.__data__={hash:new Bt,map:new(rt||ut),string:new Bt}},Er=function(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null},dt=function(t,e){var r=t.__data__;return Er(e)?r[typeof e=="string"?"string":"hash"]:r.map},Cr=function(t){var e=dt(this,t).delete(t);return this.size-=e?1:0,e},Or=function(t){return dt(this,t).get(t)},Pr=function(t){return dt(this,t).has(t)},Sr=function(t,e){var r=dt(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this};function K(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}K.prototype.clear=xr,K.prototype.delete=Cr,K.prototype.get=Or,K.prototype.has=Pr,K.prototype.set=Sr;const Ar=K,Tr=function(t,e){var r=this.__data__;if(r instanceof ut){var n=r.__data__;if(!rt||n.length<199)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Ar(n)}return r.set(t,e),this.size=r.size,this};function G(t){var e=this.__data__=new ut(t);this.size=e.size}G.prototype.clear=rr,G.prototype.delete=nr,G.prototype.get=or,G.prototype.has=ir,G.prototype.set=Tr;const Nr=G,Wr=function(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t},$t=function(){try{var t=z(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Ht=function(t,e,r){e=="__proto__"&&$t?$t(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r};var Rr=Object.prototype.hasOwnProperty;const Vt=function(t,e,r){var n=t[e];Rr.call(t,e)&&Ut(n,r)&&(r!==void 0||e in t)||Ht(t,e,r)},lt=function(t,e,r,n){var o=!r;r||(r={});for(var s=-1,c=e.length;++s<c;){var h=e[s],g=n?n(r[h],t[h],h,r,t):void 0;g===void 0&&(g=t[h]),o?Ht(r,h,g):Vt(r,h,g)}return r},Dr=function(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n},Qt=function(t){return I(t)&&k(t)=="[object Arguments]"};var Kt=Object.prototype,Ir=Kt.hasOwnProperty,kr=Kt.propertyIsEnumerable;const Mr=Qt(function(){return arguments}())?Qt:function(t){return I(t)&&Ir.call(t,"callee")&&!kr.call(t,"callee")},mt=Array.isArray,zr=function(){return!1};var Gt=f&&!f.nodeType&&f,Yt=Gt&&!0&&p&&!p.nodeType&&p,Jt=Yt&&Yt.exports===Gt?C.Buffer:void 0;const Xt=(Jt?Jt.isBuffer:void 0)||zr;var Fr=/^(?:0|[1-9]\d*)$/;const Ur=function(t,e){var r=typeof t;return!!(e=e??9007199254740991)&&(r=="number"||r!="symbol"&&Fr.test(t))&&t>-1&&t%1==0&&t<e},Zt=function(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=9007199254740991};var l={};l["[object Float32Array]"]=l["[object Float64Array]"]=l["[object Int8Array]"]=l["[object Int16Array]"]=l["[object Int32Array]"]=l["[object Uint8Array]"]=l["[object Uint8ClampedArray]"]=l["[object Uint16Array]"]=l["[object Uint32Array]"]=!0,l["[object Arguments]"]=l["[object Array]"]=l["[object ArrayBuffer]"]=l["[object Boolean]"]=l["[object DataView]"]=l["[object Date]"]=l["[object Error]"]=l["[object Function]"]=l["[object Map]"]=l["[object Number]"]=l["[object Object]"]=l["[object RegExp]"]=l["[object Set]"]=l["[object String]"]=l["[object WeakMap]"]=!1;const Lr=function(t){return I(t)&&Zt(t.length)&&!!l[k(t)]},vt=function(t){return function(e){return t(e)}};var te=f&&!f.nodeType&&f,ot=te&&!0&&p&&!p.nodeType&&p,wt=ot&&ot.exports===te&&yt.process;const Y=function(){try{var t=ot&&ot.require&&ot.require("util").types;return t||wt&&wt.binding&&wt.binding("util")}catch{}}();var ee=Y&&Y.isTypedArray;const qr=ee?vt(ee):Lr;var Br=Object.prototype.hasOwnProperty;const re=function(t,e){var r=mt(t),n=!r&&Mr(t),o=!r&&!n&&Xt(t),s=!r&&!n&&!o&&qr(t),c=r||n||o||s,h=c?Dr(t.length,String):[],g=h.length;for(var y in t)!e&&!Br.call(t,y)||c&&(y=="length"||o&&(y=="offset"||y=="parent")||s&&(y=="buffer"||y=="byteLength"||y=="byteOffset")||Ur(y,g))||h.push(y);return h};var $r=Object.prototype;const jt=function(t){var e=t&&t.constructor;return t===(typeof e=="function"&&e.prototype||$r)},ne=function(t,e){return function(r){return t(e(r))}},Hr=ne(Object.keys,Object);var Vr=Object.prototype.hasOwnProperty;const Qr=function(t){if(!jt(t))return Hr(t);var e=[];for(var r in Object(t))Vr.call(t,r)&&r!="constructor"&&e.push(r);return e},oe=function(t){return t!=null&&Zt(t.length)&&!Lt(t)},xt=function(t){return oe(t)?re(t):Qr(t)},Kr=function(t,e){return t&&lt(e,xt(e),t)},Gr=function(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e};var Yr=Object.prototype.hasOwnProperty;const Jr=function(t){if(!A(t))return Gr(t);var e=jt(t),r=[];for(var n in t)(n!="constructor"||!e&&Yr.call(t,n))&&r.push(n);return r},Et=function(t){return oe(t)?re(t,!0):Jr(t)},Xr=function(t,e){return t&&lt(e,Et(e),t)};var ie=f&&!f.nodeType&&f,se=ie&&!0&&p&&!p.nodeType&&p,ae=se&&se.exports===ie?C.Buffer:void 0,ce=ae?ae.allocUnsafe:void 0;const Zr=function(t,e){if(e)return t.slice();var r=t.length,n=ce?ce(r):new t.constructor(r);return t.copy(n),n},tn=function(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e},en=function(t,e){for(var r=-1,n=t==null?0:t.length,o=0,s=[];++r<n;){var c=t[r];e(c,r,t)&&(s[o++]=c)}return s},he=function(){return[]};var rn=Object.prototype.propertyIsEnumerable,ue=Object.getOwnPropertySymbols;const Ct=ue?function(t){return t==null?[]:(t=Object(t),en(ue(t),function(e){return rn.call(t,e)}))}:he,nn=function(t,e){return lt(t,Ct(t),e)},de=function(t,e){for(var r=-1,n=e.length,o=t.length;++r<n;)t[o+r]=e[r];return t},Ot=ne(Object.getPrototypeOf,Object),le=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)de(e,Ct(t)),t=Ot(t);return e}:he,on=function(t,e){return lt(t,le(t),e)},fe=function(t,e,r){var n=e(t);return mt(t)?n:de(n,r(t))},sn=function(t){return fe(t,xt,Ct)},an=function(t){return fe(t,Et,le)},Pt=z(C,"DataView"),St=z(C,"Promise"),At=z(C,"Set"),Tt=z(C,"WeakMap");var pe="[object Map]",_e="[object Promise]",ye="[object Set]",ge="[object WeakMap]",be="[object DataView]",cn=M(Pt),hn=M(rt),un=M(St),dn=M(At),ln=M(Tt),F=k;(Pt&&F(new Pt(new ArrayBuffer(1)))!=be||rt&&F(new rt)!=pe||St&&F(St.resolve())!=_e||At&&F(new At)!=ye||Tt&&F(new Tt)!=ge)&&(F=function(t){var e=k(t),r=e=="[object Object]"?t.constructor:void 0,n=r?M(r):"";if(n)switch(n){case cn:return be;case hn:return pe;case un:return _e;case dn:return ye;case ln:return ge}return e});const Nt=F;var fn=Object.prototype.hasOwnProperty;const pn=function(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&fn.call(t,"index")&&(r.index=t.index,r.input=t.input),r},me=C.Uint8Array,Wt=function(t){var e=new t.constructor(t.byteLength);return new me(e).set(new me(t)),e},_n=function(t,e){var r=e?Wt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)};var yn=/\w*$/;const gn=function(t){var e=new t.constructor(t.source,yn.exec(t));return e.lastIndex=t.lastIndex,e};var ve=H?H.prototype:void 0,we=ve?ve.valueOf:void 0;const bn=function(t){return we?Object(we.call(t)):{}},mn=function(t,e){var r=e?Wt(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)},vn=function(t,e,r){var n=t.constructor;switch(e){case"[object ArrayBuffer]":return Wt(t);case"[object Boolean]":case"[object Date]":return new n(+t);case"[object DataView]":return _n(t,r);case"[object Float32Array]":case"[object Float64Array]":case"[object Int8Array]":case"[object Int16Array]":case"[object Int32Array]":case"[object Uint8Array]":case"[object Uint8ClampedArray]":case"[object Uint16Array]":case"[object Uint32Array]":return mn(t,r);case"[object Map]":case"[object Set]":return new n;case"[object Number]":case"[object String]":return new n(t);case"[object RegExp]":return gn(t);case"[object Symbol]":return bn(t)}};var je=Object.create;const wn=function(){function t(){}return function(e){if(!A(e))return{};if(je)return je(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),jn=function(t){return typeof t.constructor!="function"||jt(t)?{}:wn(Ot(t))},xn=function(t){return I(t)&&Nt(t)=="[object Map]"};var xe=Y&&Y.isMap;const En=xe?vt(xe):xn,Cn=function(t){return I(t)&&Nt(t)=="[object Set]"};var Ee=Y&&Y.isSet;const On=Ee?vt(Ee):Cn;var Ce="[object Arguments]",Oe="[object Function]",Pe="[object Object]",d={};d[Ce]=d["[object Array]"]=d["[object ArrayBuffer]"]=d["[object DataView]"]=d["[object Boolean]"]=d["[object Date]"]=d["[object Float32Array]"]=d["[object Float64Array]"]=d["[object Int8Array]"]=d["[object Int16Array]"]=d["[object Int32Array]"]=d["[object Map]"]=d["[object Number]"]=d[Pe]=d["[object RegExp]"]=d["[object Set]"]=d["[object String]"]=d["[object Symbol]"]=d["[object Uint8Array]"]=d["[object Uint8ClampedArray]"]=d["[object Uint16Array]"]=d["[object Uint32Array]"]=!0,d["[object Error]"]=d[Oe]=d["[object WeakMap]"]=!1;const Pn=function t(e,r,n,o,s,c){var h,g=1&r,y=2&r,ft=4&r;if(n&&(h=s?n(e,o,s,c):n(e)),h!==void 0)return h;if(!A(e))return e;var U=mt(e);if(U){if(h=pn(e),!g)return tn(e,h)}else{var T=Nt(e),X=T==Oe||T=="[object GeneratorFunction]";if(Xt(e))return Zr(e,g);if(T==Pe||T==Ce||X&&!s){if(h=y||X?{}:jn(e),!g)return y?on(e,Xr(h,e)):nn(e,Kr(h,e))}else{if(!d[T])return s?e:{};h=vn(e,T,g)}}c||(c=new Nr);var st=c.get(e);if(st)return st;c.set(e,h),On(e)?e.forEach(function(P){h.add(t(P,r,n,P,e,c))}):En(e)&&e.forEach(function(P,N){h.set(N,t(P,r,n,N,e,c))});var L=U?void 0:(ft?y?an:sn:y?Et:xt)(e);return Wr(L||e,function(P,N){L&&(P=e[N=P]),Vt(h,N,t(P,r,n,N,e,c))}),h},Sn=function(t,e){return Pn(t,5,e=typeof e=="function"?e:void 0)};var An=Function.prototype,Tn=Object.prototype,Se=An.toString,Nn=Tn.hasOwnProperty,Wn=Se.call(Object);const Rn=function(t){if(!I(t)||k(t)!="[object Object]")return!1;var e=Ot(t);if(e===null)return!0;var r=Nn.call(e,"constructor")&&e.constructor;return typeof r=="function"&&r instanceof r&&Se.call(r)==Wn},Dn=function(t){return I(t)&&t.nodeType===1&&!Rn(t)};class Ae extends tt{constructor(e,r={}){super(r),this._editor=null,this._throttledSave=Ge(this._save.bind(this),typeof r.saveInterval=="number"?r.saveInterval:5e3),e&&(this._creator=(n,o)=>e.create(n,o)),this._destructor=n=>n.destroy()}get editor(){return this._editor}get _item(){return this._editor}setCreator(e){this._creator=e}setDestructor(e){this._destructor=e}_restart(){return Promise.resolve().then(()=>(this.state="initializing",this._fire("stateChange"),this._destroy())).catch(e=>{console.error("An error happened during the editor destroying.",e)}).then(()=>{if(typeof this._elementOrData=="string")return this.create(this._data,this._config,this._config.context);{const e=Object.assign({},this._config,{initialData:this._data});return this.create(this._elementOrData,e,e.context)}}).then(()=>{this._fire("restart")})}create(e=this._elementOrData,r=this._config,n){return Promise.resolve().then(()=>(super._startErrorHandling(),this._elementOrData=e,this._config=this._cloneEditorConfiguration(r)||{},this._config.context=n,this._creator(e,this._config))).then(o=>{this._editor=o,o.model.document.on("change:data",this._throttledSave),this._lastDocumentVersion=o.model.document.version,this._data=this._getData(),this.state="ready",this._fire("stateChange")})}destroy(){return Promise.resolve().then(()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy()))}_destroy(){return Promise.resolve().then(()=>{this._stopErrorHandling(),this._throttledSave.flush();const e=this._editor;return this._editor=null,e.model.document.off("change:data",this._throttledSave),this._destructor(e)})}_save(){const e=this._editor.model.document.version;try{this._data=this._getData(),this._lastDocumentVersion=e}catch(r){console.error(r,"An error happened during restoring editor data. Editor will be restored from the previously saved data.")}}_setExcludedProperties(e){this._excludedProps=e}_getData(){const e={};for(const r of this._editor.model.document.getRootNames())e[r]=this._editor.data.get({rootName:r});return e}_isErrorComingFromThisItem(e){return B(this._editor,e.context,this._excludedProps)}_cloneEditorConfiguration(e){return Sn(e,(r,n)=>Dn(r)||n==="context"?r:void 0)}}const it=Symbol("MainQueueId");class Te extends tt{constructor(e,r={}){super(r),this._watchdogs=new Map,this._context=null,this._contextProps=new Set,this._actionQueues=new In,this._watchdogConfig=r,this._creator=n=>e.create(n),this._destructor=n=>n.destroy(),this._actionQueues.onEmpty(()=>{this.state==="initializing"&&(this.state="ready",this._fire("stateChange"))})}setCreator(e){this._creator=e}setDestructor(e){this._destructor=e}get context(){return this._context}create(e={}){return this._actionQueues.enqueue(it,()=>(this._contextConfig=e,this._create()))}getItem(e){return this._getWatchdog(e)._item}getItemState(e){return this._getWatchdog(e).state}add(e){const r=Ne(e);return Promise.all(r.map(n=>this._actionQueues.enqueue(n.id,()=>{if(this.state==="destroyed")throw new Error("Cannot add items to destroyed watchdog.");if(!this._context)throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");let o;if(this._watchdogs.has(n.id))throw new Error(`Item with the given id is already added: '${n.id}'.`);if(n.type==="editor")return o=new Ae(null,this._watchdogConfig),o.setCreator(n.creator),o._setExcludedProperties(this._contextProps),n.destructor&&o.setDestructor(n.destructor),this._watchdogs.set(n.id,o),o.on("error",(s,{error:c,causesRestart:h})=>{this._fire("itemError",{itemId:n.id,error:c}),h&&this._actionQueues.enqueue(n.id,()=>new Promise(g=>{const y=()=>{o.off("restart",y),this._fire("itemRestart",{itemId:n.id}),g()};o.on("restart",y)}))}),o.create(n.sourceElementOrData,n.config,this._context);throw new Error(`Not supported item type: '${n.type}'.`)})))}remove(e){const r=Ne(e);return Promise.all(r.map(n=>this._actionQueues.enqueue(n,()=>{const o=this._getWatchdog(n);return this._watchdogs.delete(n),o.destroy()})))}destroy(){return this._actionQueues.enqueue(it,()=>(this.state="destroyed",this._fire("stateChange"),super.destroy(),this._destroy()))}_restart(){return this._actionQueues.enqueue(it,()=>(this.state="initializing",this._fire("stateChange"),this._destroy().catch(e=>{console.error("An error happened during destroying the context or items.",e)}).then(()=>this._create()).then(()=>this._fire("restart"))))}_create(){return Promise.resolve().then(()=>(this._startErrorHandling(),this._creator(this._contextConfig))).then(e=>(this._context=e,this._contextProps=v(this._context),Promise.all(Array.from(this._watchdogs.values()).map(r=>(r._setExcludedProperties(this._contextProps),r.create(void 0,void 0,this._context))))))}_destroy(){return Promise.resolve().then(()=>{this._stopErrorHandling();const e=this._context;return this._context=null,this._contextProps=new Set,Promise.all(Array.from(this._watchdogs.values()).map(r=>r.destroy())).then(()=>this._destructor(e))})}_getWatchdog(e){const r=this._watchdogs.get(e);if(!r)throw new Error(`Item with the given id was not registered: ${e}.`);return r}_isErrorComingFromThisItem(e){for(const r of this._watchdogs.values())if(r._isErrorComingFromThisItem(e))return!1;return B(this._context,e.context)}}class In{constructor(){this._onEmptyCallbacks=[],this._queues=new Map,this._activeActions=0}onEmpty(e){this._onEmptyCallbacks.push(e)}enqueue(e,r){const n=e===it;this._activeActions++,this._queues.get(e)||this._queues.set(e,Promise.resolve());const o=(n?Promise.all(this._queues.values()):Promise.all([this._queues.get(it),this._queues.get(e)])).then(r),s=o.catch(()=>{});return this._queues.set(e,s),o.finally(()=>{this._activeActions--,this._queues.get(e)===s&&this._activeActions===0&&this._onEmptyCallbacks.forEach(c=>c())})}}function Ne(t){return Array.isArray(t)?t:[t]}const We=u().createContext("contextWatchdog");class Rt extends u().Component{constructor(e,r){super(e,r),this.contextWatchdog=null,this.props.isLayoutReady&&this._initializeContextWatchdog(this.props.config)}shouldComponentUpdate(e){return this._shouldComponentUpdate(e)}async _shouldComponentUpdate(e){return e.id!==this.props.id&&(this.contextWatchdog&&await this.contextWatchdog.destroy(),await this._initializeContextWatchdog(e.config)),e.isLayoutReady&&!this.contextWatchdog?(await this._initializeContextWatchdog(e.config),!0):this.props.children!==e.children}render(){return u().createElement(We.Provider,{value:this.contextWatchdog},this.props.children)}componentWillUnmount(){this._destroyContext()}async _initializeContextWatchdog(e){this.contextWatchdog=new Te(this.props.context,this.props.watchdogConfig),this.contextWatchdog.on("error",(r,n)=>{this.props.onError(n.error,{phase:"runtime",willContextRestart:n.causesRestart})}),this.contextWatchdog.on("stateChange",()=>{this.contextWatchdog.state==="ready"&&this.props.onReady&&this.props.onReady(this.contextWatchdog.context)}),await this.contextWatchdog.create(e).catch(r=>{this.props.onError(r,{phase:"initialization",willContextRestart:!1})})}async _destroyContext(){this.contextWatchdog&&(await this.contextWatchdog.destroy(),this.contextWatchdog=null)}}Rt.defaultProps={isLayoutReady:!0,onError:(t,e)=>console.error(t,e)},Rt.propTypes={id:_().string,isLayoutReady:_().bool,context:_().func,watchdogConfig:_().object,config:_().object,onReady:_().func,onError:_().func};const Dt="Lock from React integration (@ckeditor/ckeditor5-react)";class J extends u().Component{constructor(e){super(e),this.editorDestructionInProgress=null,this.domContainer=u().createRef(),this.watchdog=null;const{CKEDITOR_VERSION:r}=window;if(r){const[n]=r.split(".").map(Number);n<37&&console.warn("The <CKEditor> component requires using CKEditor 5 in version 37 or higher.")}else console.warn('Cannot find the "CKEDITOR_VERSION" in the "window" scope.')}get editor(){return this.props.disableWatchdog?this.instance:this.watchdog?this.watchdog.editor:null}shouldComponentUpdate(e){return!!this.editor&&(e.id!==this.props.id||e.disableWatchdog!==this.props.disableWatchdog||(this._shouldUpdateEditor(e)&&this.editor.data.set(e.data),"disabled"in e&&(e.disabled?this.editor.enableReadOnlyMode(Dt):this.editor.disableReadOnlyMode(Dt)),!1))}async componentDidMount(){await this._initializeEditor()}async componentDidUpdate(){await this._destroyEditor(),await this._initializeEditor()}async componentWillUnmount(){await this._destroyEditor()}render(){return u().createElement("div",{ref:this.domContainer})}async _initializeEditor(){await this.editorDestructionInProgress,this.props.disableWatchdog?this.instance=await this._createEditor(this.domContainer.current,this._getConfig()):this.watchdog||(this.context instanceof Te?this.watchdog=new kn(this.context):this.watchdog=new J._EditorWatchdog(this.props.editor,this.props.watchdogConfig),this.watchdog.setCreator((e,r)=>this._createEditor(e,r)),this.watchdog.on("error",(e,{error:r,causesRestart:n})=>{(this.props.onError||console.error)(r,{phase:"runtime",willEditorRestart:n})}),await this.watchdog.create(this.domContainer.current,this._getConfig()).catch(e=>{(this.props.onError||console.error)(e,{phase:"initialization",willEditorRestart:!1})}))}_createEditor(e,r){return this.props.editor.create(e,r).then(n=>{"disabled"in this.props&&this.props.disabled&&n.enableReadOnlyMode(Dt);const o=n.model.document,s=n.editing.view.document;return o.on("change:data",c=>{this.props.onChange&&this.props.onChange(c,n)}),s.on("focus",c=>{this.props.onFocus&&this.props.onFocus(c,n)}),s.on("blur",c=>{this.props.onBlur&&this.props.onBlur(c,n)}),setTimeout(()=>{this.props.onReady&&this.props.onReady(n)}),n})}async _destroyEditor(){this.editorDestructionInProgress=new Promise(e=>{setTimeout(async()=>this.watchdog?(await this.watchdog.destroy(),this.watchdog=null,e()):this.instance?(await this.instance.destroy(),this.instance=null,e()):void e())})}_shouldUpdateEditor(e){return this.props.data!==e.data&&this.editor.data.get()!==e.data}_getConfig(){const e=this.props.config||{};return this.props.data&&e.initialData&&console.warn("Editor data should be provided either using `config.initialData` or `data` properties. The config property is over the data value and the first one will be used when specified both."),{...e,initialData:e.initialData||this.props.data||""}}}J.contextType=We,J.propTypes={editor:_().func.isRequired,data:_().string,config:_().object,disableWatchdog:_().bool,watchdogConfig:_().object,onChange:_().func,onReady:_().func,onFocus:_().func,onBlur:_().func,onError:_().func,disabled:_().bool,id:_().any},J._EditorWatchdog=Ae;class kn{constructor(e){this._contextWatchdog=e,this._id=function(){const r=4294967296*Math.random()>>>0,n=4294967296*Math.random()>>>0,o=4294967296*Math.random()>>>0,s=4294967296*Math.random()>>>0;return"e"+m[r>>0&255]+m[r>>8&255]+m[r>>16&255]+m[r>>24&255]+m[n>>0&255]+m[n>>8&255]+m[n>>16&255]+m[n>>24&255]+m[o>>0&255]+m[o>>8&255]+m[o>>16&255]+m[o>>24&255]+m[s>>0&255]+m[s>>8&255]+m[s>>16&255]+m[s>>24&255]}()}setCreator(e){this._creator=e}create(e,r){return this._contextWatchdog.add({sourceElementOrData:e,config:r,creator:this._creator,id:this._id,type:"editor"})}on(e,r){this._contextWatchdog.on("itemError",(n,{itemId:o,error:s})=>{o===this._id&&r(null,{error:s,causesRestart:void 0})})}destroy(){return this._contextWatchdog.state==="ready"?this._contextWatchdog.remove(this._id):Promise.resolve()}get editor(){return this._contextWatchdog.getItem(this._id)}}})(),W})())})(_t,_t.exports);var qn=_t.exports;class Bn{constructor(f){this.loader=f}upload(){return this.loader.file.then(f=>new Promise((w,S)=>{Mn.post("/upload",{file:f},{forceFormData:!0,onSuccess(O){w({default:O.props.flash.success.urls.default})}})}))}abort(){console.log("abort")}}const $n=Bn;function Hn(){const[p,f]=zn.useState(!1),[w,S]=Z.useState(i("tr",{})),O="filesTable";function b(){axios.get("/upload").then(W=>{S(W.data.map(a=>E("tr",{children:[i("td",{children:a.file_name}),i("td",{children:a.name}),i("td",{children:a.mime_type}),i("td",{children:i("a",{href:"/storage/"+a.path,target:"_blank",children:i("u",{children:"view"})})}),i("td",{children:i("button",{className:"border p-2 inline-flex items-center px-4 py-2 bg-gray-800 border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2",type:"button",onClick:()=>navigator.clipboard.writeText("/storage/"+a.path),children:"Copy Url"})})]},a.id))),f(!0),$(document).ready(function(){$("#"+O).DataTable({columnDefs:[{searchable:!1,targets:[3,4]}]})})})}return E(It,{children:[i("span",{className:"inline-flex rounded-md",children:i("button",{className:"inline-flex items-center px-3 py-2 border border-transparent",type:"button",onClick:b,children:i("span",{className:"hover:text-gray-700",children:"view files"})})}),p?E(It,{children:[i("div",{className:"flex overflow-y-auto fixed inset-10 z-50 outline-none focus:outline-none",children:i("div",{className:"relative w-auto my-6 mx-auto",children:E("div",{className:"border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none",children:[E("div",{className:"flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t",children:[i("h3",{className:"text-3xl font-semibold justify-center p-2",children:"Uploaded Files"}),i("button",{className:"p-2 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:()=>f(!1),children:i("span",{className:"text-black h-6 w-6 text-4xl block outline-none focus:outline-none",children:"×"})})]}),i("div",{className:"relative p-6 flex-auto",children:i("div",{className:"w-full",children:E("table",{id:O,"data-order":"[]",className:"cell-border display w-full overflow-y-auto",children:[i("thead",{children:E("tr",{children:[i("th",{children:"Filename"}),i("th",{children:"Alias"}),i("th",{children:"Mimetype"}),i("th",{children:"Link"}),i("th",{children:"COPY URL"})]})}),i("tbody",{children:w})]})})})]})})}),i("div",{className:"opacity-25 fixed inset-0 z-40 bg-black",onClick:()=>f(!1)})]}):null]})}function Vn({showTools:p,onClick:f}){return i(It,{children:i("button",{className:"inline-flex items-center px-3 py-2 border border-transparent",type:"button",onClick:f,children:E("span",{className:"hover:text-gray-700",children:["editor tools",i("span",{children:i("svg",{style:p?{}:{transform:"rotate(180deg)"},className:"ml-2 -mr-0.5 h-4 w-4 inline-flex",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:i("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})})]})})})}function Qn({setShowSavePDFModal:p,showSavePDFModal:f}){const[w,S]=Z.useState({filename:"",pdfType:"image"}),[O,b]=Z.useState(!1);function W(u){S({...w,[u.target.name]:u.target.value})}function a(){if(w.filename.trim().length===0||w.pdfType.trim().length===0)b(!0);else{if(w.pdfType==="image"){let u=document.querySelector(".ck.ck-editor__editable_inline"),j=u.style.border;u.style.removeProperty("border");let _=document.getElementsByClassName("ck-editor__main")[0];html2pdf().set({filename:w.filename+".pdf",image:{type:"jpeg",quality:.98}}).from(_).save(),u.style.border=j}p(!1)}}return i(Ln,{onClose:()=>p(!1),show:f,children:E("div",{className:"px-6 py-6",children:[i("label",{className:"mr-2",children:"Enter filename"}),i("input",{name:"filename",type:"text",onInput:W}),i("span",{children:" .pdf"}),i("br",{}),i("br",{}),i("span",{className:"text-red-600",hidden:!O,children:"*Please fill all fields"}),E("div",{children:[i("br",{}),i(Re,{className:"mr-6",onClick:a,children:"Save PDF"}),i(Re,{className:"bg-red-600 hover:bg-red-600",onClick:()=>p(!1),children:"Cancel"})]})]})})}function Kn(){const[p,f]=Z.useState(!1),[w,S]=Z.useState(!1);function O(){let a=document.getElementsByClassName("ck-editor__top");for(let u=0;u<a.length;u++)a[u].hidden=!w}function b(){O(),S(!w)}let W=`<table>
                    <thead>
                    <tr>
                        <th>Sn</th>
                        <th>
                            Corporate
                            Objectives
                        </th>
                        <th>
                            Individual Objectives: What you are
                            to do / achieve and by when- to
                            contribute to the achievement of the
                            Company objective
                        </th>
                        <th>
                            By when
                        </th>
                        <th>
                            Agreed
                            Weights
                        </th>
                        <th>
                            Indicator/ measure
                            (what will show that
                            you have achieved
                            what you set out to
                            achieve?)
                        </th>
                        <th>
                            Remarks
                        </th>
                        <th>
                            Marks
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                        <td contentEditable="true"></td>
                    </tr>
                    </tbody>
                </table><br/>
`;return E("div",{className:"bg-white",children:[i(Qn,{setShowSavePDFModal:f,showSavePDFModal:p}),E("div",{children:[i("span",{className:"inline-flex rounded-md",children:i(Vn,{onClick:b,showTools:w})}),i(Hn,{}),i("span",{className:"inline-flex rounded-md",children:i("button",{className:"inline-flex items-center px-3 py-2 border border-transparent",type:"button",onClick:()=>f(!0),children:i("span",{className:"hover:text-gray-700",children:"save PDF"})})})]}),i(qn.CKEditor,{editor:ClassicEditor,onReady:a=>{a.setData(W),a.plugins.get("FileRepository").createUploadAdapter=u=>new $n(u)}})]})}function eo({auth:p}){return E(Un,{user:p.user,children:[i(Fn,{title:"Records"}),i("div",{className:"p-0",children:i(Kn,{})})]})}export{eo as default};