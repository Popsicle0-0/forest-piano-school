var Rr=Object.defineProperty;var Ir=(s,e,t)=>e in s?Rr(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var rs=(s,e,t)=>Ir(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Fr="modulepreload",Br=function(s,e){return new URL(s,e).href},Wi={},Dt=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){const l=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");n=Promise.allSettled(t.map(d=>{if(d=Br(d,i),d in Wi)return;Wi[d]=!0;const c=d.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(!!i)for(let v=l.length-1;v>=0;v--){const u=l[v];if(u.href===d&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${f}`))return;const p=document.createElement("link");if(p.rel=c?"stylesheet":Fr,c||(p.as="script"),p.crossOrigin="",p.href=d,a&&p.setAttribute("nonce",a),document.head.appendChild(p),c)return new Promise((v,u)=>{p.addEventListener("load",v),p.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return n.then(l=>{for(const o of l||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};function qr(s){return typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=1),s._startLevel1(),()=>{typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),document.querySelectorAll(".staff-slot.targeting, .staff-slot.filling").forEach(n=>{n.classList.remove("targeting","filling")})}}const Hr=Object.freeze(Object.defineProperty({__proto__:null,default:qr},Symbol.toStringTag,{value:"Module"})),ye="http://www.w3.org/2000/svg";class Gr{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level10-background";let t="";for(let i=0;i<40;i++){const n=Math.random()*100,r=Math.random()*60,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level10-twinkle" cx="${n}%" cy="${r}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}function Qe(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function On(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var $e={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ut={duration:.5,overwrite:!1,delay:0},xi,_e,ee,Re=1e8,K=1/Re,li=Math.PI*2,Wr=li/4,jr=0,Nn=Math.sqrt,zr=Math.cos,Vr=Math.sin,pe=function(e){return typeof e=="string"},oe=function(e){return typeof e=="function"},Ke=function(e){return typeof e=="number"},ki=function(e){return typeof e>"u"},Ye=function(e){return typeof e=="object"},we=function(e){return e!==!1},Ti=function(){return typeof window<"u"},ls=function(e){return oe(e)||pe(e)},Rn=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ge=Array.isArray,Yr=/random\([^)]+\)/g,Qr=/,\s*/g,ji=/(?:-?\.?\d|\.)+/gi,In=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ct=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Bs=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Fn=/[+-]=-?[.\d]+/,Ur=/[^,'"\[\]\s]+/gi,Kr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ne,je,oi,Si,De={},ks={},Bn,qn=function(e){return(ks=Ot(e,De))&&Se},Li=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Kt=function(e,t){return!t&&console.warn(e)},Hn=function(e,t){return e&&(De[e]=t)&&ks&&(ks[e]=t)||De},Zt=function(){return 0},Zr={suppressEvents:!0,isStart:!0,kill:!1},vs={suppressEvents:!0,kill:!1},Xr={suppressEvents:!0},Ci={},nt=[],ai={},Gn,Me={},qs={},zi=30,ms=[],Mi="",Ei=function(e){var t=e[0],i,n;if(Ye(t)||oe(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=ms.length;n--&&!ms[n].targetTest(t););i=ms[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new dr(e[n],i)))||e.splice(n,1);return e},yt=function(e){return e._gsap||Ei(Ie(e))[0]._gsap},Wn=function(e,t,i){return(i=e[t])&&oe(i)?e[t]():ki(i)&&e.getAttribute&&e.getAttribute(t)||i},xe=function(e,t){return(e=e.split(",")).forEach(t)||e},ae=function(e){return Math.round(e*1e5)/1e5||0},ie=function(e){return Math.round(e*1e7)/1e7||0},Et=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},Jr=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},Ts=function(){var e=nt.length,t=nt.slice(0),i,n;for(ai={},nt.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},Ai=function(e){return!!(e._initted||e._startAt||e.add)},jn=function(e,t,i,n){nt.length&&!_e&&Ts(),e.render(t,i,!!(_e&&t<0&&Ai(e))),nt.length&&!_e&&Ts()},zn=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Ur).length<2?t:pe(e)?e.trim():e},Vn=function(e){return e},Oe=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},el=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},Ot=function(e,t){for(var i in t)e[i]=t[i];return e},Vi=function s(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Ye(t[i])?s(e[i]||(e[i]={}),t[i]):t[i]);return e},Ss=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},Vt=function(e){var t=e.parent||ne,i=e.keyframes?el(ge(e.keyframes)):Oe;if(we(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},tl=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},Yn=function(e,t,i,n,r){var l=e[n],o;if(r)for(o=t[r];l&&l[r]>o;)l=l._prev;return l?(t._next=l._next,l._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=l,t.parent=t._dp=e,t},Ds=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=t._prev,l=t._next;r?r._next=l:e[i]===t&&(e[i]=l),l?l._prev=r:e[n]===t&&(e[n]=r),t._next=t._prev=t.parent=null},lt=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},vt=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},sl=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ci=function(e,t,i,n){return e._startAt&&(_e?e._startAt.revert(vs):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},il=function s(e){return!e||e._ts&&s(e.parent)},Yi=function(e){return e._repeat?Nt(e._tTime,e=e.duration()+e._rDelay)*e:0},Nt=function(e,t){var i=Math.floor(e=ie(e/t));return e&&i===e?i-1:i},Ls=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Os=function(e){return e._end=ie(e._start+(e._tDur/Math.abs(e._ts||e._rts||K)||0))},Ns=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=ie(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Os(e),i._dirty||vt(i,e)),e},Qn=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ls(e.rawTime(),t),(!t._dur||is(0,t.totalDuration(),i)-t._tTime>K)&&t.render(i,!0)),vt(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-K}},ze=function(e,t,i,n){return t.parent&&lt(t),t._start=ie((Ke(i)?i:i||e!==ne?Ne(e,i,t):e._time)+t._delay),t._end=ie(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Yn(e,t,"_first","_last",e._sort?"_start":0),di(t)||(e._recent=t),n||Qn(e,t),e._ts<0&&Ns(e,e._tTime),e},Un=function(e,t){return(De.ScrollTrigger||Li("scrollTrigger",t))&&De.ScrollTrigger.create(t,e)},Kn=function(e,t,i,n,r){if($i(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!_e&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Gn!==Ee.frame)return nt.push(e),e._lazy=[r,n],1},nl=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},di=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},rl=function(e,t,i,n){var r=e.ratio,l=t<0||!t&&(!e._start&&nl(e)&&!(!e._initted&&di(e))||(e._ts<0||e._dp._ts<0)&&!di(e))?0:1,o=e._rDelay,a=0,d,c,f;if(o&&e._repeat&&(a=is(0,e._tDur,t),c=Nt(a,o),e._yoyo&&c&1&&(l=1-l),c!==Nt(e._tTime,o)&&(r=1-l,e.vars.repeatRefresh&&e._initted&&e.invalidate())),l!==r||_e||n||e._zTime===K||!t&&e._zTime){if(!e._initted&&Kn(e,t,n,i,a))return;for(f=e._zTime,e._zTime=t||(i?K:0),i||(i=t&&!f),e.ratio=l,e._from&&(l=1-l),e._time=0,e._tTime=a,d=e._pt;d;)d.r(l,d.d),d=d._next;t<0&&ci(e,t,i,!0),e._onUpdate&&!i&&Ae(e,"onUpdate"),a&&e._repeat&&!i&&e.parent&&Ae(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===l&&(l&&lt(e,1),!i&&!_e&&(Ae(e,l?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},ll=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},Rt=function(e,t,i,n){var r=e._repeat,l=ie(t)||0,o=e._tTime/e._tDur;return o&&!n&&(e._time*=l/e._dur),e._dur=l,e._tDur=r?r<0?1e10:ie(l*(r+1)+e._rDelay*r):l,o>0&&!n&&Ns(e,e._tTime=e._tDur*o),e.parent&&Os(e),i||vt(e.parent,e),e},Qi=function(e){return e instanceof be?vt(e):Rt(e,e._dur)},ol={_start:0,endTime:Zt,totalDuration:Zt},Ne=function s(e,t,i){var n=e.labels,r=e._recent||ol,l=e.duration()>=Re?r.endTime(!1):e._dur,o,a,d;return pe(t)&&(isNaN(t)||t in n)?(a=t.charAt(0),d=t.substr(-1)==="%",o=t.indexOf("="),a==="<"||a===">"?(o>=0&&(t=t.replace(/=/,"")),(a==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(d?(o<0?r:i).totalDuration()/100:1)):o<0?(t in n||(n[t]=l),n[t]):(a=parseFloat(t.charAt(o-1)+t.substr(o+1)),d&&i&&(a=a/100*(ge(i)?i[0]:i).totalDuration()),o>1?s(e,t.substr(0,o-1),i)+a:l+a)):t==null?l:+t},Yt=function(e,t,i){var n=Ke(t[1]),r=(n?2:1)+(e<2?0:1),l=t[r],o,a;if(n&&(l.duration=t[1]),l.parent=i,e){for(o=l,a=i;a&&!("immediateRender"in o);)o=a.vars.defaults||{},a=we(a.vars.inherit)&&a.parent;l.immediateRender=we(o.immediateRender),e<2?l.runBackwards=1:l.startAt=t[r-1]}return new de(t[0],l,t[r+1])},ct=function(e,t){return e||e===0?t(e):t},is=function(e,t,i){return i<e?e:i>t?t:i},me=function(e,t){return!pe(e)||!(t=Kr.exec(e))?"":t[1]},al=function(e,t,i){return ct(i,function(n){return is(e,t,n)})},ui=[].slice,Zn=function(e,t){return e&&Ye(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Ye(e[0]))&&!e.nodeType&&e!==je},cl=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var r;return pe(n)&&!t||Zn(n,1)?(r=i).push.apply(r,Ie(n)):i.push(n)})||i},Ie=function(e,t,i){return ee&&!t&&ee.selector?ee.selector(e):pe(e)&&!i&&(oi||!It())?ui.call((t||Si).querySelectorAll(e),0):ge(e)?cl(e,i):Zn(e)?ui.call(e,0):e?[e]:[]},hi=function(e){return e=Ie(e)[0]||Kt("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ie(t,i.querySelectorAll?i:i===e?Kt("Invalid scope")||Si.createElement("div"):e)}},Xn=function(e){return e.sort(function(){return .5-Math.random()})},Jn=function(e){if(oe(e))return e;var t=Ye(e)?e:{each:e},i=mt(t.ease),n=t.from||0,r=parseFloat(t.base)||0,l={},o=n>0&&n<1,a=isNaN(n)||o,d=t.axis,c=n,f=n;return pe(n)?c=f={center:.5,edges:.5,end:1}[n]||0:!o&&a&&(c=n[0],f=n[1]),function(h,p,v){var u=(v||t).length,_=l[u],m,g,y,b,w,T,x,k,S;if(!_){if(S=t.grid==="auto"?0:(t.grid||[1,Re])[1],!S){for(x=-Re;x<(x=v[S++].getBoundingClientRect().left)&&S<u;);S<u&&S--}for(_=l[u]=[],m=a?Math.min(S,u)*c-.5:n%S,g=S===Re?0:a?u*f/S-.5:n/S|0,x=0,k=Re,T=0;T<u;T++)y=T%S-m,b=g-(T/S|0),_[T]=w=d?Math.abs(d==="y"?b:y):Nn(y*y+b*b),w>x&&(x=w),w<k&&(k=w);n==="random"&&Xn(_),_.max=x-k,_.min=k,_.v=u=(parseFloat(t.amount)||parseFloat(t.each)*(S>u?u-1:d?d==="y"?u/S:S:Math.max(S,u/S))||0)*(n==="edges"?-1:1),_.b=u<0?r-u:r,_.u=me(t.amount||t.each)||0,i=i&&u<0?xl(i):i}return u=(_[h]-_.min)/_.max||0,ie(_.b+(i?i(u):u)*_.v)+_.u}},fi=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=ie(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(Ke(i)?0:me(i))}},er=function(e,t){var i=ge(e),n,r;return!i&&Ye(e)&&(n=i=e.radius||Re,e.values?(e=Ie(e.values),(r=!Ke(e[0]))&&(n*=n)):e=fi(e.increment)),ct(t,i?oe(e)?function(l){return r=e(l),Math.abs(r-l)<=n?r:l}:function(l){for(var o=parseFloat(r?l.x:l),a=parseFloat(r?l.y:0),d=Re,c=0,f=e.length,h,p;f--;)r?(h=e[f].x-o,p=e[f].y-a,h=h*h+p*p):h=Math.abs(e[f]-o),h<d&&(d=h,c=f);return c=!n||d<=n?e[c]:l,r||c===l||Ke(l)?c:c+me(l)}:fi(e))},tr=function(e,t,i,n){return ct(ge(e)?!t:i===!0?!!(i=0):!n,function(){return ge(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},dl=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(r,l){return l(r)},n)}},ul=function(e,t){return function(i){return e(parseFloat(i))+(t||me(i))}},hl=function(e,t,i){return ir(e,t,0,1,i)},sr=function(e,t,i){return ct(i,function(n){return e[~~t(n)]})},fl=function s(e,t,i){var n=t-e;return ge(e)?sr(e,s(0,e.length),t):ct(i,function(r){return(n+(r-e)%n)%n+e})},pl=function s(e,t,i){var n=t-e,r=n*2;return ge(e)?sr(e,s(0,e.length-1),t):ct(i,function(l){return l=(r+(l-e)%r)%r||0,e+(l>n?r-l:l)})},Xt=function(e){return e.replace(Yr,function(t){var i=t.indexOf("[")+1,n=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(Qr);return tr(i?n:+n[0],i?0:+n[1],+n[2]||1e-5)})},ir=function(e,t,i,n,r){var l=t-e,o=n-i;return ct(r,function(a){return i+((a-e)/l*o||0)})},_l=function s(e,t,i,n){var r=isNaN(e+t)?0:function(p){return(1-p)*e+p*t};if(!r){var l=pe(e),o={},a,d,c,f,h;if(i===!0&&(n=1)&&(i=null),l)e={p:e},t={p:t};else if(ge(e)&&!ge(t)){for(c=[],f=e.length,h=f-2,d=1;d<f;d++)c.push(s(e[d-1],e[d]));f--,r=function(v){v*=f;var u=Math.min(h,~~v);return c[u](v-u)},i=t}else n||(e=Ot(ge(e)?[]:{},e));if(!c){for(a in t)Pi.call(o,e,a,"get",t[a]);r=function(v){return Ni(v,o)||(l?e.p:e)}}}return ct(i,r)},Ui=function(e,t,i){var n=e.labels,r=Re,l,o,a;for(l in n)o=n[l]-t,o<0==!!i&&o&&r>(o=Math.abs(o))&&(a=l,r=o);return a},Ae=function(e,t,i){var n=e.vars,r=n[t],l=ee,o=e._ctx,a,d,c;if(r)return a=n[t+"Params"],d=n.callbackScope||e,i&&nt.length&&Ts(),o&&(ee=o),c=a?r.apply(d,a):r.call(d),ee=l,c},Wt=function(e){return lt(e),e.scrollTrigger&&e.scrollTrigger.kill(!!_e),e.progress()<1&&Ae(e,"onInterrupt"),e},Mt,nr=[],rr=function(e){if(e)if(e=!e.name&&e.default||e,Ti()||e.headless){var t=e.name,i=oe(e),n=t&&!i&&e.init?function(){this._props=[]}:e,r={init:Zt,render:Ni,add:Pi,kill:$l,modifier:Pl,rawVars:0},l={targetTest:0,get:0,getSetter:Oi,aliases:{},register:0};if(It(),e!==n){if(Me[t])return;Oe(n,Oe(Ss(e,r),l)),Ot(n.prototype,Ot(r,Ss(e,l))),Me[n.prop=t]=n,e.targetTest&&(ms.push(n),Ci[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Hn(t,n),e.register&&e.register(Se,n,ke)}else nr.push(e)},U=255,jt={aqua:[0,U,U],lime:[0,U,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,U],navy:[0,0,128],white:[U,U,U],olive:[128,128,0],yellow:[U,U,0],orange:[U,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[U,0,0],pink:[U,192,203],cyan:[0,U,U],transparent:[U,U,U,0]},Hs=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*U+.5|0},lr=function(e,t,i){var n=e?Ke(e)?[e>>16,e>>8&U,e&U]:0:jt.black,r,l,o,a,d,c,f,h,p,v;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),jt[e])n=jt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),l=e.charAt(2),o=e.charAt(3),e="#"+r+r+l+l+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&U,n&U,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&U,e&U]}else if(e.substr(0,3)==="hsl"){if(n=v=e.match(ji),!t)a=+n[0]%360/360,d=+n[1]/100,c=+n[2]/100,l=c<=.5?c*(d+1):c+d-c*d,r=c*2-l,n.length>3&&(n[3]*=1),n[0]=Hs(a+1/3,r,l),n[1]=Hs(a,r,l),n[2]=Hs(a-1/3,r,l);else if(~e.indexOf("="))return n=e.match(In),i&&n.length<4&&(n[3]=1),n}else n=e.match(ji)||jt.transparent;n=n.map(Number)}return t&&!v&&(r=n[0]/U,l=n[1]/U,o=n[2]/U,f=Math.max(r,l,o),h=Math.min(r,l,o),c=(f+h)/2,f===h?a=d=0:(p=f-h,d=c>.5?p/(2-f-h):p/(f+h),a=f===r?(l-o)/p+(l<o?6:0):f===l?(o-r)/p+2:(r-l)/p+4,a*=60),n[0]=~~(a+.5),n[1]=~~(d*100+.5),n[2]=~~(c*100+.5)),i&&n.length<4&&(n[3]=1),n},or=function(e){var t=[],i=[],n=-1;return e.split(rt).forEach(function(r){var l=r.match(Ct)||[];t.push.apply(t,l),i.push(n+=l.length+1)}),t.c=i,t},Ki=function(e,t,i){var n="",r=(e+n).match(rt),l=t?"hsla(":"rgba(",o=0,a,d,c,f;if(!r)return e;if(r=r.map(function(h){return(h=lr(h,t,1))&&l+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(c=or(e),a=i.c,a.join(n)!==c.c.join(n)))for(d=e.replace(rt,"1").split(Ct),f=d.length-1;o<f;o++)n+=d[o]+(~a.indexOf(o)?r.shift()||l+"0,0,0,0)":(c.length?c:r.length?r:i).shift());if(!d)for(d=e.split(rt),f=d.length-1;o<f;o++)n+=d[o]+r[o];return n+d[f]},rt=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in jt)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),yl=/hsl[a]?\(/,ar=function(e){var t=e.join(" "),i;if(rt.lastIndex=0,rt.test(t))return i=yl.test(t),e[1]=Ki(e[1],i),e[0]=Ki(e[0],i,or(e[1])),!0},Jt,Ee=function(){var s=Date.now,e=500,t=33,i=s(),n=i,r=1e3/240,l=r,o=[],a,d,c,f,h,p,v=function u(_){var m=s()-n,g=_===!0,y,b,w,T;if((m>e||m<0)&&(i+=m-t),n+=m,w=n-i,y=w-l,(y>0||g)&&(T=++f.frame,h=w-f.time*1e3,f.time=w=w/1e3,l+=y+(y>=r?4:r-y),b=1),g||(a=d(u)),b)for(p=0;p<o.length;p++)o[p](w,h,T,_)};return f={time:0,frame:0,tick:function(){v(!0)},deltaRatio:function(_){return h/(1e3/(_||60))},wake:function(){Bn&&(!oi&&Ti()&&(je=oi=window,Si=je.document||{},De.gsap=Se,(je.gsapVersions||(je.gsapVersions=[])).push(Se.version),qn(ks||je.GreenSockGlobals||!je.gsap&&je||{}),nr.forEach(rr)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,a&&f.sleep(),d=c||function(_){return setTimeout(_,l-f.time*1e3+1|0)},Jt=1,v(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(a),Jt=0,d=Zt},lagSmoothing:function(_,m){e=_||1/0,t=Math.min(m||33,e)},fps:function(_){r=1e3/(_||240),l=f.time*1e3+r},add:function(_,m,g){var y=m?function(b,w,T,x){_(b,w,T,x),f.remove(y)}:_;return f.remove(_),o[g?"unshift":"push"](y),It(),y},remove:function(_,m){~(m=o.indexOf(_))&&o.splice(m,1)&&p>=m&&p--},_listeners:o},f}(),It=function(){return!Jt&&Ee.wake()},z={},vl=/^[\d.\-M][\d.\-,\s]/,ml=/["']/g,gl=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],r=1,l=i.length,o,a,d;r<l;r++)a=i[r],o=r!==l-1?a.lastIndexOf(","):a.length,d=a.substr(0,o),t[n]=isNaN(d)?d.replace(ml,"").trim():+d,n=a.substr(o+1).trim();return t},bl=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},wl=function(e){var t=(e+"").split("("),i=z[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[gl(t[1])]:bl(e).split(",").map(zn)):z._CE&&vl.test(e)?z._CE("",e):i},xl=function(e){return function(t){return 1-e(1-t)}},mt=function(e,t){return e&&(oe(e)?e:z[e]||wl(e))||t},wt=function(e,t,i,n){i===void 0&&(i=function(a){return 1-t(1-a)}),n===void 0&&(n=function(a){return a<.5?t(a*2)/2:1-t((1-a)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:n},l;return xe(e,function(o){z[o]=De[o]=r,z[l=o.toLowerCase()]=i;for(var a in r)z[l+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=z[o+"."+a]=r[a]}),r},cr=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Gs=function s(e,t,i){var n=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),l=r/li*(Math.asin(1/n)||0),o=function(c){return c===1?1:n*Math.pow(2,-10*c)*Vr((c-l)*r)+1},a=e==="out"?o:e==="in"?function(d){return 1-o(1-d)}:cr(o);return r=li/r,a.config=function(d,c){return s(e,d,c)},a},Ws=function s(e,t){t===void 0&&(t=1.70158);var i=function(l){return l?--l*l*((t+1)*l+t)+1:0},n=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:cr(i);return n.config=function(r){return s(e,r)},n};xe("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;wt(s+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});z.Linear.easeNone=z.none=z.Linear.easeIn;wt("Elastic",Gs("in"),Gs("out"),Gs());(function(s,e){var t=1/e,i=2*t,n=2.5*t,r=function(o){return o<t?s*o*o:o<i?s*Math.pow(o-1.5/e,2)+.75:o<n?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};wt("Bounce",function(l){return 1-r(1-l)},r)})(7.5625,2.75);wt("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});wt("Circ",function(s){return-(Nn(1-s*s)-1)});wt("Sine",function(s){return s===1?1:-zr(s*Wr)+1});wt("Back",Ws("in"),Ws("out"),Ws());z.SteppedEase=z.steps=De.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),r=t?1:0,l=1-K;return function(o){return((n*is(0,l,o)|0)+r)*i}}};Ut.ease=z["quad.out"];xe("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Mi+=s+","+s+"Params,"});var dr=function(e,t){this.id=jr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Wn,this.set=t?t.getSetter:Oi},es=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Rt(this,+t.duration,1,1),this.data=t.data,ee&&(this._ctx=ee,ee.data.push(this)),Jt||Ee.wake()}var e=s.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,Rt(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(It(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ns(this,i),!r._dp||r.parent||Qn(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&ze(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===K||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),jn(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Yi(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Yi(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?Nt(this._tTime,r)+1:1},e.timeScale=function(i,n){if(!arguments.length)return this._rts===-K?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?Ls(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-K?0:this._rts,this.totalTime(is(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),Os(this),sl(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(It(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==K&&(this._tTime-=K)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=ie(i);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&ze(n,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(we(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ls(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=Xr);var n=_e;return _e=i,Ai(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),_e=n,this},e.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Qi(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,Qi(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(Ne(this,i),we(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,we(n)),this._dur||(this._zTime=-K),this},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-K:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-K,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-K)},e.eventCallback=function(i,n,r){var l=this.vars;return arguments.length>1?(n?(l[i]=n,r&&(l[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete l[i],this):l[i]},e.then=function(i){var n=this,r=n._prom;return new Promise(function(l){var o=oe(i)?i:Vn,a=function(){var c=n.then;n.then=null,r&&r(),oe(o)&&(o=o(n))&&(o.then||o===n)&&(n.then=c),l(o),n.then=c};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?a():n._prom=a})},e.kill=function(){Wt(this)},s}();Oe(es.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-K,_prom:0,_ps:!1,_rts:1});var be=function(s){On(e,s);function e(i,n){var r;return i===void 0&&(i={}),r=s.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=we(i.sortChildren),ne&&ze(i.parent||ne,Qe(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&Un(Qe(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(n,r,l){return Yt(0,arguments,this),this},t.from=function(n,r,l){return Yt(1,arguments,this),this},t.fromTo=function(n,r,l,o){return Yt(2,arguments,this),this},t.set=function(n,r,l){return r.duration=0,r.parent=this,Vt(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new de(n,r,Ne(this,l),1),this},t.call=function(n,r,l){return ze(this,de.delayedCall(0,n,r),l)},t.staggerTo=function(n,r,l,o,a,d,c){return l.duration=r,l.stagger=l.stagger||o,l.onComplete=d,l.onCompleteParams=c,l.parent=this,new de(n,l,Ne(this,a)),this},t.staggerFrom=function(n,r,l,o,a,d,c){return l.runBackwards=1,Vt(l).immediateRender=we(l.immediateRender),this.staggerTo(n,r,l,o,a,d,c)},t.staggerFromTo=function(n,r,l,o,a,d,c,f){return o.startAt=l,Vt(o).immediateRender=we(o.immediateRender),this.staggerTo(n,r,o,a,d,c,f)},t.render=function(n,r,l){var o=this._time,a=this._dirty?this.totalDuration():this._tDur,d=this._dur,c=n<=0?0:ie(n),f=this._zTime<0!=n<0&&(this._initted||!d),h,p,v,u,_,m,g,y,b,w,T,x;if(this!==ne&&c>a&&n>=0&&(c=a),c!==this._tTime||l||f){if(o!==this._time&&d&&(c+=this._time-o,n+=this._time-o),h=c,b=this._start,y=this._ts,m=!y,f&&(d||(o=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(T=this._yoyo,_=d+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(_*100+n,r,l);if(h=ie(c%_),c===a?(u=this._repeat,h=d):(w=ie(c/_),u=~~w,u&&u===w&&(h=d,u--),h>d&&(h=d)),w=Nt(this._tTime,_),!o&&this._tTime&&w!==u&&this._tTime-w*_-this._dur<=0&&(w=u),T&&u&1&&(h=d-h,x=1),u!==w&&!this._lock){var k=T&&w&1,S=k===(T&&u&1);if(u<w&&(k=!k),o=k?0:c%d?d:c,this._lock=1,this.render(o||(x?0:ie(u*_)),r,!d)._lock=0,this._tTime=c,!r&&this.parent&&Ae(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,w=u),o&&o!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(d=this._dur,a=this._tDur,S&&(this._lock=2,o=k?d:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(g=ll(this,ie(o),ie(h)),g&&(c-=h-(h=g._start))),this._tTime=c,this._time=h,this._act=!!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&c&&d&&!r&&!w&&(Ae(this,"onStart"),this._tTime!==c))return this;if(h>=o&&n>=0)for(p=this._first;p;){if(v=p._next,(p._act||h>=p._start)&&p._ts&&g!==p){if(p.parent!==this)return this.render(n,r,l);if(p.render(p._ts>0?(h-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(h-p._start)*p._ts,r,l),h!==this._time||!this._ts&&!m){g=0,v&&(c+=this._zTime=-K);break}}p=v}else{p=this._last;for(var C=n<0?n:h;p;){if(v=p._prev,(p._act||C<=p._end)&&p._ts&&g!==p){if(p.parent!==this)return this.render(n,r,l);if(p.render(p._ts>0?(C-p._start)*p._ts:(p._dirty?p.totalDuration():p._tDur)+(C-p._start)*p._ts,r,l||_e&&Ai(p)),h!==this._time||!this._ts&&!m){g=0,v&&(c+=this._zTime=C?-K:K);break}}p=v}}if(g&&!r&&(this.pause(),g.render(h>=o?0:-K)._zTime=h>=o?1:-1,this._ts))return this._start=b,Os(this),this.render(n,r,l);this._onUpdate&&!r&&Ae(this,"onUpdate",!0),(c===a&&this._tTime>=this.totalDuration()||!c&&o)&&(b===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((n||!d)&&(c===a&&this._ts>0||!c&&this._ts<0)&&lt(this,1),!r&&!(n<0&&!o)&&(c||o||!a)&&(Ae(this,c===a&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<a&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,r){var l=this;if(Ke(r)||(r=Ne(this,r,n)),!(n instanceof es)){if(ge(n))return n.forEach(function(o){return l.add(o,r)}),this;if(pe(n))return this.addLabel(n,r);if(oe(n))n=de.delayedCall(0,n);else return this}return this!==n?ze(this,n,r):this},t.getChildren=function(n,r,l,o){n===void 0&&(n=!0),r===void 0&&(r=!0),l===void 0&&(l=!0),o===void 0&&(o=-Re);for(var a=[],d=this._first;d;)d._start>=o&&(d instanceof de?r&&a.push(d):(l&&a.push(d),n&&a.push.apply(a,d.getChildren(!0,r,l)))),d=d._next;return a},t.getById=function(n){for(var r=this.getChildren(1,1,1),l=r.length;l--;)if(r[l].vars.id===n)return r[l]},t.remove=function(n){return pe(n)?this.removeLabel(n):oe(n)?this.killTweensOf(n):(n.parent===this&&Ds(this,n),n===this._recent&&(this._recent=this._last),vt(this))},t.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ie(Ee.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),s.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},t.addLabel=function(n,r){return this.labels[n]=Ne(this,r),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,r,l){var o=de.delayedCall(0,r||Zt,l);return o.data="isPause",this._hasPause=1,ze(this,o,Ne(this,n))},t.removePause=function(n){var r=this._first;for(n=Ne(this,n);r;)r._start===n&&r.data==="isPause"&&lt(r),r=r._next},t.killTweensOf=function(n,r,l){for(var o=this.getTweensOf(n,l),a=o.length;a--;)tt!==o[a]&&o[a].kill(n,r);return this},t.getTweensOf=function(n,r){for(var l=[],o=Ie(n),a=this._first,d=Ke(r),c;a;)a instanceof de?Jr(a._targets,o)&&(d?(!tt||a._initted&&a._ts)&&a.globalTime(0)<=r&&a.globalTime(a.totalDuration())>r:!r||a.isActive())&&l.push(a):(c=a.getTweensOf(o,r)).length&&l.push.apply(l,c),a=a._next;return l},t.tweenTo=function(n,r){r=r||{};var l=this,o=Ne(l,n),a=r,d=a.startAt,c=a.onStart,f=a.onStartParams,h=a.immediateRender,p,v=de.to(l,Oe({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale())||K,onStart:function(){if(l.pause(),!p){var _=r.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale());v._dur!==_&&Rt(v,_,0,1).render(v._time,!0,!0),p=1}c&&c.apply(v,f||[])}},r));return h?v.render(0):v},t.tweenFromTo=function(n,r,l){return this.tweenTo(r,Oe({startAt:{time:Ne(this,n)}},l))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),Ui(this,Ne(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),Ui(this,Ne(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+K)},t.shiftChildren=function(n,r,l){l===void 0&&(l=0);var o=this._first,a=this.labels,d;for(n=ie(n);o;)o._start>=l&&(o._start+=n,o._end+=n),o=o._next;if(r)for(d in a)a[d]>=l&&(a[d]+=n);return vt(this)},t.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return s.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,l;r;)l=r._next,this.remove(r),r=l;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),vt(this)},t.totalDuration=function(n){var r=0,l=this,o=l._last,a=Re,d,c,f;if(arguments.length)return l.timeScale((l._repeat<0?l.duration():l.totalDuration())/(l.reversed()?-n:n));if(l._dirty){for(f=l.parent;o;)d=o._prev,o._dirty&&o.totalDuration(),c=o._start,c>a&&l._sort&&o._ts&&!l._lock?(l._lock=1,ze(l,o,c-o._delay,1)._lock=0):a=c,c<0&&o._ts&&(r-=c,(!f&&!l._dp||f&&f.smoothChildTiming)&&(l._start+=ie(c/l._ts),l._time-=c,l._tTime-=c),l.shiftChildren(-c,!1,-1/0),a=0),o._end>r&&o._ts&&(r=o._end),o=d;Rt(l,l===ne&&l._time>r?l._time:r,1,1),l._dirty=0}return l._tDur},e.updateRoot=function(n){if(ne._ts&&(jn(ne,Ls(n,ne)),Gn=Ee.frame),Ee.frame>=zi){zi+=$e.autoSleep||120;var r=ne._first;if((!r||!r._ts)&&$e.autoSleep&&Ee._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Ee.sleep()}}},e}(es);Oe(be.prototype,{_lock:0,_hasPause:0,_forcing:0});var kl=function(e,t,i,n,r,l,o){var a=new ke(this._pt,e,t,0,1,yr,null,r),d=0,c=0,f,h,p,v,u,_,m,g;for(a.b=i,a.e=n,i+="",n+="",(m=~n.indexOf("random("))&&(n=Xt(n)),l&&(g=[i,n],l(g,e,t),i=g[0],n=g[1]),h=i.match(Bs)||[];f=Bs.exec(n);)v=f[0],u=n.substring(d,f.index),p?p=(p+1)%5:u.substr(-5)==="rgba("&&(p=1),v!==h[c++]&&(_=parseFloat(h[c-1])||0,a._pt={_next:a._pt,p:u||c===1?u:",",s:_,c:v.charAt(1)==="="?Et(_,v)-_:parseFloat(v)-_,m:p&&p<4?Math.round:0},d=Bs.lastIndex);return a.c=d<n.length?n.substring(d,n.length):"",a.fp=o,(Fn.test(n)||m)&&(a.e=0),this._pt=a,a},Pi=function(e,t,i,n,r,l,o,a,d,c){oe(n)&&(n=n(r||0,e,l));var f=e[t],h=i!=="get"?i:oe(f)?d?e[t.indexOf("set")||!oe(e["get"+t.substr(3)])?t:"get"+t.substr(3)](d):e[t]():f,p=oe(f)?d?Ml:pr:Di,v;if(pe(n)&&(~n.indexOf("random(")&&(n=Xt(n)),n.charAt(1)==="="&&(v=Et(h,n)+(me(h)||0),(v||v===0)&&(n=v))),!c||h!==n||pi)return!isNaN(h*n)&&n!==""?(v=new ke(this._pt,e,t,+h||0,n-(h||0),typeof f=="boolean"?Al:_r,0,p),d&&(v.fp=d),o&&v.modifier(o,this,e),this._pt=v):(!f&&!(t in e)&&Li(t,n),kl.call(this,e,t,h,n,p,a||$e.stringFilter,d))},Tl=function(e,t,i,n,r){if(oe(e)&&(e=Qt(e,r,t,i,n)),!Ye(e)||e.style&&e.nodeType||ge(e)||Rn(e))return pe(e)?Qt(e,r,t,i,n):e;var l={},o;for(o in e)l[o]=Qt(e[o],r,t,i,n);return l},ur=function(e,t,i,n,r,l){var o,a,d,c;if(Me[e]&&(o=new Me[e]).init(r,o.rawVars?t[e]:Tl(t[e],n,r,l,i),i,n,l)!==!1&&(i._pt=a=new ke(i._pt,r,e,0,1,o.render,o,0,o.priority),i!==Mt))for(d=i._ptLookup[i._targets.indexOf(r)],c=o._props.length;c--;)d[o._props[c]]=a;return o},tt,pi,$i=function s(e,t,i){var n=e.vars,r=n.ease,l=n.startAt,o=n.immediateRender,a=n.lazy,d=n.onUpdate,c=n.runBackwards,f=n.yoyoEase,h=n.keyframes,p=n.autoRevert,v=e._dur,u=e._startAt,_=e._targets,m=e.parent,g=m&&m.data==="nested"?m.vars.targets:_,y=e._overwrite==="auto"&&!xi,b=e.timeline,w=n.easeReverse||f,T,x,k,S,C,E,A,$,R,B,H,j,ue;if(b&&(!h||!r)&&(r="none"),e._ease=mt(r,Ut.ease),e._rEase=w&&(mt(w)||e._ease),e._from=!b&&!!n.runBackwards,e._from&&(e.ratio=1),!b||h&&!n.stagger){if($=_[0]?yt(_[0]).harness:0,j=$&&n[$.prop],T=Ss(n,Ci),u&&(u._zTime<0&&u.progress(1),t<0&&c&&o&&!p?u.render(-1,!0):u.revert(c&&v?vs:Zr),u._lazy=0),l){if(lt(e._startAt=de.set(_,Oe({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!u&&we(a),startAt:null,delay:0,onUpdate:d&&function(){return Ae(e,"onUpdate")},stagger:0},l))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_e||!o&&!p)&&e._startAt.revert(vs),o&&v&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&v&&!u){if(t&&(o=!1),k=Oe({overwrite:!1,data:"isFromStart",lazy:o&&!u&&we(a),immediateRender:o,stagger:0,parent:m},T),j&&(k[$.prop]=j),lt(e._startAt=de.set(_,k)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_e?e._startAt.revert(vs):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,K,K);else if(!t)return}for(e._pt=e._ptCache=0,a=v&&we(a)||a&&!v,x=0;x<_.length;x++){if(C=_[x],A=C._gsap||Ei(_)[x]._gsap,e._ptLookup[x]=B={},ai[A.id]&&nt.length&&Ts(),H=g===_?x:g.indexOf(C),$&&(R=new $).init(C,j||T,e,H,g)!==!1&&(e._pt=S=new ke(e._pt,C,R.name,0,1,R.render,R,0,R.priority),R._props.forEach(function(Le){B[Le]=S}),R.priority&&(E=1)),!$||j)for(k in T)Me[k]&&(R=ur(k,T,e,H,C,g))?R.priority&&(E=1):B[k]=S=Pi.call(e,C,k,"get",T[k],H,g,0,n.stringFilter);e._op&&e._op[x]&&e.kill(C,e._op[x]),y&&e._pt&&(tt=e,ne.killTweensOf(C,B,e.globalTime(t)),ue=!e.parent,tt=0),e._pt&&a&&(ai[A.id]=1)}E&&vr(e),e._onInit&&e._onInit(e)}e._onUpdate=d,e._initted=(!e._op||e._pt)&&!ue,h&&t<=0&&b.render(Re,!0,!0)},Sl=function(e,t,i,n,r,l,o,a){var d=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,f,h,p;if(!d)for(d=e._ptCache[t]=[],h=e._ptLookup,p=e._targets.length;p--;){if(c=h[p][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return pi=1,e.vars[t]="+=0",$i(e,o),pi=0,a?Kt(t+" not eligible for reset. Try splitting into individual properties"):1;d.push(c)}for(p=d.length;p--;)f=d[p],c=f._pt||f,c.s=(n||n===0)&&!r?n:c.s+(n||0)+l*c.c,c.c=i-c.s,f.e&&(f.e=ae(i)+me(f.e)),f.b&&(f.b=c.s+me(f.b))},Ll=function(e,t){var i=e[0]?yt(e[0]).harness:0,n=i&&i.aliases,r,l,o,a;if(!n)return t;r=Ot({},t);for(l in n)if(l in r)for(a=n[l].split(","),o=a.length;o--;)r[a[o]]=r[l];return r},Cl=function(e,t,i,n){var r=t.ease||n||"power1.inOut",l,o;if(ge(t))o=i[e]||(i[e]=[]),t.forEach(function(a,d){return o.push({t:d/(t.length-1)*100,v:a,e:r})});else for(l in t)o=i[l]||(i[l]=[]),l==="ease"||o.push({t:parseFloat(e),v:t[l],e:r})},Qt=function(e,t,i,n,r){return oe(e)?e.call(t,i,n,r):pe(e)&&~e.indexOf("random(")?Xt(e):e},hr=Mi+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",fr={};xe(hr+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return fr[s]=1});var de=function(s){On(e,s);function e(i,n,r,l){var o;typeof n=="number"&&(r.duration=n,n=r,r=null),o=s.call(this,l?n:Vt(n))||this;var a=o.vars,d=a.duration,c=a.delay,f=a.immediateRender,h=a.stagger,p=a.overwrite,v=a.keyframes,u=a.defaults,_=a.scrollTrigger,m=n.parent||ne,g=(ge(i)||Rn(i)?Ke(i[0]):"length"in n)?[i]:Ie(i),y,b,w,T,x,k,S,C;if(o._targets=g.length?Ei(g):Kt("GSAP target "+i+" not found. https://gsap.com",!$e.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=p,v||h||ls(d)||ls(c)){n=o.vars;var E=n.easeReverse||n.yoyoEase;if(y=o.timeline=new be({data:"nested",defaults:u||{},targets:m&&m.data==="nested"?m.vars.targets:g}),y.kill(),y.parent=y._dp=Qe(o),y._start=0,h||ls(d)||ls(c)){if(T=g.length,S=h&&Jn(h),Ye(h))for(x in h)~hr.indexOf(x)&&(C||(C={}),C[x]=h[x]);for(b=0;b<T;b++)w=Ss(n,fr),w.stagger=0,E&&(w.easeReverse=E),C&&Ot(w,C),k=g[b],w.duration=+Qt(d,Qe(o),b,k,g),w.delay=(+Qt(c,Qe(o),b,k,g)||0)-o._delay,!h&&T===1&&w.delay&&(o._delay=c=w.delay,o._start+=c,w.delay=0),y.to(k,w,S?S(b,k,g):0),y._ease=z.none;y.duration()?d=c=0:o.timeline=0}else if(v){Vt(Oe(y.vars.defaults,{ease:"none"})),y._ease=mt(v.ease||n.ease||"none");var A=0,$,R,B;if(ge(v))v.forEach(function(H){return y.to(g,H,">")}),y.duration();else{w={};for(x in v)x==="ease"||x==="easeEach"||Cl(x,v[x],w,v.easeEach);for(x in w)for($=w[x].sort(function(H,j){return H.t-j.t}),A=0,b=0;b<$.length;b++)R=$[b],B={ease:R.e,duration:(R.t-(b?$[b-1].t:0))/100*d},B[x]=R.v,y.to(g,B,A),A+=B.duration;y.duration()<d&&y.to({},{duration:d-y.duration()})}}d||o.duration(d=y.duration())}else o.timeline=0;return p===!0&&!xi&&(tt=Qe(o),ne.killTweensOf(g),tt=0),ze(m,Qe(o),r),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(f||!d&&!v&&o._start===ie(m._time)&&we(f)&&il(Qe(o))&&m.data!=="nested")&&(o._tTime=-K,o.render(Math.max(0,-c)||0)),_&&Un(Qe(o),_),o}var t=e.prototype;return t.render=function(n,r,l){var o=this._time,a=this._tDur,d=this._dur,c=n<0,f=n>a-K&&!c?a:n<K?0:n,h,p,v,u,_,m,g,y;if(!d)rl(this,n,r,l);else if(f!==this._tTime||!n||l||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(h=f,y=this.timeline,this._repeat){if(u=d+this._rDelay,this._repeat<-1&&c)return this.totalTime(u*100+n,r,l);if(h=ie(f%u),f===a?(v=this._repeat,h=d):(_=ie(f/u),v=~~_,v&&v===_?(h=d,v--):h>d&&(h=d)),m=this._yoyo&&v&1,m&&(h=d-h),_=Nt(this._tTime,u),h===o&&!l&&this._initted&&v===_)return this._tTime=f,this;v!==_&&this.vars.repeatRefresh&&!m&&!this._lock&&h!==u&&this._initted&&(this._lock=l=1,this.render(ie(u*v),!0).invalidate()._lock=0)}if(!this._initted){if(Kn(this,c?n:h,l,r,f))return this._tTime=0,this;if(o!==this._time&&!(l&&this.vars.repeatRefresh&&v!==_))return this;if(d!==this._dur)return this.render(n,r,l)}if(this._rEase){var b=h<o;if(b!==this._inv){var w=b?o:d-o;this._inv=b,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=w?(b?-1:1)/w:0,this._invScale=b?-this.ratio:1-this.ratio,this._invEase=b?this._rEase:this._ease}this.ratio=g=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=g=this._ease(h/d);if(this._from&&(this.ratio=g=1-g),this._tTime=f,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&f&&!r&&!_&&(Ae(this,"onStart"),this._tTime!==f))return this;for(p=this._pt;p;)p.r(g,p.d),p=p._next;y&&y.render(n<0?n:y._dur*y._ease(h/this._dur),r,l)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(c&&ci(this,n,r,l),Ae(this,"onUpdate")),this._repeat&&v!==_&&this.vars.onRepeat&&!r&&this.parent&&Ae(this,"onRepeat"),(f===this._tDur||!f)&&this._tTime===f&&(c&&!this._onUpdate&&ci(this,n,!0,!0),(n||!d)&&(f===this._tDur&&this._ts>0||!f&&this._ts<0)&&lt(this,1),!r&&!(c&&!o)&&(f||o||m)&&(Ae(this,f===a?"onComplete":"onReverseComplete",!0),this._prom&&!(f<a&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),s.prototype.invalidate.call(this,n)},t.resetTo=function(n,r,l,o,a){Jt||Ee.wake(),this._ts||this.play();var d=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||$i(this,d),c=this._ease(d/this._dur),Sl(this,n,r,l,o,c,d,a)?this.resetTo(n,r,l,o,1):(Ns(this,0),this.parent||Yn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Wt(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_e),this;if(this.timeline){var l=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,tt&&tt.vars.overwrite!==!0)._first||Wt(this),this.parent&&l!==this.timeline.totalDuration()&&Rt(this,this._dur*this.timeline._tDur/l,0,1),this}var o=this._targets,a=n?Ie(n):o,d=this._ptLookup,c=this._pt,f,h,p,v,u,_,m;if((!r||r==="all")&&tl(o,a))return r==="all"&&(this._pt=0),Wt(this);for(f=this._op=this._op||[],r!=="all"&&(pe(r)&&(u={},xe(r,function(g){return u[g]=1}),r=u),r=Ll(o,r)),m=o.length;m--;)if(~a.indexOf(o[m])){h=d[m],r==="all"?(f[m]=r,v=h,p={}):(p=f[m]=f[m]||{},v=r);for(u in v)_=h&&h[u],_&&((!("kill"in _.d)||_.d.kill(u)===!0)&&Ds(this,_,"_pt"),delete h[u]),p!=="all"&&(p[u]=1)}return this._initted&&!this._pt&&c&&Wt(this),this},e.to=function(n,r){return new e(n,r,arguments[2])},e.from=function(n,r){return Yt(1,arguments)},e.delayedCall=function(n,r,l,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:l,onReverseCompleteParams:l,callbackScope:o})},e.fromTo=function(n,r,l){return Yt(2,arguments)},e.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(n,r)},e.killTweensOf=function(n,r,l){return ne.killTweensOf(n,r,l)},e}(es);Oe(de.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});xe("staggerTo,staggerFrom,staggerFromTo",function(s){de[s]=function(){var e=new be,t=ui.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var Di=function(e,t,i){return e[t]=i},pr=function(e,t,i){return e[t](i)},Ml=function(e,t,i,n){return e[t](n.fp,i)},El=function(e,t,i){return e.setAttribute(t,i)},Oi=function(e,t){return oe(e[t])?pr:ki(e[t])&&e.setAttribute?El:Di},_r=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Al=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},yr=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},Ni=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Pl=function(e,t,i,n){for(var r=this._pt,l;r;)l=r._next,r.p===n&&r.modifier(e,t,i),r=l},$l=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?Ds(this,t,"_pt"):t.dep||(i=1),t=n;return!i},Dl=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},vr=function(e){for(var t=e._pt,i,n,r,l;t;){for(i=t._next,n=r;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:l)?t._prev._next=t:r=t,(t._next=n)?n._prev=t:l=t,t=i}e._pt=r},ke=function(){function s(t,i,n,r,l,o,a,d,c){this.t=i,this.s=r,this.c=l,this.p=n,this.r=o||_r,this.d=a||this,this.set=d||Di,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=Dl,this.m=i,this.mt=r,this.tween=n},s}();xe(Mi+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Ci[s]=1});De.TweenMax=De.TweenLite=de;De.TimelineLite=De.TimelineMax=be;ne=new be({sortChildren:!1,defaults:Ut,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});$e.stringFilter=ar;var gt=[],gs={},Ol=[],Zi=0,Nl=0,js=function(e){return(gs[e]||Ol).map(function(t){return t()})},_i=function(){var e=Date.now(),t=[];e-Zi>2&&(js("matchMediaInit"),gt.forEach(function(i){var n=i.queries,r=i.conditions,l,o,a,d;for(o in n)l=je.matchMedia(n[o]).matches,l&&(a=1),l!==r[o]&&(r[o]=l,d=1);d&&(i.revert(),a&&t.push(i))}),js("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),Zi=e,js("matchMedia"))},mr=function(){function s(t,i){this.selector=i&&hi(i),this.data=[],this._r=[],this.isReverted=!1,this.id=Nl++,t&&this.add(t)}var e=s.prototype;return e.add=function(i,n,r){oe(i)&&(r=n,n=i,i=oe);var l=this,o=function(){var d=ee,c=l.selector,f;return d&&d!==l&&d.data.push(l),r&&(l.selector=hi(r)),ee=l,f=n.apply(l,arguments),oe(f)&&l._r.push(f),ee=d,l.selector=c,l.isReverted=!1,f};return l.last=o,i===oe?o(l,function(a){return l.add(null,a)}):i?l[i]=o:o},e.ignore=function(i){var n=ee;ee=null,i(this),ee=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof s?i.push.apply(i,n.getTweens()):n instanceof de&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var r=this;if(i?function(){for(var o=r.getTweens(),a=r.data.length,d;a--;)d=r.data[a],d.data==="isFlip"&&(d.revert(),d.getChildren(!0,!0,!1).forEach(function(c){return o.splice(o.indexOf(c),1)}));for(o.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,f){return f.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),a=r.data.length;a--;)d=r.data[a],d instanceof be?d.data!=="nested"&&(d.scrollTrigger&&d.scrollTrigger.revert(),d.kill()):!(d instanceof de)&&d.revert&&d.revert(i);r._r.forEach(function(c){return c(i,r)}),r.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),n)for(var l=gt.length;l--;)gt[l].id===this.id&&gt.splice(l,1)},e.revert=function(i){this.kill(i||{})},s}(),Rl=function(){function s(t){this.contexts=[],this.scope=t,ee&&ee.data.push(this)}var e=s.prototype;return e.add=function(i,n,r){Ye(i)||(i={matches:i});var l=new mr(0,r||this.scope),o=l.conditions={},a,d,c;ee&&!l.selector&&(l.selector=ee.selector),this.contexts.push(l),n=l.add("onMatch",n),l.queries=i;for(d in i)d==="all"?c=1:(a=je.matchMedia(i[d]),a&&(gt.indexOf(l)<0&&gt.push(l),(o[d]=a.matches)&&(c=1),a.addListener?a.addListener(_i):a.addEventListener("change",_i)));return c&&n(l,function(f){return l.add(null,f)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},s}(),Cs={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return rr(n)})},timeline:function(e){return new be(e)},getTweensOf:function(e,t){return ne.getTweensOf(e,t)},getProperty:function(e,t,i,n){pe(e)&&(e=Ie(e)[0]);var r=yt(e||{}).get,l=i?Vn:zn;return i==="native"&&(i=""),e&&(t?l((Me[t]&&Me[t].get||r)(e,t,i,n)):function(o,a,d){return l((Me[o]&&Me[o].get||r)(e,o,a,d))})},quickSetter:function(e,t,i){if(e=Ie(e),e.length>1){var n=e.map(function(c){return Se.quickSetter(c,t,i)}),r=n.length;return function(c){for(var f=r;f--;)n[f](c)}}e=e[0]||{};var l=Me[t],o=yt(e),a=o.harness&&(o.harness.aliases||{})[t]||t,d=l?function(c){var f=new l;Mt._pt=0,f.init(e,i?c+i:c,Mt,0,[e]),f.render(1,f),Mt._pt&&Ni(1,Mt)}:o.set(e,a);return l?d:function(c){return d(e,a,i?c+i:c,o,1)}},quickTo:function(e,t,i){var n,r=Se.to(e,Oe((n={},n[t]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),l=function(a,d,c){return r.resetTo(t,a,d,c)};return l.tween=r,l},isTweening:function(e){return ne.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=mt(e.ease,Ut.ease)),Vi(Ut,e||{})},config:function(e){return Vi($e,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,r=e.defaults,l=e.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!Me[o]&&!De[o]&&Kt(t+" effect requires "+o+" plugin.")}),qs[t]=function(o,a,d){return i(Ie(o),Oe(a||{},r),d)},l&&(be.prototype[t]=function(o,a,d){return this.add(qs[t](o,Ye(a)?a:(d=a)&&{},this),d)})},registerEase:function(e,t){z[e]=mt(t)},parseEase:function(e,t){return arguments.length?mt(e,t):z},getById:function(e){return ne.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new be(e),n,r;for(i.smoothChildTiming=we(e.smoothChildTiming),ne.remove(i),i._dp=0,i._time=i._tTime=ne._time,n=ne._first;n;)r=n._next,(t||!(!n._dur&&n instanceof de&&n.vars.onComplete===n._targets[0]))&&ze(i,n,n._start-n._delay),n=r;return ze(ne,i,0),i},context:function(e,t){return e?new mr(e,t):ee},matchMedia:function(e){return new Rl(e)},matchMediaRefresh:function(){return gt.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||_i()},addEventListener:function(e,t){var i=gs[e]||(gs[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=gs[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:fl,wrapYoyo:pl,distribute:Jn,random:tr,snap:er,normalize:hl,getUnit:me,clamp:al,splitColor:lr,toArray:Ie,selector:hi,mapRange:ir,pipe:dl,unitize:ul,interpolate:_l,shuffle:Xn},install:qn,effects:qs,ticker:Ee,updateRoot:be.updateRoot,plugins:Me,globalTimeline:ne,core:{PropTween:ke,globals:Hn,Tween:de,Timeline:be,Animation:es,getCache:yt,_removeLinkedListItem:Ds,reverting:function(){return _e},context:function(e){return e&&ee&&(ee.data.push(e),e._ctx=ee),ee},suppressOverwrites:function(e){return xi=e}}};xe("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Cs[s]=de[s]});Ee.add(be.updateRoot);Mt=Cs.to({},{duration:0});var Il=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Fl=function(e,t){var i=e._targets,n,r,l;for(n in t)for(r=i.length;r--;)l=e._ptLookup[r][n],l&&(l=l.d)&&(l._pt&&(l=Il(l,n)),l&&l.modifier&&l.modifier(t[n],e,i[r],n))},zs=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,r,l){l._onInit=function(o){var a,d;if(pe(r)&&(a={},xe(r,function(c){return a[c]=1}),r=a),t){a={};for(d in r)a[d]=t(r[d]);r=a}Fl(o,r)}}}},Se=Cs.registerPlugin({name:"attr",init:function(e,t,i,n,r){var l,o,a;this.tween=i;for(l in t)a=e.getAttribute(l)||"",o=this.add(e,"setAttribute",(a||0)+"",t[l],n,r,0,0,l),o.op=l,o.b=a,this._props.push(l)},render:function(e,t){for(var i=t._pt;i;)_e?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},zs("roundProps",fi),zs("modifiers"),zs("snap",er))||Cs;de.version=be.version=Se.version="3.15.0";Bn=1;Ti()&&It();z.Power0;z.Power1;z.Power2;z.Power3;z.Power4;z.Linear;z.Quad;z.Cubic;z.Quart;z.Quint;z.Strong;z.Elastic;z.Back;z.SteppedEase;z.Bounce;z.Sine;z.Expo;z.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Xi,st,At,Ri,pt,Ji,Ii,Bl=function(){return typeof window<"u"},Ze={},ft=180/Math.PI,Pt=Math.PI/180,kt=Math.atan2,en=1e8,Fi=/([A-Z])/g,ql=/(left|right|width|margin|padding|x)/i,Hl=/[\s,\(]\S/,Ve={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},yi=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Gl=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Wl=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},jl=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},zl=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},gr=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},br=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Vl=function(e,t,i){return e.style[t]=i},Yl=function(e,t,i){return e.style.setProperty(t,i)},Ql=function(e,t,i){return e._gsap[t]=i},Ul=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},Kl=function(e,t,i,n,r){var l=e._gsap;l.scaleX=l.scaleY=i,l.renderTransform(r,l)},Zl=function(e,t,i,n,r){var l=e._gsap;l[t]=i,l.renderTransform(r,l)},re="transform",Te=re+"Origin",Xl=function s(e,t){var i=this,n=this.target,r=n.style,l=n._gsap;if(e in Ze&&r){if(this.tfm=this.tfm||{},e!=="transform")e=Ve[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=Ue(n,o)}):this.tfm[e]=l.x?l[e]:Ue(n,e),e===Te&&(this.tfm.zOrigin=l.zOrigin);else return Ve.transform.split(",").forEach(function(o){return s.call(i,o,t)});if(this.props.indexOf(re)>=0)return;l.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(Te,t,"")),e=re}(r||t)&&this.props.push(e,t,r[e])},wr=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},Jl=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,r,l;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Fi,"-$1").toLowerCase());if(this.tfm){for(l in this.tfm)n[l]=this.tfm[l];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Ii(),(!r||!r.isStart)&&!i[re]&&(wr(i),n.zOrigin&&i[Te]&&(i[Te]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},xr=function(e,t){var i={target:e,props:[],revert:Jl,save:Xl};return e._gsap||Se.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(n){return i.save(n)}),i},kr,vi=function(e,t){var i=st.createElementNS?st.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):st.createElement(e);return i&&i.style?i:st.createElement(e)},Pe=function s(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(Fi,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&s(e,Ft(t)||t,1)||""},tn="O,Moz,ms,Ms,Webkit".split(","),Ft=function(e,t,i){var n=t||pt,r=n.style,l=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);l--&&!(tn[l]+e in r););return l<0?null:(l===3?"ms":l>=0?tn[l]:"")+e},mi=function(){Bl()&&window.document&&(Xi=window,st=Xi.document,At=st.documentElement,pt=vi("div")||{style:{}},vi("div"),re=Ft(re),Te=re+"Origin",pt.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",kr=!!Ft("perspective"),Ii=Se.core.reverting,Ri=1)},sn=function(e){var t=e.ownerSVGElement,i=vi("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=e.cloneNode(!0),r;n.style.display="block",i.appendChild(n),At.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),At.removeChild(i),r},nn=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Tr=function(e){var t,i;try{t=e.getBBox()}catch{t=sn(e),i=1}return t&&(t.width||t.height)||i||(t=sn(e)),t&&!t.width&&!t.x&&!t.y?{x:+nn(e,["x","cx","x1"])||0,y:+nn(e,["y","cy","y1"])||0,width:0,height:0}:t},Sr=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Tr(e))},ot=function(e,t){if(t){var i=e.style,n;t in Ze&&t!==Te&&(t=re),i.removeProperty?(n=t.substr(0,2),(n==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(n==="--"?t:t.replace(Fi,"-$1").toLowerCase())):i.removeAttribute(t)}},it=function(e,t,i,n,r,l){var o=new ke(e._pt,t,i,0,1,l?br:gr);return e._pt=o,o.b=n,o.e=r,e._props.push(i),o},rn={deg:1,rad:1,turn:1},eo={grid:1,flex:1},at=function s(e,t,i,n){var r=parseFloat(i)||0,l=(i+"").trim().substr((r+"").length)||"px",o=pt.style,a=ql.test(t),d=e.tagName.toLowerCase()==="svg",c=(d?"client":"offset")+(a?"Width":"Height"),f=100,h=n==="px",p=n==="%",v,u,_,m;if(n===l||!r||rn[n]||rn[l])return r;if(l!=="px"&&!h&&(r=s(e,t,i,"px")),m=e.getCTM&&Sr(e),(p||l==="%")&&(Ze[t]||~t.indexOf("adius")))return v=m?e.getBBox()[a?"width":"height"]:e[c],ae(p?r/v*f:r/100*v);if(o[a?"width":"height"]=f+(h?l:n),u=n!=="rem"&&~t.indexOf("adius")||n==="em"&&e.appendChild&&!d?e:e.parentNode,m&&(u=(e.ownerSVGElement||{}).parentNode),(!u||u===st||!u.appendChild)&&(u=st.body),_=u._gsap,_&&p&&_.width&&a&&_.time===Ee.time&&!_.uncache)return ae(r/_.width*f);if(p&&(t==="height"||t==="width")){var g=e.style[t];e.style[t]=f+n,v=e[c],g?e.style[t]=g:ot(e,t)}else(p||l==="%")&&!eo[Pe(u,"display")]&&(o.position=Pe(e,"position")),u===e&&(o.position="static"),u.appendChild(pt),v=pt[c],u.removeChild(pt),o.position="absolute";return a&&p&&(_=yt(u),_.time=Ee.time,_.width=u[c]),ae(h?v*r/f:v&&r?f/v*r:0)},Ue=function(e,t,i,n){var r;return Ri||mi(),t in Ve&&t!=="transform"&&(t=Ve[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ze[t]&&t!=="transform"?(r=ss(e,n),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Es(Pe(e,Te))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=Ms[t]&&Ms[t](e,t,i)||Pe(e,t)||Wn(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?at(e,t,r,i)+i:r},to=function(e,t,i,n){if(!i||i==="none"){var r=Ft(t,e,1),l=r&&Pe(e,r,1);l&&l!==i?(t=r,i=l):t==="borderColor"&&(i=Pe(e,"borderTopColor"))}var o=new ke(this._pt,e.style,t,0,1,yr),a=0,d=0,c,f,h,p,v,u,_,m,g,y,b,w;if(o.b=i,o.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=Pe(e,n.substring(4,n.indexOf(")")))),n==="auto"&&(u=e.style[t],e.style[t]=n,n=Pe(e,t)||n,u?e.style[t]=u:ot(e,t)),c=[i,n],ar(c),i=c[0],n=c[1],h=i.match(Ct)||[],w=n.match(Ct)||[],w.length){for(;f=Ct.exec(n);)_=f[0],g=n.substring(a,f.index),v?v=(v+1)%5:(g.substr(-5)==="rgba("||g.substr(-5)==="hsla(")&&(v=1),_!==(u=h[d++]||"")&&(p=parseFloat(u)||0,b=u.substr((p+"").length),_.charAt(1)==="="&&(_=Et(p,_)+b),m=parseFloat(_),y=_.substr((m+"").length),a=Ct.lastIndex-y.length,y||(y=y||$e.units[t]||b,a===n.length&&(n+=y,o.e+=y)),b!==y&&(p=at(e,t,u,y)||0),o._pt={_next:o._pt,p:g||d===1?g:",",s:p,c:m-p,m:v&&v<4||t==="zIndex"?Math.round:0});o.c=a<n.length?n.substring(a,n.length):""}else o.r=t==="display"&&n==="none"?br:gr;return Fn.test(n)&&(o.e=0),this._pt=o,o},ln={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},so=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=ln[i]||i,t[1]=ln[n]||n,t.join(" ")},io=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,r=t.u,l=i._gsap,o,a,d;if(r==="all"||r===!0)n.cssText="",a=1;else for(r=r.split(","),d=r.length;--d>-1;)o=r[d],Ze[o]&&(a=1,o=o==="transformOrigin"?Te:re),ot(i,o);a&&(ot(i,re),l&&(l.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",ss(i,1),l.uncache=1,wr(n)))}},Ms={clearProps:function(e,t,i,n,r){if(r.data!=="isFromStart"){var l=e._pt=new ke(e._pt,t,i,0,0,io);return l.u=n,l.pr=-10,l.tween=r,e._props.push(i),1}}},ts=[1,0,0,1,0,0],Lr={},Cr=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},on=function(e){var t=Pe(e,re);return Cr(t)?ts:t.substr(7).match(In).map(ae)},Bi=function(e,t){var i=e._gsap||yt(e),n=e.style,r=on(e),l,o,a,d;return i.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,r=[a.a,a.b,a.c,a.d,a.e,a.f],r.join(",")==="1,0,0,1,0,0"?ts:r):(r===ts&&!e.offsetParent&&e!==At&&!i.svg&&(a=n.display,n.display="block",l=e.parentNode,(!l||!e.offsetParent&&!e.getBoundingClientRect().width)&&(d=1,o=e.nextElementSibling,At.appendChild(e)),r=on(e),a?n.display=a:ot(e,"display"),d&&(o?l.insertBefore(e,o):l?l.appendChild(e):At.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},gi=function(e,t,i,n,r,l){var o=e._gsap,a=r||Bi(e,!0),d=o.xOrigin||0,c=o.yOrigin||0,f=o.xOffset||0,h=o.yOffset||0,p=a[0],v=a[1],u=a[2],_=a[3],m=a[4],g=a[5],y=t.split(" "),b=parseFloat(y[0])||0,w=parseFloat(y[1])||0,T,x,k,S;i?a!==ts&&(x=p*_-v*u)&&(k=b*(_/x)+w*(-u/x)+(u*g-_*m)/x,S=b*(-v/x)+w*(p/x)-(p*g-v*m)/x,b=k,w=S):(T=Tr(e),b=T.x+(~y[0].indexOf("%")?b/100*T.width:b),w=T.y+(~(y[1]||y[0]).indexOf("%")?w/100*T.height:w)),n||n!==!1&&o.smooth?(m=b-d,g=w-c,o.xOffset=f+(m*p+g*u)-m,o.yOffset=h+(m*v+g*_)-g):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=w,o.smooth=!!n,o.origin=t,o.originIsAbsolute=!!i,e.style[Te]="0px 0px",l&&(it(l,o,"xOrigin",d,b),it(l,o,"yOrigin",c,w),it(l,o,"xOffset",f,o.xOffset),it(l,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",b+" "+w)},ss=function(e,t){var i=e._gsap||new dr(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,r=i.scaleX<0,l="px",o="deg",a=getComputedStyle(e),d=Pe(e,Te)||"0",c,f,h,p,v,u,_,m,g,y,b,w,T,x,k,S,C,E,A,$,R,B,H,j,ue,Le,M,L,P,N,O,I;return c=f=h=u=_=m=g=y=b=0,p=v=1,i.svg=!!(e.getCTM&&Sr(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(n[re]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[re]!=="none"?a[re]:"")),n.scale=n.rotate=n.translate="none"),x=Bi(e,i.svg),i.svg&&(i.uncache?(ue=e.getBBox(),d=i.xOrigin-ue.x+"px "+(i.yOrigin-ue.y)+"px",j=""):j=!t&&e.getAttribute("data-svg-origin"),gi(e,j||d,!!j||i.originIsAbsolute,i.smooth!==!1,x)),w=i.xOrigin||0,T=i.yOrigin||0,x!==ts&&(E=x[0],A=x[1],$=x[2],R=x[3],c=B=x[4],f=H=x[5],x.length===6?(p=Math.sqrt(E*E+A*A),v=Math.sqrt(R*R+$*$),u=E||A?kt(A,E)*ft:0,g=$||R?kt($,R)*ft+u:0,g&&(v*=Math.abs(Math.cos(g*Pt))),i.svg&&(c-=w-(w*E+T*$),f-=T-(w*A+T*R))):(I=x[6],N=x[7],M=x[8],L=x[9],P=x[10],O=x[11],c=x[12],f=x[13],h=x[14],k=kt(I,P),_=k*ft,k&&(S=Math.cos(-k),C=Math.sin(-k),j=B*S+M*C,ue=H*S+L*C,Le=I*S+P*C,M=B*-C+M*S,L=H*-C+L*S,P=I*-C+P*S,O=N*-C+O*S,B=j,H=ue,I=Le),k=kt(-$,P),m=k*ft,k&&(S=Math.cos(-k),C=Math.sin(-k),j=E*S-M*C,ue=A*S-L*C,Le=$*S-P*C,O=R*C+O*S,E=j,A=ue,$=Le),k=kt(A,E),u=k*ft,k&&(S=Math.cos(k),C=Math.sin(k),j=E*S+A*C,ue=B*S+H*C,A=A*S-E*C,H=H*S-B*C,E=j,B=ue),_&&Math.abs(_)+Math.abs(u)>359.9&&(_=u=0,m=180-m),p=ae(Math.sqrt(E*E+A*A+$*$)),v=ae(Math.sqrt(H*H+I*I)),k=kt(B,H),g=Math.abs(k)>2e-4?k*ft:0,b=O?1/(O<0?-O:O):0),i.svg&&(j=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Cr(Pe(e,re)),j&&e.setAttribute("transform",j))),Math.abs(g)>90&&Math.abs(g)<270&&(r?(p*=-1,g+=u<=0?180:-180,u+=u<=0?180:-180):(v*=-1,g+=g<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+l,i.y=f-((i.yPercent=f&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-f)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+l,i.z=h+l,i.scaleX=ae(p),i.scaleY=ae(v),i.rotation=ae(u)+o,i.rotationX=ae(_)+o,i.rotationY=ae(m)+o,i.skewX=g+o,i.skewY=y+o,i.transformPerspective=b+l,(i.zOrigin=parseFloat(d.split(" ")[2])||!t&&i.zOrigin||0)&&(n[Te]=Es(d)),i.xOffset=i.yOffset=0,i.force3D=$e.force3D,i.renderTransform=i.svg?ro:kr?Mr:no,i.uncache=0,i},Es=function(e){return(e=e.split(" "))[0]+" "+e[1]},Vs=function(e,t,i){var n=me(t);return ae(parseFloat(t)+parseFloat(at(e,"x",i+"px",n)))+n},no=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Mr(e,t)},ut="0deg",Bt="0px",ht=") ",Mr=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,l=i.x,o=i.y,a=i.z,d=i.rotation,c=i.rotationY,f=i.rotationX,h=i.skewX,p=i.skewY,v=i.scaleX,u=i.scaleY,_=i.transformPerspective,m=i.force3D,g=i.target,y=i.zOrigin,b="",w=m==="auto"&&e&&e!==1||m===!0;if(y&&(f!==ut||c!==ut)){var T=parseFloat(c)*Pt,x=Math.sin(T),k=Math.cos(T),S;T=parseFloat(f)*Pt,S=Math.cos(T),l=Vs(g,l,x*S*-y),o=Vs(g,o,-Math.sin(T)*-y),a=Vs(g,a,k*S*-y+y)}_!==Bt&&(b+="perspective("+_+ht),(n||r)&&(b+="translate("+n+"%, "+r+"%) "),(w||l!==Bt||o!==Bt||a!==Bt)&&(b+=a!==Bt||w?"translate3d("+l+", "+o+", "+a+") ":"translate("+l+", "+o+ht),d!==ut&&(b+="rotate("+d+ht),c!==ut&&(b+="rotateY("+c+ht),f!==ut&&(b+="rotateX("+f+ht),(h!==ut||p!==ut)&&(b+="skew("+h+", "+p+ht),(v!==1||u!==1)&&(b+="scale("+v+", "+u+ht),g.style[re]=b||"translate(0, 0)"},ro=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,l=i.x,o=i.y,a=i.rotation,d=i.skewX,c=i.skewY,f=i.scaleX,h=i.scaleY,p=i.target,v=i.xOrigin,u=i.yOrigin,_=i.xOffset,m=i.yOffset,g=i.forceCSS,y=parseFloat(l),b=parseFloat(o),w,T,x,k,S;a=parseFloat(a),d=parseFloat(d),c=parseFloat(c),c&&(c=parseFloat(c),d+=c,a+=c),a||d?(a*=Pt,d*=Pt,w=Math.cos(a)*f,T=Math.sin(a)*f,x=Math.sin(a-d)*-h,k=Math.cos(a-d)*h,d&&(c*=Pt,S=Math.tan(d-c),S=Math.sqrt(1+S*S),x*=S,k*=S,c&&(S=Math.tan(c),S=Math.sqrt(1+S*S),w*=S,T*=S)),w=ae(w),T=ae(T),x=ae(x),k=ae(k)):(w=f,k=h,T=x=0),(y&&!~(l+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(y=at(p,"x",l,"px"),b=at(p,"y",o,"px")),(v||u||_||m)&&(y=ae(y+v-(v*w+u*x)+_),b=ae(b+u-(v*T+u*k)+m)),(n||r)&&(S=p.getBBox(),y=ae(y+n/100*S.width),b=ae(b+r/100*S.height)),S="matrix("+w+","+T+","+x+","+k+","+y+","+b+")",p.setAttribute("transform",S),g&&(p.style[re]=S)},lo=function(e,t,i,n,r){var l=360,o=pe(r),a=parseFloat(r)*(o&&~r.indexOf("rad")?ft:1),d=a-n,c=n+d+"deg",f,h;return o&&(f=r.split("_")[1],f==="short"&&(d%=l,d!==d%(l/2)&&(d+=d<0?l:-l)),f==="cw"&&d<0?d=(d+l*en)%l-~~(d/l)*l:f==="ccw"&&d>0&&(d=(d-l*en)%l-~~(d/l)*l)),e._pt=h=new ke(e._pt,t,i,n,d,Gl),h.e=c,h.u="deg",e._props.push(i),h},an=function(e,t){for(var i in t)e[i]=t[i];return e},oo=function(e,t,i){var n=an({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",l=i.style,o,a,d,c,f,h,p,v;n.svg?(d=i.getAttribute("transform"),i.setAttribute("transform",""),l[re]=t,o=ss(i,1),ot(i,re),i.setAttribute("transform",d)):(d=getComputedStyle(i)[re],l[re]=t,o=ss(i,1),l[re]=d);for(a in Ze)d=n[a],c=o[a],d!==c&&r.indexOf(a)<0&&(p=me(d),v=me(c),f=p!==v?at(i,a,d,v):parseFloat(d),h=parseFloat(c),e._pt=new ke(e._pt,o,a,f,h-f,yi),e._pt.u=v||0,e._props.push(a));an(o,n)};xe("padding,margin,Width,Radius",function(s,e){var t="Top",i="Right",n="Bottom",r="Left",l=(e<3?[t,i,n,r]:[t+r,t+i,n+i,n+r]).map(function(o){return e<2?s+o:"border"+o+s});Ms[e>1?"border"+s:s]=function(o,a,d,c,f){var h,p;if(arguments.length<4)return h=l.map(function(v){return Ue(o,v,d)}),p=h.join(" "),p.split(h[0]).length===5?h[0]:p;h=(c+"").split(" "),p={},l.forEach(function(v,u){return p[v]=h[u]=h[u]||h[(u-1)/2|0]}),o.init(a,p,f)}});var Er={name:"css",register:mi,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,r){var l=this._props,o=e.style,a=i.vars.startAt,d,c,f,h,p,v,u,_,m,g,y,b,w,T,x,k,S;Ri||mi(),this.styles=this.styles||xr(e),k=this.styles.props,this.tween=i;for(u in t)if(u!=="autoRound"&&(c=t[u],!(Me[u]&&ur(u,t,i,n,e,r)))){if(p=typeof c,v=Ms[u],p==="function"&&(c=c.call(i,n,e,r),p=typeof c),p==="string"&&~c.indexOf("random(")&&(c=Xt(c)),v)v(this,e,u,c,i)&&(x=1);else if(u.substr(0,2)==="--")d=(getComputedStyle(e).getPropertyValue(u)+"").trim(),c+="",rt.lastIndex=0,rt.test(d)||(_=me(d),m=me(c),m?_!==m&&(d=at(e,u,d,m)+m):_&&(c+=_)),this.add(o,"setProperty",d,c,n,r,0,0,u),l.push(u),k.push(u,0,o[u]);else if(p!=="undefined"){if(a&&u in a?(d=typeof a[u]=="function"?a[u].call(i,n,e,r):a[u],pe(d)&&~d.indexOf("random(")&&(d=Xt(d)),me(d+"")||d==="auto"||(d+=$e.units[u]||me(Ue(e,u))||""),(d+"").charAt(1)==="="&&(d=Ue(e,u))):d=Ue(e,u),h=parseFloat(d),g=p==="string"&&c.charAt(1)==="="&&c.substr(0,2),g&&(c=c.substr(2)),f=parseFloat(c),u in Ve&&(u==="autoAlpha"&&(h===1&&Ue(e,"visibility")==="hidden"&&f&&(h=0),k.push("visibility",0,o.visibility),it(this,o,"visibility",h?"inherit":"hidden",f?"inherit":"hidden",!f)),u!=="scale"&&u!=="transform"&&(u=Ve[u],~u.indexOf(",")&&(u=u.split(",")[0]))),y=u in Ze,y){if(this.styles.save(u),S=c,p==="string"&&c.substring(0,6)==="var(--"){if(c=Pe(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=c,c=Pe(e,"perspective"),C?e.style.perspective=C:ot(e,"perspective")}f=parseFloat(c)}if(b||(w=e._gsap,w.renderTransform&&!t.parseTransform||ss(e,t.parseTransform),T=t.smoothOrigin!==!1&&w.smooth,b=this._pt=new ke(this._pt,o,re,0,1,w.renderTransform,w,0,-1),b.dep=1),u==="scale")this._pt=new ke(this._pt,w,"scaleY",w.scaleY,(g?Et(w.scaleY,g+f):f)-w.scaleY||0,yi),this._pt.u=0,l.push("scaleY",u),u+="X";else if(u==="transformOrigin"){k.push(Te,0,o[Te]),c=so(c),w.svg?gi(e,c,0,T,0,this):(m=parseFloat(c.split(" ")[2])||0,m!==w.zOrigin&&it(this,w,"zOrigin",w.zOrigin,m),it(this,o,u,Es(d),Es(c)));continue}else if(u==="svgOrigin"){gi(e,c,1,T,0,this);continue}else if(u in Lr){lo(this,w,u,h,g?Et(h,g+c):c);continue}else if(u==="smoothOrigin"){it(this,w,"smooth",w.smooth,c);continue}else if(u==="force3D"){w[u]=c;continue}else if(u==="transform"){oo(this,c,e);continue}}else u in o||(u=Ft(u)||u);if(y||(f||f===0)&&(h||h===0)&&!Hl.test(c)&&u in o)_=(d+"").substr((h+"").length),f||(f=0),m=me(c)||(u in $e.units?$e.units[u]:_),_!==m&&(h=at(e,u,d,m)),this._pt=new ke(this._pt,y?w:o,u,h,(g?Et(h,g+f):f)-h,!y&&(m==="px"||u==="zIndex")&&t.autoRound!==!1?zl:yi),this._pt.u=m||0,y&&S!==c?(this._pt.b=d,this._pt.e=S,this._pt.r=jl):_!==m&&m!=="%"&&(this._pt.b=d,this._pt.r=Wl);else if(u in o)to.call(this,e,u,d,g?g+c:c);else if(u in e)this.add(e,u,d||e[u],g?g+c:c,n,r);else if(u!=="parseTransform"){Li(u,c);continue}y||(u in o?k.push(u,0,o[u]):typeof e[u]=="function"?k.push(u,2,e[u]()):k.push(u,1,d||e[u])),l.push(u)}}x&&vr(this)},render:function(e,t){if(t.tween._time||!Ii())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Ue,aliases:Ve,getSetter:function(e,t,i){var n=Ve[t];return n&&n.indexOf(",")<0&&(t=n),t in Ze&&t!==Te&&(e._gsap.x||Ue(e,"x"))?i&&Ji===i?t==="scale"?Ul:Ql:(Ji=i||{})&&(t==="scale"?Kl:Zl):e.style&&!ki(e.style[t])?Vl:~t.indexOf("-")?Yl:Oi(e,t)},core:{_removeProperty:ot,_getMatrix:Bi}};Se.utils.checkPrefix=Ft;Se.core.getStyleSaver=xr;(function(s,e,t,i){var n=xe(s+","+e+","+t,function(r){Ze[r]=1});xe(e,function(r){$e.units[r]="deg",Lr[r]=1}),Ve[n[13]]=s+","+e,xe(i,function(r){var l=r.split(":");Ve[l[1]]=n[l[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");xe("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){$e.units[s]="px"});Se.registerPlugin(Er);var D=Se.registerPlugin(Er)||Se;D.core.Tween;const ao=["C5","D5","E5","F5","G5","A5","B5"],cn=[{id:"do",solfege:"Do",low:"C4",high:"C5"},{id:"re",solfege:"Re",low:"D4",high:"D5"},{id:"mi",solfege:"Mi",low:"E4",high:"E5"},{id:"fa",solfege:"Fa",low:"F4",high:"F5"},{id:"sol",solfege:"Sol",low:"G4",high:"G5"},{id:"la",solfege:"La",low:"A4",high:"A5"},{id:"si",solfege:"Si",low:"B4",high:"B5"}];function co(s,e){const t=s.audio._webAudio;if(!t||!s.audio.unlocked)return;const i=s.audio._masterGain;if(!i)return;const r={C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77}[e];if(!r)return;const l=t.currentTime,o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(r,l);const a=t.createOscillator();a.type="sine",a.frequency.setValueAtTime(r*2,l);const d=t.createOscillator();d.type="sine",d.frequency.setValueAtTime(r*3,l);const c=t.createGain();c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(.55,l+.01),c.gain.exponentialRampToValueAtTime(1e-4,l+.8);const f=t.createGain();f.gain.value=.15;const h=t.createGain();h.gain.value=.05,o.connect(c).connect(i),a.connect(f).connect(c),d.connect(h).connect(c);const p=l+.85;o.start(l),o.stop(p),a.start(l),a.stop(p),d.start(l),d.stop(p)}function uo(s,e){try{s.audio.playNote(e)}catch{}}function os(s,e,t){t?co(s,e):uo(s,e)}function dn(s,e,t){const n={C4:{white:["C4","D4","E4","F4","G4","A4","B4"],black:[["C#4",0],["D#4",1],["F#4",3],["G#4",4],["A#4",5]]},C5:{white:["C5","D5","E5","F5","G5","A5","B5"],black:[["C#5",0],["D#5",1],["F#5",3],["G#5",4],["A#5",5]]}}[e],r=38,l=130,o=24,a=80,d=n.white.length*r,c=document.createElementNS(SVG_NS,"svg");return c.setAttribute("viewBox",`0 0 ${d} ${l+8}`),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.classList.add("level10-keys-svg"),n.white.forEach((f,h)=>{const p=h*r,v=document.createElementNS(SVG_NS,"rect");if(v.setAttribute("x",p),v.setAttribute("y",0),v.setAttribute("width",r-1),v.setAttribute("height",l),v.setAttribute("rx",4),v.setAttribute("class","level10-white-key"),v.setAttribute("data-pitch",f),v.setAttribute("fill","#fffaf0"),v.setAttribute("stroke",t),v.setAttribute("stroke-width","1.5"),c.appendChild(v),n.black.some(([u,_])=>_===h)){const u=p+r-o/2,_=document.createElementNS(SVG_NS,"rect");_.setAttribute("x",u),_.setAttribute("y",0),_.setAttribute("width",o),_.setAttribute("height",a),_.setAttribute("rx",3),_.setAttribute("class","level10-black-key"),_.setAttribute("fill","#1a1a2a"),c.appendChild(_)}}),s.appendChild(c),c}function ho(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=10);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Gr(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level10-stage"></div>');const n=s.stage.querySelector(".level10-stage"),r=document.createElement("div");r.className="level10-hud",r.innerHTML=`
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
  `,n.appendChild(o);const a=document.createElement("button");a.className="level10-preview",a.id="level10-preview",a.innerHTML="🔁 听一次",a.title="再听一次",n.appendChild(a);const d=document.createElement("div");d.className="level10-keyboard";const c=document.createElement("div");c.className="level10-keyboard__row level10-keyboard__row--low",c.innerHTML='<div class="level10-keyboard__row-label">LOW</div>',dn(c,"C4","#e76f51");const f=document.createElement("div");f.className="level10-keyboard__row level10-keyboard__row--high",f.innerHTML='<div class="level10-keyboard__row-label">HIGH</div>',dn(f,"C5","#5fa8b5"),d.appendChild(f),d.appendChild(c),n.appendChild(d),s._level10Total=8,s._level10Done=0,s._level10Current=null,s._level10Answering=!1,s._level10Wrong=0,s._level10Timestamps=[],s._level10Streak=0,s._level10BestStreak=0;function h(y,b){d.querySelectorAll(".level10-key-glow").forEach(k=>k.remove());const w=y?f:c,T=w.querySelector(`[data-pitch="${b}"]`);if(!T)return;const x=document.createElementNS(SVG_NS,"rect");x.setAttribute("class","level10-key-glow"),x.setAttribute("x",T.getAttribute("x")),x.setAttribute("y",T.getAttribute("y")),x.setAttribute("width",T.getAttribute("width")),x.setAttribute("height",T.getAttribute("height")),x.setAttribute("rx",T.getAttribute("rx")||4),x.setAttribute("fill",y?"rgba(95,168,181,0.55)":"rgba(231,111,81,0.55)"),w.querySelector("svg").insertBefore(x,w.querySelector("svg").firstChild),setTimeout(()=>{try{x.remove()}catch{}},1800)}function p(){if(s._level10Done>=s._level10Total)return g();s._level10Answering=!1;const y=cn[Math.floor(Math.random()*cn.length)],b=Math.random()<.5;s._level10Current={noteId:y.id,solfege:y.solfege,isHigh:b,pitch:b?y.high:y.low},r.querySelector(".level10-done").textContent=String(s._level10Done),r.querySelector(".level10-question").textContent=`🎧 第 ${s._level10Done+1} 题 — ${y.solfege} 来自哪里?`;const w=n.querySelector("#level10-fish");D.fromTo(w,{y:-20,opacity:0},{y:0,opacity:1,duration:.4,ease:"back.out(1.7)"}),setTimeout(()=>{os(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0},500)}function v(y){if(!s._level10Answering)return;const b=s._level10Current;if(!b)return;s._level10Answering=!1;const w=b.isHigh===y,T=n.querySelector("#level10-fish"),x=n.querySelector(y?".level10-region--high":".level10-region--low");if(w){s._level10Done++;try{s.audio.correct()}catch{}s._level10Streak++,s._level10Streak>s._level10BestStreak&&(s._level10BestStreak=s._level10Streak);const k=T.getBoundingClientRect(),S=x.getBoundingClientRect(),C=S.left+S.width/2-(k.left+k.width/2),E=S.top+S.height/2-(k.top+k.height/2);if(D.to(T,{x:C,y:E,scale:.7,duration:.5,ease:"back.out(1.5)",onComplete:()=>{try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`${b.solfege} ${b.isHigh?"↑":"↓"} ✓`)}catch{}h(b.isHigh,b.pitch),s.say(`${b.solfege} ${b.isHigh?"高八度":"低八度"}, 对啦! 🎉`)}}),s._level10Streak>=2)try{const A=`x${s._level10Streak}${s._level10Streak>=5?" 🔥":""}`;s._floatScore(window.innerWidth/2,window.innerHeight*.32,A)}catch{}s._level10Streak>=2&&(m.textContent=String(s._level10Streak),_.hidden=!1,_.classList.remove("streak-bump"),_.offsetWidth,_.classList.add("streak-bump")),setTimeout(()=>p(),1500)}else{s.wrongCount++,s._level10Wrong++;try{s.audio.wrong()}catch{}x.classList.add("shake"),setTimeout(()=>x.classList.remove("shake"),400),D.to(T,{x:0,y:0,rotation:"+=12",duration:.15,yoyo:!0,repeat:3}),D.to(T,{rotation:0,duration:.3});const k=b.isHigh?"高":"低";if(s.say(`不对哟~ 这是${k}八度 ${b.solfege}, 再听一次?`),s._level10Streak>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.32,`断啦 💔 (最佳 x${s._level10BestStreak})`)}catch{}s._level10Streak=0,_.hidden=!0,_.classList.remove("streak-bump"),setTimeout(()=>{os(s,b.pitch,b.isHigh),s._level10Answering=!0},800)}}n.querySelectorAll(".level10-region").forEach(y=>{y.addEventListener("click",()=>{const b=y.dataset.region;v(b==="high")})});const u=n.querySelector("#level10-preview"),_=n.querySelector("#level10-streak"),m=_.querySelector(".level10-streak__num");u.addEventListener("click",()=>{s._level10Current&&(os(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0,u.classList.remove("flash"),u.offsetWidth,u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),600))}),[c,f].forEach(y=>{y.querySelectorAll("[data-pitch]").forEach(b=>{b.style.cursor="pointer",b.addEventListener("click",()=>{const w=b.getAttribute("data-pitch"),T=ao.includes(w);os(s,w,T)})})}),s.say("听一听: Do 来自低八度还是高八度? 选对的地方放鱼~"),setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),setTimeout(()=>p(),700);function g(){const y=s.wrongCount||0,b=y<=0?3:y<=2?2:y<=5?1:0;try{s.progress.markLevelComplete(10,b)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{s._flashScreen()}catch{}try{const w=s._level10BestStreak>=2?` (最佳连击 x${s._level10BestStreak})`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 八度完成!${w}`)}catch{}s.say("八度都听出来了! 耳朵升级了~"),setTimeout(()=>{try{s.showWinOverlay(b,10)}catch{}},1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level10-stage").forEach(y=>y.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const fo=Object.freeze(Object.defineProperty({__proto__:null,default:ho},Symbol.toStringTag,{value:"Module"}));class po{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level11-background";let t="";for(let n=0;n<28;n++){const r=Math.random()*100,l=Math.random()*100,o=2+Math.random()*4,a=Math.random()*4;t+=`<circle class="level11-dot" cx="${r}%" cy="${l}%" r="${o}"
                          style="animation-delay: ${a}s" />`}let i="";for(let n=0;n<6;n++){const r=8+Math.random()*84,l=8+Math.random()*80,o=16+Math.random()*14,a=Math.random()*5;i+=`<g class="level11-heart" transform="translate(${r}, ${l}) scale(${o/30})"
                          style="animation-delay: ${a}s">
        <path d="M0,-2 C-6,-10 -16,-10 -16,0 C-16,8 -8,16 0,22 C8,16 16,8 16,0 C16,-10 6,-10 0,-2 Z"
              fill="rgba(255,182,193,0.55)" />
      </g>`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
        ${t}
        ${i}

        <!-- 标题 -->
        <text x="400" y="58" text-anchor="middle" class="level11-title">🎴 翻牌记忆 🎴</text>
        <text x="400" y="88" text-anchor="middle" class="level11-subtitle">找两个一样的音符朋友</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const _o=[{id:"do",solfege:"Do",pitch:"C4",color:"#e63946",emoji:"🍎"},{id:"re",solfege:"Re",pitch:"D4",color:"#f4a261",emoji:"🍊"},{id:"mi",solfege:"Mi",pitch:"E4",color:"#ffc971",emoji:"🍋"},{id:"fa",solfege:"Fa",pitch:"F4",color:"#b5c99a",emoji:"🥝"}];function yo(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[{f:1567.98,delay:0,dur:.32,peak:.45},{f:2093,delay:.04,dur:.32,peak:.35}].forEach(({f:n,delay:r,dur:l,peak:o})=>{const a=t+r,d=e.createOscillator();d.type="sine",d.frequency.setValueAtTime(n,a);const c=e.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(o,a+.008),c.gain.exponentialRampToValueAtTime(1e-4,a+l),d.connect(c).connect(s._masterGain),d.start(a),d.stop(a+l+.05)})}catch{}}function vo(s,e,t,i="#ffd166"){for(let r=0;r<8;r++){const l=r/8*Math.PI*2+Math.random()*.4,o=60+Math.random()*30,a=Math.cos(l)*o,d=Math.sin(l)*o,c=document.createElement("span");c.className="level11-sparkle",c.style.left=`${e}px`,c.style.top=`${t}px`,c.style.setProperty("--dx",`${a}px`),c.style.setProperty("--dy",`${d}px`),c.style.background=i,s.appendChild(c),setTimeout(()=>c.remove(),800)}}function mo(s){const e=s.slice();for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}function go(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=11);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new po(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level11-stage"></div>');const n=s.stage.querySelector(".level11-stage"),r=document.createElement("div");r.className="level11-hud",r.innerHTML=`
    <div class="level11-progress">
      <span class="level11-progress-icon">⭐</span>
      <span class="level11-done">0</span> / 4 对
    </div>
    <div class="level11-timer">⏱ <span class="level11-time">0.0</span>s</div>
  `,n.appendChild(r);const l=document.createElement("div");l.className="level11-time-bar",l.innerHTML='<div class="level11-time-bar__fill" id="level11-time-fill"></div>',n.appendChild(l);const o=l.querySelector("#level11-time-fill"),a=document.createElement("div");a.className="level11-board",n.appendChild(a);const d=[];_o.forEach(_=>{d.push({..._,key:_.id+"_a"}),d.push({..._,key:_.id+"_b"})}),mo(d).forEach(_=>{const m=document.createElement("button");m.className="level11-card",m.dataset.key=_.key,m.dataset.id=_.id,m.dataset.pitch=_.pitch,m.dataset.color=_.color,m.innerHTML=`
      <div class="level11-card__inner">
        <div class="level11-card__face level11-card__back">
          <div class="level11-card__back-pattern">🎵</div>
        </div>
        <div class="level11-card__face level11-card__front"
             style="--card-accent: ${_.color}">
          <div class="level11-card__emoji">${_.emoji}</div>
          <div class="level11-card__name">${_.solfege}</div>
        </div>
      </div>
    `,a.appendChild(m),d.push({el:m,..._})}),s._level11Cards=d,s._level11Flipped=[],s._level11Matched=0,s._level11Locked=!1,s._level11Start=Date.now(),s._level11Tried=0,s._level11Timer=null;const f=r.querySelector(".level11-time"),h=25,p=40;s._level11Timer=setInterval(()=>{if(!s._level11Start)return;const _=(Date.now()-s._level11Start)/1e3;if(f.textContent=_.toFixed(1),o){const m=Math.min(1,_/p);o.style.width=`${m*100}%`,o.classList.remove("warn","danger"),_>=p?o.classList.add("danger"):_>=h&&o.classList.add("warn")}},100);function v(_){if(!s._level11Locked&&!s._level11Flipped.includes(_)&&!_.classList.contains("matched")){_.classList.add("flipped"),s._level11Flipped.push(_);try{s.audio.playNote(_.dataset.pitch)}catch{}if(s._level11Flipped.length===2){s._level11Tried++,s._level11Locked=!0;const[m,g]=s._level11Flipped;m.dataset.id===g.dataset.id?setTimeout(()=>{m.classList.add("matched"),g.classList.add("matched");try{s.audio.correct()}catch{}try{yo(s.audio)}catch{}try{s._flashScreen()}catch{}s._level11Matched++,r.querySelector(".level11-done").textContent=String(s._level11Matched),s.say(`配对! ${m.dataset.id.toUpperCase()} = ${m.dataset.id.toUpperCase()} 🎉`);try{const y=m.getBoundingClientRect();s._floatScore(y.left+y.width/2,y.top,`${m.dataset.id.toUpperCase()} ✓`)}catch{}try{const y=m.getBoundingClientRect(),b=g.getBoundingClientRect(),w=(y.left+y.width/2+b.left+b.width/2)/2,T=(y.top+y.height/2+b.top+b.height/2)/2,x=n.querySelector(".level11-board"),k=x.getBoundingClientRect(),S=m.dataset.color||"#ffd166";vo(x,w-k.left,T-k.top,S)}catch{}setTimeout(()=>{s._level11Flipped=[],s._level11Locked=!1,s._level11Matched>=4&&u()},600)},350):setTimeout(()=>{try{s.audio.wrong()}catch{}m.classList.add("shake"),g.classList.add("shake"),setTimeout(()=>{m.classList.remove("flipped","shake"),g.classList.remove("flipped","shake"),s._level11Flipped=[],s._level11Locked=!1},450)},750)}}}s._level11Cards.forEach(_=>{_.el.addEventListener("click",()=>v(_.el))}),s.say("翻开两张牌 — 一样的就配对! 4 对就赢~"),setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),s._level11Cards.forEach((_,m)=>{D.fromTo(_.el,{y:30,opacity:0},{y:0,opacity:1,duration:.4,delay:m*.05,ease:"back.out(1.7)"})});function u(){s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null);const _=(Date.now()-s._level11Start)/1e3,m=s._level11Tried;let g;_<=18&&m<=5?g=3:_<=30&&m<=7?g=2:_<=50?g=1:g=0;try{s.progress.markLevelComplete(11,g)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎉 ${_.toFixed(1)}s 完成!`)}catch{}s.say(`🎉 用时 ${_.toFixed(1)}s, 翻 ${m} 次, 你真厉害!`),setTimeout(()=>{try{s.showWinOverlay(g,11)}catch{}},1300)}return()=>{if(s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level11-stage").forEach(_=>_.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const bo=Object.freeze(Object.defineProperty({__proto__:null,default:go},Symbol.toStringTag,{value:"Module"}));class wo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level12-background";let t="";const i=["🍅","🧅","🥕","🥒","🌽","🍅","🧄"];for(let r=0;r<10;r++){const l=Math.random()*100,o=Math.random()*100,a=22+Math.random()*22,d=Math.random()*5,c=i[r%i.length];t+=`<g class="level12-veggie" transform="translate(${l}%, ${o}%) scale(${a/30})"
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
           xmlns="${ye}">
        ${t}
        ${n}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level12-title">🥁 番茄节奏 🥁</text>
        <text x="400" y="80" text-anchor="middle" class="level12-subtitle">跟着摆杆切菜~</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const un=12,as=35,xo=.15,ko=.3;function To(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=12);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new wo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level12-stage"></div>');const n=s.stage.querySelector(".level12-stage"),r=document.createElement("div");r.className="level12-hud",r.innerHTML=`
    <div class="level12-stats">
      <div class="level12-stat">
        <span class="level12-stat__icon">🥁</span>
        <span class="level12-hits">0</span> / ${un}
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
  `,n.appendChild(o);const a=document.createElement("div");a.className="level12-combo",a.id="level12-combo",a.hidden=!0,a.innerHTML='<span class="level12-combo__num">0</span><span class="level12-combo__x">x combo</span>',n.appendChild(a);const d=a.querySelector(".level12-combo__num"),c=document.createElement("div");c.className="level12-message",c.textContent="🔪 摆杆到中间时点切!",n.appendChild(c),s._level12Hits=0,s._level12TotalCuts=0,s._level12BPM=60,s._level12Phase=0,s._level12Dir=1,s._level12Running=!1,s._level12Tween=null,s._level12Done=!1,s._level12Combo=0,s._level12BestCombo=0,s._level12Score=0;function f(y){return y<=60?1:y>=140?2:1+(y-60)/80*1}const h=r.querySelector(".level12-hits"),p=r.querySelector(".level12-bpm"),v=r.querySelector(".level12-acc");function u(y){s._level12Tween&&(D.killTweensOf(s._level12Tween),s._level12Tween=null);const b=60/y,w=D.to({},{duration:b,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const T=w.progress(),x=-as+T*2*as,k=l.querySelector(".level12-pendulum");k&&(k.style.transform=`rotate(${x}deg)`),s._level12Phase=(x+as)/(2*as),s._level12Dir=x>0?1:-1},onRepeat:()=>{try{const T=s.audio._webAudio;if(T&&s.audio.unlocked){const x=T.currentTime,k=T.createOscillator();k.type="square",k.frequency.setValueAtTime(2400,x);const S=T.createGain();S.gain.setValueAtTime(1e-4,x),S.gain.exponentialRampToValueAtTime(.06,x+.005),S.gain.exponentialRampToValueAtTime(1e-4,x+.04),k.connect(S).connect(s.audio._masterGain),k.start(x),k.stop(x+.05)}}catch{}}});s._level12Tween=w}function _(){const y=Math.abs(s._level12Phase-.5);let b;y<=xo?b="perfect":y<=ko?b="good":b="miss",s._level12TotalCuts++;const w=n.querySelector("#level12-hit-ring");if(w&&(w.classList.remove("hit-perfect","hit-good","hit-miss"),w.offsetWidth,w.classList.add(`hit-${b}`),setTimeout(()=>w.classList.remove(`hit-${b}`),600)),b==="miss"){s.wrongCount++;try{s.audio.wrong()}catch{}if(c.textContent=["差一点!","再稳点~","跟住摆杆!"][Math.floor(Math.random()*3)],D.fromTo(o,{x:0},{x:8,duration:.06,yoyo:!0,repeat:5}),s._level12Combo>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`断啦 💔 (最佳 x${s._level12BestCombo})`)}catch{}s._level12Combo=0,a.hidden=!0,a.classList.remove("combo-flash"),o.classList.remove("combo-glow")}else{s._level12Hits++;try{s.audio.correct()}catch{}try{s._level12Hits%2===0&&(s._level12BPM=Math.min(140,s._level12BPM+8),p.textContent=String(s._level12BPM),u(s._level12BPM))}catch{}const x=b==="perfect"?10:5;s._level12Combo++,s._level12Combo>s._level12BestCombo&&(s._level12BestCombo=s._level12Combo);const k=1+Math.min(s._level12Combo-1,9)*.1,S=f(s._level12BPM),C=Math.round(x*S*k);s._level12Score+=C;try{const E=k>1||S>1.05?`+${C}  (x${S.toFixed(1)}×x${k.toFixed(1)})`:`+${C}`;s._floatScore(window.innerWidth/2,window.innerHeight*.36,E)}catch{}s._level12Combo>=2&&(d.textContent=String(s._level12Combo),a.hidden=!1,a.classList.remove("combo-flash"),a.offsetWidth,a.classList.add("combo-flash"),o.classList.add("combo-glow")),c.textContent=b==="perfect"?"完美! 🎯":"不错! ✨",D.fromTo(o,{scale:1},{scale:.85,duration:.1,yoyo:!0,repeat:1,ease:"power2.out"})}h.textContent=String(s._level12Hits);const T=s._level12TotalCuts>0?Math.round(s._level12Hits/s._level12TotalCuts*100)+"%":"—";v.textContent=T,s._level12Hits>=un&&!s._level12Done&&(s._level12Done=!0,setTimeout(()=>g(),500))}o.addEventListener("click",()=>{s._level12Done||_()});const m=y=>{s._level12Done||(y.code==="Space"||y.key===" ")&&(y.preventDefault(),_())};window.addEventListener("keydown",m),u(s._level12BPM),s._level12Running=!0,setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),s.say('看摆杆 — 摆到中间时"切"! 按得快又准就是节奏高手~');function g(){s._level12Tween&&(D.killTweensOf(s._level12Tween),s._level12Tween=null);const y=s._level12TotalCuts>0?s._level12Hits/s._level12TotalCuts:0;let b;y>=.85?b=3:y>=.65?b=2:y>=.4?b=1:b=0;try{s.progress.markLevelComplete(12,b)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{const w=s._level12BestCombo>=2?` 连击 x${s._level12BestCombo}`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎵 ${s._level12Score} 分 (命中 ${Math.round(y*100)}%)${w}`)}catch{}s.say(`完美收尾! 命中 ${Math.round(y*100)}% — 你有节奏感! 🎵`),setTimeout(()=>{try{s.showWinOverlay(b,12)}catch{}},1300)}return()=>{if(s._level12Tween){try{D.killTweensOf(s._level12Tween)}catch{}s._level12Tween=null}if(window.removeEventListener("keydown",m),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level12-stage").forEach(y=>y.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const So=Object.freeze(Object.defineProperty({__proto__:null,default:To},Symbol.toStringTag,{value:"Module"}));class Lo{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level13-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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

        <!-- Drum below -->
        <ellipse cx="400" cy="380" rx="80" ry="20" fill="rgba(0,0,0,0.3)" />
        <ellipse cx="400" cy="375" rx="70" ry="18" fill="#5d3a1a" />
        <ellipse cx="400" cy="370" rx="65" ry="15" fill="#8b4513" />
        <text x="400" y="375" text-anchor="middle" font-family="ZCOOL KuaiLe" font-size="20" font-weight="900" fill="white">敲!</text>

        <!-- BPM counter -->
        <text x="400" y="450" text-anchor="middle" font-family="Nunito" font-size="14" font-weight="700" fill="white">♩= <tspan id="bpm-count">80</tspan> BPM</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}function Co(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=13);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Lo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level13-stage"></div>');const n=s.stage.querySelector(".level13-stage"),r=document.createElement("div");r.className="level13-hud",r.innerHTML=`
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
  `,n.appendChild(r);const l=r.querySelector(".level13-hits"),o=r.querySelector(".level13-misses"),a=r.querySelector(".level13-bpm"),d=s.stage.querySelector(".level13-metronome"),c=s.stage.querySelector('ellipse[cx="400"][cy="380"]');let f=80,h=0,p=0,v=0,u=!1;const _=Date.now();let m=Date.now()+1e3;function g(){const k=Date.now()-_;if(k>15e3){const C=Math.min((k-15e3)/1e4,1);return Math.round(130+C*50)}if(k>8e3){const C=Math.min((k-8e3)/7e3,1);return Math.round(100+C*30)}const S=Math.min(k/8e3,1);return Math.round(80+S*20)}function y(){if(u)return;f=g(),a.textContent=String(f);const k=s.stage.querySelector("#bpm-count");k&&(k.textContent=String(f)),d&&(d.style.transition="transform 0.08s linear",d.style.transform="rotate(-25deg)",setTimeout(()=>{d&&(d.style.transform="rotate(25deg)")},100),setTimeout(()=>{d&&(d.style.transform="rotate(0)")},200));const S=6e4/f;m=Date.now()+S,setTimeout(y,S)}setTimeout(y,1e3);function b(){if(u)return;const k=Date.now(),S=Math.abs(k-m),C=6e4/f/3,E=C*2;if(S<C){h++,v++;try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}c&&c.parentNode&&D.fromTo(c,{scale:1},{scale:.95,duration:.05,yoyo:!0,repeat:1,transformOrigin:"400px 380px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 完美 ⭐")}catch{}}else if(S<E){h++;try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ✨")}catch{}}else{p++;try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}l.textContent=String(h),o.textContent=String(p),h+p>=30&&(u=!0,setTimeout(()=>x(),600))}c&&c.parentNode&&(c.style.cursor="pointer",c.style.pointerEvents="all",c.addEventListener("pointerdown",k=>{k.preventDefault(),k.stopPropagation(),b()}));const w=document.createElement("div");w.className="level13-tap-zone",w.addEventListener("pointerdown",k=>{k.preventDefault(),b()}),s.stage.appendChild(w);const T=k=>{u||(k.code==="Space"||k.key===" ")&&(k.preventDefault(),b())};window.addEventListener("keydown",T),s.say("跟着拍子敲鼓! 速度会逐渐变快 — 完美一击拿星 ⭐"),setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60);function x(){u=!0;let k;v>=30?k=3:v>=24?k=2:v>=18?k=1:k=0;try{s.progress.markLevelComplete(13,k)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}const S=h+p,C=S>0?Math.round(h/S*100):0;try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 完美 ${v} 次 (命中 ${C}%)`)}catch{}s.say(`完美 ${v} 次 — 你是节奏大师! 🎵`),setTimeout(()=>{try{s.showWinOverlay(k,13)}catch{}},1300)}return()=>{if(u=!0,window.removeEventListener("keydown",T),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&(s.stage.querySelectorAll(".level13-stage").forEach(k=>k.remove()),s.stage.querySelectorAll(".level13-tap-zone").forEach(k=>k.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Mo=Object.freeze(Object.defineProperty({__proto__:null,default:Co},Symbol.toStringTag,{value:"Module"}));class Eo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level14-background";let t="";for(let n=0;n<50;n++){const r=Math.random()*100,l=Math.random()*100,o=1+Math.random()*2.5,a=Math.random()*4;t+=`<circle class="level14-star" cx="${r}%" cy="${l}%" r="${o}"
                            style="animation-delay: ${a}s" />`}const i=`
      <g class="level14-moon">
        <circle cx="680" cy="90" r="46" fill="#fff8dc" />
        <circle cx="696" cy="76" r="42" fill="url(#l14Grad)" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const $t=80,Lt=220,bs=48,qt=130,cs=12,ds=8,Ao=7*$t,Po=[{id:"do#",pitch:"C#4",note:"C#",solfege:"Di",x:80},{id:"re#",pitch:"D#4",note:"D#",solfege:"Ri",x:160},{id:"fa#",pitch:"F#4",note:"F#",solfege:"Fi",x:320},{id:"sol#",pitch:"G#4",note:"G#",solfege:"Si",x:400},{id:"la#",pitch:"A#4",note:"A#",solfege:"Li",x:480}];function $o(s){return`M ${s} 0
          H ${s+$t}
          V ${Lt-cs}
          Q ${s+$t} ${Lt} ${s+$t-cs} ${Lt}
          H ${s+cs}
          Q ${s} ${Lt} ${s} ${Lt-cs}
          Z`}function Do(s){return`M ${s} 0
          H ${s+bs}
          V ${qt-ds}
          Q ${s+bs} ${qt} ${s+bs-ds} ${qt}
          H ${s+ds}
          Q ${s} ${qt} ${s} ${qt-ds}
          Z`}const hn="touch-action: none; -webkit-user-select: none; user-select: none;";class bt{constructor(e,t){this.root=e,this.notes=t,this.svg=null,this._rawOnPress=null,this._lastKeyTapTime=0,Object.defineProperty(this,"onPress",{configurable:!0,enumerable:!0,get:()=>this._rawOnPress?i=>{if(typeof this._rawOnPress!="function")return;const n=Date.now();if(!(n-this._lastKeyTapTime<250)){this._lastKeyTapTime=n;try{this._rawOnPress(i)}catch(r){console.warn(r)}}}:null,set:i=>{this._rawOnPress=i}}),this.render()}render(){const e=document.createElement("div");e.className="keyboard-area stage__kb-area";let t="";this.notes.forEach((i,n)=>{const r=n*$t,l=r+$t/2,o=$o(r);t+=`
        <g class="key key--white" data-pitch="${i.pitch}" data-id="${i.id}" style="${hn}">
          <path class="key__shape" d="${o}"
                fill="#fdfbf5" stroke="#d8d2c0" stroke-width="1.2" stroke-linejoin="round"/>
          <text class="key__label" x="${l}" y="184" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="18" font-weight="800" fill="#3d405b"
                style="pointer-events: none;">${i.note}</text>
          <text class="key__label" x="${l}" y="206" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="14" font-weight="500" fill="#6b7280"
                style="pointer-events: none;">${i.solfege}</text>
        </g>
      `}),Po.forEach(i=>{const n=i.x-bs/2,r=Do(n);t+=`
        <g class="key key--black" data-pitch="${i.pitch}" data-id="${i.id}" style="${hn}">
          <path class="key__shape" d="${r}"
                fill="#1f1d1a" stroke="#000000" stroke-width="0.8" stroke-linejoin="round"/>
        </g>
      `}),e.innerHTML=`
      <svg class="keyboard" xmlns="${ye}"
           viewBox="0 0 ${Ao} ${Lt}"
           preserveAspectRatio="xMidYMid meet"
           aria-label="钢琴键盘(C4-B4)">
        ${t}
      </svg>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.bindEvents()}bindEvents(){this.svg.querySelectorAll(".key").forEach(t=>{const i=t.querySelector(".key__shape"),n=i&&i.getAttribute("fill")||"",l=t.classList.contains("key--black")?"#5a4f2a":"#ffd166",o=()=>{t.classList.add("pressed"),i&&i.setAttribute("fill",l)},a=()=>{t.classList.remove("pressed"),i&&i.setAttribute("fill",n)};t.addEventListener("pointerdown",d=>{d.preventDefault(),o();try{t.setPointerCapture(d.pointerId)}catch{}typeof this.onPress=="function"&&this.onPress(t)}),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("pointerleave",a),t.addEventListener("click",d=>d.preventDefault())})}glowKey(e){if(!e)return;e.classList.add("glow");const t=e.querySelector(".key__shape");t&&typeof t.animate=="function"&&t.animate([{filter:"drop-shadow(0 0 0px rgba(255, 209, 102, 0.95))"},{filter:"drop-shadow(0 0 18px rgba(255, 209, 102, 0.7))"},{filter:"drop-shadow(0 0 28px rgba(255, 209, 102, 0))"}],{duration:600,easing:"ease-out",fill:"forwards"}),setTimeout(()=>e.classList.remove("glow"),700)}glowAll(){Array.from(this.svg.querySelectorAll(".key--white")).forEach((t,i)=>{setTimeout(()=>this.glowKey(t),i*200)})}markPlaced(e,t){if(!this.svg)return;const i=this.svg.querySelector(`.key--white[data-id="${e}"]`);if(!i||i.querySelector(".kb-placed-dot"))return;const n=i.getBBox?i.getBBox():{x:0,y:0,width:80},r=n.x+n.width/2,l=n.y+18,o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("class","kb-placed-dot"),o.setAttribute("cx",r),o.setAttribute("cy",l),o.setAttribute("r","10"),o.setAttribute("fill",t),o.setAttribute("stroke","white"),o.setAttribute("stroke-width","2"),i.appendChild(o)}resetMarks(){this.svg&&this.svg.querySelectorAll(".kb-placed-dot").forEach(e=>e.remove())}}const Ys=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Qs=[{name:"C 大三和弦",solfege:"Do  -  Mi  -  Sol",ids:["do","mi","sol"],color:"#e63946"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#b5c99a"},{name:"G 大三和弦",solfege:"Sol -  Si  -  Re",ids:["sol","si","re"],color:"#457b9d"},{name:"a 小三和弦",solfege:"La  -  Do  -  Mi",ids:["la","do","mi"],color:"#6a4c93"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#ffc971"}];function Oo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=14);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Eo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level14-stage"></div>');const n=s.stage.querySelector(".level14-stage"),r=document.createElement("div");r.className="level14-hud",r.innerHTML=`
    <div class="level14-stat">
      <span class="level14-stat__icon">🎶</span>
      <span class="level14-done">0</span> / 5 和弦
    </div>
    <div class="level14-stat">
      <span class="level14-stat__icon">⭐</span>
      <span class="level14-stars">0</span> 完美
    </div>
  `,n.appendChild(r);const l=r.querySelector(".level14-done"),o=r.querySelector(".level14-stars"),a=document.createElement("div");a.className="level14-card",a.innerHTML=`
    <div class="level14-card__name">C 大三和弦</div>
    <div class="level14-card__slots">
      <div class="level14-slot" data-idx="0">🐟</div>
      <div class="level14-slot" data-idx="1">🐟</div>
      <div class="level14-slot" data-idx="2">🐟</div>
    </div>
    <div class="level14-card__solfege">Do  -  Mi  -  Sol</div>
  `,n.appendChild(a);const d=a.querySelector(".level14-card__name"),c=a.querySelector(".level14-card__solfege"),f=a.querySelectorAll(".level14-slot");s.kb=new bt(s.stage,Ys),s._level14Idx=0,s._level14Perfect=0,s._level14Step=0,s._level14Done=!1,s._level14Failed=!1;function h(_){const m=Qs[_];d.textContent=m.name,d.style.background=`linear-gradient(135deg, ${m.color}, #fff8dc)`,d.style.webkitBackgroundClip="text",d.style.backgroundClip="text",d.style.color="transparent",c.textContent=m.solfege,f.forEach((g,y)=>{g.classList.remove("lit","placed","incorrect"),g.textContent=y===0?"🐟":"❓"})}function p(){s._level14Step=0,s._level14Failed=!1,f.forEach((_,m)=>{_.classList.remove("lit","placed","incorrect"),_.textContent=m===0?"🐟":"❓"})}function v(_,m,g){f[_].textContent=m,f[_].classList.add(g),setTimeout(()=>f[_].classList.remove(g),350)}s.kb.onPress=_=>{if(s._level14Done)return;const m=Qs[s._level14Idx],g=m.ids[s._level14Step],y=_.dataset.id,b=Ys.find(w=>w.id===y);try{s.kb.glowKey(_)}catch{}if(y===g){try{s.audio.correct()}catch{}try{s.audio.playNote(b.pitch)}catch{}if(s._level14Step===0)v(0,b.solfege,"placed"),f[0].style.color=m.color;else{v(s._level14Step,b.solfege,"placed"),f[s._level14Step].style.color=m.color;const w=s._level14Step+1;w<f.length&&(f[w].textContent="🐟")}if(s._level14Step++,s._level14Step>=3){s._level14Failed||(s._level14Perfect++,o.textContent=String(s._level14Perfect)),s._level14Idx++,l.textContent=String(s._level14Idx);try{s.audio.playScale(m.ids.map(w=>Ys.find(T=>T.id===w).pitch))}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.36,"+1 ⭐")}catch{}s._level14Idx>=Qs.length?(s._level14Done=!0,setTimeout(()=>u(),700)):setTimeout(()=>{h(s._level14Idx),p()},800)}}else{try{s.audio.wrong()}catch{}try{s.audio.playNote(b.pitch)}catch{}s._level14Failed=!0,s.wrongCount++,f.forEach(w=>{w.classList.add("incorrect")}),s.say(`错啦 — 应该是 ${m.solfege.split(/-+/).map(w=>w.trim()).filter(Boolean).join(" → ")}, 再来一次~`),setTimeout(()=>{p()},700)}},h(0),p(),s.say("看和弦卡 — 三条小鱼的顺序! 按钢琴键组成和弦~");function u(){const _=s._level14Perfect;let m;_>=5?m=3:_>=4?m=2:_>=3?m=1:m=0;try{s.progress.markLevelComplete(14,m)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 完美 ${_} / 5 和弦`)}catch{}s.say(`和弦大师! ${_} 个和弦完美完成 🎵`),setTimeout(()=>{try{s.showWinOverlay(m,14)}catch{}},1300)}return setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level14-stage").forEach(_=>_.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const No=Object.freeze(Object.defineProperty({__proto__:null,default:Oo},Symbol.toStringTag,{value:"Module"}));class Ro{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level15-background";const t=`
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
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Ht=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],us=6,Io=3500,Fo=1500,Bo={do:175,re:150,mi:120,fa:105,sol:90,la:65,si:45},Fe=30;function qo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=15);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Ro(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level15-staff-area"></div>');const n=s.stage.querySelector(".level15-staff-area");n.innerHTML=`
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
  `;const r=n.querySelector(".level15-current-note"),l=n.querySelector(".level15-stem");s.stage.insertAdjacentHTML("beforeend",`
    <div class="level15-metronome">
      <span class="level15-metronome-label">速度</span>
      <span class="level15-metronome-bpm" id="level15-bpm">1.0x</span>
      <span class="level15-metronome-combo" id="level15-combo"></span>
    </div>
  `),s.kb=new bt(s.stage,Ht);const o={value:1};s._level15Idx=0,s._level15Correct=0,s._level15Accepting=!0,s._level15Done=!1,s._level15ConsecRight=0,s._level15ConsecWrong=0,s._level15Easy=!1;function a(){return Ht[Math.floor(Math.random()*Ht.length)]}function d(m,g){o.value=m;const y=document.getElementById("level15-bpm");y&&(y.textContent=g||`${m.toFixed(1)}x`)}function c(){return Math.max(Fo,Math.round(Io/o.value))}function f(){if(s._level15Done||s._level15Idx>=us)return;const m=a(),g=Bo[m.id];if(!r||!l)return;const y=n.querySelector(".level15-note-grp");if(!y)return;y.setAttribute("transform",`translate(400, ${g})`),r.dataset.pitch=m.pitch,r.dataset.id=m.id,r.classList.remove("incorrect"),r.style.opacity="1",r.setAttribute("fill","#ffd166"),s.say(`下一个: ${m.solfege}`),s._level15Accepting=!0;const b=c(),w=Date.now(),T=setTimeout(()=>{!s._level15Done&&s._level15Accepting&&h()},b);s._level15FallTimer=T,s._level15FallStart=w,s._level15FallDur=b}function h(){s._level15Accepting=!1,s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,p();try{s.audio.wrong()}catch{}s.say("漏拍啦 — 看下一个音符~"),r&&r.classList.add("incorrect"),s._level15FallTimer&&clearTimeout(s._level15FallTimer),setTimeout(()=>{r&&r.classList.remove("incorrect"),s._level15Idx++,s._level15Idx>=us?u():f()},500)}function p(){if(!s._level15Easy&&s._level15ConsecWrong>=3){s._level15Easy=!0,d(1,"1.0x 轻松");try{s.say("进入轻松模式 — 慢慢来!")}catch{}}}function v(){if(o.value>=1.5)return;const m=Math.min(1.5,+(o.value+.1).toFixed(1));d(m);const g=document.getElementById("level15-combo");g&&(g.textContent=`连对 ${s._level15ConsecRight} → 加速!`)}s.kb.onPress=m=>{if(!s._level15Accepting||s._level15Done)return;const g=m.dataset.pitch,y=m.dataset.id,b=r?r.dataset.pitch:null,w=r?r.dataset.id:null;try{s.kb.glowKey(m)}catch{}if(g===b){s._level15Accepting=!1,s._level15Correct++,s._level15ConsecRight++,s._level15ConsecWrong=0,s._level15FallTimer&&clearTimeout(s._level15FallTimer);try{s.audio.correct()}catch{}try{s.audio.playNote(g)}catch{}r&&(r.style.opacity="0");const T=["完美!","棒!","眼睛真快!","看谱高手!"];s.say(T[Math.min(s._level15Correct-1,T.length-1)]),s._level15ConsecRight>=3&&!s._level15Easy&&v(),s._level15Idx++,setTimeout(()=>{s._level15Idx>=us?u():f()},350)}else{s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,p();try{s.audio.wrong()}catch{}try{s.audio.playNote(g)}catch{}const T=Ht.find(k=>k.id===y);s.say(`这是 ${T?T.solfege:"?"}, 不是 ${Ht.find(k=>k.id===w).solfege}. 再看谱!`),r&&r.classList.add("incorrect");const x=r;setTimeout(()=>{x&&x.classList.remove("incorrect")},350)}};function u(){s._level15Done||(s._level15Done=!0,setTimeout(()=>_(),600))}d(1,"1.0x"),setTimeout(f,800),s.say("看 5 线谱上的音符 — 按对应的钢琴键, 越对越快!");function _(){const m=s._level15Correct;let g;m>=5?g=3:m>=4?g=2:m>=3?g=1:g=0;try{s.progress.markLevelComplete(15,g)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 看谱对了 ${m} / ${us}`)}catch{}s.say(`视奏大师! 6 音对了 ${m} 个 🎼`),setTimeout(()=>{try{s.showWinOverlay(g,15)}catch{}},1300)}return setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),()=>{if(s._level15FallTimer&&(clearTimeout(s._level15FallTimer),s._level15FallTimer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&(s.stage.querySelectorAll(".level15-staff-area").forEach(m=>m.remove()),s.stage.querySelectorAll(".level15-metronome").forEach(m=>m.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ho=Object.freeze(Object.defineProperty({__proto__:null,default:qo},Symbol.toStringTag,{value:"Module"}));class Go{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level16-background";let t="";for(let n=0;n<20;n++){const r=Math.random()*100,l=Math.random()*100,o=6+Math.random()*12,a=Math.random()*5,d=4+Math.random()*4;t+=`<circle class="level16-particle" cx="${r}%" cy="${l}%" r="${o}"
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
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const hs=8,fs=60,fn=10,Wo=6,pn=3;function jo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=16);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Go(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level16-stage"></div>');const n=s.stage.querySelector(".level16-stage"),r=document.createElement("div");r.className="level16-hud",r.innerHTML=`
    <div class="level16-stat">
      <span class="level16-stat__icon">🎯</span>
      轮 <span class="level16-round">1</span> / ${hs}
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⏱</span>
      <span class="level16-bpm">${fs}</span> BPM
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
      <ellipse cx="100" cy="155" rx="74" ry="18" fill="#8b4513" stroke="#5d3a1a" stroke-width="2" />
      <text class="level16-drum-text" x="100" y="160" text-anchor="middle"
            font-family="ZCOOL KuaiLe" font-size="22" font-weight="900" fill="#fff8dc">🥁 敲!</text>
    </svg>
  `,n.appendChild(c);const f=c.querySelector("svg"),h=f?f.querySelector('ellipse[cx="100"][cy="155"]'):null,p=f?f.querySelector("text"):null,v=document.createElement("div");v.className="level16-meter",v.innerHTML=`
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
  `,n.appendChild(v);const u=document.createElement("div");u.className="level16-ladder";let _="";for(let S=0;S<hs;S++){const C=fs+fn*S;_+=`
      <div class="level16-rung ${S===0?"active":""}" data-bpm="${C}">
        <span class="level16-rung__num">第 ${S+1} 轮</span>
        <span class="level16-rung__bpm">${C} BPM</span>
      </div>
    `}u.innerHTML=`
    <div class="level16-ladder__title">速度阶梯</div>
    ${_}
  `,n.appendChild(u);const m=u.querySelectorAll(".level16-rung");s._level16Round=0,s._level16Bpm=fs,s._level16RoundHits=0,s._level16RoundTaps=0,s._level16Combo=0,s._level16PerfectRounds=0,s._level16Done=!1,s._level16Phase=0,s._level16Tween=null,s._level16PendingTickAt=null,s._level16RunningRound=!1,s._level16Timer=null,s._level16RoundStartAt=0;function g(S){s._level16Tween&&(D.killTweensOf(s._level16Tween),s._level16Tween=null);const C=60/S,E=30,A=D.to({},{duration:C,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const R=A.progress(),B=-E+R*2*E,H=v.querySelector(".level16-pendulum");H&&(H.style.transform=`rotate(${B}deg)`),s._level16Phase=(B+E)/(2*E)},onRepeat:()=>{const R=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+R/2}}),$=6e4/S;s._level16PendingTickAt=Date.now()+$/2,s._level16Tween=A}function y(){const S=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+S/2}function b(){if(s._level16Done||!s._level16RunningRound)return;const S=Date.now();6e4/s._level16Bpm;const C=s._level16Phase,E=Math.abs(C-.5);let A;E<=.15?A="perfect":E<=.3?A="good":A="miss",s._level16PendingTickAt||y(),Math.abs(S-s._level16PendingTickAt),s._level16RoundTaps++;const $=document.getElementById("level16-hit-ring");if($&&($.classList.remove("hit-perfect","hit-good","hit-miss"),$.offsetWidth,A==="perfect"?$.classList.add("hit-perfect"):A==="good"?$.classList.add("hit-good"):$.classList.add("hit-miss"),setTimeout(()=>$.classList.remove("hit-perfect","hit-good","hit-miss"),500)),A==="perfect"){s._level16RoundHits++,s._level16Combo++,d.textContent=String(s._level16PerfectRounds),a.textContent=String(s._level16Combo);try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}h&&D.fromTo(h,{scale:1},{scale:.92,duration:.05,yoyo:!0,repeat:1,transformOrigin:"100px 155px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ⭐")}catch{}}else if(A==="good"){try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+0 ✨")}catch{}}else{s._level16Combo=0,a.textContent="0";try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}y(),s._level16RoundTaps>=Wo&&T()}function w(){s._level16RoundHits=0,s._level16RoundTaps=0,s._level16RunningRound=!0,y(),l.textContent=String(s._level16Round+1),o.textContent=String(s._level16Bpm),m.forEach((S,C)=>S.classList.toggle("active",C===s._level16Round)),s.say(`第 ${s._level16Round+1} 轮 — ${s._level16Bpm} BPM!`)}function T(){if(s._level16RunningRound=!1,s._level16RoundHits>=pn&&s._level16PerfectRounds++,d.textContent=String(s._level16PerfectRounds),p&&(p.textContent=s._level16RoundHits>=pn?"🎉":"💪",setTimeout(()=>{p&&(p.textContent="🥁 敲!")},800)),s._level16Round++,s._level16Round>=hs){s._level16Done=!0,s._level16Tween&&(D.killTweensOf(s._level16Tween),s._level16Tween=null),setTimeout(()=>k(),800);return}s._level16Bpm=fs+fn*s._level16Round,o.textContent=String(s._level16Bpm),g(s._level16Bpm),setTimeout(w,1500)}g(s._level16Bpm),w(),f&&(f.style.cursor="pointer",f.addEventListener("pointerdown",S=>{S.preventDefault(),S.stopPropagation(),b()}));const x=S=>{s._level16Done||(S.code==="Space"||S.key===" ")&&(S.preventDefault(),b())};window.addEventListener("keydown",x),s.say("看摆杆 — 摆到中间时敲鼓! 越爬越快 ⏱"),setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60);function k(){let S;const C=s._level16PerfectRounds;C>=8?S=3:C>=7?S=2:C>=5?S=1:S=0;try{s.progress.markLevelComplete(16,S)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 ${hs} 轮, ${C} 完美轮`)}catch{}s.say(`爬到顶啦! ${C} 轮完美 🎵🚀`),setTimeout(()=>{try{s.showWinOverlay(S,16)}catch{}},1300)}return()=>{if(s._level16Tween){try{D.killTweensOf(s._level16Tween)}catch{}s._level16Tween=null}if(window.removeEventListener("keydown",x),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level16-stage").forEach(S=>S.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const zo=Object.freeze(Object.defineProperty({__proto__:null,default:jo},Symbol.toStringTag,{value:"Module"}));function Vo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=2),s._startLevel2();const e=s.stage;e.insertAdjacentHTML("beforeend",`
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
      ${[1,2,3,4,5].map(g=>`<span class="level2-prog-dot" data-i="${g}"></span>`).join("")}
    </div>
  `);function t(){const g=e.querySelectorAll(".level2-prog-dot"),y=s._level2Done?s._level2Done.size:0;g.forEach((b,w)=>{w<y?b.classList.add("filled"):b.classList.remove("filled")})}function i(g){if(!g)return;const y=g.getBoundingClientRect(),b=e.getBoundingClientRect(),w=y.left-b.left+y.width/2,T=y.top-b.top,x=document.createElement("div");x.className="level2-correct-bubble",x.textContent="✨ 答对啦! ✨",x.style.left=w+"px",x.style.top=T-36+"px",e.appendChild(x),setTimeout(()=>x.remove(),1400);for(let k=0;k<6;k++){const S=document.createElement("div");S.className="level2-sparkle",S.style.left=w+(Math.random()-.5)*70+"px",S.style.top=T+(Math.random()-.5)*70+"px",S.style.animationDelay=k*.06+"s",e.appendChild(S),setTimeout(()=>S.remove(),1100)}}function n(g,y){const b=document.createElement("div");b.className="level2-big-solfege",y&&b.style.setProperty("--big-solfege-color",y),b.textContent=g,e.appendChild(b),e.classList.add("level2-bg-pulse"),setTimeout(()=>{e.classList.remove("level2-bg-pulse");try{b.remove()}catch{}},1500)}const r={Do:[130.81,261.63,392],Re:[146.83,293.66,440],Mi:[164.81,329.63,493.88],Fa:[174.61,349.23,523.25],Sol:[196,392,587.33],La:[220,440,659.25],Si:[246.94,493.88,739.99]};function l(g){const y=s.audio;if(!y||!y._webAudio||y.muted)return;const b=y._webAudio;try{y._resumeWebAudio&&y._resumeWebAudio()}catch{}const w=r[g]||r.Do,T=b.currentTime+.05;w.forEach((x,k)=>{const S=T+k*.13,C=b.createOscillator();C.type="triangle",C.frequency.setValueAtTime(x,S);const E=b.createGain();E.gain.setValueAtTime(1e-4,S),E.gain.exponentialRampToValueAtTime(.5,S+.02),E.gain.exponentialRampToValueAtTime(1e-4,S+.18),C.connect(E).connect(y._masterGain),C.start(S),C.stop(S+.22),typeof y._trackOsc=="function"&&y._trackOsc(C,S+.22)})}const o=s._markLevel2FishCorrect.bind(s);s._markLevel2FishCorrect=g=>{o(g),t(),i(g);const y=g&&g.dataset?g.dataset.id:null;if(y){const b=a.find(w=>w.id===y);if(b){n(b.solfege,b.color);try{l(b.solfege)}catch{}}}typeof _=="function"&&_()};const a=[{id:"do",pitch:"C4"},{id:"re",pitch:"D4"},{id:"mi",pitch:"E4"},{id:"fa",pitch:"F4"},{id:"sol",pitch:"G4"},{id:"la",pitch:"A4"},{id:"si",pitch:"B4"}],d={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88};function c(g){const y=s.audio;if(!y||!y._webAudio||!y._masterGain||y.muted)return!1;const b=y._webAudio;try{y._resumeWebAudio&&y._resumeWebAudio()}catch{}const w=b.currentTime,T=d[g];if(!T)return!1;const x=b.createOscillator();x.type="triangle",x.frequency.setValueAtTime(T,w);const k=b.createOscillator();k.type="sine",k.frequency.setValueAtTime(T*2,w);const S=b.createOscillator();S.type="sine",S.frequency.setValueAtTime(T*3,w);const C=b.createGain();C.gain.setValueAtTime(1e-4,w),C.gain.exponentialRampToValueAtTime(1,w+.015),C.gain.exponentialRampToValueAtTime(.7,w+.35),C.gain.exponentialRampToValueAtTime(1e-4,w+2.2);const E=b.createGain();E.gain.value=.18;const A=b.createGain();A.gain.value=.06,x.connect(C).connect(y._masterGain),k.connect(E).connect(C),S.connect(A).connect(C);const $=w+2.3;return x.start(w),x.stop($),k.start(w),k.stop($),S.start(w),S.stop($),!0}const f=s._replayQuestion.bind(s);s._replayQuestion=()=>{const g=s.audio,y=s._level2AnswerNote;if(!y)return;const b=a.find(E=>E.id===y);if(!b){f();return}if(!g||!g._webAudio||!g._masterGain){f();return}const w=g._webAudio,T=g._masterGain,x=w.currentTime,k=g.muted?0:.75,S=g.muted?0:1;try{const E=typeof T.gain.value=="number"?T.gain.value:k;T.gain.cancelScheduledValues(x),T.gain.setValueAtTime(E,x),T.gain.linearRampToValueAtTime(S,x+.06),T.gain.linearRampToValueAtTime(k,x+2.5)}catch{}c(b.pitch);const C=document.getElementById("level2-listen-prompt");C&&(C.classList.add("active"),clearTimeout(C._hideTimer),C._hideTimer=setTimeout(()=>C.classList.remove("active"),2500))};function h(){[3,2,1].forEach((y,b)=>{setTimeout(()=>{const w=document.createElement("div");w.className="level2-countdown",w.textContent=String(y),e.appendChild(w),setTimeout(()=>{try{w.remove()}catch{}},720)},b*650)})}const p=s._level2NextQuestion.bind(s);s._level2NextQuestion=()=>{const g=!s._level2AnswerNote;p(),!g&&s._level2AnswerNote&&h()};let v=null;function u(){v&&clearTimeout(v),v=setTimeout(()=>{if(s._level2AnswerNote&&(s._level2Done||new Set).size<(s._level2Total||5))try{s.say("哪条小鱼刚才唱歌了? 点点它 🎵")}catch{}},1e4)}function _(){u()}const m=s._replayQuestion;if(s._replayQuestion=()=>{try{m()}catch{}_()},typeof s._handleLevel2Answer=="function"){const g=s._handleLevel2Answer.bind(s);s._handleLevel2Answer=(y,b)=>{try{g(y,b)}catch{}_()}}return setTimeout(_,1200),t(),()=>{v&&(clearTimeout(v),v=null),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const g=document.getElementById("hud-level2");g&&(g.style.display="");const y=document.querySelector(".hud__dots");y&&(y.style.display="none");const b=document.getElementById("btn-replay");b&&(b.style.display="none");const w=document.getElementById("level2-listen-prompt");w&&w.remove();const T=document.getElementById("level2-progress-dots");T&&T.remove(),e.querySelectorAll(".level2-correct-bubble, .level2-sparkle, .level2-countdown").forEach(x=>x.remove())}}const Yo=Object.freeze(Object.defineProperty({__proto__:null,default:Vo},Symbol.toStringTag,{value:"Module"}));class Qo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level3-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
        <!-- 太阳 (右上角) -->
        <circle cx="650" cy="100" r="55" class="level3-sun" />

        <!-- 飞鸟剪影 (远景点缀) -->
        <path class="level3-bird" d="M120,90 q6,-6 12,0 q6,-6 12,0" />
        <path class="level3-bird" d="M260,60 q5,-5 10,0 q5,-5 10,0" />
        <path class="level3-bird" d="M460,75 q5,-5 10,0 q5,-5 10,0" />

        <!-- 远山 3 层 -->
        <path class="level3-mountain level3-mountain-far"
              d="M0,300 L150,150 L250,220 L380,80 L500,200 L640,140 L800,250 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-mid"
              d="M0,360 L100,260 L220,300 L350,200 L480,290 L620,240 L800,310 L800,500 L0,500 Z" />
        <path class="level3-mountain level3-mountain-near"
              d="M0,420 L80,360 L210,380 L350,310 L490,370 L640,340 L800,400 L800,500 L0,500 Z" />

        <!-- 河 -->
        <path class="level3-river" d="M0,440 Q200,420 400,440 T800,430 L800,500 L0,500 Z" />

        <!-- 3 个音阶台 (从低到高) — 顶部色块 + 平台身色提示 (Do 红, Mi 黄, Sol 蓝) -->
        <g class="level3-platforms">
          <!-- Do (低) -->
          <g class="level3-platform" data-note="do">
            <ellipse cx="180" cy="370" rx="60" ry="10" class="level3-platform-base" />
            <rect x="160" y="320" width="40" height="50" class="level3-platform-body level3-platform-body--do" />
            <rect x="155" y="316" width="50" height="8" class="level3-platform-top level3-platform-top--do" />
            <!-- 色块提示 (贴在平台身内) -->
            <rect x="170" y="328" width="20" height="3" rx="1.5" class="level3-platform-hint level3-platform-hint--do" />
            <text x="180" y="350" text-anchor="middle" class="level3-platform-label">Do</text>
          </g>

          <!-- Mi (中) -->
          <g class="level3-platform" data-note="mi">
            <ellipse cx="400" cy="280" rx="60" ry="10" class="level3-platform-base" />
            <rect x="380" y="220" width="40" height="60" class="level3-platform-body level3-platform-body--mi" />
            <rect x="375" y="216" width="50" height="8" class="level3-platform-top level3-platform-top--mi" />
            <rect x="390" y="228" width="20" height="3" rx="1.5" class="level3-platform-hint level3-platform-hint--mi" />
            <text x="400" y="255" text-anchor="middle" class="level3-platform-label">Mi</text>
          </g>

          <!-- Sol (高) -->
          <g class="level3-platform" data-note="sol">
            <ellipse cx="620" cy="180" rx="60" ry="10" class="level3-platform-base" />
            <rect x="600" y="110" width="40" height="70" class="level3-platform-body level3-platform-body--sol" />
            <rect x="595" y="106" width="50" height="8" class="level3-platform-top level3-platform-top--sol" />
            <rect x="610" y="118" width="20" height="3" rx="1.5" class="level3-platform-hint level3-platform-hint--sol" />
            <text x="620" y="150" text-anchor="middle" class="level3-platform-label">Sol</text>
          </g>
        </g>

        <!-- 浮动手势符号 (柯尔文 do 立掌) -->
        <g class="level3-hand-gesture">
          <text x="400" y="50" text-anchor="middle" class="level3-hand-text">&#9995;</text>
        </g>
      </svg>

      <!-- 日落渐变遮罩 — 由 .progress-N 控制颜色 (初始 .progress-0) -->
      <div class="level3-sunset-overlay level3-progress-0"></div>

      <!-- 答对粒子绽放层 (DOM 注入由 Level3.js 触发) -->
      <div class="level3-bloom-layer"></div>
    `,this.stage.appendChild(e),this.background=e}setProgress(e){if(!this.background)return;const t=this.background.querySelector(".level3-sunset-overlay");t&&(t.classList.remove("level3-progress-0","level3-progress-1","level3-progress-2","level3-progress-3"),t.classList.add(`level3-progress-${Math.min(Math.max(e,0),3)}`))}bloomAt(e,t,i="#ffd166"){if(!this.background)return;const n=this.background.querySelector(".level3-bloom-layer");if(!n)return;const r=this.background.getBoundingClientRect(),l=e-r.left,o=t-r.top,a=12;for(let d=0;d<a;d++){const c=document.createElement("div");c.className="level3-bloom-sparkle",c.style.left=l+"px",c.style.top=o+"px",c.style.background=i;const f=Math.PI*2*d/a,h=60+Math.random()*40;c.style.setProperty("--bx",Math.cos(f)*h+"px"),c.style.setProperty("--by",Math.sin(f)*h+"px"),c.style.animationDelay=(Math.random()*.08).toFixed(2)+"s",n.appendChild(c),setTimeout(()=>{try{c.remove()}catch{}},1100)}}shakePlatforms(){if(!this.background)return;this.background.querySelectorAll(".level3-platform").forEach(t=>{t.classList.remove("level3-shake"),t.offsetWidth,t.classList.add("level3-shake"),setTimeout(()=>t.classList.remove("level3-shake"),500)})}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const _n={do:{main:"M2,36 L24,18 L20,30 L20,42 L24,54 Z",stripes:"M10,30 L16,24 M10,42 L16,48"},re:{main:"M2,36 Q22,18 24,36 Q22,54 2,36 Z",stripes:"M8,30 Q14,28 18,32 M8,42 Q14,44 18,40"},mi:{main:"M2,36 L26,20 L26,52 Z",stripes:"M8,32 L22,28 M8,40 L22,44"},fa:{main:"M2,36 Q8,30 14,34 Q20,28 24,36 Q20,44 14,38 Q8,42 2,36 Z",stripes:"M6,36 Q10,34 14,36 M14,36 Q18,34 22,36"},sol:{main:"M2,36 L18,28 L22,34 L26,28 L26,44 L22,40 L18,46 Z",stripes:"M10,34 L16,32 M10,38 L16,40"},la:{main:"M2,36 L24,24 L20,32 L24,40 L2,36 Z M8,28 L18,28 M8,36 L18,36 M8,44 L18,44",stripes:"M4,30 L10,30 M4,36 L10,36 M4,42 L10,42"},si:{main:"M2,36 Q12,28 18,36 Q24,44 2,36 Q12,30 8,38 Z",stripes:"M6,34 L14,34 M6,38 L14,38"}},yn={do:{front:{rx:5.5,ry:6,pupil:2.5},back:{rx:4,ry:4.5,pupil:1.8},extra:"eyelashes"},re:{front:{rx:6,ry:6.5,pupil:3},back:{rx:4.5,ry:5,pupil:2.2},extra:"round"},mi:{front:{rx:5.5,ry:3.5,pupil:2.4},back:{rx:4,ry:2.5,pupil:1.8},extra:"narrow"},fa:{front:{rx:5.5,ry:.5,pupil:0},back:{rx:4,ry:.4,pupil:0},extra:"closed"},sol:{front:{rx:5.5,ry:4,pupil:2.2},back:{rx:4,ry:3,pupil:1.6},extra:"squint"},la:{front:{rx:7,ry:8,pupil:3.2},back:{rx:5,ry:5.5,pupil:2.4},extra:"surprised"},si:{front:{rx:5.5,ry:3,pupil:2.4},back:{rx:4,ry:2,pupil:1.8},extra:"cool"}},Uo={do:2,re:1,mi:2,fa:1,sol:3,la:2,si:1},Ko={do:"bow",mi:"hat",sol:"crown",la:"earring"};function Zo(s){return function(){let e=s+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}class Xo{constructor(e){this.note=e;const t=document.createElement("div");return t.className="fish",t.dataset.id=e.id,t.dataset.pitch=e.pitch,t.dataset.color=e.color,t.style.cssText=["width: 96px","height: 72px","touch-action: manipulation","-webkit-user-select: none","user-select: none","-webkit-tap-highlight-color: transparent"].join(";"),this.el=t,this.render(),t}render(){const{id:e,color:t,solfege:i,pitch:n}=this.note,r=(e||"do").toLowerCase(),l=(Math.random()*30-15).toFixed(1),o=(.85+Math.random()*.3).toFixed(2),a=(Math.random()*2).toFixed(2),d=Math.random()>.4,c=(1.5+Math.random()*1.5).toFixed(1),f=(.4+Math.random()*.35).toFixed(2),h=(X,te)=>{const ce=(X||"#999").replace("#","").match(/.{2}/g);if(!ce)return X;const[se,Be,xt]=ce.map(dt=>parseInt(dt,16)),Xe=dt=>{const Is=te<0?0:255,ns=Math.abs(te)/100;return Math.round((Is-dt)*ns+dt).toString(16).padStart(2,"0")};return`#${Xe(se)}${Xe(Be)}${Xe(xt)}`},p=Math.floor(Math.random()*3),v=(8+Math.random()*8).toFixed(0),u={r:0,g:0,b:0};p===0?(u.r=+v,u.g=+Math.floor(v/2)):p===1?(u.b=+v,u.g=+Math.floor(v/2)):(u.r=+Math.floor(v/2),u.g=+Math.floor(v/2),u.b=+Math.floor(v/2));const _=(t||"#999999").replace("#","").match(/.{2}/g);let m=t;if(_){const[X,te,ce]=_.map(se=>parseInt(se,16));m="#"+[X+u.r,te+u.g,ce+u.b].map(se=>Math.max(0,Math.min(255,se)).toString(16).padStart(2,"0")).join("")}const g=h(m,-25),y=h(m,22),b=Math.random()>.5?2:1,w=Array.from({length:b}).map((X,te)=>{const ce=(1.5+Math.random()*1.2).toFixed(1),se=-6-te*5,Be=32+(te%2===0?0:6),xt=(2.4+Math.random()*1.6).toFixed(2),Xe=(Math.random()*2).toFixed(2);return`
        <circle cx="${se}" cy="${Be}" r="${ce}" fill="rgba(255,255,255,0.55)">
          <animate attributeName="cy" from="${Be}" to="${Be-18}" dur="${xt}s"
                   begin="${Xe}s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.4;1"
                   dur="${xt}s" begin="${Xe}s" repeatCount="indefinite" />
        </circle>`}).join(""),T=_n[r]?r:"do",x=_n[T],k=`
      <path d="${x.main}"
            style="fill: ${g}; stroke: rgba(0,0,0,0.22); stroke-width: 0.6; stroke-linejoin: round;" />
      <path d="${x.stripes}"
            style="stroke: rgba(0,0,0,0.32); stroke-width: 0.5; stroke-linecap: round; opacity: 0.55;" />`,S=yn[r]?r:"do",C=yn[S],E=68,A=32,$=56,R=32,B=C.extra==="closed"?"":`<animate attributeName="ry"
                 values="${C.front.ry};${C.front.ry};0.4;${C.front.ry};${C.front.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${a}s"
                 repeatCount="indefinite" />`,H=C.extra==="closed"?"":`<animate attributeName="ry"
                 values="${C.back.ry};${C.back.ry};0.3;${C.back.ry};${C.back.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${(parseFloat(a)+.15).toFixed(2)}s"
                 repeatCount="indefinite" />`;let j="";C.extra==="eyelashes"?j=`
        <circle cx="66" cy="38" r="0.6" fill="#1a1a1a" />
        <circle cx="70" cy="38" r="0.6" fill="#1a1a1a" />`:C.extra==="surprised"?j='<ellipse cx="68" cy="44" rx="1.2" ry="0.6" fill="rgba(0,0,0,0.5)" />':C.extra==="cool"?j='<path d="M62,28 L74,28" stroke="rgba(0,0,0,0.65)" stroke-width="0.7" stroke-linecap="round" />':C.extra==="squint"&&(j=`
        <path d="M62,38 Q64,40 66,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />
        <path d="M72,38 Q74,40 76,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />`);const ue=C.extra==="closed"?`<path d="M${E-C.front.rx},${A} Q${E},${A-.6} ${E+C.front.rx},${A}"
             stroke="rgba(0,0,0,0.7)" stroke-width="1.1" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${E}" cy="${A}" rx="${C.front.rx}" ry="${C.front.ry}"
                 fill="white" stroke="rgba(0,0,0,0.6)" stroke-width="0.5">${B}</ellipse>`,Le=C.extra==="closed"?`<path d="M${$-C.back.rx},${R} Q${$},${R-.4} ${$+C.back.rx},${R}"
             stroke="rgba(0,0,0,0.6)" stroke-width="0.9" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${$}" cy="${R}" rx="${C.back.rx}" ry="${C.back.ry}"
                 fill="white" stroke="rgba(0,0,0,0.55)" stroke-width="0.4">${H}</ellipse>`,M=C.extra==="closed"?"":`<circle class="fish-pupil" cx="${E}" cy="${A}" r="${C.front.pupil}" fill="#1a1a1a" />
         <circle cx="${E+1.5}" cy="${A-2}" r="1.3" fill="white" />
         <circle cx="${E-1.5}" cy="${A+1.5}" r="0.6" fill="rgba(255,255,255,0.8)" />`,L=C.extra==="closed"?"":`<circle class="fish-pupil" cx="${$}" cy="${R}" r="${C.back.pupil}" fill="#1a1a1a" />
         <circle cx="${$+1.2}" cy="${R-1.5}" r="0.9" fill="white" />`,P=`
      ${Le}${L}
      ${ue}${M}
      ${j}`,N=Uo[r]||1;let O="";d&&(O=[{x:78,y:10,r:parseFloat(c)},{x:84,y:4,r:parseFloat(c)*.55},{x:88,y:0,r:parseFloat(c)*.32}].slice(0,N).map((ce,se)=>`<circle cx="${ce.x}" cy="${ce.y}" r="${ce.r.toFixed(1)}"
                 fill="rgba(255,255,255,${(.85-se*.12).toFixed(2)})"
                 stroke="rgba(255,255,255,0.5)" stroke-width="0.4" />`).join(""));const I=(e||"do").split("").reduce((X,te)=>X+te.charCodeAt(0),0),q=Zo(I*73+17),F=3+Math.floor(q()*3),W=Array.from({length:F}).map(()=>{const X=(32+q()*36).toFixed(1),te=(30+q()*16).toFixed(1),ce=(.5+q()*.9).toFixed(2),se=parseFloat(X),Be=parseFloat(te);return se>60&&se<72&&Be>28&&Be<36?"":`<circle cx="${X}" cy="${te}" r="${ce}" fill="rgba(0,0,0,0.42)" />`}).join(""),V=(2+Math.random()*1).toFixed(2),Z=(Math.random()*1).toFixed(2),Q=`
      <path d="M40,22 Q34,18 32,24 Q36,26 40,26 Z"
            style="fill: ${y}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 24;-8 40 24;0 40 24;6 40 24;0 40 24"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${V}s" begin="${Z}s" repeatCount="indefinite" />
      </path>`,J=`
      <path d="M40,52 Q34,58 32,52 Q36,50 40,50 Z"
            style="fill: ${g}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round; opacity: 0.9;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 52;6 40 52;0 40 52;-6 40 52;0 40 52"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${V}s" begin="${(parseFloat(Z)+.3).toFixed(2)}s" repeatCount="indefinite" />
      </path>`,le=Ko[r];let G="";const he=(2.4+Math.random()*.8).toFixed(2),ve=(Math.random()*.6).toFixed(2);if(le==="bow")G=`
        <g style="transform-origin: 46px 12px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-6 46 12;4 46 12;-6 46 12"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${he}s" begin="${ve}s" repeatCount="indefinite" />
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
        </g>`;else if(le==="hat")G=`
        <g style="transform-origin: 48px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-3 48 14;3 48 14;-3 48 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${he}s" begin="${ve}s" repeatCount="indefinite" />
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
        </g>`;else if(le==="crown"){const X=(1.6+Math.random()*.6).toFixed(2);G=`
        <g style="transform-origin: 46px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-2 46 14;2 46 14;-2 46 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${he}s" begin="${ve}s" repeatCount="indefinite" />
          <!-- 皇冠底座 -->
          <path d="M38,16 L40,8 L44,12 L46,6 L48,12 L52,8 L54,16 Z"
                style="fill: #ffd700; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 皇冠底部装饰条 -->
          <rect x="38" y="14" width="16" height="2.4" fill="#ffb300" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
          <!-- 中央红宝石 -->
          <circle cx="46" cy="15.2" r="0.9" fill="#e74c3c" stroke="rgba(0,0,0,0.4)" stroke-width="0.25">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${X}s" repeatCount="indefinite" />
          </circle>
          <!-- 左右小宝石 -->
          <circle cx="41" cy="15.4" r="0.6" fill="#3498db" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <circle cx="51" cy="15.4" r="0.6" fill="#2ecc71" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <!-- 高光 -->
          <circle cx="45.3" cy="10.5" r="0.5" fill="rgba(255,255,255,0.85)" />
        </g>`}else le==="earring"&&(G=`
        <g style="transform-origin: 80px 46px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-8 80 46;8 80 46;-8 80 46"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${he}s" begin="${ve}s" repeatCount="indefinite" />
          <!-- 耳环钩 -->
          <circle cx="80" cy="46" r="0.8" fill="none" stroke="rgba(80,80,80,0.85)" stroke-width="0.5" />
          <!-- 珍珠 -->
          <circle cx="80" cy="49.5" r="1.6" fill="#fff8dc" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" />
          <!-- 高光 -->
          <circle cx="79.5" cy="49" r="0.55" fill="rgba(255,255,255,0.95)" />
        </g>`);this.el.innerHTML=`
      <svg xmlns="${ye}" viewBox="0 0 96 72"
           style="display: block; width: 100%; height: 100%; overflow: visible;">
        <g class="fish-body" transform="rotate(${l} 48 36) scale(${o})">

          <!-- 身后小水泡 trail (作为最底层,在身体后面) -->
          ${w}

          ${d?`<!-- 思考泡泡 (${N} 颗,大小也随机) -->
          ${O}`:""}

          <!-- 尾巴 (按 note.id 切换形状) -->
          ${k}

          <!-- 上侧鳍 (有摇摆动画) -->
          ${Q}

          <!-- 下侧鳍 (有摇摆动画) -->
          ${J}

          <!-- 背鳍 (圆角三角帽) -->
          <path d="M36 18 Q44 4 52 18 Z"
                style="fill: ${y}; stroke: rgba(0,0,0,0.18); stroke-width: 0.5; stroke-linejoin: round;" />

          <!-- 身体 (微调过的色) -->
          <ellipse cx="50" cy="38" rx="32" ry="22"
                   style="fill: ${m}; stroke: rgba(0,0,0,0.22); stroke-width: 0.9;" />

          <!-- 肚白高光 (大肚皮) -->
          <ellipse cx="50" cy="50" rx="22" ry="9" fill="rgba(255,255,255,0.42)" />

          <!-- 闪光鳞片 (波浪装饰) -->
          <path d="M40 32 Q44 28 48 32 M52 28 Q56 24 60 28 M62 28 Q66 24 70 28"
                stroke="rgba(255,255,255,0.55)" stroke-width="0.7" fill="none" stroke-linecap="round" />

          <!-- 鳃线 -->
          <path d="M28 32 Q26 40 28 48" fill="none"
                stroke="rgba(0,0,0,0.28)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 雀斑/小点 (基于 note.id 稳定位置) -->
          ${W}

          <!-- 腮红 (粉嫩小圆点,透明度随机) -->
          <ellipse cx="68" cy="46" rx="3" ry="1.6" fill="rgba(255,140,170,${f})" />

          <!-- 嘴巴 (友好微笑) -->
          <path d="M76 44 Q80 47 76 49" fill="none"
                stroke="rgba(0,0,0,0.65)" stroke-width="1" stroke-linecap="round" />

          <!-- 眼睛 (按 note.id 切换表情) -->
          ${P}

          <!-- 配饰 (按 note.id 切换: 蝴蝶结/帽子/皇冠/耳环) -->
          ${G}

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
        </g>
      </svg>
    `}}const Jo=280,ps=50,qe=84,He=64,vn="forest-piano-fishpool-keyframes";function ea(){if(document.getElementById(vn))return;const s=document.createElement("style");s.id=vn,s.textContent=`
    .fish-inner {
      transform-origin: 50% 50%;
      will-change: transform;
      transform: rotate(var(--fish-rot, 0deg)); /* 静态旋转在 inner:视觉倾斜,不影响 hit area */
      width: 100%;
      height: 100%;
      pointer-events: none; /* 事件穿透到 .fish wrapper */
    }
    .fish-inner > * {
      pointer-events: none;
    }
    /* v17.6: 浮动动画放在 wrapper (.fish) 上, 让 hit area 跟随视觉位置
       (原来放 inner, wrapper 不动, 鱼浮起时 hit 区比鱼低 12px → 触屏"模糊") */
    /* v18.2: 把"小浮动"和"呼吸缩放"合并成单一 keyframe, 4s 一循环 */
    @keyframes fishFloat {
      0%, 100% { transform: translateY(0)    scale(1.00); }
      50%      { transform: translateY(-6px) scale(1.03); }
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
  `,document.head.appendChild(s)}class As{constructor(e,t){ea(),this.stage=e,this.notes=t,this.fishes=[],this.onDrop=null,this.onDragStart=null,this.onDragMove=null,this.onTap=null,this._dragEnabled=!0,this._lastHoveredSlot=null,this.TAP_THRESHOLD=12,this._renderPool(),requestAnimationFrame(()=>this._placeFishes())}_renderPool(){const e=document.createElement("div");e.className="fish-pool",e.setAttribute("aria-label","小鱼池"),this.stage.appendChild(e),this.pool=e,this.root=e}_placeFishes(){const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2){requestAnimationFrame(()=>this._placeFishes());return}const t=[...this.notes];for(let h=t.length-1;h>0;h--){const p=Math.floor(Math.random()*(h+1));[t[h],t[p]]=[t[p],t[h]]}const i=ps,n=e.width-ps-qe,r=-18,l=e.height-He,o=56,a=o*o,d=90,c=[];function f(h,p){for(let v=0;v<c.length;v++){const u=c[v],_=u.x-h,m=u.y-p;if(_*_+m*m<a)return!1}return!0}t.forEach(h=>{const p=document.createElement("div");p.className="fish is-floating",p.dataset.id=h.id,p.dataset.color=h.color,p.dataset.solfege=h.solfege,p.dataset.pitch=h.pitch,p.style.touchAction="manipulation",p.style.webkitUserSelect="none",p.style.userSelect="none",p.style.webkitTapHighlightColor="transparent";const v=i+qe/2,u=n-qe/2,_=r+He/2,m=l-He/2,g=Math.max(1,u-v),y=Math.max(1,m-_);let b=0,w=0,T=!1;for(let B=0;B<d;B++){const H=v+Math.random()*g,j=_+Math.random()*y;if(f(H,j)){b=H,w=j,T=!0;break}}if(!T){let B=-1/0,H=v,j=_;for(let ue=0;ue<60;ue++){const Le=v+Math.random()*g,M=_+Math.random()*y;let L=1/0;for(let P=0;P<c.length;P++){const N=c[P],O=N.x-Le,I=N.y-M,q=Math.sqrt(O*O+I*I);q<L&&(L=q)}L>B&&(B=L,H=Le,j=M)}b=H,w=j}const x=b-qe/2,k=w-He/2;p.style.left=`${x}px`,p.style.top=`${k}px`,p.style.width=`${qe}px`,p.style.height=`${He}px`,c.push({x:b,y:w});const S=(Math.random()-.5)*6,C=3.5+Math.random()*1,E=-Math.random()*C;p.style.setProperty("--fish-float-dur",`${C.toFixed(2)}s`),p.style.setProperty("--fish-float-delay",`${E.toFixed(2)}s`);const A=document.createElement("div");A.className="fish-inner",A.style.setProperty("--fish-rot",`${S.toFixed(2)}deg`);let $=null;try{const B=new Xo(h);B&&B.nodeType===1?$=B:$=B?.root||B?.element||B?.svg||null}catch(B){console.warn("[FishPool] Fish creation failed (Agent A 还没就绪?):",B)}$&&$.nodeType===1?A.appendChild($):A.innerHTML=`
          <div style="
            width:100%;height:100%;
            background:${h.color};
            border-radius:50% 60% 55% 50% / 55% 50% 60% 50%;
            display:flex;align-items:center;justify-content:center;
            color:#fff;font-family:'ZCOOL KuaiLe',sans-serif;
            font-size:24px;font-weight:900;
            text-shadow:0 1px 2px rgba(0,0,0,0.35);
            box-shadow:0 6px 0 rgba(0,0,0,0.18), 0 12px 24px rgba(0,0,0,0.2);
          ">${h.solfege}</div>
        `,p.appendChild(A),this.pool.appendChild(p);const R={el:p,inner:A,note:h,originalLeft:x,originalTop:k,rot:S,locked:!1};this.fishes.push(R),this._bindDrag(R)})}_bindDrag(e){const t=e.el;let i=null,n=0,r=0,l=0,o=0,a=0;const d=h=>{if(e.locked)return;const p=Date.now();if(p-(this._lastTapTime||0)<250||(this._lastTapTime=p,this._dragEnabled===!1)||i!==null||h.pointerType==="mouse"&&h.button!==0)return;try{t.setPointerCapture(h.pointerId)}catch{}i=h.pointerId;const v=t.getBoundingClientRect();if(n=h.clientX-v.left,r=h.clientY-v.top,l=h.clientX,o=h.clientY,a=0,t.classList.add("dragging"),t.classList.add("pressing"),e.el.style.animationPlayState="paused",t.style.position="fixed",t.style.left=`${h.clientX-n}px`,t.style.top=`${h.clientY-r}px`,t.style.right="auto",t.style.bottom="auto",t.style.margin="0",t.style.transform="",typeof this.onDragStart=="function")try{this.onDragStart(t)}catch(u){console.warn(u)}},c=h=>{if(i!==h.pointerId)return;h.preventDefault(),t.style.left=`${h.clientX-n}px`,t.style.top=`${h.clientY-r}px`;const p=h.clientX-l,v=h.clientY-o,u=Math.hypot(p,v);if(a=Math.max(a,u),a>this.TAP_THRESHOLD&&t.classList.contains("pressing")&&t.classList.remove("pressing"),typeof this.onDragMove=="function"){const _=document.querySelectorAll(".staff-slot");let m=null,g=1/0;if(_.forEach(y=>{const b=y.getBoundingClientRect(),w=b.left+b.width/2,T=b.top+b.height/2,x=Math.hypot(w-h.clientX,T-h.clientY);x<g&&(g=x,m=y)}),m!==this._lastHoveredSlot){this._lastHoveredSlot=m;try{this.onDragMove(t,m)}catch(y){console.warn(y)}}}},f=h=>{if(i!==h.pointerId)return;i=null;try{t.releasePointerCapture(h.pointerId)}catch{}if(a<this.TAP_THRESHOLD){if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null)}catch(b){console.warn(b)}}if(typeof this.onTap=="function")try{this.onTap(t)}catch(b){console.warn(b)}return}const p=document.querySelectorAll(".staff-slot");let v=null,u=1/0;const _=t.getBoundingClientRect(),m=_.left+_.width/2,g=_.top+_.height/2;p.forEach(b=>{const w=b.getBoundingClientRect(),T=w.left+w.width/2,x=w.top+w.height/2,k=Math.hypot(T-m,x-g);k<u&&(u=k,v=b)});const y=!!v&&u<Jo&&v.dataset.id===e.note.id;if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null)}catch(b){console.warn(b)}}if(y&&this._spawnSourceShadow(e),typeof this.onDrop=="function")try{this.onDrop(t,v,y)}catch(b){console.warn(b)}};t.addEventListener("pointerdown",d),t.addEventListener("pointermove",c),t.addEventListener("pointerup",f),t.addEventListener("pointercancel",f),t.addEventListener("click",h=>{if(e.locked)return;const p=Date.now();if(!(p-(this._lastTapTime||0)<250)&&(this._lastTapTime=p,typeof this.onTap=="function"))try{this.onTap(t)}catch(v){console.warn(v)}})}lockFish(e){const t=this.fishes.find(i=>i.note.id===e);t&&(t.locked=!0,t.el.classList.add("fish--locked"))}_spawnSourceShadow(e){if(!this.pool)return;const t=document.createElement("div");t.className="fish-source-shadow";const i=e.note&&e.note.color?e.note.color:"rgba(20,40,70,0.45)";t.style.setProperty("--shadow-color",i),t.style.left=`${e.originalLeft+qe/2}px`,t.style.top=`${e.originalTop+He/2}px`,this.pool.appendChild(t),setTimeout(()=>{try{t.remove()}catch{}},1400)}setDragEnabled(e){this._dragEnabled=e!==!1}unlockAll(){this.fishes.forEach(e=>{e.locked=!1,e.el.classList.remove("fish--locked"),e.el.classList.remove("dragging","shake"),e.el.style.position="",e.el.style.left=`${e.originalLeft}px`,e.el.style.top=`${e.originalTop}px`,e.el.style.right="",e.el.style.bottom="",e.el.style.margin="",e.el.style.transform="",e.el.style.animationPlayState=""})}intro(){const e=()=>{if(this.fishes.length<this.notes.length){requestAnimationFrame(e);return}this.fishes.forEach((t,i)=>{D.fromTo(t.el,{y:140,opacity:0,scale:.4},{y:0,opacity:1,scale:1,duration:.6,delay:i*.08,ease:"back.out(1.7)"})})};e()}reset(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width>=2&&e.height>=2){const t=ps,i=e.width-ps-qe,n=-18,r=e.height-He,l=56,o=l*l,a=90,d=[],c=(f,h)=>{for(let p=0;p<d.length;p++){const v=d[p],u=v.x-f,_=v.y-h;if(u*u+_*_<o)return!1}return!0};this.fishes.forEach(f=>{const h=t+qe/2,p=i-qe/2,v=n+He/2,u=r-He/2,_=Math.max(1,p-h),m=Math.max(1,u-v);let g=0,y=0,b=!1;for(let w=0;w<a;w++){const T=h+Math.random()*_,x=v+Math.random()*m;if(c(T,x)){g=T,y=x,b=!0;break}}if(!b){let w=-1/0,T=h,x=v;for(let k=0;k<60;k++){const S=h+Math.random()*_,C=v+Math.random()*m;let E=1/0;for(let A=0;A<d.length;A++){const $=d[A],R=$.x-S,B=$.y-C,H=Math.sqrt(R*R+B*B);H<E&&(E=H)}E>w&&(w=E,T=S,x=C)}g=T,y=x}f.originalLeft=g-qe/2,f.originalTop=y-He/2,d.push({x:g,y})})}this.unlockAll(),this.fishes.forEach(t=>{D.fromTo(t.el,{y:60,opacity:.6,scale:.85},{y:0,opacity:1,scale:1,duration:.5,ease:"back.out(1.4)",delay:Math.random()*.15})})}getFishes(){return this.fishes.map(e=>e.el)}}const Us=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],mn=new Set(["do","mi","sol"]),ta=130,sa=["真棒!","太厉害了~","不错哟!"];function ia(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=3);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Qo(s.stage),s.fishPool=new As(s.stage,Us),s.fishPool.setDragEnabled(!0),s.fishPool.intro(),s.say("柯尔文爷爷想听 Do Mi Sol 三部合唱! 把红 Do、黄 Mi、蓝 Sol 放到对应的山上~");const n=new Set;return s._level3Total=3,s._level3Count=0,s.fishPool.onTap=r=>{try{s.audio.playNote(r.dataset.pitch)}catch{}try{s.audio.hover(r.dataset.id)}catch{}D.fromTo(r,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})},s.fishPool.onDragStart=r=>{try{s.audio.hover(r.dataset.id)}catch{}},s.fishPool.onDragMove=(r,l)=>{},s.fishPool.onDrop=(r,l,o)=>{const a=r.dataset.id;if(n.has(a))return;let d=null,c=1/0;const f=r.getBoundingClientRect(),h=f.left+f.width/2,p=f.top+f.height/2;if(s.scene&&s.scene.background)for(const _ of mn){const m=s.scene.background.querySelector(`[data-note="${_}"]`);if(!m)continue;const g=m.getBoundingClientRect(),y=g.left+g.width/2,b=g.top+g.height/2,w=Math.hypot(y-h,b-p);w<c&&(c=w,d=_)}const v=Us.find(_=>_.id===a),u=d&&c<ta;if(u&&a===d){n.add(d),s._level3Count=n.size;try{s.audio.correct()}catch{}try{s.scene.setProgress(n.size)}catch{}const _=s.scene.background.querySelector(`[data-note="${d}"]`),m=_.getBoundingClientRect(),g=s.fishPool.root.getBoundingClientRect(),y=m.left-g.left+m.width/2,b=m.top-g.top+m.height/2,w=parseFloat(r.style.left)||0,T=parseFloat(r.style.top)||0,x=y-w-r.offsetWidth/2,k=b-T-r.offsetHeight/2,S=v&&v.color||"#ffd166";D.to(r,{x,y:k,scale:.85,duration:.55,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(a)}catch{}try{s.audio.playNote(v.pitch)}catch{}try{s._floatScore(h,p,`${v.solfege} ✓`)}catch{}try{const E=_.getBoundingClientRect();s.scene.bloomAt(E.left+E.width/2,E.bottom,S)}catch{}D.to(r,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>D.to(r,{rotation:0,duration:.2,ease:"power2.out"})}),D.fromTo(r,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"});const C=sa[n.size-1]+" "+n.size+" / 3";s.say(C),n.size===3&&setTimeout(()=>{const E=s._calcStars();try{s.progress.markLevelComplete(3,E)}catch{}try{s.audio.playScale(["C4","E4","G4"])}catch{}try{s.showWinOverlay(E,3)}catch{}},700)}})}else{s.wrongCount++;try{s.audio.wrong()}catch{}if(r.classList.add("shake"),setTimeout(()=>r.classList.remove("shake"),400),!mn.has(a)){try{s.scene.shakePlatforms()}catch{}s.say(`${v.solfege} 不在 Do Mi Sol 里哦! 找红色 Do、黄色 Mi、蓝色 Sol 三座山~`),D.to(r,{x:0,y:0,duration:.9,ease:"elastic.out(1.2, 0.4)"}),D.fromTo(r,{rotation:"+=15"},{rotation:0,duration:.4,ease:"power2.out"})}else if(u){const m=Us.find(g=>g.id===d);s.say(`${v.solfege} 应该去另一座山, 不是 ${m?m.solfege:"那座"} 的位置~`),D.to(r,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}else s.say(`${v.solfege} 应该去山上相应的高度哦~`),D.to(r,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}},()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}if(s.fishPool)try{s.fishPool.pool.innerHTML=""}catch{}const r=document.getElementById("hud-level2");r&&(r.style.display="");const l=document.querySelector(".hud__dots");l&&(l.style.display="");const o=document.getElementById("btn-replay");o&&(o.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const na=Object.freeze(Object.defineProperty({__proto__:null,default:ia},Symbol.toStringTag,{value:"Module"}));class ra{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level4-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e;const t=document.createElement("div");t.className="level4-fx-layer",this.stage.appendChild(t),this.fxLayer=t}getBeatCue(){return this.stage?this.stage.querySelector(".level4-beat-cue"):null}getDrum(){return this.stage?this.stage.querySelector(".level4-drum-wrap"):null}getDrumAnchor(){return this.stage?this.stage.querySelector(".level4-drum-anchor"):null}getCueLarge(){return this.stage?this.stage.querySelector(".level4-drum-cue-large"):null}getFxLayer(){return this.fxLayer||null}getDrumScreenCenter(){const e=this.getDrum();if(!e)return{x:window.innerWidth/2,y:window.innerHeight/2};const t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2}}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null,this.fxLayer&&this.fxLayer.parentNode&&this.fxLayer.parentNode.removeChild(this.fxLayer),this.fxLayer=null}}const la=[["T","T","tt","T"],["tt","T","T","tt","T","T"],["T","tt","T","tt","tt","T","T","T","tt","T"]],gn=600,Ks=3800,oa=.3,aa=.5,ca=260,da=320;function ua(s,e){return s<=1?3:s<=3?2:s<=5?1:0}function ha(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=4);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.wrongCount=0,s.scene=new ra(s.stage),s.say("节奏泡泡流过来咯! 跟着节拍敲鼓! 大泡泡 = ta (1 拍), 双连泡泡 = ti-ti (2 拍连敲)");const i=[];la.forEach(T=>{T.forEach(x=>{x==="tt"?(i.push({double:!0,isSecond:!1}),i.push({double:!0,isSecond:!0})):i.push({double:!1})})});const n=i.length,r=window.innerWidth*aa,l=window.innerHeight*oa,o=-50,a=window.innerWidth+100,d=(r-o)/(a-o);s._level4Total=n,s._level4Processed=0,s._level4Pending=[],s._level4Done=!1,s._level4Correct=0,s._level4Timeouts=[],s._level4CueTimers=[],s.stage.insertAdjacentHTML("beforeend",'<div class="level4-bubbles-container"></div>');const c=s.stage.querySelector(".level4-bubbles-container"),f=s.scene.getFxLayer(),h=s.scene.getDrumAnchor(),p=s.scene.getCueLarge();function v(){if(!f)return;const T=s.scene.getDrumScreenCenter();for(let x=0;x<3;x++){const k=document.createElement("div");k.className="level4-drum-ripple level4-drum-ripple--"+(x+1),k.style.left=T.x+"px",k.style.top=T.y+"px",f.appendChild(k),setTimeout(()=>k.remove(),900)}}function u(){if(!f)return;const T=s.scene.getDrumScreenCenter(),x=["#ffd166","#ef476f","#06d6a0","#118ab2","#ff9f1c"],k=12;for(let S=0;S<k;S++){const C=document.createElement("div");C.className="level4-drum-particle";const E=x[Math.floor(Math.random()*x.length)];C.style.background=E,C.style.boxShadow="0 0 6px "+E;const A=Math.PI*2*S/k+Math.random()*.4,$=70+Math.random()*50,R=Math.cos(A)*$,B=Math.sin(A)*$-30;C.style.setProperty("--dx",R.toFixed(1)+"px"),C.style.setProperty("--dy",B.toFixed(1)+"px"),C.style.left=T.x+"px",C.style.top=T.y+"px";const H=6+Math.random()*6;C.style.width=H+"px",C.style.height=H+"px",f.appendChild(C),setTimeout(()=>C.remove(),700)}}function _(){if(!f)return;const T=s.scene.getDrumScreenCenter(),x=document.createElement("div");x.className="level4-floating-score level4-floating-score--plus",x.textContent="+1",x.style.left=T.x+"px",x.style.top=T.y-50+"px",f.appendChild(x),setTimeout(()=>x.remove(),850)}function m(){if(!f)return;const T=s.scene.getDrumScreenCenter(),x=document.createElement("div");x.className="level4-floating-score level4-floating-score--minus",x.textContent="-1",x.style.left=T.x+"px",x.style.top=T.y-50+"px",f.appendChild(x),setTimeout(()=>x.remove(),850)}function g(){if(s._level4Done)return;h&&h.classList.add("level4-cue-now"),p&&p.classList.add("level4-cue-active");try{s.audio.hover()}catch{}const T=setTimeout(()=>{h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active")},da);s._level4CueTimers.push(T)}let y=0;i.forEach((T,x)=>{const k=T.double?gn/2:gn,S=y+800;s._level4Timeouts.push(setTimeout(()=>b(T,x),S)),y+=k});function b(T,x){if(!c||s._level4Done)return;const k=document.createElement("div");k.className="level4-bubble",T.double&&T.isSecond&&k.classList.add("level4-bubble-half"),T.double&&k.classList.add("level4-bubble--double"),k.dataset.idx=String(x),T.double?k.textContent=T.isSecond?"·":"•":k.textContent="●",c.appendChild(k);try{const C=k.animate([{transform:`translate(${o}px, ${l}px)`},{transform:`translate(${r}px, ${l}px)`,offset:d},{transform:`translate(${a}px, ${l}px)`}],{duration:Ks,fill:"forwards",easing:"linear"});C&&C.cancel}catch{k.style.left=o+"px",k.style.top=l+"px"}const S=Ks*d;s._level4Timeouts.push(setTimeout(()=>{s._level4Done||(g(),s._level4Pending.push({beat:T,absoluteIdx:x,when:Date.now()}))},S)),s._level4Timeouts.push(setTimeout(()=>{if(s._level4Done)return;k.remove(),s._level4Processed++;const C=s._level4Pending.findIndex(E=>E.absoluteIdx===x);C>=0&&(s._level4Pending.splice(C,1),s.wrongCount++,s.audio.wrong(),m(),h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active"),s.say("咦, 漏了一拍! 跟着泡泡到鼓位再敲")),s._level4Processed===n&&!s._level4Done&&(s._level4Done=!0,s._level4Timeouts.push(setTimeout(()=>{const E=ua(s.wrongCount);try{s.progress.markLevelComplete(4,E)}catch{}s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"]),s.showWinOverlay(E,4)},600)))},Ks))}const w=s.scene.getDrum();if(w){w.style.cursor="pointer";const T=x=>{if(x.preventDefault(),x.stopPropagation(),s._level4Done)return;w.classList.remove("level4-drum-hit"),w.offsetWidth,w.classList.add("level4-drum-hit"),s._level4Timeouts.push(setTimeout(()=>{w.classList.remove("level4-drum-hit")},280)),h&&(h.classList.remove("level4-drum-character-hit"),h.offsetWidth,h.classList.add("level4-drum-character-hit"),setTimeout(()=>{h&&h.classList.remove("level4-drum-character-hit")},280));const k=Date.now(),S=s._level4Pending.filter(C=>Math.abs(k-C.when)<ca);if(S.length>0){s._level4Correct++,s._level4Pending=s._level4Pending.filter(E=>!S.includes(E));try{s.audio.playNote("C4")}catch{}v(),u(),_(),h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active");const C=["咚!","咚!咚!","完美!","棒呀!","节拍对!"];s.say(C[Math.min(s._level4Correct-1,C.length-1)])}else{s.wrongCount++;try{s.audio.wrong()}catch{}w.classList.add("level4-drum-shake"),setTimeout(()=>w.classList.remove("level4-drum-shake"),360),m(),h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active"),s.say("咦, 现在不是节拍! 看泡泡到鼓位再敲")}};w.addEventListener("pointerdown",T),s._level4DrumHandler=T}return()=>{if(Array.isArray(s._level4Timeouts)&&(s._level4Timeouts.forEach(C=>clearTimeout(C)),s._level4Timeouts=[]),Array.isArray(s._level4CueTimers)&&(s._level4CueTimers.forEach(C=>clearTimeout(C)),s._level4CueTimers=[]),Array.isArray(s._level4Pending)&&(s._level4Pending=[]),s._level4Done=!0,s._level4DrumHandler&&w&&w.removeEventListener("pointerdown",s._level4DrumHandler),s._level4DrumHandler=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}(s.stage?s.stage.querySelectorAll(".level4-bubbles-container"):[]).forEach(C=>C.remove());const x=document.getElementById("hud-level2");x&&(x.style.display="none");const k=document.querySelector(".hud__dots");k&&(k.style.display="");const S=document.getElementById("btn-replay");S&&(S.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const fa=Object.freeze(Object.defineProperty({__proto__:null,default:ha},Symbol.toStringTag,{value:"Module"}));class pa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level5-background";let t="";for(let i=0;i<40;i++){const n=Math.random()*100,r=Math.random()*50,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level5-stars-tiny" cx="${n}%" cy="${r}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const _a=["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"],Zs={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},Ge=80,ya=80,va=60;function ma(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=5);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.scene=new pa(s.stage),s.say("森林乐团要奏小星星! 看音符掉到哪个键, 就按哪个~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level5-staff-area"></div>');const i=s.stage.querySelector(".level5-staff-area");i.innerHTML=`
    <svg class="level5-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
      <line class="level5-staff-line" x1="40" y1="${Ge+40}" x2="760" y2="${Ge+40}" />
      <line class="level5-staff-line" x1="40" y1="${Ge+60}" x2="760" y2="${Ge+60}" />
      <line class="level5-staff-line" x1="40" y1="${Ge+80}" x2="760" y2="${Ge+80}" />
      <line class="level5-staff-line" x1="40" y1="${Ge+100}" x2="760" y2="${Ge+100}" />
      <line class="level5-staff-line" x1="40" y1="${Ge+120}" x2="760" y2="${Ge+120}" />
      <!-- 当前音符位置 -->
      <circle class="level5-current-note" cx="400" cy="0" r="14" fill="#ffd166" />
    </svg>
  `,s.stage.insertAdjacentHTML("beforeend",`
    <div class="level5-metronome" id="level5-metronome">
      <span class="level5-metronome-note">♩=</span>
      <span class="level5-metronome-bpm" id="level5-bpm">${ya}</span>
      <span class="level5-metronome-mode" id="level5-mode"></span>
    </div>
  `),s.kb=new bt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level5Seq=[..._a],s._level5Total=s._level5Seq.length,s._level5Correct=0,s._level5Idx=0,s._level5Accepting=!0,s._level5Done=!1,s._level5EasyMode=!1,s._level5ConsecWrong=0;const n={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function r(){return i.querySelector(".level5-current-note")}function l(c,f){const h=document.getElementById("level5-bpm"),p=document.getElementById("level5-mode");h&&(h.textContent=String(c)),p&&(p.textContent=f);const v=document.getElementById("level5-metronome");v&&v.classList.toggle("level5-metronome--easy",!0)}function o(){const c=s._level5Idx||0,f=s._level5Total||14,p=4+Math.min(1,c/Math.max(1,f-1))*1.5;return s._level5EasyMode?p+1.5:p}function a(){if(!s._level5EasyMode&&s._level5ConsecWrong>=3){s._level5EasyMode=!0,l(va,"轻松模式");try{s.say("进入轻松模式~ 慢慢来不着急!")}catch{}}}function d(){if(s._level5Done||s._level5Idx>=s._level5Seq.length)return;const c=s._level5Seq[s._level5Idx],f=Zs[c],h=n[f.id],p=r();if(!p)return;D.killTweensOf(p),D.set(p,{scale:1}),p.setAttribute("cy",h),p.dataset.pitch=c,p.classList.remove("dropping","incorrect"),s.say(`下一个: ${f.solfege} (${c})`),s._level5Accepting=!0;const v=o();D.fromTo(p,{attr:{cy:h},opacity:1},{attr:{cy:h+100},opacity:.9,duration:v,ease:"none",onComplete:()=>{if(!s._level5Done&&s._level5Accepting){s._level5Accepting=!1,s.wrongCount++,s._level5ConsecWrong++,a();try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),p.classList.add("incorrect"),setTimeout(()=>{p.classList.remove("incorrect"),s._level5Idx++,d()},600)}}})}return s.kb.onPress=c=>{if(!s._level5Accepting||s._level5Done)return;const f=s._level5Seq[s._level5Idx],h=c.dataset.pitch;if(h===f){s._level5Correct++,s._level5Accepting=!1,s._level5ConsecWrong=0;try{s.audio.correct()}catch{}try{s.audio.playNote(h)}catch{}const p=r();p&&(D.killTweensOf(p),D.to(p,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),s.say(["完美!","星星在向你眨眼!","小星星~"][Math.min(s._level5Correct-1,2)]),s._level5Idx++,s._level5Idx>=s._level5Seq.length?(s._level5Done=!0,setTimeout(()=>{const v=s._calcStars();try{s.progress.markLevelComplete(5,v)}catch{}try{s.audio.playScale(["C4","C4","G4","G4","A4","A4","G4"])}catch{}s.say("✨ 完美的《小星星》!"),s.showWinOverlay(v,5)},800)):setTimeout(d,500)}else{s.wrongCount++,s._level5ConsecWrong++,a();try{s.audio.wrong()}catch{}const p=Zs[h];s.say(`这是 ${p?p.solfege:"?"}, 不是 ${Zs[f].solfege}. 再听一下!`);const v=r();v&&v.classList.add("incorrect"),setTimeout(()=>{v&&v.classList.remove("incorrect")},300);try{s.audio.playNote(f)}catch{}}},setTimeout(d,1e3),()=>{s.scene&&typeof s.scene.teardown=="function"&&s.scene.teardown();const c=i&&i.querySelector(".level5-current-note");c&&D.killTweensOf(c),s.stage.querySelectorAll(".level5-staff-area").forEach(v=>v.remove());const f=document.getElementById("level5-metronome");f&&f.remove();const h=document.getElementById("hud-level2");h&&(h.style.display="");const p=document.querySelector(".hud__dots");p&&(p.style.display="none"),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const ga=Object.freeze(Object.defineProperty({__proto__:null,default:ma},Symbol.toStringTag,{value:"Module"}));class ba{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level6-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}setChordLabel(e){if(!this.background)return;const t=this.background.querySelector(".level6-chord-indicator__chord");t&&(t.textContent=e)}celebrateClap(){if(!this.background)return;const e=this.background.querySelector(".level6-teacher");e&&(e.classList.remove("level6-clap"),e.offsetWidth,e.classList.add("level6-clap"),setTimeout(()=>e.classList.remove("level6-clap"),1200))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Ce=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Xs=new Set(["do","re","mi"]),wa=new Set(["fa","sol","la","si"]),Gt=[{high:"fa",low:"do",label:"Fa 上 + Do 下"},{high:"sol",low:"re",label:"Sol 上 + Re 下"},{high:"la",low:"mi",label:"La 上 + Mi 下"},{high:"si",low:"do",label:"Si 上 + Do 下"},{high:"sol",low:"mi",label:"Sol 上 + Mi 下"}],xa=2e3,ka=["C4","D4","E4","F4","G4","A4","B4"],bn=["完美!","双手协作!","和谐!","真厉害!","双手小钢琴家!"];function Ta(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=6);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.querySelectorAll("#hud-dots .dot");n.forEach(f=>f.classList.remove("on")),n.forEach((f,h)=>{h>=5?f.style.display="none":f.style.display=""}),s.scene=new ba(s.stage),s.kb=new bt(s.stage,Ce),setTimeout(()=>{!s.kb||!s.kb.svg||Ce.forEach(f=>{const h=s.kb.svg.querySelector(`.key--white[data-id="${f.id}"]`);if(!h)return;Xs.has(f.id)?h.classList.add("level6-lh"):wa.has(f.id)&&h.classList.add("level6-rh");const p=h.querySelector(".key__label");if(p){const v=document.createElementNS("http://www.w3.org/2000/svg","text"),u=p.getAttribute("x")||"40";v.setAttribute("x",u),v.setAttribute("y","150"),v.setAttribute("text-anchor","middle"),v.setAttribute("font-family","'ZCOOL KuaiLe', sans-serif"),v.setAttribute("font-size","12"),v.setAttribute("font-weight","900"),v.setAttribute("fill",Xs.has(f.id)?"#2d6e3e":"#a06800"),v.setAttribute("class","level6-hand-tag"),v.setAttribute("style","pointer-events: none; paint-order: stroke; stroke: white; stroke-width: 2;"),v.textContent=Xs.has(f.id)?"左手":"右手",h.appendChild(v)}})},50),s.say("钢琴老师教双手协调! 左低右高, 同时按下两个键~ 🎹"),s._level6Idx=0,s._level6Total=Gt.length,s._level6Correct=0,s._level6Done=!1,s._level6Current=null,s._level6PressFirst=null,s._level6PairTimer=null,s._level6Locked=!1;function r(f){!s.kb||!s.kb.svg||[f.high,f.low].forEach(h=>{const p=s.kb.svg.querySelector(`.key--white[data-id="${h}"]`);p&&s.kb.glowKey(p)})}function l(f,h){try{s.audio.playNote(f),setTimeout(()=>{try{s.audio.playNote(h)}catch{}},8)}catch{}}function o(f){if(f>=Gt.length)return a();const h=Gt[f];s._level6Current=h,s._level6PressFirst=null,s._level6Locked=!1;const p=Ce.find(u=>u.id===h.high),v=Ce.find(u=>u.id===h.low);s.say(`第 ${f+1} / ${Gt.length} 题: 请同时按 ${p.solfege} (右手) + ${v.solfege} (左手) ✨`);try{s.scene.setChordLabel(h.label)}catch{}setTimeout(()=>r(h),300),setTimeout(()=>{try{l(p.pitch,v.pitch)}catch{}},600)}function a(){s._level6Done=!0;const f=s._calcStars();try{s.progress.markLevelComplete(6,f)}catch{}try{s.audio.playScale(ka)}catch{}s.say("双手小钢琴家毕业! 🎓🎹");try{s.scene.setChordLabel("毕业啦")}catch{}setTimeout(()=>{try{s.showWinOverlay(f,6)}catch{}},1200)}s.kb.onPress=f=>{if(s._level6Done||s._level6Locked||!s._level6Current||!f||!f.classList.contains("key--white"))return;const h=f.dataset.id,p=s._level6Current,v=new Set([p.high,p.low]),u=s._level6PressFirst;if(u&&u.id!==h){if(v.has(h)&&v.has(u.id)&&u.id!==h){d(f);return}c(f,h);return}if(!u){if(!v.has(h)){c(f,h);return}s._level6PressFirst={id:h,at:Date.now()};try{s.audio.playNote(f.dataset.pitch)}catch{}try{s.kb.glowKey(f)}catch{}f.classList.add("level6-pressed"),setTimeout(()=>f.classList.remove("level6-pressed"),500),s._level6PairTimer&&clearTimeout(s._level6PairTimer),s._level6PairTimer=setTimeout(()=>{const _=s._level6PressFirst;if(_){const m=Ce.find(b=>b.id===_.id),g=Ce.find(b=>b.id===p.high),y=Ce.find(b=>b.id===p.low);s.say(`光按了 ${m?m.solfege:"?"} 还不够哦, 再按 ${g.solfege} (右手) 或 ${y.solfege} (左手)~`),s.wrongCount++}s._level6PressFirst=null},xa);return}try{s.kb.glowKey(f)}catch{}try{s.audio.playNote(f.dataset.pitch)}catch{}};function d(f){const h=s._level6PressFirst;if(!h||!s._level6Current)return;const p=h.id,v=f.dataset.id,u=Ce.find(g=>g.id===p),_=Ce.find(g=>g.id===v);if(u&&_)l(u.pitch,_.pitch);else try{u&&s.audio.playNote(u.pitch),_&&s.audio.playNote(_.pitch)}catch{}[p,v].forEach(g=>{const y=s.kb.svg.querySelector(`.key--white[data-id="${g}"]`);if(y){y.classList.add("level6-pressed");try{s.kb.glowKey(y)}catch{}setTimeout(()=>y.classList.remove("level6-pressed"),500)}}),s._level6Correct++,s._level6Locked=!0,s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null;const m=bn[Math.min(s._level6Correct-1,bn.length-1)];s.say(`${m} 双音 ${s._level6Correct} / ${Gt.length}`),n[s._level6Correct-1]&&n[s._level6Correct-1].classList.add("on");try{s.scene.celebrateClap()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"🎵 双音!")}catch{}try{const g=document.createElement("div");g.className="level6-flash",document.body.appendChild(g),setTimeout(()=>g.remove(),600)}catch{}try{const g=f.getBoundingClientRect(),y=g.left+g.width/2,b=g.top+g.height/2,w=(Ce.find(T=>T.id===s._level6Current.high)||{}).color||"#ffd166";s.burst(y,b,w)}catch{}try{s.audio.correct()}catch{}s._level6Idx++,setTimeout(()=>o(s._level6Idx),1400)}function c(f,h){s.wrongCount++;try{s.audio.wrong()}catch{}if(f.classList.add("shake"),setTimeout(()=>f.classList.remove("shake"),400),s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null,!s._level6Current)return;const p=Ce.find(_=>_.id===s._level6Current.high),v=Ce.find(_=>_.id===s._level6Current.low),u=Ce.find(_=>_.id===h);u?s.say(`${u.solfege} 不在本道题里, 要按 ${p.solfege} (右手) + ${v.solfege} (左手) 同时哦~`):s.say(`要同时按 ${p.solfege} (右手) + ${v.solfege} (左手) 哦~`),setTimeout(()=>r(s._level6Current),800)}return setTimeout(()=>o(0),1200),()=>{if(s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),n.forEach(f=>{f.classList.remove("on"),f.style.display=""}),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Sa=Object.freeze(Object.defineProperty({__proto__:null,default:Ta},Symbol.toStringTag,{value:"Module"}));class La{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level7-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}drawRibbon(e,t,i,n){if(!this.background)return;const r=this.background.querySelector(".level7-ribbon-layer");if(!r)return;const l=this.background.getBoundingClientRect(),o=t.x-l.left,a=t.y-l.top,d=i.x-l.left,c=i.y-l.top,f="http://www.w3.org/2000/svg",h=document.createElementNS(f,"svg");h.setAttribute("viewBox",`0 0 ${l.width} ${l.height}`),h.setAttribute("width",l.width),h.setAttribute("height",l.height),h.style.position="absolute",h.style.inset="0",h.style.pointerEvents="none",h.setAttribute("class","level7-ribbon-svg");const p=(o+d)/2,v=Math.min(a,c)-60-Math.random()*30,u=document.createElementNS(f,"path");u.setAttribute("d",`M ${o},${a} Q ${p},${v} ${d},${c}`),u.setAttribute("stroke",n),u.setAttribute("stroke-width","6"),u.setAttribute("stroke-linecap","round"),u.setAttribute("fill","none"),u.setAttribute("opacity","0.85"),u.setAttribute("class","level7-ribbon-path"),u.setAttribute("stroke-dasharray",`${Math.hypot(d-o,c-a)}`),u.setAttribute("stroke-dashoffset",`${Math.hypot(d-o,c-a)}`),h.appendChild(u),r.appendChild(h),requestAnimationFrame(()=>{u.style.transition="stroke-dashoffset 0.55s ease-out, opacity 0.55s ease-out",u.setAttribute("stroke-dashoffset","0")}),setTimeout(()=>{u.setAttribute("opacity","0"),setTimeout(()=>{try{h.remove()}catch{}},600)},700)}lightTreehouse(){this.background&&(this.background.classList.add("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.add("level7-step-complete")}))}dimTreehouse(){this.background&&(this.background.classList.remove("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.remove("level7-step-complete")}))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}var qi={};(function s(e,t,i,n){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var M=new OffscreenCanvas(1,1),L=M.getContext("2d");L.fillRect(0,0,1,1);var P=M.transferToImageBitmap();L.createPattern(P,"no-repeat")}catch{return!1}return!0}();function a(){}function d(M){var L=t.exports.Promise,P=L!==void 0?L:e.Promise;return typeof P=="function"?new P(M):(M(a,a),null)}var c=function(M,L){return{transform:function(P){if(M)return P;if(L.has(P))return L.get(P);var N=new OffscreenCanvas(P.width,P.height),O=N.getContext("2d");return O.drawImage(P,0,0),L.set(P,N),N},clear:function(){L.clear()}}}(o,new Map),f=function(){var M=Math.floor(16.666666666666668),L,P,N={},O=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(L=function(I){var q=Math.random();return N[q]=requestAnimationFrame(function F(W){O===W||O+M-1<W?(O=W,delete N[q],I()):N[q]=requestAnimationFrame(F)}),q},P=function(I){N[I]&&cancelAnimationFrame(N[I])}):(L=function(I){return setTimeout(I,M)},P=function(I){return clearTimeout(I)}),{frame:L,cancel:P}}(),h=function(){var M,L,P={};function N(O){function I(q,F){O.postMessage({options:q||{},callback:F})}O.init=function(F){var W=F.transferControlToOffscreen();O.postMessage({canvas:W},[W])},O.fire=function(F,W,V){if(L)return I(F,null),L;var Z=Math.random().toString(36).slice(2);return L=d(function(Q){function J(le){le.data.callback===Z&&(delete P[Z],O.removeEventListener("message",J),L=null,c.clear(),V(),Q())}O.addEventListener("message",J),I(F,Z),P[Z]=J.bind(null,{data:{callback:Z}})}),L},O.reset=function(){O.postMessage({reset:!0});for(var F in P)P[F](),delete P[F]}}return function(){if(M)return M;if(!i&&r){var O=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{M=new Worker(URL.createObjectURL(new Blob([O])))}catch(I){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",I),null}N(M)}return M}}(),p={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function v(M,L){return L?L(M):M}function u(M){return M!=null}function _(M,L,P){return v(M&&u(M[L])?M[L]:p[L],P)}function m(M){return M<0?0:Math.floor(M)}function g(M,L){return Math.floor(Math.random()*(L-M))+M}function y(M){return parseInt(M,16)}function b(M){return M.map(w)}function w(M){var L=String(M).replace(/[^0-9a-f]/gi,"");return L.length<6&&(L=L[0]+L[0]+L[1]+L[1]+L[2]+L[2]),{r:y(L.substring(0,2)),g:y(L.substring(2,4)),b:y(L.substring(4,6))}}function T(M){var L=_(M,"origin",Object);return L.x=_(L,"x",Number),L.y=_(L,"y",Number),L}function x(M){M.width=document.documentElement.clientWidth,M.height=document.documentElement.clientHeight}function k(M){var L=M.getBoundingClientRect();M.width=L.width,M.height=L.height}function S(M){var L=document.createElement("canvas");return L.style.position="fixed",L.style.top="0px",L.style.left="0px",L.style.pointerEvents="none",L.style.zIndex=M,L}function C(M,L,P,N,O,I,q,F,W){M.save(),M.translate(L,P),M.rotate(I),M.scale(N,O),M.arc(0,0,1,q,F,W),M.restore()}function E(M){var L=M.angle*(Math.PI/180),P=M.spread*(Math.PI/180);return{x:M.x,y:M.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:M.startVelocity*.5+Math.random()*M.startVelocity,angle2D:-L+(.5*P-Math.random()*P),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:M.color,shape:M.shape,tick:0,totalTicks:M.ticks,decay:M.decay,drift:M.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:M.gravity*3,ovalScalar:.6,scalar:M.scalar,flat:M.flat}}function A(M,L){L.x+=Math.cos(L.angle2D)*L.velocity+L.drift,L.y+=Math.sin(L.angle2D)*L.velocity+L.gravity,L.velocity*=L.decay,L.flat?(L.wobble=0,L.wobbleX=L.x+10*L.scalar,L.wobbleY=L.y+10*L.scalar,L.tiltSin=0,L.tiltCos=0,L.random=1):(L.wobble+=L.wobbleSpeed,L.wobbleX=L.x+10*L.scalar*Math.cos(L.wobble),L.wobbleY=L.y+10*L.scalar*Math.sin(L.wobble),L.tiltAngle+=.1,L.tiltSin=Math.sin(L.tiltAngle),L.tiltCos=Math.cos(L.tiltAngle),L.random=Math.random()+2);var P=L.tick++/L.totalTicks,N=L.x+L.random*L.tiltCos,O=L.y+L.random*L.tiltSin,I=L.wobbleX+L.random*L.tiltCos,q=L.wobbleY+L.random*L.tiltSin;if(M.fillStyle="rgba("+L.color.r+", "+L.color.g+", "+L.color.b+", "+(1-P)+")",M.beginPath(),l&&L.shape.type==="path"&&typeof L.shape.path=="string"&&Array.isArray(L.shape.matrix))M.fill(j(L.shape.path,L.shape.matrix,L.x,L.y,Math.abs(I-N)*.1,Math.abs(q-O)*.1,Math.PI/10*L.wobble));else if(L.shape.type==="bitmap"){var F=Math.PI/10*L.wobble,W=Math.abs(I-N)*.1,V=Math.abs(q-O)*.1,Z=L.shape.bitmap.width*L.scalar,Q=L.shape.bitmap.height*L.scalar,J=new DOMMatrix([Math.cos(F)*W,Math.sin(F)*W,-Math.sin(F)*V,Math.cos(F)*V,L.x,L.y]);J.multiplySelf(new DOMMatrix(L.shape.matrix));var le=M.createPattern(c.transform(L.shape.bitmap),"no-repeat");le.setTransform(J),M.globalAlpha=1-P,M.fillStyle=le,M.fillRect(L.x-Z/2,L.y-Q/2,Z,Q),M.globalAlpha=1}else if(L.shape==="circle")M.ellipse?M.ellipse(L.x,L.y,Math.abs(I-N)*L.ovalScalar,Math.abs(q-O)*L.ovalScalar,Math.PI/10*L.wobble,0,2*Math.PI):C(M,L.x,L.y,Math.abs(I-N)*L.ovalScalar,Math.abs(q-O)*L.ovalScalar,Math.PI/10*L.wobble,0,2*Math.PI);else if(L.shape==="star")for(var G=Math.PI/2*3,he=4*L.scalar,ve=8*L.scalar,X=L.x,te=L.y,ce=5,se=Math.PI/ce;ce--;)X=L.x+Math.cos(G)*ve,te=L.y+Math.sin(G)*ve,M.lineTo(X,te),G+=se,X=L.x+Math.cos(G)*he,te=L.y+Math.sin(G)*he,M.lineTo(X,te),G+=se;else M.moveTo(Math.floor(L.x),Math.floor(L.y)),M.lineTo(Math.floor(L.wobbleX),Math.floor(O)),M.lineTo(Math.floor(I),Math.floor(q)),M.lineTo(Math.floor(N),Math.floor(L.wobbleY));return M.closePath(),M.fill(),L.tick<L.totalTicks}function $(M,L,P,N,O){var I=L.slice(),q=M.getContext("2d"),F,W,V=d(function(Z){function Q(){F=W=null,q.clearRect(0,0,N.width,N.height),c.clear(),O(),Z()}function J(){i&&!(N.width===n.width&&N.height===n.height)&&(N.width=M.width=n.width,N.height=M.height=n.height),!N.width&&!N.height&&(P(M),N.width=M.width,N.height=M.height),q.clearRect(0,0,N.width,N.height),I=I.filter(function(le){return A(q,le)}),I.length?F=f.frame(J):Q()}F=f.frame(J),W=Q});return{addFettis:function(Z){return I=I.concat(Z),V},canvas:M,promise:V,reset:function(){F&&f.cancel(F),W&&W()}}}function R(M,L){var P=!M,N=!!_(L||{},"resize"),O=!1,I=_(L,"disableForReducedMotion",Boolean),q=r&&!!_(L||{},"useWorker"),F=q?h():null,W=P?x:k,V=M&&F?!!M.__confetti_initialized:!1,Z=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,Q;function J(G,he,ve){for(var X=_(G,"particleCount",m),te=_(G,"angle",Number),ce=_(G,"spread",Number),se=_(G,"startVelocity",Number),Be=_(G,"decay",Number),xt=_(G,"gravity",Number),Xe=_(G,"drift",Number),dt=_(G,"colors",b),Is=_(G,"ticks",Number),ns=_(G,"shapes"),$r=_(G,"scalar"),Dr=!!_(G,"flat"),Hi=T(G),Gi=X,Fs=[],Or=M.width*Hi.x,Nr=M.height*Hi.y;Gi--;)Fs.push(E({x:Or,y:Nr,angle:te,spread:ce,startVelocity:se,color:dt[Gi%dt.length],shape:ns[g(0,ns.length)],ticks:Is,decay:Be,gravity:xt,drift:Xe,scalar:$r,flat:Dr}));return Q?Q.addFettis(Fs):(Q=$(M,Fs,W,he,ve),Q.promise)}function le(G){var he=I||_(G,"disableForReducedMotion",Boolean),ve=_(G,"zIndex",Number);if(he&&Z)return d(function(se){se()});P&&Q?M=Q.canvas:P&&!M&&(M=S(ve),document.body.appendChild(M)),N&&!V&&W(M);var X={width:M.width,height:M.height};F&&!V&&F.init(M),V=!0,F&&(M.__confetti_initialized=!0);function te(){if(F){var se={getBoundingClientRect:function(){if(!P)return M.getBoundingClientRect()}};W(se),F.postMessage({resize:{width:se.width,height:se.height}});return}X.width=X.height=null}function ce(){Q=null,N&&(O=!1,e.removeEventListener("resize",te)),P&&M&&(document.body.contains(M)&&document.body.removeChild(M),M=null,V=!1)}return N&&!O&&(O=!0,e.addEventListener("resize",te,!1)),F?F.fire(G,X,ce):J(G,X,ce)}return le.reset=function(){F&&F.reset(),Q&&Q.reset()},le}var B;function H(){return B||(B=R(null,{useWorker:!0,resize:!0})),B}function j(M,L,P,N,O,I,q){var F=new Path2D(M),W=new Path2D;W.addPath(F,new DOMMatrix(L));var V=new Path2D;return V.addPath(W,new DOMMatrix([Math.cos(q)*O,Math.sin(q)*O,-Math.sin(q)*I,Math.cos(q)*I,P,N])),V}function ue(M){if(!l)throw new Error("path confetti are not supported in this browser");var L,P;typeof M=="string"?L=M:(L=M.path,P=M.matrix);var N=new Path2D(L),O=document.createElement("canvas"),I=O.getContext("2d");if(!P){for(var q=1e3,F=q,W=q,V=0,Z=0,Q,J,le=0;le<q;le+=2)for(var G=0;G<q;G+=2)I.isPointInPath(N,le,G,"nonzero")&&(F=Math.min(F,le),W=Math.min(W,G),V=Math.max(V,le),Z=Math.max(Z,G));Q=V-F,J=Z-W;var he=10,ve=Math.min(he/Q,he/J);P=[ve,0,0,ve,-Math.round(Q/2+F)*ve,-Math.round(J/2+W)*ve]}return{type:"path",path:L,matrix:P}}function Le(M){var L,P=1,N="#000000",O='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof M=="string"?L=M:(L=M.text,P="scalar"in M?M.scalar:P,O="fontFamily"in M?M.fontFamily:O,N="color"in M?M.color:N);var I=10*P,q=""+I+"px "+O,F=new OffscreenCanvas(I,I),W=F.getContext("2d");W.font=q;var V=W.measureText(L),Z=Math.ceil(V.actualBoundingBoxRight+V.actualBoundingBoxLeft),Q=Math.ceil(V.actualBoundingBoxAscent+V.actualBoundingBoxDescent),J=2,le=V.actualBoundingBoxLeft+J,G=V.actualBoundingBoxAscent+J;Z+=J+J,Q+=J+J,F=new OffscreenCanvas(Z,Q),W=F.getContext("2d"),W.font=q,W.fillStyle=N,W.fillText(L,le,G);var he=1/P;return{type:"bitmap",bitmap:F.transferToImageBitmap(),matrix:[he,0,0,he,-Z*he/2,-Q*he/2]}}t.exports=function(){return H().apply(this,arguments)},t.exports.reset=function(){H().reset()},t.exports.create=R,t.exports.shapeFromPath=ue,t.exports.shapeFromText=Le})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),qi,!1);const Je=qi.exports;qi.exports.create;class Ca{burst({x:e,y:t,color:i="#ffd166",count:n=20,spread:r=50,startVelocity:l=22}){try{Je({particleCount:n,spread:r,startVelocity:l,ticks:60,origin:{x:e/window.innerWidth,y:t/window.innerHeight},colors:[i,"#fff8ec","#ffc971"],shapes:["circle","square"],scalar:.7})}catch{}}celebrate({count:e=140,spread:t=80}={}){try{Je({particleCount:e,spread:t,origin:{y:.55},colors:["#e63946","#f4a261","#ffc971","#b5c99a","#457b9d","#9b5de5"]})}catch{}}fountain({x:e,y:t,color:i="#ffd166",count:n=60}){try{const r={x:e/window.innerWidth,y:t/window.innerHeight};Je({particleCount:n/2,angle:60,spread:55,origin:r,colors:[i,"#fff8ec"],startVelocity:35}),Je({particleCount:n/2,angle:120,spread:55,origin:r,colors:[i,"#fff8ec"],startVelocity:35})}catch{}}confettiFromSides({count:e=50}={}){try{Je({particleCount:e,angle:60,spread:55,origin:{x:0,y:.7}}),Je({particleCount:e,angle:120,spread:55,origin:{x:1,y:.7}})}catch{}}firework({x:e,y:t,color:i="#ffd166"}={}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};Je({particleCount:30,spread:360,startVelocity:25,origin:n,colors:[i,"#fff8ec","#ffc971","#9b5de5"],scalar:.8})}catch{}}drop({x:e,y:t,color:i="#a8dadc"}={}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};Je({particleCount:12,spread:25,startVelocity:18,origin:n,colors:[i,"#fff8ec","#5fa8b5"],scalar:.5})}catch{}}}const zt=new Ca,Js=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Ma=36,ei=["C4","D4","E4","F4","G4","A4","B4"],Ea=["B4","A4","G4","F4","E4","D4","C4"],Aa=new Set(["sol","la","si"]),wn=["完美!","真棒!","不错哟!","完整 7 音在聚集!"];function Pa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=7);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new La(s.stage),s.say("爬上树屋看完整 7 音阶! Fa 和 Si 是新的朋友~ 拖鱼到对应台阶 (Do 最低 → Si 最高)"),s.fishPool=new As(s.stage,Js),s.fishPool.setDragEnabled(!0),s.fishPool.intro();const n=["do","re","mi","fa","sol","la","si"];s._level7Placed=new Set,s._level7Count=0,s.fishPool.onTap=l=>{if(l){try{s.audio.playNote(l.dataset.pitch)}catch{}try{s.audio.hover(l.dataset.id)}catch{}D.fromTo(l,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})}},s.fishPool.onDragStart=l=>{try{s.audio.hover(l.dataset.id)}catch{}},s.fishPool.onDragMove=()=>{},s.fishPool.onDrop=(l,o,a)=>{const d=l.dataset.id;if(s._level7Placed.has(d))return;const c=l.getBoundingClientRect(),f=c.left+c.width/2,h=c.top+c.height/2;let p=null,v=1/0;if(s.scene&&s.scene.background)for(const m of n){const g=s.scene.background.querySelector(`.level7-step[data-note="${m}"]`);if(!g)continue;const y=g.getBoundingClientRect(),b=y.left+y.width/2,w=y.top+y.height/2,T=Math.hypot(b-f,w-h);T<v&&(v=T,p=m)}const u=p&&v<Ma,_=Js.find(m=>m.id===d);if(u&&d===p){s._level7Placed.add(d),s._level7Count=s._level7Placed.size;try{s.audio.correct()}catch{}const m=s.scene.background.querySelector(`.level7-step[data-note="${p}"]`),g=m.getBoundingClientRect(),y=g.left+g.width/2,b=g.top+g.height/2,w=parseFloat(l.style.left)||0,T=parseFloat(l.style.top)||0,x=y-c.left-w,k=b-c.top-T,S=_&&_.color||"#ffd166";try{s.scene.drawRibbon(p,{x:f,y:h},{x:y,y:b},S)}catch{}D.to(l,{x,y:k,scale:.85,duration:.55,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(d)}catch{}try{m.style.setProperty("--step-lit-color",S),m.classList.add("level7-step-lit")}catch{}try{zt.fountain({x:y,y:b,color:S})}catch{}try{D.fromTo(m,{scale:1},{scale:1.25,duration:.3,yoyo:!0,repeat:1,ease:"power2.out"})}catch{}if(_){try{s.audio.playNote(_.pitch)}catch{}try{s._floatScore(f,h,`${_.solfege} ✓`)}catch{}}try{setTimeout(()=>{try{s.audio.hover(d)}catch{}},220)}catch{}try{const E=s.scene.background.querySelector(".level7-birds path");E&&D.fromTo(E,{y:0},{y:-6,duration:.12,yoyo:!0,repeat:3,ease:"sine.inOut",overwrite:!0})}catch{}if(D.to(l,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>D.to(l,{rotation:0,duration:.2,ease:"power2.out"})}),D.fromTo(l,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),Aa.has(p)){try{const E=l;E.classList.add("level7-fish-lift"),setTimeout(()=>{try{E.classList.remove("level7-fish-lift")}catch{}},900)}catch{}try{m.classList.add("level7-step-glow")}catch{}}const C=wn[Math.min(s._level7Count-1,wn.length-1)]+" "+s._level7Count+" / 7";s.say(C),s._level7Count===7&&setTimeout(()=>r(),800)}})}else{s.wrongCount++;try{s.audio.wrong()}catch{}if(l.classList.add("shake"),setTimeout(()=>l.classList.remove("shake"),400),u&&p&&d!==p){const m=Js.find(y=>y.id===p),g=p==="fa"?"Fa 在 Mi 和 Sol 之间 (第 4 级台阶)":p==="si"?"Si 在 La 之上, 最高一级台阶 (最接近树屋)":`${m?m.solfege:"这个台阶"}`;s.say(`${_?_.solfege:"这条鱼"} 不是 ${g} 的鱼哦~`)}else d==="fa"?s.say("Fa 是新朋友! 它在 Mi 和 Sol 之间的台阶~"):d==="si"?s.say("Si 是新朋友! 它在 La 之上, 最高的台阶, 最接近树屋~"):s.say(`${_?_.solfege:"这条鱼"} 的家在树上, 找最近的圆圈~`);D.to(l,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}};function r(){const l=s._calcStars();try{s.progress.markLevelComplete(7,l)}catch{}try{s.scene.lightTreehouse()}catch{}try{s.audio.playScale(ei)}catch{}s.say("完整的 Do Re Mi Fa Sol La Si 上行! 太棒了~"),setTimeout(()=>{try{s.audio.playScale(Ea)}catch{}s.say("再来下行: Si La Sol Fa Mi Re Do")},ei.length*220+300),setTimeout(()=>{try{s.showWinOverlay(l,7)}catch{}},ei.length*220*2+1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}if(s.fishPool)try{s.fishPool.pool.innerHTML=""}catch{}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const $a=Object.freeze(Object.defineProperty({__proto__:null,default:Pa},Symbol.toStringTag,{value:"Module"}));class Da{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level8-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,e.querySelectorAll(".level8-song-card").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.song,o=i.find(a=>a.id===l);o&&typeof t=="function"&&t(o)})})}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const ti={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},We=80,Oa={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function Na(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=8);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Da(s.stage),s.say("森林音乐会开始! 选一首曲子~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level8-song-stage"></div>');const n=s.stage.querySelector(".level8-song-stage"),r="fps_level8_played_v1";function l(){try{const m=localStorage.getItem(r);if(!m)return new Set;const g=JSON.parse(m);return new Set(Array.isArray(g)?g:[])}catch{return new Set}}function o(m){const g=l();g.add(m);try{localStorage.setItem(r,JSON.stringify(Array.from(g)))}catch{}}l().size>=6&&n.insertAdjacentHTML("beforeend",'<div class="level8-all-played-badge">🎖 全部演奏!</div>'),s.scene.showSongSelector(n,m=>v(m)),s.kb=new bt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level8Seq=null,s._level8Idx=0,s._level8Total=0,s._level8Correct=0,s._level8Accepting=!1,s._level8Done=!1,s._level8Timeouts=[];let d=null,c=null;function f(){const m=document.getElementById("level8-audience");m&&(m.classList.remove("level8-cheer"),m.getBoundingClientRect(),m.classList.add("level8-cheer"),clearTimeout(c),c=setTimeout(()=>m.classList.remove("level8-cheer"),700))}function h(){s.stage.insertAdjacentHTML("beforeend",'<div class="level8-staff-area"></div>'),d=s.stage.querySelector(".level8-staff-area"),d.innerHTML=`
      <svg class="level8-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
        <line class="level8-staff-line" x1="40" y1="${We+40}" x2="760" y2="${We+40}" />
        <line class="level8-staff-line" x1="40" y1="${We+60}" x2="760" y2="${We+60}" />
        <line class="level8-staff-line" x1="40" y1="${We+80}" x2="760" y2="${We+80}" />
        <line class="level8-staff-line" x1="40" y1="${We+100}" x2="760" y2="${We+100}" />
        <line class="level8-staff-line" x1="40" y1="${We+120}" x2="760" y2="${We+120}" />
        <circle class="level8-current-note" cx="400" cy="0" r="16" fill="#ffd166" />
      </svg>
    `}function p(){return d?d.querySelector(".level8-current-note"):null}function v(m){n&&(n.innerHTML=`
        <div class="level8-now-playing">
          <div class="level8-playing-badge">🎼 正在演奏</div>
          <div class="level8-now-emoji">${m.emoji}</div>
          <div class="level8-now-text">演奏: <strong>${m.name}</strong></div>
          <div class="level8-difficulty-badge level8-diff-${m.difficulty}">难度 ${m.diff}</div>
          <div class="level8-progress">1 / ${m.melody.length}</div>
        </div>
      `),d||h(),s.say(`演奏《${m.name}》! 跟着音符按琴键~`),o(m.id),s._level8Song=m,s._level8Seq=[...m.melody],s._level8Total=s._level8Seq.length,s._level8Correct=0,s._level8Idx=0,s._level8Accepting=!1,s._level8Done=!1,setTimeout(u,800)}function u(){if(s._level8Done||s._level8Idx>=s._level8Seq.length)return;const m=s._level8Seq[s._level8Idx],g=ti[m],y=Oa[g.id],b=p();b&&(D.killTweensOf(b),D.set(b,{scale:1,opacity:1}),b.setAttribute("cy",y),b.dataset.pitch=m,b.classList.remove("incorrect"),s.say(`下一个: ${g.solfege} (${m})`),s._level8Accepting=!0,D.fromTo(b,{attr:{cy:y}},{attr:{cy:y+100},duration:4.5,ease:"none",onComplete:()=>{if(!s._level8Done&&s._level8Accepting){s._level8Accepting=!1,s.wrongCount++;try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),b.classList.add("incorrect"),setTimeout(()=>{b.classList.remove("incorrect"),s._level8Idx++,u()},600)}}}))}s.kb.onPress=m=>{if(!s._level8Accepting||s._level8Done||!s._level8Seq||s._level8Idx>=s._level8Seq.length)return;const g=s._level8Seq[s._level8Idx],y=m.dataset.pitch;if(y===g){s._level8Correct++,s._level8Accepting=!1;try{s.audio.correct()}catch{}try{s.audio.playNote(y)}catch{}const b=p();if(b&&(D.killTweensOf(b),D.to(b,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),n){const T=n.querySelector(".level8-progress");T&&(T.textContent=`${s._level8Idx+1} / ${s._level8Total}`)}f();const w=["完美!","森林在听!","真棒!"];s.say(w[Math.min(s._level8Correct-1,w.length-1)]),s._level8Idx++,s._level8Idx>=s._level8Seq.length?(s._level8Done=!0,s._level8Timeouts.push(setTimeout(_,800))):setTimeout(u,500)}else{s.wrongCount++;try{s.audio.wrong()}catch{}const b=ti[y];s.say(`这是 ${b?b.solfege:"?"}, 不是 ${ti[g].solfege}. 再听一下!`);const w=p();w&&w.classList.add("incorrect"),setTimeout(()=>{w&&w.classList.remove("incorrect")},300);try{s.audio.playNote(g)}catch{}}};function _(){const m=s._level8Song,g=m&&m.difficulty||1,y=s.wrongCount||0;let b;g<=1?b=s._calcStars&&s._calcStars()||(y<=0?3:y<=2?2:y<=5?1:0):g===2?b=y<=0?3:y<=3?2:y<=7?1:0:b=y<=1?3:y<=4?2:y<=9?1:0;try{s.progress.markLevelComplete(8,b)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}if(typeof s._flashScreen=="function")try{s._flashScreen()}catch{}if(typeof s._floatScore=="function")try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,"🎉 完美的表演! 🎉")}catch{}s.say("完美的表演! 森林在为你鼓掌!"),setTimeout(()=>{try{s.showWinOverlay(b,8)}catch{}},1200),s.stage.insertAdjacentHTML("beforeend",`
      <div class="level8-snapshot-panel">
        <button class="level8-snapshot-btn" id="level8-snapshot-btn"
                title="保存成就">📸</button>
        <div class="level8-completed-stamp" id="level8-completed-stamp">
          ✅ 完成啦!
        </div>
      </div>
    `),setTimeout(()=>{const T=document.getElementById("level8-completed-stamp");T&&T.classList.add("show")},600);const w=document.getElementById("level8-snapshot-btn");w&&(w.onclick=()=>{w.classList.add("clicked");const T=document.getElementById("level8-completed-stamp");T&&(T.textContent="🎉 成就已记录! 🎉",T.classList.add("show"));try{s.say("🎉 成就已记录!")}catch{}setTimeout(()=>w.classList.remove("clicked"),400)})}return setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),()=>{if(Array.isArray(s._level8Timeouts)&&(s._level8Timeouts.forEach(b=>clearTimeout(b)),s._level8Timeouts=[]),clearTimeout(c),s._level8Song=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level8-song-stage, .level8-staff-area, .level8-snapshot-panel").forEach(b=>b.remove());const m=document.getElementById("hud-level2");m&&(m.style.display="none");const g=document.querySelector(".hud__dots");g&&(g.style.display="");const y=document.getElementById("btn-replay");y&&(y.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ra=Object.freeze(Object.defineProperty({__proto__:null,default:Na},Symbol.toStringTag,{value:"Module"}));class Ia{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level9-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${ye}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const si=[{id:"cs",solfege:"Do#",pitch:"C#4"},{id:"ds",solfege:"Re#",pitch:"D#4"},{id:"fs",solfege:"Fa#",pitch:"F#4"},{id:"gs",solfege:"Sol#",pitch:"G#4"},{id:"as",solfege:"La#",pitch:"A#4"}];function xn(s,e,t,i="rgba(155, 93, 229, 0.7)"){const n=document.createElement("span");n.className="level9-touch-ripple",n.style.left=`${e}px`,n.style.top=`${t}px`,n.style.borderColor=i,s.appendChild(n),n.offsetWidth,n.classList.add("go"),setTimeout(()=>n.remove(),750)}function ii(s,e){const t=document.createElement("div");t.className="level9-combo-float",t.textContent=e;const i=(Math.random()-.5)*120;t.style.left=`calc(50% + ${i}px)`,t.style.top="38%",s.appendChild(t),setTimeout(()=>t.remove(),1200)}function Fa(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[1046.5,1318.51,1567.98].forEach((n,r)=>{const l=t+r*.05,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(n,l);const a=e.createGain();a.gain.setValueAtTime(1e-4,l),a.gain.exponentialRampToValueAtTime(.45,l+.008),a.gain.exponentialRampToValueAtTime(1e-4,l+.25),o.connect(a).connect(s._masterGain),o.start(l),o.stop(l+.3)})}catch{}}function Ba(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=9);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.scene=new Ia(s.stage),s.say("黑键朋友们也想被听见! 按从左到右的顺序听"),s.stage.insertAdjacentHTML("beforeend",'<div class="level9-keys-container"></div>');const i=s.stage.querySelector(".level9-keys-container"),n=document.createElement("div");n.className="level9-combo-meter",n.innerHTML='<span class="level9-combo-meter__num">0</span><span class="level9-combo-meter__x">x</span><span class="level9-combo-meter__label">连击</span>',n.style.display="none",i.appendChild(n);const r=n.querySelector(".level9-combo-meter__num");si.forEach((a,d)=>{const c=document.createElement("button");c.className="level9-key",c.dataset.id=a.id,c.dataset.pitch=a.pitch,c.innerHTML=`
      <div class="level9-key__label">${a.solfege}</div>
      <div class="level9-key__ripple"></div>
    `,i.appendChild(c),c.addEventListener("pointerdown",f=>{const h=c.getBoundingClientRect(),p=f.clientX-h.left,v=f.clientY-h.top;c.classList.add("pressed"),setTimeout(()=>c.classList.remove("pressed"),300),s.audio.playNote(a.pitch),a.id===si[s._level9Idx].id?(s._level9Idx++,s._level9Correct++,D.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1},{scale:3,opacity:0,duration:.6,ease:"power2.out"}),xn(c,p,v,"rgba(155, 93, 229, 0.85)"),s._level9Combo=(s._level9Combo||0)+1,s._level9Combo>=2&&(n.style.display="",r.textContent=String(s._level9Combo),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump"),ii(s.stage,`x${s._level9Combo}${s._level9Combo>=5?" 🔥":""}`),s._level9Combo>=5&&s._level9Combo%5===0&&Fa(s.audio)),s.say(["对!","完美!","真棒!"][Math.min(s._level9Correct-1,2)]),s._level9Idx>=si.length&&(s._level9Done=!0,s._level9Combo>=2&&ii(s.stage,`🎉 x${s._level9Combo} 全连!`),setTimeout(()=>{const u=Math.max(1,3-Math.floor(s.wrongCount/2));try{s.progress.markLevelComplete(9,u)}catch{}s.audio.playScale(["C#4","D#4","F#4","G#4","A#4"]),s.showWinOverlay(u,9)},800))):(s.wrongCount++,s.audio.wrong(),c.classList.add("shake"),setTimeout(()=>c.classList.remove("shake"),400),D.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1,backgroundColor:"#ff5252"},{scale:2.5,opacity:0,duration:.5,ease:"power2.out"}),xn(c,p,v,"rgba(255, 82, 82, 0.9)"),s._level9Combo&&s._level9Combo>=2&&ii(s.stage,"断啦 💔"),s._level9Combo=0,n.style.display="none",n.classList.remove("bump"),s.say("从左到右! 不对, 重来"),s._level9Idx=0)})}),s._level9Idx=0,s._level9Correct=0,s._level9Done=!1,s._level9Combo=0;const l=s.stage.querySelector(".level9-background");l&&l.classList.add("beat-pulse");const o=()=>{l&&l.classList.remove("beat-pulse"),n.classList.remove("bump"),n.style.display="none"};return()=>{o(),s.scene&&s.scene.teardown(),s.stage.querySelectorAll(".level9-keys-container").forEach(d=>d.remove()),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const qa=Object.freeze(Object.defineProperty({__proto__:null,default:Ba},Symbol.toStringTag,{value:"Module"})),kn=1400,Ha=260,ws=80,et=160,_t=(et-ws)/4,Ps=et+_t,Ga=(et+Ps)/2,Wa={mi:et,fa:et-_t/2,sol:et-_t,la:et-_t*1.5,si:et-_t*2,re:Ga,do:Ps};class ja{constructor(e,t){this.root=e,this.notes=t,this.filled=new Set,this.render()}render(){const e=document.createElement("div");e.className="staff-wrap stage__staff-area";const t=[0,1,2,3,4].map(l=>`<line class="staff__line" x1="80" y1="${ws+l*_t}" x2="${kn-20}" y2="${ws+l*_t}"/>`).join(""),i=200,n=`<line class="staff__ledger" x1="${i-30}" y1="${Ps}" x2="${i+30}" y2="${Ps}"/>`,r=this.notes.map((l,o)=>{const a=200+o*130,d=Wa[l.id]??ws;return`
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
      <svg class="staff" xmlns="${ye}" viewBox="0 0 ${kn} ${Ha}"
           preserveAspectRatio="xMidYMid meet" aria-label="五线谱">
        <!-- 高音谱号 -->
        <text class="staff__clef" x="105" y="120" dominant-baseline="middle">𝄞</text>

        <!-- 5 条主线 -->
        ${t}

        <!-- Do 的加线(下方第 1 加线,虚线) -->
        ${n}

        <!-- 7 个占位点 + 标签 -->
        ${r}
      </svg>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.slots=new Map,this.svg.querySelectorAll(".staff-slot").forEach(l=>{this.slots.set(l.dataset.id,l)})}fillNote(e){if(this.filled.has(e))return;this.filled.add(e);const t=this.slots.get(e);if(!t)return;const i=this.notes.find(o=>o.id===e);if(!i)return;const n=t.querySelector(".staff__dot");if(!n)return;n.classList.remove("empty"),n.setAttribute("r","23"),n.style.fill=i.color,t.classList.add("filled"),t.querySelectorAll(".staff__label").forEach(o=>o.style.visibility="visible");const r=t.querySelector(".staff__placeholder-ring");r&&(r.style.display="none");const l=t.querySelector(".staff__placeholder-label");l&&(l.style.display="none")}showHint(e){this.clearHint();const t=this.slots.get(e);!t||this.filled.has(e)||t.classList.add("hint")}clearHint(){this.svg.querySelectorAll(".staff-slot.hint").forEach(e=>{e.classList.remove("hint")})}setTarget(e){if(this.clearTarget(),!e)return;const t=this.slots.get(e);if(!t||this.filled.has(e))return;t.classList.add("targeting");const i=this.notes.findIndex(n=>n.id===e);if(i>0){const n=this.notes[i-1].id,r=this.slots.get(n);r&&!this.filled.has(n)&&r.classList.add("targeting-adjacent")}if(i>=0&&i<this.notes.length-1){const n=this.notes[i+1].id,r=this.slots.get(n);r&&!this.filled.has(n)&&r.classList.add("targeting-adjacent")}}clearTarget(){this.svg.querySelectorAll(".staff-slot.targeting, .staff-slot.targeting-adjacent").forEach(e=>{e.classList.remove("targeting","targeting-adjacent")})}flashFill(e){const t=this.slots.get(e);t&&(t.classList.add("filling"),setTimeout(()=>{try{t.classList.remove("filling")}catch{}},900))}reset(){this.filled.clear(),this.svg.querySelectorAll(".staff-slot").forEach(e=>{e.classList.remove("filled","hint","targeting","targeting-adjacent","filling");const t=e.querySelector(".staff__dot");t&&(t.classList.add("empty"),t.setAttribute("r","20"),t.style.fill=""),e.querySelectorAll(".staff__label").forEach(r=>r.style.visibility="hidden");const i=e.querySelector(".staff__placeholder-ring");i&&(i.style.display="");const n=e.querySelector(".staff__placeholder-label");n&&(n.style.display="")})}}const Tn="forest-piano-achievements",_s=[{id:"first-graduate",name:"🎓 毕业生",desc:"完成任意一关",emoji:"🎓",check:s=>(s.completedLevels||[]).length>=1},{id:"forest-master",name:"🏆 森林大师",desc:"完成全部 8 关",emoji:"🏆",check:s=>{const e=(s.completedLevels||[]).map(String);return[1,2,3,4,5,6,7,8].every(t=>e.includes(String(t)))}},{id:"perfect-pitch",name:"⭐ 完美演奏",desc:"获得任一关 3 颗星",emoji:"⭐",check:s=>Object.values(s.stars||{}).some(e=>Number(e)>=3)},{id:"diamond-ear",name:"💎 钻石之耳",desc:"全部 8 关都获得 3 颗星",emoji:"💎",check:s=>{const e=s.stars||{};return[1,2,3,4,5,6,7,8].every(t=>Number(e[t]||0)>=3)}},{id:"repeat-master",name:"🔁 重复高手",desc:"累计完成 10 次关卡 (含重玩)",emoji:"🔁",check:s=>Number(s.totalCompletions||0)>=10},{id:"treehouse-climber",name:"🌳 树屋登顶",desc:"完成第 7 关 (完整 7 音阶)",emoji:"🌳",check:s=>(s.completedLevels||[]).map(String).includes("7")},{id:"concert-master",name:"🎵 音乐家",desc:"完成第 8 关 (音乐会)",emoji:"🎵",check:s=>(s.completedLevels||[]).map(String).includes("8")},{id:"drumming-kid",name:"🥁 小鼓手",desc:"完成第 4 关 (节奏)",emoji:"🥁",check:s=>(s.completedLevels||[]).map(String).includes("4")},{id:"mountaineer",name:"🏔️ 山谷行者",desc:"完成第 3 关 (五声音阶)",emoji:"🏔️",check:s=>(s.completedLevels||[]).map(String).includes("3")},{id:"two-hands",name:"🎹 双手钢琴家",desc:"完成第 6 关 (双手协调)",emoji:"🎹",check:s=>(s.completedLevels||[]).map(String).includes("6")},{id:"starter",name:"🌱 萌芽",desc:"完成第 1 关 (入门)",emoji:"🌱",check:s=>(s.completedLevels||[]).map(String).includes("1")},{id:"listener",name:"👂 敏锐耳朵",desc:"完成第 2 关 (听音找鱼)",emoji:"👂",check:s=>(s.completedLevels||[]).map(String).includes("2")}];class za{constructor(e){this.progress=e,this.state=this._load(),this.unlocked=new Set(this.state.unlockedIds),this._backfill()}_load(){try{if(typeof localStorage>"u")return{unlockedIds:[]};const e=localStorage.getItem(Tn);if(e){const t=JSON.parse(e);if(t&&Array.isArray(t.unlockedIds))return t}}catch{}return{unlockedIds:[]}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Tn,JSON.stringify({unlockedIds:Array.from(this.unlocked)}))}catch{}}_backfill(){if(!this.progress)return;let e=!1;try{const t=this.progress.getSnapshot();for(const i of _s)this.unlocked.has(i.id)||i.check(t)&&(this.unlocked.add(i.id),e=!0);e&&this._save()}catch{}}checkAndUnlock(){let e;try{e=this.progress?this.progress.getSnapshot():null}catch{e=null}if(!e)return[];const t=[];for(const i of _s)if(!this.unlocked.has(i.id))try{i.check(e)&&(this.unlocked.add(i.id),t.push(i))}catch{}return t.length>0&&this._save(),t}has(e){return this.unlocked.has(e)}getAll(){return _s.map(e=>({...e,unlocked:this.unlocked.has(e.id)}))}getProgressPercent(){const e=_s.length;return Math.round(this.unlocked.size/e*100)}getUnlockedCount(){return this.unlocked.size}reset(){this.unlocked=new Set,this._save()}}class Va{static show(e,t={}){if(!e)return;const i=Math.max(1500,Number(t.durationMs)||4500),n=document.querySelector(`.achievement-toast[data-id="${Ya(e.id||"")}"]`);n&&n.remove();const r=document.createElement("div");r.className="achievement-toast",e.id&&(r.dataset.id=e.id),r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),r.innerHTML=`
      <div class="achievement-toast__icon">${e.emoji||"🏅"}</div>
      <div class="achievement-toast__body">
        <div class="achievement-toast__title">成就解锁!</div>
        <div class="achievement-toast__name">${Sn(e.name||"")}</div>
        ${e.desc?`<div class="achievement-toast__desc">${Sn(e.desc)}</div>`:""}
      </div>
    `,document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add("show")}),setTimeout(()=>{r.classList.remove("show"),r.classList.add("hide"),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},500)},i)}}function Sn(s){return s==null?"":String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ya(s){return String(s).replace(/[^a-zA-Z0-9_-]/g,"_")}class Qa{constructor(e){this.stage=e,this.canvas=null,this.ctx=null,this.analyser=null,this.dataArray=null,this._running=!1}init(e){if(!(!e||!e._webAudio))try{this.analyser=e._webAudio.createAnalyser(),this.analyser.fftSize=256,e._masterGain.connect(this.analyser),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount)}catch{}}show(){this.canvas||(this.canvas=document.createElement("canvas"),this.canvas.className="waveform-canvas",this.canvas.width=320,this.canvas.height=80,this.stage.appendChild(this.canvas),this.ctx=this.canvas.getContext("2d"),this._running=!0,this._loop())}hide(){this._running=!1,this.canvas&&this.canvas.parentNode&&(this.canvas.parentNode.removeChild(this.canvas),this.canvas=null)}_loop(){if(!this._running||!this.canvas||(requestAnimationFrame(()=>this._loop()),!this.analyser))return;this.analyser.getByteTimeDomainData(this.dataArray);const e=this.canvas.width,t=this.canvas.height;this.ctx.clearRect(0,0,e,t),this.ctx.strokeStyle="rgba(255, 209, 102, 0.5)",this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(0,t/2),this.ctx.lineTo(e,t/2),this.ctx.stroke(),this.ctx.lineWidth=2,this.ctx.strokeStyle="#ffd166",this.ctx.beginPath();const i=e/this.dataArray.length;let n=0;for(let r=0;r<this.dataArray.length;r++){const o=this.dataArray[r]/128*t/2;r===0?this.ctx.moveTo(n,o):this.ctx.lineTo(n,o),n+=i}this.ctx.stroke()}}class Ln{constructor(e){this.root=e,this.render()}render(){const e=document.createElement("div");e.className="bg",e.style.cssText=`
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
    `,this.root.appendChild(e)}}class Ua{constructor(e){this.root=e,this.render()}render(){const e=document.createElement("div");e.className="pip",e.innerHTML=`
      <svg viewBox="0 0 100 100">
        <!-- 身体 -->
        <ellipse cx="50" cy="58" rx="34" ry="32" fill="#ffd166" />
        <ellipse cx="50" cy="64" rx="26" ry="22" fill="#fff3b0" />
        <!-- 翅膀 -->
        <ellipse cx="30" cy="58" rx="10" ry="16" fill="#f4a261" transform="rotate(-15 30 58)"/>
        <!-- 眼睛 -->
        <circle cx="42" cy="48" r="6" fill="white"/>
        <circle cx="42" cy="48" r="3" fill="#1a1a1a">
          <animate attributeName="cx" values="42;45;42" dur="4s" repeatCount="indefinite"/>
        </circle>
        <circle cx="62" cy="48" r="6" fill="white"/>
        <circle cx="62" cy="48" r="3" fill="#1a1a1a">
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
    `,this.root.appendChild(e)}}const Ka=[{id:1,name:"小鱼跳进五线谱",emoji:"🐟",desc:"帮 7 条小鱼找到五线谱的家",theme:"#5fa8b5"},{id:2,name:"听!是谁在唱",emoji:"🎵",desc:"系统播音, 找出对应的鱼",theme:"#264653"},{id:3,name:"Mi-Sol 山谷",emoji:"🏔️",desc:"柯尔文爷爷教五声音阶",theme:"#e76f51"},{id:4,name:"节奏小河",emoji:"🥁",desc:"跟着节拍泡泡敲鼓",theme:"#1a3a4a"},{id:5,name:"小星星视奏",emoji:"⭐",desc:"跟着五线谱弹小星星",theme:"#2a2050"},{id:6,name:"双手协调",emoji:"🎹",desc:"钢琴老师教双手按双音",theme:"#d4a574"},{id:7,name:"树屋 7 音阶",emoji:"🌳",desc:"爬上树屋看完整七音阶",theme:"#65a30d"},{id:8,name:"森林音乐会",emoji:"🎭",desc:"选曲并演奏森林音乐会",theme:"#3d0a55"},{id:9,name:"黑键世界",emoji:"🖤",desc:"听声, 按顺序点黑键",theme:"#2a0a55"},{id:10,name:"八度之旅",emoji:"🎹",desc:"听音 — 是低八度还是高八度?",theme:"#1e3a5f"},{id:11,name:"翻牌记忆",emoji:"🎴",desc:"翻开两张牌找一样的朋友",theme:"#d96e8a"},{id:12,name:"番茄节奏",emoji:"🥁",desc:"跟着摆杆切菜 — 命中节拍!",theme:"#c0392b"},{id:13,name:"节奏大师",emoji:"⏱️",desc:"跟随节拍器逐渐加速,敲准 30 拍",theme:"#8b4513"},{id:14,name:"和弦建造",emoji:"🎶",desc:"拖三只鱼组成 C 大调",theme:"#9b5de5"},{id:15,name:"视奏大师",emoji:"🎼",desc:"快速读谱 + 按键",theme:"#457b9d"},{id:16,name:"节奏阶梯",emoji:"🚀",desc:"速度阶梯挑战",theme:"#f4a261"}];class Za{constructor(e,{progress:t,onSelect:i}){this.stage=e,this.progress=t,this.onSelect=i,this.element=null}show(){const e=document.createElement("div");e.className="level-map-overlay",e.innerHTML=`
      <div class="level-map-card">
        <div class="level-map-title">🌳 森林钢琴学校 🎹</div>
        <div class="level-map-subtitle">选一个关卡开始~</div>
        <div class="level-map-grid">
          ${Ka.map(t=>{const i=this.progress?this.progress.getStars(t.id):0,n=i>0?"⭐".repeat(i)+"☆".repeat(3-i):"☆☆☆";return`
              <button class="level-map-tile" data-id="${t.id}" style="--tile-accent: ${t.theme}">
                <div class="level-map-tile__emoji">${t.emoji}</div>
                <div class="level-map-tile__id">第 ${t.id} 关</div>
                <div class="level-map-tile__name">${t.name}</div>
                <div class="level-map-tile__desc">${t.desc}</div>
                <div class="level-map-tile__stars">${n}</div>
              </button>
            `}).join("")}
        </div>
        <div class="level-map-footer">v17.8 · 点击卡片开始</div>
      </div>
    `,this.stage.appendChild(e),this.element=e,e.querySelectorAll(".level-map-tile").forEach(t=>{t.addEventListener("click",()=>{const i=parseInt(t.dataset.id,10);t.classList.add("selected"),setTimeout(()=>{this.onSelect&&this.onSelect(i)},200)})})}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null)}}const Xa=Object.assign({"./Level1.js":Hr,"./Level10.js":fo,"./Level11.js":bo,"./Level12.js":So,"./Level13.js":Mo,"./Level14.js":No,"./Level15.js":Ho,"./Level16.js":zo,"./Level2.js":Yo,"./Level3.js":na,"./Level4.js":fa,"./Level5.js":ga,"./Level6.js":Sa,"./Level7.js":$a,"./Level8.js":Ra,"./Level9.js":qa}),$s=new Map;for(const[s,e]of Object.entries(Xa)){const t=s.match(/Level(\d+)\.js$/);t&&typeof e.default=="function"&&$s.set(parseInt(t[1],10),e.default)}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.levels=$s);const fe=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Cn=["真棒!","太厉害了~","不错哟!","加油加油!","马上就完成了!"];function Ja(s,e,t,i){const n=Cn[Math.floor(Math.random()*Cn.length)],r=Math.max(0,t-e),l=[`${s} 归位啦! ${n} 还有 ${r} 条~`,`${s} 找到家啦! 🎉 还差 ${r} 条就胜利~`,`耶! ${s} 也安顿好了~ 再来 ${r} 条!`];return i>=3&&(l.push(`没关系, ${s} 归位啦! 还剩 ${r} 条, 慢慢来~`),l.push(`慢慢来, ${s} 已经回家了! 还有 ${r} 条小鱼需要帮忙~`)),r===1?l.push(`${s} 也到家啦! 只剩最后 1 条小鱼咯! ⭐`):r===2&&l.push(`${s} 找到家啦! 再坚持一下, 还有 2 条~`),l[Math.floor(Math.random()*l.length)]}function ec(s,e){if(!s||s.length===0)return"试试别的鱼, 一条一条来~";const t=Math.floor(Math.random()*s.length),i=s[t],n=["最下面那条加线","加线上面那个间","最下面那条线 (si 隔壁)","往上数第 2 条线","往中间数的那个间","中间那条线 (la 隔壁)","中间上面那条线"],l=["mi","fa","sol","la","si","re","do"].indexOf(i.id),o=l>=0?n[l]:"五线谱上的位置",a=[`试试把 ${i.solfege} 拖到 ${o}~`,`${i.solfege} 的家在 ${o} 哦~ 🌟`,`这条 ${i.solfege} 小鱼呢? 它的家在 ${o}!`,`${i.solfege} 的家在 ${o} ✨ 帮它找找~`];return e>=4&&(a.push(`别着急~ 先听 ${i.solfege} 的声音, 再把它拖到 ${o} 上哦~`),a.push(`深呼吸! 把 ${i.solfege} 小心地拖到 ${o} ✨`)),a[Math.floor(Math.random()*a.length)]}class Ar{constructor({stageEl:e,bubbleEl:t,progress:i,audio:n}){rs(this,"_lastWrongHint","");rs(this,"_lastCorrectNote","");rs(this,"_firstCorrectNote",null);this.stage=e,this.bubble=t,this.progress=i,this.audio=n,this.achievements=new za(this.progress),this.placed=new Set,this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this.gate=!1,this._lastActivityAt=0,this._idleNudgeScheduled=!1,this._hintTimer=null,this.waveform=new Qa(this.stage),this.waveform.init(this.audio),this.waveform.show()}start({levelId:e}){if(document.querySelectorAll(".overlay").forEach(i=>i.remove()),this.stage&&(this.stage.innerHTML=""),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this.firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.gate=!1,this._level2AnswerNote=null,this._level2Current=0,this._level2Done=new Set,typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.audio&&typeof this.audio.stop=="function")try{this.audio.stop()}catch{}const t=$s.get(e);if(t){try{const i=t(this);this._teardownCurrentLevel=typeof i=="function"?i:null}catch(i){console.error(`Level ${e} failed to start:`,i),this._fallbackToLevel1()}return}console.warn(`Level ${e} not registered, falling back to Level 1`),this._startLevel1()}_fallbackToLevel1(){const e=$s.get(1)||this._startLevel1.bind(this);try{e(this)}catch(t){console.error(t)}}_startLevel1(){this._showLevel2HUD(!1),this._level1FirstTap=!1,this._lastTapTime=0,this.say("点屏幕开始呀～"),this.bg=new Ln(this.stage),this.staff=new ja(this.stage,fe),this.kb=new bt(this.stage,fe),this.fishPool=new As(this.stage,fe),this.pip=new Ua(this.stage),this.fishPool.setDragEnabled(!0),this.fishPool.onDrop=(e,t,i)=>this.onFishDrop(e,t,i),this.fishPool.onDragStart=e=>{this._markActivity(),this.hasStartedDrag||(this.hasStartedDrag=!0),this.audio.hover(e.dataset.id)},this.fishPool.onDragMove=(e,t)=>{if(this._markActivity(),!!this.staff)if(t){const i=t.dataset.id;this.staff.setTarget(i),this.staff.showHint(i)}else this.staff.clearTarget(),this.staff.clearHint()},this.fishPool.onTap=e=>{if(this._level1FirstTap){if(Date.now()-(this._lastTapTime||0)<250)return}else this._level1FirstTap=!0;this._lastTapTime=Date.now(),this._markActivity(),this.hasTappedFish||(this.hasTappedFish=!0,this._advanceHint("first_tap"));try{this.audio.playNote(e.dataset.pitch)}catch{}try{this.audio.hover(e.dataset.id)}catch{}D.fromTo(e,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})},this.kb.onPress=e=>{this._markActivity(),this.audio.playNote(e.dataset.pitch),this.kb.glowKey(e)},this._showStartOverlay()}_startLevel2(){this._showLevel2HUD(!0),this.say("第二关, 听音找鱼! 系统会播一个音, 找对的小鱼~"),this.bg=new Ln(this.stage),this.kb=new bt(this.stage,fe),this.fishPool=new As(this.stage,fe),this.fishPool.setDragEnabled(!1),this._level2Total=5,this._level2Current=0,this._level2AnswerNote=null,this._level2Done=new Set,this.gate=!0,this._level2FirstTap=!1,this._lastTapTime=0,this.fishPool.onTap=t=>{if(this._markActivity(),!t)return;if(this._level2FirstTap){if(Date.now()-(this._lastTapTime||0)<250)return}else this._level2FirstTap=!0;this._lastTapTime=Date.now();const i=t.dataset.id;this._level2AnswerNote&&this._handleLevel2Answer(i,t)},this.fishPool.onDragStart=null,this.fishPool.onDragMove=null,this.fishPool.onDrop=null,this.kb.onPress=t=>{this._markActivity(),this.audio.playNote(t.dataset.pitch),this.kb.glowKey(t)};const e=document.getElementById("btn-replay-q");e&&(e.onclick=()=>this._replayQuestion()),setTimeout(()=>{try{window.dispatchEvent(new Event("resize"))}catch{}},60),this._updateHudProgress(),setTimeout(()=>this._level2NextQuestion(),800)}_handleLevel2Answer(e,t){if(this._level2FirstTap){if(Date.now()-(this._lastTapTime||0)<250)return}else this._level2FirstTap=!0;if(this._lastTapTime=Date.now(),e===this._level2AnswerNote){try{this.audio.correct()}catch{}this._markLevel2FishCorrect(t);const i=fe.find(n=>n.id===e);this._floatScore(window.innerWidth/2,window.innerHeight/2,(i?i.solfege:"")+" ✓"),this.say(`对啦! 这就是 ${i?i.solfege:""} 🎉`),this._level2AnswerNote=null,setTimeout(()=>this._level2NextQuestion(),1600)}else{this.wrongCount++;try{this.audio.wrong()}catch{}t.classList.add("shake"),setTimeout(()=>t.classList.remove("shake"),400),this.say(`刚才听到的是 ${this._lastPlayedSolfege}, 再找找看? 🎵`),this._replayQuestion()}}_level2NextQuestion(){if(this._level2Current++,this._level2Current>this._level2Total)return this._handleLevel2Win();const e=this._level2Done||new Set,t=fe.filter(r=>!e.has(r.id)),i=t.length?t:fe,n=i[Math.floor(Math.random()*i.length)];this._level2AnswerNote=n.id,this._lastPlayedSolfege=n.solfege,this._updateLevel2HUD(),this.say("听一听, 哪条小鱼是这个音? 🎵");try{this.audio.playNote(n.pitch)}catch{}}_replayQuestion(){if(!this._level2AnswerNote)return;const e=fe.find(t=>t.id===this._level2AnswerNote);if(e)try{this.audio.playNote(e.pitch)}catch{}}_markLevel2FishCorrect(e){this._level2Done||(this._level2Done=new Set),this._level2Done.add(e.dataset.id),e.classList.add("fish--correct"),e.style.pointerEvents="none",this._updateHudProgress()}_updateLevel2HUD(){this._updateHudProgress()}_updateHudProgress(){const e=this._level2Done?this._level2Done.size:0,t=this._level2Total||5,i=document.getElementById("level2-badge");i&&(i.textContent=`第 ${e} / ${t} 题`);const n=document.getElementById("btn-replay-q");n&&(n.style.display=this._level2Current<=t?"":"none")}_handleLevel2Win(){this.gate=!1,this._clearHintTimer();const e=this._calcStars();try{this.progress.markLevelComplete(2,e)}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{zt.celebrate()}catch{}setTimeout(()=>this.showWinOverlay(e,2),1200)}_showLevel2HUD(e){const t=document.getElementById("hud-level2");t&&(t.style.display=e?"":"none");const i=document.querySelector(".hud__dots");i&&(i.style.display=e?"none":"");const n=document.getElementById("btn-replay");n&&(n.style.display=e?"none":"")}_showStartOverlay(){document.querySelectorAll(".overlay").forEach(i=>i.remove());const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=new Za(this.stage,{progress:this.progress,onSelect:i=>{this.audio.unlockOnGesture().catch(n=>console.warn(n)),t.hide(),this.start({levelId:i})}});t.show()}_beginLevel(){this.gate=!0,this._markActivity(),this.say("欢迎来到森林!🐤 点点小鱼, 听听它们的声音~"),this.fishPool.intro(),this._pulseStaff(),this._enterHint("intro")}_pulseStaff(){if(!this.staff||!this.staff.svg)return;this.staff.svg.querySelectorAll(".staff-slot").forEach((t,i)=>{setTimeout(()=>{t.classList.add("pulse-hint"),setTimeout(()=>t.classList.remove("pulse-hint"),2400)},i*100)})}_markActivity(){this._lastActivityAt=Date.now()}_clearHintTimer(){this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null)}_enterHint(e){if(!this.bubble)return;this._clearHintTimer();let t="";switch(e){case"intro":t="先把手指放在小鱼上, 听听它唱的啥 🎵",this._scheduleIdleNudge(12e3,"idle_1");break;case"hint_listen":t="先随便摸一条鱼听听它的声音吧~ 🐟",this._scheduleIdleNudge(14e3,"idle_1");break;case"first_tap":t="听到了吗? 这种声音在钢琴上也有哦! 🎹",this._scheduleIdleNudge(1e4,"idle_drag");break;case"hint_drag":t="试试长按这条鱼, 拖到上面五线谱 Do 的位置~",this._scheduleIdleNudge(1e4,"idle_drag");break;case"first_correct":{const i=this._placedOnText(this.firstCorrectNote),n=fe.length-1,r=[`${i} 找到家啦! 还有 ${n} 个要帮~`,`耶! ${i} 归位! 🎉 还有 ${n} 条小鱼等着你呢~`,`真棒! ${i} 已经回到五线谱啦! 还差 ${n} 条~`];t=r[Math.floor(Math.random()*r.length)],this._scheduleIdleNudge(12e3,"idle_keep_going");break}case"correct_subsequent":{const i=this._lastCorrectNote;t=Ja(i,this.placed.size,fe.length,this.wrongCount),this._scheduleIdleNudge(14e3,"idle_keep_going");break}case"wrong_drop_near":{const i=this._lastWrongHint||"呀, 试试上面那个颜色一样的位置!";t=this.wrongCount>=2?`没关系的! ${i}`:i,this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"wrong_drop_far":{const i=["不对哟~ 拖到上面那条五线谱的家 ✨","鱼还在游呢! 帮它回到上面五线谱的家吧~","呀, 再往上一点! 五线谱在上面等着呢~"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"idle_keep_going":{const i=fe.filter(n=>!this.placed.has(n.id));t=ec(i,this.wrongCount),this._scheduleIdleNudge(12e3,"idle_hard");break}case"idle_hard":{const i=["先听一首钢琴曲怎么样? 试试底下的钢琴键吧! 🎹","需要休息吗? 听听其它音乐, 等下再来! 🎵","先随便摸鱼听听声音, 找找感觉再继续! 🐟"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(2e4,"idle_give_up");break}case"win":return;default:t=e}this.say(t),this.bubble.classList.remove("bubble--pulse"),this.bubble.offsetWidth,this.bubble.classList.add("bubble--pulse")}_advanceHint(e){switch(e){case"first_tap":this._hintTimer=setTimeout(()=>this._enterHint("hint_drag"),4500);break;case"first_correct":this._enterHint("first_correct");break;case"subsequent_correct":this._enterHint("correct_subsequent");break}}_scheduleIdleNudge(e,t){this._idleNudgeScheduled||(this._clearHintTimer(),this._hintTimer=setTimeout(()=>{if(t==="idle_1"&&!this.hasTappedFish||t==="idle_drag"&&!this.hasStartedDrag||t==="idle_keep_going"&&this.placed.size<fe.length||t==="idle_hard"){this._idleNudgeScheduled=!1,this._enterHint(t);return}},e),this._idleNudgeScheduled=!0)}_placedOnText(e){const t=fe.find(i=>i.id===e);return t?t.solfege:"小鱼"}onFishDrop(e,t,i){this.gate&&(this._markActivity(),i&&t?this.handleCorrect(e,t):this.handleWrong(e,t))}handleCorrect(e,t){const i=e.dataset.id;if(this.placed.has(i))return;this.placed.add(i);try{this.fishPool.lockFish(i)}catch{}this._lastCorrectNote=this._placedOnText(i);const n=this.firstCorrectNote===null||this.firstCorrectNote===void 0;n&&(this.firstCorrectNote=i);const r=t.getBoundingClientRect(),l=this.fishPool.root.getBoundingClientRect(),o=r.left-l.left+r.width/2,a=r.top-l.top+r.height/2,d=parseFloat(e.style.left)||0,c=parseFloat(e.style.top)||0,f=o-d-e.offsetWidth/2,h=a-c-e.offsetHeight/2;D.to(e,{x:f,y:h,scale:.85,duration:.5,ease:"back.out(1.7)",onComplete:()=>{try{this.staff.flashFill(i)}catch{}try{this.staff.fillNote(i)}catch{}try{this.staff.clearTarget()}catch{}const p=this.kb&&this.kb.svg?this.kb.svg.querySelector(`.key--white[data-id="${i}"]`):null;if(p){try{this.kb.glowKey(p)}catch{}try{this.audio.playNote(p.dataset.pitch)}catch{}}try{this.audio.correct()}catch{}const v=(fe.find(_=>_.id===i)||{}).color||"#ffc971";this.burst(r.left+r.width/2,r.top+r.height/2,v);try{zt.burst({x:r.left+r.width/2,y:r.top+r.height/2,color:"#fff8ec",count:10,spread:70,startVelocity:18})}catch{}try{this.kb.markPlaced(i,v)}catch{}this._flashScreen();const u=fe.find(_=>_.id===i);if(u){this._floatScore(r.left+r.width/2,r.top,`${u.solfege} +1`);try{this.audio.playNote(u.pitch)}catch{}}D.to(e,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>D.to(e,{rotation:0,duration:.2,ease:"power2.out"})}),D.fromTo(e,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),this.addStar(),n?this._advanceHint("first_correct"):this._advanceHint("subsequent_correct"),this.placed.size===fe.length&&setTimeout(()=>this.handleWin(),600)}})}handleWrong(e,t){this.wrongCount++;try{this.audio.wrong()}catch{}this.staff&&(this.staff.clearHint(),this.staff.clearTarget()),e.classList.add("shake"),setTimeout(()=>e.classList.remove("shake"),400),D.to(e,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"});const i=e.dataset.id,n=fe.find(r=>r.id===i);t?(this._lastWrongHint=`${n?n.solfege:"这条鱼"} 的家在上面, 看看五线谱上的唱名哦~`,this._enterHint("wrong_drop_near")):(this._lastWrongHint="把鱼拖到上面五线谱的圆圈里~",this._enterHint("wrong_drop_far"))}_calcStars(){return this.wrongCount<=0?3:this.wrongCount<=2?2:this.wrongCount<=5?1:0}applyFinalStars(){return this._calcStars()}handleWin(){this.gate=!1,this._clearHintTimer();const e=this.applyFinalStars();try{this.progress.markLevelComplete(1,e)}catch{}try{this.kb.glowAll()}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}zt.celebrate(),setTimeout(()=>this.showWinOverlay(e,1),1800)}addStar(){const e=document.querySelectorAll("#hud-dots .dot"),t=this.placed.size-1;t>=0&&t<e.length&&(e[t].classList.remove("on"),e[t].offsetWidth,e[t].classList.add("on"))}showWinOverlay(e,t=1){if(document.querySelectorAll(".overlay").forEach(v=>v.remove()),this.achievements)try{this.achievements.checkAndUnlock().forEach((u,_)=>{setTimeout(()=>{try{Va.show(u)}catch{}},1500+_*800)})}catch{}const i=[0,1,2].map(v=>`<span class="win-star ${v<e?"on":""}">${v<e?"⭐":"☆"}</span>`).join(""),n=this.wrongCount,r=t===2,l=r?"🎉 第二关完成!":"🎉 第一关完成!",o=r?"你的耳朵越来越灵啦! 听音找鱼全对~":"你已经认识了 Do Re Mi Fa Sol La Si",a=r?this._level2Total||5:fe.length,d=r?"答对题数":"正确放置",c=document.createElement("div");c.className="overlay",c.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">${l}</div>
        <div class="win-stars">${i}</div>
        <p class="overlay__text">${o}</p>

        <div class="win-stats">
          <div class="win-stat ${n===0?"good":n<=2?"ok":n<=5?"meh":"bad"}">
            <span class="win-stat__icon">${n===0?"✨":"✋"}</span>
            <span class="win-stat__label">${n===0?"零错误":"错误尝试"}</span>
            <span class="win-stat__value">${n===0?"0 次":n+" 次"}</span>
          </div>
          <div class="win-stat">
            <span class="win-stat__icon">🎵</span>
            <span class="win-stat__label">${d}</span>
            <span class="win-stat__value">${a} / ${a}</span>
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
    `,document.body.appendChild(c);const f=c.querySelector("#win-share-btn");f&&(f.onclick=async()=>{try{const{Share:v}=await Dt(async()=>{const{Share:_}=await import("./Share-Dvvz4a-6.js");return{Share:_}},[],import.meta.url),u=new v(this);c.style.display="none",u.showShareMenu({levelId:t,stars:e,wrongCount:this.wrongCount,totalQuestions:t===2?this._level2Total||5:7},()=>{c.style.display=""})}catch(v){console.warn("[share] 打开分享菜单失败:",v)}});const h=c.querySelector("#next-btn");t===1?(h.textContent="第 2 关 ›",h.onclick=()=>{c.remove(),this.say("第二关马上来..."),this.start({levelId:2})}):(h.textContent="🎉 全部完成",h.onclick=()=>{c.remove(),this._showAllDoneOverlay()}),c.querySelector("#replay-btn").onclick=()=>{c.remove(),this.start({levelId:t})};const p=c.querySelector("#achievements-btn");p&&(p.onclick=async()=>{try{const{AchievementsWall:v}=await Dt(async()=>{const{AchievementsWall:_}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:_}},[],import.meta.url);c.remove(),new v(document.body,{achievementSystem:this.achievements,onClose:()=>{this.showWinOverlay(e,t)}}).show()}catch(v){console.warn("[achievements] 打开成就墙失败:",v)}})}_showAllDoneOverlay(){document.querySelectorAll(".overlay").forEach(t=>t.remove());const e=document.createElement("div");e.className="overlay",e.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">🌟 全部完成!</div>
        <div class="overlay__text">已经认识了 7 个音符 + 听音找鱼<br>更多关卡以后解锁~</div>
        <div class="overlay__btns">
          <button class="btn-secondary" id="replay-btn">↻ 再玩一次 (第 1 关)</button>
        </div>
      </div>
    `,document.body.appendChild(e),e.querySelector("#replay-btn").onclick=()=>{e.remove(),this.start({levelId:1})}}_correctnessComment(e){return e===3?"全对! 你真是个钢琴小天才 ⭐":e===2?"不错! 错一点点, 离完美不远了~":e===1?"完成了! 多练几次就能满分啦~":"没关系, 再来一次一定行!"}restartLevel(){document.querySelectorAll(".overlay").forEach(e=>e.remove()),this._showLevel2HUD(!1),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.kb&&this.kb.resetMarks(),this.staff&&this.staff.reset(),this.fishPool&&this.fishPool.reset(),document.querySelectorAll("#hud-dots .dot").forEach(e=>{e.classList.remove("on")}),this._beginLevel()}burst(e,t,i){zt.burst({x:e,y:t,color:i})}_flashScreen(){const e=document.createElement("div");e.className="screen-flash",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.remove(),300)},50)}_floatScore(e,t,i){const n=document.createElement("div");n.className="score-float",n.textContent=i,n.style.left=`${e}px`,n.style.top=`${t}px`,document.body.appendChild(n),setTimeout(()=>n.remove(),1400)}say(e){this.bubble&&(this.bubble.textContent=e)}}const Y={MASTER_GAIN_NORMAL:.75,MASTER_GAIN_MUTED:0,TEST_BEEP_PEAK:.6,PLAYNOTE_ATTACK:.65,PLAYNOTE_DECAY:.35,PLAYNOTE_RELEASE:.8,PLAYNOTE_HARMONIC_2:.15,PLAYNOTE_HARMONIC_3:.05,PLAYNOTE_HARMONIC_4:.03,PLAYNOTE_HARMONIC_5:.015,HOVER_PEAK:.35,CORRECT_PEAK:.55,WRONG_PEAK:.45,ARPEGGIO_DEFAULT_PEAK:.5,REVERB_BUS_GAIN:.18,REVERB_WET:1,REVERB_FEEDBACK:.4,REVERB_DELAY:.25,REVERB_SEND:.2,HAMMER_NOISE_PEAK:.15,HAMMER_NOISE_DURATION:.05,ADSR_ATTACK:.01,ADSR_DECAY:.15,ADSR_RELEASE:.85};class Rs{constructor(){this.unlocked=!1,this.muted=!1,this._webAudio=null,this._masterGain=null,this._bus=null,this._realPianoLoaded=!1,this._reverbBus=null,this._reverbDelay=null,this._activeOscillators=new Set,this._activeSources=new Set}_trackOsc(e,t){if(!e)return;this._activeOscillators.add(e);const i=()=>{try{this._activeOscillators.delete(e)}catch{}};e.onended=i}_trackSource(e){e&&(this._activeSources.add(e),e.onended=()=>{try{this._activeSources.delete(e)}catch{}})}stop(){if(!this._webAudio)return;const t=this._webAudio.currentTime;this._activeOscillators.forEach(i=>{try{i.disconnect()}catch{}try{i.stop(t)}catch{}}),this._activeOscillators.clear(),this._activeSources.forEach(i=>{try{i.stop(t)}catch{}try{i.disconnect()}catch{}}),this._activeSources.clear()}async unlockOnGesture(){if(!this.unlocked){console.log("[Audio] unlockOnGesture entered");try{const e=window.AudioContext||window.webkitAudioContext;if(!e){console.warn("[Audio] Web Audio API not supported");return}this._webAudio||(this._webAudio=new e,this._masterGain=this._webAudio.createGain(),this._masterGain.gain.value=Y.MASTER_GAIN_NORMAL,this._masterGain.connect(this._webAudio.destination),this._setupReverb())}catch(e){console.warn("[Audio] 创建 AudioContext 失败:",e);return}if(this._webAudio.state==="suspended")try{this._webAudio.resume(),console.log("[Audio] resume() fired, state will become running")}catch(e){console.warn("[Audio] resume() failed:",e)}try{const e=this._webAudio.createOscillator(),t=this._webAudio.createGain();t.gain.value=0,e.connect(t).connect(this._masterGain),e.start(),e.stop(this._webAudio.currentTime+.01),console.log("[Audio] silent osc started (unlocker)")}catch(e){console.warn("[Audio] silent osc failed:",e)}try{const e=this._webAudio.currentTime+.05,t=this._webAudio.createOscillator(),i=this._webAudio.createGain();t.type="sine",t.frequency.setValueAtTime(523.25,e),i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(Y.TEST_BEEP_PEAK,e+.01),i.gain.exponentialRampToValueAtTime(1e-4,e+.4),t.connect(i).connect(this._masterGain),t.start(e),t.stop(e+.45),console.log("[Audio] test tone scheduled at currentTime+0.05")}catch(e){console.warn("[Audio] test tone schedule failed:",e)}try{const e=new Rs;e.src="data:audio/mp3;base64,//uQx",e.play().catch(()=>{})}catch{}this.unlocked=!0,this._loadPianoInBackground(),console.log("[Audio] unlocked! state=",this._webAudio.state)}}_resumeWebAudio(){this._webAudio&&this._webAudio.state==="suspended"&&this._webAudio.resume().catch(()=>{})}playNote(e){if(!(!this.unlocked||this.muted)&&(this._playNoteWebAudio(e),this._realPianoLoaded&&this._realPiano&&this._realPiano.triggerAttackRelease))try{this._realPiano.triggerAttackRelease(e,"8n")}catch{}}_setupReverb(){if(!this._webAudio||this._reverbBus)return;const e=this._webAudio;this._reverbBus=e.createGain(),this._reverbBus.gain.value=Y.REVERB_BUS_GAIN,this._reverbDelay=e.createDelay(1),this._reverbDelay.delayTime.value=Y.REVERB_DELAY;const t=e.createGain();t.gain.value=Y.REVERB_FEEDBACK;const i=e.createGain();i.gain.value=Y.REVERB_WET,this._reverbBus.connect(this._reverbDelay),this._reverbDelay.connect(t),t.connect(this._reverbDelay),t.connect(i),i.connect(this._masterGain)}_playNoteWebAudio(e){if(!this._webAudio)return;this._resumeWebAudio();const t=this._webAudio,i=t.currentTime,r={C4:261.63,"C#4":277.18,D4:293.66,"D#4":311.13,E4:329.63,F4:349.23,"F#4":369.99,G4:392,"G#4":415.3,A4:440,"A#4":466.16,B4:493.88}[e];if(!r)return;const l=Math.floor(t.sampleRate*Y.HAMMER_NOISE_DURATION),o=t.createBuffer(1,l,t.sampleRate),a=o.getChannelData(0);for(let k=0;k<l;k++)a[k]=(Math.random()*2-1)*(1-k/l);const d=t.createBufferSource();d.buffer=o;const c=t.createBiquadFilter();c.type="highpass",c.frequency.value=1500;const f=t.createGain();f.gain.value=Y.HAMMER_NOISE_PEAK,d.connect(c),c.connect(f),f.connect(this._masterGain),d.start(i),d.stop(i+Y.HAMMER_NOISE_DURATION),this._trackSource(d);const h=t.createOscillator();h.type="triangle",h.frequency.setValueAtTime(r,i);const p=t.createOscillator();p.type="sine",p.frequency.setValueAtTime(r*2,i);const v=t.createOscillator();v.type="sine",v.frequency.setValueAtTime(r*3,i);const u=t.createOscillator();u.type="sine",u.frequency.setValueAtTime(r*4,i);const _=t.createOscillator();_.type="sine",_.frequency.setValueAtTime(r*5,i);const m=t.createGain();m.gain.setValueAtTime(1e-4,i),m.gain.exponentialRampToValueAtTime(Y.PLAYNOTE_ATTACK,i+Y.ADSR_ATTACK),m.gain.exponentialRampToValueAtTime(Y.PLAYNOTE_DECAY,i+Y.ADSR_DECAY),m.gain.exponentialRampToValueAtTime(1e-4,i+Y.PLAYNOTE_RELEASE);const g=t.createGain();g.gain.value=Y.PLAYNOTE_HARMONIC_2;const y=t.createGain();y.gain.value=Y.PLAYNOTE_HARMONIC_3;const b=t.createGain();b.gain.value=Y.PLAYNOTE_HARMONIC_4;const w=t.createGain();w.gain.value=Y.PLAYNOTE_HARMONIC_5,h.connect(m),p.connect(g),g.connect(m),v.connect(y),y.connect(m),u.connect(b),b.connect(m),_.connect(w),w.connect(m),m.connect(this._masterGain);const T=t.createGain();T.gain.value=Y.REVERB_SEND,m.connect(T),T.connect(this._reverbBus);const x=i+Y.ADSR_RELEASE;h.start(i),h.stop(x),p.start(i),p.stop(x),v.start(i),v.stop(x),u.start(i),u.stop(x),_.start(i),_.stop(x),this._trackOsc(h,x),this._trackOsc(p,x),this._trackOsc(v,x),this._trackOsc(u,x),this._trackOsc(_,x)}hover(e){!this.unlocked||this.muted||this._sfxBubble()}correct(){!this.unlocked||this.muted||this._sfxArpeggio([523.25,659.25,783.99,1046.5],.18,.06,"sine",Y.CORRECT_PEAK)}wrong(){!this.unlocked||this.muted||this._sfxSlide(320,150,.35,"triangle",Y.WRONG_PEAK)}async playScale(e){!this.unlocked||this.muted||(e.forEach((t,i)=>{setTimeout(()=>this._playNoteWebAudio(t),i*220)}),setTimeout(()=>this._sfxArpeggio([1046.5,1567.98,2093],.12,.08,"sine",Y.ARPEGGIO_DEFAULT_PEAK),e.length*220+200))}toggleMute(){if(this.muted=!this.muted,this._masterGain&&(this._masterGain.gain.cancelScheduledValues(this._webAudio.currentTime),this._masterGain.gain.linearRampToValueAtTime(this.muted?Y.MASTER_GAIN_MUTED:Y.MASTER_GAIN_NORMAL,.05)),this.muted)try{this.stop()}catch{}return this.muted}async _loadPianoInBackground(){try{const e=await Dt(()=>import("./index-DWHXqSMG.js"),[],import.meta.url);await e.start(),this._bus=new e.Gain(.9).toDestination();const t=new e.Sampler({urls:{A1:"A1.mp3",A2:"A2.mp3",A3:"A3.mp3",A4:"A4.mp3",A5:"A5.mp3",A6:"A6.mp3",C1:"C1.mp3",C2:"C2.mp3",C3:"C3.mp3",C4:"C4.mp3",C5:"C5.mp3",C6:"C6.mp3"},baseUrl:"https://tonejs.github.io/audio/salamander/",release:1.4}).connect(this._bus),i=new Promise(r=>setTimeout(()=>r("timeout"),12e3));await Promise.race([e.loaded(),i])!=="timeout"?(this._realPiano=t,this._realPianoLoaded=!0,console.log("[Audio] Salamander 钢琴加载完成")):console.warn("[Audio] 钢琴采样加载超时, 保持 Web Audio 合成器")}catch(e){console.warn("[Audio] Salamander 加载失败:",e)}}_sfxBubble(){if(!this._webAudio)return;this._resumeWebAudio();const e=this._webAudio,t=e.currentTime,i=e.createOscillator();i.type="sine",i.frequency.setValueAtTime(420,t),i.frequency.exponentialRampToValueAtTime(180,t+.12);const n=e.createGain();n.gain.setValueAtTime(1e-4,t),n.gain.exponentialRampToValueAtTime(Y.HOVER_PEAK,t+.01),n.gain.exponentialRampToValueAtTime(1e-4,t+.14),i.connect(n).connect(this._masterGain),i.start(t),i.stop(t+.18),this._trackOsc(i,t+.18)}_sfxArpeggio(e,t=.18,i=.06,n="sine",r=Y.ARPEGGIO_DEFAULT_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime;e.forEach((a,d)=>{const c=o+d*(t*.5+i),f=l.createOscillator();f.type=n,f.frequency.setValueAtTime(a,c);const h=l.createGain();h.gain.setValueAtTime(1e-4,c),h.gain.exponentialRampToValueAtTime(r,c+.012),h.gain.exponentialRampToValueAtTime(1e-4,c+t),f.connect(h).connect(this._masterGain),f.start(c),f.stop(c+t+.05),this._trackOsc(f,c+t+.05)})}_sfxSlide(e=320,t=150,i=.35,n="triangle",r=Y.WRONG_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime,a=l.createOscillator();a.type=n,a.frequency.setValueAtTime(e,o),a.frequency.exponentialRampToValueAtTime(t,o+i);const d=l.createGain();d.gain.setValueAtTime(1e-4,o),d.gain.exponentialRampToValueAtTime(r,o+.015),d.gain.exponentialRampToValueAtTime(1e-4,o+i),a.connect(d).connect(this._masterGain),a.start(o),a.stop(o+i+.05),this._trackOsc(a,o+i+.05)}}class tc{constructor(e){this.audio=e,this.playing=!1,this.notes=[],this._stopFn=null}start(){if(!this.playing){if(!this.audio||!this.audio._webAudio){console.warn("[BGM] Audio not ready, deferring"),setTimeout(()=>this.start(),500);return}this.playing=!0,this._playLoop()}}stop(){this.playing=!1,this._stopFn&&(clearTimeout(this._stopFn),this._stopFn=null),this.notes.forEach(e=>{try{e.stop()}catch{}}),this.notes=[]}toggle(){return this.playing?this.stop():this.start(),this.playing}_playLoop(){if(!this.playing)return;const e=this.audio._webAudio;if(!e)return;const t=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],i=e.currentTime,n=e.createGain();n.gain.value=0,n.gain.linearRampToValueAtTime(.1,i+2),n.connect(this.audio._masterGain);const r=4,l=t.length*r;t.forEach((o,a)=>{o.forEach(d=>{const c=e.createOscillator(),f=e.createGain();c.type=a%2===0?"sine":"triangle",c.frequency.setValueAtTime(d,i+a*r),c.connect(f).connect(n),f.gain.setValueAtTime(0,i+a*r),f.gain.linearRampToValueAtTime(.5,i+a*r+.5),f.gain.linearRampToValueAtTime(0,i+(a+1)*r),c.start(i+a*r),c.stop(i+(a+1)*r),this.notes.push(c)})}),this._stopFn=setTimeout(()=>{this.notes=[],this._playLoop()},l*1e3)}}const Mn="forest-piano-progress",sc=["do","re","mi","fa","sol","la","si"];function ic(){const s=new Date,e=s.getFullYear(),t=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${e}-${t}-${i}`}function xs(){return{level:1,stars:{},completedLevels:[],unlockedNotes:[],firstPass:null}}function nc(s){return!s||typeof s!="object"?xs():{level:Number.isFinite(s.level)?s.level:1,stars:s.stars&&typeof s.stars=="object"&&!Array.isArray(s.stars)?s.stars:{},completedLevels:Array.isArray(s.completedLevels)?s.completedLevels.filter(e=>e!=null):[],unlockedNotes:Array.isArray(s.unlockedNotes)?s.unlockedNotes.filter(e=>typeof e=="string"):[],firstPass:typeof s.firstPass=="string"?s.firstPass:null}}class Pr{constructor(){this.state=this._load()}_load(){try{if(typeof localStorage>"u")return xs();const e=localStorage.getItem(Mn);if(!e)return xs();const t=JSON.parse(e);return nc(t)}catch{return xs()}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Mn,JSON.stringify(this.state))}catch{}}markLevelComplete(e,t){const i=String(e),n=Math.max(0,Number(t)||0);this.state.completedLevels.includes(i)||(this.state.completedLevels=[...this.state.completedLevels,i]);const r=Number(this.state.stars[i]||0);n>r&&(this.state.stars={...this.state.stars,[i]:n}),this.state.firstPass||(this.state.firstPass=ic());const l=new Set(this.state.unlockedNotes);sc.forEach(a=>l.add(a)),this.state.unlockedNotes=Array.from(l);const o=Number(i);Number.isFinite(o)&&o>=this.state.level&&(this.state.level=o+1),this._save()}getStars(e){const t=String(e);return Number(this.state.stars[t]||0)}getTotalStars(){return Object.values(this.state.stars).reduce((e,t)=>e+(Number(t)||0),0)}getCompletedLevels(){return[...this.state.completedLevels]}isLevelUnlocked(e){return!0}getUnlockedNotes(){return[...this.state.unlockedNotes]}getSnapshot(){return JSON.parse(JSON.stringify(this.state))}}class rc{constructor(e,{onReset:t,onClose:i,version:n}){this.stage=e,this.onReset=t,this.onClose=i,this.version=n,this.element=null}show(){const e=document.createElement("div");e.className="settings-panel",e.innerHTML=`
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
    `,this.stage.appendChild(e),this.element=e,e.querySelector("#settings-close").addEventListener("click",()=>this.hide()),e.querySelector("#settings-reset").addEventListener("click",()=>{if(confirm("确定要重置所有进度吗? 这不可恢复!"))try{localStorage.removeItem("forest-piano-progress"),localStorage.removeItem("forest-piano-achievements"),this.onReset&&this.onReset(),alert("进度已重置! 刷新页面开始新游戏")}catch(r){alert("重置失败: "+r.message)}});const t=e.querySelector("#settings-animations");t.checked=this._loadAnimationsPref(),t.addEventListener("change",()=>{this._saveAnimationsPref(t.checked),document.body.classList.toggle("no-animations",!t.checked)});const i=e.querySelector("#settings-bgm");i.checked=this._loadBgmPref(),i.addEventListener("change",()=>{this._saveBgmPref(i.checked),window.dispatchEvent(new CustomEvent("toggle-bgm"))});const n=e.querySelector("#settings-large-text");n.checked=this._loadLargeTextPref(),n.addEventListener("change",()=>{this._saveLargeTextPref(n.checked),document.body.classList.toggle("large-text",n.checked)}),e.querySelector("#settings-tutorial").addEventListener("click",()=>{this.hide(),Dt(async()=>{const{Tutorial:r}=await Promise.resolve().then(()=>lc);return{Tutorial:r}},void 0,import.meta.url).then(({Tutorial:r})=>{new r(document.body,{onDone:()=>{}}).show()})})}_loadAnimationsPref(){try{return localStorage.getItem("forest-piano-animations")!=="false"}catch{return!0}}_saveAnimationsPref(e){try{localStorage.setItem("forest-piano-animations",String(e))}catch{}}_loadBgmPref(){try{return localStorage.getItem("forest-piano-bgm")!=="false"}catch{return!0}}_saveBgmPref(e){try{localStorage.setItem("forest-piano-bgm",String(e))}catch{}}_loadLargeTextPref(){try{return localStorage.getItem("forest-piano-large-text")==="true"}catch{return!1}}_saveLargeTextPref(e){try{localStorage.setItem("forest-piano-large-text",String(e))}catch{}}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onClose&&this.onClose()}}const ys=[{emoji:"🐟🎵",title:"欢迎来到森林钢琴学校",body:"这里的 7 条小鱼 Do Re Mi Fa Sol La Si 住在钢琴里。你来帮它们找到在五线谱和钢琴上的位置吧!",bg:"linear-gradient(135deg, #5fa8b5, #a8dadc)"},{emoji:"👆",title:"手指不离开屏幕",body:"按住一条鱼 (不要松开!) 拖到屏幕上方五线谱对应的位置。松手就放下。如果放错会摇头回弹。",bg:"linear-gradient(135deg, #f4a261, #ffc971)"},{emoji:"⭐",title:"错误少就拿满星",body:"0 错 = 3⭐ / 1-2 错 = 2⭐ / 3-5 错 = 1⭐ / 6+ 错 = 0⭐。每关都能挑战完美!",bg:"linear-gradient(135deg, #ffd166, #f4a261)"},{emoji:"🗺️",title:"8 个关卡等你探索",body:"通关后回关卡地图可以重玩, 也可以挑战其他关卡! 看看你能收集多少个成就 (HUD 上有 🏆 图标)。",bg:"linear-gradient(135deg, #9b5de5, #6a4c93)"}];class bi{constructor(e,{onDone:t,isFirstTime:i=!1}={}){this.stage=e,this.onDone=t,this.isFirstTime=i,this.element=null,this.currentPage=0}show(){this.element=document.createElement("div"),this.element.className="tutorial",this._render(),this.stage.appendChild(this.element),this.isFirstTime?D.fromTo(this.element.querySelector(".tutorial__card"),{y:40,opacity:0},{y:0,opacity:1,duration:.6,ease:"back.out(1.7)"}):D.fromTo(this.element.querySelector(".tutorial__card"),{scale:.85,opacity:0},{scale:1,opacity:1,duration:.35,ease:"back.out(1.4)"})}_render(){const e=ys[this.currentPage],t=ys.length,i=this.currentPage===t-1,n=this.currentPage===0;this.element.innerHTML=`
      <div class="tutorial__card" style="background: ${e.bg}">
        <div class="tutorial__emoji">${e.emoji}</div>
        <div class="tutorial__title">${e.title}</div>
        <div class="tutorial__body">${e.body}</div>

        <div class="tutorial__dots">
          ${ys.map((d,c)=>`
            <span class="tutorial__dot ${c===this.currentPage?"on":""}"></span>
          `).join("")}
        </div>

        <div class="tutorial__nav">
          ${n?"<div></div>":'<button class="btn-secondary" id="tut-back">‹ 上一步</button>'}
          ${i?'<button class="btn-primary" id="tut-done">🎵 开始游戏 ›</button>':'<button class="btn-primary" id="tut-next">下一步 ›</button>'}
        </div>

        ${this.isFirstTime?"":'<button class="tutorial__skip" id="tut-skip">跳过</button>'}
      </div>
    `;const r=this.element.querySelector("#tut-back"),l=this.element.querySelector("#tut-next"),o=this.element.querySelector("#tut-done"),a=this.element.querySelector("#tut-skip");r&&r.addEventListener("click",()=>this._prev()),l&&l.addEventListener("click",()=>this._next()),o&&o.addEventListener("click",()=>this._done()),a&&a.addEventListener("click",()=>this._done())}_prev(){this.currentPage>0&&(this.currentPage--,this._render())}_next(){this.currentPage<ys.length-1&&(this.currentPage++,this._render())}_done(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onDone&&this.onDone()}hide(){this._done()}}const lc=Object.freeze(Object.defineProperty({__proto__:null,Tutorial:bi},Symbol.toStringTag,{value:"Module"})),ni=[{id:"cream",name:"奶油橙",icon:"🍑",bg:"cream"},{id:"night",name:"夜色",icon:"🌙",bg:"night"},{id:"forest",name:"森林绿",icon:"🌲",bg:"forest"}],oc={cream:"🍑",night:"🌙",forest:"🌲"},En="forest-piano-theme",ri={cream:{"--bg-cream":"#fff8ec","--bg-paper":"#faf3e0","--staff-strong":"#3d405b","--warm-cta":"#ffb347","--text-main":"#3d405b","--text-sub":"#6b7280"},night:{"--bg-cream":"#1a1430","--bg-paper":"#251a3f","--staff-strong":"#fdf6e3","--warm-cta":"#ff8fb1","--text-main":"#fdf6e3","--text-sub":"#b8a5d0"},forest:{"--bg-cream":"#1a3a2a","--bg-paper":"#244a3a","--staff-strong":"#fdf6e3","--warm-cta":"#84cc16","--text-main":"#fdf6e3","--text-sub":"#a3c9a8"}};class ac{constructor(e){this.stage=e,this.current=this._load(),this._apply(),this.button=null}_load(){try{return localStorage.getItem(En)||"cream"}catch{return"cream"}}_save(e){try{localStorage.setItem(En,e)}catch{}}_apply(){const e=ri[this.current]||ri.cream;for(const[t,i]of Object.entries(e))document.documentElement.style.setProperty(t,i);document.body.dataset.theme=this.current}cycle(){const e=ni.findIndex(i=>i.id===this.current),t=ni[(e+1)%ni.length];return this.current=t.id,this._save(this.current),this._apply(),t}set(e){ri[e]&&(this.current=e,this._save(e),this._apply())}}class cc{constructor(e){this.game=e,this.enabled=!0,this._handler=t=>this._onKeyDown(t)}enable(){this.enabled||(this.enabled=!0,document.addEventListener("keydown",this._handler))}disable(){this.enabled&&(this.enabled=!1,document.removeEventListener("keydown",this._handler))}_onKeyDown(e){if(!(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))){if(e.key==="Escape"||e.key==="Esc"){const t=document.querySelectorAll(".overlay, .achievements-wall, .settings-panel, .tutorial");if(t.length>0){const i=t[t.length-1];i.classList.contains("achievements-wall")?i.querySelector("#close-achievements")?.click():i.remove(),e.preventDefault()}}if(e.key==="Enter"){const i=document.querySelector(".overlay__card")?.querySelector("#start-btn");if(i){i.click(),e.preventDefault();return}}if(e.key==="m"||e.key==="M"){const t=document.getElementById("btn-sound");t&&t.click(),e.preventDefault()}if(/^[1-9]$/.test(e.key)){const t=parseInt(e.key,10);try{this.game.start({levelId:t}),e.preventDefault()}catch{}}if(e.key===" "){const t=document.querySelector(".level4-drum-anchor, .level12-cut-btn");t&&(t.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0})),e.preventDefault())}}}}const An="forest-piano-streak";function dc(){const s=new Date;return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`}class uc{constructor(){this.state=this._load()}_load(){try{const e=localStorage.getItem(An);if(e)return JSON.parse(e)}catch{}return{lastDate:null,streakCount:0,longestStreak:0}}_save(){try{localStorage.setItem(An,JSON.stringify(this.state))}catch{}}checkIn(){const e=dc();if(this.state.lastDate===e)return{streak:this.state.streakCount,isNew:!1};const t=(()=>{const i=new Date;return i.setDate(i.getDate()-1),`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`})();return this.state.lastDate===t?this.state.streakCount+=1:this.state.lastDate!==null?this.state.streakCount=1:this.state.streakCount=1,this.state.streakCount>this.state.longestStreak&&(this.state.longestStreak=this.state.streakCount),this.state.lastDate=e,this._save(),{streak:this.state.streakCount,isNew:!0}}get(){return{streak:this.state.streakCount,longest:this.state.longestStreak}}}const Pn=new ac,$n="forest-piano-tutorial-shown",wi="v18.6";window.__forestPiano={Game:Ar,Audio:Rs,Progress:Pr,version:wi};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Dn):Dn();function Dn(){const s=document.getElementById("stage"),e=document.getElementById("bubble-text"),t=document.getElementById("version-tag");t&&(t.textContent=wi),hc();const i=new Ar({stageEl:s,bubbleEl:e,progress:new Pr,audio:new Rs}),n=new tc(i.audio);i.start({levelId:1});const r=new uc,l=r.checkIn();l.isNew&&l.streak>=3&&setTimeout(()=>{const u=document.createElement("div");u.className="streak-toast",u.innerHTML=`
        <div class="streak-toast__icon">🔥</div>
        <div class="streak-toast__body">
          <div class="streak-toast__title">连续 ${l.streak} 天!</div>
          <div class="streak-toast__hint">坚持就是胜利</div>
        </div>
      `,document.body.appendChild(u),setTimeout(()=>u.classList.add("show"),50),setTimeout(()=>{u.classList.remove("show"),setTimeout(()=>u.remove(),500)},5500)},3e3);const o=document.createElement("div");o.className="streak-badge",o.textContent=`🔥 ${l.streak}`,o.title=`连续 ${l.streak} 天, 最长 ${r.get().longest}`,document.querySelector(".hud__left")?.appendChild(o),Tt(),St(),window.addEventListener("resize",()=>{Tt(),St()}),window.addEventListener("orientationchange",()=>{setTimeout(Tt,100),setTimeout(St,100),setTimeout(Tt,400),setTimeout(St,400)}),setTimeout(Tt,500),setTimeout(St,500),setTimeout(Tt,1500),setTimeout(St,1500);const a=document.getElementById("btn-sound"),d=document.getElementById("btn-replay"),c=document.getElementById("btn-bgm"),f=document.getElementById("btn-home");a&&a.addEventListener("click",()=>{const u=i.audio.toggleMute();a.textContent=u?"🔇":"🔊"}),d&&d.addEventListener("click",()=>{try{i.restartLevel()}catch(u){console.warn("restart 失败:",u)}}),c&&c.addEventListener("click",()=>{const u=n.toggle();c.textContent=u?"🎶":"🔇",c.style.background=u?"rgba(255, 235, 168, 0.4)":""}),f&&f.addEventListener("click",()=>{confirm("回到开始画面?")&&location.reload()});const h=document.createElement("button");h.className="hud__btn",h.id="btn-settings",h.setAttribute("aria-label","设置"),h.setAttribute("title","设置"),h.textContent="⚙",document.querySelector(".hud__right")?.appendChild(h),h.addEventListener("click",()=>{new rc(document.body,{version:wi,onReset:()=>location.reload(),onClose:()=>{}}).show()});const p=document.querySelector(".hud__right");if(p&&!document.getElementById("btn-achievements")){const u=document.createElement("button");u.className="hud__btn",u.id="btn-achievements",u.setAttribute("aria-label","成就墙"),u.title="成就墙",u.textContent="🏆",p.insertBefore(u,p.firstChild),u.addEventListener("click",()=>{Dt(async()=>{const{AchievementsWall:_}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:_}},[],import.meta.url).then(({AchievementsWall:_})=>{new _(document.body,{achievementSystem:i.achievements,onClose:()=>{}}).show()}).catch(_=>console.warn("[achievements] 加载失败:",_))})}if(p&&!document.getElementById("btn-practice")){const u=document.createElement("button");u.className="hud__btn",u.id="btn-practice",u.setAttribute("aria-label","自由演奏"),u.title="自由演奏",u.textContent="🎹",p.appendChild(u),u.addEventListener("click",()=>{Dt(async()=>{const{PracticeRoom:_}=await import("./PracticeRoom-DU7WNcTu.js");return{PracticeRoom:_}},[],import.meta.url).then(({PracticeRoom:_})=>{new _(document.body,i).show()}).catch(_=>console.warn("[practice] 加载失败:",_))})}if(!document.getElementById("btn-help")){const u=document.createElement("button");u.className="hud__btn",u.id="btn-help",u.setAttribute("aria-label","帮助"),u.setAttribute("title","教程"),u.textContent="📖",document.querySelector(".hud__right")?.appendChild(u),u.addEventListener("click",()=>{new bi(document.body,{onDone:()=>{}}).show()})}if(!document.getElementById("btn-theme")){const u=document.createElement("button");u.className="hud__btn",u.id="btn-theme",u.setAttribute("aria-label","主题"),u.title="主题",u.textContent=oc[Pn.current]||"🎨",document.querySelector(".hud__right")?.appendChild(u),u.addEventListener("click",()=>{const _=Pn.cycle();u.textContent=_.icon;const m=document.createElement("div");m.className="theme-flash",m.textContent=`${_.icon} ${_.name}`,document.body.appendChild(m),setTimeout(()=>m.remove(),2e3)})}localStorage.getItem($n)||setTimeout(()=>{new bi(document.body,{isFirstTime:!0,onDone:()=>localStorage.setItem($n,"1")}).show()},1200),window.addEventListener("error",u=>{console.error("[forest-piano] error:",u.error)}),setTimeout(()=>{const u=document.getElementById("splash");u&&u.parentNode&&u.parentNode.removeChild(u)},2200),new cc(i).enable(),document.addEventListener("keydown",u=>{if(u.key==="?"||u.shiftKey&&u.key==="/"){const _=document.createElement("div");_.className="keyboard-help",_.innerHTML=`
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
    `,document.body.appendChild(_);const m=()=>_.remove();_.querySelector("#kb-help-close").addEventListener("click",m),setTimeout(()=>{const g=()=>{m(),document.removeEventListener("keydown",g)};document.addEventListener("keydown",g)},100)}})}function hc(){document.addEventListener("gesturestart",e=>e.preventDefault(),{passive:!1}),document.addEventListener("gesturechange",e=>e.preventDefault(),{passive:!1}),document.addEventListener("gestureend",e=>e.preventDefault(),{passive:!1});let s=0;document.addEventListener("touchstart",e=>{const t=Date.now();t-s<300&&e.preventDefault(),s=t},{passive:!1}),document.addEventListener("dblclick",e=>e.preventDefault(),{passive:!1}),document.addEventListener("touchmove",e=>{e.touches&&e.touches.length>1&&e.preventDefault()},{passive:!1})}function Tt(){const s=window.innerWidth,e=window.innerHeight;if(!(Math.min(s,e)<=500)||!(s>e))return;const n=32,r=44,l=e-n-r,o=document.querySelector(".hud");o&&(o.style.height=n+"px",o.style.minHeight=n+"px",o.style.position="absolute",o.style.top="0",o.style.left="0",o.style.right="0",o.style.zIndex="20"),stage&&(stage.style.position="absolute",stage.style.top=n+"px",stage.style.bottom=r+"px",stage.style.left="0",stage.style.right="0",stage.style.height="auto",stage.style.display="block",stage.style.overflow="hidden");const a=document.querySelector(".keyboard-area");if(a){const h=Math.max(95,Math.floor(l*.3));a.style.position="absolute",a.style.bottom="0",a.style.left="0",a.style.right="0",a.style.height=h+"px",a.style.minHeight="95px",a.style.width="100%",a.style.background="rgba(255, 209, 102, 0.2)",a.style.zIndex="5",a.style.display="flex",a.style.alignItems="flex-end",a.style.justifyContent="center";const p=a.querySelector("svg.keyboard");p&&(p.style.width="100%",p.style.height="100%",p.style.maxWidth="100%",p.style.maxHeight="100%",p.style.display="block")}const d=document.querySelector(".staff-wrap");if(d){const h=Math.max(95,Math.floor(l*.3)),p=Math.max(110,l-h-110);d.style.position="absolute",d.style.top="0",d.style.left="0",d.style.right="0",d.style.height=p+"px",d.style.minHeight=p+"px",d.style.display="flex",d.style.alignItems="center",d.style.justifyContent="center";const v=d.querySelector("svg.staff");v&&(v.style.width="100%",v.style.height="100%",v.style.maxWidth="100%",v.style.maxHeight="100%",v.style.display="block")}const c=document.querySelector(".fish-pool");if(c){const h=Math.max(95,Math.floor(l*.3)),p=Math.max(110,l-h-110),v=l-h-p;c.style.position="absolute",c.style.bottom=h+"px",c.style.left="0",c.style.right="0",c.style.height=v+"px",c.style.top="auto",c.style.pointerEvents="none"}const f=document.querySelector(".bubble");f&&(f.style.position="absolute",f.style.bottom="0",f.style.left="0",f.style.right="0",f.style.height=r+"px",f.style.minHeight=r+"px",f.style.padding="4px 12px",f.style.margin="0")}function St(){const s=window.innerWidth,e=window.innerHeight,t=Math.min(s,e),i=Math.max(s,e);if(!(t>=700&&t<1400&&i<=1400))return;const r=s>e;let l,o,a,d,c;r?(l=.05,o=.04,a=.3,d=.5,c=.11):(l=.06,o=.06,a=.32,d=.45,c=.11);const f=Math.max(40,Math.floor(e*l)),h=Math.max(40,Math.floor(e*o)),p=Math.max(140,Math.floor(e*a)),v=e-f-h,u=Math.max(120,Math.floor((v-p)*(d/(d+c)))),_=Math.max(60,v-p-u),m=document.querySelector(".hud");m&&(m.style.position="absolute",m.style.top="0",m.style.left="0",m.style.right="0",m.style.height=f+"px",m.style.minHeight=f+"px",m.style.zIndex="20");const g=document.getElementById("stage");g&&(g.style.position="absolute",g.style.top=f+"px",g.style.bottom=h+"px",g.style.left="0",g.style.right="0",g.style.height="auto",g.style.display="flex",g.style.flexDirection="column",g.style.overflow="hidden");const y=document.querySelector(".keyboard-area");if(y){y.style.position="absolute",y.style.bottom="0",y.style.left="0",y.style.right="0",y.style.height=p+"px",y.style.minHeight="140px",y.style.width="100%",y.style.background="rgba(255, 209, 102, 0.2)",y.style.zIndex="5",y.style.display="flex",y.style.alignItems="flex-end",y.style.justifyContent="center",y.style.padding="0",y.style.margin="0";const k=y.querySelector("svg.keyboard");k&&(k.style.width="100%",k.style.height="100%",k.style.maxWidth="100%",k.style.maxHeight="100%",k.style.display="block")}const b=document.querySelector(".staff-wrap");if(b){b.style.position="absolute",b.style.top="0",b.style.left="0",b.style.right="0",b.style.height=u+"px",b.style.minHeight="120px",b.style.display="flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.padding="0 12px";const k=b.querySelector("svg.staff");k&&(k.style.width="100%",k.style.height="100%",k.style.maxWidth="100%",k.style.maxHeight="100%",k.style.display="block")}const w=document.querySelector(".fish-pool");w&&(w.style.position="absolute",w.style.bottom=p+"px",w.style.left="0",w.style.right="0",w.style.height=_+"px",w.style.top="auto",w.style.pointerEvents="none");const T=document.querySelector(".bubble");if(T){T.style.position="absolute",T.style.bottom="0",T.style.left="0",T.style.right="0",T.style.height=h+"px",T.style.minHeight=h+"px",T.style.padding="8px 16px",T.style.margin="0";const k=T.querySelector(".bubble__text");k&&(k.style.fontSize="16px");const S=T.querySelector(".bubble__avatar");S&&(S.style.fontSize="32px")}const x=document.querySelector(".pip");x&&(x.style.display="none")}export{bt as P,D as g};
