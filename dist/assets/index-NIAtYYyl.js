var Hr=Object.defineProperty;var Gr=(s,e,t)=>e in s?Hr(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var is=(s,e,t)=>Gr(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Wr="modulepreload",jr=function(s,e){return new URL(s,e).href},Gi={},et=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){const l=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");n=Promise.allSettled(t.map(d=>{if(d=jr(d,i),d in Gi)return;Gi[d]=!0;const c=d.endsWith(".css"),_=c?'[rel="stylesheet"]':"";if(!!i)for(let g=l.length-1;g>=0;g--){const u=l[g];if(u.href===d&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${_}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":Wr,c||(m.as="script"),m.crossOrigin="",m.href=d,a&&m.setAttribute("nonce",a),document.head.appendChild(m),c)return new Promise((g,u)=>{m.addEventListener("load",g),m.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return n.then(l=>{for(const o of l||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};function zr(s){return typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=1),s._startLevel1(),()=>{typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),document.querySelectorAll(".staff-slot.targeting, .staff-slot.filling").forEach(n=>{n.classList.remove("targeting","filling")})}}const Vr=Object.freeze(Object.defineProperty({__proto__:null,default:zr},Symbol.toStringTag,{value:"Module"})),ce="http://www.w3.org/2000/svg";class Yr{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level10-background";let t="";for(let i=0;i<40;i++){const n=Math.random()*100,r=Math.random()*60,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level10-twinkle" cx="${n}%" cy="${r}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- 月亮 -->
        <circle class="level10-moon" cx="700" cy="80" r="36" fill="#fff8dc" opacity="0.9" />
        <circle cx="713" cy="70" r="33" fill="#1a1a3a" />

        <!-- 装饰小星 -->
        ${t}

        <!-- 标题 -->
        <text x="400" y="62" text-anchor="middle" class="level10-title">🎹 八度之旅 🎹</text>
        <text x="400" y="92" text-anchor="middle" class="level10-subtitle">听音, 选低或高</text>

        <!-- 远山剪影 -->
        <path class="level10-mountains"
              d="M0,500 L0,420 L80,360 L150,400 L240,330 L320,390 L420,310 L520,380 L620,330 L720,400 L800,360 L800,500 Z" />
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}function Ue(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Fn(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var De={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Yt={duration:.5,overwrite:!1,delay:0},xi,_e,ee,Ie=1e8,J=1/Ie,ni=Math.PI*2,Ur=ni/4,Qr=0,qn=Math.sqrt,Kr=Math.cos,Zr=Math.sin,pe=function(e){return typeof e=="string"},le=function(e){return typeof e=="function"},Ke=function(e){return typeof e=="number"},wi=function(e){return typeof e>"u"},Ve=function(e){return typeof e=="object"},Te=function(e){return e!==!1},Ti=function(){return typeof window<"u"},ns=function(e){return le(e)||pe(e)},Hn=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ge=Array.isArray,Xr=/random\([^)]+\)/g,Jr=/,\s*/g,Wi=/(?:-?\.?\d|\.)+/gi,Gn=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,St=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Bs=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Wn=/[+-]=-?[.\d]+/,el=/[^,'"\[\]\s]+/gi,tl=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ne,We,ri,ki,Oe={},xs={},jn,zn=function(e){return(xs=Pt(e,Oe))&&Ce},Si=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ut=function(e,t){return!t&&console.warn(e)},Vn=function(e,t){return e&&(Oe[e]=t)&&xs&&(xs[e]=t)||Oe},Qt=function(){return 0},sl={suppressEvents:!0,isStart:!0,kill:!1},_s={suppressEvents:!0,kill:!1},il={suppressEvents:!0},Li={},nt=[],li={},Yn,Ee={},Fs={},ji=30,vs=[],Ci="",Mi=function(e){var t=e[0],i,n;if(Ve(t)||le(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=vs.length;n--&&!vs[n].targetTest(t););i=vs[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new _r(e[n],i)))||e.splice(n,1);return e},_t=function(e){return e._gsap||Mi(Be(e))[0]._gsap},Un=function(e,t,i){return(i=e[t])&&le(i)?e[t]():wi(i)&&e.getAttribute&&e.getAttribute(t)||i},ke=function(e,t){return(e=e.split(",")).forEach(t)||e},ae=function(e){return Math.round(e*1e5)/1e5||0},ie=function(e){return Math.round(e*1e7)/1e7||0},Ct=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},nl=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},ws=function(){var e=nt.length,t=nt.slice(0),i,n;for(li={},nt.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},Ei=function(e){return!!(e._initted||e._startAt||e.add)},Qn=function(e,t,i,n){nt.length&&!_e&&ws(),e.render(t,i,!!(_e&&t<0&&Ei(e))),nt.length&&!_e&&ws()},Kn=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(el).length<2?t:pe(e)?e.trim():e},Zn=function(e){return e},Ne=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},rl=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},Pt=function(e,t){for(var i in t)e[i]=t[i];return e},zi=function s(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Ve(t[i])?s(e[i]||(e[i]={}),t[i]):t[i]);return e},Ts=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},jt=function(e){var t=e.parent||ne,i=e.keyframes?rl(ge(e.keyframes)):Ne;if(Te(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},ll=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},Xn=function(e,t,i,n,r){var l=e[n],o;if(r)for(o=t[r];l&&l[r]>o;)l=l._prev;return l?(t._next=l._next,l._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=l,t.parent=t._dp=e,t},$s=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=t._prev,l=t._next;r?r._next=l:e[i]===t&&(e[i]=l),l?l._prev=r:e[n]===t&&(e[n]=r),t._next=t._prev=t.parent=null},lt=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},vt=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},ol=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},oi=function(e,t,i,n){return e._startAt&&(_e?e._startAt.revert(_s):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},al=function s(e){return!e||e._ts&&s(e.parent)},Vi=function(e){return e._repeat?$t(e._tTime,e=e.duration()+e._rDelay)*e:0},$t=function(e,t){var i=Math.floor(e=ie(e/t));return e&&i===e?i-1:i},ks=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ds=function(e){return e._end=ie(e._start+(e._tDur/Math.abs(e._ts||e._rts||J)||0))},Os=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=ie(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ds(e),i._dirty||vt(i,e)),e},Jn=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=ks(e.rawTime(),t),(!t._dur||ts(0,t.totalDuration(),i)-t._tTime>J)&&t.render(i,!0)),vt(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-J}},je=function(e,t,i,n){return t.parent&&lt(t),t._start=ie((Ke(i)?i:i||e!==ne?Re(e,i,t):e._time)+t._delay),t._end=ie(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Xn(e,t,"_first","_last",e._sort?"_start":0),ai(t)||(e._recent=t),n||Jn(e,t),e._ts<0&&Os(e,e._tTime),e},er=function(e,t){return(Oe.ScrollTrigger||Si("scrollTrigger",t))&&Oe.ScrollTrigger.create(t,e)},tr=function(e,t,i,n,r){if(Pi(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!_e&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Yn!==Ae.frame)return nt.push(e),e._lazy=[r,n],1},cl=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},ai=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},dl=function(e,t,i,n){var r=e.ratio,l=t<0||!t&&(!e._start&&cl(e)&&!(!e._initted&&ai(e))||(e._ts<0||e._dp._ts<0)&&!ai(e))?0:1,o=e._rDelay,a=0,d,c,_;if(o&&e._repeat&&(a=ts(0,e._tDur,t),c=$t(a,o),e._yoyo&&c&1&&(l=1-l),c!==$t(e._tTime,o)&&(r=1-l,e.vars.repeatRefresh&&e._initted&&e.invalidate())),l!==r||_e||n||e._zTime===J||!t&&e._zTime){if(!e._initted&&tr(e,t,n,i,a))return;for(_=e._zTime,e._zTime=t||(i?J:0),i||(i=t&&!_),e.ratio=l,e._from&&(l=1-l),e._time=0,e._tTime=a,d=e._pt;d;)d.r(l,d.d),d=d._next;t<0&&oi(e,t,i,!0),e._onUpdate&&!i&&Pe(e,"onUpdate"),a&&e._repeat&&!i&&e.parent&&Pe(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===l&&(l&&lt(e,1),!i&&!_e&&(Pe(e,l?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},ul=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},Dt=function(e,t,i,n){var r=e._repeat,l=ie(t)||0,o=e._tTime/e._tDur;return o&&!n&&(e._time*=l/e._dur),e._dur=l,e._tDur=r?r<0?1e10:ie(l*(r+1)+e._rDelay*r):l,o>0&&!n&&Os(e,e._tTime=e._tDur*o),e.parent&&Ds(e),i||vt(e.parent,e),e},Yi=function(e){return e instanceof we?vt(e):Dt(e,e._dur)},hl={_start:0,endTime:Qt,totalDuration:Qt},Re=function s(e,t,i){var n=e.labels,r=e._recent||hl,l=e.duration()>=Ie?r.endTime(!1):e._dur,o,a,d;return pe(t)&&(isNaN(t)||t in n)?(a=t.charAt(0),d=t.substr(-1)==="%",o=t.indexOf("="),a==="<"||a===">"?(o>=0&&(t=t.replace(/=/,"")),(a==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(d?(o<0?r:i).totalDuration()/100:1)):o<0?(t in n||(n[t]=l),n[t]):(a=parseFloat(t.charAt(o-1)+t.substr(o+1)),d&&i&&(a=a/100*(ge(i)?i[0]:i).totalDuration()),o>1?s(e,t.substr(0,o-1),i)+a:l+a)):t==null?l:+t},zt=function(e,t,i){var n=Ke(t[1]),r=(n?2:1)+(e<2?0:1),l=t[r],o,a;if(n&&(l.duration=t[1]),l.parent=i,e){for(o=l,a=i;a&&!("immediateRender"in o);)o=a.vars.defaults||{},a=Te(a.vars.inherit)&&a.parent;l.immediateRender=Te(o.immediateRender),e<2?l.runBackwards=1:l.startAt=t[r-1]}return new ue(t[0],l,t[r+1])},ct=function(e,t){return e||e===0?t(e):t},ts=function(e,t,i){return i<e?e:i>t?t:i},me=function(e,t){return!pe(e)||!(t=tl.exec(e))?"":t[1]},fl=function(e,t,i){return ct(i,function(n){return ts(e,t,n)})},ci=[].slice,sr=function(e,t){return e&&Ve(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ve(e[0]))&&!e.nodeType&&e!==We},pl=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var r;return pe(n)&&!t||sr(n,1)?(r=i).push.apply(r,Be(n)):i.push(n)})||i},Be=function(e,t,i){return ee&&!t&&ee.selector?ee.selector(e):pe(e)&&!i&&(ri||!Ot())?ci.call((t||ki).querySelectorAll(e),0):ge(e)?pl(e,i):sr(e)?ci.call(e,0):e?[e]:[]},di=function(e){return e=Be(e)[0]||Ut("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Be(t,i.querySelectorAll?i:i===e?Ut("Invalid scope")||ki.createElement("div"):e)}},ir=function(e){return e.sort(function(){return .5-Math.random()})},nr=function(e){if(le(e))return e;var t=Ve(e)?e:{each:e},i=yt(t.ease),n=t.from||0,r=parseFloat(t.base)||0,l={},o=n>0&&n<1,a=isNaN(n)||o,d=t.axis,c=n,_=n;return pe(n)?c=_={center:.5,edges:.5,end:1}[n]||0:!o&&a&&(c=n[0],_=n[1]),function(h,m,g){var u=(g||t).length,p=l[u],y,f,v,x,b,k,w,L,S;if(!p){if(S=t.grid==="auto"?0:(t.grid||[1,Ie])[1],!S){for(w=-Ie;w<(w=g[S++].getBoundingClientRect().left)&&S<u;);S<u&&S--}for(p=l[u]=[],y=a?Math.min(S,u)*c-.5:n%S,f=S===Ie?0:a?u*_/S-.5:n/S|0,w=0,L=Ie,k=0;k<u;k++)v=k%S-y,x=f-(k/S|0),p[k]=b=d?Math.abs(d==="y"?x:v):qn(v*v+x*x),b>w&&(w=b),b<L&&(L=b);n==="random"&&ir(p),p.max=w-L,p.min=L,p.v=u=(parseFloat(t.amount)||parseFloat(t.each)*(S>u?u-1:d?d==="y"?u/S:S:Math.max(S,u/S))||0)*(n==="edges"?-1:1),p.b=u<0?r-u:r,p.u=me(t.amount||t.each)||0,i=i&&u<0?Cl(i):i}return u=(p[h]-p.min)/p.max||0,ie(p.b+(i?i(u):u)*p.v)+p.u}},ui=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=ie(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(Ke(i)?0:me(i))}},rr=function(e,t){var i=ge(e),n,r;return!i&&Ve(e)&&(n=i=e.radius||Ie,e.values?(e=Be(e.values),(r=!Ke(e[0]))&&(n*=n)):e=ui(e.increment)),ct(t,i?le(e)?function(l){return r=e(l),Math.abs(r-l)<=n?r:l}:function(l){for(var o=parseFloat(r?l.x:l),a=parseFloat(r?l.y:0),d=Ie,c=0,_=e.length,h,m;_--;)r?(h=e[_].x-o,m=e[_].y-a,h=h*h+m*m):h=Math.abs(e[_]-o),h<d&&(d=h,c=_);return c=!n||d<=n?e[c]:l,r||c===l||Ke(l)?c:c+me(l)}:ui(e))},lr=function(e,t,i,n){return ct(ge(e)?!t:i===!0?!!(i=0):!n,function(){return ge(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},_l=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(r,l){return l(r)},n)}},vl=function(e,t){return function(i){return e(parseFloat(i))+(t||me(i))}},yl=function(e,t,i){return ar(e,t,0,1,i)},or=function(e,t,i){return ct(i,function(n){return e[~~t(n)]})},ml=function s(e,t,i){var n=t-e;return ge(e)?or(e,s(0,e.length),t):ct(i,function(r){return(n+(r-e)%n)%n+e})},gl=function s(e,t,i){var n=t-e,r=n*2;return ge(e)?or(e,s(0,e.length-1),t):ct(i,function(l){return l=(r+(l-e)%r)%r||0,e+(l>n?r-l:l)})},Kt=function(e){return e.replace(Xr,function(t){var i=t.indexOf("[")+1,n=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(Jr);return lr(i?n:+n[0],i?0:+n[1],+n[2]||1e-5)})},ar=function(e,t,i,n,r){var l=t-e,o=n-i;return ct(r,function(a){return i+((a-e)/l*o||0)})},bl=function s(e,t,i,n){var r=isNaN(e+t)?0:function(m){return(1-m)*e+m*t};if(!r){var l=pe(e),o={},a,d,c,_,h;if(i===!0&&(n=1)&&(i=null),l)e={p:e},t={p:t};else if(ge(e)&&!ge(t)){for(c=[],_=e.length,h=_-2,d=1;d<_;d++)c.push(s(e[d-1],e[d]));_--,r=function(g){g*=_;var u=Math.min(h,~~g);return c[u](g-u)},i=t}else n||(e=Pt(ge(e)?[]:{},e));if(!c){for(a in t)Ai.call(o,e,a,"get",t[a]);r=function(g){return Oi(g,o)||(l?e.p:e)}}}return ct(i,r)},Ui=function(e,t,i){var n=e.labels,r=Ie,l,o,a;for(l in n)o=n[l]-t,o<0==!!i&&o&&r>(o=Math.abs(o))&&(a=l,r=o);return a},Pe=function(e,t,i){var n=e.vars,r=n[t],l=ee,o=e._ctx,a,d,c;if(r)return a=n[t+"Params"],d=n.callbackScope||e,i&&nt.length&&ws(),o&&(ee=o),c=a?r.apply(d,a):r.call(d),ee=l,c},qt=function(e){return lt(e),e.scrollTrigger&&e.scrollTrigger.kill(!!_e),e.progress()<1&&Pe(e,"onInterrupt"),e},Lt,cr=[],dr=function(e){if(e)if(e=!e.name&&e.default||e,Ti()||e.headless){var t=e.name,i=le(e),n=t&&!i&&e.init?function(){this._props=[]}:e,r={init:Qt,render:Oi,add:Ai,kill:Il,modifier:Rl,rawVars:0},l={targetTest:0,get:0,getSetter:Di,aliases:{},register:0};if(Ot(),e!==n){if(Ee[t])return;Ne(n,Ne(Ts(e,r),l)),Pt(n.prototype,Pt(r,Ts(e,l))),Ee[n.prop=t]=n,e.targetTest&&(vs.push(n),Li[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Vn(t,n),e.register&&e.register(Ce,n,Se)}else cr.push(e)},X=255,Ht={aqua:[0,X,X],lime:[0,X,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,X],navy:[0,0,128],white:[X,X,X],olive:[128,128,0],yellow:[X,X,0],orange:[X,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[X,0,0],pink:[X,192,203],cyan:[0,X,X],transparent:[X,X,X,0]},qs=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*X+.5|0},ur=function(e,t,i){var n=e?Ke(e)?[e>>16,e>>8&X,e&X]:0:Ht.black,r,l,o,a,d,c,_,h,m,g;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ht[e])n=Ht[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),l=e.charAt(2),o=e.charAt(3),e="#"+r+r+l+l+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&X,n&X,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&X,e&X]}else if(e.substr(0,3)==="hsl"){if(n=g=e.match(Wi),!t)a=+n[0]%360/360,d=+n[1]/100,c=+n[2]/100,l=c<=.5?c*(d+1):c+d-c*d,r=c*2-l,n.length>3&&(n[3]*=1),n[0]=qs(a+1/3,r,l),n[1]=qs(a,r,l),n[2]=qs(a-1/3,r,l);else if(~e.indexOf("="))return n=e.match(Gn),i&&n.length<4&&(n[3]=1),n}else n=e.match(Wi)||Ht.transparent;n=n.map(Number)}return t&&!g&&(r=n[0]/X,l=n[1]/X,o=n[2]/X,_=Math.max(r,l,o),h=Math.min(r,l,o),c=(_+h)/2,_===h?a=d=0:(m=_-h,d=c>.5?m/(2-_-h):m/(_+h),a=_===r?(l-o)/m+(l<o?6:0):_===l?(o-r)/m+2:(r-l)/m+4,a*=60),n[0]=~~(a+.5),n[1]=~~(d*100+.5),n[2]=~~(c*100+.5)),i&&n.length<4&&(n[3]=1),n},hr=function(e){var t=[],i=[],n=-1;return e.split(rt).forEach(function(r){var l=r.match(St)||[];t.push.apply(t,l),i.push(n+=l.length+1)}),t.c=i,t},Qi=function(e,t,i){var n="",r=(e+n).match(rt),l=t?"hsla(":"rgba(",o=0,a,d,c,_;if(!r)return e;if(r=r.map(function(h){return(h=ur(h,t,1))&&l+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(c=hr(e),a=i.c,a.join(n)!==c.c.join(n)))for(d=e.replace(rt,"1").split(St),_=d.length-1;o<_;o++)n+=d[o]+(~a.indexOf(o)?r.shift()||l+"0,0,0,0)":(c.length?c:r.length?r:i).shift());if(!d)for(d=e.split(rt),_=d.length-1;o<_;o++)n+=d[o]+r[o];return n+d[_]},rt=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ht)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),xl=/hsl[a]?\(/,fr=function(e){var t=e.join(" "),i;if(rt.lastIndex=0,rt.test(t))return i=xl.test(t),e[1]=Qi(e[1],i),e[0]=Qi(e[0],i,hr(e[1])),!0},Zt,Ae=function(){var s=Date.now,e=500,t=33,i=s(),n=i,r=1e3/240,l=r,o=[],a,d,c,_,h,m,g=function u(p){var y=s()-n,f=p===!0,v,x,b,k;if((y>e||y<0)&&(i+=y-t),n+=y,b=n-i,v=b-l,(v>0||f)&&(k=++_.frame,h=b-_.time*1e3,_.time=b=b/1e3,l+=v+(v>=r?4:r-v),x=1),f||(a=d(u)),x)for(m=0;m<o.length;m++)o[m](b,h,k,p)};return _={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return h/(1e3/(p||60))},wake:function(){jn&&(!ri&&Ti()&&(We=ri=window,ki=We.document||{},Oe.gsap=Ce,(We.gsapVersions||(We.gsapVersions=[])).push(Ce.version),zn(xs||We.GreenSockGlobals||!We.gsap&&We||{}),cr.forEach(dr)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,a&&_.sleep(),d=c||function(p){return setTimeout(p,l-_.time*1e3+1|0)},Zt=1,g(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(a),Zt=0,d=Qt},lagSmoothing:function(p,y){e=p||1/0,t=Math.min(y||33,e)},fps:function(p){r=1e3/(p||240),l=_.time*1e3+r},add:function(p,y,f){var v=y?function(x,b,k,w){p(x,b,k,w),_.remove(v)}:p;return _.remove(p),o[f?"unshift":"push"](v),Ot(),v},remove:function(p,y){~(y=o.indexOf(p))&&o.splice(y,1)&&m>=y&&m--},_listeners:o},_}(),Ot=function(){return!Zt&&Ae.wake()},z={},wl=/^[\d.\-M][\d.\-,\s]/,Tl=/["']/g,kl=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],r=1,l=i.length,o,a,d;r<l;r++)a=i[r],o=r!==l-1?a.lastIndexOf(","):a.length,d=a.substr(0,o),t[n]=isNaN(d)?d.replace(Tl,"").trim():+d,n=a.substr(o+1).trim();return t},Sl=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},Ll=function(e){var t=(e+"").split("("),i=z[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[kl(t[1])]:Sl(e).split(",").map(Kn)):z._CE&&wl.test(e)?z._CE("",e):i},Cl=function(e){return function(t){return 1-e(1-t)}},yt=function(e,t){return e&&(le(e)?e:z[e]||Ll(e))||t},bt=function(e,t,i,n){i===void 0&&(i=function(a){return 1-t(1-a)}),n===void 0&&(n=function(a){return a<.5?t(a*2)/2:1-t((1-a)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:n},l;return ke(e,function(o){z[o]=Oe[o]=r,z[l=o.toLowerCase()]=i;for(var a in r)z[l+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=z[o+"."+a]=r[a]}),r},pr=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Hs=function s(e,t,i){var n=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),l=r/ni*(Math.asin(1/n)||0),o=function(c){return c===1?1:n*Math.pow(2,-10*c)*Zr((c-l)*r)+1},a=e==="out"?o:e==="in"?function(d){return 1-o(1-d)}:pr(o);return r=ni/r,a.config=function(d,c){return s(e,d,c)},a},Gs=function s(e,t){t===void 0&&(t=1.70158);var i=function(l){return l?--l*l*((t+1)*l+t)+1:0},n=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:pr(i);return n.config=function(r){return s(e,r)},n};ke("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;bt(s+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});z.Linear.easeNone=z.none=z.Linear.easeIn;bt("Elastic",Hs("in"),Hs("out"),Hs());(function(s,e){var t=1/e,i=2*t,n=2.5*t,r=function(o){return o<t?s*o*o:o<i?s*Math.pow(o-1.5/e,2)+.75:o<n?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};bt("Bounce",function(l){return 1-r(1-l)},r)})(7.5625,2.75);bt("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});bt("Circ",function(s){return-(qn(1-s*s)-1)});bt("Sine",function(s){return s===1?1:-Kr(s*Ur)+1});bt("Back",Gs("in"),Gs("out"),Gs());z.SteppedEase=z.steps=Oe.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),r=t?1:0,l=1-J;return function(o){return((n*ts(0,l,o)|0)+r)*i}}};Yt.ease=z["quad.out"];ke("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Ci+=s+","+s+"Params,"});var _r=function(e,t){this.id=Qr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Un,this.set=t?t.getSetter:Di},Xt=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Dt(this,+t.duration,1,1),this.data=t.data,ee&&(this._ctx=ee,ee.data.push(this)),Zt||Ae.wake()}var e=s.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Dt(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(Ot(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Os(this,i),!r._dp||r.parent||Jn(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&je(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===J||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Qn(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Vi(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Vi(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?$t(this._tTime,r)+1:1},e.timeScale=function(i,n){if(!arguments.length)return this._rts===-J?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?ks(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-J?0:this._rts,this.totalTime(ts(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),Ds(this),ol(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ot(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==J&&(this._tTime-=J)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=ie(i);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&je(n,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Te(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ks(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=il);var n=_e;return _e=i,Ei(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),_e=n,this},e.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Yi(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,Yi(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(Re(this,i),Te(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,Te(n)),this._dur||(this._zTime=-J),this},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-J:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-J,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-J)},e.eventCallback=function(i,n,r){var l=this.vars;return arguments.length>1?(n?(l[i]=n,r&&(l[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete l[i],this):l[i]},e.then=function(i){var n=this,r=n._prom;return new Promise(function(l){var o=le(i)?i:Zn,a=function(){var c=n.then;n.then=null,r&&r(),le(o)&&(o=o(n))&&(o.then||o===n)&&(n.then=c),l(o),n.then=c};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?a():n._prom=a})},e.kill=function(){qt(this)},s}();Ne(Xt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-J,_prom:0,_ps:!1,_rts:1});var we=function(s){Fn(e,s);function e(i,n){var r;return i===void 0&&(i={}),r=s.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=Te(i.sortChildren),ne&&je(i.parent||ne,Ue(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&er(Ue(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(n,r,l){return zt(0,arguments,this),this},t.from=function(n,r,l){return zt(1,arguments,this),this},t.fromTo=function(n,r,l,o){return zt(2,arguments,this),this},t.set=function(n,r,l){return r.duration=0,r.parent=this,jt(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new ue(n,r,Re(this,l),1),this},t.call=function(n,r,l){return je(this,ue.delayedCall(0,n,r),l)},t.staggerTo=function(n,r,l,o,a,d,c){return l.duration=r,l.stagger=l.stagger||o,l.onComplete=d,l.onCompleteParams=c,l.parent=this,new ue(n,l,Re(this,a)),this},t.staggerFrom=function(n,r,l,o,a,d,c){return l.runBackwards=1,jt(l).immediateRender=Te(l.immediateRender),this.staggerTo(n,r,l,o,a,d,c)},t.staggerFromTo=function(n,r,l,o,a,d,c,_){return o.startAt=l,jt(o).immediateRender=Te(o.immediateRender),this.staggerTo(n,r,o,a,d,c,_)},t.render=function(n,r,l){var o=this._time,a=this._dirty?this.totalDuration():this._tDur,d=this._dur,c=n<=0?0:ie(n),_=this._zTime<0!=n<0&&(this._initted||!d),h,m,g,u,p,y,f,v,x,b,k,w;if(this!==ne&&c>a&&n>=0&&(c=a),c!==this._tTime||l||_){if(o!==this._time&&d&&(c+=this._time-o,n+=this._time-o),h=c,x=this._start,v=this._ts,y=!v,_&&(d||(o=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(k=this._yoyo,p=d+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(p*100+n,r,l);if(h=ie(c%p),c===a?(u=this._repeat,h=d):(b=ie(c/p),u=~~b,u&&u===b&&(h=d,u--),h>d&&(h=d)),b=$t(this._tTime,p),!o&&this._tTime&&b!==u&&this._tTime-b*p-this._dur<=0&&(b=u),k&&u&1&&(h=d-h,w=1),u!==b&&!this._lock){var L=k&&b&1,S=L===(k&&u&1);if(u<b&&(L=!L),o=L?0:c%d?d:c,this._lock=1,this.render(o||(w?0:ie(u*p)),r,!d)._lock=0,this._tTime=c,!r&&this.parent&&Pe(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,b=u),o&&o!==this._time||y!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(d=this._dur,a=this._tDur,S&&(this._lock=2,o=L?d:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!y)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(f=ul(this,ie(o),ie(h)),f&&(c-=h-(h=f._start))),this._tTime=c,this._time=h,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&c&&d&&!r&&!b&&(Pe(this,"onStart"),this._tTime!==c))return this;if(h>=o&&n>=0)for(m=this._first;m;){if(g=m._next,(m._act||h>=m._start)&&m._ts&&f!==m){if(m.parent!==this)return this.render(n,r,l);if(m.render(m._ts>0?(h-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(h-m._start)*m._ts,r,l),h!==this._time||!this._ts&&!y){f=0,g&&(c+=this._zTime=-J);break}}m=g}else{m=this._last;for(var M=n<0?n:h;m;){if(g=m._prev,(m._act||M<=m._end)&&m._ts&&f!==m){if(m.parent!==this)return this.render(n,r,l);if(m.render(m._ts>0?(M-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(M-m._start)*m._ts,r,l||_e&&Ei(m)),h!==this._time||!this._ts&&!y){f=0,g&&(c+=this._zTime=M?-J:J);break}}m=g}}if(f&&!r&&(this.pause(),f.render(h>=o?0:-J)._zTime=h>=o?1:-1,this._ts))return this._start=x,Ds(this),this.render(n,r,l);this._onUpdate&&!r&&Pe(this,"onUpdate",!0),(c===a&&this._tTime>=this.totalDuration()||!c&&o)&&(x===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((n||!d)&&(c===a&&this._ts>0||!c&&this._ts<0)&&lt(this,1),!r&&!(n<0&&!o)&&(c||o||!a)&&(Pe(this,c===a&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<a&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,r){var l=this;if(Ke(r)||(r=Re(this,r,n)),!(n instanceof Xt)){if(ge(n))return n.forEach(function(o){return l.add(o,r)}),this;if(pe(n))return this.addLabel(n,r);if(le(n))n=ue.delayedCall(0,n);else return this}return this!==n?je(this,n,r):this},t.getChildren=function(n,r,l,o){n===void 0&&(n=!0),r===void 0&&(r=!0),l===void 0&&(l=!0),o===void 0&&(o=-Ie);for(var a=[],d=this._first;d;)d._start>=o&&(d instanceof ue?r&&a.push(d):(l&&a.push(d),n&&a.push.apply(a,d.getChildren(!0,r,l)))),d=d._next;return a},t.getById=function(n){for(var r=this.getChildren(1,1,1),l=r.length;l--;)if(r[l].vars.id===n)return r[l]},t.remove=function(n){return pe(n)?this.removeLabel(n):le(n)?this.killTweensOf(n):(n.parent===this&&$s(this,n),n===this._recent&&(this._recent=this._last),vt(this))},t.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ie(Ae.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),s.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},t.addLabel=function(n,r){return this.labels[n]=Re(this,r),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,r,l){var o=ue.delayedCall(0,r||Qt,l);return o.data="isPause",this._hasPause=1,je(this,o,Re(this,n))},t.removePause=function(n){var r=this._first;for(n=Re(this,n);r;)r._start===n&&r.data==="isPause"&&lt(r),r=r._next},t.killTweensOf=function(n,r,l){for(var o=this.getTweensOf(n,l),a=o.length;a--;)tt!==o[a]&&o[a].kill(n,r);return this},t.getTweensOf=function(n,r){for(var l=[],o=Be(n),a=this._first,d=Ke(r),c;a;)a instanceof ue?nl(a._targets,o)&&(d?(!tt||a._initted&&a._ts)&&a.globalTime(0)<=r&&a.globalTime(a.totalDuration())>r:!r||a.isActive())&&l.push(a):(c=a.getTweensOf(o,r)).length&&l.push.apply(l,c),a=a._next;return l},t.tweenTo=function(n,r){r=r||{};var l=this,o=Re(l,n),a=r,d=a.startAt,c=a.onStart,_=a.onStartParams,h=a.immediateRender,m,g=ue.to(l,Ne({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale())||J,onStart:function(){if(l.pause(),!m){var p=r.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale());g._dur!==p&&Dt(g,p,0,1).render(g._time,!0,!0),m=1}c&&c.apply(g,_||[])}},r));return h?g.render(0):g},t.tweenFromTo=function(n,r,l){return this.tweenTo(r,Ne({startAt:{time:Re(this,n)}},l))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),Ui(this,Re(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),Ui(this,Re(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+J)},t.shiftChildren=function(n,r,l){l===void 0&&(l=0);var o=this._first,a=this.labels,d;for(n=ie(n);o;)o._start>=l&&(o._start+=n,o._end+=n),o=o._next;if(r)for(d in a)a[d]>=l&&(a[d]+=n);return vt(this)},t.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return s.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,l;r;)l=r._next,this.remove(r),r=l;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),vt(this)},t.totalDuration=function(n){var r=0,l=this,o=l._last,a=Ie,d,c,_;if(arguments.length)return l.timeScale((l._repeat<0?l.duration():l.totalDuration())/(l.reversed()?-n:n));if(l._dirty){for(_=l.parent;o;)d=o._prev,o._dirty&&o.totalDuration(),c=o._start,c>a&&l._sort&&o._ts&&!l._lock?(l._lock=1,je(l,o,c-o._delay,1)._lock=0):a=c,c<0&&o._ts&&(r-=c,(!_&&!l._dp||_&&_.smoothChildTiming)&&(l._start+=ie(c/l._ts),l._time-=c,l._tTime-=c),l.shiftChildren(-c,!1,-1/0),a=0),o._end>r&&o._ts&&(r=o._end),o=d;Dt(l,l===ne&&l._time>r?l._time:r,1,1),l._dirty=0}return l._tDur},e.updateRoot=function(n){if(ne._ts&&(Qn(ne,ks(n,ne)),Yn=Ae.frame),Ae.frame>=ji){ji+=De.autoSleep||120;var r=ne._first;if((!r||!r._ts)&&De.autoSleep&&Ae._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Ae.sleep()}}},e}(Xt);Ne(we.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ml=function(e,t,i,n,r,l,o){var a=new Se(this._pt,e,t,0,1,xr,null,r),d=0,c=0,_,h,m,g,u,p,y,f;for(a.b=i,a.e=n,i+="",n+="",(y=~n.indexOf("random("))&&(n=Kt(n)),l&&(f=[i,n],l(f,e,t),i=f[0],n=f[1]),h=i.match(Bs)||[];_=Bs.exec(n);)g=_[0],u=n.substring(d,_.index),m?m=(m+1)%5:u.substr(-5)==="rgba("&&(m=1),g!==h[c++]&&(p=parseFloat(h[c-1])||0,a._pt={_next:a._pt,p:u||c===1?u:",",s:p,c:g.charAt(1)==="="?Ct(p,g)-p:parseFloat(g)-p,m:m&&m<4?Math.round:0},d=Bs.lastIndex);return a.c=d<n.length?n.substring(d,n.length):"",a.fp=o,(Wn.test(n)||y)&&(a.e=0),this._pt=a,a},Ai=function(e,t,i,n,r,l,o,a,d,c){le(n)&&(n=n(r||0,e,l));var _=e[t],h=i!=="get"?i:le(_)?d?e[t.indexOf("set")||!le(e["get"+t.substr(3)])?t:"get"+t.substr(3)](d):e[t]():_,m=le(_)?d?Dl:gr:$i,g;if(pe(n)&&(~n.indexOf("random(")&&(n=Kt(n)),n.charAt(1)==="="&&(g=Ct(h,n)+(me(h)||0),(g||g===0)&&(n=g))),!c||h!==n||hi)return!isNaN(h*n)&&n!==""?(g=new Se(this._pt,e,t,+h||0,n-(h||0),typeof _=="boolean"?Nl:br,0,m),d&&(g.fp=d),o&&g.modifier(o,this,e),this._pt=g):(!_&&!(t in e)&&Si(t,n),Ml.call(this,e,t,h,n,m,a||De.stringFilter,d))},El=function(e,t,i,n,r){if(le(e)&&(e=Vt(e,r,t,i,n)),!Ve(e)||e.style&&e.nodeType||ge(e)||Hn(e))return pe(e)?Vt(e,r,t,i,n):e;var l={},o;for(o in e)l[o]=Vt(e[o],r,t,i,n);return l},vr=function(e,t,i,n,r,l){var o,a,d,c;if(Ee[e]&&(o=new Ee[e]).init(r,o.rawVars?t[e]:El(t[e],n,r,l,i),i,n,l)!==!1&&(i._pt=a=new Se(i._pt,r,e,0,1,o.render,o,0,o.priority),i!==Lt))for(d=i._ptLookup[i._targets.indexOf(r)],c=o._props.length;c--;)d[o._props[c]]=a;return o},tt,hi,Pi=function s(e,t,i){var n=e.vars,r=n.ease,l=n.startAt,o=n.immediateRender,a=n.lazy,d=n.onUpdate,c=n.runBackwards,_=n.yoyoEase,h=n.keyframes,m=n.autoRevert,g=e._dur,u=e._startAt,p=e._targets,y=e.parent,f=y&&y.data==="nested"?y.vars.targets:p,v=e._overwrite==="auto"&&!xi,x=e.timeline,b=n.easeReverse||_,k,w,L,S,M,A,$,N,B,H,q,W,U;if(x&&(!h||!r)&&(r="none"),e._ease=yt(r,Yt.ease),e._rEase=b&&(yt(b)||e._ease),e._from=!x&&!!n.runBackwards,e._from&&(e.ratio=1),!x||h&&!n.stagger){if(N=p[0]?_t(p[0]).harness:0,W=N&&n[N.prop],k=Ts(n,Li),u&&(u._zTime<0&&u.progress(1),t<0&&c&&o&&!m?u.render(-1,!0):u.revert(c&&g?_s:sl),u._lazy=0),l){if(lt(e._startAt=ue.set(p,Ne({data:"isStart",overwrite:!1,parent:y,immediateRender:!0,lazy:!u&&Te(a),startAt:null,delay:0,onUpdate:d&&function(){return Pe(e,"onUpdate")},stagger:0},l))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_e||!o&&!m)&&e._startAt.revert(_s),o&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&g&&!u){if(t&&(o=!1),L=Ne({overwrite:!1,data:"isFromStart",lazy:o&&!u&&Te(a),immediateRender:o,stagger:0,parent:y},k),W&&(L[N.prop]=W),lt(e._startAt=ue.set(p,L)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_e?e._startAt.revert(_s):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,J,J);else if(!t)return}for(e._pt=e._ptCache=0,a=g&&Te(a)||a&&!g,w=0;w<p.length;w++){if(M=p[w],$=M._gsap||Mi(p)[w]._gsap,e._ptLookup[w]=H={},li[$.id]&&nt.length&&ws(),q=f===p?w:f.indexOf(M),N&&(B=new N).init(M,W||k,e,q,f)!==!1&&(e._pt=S=new Se(e._pt,M,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(be){H[be]=S}),B.priority&&(A=1)),!N||W)for(L in k)Ee[L]&&(B=vr(L,k,e,q,M,f))?B.priority&&(A=1):H[L]=S=Ai.call(e,M,L,"get",k[L],q,f,0,n.stringFilter);e._op&&e._op[w]&&e.kill(M,e._op[w]),v&&e._pt&&(tt=e,ne.killTweensOf(M,H,e.globalTime(t)),U=!e.parent,tt=0),e._pt&&a&&(li[$.id]=1)}A&&wr(e),e._onInit&&e._onInit(e)}e._onUpdate=d,e._initted=(!e._op||e._pt)&&!U,h&&t<=0&&x.render(Ie,!0,!0)},Al=function(e,t,i,n,r,l,o,a){var d=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,_,h,m;if(!d)for(d=e._ptCache[t]=[],h=e._ptLookup,m=e._targets.length;m--;){if(c=h[m][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return hi=1,e.vars[t]="+=0",Pi(e,o),hi=0,a?Ut(t+" not eligible for reset. Try splitting into individual properties"):1;d.push(c)}for(m=d.length;m--;)_=d[m],c=_._pt||_,c.s=(n||n===0)&&!r?n:c.s+(n||0)+l*c.c,c.c=i-c.s,_.e&&(_.e=ae(i)+me(_.e)),_.b&&(_.b=c.s+me(_.b))},Pl=function(e,t){var i=e[0]?_t(e[0]).harness:0,n=i&&i.aliases,r,l,o,a;if(!n)return t;r=Pt({},t);for(l in n)if(l in r)for(a=n[l].split(","),o=a.length;o--;)r[a[o]]=r[l];return r},$l=function(e,t,i,n){var r=t.ease||n||"power1.inOut",l,o;if(ge(t))o=i[e]||(i[e]=[]),t.forEach(function(a,d){return o.push({t:d/(t.length-1)*100,v:a,e:r})});else for(l in t)o=i[l]||(i[l]=[]),l==="ease"||o.push({t:parseFloat(e),v:t[l],e:r})},Vt=function(e,t,i,n,r){return le(e)?e.call(t,i,n,r):pe(e)&&~e.indexOf("random(")?Kt(e):e},yr=Ci+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",mr={};ke(yr+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return mr[s]=1});var ue=function(s){Fn(e,s);function e(i,n,r,l){var o;typeof n=="number"&&(r.duration=n,n=r,r=null),o=s.call(this,l?n:jt(n))||this;var a=o.vars,d=a.duration,c=a.delay,_=a.immediateRender,h=a.stagger,m=a.overwrite,g=a.keyframes,u=a.defaults,p=a.scrollTrigger,y=n.parent||ne,f=(ge(i)||Hn(i)?Ke(i[0]):"length"in n)?[i]:Be(i),v,x,b,k,w,L,S,M;if(o._targets=f.length?Mi(f):Ut("GSAP target "+i+" not found. https://gsap.com",!De.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=m,g||h||ns(d)||ns(c)){n=o.vars;var A=n.easeReverse||n.yoyoEase;if(v=o.timeline=new we({data:"nested",defaults:u||{},targets:y&&y.data==="nested"?y.vars.targets:f}),v.kill(),v.parent=v._dp=Ue(o),v._start=0,h||ns(d)||ns(c)){if(k=f.length,S=h&&nr(h),Ve(h))for(w in h)~yr.indexOf(w)&&(M||(M={}),M[w]=h[w]);for(x=0;x<k;x++)b=Ts(n,mr),b.stagger=0,A&&(b.easeReverse=A),M&&Pt(b,M),L=f[x],b.duration=+Vt(d,Ue(o),x,L,f),b.delay=(+Vt(c,Ue(o),x,L,f)||0)-o._delay,!h&&k===1&&b.delay&&(o._delay=c=b.delay,o._start+=c,b.delay=0),v.to(L,b,S?S(x,L,f):0),v._ease=z.none;v.duration()?d=c=0:o.timeline=0}else if(g){jt(Ne(v.vars.defaults,{ease:"none"})),v._ease=yt(g.ease||n.ease||"none");var $=0,N,B,H;if(ge(g))g.forEach(function(q){return v.to(f,q,">")}),v.duration();else{b={};for(w in g)w==="ease"||w==="easeEach"||$l(w,g[w],b,g.easeEach);for(w in b)for(N=b[w].sort(function(q,W){return q.t-W.t}),$=0,x=0;x<N.length;x++)B=N[x],H={ease:B.e,duration:(B.t-(x?N[x-1].t:0))/100*d},H[w]=B.v,v.to(f,H,$),$+=H.duration;v.duration()<d&&v.to({},{duration:d-v.duration()})}}d||o.duration(d=v.duration())}else o.timeline=0;return m===!0&&!xi&&(tt=Ue(o),ne.killTweensOf(f),tt=0),je(y,Ue(o),r),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(_||!d&&!g&&o._start===ie(y._time)&&Te(_)&&al(Ue(o))&&y.data!=="nested")&&(o._tTime=-J,o.render(Math.max(0,-c)||0)),p&&er(Ue(o),p),o}var t=e.prototype;return t.render=function(n,r,l){var o=this._time,a=this._tDur,d=this._dur,c=n<0,_=n>a-J&&!c?a:n<J?0:n,h,m,g,u,p,y,f,v;if(!d)dl(this,n,r,l);else if(_!==this._tTime||!n||l||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(h=_,v=this.timeline,this._repeat){if(u=d+this._rDelay,this._repeat<-1&&c)return this.totalTime(u*100+n,r,l);if(h=ie(_%u),_===a?(g=this._repeat,h=d):(p=ie(_/u),g=~~p,g&&g===p?(h=d,g--):h>d&&(h=d)),y=this._yoyo&&g&1,y&&(h=d-h),p=$t(this._tTime,u),h===o&&!l&&this._initted&&g===p)return this._tTime=_,this;g!==p&&this.vars.repeatRefresh&&!y&&!this._lock&&h!==u&&this._initted&&(this._lock=l=1,this.render(ie(u*g),!0).invalidate()._lock=0)}if(!this._initted){if(tr(this,c?n:h,l,r,_))return this._tTime=0,this;if(o!==this._time&&!(l&&this.vars.repeatRefresh&&g!==p))return this;if(d!==this._dur)return this.render(n,r,l)}if(this._rEase){var x=h<o;if(x!==this._inv){var b=x?o:d-o;this._inv=x,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=b?(x?-1:1)/b:0,this._invScale=x?-this.ratio:1-this.ratio,this._invEase=x?this._rEase:this._ease}this.ratio=f=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=f=this._ease(h/d);if(this._from&&(this.ratio=f=1-f),this._tTime=_,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&_&&!r&&!p&&(Pe(this,"onStart"),this._tTime!==_))return this;for(m=this._pt;m;)m.r(f,m.d),m=m._next;v&&v.render(n<0?n:v._dur*v._ease(h/this._dur),r,l)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(c&&oi(this,n,r,l),Pe(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!r&&this.parent&&Pe(this,"onRepeat"),(_===this._tDur||!_)&&this._tTime===_&&(c&&!this._onUpdate&&oi(this,n,!0,!0),(n||!d)&&(_===this._tDur&&this._ts>0||!_&&this._ts<0)&&lt(this,1),!r&&!(c&&!o)&&(_||o||y)&&(Pe(this,_===a?"onComplete":"onReverseComplete",!0),this._prom&&!(_<a&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),s.prototype.invalidate.call(this,n)},t.resetTo=function(n,r,l,o,a){Zt||Ae.wake(),this._ts||this.play();var d=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||Pi(this,d),c=this._ease(d/this._dur),Al(this,n,r,l,o,c,d,a)?this.resetTo(n,r,l,o,1):(Os(this,0),this.parent||Xn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?qt(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_e),this;if(this.timeline){var l=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,tt&&tt.vars.overwrite!==!0)._first||qt(this),this.parent&&l!==this.timeline.totalDuration()&&Dt(this,this._dur*this.timeline._tDur/l,0,1),this}var o=this._targets,a=n?Be(n):o,d=this._ptLookup,c=this._pt,_,h,m,g,u,p,y;if((!r||r==="all")&&ll(o,a))return r==="all"&&(this._pt=0),qt(this);for(_=this._op=this._op||[],r!=="all"&&(pe(r)&&(u={},ke(r,function(f){return u[f]=1}),r=u),r=Pl(o,r)),y=o.length;y--;)if(~a.indexOf(o[y])){h=d[y],r==="all"?(_[y]=r,g=h,m={}):(m=_[y]=_[y]||{},g=r);for(u in g)p=h&&h[u],p&&((!("kill"in p.d)||p.d.kill(u)===!0)&&$s(this,p,"_pt"),delete h[u]),m!=="all"&&(m[u]=1)}return this._initted&&!this._pt&&c&&qt(this),this},e.to=function(n,r){return new e(n,r,arguments[2])},e.from=function(n,r){return zt(1,arguments)},e.delayedCall=function(n,r,l,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:l,onReverseCompleteParams:l,callbackScope:o})},e.fromTo=function(n,r,l){return zt(2,arguments)},e.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(n,r)},e.killTweensOf=function(n,r,l){return ne.killTweensOf(n,r,l)},e}(Xt);Ne(ue.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ke("staggerTo,staggerFrom,staggerFromTo",function(s){ue[s]=function(){var e=new we,t=ci.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var $i=function(e,t,i){return e[t]=i},gr=function(e,t,i){return e[t](i)},Dl=function(e,t,i,n){return e[t](n.fp,i)},Ol=function(e,t,i){return e.setAttribute(t,i)},Di=function(e,t){return le(e[t])?gr:wi(e[t])&&e.setAttribute?Ol:$i},br=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Nl=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},xr=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},Oi=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Rl=function(e,t,i,n){for(var r=this._pt,l;r;)l=r._next,r.p===n&&r.modifier(e,t,i),r=l},Il=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?$s(this,t,"_pt"):t.dep||(i=1),t=n;return!i},Bl=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},wr=function(e){for(var t=e._pt,i,n,r,l;t;){for(i=t._next,n=r;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:l)?t._prev._next=t:r=t,(t._next=n)?n._prev=t:l=t,t=i}e._pt=r},Se=function(){function s(t,i,n,r,l,o,a,d,c){this.t=i,this.s=r,this.c=l,this.p=n,this.r=o||br,this.d=a||this,this.set=d||$i,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=Bl,this.m=i,this.mt=r,this.tween=n},s}();ke(Ci+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Li[s]=1});Oe.TweenMax=Oe.TweenLite=ue;Oe.TimelineLite=Oe.TimelineMax=we;ne=new we({sortChildren:!1,defaults:Yt,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});De.stringFilter=fr;var mt=[],ys={},Fl=[],Ki=0,ql=0,Ws=function(e){return(ys[e]||Fl).map(function(t){return t()})},fi=function(){var e=Date.now(),t=[];e-Ki>2&&(Ws("matchMediaInit"),mt.forEach(function(i){var n=i.queries,r=i.conditions,l,o,a,d;for(o in n)l=We.matchMedia(n[o]).matches,l&&(a=1),l!==r[o]&&(r[o]=l,d=1);d&&(i.revert(),a&&t.push(i))}),Ws("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),Ki=e,Ws("matchMedia"))},Tr=function(){function s(t,i){this.selector=i&&di(i),this.data=[],this._r=[],this.isReverted=!1,this.id=ql++,t&&this.add(t)}var e=s.prototype;return e.add=function(i,n,r){le(i)&&(r=n,n=i,i=le);var l=this,o=function(){var d=ee,c=l.selector,_;return d&&d!==l&&d.data.push(l),r&&(l.selector=di(r)),ee=l,_=n.apply(l,arguments),le(_)&&l._r.push(_),ee=d,l.selector=c,l.isReverted=!1,_};return l.last=o,i===le?o(l,function(a){return l.add(null,a)}):i?l[i]=o:o},e.ignore=function(i){var n=ee;ee=null,i(this),ee=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof s?i.push.apply(i,n.getTweens()):n instanceof ue&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var r=this;if(i?function(){for(var o=r.getTweens(),a=r.data.length,d;a--;)d=r.data[a],d.data==="isFlip"&&(d.revert(),d.getChildren(!0,!0,!1).forEach(function(c){return o.splice(o.indexOf(c),1)}));for(o.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,_){return _.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),a=r.data.length;a--;)d=r.data[a],d instanceof we?d.data!=="nested"&&(d.scrollTrigger&&d.scrollTrigger.revert(),d.kill()):!(d instanceof ue)&&d.revert&&d.revert(i);r._r.forEach(function(c){return c(i,r)}),r.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),n)for(var l=mt.length;l--;)mt[l].id===this.id&&mt.splice(l,1)},e.revert=function(i){this.kill(i||{})},s}(),Hl=function(){function s(t){this.contexts=[],this.scope=t,ee&&ee.data.push(this)}var e=s.prototype;return e.add=function(i,n,r){Ve(i)||(i={matches:i});var l=new Tr(0,r||this.scope),o=l.conditions={},a,d,c;ee&&!l.selector&&(l.selector=ee.selector),this.contexts.push(l),n=l.add("onMatch",n),l.queries=i;for(d in i)d==="all"?c=1:(a=We.matchMedia(i[d]),a&&(mt.indexOf(l)<0&&mt.push(l),(o[d]=a.matches)&&(c=1),a.addListener?a.addListener(fi):a.addEventListener("change",fi)));return c&&n(l,function(_){return l.add(null,_)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},s}(),Ss={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return dr(n)})},timeline:function(e){return new we(e)},getTweensOf:function(e,t){return ne.getTweensOf(e,t)},getProperty:function(e,t,i,n){pe(e)&&(e=Be(e)[0]);var r=_t(e||{}).get,l=i?Zn:Kn;return i==="native"&&(i=""),e&&(t?l((Ee[t]&&Ee[t].get||r)(e,t,i,n)):function(o,a,d){return l((Ee[o]&&Ee[o].get||r)(e,o,a,d))})},quickSetter:function(e,t,i){if(e=Be(e),e.length>1){var n=e.map(function(c){return Ce.quickSetter(c,t,i)}),r=n.length;return function(c){for(var _=r;_--;)n[_](c)}}e=e[0]||{};var l=Ee[t],o=_t(e),a=o.harness&&(o.harness.aliases||{})[t]||t,d=l?function(c){var _=new l;Lt._pt=0,_.init(e,i?c+i:c,Lt,0,[e]),_.render(1,_),Lt._pt&&Oi(1,Lt)}:o.set(e,a);return l?d:function(c){return d(e,a,i?c+i:c,o,1)}},quickTo:function(e,t,i){var n,r=Ce.to(e,Ne((n={},n[t]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),l=function(a,d,c){return r.resetTo(t,a,d,c)};return l.tween=r,l},isTweening:function(e){return ne.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=yt(e.ease,Yt.ease)),zi(Yt,e||{})},config:function(e){return zi(De,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,r=e.defaults,l=e.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!Ee[o]&&!Oe[o]&&Ut(t+" effect requires "+o+" plugin.")}),Fs[t]=function(o,a,d){return i(Be(o),Ne(a||{},r),d)},l&&(we.prototype[t]=function(o,a,d){return this.add(Fs[t](o,Ve(a)?a:(d=a)&&{},this),d)})},registerEase:function(e,t){z[e]=yt(t)},parseEase:function(e,t){return arguments.length?yt(e,t):z},getById:function(e){return ne.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new we(e),n,r;for(i.smoothChildTiming=Te(e.smoothChildTiming),ne.remove(i),i._dp=0,i._time=i._tTime=ne._time,n=ne._first;n;)r=n._next,(t||!(!n._dur&&n instanceof ue&&n.vars.onComplete===n._targets[0]))&&je(i,n,n._start-n._delay),n=r;return je(ne,i,0),i},context:function(e,t){return e?new Tr(e,t):ee},matchMedia:function(e){return new Hl(e)},matchMediaRefresh:function(){return mt.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||fi()},addEventListener:function(e,t){var i=ys[e]||(ys[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=ys[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:ml,wrapYoyo:gl,distribute:nr,random:lr,snap:rr,normalize:yl,getUnit:me,clamp:fl,splitColor:ur,toArray:Be,selector:di,mapRange:ar,pipe:_l,unitize:vl,interpolate:bl,shuffle:ir},install:zn,effects:Fs,ticker:Ae,updateRoot:we.updateRoot,plugins:Ee,globalTimeline:ne,core:{PropTween:Se,globals:Vn,Tween:ue,Timeline:we,Animation:Xt,getCache:_t,_removeLinkedListItem:$s,reverting:function(){return _e},context:function(e){return e&&ee&&(ee.data.push(e),e._ctx=ee),ee},suppressOverwrites:function(e){return xi=e}}};ke("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Ss[s]=ue[s]});Ae.add(we.updateRoot);Lt=Ss.to({},{duration:0});var Gl=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Wl=function(e,t){var i=e._targets,n,r,l;for(n in t)for(r=i.length;r--;)l=e._ptLookup[r][n],l&&(l=l.d)&&(l._pt&&(l=Gl(l,n)),l&&l.modifier&&l.modifier(t[n],e,i[r],n))},js=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,r,l){l._onInit=function(o){var a,d;if(pe(r)&&(a={},ke(r,function(c){return a[c]=1}),r=a),t){a={};for(d in r)a[d]=t(r[d]);r=a}Wl(o,r)}}}},Ce=Ss.registerPlugin({name:"attr",init:function(e,t,i,n,r){var l,o,a;this.tween=i;for(l in t)a=e.getAttribute(l)||"",o=this.add(e,"setAttribute",(a||0)+"",t[l],n,r,0,0,l),o.op=l,o.b=a,this._props.push(l)},render:function(e,t){for(var i=t._pt;i;)_e?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},js("roundProps",ui),js("modifiers"),js("snap",rr))||Ss;ue.version=we.version=Ce.version="3.15.0";jn=1;Ti()&&Ot();z.Power0;z.Power1;z.Power2;z.Power3;z.Power4;z.Linear;z.Quad;z.Cubic;z.Quart;z.Quint;z.Strong;z.Elastic;z.Back;z.SteppedEase;z.Bounce;z.Sine;z.Expo;z.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Zi,st,Mt,Ni,ft,Xi,Ri,jl=function(){return typeof window<"u"},Ze={},ht=180/Math.PI,Et=Math.PI/180,Tt=Math.atan2,Ji=1e8,Ii=/([A-Z])/g,zl=/(left|right|width|margin|padding|x)/i,Vl=/[\s,\(]\S/,ze={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},pi=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Yl=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Ul=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ql=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Kl=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},kr=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Sr=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Zl=function(e,t,i){return e.style[t]=i},Xl=function(e,t,i){return e.style.setProperty(t,i)},Jl=function(e,t,i){return e._gsap[t]=i},eo=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},to=function(e,t,i,n,r){var l=e._gsap;l.scaleX=l.scaleY=i,l.renderTransform(r,l)},so=function(e,t,i,n,r){var l=e._gsap;l[t]=i,l.renderTransform(r,l)},re="transform",Le=re+"Origin",io=function s(e,t){var i=this,n=this.target,r=n.style,l=n._gsap;if(e in Ze&&r){if(this.tfm=this.tfm||{},e!=="transform")e=ze[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=Qe(n,o)}):this.tfm[e]=l.x?l[e]:Qe(n,e),e===Le&&(this.tfm.zOrigin=l.zOrigin);else return ze.transform.split(",").forEach(function(o){return s.call(i,o,t)});if(this.props.indexOf(re)>=0)return;l.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(Le,t,"")),e=re}(r||t)&&this.props.push(e,t,r[e])},Lr=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},no=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,r,l;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Ii,"-$1").toLowerCase());if(this.tfm){for(l in this.tfm)n[l]=this.tfm[l];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Ri(),(!r||!r.isStart)&&!i[re]&&(Lr(i),n.zOrigin&&i[Le]&&(i[Le]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},Cr=function(e,t){var i={target:e,props:[],revert:no,save:io};return e._gsap||Ce.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(n){return i.save(n)}),i},Mr,_i=function(e,t){var i=st.createElementNS?st.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):st.createElement(e);return i&&i.style?i:st.createElement(e)},$e=function s(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(Ii,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&s(e,Nt(t)||t,1)||""},en="O,Moz,ms,Ms,Webkit".split(","),Nt=function(e,t,i){var n=t||ft,r=n.style,l=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);l--&&!(en[l]+e in r););return l<0?null:(l===3?"ms":l>=0?en[l]:"")+e},vi=function(){jl()&&window.document&&(Zi=window,st=Zi.document,Mt=st.documentElement,ft=_i("div")||{style:{}},_i("div"),re=Nt(re),Le=re+"Origin",ft.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Mr=!!Nt("perspective"),Ri=Ce.core.reverting,Ni=1)},tn=function(e){var t=e.ownerSVGElement,i=_i("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=e.cloneNode(!0),r;n.style.display="block",i.appendChild(n),Mt.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),Mt.removeChild(i),r},sn=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Er=function(e){var t,i;try{t=e.getBBox()}catch{t=tn(e),i=1}return t&&(t.width||t.height)||i||(t=tn(e)),t&&!t.width&&!t.x&&!t.y?{x:+sn(e,["x","cx","x1"])||0,y:+sn(e,["y","cy","y1"])||0,width:0,height:0}:t},Ar=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Er(e))},ot=function(e,t){if(t){var i=e.style,n;t in Ze&&t!==Le&&(t=re),i.removeProperty?(n=t.substr(0,2),(n==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(n==="--"?t:t.replace(Ii,"-$1").toLowerCase())):i.removeAttribute(t)}},it=function(e,t,i,n,r,l){var o=new Se(e._pt,t,i,0,1,l?Sr:kr);return e._pt=o,o.b=n,o.e=r,e._props.push(i),o},nn={deg:1,rad:1,turn:1},ro={grid:1,flex:1},at=function s(e,t,i,n){var r=parseFloat(i)||0,l=(i+"").trim().substr((r+"").length)||"px",o=ft.style,a=zl.test(t),d=e.tagName.toLowerCase()==="svg",c=(d?"client":"offset")+(a?"Width":"Height"),_=100,h=n==="px",m=n==="%",g,u,p,y;if(n===l||!r||nn[n]||nn[l])return r;if(l!=="px"&&!h&&(r=s(e,t,i,"px")),y=e.getCTM&&Ar(e),(m||l==="%")&&(Ze[t]||~t.indexOf("adius")))return g=y?e.getBBox()[a?"width":"height"]:e[c],ae(m?r/g*_:r/100*g);if(o[a?"width":"height"]=_+(h?l:n),u=n!=="rem"&&~t.indexOf("adius")||n==="em"&&e.appendChild&&!d?e:e.parentNode,y&&(u=(e.ownerSVGElement||{}).parentNode),(!u||u===st||!u.appendChild)&&(u=st.body),p=u._gsap,p&&m&&p.width&&a&&p.time===Ae.time&&!p.uncache)return ae(r/p.width*_);if(m&&(t==="height"||t==="width")){var f=e.style[t];e.style[t]=_+n,g=e[c],f?e.style[t]=f:ot(e,t)}else(m||l==="%")&&!ro[$e(u,"display")]&&(o.position=$e(e,"position")),u===e&&(o.position="static"),u.appendChild(ft),g=ft[c],u.removeChild(ft),o.position="absolute";return a&&m&&(p=_t(u),p.time=Ae.time,p.width=u[c]),ae(h?g*r/_:g&&r?_/g*r:0)},Qe=function(e,t,i,n){var r;return Ni||vi(),t in ze&&t!=="transform"&&(t=ze[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ze[t]&&t!=="transform"?(r=es(e,n),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Cs($e(e,Le))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=Ls[t]&&Ls[t](e,t,i)||$e(e,t)||Un(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?at(e,t,r,i)+i:r},lo=function(e,t,i,n){if(!i||i==="none"){var r=Nt(t,e,1),l=r&&$e(e,r,1);l&&l!==i?(t=r,i=l):t==="borderColor"&&(i=$e(e,"borderTopColor"))}var o=new Se(this._pt,e.style,t,0,1,xr),a=0,d=0,c,_,h,m,g,u,p,y,f,v,x,b;if(o.b=i,o.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=$e(e,n.substring(4,n.indexOf(")")))),n==="auto"&&(u=e.style[t],e.style[t]=n,n=$e(e,t)||n,u?e.style[t]=u:ot(e,t)),c=[i,n],fr(c),i=c[0],n=c[1],h=i.match(St)||[],b=n.match(St)||[],b.length){for(;_=St.exec(n);)p=_[0],f=n.substring(a,_.index),g?g=(g+1)%5:(f.substr(-5)==="rgba("||f.substr(-5)==="hsla(")&&(g=1),p!==(u=h[d++]||"")&&(m=parseFloat(u)||0,x=u.substr((m+"").length),p.charAt(1)==="="&&(p=Ct(m,p)+x),y=parseFloat(p),v=p.substr((y+"").length),a=St.lastIndex-v.length,v||(v=v||De.units[t]||x,a===n.length&&(n+=v,o.e+=v)),x!==v&&(m=at(e,t,u,v)||0),o._pt={_next:o._pt,p:f||d===1?f:",",s:m,c:y-m,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=a<n.length?n.substring(a,n.length):""}else o.r=t==="display"&&n==="none"?Sr:kr;return Wn.test(n)&&(o.e=0),this._pt=o,o},rn={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},oo=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=rn[i]||i,t[1]=rn[n]||n,t.join(" ")},ao=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,r=t.u,l=i._gsap,o,a,d;if(r==="all"||r===!0)n.cssText="",a=1;else for(r=r.split(","),d=r.length;--d>-1;)o=r[d],Ze[o]&&(a=1,o=o==="transformOrigin"?Le:re),ot(i,o);a&&(ot(i,re),l&&(l.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",es(i,1),l.uncache=1,Lr(n)))}},Ls={clearProps:function(e,t,i,n,r){if(r.data!=="isFromStart"){var l=e._pt=new Se(e._pt,t,i,0,0,ao);return l.u=n,l.pr=-10,l.tween=r,e._props.push(i),1}}},Jt=[1,0,0,1,0,0],Pr={},$r=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},ln=function(e){var t=$e(e,re);return $r(t)?Jt:t.substr(7).match(Gn).map(ae)},Bi=function(e,t){var i=e._gsap||_t(e),n=e.style,r=ln(e),l,o,a,d;return i.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,r=[a.a,a.b,a.c,a.d,a.e,a.f],r.join(",")==="1,0,0,1,0,0"?Jt:r):(r===Jt&&!e.offsetParent&&e!==Mt&&!i.svg&&(a=n.display,n.display="block",l=e.parentNode,(!l||!e.offsetParent&&!e.getBoundingClientRect().width)&&(d=1,o=e.nextElementSibling,Mt.appendChild(e)),r=ln(e),a?n.display=a:ot(e,"display"),d&&(o?l.insertBefore(e,o):l?l.appendChild(e):Mt.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},yi=function(e,t,i,n,r,l){var o=e._gsap,a=r||Bi(e,!0),d=o.xOrigin||0,c=o.yOrigin||0,_=o.xOffset||0,h=o.yOffset||0,m=a[0],g=a[1],u=a[2],p=a[3],y=a[4],f=a[5],v=t.split(" "),x=parseFloat(v[0])||0,b=parseFloat(v[1])||0,k,w,L,S;i?a!==Jt&&(w=m*p-g*u)&&(L=x*(p/w)+b*(-u/w)+(u*f-p*y)/w,S=x*(-g/w)+b*(m/w)-(m*f-g*y)/w,x=L,b=S):(k=Er(e),x=k.x+(~v[0].indexOf("%")?x/100*k.width:x),b=k.y+(~(v[1]||v[0]).indexOf("%")?b/100*k.height:b)),n||n!==!1&&o.smooth?(y=x-d,f=b-c,o.xOffset=_+(y*m+f*u)-y,o.yOffset=h+(y*g+f*p)-f):o.xOffset=o.yOffset=0,o.xOrigin=x,o.yOrigin=b,o.smooth=!!n,o.origin=t,o.originIsAbsolute=!!i,e.style[Le]="0px 0px",l&&(it(l,o,"xOrigin",d,x),it(l,o,"yOrigin",c,b),it(l,o,"xOffset",_,o.xOffset),it(l,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",x+" "+b)},es=function(e,t){var i=e._gsap||new _r(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,r=i.scaleX<0,l="px",o="deg",a=getComputedStyle(e),d=$e(e,Le)||"0",c,_,h,m,g,u,p,y,f,v,x,b,k,w,L,S,M,A,$,N,B,H,q,W,U,be,C,T,E,P,D,R;return c=_=h=u=p=y=f=v=x=0,m=g=1,i.svg=!!(e.getCTM&&Ar(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(n[re]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[re]!=="none"?a[re]:"")),n.scale=n.rotate=n.translate="none"),w=Bi(e,i.svg),i.svg&&(i.uncache?(U=e.getBBox(),d=i.xOrigin-U.x+"px "+(i.yOrigin-U.y)+"px",W=""):W=!t&&e.getAttribute("data-svg-origin"),yi(e,W||d,!!W||i.originIsAbsolute,i.smooth!==!1,w)),b=i.xOrigin||0,k=i.yOrigin||0,w!==Jt&&(A=w[0],$=w[1],N=w[2],B=w[3],c=H=w[4],_=q=w[5],w.length===6?(m=Math.sqrt(A*A+$*$),g=Math.sqrt(B*B+N*N),u=A||$?Tt($,A)*ht:0,f=N||B?Tt(N,B)*ht+u:0,f&&(g*=Math.abs(Math.cos(f*Et))),i.svg&&(c-=b-(b*A+k*N),_-=k-(b*$+k*B))):(R=w[6],P=w[7],C=w[8],T=w[9],E=w[10],D=w[11],c=w[12],_=w[13],h=w[14],L=Tt(R,E),p=L*ht,L&&(S=Math.cos(-L),M=Math.sin(-L),W=H*S+C*M,U=q*S+T*M,be=R*S+E*M,C=H*-M+C*S,T=q*-M+T*S,E=R*-M+E*S,D=P*-M+D*S,H=W,q=U,R=be),L=Tt(-N,E),y=L*ht,L&&(S=Math.cos(-L),M=Math.sin(-L),W=A*S-C*M,U=$*S-T*M,be=N*S-E*M,D=B*M+D*S,A=W,$=U,N=be),L=Tt($,A),u=L*ht,L&&(S=Math.cos(L),M=Math.sin(L),W=A*S+$*M,U=H*S+q*M,$=$*S-A*M,q=q*S-H*M,A=W,H=U),p&&Math.abs(p)+Math.abs(u)>359.9&&(p=u=0,y=180-y),m=ae(Math.sqrt(A*A+$*$+N*N)),g=ae(Math.sqrt(q*q+R*R)),L=Tt(H,q),f=Math.abs(L)>2e-4?L*ht:0,x=D?1/(D<0?-D:D):0),i.svg&&(W=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!$r($e(e,re)),W&&e.setAttribute("transform",W))),Math.abs(f)>90&&Math.abs(f)<270&&(r?(m*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(g*=-1,f+=f<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+l,i.y=_-((i.yPercent=_&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-_)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+l,i.z=h+l,i.scaleX=ae(m),i.scaleY=ae(g),i.rotation=ae(u)+o,i.rotationX=ae(p)+o,i.rotationY=ae(y)+o,i.skewX=f+o,i.skewY=v+o,i.transformPerspective=x+l,(i.zOrigin=parseFloat(d.split(" ")[2])||!t&&i.zOrigin||0)&&(n[Le]=Cs(d)),i.xOffset=i.yOffset=0,i.force3D=De.force3D,i.renderTransform=i.svg?uo:Mr?Dr:co,i.uncache=0,i},Cs=function(e){return(e=e.split(" "))[0]+" "+e[1]},zs=function(e,t,i){var n=me(t);return ae(parseFloat(t)+parseFloat(at(e,"x",i+"px",n)))+n},co=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Dr(e,t)},dt="0deg",Rt="0px",ut=") ",Dr=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,l=i.x,o=i.y,a=i.z,d=i.rotation,c=i.rotationY,_=i.rotationX,h=i.skewX,m=i.skewY,g=i.scaleX,u=i.scaleY,p=i.transformPerspective,y=i.force3D,f=i.target,v=i.zOrigin,x="",b=y==="auto"&&e&&e!==1||y===!0;if(v&&(_!==dt||c!==dt)){var k=parseFloat(c)*Et,w=Math.sin(k),L=Math.cos(k),S;k=parseFloat(_)*Et,S=Math.cos(k),l=zs(f,l,w*S*-v),o=zs(f,o,-Math.sin(k)*-v),a=zs(f,a,L*S*-v+v)}p!==Rt&&(x+="perspective("+p+ut),(n||r)&&(x+="translate("+n+"%, "+r+"%) "),(b||l!==Rt||o!==Rt||a!==Rt)&&(x+=a!==Rt||b?"translate3d("+l+", "+o+", "+a+") ":"translate("+l+", "+o+ut),d!==dt&&(x+="rotate("+d+ut),c!==dt&&(x+="rotateY("+c+ut),_!==dt&&(x+="rotateX("+_+ut),(h!==dt||m!==dt)&&(x+="skew("+h+", "+m+ut),(g!==1||u!==1)&&(x+="scale("+g+", "+u+ut),f.style[re]=x||"translate(0, 0)"},uo=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,l=i.x,o=i.y,a=i.rotation,d=i.skewX,c=i.skewY,_=i.scaleX,h=i.scaleY,m=i.target,g=i.xOrigin,u=i.yOrigin,p=i.xOffset,y=i.yOffset,f=i.forceCSS,v=parseFloat(l),x=parseFloat(o),b,k,w,L,S;a=parseFloat(a),d=parseFloat(d),c=parseFloat(c),c&&(c=parseFloat(c),d+=c,a+=c),a||d?(a*=Et,d*=Et,b=Math.cos(a)*_,k=Math.sin(a)*_,w=Math.sin(a-d)*-h,L=Math.cos(a-d)*h,d&&(c*=Et,S=Math.tan(d-c),S=Math.sqrt(1+S*S),w*=S,L*=S,c&&(S=Math.tan(c),S=Math.sqrt(1+S*S),b*=S,k*=S)),b=ae(b),k=ae(k),w=ae(w),L=ae(L)):(b=_,L=h,k=w=0),(v&&!~(l+"").indexOf("px")||x&&!~(o+"").indexOf("px"))&&(v=at(m,"x",l,"px"),x=at(m,"y",o,"px")),(g||u||p||y)&&(v=ae(v+g-(g*b+u*w)+p),x=ae(x+u-(g*k+u*L)+y)),(n||r)&&(S=m.getBBox(),v=ae(v+n/100*S.width),x=ae(x+r/100*S.height)),S="matrix("+b+","+k+","+w+","+L+","+v+","+x+")",m.setAttribute("transform",S),f&&(m.style[re]=S)},ho=function(e,t,i,n,r){var l=360,o=pe(r),a=parseFloat(r)*(o&&~r.indexOf("rad")?ht:1),d=a-n,c=n+d+"deg",_,h;return o&&(_=r.split("_")[1],_==="short"&&(d%=l,d!==d%(l/2)&&(d+=d<0?l:-l)),_==="cw"&&d<0?d=(d+l*Ji)%l-~~(d/l)*l:_==="ccw"&&d>0&&(d=(d-l*Ji)%l-~~(d/l)*l)),e._pt=h=new Se(e._pt,t,i,n,d,Yl),h.e=c,h.u="deg",e._props.push(i),h},on=function(e,t){for(var i in t)e[i]=t[i];return e},fo=function(e,t,i){var n=on({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",l=i.style,o,a,d,c,_,h,m,g;n.svg?(d=i.getAttribute("transform"),i.setAttribute("transform",""),l[re]=t,o=es(i,1),ot(i,re),i.setAttribute("transform",d)):(d=getComputedStyle(i)[re],l[re]=t,o=es(i,1),l[re]=d);for(a in Ze)d=n[a],c=o[a],d!==c&&r.indexOf(a)<0&&(m=me(d),g=me(c),_=m!==g?at(i,a,d,g):parseFloat(d),h=parseFloat(c),e._pt=new Se(e._pt,o,a,_,h-_,pi),e._pt.u=g||0,e._props.push(a));on(o,n)};ke("padding,margin,Width,Radius",function(s,e){var t="Top",i="Right",n="Bottom",r="Left",l=(e<3?[t,i,n,r]:[t+r,t+i,n+i,n+r]).map(function(o){return e<2?s+o:"border"+o+s});Ls[e>1?"border"+s:s]=function(o,a,d,c,_){var h,m;if(arguments.length<4)return h=l.map(function(g){return Qe(o,g,d)}),m=h.join(" "),m.split(h[0]).length===5?h[0]:m;h=(c+"").split(" "),m={},l.forEach(function(g,u){return m[g]=h[u]=h[u]||h[(u-1)/2|0]}),o.init(a,m,_)}});var Or={name:"css",register:vi,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,r){var l=this._props,o=e.style,a=i.vars.startAt,d,c,_,h,m,g,u,p,y,f,v,x,b,k,w,L,S;Ni||vi(),this.styles=this.styles||Cr(e),L=this.styles.props,this.tween=i;for(u in t)if(u!=="autoRound"&&(c=t[u],!(Ee[u]&&vr(u,t,i,n,e,r)))){if(m=typeof c,g=Ls[u],m==="function"&&(c=c.call(i,n,e,r),m=typeof c),m==="string"&&~c.indexOf("random(")&&(c=Kt(c)),g)g(this,e,u,c,i)&&(w=1);else if(u.substr(0,2)==="--")d=(getComputedStyle(e).getPropertyValue(u)+"").trim(),c+="",rt.lastIndex=0,rt.test(d)||(p=me(d),y=me(c),y?p!==y&&(d=at(e,u,d,y)+y):p&&(c+=p)),this.add(o,"setProperty",d,c,n,r,0,0,u),l.push(u),L.push(u,0,o[u]);else if(m!=="undefined"){if(a&&u in a?(d=typeof a[u]=="function"?a[u].call(i,n,e,r):a[u],pe(d)&&~d.indexOf("random(")&&(d=Kt(d)),me(d+"")||d==="auto"||(d+=De.units[u]||me(Qe(e,u))||""),(d+"").charAt(1)==="="&&(d=Qe(e,u))):d=Qe(e,u),h=parseFloat(d),f=m==="string"&&c.charAt(1)==="="&&c.substr(0,2),f&&(c=c.substr(2)),_=parseFloat(c),u in ze&&(u==="autoAlpha"&&(h===1&&Qe(e,"visibility")==="hidden"&&_&&(h=0),L.push("visibility",0,o.visibility),it(this,o,"visibility",h?"inherit":"hidden",_?"inherit":"hidden",!_)),u!=="scale"&&u!=="transform"&&(u=ze[u],~u.indexOf(",")&&(u=u.split(",")[0]))),v=u in Ze,v){if(this.styles.save(u),S=c,m==="string"&&c.substring(0,6)==="var(--"){if(c=$e(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var M=e.style.perspective;e.style.perspective=c,c=$e(e,"perspective"),M?e.style.perspective=M:ot(e,"perspective")}_=parseFloat(c)}if(x||(b=e._gsap,b.renderTransform&&!t.parseTransform||es(e,t.parseTransform),k=t.smoothOrigin!==!1&&b.smooth,x=this._pt=new Se(this._pt,o,re,0,1,b.renderTransform,b,0,-1),x.dep=1),u==="scale")this._pt=new Se(this._pt,b,"scaleY",b.scaleY,(f?Ct(b.scaleY,f+_):_)-b.scaleY||0,pi),this._pt.u=0,l.push("scaleY",u),u+="X";else if(u==="transformOrigin"){L.push(Le,0,o[Le]),c=oo(c),b.svg?yi(e,c,0,k,0,this):(y=parseFloat(c.split(" ")[2])||0,y!==b.zOrigin&&it(this,b,"zOrigin",b.zOrigin,y),it(this,o,u,Cs(d),Cs(c)));continue}else if(u==="svgOrigin"){yi(e,c,1,k,0,this);continue}else if(u in Pr){ho(this,b,u,h,f?Ct(h,f+c):c);continue}else if(u==="smoothOrigin"){it(this,b,"smooth",b.smooth,c);continue}else if(u==="force3D"){b[u]=c;continue}else if(u==="transform"){fo(this,c,e);continue}}else u in o||(u=Nt(u)||u);if(v||(_||_===0)&&(h||h===0)&&!Vl.test(c)&&u in o)p=(d+"").substr((h+"").length),_||(_=0),y=me(c)||(u in De.units?De.units[u]:p),p!==y&&(h=at(e,u,d,y)),this._pt=new Se(this._pt,v?b:o,u,h,(f?Ct(h,f+_):_)-h,!v&&(y==="px"||u==="zIndex")&&t.autoRound!==!1?Kl:pi),this._pt.u=y||0,v&&S!==c?(this._pt.b=d,this._pt.e=S,this._pt.r=Ql):p!==y&&y!=="%"&&(this._pt.b=d,this._pt.r=Ul);else if(u in o)lo.call(this,e,u,d,f?f+c:c);else if(u in e)this.add(e,u,d||e[u],f?f+c:c,n,r);else if(u!=="parseTransform"){Si(u,c);continue}v||(u in o?L.push(u,0,o[u]):typeof e[u]=="function"?L.push(u,2,e[u]()):L.push(u,1,d||e[u])),l.push(u)}}w&&wr(this)},render:function(e,t){if(t.tween._time||!Ri())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Qe,aliases:ze,getSetter:function(e,t,i){var n=ze[t];return n&&n.indexOf(",")<0&&(t=n),t in Ze&&t!==Le&&(e._gsap.x||Qe(e,"x"))?i&&Xi===i?t==="scale"?eo:Jl:(Xi=i||{})&&(t==="scale"?to:so):e.style&&!wi(e.style[t])?Zl:~t.indexOf("-")?Xl:Di(e,t)},core:{_removeProperty:ot,_getMatrix:Bi}};Ce.utils.checkPrefix=Nt;Ce.core.getStyleSaver=Cr;(function(s,e,t,i){var n=ke(s+","+e+","+t,function(r){Ze[r]=1});ke(e,function(r){De.units[r]="deg",Pr[r]=1}),ze[n[13]]=s+","+e,ke(i,function(r){var l=r.split(":");ze[l[1]]=n[l[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ke("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){De.units[s]="px"});Ce.registerPlugin(Or);var F=Ce.registerPlugin(Or)||Ce;F.core.Tween;const an="level10-v19-style";function po(){if(document.getElementById(an))return;const s=document.createElement("style");s.id=an,s.textContent=`
    .level10-streak[hidden] { display: none; }
    @media (max-height: 480px) {
      /* 旧 HUD 让位用的 64px 顶垫压到 8px, 底垫同步收窄 */
      .level10-stage { padding: 8px 12px 8px; }
      .level10-hud { padding: 5px 12px; }
      .level10-progress { font-size: 14px; }
      .level10-question { font-size: 12px; }
      .level10-regions { gap: 8px; }
      .level10-region { padding: 8px 12px; border-radius: 14px; }
      .level10-region__label { font-size: 17px; }
      .level10-region__hint { font-size: 11px; margin-top: 2px; }
      .level10-fish { font-size: 34px; }
      .level10-keyboard { padding: 5px 10px; gap: 4px; }
      .level10-keys-svg { height: 46px; }
      .level10-streak__num { font-size: 14px; }
      /* 左右两侧"高音/低音"悬浮标签贴边一些, 给被压缩的答题区让位 */
      .level10-hint-labels { padding: 46px 0 78px; }
    }
  `,document.head.appendChild(s)}const _o=["C5","D5","E5","F5","G5","A5","B5"],cn=[{id:"do",solfege:"Do",low:"C4",high:"C5"},{id:"re",solfege:"Re",low:"D4",high:"D5"},{id:"mi",solfege:"Mi",low:"E4",high:"E5"},{id:"fa",solfege:"Fa",low:"F4",high:"F5"},{id:"sol",solfege:"Sol",low:"G4",high:"G5"},{id:"la",solfege:"La",low:"A4",high:"A5"},{id:"si",solfege:"Si",low:"B4",high:"B5"}];function vo(s,e){const t=s.audio._webAudio;if(!t||!s.audio.unlocked)return;const i=s.audio._masterGain;if(!i)return;const r={C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77}[e];if(!r)return;const l=t.currentTime,o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(r,l);const a=t.createOscillator();a.type="sine",a.frequency.setValueAtTime(r*2,l);const d=t.createOscillator();d.type="sine",d.frequency.setValueAtTime(r*3,l);const c=t.createGain();c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(.55,l+.01),c.gain.exponentialRampToValueAtTime(1e-4,l+.8);const _=t.createGain();_.gain.value=.15;const h=t.createGain();h.gain.value=.05,o.connect(c).connect(i),a.connect(_).connect(c),d.connect(h).connect(c);const m=l+.85;o.start(l),o.stop(m),a.start(l),a.stop(m),d.start(l),d.stop(m)}function yo(s,e){try{s.audio.playNote(e)}catch{}}function rs(s,e,t){t?vo(s,e):yo(s,e)}function dn(s,e,t){const n={C4:{white:["C4","D4","E4","F4","G4","A4","B4"],black:[["C#4",0],["D#4",1],["F#4",3],["G#4",4],["A#4",5]]},C5:{white:["C5","D5","E5","F5","G5","A5","B5"],black:[["C#5",0],["D#5",1],["F#5",3],["G#5",4],["A#5",5]]}}[e],r=38,l=130,o=24,a=80,d=n.white.length*r,c=document.createElementNS(ce,"svg");return c.setAttribute("viewBox",`0 0 ${d} ${l+8}`),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.classList.add("level10-keys-svg"),n.white.forEach((_,h)=>{const m=h*r,g=document.createElementNS(ce,"rect");if(g.setAttribute("x",m),g.setAttribute("y",0),g.setAttribute("width",r-1),g.setAttribute("height",l),g.setAttribute("rx",4),g.setAttribute("class","level10-white-key"),g.setAttribute("data-pitch",_),g.setAttribute("fill","#fffaf0"),g.setAttribute("stroke",t),g.setAttribute("stroke-width","1.5"),c.appendChild(g),n.black.some(([u,p])=>p===h)){const u=m+r-o/2,p=document.createElementNS(ce,"rect");p.setAttribute("x",u),p.setAttribute("y",0),p.setAttribute("width",o),p.setAttribute("height",a),p.setAttribute("rx",3),p.setAttribute("class","level10-black-key"),p.setAttribute("fill","#1a1a2a"),c.appendChild(p)}}),s.appendChild(c),c}function mo(s){po(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=10);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Yr(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level10-stage"></div>');const n=s.stage.querySelector(".level10-stage"),r=document.createElement("div");r.className="level10-hud",r.innerHTML=`
    <div class="level10-progress">第 <span class="level10-done">0</span> / <span class="level10-total">8</span> 题</div>
    <div class="level10-question">🎧 听一听, 是低还是高?</div>
    <div class="level10-streak" id="level10-streak" hidden>
      <span class="level10-streak__num">0</span><span class="level10-streak__x">x</span>
    </div>
  `,n.appendChild(r);const l=document.createElement("div");l.className="level10-hint-labels",l.innerHTML=`
    <div class="level10-hint-label level10-hint-label--high">
      <span class="level10-hint-label__arrow">▲</span>
      <span class="level10-hint-label__text">高音</span>
    </div>
    <div class="level10-hint-label level10-hint-label--low">
      <span class="level10-hint-label__text">低音</span>
      <span class="level10-hint-label__arrow">▼</span>
    </div>
  `,n.appendChild(l);const o=document.createElement("div");o.className="level10-regions",o.innerHTML=`
    <button class="level10-region level10-region--high" data-region="high">
      <div class="level10-region__label">⬆ 高八度 (HIGH)</div>
      <div class="level10-region__hint">听上去更亮更细</div>
    </button>
    <div class="level10-fish-area">
      <div class="level10-fish" id="level10-fish">🐟</div>
    </div>
    <button class="level10-region level10-region--low" data-region="low">
      <div class="level10-region__label">⬇ 低八度 (LOW)</div>
      <div class="level10-region__hint">听上去更厚更暖</div>
    </button>
  `,n.appendChild(o);const a=document.createElement("button");a.className="level10-preview",a.id="level10-preview",a.innerHTML="🔁 听一次",a.title="再听一次",n.appendChild(a);const d=document.createElement("div");d.className="level10-keyboard";const c=document.createElement("div");c.className="level10-keyboard__row level10-keyboard__row--low",c.innerHTML='<div class="level10-keyboard__row-label">LOW</div>',dn(c,"C4","#e76f51");const _=document.createElement("div");_.className="level10-keyboard__row level10-keyboard__row--high",_.innerHTML='<div class="level10-keyboard__row-label">HIGH</div>',dn(_,"C5","#5fa8b5"),d.appendChild(_),d.appendChild(c),n.appendChild(d),s._level10Total=8,s._level10Done=0,s._level10Current=null,s._level10Answering=!1,s._level10Wrong=0,s._level10Timestamps=[],s._level10Streak=0,s._level10BestStreak=0;function h(v,x){d.querySelectorAll(".level10-key-glow").forEach(L=>L.remove());const b=v?_:c,k=b.querySelector(`[data-pitch="${x}"]`);if(!k)return;const w=document.createElementNS(ce,"rect");w.setAttribute("class","level10-key-glow"),w.setAttribute("x",k.getAttribute("x")),w.setAttribute("y",k.getAttribute("y")),w.setAttribute("width",k.getAttribute("width")),w.setAttribute("height",k.getAttribute("height")),w.setAttribute("rx",k.getAttribute("rx")||4),w.setAttribute("fill",v?"rgba(95,168,181,0.55)":"rgba(231,111,81,0.55)"),b.querySelector("svg").insertBefore(w,b.querySelector("svg").firstChild),setTimeout(()=>{try{w.remove()}catch{}},1800)}function m(){if(s._level10Done>=s._level10Total)return f();s._level10Answering=!1;const v=cn[Math.floor(Math.random()*cn.length)],x=Math.random()<.5;s._level10Current={noteId:v.id,solfege:v.solfege,isHigh:x,pitch:x?v.high:v.low},r.querySelector(".level10-done").textContent=String(s._level10Done),r.querySelector(".level10-question").textContent=`🎧 第 ${s._level10Done+1} 题 — ${v.solfege} 来自哪里?`;const b=n.querySelector("#level10-fish");F.fromTo(b,{y:-20,opacity:0},{y:0,opacity:1,duration:.4,ease:"back.out(1.7)"}),setTimeout(()=>{rs(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0},500)}function g(v){if(!s._level10Answering)return;const x=s._level10Current;if(!x)return;s._level10Answering=!1;const b=x.isHigh===v,k=n.querySelector("#level10-fish"),w=n.querySelector(v?".level10-region--high":".level10-region--low");if(b){s._level10Done++;try{s.audio.correct()}catch{}s._level10Streak++,s._level10Streak>s._level10BestStreak&&(s._level10BestStreak=s._level10Streak);const L=k.getBoundingClientRect(),S=w.getBoundingClientRect(),M=S.left+S.width/2-(L.left+L.width/2),A=S.top+S.height/2-(L.top+L.height/2);if(F.to(k,{x:M,y:A,scale:.7,duration:.5,ease:"back.out(1.5)",onComplete:()=>{try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`${x.solfege} ${x.isHigh?"↑":"↓"} ✓`)}catch{}h(x.isHigh,x.pitch),s.say(`${x.solfege} ${x.isHigh?"高八度":"低八度"}, 对啦! 🎉`)}}),s._level10Streak>=2)try{const $=`x${s._level10Streak}${s._level10Streak>=5?" 🔥":""}`;s._floatScore(window.innerWidth/2,window.innerHeight*.32,$)}catch{}s._level10Streak>=2&&(y.textContent=String(s._level10Streak),p.hidden=!1,p.classList.remove("streak-bump"),p.offsetWidth,p.classList.add("streak-bump")),setTimeout(()=>m(),1500)}else{s.wrongCount++,s._level10Wrong++;try{s.audio.wrong()}catch{}w.classList.add("shake"),setTimeout(()=>w.classList.remove("shake"),400),F.to(k,{x:0,y:0,rotation:"+=12",duration:.15,yoyo:!0,repeat:3}),F.to(k,{rotation:0,duration:.3});const L=x.isHigh?"高":"低";if(s.say(`不对哟~ 这是${L}八度 ${x.solfege}, 再听一次?`),s._level10Streak>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.32,`断啦 💔 (最佳 x${s._level10BestStreak})`)}catch{}s._level10Streak=0,p.hidden=!0,p.classList.remove("streak-bump"),setTimeout(()=>{rs(s,x.pitch,x.isHigh),s._level10Answering=!0},800)}}n.querySelectorAll(".level10-region").forEach(v=>{v.addEventListener("click",()=>{const x=v.dataset.region;g(x==="high")})});const u=n.querySelector("#level10-preview"),p=n.querySelector("#level10-streak"),y=p.querySelector(".level10-streak__num");u.addEventListener("click",()=>{s._level10Current&&(rs(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0,u.classList.remove("flash"),u.offsetWidth,u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),600))}),[c,_].forEach(v=>{v.querySelectorAll("[data-pitch]").forEach(x=>{x.style.cursor="pointer",x.addEventListener("click",()=>{const b=x.getAttribute("data-pitch"),k=_o.includes(b);rs(s,b,k)})})}),s.say("听一听: Do 来自低八度还是高八度? 选对的地方放鱼~"),setTimeout(()=>m(),700);function f(){const v=s.wrongCount||0,x=v<=0?3:v<=2?2:v<=5?1:0;try{s.progress.markLevelComplete(10,x)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{s._flashScreen()}catch{}try{const b=s._level10BestStreak>=2?` (最佳连击 x${s._level10BestStreak})`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 八度完成!${b}`)}catch{}s.say("八度都听出来了! 耳朵升级了~"),setTimeout(()=>{try{s.showWinOverlay(x,10)}catch{}},1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level10-stage").forEach(v=>v.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const go=Object.freeze(Object.defineProperty({__proto__:null,default:mo},Symbol.toStringTag,{value:"Module"}));class bo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level11-background";let t="";for(let n=0;n<28;n++){const r=Math.random()*100,l=Math.random()*100,o=2+Math.random()*4,a=Math.random()*4;t+=`<circle class="level11-dot" cx="${r}%" cy="${l}%" r="${o}"
                          style="animation-delay: ${a}s" />`}let i="";for(let n=0;n<6;n++){const r=8+Math.random()*84,l=8+Math.random()*80,o=16+Math.random()*14,a=Math.random()*5;i+=`<g class="level11-heart" transform="translate(${r}, ${l}) scale(${o/30})"
                          style="animation-delay: ${a}s">
        <path d="M0,-2 C-6,-10 -16,-10 -16,0 C-16,8 -8,16 0,22 C8,16 16,8 16,0 C16,-10 6,-10 0,-2 Z"
              fill="rgba(255,182,193,0.55)" />
      </g>`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        ${t}
        ${i}

        <!-- 标题 -->
        <text x="400" y="58" text-anchor="middle" class="level11-title">🎴 翻牌记忆 🎴</text>
        <text x="400" y="88" text-anchor="middle" class="level11-subtitle">找两个一样的音符朋友</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const un="level11-v19-style";function xo(){if(document.getElementById(un))return;const s=document.createElement("style");s.id=un,s.textContent=`
    /* 让 sparkles 的 JS 坐标换算(board rect)与实际 containing block 一致 */
    .level11-board { position: relative; }
    @media (max-height: 480px) {
      .level11-stage { padding: 12px 12px 10px; gap: 8px; }
      /* 时间条原本 top:76px 是配合 100px 顶垫的; 顶垫压到 12px 后跟随 HUD 底缘 */
      .level11-time-bar { top: 58px; }
      /* 板宽由"可用高度"决定: 高度≈宽*(4/3)/4*2+gap → 宽 ≤ (H-固定 chrome)*~1.45。
         先写 vh 兜底再写 dvh, 老浏览器解析不了 dvh 时整条声明作废仍保留前一条 */
      .level11-board {
        gap: 8px;
        width: min(96%, calc((100vh - 190px) * 1.45));
        width: min(96%, calc((100dvh - 190px) * 1.45));
      }
      .level11-card { border-radius: 10px; }
      .level11-card__emoji { font-size: 20px; }
      .level11-card__name { font-size: 12px; margin-top: 2px; }
      .level11-card__back-pattern { font-size: 22px; }
      .level11-hud { font-size: 14px; padding: 5px 14px; }
    }
  `,document.head.appendChild(s)}const wo=[{id:"do",solfege:"Do",pitch:"C4",color:"#e63946",emoji:"🍎"},{id:"re",solfege:"Re",pitch:"D4",color:"#f4a261",emoji:"🍊"},{id:"mi",solfege:"Mi",pitch:"E4",color:"#ffc971",emoji:"🍋"},{id:"fa",solfege:"Fa",pitch:"F4",color:"#b5c99a",emoji:"🥝"}];function To(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[{f:1567.98,delay:0,dur:.32,peak:.45},{f:2093,delay:.04,dur:.32,peak:.35}].forEach(({f:n,delay:r,dur:l,peak:o})=>{const a=t+r,d=e.createOscillator();d.type="sine",d.frequency.setValueAtTime(n,a);const c=e.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(o,a+.008),c.gain.exponentialRampToValueAtTime(1e-4,a+l),d.connect(c).connect(s._masterGain),d.start(a),d.stop(a+l+.05)})}catch{}}function ko(s,e,t,i="#ffd166"){for(let r=0;r<8;r++){const l=r/8*Math.PI*2+Math.random()*.4,o=60+Math.random()*30,a=Math.cos(l)*o,d=Math.sin(l)*o,c=document.createElement("span");c.className="level11-sparkle",c.style.left=`${e}px`,c.style.top=`${t}px`,c.style.setProperty("--dx",`${a}px`),c.style.setProperty("--dy",`${d}px`),c.style.background=i,s.appendChild(c),setTimeout(()=>c.remove(),800)}}function So(s){const e=s.slice();for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}function Lo(s){xo(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=11);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new bo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level11-stage"></div>');const n=s.stage.querySelector(".level11-stage"),r=document.createElement("div");r.className="level11-hud",r.innerHTML=`
    <div class="level11-progress">
      <span class="level11-progress-icon">⭐</span>
      <span class="level11-done">0</span> / 4 对
    </div>
    <div class="level11-timer">⏱ <span class="level11-time">0.0</span>s</div>
  `,n.appendChild(r);const l=document.createElement("div");l.className="level11-time-bar",l.innerHTML='<div class="level11-time-bar__fill" id="level11-time-fill"></div>',n.appendChild(l);const o=l.querySelector("#level11-time-fill"),a=document.createElement("div");a.className="level11-board",n.appendChild(a);const d=[];wo.forEach(p=>{d.push({...p,key:p.id+"_a"}),d.push({...p,key:p.id+"_b"})}),So(d).forEach(p=>{const y=document.createElement("button");y.className="level11-card",y.dataset.key=p.key,y.dataset.id=p.id,y.dataset.pitch=p.pitch,y.dataset.color=p.color,y.innerHTML=`
      <div class="level11-card__inner">
        <div class="level11-card__face level11-card__back">
          <div class="level11-card__back-pattern">🎵</div>
        </div>
        <div class="level11-card__face level11-card__front"
             style="--card-accent: ${p.color}">
          <div class="level11-card__emoji">${p.emoji}</div>
          <div class="level11-card__name">${p.solfege}</div>
        </div>
      </div>
    `,a.appendChild(y),d.push({el:y,...p})}),s._level11Cards=d,s._level11Flipped=[],s._level11Matched=0,s._level11Locked=!1,s._level11Start=Date.now(),s._level11Tried=0,s._level11Timer=null;const _=r.querySelector(".level11-time"),h=25,m=40;s._level11Timer=setInterval(()=>{if(!s._level11Start)return;const p=(Date.now()-s._level11Start)/1e3;if(_.textContent=p.toFixed(1),o){const y=Math.min(1,p/m);o.style.width=`${y*100}%`,o.classList.remove("warn","danger"),p>=m?o.classList.add("danger"):p>=h&&o.classList.add("warn")}},100);function g(p){if(!s._level11Locked&&!s._level11Flipped.includes(p)&&!p.classList.contains("matched")){p.classList.add("flipped"),s._level11Flipped.push(p);try{s.audio.playNote(p.dataset.pitch)}catch{}if(s._level11Flipped.length===2){s._level11Tried++,s._level11Locked=!0;const[y,f]=s._level11Flipped;y.dataset.id===f.dataset.id?setTimeout(()=>{y.classList.add("matched"),f.classList.add("matched");try{s.audio.correct()}catch{}try{To(s.audio)}catch{}try{s._flashScreen()}catch{}s._level11Matched++,r.querySelector(".level11-done").textContent=String(s._level11Matched),s.say(`配对! ${y.dataset.id.toUpperCase()} = ${y.dataset.id.toUpperCase()} 🎉`);try{const v=y.getBoundingClientRect();s._floatScore(v.left+v.width/2,v.top,`${y.dataset.id.toUpperCase()} ✓`)}catch{}try{const v=y.getBoundingClientRect(),x=f.getBoundingClientRect(),b=(v.left+v.width/2+x.left+x.width/2)/2,k=(v.top+v.height/2+x.top+x.height/2)/2,w=n.querySelector(".level11-board"),L=w.getBoundingClientRect(),S=y.dataset.color||"#ffd166";ko(w,b-L.left,k-L.top,S)}catch{}setTimeout(()=>{s._level11Flipped=[],s._level11Locked=!1,s._level11Matched>=4&&u()},600)},350):setTimeout(()=>{try{s.audio.wrong()}catch{}y.classList.add("shake"),f.classList.add("shake"),setTimeout(()=>{y.classList.remove("flipped","shake"),f.classList.remove("flipped","shake"),s._level11Flipped=[],s._level11Locked=!1},450)},750)}}}s._level11Cards.forEach(p=>{p.el.addEventListener("click",()=>g(p.el))}),s.say("翻开两张牌 — 一样的就配对! 4 对就赢~"),s._level11Cards.forEach((p,y)=>{F.fromTo(p.el,{y:30,opacity:0},{y:0,opacity:1,duration:.4,delay:y*.05,ease:"back.out(1.7)"})});function u(){s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null);const p=(Date.now()-s._level11Start)/1e3,y=s._level11Tried;let f;p<=18&&y<=5?f=3:p<=30&&y<=7?f=2:p<=50?f=1:f=0;try{s.progress.markLevelComplete(11,f)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎉 ${p.toFixed(1)}s 完成!`)}catch{}s.say(`🎉 用时 ${p.toFixed(1)}s, 翻 ${y} 次, 你真厉害!`),setTimeout(()=>{try{s.showWinOverlay(f,11)}catch{}},1300)}return()=>{if(s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level11-stage").forEach(p=>p.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Co=Object.freeze(Object.defineProperty({__proto__:null,default:Lo},Symbol.toStringTag,{value:"Module"}));class Mo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level12-background";let t="";const i=["🍅","🧅","🥕","🥒","🌽","🍅","🧄"];for(let r=0;r<10;r++){const l=Math.random()*100,o=Math.random()*100,a=22+Math.random()*22,d=Math.random()*5,c=i[r%i.length];t+=`<g class="level12-veggie" transform="translate(${l}%, ${o}%) scale(${a/30})"
                           style="animation-delay: ${d}s">
        <text text-anchor="middle" dominant-baseline="middle" font-size="30">${c}</text>
      </g>`}const n=`
      <g class="level12-board-shadow" transform="translate(400, 440)">
        <ellipse cx="0" cy="0" rx="240" ry="22" fill="rgba(139, 90, 43, 0.4)" />
        <rect x="-220" y="-40" width="440" height="36" rx="8" fill="#a0673a" />
        <rect x="-220" y="-40" width="440" height="6" rx="3" fill="#c08a55" opacity="0.7" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        ${t}
        ${n}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level12-title">🥁 番茄节奏 🥁</text>
        <text x="400" y="80" text-anchor="middle" class="level12-subtitle">跟着摆杆切菜~</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const hn="level12-v19-style";function Eo(){if(document.getElementById(hn))return;const s=document.createElement("style");s.id=hn,s.textContent=`
    .level12-combo[hidden] { display: none; }
    @media (max-height: 480px) {
      .level12-stage { padding: 8px 12px 10px; gap: 5px; }
      /* 宽高比 300:380 → 高≈宽*1.27; 用 vh 给宽设上限, 保证整列放得下 */
      .level12-metronome { width: min(200px, 52vw, 27vh); margin-top: 0; }
      .level12-centerline { top: 6px; bottom: 6px; }
      .level12-cut {
        height: 54px;
        width: min(180px, 56vw);
        font-size: 17px;
        border-radius: 14px;
        border-width: 3px;
      }
      .level12-cut__knife { font-size: 20px; }
      .level12-cut__label { letter-spacing: 2px; }
      .level12-message { font-size: 12px; padding: 3px 10px; margin-top: 0; }
      .level12-hud { font-size: 13px; padding: 5px 10px; gap: 8px; }
      .level12-stat__icon { font-size: 14px; }
      .level12-stat .level12-hits,
      .level12-stat .level12-bpm { font-size: 15px; }
      .level12-stat .level12-acc { font-size: 15px; }
      .level12-combo { padding: 3px 12px; margin-bottom: 2px; }
      .level12-combo__num { font-size: 17px; }
      .level12-combo__x { font-size: 11px; }
    }
  `,document.head.appendChild(s)}const fn=12,ls=35,Ao=.15,Po=.3;function $o(s){Eo(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=12);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Mo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level12-stage"></div>');const n=s.stage.querySelector(".level12-stage"),r=document.createElement("div");r.className="level12-hud",r.innerHTML=`
    <div class="level12-stats">
      <div class="level12-stat">
        <span class="level12-stat__icon">🥁</span>
        <span class="level12-hits">0</span> / ${fn}
      </div>
      <div class="level12-stat">
        <span class="level12-stat__icon">⏱</span>
        BPM <span class="level12-bpm">60</span>
      </div>
      <div class="level12-stat">
        <span class="level12-stat__icon">✅</span>
        命中 <span class="level12-acc">—</span>
      </div>
    </div>
  `,n.appendChild(r);const l=document.createElement("div");l.className="level12-metronome",l.innerHTML=`
    <svg viewBox="0 0 300 380" class="level12-metronome-svg">
      <!-- 主体 -->
      <path d="M100,40 L200,40 L210,330 L90,330 Z" fill="#5d3a1a" stroke="#3d2410" stroke-width="3" />
      <path d="M100,40 L200,40 L208,80 L92,80 Z" fill="#8b5a2b" />
      <!-- 摆杆 pivot (顶部的铰链) -->
      <circle cx="150" cy="50" r="6" fill="#3d2410" />
      <!-- 摆杆 (g 用来旋转) -->
      <g class="level12-pendulum">
        <line x1="150" y1="50" x2="150" y2="280" stroke="#fff8dc" stroke-width="6" stroke-linecap="round" />
        <circle cx="150" cy="280" r="14" fill="#e63946" stroke="#3d2410" stroke-width="2" />
        <circle cx="150" cy="100" r="9" fill="#ffc971" stroke="#3d2410" stroke-width="1.5" />
      </g>
      <!-- 摆杆底座 (小三角) -->
      <path d="M140,330 L160,330 L150,350 Z" fill="#3d2410" />
      <!-- 计时刻度 (装饰) -->
      <text x="60" y="200" class="level12-scale">Lento</text>
      <text x="240" y="200" class="level12-scale" text-anchor="end">Allegro</text>
      <!-- v18.6 polish: perfect zone — 中线附近的窄带 (绿色高亮表示 PERFECT 容忍) -->
      <rect x="142" y="78" width="16" height="240" rx="4"
            fill="rgba(6, 214, 160, 0.18)"
            stroke="rgba(6, 214, 160, 0.55)"
            stroke-width="1.5"
            stroke-dasharray="4 3"
            class="level12-perfect-zone" />
    </svg>
    <!-- 中线指示 (竖直) -->
    <div class="level12-centerline"></div>
    <!-- 命中光环 -->
    <div class="level12-hit-ring" id="level12-hit-ring"></div>
  `,n.appendChild(l);const o=document.createElement("button");o.className="level12-cut",o.innerHTML=`
    <span class="level12-cut__knife">🔪</span>
    <span class="level12-cut__label">切!</span>
  `,n.appendChild(o);const a=document.createElement("div");a.className="level12-combo",a.id="level12-combo",a.hidden=!0,a.innerHTML='<span class="level12-combo__num">0</span><span class="level12-combo__x">x combo</span>',n.appendChild(a);const d=a.querySelector(".level12-combo__num"),c=document.createElement("div");c.className="level12-message",c.textContent="🔪 摆杆到中间时点切!",n.appendChild(c),s._level12Hits=0,s._level12TotalCuts=0,s._level12BPM=60,s._level12Phase=0,s._level12Dir=1,s._level12Running=!1,s._level12Tween=null,s._level12Done=!1,s._level12Combo=0,s._level12BestCombo=0,s._level12Score=0;function _(v){return v<=60?1:v>=140?2:1+(v-60)/80*1}const h=r.querySelector(".level12-hits"),m=r.querySelector(".level12-bpm"),g=r.querySelector(".level12-acc");function u(v){s._level12Tween&&(F.killTweensOf(s._level12Tween),s._level12Tween=null);const x=60/v,b=F.to({},{duration:x,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const k=b.progress(),w=-ls+k*2*ls,L=l.querySelector(".level12-pendulum");L&&(L.style.transform=`rotate(${w}deg)`),s._level12Phase=(w+ls)/(2*ls),s._level12Dir=w>0?1:-1},onRepeat:()=>{try{const k=s.audio._webAudio;if(k&&s.audio.unlocked){const w=k.currentTime,L=k.createOscillator();L.type="square",L.frequency.setValueAtTime(2400,w);const S=k.createGain();S.gain.setValueAtTime(1e-4,w),S.gain.exponentialRampToValueAtTime(.06,w+.005),S.gain.exponentialRampToValueAtTime(1e-4,w+.04),L.connect(S).connect(s.audio._masterGain),L.start(w),L.stop(w+.05)}}catch{}}});s._level12Tween=b}function p(){const v=Math.abs(s._level12Phase-.5);let x;v<=Ao?x="perfect":v<=Po?x="good":x="miss",s._level12TotalCuts++;const b=n.querySelector("#level12-hit-ring");if(b&&(b.classList.remove("hit-perfect","hit-good","hit-miss"),b.offsetWidth,b.classList.add(`hit-${x}`),setTimeout(()=>b.classList.remove(`hit-${x}`),600)),x==="miss"){s.wrongCount++;try{s.audio.wrong()}catch{}if(c.textContent=["差一点!","再稳点~","跟住摆杆!"][Math.floor(Math.random()*3)],F.fromTo(o,{x:0},{x:8,duration:.06,yoyo:!0,repeat:5}),s._level12Combo>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`断啦 💔 (最佳 x${s._level12BestCombo})`)}catch{}s._level12Combo=0,a.hidden=!0,a.classList.remove("combo-flash"),o.classList.remove("combo-glow")}else{s._level12Hits++;try{s.audio.correct()}catch{}try{s._level12Hits%2===0&&(s._level12BPM=Math.min(140,s._level12BPM+8),m.textContent=String(s._level12BPM),u(s._level12BPM))}catch{}const w=x==="perfect"?10:5;s._level12Combo++,s._level12Combo>s._level12BestCombo&&(s._level12BestCombo=s._level12Combo);const L=1+Math.min(s._level12Combo-1,9)*.1,S=_(s._level12BPM),M=Math.round(w*S*L);s._level12Score+=M;try{const A=L>1||S>1.05?`+${M}  (x${S.toFixed(1)}×x${L.toFixed(1)})`:`+${M}`;s._floatScore(window.innerWidth/2,window.innerHeight*.36,A)}catch{}s._level12Combo>=2&&(d.textContent=String(s._level12Combo),a.hidden=!1,a.classList.remove("combo-flash"),a.offsetWidth,a.classList.add("combo-flash"),o.classList.add("combo-glow")),c.textContent=x==="perfect"?"完美! 🎯":"不错! ✨",F.fromTo(o,{scale:1},{scale:.85,duration:.1,yoyo:!0,repeat:1,ease:"power2.out"})}h.textContent=String(s._level12Hits);const k=s._level12TotalCuts>0?Math.round(s._level12Hits/s._level12TotalCuts*100)+"%":"—";g.textContent=k,s._level12Hits>=fn&&!s._level12Done&&(s._level12Done=!0,setTimeout(()=>f(),500))}o.addEventListener("click",()=>{s._level12Done||p()});const y=v=>{s._level12Done||(v.code==="Space"||v.key===" ")&&(v.preventDefault(),p())};window.addEventListener("keydown",y),u(s._level12BPM),s._level12Running=!0,s.say('看摆杆 — 摆到中间时"切"! 按得快又准就是节奏高手~');function f(){s._level12Tween&&(F.killTweensOf(s._level12Tween),s._level12Tween=null);const v=s._level12TotalCuts>0?s._level12Hits/s._level12TotalCuts:0;let x;v>=.85?x=3:v>=.65?x=2:v>=.4?x=1:x=0;try{s.progress.markLevelComplete(12,x)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{const b=s._level12BestCombo>=2?` 连击 x${s._level12BestCombo}`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎵 ${s._level12Score} 分 (命中 ${Math.round(v*100)}%)${b}`)}catch{}s.say(`完美收尾! 命中 ${Math.round(v*100)}% — 你有节奏感! 🎵`),setTimeout(()=>{try{s.showWinOverlay(x,12)}catch{}},1300)}return()=>{if(s._level12Tween){try{F.killTweensOf(s._level12Tween)}catch{}s._level12Tween=null}if(window.removeEventListener("keydown",y),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level12-stage").forEach(v=>v.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Do=Object.freeze(Object.defineProperty({__proto__:null,default:$o},Symbol.toStringTag,{value:"Module"}));class Oo{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level13-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <defs>
          <linearGradient id="sunset13" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#1a0a3a" />
            <stop offset="60%" stop-color="#8b4513" />
            <stop offset="100%" stop-color="#f4a261" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#sunset13)" />

        <!-- Stars (slowly appearing) -->
        <circle class="level13-star-fade" cx="100" cy="50" r="1.5" fill="rgba(255,255,255,0.6)" />
        <circle class="level13-star-fade" cx="200" cy="80" r="1" fill="rgba(255,255,255,0.4)" />
        <circle class="level13-star-fade" cx="600" cy="60" r="1.5" fill="rgba(255,255,255,0.6)" />
        <circle class="level13-star-fade" cx="700" cy="100" r="1" fill="rgba(255,255,255,0.4)" />

        <!-- Metronome (centered) -->
        <g class="level13-metronome" transform="translate(400, 250)">
          <line x1="0" y1="0" x2="0" y2="-100" stroke="white" stroke-width="4" stroke-linecap="round" />
          <circle cx="0" cy="-100" r="14" fill="var(--warm-cta)" />
          <!-- Pendulum base -->
          <rect x="-20" y="0" width="40" height="10" fill="white" rx="4" />
        </g>

        <!-- Drum below
             v19: 鼓面/鼓身/投影改用 data 属性标记 (data-l13-drum)。
             Level13.js 旧版用 ellipse[cx="400"][cy="380"] 这种"按设计稿坐标
             抓元素"的脆弱选择器 — 场景 viewBox 或几何一变选择器就悄悄失效,
             且任何其他圆形一旦撞上同坐标会被误抓。坐标只作绘制数据,
             JS 引用一律走语义化 data 选择器。 -->
        <ellipse data-l13-drum="shadow" cx="400" cy="380" rx="80" ry="20" fill="rgba(0,0,0,0.3)" />
        <ellipse data-l13-drum="shell" cx="400" cy="375" rx="70" ry="18" fill="#5d3a1a" />
        <ellipse data-l13-drum="head" cx="400" cy="370" rx="65" ry="15" fill="#8b4513" />
        <text x="400" y="375" text-anchor="middle" font-family="ZCOOL KuaiLe" font-size="20" font-weight="900" fill="white">敲!</text>

        <!-- BPM counter -->
        <text x="400" y="450" text-anchor="middle" font-family="Nunito" font-size="14" font-weight="700" fill="white">♩= <tspan id="bpm-count">80</tspan> BPM</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}function No(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=13);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Oo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level13-stage"></div>');const n=s.stage.querySelector(".level13-stage"),r=document.createElement("div");r.className="level13-hud",r.innerHTML=`
    <div class="level13-stat">
      <span class="level13-stat__icon">✅</span>
      <span class="level13-hits">0</span> 完美
    </div>
    <div class="level13-stat">
      <span class="level13-stat__icon">❌</span>
      <span class="level13-misses">0</span> 漏拍
    </div>
    <div class="level13-stat">
      <span class="level13-stat__icon">⏱</span>
      <span class="level13-bpm">80</span> BPM
    </div>
  `,n.appendChild(r);const l=r.querySelector(".level13-hits"),o=r.querySelector(".level13-misses"),a=r.querySelector(".level13-bpm"),d=s.stage.querySelector(".level13-metronome"),c=s.stage.querySelector('[data-l13-drum="shadow"]');let _=80,h=0,m=0,g=0,u=!1;const p=Date.now();let y=Date.now()+1e3;function f(){const L=Date.now()-p;if(L>15e3){const M=Math.min((L-15e3)/1e4,1);return Math.round(130+M*50)}if(L>8e3){const M=Math.min((L-8e3)/7e3,1);return Math.round(100+M*30)}const S=Math.min(L/8e3,1);return Math.round(80+S*20)}function v(){if(u)return;_=f(),a.textContent=String(_);const L=s.stage.querySelector("#bpm-count");L&&(L.textContent=String(_)),d&&(d.style.transition="transform 0.08s linear",d.style.transform="rotate(-25deg)",setTimeout(()=>{d&&(d.style.transform="rotate(25deg)")},100),setTimeout(()=>{d&&(d.style.transform="rotate(0)")},200));const S=6e4/_;y=Date.now()+S,setTimeout(v,S)}setTimeout(v,1e3);function x(){if(u)return;const L=Date.now(),S=Math.abs(L-y),M=6e4/_/3,A=M*2;if(S<M){h++,g++;try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}c&&c.parentNode&&F.fromTo(c,{scale:1},{scale:.95,duration:.05,yoyo:!0,repeat:1,transformOrigin:"400px 380px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 完美 ⭐")}catch{}}else if(S<A){h++;try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ✨")}catch{}}else{m++;try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}l.textContent=String(h),o.textContent=String(m),h+m>=30&&(u=!0,setTimeout(()=>w(),600))}c&&c.parentNode&&(c.style.cursor="pointer",c.style.pointerEvents="all",c.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),x()}));const b=document.createElement("div");b.className="level13-tap-zone",b.addEventListener("pointerdown",L=>{L.preventDefault(),x()}),s.stage.appendChild(b);const k=L=>{u||(L.code==="Space"||L.key===" ")&&(L.preventDefault(),x())};window.addEventListener("keydown",k),s.say("跟着拍子敲鼓! 速度会逐渐变快 — 完美一击拿星 ⭐");function w(){u=!0;let L;g>=30?L=3:g>=24?L=2:g>=18?L=1:L=0;try{s.progress.markLevelComplete(13,L)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}const S=h+m,M=S>0?Math.round(h/S*100):0;try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 完美 ${g} 次 (命中 ${M}%)`)}catch{}s.say(`完美 ${g} 次 — 你是节奏大师! 🎵`),setTimeout(()=>{try{s.showWinOverlay(L,13)}catch{}},1300)}return()=>{if(u=!0,window.removeEventListener("keydown",k),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&(s.stage.querySelectorAll(".level13-stage").forEach(L=>L.remove()),s.stage.querySelectorAll(".level13-tap-zone").forEach(L=>L.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ro=Object.freeze(Object.defineProperty({__proto__:null,default:No},Symbol.toStringTag,{value:"Module"}));class Io{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level14-background";let t="";for(let n=0;n<50;n++){const r=Math.random()*100,l=Math.random()*100,o=1+Math.random()*2.5,a=Math.random()*4;t+=`<circle class="level14-star" cx="${r}%" cy="${l}%" r="${o}"
                            style="animation-delay: ${a}s" />`}const i=`
      <g class="level14-moon">
        <circle cx="680" cy="90" r="46" fill="#fff8dc" />
        <circle cx="696" cy="76" r="42" fill="url(#l14Grad)" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <defs>
          <linearGradient id="l14Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3a1a6b" />
            <stop offset="60%" stop-color="#5b2a8a" />
            <stop offset="100%" stop-color="#9b5de5" />
          </linearGradient>
        </defs>

        ${t}
        ${i}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level14-title">🎶 和弦建造者 🎶</text>
        <text x="400" y="78" text-anchor="middle" class="level14-subtitle">按顺序点三个音组成和弦</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const At=80,kt=220,ms=48,It=130,os=12,as=8,Bo=7*At,Fo=[{id:"do#",pitch:"C#4",note:"C#",solfege:"Di",x:80},{id:"re#",pitch:"D#4",note:"D#",solfege:"Ri",x:160},{id:"fa#",pitch:"F#4",note:"F#",solfege:"Fi",x:320},{id:"sol#",pitch:"G#4",note:"G#",solfege:"Si",x:400},{id:"la#",pitch:"A#4",note:"A#",solfege:"Li",x:480}];function qo(s){return`M ${s} 0
          H ${s+At}
          V ${kt-os}
          Q ${s+At} ${kt} ${s+At-os} ${kt}
          H ${s+os}
          Q ${s} ${kt} ${s} ${kt-os}
          Z`}function Ho(s){return`M ${s} 0
          H ${s+ms}
          V ${It-as}
          Q ${s+ms} ${It} ${s+ms-as} ${It}
          H ${s+as}
          Q ${s} ${It} ${s} ${It-as}
          Z`}const pn="touch-action: none; -webkit-user-select: none; user-select: none;";class gt{constructor(e,t){this.root=e,this.notes=t,this.svg=null,this._rawOnPress=null,this._lastKeyTapTime=0,this._lastKeyEl=null,Object.defineProperty(this,"onPress",{configurable:!0,enumerable:!0,get:()=>this._rawOnPress?i=>{if(typeof this._rawOnPress!="function")return;const n=Date.now();if(!(n-this._lastKeyTapTime<250&&this._lastKeyEl===i)){this._lastKeyTapTime=n,this._lastKeyEl=i;try{this._rawOnPress(i)}catch(r){console.warn(r)}}}:null,set:i=>{this._rawOnPress=i}}),this.render()}render(){const e=document.createElement("div");e.className="keyboard-area stage__kb-area";let t="";this.notes.forEach((n,r)=>{const l=r*At,o=l+At/2,a=qo(l);t+=`
        <g class="key key--white" data-pitch="${n.pitch}" data-id="${n.id}" style="${pn}">
          <path class="key__shape" d="${a}"
                fill="#fdfbf5" stroke="#d8d2c0" stroke-width="1.2" stroke-linejoin="round"/>
          <text class="key__label key__label--svg" x="${o}" y="184" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="18" font-weight="800" fill="#3d405b"
                style="pointer-events: none;">${n.note}</text>
          <text class="key__label key__label--svg" x="${o}" y="206" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="14" font-weight="500" fill="#6b7280"
                style="pointer-events: none;">${n.solfege}</text>
        </g>
      `}),Fo.forEach(n=>{const r=n.x-ms/2,l=Ho(r);t+=`
        <g class="key key--black" data-pitch="${n.pitch}" data-id="${n.id}" style="${pn}">
          <path class="key__shape" d="${l}"
                fill="#1f1d1a" stroke="#000000" stroke-width="0.8" stroke-linejoin="round"/>
        </g>
      `});const i=this.notes.map(n=>`
      <span class="keyboard-label" aria-hidden="true">
        <b>${n.note}</b><small>${n.solfege}</small>
      </span>
    `).join("");e.style.setProperty("--key-count",String(this.notes.length)),e.innerHTML=`
      <svg class="keyboard" xmlns="${ce}"
           viewBox="0 0 ${Bo} ${kt}"
           preserveAspectRatio="none"
           aria-label="钢琴键盘(C4-B4)">
        ${t}
      </svg>
      <div class="keyboard-labels">${i}</div>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.bindEvents()}bindEvents(){this.svg.querySelectorAll(".key").forEach(t=>{const i=t.querySelector(".key__shape"),n=i&&i.getAttribute("fill")||"",l=t.classList.contains("key--black")?"#5a4f2a":"#ffd166",o=()=>{t.classList.add("pressed"),i&&i.setAttribute("fill",l)},a=()=>{t.classList.remove("pressed"),i&&i.setAttribute("fill",n)};t.addEventListener("pointerdown",d=>{d.preventDefault(),o();try{t.setPointerCapture(d.pointerId)}catch{}typeof this.onPress=="function"&&this.onPress(t)}),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("pointerleave",a),t.addEventListener("click",d=>d.preventDefault())})}glowKey(e){if(!e)return;e.classList.add("glow");const t=e.querySelector(".key__shape");t&&typeof t.animate=="function"&&t.animate([{filter:"drop-shadow(0 0 0px rgba(255, 209, 102, 0.95))"},{filter:"drop-shadow(0 0 18px rgba(255, 209, 102, 0.7))"},{filter:"drop-shadow(0 0 28px rgba(255, 209, 102, 0))"}],{duration:600,easing:"ease-out",fill:"forwards"}),setTimeout(()=>e.classList.remove("glow"),700)}glowAll(){Array.from(this.svg.querySelectorAll(".key--white")).forEach((t,i)=>{setTimeout(()=>this.glowKey(t),i*200)})}markPlaced(e,t){if(!this.svg)return;const i=this.svg.querySelector(`.key--white[data-id="${e}"]`);if(!i||i.querySelector(".kb-placed-dot"))return;const n=i.getBBox?i.getBBox():{x:0,y:0,width:80},r=n.x+n.width/2,l=n.y+18,o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("class","kb-placed-dot"),o.setAttribute("cx",r),o.setAttribute("cy",l),o.setAttribute("r","10"),o.setAttribute("fill",t),o.setAttribute("stroke","white"),o.setAttribute("stroke-width","2"),i.appendChild(o)}resetMarks(){this.svg&&this.svg.querySelectorAll(".kb-placed-dot").forEach(e=>e.remove())}}const Vs=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Ys=[{name:"C 大三和弦",solfege:"Do  -  Mi  -  Sol",ids:["do","mi","sol"],color:"#e63946"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#b5c99a"},{name:"G 大三和弦",solfege:"Sol -  Si  -  Re",ids:["sol","si","re"],color:"#457b9d"},{name:"a 小三和弦",solfege:"La  -  Do  -  Mi",ids:["la","do","mi"],color:"#6a4c93"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#ffc971"}];function Go(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=14);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.createElement("style");n.dataset.levelStyle="14",n.textContent=`
    #stage { --lv14-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--lv14-kb-h);
    }
    #stage > .keyboard-area > svg.keyboard {
      width: 100%;
      height: 100%;
    }
    /* 矮视口(手机横屏): 卡片区让出键盘空间 */
    @media (max-height: 520px) {
      #stage > .level14-stage {
        padding: 8px 12px 12px;
        gap: 8px;
      }
      #stage .level14-card {
        padding: 10px 18px;
        gap: 8px;
      }
      #stage .level14-card__slots {
        gap: 18px;
      }
      #stage .level14-slot {
        width: 48px;
        height: 48px;
        font-size: 28px;
      }
      #stage .level14-card__name {
        font-size: 20px;
        letter-spacing: 1px;
      }
      #stage .level14-card__solfege {
        font-size: 16px;
        letter-spacing: 2px;
      }
    }
  `,document.head.appendChild(n),s.scene=new Io(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level14-stage"></div>');const r=s.stage.querySelector(".level14-stage"),l=document.createElement("div");l.className="level14-hud",l.innerHTML=`
    <div class="level14-stat">
      <span class="level14-stat__icon">🎶</span>
      <span class="level14-done">0</span> / 5 和弦
    </div>
    <div class="level14-stat">
      <span class="level14-stat__icon">⭐</span>
      <span class="level14-stars">0</span> 完美
    </div>
  `,r.appendChild(l);const o=l.querySelector(".level14-done"),a=l.querySelector(".level14-stars"),d=document.createElement("div");d.className="level14-card",d.innerHTML=`
    <div class="level14-card__name">C 大三和弦</div>
    <div class="level14-card__slots">
      <div class="level14-slot" data-idx="0">🐟</div>
      <div class="level14-slot" data-idx="1">🐟</div>
      <div class="level14-slot" data-idx="2">🐟</div>
    </div>
    <div class="level14-card__solfege">Do  -  Mi  -  Sol</div>
  `,r.appendChild(d);const c=d.querySelector(".level14-card__name"),_=d.querySelector(".level14-card__solfege"),h=d.querySelectorAll(".level14-slot");s.kb=new gt(s.stage,Vs),s._level14Idx=0,s._level14Perfect=0,s._level14Step=0,s._level14Done=!1,s._level14Failed=!1;function m(y){const f=Ys[y];c.textContent=f.name,c.style.background=`linear-gradient(135deg, ${f.color}, #fff8dc)`,c.style.webkitBackgroundClip="text",c.style.backgroundClip="text",c.style.color="transparent",_.textContent=f.solfege,h.forEach((v,x)=>{v.classList.remove("lit","placed","incorrect"),v.textContent=x===0?"🐟":"❓"})}function g(){s._level14Step=0,s._level14Failed=!1,h.forEach((y,f)=>{y.classList.remove("lit","placed","incorrect"),y.textContent=f===0?"🐟":"❓"})}function u(y,f,v){h[y].textContent=f,h[y].classList.add(v),setTimeout(()=>h[y].classList.remove(v),350)}s.kb.onPress=y=>{if(s._level14Done)return;const f=Ys[s._level14Idx],v=f.ids[s._level14Step],x=y.dataset.id,b=Vs.find(k=>k.id===x);try{s.kb.glowKey(y)}catch{}if(x===v){try{s.audio.correct()}catch{}try{s.audio.playNote(b.pitch)}catch{}if(s._level14Step===0)u(0,b.solfege,"placed"),h[0].style.color=f.color;else{u(s._level14Step,b.solfege,"placed"),h[s._level14Step].style.color=f.color;const k=s._level14Step+1;k<h.length&&(h[k].textContent="🐟")}if(s._level14Step++,s._level14Step>=3){s._level14Failed||(s._level14Perfect++,a.textContent=String(s._level14Perfect)),s._level14Idx++,o.textContent=String(s._level14Idx);try{s.audio.playScale(f.ids.map(k=>Vs.find(w=>w.id===k).pitch))}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.36,"+1 ⭐")}catch{}s._level14Idx>=Ys.length?(s._level14Done=!0,setTimeout(()=>p(),700)):setTimeout(()=>{m(s._level14Idx),g()},800)}}else{try{s.audio.wrong()}catch{}try{s.audio.playNote(b.pitch)}catch{}s._level14Failed=!0,s.wrongCount++,h.forEach(k=>{k.classList.add("incorrect")}),s.say(`错啦 — 应该是 ${f.solfege.split(/-+/).map(k=>k.trim()).filter(Boolean).join(" → ")}, 再来一次~`),setTimeout(()=>{g()},700)}},m(0),g(),s.say("看和弦卡 — 三条小鱼的顺序! 按钢琴键组成和弦~");function p(){const y=s._level14Perfect;let f;y>=5?f=3:y>=4?f=2:y>=3?f=1:f=0;try{s.progress.markLevelComplete(14,f)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 完美 ${y} / 5 和弦`)}catch{}s.say(`和弦大师! ${y} 个和弦完美完成 🎵`),setTimeout(()=>{try{s.showWinOverlay(f,14)}catch{}},1300)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}n&&n.parentNode&&n.remove(),s.stage&&s.stage.querySelectorAll(".level14-stage").forEach(y=>y.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Wo=Object.freeze(Object.defineProperty({__proto__:null,default:Go},Symbol.toStringTag,{value:"Module"}));class jo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level15-background";const t=`
      <g class="level15-mountain-far">
        <path d="M0,500 L0,400 L100,360 L200,400 L320,350 L420,400 L560,360 L680,400 L800,370 L800,500 Z"
              fill="rgba(30, 60, 95, 0.4)" />
      </g>
      <g class="level15-mountain-mid">
        <path d="M0,500 L0,440 L80,400 L180,440 L300,410 L380,440 L520,400 L640,440 L760,410 L800,430 L800,500 Z"
              fill="rgba(50, 100, 140, 0.5)" />
      </g>
    `;let i="";const n=["♪","♫","♬","🎵"];for(let r=0;r<8;r++){const l=Math.random()*100,o=Math.random()*100,a=16+Math.random()*22,d=Math.random()*6,c=n[r%n.length];i+=`<text x="${l}%" y="${o}%" class="level15-note-deco"
                          style="font-size: ${a}px; animation-delay: ${d}s">${c}</text>`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <defs>
          <linearGradient id="l15Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0e1e3a" />
            <stop offset="55%" stop-color="#1e3a5f" />
            <stop offset="100%" stop-color="#457b9d" />
          </linearGradient>
        </defs>

        ${i}
        ${t}

        <!-- 标题 -->
        <text x="400" y="46" text-anchor="middle" class="level15-title">🎼 视奏大师 🎼</text>
        <text x="400" y="74" text-anchor="middle" class="level15-subtitle">看谱 → 按键 — 越对越快</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Bt=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],cs=6,zo=3500,Vo=1500,Yo={do:175,re:150,mi:120,fa:105,sol:90,la:65,si:45},Fe=30;function Uo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=15);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.createElement("style");n.dataset.levelStyle="15",n.textContent=`
    #stage { --lv15-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: var(--lv15-kb-h);
    }
    #stage > .keyboard-area > svg.keyboard {
      width: 100%;
      height: 100%;
    }
    #stage > .level15-staff-area {
      top: clamp(64px, 18%, 92px);
      bottom: calc(var(--lv15-kb-h) + 10px);
      height: auto;
      align-items: flex-start; /* 区域被拉高时谱面贴顶, 桌面几何与旧版一致 */
    }
    #stage > .level15-staff-area > svg.level15-staff {
      height: min(260px, 100%);
    }
  `,document.head.appendChild(n),s.scene=new jo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level15-staff-area"></div>');const r=s.stage.querySelector(".level15-staff-area");r.innerHTML=`
    <svg class="level15-staff" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid meet">
      <!-- 5 lines -->
      <line class="level15-staff-line" x1="40" y1="${Fe+40}"  x2="760" y2="${Fe+40}" />
      <line class="level15-staff-line" x1="40" y1="${Fe+60}"  x2="760" y2="${Fe+60}" />
      <line class="level15-staff-line" x1="40" y1="${Fe+80}"  x2="760" y2="${Fe+80}" />
      <line class="level15-staff-line" x1="40" y1="${Fe+100}" x2="760" y2="${Fe+100}" />
      <line class="level15-staff-line" x1="40" y1="${Fe+120}" x2="760" y2="${Fe+120}" />
      <!-- treble clef (简化, 用 tspan '𝄞' 或 G 字母) -->
      <text x="50" y="${Fe+95}" class="level15-clef" font-family="serif" font-size="100" fill="#fff8dc">𝄞</text>
      <!-- 当前音符 -->
      <g class="level15-note-grp" transform="translate(400, 0)">
        <ellipse class="level15-current-note" cx="0" cy="0" rx="12" ry="9" fill="#ffd166"
                 stroke="#3d405b" stroke-width="2" />
        <line class="level15-stem" x1="12" y1="0" x2="12" y2="-32"
              stroke="#3d405b" stroke-width="2" />
      </g>
    </svg>
  `;const l=r.querySelector(".level15-current-note"),o=r.querySelector(".level15-stem");s.stage.insertAdjacentHTML("beforeend",`
    <div class="level15-metronome">
      <span class="level15-metronome-label">速度</span>
      <span class="level15-metronome-bpm" id="level15-bpm">1.0x</span>
      <span class="level15-metronome-combo" id="level15-combo"></span>
    </div>
  `),s.kb=new gt(s.stage,Bt);const a={value:1};s._level15Idx=0,s._level15Correct=0,s._level15Accepting=!0,s._level15Done=!1,s._level15ConsecRight=0,s._level15ConsecWrong=0,s._level15Easy=!1;function d(){return Bt[Math.floor(Math.random()*Bt.length)]}function c(f,v){a.value=f;const x=document.getElementById("level15-bpm");x&&(x.textContent=v||`${f.toFixed(1)}x`)}function _(){return Math.max(Vo,Math.round(zo/a.value))}function h(){if(s._level15Done||s._level15Idx>=cs)return;const f=d(),v=Yo[f.id];if(!l||!o)return;const x=r.querySelector(".level15-note-grp");if(!x)return;x.setAttribute("transform",`translate(400, ${v})`),l.dataset.pitch=f.pitch,l.dataset.id=f.id,l.classList.remove("incorrect"),l.style.opacity="1",l.setAttribute("fill","#ffd166"),s.say(`下一个: ${f.solfege}`),s._level15Accepting=!0;const b=_(),k=Date.now(),w=setTimeout(()=>{!s._level15Done&&s._level15Accepting&&m()},b);s._level15FallTimer=w,s._level15FallStart=k,s._level15FallDur=b}function m(){s._level15Accepting=!1,s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,g();try{s.audio.wrong()}catch{}s.say("漏拍啦 — 看下一个音符~"),l&&l.classList.add("incorrect"),s._level15FallTimer&&clearTimeout(s._level15FallTimer),setTimeout(()=>{l&&l.classList.remove("incorrect"),s._level15Idx++,s._level15Idx>=cs?p():h()},500)}function g(){if(!s._level15Easy&&s._level15ConsecWrong>=3){s._level15Easy=!0,c(1,"1.0x 轻松");try{s.say("进入轻松模式 — 慢慢来!")}catch{}}}function u(){if(a.value>=1.5)return;const f=Math.min(1.5,+(a.value+.1).toFixed(1));c(f);const v=document.getElementById("level15-combo");v&&(v.textContent=`连对 ${s._level15ConsecRight} → 加速!`)}s.kb.onPress=f=>{if(!s._level15Accepting||s._level15Done)return;const v=f.dataset.pitch,x=f.dataset.id,b=l?l.dataset.pitch:null,k=l?l.dataset.id:null;try{s.kb.glowKey(f)}catch{}if(v===b){s._level15Accepting=!1,s._level15Correct++,s._level15ConsecRight++,s._level15ConsecWrong=0,s._level15FallTimer&&clearTimeout(s._level15FallTimer);try{s.audio.correct()}catch{}try{s.audio.playNote(v)}catch{}l&&(l.style.opacity="0");const w=["完美!","棒!","眼睛真快!","看谱高手!"];s.say(w[Math.min(s._level15Correct-1,w.length-1)]),s._level15ConsecRight>=3&&!s._level15Easy&&u(),s._level15Idx++,setTimeout(()=>{s._level15Idx>=cs?p():h()},350)}else{s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,g();try{s.audio.wrong()}catch{}try{s.audio.playNote(v)}catch{}const w=Bt.find(S=>S.id===x);s.say(`这是 ${w?w.solfege:"?"}, 不是 ${Bt.find(S=>S.id===k).solfege}. 再看谱!`),l&&l.classList.add("incorrect");const L=l;setTimeout(()=>{L&&L.classList.remove("incorrect")},350)}};function p(){s._level15Done||(s._level15Done=!0,setTimeout(()=>y(),600))}c(1,"1.0x"),setTimeout(h,800),s.say("看 5 线谱上的音符 — 按对应的钢琴键, 越对越快!");function y(){const f=s._level15Correct;let v;f>=5?v=3:f>=4?v=2:f>=3?v=1:v=0;try{s.progress.markLevelComplete(15,v)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 看谱对了 ${f} / ${cs}`)}catch{}s.say(`视奏大师! 6 音对了 ${f} 个 🎼`),setTimeout(()=>{try{s.showWinOverlay(v,15)}catch{}},1300)}return()=>{if(s._level15FallTimer&&(clearTimeout(s._level15FallTimer),s._level15FallTimer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}n&&n.parentNode&&n.remove(),s.stage&&(s.stage.querySelectorAll(".level15-staff-area").forEach(f=>f.remove()),s.stage.querySelectorAll(".level15-metronome").forEach(f=>f.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Qo=Object.freeze(Object.defineProperty({__proto__:null,default:Uo},Symbol.toStringTag,{value:"Module"}));class Ko{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level16-background";let t="";for(let n=0;n<20;n++){const r=Math.random()*100,l=Math.random()*100,o=6+Math.random()*12,a=Math.random()*5,d=4+Math.random()*4;t+=`<circle class="level16-particle" cx="${r}%" cy="${l}%" r="${o}"
                                style="animation-delay: ${a}s; animation-duration: ${d}s" />`}const i=`
      <g class="level16-rocket" transform="translate(680, 110)">
        <path d="M0,-30 L-14,18 L-14,32 L-6,32 L-4,18 L4,18 L6,32 L14,32 L14,18 Z"
              fill="#fff8dc" stroke="#c0392b" stroke-width="2" />
        <circle cx="0" cy="-2" r="6" fill="#457b9d" stroke="#fff8dc" stroke-width="1.5" />
        <path d="M-6,32 L-12,42 M6,32 L12,42 M0,32 L0,44"
              stroke="#ff8c42" stroke-width="3" stroke-linecap="round" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <defs>
          <linearGradient id="l16Grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3a1a55" />
            <stop offset="45%" stop-color="#c0392b" />
            <stop offset="100%" stop-color="#f4a261" />
          </linearGradient>
        </defs>

        ${t}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level16-title">🚀 节奏速度阶梯 🚀</text>
        <text x="400" y="78" text-anchor="middle" class="level16-subtitle">BPM 越爬越高, 看谁能到顶!</text>

        ${i}
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const ds=8,us=60,_n=10,Zo=6,vn=3;function Xo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=16);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Ko(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level16-stage"></div>');const n=s.stage.querySelector(".level16-stage"),r=document.createElement("div");r.className="level16-hud",r.innerHTML=`
    <div class="level16-stat">
      <span class="level16-stat__icon">🎯</span>
      轮 <span class="level16-round">1</span> / ${ds}
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⏱</span>
      <span class="level16-bpm">${us}</span> BPM
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">🔥</span>
      连击 <span class="level16-combo">0</span>
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⭐</span>
      完美轮 <span class="level16-perf-rounds">0</span>
    </div>
  `,n.appendChild(r);const l=r.querySelector(".level16-round"),o=r.querySelector(".level16-bpm"),a=r.querySelector(".level16-combo"),d=r.querySelector(".level16-perf-rounds"),c=document.createElement("div");c.className="level16-drum-wrap",c.innerHTML=`
    <svg class="level16-drum" viewBox="0 0 200 200">
      <ellipse cx="100" cy="170" rx="80" ry="14" fill="rgba(0,0,0,0.35)" />
      <ellipse cx="100" cy="160" rx="80" ry="22" fill="#5d3a1a" />
      <ellipse data-l16-drum-head cx="100" cy="155" rx="74" ry="18" fill="#8b4513" stroke="#5d3a1a" stroke-width="2" />
      <text class="level16-drum-text" x="100" y="160" text-anchor="middle"
            font-family="ZCOOL KuaiLe" font-size="22" font-weight="900" fill="#fff8dc">🥁 敲!</text>
    </svg>
  `,n.appendChild(c);const _=c.querySelector("svg"),h=_?_.querySelector("[data-l16-drum-head]"):null,m=_?_.querySelector("text"):null,g=document.createElement("div");g.className="level16-meter",g.innerHTML=`
    <svg viewBox="0 0 120 200" class="level16-meter-svg">
      <path d="M30,20 L90,20 L94,180 L26,180 Z" fill="#5d3a1a" stroke="#3d2410" stroke-width="2" />
      <path d="M30,20 L90,20 L92,40 L28,40 Z" fill="#8b5a2b" />
      <circle cx="60" cy="22" r="4" fill="#3d2410" />
      <g class="level16-pendulum">
        <line x1="60" y1="22" x2="60" y2="155" stroke="#fff8dc" stroke-width="4" stroke-linecap="round" />
        <circle cx="60" cy="155" r="9" fill="#ff8c42" stroke="#3d2410" stroke-width="1.5" />
      </g>
    </svg>
    <div class="level16-centerline"></div>
    <div class="level16-hit-ring" id="level16-hit-ring"></div>
  `,n.appendChild(g);const u=document.createElement("div");u.className="level16-ladder";let p="";for(let S=0;S<ds;S++){const M=us+_n*S;p+=`
      <div class="level16-rung ${S===0?"active":""}" data-bpm="${M}">
        <span class="level16-rung__num">第 ${S+1} 轮</span>
        <span class="level16-rung__bpm">${M} BPM</span>
      </div>
    `}u.innerHTML=`
    <div class="level16-ladder__title">速度阶梯</div>
    ${p}
  `,n.appendChild(u);const y=u.querySelectorAll(".level16-rung");s._level16Round=0,s._level16Bpm=us,s._level16RoundHits=0,s._level16RoundTaps=0,s._level16Combo=0,s._level16PerfectRounds=0,s._level16Done=!1,s._level16Phase=0,s._level16Tween=null,s._level16PendingTickAt=null,s._level16RunningRound=!1,s._level16Timer=null,s._level16RoundStartAt=0;function f(S){s._level16Tween&&(F.killTweensOf(s._level16Tween),s._level16Tween=null);const M=60/S,A=30,$=F.to({},{duration:M,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const B=$.progress(),H=-A+B*2*A,q=g.querySelector(".level16-pendulum");q&&(q.style.transform=`rotate(${H}deg)`),s._level16Phase=(H+A)/(2*A)},onRepeat:()=>{const B=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+B/2}}),N=6e4/S;s._level16PendingTickAt=Date.now()+N/2,s._level16Tween=$}function v(){const S=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+S/2}function x(){if(s._level16Done||!s._level16RunningRound)return;const S=Date.now();6e4/s._level16Bpm;const M=s._level16Phase,A=Math.abs(M-.5);let $;A<=.15?$="perfect":A<=.3?$="good":$="miss",s._level16PendingTickAt||v(),Math.abs(S-s._level16PendingTickAt),s._level16RoundTaps++;const N=document.getElementById("level16-hit-ring");if(N&&(N.classList.remove("hit-perfect","hit-good","hit-miss"),N.offsetWidth,$==="perfect"?N.classList.add("hit-perfect"):$==="good"?N.classList.add("hit-good"):N.classList.add("hit-miss"),setTimeout(()=>N.classList.remove("hit-perfect","hit-good","hit-miss"),500)),$==="perfect"){s._level16RoundHits++,s._level16Combo++,d.textContent=String(s._level16PerfectRounds),a.textContent=String(s._level16Combo);try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}h&&F.fromTo(h,{scale:1},{scale:.92,duration:.05,yoyo:!0,repeat:1,transformOrigin:"100px 155px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ⭐")}catch{}}else if($==="good"){try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+0 ✨")}catch{}}else{s._level16Combo=0,a.textContent="0";try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}v(),s._level16RoundTaps>=Zo&&k()}function b(){s._level16RoundHits=0,s._level16RoundTaps=0,s._level16RunningRound=!0,v(),l.textContent=String(s._level16Round+1),o.textContent=String(s._level16Bpm),y.forEach((S,M)=>S.classList.toggle("active",M===s._level16Round)),s.say(`第 ${s._level16Round+1} 轮 — ${s._level16Bpm} BPM!`)}function k(){if(s._level16RunningRound=!1,s._level16RoundHits>=vn&&s._level16PerfectRounds++,d.textContent=String(s._level16PerfectRounds),m&&(m.textContent=s._level16RoundHits>=vn?"🎉":"💪",setTimeout(()=>{m&&(m.textContent="🥁 敲!")},800)),s._level16Round++,s._level16Round>=ds){s._level16Done=!0,s._level16Tween&&(F.killTweensOf(s._level16Tween),s._level16Tween=null),setTimeout(()=>L(),800);return}s._level16Bpm=us+_n*s._level16Round,o.textContent=String(s._level16Bpm),f(s._level16Bpm),setTimeout(b,1500)}f(s._level16Bpm),b(),_&&(_.style.cursor="pointer",_.addEventListener("pointerdown",S=>{S.preventDefault(),S.stopPropagation(),x()}));const w=S=>{s._level16Done||(S.code==="Space"||S.key===" ")&&(S.preventDefault(),x())};window.addEventListener("keydown",w),s.say("看摆杆 — 摆到中间时敲鼓! 越爬越快 ⏱");function L(){let S;const M=s._level16PerfectRounds;M>=8?S=3:M>=7?S=2:M>=5?S=1:S=0;try{s.progress.markLevelComplete(16,S)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 ${ds} 轮, ${M} 完美轮`)}catch{}s.say(`爬到顶啦! ${M} 轮完美 🎵🚀`),setTimeout(()=>{try{s.showWinOverlay(S,16)}catch{}},1300)}return()=>{if(s._level16Tween){try{F.killTweensOf(s._level16Tween)}catch{}s._level16Tween=null}if(window.removeEventListener("keydown",w),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level16-stage").forEach(S=>S.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Jo=Object.freeze(Object.defineProperty({__proto__:null,default:Xo},Symbol.toStringTag,{value:"Module"}));function ea(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=2),s._startLevel2();const e=s.stage;e.insertAdjacentHTML("beforeend",`
    <div class="level2-listen-prompt" id="level2-listen-prompt">
      <div class="level2-speaker">
        <span class="level2-speaker-emoji">🔊</span>
        <span class="level2-wave level2-wave-1"></span>
        <span class="level2-wave level2-wave-2"></span>
        <span class="level2-wave level2-wave-3"></span>
      </div>
      <div class="level2-listen-text">🎵 听声音</div>
    </div>
  `),e.insertAdjacentHTML("beforeend",`
    <div class="level2-progress-dots" id="level2-progress-dots">
      ${[1,2,3,4,5].map(f=>`<span class="level2-prog-dot" data-i="${f}"></span>`).join("")}
    </div>
  `);function t(){const f=e.querySelectorAll(".level2-prog-dot"),v=s._level2Done?s._level2Done.size:0;f.forEach((x,b)=>{b<v?x.classList.add("filled"):x.classList.remove("filled")})}function i(f){if(!f)return;const v=f.getBoundingClientRect(),x=e.getBoundingClientRect(),b=v.left-x.left+v.width/2,k=v.top-x.top,w=document.createElement("div");w.className="level2-correct-bubble",w.textContent="✨ 答对啦! ✨",w.style.left=b+"px",w.style.top=k-36+"px",e.appendChild(w),setTimeout(()=>w.remove(),1400);for(let L=0;L<6;L++){const S=document.createElement("div");S.className="level2-sparkle",S.style.left=b+(Math.random()-.5)*70+"px",S.style.top=k+(Math.random()-.5)*70+"px",S.style.animationDelay=L*.06+"s",e.appendChild(S),setTimeout(()=>S.remove(),1100)}}function n(f,v){const x=document.createElement("div");x.className="level2-big-solfege",v&&x.style.setProperty("--big-solfege-color",v),x.textContent=f,e.appendChild(x),e.classList.add("level2-bg-pulse"),setTimeout(()=>{e.classList.remove("level2-bg-pulse");try{x.remove()}catch{}},1500)}const r={Do:[130.81,261.63,392],Re:[146.83,293.66,440],Mi:[164.81,329.63,493.88],Fa:[174.61,349.23,523.25],Sol:[196,392,587.33],La:[220,440,659.25],Si:[246.94,493.88,739.99]};function l(f){const v=s.audio;if(!v||!v._webAudio||v.muted)return;const x=v._webAudio;try{v._resumeWebAudio&&v._resumeWebAudio()}catch{}const b=r[f]||r.Do,k=x.currentTime+.05;b.forEach((w,L)=>{const S=k+L*.13,M=x.createOscillator();M.type="triangle",M.frequency.setValueAtTime(w,S);const A=x.createGain();A.gain.setValueAtTime(1e-4,S),A.gain.exponentialRampToValueAtTime(.5,S+.02),A.gain.exponentialRampToValueAtTime(1e-4,S+.18),M.connect(A).connect(v._masterGain),M.start(S),M.stop(S+.22),typeof v._trackOsc=="function"&&v._trackOsc(M,S+.22)})}const o=s._markLevel2FishCorrect.bind(s);s._markLevel2FishCorrect=f=>{o(f),t(),i(f);const v=f&&f.dataset?f.dataset.id:null;if(v){const x=a.find(b=>b.id===v);if(x){n(x.solfege,x.color);try{l(x.solfege)}catch{}}}typeof p=="function"&&p()};const a=[{id:"do",pitch:"C4"},{id:"re",pitch:"D4"},{id:"mi",pitch:"E4"},{id:"fa",pitch:"F4"},{id:"sol",pitch:"G4"},{id:"la",pitch:"A4"},{id:"si",pitch:"B4"}],d={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88};function c(f){const v=s.audio;if(!v||!v._webAudio||!v._masterGain||v.muted)return!1;const x=v._webAudio;try{v._resumeWebAudio&&v._resumeWebAudio()}catch{}const b=x.currentTime,k=d[f];if(!k)return!1;const w=x.createOscillator();w.type="triangle",w.frequency.setValueAtTime(k,b);const L=x.createOscillator();L.type="sine",L.frequency.setValueAtTime(k*2,b);const S=x.createOscillator();S.type="sine",S.frequency.setValueAtTime(k*3,b);const M=x.createGain();M.gain.setValueAtTime(1e-4,b),M.gain.exponentialRampToValueAtTime(1,b+.015),M.gain.exponentialRampToValueAtTime(.7,b+.35),M.gain.exponentialRampToValueAtTime(1e-4,b+2.2);const A=x.createGain();A.gain.value=.18;const $=x.createGain();$.gain.value=.06,w.connect(M).connect(v._masterGain),L.connect(A).connect(M),S.connect($).connect(M);const N=b+2.3;return w.start(b),w.stop(N),L.start(b),L.stop(N),S.start(b),S.stop(N),!0}const _=s._replayQuestion.bind(s);s._replayQuestion=()=>{const f=s.audio,v=s._level2AnswerNote;if(!v)return;const x=a.find(A=>A.id===v);if(!x){_();return}if(!f||!f._webAudio||!f._masterGain){_();return}const b=f._webAudio,k=f._masterGain,w=b.currentTime,L=f.muted?0:.75,S=f.muted?0:1;try{const A=typeof k.gain.value=="number"?k.gain.value:L;k.gain.cancelScheduledValues(w),k.gain.setValueAtTime(A,w),k.gain.linearRampToValueAtTime(S,w+.06),k.gain.linearRampToValueAtTime(L,w+2.5)}catch{}c(x.pitch);const M=document.getElementById("level2-listen-prompt");M&&(M.classList.add("active"),clearTimeout(M._hideTimer),M._hideTimer=setTimeout(()=>M.classList.remove("active"),2500))};function h(){[3,2,1].forEach((v,x)=>{setTimeout(()=>{const b=document.createElement("div");b.className="level2-countdown",b.textContent=String(v),e.appendChild(b),setTimeout(()=>{try{b.remove()}catch{}},720)},x*650)})}const m=s._level2NextQuestion.bind(s);s._level2NextQuestion=()=>{const f=!s._level2AnswerNote;m(),!f&&s._level2AnswerNote&&h()};let g=null;function u(){g&&clearTimeout(g),g=setTimeout(()=>{if(s._level2AnswerNote&&(s._level2Done||new Set).size<(s._level2Total||5))try{s.say("哪条小鱼刚才唱歌了? 点点它 🎵")}catch{}},1e4)}function p(){u()}const y=s._replayQuestion;if(s._replayQuestion=()=>{try{y()}catch{}p()},typeof s._handleLevel2Answer=="function"){const f=s._handleLevel2Answer.bind(s);s._handleLevel2Answer=(v,x)=>{try{f(v,x)}catch{}p()}}return setTimeout(p,1200),t(),()=>{g&&(clearTimeout(g),g=null),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const f=document.getElementById("hud-level2");f&&(f.style.display="");const v=document.querySelector(".hud__dots");v&&(v.style.display="none");const x=document.getElementById("btn-replay");x&&(x.style.display="none");const b=document.getElementById("level2-listen-prompt");b&&b.remove();const k=document.getElementById("level2-progress-dots");k&&k.remove(),e.querySelectorAll(".level2-correct-bubble, .level2-sparkle, .level2-countdown").forEach(w=>w.remove())}}const ta=Object.freeze(Object.defineProperty({__proto__:null,default:ea},Symbol.toStringTag,{value:"Module"})),yn=[{id:"do",height:"42%",texture:"moss"},{id:"re",height:"52%",texture:"stone"},{id:"mi",height:"62%",texture:"fern"},{id:"sol",height:"72%",texture:"cloud"},{id:"la",height:"82%",texture:"star"}];class sa{constructor(e){this.stage=e,this.background=null,this.targets=null,this.render()}render(){const e=document.createElement("div");e.className="level3-background",e.innerHTML=`
      <!-- meet: 竖屏完整保留左右山景，剩余空间由背景渐变承接，不再 slice 裁边 -->
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="${ce}">
        <circle cx="650" cy="100" r="55" class="level3-sun" />
        <path class="level3-bird" d="M120,90 q6,-6 12,0 q6,-6 12,0" />
        <path class="level3-bird" d="M260,60 q5,-5 10,0 q5,-5 10,0" />
        <path class="level3-bird" d="M460,75 q5,-5 10,0 q5,-5 10,0" />
        <path class="level3-mountain level3-mountain-far" d="M0,300 L150,150 L250,220 L380,80 L500,200 L640,140 L800,250 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-mid" d="M0,360 L100,260 L220,300 L350,200 L480,290 L620,240 L800,310 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-near" d="M0,420 L80,360 L210,380 L350,310 L490,370 L640,340 L800,400 L800,500 L0,500 Z" />
        <path class="level3-river" d="M0,440 Q200,420 400,440 T800,430 L800,500 L0,500 Z" />
        <text x="400" y="62" text-anchor="middle" class="level3-hand-text">👂</text>
      </svg>
      <div class="level3-sunset-overlay level3-progress-0"></div>
      <div class="level3-bloom-layer"></div>
    `,this.stage.appendChild(e),this.background=e;const t=document.createElement("div");t.className="level3-targets",t.setAttribute("aria-label","五座高低不同的山"),t.innerHTML=yn.map((i,n)=>`
      <div class="level3-target level3-target--${i.texture}" data-note="${i.id}" style="--mountain-h:${i.height}; --target-i:${n}">
        <div class="level3-target__halo"></div>
        <div class="level3-target__mountain"><span class="level3-target__peak"></span></div>
      </div>
    `).join(""),this.stage.appendChild(t),this.targets=t}getTarget(e){return this.targets?.querySelector(`[data-note="${e}"]`)||null}getClosestTarget(e){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let t=null,i=1/0;return this.targets?.querySelectorAll(".level3-target").forEach(n=>{const r=n.getBoundingClientRect(),l=r.left+r.width/2,o=r.top+r.height*.58,a=Math.hypot(e.x-l,e.y-o);a<i&&(t=n,i=a)}),{target:t,distance:i}}setListening(e){this.targets?.classList.toggle("is-listening",!!e)}setHoverTarget(e){this.targets?.querySelectorAll(".is-hover-target").forEach(t=>t.classList.remove("is-hover-target")),e&&e.classList.add("is-hover-target")}markPlaced(e){const t=this.getTarget(e);t&&(t.classList.remove("is-hover-target"),t.classList.add("is-placed"))}setProgress(e){if(!this.background)return;const t=this.background.querySelector(".level3-sunset-overlay");if(!t)return;const i=Math.min(3,Math.ceil(e/yn.length*3));t.className=`level3-sunset-overlay level3-progress-${i}`}bloomAt(e,t,i="#ffd166"){if(!this.background)return;const n=this.background.querySelector(".level3-bloom-layer");if(!n)return;const r=this.background.getBoundingClientRect(),l=e-r.left,o=t-r.top;for(let a=0;a<12;a++){const d=document.createElement("div");d.className="level3-bloom-sparkle",d.style.left=`${l}px`,d.style.top=`${o}px`,d.style.background=i;const c=Math.PI*2*a/12,_=45+Math.random()*35;d.style.setProperty("--bx",`${Math.cos(c)*_}px`),d.style.setProperty("--by",`${Math.sin(c)*_}px`),n.appendChild(d),setTimeout(()=>{try{d.remove()}catch{}},1100)}}teardown(){this.background?.remove(),this.targets?.remove(),this.background=null,this.targets=null}}const mn={do:{main:"M2,36 L24,18 L20,30 L20,42 L24,54 Z",stripes:"M10,30 L16,24 M10,42 L16,48"},re:{main:"M2,36 Q22,18 24,36 Q22,54 2,36 Z",stripes:"M8,30 Q14,28 18,32 M8,42 Q14,44 18,40"},mi:{main:"M2,36 L26,20 L26,52 Z",stripes:"M8,32 L22,28 M8,40 L22,44"},fa:{main:"M2,36 Q8,30 14,34 Q20,28 24,36 Q20,44 14,38 Q8,42 2,36 Z",stripes:"M6,36 Q10,34 14,36 M14,36 Q18,34 22,36"},sol:{main:"M2,36 L18,28 L22,34 L26,28 L26,44 L22,40 L18,46 Z",stripes:"M10,34 L16,32 M10,38 L16,40"},la:{main:"M2,36 L24,24 L20,32 L24,40 L2,36 Z M8,28 L18,28 M8,36 L18,36 M8,44 L18,44",stripes:"M4,30 L10,30 M4,36 L10,36 M4,42 L10,42"},si:{main:"M2,36 Q12,28 18,36 Q24,44 2,36 Q12,30 8,38 Z",stripes:"M6,34 L14,34 M6,38 L14,38"}},gn={do:{front:{rx:5.5,ry:6,pupil:2.5},back:{rx:4,ry:4.5,pupil:1.8},extra:"eyelashes"},re:{front:{rx:6,ry:6.5,pupil:3},back:{rx:4.5,ry:5,pupil:2.2},extra:"round"},mi:{front:{rx:5.5,ry:3.5,pupil:2.4},back:{rx:4,ry:2.5,pupil:1.8},extra:"narrow"},fa:{front:{rx:5.5,ry:.5,pupil:0},back:{rx:4,ry:.4,pupil:0},extra:"closed"},sol:{front:{rx:5.5,ry:4,pupil:2.2},back:{rx:4,ry:3,pupil:1.6},extra:"squint"},la:{front:{rx:7,ry:8,pupil:3.2},back:{rx:5,ry:5.5,pupil:2.4},extra:"surprised"},si:{front:{rx:5.5,ry:3,pupil:2.4},back:{rx:4,ry:2,pupil:1.8},extra:"cool"}},ia={do:2,re:1,mi:2,fa:1,sol:3,la:2,si:1},na={do:"bow",mi:"hat",sol:"crown",la:"earring"};function ra(s){return function(){let e=s+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}class la{constructor(e,{showLabel:t=!0}={}){this.note=e,this.showLabel=t;const i=document.createElement("div");return i.className="fish",i.dataset.id=e.id,i.dataset.pitch=e.pitch,i.dataset.color=e.color,i.style.cssText=["width: 96px","height: 72px","touch-action: manipulation","-webkit-user-select: none","user-select: none","-webkit-tap-highlight-color: transparent"].join(";"),this.el=i,this.render(),i}render(){const{id:e,color:t,solfege:i,pitch:n}=this.note,{showLabel:r}=this,l=(e||"do").toLowerCase(),o=(Math.random()*30-15).toFixed(1),a=(.85+Math.random()*.3).toFixed(2),d=(Math.random()*2).toFixed(2),c=Math.random()>.4,_=(1.5+Math.random()*1.5).toFixed(1),h=(.4+Math.random()*.35).toFixed(2),m=(te,oe)=>{const se=(te||"#999").replace("#","").match(/.{2}/g);if(!se)return te;const[xe,qe,xt]=se.map(wt=>parseInt(wt,16)),Ye=wt=>{const ss=oe<0?0:255,Rs=Math.abs(oe)/100;return Math.round((ss-wt)*Rs+wt).toString(16).padStart(2,"0")};return`#${Ye(xe)}${Ye(qe)}${Ye(xt)}`},g=Math.floor(Math.random()*3),u=(8+Math.random()*8).toFixed(0),p={r:0,g:0,b:0};g===0?(p.r=+u,p.g=+Math.floor(u/2)):g===1?(p.b=+u,p.g=+Math.floor(u/2)):(p.r=+Math.floor(u/2),p.g=+Math.floor(u/2),p.b=+Math.floor(u/2));const y=(t||"#999999").replace("#","").match(/.{2}/g);let f=t;if(y){const[te,oe,se]=y.map(xe=>parseInt(xe,16));f="#"+[te+p.r,oe+p.g,se+p.b].map(xe=>Math.max(0,Math.min(255,xe)).toString(16).padStart(2,"0")).join("")}const v=m(f,-25),x=m(f,22),b=Math.random()>.5?2:1,k=Array.from({length:b}).map((te,oe)=>{const se=(1.5+Math.random()*1.2).toFixed(1),xe=-6-oe*5,qe=32+(oe%2===0?0:6),xt=(2.4+Math.random()*1.6).toFixed(2),Ye=(Math.random()*2).toFixed(2);return`
        <circle cx="${xe}" cy="${qe}" r="${se}" fill="rgba(255,255,255,0.55)">
          <animate attributeName="cy" from="${qe}" to="${qe-18}" dur="${xt}s"
                   begin="${Ye}s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.4;1"
                   dur="${xt}s" begin="${Ye}s" repeatCount="indefinite" />
        </circle>`}).join(""),w=mn[l]?l:"do",L=mn[w],S=`
      <path d="${L.main}"
            style="fill: ${v}; stroke: rgba(0,0,0,0.22); stroke-width: 0.6; stroke-linejoin: round;" />
      <path d="${L.stripes}"
            style="stroke: rgba(0,0,0,0.32); stroke-width: 0.5; stroke-linecap: round; opacity: 0.55;" />`,M=gn[l]?l:"do",A=gn[M],$=68,N=32,B=56,H=32,q=A.extra==="closed"?"":`<animate attributeName="ry"
                 values="${A.front.ry};${A.front.ry};0.4;${A.front.ry};${A.front.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${d}s"
                 repeatCount="indefinite" />`,W=A.extra==="closed"?"":`<animate attributeName="ry"
                 values="${A.back.ry};${A.back.ry};0.3;${A.back.ry};${A.back.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${(parseFloat(d)+.15).toFixed(2)}s"
                 repeatCount="indefinite" />`;let U="";A.extra==="eyelashes"?U=`
        <circle cx="66" cy="38" r="0.6" fill="#1a1a1a" />
        <circle cx="70" cy="38" r="0.6" fill="#1a1a1a" />`:A.extra==="surprised"?U='<ellipse cx="68" cy="44" rx="1.2" ry="0.6" fill="rgba(0,0,0,0.5)" />':A.extra==="cool"?U='<path d="M62,28 L74,28" stroke="rgba(0,0,0,0.65)" stroke-width="0.7" stroke-linecap="round" />':A.extra==="squint"&&(U=`
        <path d="M62,38 Q64,40 66,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />
        <path d="M72,38 Q74,40 76,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />`);const be=A.extra==="closed"?`<path d="M${$-A.front.rx},${N} Q${$},${N-.6} ${$+A.front.rx},${N}"
             stroke="rgba(0,0,0,0.7)" stroke-width="1.1" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${$}" cy="${N}" rx="${A.front.rx}" ry="${A.front.ry}"
                 fill="white" stroke="rgba(0,0,0,0.6)" stroke-width="0.5">${q}</ellipse>`,C=A.extra==="closed"?`<path d="M${B-A.back.rx},${H} Q${B},${H-.4} ${B+A.back.rx},${H}"
             stroke="rgba(0,0,0,0.6)" stroke-width="0.9" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${B}" cy="${H}" rx="${A.back.rx}" ry="${A.back.ry}"
                 fill="white" stroke="rgba(0,0,0,0.55)" stroke-width="0.4">${W}</ellipse>`,T=A.extra==="closed"?"":`<circle class="fish-pupil" cx="${$}" cy="${N}" r="${A.front.pupil}" fill="#1a1a1a" />
         <circle cx="${$+1.5}" cy="${N-2}" r="1.3" fill="white" />
         <circle cx="${$-1.5}" cy="${N+1.5}" r="0.6" fill="rgba(255,255,255,0.8)" />`,E=A.extra==="closed"?"":`<circle class="fish-pupil" cx="${B}" cy="${H}" r="${A.back.pupil}" fill="#1a1a1a" />
         <circle cx="${B+1.2}" cy="${H-1.5}" r="0.9" fill="white" />`,P=`
      ${C}${E}
      ${be}${T}
      ${U}`,D=ia[l]||1;let R="";c&&(R=[{x:78,y:10,r:parseFloat(_)},{x:84,y:4,r:parseFloat(_)*.55},{x:88,y:0,r:parseFloat(_)*.32}].slice(0,D).map((se,xe)=>`<circle cx="${se.x}" cy="${se.y}" r="${se.r.toFixed(1)}"
                 fill="rgba(255,255,255,${(.85-xe*.12).toFixed(2)})"
                 stroke="rgba(255,255,255,0.5)" stroke-width="0.4" />`).join(""));const O=(e||"do").split("").reduce((te,oe)=>te+oe.charCodeAt(0),0),I=ra(O*73+17),G=3+Math.floor(I()*3),V=Array.from({length:G}).map(()=>{const te=(32+I()*36).toFixed(1),oe=(30+I()*16).toFixed(1),se=(.5+I()*.9).toFixed(2),xe=parseFloat(te),qe=parseFloat(oe);return xe>60&&xe<72&&qe>28&&qe<36?"":`<circle cx="${te}" cy="${oe}" r="${se}" fill="rgba(0,0,0,0.42)" />`}).join(""),K=(2+Math.random()*1).toFixed(2),Y=(Math.random()*1).toFixed(2),Z=`
      <path d="M40,22 Q34,18 32,24 Q36,26 40,26 Z"
            style="fill: ${x}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 24;-8 40 24;0 40 24;6 40 24;0 40 24"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${K}s" begin="${Y}s" repeatCount="indefinite" />
      </path>`,he=`
      <path d="M40,52 Q34,58 32,52 Q36,50 40,50 Z"
            style="fill: ${v}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round; opacity: 0.9;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 52;6 40 52;0 40 52;-6 40 52;0 40 52"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${K}s" begin="${(parseFloat(Y)+.3).toFixed(2)}s" repeatCount="indefinite" />
      </path>`,j=na[l];let de="";const ve=(2.4+Math.random()*.8).toFixed(2),ye=(Math.random()*.6).toFixed(2);if(j==="bow")de=`
        <g style="transform-origin: 46px 12px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-6 46 12;4 46 12;-6 46 12"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${ve}s" begin="${ye}s" repeatCount="indefinite" />
          <!-- 蝴蝶结左瓣 -->
          <path d="M42,10 Q36,6 38,12 Q36,18 42,14 Z"
                style="fill: #ff5c8a; stroke: rgba(0,0,0,0.4); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 蝴蝶结右瓣 -->
          <path d="M50,10 Q56,6 54,12 Q56,18 50,14 Z"
                style="fill: #ff5c8a; stroke: rgba(0,0,0,0.4); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 中间结 -->
          <ellipse cx="46" cy="12" rx="2.4" ry="2.8" fill="#ff3d75" stroke="rgba(0,0,0,0.45)" stroke-width="0.4" />
          <!-- 高光 -->
          <circle cx="45.2" cy="11" r="0.6" fill="rgba(255,255,255,0.85)" />
        </g>`;else if(j==="hat")de=`
        <g style="transform-origin: 48px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-3 48 14;3 48 14;-3 48 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${ve}s" begin="${ye}s" repeatCount="indefinite" />
          <!-- 帽顶 (圆顶) -->
          <path d="M40,14 Q40,4 48,4 Q56,4 56,14 Z"
                style="fill: #2c3e50; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 帽檐 -->
          <path d="M36,14 L60,14 L58,17 L38,17 Z"
                style="fill: #1a2530; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 帽带 -->
          <path d="M40,12 L56,12" stroke="#e74c3c" stroke-width="1.4" stroke-linecap="round" />
          <!-- 帽徽 -->
          <circle cx="48" cy="8" r="1.2" fill="#f1c40f" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
        </g>`;else if(j==="crown"){const te=(1.6+Math.random()*.6).toFixed(2);de=`
        <g style="transform-origin: 46px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-2 46 14;2 46 14;-2 46 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${ve}s" begin="${ye}s" repeatCount="indefinite" />
          <!-- 皇冠底座 -->
          <path d="M38,16 L40,8 L44,12 L46,6 L48,12 L52,8 L54,16 Z"
                style="fill: #ffd700; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 皇冠底部装饰条 -->
          <rect x="38" y="14" width="16" height="2.4" fill="#ffb300" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
          <!-- 中央红宝石 -->
          <circle cx="46" cy="15.2" r="0.9" fill="#e74c3c" stroke="rgba(0,0,0,0.4)" stroke-width="0.25">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${te}s" repeatCount="indefinite" />
          </circle>
          <!-- 左右小宝石 -->
          <circle cx="41" cy="15.4" r="0.6" fill="#3498db" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <circle cx="51" cy="15.4" r="0.6" fill="#2ecc71" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <!-- 高光 -->
          <circle cx="45.3" cy="10.5" r="0.5" fill="rgba(255,255,255,0.85)" />
        </g>`}else j==="earring"&&(de=`
        <g style="transform-origin: 80px 46px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-8 80 46;8 80 46;-8 80 46"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${ve}s" begin="${ye}s" repeatCount="indefinite" />
          <!-- 耳环钩 -->
          <circle cx="80" cy="46" r="0.8" fill="none" stroke="rgba(80,80,80,0.85)" stroke-width="0.5" />
          <!-- 珍珠 -->
          <circle cx="80" cy="49.5" r="1.6" fill="#fff8dc" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" />
          <!-- 高光 -->
          <circle cx="79.5" cy="49" r="0.55" fill="rgba(255,255,255,0.95)" />
        </g>`);this.el.innerHTML=`
      <svg xmlns="${ce}" viewBox="0 0 96 72"
           style="display: block; width: 100%; height: 100%; overflow: visible;">
        <g class="fish-body" transform="rotate(${o} 48 36) scale(${a})">

          <!-- 身后小水泡 trail (作为最底层,在身体后面) -->
          ${k}

          ${c?`<!-- 思考泡泡 (${D} 颗,大小也随机) -->
          ${R}`:""}

          <!-- 尾巴 (按 note.id 切换形状) -->
          ${S}

          <!-- 上侧鳍 (有摇摆动画) -->
          ${Z}

          <!-- 下侧鳍 (有摇摆动画) -->
          ${he}

          <!-- 背鳍 (圆角三角帽) -->
          <path d="M36 18 Q44 4 52 18 Z"
                style="fill: ${x}; stroke: rgba(0,0,0,0.18); stroke-width: 0.5; stroke-linejoin: round;" />

          <!-- 身体 (微调过的色) -->
          <ellipse cx="50" cy="38" rx="32" ry="22"
                   style="fill: ${f}; stroke: rgba(0,0,0,0.22); stroke-width: 0.9;" />

          <!-- 肚白高光 (大肚皮) -->
          <ellipse cx="50" cy="50" rx="22" ry="9" fill="rgba(255,255,255,0.42)" />

          <!-- 闪光鳞片 (波浪装饰) -->
          <path d="M40 32 Q44 28 48 32 M52 28 Q56 24 60 28 M62 28 Q66 24 70 28"
                stroke="rgba(255,255,255,0.55)" stroke-width="0.7" fill="none" stroke-linecap="round" />

          <!-- 鳃线 -->
          <path d="M28 32 Q26 40 28 48" fill="none"
                stroke="rgba(0,0,0,0.28)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 雀斑/小点 (基于 note.id 稳定位置) -->
          ${V}

          <!-- 腮红 (粉嫩小圆点,透明度随机) -->
          <ellipse cx="68" cy="46" rx="3" ry="1.6" fill="rgba(255,140,170,${h})" />

          <!-- 嘴巴 (友好微笑) -->
          <path d="M76 44 Q80 47 76 49" fill="none"
                stroke="rgba(0,0,0,0.65)" stroke-width="1" stroke-linecap="round" />

          <!-- 眼睛 (按 note.id 切换表情) -->
          ${P}

          <!-- 配饰 (按 note.id 切换: 蝴蝶结/帽子/皇冠/耳环) -->
          ${de}

          ${r?`
            <!-- 大字唱名 (Do/Re/Mi/...) -->
            <text class="fish-label" x="44" y="48"
                  font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                  font-size="20" font-weight="900"
                  fill="white" stroke="rgba(0,0,0,0.7)" stroke-width="2.5"
                  paint-order="stroke" text-anchor="middle"
                  style="pointer-events: none;">${i}</text>

            <!-- 小字音名 (C4/D4/...) -->
            <text class="fish-name-en" x="44" y="60"
                  font-family="'Nunito', sans-serif"
                  font-size="8" font-weight="700"
                  fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.5)" stroke-width="0.5"
                  paint-order="stroke" text-anchor="middle"
                  style="pointer-events: none;">${n}</text>
          `:""}
        </g>
      </svg>
    `}}const oa=280,aa=50,Nr=68,mi=52,ca=72;function hs(s){const t=Math.max(48,s.height-8)/(mi*2+24),i=Math.max(.62,s.width/520),n=Math.min(1.25,Math.max(.62,Math.min(t,i)));return{slotW:Math.round(Nr*n),slotH:Math.round(mi*n),padX:Math.round(aa*Math.min(1,Math.max(.6,n))),minDist:Math.max(44,Math.round(ca*n)),overY:Math.round(18*n)}}const bn="forest-piano-fishpool-keyframes";function da(){if(document.getElementById(bn))return;const s=document.createElement("style");s.id=bn,s.textContent=`
    .fish-inner {
      position: relative; /* 给 Fish.js 返回的内层 .fish 一个正确的定位参照 */
      transform-origin: 50% 50%;
      will-change: transform;
      /* v19.3: 内层缩小，外层 wrapper 保持完整手指热区 */
      transform: rotate(var(--fish-rot, 0deg)) scale(var(--fish-visual-scale, 0.78));
      width: 100%;
      height: 100%;
      pointer-events: none; /* 事件穿透到 .fish wrapper */
    }
    .fish-inner > * {
      /* Fish.js 返回的节点本身也叫 .fish，会被全局 .fish-pool .fish
         规则选中成 absolute。v20 显式让它回到 inner 的盒子里，
         每条鱼才真正跟随各自 wrapper 坐标，不会堆叠到同一定位上下文。 */
      position: relative !important;
      left: auto !important;
      top: auto !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none;
    }
    /* v17.6: 浮动动画放在 wrapper (.fish) 上, 让 hit area 跟随视觉位置
       (原来放 inner, wrapper 不动, 鱼浮起时 hit 区比鱼低 12px → 触屏"模糊") */
    /* v18.2: 把"小浮动"和"呼吸缩放"合并成单一 keyframe, 4s 一循环 */
    @keyframes fishFloat {
      /* v19.3: L1 目标很密，原 -6px/1.03 呼吸会让鱼看起来闪烁、
         彼此擦边；改为几乎静止的生命感，不干扰对位。 */
      0%, 100% { transform: translateY(0)    scale(1.00); }
      50%      { transform: translateY(-2px) scale(1.01); }
    }
    .fish.is-floating {
      animation: fishFloat var(--fish-float-dur, 4s) ease-in-out
                 var(--fish-float-delay, 0s) infinite;
    }
    .fish {
      will-change: transform;
      transform-origin: 50% 50%;
    }
    .fish.dragging {
      animation: none;
    }
  `,document.head.appendChild(s)}class Ms{constructor(e,t,{fishDisplay:i={}}={}){da(),this.stage=e,this.notes=t,this.fishDisplay=i,this.fishes=[],this.onDrop=null,this.onDragStart=null,this.onDragMove=null,this.onTap=null,this._dragEnabled=!0,this._lastHoveredSlot=null,this.TAP_THRESHOLD=12,this._renderPool(),requestAnimationFrame(()=>this._placeFishes()),this._onResize=()=>{clearTimeout(this._resizeTimer),this._resizeTimer=setTimeout(()=>this._handleViewportChange(),150)},window.addEventListener("resize",this._onResize),window.addEventListener("orientationchange",this._onResize)}_clampFishesToPool(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2)return;const t=hs(e),i=t.padX,n=e.width-t.padX-t.slotW,r=e.height-t.slotH,l=Math.max(i,n),o=Math.max(0,r);this.fishes.forEach(a=>{if(a.locked||a.el.classList.contains("dragging"))return;const d=Math.min(Math.max(a.originalLeft,i),l),c=Math.min(Math.max(a.originalTop,0),o);d===a.originalLeft&&c===a.originalTop||(a.originalLeft=d,a.originalTop=c,a.el.style.transition="left 200ms ease-out, top 200ms ease-out",a.el.style.left=`${d}px`,a.el.style.top=`${c}px`,setTimeout(()=>{a.el.style.transition=""},220))})}destroy(){this._onResize&&(window.removeEventListener("resize",this._onResize),window.removeEventListener("orientationchange",this._onResize),this._onResize=null),clearTimeout(this._resizeTimer)}_handleViewportChange(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2)return;const t=this._lastPoolH||0;this._lastPoolW,this._lastPoolH=e.height,this._lastPoolW=e.width,t>0&&Math.abs(e.height-t)/Math.max(t,1)>.3&&this.fishes.some(n=>!n.locked)?this._redistributeUnlocked():this._clampFishesToPool()}_redistributeUnlocked(){const e=this.fishes.filter(c=>!c.locked&&!c.el.classList.contains("dragging"));if(!e.length)return;const t=this.pool.getBoundingClientRect(),i=hs(t);this._m=i;const n=[];this.fishes.forEach(c=>{if(c.locked||c.el.classList.contains("dragging")){const _=c.el.getBoundingClientRect(),h=this.pool.getBoundingClientRect();n.push({x:_.left+_.width/2-h.left,y:_.top+_.height/2-h.top})}});const r=Math.max(i.padX,i.slotW/2),l=t.width-i.padX-i.slotW/2,o=i.slotH/2-i.overY,a=t.height-i.slotH/2,d=i.minDist*i.minDist;e.forEach(c=>{let _=null,h=-1/0;for(let u=0;u<70;u++){const p=r+Math.random()*Math.max(1,l-r),y=o+Math.random()*Math.max(1,a-o);let f=1/0;for(const v of n){const x=v.x-p,b=v.y-y;f=Math.min(f,x*x+b*b)}if(f>=d){_={cx:p,cy:y};break}f>h&&(h=f,_={cx:p,cy:y})}if(!_)return;const m=Math.round(_.cx-i.slotW/2),g=Math.round(_.cy-i.slotH/2);c.originalLeft=m,c.originalTop=g,c.el.style.width=`${i.slotW}px`,c.el.style.height=`${i.slotH}px`,c.el.style.transition="left 260ms ease-out, top 260ms ease-out",c.el.style.left=`${m}px`,c.el.style.top=`${g}px`,setTimeout(()=>{c.el.style.transition=""},300),n.push({x:_.cx,y:_.cy})})}_renderPool(){const e=document.createElement("div");e.className="fish-pool",this.fishDisplay.showLabel===!1&&e.classList.add("fish-pool--no-label"),e.setAttribute("aria-label","小鱼池"),this.stage.appendChild(e),this.pool=e,this.root=e}_placeFishes(){const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2){requestAnimationFrame(()=>this._placeFishes());return}const t=[...this.notes];for(let m=t.length-1;m>0;m--){const g=Math.floor(Math.random()*(m+1));[t[m],t[g]]=[t[g],t[m]]}const i=hs(e);this._m=i;const n=i.padX,r=e.width-i.padX-i.slotW,l=-i.overY,o=e.height-i.slotH,a=i.minDist,d=a*a,c=90,_=[];function h(m,g){for(let u=0;u<_.length;u++){const p=_[u],y=p.x-m,f=p.y-g;if(y*y+f*f<d)return!1}return!0}t.forEach(m=>{const g=document.createElement("div");g.className="fish is-floating",g.dataset.id=m.id,g.dataset.color=m.color,g.dataset.solfege=m.solfege,g.dataset.pitch=m.pitch,g.style.webkitUserSelect="none",g.style.userSelect="none",g.style.webkitTapHighlightColor="transparent";const u=n+i.slotW/2,p=r-i.slotW/2,y=l+i.slotH/2,f=o-i.slotH/2,v=Math.max(1,p-u),x=Math.max(1,f-y);let b=0,k=0,w=!1;for(let q=0;q<c;q++){const W=u+Math.random()*v,U=y+Math.random()*x;if(h(W,U)){b=W,k=U,w=!0;break}}if(!w){let q=-1/0,W=u,U=y;for(let be=0;be<60;be++){const C=u+Math.random()*v,T=y+Math.random()*x;let E=1/0;for(let P=0;P<_.length;P++){const D=_[P],R=D.x-C,O=D.y-T,I=Math.sqrt(R*R+O*O);I<E&&(E=I)}E>q&&(q=E,W=C,U=T)}b=W,k=U}const L=b-i.slotW/2,S=k-i.slotH/2;g.style.left=`${L}px`,g.style.top=`${S}px`,g.style.width=`${i.slotW}px`,g.style.height=`${i.slotH}px`,_.push({x:b,y:k});const M=(Math.random()-.5)*6,A=3.5+Math.random()*1,$=-Math.random()*A;g.style.setProperty("--fish-float-dur",`${A.toFixed(2)}s`),g.style.setProperty("--fish-float-delay",`${$.toFixed(2)}s`);const N=document.createElement("div");N.className="fish-inner",N.style.setProperty("--fish-rot",`${M.toFixed(2)}deg`);let B=null;try{const q=new la(m,this.fishDisplay);q&&q.nodeType===1?B=q:B=q?.root||q?.element||q?.svg||null}catch(q){console.warn("[FishPool] Fish creation failed (Agent A 还没就绪?):",q)}B&&B.nodeType===1?N.appendChild(B):N.innerHTML=`
          <div style="
            width:100%;height:100%;
            background:${m.color};
            border-radius:50% 60% 55% 50% / 55% 50% 60% 50%;
            display:flex;align-items:center;justify-content:center;
            color:#fff;font-family:'ZCOOL KuaiLe',sans-serif;
            font-size:24px;font-weight:900;
            text-shadow:0 1px 2px rgba(0,0,0,0.35);
            box-shadow:0 6px 0 rgba(0,0,0,0.18), 0 12px 24px rgba(0,0,0,0.2);
          ">${m.solfege}</div>
        `,g.appendChild(N),this.pool.appendChild(g);const H={el:g,inner:N,note:m,originalLeft:L,originalTop:S,rot:M,locked:!1};this.fishes.push(H),this._bindDrag(H)})}_bindDrag(e){const t=e.el;let i=null,n=0,r=0,l=0,o=0,a=0;const d=h=>{if(e.locked)return;if(this._dragEnabled===!1){const u=Date.now();if(u-(this._lastTapTime||0)<250&&this._lastTapEl===t)return;if(this._lastTapTime=u,this._lastTapEl=t,typeof this.onTap=="function")try{this.onTap(t)}catch(p){console.warn(p)}return}const m=Date.now();if(m-(this._lastTapTime||0)<250&&this._lastTapEl===t||(this._lastTapTime=m,this._lastTapEl=t,i!==null)||h.pointerType==="mouse"&&h.button!==0)return;try{t.setPointerCapture(h.pointerId)}catch{}i=h.pointerId;const g=t.getBoundingClientRect();if(n=h.clientX-g.left,r=h.clientY-g.top,l=h.clientX,o=h.clientY,a=0,t.classList.add("dragging"),t.classList.add("pressing"),e.el.style.animationPlayState="paused",t.style.position="fixed",t.style.left=`${h.clientX-n}px`,t.style.top=`${h.clientY-r}px`,t.style.right="auto",t.style.bottom="auto",t.style.margin="0",t.style.transform="",typeof this.onDragStart=="function")try{this.onDragStart(t)}catch(u){console.warn(u)}},c=h=>{if(i!==h.pointerId)return;h.preventDefault(),t.style.left=`${h.clientX-n}px`,t.style.top=`${h.clientY-r}px`;const m=h.clientX-l,g=h.clientY-o,u=Math.hypot(m,g);if(a=Math.max(a,u),a>this.TAP_THRESHOLD&&t.classList.contains("pressing")&&t.classList.remove("pressing"),typeof this.onDragMove=="function"){const p=document.querySelectorAll(".staff-slot");let y=null,f=1/0;if(p.forEach(v=>{const x=v.getBoundingClientRect(),b=x.left+x.width/2,k=x.top+x.height/2,w=Math.hypot(b-h.clientX,k-h.clientY);w<f&&(f=w,y=v)}),p.length===0||y!==this._lastHoveredSlot){this._lastHoveredSlot=y;try{this.onDragMove(t,y,{x:h.clientX,y:h.clientY})}catch(v){console.warn(v)}}}},_=h=>{if(i!==h.pointerId)return;i=null;try{t.releasePointerCapture(h.pointerId)}catch{}if(a<this.TAP_THRESHOLD){if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null,null)}catch(b){console.warn(b)}}if(typeof this.onTap=="function")try{this.onTap(t)}catch(b){console.warn(b)}return}const m=document.querySelectorAll(".staff-slot");let g=null,u=1/0;const p=t.getBoundingClientRect(),y=p.left+p.width/2,f=p.top+p.height/2;m.forEach(b=>{const k=b.getBoundingClientRect(),w=k.left+k.width/2,L=k.top+k.height/2,S=Math.hypot(w-y,L-f);S<u&&(u=S,g=b)});const v=!!g&&u<oa&&g.dataset.id===e.note.id,x={x:y,y:f};if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null)}catch(b){console.warn(b)}}if(v&&this._spawnSourceShadow(e),typeof this.onDrop=="function")try{this.onDrop(t,g,v,x)}catch(b){console.warn(b)}};t.addEventListener("pointerdown",d),t.addEventListener("pointermove",c),t.addEventListener("pointerup",_),t.addEventListener("pointercancel",_),t.addEventListener("click",h=>{if(e.locked)return;const m=Date.now();if(!(m-(this._lastTapTime||0)<250&&this._lastTapEl===t)&&(this._lastTapTime=m,this._lastTapEl=t,typeof this.onTap=="function"))try{this.onTap(t)}catch(g){console.warn(g)}})}lockFish(e){const t=this.fishes.find(i=>i.note.id===e);t&&(t.locked=!0,t.el.classList.add("fish--locked"))}_spawnSourceShadow(e){if(!this.pool)return;const t=document.createElement("div");t.className="fish-source-shadow";const i=e.note&&e.note.color?e.note.color:"rgba(20,40,70,0.45)";t.style.setProperty("--shadow-color",i);const n=e.el.offsetWidth||(this._m?this._m.slotW:Nr),r=e.el.offsetHeight||(this._m?this._m.slotH:mi);t.style.left=`${e.originalLeft+n/2}px`,t.style.top=`${e.originalTop+r/2}px`,this.pool.appendChild(t),setTimeout(()=>{try{t.remove()}catch{}},1400)}setDragEnabled(e){this._dragEnabled=e!==!1}unlockAll(){this.fishes.forEach(e=>{e.locked=!1,e.el.classList.remove("fish--locked"),e.el.classList.remove("dragging","shake"),e.el.style.position="",e.el.style.left=`${e.originalLeft}px`,e.el.style.top=`${e.originalTop}px`,e.el.style.right="",e.el.style.bottom="",e.el.style.margin="",e.el.style.transform="",e.el.style.animationPlayState=""})}intro(){const e=()=>{if(this.fishes.length<this.notes.length){requestAnimationFrame(e);return}this.fishes.forEach((t,i)=>{F.fromTo(t.el,{y:140,opacity:0,scale:.4},{y:0,opacity:1,scale:1,duration:.6,delay:i*.08,ease:"back.out(1.7)"})})};e()}reset(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width>=2&&e.height>=2){const t=hs(e);this._m=t;const i=t.padX,n=e.width-t.padX-t.slotW,r=-t.overY,l=e.height-t.slotH,o=t.minDist,a=o*o,d=90,c=[],_=(h,m)=>{for(let g=0;g<c.length;g++){const u=c[g],p=u.x-h,y=u.y-m;if(p*p+y*y<a)return!1}return!0};this.fishes.forEach(h=>{const m=i+t.slotW/2,g=n-t.slotW/2,u=r+t.slotH/2,p=l-t.slotH/2,y=Math.max(1,g-m),f=Math.max(1,p-u);let v=0,x=0,b=!1;for(let k=0;k<d;k++){const w=m+Math.random()*y,L=u+Math.random()*f;if(_(w,L)){v=w,x=L,b=!0;break}}if(!b){let k=-1/0,w=m,L=u;for(let S=0;S<60;S++){const M=m+Math.random()*y,A=u+Math.random()*f;let $=1/0;for(let N=0;N<c.length;N++){const B=c[N],H=B.x-M,q=B.y-A,W=Math.sqrt(H*H+q*q);W<$&&($=W)}$>k&&(k=$,w=M,L=A)}v=w,x=L}h.originalLeft=v-t.slotW/2,h.originalTop=x-t.slotH/2,h.el.style.width=`${t.slotW}px`,h.el.style.height=`${t.slotH}px`,c.push({x:v,y:x})})}this.unlockAll(),this.fishes.forEach(t=>{F.fromTo(t.el,{y:60,opacity:.6,scale:.85},{y:0,opacity:1,scale:1,duration:.5,ease:"back.out(1.4)",delay:Math.random()*.15})})}getFishes(){return this.fishes.map(e=>e.el)}}const Gt=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"}];new Set(Gt.map(s=>s.id));const xn=125;function ua(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=3);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new sa(s.stage),s.fishPool=new Ms(s.stage,Gt,{fishDisplay:{showLabel:!1}}),s.fishPool.setDragEnabled(!0),s.fishPool.intro();const n={activeFishId:null,auditioned:new Set,placed:new Set,resolving:!1};s._level3Total=Gt.length,s._level3Count=0,s.say("👂 先点一条小鱼，听听它唱的声音。听完再把它放到高低合适的山上~");const r=o=>Gt.find(a=>a.id===o),l=o=>{n.activeFishId=null,s.scene.setListening(!1),s.scene.setHoverTarget(null),s.say(o||"再选一条小鱼，先听一听，再帮它找高低合适的山~")};return s.fishPool.onTap=o=>{const a=o?.dataset?.id,d=r(a);if(!(!d||n.placed.has(a)||n.resolving)){n.activeFishId=a,n.auditioned.add(a),s.scene.setListening(!0);try{s.audio.playNote(d.pitch)}catch{}F.fromTo(o,{scale:1},{scale:1.16,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"}),s.say("听到了吗？可以再点一次重听。想想它应该住在低一点，还是高一点的山~")}},s.fishPool.onDragStart=o=>{const a=o?.dataset?.id;if(!(!a||n.placed.has(a))){try{s.audio.hover(a)}catch{}if(!n.auditioned.has(a)){s.scene.setListening(!1),s.say("先松开，点这条小鱼听一听，再帮它找山吧~");return}s.scene.setListening(!0)}},s.fishPool.onDragMove=(o,a,d)=>{const c=o?.dataset?.id;if(!c||!n.auditioned.has(c)||!d){s.scene.setHoverTarget(null);return}const _=s.scene.getClosestTarget(d);s.scene.setHoverTarget(_?.distance<xn?_.target:null)},s.fishPool.onDrop=(o,a,d,c)=>{const _=o?.dataset?.id,h=r(_);if(!h||n.placed.has(_)||n.resolving)return;if(s.scene.setHoverTarget(null),!n.auditioned.has(_)){l("👂 先点这条小鱼听一听，再来找高低合适的山~"),F.to(o,{x:0,y:0,duration:.45,ease:"elastic.out(1, 0.55)"});return}const m=s.scene.getClosestTarget(c),g=m?.target,u=g?.dataset?.note;if(!!(g&&m.distance<xn)&&u===_){n.resolving=!0,n.placed.add(_),s._level3Count=n.placed.size,s.scene.markPlaced(_),s.scene.setProgress(n.placed.size);const y=g.getBoundingClientRect(),f=s.fishPool.root.getBoundingClientRect(),v=y.left-f.left+y.width/2,x=y.top-f.top+y.height*.58,b=parseFloat(o.style.left)||0,k=parseFloat(o.style.top)||0,w=v-b-o.offsetWidth/2,L=x-k-o.offsetHeight/2;try{s.audio.correct()}catch{}F.to(o,{x:w,y:L,scale:.78,duration:.52,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(_)}catch{}try{s.audio.playNote(h.pitch)}catch{}try{s.scene.bloomAt(y.left+y.width/2,y.top+y.height/2,h.color)}catch{}try{s._floatScore(y.left+y.width/2,y.top,`听对啦！${h.solfege}`)}catch{}if(n.resolving=!1,n.placed.size===Gt.length){s.say("🌟 五个声音都找到山啦！一起唱：Do Re Mi Sol La~"),setTimeout(()=>{const S=s._calcStars();try{s.progress.markLevelComplete(3,S)}catch{}try{s.audio.playScale(["C4","D4","E4","G4","A4"])}catch{}try{s.showWinOverlay(S,3)}catch{}},850);return}l(`✅ 听对啦，这是 ${h.solfege}！再选一条小鱼，先听后放~`)}});return}s.wrongCount++;try{s.audio.wrong()}catch{}o.classList.add("shake"),setTimeout(()=>o.classList.remove("shake"),400);try{s.audio.playNote(h.pitch)}catch{}F.to(o,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"}),n.activeFishId=_,s.scene.setListening(!0),s.say("再听一次，慢慢比一比它的高低。它应该住在哪一座山呢？")},()=>{try{s.scene?.teardown()}catch{}s.scene=null;const o=document.getElementById("hud-level2");o&&(o.style.display="");const a=document.querySelector(".hud__dots");a&&(a.style.display=""),typeof window<"u"&&(window.__forestPiano.currentLevelId=null)}}const ha=Object.freeze(Object.defineProperty({__proto__:null,default:ua},Symbol.toStringTag,{value:"Module"}));class fa{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level4-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- === 顶部小河 (河流动画) === -->
        <g class="level4-river">
          <!-- 河底柔光带 -->
          <path class="level4-river-band"
                d="M-40,200 L840,200 L840,250 L-40,250 Z"
                fill="url(#level4RiverGrad)" />
          <!-- 三条波纹 path, 不同速度 + 相位 -->
          <path class="level4-river-wave level4-river-wave--1"
                d="M-60,170 Q60,155 180,170 T420,170 T660,170 T900,170" />
          <path class="level4-river-wave level4-river-wave--2"
                d="M-60,190 Q80,180 200,195 T460,195 T700,195 T940,195" />
          <path class="level4-river-wave level4-river-wave--3"
                d="M-60,210 Q60,200 180,215 T420,215 T660,215 T900,215" />
          <path class="level4-river-wave level4-river-wave--4"
                d="M-60,235 Q90,225 220,238 T480,238 T720,238 T960,238" />
          <defs>
            <linearGradient id="level4RiverGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(120,200,235,0.30)" />
              <stop offset="100%" stop-color="rgba(80,160,200,0.10)" />
            </linearGradient>
          </defs>
        </g>

        <!-- 远景水草 -->
        <g class="level4-plants-far" opacity="0.55">
          <path class="level4-plant" d="M50,500 Q60,400 55,300 Q50,200 60,150" />
          <path class="level4-plant" d="M150,500 Q160,420 155,350" />
          <path class="level4-plant" d="M780,500 Q770,400 780,320 Q775,250 785,180" />
          <path class="level4-plant" d="M650,500 Q660,420 655,360" />
          <path class="level4-plant" d="M380,500 Q390,440 385,380" />
        </g>

        <!-- 河底小石头 (阴影 + 高光) -->
        <g class="level4-rocks">
          <ellipse cx="200" cy="490" rx="50" ry="8" fill="rgba(0,0,0,0.3)" />
          <ellipse cx="200" cy="487" rx="46" ry="5" fill="rgba(168,218,180,0.25)" />
          <ellipse cx="600" cy="495" rx="60" ry="7" fill="rgba(0,0,0,0.3)" />
          <ellipse cx="600" cy="492" rx="55" ry="4" fill="rgba(168,218,180,0.25)" />
          <ellipse cx="380" cy="492" rx="22" ry="4" fill="rgba(0,0,0,0.35)" />
        </g>

        <!-- === 大鼓锚点 (中央偏下) === -->
        <g class="level4-drum-anchor" transform="translate(400 340)">
          <!-- v20: 真实触控热区覆盖视觉红圈，孩子点红圈/鼓边都算敲鼓；
               透明且在最底层，不改变画面。 -->
          <circle class="level4-drum-hit-area" cx="0" cy="0" r="145" fill="transparent" />
          <!-- 同心圆目标环 (持续呼吸 — cue 到达时高亮闪一次) -->
          <circle class="level4-target-ring level4-target-ring--3" cx="0" cy="0" r="170"
                  fill="none" stroke="rgba(255,82,82,0.18)" stroke-width="2" />
          <circle class="level4-target-ring level4-target-ring--2" cx="0" cy="0" r="155"
                  fill="none" stroke="rgba(255,82,82,0.28)" stroke-width="2" />
          <circle class="level4-target-ring level4-target-ring--1" cx="0" cy="0" r="140"
                  fill="none" stroke="rgba(255,82,82,0.40)" stroke-width="2.5" />

          <!-- 鼓手小企鹅 (绘制在鼓之前, 被鼓覆盖; 只有头部从鼓上方探出) -->
          <g class="level4-drum-character">
            <!-- 企鹅身体 (鼓后隐藏) -->
            <ellipse class="level4-drum-character-body" cx="0" cy="-90" rx="18" ry="22" fill="#23232f" />
            <ellipse class="level4-drum-character-belly" cx="0" cy="-88" rx="11" ry="15" fill="#fff7df" />
            <!-- 企鹅头部 (鼓面之上) -->
            <circle class="level4-drum-character-head" cx="0" cy="-118" r="14" fill="#23232f" />
            <!-- 眼睛 -->
            <circle cx="-4.5" cy="-120" r="2.4" fill="#fff" />
            <circle cx="4.5" cy="-120" r="2.4" fill="#fff" />
            <circle cx="-4.5" cy="-119" r="1.2" fill="#1a1a1a" />
            <circle cx="4.5" cy="-119" r="1.2" fill="#1a1a1a" />
            <!-- 嘴 -->
            <path d="M-2.5,-114 L2.5,-114 L0,-109 Z" fill="#ff9933" />
          </g>

          <!-- 大鼓本体 -->
          <g class="level4-drum-wrap">
            <!-- 鼓底 (椭圆阴影) -->
            <ellipse cx="0" cy="65" rx="115" ry="14" fill="rgba(0,0,0,0.45)" />

            <!-- 鼓身 (圆柱体, 木头色) -->
            <ellipse cx="0" cy="55" rx="120" ry="30" fill="#3d2614" />
            <rect x="-120" y="-45" width="240" height="100" fill="#8b4513" />
            <!-- 鼓身木纹 -->
            <path d="M-120,-20 Q-60,-25 0,-20 T120,-20" stroke="#5d3a1a" stroke-width="1.5" fill="none" opacity="0.6" />
            <path d="M-120,15 Q-60,10 0,15 T120,15" stroke="#5d3a1a" stroke-width="1.5" fill="none" opacity="0.5" />
            <path d="M-120,40 Q-60,35 0,40 T120,40" stroke="#5d3a1a" stroke-width="1.5" fill="none" opacity="0.5" />
            <!-- 鼓身金属环 -->
            <ellipse cx="0" cy="-45" rx="120" ry="28" fill="#deb887" stroke="#8b4513" stroke-width="2" />
            <ellipse cx="0" cy="55" rx="120" ry="30" fill="#5d3a1a" stroke="rgba(0,0,0,0.4)" stroke-width="2" />

            <!-- 鼓面 (顶视, 亮色) -->
            <ellipse cx="0" cy="-45" rx="115" ry="26" fill="#f5deb3" stroke="#8b4513" stroke-width="3" />
            <!-- 鼓面 X 形扣绳 -->
            <g class="level4-drum-lacing" stroke="#5d3a1a" stroke-width="2.5" fill="none">
              <line x1="-90" y1="-25" x2="90" y2="-65" />
              <line x1="-90" y1="-65" x2="90" y2="-25" />
              <!-- 周边小扣 -->
              <circle cx="-95" cy="-30" r="2" fill="#5d3a1a" />
              <circle cx="0" cy="-72" r="2" fill="#5d3a1a" />
              <circle cx="95" cy="-30" r="2" fill="#5d3a1a" />
              <circle cx="0" cy="-18" r="2" fill="#5d3a1a" />
            </g>
            <!-- 金边圈 -->
            <ellipse cx="0" cy="-45" rx="115" ry="26" fill="none" stroke="#ffd700" stroke-width="3" />

            <!-- 鼓面文字 "咚!" -->
            <text x="0" y="-40" text-anchor="middle" class="level4-drum-text">咚</text>
          </g>

          <!-- 鼓手鼓槌 (绘制在鼓之后, 像真在敲鼓) -->
          <g class="level4-drum-arms">
            <!-- 左臂 -->
            <line class="level4-drum-stick level4-drum-stick--left"
                  x1="-10" y1="-110" x2="-45" y2="-55"
                  stroke="#a07050" stroke-width="3.5" stroke-linecap="round" />
            <circle class="level4-drum-stick level4-drum-stick--left"
                    cx="-45" cy="-55" r="4" fill="#fff8dc" />
            <!-- 右臂 -->
            <line class="level4-drum-stick level4-drum-stick--right"
                  x1="10" y1="-110" x2="45" y2="-55"
                  stroke="#a07050" stroke-width="3.5" stroke-linecap="round" />
            <circle class="level4-drum-stick level4-drum-stick--right"
                    cx="45" cy="-55" r="4" fill="#fff8dc" />
          </g>

          <!-- 大型节拍提示圆 (200px 直径, 默认隐藏) -->
          <circle class="level4-drum-cue-large" cx="0" cy="0" r="100"
                  fill="none" stroke="#ff5252" stroke-width="7" opacity="0" />
        </g>

        <!-- 节拍提示小环 (顶部保留, 由 JS 按需显示) -->
        <g class="level4-cue-anchor" transform="translate(400 235)">
          <circle class="level4-beat-cue" cx="0" cy="0" r="22"
                  fill="none" stroke="#ff5252" stroke-width="5" opacity="0" />
        </g>

        <!-- 鼓两侧装饰气泡 -->
        <g class="level4-deco-bubbles" opacity="0.7">
          <circle cx="180" cy="380" r="6" fill="rgba(255,255,255,0.5)">
            <animate attributeName="cy" values="380;360;340" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="220" cy="410" r="4" fill="rgba(255,255,255,0.45)">
            <animate attributeName="cy" values="410;380;350" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.25;0" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="620" cy="380" r="6" fill="rgba(255,255,255,0.5)">
            <animate attributeName="cy" values="380;360;340" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.3;0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="580" cy="410" r="4" fill="rgba(255,255,255,0.45)">
            <animate attributeName="cy" values="410;390;360" dur="4.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0.25;0" dur="4.5s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    `,this.stage.appendChild(e),this.background=e;const t=document.createElement("div");t.className="level4-fx-layer",this.stage.appendChild(t),this.fxLayer=t}getBeatCue(){return this.stage?this.stage.querySelector(".level4-beat-cue"):null}getDrum(){return this.stage?this.stage.querySelector(".level4-drum-hit-area"):null}getDrumVisual(){return this.stage?this.stage.querySelector(".level4-drum-wrap"):null}getDrumAnchor(){return this.stage?this.stage.querySelector(".level4-drum-anchor"):null}getCueLarge(){return this.stage?this.stage.querySelector(".level4-drum-cue-large"):null}getFxLayer(){return this.fxLayer||null}getDrumScreenCenter(){const e=this.getDrumVisual()||this.getDrum();if(!e)return{x:window.innerWidth/2,y:window.innerHeight/2};const t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2}}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null,this.fxLayer&&this.fxLayer.parentNode&&this.fxLayer.parentNode.removeChild(this.fxLayer),this.fxLayer=null}}const pa=[["T","T","tt","T"],["tt","T","T","tt","T","T"],["T","tt","T","tt","tt","T","T","T","tt","T"]],Us=3800,wn=260,_a=620;function va(s,e){return s<=1?3:s<=3?2:s<=5?1:0}function ya(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=4);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.wrongCount=0,s.scene=new fa(s.stage),s.say("先看一遍：只有泡泡碰到鼓的时候，才需要敲鼓~");const i=!s.progress?.hasCompletedLevel?.(4),n=[];pa.forEach(E=>{E.forEach(P=>{P==="tt"?(n.push({double:!0,isSecond:!1}),n.push({double:!0,isSecond:!0})):n.push({double:!1})})});const r=n.length;s._level4Total=r,s._level4Processed=0,s._level4Pending=[],s._level4Done=!1,s._level4Correct=0,s._level4Timeouts=[],s._level4CueTimers=[],s._level4Teaching=i,s._level4TutorialStep=i?0:2,s._level4TutorialHits=0,s.stage.insertAdjacentHTML("beforeend",`
    <div class="level4-rhythm-guide" role="status" aria-live="polite">
      <div class="level4-rhythm-guide__label">${i?"第 1 步：先看老师示范":"节奏挑战"}</div>
      <div class="level4-rhythm-guide__state">${i?"👀 泡泡碰到鼓，才敲！":"👀 看泡泡，等它碰到鼓"}</div>
      <div class="level4-rhythm-guide__count">${i?"现在不计分，先观察":`节拍 0 / ${r}`}</div>
    </div>
    <div class="level4-bubbles-container"></div>
  `);const l=s.stage.querySelector(".level4-bubbles-container"),o=s.stage.querySelector(".level4-rhythm-guide"),a=o?.querySelector(".level4-rhythm-guide__state"),d=o?.querySelector(".level4-rhythm-guide__count"),c=(E,P)=>{!o||!a||(o.dataset.state=E,a.textContent=P)},_=()=>{d&&(s._level4TutorialStep===0?d.textContent="现在不计分，先观察":s._level4TutorialStep===1?d.textContent=`跟着试两拍 ${s._level4TutorialHits} / 2`:d.textContent=`节拍 ${s._level4Processed} / ${r}`)},m=(l||s.stage).getBoundingClientRect(),g=m.width;m.height;const u=s.scene.getDrumScreenCenter(),p=u.x-m.left-20,y=u.y-m.top-20,f=-50,v=g+100,x=(p-f)/(v-f),b=s.scene.getFxLayer(),k=s.scene.getDrumAnchor(),w=s.scene.getCueLarge();function L(){const E=s.scene.getDrumScreenCenter();if(!b||typeof E.x!="number")return E;const P=b.getBoundingClientRect();return{x:E.x-P.left,y:E.y-P.top}}function S(){if(!b)return;const E=L();for(let P=0;P<3;P++){const D=document.createElement("div");D.className="level4-drum-ripple level4-drum-ripple--"+(P+1),D.style.left=E.x+"px",D.style.top=E.y+"px",b.appendChild(D),setTimeout(()=>D.remove(),900)}}function M(){if(!b)return;const E=L(),P=["#ffd166","#ef476f","#06d6a0","#118ab2","#ff9f1c"],D=12;for(let R=0;R<D;R++){const O=document.createElement("div");O.className="level4-drum-particle";const I=P[Math.floor(Math.random()*P.length)];O.style.background=I,O.style.boxShadow="0 0 6px "+I;const G=Math.PI*2*R/D+Math.random()*.4,V=70+Math.random()*50,K=Math.cos(G)*V,Y=Math.sin(G)*V-30;O.style.setProperty("--dx",K.toFixed(1)+"px"),O.style.setProperty("--dy",Y.toFixed(1)+"px"),O.style.left=E.x+"px",O.style.top=E.y+"px";const Z=6+Math.random()*6;O.style.width=Z+"px",O.style.height=Z+"px",b.appendChild(O),setTimeout(()=>O.remove(),700)}}function A(){if(!b)return;const E=L(),P=document.createElement("div");P.className="level4-floating-score level4-floating-score--plus",P.textContent="+1",P.style.left=E.x+"px",P.style.top=E.y-50+"px",b.appendChild(P),setTimeout(()=>P.remove(),850)}function $(){if(!b)return;const E=L(),P=document.createElement("div");P.className="level4-floating-score level4-floating-score--minus",P.textContent="-1",P.style.left=E.x+"px",P.style.top=E.y-50+"px",b.appendChild(P),setTimeout(()=>P.remove(),850)}function N(){if(s._level4Done)return;k&&k.classList.add("level4-cue-now"),w&&w.classList.add("level4-cue-active");const E=s._level4TutorialStep===0?"👀 看！泡泡碰到鼓了":"🥁 现在敲鼓！";c("hit",E);try{s.audio.hover()}catch{}const P=setTimeout(()=>{k&&k.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active")},_a);s._level4CueTimers.push(P)}let B=0,H=null;const q=()=>{s._level4Done||(s._level4Done=!0,s._level4Timeouts.push(setTimeout(()=>{const E=va(s.wrongCount);try{s.progress.markLevelComplete(4,E)}catch{}try{s.audio.playScale(["C4","D4","E4","G4","A4"])}catch{}try{s.showWinOverlay(E,4)}catch{}},700)))},W=(E=360)=>{if(s._level4Done)return;if(B>=r){q();return}const P=n[B],D=B++;s._level4Timeouts.push(setTimeout(()=>be(P,D),E))},U=E=>{if(!(s._level4Done||!H||H.idx!==E)){if(s._level4Pending=[],H=null,s._level4Processed++,_(),k&&k.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active"),s._level4TutorialStep===0){try{s.audio.playNote("C4")}catch{}S(),M(),c("teach","✨ 看！泡泡碰到鼓，鼓就“咚”"),s.say("看见了吗？泡泡碰到鼓时，鼓亮起来、发出咚声。下一次轮到你试试！"),s._level4TutorialStep=1,o&&(o.querySelector(".level4-rhythm-guide__label").textContent="第 2 步：等鼓亮，再敲两次"),_()}else{s.wrongCount++;try{s.audio.wrong()}catch{}$(),c("miss","❌ 漏了一拍，下一颗再试"),s._level4TutorialStep===1&&s.say("没关系，等鼓亮起来再敲一次~")}W(s._level4TutorialStep===0?800:420)}};function be(E,P){if(!l||s._level4Done)return;const D=document.createElement("div");D.className="level4-bubble",E.double&&E.isSecond&&D.classList.add("level4-bubble-half"),E.double&&D.classList.add("level4-bubble--double"),D.textContent=E.double?E.isSecond?"2":"1":"●",l.appendChild(D);try{D.animate([{transform:`translate(${f}px, ${y}px)`},{transform:`translate(${p}px, ${y}px)`,offset:x},{transform:`translate(${v}px, ${y}px)`}],{duration:Us,fill:"forwards",easing:"linear"})}catch{D.style.left=`${f}px`,D.style.top=`${y}px`}const R=Us*x;s._level4Timeouts.push(setTimeout(()=>{s._level4Done||(N(),H={beat:E,idx:P,when:Date.now(),bubble:D},s._level4Pending=[H],s._level4Timeouts.push(setTimeout(()=>U(P),wn)))},R)),s._level4Timeouts.push(setTimeout(()=>D.remove(),Us+80))}W(800);const C=s.scene.getDrum(),T=s.scene.getDrumVisual();if(C){C.style.cursor="pointer",C.style.touchAction="manipulation";const E=P=>{if(P.preventDefault(),P.stopPropagation(),s._level4Done)return;T&&(T.classList.remove("level4-drum-hit"),T.offsetWidth,T.classList.add("level4-drum-hit"),s._level4Timeouts.push(setTimeout(()=>{T.classList.remove("level4-drum-hit")},280))),k&&(k.classList.remove("level4-drum-character-hit"),k.offsetWidth,k.classList.add("level4-drum-character-hit"),setTimeout(()=>{k&&k.classList.remove("level4-drum-character-hit")},280));const D=Date.now();if(s._level4Pending.filter(O=>Math.abs(D-O.when)<wn).length>0){s._level4TutorialStep===1&&(s._level4TutorialHits++,s._level4TutorialHits>=2&&(s._level4TutorialStep=2,o&&(o.classList.add("level4-rhythm-guide--compact"),o.querySelector(".level4-rhythm-guide__label").textContent="节奏挑战"),c("good","🌟 学会啦，听鼓亮再敲！"),s.say("学会啦！接下来跟着泡泡和亮鼓自己试试~")),_()),s._level4Correct++,s._level4Pending=[],H=null,s._level4Processed++,_();try{s.audio.playNote("C4")}catch{}S(),M(),A(),k&&k.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active");const O=s._level4TutorialStep===2;c("good",O?"✅":"✅ 对上啦！继续看下一颗");const I=["咚!","咚!咚!","完美!","棒呀!","节拍对!"];(!O||s._level4TutorialHits===2)&&s.say(I[Math.min(s._level4Correct-1,I.length-1)]),s._level4Timeouts.push(setTimeout(()=>{c("wait",O?"🎵":"👀 看下一颗泡泡，先等一等")},560)),W(O?300:540)}else{if(s._level4TutorialStep===0){c("teach","👀 先等泡泡碰到鼓"),s.say("现在先看一看，等鼓亮起来再敲~");return}s.wrongCount++;try{s.audio.wrong()}catch{}T&&(T.classList.add("level4-drum-shake"),setTimeout(()=>T.classList.remove("level4-drum-shake"),360)),$(),k&&k.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active"),c("bad","✋ 现在先别敲，等泡泡到鼓"),s.say("咦, 现在不是节拍! 看泡泡到鼓位再敲"),s._level4Timeouts.push(setTimeout(()=>c("wait","👀 看泡泡，等它碰到鼓"),720))}};C.addEventListener("pointerdown",E),s._level4DrumHandler=E}return()=>{if(Array.isArray(s._level4Timeouts)&&(s._level4Timeouts.forEach(O=>clearTimeout(O)),s._level4Timeouts=[]),Array.isArray(s._level4CueTimers)&&(s._level4CueTimers.forEach(O=>clearTimeout(O)),s._level4CueTimers=[]),Array.isArray(s._level4Pending)&&(s._level4Pending=[]),s._level4Done=!0,s._level4DrumHandler&&C&&C.removeEventListener("pointerdown",s._level4DrumHandler),s._level4DrumHandler=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}(s.stage?s.stage.querySelectorAll(".level4-bubbles-container"):[]).forEach(O=>O.remove());const P=document.getElementById("hud-level2");P&&(P.style.display="none");const D=document.querySelector(".hud__dots");D&&(D.style.display="");const R=document.getElementById("btn-replay");R&&(R.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const ma=Object.freeze(Object.defineProperty({__proto__:null,default:ya},Symbol.toStringTag,{value:"Module"}));class ga{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level5-background";let t="";for(let i=0;i<40;i++){const n=Math.random()*100,r=Math.random()*50,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level5-stars-tiny" cx="${n}%" cy="${r}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- 随机小星星 -->
        ${t}

        <!-- 新月 -->
        <g class="level5-moon">
          <circle cx="700" cy="80" r="40" fill="#fff8dc" />
          <circle cx="715" cy="68" r="38" fill="#1a1a3a" />
        </g>

        <!-- 闪烁星星 SVG (大颗, 3 个) -->
        <g class="level5-star-big-group">
          <g class="level5-star-big" transform="translate(200, 100)">
            <path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="#fff8a8" />
          </g>
          <g class="level5-star-big" transform="translate(450, 60)">
            <path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="#fff8a8" />
          </g>
          <g class="level5-star-big" transform="translate(550, 130)">
            <path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3 Z" fill="#fff8a8" />
          </g>
        </g>

        <!-- v18.1: 指挥家 (top-center) — 摇摆, 挥舞指挥棒 -->
        <g class="level5-conductor" transform="translate(120, 18)">
          <!-- 头 -->
          <circle class="level5-conductor-head" cx="0" cy="0" r="10" fill="#ffd9a8" />
          <!-- 礼帽 -->
          <rect class="level5-conductor-hat" x="-9" y="-16" width="18" height="6" rx="1" fill="#1a1420" />
          <rect class="level5-conductor-hat" x="-12" y="-11" width="24" height="2" fill="#1a1420" />
          <!-- 笑脸 -->
          <circle cx="-3" cy="-1" r="1.2" fill="#1a1420" />
          <circle cx="3" cy="-1" r="1.2" fill="#1a1420" />
          <path d="M-3,3 Q0,5 3,3" stroke="#1a1420" stroke-width="1" fill="none" stroke-linecap="round" />
          <!-- 燕尾服身体 -->
          <path class="level5-conductor-body"
                d="M-7,10 L-10,28 L10,28 L7,10 Z"
                fill="#1a1420" />
          <!-- 白衬衫领 -->
          <path d="M-2,10 L0,14 L2,10 Z" fill="#fff" />
          <!-- 左手臂 + 指挥棒 -->
          <g class="level5-conductor-arm-l">
            <line x1="-7" y1="13" x2="-15" y2="6" stroke="#1a1420" stroke-width="2.5" stroke-linecap="round" />
            <line x1="-15" y1="6" x2="-22" y2="0" stroke="#fff8a8" stroke-width="2" stroke-linecap="round" />
          </g>
          <!-- 右手臂 (挥舞) -->
          <g class="level5-conductor-arm-r">
            <line x1="7" y1="13" x2="15" y2="6" stroke="#1a1420" stroke-width="2.5" stroke-linecap="round" />
            <line x1="15" y1="6" x2="22" y2="0" stroke="#fff8a8" stroke-width="2" stroke-linecap="round" />
          </g>
        </g>

        <!-- 远树剪影 (中景) -->
        <path class="level5-trees" d="M0,500 L0,360 L60,330 L80,360 L100,300 L150,360 L170,330 L210,360 L230,330 L260,360 L800,360 L800,500 Z" />
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const ba=["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"],Qs={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},He=80,xa=80,wa=60;function Ta(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=5);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.createElement("style");i.dataset.levelStyle="5",i.textContent=`
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      /* v19.5: L5 星空背景 z-index:1 是不透明层；键盘若 z:auto 会被完整盖住。 */
      z-index: 2;
      height: clamp(92px, 24%, 170px);
    }
    #stage > .keyboard-area > svg.keyboard {
      width: 100%;
      height: 100%;
    }
  `,document.head.appendChild(i),s.scene=new ga(s.stage),s.say("森林乐团要奏小星星! 看音符掉到哪个键, 就按哪个~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level5-staff-area"></div>');const n=s.stage.querySelector(".level5-staff-area");n.innerHTML=`
    <svg class="level5-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
      <line class="level5-staff-line" x1="40" y1="${He+40}" x2="760" y2="${He+40}" />
      <line class="level5-staff-line" x1="40" y1="${He+60}" x2="760" y2="${He+60}" />
      <line class="level5-staff-line" x1="40" y1="${He+80}" x2="760" y2="${He+80}" />
      <line class="level5-staff-line" x1="40" y1="${He+100}" x2="760" y2="${He+100}" />
      <line class="level5-staff-line" x1="40" y1="${He+120}" x2="760" y2="${He+120}" />
      <!-- 当前音符位置 -->
      <circle class="level5-current-note" cx="400" cy="0" r="14" fill="#ffd166" />
    </svg>
  `,s.stage.insertAdjacentHTML("beforeend",`
    <div class="level5-metronome" id="level5-metronome">
      <span class="level5-metronome-note">♩=</span>
      <span class="level5-metronome-bpm" id="level5-bpm">${xa}</span>
      <span class="level5-metronome-mode" id="level5-mode"></span>
    </div>
  `),s.kb=new gt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level5Seq=[...ba],s._level5Total=s._level5Seq.length,s._level5Correct=0,s._level5Idx=0,s._level5Accepting=!0,s._level5Done=!1,s._level5EasyMode=!1,s._level5ConsecWrong=0;const r={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function l(){return n.querySelector(".level5-current-note")}function o(_,h){const m=document.getElementById("level5-bpm"),g=document.getElementById("level5-mode");m&&(m.textContent=String(_)),g&&(g.textContent=h);const u=document.getElementById("level5-metronome");u&&u.classList.toggle("level5-metronome--easy",!0)}function a(){const _=s._level5Idx||0,h=s._level5Total||14,g=4+Math.min(1,_/Math.max(1,h-1))*1.5;return s._level5EasyMode?g+1.5:g}function d(){if(!s._level5EasyMode&&s._level5ConsecWrong>=3){s._level5EasyMode=!0,o(wa,"轻松模式");try{s.say("进入轻松模式~ 慢慢来不着急!")}catch{}}}function c(){if(s._level5Done||s._level5Idx>=s._level5Seq.length)return;const _=s._level5Seq[s._level5Idx],h=Qs[_],m=r[h.id],g=l();if(!g)return;F.killTweensOf(g),F.set(g,{scale:1}),g.setAttribute("cy",m),g.dataset.pitch=_,g.classList.remove("dropping","incorrect"),s.say(`下一个: ${h.solfege} (${_})`),s._level5Accepting=!0;const u=a();F.fromTo(g,{attr:{cy:m},opacity:1},{attr:{cy:m+100},opacity:.9,duration:u,ease:"none",onComplete:()=>{if(!s._level5Done&&s._level5Accepting){s._level5Accepting=!1,s.wrongCount++,s._level5ConsecWrong++,d();try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),g.classList.add("incorrect"),setTimeout(()=>{g.classList.remove("incorrect"),s._level5Idx++,c()},600)}}})}return s.kb.onPress=_=>{if(!s._level5Accepting||s._level5Done)return;const h=s._level5Seq[s._level5Idx],m=_.dataset.pitch;if(m===h){s._level5Correct++,s._level5Accepting=!1,s._level5ConsecWrong=0;try{s.audio.correct()}catch{}try{s.audio.playNote(m)}catch{}const g=l();g&&(F.killTweensOf(g),F.to(g,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),s.say(["完美!","星星在向你眨眼!","小星星~"][Math.min(s._level5Correct-1,2)]),s._level5Idx++,s._level5Idx>=s._level5Seq.length?(s._level5Done=!0,setTimeout(()=>{const u=s._calcStars();try{s.progress.markLevelComplete(5,u)}catch{}try{s.audio.playScale(["C4","C4","G4","G4","A4","A4","G4"])}catch{}s.say("✨ 完美的《小星星》!"),s.showWinOverlay(u,5)},800)):setTimeout(c,500)}else{s.wrongCount++,s._level5ConsecWrong++,d();try{s.audio.wrong()}catch{}const g=Qs[m];s.say(`这是 ${g?g.solfege:"?"}, 不是 ${Qs[h].solfege}. 再听一下!`);const u=l();u&&u.classList.add("incorrect"),setTimeout(()=>{u&&u.classList.remove("incorrect")},300);try{s.audio.playNote(h)}catch{}}},setTimeout(c,1e3),()=>{s.scene&&typeof s.scene.teardown=="function"&&s.scene.teardown(),i&&i.parentNode&&i.remove();const _=n&&n.querySelector(".level5-current-note");_&&F.killTweensOf(_),s.stage.querySelectorAll(".level5-staff-area").forEach(u=>u.remove());const h=document.getElementById("level5-metronome");h&&h.remove();const m=document.getElementById("hud-level2");m&&(m.style.display="");const g=document.querySelector(".hud__dots");g&&(g.style.display="none"),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const ka=Object.freeze(Object.defineProperty({__proto__:null,default:Ta},Symbol.toStringTag,{value:"Module"}));class Sa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level6-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- 装饰墙画 (圆点) -->
        <circle class="level6-deco" cx="120" cy="100" r="40" fill="#f4a261" opacity="0.55" />
        <circle class="level6-deco" cx="680" cy="120" r="50" fill="#e76f51" opacity="0.5" />
        <circle class="level6-deco" cx="60" cy="350" r="32" fill="#ffd166" opacity="0.5" />
        <circle class="level6-deco" cx="740" cy="380" r="38" fill="#f4a261" opacity="0.4" />

        <!-- 装饰小音符 (墙上) -->
        <g class="level6-notes-deco" fill="#3d405b" opacity="0.35" font-family="serif" font-size="40" font-weight="700">
          <text x="220" y="80">&#9835;</text>
          <text x="350" y="120">&#9833;</text>
          <text x="500" y="70">&#9836;</text>
        </g>

        <!-- 钢琴外壳 (深棕框 + 白键台) -->
        <g class="level6-piano-shape" transform="translate(400, 360)">
          <!-- 影子 -->
          <ellipse cx="0" cy="80" rx="320" ry="14" fill="rgba(0, 0, 0, 0.28)" />
          <!-- 琴顶深棕边框 -->
          <rect x="-300" y="-30" width="600" height="22" rx="6" fill="#3d2b1a" />
          <!-- 白键台背景 -->
          <rect x="-290" y="-12" width="580" height="92" rx="4" fill="#fdfbf5" />
          <!-- 木框边 -->
          <rect x="-300" y="-30" width="600" height="110" rx="8" fill="none" stroke="#3d2b1a" stroke-width="2" />
        </g>

        <!-- 老师 (右上角) — 双手更大更明显 -->
        <g class="level6-teacher" transform="translate(620, 100)">
          <!-- 头发 (后) -->
          <ellipse cx="0" cy="0" rx="26" ry="22" fill="#5d3a1a" />
          <!-- 脸 -->
          <circle cx="0" cy="2" r="22" fill="#deb887" />
          <!-- 头发 (前刘海) -->
          <path d="M-22,-5 Q-15,-25 0,-25 Q15,-25 22,-5 L18,-3 Q15,-20 0,-22 Q-15,-20 -18,-3 Z" fill="#5d3a1a" />
          <!-- 眼睛 -->
          <circle cx="-8" cy="-2" r="2.2" fill="#3d405b" />
          <circle cx="8" cy="-2" r="2.2" fill="#3d405b" />
          <!-- 腮红 -->
          <circle cx="-12" cy="6" r="3" fill="#e76f51" opacity="0.55" />
          <circle cx="12" cy="6" r="3" fill="#e76f51" opacity="0.55" />
          <!-- 嘴 (微笑) -->
          <path d="M-6,10 Q0,14 6,10" stroke="#3d405b" stroke-width="2" fill="none" stroke-linecap="round" />
          <!-- 脖子 -->
          <rect x="-5" y="20" width="10" height="6" fill="#deb887" />
          <!-- 服装 (紫色连衣裙上身) -->
          <path d="M-24,26 Q-28,32 -24,40 L-30,70 L30,70 L24,40 Q28,32 24,26 L12,28 Q8,30 0,30 Q-8,30 -12,28 Z" fill="#6a4c93" />
          <!-- 衣领白点 -->
          <circle cx="0" cy="36" r="2.5" fill="#fdfbf5" />

          <!-- 左手 (抬起 + 播放示意) -->
          <g class="level6-hand level6-hand--l">
            <!-- 上臂 -->
            <rect x="-3" y="0" width="6" height="22" fill="#deb887" />
            <!-- 手掌 -->
            <circle cx="0" cy="0" r="10" fill="#deb887" stroke="#a08060" stroke-width="1.2" />
            <!-- 大拇指 -->
            <ellipse cx="-7" cy="2" rx="2.5" ry="4" fill="#deb887" stroke="#a08060" stroke-width="1" transform="rotate(-30 -7 2)" />
            <!-- 食指/中指/无名指/小指 -->
            <rect x="-5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="-1.8" y="-13" width="2.6" height="10" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="1.5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="4.5" y="-10" width="2.4" height="7" rx="1.2" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <!-- 绿环 (左手标记) -->
            <circle cx="0" cy="0" r="12" fill="none" stroke="#4caf50" stroke-width="2" opacity="0.7" />
          </g>

          <!-- 右手 (抬起 + 播放示意) -->
          <g class="level6-hand level6-hand--r">
            <rect x="-3" y="0" width="6" height="22" fill="#deb887" />
            <circle cx="0" cy="0" r="10" fill="#deb887" stroke="#a08060" stroke-width="1.2" />
            <ellipse cx="7" cy="2" rx="2.5" ry="4" fill="#deb887" stroke="#a08060" stroke-width="1" transform="rotate(30 7 2)" />
            <rect x="-5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="-1.8" y="-13" width="2.6" height="10" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="1.5" y="-12" width="2.6" height="9" rx="1.3" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <rect x="4.5" y="-10" width="2.4" height="7" rx="1.2" fill="#deb887" stroke="#a08060" stroke-width="0.8" />
            <!-- 黄环 (右手标记) -->
            <circle cx="0" cy="0" r="12" fill="none" stroke="#ffc107" stroke-width="2" opacity="0.7" />
          </g>

          <!-- 老师标签 -->
          <text x="0" y="56" text-anchor="middle" font-family="'ZCOOL KuaiLe', sans-serif"
                font-size="14" font-weight="900" fill="#fdfbf5"
                style="paint-order: stroke; stroke: #3d2b1a; stroke-width: 2;">老师</text>
        </g>

        <!-- 节拍器 — 老师左下方的小钟摆, 持续摇晃 -->
        <g class="level6-metronome" transform="translate(540, 200)">
          <!-- 主体梯形 -->
          <path d="M-16,30 L-22,46 L22,46 L16,30 Z" fill="#3d2b1a" stroke="#1a0f08" stroke-width="1.5" />
          <!-- 顶部 -->
          <rect x="-4" y="22" width="8" height="10" fill="#3d2b1a" />
          <!-- 摆杆 -->
          <g class="level6-metronome-arm">
            <line x1="0" y1="20" x2="0" y2="-30" stroke="#deb887" stroke-width="3" stroke-linecap="round" />
            <!-- 摆锤 -->
            <rect x="-4" y="-12" width="8" height="14" rx="2" fill="#ffc107" stroke="#a06800" stroke-width="1" />
            <!-- 顶端固定点 -->
            <circle cx="0" cy="20" r="3" fill="#ffc107" stroke="#a06800" stroke-width="1" />
          </g>
          <!-- BPM 标签 -->
          <text x="0" y="58" text-anchor="middle" font-family="'ZCOOL KuaiLe', sans-serif"
                font-size="9" font-weight="700" fill="#fdfbf5"
                style="paint-order: stroke; stroke: #3d2b1a; stroke-width: 1.2;">节拍</text>
        </g>

        <!-- 老师指示箭头 (从老师手 → 键盘) -->
        <path class="level6-arrow" d="M620,200 Q540,220 460,250" stroke="#3d405b"
              stroke-width="3" fill="none" marker-end="url(#level6-arrowhead)" stroke-linecap="round" />
        <defs>
          <marker id="level6-arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#3d405b" />
          </marker>
        </defs>

        <!-- 装饰小音符 (左下漂浮) -->
        <g class="level6-notes-float" fill="#6a4c93" opacity="0.7" font-family="serif" font-size="28" font-weight="700">
          <text x="80" y="280" class="level6-note-float">&#9833;</text>
          <text x="60" y="180" class="level6-note-float">&#9835;</text>
          <text x="100" y="220" class="level6-note-float">&#9836;</text>
        </g>
      </svg>

      <!-- 当前和弦指示 (DOM 文本 — 由 Level6.js 写入内容) -->
      <div class="level6-chord-indicator">
        <span class="level6-chord-indicator__label">当前题目</span>
        <span class="level6-chord-indicator__chord">—</span>
      </div>
    `,this.stage.appendChild(e),this.background=e}setChordLabel(e){if(!this.background)return;const t=this.background.querySelector(".level6-chord-indicator__chord");t&&(t.textContent=e)}celebrateClap(){if(!this.background)return;const e=this.background.querySelector(".level6-teacher");e&&(e.classList.remove("level6-clap"),e.offsetWidth,e.classList.add("level6-clap"),setTimeout(()=>e.classList.remove("level6-clap"),1200))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Me=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Ks=new Set(["do","re","mi"]),La=new Set(["fa","sol","la","si"]),Ft=[{high:"fa",low:"do",label:"Fa 上 + Do 下"},{high:"sol",low:"re",label:"Sol 上 + Re 下"},{high:"la",low:"mi",label:"La 上 + Mi 下"},{high:"si",low:"do",label:"Si 上 + Do 下"},{high:"sol",low:"mi",label:"Sol 上 + Mi 下"}],Ca=2e3,Ma=["C4","D4","E4","F4","G4","A4","B4"],Tn=["完美!","双手协作!","和谐!","真厉害!","双手小钢琴家!"];function Ea(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=6);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.querySelectorAll("#hud-dots .dot");n.forEach(h=>h.classList.remove("on")),n.forEach((h,m)=>{m>=5?h.style.display="none":h.style.display=""});const r=document.createElement("style");r.dataset.levelStyle="6",r.textContent=`
    #stage { --lv6-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2; /* v20: 高于不透明教室背景(z1)，否则键盘不可见/不可点 */
      height: var(--lv6-kb-h);
    }
    #stage > .keyboard-area > svg.keyboard {
      width: 100%;
      height: 100%;
    }
    #stage .level6-chord-indicator {
      left: auto;
      right: max(10px, 7%);
      top: min(calc(100% - var(--lv6-kb-h) - 60px), 54%);
    }
  `,document.head.appendChild(r),s.scene=new Sa(s.stage),s.kb=new gt(s.stage,Me),setTimeout(()=>{!s.kb||!s.kb.svg||Me.forEach(h=>{const m=s.kb.svg.querySelector(`.key--white[data-id="${h.id}"]`);if(!m)return;Ks.has(h.id)?m.classList.add("level6-lh"):La.has(h.id)&&m.classList.add("level6-rh");const g=m.querySelector(".key__label");if(g){const u=document.createElementNS("http://www.w3.org/2000/svg","text"),p=g.getAttribute("x")||"40";u.setAttribute("x",p),u.setAttribute("y","150"),u.setAttribute("text-anchor","middle"),u.setAttribute("font-family","'ZCOOL KuaiLe', sans-serif"),u.setAttribute("font-size","12"),u.setAttribute("font-weight","900"),u.setAttribute("fill",Ks.has(h.id)?"#2d6e3e":"#a06800"),u.setAttribute("class","level6-hand-tag"),u.setAttribute("style","pointer-events: none; paint-order: stroke; stroke: white; stroke-width: 2;"),u.textContent=Ks.has(h.id)?"左手":"右手",m.appendChild(u)}})},50),s.say("钢琴老师教双手协调! 左低右高, 同时按下两个键~ 🎹"),s._level6Idx=0,s._level6Total=Ft.length,s._level6Correct=0,s._level6Done=!1,s._level6Current=null,s._level6PressFirst=null,s._level6PairTimer=null,s._level6Locked=!1;function l(h){!s.kb||!s.kb.svg||[h.high,h.low].forEach(m=>{const g=s.kb.svg.querySelector(`.key--white[data-id="${m}"]`);g&&s.kb.glowKey(g)})}function o(h,m){try{s.audio.playNote(h),setTimeout(()=>{try{s.audio.playNote(m)}catch{}},8)}catch{}}function a(h){if(h>=Ft.length)return d();const m=Ft[h];s._level6Current=m,s._level6PressFirst=null,s._level6Locked=!1;const g=Me.find(p=>p.id===m.high),u=Me.find(p=>p.id===m.low);s.say(`第 ${h+1} / ${Ft.length} 题: 请同时按 ${g.solfege} (右手) + ${u.solfege} (左手) ✨`);try{s.scene.setChordLabel(m.label)}catch{}setTimeout(()=>l(m),300),setTimeout(()=>{try{o(g.pitch,u.pitch)}catch{}},600)}function d(){s._level6Done=!0;const h=s._calcStars();try{s.progress.markLevelComplete(6,h)}catch{}try{s.audio.playScale(Ma)}catch{}s.say("双手小钢琴家毕业! 🎓🎹");try{s.scene.setChordLabel("毕业啦")}catch{}setTimeout(()=>{try{s.showWinOverlay(h,6)}catch{}},1200)}s.kb.onPress=h=>{if(s._level6Done||s._level6Locked||!s._level6Current||!h||!h.classList.contains("key--white"))return;const m=h.dataset.id,g=s._level6Current,u=new Set([g.high,g.low]),p=s._level6PressFirst;if(p&&p.id!==m){if(u.has(m)&&u.has(p.id)&&p.id!==m){c(h);return}_(h,m);return}if(!p){if(!u.has(m)){_(h,m);return}s._level6PressFirst={id:m,at:Date.now()};try{s.audio.playNote(h.dataset.pitch)}catch{}try{s.kb.glowKey(h)}catch{}h.classList.add("level6-pressed"),setTimeout(()=>h.classList.remove("level6-pressed"),500),s._level6PairTimer&&clearTimeout(s._level6PairTimer),s._level6PairTimer=setTimeout(()=>{const y=s._level6PressFirst;if(y){const f=Me.find(b=>b.id===y.id),v=Me.find(b=>b.id===g.high),x=Me.find(b=>b.id===g.low);s.say(`光按了 ${f?f.solfege:"?"} 还不够哦, 再按 ${v.solfege} (右手) 或 ${x.solfege} (左手)~`),s.wrongCount++}s._level6PressFirst=null},Ca);return}try{s.kb.glowKey(h)}catch{}try{s.audio.playNote(h.dataset.pitch)}catch{}};function c(h){const m=s._level6PressFirst;if(!m||!s._level6Current)return;const g=m.id,u=h.dataset.id,p=Me.find(v=>v.id===g),y=Me.find(v=>v.id===u);if(p&&y)o(p.pitch,y.pitch);else try{p&&s.audio.playNote(p.pitch),y&&s.audio.playNote(y.pitch)}catch{}[g,u].forEach(v=>{const x=s.kb.svg.querySelector(`.key--white[data-id="${v}"]`);if(x){x.classList.add("level6-pressed");try{s.kb.glowKey(x)}catch{}setTimeout(()=>x.classList.remove("level6-pressed"),500)}}),s._level6Correct++,s._level6Locked=!0,s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null;const f=Tn[Math.min(s._level6Correct-1,Tn.length-1)];s.say(`${f} 双音 ${s._level6Correct} / ${Ft.length}`),n[s._level6Correct-1]&&n[s._level6Correct-1].classList.add("on");try{s.scene.celebrateClap()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"🎵 双音!")}catch{}try{const v=document.createElement("div");v.className="level6-flash",document.body.appendChild(v),setTimeout(()=>v.remove(),600)}catch{}try{const v=h.getBoundingClientRect(),x=v.left+v.width/2,b=v.top+v.height/2,k=(Me.find(w=>w.id===s._level6Current.high)||{}).color||"#ffd166";s.burst(x,b,k)}catch{}try{s.audio.correct()}catch{}s._level6Idx++,setTimeout(()=>a(s._level6Idx),1400)}function _(h,m){s.wrongCount++;try{s.audio.wrong()}catch{}if(h.classList.add("shake"),setTimeout(()=>h.classList.remove("shake"),400),s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null,!s._level6Current)return;const g=Me.find(y=>y.id===s._level6Current.high),u=Me.find(y=>y.id===s._level6Current.low),p=Me.find(y=>y.id===m);p?s.say(`${p.solfege} 不在本道题里, 要按 ${g.solfege} (右手) + ${u.solfege} (左手) 同时哦~`):s.say(`要同时按 ${g.solfege} (右手) + ${u.solfege} (左手) 哦~`),setTimeout(()=>l(s._level6Current),800)}return setTimeout(()=>a(0),1200),()=>{if(s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),r&&r.parentNode&&r.remove(),s.scene){try{s.scene.teardown()}catch{}s.scene=null}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),n.forEach(h=>{h.classList.remove("on"),h.style.display=""}),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Aa=Object.freeze(Object.defineProperty({__proto__:null,default:Ea},Symbol.toStringTag,{value:"Module"}));class Pa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level7-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- 太阳 -->
        <circle class="level7-sun" cx="700" cy="80" r="40" fill="#fff8a8" opacity="0.85" />
        <circle class="level7-sun-glow" cx="700" cy="80" r="60" fill="#fff8a8" opacity="0.25" />

        <!-- 远山 (背景层) -->
        <path class="level7-mountains"
              d="M0,300 L100,200 L200,250 L350,180 L500,220 L650,180 L800,250 L800,500 L0,500 Z" />

        <!-- 高树 + 树屋 (中央) -->
        <g class="level7-tree" transform="translate(400, 480)">
          <!-- 影子 -->
          <ellipse cx="0" cy="0" rx="120" ry="14" fill="rgba(0,0,0,0.28)" />

          <!-- 树干 -->
          <rect x="-20" y="-280" width="40" height="280" fill="#5d3a1a" />
          <!-- 树干纹路 -->
          <line x1="-10" y1="-260" x2="-10" y2="-40" stroke="#3d2410" stroke-width="2" opacity="0.4" />
          <line x1="8" y1="-240" x2="8" y2="-60" stroke="#3d2410" stroke-width="2" opacity="0.4" />

          <!-- 树冠 (多层) -->
          <ellipse class="level7-leaves" cx="0" cy="-310" rx="120" ry="70" fill="#2d5a2d" />
          <ellipse class="level7-leaves" cx="-60" cy="-340" rx="70" ry="45" fill="#3a6e3a" />
          <ellipse class="level7-leaves" cx="60" cy="-340" rx="70" ry="45" fill="#3a6e3a" />
          <ellipse class="level7-leaves" cx="0" cy="-380" rx="90" ry="55" fill="#457f45" />

          <!-- 树屋 -->
          <g class="level7-treehouse">
            <!-- 屋身 -->
            <rect x="-35" y="-420" width="70" height="55" fill="#8b4513" />
            <!-- 木纹 -->
            <line x1="-35" y1="-405" x2="35" y2="-405" stroke="#5d3a1a" stroke-width="1.5" opacity="0.5" />
            <line x1="-35" y1="-390" x2="35" y2="-390" stroke="#5d3a1a" stroke-width="1.5" opacity="0.5" />
            <!-- 屋顶 -->
            <polygon points="-40,-420 0,-445 40,-420" fill="#654321" />
            <!-- 圆窗外发光晕 (由 .level7-treehouse-lit 控制) -->
            <circle class="level7-treehouse-glow" cx="0" cy="-395" r="22" fill="#ffd166" opacity="0" />
            <!-- 圆窗 -->
            <circle cx="0" cy="-395" r="9" fill="#fff8a8" />
            <circle cx="0" cy="-395" r="9" fill="none" stroke="#3d2410" stroke-width="1.5" />
            <!-- 门 -->
            <rect x="-6" y="-380" width="12" height="15" fill="#3d2410" />
          </g>

          <!-- 7 级台阶 + 音符座 (螺旋上升: Do 最低 → Si 最高) -->
          <g class="level7-steps">
            <g class="level7-step" data-note="do" transform="translate(-80, -120)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="re" transform="translate(-50, -160)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="mi" transform="translate(0, -185)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="fa" transform="translate(50, -210)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="sol" transform="translate(50, -250)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="la" transform="translate(-40, -280)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
            <g class="level7-step" data-note="si" transform="translate(0, -340)">
              <ellipse cx="0" cy="0" rx="20" ry="6" fill="rgba(0,0,0,0.3)" />
              <circle cx="0" cy="-4" r="16" fill="rgba(255,255,255,0.12)" />
              <circle cx="0" cy="-4" r="14" fill="none" stroke="rgba(255,255,255,0.7)"
                      stroke-width="2" stroke-dasharray="3 2" />
            </g>
          </g>
        </g>

        <!-- 飘浮气泡 (装饰) -->
        <g class="level7-bubbles">
          <circle class="level7-bubble" cx="100" cy="150" r="6" fill="rgba(255,255,255,0.55)" />
          <circle class="level7-bubble" cx="150" cy="100" r="4" fill="rgba(255,255,255,0.45)" />
          <circle class="level7-bubble" cx="60"  cy="220" r="5" fill="rgba(255,255,255,0.5)" />
          <circle class="level7-bubble" cx="700" cy="200" r="6" fill="rgba(255,255,255,0.55)" />
          <circle class="level7-bubble" cx="650" cy="160" r="4" fill="rgba(255,255,255,0.45)" />
          <circle class="level7-bubble" cx="750" cy="280" r="5" fill="rgba(255,255,255,0.5)" />
        </g>

        <!-- 飘浮小鸟 — 更多 + 飞行轨迹更明显 -->
        <g class="level7-birds" fill="none" stroke="rgba(54, 83, 20, 0.85)"
           stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path class="level7-bird level7-bird--fly1" d="M-30,140 q6,-6 12,0 q6,-6 12,0" />
          <path class="level7-bird level7-bird--fly2" d="M-30,90 q5,-5 10,0 q5,-5 10,0" />
          <path class="level7-bird level7-bird--fly3" d="M-30,200 q5,-5 10,0 q5,-5 10,0" />
          <path class="level7-bird level7-bird--fly4" d="M-30,260 q6,-6 12,0 q6,-6 12,0" />
        </g>
      </svg>

      <!-- 飘带层 — DOM 元素, JS 在鱼飞向台阶时插入 SVG 飘带 -->
      <div class="level7-ribbon-layer"></div>
    `,this.stage.appendChild(e),this.background=e}drawRibbon(e,t,i,n){if(!this.background)return;const r=this.background.querySelector(".level7-ribbon-layer");if(!r)return;const l=this.background.getBoundingClientRect(),o=t.x-l.left,a=t.y-l.top,d=i.x-l.left,c=i.y-l.top,_="http://www.w3.org/2000/svg",h=document.createElementNS(_,"svg");h.setAttribute("viewBox",`0 0 ${l.width} ${l.height}`),h.setAttribute("width",l.width),h.setAttribute("height",l.height),h.style.position="absolute",h.style.inset="0",h.style.pointerEvents="none",h.setAttribute("class","level7-ribbon-svg");const m=(o+d)/2,g=Math.min(a,c)-60-Math.random()*30,u=document.createElementNS(_,"path");u.setAttribute("d",`M ${o},${a} Q ${m},${g} ${d},${c}`),u.setAttribute("stroke",n),u.setAttribute("stroke-width","6"),u.setAttribute("stroke-linecap","round"),u.setAttribute("fill","none"),u.setAttribute("opacity","0.85"),u.setAttribute("class","level7-ribbon-path"),u.setAttribute("stroke-dasharray",`${Math.hypot(d-o,c-a)}`),u.setAttribute("stroke-dashoffset",`${Math.hypot(d-o,c-a)}`),h.appendChild(u),r.appendChild(h),requestAnimationFrame(()=>{u.style.transition="stroke-dashoffset 0.55s ease-out, opacity 0.55s ease-out",u.setAttribute("stroke-dashoffset","0")}),setTimeout(()=>{u.setAttribute("opacity","0"),setTimeout(()=>{try{h.remove()}catch{}},600)},700)}lightTreehouse(){this.background&&(this.background.classList.add("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.add("level7-step-complete")}))}dimTreehouse(){this.background&&(this.background.classList.remove("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.remove("level7-step-complete")}))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}var Fi={};(function s(e,t,i,n){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var C=new OffscreenCanvas(1,1),T=C.getContext("2d");T.fillRect(0,0,1,1);var E=C.transferToImageBitmap();T.createPattern(E,"no-repeat")}catch{return!1}return!0}();function a(){}function d(C){var T=t.exports.Promise,E=T!==void 0?T:e.Promise;return typeof E=="function"?new E(C):(C(a,a),null)}var c=function(C,T){return{transform:function(E){if(C)return E;if(T.has(E))return T.get(E);var P=new OffscreenCanvas(E.width,E.height),D=P.getContext("2d");return D.drawImage(E,0,0),T.set(E,P),P},clear:function(){T.clear()}}}(o,new Map),_=function(){var C=Math.floor(16.666666666666668),T,E,P={},D=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(T=function(R){var O=Math.random();return P[O]=requestAnimationFrame(function I(G){D===G||D+C-1<G?(D=G,delete P[O],R()):P[O]=requestAnimationFrame(I)}),O},E=function(R){P[R]&&cancelAnimationFrame(P[R])}):(T=function(R){return setTimeout(R,C)},E=function(R){return clearTimeout(R)}),{frame:T,cancel:E}}(),h=function(){var C,T,E={};function P(D){function R(O,I){D.postMessage({options:O||{},callback:I})}D.init=function(I){var G=I.transferControlToOffscreen();D.postMessage({canvas:G},[G])},D.fire=function(I,G,V){if(T)return R(I,null),T;var K=Math.random().toString(36).slice(2);return T=d(function(Y){function Z(he){he.data.callback===K&&(delete E[K],D.removeEventListener("message",Z),T=null,c.clear(),V(),Y())}D.addEventListener("message",Z),R(I,K),E[K]=Z.bind(null,{data:{callback:K}})}),T},D.reset=function(){D.postMessage({reset:!0});for(var I in E)E[I](),delete E[I]}}return function(){if(C)return C;if(!i&&r){var D=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{C=new Worker(URL.createObjectURL(new Blob([D])))}catch(R){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",R),null}P(C)}return C}}(),m={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function g(C,T){return T?T(C):C}function u(C){return C!=null}function p(C,T,E){return g(C&&u(C[T])?C[T]:m[T],E)}function y(C){return C<0?0:Math.floor(C)}function f(C,T){return Math.floor(Math.random()*(T-C))+C}function v(C){return parseInt(C,16)}function x(C){return C.map(b)}function b(C){var T=String(C).replace(/[^0-9a-f]/gi,"");return T.length<6&&(T=T[0]+T[0]+T[1]+T[1]+T[2]+T[2]),{r:v(T.substring(0,2)),g:v(T.substring(2,4)),b:v(T.substring(4,6))}}function k(C){var T=p(C,"origin",Object);return T.x=p(T,"x",Number),T.y=p(T,"y",Number),T}function w(C){C.width=document.documentElement.clientWidth,C.height=document.documentElement.clientHeight}function L(C){var T=C.getBoundingClientRect();C.width=T.width,C.height=T.height}function S(C){var T=document.createElement("canvas");return T.style.position="fixed",T.style.top="0px",T.style.left="0px",T.style.pointerEvents="none",T.style.zIndex=C,T}function M(C,T,E,P,D,R,O,I,G){C.save(),C.translate(T,E),C.rotate(R),C.scale(P,D),C.arc(0,0,1,O,I,G),C.restore()}function A(C){var T=C.angle*(Math.PI/180),E=C.spread*(Math.PI/180);return{x:C.x,y:C.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:C.startVelocity*.5+Math.random()*C.startVelocity,angle2D:-T+(.5*E-Math.random()*E),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:C.color,shape:C.shape,tick:0,totalTicks:C.ticks,decay:C.decay,drift:C.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:C.gravity*3,ovalScalar:.6,scalar:C.scalar,flat:C.flat}}function $(C,T){T.x+=Math.cos(T.angle2D)*T.velocity+T.drift,T.y+=Math.sin(T.angle2D)*T.velocity+T.gravity,T.velocity*=T.decay,T.flat?(T.wobble=0,T.wobbleX=T.x+10*T.scalar,T.wobbleY=T.y+10*T.scalar,T.tiltSin=0,T.tiltCos=0,T.random=1):(T.wobble+=T.wobbleSpeed,T.wobbleX=T.x+10*T.scalar*Math.cos(T.wobble),T.wobbleY=T.y+10*T.scalar*Math.sin(T.wobble),T.tiltAngle+=.1,T.tiltSin=Math.sin(T.tiltAngle),T.tiltCos=Math.cos(T.tiltAngle),T.random=Math.random()+2);var E=T.tick++/T.totalTicks,P=T.x+T.random*T.tiltCos,D=T.y+T.random*T.tiltSin,R=T.wobbleX+T.random*T.tiltCos,O=T.wobbleY+T.random*T.tiltSin;if(C.fillStyle="rgba("+T.color.r+", "+T.color.g+", "+T.color.b+", "+(1-E)+")",C.beginPath(),l&&T.shape.type==="path"&&typeof T.shape.path=="string"&&Array.isArray(T.shape.matrix))C.fill(W(T.shape.path,T.shape.matrix,T.x,T.y,Math.abs(R-P)*.1,Math.abs(O-D)*.1,Math.PI/10*T.wobble));else if(T.shape.type==="bitmap"){var I=Math.PI/10*T.wobble,G=Math.abs(R-P)*.1,V=Math.abs(O-D)*.1,K=T.shape.bitmap.width*T.scalar,Y=T.shape.bitmap.height*T.scalar,Z=new DOMMatrix([Math.cos(I)*G,Math.sin(I)*G,-Math.sin(I)*V,Math.cos(I)*V,T.x,T.y]);Z.multiplySelf(new DOMMatrix(T.shape.matrix));var he=C.createPattern(c.transform(T.shape.bitmap),"no-repeat");he.setTransform(Z),C.globalAlpha=1-E,C.fillStyle=he,C.fillRect(T.x-K/2,T.y-Y/2,K,Y),C.globalAlpha=1}else if(T.shape==="circle")C.ellipse?C.ellipse(T.x,T.y,Math.abs(R-P)*T.ovalScalar,Math.abs(O-D)*T.ovalScalar,Math.PI/10*T.wobble,0,2*Math.PI):M(C,T.x,T.y,Math.abs(R-P)*T.ovalScalar,Math.abs(O-D)*T.ovalScalar,Math.PI/10*T.wobble,0,2*Math.PI);else if(T.shape==="star")for(var j=Math.PI/2*3,de=4*T.scalar,ve=8*T.scalar,ye=T.x,te=T.y,oe=5,se=Math.PI/oe;oe--;)ye=T.x+Math.cos(j)*ve,te=T.y+Math.sin(j)*ve,C.lineTo(ye,te),j+=se,ye=T.x+Math.cos(j)*de,te=T.y+Math.sin(j)*de,C.lineTo(ye,te),j+=se;else C.moveTo(Math.floor(T.x),Math.floor(T.y)),C.lineTo(Math.floor(T.wobbleX),Math.floor(D)),C.lineTo(Math.floor(R),Math.floor(O)),C.lineTo(Math.floor(P),Math.floor(T.wobbleY));return C.closePath(),C.fill(),T.tick<T.totalTicks}function N(C,T,E,P,D){var R=T.slice(),O=C.getContext("2d"),I,G,V=d(function(K){function Y(){I=G=null,O.clearRect(0,0,P.width,P.height),c.clear(),D(),K()}function Z(){i&&!(P.width===n.width&&P.height===n.height)&&(P.width=C.width=n.width,P.height=C.height=n.height),!P.width&&!P.height&&(E(C),P.width=C.width,P.height=C.height),O.clearRect(0,0,P.width,P.height),R=R.filter(function(he){return $(O,he)}),R.length?I=_.frame(Z):Y()}I=_.frame(Z),G=Y});return{addFettis:function(K){return R=R.concat(K),V},canvas:C,promise:V,reset:function(){I&&_.cancel(I),G&&G()}}}function B(C,T){var E=!C,P=!!p(T||{},"resize"),D=!1,R=p(T,"disableForReducedMotion",Boolean),O=r&&!!p(T||{},"useWorker"),I=O?h():null,G=E?w:L,V=C&&I?!!C.__confetti_initialized:!1,K=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Y;function Z(j,de,ve){for(var ye=p(j,"particleCount",y),te=p(j,"angle",Number),oe=p(j,"spread",Number),se=p(j,"startVelocity",Number),xe=p(j,"decay",Number),qe=p(j,"gravity",Number),xt=p(j,"drift",Number),Ye=p(j,"colors",x),wt=p(j,"ticks",Number),ss=p(j,"shapes"),Rs=p(j,"scalar"),Br=!!p(j,"flat"),qi=k(j),Hi=ye,Is=[],Fr=C.width*qi.x,qr=C.height*qi.y;Hi--;)Is.push(A({x:Fr,y:qr,angle:te,spread:oe,startVelocity:se,color:Ye[Hi%Ye.length],shape:ss[f(0,ss.length)],ticks:wt,decay:xe,gravity:qe,drift:xt,scalar:Rs,flat:Br}));return Y?Y.addFettis(Is):(Y=N(C,Is,G,de,ve),Y.promise)}function he(j){var de=R||p(j,"disableForReducedMotion",Boolean),ve=p(j,"zIndex",Number);if(de&&K)return d(function(se){se()});E&&Y?C=Y.canvas:E&&!C&&(C=S(ve),document.body.appendChild(C)),P&&!V&&G(C);var ye={width:C.width,height:C.height};I&&!V&&I.init(C),V=!0,I&&(C.__confetti_initialized=!0);function te(){if(I){var se={getBoundingClientRect:function(){if(!E)return C.getBoundingClientRect()}};G(se),I.postMessage({resize:{width:se.width,height:se.height}});return}ye.width=ye.height=null}function oe(){Y=null,P&&(D=!1,e.removeEventListener("resize",te)),E&&C&&(document.body.contains(C)&&document.body.removeChild(C),C=null,V=!1)}return P&&!D&&(D=!0,e.addEventListener("resize",te,!1)),I?I.fire(j,ye,oe):Z(j,ye,oe)}return he.reset=function(){I&&I.reset(),Y&&Y.reset()},he}var H;function q(){return H||(H=B(null,{useWorker:!0,resize:!0})),H}function W(C,T,E,P,D,R,O){var I=new Path2D(C),G=new Path2D;G.addPath(I,new DOMMatrix(T));var V=new Path2D;return V.addPath(G,new DOMMatrix([Math.cos(O)*D,Math.sin(O)*D,-Math.sin(O)*R,Math.cos(O)*R,E,P])),V}function U(C){if(!l)throw new Error("path confetti are not supported in this browser");var T,E;typeof C=="string"?T=C:(T=C.path,E=C.matrix);var P=new Path2D(T),D=document.createElement("canvas"),R=D.getContext("2d");if(!E){for(var O=1e3,I=O,G=O,V=0,K=0,Y,Z,he=0;he<O;he+=2)for(var j=0;j<O;j+=2)R.isPointInPath(P,he,j,"nonzero")&&(I=Math.min(I,he),G=Math.min(G,j),V=Math.max(V,he),K=Math.max(K,j));Y=V-I,Z=K-G;var de=10,ve=Math.min(de/Y,de/Z);E=[ve,0,0,ve,-Math.round(Y/2+I)*ve,-Math.round(Z/2+G)*ve]}return{type:"path",path:T,matrix:E}}function be(C){var T,E=1,P="#000000",D='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof C=="string"?T=C:(T=C.text,E="scalar"in C?C.scalar:E,D="fontFamily"in C?C.fontFamily:D,P="color"in C?C.color:P);var R=10*E,O=""+R+"px "+D,I=new OffscreenCanvas(R,R),G=I.getContext("2d");G.font=O;var V=G.measureText(T),K=Math.ceil(V.actualBoundingBoxRight+V.actualBoundingBoxLeft),Y=Math.ceil(V.actualBoundingBoxAscent+V.actualBoundingBoxDescent),Z=2,he=V.actualBoundingBoxLeft+Z,j=V.actualBoundingBoxAscent+Z;K+=Z+Z,Y+=Z+Z,I=new OffscreenCanvas(K,Y),G=I.getContext("2d"),G.font=O,G.fillStyle=P,G.fillText(T,he,j);var de=1/E;return{type:"bitmap",bitmap:I.transferToImageBitmap(),matrix:[de,0,0,de,-K*de/2,-Y*de/2]}}t.exports=function(){return q().apply(this,arguments)},t.exports.reset=function(){q().reset()},t.exports.create=B,t.exports.shapeFromPath=U,t.exports.shapeFromText=be})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),Fi,!1);const Xe=Fi.exports;Fi.exports.create;class $a{burst({x:e,y:t,color:i="#ffd166",count:n=20,spread:r=50,startVelocity:l=22}){try{Xe({particleCount:n,spread:r,startVelocity:l,ticks:60,origin:{x:e/window.innerWidth,y:t/window.innerHeight},colors:[i,"#fff8ec","#ffc971"],shapes:["circle","square"],scalar:.7})}catch{}}celebrate({count:e=140,spread:t=80}={}){try{Xe({particleCount:e,spread:t,origin:{y:.55},colors:["#e63946","#f4a261","#ffc971","#b5c99a","#457b9d","#9b5de5"]})}catch{}}fountain({x:e,y:t,color:i="#ffd166",count:n=60}){try{const r={x:e/window.innerWidth,y:t/window.innerHeight};Xe({particleCount:n/2,angle:60,spread:55,origin:r,colors:[i,"#fff8ec"],startVelocity:35}),Xe({particleCount:n/2,angle:120,spread:55,origin:r,colors:[i,"#fff8ec"],startVelocity:35})}catch{}}confettiFromSides({count:e=50}={}){try{Xe({particleCount:e,angle:60,spread:55,origin:{x:0,y:.7}}),Xe({particleCount:e,angle:120,spread:55,origin:{x:1,y:.7}})}catch{}}firework({x:e,y:t,color:i="#ffd166"}={}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};Xe({particleCount:30,spread:360,startVelocity:25,origin:n,colors:[i,"#fff8ec","#ffc971","#9b5de5"],scalar:.8})}catch{}}drop({x:e,y:t,color:i="#a8dadc"}={}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};Xe({particleCount:12,spread:25,startVelocity:18,origin:n,colors:[i,"#fff8ec","#5fa8b5"],scalar:.5})}catch{}}}const Wt=new $a,Zs=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Da=36,Xs=["C4","D4","E4","F4","G4","A4","B4"],Oa=["B4","A4","G4","F4","E4","D4","C4"],Na=new Set(["sol","la","si"]),kn=["完美!","真棒!","不错哟!","完整 7 音在聚集!"];function Ra(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=7);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Pa(s.stage),s.say("爬上树屋看完整 7 音阶! Fa 和 Si 是新的朋友~ 拖鱼到对应台阶 (Do 最低 → Si 最高)"),s.fishPool=new Ms(s.stage,Zs),s.fishPool.setDragEnabled(!0),s.fishPool.intro();const n=["do","re","mi","fa","sol","la","si"];s._level7Placed=new Set,s._level7Count=0,s.fishPool.onTap=l=>{if(l){try{s.audio.playNote(l.dataset.pitch)}catch{}try{s.audio.hover(l.dataset.id)}catch{}F.fromTo(l,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})}},s.fishPool.onDragStart=l=>{try{s.audio.hover(l.dataset.id)}catch{}},s.fishPool.onDragMove=()=>{},s.fishPool.onDrop=(l,o,a,d)=>{const c=l.dataset.id;if(s._level7Placed.has(c))return;const _=d?.x,h=d?.y;if(!Number.isFinite(_)||!Number.isFinite(h))return;const m=l.getBoundingClientRect();let g=null,u=1/0;if(s.scene&&s.scene.background)for(const f of n){const v=s.scene.background.querySelector(`.level7-step[data-note="${f}"]`);if(!v)continue;const x=v.getBoundingClientRect(),b=x.left+x.width/2,k=x.top+x.height/2,w=Math.hypot(b-_,k-h);w<u&&(u=w,g=f)}const p=g&&u<Da,y=Zs.find(f=>f.id===c);if(p&&c===g){s._level7Placed.add(c),s._level7Count=s._level7Placed.size;try{s.audio.correct()}catch{}const f=s.scene.background.querySelector(`.level7-step[data-note="${g}"]`),v=f.getBoundingClientRect(),x=v.left+v.width/2,b=v.top+v.height/2,k=parseFloat(l.style.left)||0,w=parseFloat(l.style.top)||0,L=x-m.left-k,S=b-m.top-w,M=y&&y.color||"#ffd166";try{s.scene.drawRibbon(g,{x:_,y:h},{x,y:b},M)}catch{}F.to(l,{x:L,y:S,scale:.85,duration:.55,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(c)}catch{}try{f.style.setProperty("--step-lit-color",M),f.classList.add("level7-step-lit")}catch{}try{Wt.fountain({x,y:b,color:M})}catch{}try{F.fromTo(f,{scale:1},{scale:1.25,duration:.3,yoyo:!0,repeat:1,ease:"power2.out"})}catch{}if(y){try{s.audio.playNote(y.pitch)}catch{}try{s._floatScore(_,h,`${y.solfege} ✓`)}catch{}}try{setTimeout(()=>{try{s.audio.hover(c)}catch{}},220)}catch{}try{const $=s.scene.background.querySelector(".level7-birds path");$&&F.fromTo($,{y:0},{y:-6,duration:.12,yoyo:!0,repeat:3,ease:"sine.inOut",overwrite:!0})}catch{}if(F.to(l,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>F.to(l,{rotation:0,duration:.2,ease:"power2.out"})}),F.fromTo(l,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),Na.has(g)){try{const $=l;$.classList.add("level7-fish-lift"),setTimeout(()=>{try{$.classList.remove("level7-fish-lift")}catch{}},900)}catch{}try{f.classList.add("level7-step-glow")}catch{}}const A=kn[Math.min(s._level7Count-1,kn.length-1)]+" "+s._level7Count+" / 7";s.say(A),s._level7Count===7&&setTimeout(()=>r(),800)}})}else{s.wrongCount++;try{s.audio.wrong()}catch{}if(l.classList.add("shake"),setTimeout(()=>l.classList.remove("shake"),400),p&&g&&c!==g){const f=Zs.find(x=>x.id===g),v=g==="fa"?"Fa 在 Mi 和 Sol 之间 (第 4 级台阶)":g==="si"?"Si 在 La 之上, 最高一级台阶 (最接近树屋)":`${f?f.solfege:"这个台阶"}`;s.say(`${y?y.solfege:"这条鱼"} 不是 ${v} 的鱼哦~`)}else c==="fa"?s.say("Fa 是新朋友! 它在 Mi 和 Sol 之间的台阶~"):c==="si"?s.say("Si 是新朋友! 它在 La 之上, 最高的台阶, 最接近树屋~"):s.say(`${y?y.solfege:"这条鱼"} 的家在树上, 找最近的圆圈~`);F.to(l,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}};function r(){const l=s._calcStars();try{s.progress.markLevelComplete(7,l)}catch{}try{s.scene.lightTreehouse()}catch{}try{s.audio.playScale(Xs)}catch{}s.say("完整的 Do Re Mi Fa Sol La Si 上行! 太棒了~"),setTimeout(()=>{try{s.audio.playScale(Oa)}catch{}s.say("再来下行: Si La Sol Fa Mi Re Do")},Xs.length*220+300),setTimeout(()=>{try{s.showWinOverlay(l,7)}catch{}},Xs.length*220*2+1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}if(s.fishPool)try{s.fishPool.pool.innerHTML=""}catch{}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ia=Object.freeze(Object.defineProperty({__proto__:null,default:Ra},Symbol.toStringTag,{value:"Module"}));class Ba{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level8-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- 帷幕左 -->
        <path class="level8-curtain"
              d="M0,0 L0,500 L80,500 Q120,400 100,300 Q150,200 80,150 Q120,80 60,0 Z"
              fill="#8c2434" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
        <!-- 帷幕右 -->
        <path class="level8-curtain level8-curtain-r"
              d="M800,0 L800,500 L720,500 Q680,400 700,300 Q650,200 720,150 Q680,80 740,0 Z"
              fill="#8c2434" stroke="rgba(0,0,0,0.3)" stroke-width="1" />

        <!-- 帷幕花纹 (金色流苏线) -->
        <line x1="0" y1="0" x2="80" y2="500"
              stroke="rgba(255, 200, 100, 0.4)" stroke-width="2" />
        <line x1="800" y1="0" x2="720" y2="500"
              stroke="rgba(255, 200, 100, 0.4)" stroke-width="2" />

        <!-- 聚光灯 3 道 (中心最大) -->
        <polygon class="level8-spotlight level8-spotlight-c"
                 points="400,0 200,500 600,500"
                 fill="rgba(255, 235, 168, 0.15)" />
        <polygon class="level8-spotlight"
                 points="250,0 100,500 250,500"
                 fill="rgba(255, 235, 168, 0.08)" />
        <polygon class="level8-spotlight"
                 points="550,0 550,500 700,500"
                 fill="rgba(255, 235, 168, 0.08)" />

        <!-- 钢琴剪影 (中下方) -->
        <g class="level8-piano-shape" transform="translate(400, 400)">
          <rect x="-140" y="-50" width="280" height="60" rx="4" fill="#1a1420" />
          <rect x="-130" y="-45" width="260" height="50" fill="#3d2b1a" />
          <rect x="-130" y="-45" width="260" height="20" fill="rgba(0,0,0,0.4)" />
        </g>

        <!-- v18.1: 🎤 麦克风 (钢琴左前方) -->
        <g class="level8-mic" transform="translate(255, 380)">
          <!-- 底座 -->
          <ellipse cx="0" cy="34" rx="14" ry="3" fill="#1a1420" />
          <rect x="-2" y="-2" width="4" height="34" fill="#444" />
          <!-- 麦克风头 -->
          <ellipse class="level8-mic-head" cx="0" cy="-10" rx="11" ry="14" fill="#3d2b1a" />
          <ellipse class="level8-mic-head" cx="0" cy="-10" rx="9" ry="12" fill="#ffd166" opacity="0.9" />
          <line x1="-7" y1="-14" x2="7" y2="-14" stroke="#3d2b1a" stroke-width="1" />
          <line x1="-7" y1="-10" x2="7" y2="-10" stroke="#3d2b1a" stroke-width="1" />
          <line x1="-7" y1="-6" x2="7" y2="-6" stroke="#3d2b1a" stroke-width="1" />
          <line x1="0" y1="-22" x2="0" y2="-26" stroke="#ffd166" stroke-width="1.4" />
          <line x1="-4" y1="-24" x2="4" y2="-24" stroke="#ffd166" stroke-width="1.4" />
        </g>

        <!-- 萤火虫 (6 颗) -->
        <g class="level8-fireflies">
          <circle cx="150" cy="200" r="3" fill="rgba(255, 235, 100, 0.85)" class="level8-firefly" />
          <circle cx="180" cy="250" r="2" fill="rgba(255, 235, 100, 0.7)" class="level8-firefly" />
          <circle cx="660" cy="180" r="3" fill="rgba(255, 235, 100, 0.8)" class="level8-firefly" />
          <circle cx="630" cy="240" r="2" fill="rgba(255, 235, 100, 0.7)" class="level8-firefly" />
          <circle cx="120" cy="350" r="3" fill="rgba(255, 235, 100, 0.85)" class="level8-firefly" />
          <circle cx="680" cy="380" r="3" fill="rgba(255, 235, 100, 0.85)" class="level8-firefly" />
        </g>

        <!-- v18.1: 动物观众 (4 位, 站在台前, cheer 时举手) -->
        <g class="level8-audience" id="level8-audience">
          <!-- 🐰 兔子 -->
          <g class="level8-animal level8-animal--rabbit" transform="translate(110, 430)">
            <ellipse cx="0" cy="22" rx="22" ry="6" fill="rgba(0,0,0,0.25)" />
            <!-- 头 -->
            <circle cx="0" cy="0" r="14" fill="#f7e1d0" />
            <!-- 长耳朵 -->
            <ellipse cx="-6" cy="-14" rx="3" ry="10" fill="#f7e1d0" />
            <ellipse cx="6" cy="-14" rx="3" ry="10" fill="#f7e1d0" />
            <ellipse cx="-6" cy="-13" rx="1.5" ry="7" fill="#f4b5b5" />
            <ellipse cx="6" cy="-13" rx="1.5" ry="7" fill="#f4b5b5" />
            <!-- 眼/嘴 -->
            <circle cx="-4" cy="-2" r="1.5" fill="#1a1420" />
            <circle cx="4" cy="-2" r="1.5" fill="#1a1420" />
            <path d="M-2,3 Q0,5 2,3" stroke="#1a1420" stroke-width="0.8" fill="none" />
            <!-- 身体 -->
            <ellipse cx="0" cy="18" rx="14" ry="10" fill="#fff" />
            <!-- 左手臂 (静止下垂, cheer 时举起) -->
            <g class="level8-animal-arm-l">
              <line x1="-12" y1="14" x2="-18" y2="22" stroke="#f7e1d0" stroke-width="4" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="12" y1="14" x2="18" y2="22" stroke="#f7e1d0" stroke-width="4" stroke-linecap="round" />
            </g>
          </g>

          <!-- 🐻 熊 -->
          <g class="level8-animal level8-animal--bear" transform="translate(220, 440)">
            <ellipse cx="0" cy="20" rx="24" ry="6" fill="rgba(0,0,0,0.3)" />
            <circle cx="0" cy="0" r="16" fill="#a37148" />
            <circle cx="-11" cy="-10" r="5" fill="#a37148" />
            <circle cx="11" cy="-10" r="5" fill="#a37148" />
            <circle cx="-11" cy="-10" r="2.5" fill="#d4a373" />
            <circle cx="11" cy="-10" r="2.5" fill="#d4a373" />
            <circle cx="-5" cy="-2" r="1.8" fill="#1a1420" />
            <circle cx="5" cy="-2" r="1.8" fill="#1a1420" />
            <ellipse cx="0" cy="5" rx="4" ry="3" fill="#f4d4a8" />
            <circle cx="0" cy="5" r="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="16" rx="18" ry="12" fill="#8b5a3c" />
            <g class="level8-animal-arm-l">
              <line x1="-14" y1="12" x2="-20" y2="22" stroke="#a37148" stroke-width="5" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="14" y1="12" x2="20" y2="22" stroke="#a37148" stroke-width="5" stroke-linecap="round" />
            </g>
          </g>

          <!-- 🦌 鹿 -->
          <g class="level8-animal level8-animal--deer" transform="translate(580, 440)">
            <ellipse cx="0" cy="20" rx="24" ry="6" fill="rgba(0,0,0,0.3)" />
            <ellipse cx="0" cy="0" rx="13" ry="14" fill="#c08552" />
            <!-- 鹿角 -->
            <path d="M-7,-12 L-12,-22 L-9,-18 L-14,-26 M-7,-12 L-5,-20"
                  stroke="#3d2b1a" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <path d="M7,-12 L12,-22 L9,-18 L14,-26 M7,-12 L5,-20"
                  stroke="#3d2b1a" stroke-width="1.8" fill="none" stroke-linecap="round" />
            <circle cx="-4" cy="-2" r="1.5" fill="#1a1420" />
            <circle cx="4" cy="-2" r="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="4" rx="2" ry="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="16" rx="15" ry="10" fill="#a37148" />
            <!-- 鹿斑 -->
            <circle cx="-6" cy="14" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="6" cy="14" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="0" cy="18" r="1.5" fill="#fff" opacity="0.6" />
            <g class="level8-animal-arm-l">
              <line x1="-12" y1="12" x2="-18" y2="22" stroke="#c08552" stroke-width="4" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="12" y1="12" x2="18" y2="22" stroke="#c08552" stroke-width="4" stroke-linecap="round" />
            </g>
          </g>

          <!-- 🦊 狐狸 -->
          <g class="level8-animal level8-animal--fox" transform="translate(690, 440)">
            <ellipse cx="0" cy="20" rx="22" ry="6" fill="rgba(0,0,0,0.3)" />
            <!-- 狐狸头 (尖脸朝右, 但我们居中画) -->
            <ellipse cx="0" cy="0" rx="13" ry="13" fill="#e07a3f" />
            <polygon points="-9,-9 -16,-15 -7,-12" fill="#e07a3f" />
            <polygon points="9,-9 16,-15 7,-12" fill="#e07a3f" />
            <polygon points="-7,-9 -12,-13 -7,-12" fill="#1a1420" />
            <polygon points="7,-9 12,-13 7,-12" fill="#1a1420" />
            <circle cx="-4" cy="-2" r="1.5" fill="#1a1420" />
            <circle cx="4" cy="-2" r="1.5" fill="#1a1420" />
            <ellipse cx="0" cy="5" rx="3" ry="2" fill="#fff" />
            <circle cx="0" cy="5" r="1.2" fill="#1a1420" />
            <ellipse cx="0" cy="16" rx="15" ry="10" fill="#c25e1f" />
            <ellipse cx="0" cy="14" rx="6" ry="5" fill="#fff" opacity="0.85" />
            <g class="level8-animal-arm-l">
              <line x1="-12" y1="12" x2="-18" y2="22" stroke="#e07a3f" stroke-width="4" stroke-linecap="round" />
            </g>
            <g class="level8-animal-arm-r">
              <line x1="12" y1="12" x2="18" y2="22" stroke="#e07a3f" stroke-width="4" stroke-linecap="round" />
            </g>
          </g>
        </g>

        <!-- 顶部舞台灯牌 -->
        <text x="400" y="60" text-anchor="middle" class="level8-stage-text">
          🎵 森林音乐会 🎵
        </text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}showSongSelector(e,t){const i=[{id:"twinkle",name:"小星星",emoji:"⭐",diff:"★",difficulty:1,melody:["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"]},{id:"birthday",name:"生日快乐",emoji:"🎂",diff:"★",difficulty:1,melody:["C4","C4","D4","C4","F4","E4","C4","C4","D4","C4","G4","F4"]},{id:"london",name:"伦敦桥",emoji:"🌉",diff:"★★",difficulty:2,melody:["C4","D4","E4","F4","G4","G4","A4","G4","F4","E4","D4","C4"]},{id:"joy",name:"欢乐颂",emoji:"🎉",diff:"★★",difficulty:2,melody:["E4","E4","F4","G4","G4","F4","E4","D4","C4","C4","D4","E4","E4","D4","D4"]},{id:"frog",name:"小青蛙",emoji:"🐸",diff:"★★",difficulty:2,melody:["C4","D4","E4","F4","E4","D4","C4"]},{id:"molihua",name:"茉莉花",emoji:"🌸",diff:"★★★",difficulty:3,melody:["C4","E4","G4","A4","G4","E4","C4","D4","E4","F4","E4","D4","C4"]}],n=i.map(r=>`
      <button class="level8-song-card level8-diff-${r.difficulty}" data-song="${r.id}">
        <div class="level8-song-emoji">${r.emoji}</div>
        <div class="level8-song-name">${r.name}</div>
        <div class="level8-song-len">${r.melody.length} 音</div>
        <div class="level8-song-diff">${r.diff}</div>
      </button>
    `).join("");e.innerHTML=`
      <div class="level8-song-list">
        <div class="level8-song-list-title">🎼 选一首曲子开始演奏</div>
        <div class="level8-song-cards">${n}</div>
      </div>
    `,e.querySelectorAll(".level8-song-card").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.song,o=i.find(a=>a.id===l);o&&typeof t=="function"&&t(o)})})}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Js={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},Ge=80,Fa={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function qa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=8);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.createElement("style");n.dataset.levelStyle="8",n.textContent=`
    #stage { --lv8-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2; /* v20: 高于不透明音乐会背景(z1)，确保键盘可见可点 */
      height: var(--lv8-kb-h);
    }
    #stage > .keyboard-area > svg.keyboard {
      width: 100%;
      height: 100%;
    }
    #stage > .level8-song-stage {
      top: clamp(14px, 7%, 80px);
      bottom: calc(var(--lv8-kb-h) + 14px);
      height: auto;
      overflow: hidden;
    }
    #stage .level8-song-list {
      max-height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
      /* 父容器 .level8-song-stage 是 pointer-events:none; 列表自身要能接住
         触屏拖动才滚得动, 卡片本来就有 pointer-events:auto */
      pointer-events: auto;
    }
    #stage > .level8-snapshot-panel {
      bottom: calc(var(--lv8-kb-h) + 14px);
    }
  `,document.head.appendChild(n),s.scene=new Ba(s.stage),s.say("森林音乐会开始! 选一首曲子~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level8-song-stage"></div>');const r=s.stage.querySelector(".level8-song-stage"),l="fps_level8_played_v1";function o(){try{const f=localStorage.getItem(l);if(!f)return new Set;const v=JSON.parse(f);return new Set(Array.isArray(v)?v:[])}catch{return new Set}}function a(f){const v=o();v.add(f);try{localStorage.setItem(l,JSON.stringify(Array.from(v)))}catch{}}o().size>=6&&r.insertAdjacentHTML("beforeend",'<div class="level8-all-played-badge">🎖 全部演奏!</div>'),s.scene.showSongSelector(r,f=>u(f)),s.kb=new gt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level8Seq=null,s._level8Idx=0,s._level8Total=0,s._level8Correct=0,s._level8Accepting=!1,s._level8Done=!1,s._level8Timeouts=[];let c=null,_=null;function h(){const f=document.getElementById("level8-audience");f&&(f.classList.remove("level8-cheer"),f.getBoundingClientRect(),f.classList.add("level8-cheer"),clearTimeout(_),_=setTimeout(()=>f.classList.remove("level8-cheer"),700))}function m(){s.stage.insertAdjacentHTML("beforeend",'<div class="level8-staff-area"></div>'),c=s.stage.querySelector(".level8-staff-area"),c.innerHTML=`
      <svg class="level8-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
        <line class="level8-staff-line" x1="40" y1="${Ge+40}" x2="760" y2="${Ge+40}" />
        <line class="level8-staff-line" x1="40" y1="${Ge+60}" x2="760" y2="${Ge+60}" />
        <line class="level8-staff-line" x1="40" y1="${Ge+80}" x2="760" y2="${Ge+80}" />
        <line class="level8-staff-line" x1="40" y1="${Ge+100}" x2="760" y2="${Ge+100}" />
        <line class="level8-staff-line" x1="40" y1="${Ge+120}" x2="760" y2="${Ge+120}" />
        <circle class="level8-current-note" cx="400" cy="0" r="16" fill="#ffd166" />
      </svg>
    `}function g(){return c?c.querySelector(".level8-current-note"):null}function u(f){r&&(r.innerHTML=`
        <div class="level8-now-playing">
          <div class="level8-playing-badge">🎼 正在演奏</div>
          <div class="level8-now-emoji">${f.emoji}</div>
          <div class="level8-now-text">演奏: <strong>${f.name}</strong></div>
          <div class="level8-difficulty-badge level8-diff-${f.difficulty}">难度 ${f.diff}</div>
          <div class="level8-progress">1 / ${f.melody.length}</div>
        </div>
      `),c||m(),s.say(`演奏《${f.name}》! 跟着音符按琴键~`),a(f.id),s._level8Song=f,s._level8Seq=[...f.melody],s._level8Total=s._level8Seq.length,s._level8Correct=0,s._level8Idx=0,s._level8Accepting=!1,s._level8Done=!1,setTimeout(p,800)}function p(){if(s._level8Done||s._level8Idx>=s._level8Seq.length)return;const f=s._level8Seq[s._level8Idx],v=Js[f],x=Fa[v.id],b=g();b&&(F.killTweensOf(b),F.set(b,{scale:1,opacity:1}),b.setAttribute("cy",x),b.dataset.pitch=f,b.classList.remove("incorrect"),s.say(`下一个: ${v.solfege} (${f})`),s._level8Accepting=!0,F.fromTo(b,{attr:{cy:x}},{attr:{cy:x+100},duration:4.5,ease:"none",onComplete:()=>{if(!s._level8Done&&s._level8Accepting){s._level8Accepting=!1,s.wrongCount++;try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),b.classList.add("incorrect"),setTimeout(()=>{b.classList.remove("incorrect"),s._level8Idx++,p()},600)}}}))}s.kb.onPress=f=>{if(!s._level8Accepting||s._level8Done||!s._level8Seq||s._level8Idx>=s._level8Seq.length)return;const v=s._level8Seq[s._level8Idx],x=f.dataset.pitch;if(x===v){s._level8Correct++,s._level8Accepting=!1;try{s.audio.correct()}catch{}try{s.audio.playNote(x)}catch{}const b=g();if(b&&(F.killTweensOf(b),F.to(b,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),r){const w=r.querySelector(".level8-progress");w&&(w.textContent=`${s._level8Idx+1} / ${s._level8Total}`)}h();const k=["完美!","森林在听!","真棒!"];s.say(k[Math.min(s._level8Correct-1,k.length-1)]),s._level8Idx++,s._level8Idx>=s._level8Seq.length?(s._level8Done=!0,s._level8Timeouts.push(setTimeout(y,800))):setTimeout(p,500)}else{s.wrongCount++;try{s.audio.wrong()}catch{}const b=Js[x];s.say(`这是 ${b?b.solfege:"?"}, 不是 ${Js[v].solfege}. 再听一下!`);const k=g();k&&k.classList.add("incorrect"),setTimeout(()=>{k&&k.classList.remove("incorrect")},300);try{s.audio.playNote(v)}catch{}}};function y(){const f=s._level8Song,v=f&&f.difficulty||1,x=s.wrongCount||0;let b;v<=1?b=s._calcStars&&s._calcStars()||(x<=0?3:x<=2?2:x<=5?1:0):v===2?b=x<=0?3:x<=3?2:x<=7?1:0:b=x<=1?3:x<=4?2:x<=9?1:0;try{s.progress.markLevelComplete(8,b)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}if(typeof s._flashScreen=="function")try{s._flashScreen()}catch{}if(typeof s._floatScore=="function")try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,"🎉 完美的表演! 🎉")}catch{}s.say("完美的表演! 森林在为你鼓掌!"),setTimeout(()=>{try{s.showWinOverlay(b,8)}catch{}},1200),s.stage.insertAdjacentHTML("beforeend",`
      <div class="level8-snapshot-panel">
        <button class="level8-snapshot-btn" id="level8-snapshot-btn"
                title="保存成就">📸</button>
        <div class="level8-completed-stamp" id="level8-completed-stamp">
          ✅ 完成啦!
        </div>
      </div>
    `),setTimeout(()=>{const w=document.getElementById("level8-completed-stamp");w&&w.classList.add("show")},600);const k=document.getElementById("level8-snapshot-btn");k&&(k.onclick=()=>{k.classList.add("clicked");const w=document.getElementById("level8-completed-stamp");w&&(w.textContent="🎉 成就已记录! 🎉",w.classList.add("show"));try{s.say("🎉 成就已记录!")}catch{}setTimeout(()=>k.classList.remove("clicked"),400)})}return()=>{if(Array.isArray(s._level8Timeouts)&&(s._level8Timeouts.forEach(b=>clearTimeout(b)),s._level8Timeouts=[]),clearTimeout(_),n&&n.parentNode&&n.remove(),s._level8Song=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level8-song-stage, .level8-staff-area, .level8-snapshot-panel").forEach(b=>b.remove());const f=document.getElementById("hud-level2");f&&(f.style.display="none");const v=document.querySelector(".hud__dots");v&&(v.style.display="");const x=document.getElementById("btn-replay");x&&(x.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ha=Object.freeze(Object.defineProperty({__proto__:null,default:qa},Symbol.toStringTag,{value:"Module"}));class Ga{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level9-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ce}">
        <!-- 暗黑背景加紫色光晕 -->
        <radialGradient id="neonGlow" cx="50%" cy="50%">
          <stop offset="0%" stop-color="#9b5de5" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#9b5de5" stop-opacity="0" />
        </radialGradient>
        <rect width="100%" height="100%" fill="url(#neonGlow)" />

        <!-- 装饰星星 -->
        <circle cx="120" cy="80" r="2" fill="rgba(255,255,255,0.6)" class="level9-twinkle" />
        <circle cx="240" cy="60" r="1.5" fill="rgba(255,255,255,0.5)" class="level9-twinkle" />
        <circle cx="660" cy="70" r="2" fill="rgba(255,255,255,0.6)" class="level9-twinkle" />
        <circle cx="580" cy="100" r="1" fill="rgba(255,255,255,0.4)" class="level9-twinkle" />

        <!-- 标题 -->
        <text x="400" y="100" text-anchor="middle" class="level9-title">🖤 黑键世界 🖤</text>
        <text x="400" y="140" text-anchor="middle" class="level9-subtitle">听声, 找黑键</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const ei=[{id:"cs",solfege:"Do#",pitch:"C#4"},{id:"ds",solfege:"Re#",pitch:"D#4"},{id:"fs",solfege:"Fa#",pitch:"F#4"},{id:"gs",solfege:"Sol#",pitch:"G#4"},{id:"as",solfege:"La#",pitch:"A#4"}];function Sn(s,e,t,i="rgba(155, 93, 229, 0.7)"){const n=document.createElement("span");n.className="level9-touch-ripple",n.style.left=`${e}px`,n.style.top=`${t}px`,n.style.borderColor=i,s.appendChild(n),n.offsetWidth,n.classList.add("go"),setTimeout(()=>n.remove(),750)}function ti(s,e){const t=document.createElement("div");t.className="level9-combo-float",t.textContent=e;const i=(Math.random()-.5)*120;t.style.left=`calc(50% + ${i}px)`,t.style.top="38%",s.appendChild(t),setTimeout(()=>t.remove(),1200)}function Wa(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[1046.5,1318.51,1567.98].forEach((n,r)=>{const l=t+r*.05,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(n,l);const a=e.createGain();a.gain.setValueAtTime(1e-4,l),a.gain.exponentialRampToValueAtTime(.45,l+.008),a.gain.exponentialRampToValueAtTime(1e-4,l+.25),o.connect(a).connect(s._masterGain),o.start(l),o.stop(l+.3)})}catch{}}function ja(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=9);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.scene=new Ga(s.stage),s.say("黑键朋友们也想被听见! 按从左到右的顺序听"),s.stage.insertAdjacentHTML("beforeend",'<div class="level9-keys-container"></div>');const i=s.stage.querySelector(".level9-keys-container"),n=document.createElement("div");n.className="level9-combo-meter",n.innerHTML='<span class="level9-combo-meter__num">0</span><span class="level9-combo-meter__x">x</span><span class="level9-combo-meter__label">连击</span>',n.style.display="none",i.appendChild(n);const r=n.querySelector(".level9-combo-meter__num");ei.forEach((a,d)=>{const c=document.createElement("button");c.className="level9-key",c.dataset.id=a.id,c.dataset.pitch=a.pitch,c.innerHTML=`
      <div class="level9-key__label">${a.solfege}</div>
      <div class="level9-key__ripple"></div>
    `,i.appendChild(c),c.addEventListener("pointerdown",_=>{const h=c.getBoundingClientRect(),m=_.clientX-h.left,g=_.clientY-h.top;c.classList.add("pressed"),setTimeout(()=>c.classList.remove("pressed"),300),s.audio.playNote(a.pitch),a.id===ei[s._level9Idx].id?(s._level9Idx++,s._level9Correct++,F.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1},{scale:3,opacity:0,duration:.6,ease:"power2.out"}),Sn(c,m,g,"rgba(155, 93, 229, 0.85)"),s._level9Combo=(s._level9Combo||0)+1,s._level9Combo>=2&&(n.style.display="",r.textContent=String(s._level9Combo),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump"),ti(s.stage,`x${s._level9Combo}${s._level9Combo>=5?" 🔥":""}`),s._level9Combo>=5&&s._level9Combo%5===0&&Wa(s.audio)),s.say(["对!","完美!","真棒!"][Math.min(s._level9Correct-1,2)]),s._level9Idx>=ei.length&&(s._level9Done=!0,s._level9Combo>=2&&ti(s.stage,`🎉 x${s._level9Combo} 全连!`),setTimeout(()=>{const u=Math.max(1,3-Math.floor(s.wrongCount/2));try{s.progress.markLevelComplete(9,u)}catch{}s.audio.playScale(["C#4","D#4","F#4","G#4","A#4"]),s.showWinOverlay(u,9)},800))):(s.wrongCount++,s.audio.wrong(),c.classList.add("shake"),setTimeout(()=>c.classList.remove("shake"),400),F.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1,backgroundColor:"#ff5252"},{scale:2.5,opacity:0,duration:.5,ease:"power2.out"}),Sn(c,m,g,"rgba(255, 82, 82, 0.9)"),s._level9Combo&&s._level9Combo>=2&&ti(s.stage,"断啦 💔"),s._level9Combo=0,n.style.display="none",n.classList.remove("bump"),s.say("从左到右! 不对, 重来"),s._level9Idx=0)})}),s._level9Idx=0,s._level9Correct=0,s._level9Done=!1,s._level9Combo=0;const l=s.stage.querySelector(".level9-background");l&&l.classList.add("beat-pulse");const o=()=>{l&&l.classList.remove("beat-pulse"),n.classList.remove("bump"),n.style.display="none"};return()=>{o(),s.scene&&s.scene.teardown(),s.stage.querySelectorAll(".level9-keys-container").forEach(d=>d.remove()),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const za=Object.freeze(Object.defineProperty({__proto__:null,default:ja},Symbol.toStringTag,{value:"Module"})),Ln=2200,Va=260,gs=80,Je=160,Cn=420,Ya=280,Ua=190,pt=(Je-gs)/4,Es=Je+pt,Qa=(Je+Es)/2,Ka={mi:Je,fa:Je-pt/2,sol:Je-pt,la:Je-pt*1.5,si:Je-pt*2,re:Qa,do:Es};class Za{constructor(e,t){this.root=e,this.notes=t,this.filled=new Set,this.render()}render(){const e=document.createElement("div");e.className="staff-wrap stage__staff-area";const t=[0,1,2,3,4].map(l=>`<line class="staff__line" x1="80" y1="${gs+l*pt}" x2="${Ln-20}" y2="${gs+l*pt}"/>`).join(""),i=Cn,n=`<line class="staff__ledger" x1="${i-30}" y1="${Es}" x2="${i+30}" y2="${Es}"/>`,r=this.notes.map((l,o)=>{const a=Cn+o*Ya,d=Ka[l.id]??gs;return`
          <g class="staff-slot" data-id="${l.id}">
            <text class="staff__label staff__label--top" x="${a}" y="${d-28}" text-anchor="middle" visibility="hidden">
              <tspan class="pitch">${l.note}</tspan>
            </text>
            <g class="staff-slot__placeholder" data-for="${l.id}">
              <circle class="staff__placeholder-ring" cx="${a}" cy="${d}" r="22" />
              <circle class="staff__dot empty" cx="${a}" cy="${d}" r="20" />
              <text class="staff__placeholder-label" x="${a}" y="${d+5}" text-anchor="middle">?</text>
            </g>
            <text class="staff__label staff__label--bot" x="${a}" y="${d+38}" text-anchor="middle" visibility="hidden">${l.solfege}</text>
            <!-- 透明大热区,扩大拖放容差 -->
            <circle class="staff__hit" cx="${a}" cy="${d}" r="55" fill="transparent" />
          </g>
        `}).join("");e.innerHTML=`
      <svg class="staff" xmlns="${ce}" viewBox="0 0 ${Ln} ${Va}"
           preserveAspectRatio="xMidYMid meet" aria-label="五线谱">
        <!-- 高音谱号 -->
        <text class="staff__clef" x="${Ua}" y="120" dominant-baseline="middle">𝄞</text>

        <!-- 5 条主线 -->
        ${t}

        <!-- Do 的加线(下方第 1 加线,虚线) -->
        ${n}

        <!-- 7 个占位点 + 标签 -->
        ${r}
      </svg>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.slots=new Map,this.svg.querySelectorAll(".staff-slot").forEach(l=>{this.slots.set(l.dataset.id,l)})}fillNote(e){if(this.filled.has(e))return;this.filled.add(e);const t=this.slots.get(e);if(!t)return;const i=this.notes.find(o=>o.id===e);if(!i)return;const n=t.querySelector(".staff__dot");if(!n)return;n.classList.remove("empty"),n.setAttribute("r","23"),n.style.fill=i.color,t.classList.add("filled"),t.querySelectorAll(".staff__label").forEach(o=>o.style.visibility="visible");const r=t.querySelector(".staff__placeholder-ring");r&&(r.style.display="none");const l=t.querySelector(".staff__placeholder-label");l&&(l.style.display="none")}showHint(e){this.clearHint();const t=this.slots.get(e);!t||this.filled.has(e)||t.classList.add("hint")}clearHint(){this.svg.querySelectorAll(".staff-slot.hint").forEach(e=>{e.classList.remove("hint")})}setTarget(e){if(this.clearTarget(),!e)return;const t=this.slots.get(e);if(!t||this.filled.has(e))return;t.classList.add("targeting");const i=this.notes.findIndex(n=>n.id===e);if(i>0){const n=this.notes[i-1].id,r=this.slots.get(n);r&&!this.filled.has(n)&&r.classList.add("targeting-adjacent")}if(i>=0&&i<this.notes.length-1){const n=this.notes[i+1].id,r=this.slots.get(n);r&&!this.filled.has(n)&&r.classList.add("targeting-adjacent")}}clearTarget(){this.svg.querySelectorAll(".staff-slot.targeting, .staff-slot.targeting-adjacent").forEach(e=>{e.classList.remove("targeting","targeting-adjacent")})}flashFill(e){const t=this.slots.get(e);t&&(t.classList.add("filling"),setTimeout(()=>{try{t.classList.remove("filling")}catch{}},900))}reset(){this.filled.clear(),this.svg.querySelectorAll(".staff-slot").forEach(e=>{e.classList.remove("filled","hint","targeting","targeting-adjacent","filling");const t=e.querySelector(".staff__dot");t&&(t.classList.add("empty"),t.setAttribute("r","20"),t.style.fill=""),e.querySelectorAll(".staff__label").forEach(r=>r.style.visibility="hidden");const i=e.querySelector(".staff__placeholder-ring");i&&(i.style.display="");const n=e.querySelector(".staff__placeholder-label");n&&(n.style.display="")})}}const Mn="forest-piano-achievements",fs=[{id:"first-graduate",name:"🎓 毕业生",desc:"完成任意一关",emoji:"🎓",check:s=>(s.completedLevels||[]).length>=1},{id:"forest-master",name:"🏆 森林大师",desc:"完成全部 8 关",emoji:"🏆",check:s=>{const e=(s.completedLevels||[]).map(String);return[1,2,3,4,5,6,7,8].every(t=>e.includes(String(t)))}},{id:"perfect-pitch",name:"⭐ 完美演奏",desc:"获得任一关 3 颗星",emoji:"⭐",check:s=>Object.values(s.stars||{}).some(e=>Number(e)>=3)},{id:"diamond-ear",name:"💎 钻石之耳",desc:"全部 8 关都获得 3 颗星",emoji:"💎",check:s=>{const e=s.stars||{};return[1,2,3,4,5,6,7,8].every(t=>Number(e[t]||0)>=3)}},{id:"repeat-master",name:"🔁 重复高手",desc:"累计完成 10 次关卡 (含重玩)",emoji:"🔁",check:s=>Number(s.totalCompletions||0)>=10},{id:"treehouse-climber",name:"🌳 树屋登顶",desc:"完成第 7 关 (完整 7 音阶)",emoji:"🌳",check:s=>(s.completedLevels||[]).map(String).includes("7")},{id:"concert-master",name:"🎵 音乐家",desc:"完成第 8 关 (音乐会)",emoji:"🎵",check:s=>(s.completedLevels||[]).map(String).includes("8")},{id:"drumming-kid",name:"🥁 小鼓手",desc:"完成第 4 关 (节奏)",emoji:"🥁",check:s=>(s.completedLevels||[]).map(String).includes("4")},{id:"mountaineer",name:"🏔️ 山谷行者",desc:"完成第 3 关 (五声音阶)",emoji:"🏔️",check:s=>(s.completedLevels||[]).map(String).includes("3")},{id:"two-hands",name:"🎹 双手钢琴家",desc:"完成第 6 关 (双手协调)",emoji:"🎹",check:s=>(s.completedLevels||[]).map(String).includes("6")},{id:"starter",name:"🌱 萌芽",desc:"完成第 1 关 (入门)",emoji:"🌱",check:s=>(s.completedLevels||[]).map(String).includes("1")},{id:"listener",name:"👂 敏锐耳朵",desc:"完成第 2 关 (听音找鱼)",emoji:"👂",check:s=>(s.completedLevels||[]).map(String).includes("2")}];class Xa{constructor(e){this.progress=e,this.state=this._load(),this.unlocked=new Set(this.state.unlockedIds),this._backfill()}_load(){try{if(typeof localStorage>"u")return{unlockedIds:[]};const e=localStorage.getItem(Mn);if(e){const t=JSON.parse(e);if(t&&Array.isArray(t.unlockedIds))return t}}catch{}return{unlockedIds:[]}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Mn,JSON.stringify({unlockedIds:Array.from(this.unlocked)}))}catch{}}_backfill(){if(!this.progress)return;let e=!1;try{const t=this.progress.getSnapshot();for(const i of fs)this.unlocked.has(i.id)||i.check(t)&&(this.unlocked.add(i.id),e=!0);e&&this._save()}catch{}}checkAndUnlock(){let e;try{e=this.progress?this.progress.getSnapshot():null}catch{e=null}if(!e)return[];const t=[];for(const i of fs)if(!this.unlocked.has(i.id))try{i.check(e)&&(this.unlocked.add(i.id),t.push(i))}catch{}return t.length>0&&this._save(),t}has(e){return this.unlocked.has(e)}getAll(){return fs.map(e=>({...e,unlocked:this.unlocked.has(e.id)}))}getProgressPercent(){const e=fs.length;return Math.round(this.unlocked.size/e*100)}getUnlockedCount(){return this.unlocked.size}reset(){this.unlocked=new Set,this._save()}}class Ja{static show(e,t={}){if(!e)return;const i=Math.max(1500,Number(t.durationMs)||4500),n=document.querySelector(`.achievement-toast[data-id="${ec(e.id||"")}"]`);n&&n.remove();const r=document.createElement("div");r.className="achievement-toast",e.id&&(r.dataset.id=e.id),r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),r.innerHTML=`
      <div class="achievement-toast__icon">${e.emoji||"🏅"}</div>
      <div class="achievement-toast__body">
        <div class="achievement-toast__title">成就解锁!</div>
        <div class="achievement-toast__name">${En(e.name||"")}</div>
        ${e.desc?`<div class="achievement-toast__desc">${En(e.desc)}</div>`:""}
      </div>
    `,document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add("show")}),setTimeout(()=>{r.classList.remove("show"),r.classList.add("hide"),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},500)},i)}}function En(s){return s==null?"":String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ec(s){return String(s).replace(/[^a-zA-Z0-9_-]/g,"_")}class tc{constructor(e){this.stage=e,this.canvas=null,this.ctx=null,this.analyser=null,this.dataArray=null,this._running=!1}init(e){if(!(!e||!e._webAudio))try{this.analyser=e._webAudio.createAnalyser(),this.analyser.fftSize=256,e._masterGain.connect(this.analyser),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount)}catch{}}show(){this.hide()}hide(){this._running=!1,this.canvas&&this.canvas.parentNode&&(this.canvas.parentNode.removeChild(this.canvas),this.canvas=null)}_loop(){if(!this._running||!this.canvas||(requestAnimationFrame(()=>this._loop()),!this.analyser))return;this.analyser.getByteTimeDomainData(this.dataArray);const e=this.canvas.width,t=this.canvas.height;this.ctx.clearRect(0,0,e,t),this.ctx.strokeStyle="rgba(255, 209, 102, 0.5)",this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(0,t/2),this.ctx.lineTo(e,t/2),this.ctx.stroke(),this.ctx.lineWidth=2,this.ctx.strokeStyle="#ffd166",this.ctx.beginPath();const i=e/this.dataArray.length;let n=0;for(let r=0;r<this.dataArray.length;r++){const o=this.dataArray[r]/128*t/2;r===0?this.ctx.moveTo(n,o):this.ctx.lineTo(n,o),n+=i}this.ctx.stroke()}}class An{constructor(e){this.root=e,this.render()}render(){const e=document.createElement("div");e.className="bg",e.style.cssText=`
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background: linear-gradient(180deg,
        #d4ecdd 0%,
        #b6dcc6 25%,
        #a8dadc 50%,
        #79c2c8 75%,
        #5fa8b5 100%);
    `,e.innerHTML=`
      <svg viewBox="0 0 1024 600" preserveAspectRatio="xMidYMax slice" style="width:100%;height:100%;position:absolute;inset:0;">
        <!-- 远山 -->
        <path d="M0 220 Q 150 140 320 200 T 640 200 T 1024 220 L 1024 320 L 0 320 Z"
              fill="#9bc6a3" opacity="0.55"/>
        <path d="M0 260 Q 200 200 400 240 T 800 240 T 1024 260 L 1024 340 L 0 340 Z"
              fill="#7fb591" opacity="0.6"/>

        <!-- 河岸树 -->
        <g opacity="0.85">
          <ellipse cx="120" cy="160" rx="80" ry="60" fill="#6fa078"/>
          <rect x="115" y="180" width="10" height="40" fill="#5a3a2a"/>
          <ellipse cx="900" cy="170" rx="100" ry="70" fill="#6fa078"/>
          <rect x="895" y="195" width="10" height="40" fill="#5a3a2a"/>
        </g>

        <!-- 河面水波 -->
        <g stroke="#ffffff" stroke-opacity="0.4" stroke-width="2" fill="none">
          <path d="M0 460 Q 80 455 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0 460 Q 80 455 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460;
                      M0 460 Q 80 465 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460;
                      M0 460 Q 80 455 160 460 T 320 460 T 480 460 T 640 460 T 800 460 T 960 460 T 1024 460"/>
          </path>
          <path d="M0 500 Q 100 495 200 500 T 400 500 T 600 500 T 800 500 T 1024 500">
            <animate attributeName="d" dur="7s" repeatCount="indefinite"
              values="M0 500 Q 100 495 200 500 T 400 500 T 600 500 T 800 500 T 1024 500;
                      M0 500 Q 100 505 200 500 T 400 500 T 600 500 T 800 500 T 1024 500;
                      M0 500 Q 100 495 200 500 T 400 500 T 600 500 T 800 500 T 1024 500"/>
          </path>
        </g>

        <!-- 漂浮气泡 -->
        <g fill="white" opacity="0.6">
          <circle cx="200" cy="500" r="5"><animate attributeName="cy" from="500" to="300" dur="8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.6;0" dur="8s" repeatCount="indefinite"/></circle>
          <circle cx="420" cy="520" r="3"><animate attributeName="cy" from="520" to="320" dur="10s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0" dur="10s" repeatCount="indefinite"/></circle>
          <circle cx="650" cy="510" r="4"><animate attributeName="cy" from="510" to="310" dur="9s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0" dur="9s" repeatCount="indefinite"/></circle>
          <circle cx="850" cy="530" r="3"><animate attributeName="cy" from="530" to="330" dur="11s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.5;0" dur="11s" repeatCount="indefinite"/></circle>
        </g>
      </svg>
    `,this.root.appendChild(e)}}class sc{constructor(e,t={}){this.root=e,this.opts=t||{},this.audio=t.audio||null,this.defaultHint=t.hint||"我帮你找五线谱位置~ 点我一下试试",this.hintTimer=null,this.waveTimer=null,this.sleepTimer=null,this._render(),this._wireInteractions(),this._startIdleLoop(),setTimeout(()=>this.setHint(this.defaultHint),600)}_render(){const e=document.createElement("div");e.className="pip",e.innerHTML=`
      <div class="pip-speech-bubble" role="status" aria-live="polite"></div>
      <div class="pip-tap">
        <svg viewBox="0 0 100 100">
          <!-- 身体 -->
          <ellipse cx="50" cy="58" rx="34" ry="32" fill="#ffd166" />
          <ellipse cx="50" cy="64" rx="26" ry="22" fill="#fff3b0" />
          <!-- 翅膀 -->
          <ellipse class="pip-wing" cx="30" cy="58" rx="10" ry="16" fill="#f4a261" transform="rotate(-15 30 58)"/>
          <!-- 眼睛 -->
          <circle cx="42" cy="48" r="6" fill="white"/>
          <circle class="pip-pupil" cx="42" cy="48" r="3" fill="#1a1a1a">
            <animate attributeName="cx" values="42;45;42" dur="4s" repeatCount="indefinite"/>
          </circle>
          <circle cx="62" cy="48" r="6" fill="white"/>
          <circle class="pip-pupil" cx="62" cy="48" r="3" fill="#1a1a1a">
            <animate attributeName="cx" values="62;65;62" dur="4s" repeatCount="indefinite"/>
          </circle>
          <!-- 嘴 -->
          <path d="M40 60 L50 70 L60 60 Z" fill="#e76f51"/>
          <!-- 腮红 -->
          <circle cx="30" cy="58" r="3" fill="#e07a5f" opacity="0.6"/>
          <circle cx="70" cy="58" r="3" fill="#e07a5f" opacity="0.6"/>
          <!-- 头羽 -->
          <path d="M50 18 Q 45 8 50 12 Q 55 8 50 18" fill="#f4a261"/>
          <!-- 腿 -->
          <line x1="44" y1="86" x2="44" y2="94" stroke="#5a3a2a" stroke-width="2"/>
          <line x1="56" y1="86" x2="56" y2="94" stroke="#5a3a2a" stroke-width="2"/>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/>
        </svg>
      </div>
    `,this.root.appendChild(e),this.element=e,this.bubble=e.querySelector(".pip-speech-bubble"),this.tapTarget=e.querySelector(".pip-tap")}_wireInteractions(){const e=t=>{t.preventDefault?.(),t.stopPropagation?.(),this.react("chip"),this._chirp()};this.tapTarget.addEventListener("click",e),this.tapTarget.addEventListener("touchstart",e,{passive:!1})}_startIdleLoop(){const e=()=>{const t=8e3+Math.random()*6e3;this.waveTimer=setTimeout(()=>{this.react("wave"),e()},t)};e()}react(e){if(!this.element||this.element.classList.contains(`pip-${e}`))return;this.element.classList.add(`pip-${e}`);const t={wave:900,cheer:700,chip:600,sleep:3e3,think:4e3}[e]||700;setTimeout(()=>{this.element.classList.remove(`pip-${e}`)},t)}setHint(e,t=3200){if(this.bubble){if(this.hintTimer&&(clearTimeout(this.hintTimer),this.hintTimer=null),e)this.bubble.textContent=e,this.bubble.classList.add("show");else{this.bubble.classList.remove("show");return}this.hintTimer=setTimeout(()=>{this.bubble.classList.remove("show"),this.hintTimer=null},t)}}_chirp(){if(this.audio){try{this.audio.hover()}catch{}return}try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this._ctx||(this._ctx=new e);const t=this._ctx,i=t.currentTime,n=t.createOscillator(),r=t.createGain();n.type="triangle",n.frequency.setValueAtTime(900,i),n.frequency.exponentialRampToValueAtTime(600,i+.12),r.gain.setValueAtTime(.001,i),r.gain.exponentialRampToValueAtTime(.22,i+.02),r.gain.exponentialRampToValueAtTime(.001,i+.18),n.connect(r).connect(t.destination),n.start(i),n.stop(i+.2)}catch{}}destroy(){if(this.waveTimer&&clearTimeout(this.waveTimer),this.sleepTimer&&clearTimeout(this.sleepTimer),this.hintTimer&&clearTimeout(this.hintTimer),this._ctx){try{this._ctx.close()}catch{}this._ctx=null}this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}}const Pn="forest-piano-last-level",ic={"drag-up":"⬆️🐟","listen-pick":"🎵🐟","mountain-sort":"🏔️🎵","drum-rhythm":"🥁🫧","staff-fall":"⭐🎼","two-hand":"🖐️🎹","treehouse-build":"🌳🏠","concert-stage":"🎭🎶","black-keys":"🖤🎹","octave-pick":"🎹⇅","memory-match":"🎴🃏","tempo-cut":"🥁🍅","metronome-tap":"⏱️🥁","chord-build":"🎶🐟","staff-read":"🎼⚡","speed-ramp":"🚀⚡"},As=[{id:1,name:"小鱼跳进五线谱",emoji:"🐟",desc:"帮 7 条小鱼找到五线谱的家",theme:"#5fa8b5",mechanic:"drag-up"},{id:2,name:"听!是谁在唱",emoji:"🎵",desc:"系统播音, 找出对应的鱼",theme:"#264653",mechanic:"listen-pick"},{id:3,name:"Mi-Sol 山谷",emoji:"🏔️",desc:"柯尔文爷爷教五声音阶",theme:"#e76f51",mechanic:"mountain-sort"},{id:4,name:"节奏小河",emoji:"🥁",desc:"跟着节拍泡泡敲鼓",theme:"#1a3a4a",mechanic:"drum-rhythm"},{id:5,name:"小星星视奏",emoji:"⭐",desc:"跟着五线谱弹小星星",theme:"#2a2050",mechanic:"staff-fall"},{id:6,name:"双手协调",emoji:"🎹",desc:"钢琴老师教双手按双音",theme:"#d4a574",mechanic:"two-hand"},{id:7,name:"树屋 7 音阶",emoji:"🌳",desc:"爬上树屋看完整七音阶",theme:"#65a30d",mechanic:"treehouse-build"},{id:8,name:"森林音乐会",emoji:"🎭",desc:"选曲并演奏森林音乐会",theme:"#3d0a55",mechanic:"concert-stage"},{id:9,name:"黑键世界",emoji:"🖤",desc:"听声, 按顺序点黑键",theme:"#2a0a55",mechanic:"black-keys"},{id:10,name:"八度之旅",emoji:"🎹",desc:"听音 — 是低八度还是高八度?",theme:"#1e3a5f",mechanic:"octave-pick"},{id:11,name:"翻牌记忆",emoji:"🎴",desc:"翻开两张牌找一样的朋友",theme:"#d96e8a",mechanic:"memory-match"},{id:12,name:"番茄节奏",emoji:"🥁",desc:"跟着摆杆切菜 — 命中节拍!",theme:"#c0392b",mechanic:"tempo-cut"},{id:13,name:"节奏大师",emoji:"⏱️",desc:"跟随节拍器逐渐加速,敲准 30 拍",theme:"#8b4513",mechanic:"metronome-tap"},{id:14,name:"和弦建造",emoji:"🎶",desc:"拖三只鱼组成 C 大调",theme:"#9b5de5",mechanic:"chord-build"},{id:15,name:"视奏大师",emoji:"🎼",desc:"快速读谱 + 按键",theme:"#457b9d",mechanic:"staff-read"},{id:16,name:"节奏阶梯",emoji:"🚀",desc:"速度阶梯挑战",theme:"#f4a261",mechanic:"speed-ramp"}];class nc{constructor(e,{progress:t,onSelect:i}){this.stage=e,this.progress=t,this.onSelect=i,this.element=null}show(){const e=document.createElement("div");e.className="level-map-overlay",e.innerHTML=`
      <div class="level-map-card">
        <div class="level-map-title">🌳 森林钢琴学校 🎹</div>
        <div class="level-map-subtitle">选一个关卡开始~</div>
        <div class="level-map-grid">
          ${As.map(i=>{const n=this.progress?this.progress.getStars(i.id):0,r=n>0?"⭐".repeat(n)+"☆".repeat(3-n):"☆☆☆",l=ic[i.mechanic]||"",o=i.id<=7?["Do","Re","Mi","Fa","Sol","La","Ti"][i.id-1]:"";return`
              <button class="level-map-tile" data-id="${i.id}" data-mechanic="${i.mechanic}" style="--tile-accent: ${i.theme}">
                <div class="level-map-tile__mechanic" aria-hidden="true">${l}</div>
                <div class="level-map-tile__preview" aria-hidden="true">
                  <span class="level-map-tile__fish">🐟</span>
                  ${o?`<span class="level-map-tile__solfege">${o}</span>`:""}
                </div>
                <div class="level-map-tile__emoji">${i.emoji}</div>
                <div class="level-map-tile__id">第 ${i.id} 关</div>
                <div class="level-map-tile__name">${i.name}</div>
                <div class="level-map-tile__desc">${i.desc}</div>
                <div class="level-map-tile__stars">${r}</div>
              </button>
            `}).join("")}
        </div>
        <div class="level-map-footer">v17.8 · 点击卡片开始</div>
      </div>
    `,this.stage.appendChild(e),this.element=e;let t=1;try{const i=localStorage.getItem(Pn),n=parseInt(i,10);Number.isFinite(n)&&n>=1&&n<=As.length&&(t=n)}catch{}if(t&&t!==1){const i=e.querySelector(".level-map-card"),n=document.createElement("button");n.className="continue-btn",n.type="button",n.innerHTML=`▶ 继续上次: 第 ${t} 关`,n.addEventListener("click",()=>{this.hide(),this.onSelect&&this.onSelect(t)}),i.insertBefore(n,i.firstChild)}e.querySelectorAll(".level-map-tile").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.dataset.id,10);i.classList.add("selected");try{localStorage.setItem(Pn,String(n))}catch{}setTimeout(()=>{this.onSelect&&this.onSelect(n)},200)})})}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null)}}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.LEVEL_META=As);const rc=Object.assign({"./Level1.js":Vr,"./Level10.js":go,"./Level11.js":Co,"./Level12.js":Do,"./Level13.js":Ro,"./Level14.js":Wo,"./Level15.js":Qo,"./Level16.js":Jo,"./Level2.js":ta,"./Level3.js":ha,"./Level4.js":ma,"./Level5.js":ka,"./Level6.js":Aa,"./Level7.js":Ia,"./Level8.js":Ha,"./Level9.js":za}),Ps=new Map;for(const[s,e]of Object.entries(rc)){const t=s.match(/Level(\d+)\.js$/);t&&typeof e.default=="function"&&Ps.set(parseInt(t[1],10),e.default)}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.levels=Ps);const fe=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],$n=["真棒!","太厉害了~","不错哟!","加油加油!","马上就完成了!"];function lc(s,e,t,i){const n=$n[Math.floor(Math.random()*$n.length)],r=Math.max(0,t-e),l=[`${s} 归位啦! ${n} 还有 ${r} 条~`,`${s} 找到家啦! 🎉 还差 ${r} 条就胜利~`,`耶! ${s} 也安顿好了~ 再来 ${r} 条!`];return i>=3&&(l.push(`没关系, ${s} 归位啦! 还剩 ${r} 条, 慢慢来~`),l.push(`慢慢来, ${s} 已经回家了! 还有 ${r} 条小鱼需要帮忙~`)),r===1?l.push(`${s} 也到家啦! 只剩最后 1 条小鱼咯! ⭐`):r===2&&l.push(`${s} 找到家啦! 再坚持一下, 还有 2 条~`),l[Math.floor(Math.random()*l.length)]}function oc(s,e){if(!s||s.length===0)return"试试别的鱼, 一条一条来~";const t=Math.floor(Math.random()*s.length),i=s[t],n=["最下面那条加线","加线上面那个间","最下面那条线 (si 隔壁)","往上数第 2 条线","往中间数的那个间","中间那条线 (la 隔壁)","中间上面那条线"],l=["mi","fa","sol","la","si","re","do"].indexOf(i.id),o=l>=0?n[l]:"五线谱上的位置",a=[`试试把 ${i.solfege} 拖到 ${o}~`,`${i.solfege} 的家在 ${o} 哦~ 🌟`,`这条 ${i.solfege} 小鱼呢? 它的家在 ${o}!`,`${i.solfege} 的家在 ${o} ✨ 帮它找找~`];return e>=4&&(a.push(`别着急~ 先听 ${i.solfege} 的声音, 再把它拖到 ${o} 上哦~`),a.push(`深呼吸! 把 ${i.solfege} 小心地拖到 ${o} ✨`)),a[Math.floor(Math.random()*a.length)]}class Rr{constructor({stageEl:e,bubbleEl:t,progress:i,audio:n}){is(this,"_lastWrongHint","");is(this,"_lastCorrectNote","");is(this,"_firstCorrectNote",null);this.stage=e,this.bubble=t,this.progress=i,this.audio=n,this.achievements=new Xa(this.progress),this.placed=new Set,this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this.gate=!1,this._lastActivityAt=0,this._idleNudgeScheduled=!1,this._hintTimer=null,this.waveform=new tc(this.stage),this.waveform.init(this.audio),this.waveform.show()}start({levelId:e}){if(document.querySelectorAll(".overlay, .level-map-overlay, .practice-room, .song-library, .song-demo-overlay, .song-play-overlay, .song-score-overlay, .achievements-wall, .settings-panel, .tutorial, .keyboard-help, .streak-toast").forEach(i=>i.remove()),this.fishPool&&typeof this.fishPool.destroy=="function")try{this.fishPool.destroy()}catch{}if(this.stage&&(this.stage.innerHTML=""),this.waveform&&typeof this.waveform.show=="function"&&this.waveform.show(),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this.firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.gate=!1,this._level2AnswerNote=null,this._level2Current=0,this._level2Done=new Set,typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.audio&&typeof this.audio.stop=="function")try{this.audio.stop()}catch{}const t=Ps.get(e);if(t){this._syncStageMode(e);try{const i=t(this);this._teardownCurrentLevel=typeof i=="function"?i:null}catch(i){console.error(`Level ${e} failed to start:`,i),this._syncStageMode(1),this._fallbackToLevel1()}this._updateLevelBadge(e);return}console.warn(`Level ${e} not registered, falling back to Level 1`),this._syncStageMode(1),this._startLevel1(),this._updateLevelBadge(1)}_syncStageMode(e){if(!this.stage)return;const t=e===1||e===2;this.stage.classList.toggle("stage--stack",t)}_updateLevelBadge(e){try{const t=document.getElementById("level-badge");if(!t)return;const i=As.find(n=>n.id===e);i&&(t.textContent=`🗺️ 回地图 · 第 ${i.id} 关`)}catch{}}_fallbackToLevel1(){const e=Ps.get(1)||this._startLevel1.bind(this);try{e(this)}catch(t){console.error(t)}}_startLevel1(){this._showLevel2HUD(!1),this._level1FirstTap=!1,this._lastTapTime=0,this.say("点屏幕开始呀～"),this.bg=new An(this.stage),this.staff=new Za(this.stage,fe),this.kb=new gt(this.stage,fe),this.fishPool=new Ms(this.stage,fe),this.pip=new sc(this.stage),this.fishPool.setDragEnabled(!0),this.fishPool.onDrop=(e,t,i)=>this.onFishDrop(e,t,i),this.fishPool.onDragStart=e=>{this._markActivity(),this.hasStartedDrag||(this.hasStartedDrag=!0),this.audio.hover(e.dataset.id)},this.fishPool.onDragMove=(e,t)=>{if(this._markActivity(),!!this.staff)if(t){const i=t.dataset.id;this.staff.setTarget(i),this.staff.showHint(i)}else this.staff.clearTarget(),this.staff.clearHint()},this.fishPool.onTap=e=>{if(this._level1FirstTap){if(Date.now()-(this._lastTapTime||0)<250&&this._lastTapEl===e)return}else this._level1FirstTap=!0;this._lastTapTime=Date.now(),this._lastTapEl=e,this._markActivity(),this.hasTappedFish||(this.hasTappedFish=!0,this._advanceHint("first_tap"));try{this.audio.playNote(e.dataset.pitch)}catch{}try{this.audio.hover(e.dataset.id)}catch{}F.fromTo(e,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})},this.kb.onPress=e=>{this._markActivity(),this.audio.playNote(e.dataset.pitch),this.kb.glowKey(e)},this._skipStartOverlayOnce?(this._skipStartOverlayOnce=!1,this._beginLevel()):this._showStartOverlay()}_startLevel2(){this._showLevel2HUD(!0),this.say("第二关, 听音找鱼! 系统会播一个音, 找对的小鱼~"),this.bg=new An(this.stage),this.kb=new gt(this.stage,fe),this.fishPool=new Ms(this.stage,fe),this.fishPool.setDragEnabled(!1),this._level2Total=5,this._level2Current=0,this._level2AnswerNote=null,this._level2Done=new Set,this.gate=!0,this._level2FirstTap=!1,this._lastTapTime=0,this.fishPool.onTap=t=>{if(this._markActivity(),!t)return;if(this._level2FirstTap){if(Date.now()-(this._lastTapTime||0)<250&&this._lastTapEl===t)return}else this._level2FirstTap=!0;this._lastTapTime=Date.now(),this._lastTapEl=t;const i=t.dataset.id;this._level2AnswerNote&&this._handleLevel2Answer(i,t)},this.fishPool.onDragStart=null,this.fishPool.onDragMove=null,this.fishPool.onDrop=null,this.kb.onPress=t=>{this._markActivity(),this.audio.playNote(t.dataset.pitch),this.kb.glowKey(t)};const e=document.getElementById("btn-replay-q");e&&(e.onclick=()=>this._replayQuestion()),this._updateHudProgress(),setTimeout(()=>this._level2NextQuestion(),800)}_handleLevel2Answer(e,t){if(e===this._level2AnswerNote){try{this.audio.correct()}catch{}this._markLevel2FishCorrect(t);const i=fe.find(n=>n.id===e);this._floatScore(window.innerWidth/2,window.innerHeight/2,(i?i.solfege:"")+" ✓"),this.say(`对啦! 这就是 ${i?i.solfege:""} 🎉`),this._level2AnswerNote=null,setTimeout(()=>this._level2NextQuestion(),1600)}else{this.wrongCount++;try{this.audio.wrong()}catch{}t.classList.add("shake"),setTimeout(()=>t.classList.remove("shake"),400),this.say(`刚才听到的是 ${this._lastPlayedSolfege}, 再找找看? 🎵`),this._replayQuestion()}}_level2NextQuestion(){if(this._level2Current++,this._level2Current>this._level2Total)return this._handleLevel2Win();const e=this._level2Done||new Set,t=fe.filter(r=>!e.has(r.id)),i=t.length?t:fe,n=i[Math.floor(Math.random()*i.length)];this._level2AnswerNote=n.id,this._lastPlayedSolfege=n.solfege,this._updateLevel2HUD(),this.say("听一听, 哪条小鱼是这个音? 🎵");try{this.audio.playNote(n.pitch)}catch{}}_replayQuestion(){if(!this._level2AnswerNote)return;const e=fe.find(t=>t.id===this._level2AnswerNote);if(e)try{this.audio.playNote(e.pitch)}catch{}}_markLevel2FishCorrect(e){this._level2Done||(this._level2Done=new Set),this._level2Done.add(e.dataset.id),e.classList.add("fish--correct"),e.style.pointerEvents="none",this._updateHudProgress()}_updateLevel2HUD(){this._updateHudProgress()}_updateHudProgress(){const e=this._level2Done?this._level2Done.size:0,t=this._level2Total||5,i=document.getElementById("level2-badge");i&&(i.textContent=`第 ${e} / ${t} 题`);const n=document.getElementById("btn-replay-q");n&&(n.style.display=this._level2Current<=t?"":"none")}_handleLevel2Win(){this.gate=!1,this._clearHintTimer();const e=this._calcStars();try{this.progress.markLevelComplete(2,e)}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{Wt.celebrate()}catch{}setTimeout(()=>this.showWinOverlay(e,2),1200)}_showLevel2HUD(e){const t=document.getElementById("hud-level2");t&&(t.style.display=e?"":"none");const i=document.querySelector(".hud__dots");i&&(i.style.display=e?"none":"");const n=document.getElementById("btn-replay");n&&(n.style.display=e?"none":"")}_showStartOverlay(){document.querySelectorAll(".overlay").forEach(i=>i.remove());const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=new nc(this.stage,{progress:this.progress,onSelect:i=>{this.audio.unlockOnGesture().catch(n=>console.warn(n)),t.hide(),this._skipStartOverlayOnce=!0,this.start({levelId:i})}});t.show()}goHome(){try{this.audio.stop()}catch{}if(typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.fishPool&&typeof this.fishPool.destroy=="function"){try{this.fishPool.destroy()}catch{}this.fishPool=null}document.querySelectorAll(".overlay, .level-map-overlay, .practice-room, .song-library, .song-demo-overlay, .song-play-overlay, .song-score-overlay, .achievements-wall, .settings-panel, .tutorial, .keyboard-help, .streak-toast").forEach(i=>i.remove()),this.stage&&(this.stage.innerHTML=""),this.stage&&this.stage.classList.remove("stage--stack"),this._showLevel2HUD(!1);const e=document.querySelector(".hud__dots");e&&(e.style.display="");const t=document.getElementById("btn-replay");if(t&&(t.style.display=""),this.placed.clear(),this.wrongCount=0,this.gate=!1,this._clearHintTimer(),typeof window<"u")try{window.__forestPiano.currentLevelId=null}catch{}this._showStartOverlay()}_beginLevel(){this.gate=!0,this._markActivity(),this.say("欢迎来到森林!🐤 点点小鱼, 听听它们的声音~"),this.fishPool.intro(),this._pulseStaff(),this._enterHint("intro")}_pulseStaff(){if(!this.staff||!this.staff.svg)return;this.staff.svg.querySelectorAll(".staff-slot").forEach((t,i)=>{setTimeout(()=>{t.classList.add("pulse-hint"),setTimeout(()=>t.classList.remove("pulse-hint"),2400)},i*100)})}_markActivity(){this._lastActivityAt=Date.now()}_clearHintTimer(){this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null)}_enterHint(e){if(!this.bubble)return;this._clearHintTimer();let t="";switch(e){case"intro":t="先把手指放在小鱼上, 听听它唱的啥 🎵",this._scheduleIdleNudge(12e3,"idle_1");break;case"hint_listen":t="先随便摸一条鱼听听它的声音吧~ 🐟",this._scheduleIdleNudge(14e3,"idle_1");break;case"first_tap":t="听到了吗? 这种声音在钢琴上也有哦! 🎹",this._scheduleIdleNudge(1e4,"idle_drag");break;case"hint_drag":t="试试长按这条鱼, 拖到上面五线谱 Do 的位置~",this._scheduleIdleNudge(1e4,"idle_drag");break;case"first_correct":{const i=this._placedOnText(this.firstCorrectNote),n=fe.length-1,r=[`${i} 找到家啦! 还有 ${n} 个要帮~`,`耶! ${i} 归位! 🎉 还有 ${n} 条小鱼等着你呢~`,`真棒! ${i} 已经回到五线谱啦! 还差 ${n} 条~`];t=r[Math.floor(Math.random()*r.length)],this._scheduleIdleNudge(12e3,"idle_keep_going");break}case"correct_subsequent":{const i=this._lastCorrectNote;t=lc(i,this.placed.size,fe.length,this.wrongCount),this._scheduleIdleNudge(14e3,"idle_keep_going");break}case"wrong_drop_near":{const i=this._lastWrongHint||"呀, 试试上面那个颜色一样的位置!";t=this.wrongCount>=2?`没关系的! ${i}`:i,this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"wrong_drop_far":{const i=["不对哟~ 拖到上面那条五线谱的家 ✨","鱼还在游呢! 帮它回到上面五线谱的家吧~","呀, 再往上一点! 五线谱在上面等着呢~"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"idle_keep_going":{const i=fe.filter(n=>!this.placed.has(n.id));t=oc(i,this.wrongCount),this._scheduleIdleNudge(12e3,"idle_hard");break}case"idle_hard":{const i=["先听一首钢琴曲怎么样? 试试底下的钢琴键吧! 🎹","需要休息吗? 听听其它音乐, 等下再来! 🎵","先随便摸鱼听听声音, 找找感觉再继续! 🐟"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(2e4,"idle_give_up");break}case"win":return;default:t=e}this.say(t),this.bubble.classList.remove("bubble--pulse"),this.bubble.offsetWidth,this.bubble.classList.add("bubble--pulse")}_advanceHint(e){switch(e){case"first_tap":this._hintTimer=setTimeout(()=>this._enterHint("hint_drag"),4500);break;case"first_correct":this._enterHint("first_correct");break;case"subsequent_correct":this._enterHint("correct_subsequent");break}}_scheduleIdleNudge(e,t){this._idleNudgeScheduled||(this._clearHintTimer(),this._hintTimer=setTimeout(()=>{if(t==="idle_1"&&!this.hasTappedFish||t==="idle_drag"&&!this.hasStartedDrag||t==="idle_keep_going"&&this.placed.size<fe.length||t==="idle_hard"){this._idleNudgeScheduled=!1,this._enterHint(t);return}},e),this._idleNudgeScheduled=!0)}_placedOnText(e){const t=fe.find(i=>i.id===e);return t?t.solfege:"小鱼"}onFishDrop(e,t,i){this.gate&&(this._markActivity(),i&&t?this.handleCorrect(e,t):this.handleWrong(e,t))}handleCorrect(e,t){const i=e.dataset.id;if(this.placed.has(i))return;this.placed.add(i);try{this.fishPool.lockFish(i)}catch{}this._lastCorrectNote=this._placedOnText(i);const n=this.firstCorrectNote===null||this.firstCorrectNote===void 0;n&&(this.firstCorrectNote=i);const r=t.getBoundingClientRect(),l=this.fishPool.root.getBoundingClientRect(),o=r.left-l.left+r.width/2,a=r.top-l.top+r.height/2,d=parseFloat(e.style.left)||0,c=parseFloat(e.style.top)||0,_=o-d-e.offsetWidth/2,h=a-c-e.offsetHeight/2;F.to(e,{x:_,y:h,scale:.85,duration:.5,ease:"back.out(1.7)",onComplete:()=>{try{this.staff.flashFill(i)}catch{}try{this.staff.fillNote(i)}catch{}try{this.staff.clearTarget()}catch{}const m=this.kb&&this.kb.svg?this.kb.svg.querySelector(`.key--white[data-id="${i}"]`):null;if(m){try{this.kb.glowKey(m)}catch{}try{this.audio.playNote(m.dataset.pitch)}catch{}}try{this.audio.correct()}catch{}const g=(fe.find(p=>p.id===i)||{}).color||"#ffc971";this.burst(r.left+r.width/2,r.top+r.height/2,g);try{Wt.burst({x:r.left+r.width/2,y:r.top+r.height/2,color:"#fff8ec",count:10,spread:70,startVelocity:18})}catch{}try{this.kb.markPlaced(i,g)}catch{}this._flashScreen();const u=fe.find(p=>p.id===i);if(u){this._floatScore(r.left+r.width/2,r.top,`${u.solfege} +1`);try{this.audio.playNote(u.pitch)}catch{}}F.to(e,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>F.to(e,{rotation:0,duration:.2,ease:"power2.out"})}),F.fromTo(e,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),this.addStar(),n?this._advanceHint("first_correct"):this._advanceHint("subsequent_correct"),this.placed.size===fe.length&&setTimeout(()=>this.handleWin(),600)}})}handleWrong(e,t){this.wrongCount++;try{this.audio.wrong()}catch{}this.staff&&(this.staff.clearHint(),this.staff.clearTarget()),e.classList.add("shake"),setTimeout(()=>e.classList.remove("shake"),400),F.to(e,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"});const i=e.dataset.id,n=fe.find(r=>r.id===i);t?(this._lastWrongHint=`${n?n.solfege:"这条鱼"} 的家在上面, 看看五线谱上的唱名哦~`,this._enterHint("wrong_drop_near")):(this._lastWrongHint="把鱼拖到上面五线谱的圆圈里~",this._enterHint("wrong_drop_far"))}_calcStars(){return this.wrongCount<=0?3:this.wrongCount<=2?2:this.wrongCount<=5?1:0}applyFinalStars(){return this._calcStars()}handleWin(){this.gate=!1,this._clearHintTimer();const e=this.applyFinalStars();try{this.progress.markLevelComplete(1,e)}catch{}try{this.kb.glowAll()}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}Wt.celebrate(),setTimeout(()=>this.showWinOverlay(e,1),1800)}addStar(){const e=document.querySelectorAll("#hud-dots .dot"),t=this.placed.size-1;t>=0&&t<e.length&&(e[t].classList.remove("on"),e[t].offsetWidth,e[t].classList.add("on"))}showWinOverlay(e,t=1){if(document.querySelectorAll(".overlay").forEach(p=>p.remove()),this.achievements)try{this.achievements.checkAndUnlock().forEach((y,f)=>{setTimeout(()=>{try{Ja.show(y)}catch{}},1500+f*800)})}catch{}const i=[0,1,2].map(p=>`<span class="win-star ${p<e?"on":""}">${p<e?"⭐":"☆"}</span>`).join(""),n=this.wrongCount,r=t===1,l=t===2,o=`🎉 第 ${t} 关完成!`,a=r?"你已经认识了 Do Re Mi Fa Sol La Si":l?"你的耳朵越来越灵啦! 听音找鱼全对~":"太棒了! 继续下一关，森林里的新挑战正在等你~",d=l?this._level2Total||5:r?fe.length:"✓",c=l?"答对题数":r?"正确放置":"关卡挑战",_=document.createElement("div");_.className="overlay",_.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">${o}</div>
        <div class="win-stars">${i}</div>
        <p class="overlay__text">${a}</p>

        <div class="win-stats">
          <div class="win-stat ${n===0?"good":n<=2?"ok":n<=5?"meh":"bad"}">
            <span class="win-stat__icon">${n===0?"✨":"✋"}</span>
            <span class="win-stat__label">${n===0?"零错误":"错误尝试"}</span>
            <span class="win-stat__value">${n===0?"0 次":n+" 次"}</span>
          </div>
          <div class="win-stat">
            <span class="win-stat__icon">🎵</span>
            <span class="win-stat__label">${c}</span>
            <span class="win-stat__value">${d} / ${d}</span>
          </div>
        </div>

        <div class="win-criteria">
          ${e===3?'<span class="on">⭐⭐⭐</span> 0 错 = 完美':e===2?'<span class="on">⭐⭐</span><span class="off">⭐</span> 1-2 错 = 优秀':e===1?'<span class="on">⭐</span><span class="off">⭐⭐</span> 3-5 错 = 良好':'<span class="off">⭐⭐⭐</span> 6+ 错 = 再练'}
        </div>

        <div class="overlay__btns">
          <button class="btn-secondary" id="replay-btn">↻ 再玩一次</button>
          <button class="btn-secondary" id="win-share-btn">📤 分享</button>
          <button class="btn-secondary" id="achievements-btn">🏆 成就</button>
          <button class="btn-primary" id="next-btn">下一关 ›</button>
        </div>
      </div>
    `,document.body.appendChild(_);const h=_.querySelector("#win-share-btn");h&&(h.onclick=async()=>{try{const{Share:p}=await et(async()=>{const{Share:f}=await import("./Share-Df6Q5PTu.js");return{Share:f}},[],import.meta.url),y=new p(this);_.style.display="none",y.showShareMenu({levelId:t,stars:e,wrongCount:this.wrongCount,totalQuestions:t===2?this._level2Total||5:7},()=>{_.style.display=""})}catch(p){console.warn("[share] 打开分享菜单失败:",p)}});const m=_.querySelector("#next-btn");if(t<16){const p=t+1;m.textContent=`第 ${p} 关 ›`,m.onclick=()=>{_.remove(),this.say(`第 ${p} 关马上来...`),this.start({levelId:p})}}else m.textContent="🎉 全部完成",m.onclick=()=>{_.remove(),this._showAllDoneOverlay()};_.querySelector("#replay-btn").onclick=()=>{_.remove(),this._skipStartOverlayOnce=!0,this.start({levelId:t})};const u=_.querySelector("#achievements-btn");u&&(u.onclick=async()=>{try{const{AchievementsWall:p}=await et(async()=>{const{AchievementsWall:f}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:f}},[],import.meta.url);_.remove(),new p(document.body,{achievementSystem:this.achievements,onClose:()=>{this.showWinOverlay(e,t)}}).show()}catch(p){console.warn("[achievements] 打开成就墙失败:",p)}})}_showAllDoneOverlay(){document.querySelectorAll(".overlay").forEach(t=>t.remove());const e=document.createElement("div");e.className="overlay",e.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">🌟 森林钢琴大师!</div>
        <div class="overlay__text">你完成了全部 16 关挑战!<br>从认识音符到节奏阶梯，真的太厉害啦~</div>
        <div class="overlay__btns">
          <button class="btn-secondary" id="map-btn">🗺️ 回关卡地图</button>
          <button class="btn-primary" id="replay-btn">↻ 再玩一次 (第 1 关)</button>
        </div>
      </div>
    `,document.body.appendChild(e),e.querySelector("#map-btn").onclick=()=>{e.remove(),this.goHome()},e.querySelector("#replay-btn").onclick=()=>{e.remove(),this._skipStartOverlayOnce=!0,this.start({levelId:1})}}_correctnessComment(e){return e===3?"全对! 你真是个钢琴小天才 ⭐":e===2?"不错! 错一点点, 离完美不远了~":e===1?"完成了! 多练几次就能满分啦~":"没关系, 再来一次一定行!"}restartLevel(){const e=window.__forestPiano?.currentLevelId||1;if(e>2){this._skipStartOverlayOnce=!0,this.start({levelId:e});return}document.querySelectorAll(".overlay").forEach(t=>t.remove()),this._showLevel2HUD(!1),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.kb&&this.kb.resetMarks(),this.staff&&this.staff.reset(),this.fishPool&&this.fishPool.reset(),document.querySelectorAll("#hud-dots .dot").forEach(t=>{t.classList.remove("on")}),this._beginLevel()}burst(e,t,i){Wt.burst({x:e,y:t,color:i})}_flashScreen(){const e=document.createElement("div");e.className="screen-flash",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.remove(),300)},50)}_floatScore(e,t,i){const n=document.createElement("div");n.className="score-float",n.textContent=i,n.style.left=`${e}px`,n.style.top=`${t}px`,document.body.appendChild(n),setTimeout(()=>n.remove(),1400)}say(e){this.bubble&&(this.bubble.textContent=e)}}const Q={MASTER_GAIN_NORMAL:.75,MASTER_GAIN_MUTED:0,TEST_BEEP_PEAK:.6,PLAYNOTE_ATTACK:.65,PLAYNOTE_DECAY:.35,PLAYNOTE_RELEASE:.8,PLAYNOTE_HARMONIC_2:.15,PLAYNOTE_HARMONIC_3:.05,PLAYNOTE_HARMONIC_4:.03,PLAYNOTE_HARMONIC_5:.015,HOVER_PEAK:.35,CORRECT_PEAK:.55,WRONG_PEAK:.45,ARPEGGIO_DEFAULT_PEAK:.5,REVERB_BUS_GAIN:.18,REVERB_WET:1,REVERB_FEEDBACK:.4,REVERB_DELAY:.25,REVERB_SEND:.2,HAMMER_NOISE_PEAK:.15,HAMMER_NOISE_DURATION:.05,ADSR_ATTACK:.01,ADSR_DECAY:.15,ADSR_RELEASE:.85};class Ns{constructor(){this.unlocked=!1,this.muted=!1,this._webAudio=null,this._masterGain=null,this._bus=null,this._realPianoLoaded=!1,this._reverbBus=null,this._reverbDelay=null,this._activeOscillators=new Set,this._activeSources=new Set}_trackOsc(e,t){if(!e)return;this._activeOscillators.add(e);const i=()=>{try{this._activeOscillators.delete(e)}catch{}};e.onended=i}_trackSource(e){e&&(this._activeSources.add(e),e.onended=()=>{try{this._activeSources.delete(e)}catch{}})}stop(){if(!this._webAudio)return;const t=this._webAudio.currentTime;this._activeOscillators.forEach(i=>{try{i.disconnect()}catch{}try{i.stop(t)}catch{}}),this._activeOscillators.clear(),this._activeSources.forEach(i=>{try{i.stop(t)}catch{}try{i.disconnect()}catch{}}),this._activeSources.clear()}async unlockOnGesture(){if(!this.unlocked){console.log("[Audio] unlockOnGesture entered");try{const e=window.AudioContext||window.webkitAudioContext;if(!e){console.warn("[Audio] Web Audio API not supported");return}this._webAudio||(this._webAudio=new e,this._masterGain=this._webAudio.createGain(),this._masterGain.gain.value=Q.MASTER_GAIN_NORMAL,this._masterGain.connect(this._webAudio.destination),this._setupReverb())}catch(e){console.warn("[Audio] 创建 AudioContext 失败:",e);return}if(this._webAudio.state==="suspended")try{this._webAudio.resume(),console.log("[Audio] resume() fired, state will become running")}catch(e){console.warn("[Audio] resume() failed:",e)}try{const e=this._webAudio.createOscillator(),t=this._webAudio.createGain();t.gain.value=0,e.connect(t).connect(this._masterGain),e.start(),e.stop(this._webAudio.currentTime+.01),console.log("[Audio] silent osc started (unlocker)")}catch(e){console.warn("[Audio] silent osc failed:",e)}try{const e=this._webAudio.currentTime+.05,t=this._webAudio.createOscillator(),i=this._webAudio.createGain();t.type="sine",t.frequency.setValueAtTime(523.25,e),i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(Q.TEST_BEEP_PEAK,e+.01),i.gain.exponentialRampToValueAtTime(1e-4,e+.4),t.connect(i).connect(this._masterGain),t.start(e),t.stop(e+.45),console.log("[Audio] test tone scheduled at currentTime+0.05")}catch(e){console.warn("[Audio] test tone schedule failed:",e)}try{const e=new Ns;e.src="data:audio/mp3;base64,//uQx",e.play().catch(()=>{})}catch{}this.unlocked=!0,this._loadPianoInBackground(),console.log("[Audio] unlocked! state=",this._webAudio.state)}}_resumeWebAudio(){this._webAudio&&this._webAudio.state==="suspended"&&this._webAudio.resume().catch(()=>{})}playNote(e){if(!(!this.unlocked||this.muted)&&(this._playNoteWebAudio(e),this._realPianoLoaded&&this._realPiano&&this._realPiano.triggerAttackRelease))try{this._realPiano.triggerAttackRelease(e,"8n")}catch{}}_setupReverb(){if(!this._webAudio||this._reverbBus)return;const e=this._webAudio;this._reverbBus=e.createGain(),this._reverbBus.gain.value=Q.REVERB_BUS_GAIN,this._reverbDelay=e.createDelay(1),this._reverbDelay.delayTime.value=Q.REVERB_DELAY;const t=e.createGain();t.gain.value=Q.REVERB_FEEDBACK;const i=e.createGain();i.gain.value=Q.REVERB_WET,this._reverbBus.connect(this._reverbDelay),this._reverbDelay.connect(t),t.connect(this._reverbDelay),t.connect(i),i.connect(this._masterGain)}_playNoteWebAudio(e){if(!this._webAudio)return;this._resumeWebAudio();const t=this._webAudio,i=t.currentTime,r={C4:261.63,"C#4":277.18,D4:293.66,"D#4":311.13,E4:329.63,F4:349.23,"F#4":369.99,G4:392,"G#4":415.3,A4:440,"A#4":466.16,B4:493.88}[e];if(!r)return;const l=Math.floor(t.sampleRate*Q.HAMMER_NOISE_DURATION),o=t.createBuffer(1,l,t.sampleRate),a=o.getChannelData(0);for(let L=0;L<l;L++)a[L]=(Math.random()*2-1)*(1-L/l);const d=t.createBufferSource();d.buffer=o;const c=t.createBiquadFilter();c.type="highpass",c.frequency.value=1500;const _=t.createGain();_.gain.value=Q.HAMMER_NOISE_PEAK,d.connect(c),c.connect(_),_.connect(this._masterGain),d.start(i),d.stop(i+Q.HAMMER_NOISE_DURATION),this._trackSource(d);const h=t.createOscillator();h.type="triangle",h.frequency.setValueAtTime(r,i);const m=t.createOscillator();m.type="sine",m.frequency.setValueAtTime(r*2,i);const g=t.createOscillator();g.type="sine",g.frequency.setValueAtTime(r*3,i);const u=t.createOscillator();u.type="sine",u.frequency.setValueAtTime(r*4,i);const p=t.createOscillator();p.type="sine",p.frequency.setValueAtTime(r*5,i);const y=t.createGain();y.gain.setValueAtTime(1e-4,i),y.gain.exponentialRampToValueAtTime(Q.PLAYNOTE_ATTACK,i+Q.ADSR_ATTACK),y.gain.exponentialRampToValueAtTime(Q.PLAYNOTE_DECAY,i+Q.ADSR_DECAY),y.gain.exponentialRampToValueAtTime(1e-4,i+Q.PLAYNOTE_RELEASE);const f=t.createGain();f.gain.value=Q.PLAYNOTE_HARMONIC_2;const v=t.createGain();v.gain.value=Q.PLAYNOTE_HARMONIC_3;const x=t.createGain();x.gain.value=Q.PLAYNOTE_HARMONIC_4;const b=t.createGain();b.gain.value=Q.PLAYNOTE_HARMONIC_5,h.connect(y),m.connect(f),f.connect(y),g.connect(v),v.connect(y),u.connect(x),x.connect(y),p.connect(b),b.connect(y),y.connect(this._masterGain);const k=t.createGain();k.gain.value=Q.REVERB_SEND,y.connect(k),k.connect(this._reverbBus);const w=i+Q.ADSR_RELEASE;h.start(i),h.stop(w),m.start(i),m.stop(w),g.start(i),g.stop(w),u.start(i),u.stop(w),p.start(i),p.stop(w),this._trackOsc(h,w),this._trackOsc(m,w),this._trackOsc(g,w),this._trackOsc(u,w),this._trackOsc(p,w)}hover(e){!this.unlocked||this.muted||this._sfxBubble()}correct(){!this.unlocked||this.muted||this._sfxArpeggio([523.25,659.25,783.99,1046.5],.18,.06,"sine",Q.CORRECT_PEAK)}wrong(){!this.unlocked||this.muted||this._sfxSlide(320,150,.35,"triangle",Q.WRONG_PEAK)}async playScale(e){!this.unlocked||this.muted||(e.forEach((t,i)=>{setTimeout(()=>this._playNoteWebAudio(t),i*220)}),setTimeout(()=>this._sfxArpeggio([1046.5,1567.98,2093],.12,.08,"sine",Q.ARPEGGIO_DEFAULT_PEAK),e.length*220+200))}toggleMute(){if(this.muted=!this.muted,this._masterGain&&(this._masterGain.gain.cancelScheduledValues(this._webAudio.currentTime),this._masterGain.gain.linearRampToValueAtTime(this.muted?Q.MASTER_GAIN_MUTED:Q.MASTER_GAIN_NORMAL,.05)),this.muted)try{this.stop()}catch{}return this.muted}async _loadPianoInBackground(){try{const e=await et(()=>import("./index-DWHXqSMG.js"),[],import.meta.url);await e.start(),this._bus=new e.Gain(.9).toDestination();const t=new e.Sampler({urls:{A1:"A1.mp3",A2:"A2.mp3",A3:"A3.mp3",A4:"A4.mp3",A5:"A5.mp3",A6:"A6.mp3",C1:"C1.mp3",C2:"C2.mp3",C3:"C3.mp3",C4:"C4.mp3",C5:"C5.mp3",C6:"C6.mp3"},baseUrl:"https://tonejs.github.io/audio/salamander/",release:1.4}).connect(this._bus),i=new Promise(r=>setTimeout(()=>r("timeout"),12e3));await Promise.race([e.loaded(),i])!=="timeout"?(this._realPiano=t,this._realPianoLoaded=!0,console.log("[Audio] Salamander 钢琴加载完成")):console.warn("[Audio] 钢琴采样加载超时, 保持 Web Audio 合成器")}catch(e){console.warn("[Audio] Salamander 加载失败:",e)}}_sfxBubble(){if(!this._webAudio)return;this._resumeWebAudio();const e=this._webAudio,t=e.currentTime,i=e.createOscillator();i.type="sine",i.frequency.setValueAtTime(420,t),i.frequency.exponentialRampToValueAtTime(180,t+.12);const n=e.createGain();n.gain.setValueAtTime(1e-4,t),n.gain.exponentialRampToValueAtTime(Q.HOVER_PEAK,t+.01),n.gain.exponentialRampToValueAtTime(1e-4,t+.14),i.connect(n).connect(this._masterGain),i.start(t),i.stop(t+.18),this._trackOsc(i,t+.18)}_sfxArpeggio(e,t=.18,i=.06,n="sine",r=Q.ARPEGGIO_DEFAULT_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime;e.forEach((a,d)=>{const c=o+d*(t*.5+i),_=l.createOscillator();_.type=n,_.frequency.setValueAtTime(a,c);const h=l.createGain();h.gain.setValueAtTime(1e-4,c),h.gain.exponentialRampToValueAtTime(r,c+.012),h.gain.exponentialRampToValueAtTime(1e-4,c+t),_.connect(h).connect(this._masterGain),_.start(c),_.stop(c+t+.05),this._trackOsc(_,c+t+.05)})}_sfxSlide(e=320,t=150,i=.35,n="triangle",r=Q.WRONG_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime,a=l.createOscillator();a.type=n,a.frequency.setValueAtTime(e,o),a.frequency.exponentialRampToValueAtTime(t,o+i);const d=l.createGain();d.gain.setValueAtTime(1e-4,o),d.gain.exponentialRampToValueAtTime(r,o+.015),d.gain.exponentialRampToValueAtTime(1e-4,o+i),a.connect(d).connect(this._masterGain),a.start(o),a.stop(o+i+.05),this._trackOsc(a,o+i+.05)}}class ac{constructor(e){this.audio=e,this.playing=!1,this.notes=[],this._stopFn=null}start(){if(!this.playing){if(!this.audio||!this.audio._webAudio){console.warn("[BGM] Audio not ready, deferring"),setTimeout(()=>this.start(),500);return}this.playing=!0,this._playLoop()}}stop(){this.playing=!1,this._stopFn&&(clearTimeout(this._stopFn),this._stopFn=null),this.notes.forEach(e=>{try{e.stop()}catch{}}),this.notes=[]}toggle(){return this.playing?this.stop():this.start(),this.playing}_playLoop(){if(!this.playing)return;const e=this.audio._webAudio;if(!e)return;const t=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],i=e.currentTime,n=e.createGain();n.gain.value=0,n.gain.linearRampToValueAtTime(.1,i+2),n.connect(this.audio._masterGain);const r=4,l=t.length*r;t.forEach((o,a)=>{o.forEach(d=>{const c=e.createOscillator(),_=e.createGain();c.type=a%2===0?"sine":"triangle",c.frequency.setValueAtTime(d,i+a*r),c.connect(_).connect(n),_.gain.setValueAtTime(0,i+a*r),_.gain.linearRampToValueAtTime(.5,i+a*r+.5),_.gain.linearRampToValueAtTime(0,i+(a+1)*r),c.start(i+a*r),c.stop(i+(a+1)*r),this.notes.push(c)})}),this._stopFn=setTimeout(()=>{this.notes=[],this._playLoop()},l*1e3)}}const Dn="forest-piano-progress",cc=["do","re","mi","fa","sol","la","si"];function dc(){const s=new Date,e=s.getFullYear(),t=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${e}-${t}-${i}`}function bs(){return{level:1,stars:{},completedLevels:[],unlockedNotes:[],firstPass:null}}function uc(s){return!s||typeof s!="object"?bs():{level:Number.isFinite(s.level)?s.level:1,stars:s.stars&&typeof s.stars=="object"&&!Array.isArray(s.stars)?s.stars:{},completedLevels:Array.isArray(s.completedLevels)?s.completedLevels.filter(e=>e!=null):[],unlockedNotes:Array.isArray(s.unlockedNotes)?s.unlockedNotes.filter(e=>typeof e=="string"):[],firstPass:typeof s.firstPass=="string"?s.firstPass:null}}class Ir{constructor(){this.state=this._load()}_load(){try{if(typeof localStorage>"u")return bs();const e=localStorage.getItem(Dn);if(!e)return bs();const t=JSON.parse(e);return uc(t)}catch{return bs()}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Dn,JSON.stringify(this.state))}catch{}}hasCompletedLevel(e){return this.state.completedLevels.includes(String(e))}markLevelComplete(e,t){const i=String(e),n=Math.max(0,Number(t)||0);this.state.completedLevels.includes(i)||(this.state.completedLevels=[...this.state.completedLevels,i]);const r=Number(this.state.stars[i]||0);n>r&&(this.state.stars={...this.state.stars,[i]:n}),this.state.firstPass||(this.state.firstPass=dc());const l=new Set(this.state.unlockedNotes);cc.forEach(a=>l.add(a)),this.state.unlockedNotes=Array.from(l);const o=Number(i);Number.isFinite(o)&&o>=this.state.level&&(this.state.level=o+1),this._save()}getStars(e){const t=String(e);return Number(this.state.stars[t]||0)}getTotalStars(){return Object.values(this.state.stars).reduce((e,t)=>e+(Number(t)||0),0)}getCompletedLevels(){return[...this.state.completedLevels]}isLevelUnlocked(e){return!0}getUnlockedNotes(){return[...this.state.unlockedNotes]}getSnapshot(){return JSON.parse(JSON.stringify(this.state))}}class hc{constructor(e,{onReset:t,onClose:i,version:n}){this.stage=e,this.onReset=t,this.onClose=i,this.version=n,this.element=null}show(){const e=document.createElement("div");e.className="settings-panel",e.innerHTML=`
      <div class="settings-panel__card">
        <div class="settings-panel__header">
          <div class="settings-panel__title">⚙ 设置</div>
          <button class="btn-primary" id="settings-close">关闭</button>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">🎮 游戏进度</div>
          <p class="settings-panel__desc">重置后所有关卡解锁但需要重新打</p>
          <button class="btn-secondary" id="settings-reset" style="background: var(--soft-error); color: white; border: none;">
            🗑 重置所有进度
          </button>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">⚙️ 玩法偏好</div>
          <label class="settings-toggle-row">
            <span>动画效果</span>
            <input type="checkbox" id="settings-animations" />
          </label>
          <label class="settings-toggle-row">
            <span>BGM 背景音乐</span>
            <input type="checkbox" id="settings-bgm" />
          </label>
          <label class="settings-toggle-row">
            <span>大字体</span>
            <input type="checkbox" id="settings-large-text" />
          </label>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">📖 教程</div>
          <button class="btn-primary" id="settings-tutorial">📖 重看教程</button>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">📖 关于</div>
          <div class="settings-panel__about">
            <p><strong>森林钢琴学校</strong></p>
            <p>给 5-10 岁孩子的钢琴启蒙游戏</p>
            <p>${this.version} · Web Audio API · GSAP</p>
            <p class="settings-panel__credits">
              概念: Kodály (柯尔文) 首调唱名 + Solfege<br>
              美学: 莫兰迪森林 + 河流 + 暖色调<br>
              技术: 纯前端 + GitHub Pages
            </p>
          </div>
        </div>

        <div class="settings-panel__section">
          <div class="settings-panel__section-title">📚 关卡一览</div>
          <ul class="settings-panel__levels">
            <li>1. 🐟 小鱼跳进五线谱</li>
            <li>2. 🎵 听!是谁在唱</li>
            <li>3. 🏔️ Mi-Sol 山谷</li>
            <li>4. 🥁 节奏小河</li>
            <li>5. ⭐ 小星星视奏</li>
            <li>6. 🎹 双手协调</li>
            <li>7. 🌳 树屋 7 音阶</li>
            <li>8. 🎭 森林音乐会</li>
            <li>9. 🖤 黑键世界 (BONUS)</li>
          </ul>
        </div>
      </div>
    `,this.stage.appendChild(e),this.element=e,e.querySelector("#settings-close").addEventListener("click",()=>this.hide()),e.querySelector("#settings-reset").addEventListener("click",()=>{if(confirm("确定要重置所有进度吗? 这不可恢复!"))try{localStorage.removeItem("forest-piano-progress"),localStorage.removeItem("forest-piano-achievements"),this.onReset&&this.onReset(),alert("进度已重置! 刷新页面开始新游戏")}catch(r){alert("重置失败: "+r.message)}});const t=e.querySelector("#settings-animations");t.checked=this._loadAnimationsPref(),t.addEventListener("change",()=>{this._saveAnimationsPref(t.checked),document.body.classList.toggle("no-animations",!t.checked)});const i=e.querySelector("#settings-bgm");i.checked=this._loadBgmPref(),i.addEventListener("change",()=>{this._saveBgmPref(i.checked),window.dispatchEvent(new CustomEvent("toggle-bgm"))});const n=e.querySelector("#settings-large-text");n.checked=this._loadLargeTextPref(),n.addEventListener("change",()=>{this._saveLargeTextPref(n.checked),document.body.classList.toggle("large-text",n.checked)}),e.querySelector("#settings-tutorial").addEventListener("click",()=>{this.hide(),et(async()=>{const{Tutorial:r}=await Promise.resolve().then(()=>fc);return{Tutorial:r}},void 0,import.meta.url).then(({Tutorial:r})=>{new r(document.body,{onDone:()=>{}}).show()})})}_loadAnimationsPref(){try{return localStorage.getItem("forest-piano-animations")!=="false"}catch{return!0}}_saveAnimationsPref(e){try{localStorage.setItem("forest-piano-animations",String(e))}catch{}}_loadBgmPref(){try{return localStorage.getItem("forest-piano-bgm")!=="false"}catch{return!0}}_saveBgmPref(e){try{localStorage.setItem("forest-piano-bgm",String(e))}catch{}}_loadLargeTextPref(){try{return localStorage.getItem("forest-piano-large-text")==="true"}catch{return!1}}_saveLargeTextPref(e){try{localStorage.setItem("forest-piano-large-text",String(e))}catch{}}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onClose&&this.onClose()}}const ps=[{emoji:"🐟🎵",title:"欢迎来到森林钢琴学校",body:"这里的 7 条小鱼 Do Re Mi Fa Sol La Si 住在钢琴里。你来帮它们找到在五线谱和钢琴上的位置吧!",bg:"linear-gradient(135deg, #5fa8b5, #a8dadc)"},{emoji:"👆",title:"手指不离开屏幕",body:"按住一条鱼 (不要松开!) 拖到屏幕上方五线谱对应的位置。松手就放下。如果放错会摇头回弹。",bg:"linear-gradient(135deg, #f4a261, #ffc971)"},{emoji:"⭐",title:"错误少就拿满星",body:"0 错 = 3⭐ / 1-2 错 = 2⭐ / 3-5 错 = 1⭐ / 6+ 错 = 0⭐。每关都能挑战完美!",bg:"linear-gradient(135deg, #ffd166, #f4a261)"},{emoji:"🗺️",title:"16 个关卡等你探索",body:"通关后看左上角关卡徽章, 点一下就能回到地图选别的关卡. 也可以点 🎹 自由演奏 或 🎵 歌曲库随便弹~ 看看你能集齐多少 🏆 成就!",bg:"linear-gradient(135deg, #9b5de5, #6a4c93)"}];class gi{constructor(e,{onDone:t,isFirstTime:i=!1}={}){this.stage=e,this.onDone=t,this.isFirstTime=i,this.element=null,this.currentPage=0}show(){this.element=document.createElement("div"),this.element.className="tutorial",this._render(),this.stage.appendChild(this.element),this.isFirstTime?F.fromTo(this.element.querySelector(".tutorial__card"),{y:40,opacity:0},{y:0,opacity:1,duration:.6,ease:"back.out(1.7)"}):F.fromTo(this.element.querySelector(".tutorial__card"),{scale:.85,opacity:0},{scale:1,opacity:1,duration:.35,ease:"back.out(1.4)"})}_render(){const e=ps[this.currentPage],t=ps.length,i=this.currentPage===t-1,n=this.currentPage===0;this.element.innerHTML=`
      <div class="tutorial__card" style="background: ${e.bg}">
        <div class="tutorial__emoji">${e.emoji}</div>
        <div class="tutorial__title">${e.title}</div>
        <div class="tutorial__body">${e.body}</div>

        <div class="tutorial__dots">
          ${ps.map((d,c)=>`
            <span class="tutorial__dot ${c===this.currentPage?"on":""}"></span>
          `).join("")}
        </div>

        <div class="tutorial__nav">
          ${n?"<div></div>":'<button class="btn-secondary" id="tut-back">‹ 上一步</button>'}
          ${i?'<button class="btn-primary" id="tut-done">🎵 开始游戏 ›</button>':'<button class="btn-primary" id="tut-next">下一步 ›</button>'}
        </div>

        ${this.isFirstTime?"":'<button class="tutorial__skip" id="tut-skip">跳过</button>'}
      </div>
    `;const r=this.element.querySelector("#tut-back"),l=this.element.querySelector("#tut-next"),o=this.element.querySelector("#tut-done"),a=this.element.querySelector("#tut-skip");r&&r.addEventListener("click",()=>this._prev()),l&&l.addEventListener("click",()=>this._next()),o&&o.addEventListener("click",()=>this._done()),a&&a.addEventListener("click",()=>this._done())}_prev(){this.currentPage>0&&(this.currentPage--,this._render())}_next(){this.currentPage<ps.length-1&&(this.currentPage++,this._render())}_done(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onDone&&this.onDone()}hide(){this._done()}}const fc=Object.freeze(Object.defineProperty({__proto__:null,Tutorial:gi},Symbol.toStringTag,{value:"Module"})),si=[{id:"cream",name:"奶油橙",icon:"🍑",bg:"cream"},{id:"night",name:"夜色",icon:"🌙",bg:"night"},{id:"forest",name:"森林绿",icon:"🌲",bg:"forest"}],pc={cream:"🍑",night:"🌙",forest:"🌲"},On="forest-piano-theme",ii={cream:{"--bg-cream":"#fff8ec","--bg-paper":"#faf3e0","--staff-strong":"#3d405b","--warm-cta":"#ffb347","--text-main":"#3d405b","--text-sub":"#6b7280"},night:{"--bg-cream":"#1a1430","--bg-paper":"#251a3f","--staff-strong":"#fdf6e3","--warm-cta":"#ff8fb1","--text-main":"#fdf6e3","--text-sub":"#b8a5d0"},forest:{"--bg-cream":"#1a3a2a","--bg-paper":"#244a3a","--staff-strong":"#fdf6e3","--warm-cta":"#84cc16","--text-main":"#fdf6e3","--text-sub":"#a3c9a8"}};class _c{constructor(e){this.stage=e,this.current=this._load(),this._apply(),this.button=null}_load(){try{return localStorage.getItem(On)||"cream"}catch{return"cream"}}_save(e){try{localStorage.setItem(On,e)}catch{}}_apply(){const e=ii[this.current]||ii.cream;for(const[t,i]of Object.entries(e))document.documentElement.style.setProperty(t,i);document.body.dataset.theme=this.current}cycle(){const e=si.findIndex(i=>i.id===this.current),t=si[(e+1)%si.length];return this.current=t.id,this._save(this.current),this._apply(),t}set(e){ii[e]&&(this.current=e,this._save(e),this._apply())}}class vc{constructor(e){this.game=e,this.enabled=!0,this._handler=t=>this._onKeyDown(t)}enable(){this.enabled||(this.enabled=!0,document.addEventListener("keydown",this._handler))}disable(){this.enabled&&(this.enabled=!1,document.removeEventListener("keydown",this._handler))}_onKeyDown(e){if(!(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))){if(e.key==="Escape"||e.key==="Esc"){const t=document.querySelectorAll(".overlay, .achievements-wall, .settings-panel, .tutorial");if(t.length>0){const i=t[t.length-1];i.classList.contains("achievements-wall")?i.querySelector("#close-achievements")?.click():i.remove(),e.preventDefault()}else if(this.game&&typeof this.game.goHome=="function"){this.game.goHome(),e.preventDefault();return}else if(this.game&&typeof this.game._showStartOverlay=="function"){this.game._showStartOverlay(),e.preventDefault();return}}if(e.key==="Enter"){const i=document.querySelector(".overlay__card")?.querySelector("#start-btn");if(i){i.click(),e.preventDefault();return}}if(e.key==="m"||e.key==="M"){const t=document.getElementById("btn-sound");t&&t.click(),e.preventDefault()}if(/^[1-9]$/.test(e.key)){const t=parseInt(e.key,10);try{this.game._skipStartOverlayOnce=!0,this.game.audio?.unlockOnGesture?.().catch(()=>{}),this.game.start({levelId:t}),e.preventDefault()}catch{}}if(e.key===" "){const t=document.querySelector(".level4-drum-anchor, .level12-cut-btn");t&&(t.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0})),e.preventDefault())}}}}const Nn="forest-piano-streak";function yc(){const s=new Date;return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`}class mc{constructor(){this.state=this._load()}_load(){try{const e=localStorage.getItem(Nn);if(e)return JSON.parse(e)}catch{}return{lastDate:null,streakCount:0,longestStreak:0}}_save(){try{localStorage.setItem(Nn,JSON.stringify(this.state))}catch{}}checkIn(){const e=yc();if(this.state.lastDate===e)return{streak:this.state.streakCount,isNew:!1};const t=(()=>{const i=new Date;return i.setDate(i.getDate()-1),`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`})();return this.state.lastDate===t?this.state.streakCount+=1:this.state.lastDate!==null?this.state.streakCount=1:this.state.streakCount=1,this.state.streakCount>this.state.longestStreak&&(this.state.longestStreak=this.state.streakCount),this.state.lastDate=e,this._save(),{streak:this.state.streakCount,isNew:!0}}get(){return{streak:this.state.streakCount,longest:this.state.longestStreak}}}const Rn=new _c,In="forest-piano-tutorial-shown",bi="v20.1";window.__forestPiano=window.__forestPiano||{};Object.assign(window.__forestPiano,{Game:Rr,Audio:Ns,Progress:Ir,version:bi});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Bn):Bn();function Bn(){const s=document.getElementById("stage"),e=document.getElementById("bubble-text"),t=document.getElementById("version-tag");t&&(t.textContent=bi),gc();const i=new Rr({stageEl:s,bubbleEl:e,progress:new Ir,audio:new Ns}),n=new ac(i.audio);i.start({levelId:1});const r=new mc,l=r.checkIn();l.isNew&&l.streak>=3&&setTimeout(()=>{const y=document.createElement("div");y.className="streak-toast",y.innerHTML=`
        <div class="streak-toast__icon">🔥</div>
        <div class="streak-toast__body">
          <div class="streak-toast__title">连续 ${l.streak} 天!</div>
          <div class="streak-toast__hint">坚持就是胜利</div>
        </div>
      `,document.body.appendChild(y),setTimeout(()=>y.classList.add("show"),50),setTimeout(()=>{y.classList.remove("show"),setTimeout(()=>y.remove(),500)},5500)},3e3);const o=document.createElement("span");o.className="level-badge",o.id="level-badge",o.title="回关卡地图",o.setAttribute("role","button"),o.setAttribute("aria-label","回关卡地图"),o.textContent="🗺️ 回地图 · 第 1 关";const a=document.querySelector(".hud__left");a&&a.insertBefore(o,a.firstChild),o.addEventListener("click",()=>{i.goHome()});const d=document.createElement("div");d.className="streak-badge",d.textContent=`🔥 ${l.streak}`,d.title=`连续 ${l.streak} 天, 最长 ${r.get().longest}`,document.querySelector(".hud__left")?.appendChild(d);const c=document.getElementById("btn-sound"),_=document.getElementById("btn-replay"),h=document.getElementById("btn-bgm"),m=document.getElementById("btn-home");c&&c.addEventListener("click",()=>{const y=i.audio.toggleMute();c.textContent=y?"🔇":"🔊"}),_&&_.addEventListener("click",()=>{try{i.restartLevel()}catch(y){console.warn("restart 失败:",y)}}),h&&h.addEventListener("click",()=>{const y=n.toggle();h.textContent=y?"🎶":"🔇",h.style.background=y?"rgba(255, 235, 168, 0.4)":""}),m&&m.addEventListener("click",()=>{i.goHome()});const g=document.createElement("button");g.className="hud__btn",g.id="btn-settings",g.setAttribute("aria-label","设置"),g.setAttribute("title","设置"),g.textContent="⚙",document.querySelector(".hud__right")?.appendChild(g),g.addEventListener("click",()=>{new hc(document.body,{version:bi,onReset:()=>location.reload(),onClose:()=>{}}).show()});const u=document.querySelector(".hud__right");if(u&&!document.getElementById("btn-achievements")){const y=document.createElement("button");y.className="hud__btn",y.id="btn-achievements",y.setAttribute("aria-label","成就墙"),y.title="成就墙",y.textContent="🏆",u.insertBefore(y,u.firstChild),y.addEventListener("click",()=>{et(async()=>{const{AchievementsWall:f}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:f}},[],import.meta.url).then(({AchievementsWall:f})=>{new f(document.body,{achievementSystem:i.achievements,onClose:()=>{}}).show()}).catch(f=>console.warn("[achievements] 加载失败:",f))})}if(u&&!document.getElementById("btn-leaderboard")){const y=document.createElement("button");y.className="hud__btn",y.id="btn-leaderboard",y.setAttribute("aria-label","排行榜"),y.setAttribute("title","我的成就"),y.textContent="📊",u.appendChild(y),y.addEventListener("click",()=>{et(async()=>{const{Leaderboard:f}=await import("./Leaderboard-D8B94zyK.js");return{Leaderboard:f}},[],import.meta.url).then(({Leaderboard:f})=>{new f(document.body,i.progress,i.achievements).show()}).catch(f=>console.warn("[leaderboard] 加载失败:",f))})}if(u&&!document.getElementById("btn-practice")){const y=document.createElement("button");y.className="hud__btn",y.id="btn-practice",y.setAttribute("aria-label","自由演奏"),y.title="自由演奏",y.textContent="🎹",u.appendChild(y),y.addEventListener("click",()=>{et(async()=>{const{PracticeRoom:f}=await import("./PracticeRoom-Bkp2SrAY.js");return{PracticeRoom:f}},[],import.meta.url).then(({PracticeRoom:f})=>{new f(document.body,i).show()}).catch(f=>console.warn("[practice] 加载失败:",f))})}if(u&&!document.getElementById("btn-songs")){const y=document.createElement("button");y.className="hud__btn",y.id="btn-songs",y.setAttribute("aria-label","歌曲库"),y.title="歌曲库",y.textContent="🎵",u.appendChild(y),y.addEventListener("click",()=>{et(async()=>{const{SongLibrary:f}=await import("./SongLibrary-CkczJ4hG.js");return{SongLibrary:f}},[],import.meta.url).then(({SongLibrary:f})=>{new f(document.body,i).show()}).catch(f=>console.warn("[songs] 加载失败:",f))})}if(!document.getElementById("btn-help")){const y=document.createElement("button");y.className="hud__btn",y.id="btn-help",y.setAttribute("aria-label","帮助"),y.setAttribute("title","教程"),y.textContent="📖",document.querySelector(".hud__right")?.appendChild(y),y.addEventListener("click",()=>{new gi(document.body,{onDone:()=>{}}).show()})}if(!document.getElementById("btn-theme")){const y=document.createElement("button");y.className="hud__btn",y.id="btn-theme",y.setAttribute("aria-label","主题"),y.title="主题",y.textContent=pc[Rn.current]||"🎨",document.querySelector(".hud__right")?.appendChild(y),y.addEventListener("click",()=>{const f=Rn.cycle();y.textContent=f.icon;const v=document.createElement("div");v.className="theme-flash",v.textContent=`${f.icon} ${f.name}`,document.body.appendChild(v),setTimeout(()=>v.remove(),2e3)})}localStorage.getItem(In)||setTimeout(()=>{new gi(document.body,{isFirstTime:!0,onDone:()=>localStorage.setItem(In,"1")}).show()},1200),window.addEventListener("error",y=>{console.error("[forest-piano] error:",y.error)}),setTimeout(()=>{const y=document.getElementById("splash");y&&y.parentNode&&y.parentNode.removeChild(y)},2200),new vc(i).enable(),document.addEventListener("keydown",y=>{if(y.key==="?"||y.shiftKey&&y.key==="/"){const f=document.createElement("div");f.className="keyboard-help",f.innerHTML=`
      <div class="keyboard-help__card">
        <h2>🎹 键盘快捷键</h2>
        <ul>
          <li><kbd>1-9</kbd> 启动对应关卡</li>
          <li><kbd>Space</kbd> 鼓/切按钮 (L4/L12)</li>
          <li><kbd>M</kbd> 静音切换</li>
          <li><kbd>Enter</kbd> 开始游戏</li>
          <li><kbd>Esc</kbd> 关闭弹窗</li>
          <li><kbd>?</kbd> 显示此帮助</li>
        </ul>
        <button class="btn-primary" id="kb-help-close">关闭 (任意键)</button>
      </div>
    `,document.body.appendChild(f);const v=()=>f.remove();f.querySelector("#kb-help-close").addEventListener("click",v),setTimeout(()=>{const x=()=>{v(),document.removeEventListener("keydown",x)};document.addEventListener("keydown",x)},100)}})}function gc(){document.addEventListener("gesturestart",i=>i.preventDefault(),{passive:!1}),document.addEventListener("gesturechange",i=>i.preventDefault(),{passive:!1}),document.addEventListener("gestureend",i=>i.preventDefault(),{passive:!1});let s=null,e=0;const t=i=>{try{return!i||!i.closest?i:i.closest('button, a, .fish, .key, .level-map-tile, [role="button"]')||i}catch{return i}};document.addEventListener("touchstart",i=>{const n=Date.now(),r=t(i.target);n-e<300&&r&&r===s&&i.preventDefault(),s=r,e=n},{passive:!1}),document.addEventListener("dblclick",i=>i.preventDefault(),{passive:!1}),document.addEventListener("touchmove",i=>{i.touches&&i.touches.length>1&&i.preventDefault()},{passive:!1})}export{gt as P,F as g};
