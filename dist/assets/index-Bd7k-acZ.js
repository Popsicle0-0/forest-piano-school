var Fr=Object.defineProperty;var qr=(s,e,t)=>e in s?Fr(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var ts=(s,e,t)=>qr(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Hr="modulepreload",Gr=function(s,e){return new URL(s,e).href},Hi={},Je=function(e,t,i){let n=Promise.resolve();if(t&&t.length>0){const l=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");n=Promise.allSettled(t.map(d=>{if(d=Gr(d,i),d in Hi)return;Hi[d]=!0;const c=d.endsWith(".css"),m=c?'[rel="stylesheet"]':"";if(!!i)for(let g=l.length-1;g>=0;g--){const u=l[g];if(u.href===d&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${m}`))return;const y=document.createElement("link");if(y.rel=c?"stylesheet":Hr,c||(y.as="script"),y.crossOrigin="",y.href=d,a&&y.setAttribute("nonce",a),document.head.appendChild(y),c)return new Promise((g,u)=>{y.addEventListener("load",g),y.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return n.then(l=>{for(const o of l||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})};function Wr(s){return typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=1),s._startLevel1(),()=>{typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),document.querySelectorAll(".staff-slot.targeting, .staff-slot.filling").forEach(n=>{n.classList.remove("targeting","filling")})}}const jr=Object.freeze(Object.defineProperty({__proto__:null,default:Wr},Symbol.toStringTag,{value:"Module"})),de="http://www.w3.org/2000/svg";class zr{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level10-background";let t="";for(let i=0;i<40;i++){const n=Math.random()*100,r=Math.random()*60,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level10-twinkle" cx="${n}%" cy="${r}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}function Ve(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Rn(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var $e={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},zt={duration:.5,overwrite:!1,delay:0},bi,ve,te,Re=1e8,K=1/Re,si=Math.PI*2,Vr=si/4,Yr=0,In=Math.sqrt,Ur=Math.cos,Qr=Math.sin,_e=function(e){return typeof e=="string"},ae=function(e){return typeof e=="function"},Ue=function(e){return typeof e=="number"},xi=function(e){return typeof e>"u"},ze=function(e){return typeof e=="object"},we=function(e){return e!==!1},wi=function(){return typeof window<"u"},ss=function(e){return ae(e)||_e(e)},Bn=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ge=Array.isArray,Kr=/random\([^)]+\)/g,Zr=/,\s*/g,Gi=/(?:-?\.?\d|\.)+/gi,Fn=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Tt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Ns=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,qn=/[+-]=-?[.\d]+/,Xr=/[^,'"\[\]\s]+/gi,Jr=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,re,Ge,ii,ki,De={},gs={},Hn,Gn=function(e){return(gs=At(e,De))&&Le},Ti=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Vt=function(e,t){return!t&&console.warn(e)},Wn=function(e,t){return e&&(De[e]=t)&&gs&&(gs[e]=t)||De},Yt=function(){return 0},el={suppressEvents:!0,isStart:!0,kill:!1},fs={suppressEvents:!0,kill:!1},tl={suppressEvents:!0},Si={},it=[],ni={},jn,Me={},Rs={},Wi=30,ps=[],Li="",Ci=function(e){var t=e[0],i,n;if(ze(t)||ae(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(n=ps.length;n--&&!ps[n].targetTest(t););i=ps[n]}for(n=e.length;n--;)e[n]&&(e[n]._gsap||(e[n]._gsap=new hr(e[n],i)))||e.splice(n,1);return e},_t=function(e){return e._gsap||Ci(Ie(e))[0]._gsap},zn=function(e,t,i){return(i=e[t])&&ae(i)?e[t]():xi(i)&&e.getAttribute&&e.getAttribute(t)||i},ke=function(e,t){return(e=e.split(",")).forEach(t)||e},ce=function(e){return Math.round(e*1e5)/1e5||0},ne=function(e){return Math.round(e*1e7)/1e7||0},Lt=function(e,t){var i=t.charAt(0),n=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+n:i==="-"?e-n:i==="*"?e*n:e/n},sl=function(e,t){for(var i=t.length,n=0;e.indexOf(t[n])<0&&++n<i;);return n<i},bs=function(){var e=it.length,t=it.slice(0),i,n;for(ni={},it.length=0,i=0;i<e;i++)n=t[i],n&&n._lazy&&(n.render(n._lazy[0],n._lazy[1],!0)._lazy=0)},Mi=function(e){return!!(e._initted||e._startAt||e.add)},Vn=function(e,t,i,n){it.length&&!ve&&bs(),e.render(t,i,!!(ve&&t<0&&Mi(e))),it.length&&!ve&&bs()},Yn=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Xr).length<2?t:_e(e)?e.trim():e},Un=function(e){return e},Oe=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},il=function(e){return function(t,i){for(var n in i)n in t||n==="duration"&&e||n==="ease"||(t[n]=i[n])}},At=function(e,t){for(var i in t)e[i]=t[i];return e},ji=function s(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=ze(t[i])?s(e[i]||(e[i]={}),t[i]):t[i]);return e},xs=function(e,t){var i={},n;for(n in e)n in t||(i[n]=e[n]);return i},Gt=function(e){var t=e.parent||re,i=e.keyframes?il(ge(e.keyframes)):Oe;if(we(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},nl=function(e,t){for(var i=e.length,n=i===t.length;n&&i--&&e[i]===t[i];);return i<0},Qn=function(e,t,i,n,r){var l=e[n],o;if(r)for(o=t[r];l&&l[r]>o;)l=l._prev;return l?(t._next=l._next,l._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[n]=t,t._prev=l,t.parent=t._dp=e,t},Es=function(e,t,i,n){i===void 0&&(i="_first"),n===void 0&&(n="_last");var r=t._prev,l=t._next;r?r._next=l:e[i]===t&&(e[i]=l),l?l._prev=r:e[n]===t&&(e[n]=r),t._next=t._prev=t.parent=null},rt=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},vt=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},rl=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ri=function(e,t,i,n){return e._startAt&&(ve?e._startAt.revert(fs):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,n))},ll=function s(e){return!e||e._ts&&s(e.parent)},zi=function(e){return e._repeat?Pt(e._tTime,e=e.duration()+e._rDelay)*e:0},Pt=function(e,t){var i=Math.floor(e=ne(e/t));return e&&i===e?i-1:i},ws=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},As=function(e){return e._end=ne(e._start+(e._tDur/Math.abs(e._ts||e._rts||K)||0))},Ps=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=ne(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),As(e),i._dirty||vt(i,e)),e},Kn=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=ws(e.rawTime(),t),(!t._dur||Jt(0,t.totalDuration(),i)-t._tTime>K)&&t.render(i,!0)),vt(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-K}},We=function(e,t,i,n){return t.parent&&rt(t),t._start=ne((Ue(i)?i:i||e!==re?Ne(e,i,t):e._time)+t._delay),t._end=ne(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Qn(e,t,"_first","_last",e._sort?"_start":0),li(t)||(e._recent=t),n||Kn(e,t),e._ts<0&&Ps(e,e._tTime),e},Zn=function(e,t){return(De.ScrollTrigger||Ti("scrollTrigger",t))&&De.ScrollTrigger.create(t,e)},Xn=function(e,t,i,n,r){if(Ai(e,t,r),!e._initted)return 1;if(!i&&e._pt&&!ve&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&jn!==Ee.frame)return it.push(e),e._lazy=[r,n],1},ol=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},li=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},al=function(e,t,i,n){var r=e.ratio,l=t<0||!t&&(!e._start&&ol(e)&&!(!e._initted&&li(e))||(e._ts<0||e._dp._ts<0)&&!li(e))?0:1,o=e._rDelay,a=0,d,c,m;if(o&&e._repeat&&(a=Jt(0,e._tDur,t),c=Pt(a,o),e._yoyo&&c&1&&(l=1-l),c!==Pt(e._tTime,o)&&(r=1-l,e.vars.repeatRefresh&&e._initted&&e.invalidate())),l!==r||ve||n||e._zTime===K||!t&&e._zTime){if(!e._initted&&Xn(e,t,n,i,a))return;for(m=e._zTime,e._zTime=t||(i?K:0),i||(i=t&&!m),e.ratio=l,e._from&&(l=1-l),e._time=0,e._tTime=a,d=e._pt;d;)d.r(l,d.d),d=d._next;t<0&&ri(e,t,i,!0),e._onUpdate&&!i&&Ae(e,"onUpdate"),a&&e._repeat&&!i&&e.parent&&Ae(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===l&&(l&&rt(e,1),!i&&!ve&&(Ae(e,l?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},cl=function(e,t,i){var n;if(i>t)for(n=e._first;n&&n._start<=i;){if(n.data==="isPause"&&n._start>t)return n;n=n._next}else for(n=e._last;n&&n._start>=i;){if(n.data==="isPause"&&n._start<t)return n;n=n._prev}},$t=function(e,t,i,n){var r=e._repeat,l=ne(t)||0,o=e._tTime/e._tDur;return o&&!n&&(e._time*=l/e._dur),e._dur=l,e._tDur=r?r<0?1e10:ne(l*(r+1)+e._rDelay*r):l,o>0&&!n&&Ps(e,e._tTime=e._tDur*o),e.parent&&As(e),i||vt(e.parent,e),e},Vi=function(e){return e instanceof xe?vt(e):$t(e,e._dur)},dl={_start:0,endTime:Yt,totalDuration:Yt},Ne=function s(e,t,i){var n=e.labels,r=e._recent||dl,l=e.duration()>=Re?r.endTime(!1):e._dur,o,a,d;return _e(t)&&(isNaN(t)||t in n)?(a=t.charAt(0),d=t.substr(-1)==="%",o=t.indexOf("="),a==="<"||a===">"?(o>=0&&(t=t.replace(/=/,"")),(a==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(t.substr(1))||0)*(d?(o<0?r:i).totalDuration()/100:1)):o<0?(t in n||(n[t]=l),n[t]):(a=parseFloat(t.charAt(o-1)+t.substr(o+1)),d&&i&&(a=a/100*(ge(i)?i[0]:i).totalDuration()),o>1?s(e,t.substr(0,o-1),i)+a:l+a)):t==null?l:+t},Wt=function(e,t,i){var n=Ue(t[1]),r=(n?2:1)+(e<2?0:1),l=t[r],o,a;if(n&&(l.duration=t[1]),l.parent=i,e){for(o=l,a=i;a&&!("immediateRender"in o);)o=a.vars.defaults||{},a=we(a.vars.inherit)&&a.parent;l.immediateRender=we(o.immediateRender),e<2?l.runBackwards=1:l.startAt=t[r-1]}return new he(t[0],l,t[r+1])},at=function(e,t){return e||e===0?t(e):t},Jt=function(e,t,i){return i<e?e:i>t?t:i},me=function(e,t){return!_e(e)||!(t=Jr.exec(e))?"":t[1]},ul=function(e,t,i){return at(i,function(n){return Jt(e,t,n)})},oi=[].slice,Jn=function(e,t){return e&&ze(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&ze(e[0]))&&!e.nodeType&&e!==Ge},hl=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(n){var r;return _e(n)&&!t||Jn(n,1)?(r=i).push.apply(r,Ie(n)):i.push(n)})||i},Ie=function(e,t,i){return te&&!t&&te.selector?te.selector(e):_e(e)&&!i&&(ii||!Dt())?oi.call((t||ki).querySelectorAll(e),0):ge(e)?hl(e,i):Jn(e)?oi.call(e,0):e?[e]:[]},ai=function(e){return e=Ie(e)[0]||Vt("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return Ie(t,i.querySelectorAll?i:i===e?Vt("Invalid scope")||ki.createElement("div"):e)}},er=function(e){return e.sort(function(){return .5-Math.random()})},tr=function(e){if(ae(e))return e;var t=ze(e)?e:{each:e},i=yt(t.ease),n=t.from||0,r=parseFloat(t.base)||0,l={},o=n>0&&n<1,a=isNaN(n)||o,d=t.axis,c=n,m=n;return _e(n)?c=m={center:.5,edges:.5,end:1}[n]||0:!o&&a&&(c=n[0],m=n[1]),function(f,y,g){var u=(g||t).length,h=l[u],p,_,v,b,x,S,w,L,T;if(!h){if(T=t.grid==="auto"?0:(t.grid||[1,Re])[1],!T){for(w=-Re;w<(w=g[T++].getBoundingClientRect().left)&&T<u;);T<u&&T--}for(h=l[u]=[],p=a?Math.min(T,u)*c-.5:n%T,_=T===Re?0:a?u*m/T-.5:n/T|0,w=0,L=Re,S=0;S<u;S++)v=S%T-p,b=_-(S/T|0),h[S]=x=d?Math.abs(d==="y"?b:v):In(v*v+b*b),x>w&&(w=x),x<L&&(L=x);n==="random"&&er(h),h.max=w-L,h.min=L,h.v=u=(parseFloat(t.amount)||parseFloat(t.each)*(T>u?u-1:d?d==="y"?u/T:T:Math.max(T,u/T))||0)*(n==="edges"?-1:1),h.b=u<0?r-u:r,h.u=me(t.amount||t.each)||0,i=i&&u<0?Sl(i):i}return u=(h[f]-h.min)/h.max||0,ne(h.b+(i?i(u):u)*h.v)+h.u}},ci=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var n=ne(Math.round(parseFloat(i)/e)*e*t);return(n-n%1)/t+(Ue(i)?0:me(i))}},sr=function(e,t){var i=ge(e),n,r;return!i&&ze(e)&&(n=i=e.radius||Re,e.values?(e=Ie(e.values),(r=!Ue(e[0]))&&(n*=n)):e=ci(e.increment)),at(t,i?ae(e)?function(l){return r=e(l),Math.abs(r-l)<=n?r:l}:function(l){for(var o=parseFloat(r?l.x:l),a=parseFloat(r?l.y:0),d=Re,c=0,m=e.length,f,y;m--;)r?(f=e[m].x-o,y=e[m].y-a,f=f*f+y*y):f=Math.abs(e[m]-o),f<d&&(d=f,c=m);return c=!n||d<=n?e[c]:l,r||c===l||Ue(l)?c:c+me(l)}:ci(e))},ir=function(e,t,i,n){return at(ge(e)?!t:i===!0?!!(i=0):!n,function(){return ge(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(n=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*n)/n})},fl=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(n){return t.reduce(function(r,l){return l(r)},n)}},pl=function(e,t){return function(i){return e(parseFloat(i))+(t||me(i))}},_l=function(e,t,i){return rr(e,t,0,1,i)},nr=function(e,t,i){return at(i,function(n){return e[~~t(n)]})},vl=function s(e,t,i){var n=t-e;return ge(e)?nr(e,s(0,e.length),t):at(i,function(r){return(n+(r-e)%n)%n+e})},yl=function s(e,t,i){var n=t-e,r=n*2;return ge(e)?nr(e,s(0,e.length-1),t):at(i,function(l){return l=(r+(l-e)%r)%r||0,e+(l>n?r-l:l)})},Ut=function(e){return e.replace(Kr,function(t){var i=t.indexOf("[")+1,n=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(Zr);return ir(i?n:+n[0],i?0:+n[1],+n[2]||1e-5)})},rr=function(e,t,i,n,r){var l=t-e,o=n-i;return at(r,function(a){return i+((a-e)/l*o||0)})},ml=function s(e,t,i,n){var r=isNaN(e+t)?0:function(y){return(1-y)*e+y*t};if(!r){var l=_e(e),o={},a,d,c,m,f;if(i===!0&&(n=1)&&(i=null),l)e={p:e},t={p:t};else if(ge(e)&&!ge(t)){for(c=[],m=e.length,f=m-2,d=1;d<m;d++)c.push(s(e[d-1],e[d]));m--,r=function(g){g*=m;var u=Math.min(f,~~g);return c[u](g-u)},i=t}else n||(e=At(ge(e)?[]:{},e));if(!c){for(a in t)Ei.call(o,e,a,"get",t[a]);r=function(g){return Di(g,o)||(l?e.p:e)}}}return at(i,r)},Yi=function(e,t,i){var n=e.labels,r=Re,l,o,a;for(l in n)o=n[l]-t,o<0==!!i&&o&&r>(o=Math.abs(o))&&(a=l,r=o);return a},Ae=function(e,t,i){var n=e.vars,r=n[t],l=te,o=e._ctx,a,d,c;if(r)return a=n[t+"Params"],d=n.callbackScope||e,i&&it.length&&bs(),o&&(te=o),c=a?r.apply(d,a):r.call(d),te=l,c},Ft=function(e){return rt(e),e.scrollTrigger&&e.scrollTrigger.kill(!!ve),e.progress()<1&&Ae(e,"onInterrupt"),e},St,lr=[],or=function(e){if(e)if(e=!e.name&&e.default||e,wi()||e.headless){var t=e.name,i=ae(e),n=t&&!i&&e.init?function(){this._props=[]}:e,r={init:Yt,render:Di,add:Ei,kill:Nl,modifier:Ol,rawVars:0},l={targetTest:0,get:0,getSetter:$i,aliases:{},register:0};if(Dt(),e!==n){if(Me[t])return;Oe(n,Oe(xs(e,r),l)),At(n.prototype,At(r,xs(e,l))),Me[n.prop=t]=n,e.targetTest&&(ps.push(n),Si[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Wn(t,n),e.register&&e.register(Le,n,Te)}else lr.push(e)},Q=255,qt={aqua:[0,Q,Q],lime:[0,Q,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Q],navy:[0,0,128],white:[Q,Q,Q],olive:[128,128,0],yellow:[Q,Q,0],orange:[Q,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Q,0,0],pink:[Q,192,203],cyan:[0,Q,Q],transparent:[Q,Q,Q,0]},Is=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*Q+.5|0},ar=function(e,t,i){var n=e?Ue(e)?[e>>16,e>>8&Q,e&Q]:0:qt.black,r,l,o,a,d,c,m,f,y,g;if(!n){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),qt[e])n=qt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(r=e.charAt(1),l=e.charAt(2),o=e.charAt(3),e="#"+r+r+l+l+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return n=parseInt(e.substr(1,6),16),[n>>16,n>>8&Q,n&Q,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),n=[e>>16,e>>8&Q,e&Q]}else if(e.substr(0,3)==="hsl"){if(n=g=e.match(Gi),!t)a=+n[0]%360/360,d=+n[1]/100,c=+n[2]/100,l=c<=.5?c*(d+1):c+d-c*d,r=c*2-l,n.length>3&&(n[3]*=1),n[0]=Is(a+1/3,r,l),n[1]=Is(a,r,l),n[2]=Is(a-1/3,r,l);else if(~e.indexOf("="))return n=e.match(Fn),i&&n.length<4&&(n[3]=1),n}else n=e.match(Gi)||qt.transparent;n=n.map(Number)}return t&&!g&&(r=n[0]/Q,l=n[1]/Q,o=n[2]/Q,m=Math.max(r,l,o),f=Math.min(r,l,o),c=(m+f)/2,m===f?a=d=0:(y=m-f,d=c>.5?y/(2-m-f):y/(m+f),a=m===r?(l-o)/y+(l<o?6:0):m===l?(o-r)/y+2:(r-l)/y+4,a*=60),n[0]=~~(a+.5),n[1]=~~(d*100+.5),n[2]=~~(c*100+.5)),i&&n.length<4&&(n[3]=1),n},cr=function(e){var t=[],i=[],n=-1;return e.split(nt).forEach(function(r){var l=r.match(Tt)||[];t.push.apply(t,l),i.push(n+=l.length+1)}),t.c=i,t},Ui=function(e,t,i){var n="",r=(e+n).match(nt),l=t?"hsla(":"rgba(",o=0,a,d,c,m;if(!r)return e;if(r=r.map(function(f){return(f=ar(f,t,1))&&l+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),i&&(c=cr(e),a=i.c,a.join(n)!==c.c.join(n)))for(d=e.replace(nt,"1").split(Tt),m=d.length-1;o<m;o++)n+=d[o]+(~a.indexOf(o)?r.shift()||l+"0,0,0,0)":(c.length?c:r.length?r:i).shift());if(!d)for(d=e.split(nt),m=d.length-1;o<m;o++)n+=d[o]+r[o];return n+d[m]},nt=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in qt)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),gl=/hsl[a]?\(/,dr=function(e){var t=e.join(" "),i;if(nt.lastIndex=0,nt.test(t))return i=gl.test(t),e[1]=Ui(e[1],i),e[0]=Ui(e[0],i,cr(e[1])),!0},Qt,Ee=function(){var s=Date.now,e=500,t=33,i=s(),n=i,r=1e3/240,l=r,o=[],a,d,c,m,f,y,g=function u(h){var p=s()-n,_=h===!0,v,b,x,S;if((p>e||p<0)&&(i+=p-t),n+=p,x=n-i,v=x-l,(v>0||_)&&(S=++m.frame,f=x-m.time*1e3,m.time=x=x/1e3,l+=v+(v>=r?4:r-v),b=1),_||(a=d(u)),b)for(y=0;y<o.length;y++)o[y](x,f,S,h)};return m={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(h){return f/(1e3/(h||60))},wake:function(){Hn&&(!ii&&wi()&&(Ge=ii=window,ki=Ge.document||{},De.gsap=Le,(Ge.gsapVersions||(Ge.gsapVersions=[])).push(Le.version),Gn(gs||Ge.GreenSockGlobals||!Ge.gsap&&Ge||{}),lr.forEach(or)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,a&&m.sleep(),d=c||function(h){return setTimeout(h,l-m.time*1e3+1|0)},Qt=1,g(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(a),Qt=0,d=Yt},lagSmoothing:function(h,p){e=h||1/0,t=Math.min(p||33,e)},fps:function(h){r=1e3/(h||240),l=m.time*1e3+r},add:function(h,p,_){var v=p?function(b,x,S,w){h(b,x,S,w),m.remove(v)}:h;return m.remove(h),o[_?"unshift":"push"](v),Dt(),v},remove:function(h,p){~(p=o.indexOf(h))&&o.splice(p,1)&&y>=p&&y--},_listeners:o},m}(),Dt=function(){return!Qt&&Ee.wake()},z={},bl=/^[\d.\-M][\d.\-,\s]/,xl=/["']/g,wl=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),n=i[0],r=1,l=i.length,o,a,d;r<l;r++)a=i[r],o=r!==l-1?a.lastIndexOf(","):a.length,d=a.substr(0,o),t[n]=isNaN(d)?d.replace(xl,"").trim():+d,n=a.substr(o+1).trim();return t},kl=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),n=e.indexOf("(",t);return e.substring(t,~n&&n<i?e.indexOf(")",i+1):i)},Tl=function(e){var t=(e+"").split("("),i=z[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[wl(t[1])]:kl(e).split(",").map(Yn)):z._CE&&bl.test(e)?z._CE("",e):i},Sl=function(e){return function(t){return 1-e(1-t)}},yt=function(e,t){return e&&(ae(e)?e:z[e]||Tl(e))||t},bt=function(e,t,i,n){i===void 0&&(i=function(a){return 1-t(1-a)}),n===void 0&&(n=function(a){return a<.5?t(a*2)/2:1-t((1-a)*2)/2});var r={easeIn:t,easeOut:i,easeInOut:n},l;return ke(e,function(o){z[o]=De[o]=r,z[l=o.toLowerCase()]=i;for(var a in r)z[l+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=z[o+"."+a]=r[a]}),r},ur=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Bs=function s(e,t,i){var n=t>=1?t:1,r=(i||(e?.3:.45))/(t<1?t:1),l=r/si*(Math.asin(1/n)||0),o=function(c){return c===1?1:n*Math.pow(2,-10*c)*Qr((c-l)*r)+1},a=e==="out"?o:e==="in"?function(d){return 1-o(1-d)}:ur(o);return r=si/r,a.config=function(d,c){return s(e,d,c)},a},Fs=function s(e,t){t===void 0&&(t=1.70158);var i=function(l){return l?--l*l*((t+1)*l+t)+1:0},n=e==="out"?i:e==="in"?function(r){return 1-i(1-r)}:ur(i);return n.config=function(r){return s(e,r)},n};ke("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;bt(s+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});z.Linear.easeNone=z.none=z.Linear.easeIn;bt("Elastic",Bs("in"),Bs("out"),Bs());(function(s,e){var t=1/e,i=2*t,n=2.5*t,r=function(o){return o<t?s*o*o:o<i?s*Math.pow(o-1.5/e,2)+.75:o<n?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};bt("Bounce",function(l){return 1-r(1-l)},r)})(7.5625,2.75);bt("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});bt("Circ",function(s){return-(In(1-s*s)-1)});bt("Sine",function(s){return s===1?1:-Ur(s*Vr)+1});bt("Back",Fs("in"),Fs("out"),Fs());z.SteppedEase=z.steps=De.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,n=e+(t?0:1),r=t?1:0,l=1-K;return function(o){return((n*Jt(0,l,o)|0)+r)*i}}};zt.ease=z["quad.out"];ke("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Li+=s+","+s+"Params,"});var hr=function(e,t){this.id=Yr++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:zn,this.set=t?t.getSetter:$i},Kt=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,$t(this,+t.duration,1,1),this.data=t.data,te&&(this._ctx=te,te.data.push(this)),Qt||Ee.wake()}var e=s.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,$t(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,n){if(Dt(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Ps(this,i),!r._dp||r.parent||Kn(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&We(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!n||this._initted&&Math.abs(this._zTime)===K||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Vn(this,i,n)),this},e.time=function(i,n){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+zi(this))%(this._dur+this._rDelay)||(i?this._dur:0),n):this._time},e.totalProgress=function(i,n){return arguments.length?this.totalTime(this.totalDuration()*i,n):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,n){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+zi(this),n):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,n){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*r,n):this._repeat?Pt(this._tTime,r)+1:1},e.timeScale=function(i,n){if(!arguments.length)return this._rts===-K?0:this._rts;if(this._rts===i)return this;var r=this.parent&&this._ts?ws(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-K?0:this._rts,this.totalTime(Jt(-Math.abs(this._delay),this.totalDuration(),r),n!==!1),As(this),rl(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Dt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==K&&(this._tTime-=K)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=ne(i);var n=this.parent||this._dp;return n&&(n._sort||!this.parent)&&We(n,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(we(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var n=this.parent||this._dp;return n?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?ws(n.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=tl);var n=ve;return ve=i,Mi(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),ve=n,this},e.globalTime=function(i){for(var n=this,r=arguments.length?i:n.rawTime();n;)r=n._start+r/(Math.abs(n._ts)||1),n=n._dp;return!this.parent&&this._sat?this._sat.globalTime(i):r},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Vi(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var n=this._time;return this._rDelay=i,Vi(this),n?this.time(n):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,n){return this.totalTime(Ne(this,i),we(n))},e.restart=function(i,n){return this.play().totalTime(i?-this._delay:0,we(n)),this._dur||(this._zTime=-K),this},e.play=function(i,n){return i!=null&&this.seek(i,n),this.reversed(!1).paused(!1)},e.reverse=function(i,n){return i!=null&&this.seek(i||this.totalDuration(),n),this.reversed(!0).paused(!1)},e.pause=function(i,n){return i!=null&&this.seek(i,n),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-K:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-K,this},e.isActive=function(){var i=this.parent||this._dp,n=this._start,r;return!!(!i||this._ts&&this._initted&&i.isActive()&&(r=i.rawTime(!0))>=n&&r<this.endTime(!0)-K)},e.eventCallback=function(i,n,r){var l=this.vars;return arguments.length>1?(n?(l[i]=n,r&&(l[i+"Params"]=r),i==="onUpdate"&&(this._onUpdate=n)):delete l[i],this):l[i]},e.then=function(i){var n=this,r=n._prom;return new Promise(function(l){var o=ae(i)?i:Un,a=function(){var c=n.then;n.then=null,r&&r(),ae(o)&&(o=o(n))&&(o.then||o===n)&&(n.then=c),l(o),n.then=c};n._initted&&n.totalProgress()===1&&n._ts>=0||!n._tTime&&n._ts<0?a():n._prom=a})},e.kill=function(){Ft(this)},s}();Oe(Kt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-K,_prom:0,_ps:!1,_rts:1});var xe=function(s){Rn(e,s);function e(i,n){var r;return i===void 0&&(i={}),r=s.call(this,i)||this,r.labels={},r.smoothChildTiming=!!i.smoothChildTiming,r.autoRemoveChildren=!!i.autoRemoveChildren,r._sort=we(i.sortChildren),re&&We(i.parent||re,Ve(r),n),i.reversed&&r.reverse(),i.paused&&r.paused(!0),i.scrollTrigger&&Zn(Ve(r),i.scrollTrigger),r}var t=e.prototype;return t.to=function(n,r,l){return Wt(0,arguments,this),this},t.from=function(n,r,l){return Wt(1,arguments,this),this},t.fromTo=function(n,r,l,o){return Wt(2,arguments,this),this},t.set=function(n,r,l){return r.duration=0,r.parent=this,Gt(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new he(n,r,Ne(this,l),1),this},t.call=function(n,r,l){return We(this,he.delayedCall(0,n,r),l)},t.staggerTo=function(n,r,l,o,a,d,c){return l.duration=r,l.stagger=l.stagger||o,l.onComplete=d,l.onCompleteParams=c,l.parent=this,new he(n,l,Ne(this,a)),this},t.staggerFrom=function(n,r,l,o,a,d,c){return l.runBackwards=1,Gt(l).immediateRender=we(l.immediateRender),this.staggerTo(n,r,l,o,a,d,c)},t.staggerFromTo=function(n,r,l,o,a,d,c,m){return o.startAt=l,Gt(o).immediateRender=we(o.immediateRender),this.staggerTo(n,r,o,a,d,c,m)},t.render=function(n,r,l){var o=this._time,a=this._dirty?this.totalDuration():this._tDur,d=this._dur,c=n<=0?0:ne(n),m=this._zTime<0!=n<0&&(this._initted||!d),f,y,g,u,h,p,_,v,b,x,S,w;if(this!==re&&c>a&&n>=0&&(c=a),c!==this._tTime||l||m){if(o!==this._time&&d&&(c+=this._time-o,n+=this._time-o),f=c,b=this._start,v=this._ts,p=!v,m&&(d||(o=this._zTime),(n||!r)&&(this._zTime=n)),this._repeat){if(S=this._yoyo,h=d+this._rDelay,this._repeat<-1&&n<0)return this.totalTime(h*100+n,r,l);if(f=ne(c%h),c===a?(u=this._repeat,f=d):(x=ne(c/h),u=~~x,u&&u===x&&(f=d,u--),f>d&&(f=d)),x=Pt(this._tTime,h),!o&&this._tTime&&x!==u&&this._tTime-x*h-this._dur<=0&&(x=u),S&&u&1&&(f=d-f,w=1),u!==x&&!this._lock){var L=S&&x&1,T=L===(S&&u&1);if(u<x&&(L=!L),o=L?0:c%d?d:c,this._lock=1,this.render(o||(w?0:ne(u*h)),r,!d)._lock=0,this._tTime=c,!r&&this.parent&&Ae(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,x=u),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(d=this._dur,a=this._tDur,T&&(this._lock=2,o=L?d:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(_=cl(this,ne(o),ne(f)),_&&(c-=f-(f=_._start))),this._tTime=c,this._time=f,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=n,o=0),!o&&c&&d&&!r&&!x&&(Ae(this,"onStart"),this._tTime!==c))return this;if(f>=o&&n>=0)for(y=this._first;y;){if(g=y._next,(y._act||f>=y._start)&&y._ts&&_!==y){if(y.parent!==this)return this.render(n,r,l);if(y.render(y._ts>0?(f-y._start)*y._ts:(y._dirty?y.totalDuration():y._tDur)+(f-y._start)*y._ts,r,l),f!==this._time||!this._ts&&!p){_=0,g&&(c+=this._zTime=-K);break}}y=g}else{y=this._last;for(var C=n<0?n:f;y;){if(g=y._prev,(y._act||C<=y._end)&&y._ts&&_!==y){if(y.parent!==this)return this.render(n,r,l);if(y.render(y._ts>0?(C-y._start)*y._ts:(y._dirty?y.totalDuration():y._tDur)+(C-y._start)*y._ts,r,l||ve&&Mi(y)),f!==this._time||!this._ts&&!p){_=0,g&&(c+=this._zTime=C?-K:K);break}}y=g}}if(_&&!r&&(this.pause(),_.render(f>=o?0:-K)._zTime=f>=o?1:-1,this._ts))return this._start=b,As(this),this.render(n,r,l);this._onUpdate&&!r&&Ae(this,"onUpdate",!0),(c===a&&this._tTime>=this.totalDuration()||!c&&o)&&(b===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((n||!d)&&(c===a&&this._ts>0||!c&&this._ts<0)&&rt(this,1),!r&&!(n<0&&!o)&&(c||o||!a)&&(Ae(this,c===a&&n>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<a&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(n,r){var l=this;if(Ue(r)||(r=Ne(this,r,n)),!(n instanceof Kt)){if(ge(n))return n.forEach(function(o){return l.add(o,r)}),this;if(_e(n))return this.addLabel(n,r);if(ae(n))n=he.delayedCall(0,n);else return this}return this!==n?We(this,n,r):this},t.getChildren=function(n,r,l,o){n===void 0&&(n=!0),r===void 0&&(r=!0),l===void 0&&(l=!0),o===void 0&&(o=-Re);for(var a=[],d=this._first;d;)d._start>=o&&(d instanceof he?r&&a.push(d):(l&&a.push(d),n&&a.push.apply(a,d.getChildren(!0,r,l)))),d=d._next;return a},t.getById=function(n){for(var r=this.getChildren(1,1,1),l=r.length;l--;)if(r[l].vars.id===n)return r[l]},t.remove=function(n){return _e(n)?this.removeLabel(n):ae(n)?this.killTweensOf(n):(n.parent===this&&Es(this,n),n===this._recent&&(this._recent=this._last),vt(this))},t.totalTime=function(n,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=ne(Ee.time-(this._ts>0?n/this._ts:(this.totalDuration()-n)/-this._ts))),s.prototype.totalTime.call(this,n,r),this._forcing=0,this):this._tTime},t.addLabel=function(n,r){return this.labels[n]=Ne(this,r),this},t.removeLabel=function(n){return delete this.labels[n],this},t.addPause=function(n,r,l){var o=he.delayedCall(0,r||Yt,l);return o.data="isPause",this._hasPause=1,We(this,o,Ne(this,n))},t.removePause=function(n){var r=this._first;for(n=Ne(this,n);r;)r._start===n&&r.data==="isPause"&&rt(r),r=r._next},t.killTweensOf=function(n,r,l){for(var o=this.getTweensOf(n,l),a=o.length;a--;)et!==o[a]&&o[a].kill(n,r);return this},t.getTweensOf=function(n,r){for(var l=[],o=Ie(n),a=this._first,d=Ue(r),c;a;)a instanceof he?sl(a._targets,o)&&(d?(!et||a._initted&&a._ts)&&a.globalTime(0)<=r&&a.globalTime(a.totalDuration())>r:!r||a.isActive())&&l.push(a):(c=a.getTweensOf(o,r)).length&&l.push.apply(l,c),a=a._next;return l},t.tweenTo=function(n,r){r=r||{};var l=this,o=Ne(l,n),a=r,d=a.startAt,c=a.onStart,m=a.onStartParams,f=a.immediateRender,y,g=he.to(l,Oe({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:r.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale())||K,onStart:function(){if(l.pause(),!y){var h=r.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale());g._dur!==h&&$t(g,h,0,1).render(g._time,!0,!0),y=1}c&&c.apply(g,m||[])}},r));return f?g.render(0):g},t.tweenFromTo=function(n,r,l){return this.tweenTo(r,Oe({startAt:{time:Ne(this,n)}},l))},t.recent=function(){return this._recent},t.nextLabel=function(n){return n===void 0&&(n=this._time),Yi(this,Ne(this,n))},t.previousLabel=function(n){return n===void 0&&(n=this._time),Yi(this,Ne(this,n),1)},t.currentLabel=function(n){return arguments.length?this.seek(n,!0):this.previousLabel(this._time+K)},t.shiftChildren=function(n,r,l){l===void 0&&(l=0);var o=this._first,a=this.labels,d;for(n=ne(n);o;)o._start>=l&&(o._start+=n,o._end+=n),o=o._next;if(r)for(d in a)a[d]>=l&&(a[d]+=n);return vt(this)},t.invalidate=function(n){var r=this._first;for(this._lock=0;r;)r.invalidate(n),r=r._next;return s.prototype.invalidate.call(this,n)},t.clear=function(n){n===void 0&&(n=!0);for(var r=this._first,l;r;)l=r._next,this.remove(r),r=l;return this._dp&&(this._time=this._tTime=this._pTime=0),n&&(this.labels={}),vt(this)},t.totalDuration=function(n){var r=0,l=this,o=l._last,a=Re,d,c,m;if(arguments.length)return l.timeScale((l._repeat<0?l.duration():l.totalDuration())/(l.reversed()?-n:n));if(l._dirty){for(m=l.parent;o;)d=o._prev,o._dirty&&o.totalDuration(),c=o._start,c>a&&l._sort&&o._ts&&!l._lock?(l._lock=1,We(l,o,c-o._delay,1)._lock=0):a=c,c<0&&o._ts&&(r-=c,(!m&&!l._dp||m&&m.smoothChildTiming)&&(l._start+=ne(c/l._ts),l._time-=c,l._tTime-=c),l.shiftChildren(-c,!1,-1/0),a=0),o._end>r&&o._ts&&(r=o._end),o=d;$t(l,l===re&&l._time>r?l._time:r,1,1),l._dirty=0}return l._tDur},e.updateRoot=function(n){if(re._ts&&(Vn(re,ws(n,re)),jn=Ee.frame),Ee.frame>=Wi){Wi+=$e.autoSleep||120;var r=re._first;if((!r||!r._ts)&&$e.autoSleep&&Ee._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Ee.sleep()}}},e}(Kt);Oe(xe.prototype,{_lock:0,_hasPause:0,_forcing:0});var Ll=function(e,t,i,n,r,l,o){var a=new Te(this._pt,e,t,0,1,mr,null,r),d=0,c=0,m,f,y,g,u,h,p,_;for(a.b=i,a.e=n,i+="",n+="",(p=~n.indexOf("random("))&&(n=Ut(n)),l&&(_=[i,n],l(_,e,t),i=_[0],n=_[1]),f=i.match(Ns)||[];m=Ns.exec(n);)g=m[0],u=n.substring(d,m.index),y?y=(y+1)%5:u.substr(-5)==="rgba("&&(y=1),g!==f[c++]&&(h=parseFloat(f[c-1])||0,a._pt={_next:a._pt,p:u||c===1?u:",",s:h,c:g.charAt(1)==="="?Lt(h,g)-h:parseFloat(g)-h,m:y&&y<4?Math.round:0},d=Ns.lastIndex);return a.c=d<n.length?n.substring(d,n.length):"",a.fp=o,(qn.test(n)||p)&&(a.e=0),this._pt=a,a},Ei=function(e,t,i,n,r,l,o,a,d,c){ae(n)&&(n=n(r||0,e,l));var m=e[t],f=i!=="get"?i:ae(m)?d?e[t.indexOf("set")||!ae(e["get"+t.substr(3)])?t:"get"+t.substr(3)](d):e[t]():m,y=ae(m)?d?Pl:vr:Pi,g;if(_e(n)&&(~n.indexOf("random(")&&(n=Ut(n)),n.charAt(1)==="="&&(g=Lt(f,n)+(me(f)||0),(g||g===0)&&(n=g))),!c||f!==n||di)return!isNaN(f*n)&&n!==""?(g=new Te(this._pt,e,t,+f||0,n-(f||0),typeof m=="boolean"?Dl:yr,0,y),d&&(g.fp=d),o&&g.modifier(o,this,e),this._pt=g):(!m&&!(t in e)&&Ti(t,n),Ll.call(this,e,t,f,n,y,a||$e.stringFilter,d))},Cl=function(e,t,i,n,r){if(ae(e)&&(e=jt(e,r,t,i,n)),!ze(e)||e.style&&e.nodeType||ge(e)||Bn(e))return _e(e)?jt(e,r,t,i,n):e;var l={},o;for(o in e)l[o]=jt(e[o],r,t,i,n);return l},fr=function(e,t,i,n,r,l){var o,a,d,c;if(Me[e]&&(o=new Me[e]).init(r,o.rawVars?t[e]:Cl(t[e],n,r,l,i),i,n,l)!==!1&&(i._pt=a=new Te(i._pt,r,e,0,1,o.render,o,0,o.priority),i!==St))for(d=i._ptLookup[i._targets.indexOf(r)],c=o._props.length;c--;)d[o._props[c]]=a;return o},et,di,Ai=function s(e,t,i){var n=e.vars,r=n.ease,l=n.startAt,o=n.immediateRender,a=n.lazy,d=n.onUpdate,c=n.runBackwards,m=n.yoyoEase,f=n.keyframes,y=n.autoRevert,g=e._dur,u=e._startAt,h=e._targets,p=e.parent,_=p&&p.data==="nested"?p.vars.targets:h,v=e._overwrite==="auto"&&!bi,b=e.timeline,x=n.easeReverse||m,S,w,L,T,C,E,A,P,$,O,R,G,Z;if(b&&(!f||!r)&&(r="none"),e._ease=yt(r,zt.ease),e._rEase=x&&(yt(x)||e._ease),e._from=!b&&!!n.runBackwards,e._from&&(e.ratio=1),!b||f&&!n.stagger){if(P=h[0]?_t(h[0]).harness:0,G=P&&n[P.prop],S=xs(n,Si),u&&(u._zTime<0&&u.progress(1),t<0&&c&&o&&!y?u.render(-1,!0):u.revert(c&&g?fs:el),u._lazy=0),l){if(rt(e._startAt=he.set(h,Oe({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!u&&we(a),startAt:null,delay:0,onUpdate:d&&function(){return Ae(e,"onUpdate")},stagger:0},l))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(ve||!o&&!y)&&e._startAt.revert(fs),o&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&g&&!u){if(t&&(o=!1),L=Oe({overwrite:!1,data:"isFromStart",lazy:o&&!u&&we(a),immediateRender:o,stagger:0,parent:p},S),G&&(L[P.prop]=G),rt(e._startAt=he.set(h,L)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(ve?e._startAt.revert(fs):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,K,K);else if(!t)return}for(e._pt=e._ptCache=0,a=g&&we(a)||a&&!g,w=0;w<h.length;w++){if(C=h[w],A=C._gsap||Ci(h)[w]._gsap,e._ptLookup[w]=O={},ni[A.id]&&it.length&&bs(),R=_===h?w:_.indexOf(C),P&&($=new P).init(C,G||S,e,R,_)!==!1&&(e._pt=T=new Te(e._pt,C,$.name,0,1,$.render,$,0,$.priority),$._props.forEach(function(be){O[be]=T}),$.priority&&(E=1)),!P||G)for(L in S)Me[L]&&($=fr(L,S,e,R,C,_))?$.priority&&(E=1):O[L]=T=Ei.call(e,C,L,"get",S[L],R,_,0,n.stringFilter);e._op&&e._op[w]&&e.kill(C,e._op[w]),v&&e._pt&&(et=e,re.killTweensOf(C,O,e.globalTime(t)),Z=!e.parent,et=0),e._pt&&a&&(ni[A.id]=1)}E&&gr(e),e._onInit&&e._onInit(e)}e._onUpdate=d,e._initted=(!e._op||e._pt)&&!Z,f&&t<=0&&b.render(Re,!0,!0)},Ml=function(e,t,i,n,r,l,o,a){var d=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,m,f,y;if(!d)for(d=e._ptCache[t]=[],f=e._ptLookup,y=e._targets.length;y--;){if(c=f[y][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return di=1,e.vars[t]="+=0",Ai(e,o),di=0,a?Vt(t+" not eligible for reset. Try splitting into individual properties"):1;d.push(c)}for(y=d.length;y--;)m=d[y],c=m._pt||m,c.s=(n||n===0)&&!r?n:c.s+(n||0)+l*c.c,c.c=i-c.s,m.e&&(m.e=ce(i)+me(m.e)),m.b&&(m.b=c.s+me(m.b))},El=function(e,t){var i=e[0]?_t(e[0]).harness:0,n=i&&i.aliases,r,l,o,a;if(!n)return t;r=At({},t);for(l in n)if(l in r)for(a=n[l].split(","),o=a.length;o--;)r[a[o]]=r[l];return r},Al=function(e,t,i,n){var r=t.ease||n||"power1.inOut",l,o;if(ge(t))o=i[e]||(i[e]=[]),t.forEach(function(a,d){return o.push({t:d/(t.length-1)*100,v:a,e:r})});else for(l in t)o=i[l]||(i[l]=[]),l==="ease"||o.push({t:parseFloat(e),v:t[l],e:r})},jt=function(e,t,i,n,r){return ae(e)?e.call(t,i,n,r):_e(e)&&~e.indexOf("random(")?Ut(e):e},pr=Li+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",_r={};ke(pr+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return _r[s]=1});var he=function(s){Rn(e,s);function e(i,n,r,l){var o;typeof n=="number"&&(r.duration=n,n=r,r=null),o=s.call(this,l?n:Gt(n))||this;var a=o.vars,d=a.duration,c=a.delay,m=a.immediateRender,f=a.stagger,y=a.overwrite,g=a.keyframes,u=a.defaults,h=a.scrollTrigger,p=n.parent||re,_=(ge(i)||Bn(i)?Ue(i[0]):"length"in n)?[i]:Ie(i),v,b,x,S,w,L,T,C;if(o._targets=_.length?Ci(_):Vt("GSAP target "+i+" not found. https://gsap.com",!$e.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=y,g||f||ss(d)||ss(c)){n=o.vars;var E=n.easeReverse||n.yoyoEase;if(v=o.timeline=new xe({data:"nested",defaults:u||{},targets:p&&p.data==="nested"?p.vars.targets:_}),v.kill(),v.parent=v._dp=Ve(o),v._start=0,f||ss(d)||ss(c)){if(S=_.length,T=f&&tr(f),ze(f))for(w in f)~pr.indexOf(w)&&(C||(C={}),C[w]=f[w]);for(b=0;b<S;b++)x=xs(n,_r),x.stagger=0,E&&(x.easeReverse=E),C&&At(x,C),L=_[b],x.duration=+jt(d,Ve(o),b,L,_),x.delay=(+jt(c,Ve(o),b,L,_)||0)-o._delay,!f&&S===1&&x.delay&&(o._delay=c=x.delay,o._start+=c,x.delay=0),v.to(L,x,T?T(b,L,_):0),v._ease=z.none;v.duration()?d=c=0:o.timeline=0}else if(g){Gt(Oe(v.vars.defaults,{ease:"none"})),v._ease=yt(g.ease||n.ease||"none");var A=0,P,$,O;if(ge(g))g.forEach(function(R){return v.to(_,R,">")}),v.duration();else{x={};for(w in g)w==="ease"||w==="easeEach"||Al(w,g[w],x,g.easeEach);for(w in x)for(P=x[w].sort(function(R,G){return R.t-G.t}),A=0,b=0;b<P.length;b++)$=P[b],O={ease:$.e,duration:($.t-(b?P[b-1].t:0))/100*d},O[w]=$.v,v.to(_,O,A),A+=O.duration;v.duration()<d&&v.to({},{duration:d-v.duration()})}}d||o.duration(d=v.duration())}else o.timeline=0;return y===!0&&!bi&&(et=Ve(o),re.killTweensOf(_),et=0),We(p,Ve(o),r),n.reversed&&o.reverse(),n.paused&&o.paused(!0),(m||!d&&!g&&o._start===ne(p._time)&&we(m)&&ll(Ve(o))&&p.data!=="nested")&&(o._tTime=-K,o.render(Math.max(0,-c)||0)),h&&Zn(Ve(o),h),o}var t=e.prototype;return t.render=function(n,r,l){var o=this._time,a=this._tDur,d=this._dur,c=n<0,m=n>a-K&&!c?a:n<K?0:n,f,y,g,u,h,p,_,v;if(!d)al(this,n,r,l);else if(m!==this._tTime||!n||l||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(f=m,v=this.timeline,this._repeat){if(u=d+this._rDelay,this._repeat<-1&&c)return this.totalTime(u*100+n,r,l);if(f=ne(m%u),m===a?(g=this._repeat,f=d):(h=ne(m/u),g=~~h,g&&g===h?(f=d,g--):f>d&&(f=d)),p=this._yoyo&&g&1,p&&(f=d-f),h=Pt(this._tTime,u),f===o&&!l&&this._initted&&g===h)return this._tTime=m,this;g!==h&&this.vars.repeatRefresh&&!p&&!this._lock&&f!==u&&this._initted&&(this._lock=l=1,this.render(ne(u*g),!0).invalidate()._lock=0)}if(!this._initted){if(Xn(this,c?n:f,l,r,m))return this._tTime=0,this;if(o!==this._time&&!(l&&this.vars.repeatRefresh&&g!==h))return this;if(d!==this._dur)return this.render(n,r,l)}if(this._rEase){var b=f<o;if(b!==this._inv){var x=b?o:d-o;this._inv=b,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=x?(b?-1:1)/x:0,this._invScale=b?-this.ratio:1-this.ratio,this._invEase=b?this._rEase:this._ease}this.ratio=_=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=_=this._ease(f/d);if(this._from&&(this.ratio=_=1-_),this._tTime=m,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&m&&!r&&!h&&(Ae(this,"onStart"),this._tTime!==m))return this;for(y=this._pt;y;)y.r(_,y.d),y=y._next;v&&v.render(n<0?n:v._dur*v._ease(f/this._dur),r,l)||this._startAt&&(this._zTime=n),this._onUpdate&&!r&&(c&&ri(this,n,r,l),Ae(this,"onUpdate")),this._repeat&&g!==h&&this.vars.onRepeat&&!r&&this.parent&&Ae(this,"onRepeat"),(m===this._tDur||!m)&&this._tTime===m&&(c&&!this._onUpdate&&ri(this,n,!0,!0),(n||!d)&&(m===this._tDur&&this._ts>0||!m&&this._ts<0)&&rt(this,1),!r&&!(c&&!o)&&(m||o||p)&&(Ae(this,m===a?"onComplete":"onReverseComplete",!0),this._prom&&!(m<a&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(n){return(!n||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(n),s.prototype.invalidate.call(this,n)},t.resetTo=function(n,r,l,o,a){Qt||Ee.wake(),this._ts||this.play();var d=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||Ai(this,d),c=this._ease(d/this._dur),Ml(this,n,r,l,o,c,d,a)?this.resetTo(n,r,l,o,1):(Ps(this,0),this.parent||Qn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(n,r){if(r===void 0&&(r="all"),!n&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Ft(this):this.scrollTrigger&&this.scrollTrigger.kill(!!ve),this;if(this.timeline){var l=this.timeline.totalDuration();return this.timeline.killTweensOf(n,r,et&&et.vars.overwrite!==!0)._first||Ft(this),this.parent&&l!==this.timeline.totalDuration()&&$t(this,this._dur*this.timeline._tDur/l,0,1),this}var o=this._targets,a=n?Ie(n):o,d=this._ptLookup,c=this._pt,m,f,y,g,u,h,p;if((!r||r==="all")&&nl(o,a))return r==="all"&&(this._pt=0),Ft(this);for(m=this._op=this._op||[],r!=="all"&&(_e(r)&&(u={},ke(r,function(_){return u[_]=1}),r=u),r=El(o,r)),p=o.length;p--;)if(~a.indexOf(o[p])){f=d[p],r==="all"?(m[p]=r,g=f,y={}):(y=m[p]=m[p]||{},g=r);for(u in g)h=f&&f[u],h&&((!("kill"in h.d)||h.d.kill(u)===!0)&&Es(this,h,"_pt"),delete f[u]),y!=="all"&&(y[u]=1)}return this._initted&&!this._pt&&c&&Ft(this),this},e.to=function(n,r){return new e(n,r,arguments[2])},e.from=function(n,r){return Wt(1,arguments)},e.delayedCall=function(n,r,l,o){return new e(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:n,onComplete:r,onReverseComplete:r,onCompleteParams:l,onReverseCompleteParams:l,callbackScope:o})},e.fromTo=function(n,r,l){return Wt(2,arguments)},e.set=function(n,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new e(n,r)},e.killTweensOf=function(n,r,l){return re.killTweensOf(n,r,l)},e}(Kt);Oe(he.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ke("staggerTo,staggerFrom,staggerFromTo",function(s){he[s]=function(){var e=new xe,t=oi.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var Pi=function(e,t,i){return e[t]=i},vr=function(e,t,i){return e[t](i)},Pl=function(e,t,i,n){return e[t](n.fp,i)},$l=function(e,t,i){return e.setAttribute(t,i)},$i=function(e,t){return ae(e[t])?vr:xi(e[t])&&e.setAttribute?$l:Pi},yr=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Dl=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},mr=function(e,t){var i=t._pt,n="";if(!e&&t.b)n=t.b;else if(e===1&&t.e)n=t.e;else{for(;i;)n=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+n,i=i._next;n+=t.c}t.set(t.t,t.p,n,t)},Di=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Ol=function(e,t,i,n){for(var r=this._pt,l;r;)l=r._next,r.p===n&&r.modifier(e,t,i),r=l},Nl=function(e){for(var t=this._pt,i,n;t;)n=t._next,t.p===e&&!t.op||t.op===e?Es(this,t,"_pt"):t.dep||(i=1),t=n;return!i},Rl=function(e,t,i,n){n.mSet(e,t,n.m.call(n.tween,i,n.mt),n)},gr=function(e){for(var t=e._pt,i,n,r,l;t;){for(i=t._next,n=r;n&&n.pr>t.pr;)n=n._next;(t._prev=n?n._prev:l)?t._prev._next=t:r=t,(t._next=n)?n._prev=t:l=t,t=i}e._pt=r},Te=function(){function s(t,i,n,r,l,o,a,d,c){this.t=i,this.s=r,this.c=l,this.p=n,this.r=o||yr,this.d=a||this,this.set=d||Pi,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(i,n,r){this.mSet=this.mSet||this.set,this.set=Rl,this.m=i,this.mt=r,this.tween=n},s}();ke(Li+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Si[s]=1});De.TweenMax=De.TweenLite=he;De.TimelineLite=De.TimelineMax=xe;re=new xe({sortChildren:!1,defaults:zt,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});$e.stringFilter=dr;var mt=[],_s={},Il=[],Qi=0,Bl=0,qs=function(e){return(_s[e]||Il).map(function(t){return t()})},ui=function(){var e=Date.now(),t=[];e-Qi>2&&(qs("matchMediaInit"),mt.forEach(function(i){var n=i.queries,r=i.conditions,l,o,a,d;for(o in n)l=Ge.matchMedia(n[o]).matches,l&&(a=1),l!==r[o]&&(r[o]=l,d=1);d&&(i.revert(),a&&t.push(i))}),qs("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(n){return i.add(null,n)})}),Qi=e,qs("matchMedia"))},br=function(){function s(t,i){this.selector=i&&ai(i),this.data=[],this._r=[],this.isReverted=!1,this.id=Bl++,t&&this.add(t)}var e=s.prototype;return e.add=function(i,n,r){ae(i)&&(r=n,n=i,i=ae);var l=this,o=function(){var d=te,c=l.selector,m;return d&&d!==l&&d.data.push(l),r&&(l.selector=ai(r)),te=l,m=n.apply(l,arguments),ae(m)&&l._r.push(m),te=d,l.selector=c,l.isReverted=!1,m};return l.last=o,i===ae?o(l,function(a){return l.add(null,a)}):i?l[i]=o:o},e.ignore=function(i){var n=te;te=null,i(this),te=n},e.getTweens=function(){var i=[];return this.data.forEach(function(n){return n instanceof s?i.push.apply(i,n.getTweens()):n instanceof he&&!(n.parent&&n.parent.data==="nested")&&i.push(n)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,n){var r=this;if(i?function(){for(var o=r.getTweens(),a=r.data.length,d;a--;)d=r.data[a],d.data==="isFlip"&&(d.revert(),d.getChildren(!0,!0,!1).forEach(function(c){return o.splice(o.indexOf(c),1)}));for(o.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,m){return m.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),a=r.data.length;a--;)d=r.data[a],d instanceof xe?d.data!=="nested"&&(d.scrollTrigger&&d.scrollTrigger.revert(),d.kill()):!(d instanceof he)&&d.revert&&d.revert(i);r._r.forEach(function(c){return c(i,r)}),r.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),n)for(var l=mt.length;l--;)mt[l].id===this.id&&mt.splice(l,1)},e.revert=function(i){this.kill(i||{})},s}(),Fl=function(){function s(t){this.contexts=[],this.scope=t,te&&te.data.push(this)}var e=s.prototype;return e.add=function(i,n,r){ze(i)||(i={matches:i});var l=new br(0,r||this.scope),o=l.conditions={},a,d,c;te&&!l.selector&&(l.selector=te.selector),this.contexts.push(l),n=l.add("onMatch",n),l.queries=i;for(d in i)d==="all"?c=1:(a=Ge.matchMedia(i[d]),a&&(mt.indexOf(l)<0&&mt.push(l),(o[d]=a.matches)&&(c=1),a.addListener?a.addListener(ui):a.addEventListener("change",ui)));return c&&n(l,function(m){return l.add(null,m)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(n){return n.kill(i,!0)})},s}(),ks={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(n){return or(n)})},timeline:function(e){return new xe(e)},getTweensOf:function(e,t){return re.getTweensOf(e,t)},getProperty:function(e,t,i,n){_e(e)&&(e=Ie(e)[0]);var r=_t(e||{}).get,l=i?Un:Yn;return i==="native"&&(i=""),e&&(t?l((Me[t]&&Me[t].get||r)(e,t,i,n)):function(o,a,d){return l((Me[o]&&Me[o].get||r)(e,o,a,d))})},quickSetter:function(e,t,i){if(e=Ie(e),e.length>1){var n=e.map(function(c){return Le.quickSetter(c,t,i)}),r=n.length;return function(c){for(var m=r;m--;)n[m](c)}}e=e[0]||{};var l=Me[t],o=_t(e),a=o.harness&&(o.harness.aliases||{})[t]||t,d=l?function(c){var m=new l;St._pt=0,m.init(e,i?c+i:c,St,0,[e]),m.render(1,m),St._pt&&Di(1,St)}:o.set(e,a);return l?d:function(c){return d(e,a,i?c+i:c,o,1)}},quickTo:function(e,t,i){var n,r=Le.to(e,Oe((n={},n[t]="+=0.1",n.paused=!0,n.stagger=0,n),i||{})),l=function(a,d,c){return r.resetTo(t,a,d,c)};return l.tween=r,l},isTweening:function(e){return re.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=yt(e.ease,zt.ease)),ji(zt,e||{})},config:function(e){return ji($e,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,n=e.plugins,r=e.defaults,l=e.extendTimeline;(n||"").split(",").forEach(function(o){return o&&!Me[o]&&!De[o]&&Vt(t+" effect requires "+o+" plugin.")}),Rs[t]=function(o,a,d){return i(Ie(o),Oe(a||{},r),d)},l&&(xe.prototype[t]=function(o,a,d){return this.add(Rs[t](o,ze(a)?a:(d=a)&&{},this),d)})},registerEase:function(e,t){z[e]=yt(t)},parseEase:function(e,t){return arguments.length?yt(e,t):z},getById:function(e){return re.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new xe(e),n,r;for(i.smoothChildTiming=we(e.smoothChildTiming),re.remove(i),i._dp=0,i._time=i._tTime=re._time,n=re._first;n;)r=n._next,(t||!(!n._dur&&n instanceof he&&n.vars.onComplete===n._targets[0]))&&We(i,n,n._start-n._delay),n=r;return We(re,i,0),i},context:function(e,t){return e?new br(e,t):te},matchMedia:function(e){return new Fl(e)},matchMediaRefresh:function(){return mt.forEach(function(e){var t=e.conditions,i,n;for(n in t)t[n]&&(t[n]=!1,i=1);i&&e.revert()})||ui()},addEventListener:function(e,t){var i=_s[e]||(_s[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=_s[e],n=i&&i.indexOf(t);n>=0&&i.splice(n,1)},utils:{wrap:vl,wrapYoyo:yl,distribute:tr,random:ir,snap:sr,normalize:_l,getUnit:me,clamp:ul,splitColor:ar,toArray:Ie,selector:ai,mapRange:rr,pipe:fl,unitize:pl,interpolate:ml,shuffle:er},install:Gn,effects:Rs,ticker:Ee,updateRoot:xe.updateRoot,plugins:Me,globalTimeline:re,core:{PropTween:Te,globals:Wn,Tween:he,Timeline:xe,Animation:Kt,getCache:_t,_removeLinkedListItem:Es,reverting:function(){return ve},context:function(e){return e&&te&&(te.data.push(e),e._ctx=te),te},suppressOverwrites:function(e){return bi=e}}};ke("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return ks[s]=he[s]});Ee.add(xe.updateRoot);St=ks.to({},{duration:0});var ql=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Hl=function(e,t){var i=e._targets,n,r,l;for(n in t)for(r=i.length;r--;)l=e._ptLookup[r][n],l&&(l=l.d)&&(l._pt&&(l=ql(l,n)),l&&l.modifier&&l.modifier(t[n],e,i[r],n))},Hs=function(e,t){return{name:e,headless:1,rawVars:1,init:function(n,r,l){l._onInit=function(o){var a,d;if(_e(r)&&(a={},ke(r,function(c){return a[c]=1}),r=a),t){a={};for(d in r)a[d]=t(r[d]);r=a}Hl(o,r)}}}},Le=ks.registerPlugin({name:"attr",init:function(e,t,i,n,r){var l,o,a;this.tween=i;for(l in t)a=e.getAttribute(l)||"",o=this.add(e,"setAttribute",(a||0)+"",t[l],n,r,0,0,l),o.op=l,o.b=a,this._props.push(l)},render:function(e,t){for(var i=t._pt;i;)ve?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Hs("roundProps",ci),Hs("modifiers"),Hs("snap",sr))||ks;he.version=xe.version=Le.version="3.15.0";Hn=1;wi()&&Dt();z.Power0;z.Power1;z.Power2;z.Power3;z.Power4;z.Linear;z.Quad;z.Cubic;z.Quart;z.Quint;z.Strong;z.Elastic;z.Back;z.SteppedEase;z.Bounce;z.Sine;z.Expo;z.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ki,tt,Ct,Oi,ft,Zi,Ni,Gl=function(){return typeof window<"u"},Qe={},ht=180/Math.PI,Mt=Math.PI/180,wt=Math.atan2,Xi=1e8,Ri=/([A-Z])/g,Wl=/(left|right|width|margin|padding|x)/i,jl=/[\s,\(]\S/,je={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},hi=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},zl=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Vl=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Yl=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Ul=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},xr=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},wr=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},Ql=function(e,t,i){return e.style[t]=i},Kl=function(e,t,i){return e.style.setProperty(t,i)},Zl=function(e,t,i){return e._gsap[t]=i},Xl=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},Jl=function(e,t,i,n,r){var l=e._gsap;l.scaleX=l.scaleY=i,l.renderTransform(r,l)},eo=function(e,t,i,n,r){var l=e._gsap;l[t]=i,l.renderTransform(r,l)},le="transform",Se=le+"Origin",to=function s(e,t){var i=this,n=this.target,r=n.style,l=n._gsap;if(e in Qe&&r){if(this.tfm=this.tfm||{},e!=="transform")e=je[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=Ye(n,o)}):this.tfm[e]=l.x?l[e]:Ye(n,e),e===Se&&(this.tfm.zOrigin=l.zOrigin);else return je.transform.split(",").forEach(function(o){return s.call(i,o,t)});if(this.props.indexOf(le)>=0)return;l.svg&&(this.svgo=n.getAttribute("data-svg-origin"),this.props.push(Se,t,"")),e=le}(r||t)&&this.props.push(e,t,r[e])},kr=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},so=function(){var e=this.props,t=this.target,i=t.style,n=t._gsap,r,l;for(r=0;r<e.length;r+=3)e[r+1]?e[r+1]===2?t[e[r]](e[r+2]):t[e[r]]=e[r+2]:e[r+2]?i[e[r]]=e[r+2]:i.removeProperty(e[r].substr(0,2)==="--"?e[r]:e[r].replace(Ri,"-$1").toLowerCase());if(this.tfm){for(l in this.tfm)n[l]=this.tfm[l];n.svg&&(n.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),r=Ni(),(!r||!r.isStart)&&!i[le]&&(kr(i),n.zOrigin&&i[Se]&&(i[Se]+=" "+n.zOrigin+"px",n.zOrigin=0,n.renderTransform()),n.uncache=1)}},Tr=function(e,t){var i={target:e,props:[],revert:so,save:to};return e._gsap||Le.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(n){return i.save(n)}),i},Sr,fi=function(e,t){var i=tt.createElementNS?tt.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):tt.createElement(e);return i&&i.style?i:tt.createElement(e)},Pe=function s(e,t,i){var n=getComputedStyle(e);return n[t]||n.getPropertyValue(t.replace(Ri,"-$1").toLowerCase())||n.getPropertyValue(t)||!i&&s(e,Ot(t)||t,1)||""},Ji="O,Moz,ms,Ms,Webkit".split(","),Ot=function(e,t,i){var n=t||ft,r=n.style,l=5;if(e in r&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);l--&&!(Ji[l]+e in r););return l<0?null:(l===3?"ms":l>=0?Ji[l]:"")+e},pi=function(){Gl()&&window.document&&(Ki=window,tt=Ki.document,Ct=tt.documentElement,ft=fi("div")||{style:{}},fi("div"),le=Ot(le),Se=le+"Origin",ft.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Sr=!!Ot("perspective"),Ni=Le.core.reverting,Oi=1)},en=function(e){var t=e.ownerSVGElement,i=fi("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),n=e.cloneNode(!0),r;n.style.display="block",i.appendChild(n),Ct.appendChild(i);try{r=n.getBBox()}catch{}return i.removeChild(n),Ct.removeChild(i),r},tn=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Lr=function(e){var t,i;try{t=e.getBBox()}catch{t=en(e),i=1}return t&&(t.width||t.height)||i||(t=en(e)),t&&!t.width&&!t.x&&!t.y?{x:+tn(e,["x","cx","x1"])||0,y:+tn(e,["y","cy","y1"])||0,width:0,height:0}:t},Cr=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Lr(e))},lt=function(e,t){if(t){var i=e.style,n;t in Qe&&t!==Se&&(t=le),i.removeProperty?(n=t.substr(0,2),(n==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(n==="--"?t:t.replace(Ri,"-$1").toLowerCase())):i.removeAttribute(t)}},st=function(e,t,i,n,r,l){var o=new Te(e._pt,t,i,0,1,l?wr:xr);return e._pt=o,o.b=n,o.e=r,e._props.push(i),o},sn={deg:1,rad:1,turn:1},io={grid:1,flex:1},ot=function s(e,t,i,n){var r=parseFloat(i)||0,l=(i+"").trim().substr((r+"").length)||"px",o=ft.style,a=Wl.test(t),d=e.tagName.toLowerCase()==="svg",c=(d?"client":"offset")+(a?"Width":"Height"),m=100,f=n==="px",y=n==="%",g,u,h,p;if(n===l||!r||sn[n]||sn[l])return r;if(l!=="px"&&!f&&(r=s(e,t,i,"px")),p=e.getCTM&&Cr(e),(y||l==="%")&&(Qe[t]||~t.indexOf("adius")))return g=p?e.getBBox()[a?"width":"height"]:e[c],ce(y?r/g*m:r/100*g);if(o[a?"width":"height"]=m+(f?l:n),u=n!=="rem"&&~t.indexOf("adius")||n==="em"&&e.appendChild&&!d?e:e.parentNode,p&&(u=(e.ownerSVGElement||{}).parentNode),(!u||u===tt||!u.appendChild)&&(u=tt.body),h=u._gsap,h&&y&&h.width&&a&&h.time===Ee.time&&!h.uncache)return ce(r/h.width*m);if(y&&(t==="height"||t==="width")){var _=e.style[t];e.style[t]=m+n,g=e[c],_?e.style[t]=_:lt(e,t)}else(y||l==="%")&&!io[Pe(u,"display")]&&(o.position=Pe(e,"position")),u===e&&(o.position="static"),u.appendChild(ft),g=ft[c],u.removeChild(ft),o.position="absolute";return a&&y&&(h=_t(u),h.time=Ee.time,h.width=u[c]),ce(f?g*r/m:g&&r?m/g*r:0)},Ye=function(e,t,i,n){var r;return Oi||pi(),t in je&&t!=="transform"&&(t=je[t],~t.indexOf(",")&&(t=t.split(",")[0])),Qe[t]&&t!=="transform"?(r=Xt(e,n),r=t!=="transformOrigin"?r[t]:r.svg?r.origin:Ss(Pe(e,Se))+" "+r.zOrigin+"px"):(r=e.style[t],(!r||r==="auto"||n||~(r+"").indexOf("calc("))&&(r=Ts[t]&&Ts[t](e,t,i)||Pe(e,t)||zn(e,t)||(t==="opacity"?1:0))),i&&!~(r+"").trim().indexOf(" ")?ot(e,t,r,i)+i:r},no=function(e,t,i,n){if(!i||i==="none"){var r=Ot(t,e,1),l=r&&Pe(e,r,1);l&&l!==i?(t=r,i=l):t==="borderColor"&&(i=Pe(e,"borderTopColor"))}var o=new Te(this._pt,e.style,t,0,1,mr),a=0,d=0,c,m,f,y,g,u,h,p,_,v,b,x;if(o.b=i,o.e=n,i+="",n+="",n.substring(0,6)==="var(--"&&(n=Pe(e,n.substring(4,n.indexOf(")")))),n==="auto"&&(u=e.style[t],e.style[t]=n,n=Pe(e,t)||n,u?e.style[t]=u:lt(e,t)),c=[i,n],dr(c),i=c[0],n=c[1],f=i.match(Tt)||[],x=n.match(Tt)||[],x.length){for(;m=Tt.exec(n);)h=m[0],_=n.substring(a,m.index),g?g=(g+1)%5:(_.substr(-5)==="rgba("||_.substr(-5)==="hsla(")&&(g=1),h!==(u=f[d++]||"")&&(y=parseFloat(u)||0,b=u.substr((y+"").length),h.charAt(1)==="="&&(h=Lt(y,h)+b),p=parseFloat(h),v=h.substr((p+"").length),a=Tt.lastIndex-v.length,v||(v=v||$e.units[t]||b,a===n.length&&(n+=v,o.e+=v)),b!==v&&(y=ot(e,t,u,v)||0),o._pt={_next:o._pt,p:_||d===1?_:",",s:y,c:p-y,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=a<n.length?n.substring(a,n.length):""}else o.r=t==="display"&&n==="none"?wr:xr;return qn.test(n)&&(o.e=0),this._pt=o,o},nn={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},ro=function(e){var t=e.split(" "),i=t[0],n=t[1]||"50%";return(i==="top"||i==="bottom"||n==="left"||n==="right")&&(e=i,i=n,n=e),t[0]=nn[i]||i,t[1]=nn[n]||n,t.join(" ")},lo=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,n=i.style,r=t.u,l=i._gsap,o,a,d;if(r==="all"||r===!0)n.cssText="",a=1;else for(r=r.split(","),d=r.length;--d>-1;)o=r[d],Qe[o]&&(a=1,o=o==="transformOrigin"?Se:le),lt(i,o);a&&(lt(i,le),l&&(l.svg&&i.removeAttribute("transform"),n.scale=n.rotate=n.translate="none",Xt(i,1),l.uncache=1,kr(n)))}},Ts={clearProps:function(e,t,i,n,r){if(r.data!=="isFromStart"){var l=e._pt=new Te(e._pt,t,i,0,0,lo);return l.u=n,l.pr=-10,l.tween=r,e._props.push(i),1}}},Zt=[1,0,0,1,0,0],Mr={},Er=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},rn=function(e){var t=Pe(e,le);return Er(t)?Zt:t.substr(7).match(Fn).map(ce)},Ii=function(e,t){var i=e._gsap||_t(e),n=e.style,r=rn(e),l,o,a,d;return i.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,r=[a.a,a.b,a.c,a.d,a.e,a.f],r.join(",")==="1,0,0,1,0,0"?Zt:r):(r===Zt&&!e.offsetParent&&e!==Ct&&!i.svg&&(a=n.display,n.display="block",l=e.parentNode,(!l||!e.offsetParent&&!e.getBoundingClientRect().width)&&(d=1,o=e.nextElementSibling,Ct.appendChild(e)),r=rn(e),a?n.display=a:lt(e,"display"),d&&(o?l.insertBefore(e,o):l?l.appendChild(e):Ct.removeChild(e))),t&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},_i=function(e,t,i,n,r,l){var o=e._gsap,a=r||Ii(e,!0),d=o.xOrigin||0,c=o.yOrigin||0,m=o.xOffset||0,f=o.yOffset||0,y=a[0],g=a[1],u=a[2],h=a[3],p=a[4],_=a[5],v=t.split(" "),b=parseFloat(v[0])||0,x=parseFloat(v[1])||0,S,w,L,T;i?a!==Zt&&(w=y*h-g*u)&&(L=b*(h/w)+x*(-u/w)+(u*_-h*p)/w,T=b*(-g/w)+x*(y/w)-(y*_-g*p)/w,b=L,x=T):(S=Lr(e),b=S.x+(~v[0].indexOf("%")?b/100*S.width:b),x=S.y+(~(v[1]||v[0]).indexOf("%")?x/100*S.height:x)),n||n!==!1&&o.smooth?(p=b-d,_=x-c,o.xOffset=m+(p*y+_*u)-p,o.yOffset=f+(p*g+_*h)-_):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=x,o.smooth=!!n,o.origin=t,o.originIsAbsolute=!!i,e.style[Se]="0px 0px",l&&(st(l,o,"xOrigin",d,b),st(l,o,"yOrigin",c,x),st(l,o,"xOffset",m,o.xOffset),st(l,o,"yOffset",f,o.yOffset)),e.setAttribute("data-svg-origin",b+" "+x)},Xt=function(e,t){var i=e._gsap||new hr(e);if("x"in i&&!t&&!i.uncache)return i;var n=e.style,r=i.scaleX<0,l="px",o="deg",a=getComputedStyle(e),d=Pe(e,Se)||"0",c,m,f,y,g,u,h,p,_,v,b,x,S,w,L,T,C,E,A,P,$,O,R,G,Z,be,M,k,D,I,B,q;return c=m=f=u=h=p=_=v=b=0,y=g=1,i.svg=!!(e.getCTM&&Cr(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(n[le]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[le]!=="none"?a[le]:"")),n.scale=n.rotate=n.translate="none"),w=Ii(e,i.svg),i.svg&&(i.uncache?(Z=e.getBBox(),d=i.xOrigin-Z.x+"px "+(i.yOrigin-Z.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),_i(e,G||d,!!G||i.originIsAbsolute,i.smooth!==!1,w)),x=i.xOrigin||0,S=i.yOrigin||0,w!==Zt&&(E=w[0],A=w[1],P=w[2],$=w[3],c=O=w[4],m=R=w[5],w.length===6?(y=Math.sqrt(E*E+A*A),g=Math.sqrt($*$+P*P),u=E||A?wt(A,E)*ht:0,_=P||$?wt(P,$)*ht+u:0,_&&(g*=Math.abs(Math.cos(_*Mt))),i.svg&&(c-=x-(x*E+S*P),m-=S-(x*A+S*$))):(q=w[6],I=w[7],M=w[8],k=w[9],D=w[10],B=w[11],c=w[12],m=w[13],f=w[14],L=wt(q,D),h=L*ht,L&&(T=Math.cos(-L),C=Math.sin(-L),G=O*T+M*C,Z=R*T+k*C,be=q*T+D*C,M=O*-C+M*T,k=R*-C+k*T,D=q*-C+D*T,B=I*-C+B*T,O=G,R=Z,q=be),L=wt(-P,D),p=L*ht,L&&(T=Math.cos(-L),C=Math.sin(-L),G=E*T-M*C,Z=A*T-k*C,be=P*T-D*C,B=$*C+B*T,E=G,A=Z,P=be),L=wt(A,E),u=L*ht,L&&(T=Math.cos(L),C=Math.sin(L),G=E*T+A*C,Z=O*T+R*C,A=A*T-E*C,R=R*T-O*C,E=G,O=Z),h&&Math.abs(h)+Math.abs(u)>359.9&&(h=u=0,p=180-p),y=ce(Math.sqrt(E*E+A*A+P*P)),g=ce(Math.sqrt(R*R+q*q)),L=wt(O,R),_=Math.abs(L)>2e-4?L*ht:0,b=B?1/(B<0?-B:B):0),i.svg&&(G=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Er(Pe(e,le)),G&&e.setAttribute("transform",G))),Math.abs(_)>90&&Math.abs(_)<270&&(r?(y*=-1,_+=u<=0?180:-180,u+=u<=0?180:-180):(g*=-1,_+=_<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+l,i.y=m-((i.yPercent=m&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-m)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+l,i.z=f+l,i.scaleX=ce(y),i.scaleY=ce(g),i.rotation=ce(u)+o,i.rotationX=ce(h)+o,i.rotationY=ce(p)+o,i.skewX=_+o,i.skewY=v+o,i.transformPerspective=b+l,(i.zOrigin=parseFloat(d.split(" ")[2])||!t&&i.zOrigin||0)&&(n[Se]=Ss(d)),i.xOffset=i.yOffset=0,i.force3D=$e.force3D,i.renderTransform=i.svg?ao:Sr?Ar:oo,i.uncache=0,i},Ss=function(e){return(e=e.split(" "))[0]+" "+e[1]},Gs=function(e,t,i){var n=me(t);return ce(parseFloat(t)+parseFloat(ot(e,"x",i+"px",n)))+n},oo=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Ar(e,t)},dt="0deg",Nt="0px",ut=") ",Ar=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,l=i.x,o=i.y,a=i.z,d=i.rotation,c=i.rotationY,m=i.rotationX,f=i.skewX,y=i.skewY,g=i.scaleX,u=i.scaleY,h=i.transformPerspective,p=i.force3D,_=i.target,v=i.zOrigin,b="",x=p==="auto"&&e&&e!==1||p===!0;if(v&&(m!==dt||c!==dt)){var S=parseFloat(c)*Mt,w=Math.sin(S),L=Math.cos(S),T;S=parseFloat(m)*Mt,T=Math.cos(S),l=Gs(_,l,w*T*-v),o=Gs(_,o,-Math.sin(S)*-v),a=Gs(_,a,L*T*-v+v)}h!==Nt&&(b+="perspective("+h+ut),(n||r)&&(b+="translate("+n+"%, "+r+"%) "),(x||l!==Nt||o!==Nt||a!==Nt)&&(b+=a!==Nt||x?"translate3d("+l+", "+o+", "+a+") ":"translate("+l+", "+o+ut),d!==dt&&(b+="rotate("+d+ut),c!==dt&&(b+="rotateY("+c+ut),m!==dt&&(b+="rotateX("+m+ut),(f!==dt||y!==dt)&&(b+="skew("+f+", "+y+ut),(g!==1||u!==1)&&(b+="scale("+g+", "+u+ut),_.style[le]=b||"translate(0, 0)"},ao=function(e,t){var i=t||this,n=i.xPercent,r=i.yPercent,l=i.x,o=i.y,a=i.rotation,d=i.skewX,c=i.skewY,m=i.scaleX,f=i.scaleY,y=i.target,g=i.xOrigin,u=i.yOrigin,h=i.xOffset,p=i.yOffset,_=i.forceCSS,v=parseFloat(l),b=parseFloat(o),x,S,w,L,T;a=parseFloat(a),d=parseFloat(d),c=parseFloat(c),c&&(c=parseFloat(c),d+=c,a+=c),a||d?(a*=Mt,d*=Mt,x=Math.cos(a)*m,S=Math.sin(a)*m,w=Math.sin(a-d)*-f,L=Math.cos(a-d)*f,d&&(c*=Mt,T=Math.tan(d-c),T=Math.sqrt(1+T*T),w*=T,L*=T,c&&(T=Math.tan(c),T=Math.sqrt(1+T*T),x*=T,S*=T)),x=ce(x),S=ce(S),w=ce(w),L=ce(L)):(x=m,L=f,S=w=0),(v&&!~(l+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(v=ot(y,"x",l,"px"),b=ot(y,"y",o,"px")),(g||u||h||p)&&(v=ce(v+g-(g*x+u*w)+h),b=ce(b+u-(g*S+u*L)+p)),(n||r)&&(T=y.getBBox(),v=ce(v+n/100*T.width),b=ce(b+r/100*T.height)),T="matrix("+x+","+S+","+w+","+L+","+v+","+b+")",y.setAttribute("transform",T),_&&(y.style[le]=T)},co=function(e,t,i,n,r){var l=360,o=_e(r),a=parseFloat(r)*(o&&~r.indexOf("rad")?ht:1),d=a-n,c=n+d+"deg",m,f;return o&&(m=r.split("_")[1],m==="short"&&(d%=l,d!==d%(l/2)&&(d+=d<0?l:-l)),m==="cw"&&d<0?d=(d+l*Xi)%l-~~(d/l)*l:m==="ccw"&&d>0&&(d=(d-l*Xi)%l-~~(d/l)*l)),e._pt=f=new Te(e._pt,t,i,n,d,zl),f.e=c,f.u="deg",e._props.push(i),f},ln=function(e,t){for(var i in t)e[i]=t[i];return e},uo=function(e,t,i){var n=ln({},i._gsap),r="perspective,force3D,transformOrigin,svgOrigin",l=i.style,o,a,d,c,m,f,y,g;n.svg?(d=i.getAttribute("transform"),i.setAttribute("transform",""),l[le]=t,o=Xt(i,1),lt(i,le),i.setAttribute("transform",d)):(d=getComputedStyle(i)[le],l[le]=t,o=Xt(i,1),l[le]=d);for(a in Qe)d=n[a],c=o[a],d!==c&&r.indexOf(a)<0&&(y=me(d),g=me(c),m=y!==g?ot(i,a,d,g):parseFloat(d),f=parseFloat(c),e._pt=new Te(e._pt,o,a,m,f-m,hi),e._pt.u=g||0,e._props.push(a));ln(o,n)};ke("padding,margin,Width,Radius",function(s,e){var t="Top",i="Right",n="Bottom",r="Left",l=(e<3?[t,i,n,r]:[t+r,t+i,n+i,n+r]).map(function(o){return e<2?s+o:"border"+o+s});Ts[e>1?"border"+s:s]=function(o,a,d,c,m){var f,y;if(arguments.length<4)return f=l.map(function(g){return Ye(o,g,d)}),y=f.join(" "),y.split(f[0]).length===5?f[0]:y;f=(c+"").split(" "),y={},l.forEach(function(g,u){return y[g]=f[u]=f[u]||f[(u-1)/2|0]}),o.init(a,y,m)}});var Pr={name:"css",register:pi,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,n,r){var l=this._props,o=e.style,a=i.vars.startAt,d,c,m,f,y,g,u,h,p,_,v,b,x,S,w,L,T;Oi||pi(),this.styles=this.styles||Tr(e),L=this.styles.props,this.tween=i;for(u in t)if(u!=="autoRound"&&(c=t[u],!(Me[u]&&fr(u,t,i,n,e,r)))){if(y=typeof c,g=Ts[u],y==="function"&&(c=c.call(i,n,e,r),y=typeof c),y==="string"&&~c.indexOf("random(")&&(c=Ut(c)),g)g(this,e,u,c,i)&&(w=1);else if(u.substr(0,2)==="--")d=(getComputedStyle(e).getPropertyValue(u)+"").trim(),c+="",nt.lastIndex=0,nt.test(d)||(h=me(d),p=me(c),p?h!==p&&(d=ot(e,u,d,p)+p):h&&(c+=h)),this.add(o,"setProperty",d,c,n,r,0,0,u),l.push(u),L.push(u,0,o[u]);else if(y!=="undefined"){if(a&&u in a?(d=typeof a[u]=="function"?a[u].call(i,n,e,r):a[u],_e(d)&&~d.indexOf("random(")&&(d=Ut(d)),me(d+"")||d==="auto"||(d+=$e.units[u]||me(Ye(e,u))||""),(d+"").charAt(1)==="="&&(d=Ye(e,u))):d=Ye(e,u),f=parseFloat(d),_=y==="string"&&c.charAt(1)==="="&&c.substr(0,2),_&&(c=c.substr(2)),m=parseFloat(c),u in je&&(u==="autoAlpha"&&(f===1&&Ye(e,"visibility")==="hidden"&&m&&(f=0),L.push("visibility",0,o.visibility),st(this,o,"visibility",f?"inherit":"hidden",m?"inherit":"hidden",!m)),u!=="scale"&&u!=="transform"&&(u=je[u],~u.indexOf(",")&&(u=u.split(",")[0]))),v=u in Qe,v){if(this.styles.save(u),T=c,y==="string"&&c.substring(0,6)==="var(--"){if(c=Pe(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var C=e.style.perspective;e.style.perspective=c,c=Pe(e,"perspective"),C?e.style.perspective=C:lt(e,"perspective")}m=parseFloat(c)}if(b||(x=e._gsap,x.renderTransform&&!t.parseTransform||Xt(e,t.parseTransform),S=t.smoothOrigin!==!1&&x.smooth,b=this._pt=new Te(this._pt,o,le,0,1,x.renderTransform,x,0,-1),b.dep=1),u==="scale")this._pt=new Te(this._pt,x,"scaleY",x.scaleY,(_?Lt(x.scaleY,_+m):m)-x.scaleY||0,hi),this._pt.u=0,l.push("scaleY",u),u+="X";else if(u==="transformOrigin"){L.push(Se,0,o[Se]),c=ro(c),x.svg?_i(e,c,0,S,0,this):(p=parseFloat(c.split(" ")[2])||0,p!==x.zOrigin&&st(this,x,"zOrigin",x.zOrigin,p),st(this,o,u,Ss(d),Ss(c)));continue}else if(u==="svgOrigin"){_i(e,c,1,S,0,this);continue}else if(u in Mr){co(this,x,u,f,_?Lt(f,_+c):c);continue}else if(u==="smoothOrigin"){st(this,x,"smooth",x.smooth,c);continue}else if(u==="force3D"){x[u]=c;continue}else if(u==="transform"){uo(this,c,e);continue}}else u in o||(u=Ot(u)||u);if(v||(m||m===0)&&(f||f===0)&&!jl.test(c)&&u in o)h=(d+"").substr((f+"").length),m||(m=0),p=me(c)||(u in $e.units?$e.units[u]:h),h!==p&&(f=ot(e,u,d,p)),this._pt=new Te(this._pt,v?x:o,u,f,(_?Lt(f,_+m):m)-f,!v&&(p==="px"||u==="zIndex")&&t.autoRound!==!1?Ul:hi),this._pt.u=p||0,v&&T!==c?(this._pt.b=d,this._pt.e=T,this._pt.r=Yl):h!==p&&p!=="%"&&(this._pt.b=d,this._pt.r=Vl);else if(u in o)no.call(this,e,u,d,_?_+c:c);else if(u in e)this.add(e,u,d||e[u],_?_+c:c,n,r);else if(u!=="parseTransform"){Ti(u,c);continue}v||(u in o?L.push(u,0,o[u]):typeof e[u]=="function"?L.push(u,2,e[u]()):L.push(u,1,d||e[u])),l.push(u)}}w&&gr(this)},render:function(e,t){if(t.tween._time||!Ni())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Ye,aliases:je,getSetter:function(e,t,i){var n=je[t];return n&&n.indexOf(",")<0&&(t=n),t in Qe&&t!==Se&&(e._gsap.x||Ye(e,"x"))?i&&Zi===i?t==="scale"?Xl:Zl:(Zi=i||{})&&(t==="scale"?Jl:eo):e.style&&!xi(e.style[t])?Ql:~t.indexOf("-")?Kl:$i(e,t)},core:{_removeProperty:lt,_getMatrix:Ii}};Le.utils.checkPrefix=Ot;Le.core.getStyleSaver=Tr;(function(s,e,t,i){var n=ke(s+","+e+","+t,function(r){Qe[r]=1});ke(e,function(r){$e.units[r]="deg",Mr[r]=1}),je[n[13]]=s+","+e,ke(i,function(r){var l=r.split(":");je[l[1]]=n[l[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ke("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){$e.units[s]="px"});Le.registerPlugin(Pr);var N=Le.registerPlugin(Pr)||Le;N.core.Tween;const on="level10-v19-style";function ho(){if(document.getElementById(on))return;const s=document.createElement("style");s.id=on,s.textContent=`
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
  `,document.head.appendChild(s)}const fo=["C5","D5","E5","F5","G5","A5","B5"],an=[{id:"do",solfege:"Do",low:"C4",high:"C5"},{id:"re",solfege:"Re",low:"D4",high:"D5"},{id:"mi",solfege:"Mi",low:"E4",high:"E5"},{id:"fa",solfege:"Fa",low:"F4",high:"F5"},{id:"sol",solfege:"Sol",low:"G4",high:"G5"},{id:"la",solfege:"La",low:"A4",high:"A5"},{id:"si",solfege:"Si",low:"B4",high:"B5"}];function po(s,e){const t=s.audio._webAudio;if(!t||!s.audio.unlocked)return;const i=s.audio._masterGain;if(!i)return;const r={C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77}[e];if(!r)return;const l=t.currentTime,o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(r,l);const a=t.createOscillator();a.type="sine",a.frequency.setValueAtTime(r*2,l);const d=t.createOscillator();d.type="sine",d.frequency.setValueAtTime(r*3,l);const c=t.createGain();c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(.55,l+.01),c.gain.exponentialRampToValueAtTime(1e-4,l+.8);const m=t.createGain();m.gain.value=.15;const f=t.createGain();f.gain.value=.05,o.connect(c).connect(i),a.connect(m).connect(c),d.connect(f).connect(c);const y=l+.85;o.start(l),o.stop(y),a.start(l),a.stop(y),d.start(l),d.stop(y)}function _o(s,e){try{s.audio.playNote(e)}catch{}}function is(s,e,t){t?po(s,e):_o(s,e)}function cn(s,e,t){const n={C4:{white:["C4","D4","E4","F4","G4","A4","B4"],black:[["C#4",0],["D#4",1],["F#4",3],["G#4",4],["A#4",5]]},C5:{white:["C5","D5","E5","F5","G5","A5","B5"],black:[["C#5",0],["D#5",1],["F#5",3],["G#5",4],["A#5",5]]}}[e],r=38,l=130,o=24,a=80,d=n.white.length*r,c=document.createElementNS(de,"svg");return c.setAttribute("viewBox",`0 0 ${d} ${l+8}`),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.classList.add("level10-keys-svg"),n.white.forEach((m,f)=>{const y=f*r,g=document.createElementNS(de,"rect");if(g.setAttribute("x",y),g.setAttribute("y",0),g.setAttribute("width",r-1),g.setAttribute("height",l),g.setAttribute("rx",4),g.setAttribute("class","level10-white-key"),g.setAttribute("data-pitch",m),g.setAttribute("fill","#fffaf0"),g.setAttribute("stroke",t),g.setAttribute("stroke-width","1.5"),c.appendChild(g),n.black.some(([u,h])=>h===f)){const u=y+r-o/2,h=document.createElementNS(de,"rect");h.setAttribute("x",u),h.setAttribute("y",0),h.setAttribute("width",o),h.setAttribute("height",a),h.setAttribute("rx",3),h.setAttribute("class","level10-black-key"),h.setAttribute("fill","#1a1a2a"),c.appendChild(h)}}),s.appendChild(c),c}function vo(s){ho(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=10);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new zr(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level10-stage"></div>');const n=s.stage.querySelector(".level10-stage"),r=document.createElement("div");r.className="level10-hud",r.innerHTML=`
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
  `,n.appendChild(o);const a=document.createElement("button");a.className="level10-preview",a.id="level10-preview",a.innerHTML="🔁 听一次",a.title="再听一次",n.appendChild(a);const d=document.createElement("div");d.className="level10-keyboard";const c=document.createElement("div");c.className="level10-keyboard__row level10-keyboard__row--low",c.innerHTML='<div class="level10-keyboard__row-label">LOW</div>',cn(c,"C4","#e76f51");const m=document.createElement("div");m.className="level10-keyboard__row level10-keyboard__row--high",m.innerHTML='<div class="level10-keyboard__row-label">HIGH</div>',cn(m,"C5","#5fa8b5"),d.appendChild(m),d.appendChild(c),n.appendChild(d),s._level10Total=8,s._level10Done=0,s._level10Current=null,s._level10Answering=!1,s._level10Wrong=0,s._level10Timestamps=[],s._level10Streak=0,s._level10BestStreak=0;function f(v,b){d.querySelectorAll(".level10-key-glow").forEach(L=>L.remove());const x=v?m:c,S=x.querySelector(`[data-pitch="${b}"]`);if(!S)return;const w=document.createElementNS(de,"rect");w.setAttribute("class","level10-key-glow"),w.setAttribute("x",S.getAttribute("x")),w.setAttribute("y",S.getAttribute("y")),w.setAttribute("width",S.getAttribute("width")),w.setAttribute("height",S.getAttribute("height")),w.setAttribute("rx",S.getAttribute("rx")||4),w.setAttribute("fill",v?"rgba(95,168,181,0.55)":"rgba(231,111,81,0.55)"),x.querySelector("svg").insertBefore(w,x.querySelector("svg").firstChild),setTimeout(()=>{try{w.remove()}catch{}},1800)}function y(){if(s._level10Done>=s._level10Total)return _();s._level10Answering=!1;const v=an[Math.floor(Math.random()*an.length)],b=Math.random()<.5;s._level10Current={noteId:v.id,solfege:v.solfege,isHigh:b,pitch:b?v.high:v.low},r.querySelector(".level10-done").textContent=String(s._level10Done),r.querySelector(".level10-question").textContent=`🎧 第 ${s._level10Done+1} 题 — ${v.solfege} 来自哪里?`;const x=n.querySelector("#level10-fish");N.fromTo(x,{y:-20,opacity:0},{y:0,opacity:1,duration:.4,ease:"back.out(1.7)"}),setTimeout(()=>{is(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0},500)}function g(v){if(!s._level10Answering)return;const b=s._level10Current;if(!b)return;s._level10Answering=!1;const x=b.isHigh===v,S=n.querySelector("#level10-fish"),w=n.querySelector(v?".level10-region--high":".level10-region--low");if(x){s._level10Done++;try{s.audio.correct()}catch{}s._level10Streak++,s._level10Streak>s._level10BestStreak&&(s._level10BestStreak=s._level10Streak);const L=S.getBoundingClientRect(),T=w.getBoundingClientRect(),C=T.left+T.width/2-(L.left+L.width/2),E=T.top+T.height/2-(L.top+L.height/2);if(N.to(S,{x:C,y:E,scale:.7,duration:.5,ease:"back.out(1.5)",onComplete:()=>{try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`${b.solfege} ${b.isHigh?"↑":"↓"} ✓`)}catch{}f(b.isHigh,b.pitch),s.say(`${b.solfege} ${b.isHigh?"高八度":"低八度"}, 对啦! 🎉`)}}),s._level10Streak>=2)try{const A=`x${s._level10Streak}${s._level10Streak>=5?" 🔥":""}`;s._floatScore(window.innerWidth/2,window.innerHeight*.32,A)}catch{}s._level10Streak>=2&&(p.textContent=String(s._level10Streak),h.hidden=!1,h.classList.remove("streak-bump"),h.offsetWidth,h.classList.add("streak-bump")),setTimeout(()=>y(),1500)}else{s.wrongCount++,s._level10Wrong++;try{s.audio.wrong()}catch{}w.classList.add("shake"),setTimeout(()=>w.classList.remove("shake"),400),N.to(S,{x:0,y:0,rotation:"+=12",duration:.15,yoyo:!0,repeat:3}),N.to(S,{rotation:0,duration:.3});const L=b.isHigh?"高":"低";if(s.say(`不对哟~ 这是${L}八度 ${b.solfege}, 再听一次?`),s._level10Streak>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.32,`断啦 💔 (最佳 x${s._level10BestStreak})`)}catch{}s._level10Streak=0,h.hidden=!0,h.classList.remove("streak-bump"),setTimeout(()=>{is(s,b.pitch,b.isHigh),s._level10Answering=!0},800)}}n.querySelectorAll(".level10-region").forEach(v=>{v.addEventListener("click",()=>{const b=v.dataset.region;g(b==="high")})});const u=n.querySelector("#level10-preview"),h=n.querySelector("#level10-streak"),p=h.querySelector(".level10-streak__num");u.addEventListener("click",()=>{s._level10Current&&(is(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0,u.classList.remove("flash"),u.offsetWidth,u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),600))}),[c,m].forEach(v=>{v.querySelectorAll("[data-pitch]").forEach(b=>{b.style.cursor="pointer",b.addEventListener("click",()=>{const x=b.getAttribute("data-pitch"),S=fo.includes(x);is(s,x,S)})})}),s.say("听一听: Do 来自低八度还是高八度? 选对的地方放鱼~"),setTimeout(()=>y(),700);function _(){const v=s.wrongCount||0,b=v<=0?3:v<=2?2:v<=5?1:0;try{s.progress.markLevelComplete(10,b)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{s._flashScreen()}catch{}try{const x=s._level10BestStreak>=2?` (最佳连击 x${s._level10BestStreak})`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 八度完成!${x}`)}catch{}s.say("八度都听出来了! 耳朵升级了~"),setTimeout(()=>{try{s.showWinOverlay(b,10)}catch{}},1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level10-stage").forEach(v=>v.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const yo=Object.freeze(Object.defineProperty({__proto__:null,default:vo},Symbol.toStringTag,{value:"Module"}));class mo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level11-background";let t="";for(let n=0;n<28;n++){const r=Math.random()*100,l=Math.random()*100,o=2+Math.random()*4,a=Math.random()*4;t+=`<circle class="level11-dot" cx="${r}%" cy="${l}%" r="${o}"
                          style="animation-delay: ${a}s" />`}let i="";for(let n=0;n<6;n++){const r=8+Math.random()*84,l=8+Math.random()*80,o=16+Math.random()*14,a=Math.random()*5;i+=`<g class="level11-heart" transform="translate(${r}, ${l}) scale(${o/30})"
                          style="animation-delay: ${a}s">
        <path d="M0,-2 C-6,-10 -16,-10 -16,0 C-16,8 -8,16 0,22 C8,16 16,8 16,0 C16,-10 6,-10 0,-2 Z"
              fill="rgba(255,182,193,0.55)" />
      </g>`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
        ${t}
        ${i}

        <!-- 标题 -->
        <text x="400" y="58" text-anchor="middle" class="level11-title">🎴 翻牌记忆 🎴</text>
        <text x="400" y="88" text-anchor="middle" class="level11-subtitle">找两个一样的音符朋友</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const dn="level11-v19-style";function go(){if(document.getElementById(dn))return;const s=document.createElement("style");s.id=dn,s.textContent=`
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
  `,document.head.appendChild(s)}const bo=[{id:"do",solfege:"Do",pitch:"C4",color:"#e63946",emoji:"🍎"},{id:"re",solfege:"Re",pitch:"D4",color:"#f4a261",emoji:"🍊"},{id:"mi",solfege:"Mi",pitch:"E4",color:"#ffc971",emoji:"🍋"},{id:"fa",solfege:"Fa",pitch:"F4",color:"#b5c99a",emoji:"🥝"}];function xo(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[{f:1567.98,delay:0,dur:.32,peak:.45},{f:2093,delay:.04,dur:.32,peak:.35}].forEach(({f:n,delay:r,dur:l,peak:o})=>{const a=t+r,d=e.createOscillator();d.type="sine",d.frequency.setValueAtTime(n,a);const c=e.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(o,a+.008),c.gain.exponentialRampToValueAtTime(1e-4,a+l),d.connect(c).connect(s._masterGain),d.start(a),d.stop(a+l+.05)})}catch{}}function wo(s,e,t,i="#ffd166"){for(let r=0;r<8;r++){const l=r/8*Math.PI*2+Math.random()*.4,o=60+Math.random()*30,a=Math.cos(l)*o,d=Math.sin(l)*o,c=document.createElement("span");c.className="level11-sparkle",c.style.left=`${e}px`,c.style.top=`${t}px`,c.style.setProperty("--dx",`${a}px`),c.style.setProperty("--dy",`${d}px`),c.style.background=i,s.appendChild(c),setTimeout(()=>c.remove(),800)}}function ko(s){const e=s.slice();for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}function To(s){go(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=11);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new mo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level11-stage"></div>');const n=s.stage.querySelector(".level11-stage"),r=document.createElement("div");r.className="level11-hud",r.innerHTML=`
    <div class="level11-progress">
      <span class="level11-progress-icon">⭐</span>
      <span class="level11-done">0</span> / 4 对
    </div>
    <div class="level11-timer">⏱ <span class="level11-time">0.0</span>s</div>
  `,n.appendChild(r);const l=document.createElement("div");l.className="level11-time-bar",l.innerHTML='<div class="level11-time-bar__fill" id="level11-time-fill"></div>',n.appendChild(l);const o=l.querySelector("#level11-time-fill"),a=document.createElement("div");a.className="level11-board",n.appendChild(a);const d=[];bo.forEach(h=>{d.push({...h,key:h.id+"_a"}),d.push({...h,key:h.id+"_b"})}),ko(d).forEach(h=>{const p=document.createElement("button");p.className="level11-card",p.dataset.key=h.key,p.dataset.id=h.id,p.dataset.pitch=h.pitch,p.dataset.color=h.color,p.innerHTML=`
      <div class="level11-card__inner">
        <div class="level11-card__face level11-card__back">
          <div class="level11-card__back-pattern">🎵</div>
        </div>
        <div class="level11-card__face level11-card__front"
             style="--card-accent: ${h.color}">
          <div class="level11-card__emoji">${h.emoji}</div>
          <div class="level11-card__name">${h.solfege}</div>
        </div>
      </div>
    `,a.appendChild(p),d.push({el:p,...h})}),s._level11Cards=d,s._level11Flipped=[],s._level11Matched=0,s._level11Locked=!1,s._level11Start=Date.now(),s._level11Tried=0,s._level11Timer=null;const m=r.querySelector(".level11-time"),f=25,y=40;s._level11Timer=setInterval(()=>{if(!s._level11Start)return;const h=(Date.now()-s._level11Start)/1e3;if(m.textContent=h.toFixed(1),o){const p=Math.min(1,h/y);o.style.width=`${p*100}%`,o.classList.remove("warn","danger"),h>=y?o.classList.add("danger"):h>=f&&o.classList.add("warn")}},100);function g(h){if(!s._level11Locked&&!s._level11Flipped.includes(h)&&!h.classList.contains("matched")){h.classList.add("flipped"),s._level11Flipped.push(h);try{s.audio.playNote(h.dataset.pitch)}catch{}if(s._level11Flipped.length===2){s._level11Tried++,s._level11Locked=!0;const[p,_]=s._level11Flipped;p.dataset.id===_.dataset.id?setTimeout(()=>{p.classList.add("matched"),_.classList.add("matched");try{s.audio.correct()}catch{}try{xo(s.audio)}catch{}try{s._flashScreen()}catch{}s._level11Matched++,r.querySelector(".level11-done").textContent=String(s._level11Matched),s.say(`配对! ${p.dataset.id.toUpperCase()} = ${p.dataset.id.toUpperCase()} 🎉`);try{const v=p.getBoundingClientRect();s._floatScore(v.left+v.width/2,v.top,`${p.dataset.id.toUpperCase()} ✓`)}catch{}try{const v=p.getBoundingClientRect(),b=_.getBoundingClientRect(),x=(v.left+v.width/2+b.left+b.width/2)/2,S=(v.top+v.height/2+b.top+b.height/2)/2,w=n.querySelector(".level11-board"),L=w.getBoundingClientRect(),T=p.dataset.color||"#ffd166";wo(w,x-L.left,S-L.top,T)}catch{}setTimeout(()=>{s._level11Flipped=[],s._level11Locked=!1,s._level11Matched>=4&&u()},600)},350):setTimeout(()=>{try{s.audio.wrong()}catch{}p.classList.add("shake"),_.classList.add("shake"),setTimeout(()=>{p.classList.remove("flipped","shake"),_.classList.remove("flipped","shake"),s._level11Flipped=[],s._level11Locked=!1},450)},750)}}}s._level11Cards.forEach(h=>{h.el.addEventListener("click",()=>g(h.el))}),s.say("翻开两张牌 — 一样的就配对! 4 对就赢~"),s._level11Cards.forEach((h,p)=>{N.fromTo(h.el,{y:30,opacity:0},{y:0,opacity:1,duration:.4,delay:p*.05,ease:"back.out(1.7)"})});function u(){s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null);const h=(Date.now()-s._level11Start)/1e3,p=s._level11Tried;let _;h<=18&&p<=5?_=3:h<=30&&p<=7?_=2:h<=50?_=1:_=0;try{s.progress.markLevelComplete(11,_)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎉 ${h.toFixed(1)}s 完成!`)}catch{}s.say(`🎉 用时 ${h.toFixed(1)}s, 翻 ${p} 次, 你真厉害!`),setTimeout(()=>{try{s.showWinOverlay(_,11)}catch{}},1300)}return()=>{if(s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level11-stage").forEach(h=>h.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const So=Object.freeze(Object.defineProperty({__proto__:null,default:To},Symbol.toStringTag,{value:"Module"}));class Lo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level12-background";let t="";const i=["🍅","🧅","🥕","🥒","🌽","🍅","🧄"];for(let r=0;r<10;r++){const l=Math.random()*100,o=Math.random()*100,a=22+Math.random()*22,d=Math.random()*5,c=i[r%i.length];t+=`<g class="level12-veggie" transform="translate(${l}%, ${o}%) scale(${a/30})"
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
           xmlns="${de}">
        ${t}
        ${n}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level12-title">🥁 番茄节奏 🥁</text>
        <text x="400" y="80" text-anchor="middle" class="level12-subtitle">跟着摆杆切菜~</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const un="level12-v19-style";function Co(){if(document.getElementById(un))return;const s=document.createElement("style");s.id=un,s.textContent=`
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
  `,document.head.appendChild(s)}const hn=12,ns=35,Mo=.15,Eo=.3;function Ao(s){Co(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=12);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Lo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level12-stage"></div>');const n=s.stage.querySelector(".level12-stage"),r=document.createElement("div");r.className="level12-hud",r.innerHTML=`
    <div class="level12-stats">
      <div class="level12-stat">
        <span class="level12-stat__icon">🥁</span>
        <span class="level12-hits">0</span> / ${hn}
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
  `,n.appendChild(o);const a=document.createElement("div");a.className="level12-combo",a.id="level12-combo",a.hidden=!0,a.innerHTML='<span class="level12-combo__num">0</span><span class="level12-combo__x">x combo</span>',n.appendChild(a);const d=a.querySelector(".level12-combo__num"),c=document.createElement("div");c.className="level12-message",c.textContent="🔪 摆杆到中间时点切!",n.appendChild(c),s._level12Hits=0,s._level12TotalCuts=0,s._level12BPM=60,s._level12Phase=0,s._level12Dir=1,s._level12Running=!1,s._level12Tween=null,s._level12Done=!1,s._level12Combo=0,s._level12BestCombo=0,s._level12Score=0;function m(v){return v<=60?1:v>=140?2:1+(v-60)/80*1}const f=r.querySelector(".level12-hits"),y=r.querySelector(".level12-bpm"),g=r.querySelector(".level12-acc");function u(v){s._level12Tween&&(N.killTweensOf(s._level12Tween),s._level12Tween=null);const b=60/v,x=N.to({},{duration:b,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const S=x.progress(),w=-ns+S*2*ns,L=l.querySelector(".level12-pendulum");L&&(L.style.transform=`rotate(${w}deg)`),s._level12Phase=(w+ns)/(2*ns),s._level12Dir=w>0?1:-1},onRepeat:()=>{try{const S=s.audio._webAudio;if(S&&s.audio.unlocked){const w=S.currentTime,L=S.createOscillator();L.type="square",L.frequency.setValueAtTime(2400,w);const T=S.createGain();T.gain.setValueAtTime(1e-4,w),T.gain.exponentialRampToValueAtTime(.06,w+.005),T.gain.exponentialRampToValueAtTime(1e-4,w+.04),L.connect(T).connect(s.audio._masterGain),L.start(w),L.stop(w+.05)}}catch{}}});s._level12Tween=x}function h(){const v=Math.abs(s._level12Phase-.5);let b;v<=Mo?b="perfect":v<=Eo?b="good":b="miss",s._level12TotalCuts++;const x=n.querySelector("#level12-hit-ring");if(x&&(x.classList.remove("hit-perfect","hit-good","hit-miss"),x.offsetWidth,x.classList.add(`hit-${b}`),setTimeout(()=>x.classList.remove(`hit-${b}`),600)),b==="miss"){s.wrongCount++;try{s.audio.wrong()}catch{}if(c.textContent=["差一点!","再稳点~","跟住摆杆!"][Math.floor(Math.random()*3)],N.fromTo(o,{x:0},{x:8,duration:.06,yoyo:!0,repeat:5}),s._level12Combo>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`断啦 💔 (最佳 x${s._level12BestCombo})`)}catch{}s._level12Combo=0,a.hidden=!0,a.classList.remove("combo-flash"),o.classList.remove("combo-glow")}else{s._level12Hits++;try{s.audio.correct()}catch{}try{s._level12Hits%2===0&&(s._level12BPM=Math.min(140,s._level12BPM+8),y.textContent=String(s._level12BPM),u(s._level12BPM))}catch{}const w=b==="perfect"?10:5;s._level12Combo++,s._level12Combo>s._level12BestCombo&&(s._level12BestCombo=s._level12Combo);const L=1+Math.min(s._level12Combo-1,9)*.1,T=m(s._level12BPM),C=Math.round(w*T*L);s._level12Score+=C;try{const E=L>1||T>1.05?`+${C}  (x${T.toFixed(1)}×x${L.toFixed(1)})`:`+${C}`;s._floatScore(window.innerWidth/2,window.innerHeight*.36,E)}catch{}s._level12Combo>=2&&(d.textContent=String(s._level12Combo),a.hidden=!1,a.classList.remove("combo-flash"),a.offsetWidth,a.classList.add("combo-flash"),o.classList.add("combo-glow")),c.textContent=b==="perfect"?"完美! 🎯":"不错! ✨",N.fromTo(o,{scale:1},{scale:.85,duration:.1,yoyo:!0,repeat:1,ease:"power2.out"})}f.textContent=String(s._level12Hits);const S=s._level12TotalCuts>0?Math.round(s._level12Hits/s._level12TotalCuts*100)+"%":"—";g.textContent=S,s._level12Hits>=hn&&!s._level12Done&&(s._level12Done=!0,setTimeout(()=>_(),500))}o.addEventListener("click",()=>{s._level12Done||h()});const p=v=>{s._level12Done||(v.code==="Space"||v.key===" ")&&(v.preventDefault(),h())};window.addEventListener("keydown",p),u(s._level12BPM),s._level12Running=!0,s.say('看摆杆 — 摆到中间时"切"! 按得快又准就是节奏高手~');function _(){s._level12Tween&&(N.killTweensOf(s._level12Tween),s._level12Tween=null);const v=s._level12TotalCuts>0?s._level12Hits/s._level12TotalCuts:0;let b;v>=.85?b=3:v>=.65?b=2:v>=.4?b=1:b=0;try{s.progress.markLevelComplete(12,b)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{const x=s._level12BestCombo>=2?` 连击 x${s._level12BestCombo}`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎵 ${s._level12Score} 分 (命中 ${Math.round(v*100)}%)${x}`)}catch{}s.say(`完美收尾! 命中 ${Math.round(v*100)}% — 你有节奏感! 🎵`),setTimeout(()=>{try{s.showWinOverlay(b,12)}catch{}},1300)}return()=>{if(s._level12Tween){try{N.killTweensOf(s._level12Tween)}catch{}s._level12Tween=null}if(window.removeEventListener("keydown",p),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level12-stage").forEach(v=>v.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Po=Object.freeze(Object.defineProperty({__proto__:null,default:Ao},Symbol.toStringTag,{value:"Module"}));class $o{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level13-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}function Do(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=13);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new $o(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level13-stage"></div>');const n=s.stage.querySelector(".level13-stage"),r=document.createElement("div");r.className="level13-hud",r.innerHTML=`
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
  `,n.appendChild(r);const l=r.querySelector(".level13-hits"),o=r.querySelector(".level13-misses"),a=r.querySelector(".level13-bpm"),d=s.stage.querySelector(".level13-metronome"),c=s.stage.querySelector('[data-l13-drum="shadow"]');let m=80,f=0,y=0,g=0,u=!1;const h=Date.now();let p=Date.now()+1e3;function _(){const L=Date.now()-h;if(L>15e3){const C=Math.min((L-15e3)/1e4,1);return Math.round(130+C*50)}if(L>8e3){const C=Math.min((L-8e3)/7e3,1);return Math.round(100+C*30)}const T=Math.min(L/8e3,1);return Math.round(80+T*20)}function v(){if(u)return;m=_(),a.textContent=String(m);const L=s.stage.querySelector("#bpm-count");L&&(L.textContent=String(m)),d&&(d.style.transition="transform 0.08s linear",d.style.transform="rotate(-25deg)",setTimeout(()=>{d&&(d.style.transform="rotate(25deg)")},100),setTimeout(()=>{d&&(d.style.transform="rotate(0)")},200));const T=6e4/m;p=Date.now()+T,setTimeout(v,T)}setTimeout(v,1e3);function b(){if(u)return;const L=Date.now(),T=Math.abs(L-p),C=6e4/m/3,E=C*2;if(T<C){f++,g++;try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}c&&c.parentNode&&N.fromTo(c,{scale:1},{scale:.95,duration:.05,yoyo:!0,repeat:1,transformOrigin:"400px 380px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 完美 ⭐")}catch{}}else if(T<E){f++;try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ✨")}catch{}}else{y++;try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}l.textContent=String(f),o.textContent=String(y),f+y>=30&&(u=!0,setTimeout(()=>w(),600))}c&&c.parentNode&&(c.style.cursor="pointer",c.style.pointerEvents="all",c.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),b()}));const x=document.createElement("div");x.className="level13-tap-zone",x.addEventListener("pointerdown",L=>{L.preventDefault(),b()}),s.stage.appendChild(x);const S=L=>{u||(L.code==="Space"||L.key===" ")&&(L.preventDefault(),b())};window.addEventListener("keydown",S),s.say("跟着拍子敲鼓! 速度会逐渐变快 — 完美一击拿星 ⭐");function w(){u=!0;let L;g>=30?L=3:g>=24?L=2:g>=18?L=1:L=0;try{s.progress.markLevelComplete(13,L)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}const T=f+y,C=T>0?Math.round(f/T*100):0;try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 完美 ${g} 次 (命中 ${C}%)`)}catch{}s.say(`完美 ${g} 次 — 你是节奏大师! 🎵`),setTimeout(()=>{try{s.showWinOverlay(L,13)}catch{}},1300)}return()=>{if(u=!0,window.removeEventListener("keydown",S),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&(s.stage.querySelectorAll(".level13-stage").forEach(L=>L.remove()),s.stage.querySelectorAll(".level13-tap-zone").forEach(L=>L.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Oo=Object.freeze(Object.defineProperty({__proto__:null,default:Do},Symbol.toStringTag,{value:"Module"}));class No{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level14-background";let t="";for(let n=0;n<50;n++){const r=Math.random()*100,l=Math.random()*100,o=1+Math.random()*2.5,a=Math.random()*4;t+=`<circle class="level14-star" cx="${r}%" cy="${l}%" r="${o}"
                            style="animation-delay: ${a}s" />`}const i=`
      <g class="level14-moon">
        <circle cx="680" cy="90" r="46" fill="#fff8dc" />
        <circle cx="696" cy="76" r="42" fill="url(#l14Grad)" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Et=80,kt=220,vs=48,Rt=130,rs=12,ls=8,Ro=7*Et,Io=[{id:"do#",pitch:"C#4",note:"C#",solfege:"Di",x:80},{id:"re#",pitch:"D#4",note:"D#",solfege:"Ri",x:160},{id:"fa#",pitch:"F#4",note:"F#",solfege:"Fi",x:320},{id:"sol#",pitch:"G#4",note:"G#",solfege:"Si",x:400},{id:"la#",pitch:"A#4",note:"A#",solfege:"Li",x:480}];function Bo(s){return`M ${s} 0
          H ${s+Et}
          V ${kt-rs}
          Q ${s+Et} ${kt} ${s+Et-rs} ${kt}
          H ${s+rs}
          Q ${s} ${kt} ${s} ${kt-rs}
          Z`}function Fo(s){return`M ${s} 0
          H ${s+vs}
          V ${Rt-ls}
          Q ${s+vs} ${Rt} ${s+vs-ls} ${Rt}
          H ${s+ls}
          Q ${s} ${Rt} ${s} ${Rt-ls}
          Z`}const fn="touch-action: none; -webkit-user-select: none; user-select: none;";class gt{constructor(e,t){this.root=e,this.notes=t,this.svg=null,this._rawOnPress=null,this._lastKeyTapTime=0,this._lastKeyEl=null,Object.defineProperty(this,"onPress",{configurable:!0,enumerable:!0,get:()=>this._rawOnPress?i=>{if(typeof this._rawOnPress!="function")return;const n=Date.now();if(!(n-this._lastKeyTapTime<250&&this._lastKeyEl===i)){this._lastKeyTapTime=n,this._lastKeyEl=i;try{this._rawOnPress(i)}catch(r){console.warn(r)}}}:null,set:i=>{this._rawOnPress=i}}),this.render()}render(){const e=document.createElement("div");e.className="keyboard-area stage__kb-area";let t="";this.notes.forEach((i,n)=>{const r=n*Et,l=r+Et/2,o=Bo(r);t+=`
        <g class="key key--white" data-pitch="${i.pitch}" data-id="${i.id}" style="${fn}">
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
      `}),Io.forEach(i=>{const n=i.x-vs/2,r=Fo(n);t+=`
        <g class="key key--black" data-pitch="${i.pitch}" data-id="${i.id}" style="${fn}">
          <path class="key__shape" d="${r}"
                fill="#1f1d1a" stroke="#000000" stroke-width="0.8" stroke-linejoin="round"/>
        </g>
      `}),e.innerHTML=`
      <svg class="keyboard" xmlns="${de}"
           viewBox="0 0 ${Ro} ${kt}"
           preserveAspectRatio="none"
           aria-label="钢琴键盘(C4-B4)">
        ${t}
      </svg>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.bindEvents()}bindEvents(){this.svg.querySelectorAll(".key").forEach(t=>{const i=t.querySelector(".key__shape"),n=i&&i.getAttribute("fill")||"",l=t.classList.contains("key--black")?"#5a4f2a":"#ffd166",o=()=>{t.classList.add("pressed"),i&&i.setAttribute("fill",l)},a=()=>{t.classList.remove("pressed"),i&&i.setAttribute("fill",n)};t.addEventListener("pointerdown",d=>{d.preventDefault(),o();try{t.setPointerCapture(d.pointerId)}catch{}typeof this.onPress=="function"&&this.onPress(t)}),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("pointerleave",a),t.addEventListener("click",d=>d.preventDefault())})}glowKey(e){if(!e)return;e.classList.add("glow");const t=e.querySelector(".key__shape");t&&typeof t.animate=="function"&&t.animate([{filter:"drop-shadow(0 0 0px rgba(255, 209, 102, 0.95))"},{filter:"drop-shadow(0 0 18px rgba(255, 209, 102, 0.7))"},{filter:"drop-shadow(0 0 28px rgba(255, 209, 102, 0))"}],{duration:600,easing:"ease-out",fill:"forwards"}),setTimeout(()=>e.classList.remove("glow"),700)}glowAll(){Array.from(this.svg.querySelectorAll(".key--white")).forEach((t,i)=>{setTimeout(()=>this.glowKey(t),i*200)})}markPlaced(e,t){if(!this.svg)return;const i=this.svg.querySelector(`.key--white[data-id="${e}"]`);if(!i||i.querySelector(".kb-placed-dot"))return;const n=i.getBBox?i.getBBox():{x:0,y:0,width:80},r=n.x+n.width/2,l=n.y+18,o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("class","kb-placed-dot"),o.setAttribute("cx",r),o.setAttribute("cy",l),o.setAttribute("r","10"),o.setAttribute("fill",t),o.setAttribute("stroke","white"),o.setAttribute("stroke-width","2"),i.appendChild(o)}resetMarks(){this.svg&&this.svg.querySelectorAll(".kb-placed-dot").forEach(e=>e.remove())}}const Ws=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],js=[{name:"C 大三和弦",solfege:"Do  -  Mi  -  Sol",ids:["do","mi","sol"],color:"#e63946"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#b5c99a"},{name:"G 大三和弦",solfege:"Sol -  Si  -  Re",ids:["sol","si","re"],color:"#457b9d"},{name:"a 小三和弦",solfege:"La  -  Do  -  Mi",ids:["la","do","mi"],color:"#6a4c93"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#ffc971"}];function qo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=14);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.createElement("style");n.dataset.levelStyle="14",n.textContent=`
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
  `,document.head.appendChild(n),s.scene=new No(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level14-stage"></div>');const r=s.stage.querySelector(".level14-stage"),l=document.createElement("div");l.className="level14-hud",l.innerHTML=`
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
  `,r.appendChild(d);const c=d.querySelector(".level14-card__name"),m=d.querySelector(".level14-card__solfege"),f=d.querySelectorAll(".level14-slot");s.kb=new gt(s.stage,Ws),s._level14Idx=0,s._level14Perfect=0,s._level14Step=0,s._level14Done=!1,s._level14Failed=!1;function y(p){const _=js[p];c.textContent=_.name,c.style.background=`linear-gradient(135deg, ${_.color}, #fff8dc)`,c.style.webkitBackgroundClip="text",c.style.backgroundClip="text",c.style.color="transparent",m.textContent=_.solfege,f.forEach((v,b)=>{v.classList.remove("lit","placed","incorrect"),v.textContent=b===0?"🐟":"❓"})}function g(){s._level14Step=0,s._level14Failed=!1,f.forEach((p,_)=>{p.classList.remove("lit","placed","incorrect"),p.textContent=_===0?"🐟":"❓"})}function u(p,_,v){f[p].textContent=_,f[p].classList.add(v),setTimeout(()=>f[p].classList.remove(v),350)}s.kb.onPress=p=>{if(s._level14Done)return;const _=js[s._level14Idx],v=_.ids[s._level14Step],b=p.dataset.id,x=Ws.find(S=>S.id===b);try{s.kb.glowKey(p)}catch{}if(b===v){try{s.audio.correct()}catch{}try{s.audio.playNote(x.pitch)}catch{}if(s._level14Step===0)u(0,x.solfege,"placed"),f[0].style.color=_.color;else{u(s._level14Step,x.solfege,"placed"),f[s._level14Step].style.color=_.color;const S=s._level14Step+1;S<f.length&&(f[S].textContent="🐟")}if(s._level14Step++,s._level14Step>=3){s._level14Failed||(s._level14Perfect++,a.textContent=String(s._level14Perfect)),s._level14Idx++,o.textContent=String(s._level14Idx);try{s.audio.playScale(_.ids.map(S=>Ws.find(w=>w.id===S).pitch))}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.36,"+1 ⭐")}catch{}s._level14Idx>=js.length?(s._level14Done=!0,setTimeout(()=>h(),700)):setTimeout(()=>{y(s._level14Idx),g()},800)}}else{try{s.audio.wrong()}catch{}try{s.audio.playNote(x.pitch)}catch{}s._level14Failed=!0,s.wrongCount++,f.forEach(S=>{S.classList.add("incorrect")}),s.say(`错啦 — 应该是 ${_.solfege.split(/-+/).map(S=>S.trim()).filter(Boolean).join(" → ")}, 再来一次~`),setTimeout(()=>{g()},700)}},y(0),g(),s.say("看和弦卡 — 三条小鱼的顺序! 按钢琴键组成和弦~");function h(){const p=s._level14Perfect;let _;p>=5?_=3:p>=4?_=2:p>=3?_=1:_=0;try{s.progress.markLevelComplete(14,_)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 完美 ${p} / 5 和弦`)}catch{}s.say(`和弦大师! ${p} 个和弦完美完成 🎵`),setTimeout(()=>{try{s.showWinOverlay(_,14)}catch{}},1300)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}n&&n.parentNode&&n.remove(),s.stage&&s.stage.querySelectorAll(".level14-stage").forEach(p=>p.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ho=Object.freeze(Object.defineProperty({__proto__:null,default:qo},Symbol.toStringTag,{value:"Module"}));class Go{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level15-background";const t=`
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
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const It=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],os=6,Wo=3500,jo=1500,zo={do:175,re:150,mi:120,fa:105,sol:90,la:65,si:45},Be=30;function Vo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=15);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.createElement("style");n.dataset.levelStyle="15",n.textContent=`
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
  `,document.head.appendChild(n),s.scene=new Go(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level15-staff-area"></div>');const r=s.stage.querySelector(".level15-staff-area");r.innerHTML=`
    <svg class="level15-staff" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid meet">
      <!-- 5 lines -->
      <line class="level15-staff-line" x1="40" y1="${Be+40}"  x2="760" y2="${Be+40}" />
      <line class="level15-staff-line" x1="40" y1="${Be+60}"  x2="760" y2="${Be+60}" />
      <line class="level15-staff-line" x1="40" y1="${Be+80}"  x2="760" y2="${Be+80}" />
      <line class="level15-staff-line" x1="40" y1="${Be+100}" x2="760" y2="${Be+100}" />
      <line class="level15-staff-line" x1="40" y1="${Be+120}" x2="760" y2="${Be+120}" />
      <!-- treble clef (简化, 用 tspan '𝄞' 或 G 字母) -->
      <text x="50" y="${Be+95}" class="level15-clef" font-family="serif" font-size="100" fill="#fff8dc">𝄞</text>
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
  `),s.kb=new gt(s.stage,It);const a={value:1};s._level15Idx=0,s._level15Correct=0,s._level15Accepting=!0,s._level15Done=!1,s._level15ConsecRight=0,s._level15ConsecWrong=0,s._level15Easy=!1;function d(){return It[Math.floor(Math.random()*It.length)]}function c(_,v){a.value=_;const b=document.getElementById("level15-bpm");b&&(b.textContent=v||`${_.toFixed(1)}x`)}function m(){return Math.max(jo,Math.round(Wo/a.value))}function f(){if(s._level15Done||s._level15Idx>=os)return;const _=d(),v=zo[_.id];if(!l||!o)return;const b=r.querySelector(".level15-note-grp");if(!b)return;b.setAttribute("transform",`translate(400, ${v})`),l.dataset.pitch=_.pitch,l.dataset.id=_.id,l.classList.remove("incorrect"),l.style.opacity="1",l.setAttribute("fill","#ffd166"),s.say(`下一个: ${_.solfege}`),s._level15Accepting=!0;const x=m(),S=Date.now(),w=setTimeout(()=>{!s._level15Done&&s._level15Accepting&&y()},x);s._level15FallTimer=w,s._level15FallStart=S,s._level15FallDur=x}function y(){s._level15Accepting=!1,s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,g();try{s.audio.wrong()}catch{}s.say("漏拍啦 — 看下一个音符~"),l&&l.classList.add("incorrect"),s._level15FallTimer&&clearTimeout(s._level15FallTimer),setTimeout(()=>{l&&l.classList.remove("incorrect"),s._level15Idx++,s._level15Idx>=os?h():f()},500)}function g(){if(!s._level15Easy&&s._level15ConsecWrong>=3){s._level15Easy=!0,c(1,"1.0x 轻松");try{s.say("进入轻松模式 — 慢慢来!")}catch{}}}function u(){if(a.value>=1.5)return;const _=Math.min(1.5,+(a.value+.1).toFixed(1));c(_);const v=document.getElementById("level15-combo");v&&(v.textContent=`连对 ${s._level15ConsecRight} → 加速!`)}s.kb.onPress=_=>{if(!s._level15Accepting||s._level15Done)return;const v=_.dataset.pitch,b=_.dataset.id,x=l?l.dataset.pitch:null,S=l?l.dataset.id:null;try{s.kb.glowKey(_)}catch{}if(v===x){s._level15Accepting=!1,s._level15Correct++,s._level15ConsecRight++,s._level15ConsecWrong=0,s._level15FallTimer&&clearTimeout(s._level15FallTimer);try{s.audio.correct()}catch{}try{s.audio.playNote(v)}catch{}l&&(l.style.opacity="0");const w=["完美!","棒!","眼睛真快!","看谱高手!"];s.say(w[Math.min(s._level15Correct-1,w.length-1)]),s._level15ConsecRight>=3&&!s._level15Easy&&u(),s._level15Idx++,setTimeout(()=>{s._level15Idx>=os?h():f()},350)}else{s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,g();try{s.audio.wrong()}catch{}try{s.audio.playNote(v)}catch{}const w=It.find(T=>T.id===b);s.say(`这是 ${w?w.solfege:"?"}, 不是 ${It.find(T=>T.id===S).solfege}. 再看谱!`),l&&l.classList.add("incorrect");const L=l;setTimeout(()=>{L&&L.classList.remove("incorrect")},350)}};function h(){s._level15Done||(s._level15Done=!0,setTimeout(()=>p(),600))}c(1,"1.0x"),setTimeout(f,800),s.say("看 5 线谱上的音符 — 按对应的钢琴键, 越对越快!");function p(){const _=s._level15Correct;let v;_>=5?v=3:_>=4?v=2:_>=3?v=1:v=0;try{s.progress.markLevelComplete(15,v)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 看谱对了 ${_} / ${os}`)}catch{}s.say(`视奏大师! 6 音对了 ${_} 个 🎼`),setTimeout(()=>{try{s.showWinOverlay(v,15)}catch{}},1300)}return()=>{if(s._level15FallTimer&&(clearTimeout(s._level15FallTimer),s._level15FallTimer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}n&&n.parentNode&&n.remove(),s.stage&&(s.stage.querySelectorAll(".level15-staff-area").forEach(_=>_.remove()),s.stage.querySelectorAll(".level15-metronome").forEach(_=>_.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Yo=Object.freeze(Object.defineProperty({__proto__:null,default:Vo},Symbol.toStringTag,{value:"Module"}));class Uo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level16-background";let t="";for(let n=0;n<20;n++){const r=Math.random()*100,l=Math.random()*100,o=6+Math.random()*12,a=Math.random()*5,d=4+Math.random()*4;t+=`<circle class="level16-particle" cx="${r}%" cy="${l}%" r="${o}"
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
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const as=8,cs=60,pn=10,Qo=6,_n=3;function Ko(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=16);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Uo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level16-stage"></div>');const n=s.stage.querySelector(".level16-stage"),r=document.createElement("div");r.className="level16-hud",r.innerHTML=`
    <div class="level16-stat">
      <span class="level16-stat__icon">🎯</span>
      轮 <span class="level16-round">1</span> / ${as}
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⏱</span>
      <span class="level16-bpm">${cs}</span> BPM
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
  `,n.appendChild(c);const m=c.querySelector("svg"),f=m?m.querySelector("[data-l16-drum-head]"):null,y=m?m.querySelector("text"):null,g=document.createElement("div");g.className="level16-meter",g.innerHTML=`
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
  `,n.appendChild(g);const u=document.createElement("div");u.className="level16-ladder";let h="";for(let T=0;T<as;T++){const C=cs+pn*T;h+=`
      <div class="level16-rung ${T===0?"active":""}" data-bpm="${C}">
        <span class="level16-rung__num">第 ${T+1} 轮</span>
        <span class="level16-rung__bpm">${C} BPM</span>
      </div>
    `}u.innerHTML=`
    <div class="level16-ladder__title">速度阶梯</div>
    ${h}
  `,n.appendChild(u);const p=u.querySelectorAll(".level16-rung");s._level16Round=0,s._level16Bpm=cs,s._level16RoundHits=0,s._level16RoundTaps=0,s._level16Combo=0,s._level16PerfectRounds=0,s._level16Done=!1,s._level16Phase=0,s._level16Tween=null,s._level16PendingTickAt=null,s._level16RunningRound=!1,s._level16Timer=null,s._level16RoundStartAt=0;function _(T){s._level16Tween&&(N.killTweensOf(s._level16Tween),s._level16Tween=null);const C=60/T,E=30,A=N.to({},{duration:C,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const $=A.progress(),O=-E+$*2*E,R=g.querySelector(".level16-pendulum");R&&(R.style.transform=`rotate(${O}deg)`),s._level16Phase=(O+E)/(2*E)},onRepeat:()=>{const $=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+$/2}}),P=6e4/T;s._level16PendingTickAt=Date.now()+P/2,s._level16Tween=A}function v(){const T=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+T/2}function b(){if(s._level16Done||!s._level16RunningRound)return;const T=Date.now();6e4/s._level16Bpm;const C=s._level16Phase,E=Math.abs(C-.5);let A;E<=.15?A="perfect":E<=.3?A="good":A="miss",s._level16PendingTickAt||v(),Math.abs(T-s._level16PendingTickAt),s._level16RoundTaps++;const P=document.getElementById("level16-hit-ring");if(P&&(P.classList.remove("hit-perfect","hit-good","hit-miss"),P.offsetWidth,A==="perfect"?P.classList.add("hit-perfect"):A==="good"?P.classList.add("hit-good"):P.classList.add("hit-miss"),setTimeout(()=>P.classList.remove("hit-perfect","hit-good","hit-miss"),500)),A==="perfect"){s._level16RoundHits++,s._level16Combo++,d.textContent=String(s._level16PerfectRounds),a.textContent=String(s._level16Combo);try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}f&&N.fromTo(f,{scale:1},{scale:.92,duration:.05,yoyo:!0,repeat:1,transformOrigin:"100px 155px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ⭐")}catch{}}else if(A==="good"){try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+0 ✨")}catch{}}else{s._level16Combo=0,a.textContent="0";try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}v(),s._level16RoundTaps>=Qo&&S()}function x(){s._level16RoundHits=0,s._level16RoundTaps=0,s._level16RunningRound=!0,v(),l.textContent=String(s._level16Round+1),o.textContent=String(s._level16Bpm),p.forEach((T,C)=>T.classList.toggle("active",C===s._level16Round)),s.say(`第 ${s._level16Round+1} 轮 — ${s._level16Bpm} BPM!`)}function S(){if(s._level16RunningRound=!1,s._level16RoundHits>=_n&&s._level16PerfectRounds++,d.textContent=String(s._level16PerfectRounds),y&&(y.textContent=s._level16RoundHits>=_n?"🎉":"💪",setTimeout(()=>{y&&(y.textContent="🥁 敲!")},800)),s._level16Round++,s._level16Round>=as){s._level16Done=!0,s._level16Tween&&(N.killTweensOf(s._level16Tween),s._level16Tween=null),setTimeout(()=>L(),800);return}s._level16Bpm=cs+pn*s._level16Round,o.textContent=String(s._level16Bpm),_(s._level16Bpm),setTimeout(x,1500)}_(s._level16Bpm),x(),m&&(m.style.cursor="pointer",m.addEventListener("pointerdown",T=>{T.preventDefault(),T.stopPropagation(),b()}));const w=T=>{s._level16Done||(T.code==="Space"||T.key===" ")&&(T.preventDefault(),b())};window.addEventListener("keydown",w),s.say("看摆杆 — 摆到中间时敲鼓! 越爬越快 ⏱");function L(){let T;const C=s._level16PerfectRounds;C>=8?T=3:C>=7?T=2:C>=5?T=1:T=0;try{s.progress.markLevelComplete(16,T)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 ${as} 轮, ${C} 完美轮`)}catch{}s.say(`爬到顶啦! ${C} 轮完美 🎵🚀`),setTimeout(()=>{try{s.showWinOverlay(T,16)}catch{}},1300)}return()=>{if(s._level16Tween){try{N.killTweensOf(s._level16Tween)}catch{}s._level16Tween=null}if(window.removeEventListener("keydown",w),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level16-stage").forEach(T=>T.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Zo=Object.freeze(Object.defineProperty({__proto__:null,default:Ko},Symbol.toStringTag,{value:"Module"}));function Xo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=2),s._startLevel2();const e=s.stage;e.insertAdjacentHTML("beforeend",`
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
      ${[1,2,3,4,5].map(_=>`<span class="level2-prog-dot" data-i="${_}"></span>`).join("")}
    </div>
  `);function t(){const _=e.querySelectorAll(".level2-prog-dot"),v=s._level2Done?s._level2Done.size:0;_.forEach((b,x)=>{x<v?b.classList.add("filled"):b.classList.remove("filled")})}function i(_){if(!_)return;const v=_.getBoundingClientRect(),b=e.getBoundingClientRect(),x=v.left-b.left+v.width/2,S=v.top-b.top,w=document.createElement("div");w.className="level2-correct-bubble",w.textContent="✨ 答对啦! ✨",w.style.left=x+"px",w.style.top=S-36+"px",e.appendChild(w),setTimeout(()=>w.remove(),1400);for(let L=0;L<6;L++){const T=document.createElement("div");T.className="level2-sparkle",T.style.left=x+(Math.random()-.5)*70+"px",T.style.top=S+(Math.random()-.5)*70+"px",T.style.animationDelay=L*.06+"s",e.appendChild(T),setTimeout(()=>T.remove(),1100)}}function n(_,v){const b=document.createElement("div");b.className="level2-big-solfege",v&&b.style.setProperty("--big-solfege-color",v),b.textContent=_,e.appendChild(b),e.classList.add("level2-bg-pulse"),setTimeout(()=>{e.classList.remove("level2-bg-pulse");try{b.remove()}catch{}},1500)}const r={Do:[130.81,261.63,392],Re:[146.83,293.66,440],Mi:[164.81,329.63,493.88],Fa:[174.61,349.23,523.25],Sol:[196,392,587.33],La:[220,440,659.25],Si:[246.94,493.88,739.99]};function l(_){const v=s.audio;if(!v||!v._webAudio||v.muted)return;const b=v._webAudio;try{v._resumeWebAudio&&v._resumeWebAudio()}catch{}const x=r[_]||r.Do,S=b.currentTime+.05;x.forEach((w,L)=>{const T=S+L*.13,C=b.createOscillator();C.type="triangle",C.frequency.setValueAtTime(w,T);const E=b.createGain();E.gain.setValueAtTime(1e-4,T),E.gain.exponentialRampToValueAtTime(.5,T+.02),E.gain.exponentialRampToValueAtTime(1e-4,T+.18),C.connect(E).connect(v._masterGain),C.start(T),C.stop(T+.22),typeof v._trackOsc=="function"&&v._trackOsc(C,T+.22)})}const o=s._markLevel2FishCorrect.bind(s);s._markLevel2FishCorrect=_=>{o(_),t(),i(_);const v=_&&_.dataset?_.dataset.id:null;if(v){const b=a.find(x=>x.id===v);if(b){n(b.solfege,b.color);try{l(b.solfege)}catch{}}}typeof h=="function"&&h()};const a=[{id:"do",pitch:"C4"},{id:"re",pitch:"D4"},{id:"mi",pitch:"E4"},{id:"fa",pitch:"F4"},{id:"sol",pitch:"G4"},{id:"la",pitch:"A4"},{id:"si",pitch:"B4"}],d={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88};function c(_){const v=s.audio;if(!v||!v._webAudio||!v._masterGain||v.muted)return!1;const b=v._webAudio;try{v._resumeWebAudio&&v._resumeWebAudio()}catch{}const x=b.currentTime,S=d[_];if(!S)return!1;const w=b.createOscillator();w.type="triangle",w.frequency.setValueAtTime(S,x);const L=b.createOscillator();L.type="sine",L.frequency.setValueAtTime(S*2,x);const T=b.createOscillator();T.type="sine",T.frequency.setValueAtTime(S*3,x);const C=b.createGain();C.gain.setValueAtTime(1e-4,x),C.gain.exponentialRampToValueAtTime(1,x+.015),C.gain.exponentialRampToValueAtTime(.7,x+.35),C.gain.exponentialRampToValueAtTime(1e-4,x+2.2);const E=b.createGain();E.gain.value=.18;const A=b.createGain();A.gain.value=.06,w.connect(C).connect(v._masterGain),L.connect(E).connect(C),T.connect(A).connect(C);const P=x+2.3;return w.start(x),w.stop(P),L.start(x),L.stop(P),T.start(x),T.stop(P),!0}const m=s._replayQuestion.bind(s);s._replayQuestion=()=>{const _=s.audio,v=s._level2AnswerNote;if(!v)return;const b=a.find(E=>E.id===v);if(!b){m();return}if(!_||!_._webAudio||!_._masterGain){m();return}const x=_._webAudio,S=_._masterGain,w=x.currentTime,L=_.muted?0:.75,T=_.muted?0:1;try{const E=typeof S.gain.value=="number"?S.gain.value:L;S.gain.cancelScheduledValues(w),S.gain.setValueAtTime(E,w),S.gain.linearRampToValueAtTime(T,w+.06),S.gain.linearRampToValueAtTime(L,w+2.5)}catch{}c(b.pitch);const C=document.getElementById("level2-listen-prompt");C&&(C.classList.add("active"),clearTimeout(C._hideTimer),C._hideTimer=setTimeout(()=>C.classList.remove("active"),2500))};function f(){[3,2,1].forEach((v,b)=>{setTimeout(()=>{const x=document.createElement("div");x.className="level2-countdown",x.textContent=String(v),e.appendChild(x),setTimeout(()=>{try{x.remove()}catch{}},720)},b*650)})}const y=s._level2NextQuestion.bind(s);s._level2NextQuestion=()=>{const _=!s._level2AnswerNote;y(),!_&&s._level2AnswerNote&&f()};let g=null;function u(){g&&clearTimeout(g),g=setTimeout(()=>{if(s._level2AnswerNote&&(s._level2Done||new Set).size<(s._level2Total||5))try{s.say("哪条小鱼刚才唱歌了? 点点它 🎵")}catch{}},1e4)}function h(){u()}const p=s._replayQuestion;if(s._replayQuestion=()=>{try{p()}catch{}h()},typeof s._handleLevel2Answer=="function"){const _=s._handleLevel2Answer.bind(s);s._handleLevel2Answer=(v,b)=>{try{_(v,b)}catch{}h()}}return setTimeout(h,1200),t(),()=>{g&&(clearTimeout(g),g=null),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const _=document.getElementById("hud-level2");_&&(_.style.display="");const v=document.querySelector(".hud__dots");v&&(v.style.display="none");const b=document.getElementById("btn-replay");b&&(b.style.display="none");const x=document.getElementById("level2-listen-prompt");x&&x.remove();const S=document.getElementById("level2-progress-dots");S&&S.remove(),e.querySelectorAll(".level2-correct-bubble, .level2-sparkle, .level2-countdown").forEach(w=>w.remove())}}const Jo=Object.freeze(Object.defineProperty({__proto__:null,default:Xo},Symbol.toStringTag,{value:"Module"}));class ea{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level3-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}setProgress(e){if(!this.background)return;const t=this.background.querySelector(".level3-sunset-overlay");t&&(t.classList.remove("level3-progress-0","level3-progress-1","level3-progress-2","level3-progress-3"),t.classList.add(`level3-progress-${Math.min(Math.max(e,0),3)}`))}bloomAt(e,t,i="#ffd166"){if(!this.background)return;const n=this.background.querySelector(".level3-bloom-layer");if(!n)return;const r=this.background.getBoundingClientRect(),l=e-r.left,o=t-r.top,a=12;for(let d=0;d<a;d++){const c=document.createElement("div");c.className="level3-bloom-sparkle",c.style.left=l+"px",c.style.top=o+"px",c.style.background=i;const m=Math.PI*2*d/a,f=60+Math.random()*40;c.style.setProperty("--bx",Math.cos(m)*f+"px"),c.style.setProperty("--by",Math.sin(m)*f+"px"),c.style.animationDelay=(Math.random()*.08).toFixed(2)+"s",n.appendChild(c),setTimeout(()=>{try{c.remove()}catch{}},1100)}}shakePlatforms(){if(!this.background)return;this.background.querySelectorAll(".level3-platform").forEach(t=>{t.classList.remove("level3-shake"),t.offsetWidth,t.classList.add("level3-shake"),setTimeout(()=>t.classList.remove("level3-shake"),500)})}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const vn={do:{main:"M2,36 L24,18 L20,30 L20,42 L24,54 Z",stripes:"M10,30 L16,24 M10,42 L16,48"},re:{main:"M2,36 Q22,18 24,36 Q22,54 2,36 Z",stripes:"M8,30 Q14,28 18,32 M8,42 Q14,44 18,40"},mi:{main:"M2,36 L26,20 L26,52 Z",stripes:"M8,32 L22,28 M8,40 L22,44"},fa:{main:"M2,36 Q8,30 14,34 Q20,28 24,36 Q20,44 14,38 Q8,42 2,36 Z",stripes:"M6,36 Q10,34 14,36 M14,36 Q18,34 22,36"},sol:{main:"M2,36 L18,28 L22,34 L26,28 L26,44 L22,40 L18,46 Z",stripes:"M10,34 L16,32 M10,38 L16,40"},la:{main:"M2,36 L24,24 L20,32 L24,40 L2,36 Z M8,28 L18,28 M8,36 L18,36 M8,44 L18,44",stripes:"M4,30 L10,30 M4,36 L10,36 M4,42 L10,42"},si:{main:"M2,36 Q12,28 18,36 Q24,44 2,36 Q12,30 8,38 Z",stripes:"M6,34 L14,34 M6,38 L14,38"}},yn={do:{front:{rx:5.5,ry:6,pupil:2.5},back:{rx:4,ry:4.5,pupil:1.8},extra:"eyelashes"},re:{front:{rx:6,ry:6.5,pupil:3},back:{rx:4.5,ry:5,pupil:2.2},extra:"round"},mi:{front:{rx:5.5,ry:3.5,pupil:2.4},back:{rx:4,ry:2.5,pupil:1.8},extra:"narrow"},fa:{front:{rx:5.5,ry:.5,pupil:0},back:{rx:4,ry:.4,pupil:0},extra:"closed"},sol:{front:{rx:5.5,ry:4,pupil:2.2},back:{rx:4,ry:3,pupil:1.6},extra:"squint"},la:{front:{rx:7,ry:8,pupil:3.2},back:{rx:5,ry:5.5,pupil:2.4},extra:"surprised"},si:{front:{rx:5.5,ry:3,pupil:2.4},back:{rx:4,ry:2,pupil:1.8},extra:"cool"}},ta={do:2,re:1,mi:2,fa:1,sol:3,la:2,si:1},sa={do:"bow",mi:"hat",sol:"crown",la:"earring"};function ia(s){return function(){let e=s+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}class na{constructor(e){this.note=e;const t=document.createElement("div");return t.className="fish",t.dataset.id=e.id,t.dataset.pitch=e.pitch,t.dataset.color=e.color,t.style.cssText=["width: 96px","height: 72px","touch-action: manipulation","-webkit-user-select: none","user-select: none","-webkit-tap-highlight-color: transparent"].join(";"),this.el=t,this.render(),t}render(){const{id:e,color:t,solfege:i,pitch:n}=this.note,r=(e||"do").toLowerCase(),l=(Math.random()*30-15).toFixed(1),o=(.85+Math.random()*.3).toFixed(2),a=(Math.random()*2).toFixed(2),d=Math.random()>.4,c=(1.5+Math.random()*1.5).toFixed(1),m=(.4+Math.random()*.35).toFixed(2),f=(J,se)=>{const ue=(J||"#999").replace("#","").match(/.{2}/g);if(!ue)return J;const[ie,Fe,xt]=ue.map(ct=>parseInt(ct,16)),Ke=ct=>{const Ds=se<0?0:255,es=Math.abs(se)/100;return Math.round((Ds-ct)*es+ct).toString(16).padStart(2,"0")};return`#${Ke(ie)}${Ke(Fe)}${Ke(xt)}`},y=Math.floor(Math.random()*3),g=(8+Math.random()*8).toFixed(0),u={r:0,g:0,b:0};y===0?(u.r=+g,u.g=+Math.floor(g/2)):y===1?(u.b=+g,u.g=+Math.floor(g/2)):(u.r=+Math.floor(g/2),u.g=+Math.floor(g/2),u.b=+Math.floor(g/2));const h=(t||"#999999").replace("#","").match(/.{2}/g);let p=t;if(h){const[J,se,ue]=h.map(ie=>parseInt(ie,16));p="#"+[J+u.r,se+u.g,ue+u.b].map(ie=>Math.max(0,Math.min(255,ie)).toString(16).padStart(2,"0")).join("")}const _=f(p,-25),v=f(p,22),b=Math.random()>.5?2:1,x=Array.from({length:b}).map((J,se)=>{const ue=(1.5+Math.random()*1.2).toFixed(1),ie=-6-se*5,Fe=32+(se%2===0?0:6),xt=(2.4+Math.random()*1.6).toFixed(2),Ke=(Math.random()*2).toFixed(2);return`
        <circle cx="${ie}" cy="${Fe}" r="${ue}" fill="rgba(255,255,255,0.55)">
          <animate attributeName="cy" from="${Fe}" to="${Fe-18}" dur="${xt}s"
                   begin="${Ke}s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.4;1"
                   dur="${xt}s" begin="${Ke}s" repeatCount="indefinite" />
        </circle>`}).join(""),S=vn[r]?r:"do",w=vn[S],L=`
      <path d="${w.main}"
            style="fill: ${_}; stroke: rgba(0,0,0,0.22); stroke-width: 0.6; stroke-linejoin: round;" />
      <path d="${w.stripes}"
            style="stroke: rgba(0,0,0,0.32); stroke-width: 0.5; stroke-linecap: round; opacity: 0.55;" />`,T=yn[r]?r:"do",C=yn[T],E=68,A=32,P=56,$=32,O=C.extra==="closed"?"":`<animate attributeName="ry"
                 values="${C.front.ry};${C.front.ry};0.4;${C.front.ry};${C.front.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${a}s"
                 repeatCount="indefinite" />`,R=C.extra==="closed"?"":`<animate attributeName="ry"
                 values="${C.back.ry};${C.back.ry};0.3;${C.back.ry};${C.back.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${(parseFloat(a)+.15).toFixed(2)}s"
                 repeatCount="indefinite" />`;let G="";C.extra==="eyelashes"?G=`
        <circle cx="66" cy="38" r="0.6" fill="#1a1a1a" />
        <circle cx="70" cy="38" r="0.6" fill="#1a1a1a" />`:C.extra==="surprised"?G='<ellipse cx="68" cy="44" rx="1.2" ry="0.6" fill="rgba(0,0,0,0.5)" />':C.extra==="cool"?G='<path d="M62,28 L74,28" stroke="rgba(0,0,0,0.65)" stroke-width="0.7" stroke-linecap="round" />':C.extra==="squint"&&(G=`
        <path d="M62,38 Q64,40 66,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />
        <path d="M72,38 Q74,40 76,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />`);const Z=C.extra==="closed"?`<path d="M${E-C.front.rx},${A} Q${E},${A-.6} ${E+C.front.rx},${A}"
             stroke="rgba(0,0,0,0.7)" stroke-width="1.1" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${E}" cy="${A}" rx="${C.front.rx}" ry="${C.front.ry}"
                 fill="white" stroke="rgba(0,0,0,0.6)" stroke-width="0.5">${O}</ellipse>`,be=C.extra==="closed"?`<path d="M${P-C.back.rx},${$} Q${P},${$-.4} ${P+C.back.rx},${$}"
             stroke="rgba(0,0,0,0.6)" stroke-width="0.9" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${P}" cy="${$}" rx="${C.back.rx}" ry="${C.back.ry}"
                 fill="white" stroke="rgba(0,0,0,0.55)" stroke-width="0.4">${R}</ellipse>`,M=C.extra==="closed"?"":`<circle class="fish-pupil" cx="${E}" cy="${A}" r="${C.front.pupil}" fill="#1a1a1a" />
         <circle cx="${E+1.5}" cy="${A-2}" r="1.3" fill="white" />
         <circle cx="${E-1.5}" cy="${A+1.5}" r="0.6" fill="rgba(255,255,255,0.8)" />`,k=C.extra==="closed"?"":`<circle class="fish-pupil" cx="${P}" cy="${$}" r="${C.back.pupil}" fill="#1a1a1a" />
         <circle cx="${P+1.2}" cy="${$-1.5}" r="0.9" fill="white" />`,D=`
      ${be}${k}
      ${Z}${M}
      ${G}`,I=ta[r]||1;let B="";d&&(B=[{x:78,y:10,r:parseFloat(c)},{x:84,y:4,r:parseFloat(c)*.55},{x:88,y:0,r:parseFloat(c)*.32}].slice(0,I).map((ue,ie)=>`<circle cx="${ue.x}" cy="${ue.y}" r="${ue.r.toFixed(1)}"
                 fill="rgba(255,255,255,${(.85-ie*.12).toFixed(2)})"
                 stroke="rgba(255,255,255,0.5)" stroke-width="0.4" />`).join(""));const q=(e||"do").split("").reduce((J,se)=>J+se.charCodeAt(0),0),H=ia(q*73+17),F=3+Math.floor(H()*3),j=Array.from({length:F}).map(()=>{const J=(32+H()*36).toFixed(1),se=(30+H()*16).toFixed(1),ue=(.5+H()*.9).toFixed(2),ie=parseFloat(J),Fe=parseFloat(se);return ie>60&&ie<72&&Fe>28&&Fe<36?"":`<circle cx="${J}" cy="${se}" r="${ue}" fill="rgba(0,0,0,0.42)" />`}).join(""),V=(2+Math.random()*1).toFixed(2),X=(Math.random()*1).toFixed(2),U=`
      <path d="M40,22 Q34,18 32,24 Q36,26 40,26 Z"
            style="fill: ${v}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 24;-8 40 24;0 40 24;6 40 24;0 40 24"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${V}s" begin="${X}s" repeatCount="indefinite" />
      </path>`,ee=`
      <path d="M40,52 Q34,58 32,52 Q36,50 40,50 Z"
            style="fill: ${_}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round; opacity: 0.9;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 52;6 40 52;0 40 52;-6 40 52;0 40 52"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${V}s" begin="${(parseFloat(X)+.3).toFixed(2)}s" repeatCount="indefinite" />
      </path>`,oe=sa[r];let W="";const fe=(2.4+Math.random()*.8).toFixed(2),ye=(Math.random()*.6).toFixed(2);if(oe==="bow")W=`
        <g style="transform-origin: 46px 12px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-6 46 12;4 46 12;-6 46 12"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${fe}s" begin="${ye}s" repeatCount="indefinite" />
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
        </g>`;else if(oe==="hat")W=`
        <g style="transform-origin: 48px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-3 48 14;3 48 14;-3 48 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${fe}s" begin="${ye}s" repeatCount="indefinite" />
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
        </g>`;else if(oe==="crown"){const J=(1.6+Math.random()*.6).toFixed(2);W=`
        <g style="transform-origin: 46px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-2 46 14;2 46 14;-2 46 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${fe}s" begin="${ye}s" repeatCount="indefinite" />
          <!-- 皇冠底座 -->
          <path d="M38,16 L40,8 L44,12 L46,6 L48,12 L52,8 L54,16 Z"
                style="fill: #ffd700; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 皇冠底部装饰条 -->
          <rect x="38" y="14" width="16" height="2.4" fill="#ffb300" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
          <!-- 中央红宝石 -->
          <circle cx="46" cy="15.2" r="0.9" fill="#e74c3c" stroke="rgba(0,0,0,0.4)" stroke-width="0.25">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${J}s" repeatCount="indefinite" />
          </circle>
          <!-- 左右小宝石 -->
          <circle cx="41" cy="15.4" r="0.6" fill="#3498db" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <circle cx="51" cy="15.4" r="0.6" fill="#2ecc71" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <!-- 高光 -->
          <circle cx="45.3" cy="10.5" r="0.5" fill="rgba(255,255,255,0.85)" />
        </g>`}else oe==="earring"&&(W=`
        <g style="transform-origin: 80px 46px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-8 80 46;8 80 46;-8 80 46"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${fe}s" begin="${ye}s" repeatCount="indefinite" />
          <!-- 耳环钩 -->
          <circle cx="80" cy="46" r="0.8" fill="none" stroke="rgba(80,80,80,0.85)" stroke-width="0.5" />
          <!-- 珍珠 -->
          <circle cx="80" cy="49.5" r="1.6" fill="#fff8dc" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" />
          <!-- 高光 -->
          <circle cx="79.5" cy="49" r="0.55" fill="rgba(255,255,255,0.95)" />
        </g>`);this.el.innerHTML=`
      <svg xmlns="${de}" viewBox="0 0 96 72"
           style="display: block; width: 100%; height: 100%; overflow: visible;">
        <g class="fish-body" transform="rotate(${l} 48 36) scale(${o})">

          <!-- 身后小水泡 trail (作为最底层,在身体后面) -->
          ${x}

          ${d?`<!-- 思考泡泡 (${I} 颗,大小也随机) -->
          ${B}`:""}

          <!-- 尾巴 (按 note.id 切换形状) -->
          ${L}

          <!-- 上侧鳍 (有摇摆动画) -->
          ${U}

          <!-- 下侧鳍 (有摇摆动画) -->
          ${ee}

          <!-- 背鳍 (圆角三角帽) -->
          <path d="M36 18 Q44 4 52 18 Z"
                style="fill: ${v}; stroke: rgba(0,0,0,0.18); stroke-width: 0.5; stroke-linejoin: round;" />

          <!-- 身体 (微调过的色) -->
          <ellipse cx="50" cy="38" rx="32" ry="22"
                   style="fill: ${p}; stroke: rgba(0,0,0,0.22); stroke-width: 0.9;" />

          <!-- 肚白高光 (大肚皮) -->
          <ellipse cx="50" cy="50" rx="22" ry="9" fill="rgba(255,255,255,0.42)" />

          <!-- 闪光鳞片 (波浪装饰) -->
          <path d="M40 32 Q44 28 48 32 M52 28 Q56 24 60 28 M62 28 Q66 24 70 28"
                stroke="rgba(255,255,255,0.55)" stroke-width="0.7" fill="none" stroke-linecap="round" />

          <!-- 鳃线 -->
          <path d="M28 32 Q26 40 28 48" fill="none"
                stroke="rgba(0,0,0,0.28)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 雀斑/小点 (基于 note.id 稳定位置) -->
          ${j}

          <!-- 腮红 (粉嫩小圆点,透明度随机) -->
          <ellipse cx="68" cy="46" rx="3" ry="1.6" fill="rgba(255,140,170,${m})" />

          <!-- 嘴巴 (友好微笑) -->
          <path d="M76 44 Q80 47 76 49" fill="none"
                stroke="rgba(0,0,0,0.65)" stroke-width="1" stroke-linecap="round" />

          <!-- 眼睛 (按 note.id 切换表情) -->
          ${D}

          <!-- 配饰 (按 note.id 切换: 蝴蝶结/帽子/皇冠/耳环) -->
          ${W}

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
    `}}const ra=280,la=50,$r=68,vi=52,oa=72;function ds(s){const e=Math.max(48,s.height-8),t=Math.min(1,Math.max(.62,e/(vi*2+24)));return{slotW:Math.round($r*t),slotH:Math.round(vi*t),padX:Math.round(la*Math.min(1,Math.max(.6,t))),minDist:Math.max(44,Math.round(oa*t)),overY:Math.round(18*t)}}const mn="forest-piano-fishpool-keyframes";function aa(){if(document.getElementById(mn))return;const s=document.createElement("style");s.id=mn,s.textContent=`
    .fish-inner {
      transform-origin: 50% 50%;
      will-change: transform;
      /* v19.3: 内层缩小，外层 wrapper 保持完整手指热区 */
      transform: rotate(var(--fish-rot, 0deg)) scale(var(--fish-visual-scale, 0.78));
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
  `,document.head.appendChild(s)}class Ls{constructor(e,t){aa(),this.stage=e,this.notes=t,this.fishes=[],this.onDrop=null,this.onDragStart=null,this.onDragMove=null,this.onTap=null,this._dragEnabled=!0,this._lastHoveredSlot=null,this.TAP_THRESHOLD=12,this._renderPool(),requestAnimationFrame(()=>this._placeFishes()),this._onResize=()=>{clearTimeout(this._resizeTimer),this._resizeTimer=setTimeout(()=>this._handleViewportChange(),150)},window.addEventListener("resize",this._onResize),window.addEventListener("orientationchange",this._onResize)}_clampFishesToPool(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2)return;const t=ds(e),i=t.padX,n=e.width-t.padX-t.slotW,r=e.height-t.slotH,l=Math.max(i,n),o=Math.max(0,r);this.fishes.forEach(a=>{if(a.locked||a.el.classList.contains("dragging"))return;const d=Math.min(Math.max(a.originalLeft,i),l),c=Math.min(Math.max(a.originalTop,0),o);d===a.originalLeft&&c===a.originalTop||(a.originalLeft=d,a.originalTop=c,a.el.style.transition="left 200ms ease-out, top 200ms ease-out",a.el.style.left=`${d}px`,a.el.style.top=`${c}px`,setTimeout(()=>{a.el.style.transition=""},220))})}destroy(){this._onResize&&(window.removeEventListener("resize",this._onResize),window.removeEventListener("orientationchange",this._onResize),this._onResize=null),clearTimeout(this._resizeTimer)}_handleViewportChange(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2)return;const t=this._lastPoolH||0;this._lastPoolW,this._lastPoolH=e.height,this._lastPoolW=e.width,t>0&&Math.abs(e.height-t)/Math.max(t,1)>.3&&this.fishes.some(n=>!n.locked)?this._redistributeUnlocked():this._clampFishesToPool()}_redistributeUnlocked(){const e=this.fishes.filter(c=>!c.locked&&!c.el.classList.contains("dragging"));if(!e.length)return;const t=this.pool.getBoundingClientRect(),i=ds(t);this._m=i;const n=[];this.fishes.forEach(c=>{if(c.locked||c.el.classList.contains("dragging")){const m=c.el.getBoundingClientRect(),f=this.pool.getBoundingClientRect();n.push({x:m.left+m.width/2-f.left,y:m.top+m.height/2-f.top})}});const r=Math.max(i.padX,i.slotW/2),l=t.width-i.padX-i.slotW/2,o=i.slotH/2-i.overY,a=t.height-i.slotH/2,d=i.minDist*i.minDist;e.forEach(c=>{let m=null,f=-1/0;for(let u=0;u<70;u++){const h=r+Math.random()*Math.max(1,l-r),p=o+Math.random()*Math.max(1,a-o);let _=1/0;for(const v of n){const b=v.x-h,x=v.y-p;_=Math.min(_,b*b+x*x)}if(_>=d){m={cx:h,cy:p};break}_>f&&(f=_,m={cx:h,cy:p})}if(!m)return;const y=Math.round(m.cx-i.slotW/2),g=Math.round(m.cy-i.slotH/2);c.originalLeft=y,c.originalTop=g,c.el.style.width=`${i.slotW}px`,c.el.style.height=`${i.slotH}px`,c.el.style.transition="left 260ms ease-out, top 260ms ease-out",c.el.style.left=`${y}px`,c.el.style.top=`${g}px`,setTimeout(()=>{c.el.style.transition=""},300),n.push({x:m.cx,y:m.cy})})}_renderPool(){const e=document.createElement("div");e.className="fish-pool",e.setAttribute("aria-label","小鱼池"),this.stage.appendChild(e),this.pool=e,this.root=e}_placeFishes(){const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2){requestAnimationFrame(()=>this._placeFishes());return}const t=[...this.notes];for(let y=t.length-1;y>0;y--){const g=Math.floor(Math.random()*(y+1));[t[y],t[g]]=[t[g],t[y]]}const i=ds(e);this._m=i;const n=i.padX,r=e.width-i.padX-i.slotW,l=-i.overY,o=e.height-i.slotH,a=i.minDist,d=a*a,c=90,m=[];function f(y,g){for(let u=0;u<m.length;u++){const h=m[u],p=h.x-y,_=h.y-g;if(p*p+_*_<d)return!1}return!0}t.forEach(y=>{const g=document.createElement("div");g.className="fish is-floating",g.dataset.id=y.id,g.dataset.color=y.color,g.dataset.solfege=y.solfege,g.dataset.pitch=y.pitch,g.style.webkitUserSelect="none",g.style.userSelect="none",g.style.webkitTapHighlightColor="transparent";const u=n+i.slotW/2,h=r-i.slotW/2,p=l+i.slotH/2,_=o-i.slotH/2,v=Math.max(1,h-u),b=Math.max(1,_-p);let x=0,S=0,w=!1;for(let R=0;R<c;R++){const G=u+Math.random()*v,Z=p+Math.random()*b;if(f(G,Z)){x=G,S=Z,w=!0;break}}if(!w){let R=-1/0,G=u,Z=p;for(let be=0;be<60;be++){const M=u+Math.random()*v,k=p+Math.random()*b;let D=1/0;for(let I=0;I<m.length;I++){const B=m[I],q=B.x-M,H=B.y-k,F=Math.sqrt(q*q+H*H);F<D&&(D=F)}D>R&&(R=D,G=M,Z=k)}x=G,S=Z}const L=x-i.slotW/2,T=S-i.slotH/2;g.style.left=`${L}px`,g.style.top=`${T}px`,g.style.width=`${i.slotW}px`,g.style.height=`${i.slotH}px`,m.push({x,y:S});const C=(Math.random()-.5)*6,E=3.5+Math.random()*1,A=-Math.random()*E;g.style.setProperty("--fish-float-dur",`${E.toFixed(2)}s`),g.style.setProperty("--fish-float-delay",`${A.toFixed(2)}s`);const P=document.createElement("div");P.className="fish-inner",P.style.setProperty("--fish-rot",`${C.toFixed(2)}deg`);let $=null;try{const R=new na(y);R&&R.nodeType===1?$=R:$=R?.root||R?.element||R?.svg||null}catch(R){console.warn("[FishPool] Fish creation failed (Agent A 还没就绪?):",R)}$&&$.nodeType===1?P.appendChild($):P.innerHTML=`
          <div style="
            width:100%;height:100%;
            background:${y.color};
            border-radius:50% 60% 55% 50% / 55% 50% 60% 50%;
            display:flex;align-items:center;justify-content:center;
            color:#fff;font-family:'ZCOOL KuaiLe',sans-serif;
            font-size:24px;font-weight:900;
            text-shadow:0 1px 2px rgba(0,0,0,0.35);
            box-shadow:0 6px 0 rgba(0,0,0,0.18), 0 12px 24px rgba(0,0,0,0.2);
          ">${y.solfege}</div>
        `,g.appendChild(P),this.pool.appendChild(g);const O={el:g,inner:P,note:y,originalLeft:L,originalTop:T,rot:C,locked:!1};this.fishes.push(O),this._bindDrag(O)})}_bindDrag(e){const t=e.el;let i=null,n=0,r=0,l=0,o=0,a=0;const d=f=>{if(e.locked)return;if(this._dragEnabled===!1){const u=Date.now();if(u-(this._lastTapTime||0)<250&&this._lastTapEl===t)return;if(this._lastTapTime=u,this._lastTapEl=t,typeof this.onTap=="function")try{this.onTap(t)}catch(h){console.warn(h)}return}const y=Date.now();if(y-(this._lastTapTime||0)<250&&this._lastTapEl===t||(this._lastTapTime=y,this._lastTapEl=t,i!==null)||f.pointerType==="mouse"&&f.button!==0)return;try{t.setPointerCapture(f.pointerId)}catch{}i=f.pointerId;const g=t.getBoundingClientRect();if(n=f.clientX-g.left,r=f.clientY-g.top,l=f.clientX,o=f.clientY,a=0,t.classList.add("dragging"),t.classList.add("pressing"),e.el.style.animationPlayState="paused",t.style.position="fixed",t.style.left=`${f.clientX-n}px`,t.style.top=`${f.clientY-r}px`,t.style.right="auto",t.style.bottom="auto",t.style.margin="0",t.style.transform="",typeof this.onDragStart=="function")try{this.onDragStart(t)}catch(u){console.warn(u)}},c=f=>{if(i!==f.pointerId)return;f.preventDefault(),t.style.left=`${f.clientX-n}px`,t.style.top=`${f.clientY-r}px`;const y=f.clientX-l,g=f.clientY-o,u=Math.hypot(y,g);if(a=Math.max(a,u),a>this.TAP_THRESHOLD&&t.classList.contains("pressing")&&t.classList.remove("pressing"),typeof this.onDragMove=="function"){const h=document.querySelectorAll(".staff-slot");let p=null,_=1/0;if(h.forEach(v=>{const b=v.getBoundingClientRect(),x=b.left+b.width/2,S=b.top+b.height/2,w=Math.hypot(x-f.clientX,S-f.clientY);w<_&&(_=w,p=v)}),p!==this._lastHoveredSlot){this._lastHoveredSlot=p;try{this.onDragMove(t,p)}catch(v){console.warn(v)}}}},m=f=>{if(i!==f.pointerId)return;i=null;try{t.releasePointerCapture(f.pointerId)}catch{}if(a<this.TAP_THRESHOLD){if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null)}catch(b){console.warn(b)}}if(typeof this.onTap=="function")try{this.onTap(t)}catch(b){console.warn(b)}return}const y=document.querySelectorAll(".staff-slot");let g=null,u=1/0;const h=t.getBoundingClientRect(),p=h.left+h.width/2,_=h.top+h.height/2;y.forEach(b=>{const x=b.getBoundingClientRect(),S=x.left+x.width/2,w=x.top+x.height/2,L=Math.hypot(S-p,w-_);L<u&&(u=L,g=b)});const v=!!g&&u<ra&&g.dataset.id===e.note.id;if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null)}catch(b){console.warn(b)}}if(v&&this._spawnSourceShadow(e),typeof this.onDrop=="function")try{this.onDrop(t,g,v)}catch(b){console.warn(b)}};t.addEventListener("pointerdown",d),t.addEventListener("pointermove",c),t.addEventListener("pointerup",m),t.addEventListener("pointercancel",m),t.addEventListener("click",f=>{if(e.locked)return;const y=Date.now();if(!(y-(this._lastTapTime||0)<250&&this._lastTapEl===t)&&(this._lastTapTime=y,this._lastTapEl=t,typeof this.onTap=="function"))try{this.onTap(t)}catch(g){console.warn(g)}})}lockFish(e){const t=this.fishes.find(i=>i.note.id===e);t&&(t.locked=!0,t.el.classList.add("fish--locked"))}_spawnSourceShadow(e){if(!this.pool)return;const t=document.createElement("div");t.className="fish-source-shadow";const i=e.note&&e.note.color?e.note.color:"rgba(20,40,70,0.45)";t.style.setProperty("--shadow-color",i);const n=e.el.offsetWidth||(this._m?this._m.slotW:$r),r=e.el.offsetHeight||(this._m?this._m.slotH:vi);t.style.left=`${e.originalLeft+n/2}px`,t.style.top=`${e.originalTop+r/2}px`,this.pool.appendChild(t),setTimeout(()=>{try{t.remove()}catch{}},1400)}setDragEnabled(e){this._dragEnabled=e!==!1}unlockAll(){this.fishes.forEach(e=>{e.locked=!1,e.el.classList.remove("fish--locked"),e.el.classList.remove("dragging","shake"),e.el.style.position="",e.el.style.left=`${e.originalLeft}px`,e.el.style.top=`${e.originalTop}px`,e.el.style.right="",e.el.style.bottom="",e.el.style.margin="",e.el.style.transform="",e.el.style.animationPlayState=""})}intro(){const e=()=>{if(this.fishes.length<this.notes.length){requestAnimationFrame(e);return}this.fishes.forEach((t,i)=>{N.fromTo(t.el,{y:140,opacity:0,scale:.4},{y:0,opacity:1,scale:1,duration:.6,delay:i*.08,ease:"back.out(1.7)"})})};e()}reset(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width>=2&&e.height>=2){const t=ds(e);this._m=t;const i=t.padX,n=e.width-t.padX-t.slotW,r=-t.overY,l=e.height-t.slotH,o=t.minDist,a=o*o,d=90,c=[],m=(f,y)=>{for(let g=0;g<c.length;g++){const u=c[g],h=u.x-f,p=u.y-y;if(h*h+p*p<a)return!1}return!0};this.fishes.forEach(f=>{const y=i+t.slotW/2,g=n-t.slotW/2,u=r+t.slotH/2,h=l-t.slotH/2,p=Math.max(1,g-y),_=Math.max(1,h-u);let v=0,b=0,x=!1;for(let S=0;S<d;S++){const w=y+Math.random()*p,L=u+Math.random()*_;if(m(w,L)){v=w,b=L,x=!0;break}}if(!x){let S=-1/0,w=y,L=u;for(let T=0;T<60;T++){const C=y+Math.random()*p,E=u+Math.random()*_;let A=1/0;for(let P=0;P<c.length;P++){const $=c[P],O=$.x-C,R=$.y-E,G=Math.sqrt(O*O+R*R);G<A&&(A=G)}A>S&&(S=A,w=C,L=E)}v=w,b=L}f.originalLeft=v-t.slotW/2,f.originalTop=b-t.slotH/2,f.el.style.width=`${t.slotW}px`,f.el.style.height=`${t.slotH}px`,c.push({x:v,y:b})})}this.unlockAll(),this.fishes.forEach(t=>{N.fromTo(t.el,{y:60,opacity:.6,scale:.85},{y:0,opacity:1,scale:1,duration:.5,ease:"back.out(1.4)",delay:Math.random()*.15})})}getFishes(){return this.fishes.map(e=>e.el)}}const zs=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],gn=new Set(["do","mi","sol"]),ca=130,da=["真棒!","太厉害了~","不错哟!"];function ua(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=3);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new ea(s.stage),s.fishPool=new Ls(s.stage,zs),s.fishPool.setDragEnabled(!0),s.fishPool.intro(),s.say("柯尔文爷爷想听 Do Mi Sol 三部合唱! 把红 Do、黄 Mi、蓝 Sol 放到对应的山上~");const n=new Set;return s._level3Total=3,s._level3Count=0,s.fishPool.onTap=r=>{try{s.audio.playNote(r.dataset.pitch)}catch{}try{s.audio.hover(r.dataset.id)}catch{}N.fromTo(r,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})},s.fishPool.onDragStart=r=>{try{s.audio.hover(r.dataset.id)}catch{}},s.fishPool.onDragMove=(r,l)=>{},s.fishPool.onDrop=(r,l,o)=>{const a=r.dataset.id;if(n.has(a))return;let d=null,c=1/0;const m=r.getBoundingClientRect(),f=m.left+m.width/2,y=m.top+m.height/2;if(s.scene&&s.scene.background)for(const h of gn){const p=s.scene.background.querySelector(`[data-note="${h}"]`);if(!p)continue;const _=p.getBoundingClientRect(),v=_.left+_.width/2,b=_.top+_.height/2,x=Math.hypot(v-f,b-y);x<c&&(c=x,d=h)}const g=zs.find(h=>h.id===a),u=d&&c<ca;if(u&&a===d){n.add(d),s._level3Count=n.size;try{s.audio.correct()}catch{}try{s.scene.setProgress(n.size)}catch{}const h=s.scene.background.querySelector(`[data-note="${d}"]`),p=h.getBoundingClientRect(),_=s.fishPool.root.getBoundingClientRect(),v=p.left-_.left+p.width/2,b=p.top-_.top+p.height/2,x=parseFloat(r.style.left)||0,S=parseFloat(r.style.top)||0,w=v-x-r.offsetWidth/2,L=b-S-r.offsetHeight/2,T=g&&g.color||"#ffd166";N.to(r,{x:w,y:L,scale:.85,duration:.55,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(a)}catch{}try{s.audio.playNote(g.pitch)}catch{}try{s._floatScore(f,y,`${g.solfege} ✓`)}catch{}try{const E=h.getBoundingClientRect();s.scene.bloomAt(E.left+E.width/2,E.bottom,T)}catch{}N.to(r,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>N.to(r,{rotation:0,duration:.2,ease:"power2.out"})}),N.fromTo(r,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"});const C=da[n.size-1]+" "+n.size+" / 3";s.say(C),n.size===3&&setTimeout(()=>{const E=s._calcStars();try{s.progress.markLevelComplete(3,E)}catch{}try{s.audio.playScale(["C4","E4","G4"])}catch{}try{s.showWinOverlay(E,3)}catch{}},700)}})}else{s.wrongCount++;try{s.audio.wrong()}catch{}if(r.classList.add("shake"),setTimeout(()=>r.classList.remove("shake"),400),!gn.has(a)){try{s.scene.shakePlatforms()}catch{}s.say(`${g.solfege} 不在 Do Mi Sol 里哦! 找红色 Do、黄色 Mi、蓝色 Sol 三座山~`),N.to(r,{x:0,y:0,duration:.9,ease:"elastic.out(1.2, 0.4)"}),N.fromTo(r,{rotation:"+=15"},{rotation:0,duration:.4,ease:"power2.out"})}else if(u){const p=zs.find(_=>_.id===d);s.say(`${g.solfege} 应该去另一座山, 不是 ${p?p.solfege:"那座"} 的位置~`),N.to(r,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}else s.say(`${g.solfege} 应该去山上相应的高度哦~`),N.to(r,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}},()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}if(s.fishPool)try{s.fishPool.pool.innerHTML=""}catch{}const r=document.getElementById("hud-level2");r&&(r.style.display="");const l=document.querySelector(".hud__dots");l&&(l.style.display="");const o=document.getElementById("btn-replay");o&&(o.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const ha=Object.freeze(Object.defineProperty({__proto__:null,default:ua},Symbol.toStringTag,{value:"Module"}));class fa{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level4-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e;const t=document.createElement("div");t.className="level4-fx-layer",this.stage.appendChild(t),this.fxLayer=t}getBeatCue(){return this.stage?this.stage.querySelector(".level4-beat-cue"):null}getDrum(){return this.stage?this.stage.querySelector(".level4-drum-wrap"):null}getDrumAnchor(){return this.stage?this.stage.querySelector(".level4-drum-anchor"):null}getCueLarge(){return this.stage?this.stage.querySelector(".level4-drum-cue-large"):null}getFxLayer(){return this.fxLayer||null}getDrumScreenCenter(){const e=this.getDrum();if(!e)return{x:window.innerWidth/2,y:window.innerHeight/2};const t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2}}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null,this.fxLayer&&this.fxLayer.parentNode&&this.fxLayer.parentNode.removeChild(this.fxLayer),this.fxLayer=null}}const pa=[["T","T","tt","T"],["tt","T","T","tt","T","T"],["T","tt","T","tt","tt","T","T","T","tt","T"]],bn=600,Vs=3800,_a=.3,va=.5,ya=260,ma=320;function ga(s,e){return s<=1?3:s<=3?2:s<=5?1:0}function ba(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=4);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.wrongCount=0,s.scene=new fa(s.stage),s.say("节奏泡泡流过来咯! 跟着节拍敲鼓! 大泡泡 = ta (1 拍), 双连泡泡 = ti-ti (2 拍连敲)");const i=[];pa.forEach(E=>{E.forEach(A=>{A==="tt"?(i.push({double:!0,isSecond:!1}),i.push({double:!0,isSecond:!0})):i.push({double:!1})})});const n=i.length;s._level4Total=n,s._level4Processed=0,s._level4Pending=[],s._level4Done=!1,s._level4Correct=0,s._level4Timeouts=[],s._level4CueTimers=[],s.stage.insertAdjacentHTML("beforeend",'<div class="level4-bubbles-container"></div>');const r=s.stage.querySelector(".level4-bubbles-container"),o=(r||s.stage).getBoundingClientRect(),a=o.width,d=o.height,c=a*va,m=d*_a,f=-50,y=a+100,g=(c-f)/(y-f),u=s.scene.getFxLayer(),h=s.scene.getDrumAnchor(),p=s.scene.getCueLarge();function _(){const E=s.scene.getDrumScreenCenter();if(!u||typeof E.x!="number")return E;const A=u.getBoundingClientRect();return{x:E.x-A.left,y:E.y-A.top}}function v(){if(!u)return;const E=_();for(let A=0;A<3;A++){const P=document.createElement("div");P.className="level4-drum-ripple level4-drum-ripple--"+(A+1),P.style.left=E.x+"px",P.style.top=E.y+"px",u.appendChild(P),setTimeout(()=>P.remove(),900)}}function b(){if(!u)return;const E=_(),A=["#ffd166","#ef476f","#06d6a0","#118ab2","#ff9f1c"],P=12;for(let $=0;$<P;$++){const O=document.createElement("div");O.className="level4-drum-particle";const R=A[Math.floor(Math.random()*A.length)];O.style.background=R,O.style.boxShadow="0 0 6px "+R;const G=Math.PI*2*$/P+Math.random()*.4,Z=70+Math.random()*50,be=Math.cos(G)*Z,M=Math.sin(G)*Z-30;O.style.setProperty("--dx",be.toFixed(1)+"px"),O.style.setProperty("--dy",M.toFixed(1)+"px"),O.style.left=E.x+"px",O.style.top=E.y+"px";const k=6+Math.random()*6;O.style.width=k+"px",O.style.height=k+"px",u.appendChild(O),setTimeout(()=>O.remove(),700)}}function x(){if(!u)return;const E=_(),A=document.createElement("div");A.className="level4-floating-score level4-floating-score--plus",A.textContent="+1",A.style.left=E.x+"px",A.style.top=E.y-50+"px",u.appendChild(A),setTimeout(()=>A.remove(),850)}function S(){if(!u)return;const E=_(),A=document.createElement("div");A.className="level4-floating-score level4-floating-score--minus",A.textContent="-1",A.style.left=E.x+"px",A.style.top=E.y-50+"px",u.appendChild(A),setTimeout(()=>A.remove(),850)}function w(){if(s._level4Done)return;h&&h.classList.add("level4-cue-now"),p&&p.classList.add("level4-cue-active");try{s.audio.hover()}catch{}const E=setTimeout(()=>{h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active")},ma);s._level4CueTimers.push(E)}let L=0;i.forEach((E,A)=>{const P=E.double?bn/2:bn,$=L+800;s._level4Timeouts.push(setTimeout(()=>T(E,A),$)),L+=P});function T(E,A){if(!r||s._level4Done)return;const P=document.createElement("div");P.className="level4-bubble",E.double&&E.isSecond&&P.classList.add("level4-bubble-half"),E.double&&P.classList.add("level4-bubble--double"),P.dataset.idx=String(A),E.double?P.textContent=E.isSecond?"·":"•":P.textContent="●",r.appendChild(P);try{const O=P.animate([{transform:`translate(${f}px, ${m}px)`},{transform:`translate(${c}px, ${m}px)`,offset:g},{transform:`translate(${y}px, ${m}px)`}],{duration:Vs,fill:"forwards",easing:"linear"});O&&O.cancel}catch{P.style.left=f+"px",P.style.top=m+"px"}const $=Vs*g;s._level4Timeouts.push(setTimeout(()=>{s._level4Done||(w(),s._level4Pending.push({beat:E,absoluteIdx:A,when:Date.now()}))},$)),s._level4Timeouts.push(setTimeout(()=>{if(s._level4Done)return;P.remove(),s._level4Processed++;const O=s._level4Pending.findIndex(R=>R.absoluteIdx===A);O>=0&&(s._level4Pending.splice(O,1),s.wrongCount++,s.audio.wrong(),S(),h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active"),s.say("咦, 漏了一拍! 跟着泡泡到鼓位再敲")),s._level4Processed===n&&!s._level4Done&&(s._level4Done=!0,s._level4Timeouts.push(setTimeout(()=>{const R=ga(s.wrongCount);try{s.progress.markLevelComplete(4,R)}catch{}s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"]),s.showWinOverlay(R,4)},600)))},Vs))}const C=s.scene.getDrum();if(C){C.style.cursor="pointer";const E=A=>{if(A.preventDefault(),A.stopPropagation(),s._level4Done)return;C.classList.remove("level4-drum-hit"),C.offsetWidth,C.classList.add("level4-drum-hit"),s._level4Timeouts.push(setTimeout(()=>{C.classList.remove("level4-drum-hit")},280)),h&&(h.classList.remove("level4-drum-character-hit"),h.offsetWidth,h.classList.add("level4-drum-character-hit"),setTimeout(()=>{h&&h.classList.remove("level4-drum-character-hit")},280));const P=Date.now(),$=s._level4Pending.filter(O=>Math.abs(P-O.when)<ya);if($.length>0){s._level4Correct++,s._level4Pending=s._level4Pending.filter(R=>!$.includes(R));try{s.audio.playNote("C4")}catch{}v(),b(),x(),h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active");const O=["咚!","咚!咚!","完美!","棒呀!","节拍对!"];s.say(O[Math.min(s._level4Correct-1,O.length-1)])}else{s.wrongCount++;try{s.audio.wrong()}catch{}C.classList.add("level4-drum-shake"),setTimeout(()=>C.classList.remove("level4-drum-shake"),360),S(),h&&h.classList.remove("level4-cue-now"),p&&p.classList.remove("level4-cue-active"),s.say("咦, 现在不是节拍! 看泡泡到鼓位再敲")}};C.addEventListener("pointerdown",E),s._level4DrumHandler=E}return()=>{if(Array.isArray(s._level4Timeouts)&&(s._level4Timeouts.forEach(O=>clearTimeout(O)),s._level4Timeouts=[]),Array.isArray(s._level4CueTimers)&&(s._level4CueTimers.forEach(O=>clearTimeout(O)),s._level4CueTimers=[]),Array.isArray(s._level4Pending)&&(s._level4Pending=[]),s._level4Done=!0,s._level4DrumHandler&&C&&C.removeEventListener("pointerdown",s._level4DrumHandler),s._level4DrumHandler=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}(s.stage?s.stage.querySelectorAll(".level4-bubbles-container"):[]).forEach(O=>O.remove());const A=document.getElementById("hud-level2");A&&(A.style.display="none");const P=document.querySelector(".hud__dots");P&&(P.style.display="");const $=document.getElementById("btn-replay");$&&($.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const xa=Object.freeze(Object.defineProperty({__proto__:null,default:ba},Symbol.toStringTag,{value:"Module"}));class wa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level5-background";let t="";for(let i=0;i<40;i++){const n=Math.random()*100,r=Math.random()*50,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level5-stars-tiny" cx="${n}%" cy="${r}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const ka=["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"],Ys={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},qe=80,Ta=80,Sa=60;function La(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=5);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.createElement("style");i.dataset.levelStyle="5",i.textContent=`
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: clamp(92px, 24%, 170px);
    }
    #stage > .keyboard-area > svg.keyboard {
      width: 100%;
      height: 100%;
    }
  `,document.head.appendChild(i),s.scene=new wa(s.stage),s.say("森林乐团要奏小星星! 看音符掉到哪个键, 就按哪个~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level5-staff-area"></div>');const n=s.stage.querySelector(".level5-staff-area");n.innerHTML=`
    <svg class="level5-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
      <line class="level5-staff-line" x1="40" y1="${qe+40}" x2="760" y2="${qe+40}" />
      <line class="level5-staff-line" x1="40" y1="${qe+60}" x2="760" y2="${qe+60}" />
      <line class="level5-staff-line" x1="40" y1="${qe+80}" x2="760" y2="${qe+80}" />
      <line class="level5-staff-line" x1="40" y1="${qe+100}" x2="760" y2="${qe+100}" />
      <line class="level5-staff-line" x1="40" y1="${qe+120}" x2="760" y2="${qe+120}" />
      <!-- 当前音符位置 -->
      <circle class="level5-current-note" cx="400" cy="0" r="14" fill="#ffd166" />
    </svg>
  `,s.stage.insertAdjacentHTML("beforeend",`
    <div class="level5-metronome" id="level5-metronome">
      <span class="level5-metronome-note">♩=</span>
      <span class="level5-metronome-bpm" id="level5-bpm">${Ta}</span>
      <span class="level5-metronome-mode" id="level5-mode"></span>
    </div>
  `),s.kb=new gt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level5Seq=[...ka],s._level5Total=s._level5Seq.length,s._level5Correct=0,s._level5Idx=0,s._level5Accepting=!0,s._level5Done=!1,s._level5EasyMode=!1,s._level5ConsecWrong=0;const r={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function l(){return n.querySelector(".level5-current-note")}function o(m,f){const y=document.getElementById("level5-bpm"),g=document.getElementById("level5-mode");y&&(y.textContent=String(m)),g&&(g.textContent=f);const u=document.getElementById("level5-metronome");u&&u.classList.toggle("level5-metronome--easy",!0)}function a(){const m=s._level5Idx||0,f=s._level5Total||14,g=4+Math.min(1,m/Math.max(1,f-1))*1.5;return s._level5EasyMode?g+1.5:g}function d(){if(!s._level5EasyMode&&s._level5ConsecWrong>=3){s._level5EasyMode=!0,o(Sa,"轻松模式");try{s.say("进入轻松模式~ 慢慢来不着急!")}catch{}}}function c(){if(s._level5Done||s._level5Idx>=s._level5Seq.length)return;const m=s._level5Seq[s._level5Idx],f=Ys[m],y=r[f.id],g=l();if(!g)return;N.killTweensOf(g),N.set(g,{scale:1}),g.setAttribute("cy",y),g.dataset.pitch=m,g.classList.remove("dropping","incorrect"),s.say(`下一个: ${f.solfege} (${m})`),s._level5Accepting=!0;const u=a();N.fromTo(g,{attr:{cy:y},opacity:1},{attr:{cy:y+100},opacity:.9,duration:u,ease:"none",onComplete:()=>{if(!s._level5Done&&s._level5Accepting){s._level5Accepting=!1,s.wrongCount++,s._level5ConsecWrong++,d();try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),g.classList.add("incorrect"),setTimeout(()=>{g.classList.remove("incorrect"),s._level5Idx++,c()},600)}}})}return s.kb.onPress=m=>{if(!s._level5Accepting||s._level5Done)return;const f=s._level5Seq[s._level5Idx],y=m.dataset.pitch;if(y===f){s._level5Correct++,s._level5Accepting=!1,s._level5ConsecWrong=0;try{s.audio.correct()}catch{}try{s.audio.playNote(y)}catch{}const g=l();g&&(N.killTweensOf(g),N.to(g,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),s.say(["完美!","星星在向你眨眼!","小星星~"][Math.min(s._level5Correct-1,2)]),s._level5Idx++,s._level5Idx>=s._level5Seq.length?(s._level5Done=!0,setTimeout(()=>{const u=s._calcStars();try{s.progress.markLevelComplete(5,u)}catch{}try{s.audio.playScale(["C4","C4","G4","G4","A4","A4","G4"])}catch{}s.say("✨ 完美的《小星星》!"),s.showWinOverlay(u,5)},800)):setTimeout(c,500)}else{s.wrongCount++,s._level5ConsecWrong++,d();try{s.audio.wrong()}catch{}const g=Ys[y];s.say(`这是 ${g?g.solfege:"?"}, 不是 ${Ys[f].solfege}. 再听一下!`);const u=l();u&&u.classList.add("incorrect"),setTimeout(()=>{u&&u.classList.remove("incorrect")},300);try{s.audio.playNote(f)}catch{}}},setTimeout(c,1e3),()=>{s.scene&&typeof s.scene.teardown=="function"&&s.scene.teardown(),i&&i.parentNode&&i.remove();const m=n&&n.querySelector(".level5-current-note");m&&N.killTweensOf(m),s.stage.querySelectorAll(".level5-staff-area").forEach(u=>u.remove());const f=document.getElementById("level5-metronome");f&&f.remove();const y=document.getElementById("hud-level2");y&&(y.style.display="");const g=document.querySelector(".hud__dots");g&&(g.style.display="none"),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ca=Object.freeze(Object.defineProperty({__proto__:null,default:La},Symbol.toStringTag,{value:"Module"}));class Ma{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level6-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}setChordLabel(e){if(!this.background)return;const t=this.background.querySelector(".level6-chord-indicator__chord");t&&(t.textContent=e)}celebrateClap(){if(!this.background)return;const e=this.background.querySelector(".level6-teacher");e&&(e.classList.remove("level6-clap"),e.offsetWidth,e.classList.add("level6-clap"),setTimeout(()=>e.classList.remove("level6-clap"),1200))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Ce=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Us=new Set(["do","re","mi"]),Ea=new Set(["fa","sol","la","si"]),Bt=[{high:"fa",low:"do",label:"Fa 上 + Do 下"},{high:"sol",low:"re",label:"Sol 上 + Re 下"},{high:"la",low:"mi",label:"La 上 + Mi 下"},{high:"si",low:"do",label:"Si 上 + Do 下"},{high:"sol",low:"mi",label:"Sol 上 + Mi 下"}],Aa=2e3,Pa=["C4","D4","E4","F4","G4","A4","B4"],xn=["完美!","双手协作!","和谐!","真厉害!","双手小钢琴家!"];function $a(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=6);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.querySelectorAll("#hud-dots .dot");n.forEach(f=>f.classList.remove("on")),n.forEach((f,y)=>{y>=5?f.style.display="none":f.style.display=""});const r=document.createElement("style");r.dataset.levelStyle="6",r.textContent=`
    #stage { --lv6-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
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
  `,document.head.appendChild(r),s.scene=new Ma(s.stage),s.kb=new gt(s.stage,Ce),setTimeout(()=>{!s.kb||!s.kb.svg||Ce.forEach(f=>{const y=s.kb.svg.querySelector(`.key--white[data-id="${f.id}"]`);if(!y)return;Us.has(f.id)?y.classList.add("level6-lh"):Ea.has(f.id)&&y.classList.add("level6-rh");const g=y.querySelector(".key__label");if(g){const u=document.createElementNS("http://www.w3.org/2000/svg","text"),h=g.getAttribute("x")||"40";u.setAttribute("x",h),u.setAttribute("y","150"),u.setAttribute("text-anchor","middle"),u.setAttribute("font-family","'ZCOOL KuaiLe', sans-serif"),u.setAttribute("font-size","12"),u.setAttribute("font-weight","900"),u.setAttribute("fill",Us.has(f.id)?"#2d6e3e":"#a06800"),u.setAttribute("class","level6-hand-tag"),u.setAttribute("style","pointer-events: none; paint-order: stroke; stroke: white; stroke-width: 2;"),u.textContent=Us.has(f.id)?"左手":"右手",y.appendChild(u)}})},50),s.say("钢琴老师教双手协调! 左低右高, 同时按下两个键~ 🎹"),s._level6Idx=0,s._level6Total=Bt.length,s._level6Correct=0,s._level6Done=!1,s._level6Current=null,s._level6PressFirst=null,s._level6PairTimer=null,s._level6Locked=!1;function l(f){!s.kb||!s.kb.svg||[f.high,f.low].forEach(y=>{const g=s.kb.svg.querySelector(`.key--white[data-id="${y}"]`);g&&s.kb.glowKey(g)})}function o(f,y){try{s.audio.playNote(f),setTimeout(()=>{try{s.audio.playNote(y)}catch{}},8)}catch{}}function a(f){if(f>=Bt.length)return d();const y=Bt[f];s._level6Current=y,s._level6PressFirst=null,s._level6Locked=!1;const g=Ce.find(h=>h.id===y.high),u=Ce.find(h=>h.id===y.low);s.say(`第 ${f+1} / ${Bt.length} 题: 请同时按 ${g.solfege} (右手) + ${u.solfege} (左手) ✨`);try{s.scene.setChordLabel(y.label)}catch{}setTimeout(()=>l(y),300),setTimeout(()=>{try{o(g.pitch,u.pitch)}catch{}},600)}function d(){s._level6Done=!0;const f=s._calcStars();try{s.progress.markLevelComplete(6,f)}catch{}try{s.audio.playScale(Pa)}catch{}s.say("双手小钢琴家毕业! 🎓🎹");try{s.scene.setChordLabel("毕业啦")}catch{}setTimeout(()=>{try{s.showWinOverlay(f,6)}catch{}},1200)}s.kb.onPress=f=>{if(s._level6Done||s._level6Locked||!s._level6Current||!f||!f.classList.contains("key--white"))return;const y=f.dataset.id,g=s._level6Current,u=new Set([g.high,g.low]),h=s._level6PressFirst;if(h&&h.id!==y){if(u.has(y)&&u.has(h.id)&&h.id!==y){c(f);return}m(f,y);return}if(!h){if(!u.has(y)){m(f,y);return}s._level6PressFirst={id:y,at:Date.now()};try{s.audio.playNote(f.dataset.pitch)}catch{}try{s.kb.glowKey(f)}catch{}f.classList.add("level6-pressed"),setTimeout(()=>f.classList.remove("level6-pressed"),500),s._level6PairTimer&&clearTimeout(s._level6PairTimer),s._level6PairTimer=setTimeout(()=>{const p=s._level6PressFirst;if(p){const _=Ce.find(x=>x.id===p.id),v=Ce.find(x=>x.id===g.high),b=Ce.find(x=>x.id===g.low);s.say(`光按了 ${_?_.solfege:"?"} 还不够哦, 再按 ${v.solfege} (右手) 或 ${b.solfege} (左手)~`),s.wrongCount++}s._level6PressFirst=null},Aa);return}try{s.kb.glowKey(f)}catch{}try{s.audio.playNote(f.dataset.pitch)}catch{}};function c(f){const y=s._level6PressFirst;if(!y||!s._level6Current)return;const g=y.id,u=f.dataset.id,h=Ce.find(v=>v.id===g),p=Ce.find(v=>v.id===u);if(h&&p)o(h.pitch,p.pitch);else try{h&&s.audio.playNote(h.pitch),p&&s.audio.playNote(p.pitch)}catch{}[g,u].forEach(v=>{const b=s.kb.svg.querySelector(`.key--white[data-id="${v}"]`);if(b){b.classList.add("level6-pressed");try{s.kb.glowKey(b)}catch{}setTimeout(()=>b.classList.remove("level6-pressed"),500)}}),s._level6Correct++,s._level6Locked=!0,s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null;const _=xn[Math.min(s._level6Correct-1,xn.length-1)];s.say(`${_} 双音 ${s._level6Correct} / ${Bt.length}`),n[s._level6Correct-1]&&n[s._level6Correct-1].classList.add("on");try{s.scene.celebrateClap()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"🎵 双音!")}catch{}try{const v=document.createElement("div");v.className="level6-flash",document.body.appendChild(v),setTimeout(()=>v.remove(),600)}catch{}try{const v=f.getBoundingClientRect(),b=v.left+v.width/2,x=v.top+v.height/2,S=(Ce.find(w=>w.id===s._level6Current.high)||{}).color||"#ffd166";s.burst(b,x,S)}catch{}try{s.audio.correct()}catch{}s._level6Idx++,setTimeout(()=>a(s._level6Idx),1400)}function m(f,y){s.wrongCount++;try{s.audio.wrong()}catch{}if(f.classList.add("shake"),setTimeout(()=>f.classList.remove("shake"),400),s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null,!s._level6Current)return;const g=Ce.find(p=>p.id===s._level6Current.high),u=Ce.find(p=>p.id===s._level6Current.low),h=Ce.find(p=>p.id===y);h?s.say(`${h.solfege} 不在本道题里, 要按 ${g.solfege} (右手) + ${u.solfege} (左手) 同时哦~`):s.say(`要同时按 ${g.solfege} (右手) + ${u.solfege} (左手) 哦~`),setTimeout(()=>l(s._level6Current),800)}return setTimeout(()=>a(0),1200),()=>{if(s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),r&&r.parentNode&&r.remove(),s.scene){try{s.scene.teardown()}catch{}s.scene=null}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),n.forEach(f=>{f.classList.remove("on"),f.style.display=""}),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Da=Object.freeze(Object.defineProperty({__proto__:null,default:$a},Symbol.toStringTag,{value:"Module"}));class Oa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level7-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}drawRibbon(e,t,i,n){if(!this.background)return;const r=this.background.querySelector(".level7-ribbon-layer");if(!r)return;const l=this.background.getBoundingClientRect(),o=t.x-l.left,a=t.y-l.top,d=i.x-l.left,c=i.y-l.top,m="http://www.w3.org/2000/svg",f=document.createElementNS(m,"svg");f.setAttribute("viewBox",`0 0 ${l.width} ${l.height}`),f.setAttribute("width",l.width),f.setAttribute("height",l.height),f.style.position="absolute",f.style.inset="0",f.style.pointerEvents="none",f.setAttribute("class","level7-ribbon-svg");const y=(o+d)/2,g=Math.min(a,c)-60-Math.random()*30,u=document.createElementNS(m,"path");u.setAttribute("d",`M ${o},${a} Q ${y},${g} ${d},${c}`),u.setAttribute("stroke",n),u.setAttribute("stroke-width","6"),u.setAttribute("stroke-linecap","round"),u.setAttribute("fill","none"),u.setAttribute("opacity","0.85"),u.setAttribute("class","level7-ribbon-path"),u.setAttribute("stroke-dasharray",`${Math.hypot(d-o,c-a)}`),u.setAttribute("stroke-dashoffset",`${Math.hypot(d-o,c-a)}`),f.appendChild(u),r.appendChild(f),requestAnimationFrame(()=>{u.style.transition="stroke-dashoffset 0.55s ease-out, opacity 0.55s ease-out",u.setAttribute("stroke-dashoffset","0")}),setTimeout(()=>{u.setAttribute("opacity","0"),setTimeout(()=>{try{f.remove()}catch{}},600)},700)}lightTreehouse(){this.background&&(this.background.classList.add("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.add("level7-step-complete")}))}dimTreehouse(){this.background&&(this.background.classList.remove("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.remove("level7-step-complete")}))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}var Bi={};(function s(e,t,i,n){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var M=new OffscreenCanvas(1,1),k=M.getContext("2d");k.fillRect(0,0,1,1);var D=M.transferToImageBitmap();k.createPattern(D,"no-repeat")}catch{return!1}return!0}();function a(){}function d(M){var k=t.exports.Promise,D=k!==void 0?k:e.Promise;return typeof D=="function"?new D(M):(M(a,a),null)}var c=function(M,k){return{transform:function(D){if(M)return D;if(k.has(D))return k.get(D);var I=new OffscreenCanvas(D.width,D.height),B=I.getContext("2d");return B.drawImage(D,0,0),k.set(D,I),I},clear:function(){k.clear()}}}(o,new Map),m=function(){var M=Math.floor(16.666666666666668),k,D,I={},B=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(k=function(q){var H=Math.random();return I[H]=requestAnimationFrame(function F(j){B===j||B+M-1<j?(B=j,delete I[H],q()):I[H]=requestAnimationFrame(F)}),H},D=function(q){I[q]&&cancelAnimationFrame(I[q])}):(k=function(q){return setTimeout(q,M)},D=function(q){return clearTimeout(q)}),{frame:k,cancel:D}}(),f=function(){var M,k,D={};function I(B){function q(H,F){B.postMessage({options:H||{},callback:F})}B.init=function(F){var j=F.transferControlToOffscreen();B.postMessage({canvas:j},[j])},B.fire=function(F,j,V){if(k)return q(F,null),k;var X=Math.random().toString(36).slice(2);return k=d(function(U){function ee(oe){oe.data.callback===X&&(delete D[X],B.removeEventListener("message",ee),k=null,c.clear(),V(),U())}B.addEventListener("message",ee),q(F,X),D[X]=ee.bind(null,{data:{callback:X}})}),k},B.reset=function(){B.postMessage({reset:!0});for(var F in D)D[F](),delete D[F]}}return function(){if(M)return M;if(!i&&r){var B=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{M=new Worker(URL.createObjectURL(new Blob([B])))}catch(q){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",q),null}I(M)}return M}}(),y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function g(M,k){return k?k(M):M}function u(M){return M!=null}function h(M,k,D){return g(M&&u(M[k])?M[k]:y[k],D)}function p(M){return M<0?0:Math.floor(M)}function _(M,k){return Math.floor(Math.random()*(k-M))+M}function v(M){return parseInt(M,16)}function b(M){return M.map(x)}function x(M){var k=String(M).replace(/[^0-9a-f]/gi,"");return k.length<6&&(k=k[0]+k[0]+k[1]+k[1]+k[2]+k[2]),{r:v(k.substring(0,2)),g:v(k.substring(2,4)),b:v(k.substring(4,6))}}function S(M){var k=h(M,"origin",Object);return k.x=h(k,"x",Number),k.y=h(k,"y",Number),k}function w(M){M.width=document.documentElement.clientWidth,M.height=document.documentElement.clientHeight}function L(M){var k=M.getBoundingClientRect();M.width=k.width,M.height=k.height}function T(M){var k=document.createElement("canvas");return k.style.position="fixed",k.style.top="0px",k.style.left="0px",k.style.pointerEvents="none",k.style.zIndex=M,k}function C(M,k,D,I,B,q,H,F,j){M.save(),M.translate(k,D),M.rotate(q),M.scale(I,B),M.arc(0,0,1,H,F,j),M.restore()}function E(M){var k=M.angle*(Math.PI/180),D=M.spread*(Math.PI/180);return{x:M.x,y:M.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:M.startVelocity*.5+Math.random()*M.startVelocity,angle2D:-k+(.5*D-Math.random()*D),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:M.color,shape:M.shape,tick:0,totalTicks:M.ticks,decay:M.decay,drift:M.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:M.gravity*3,ovalScalar:.6,scalar:M.scalar,flat:M.flat}}function A(M,k){k.x+=Math.cos(k.angle2D)*k.velocity+k.drift,k.y+=Math.sin(k.angle2D)*k.velocity+k.gravity,k.velocity*=k.decay,k.flat?(k.wobble=0,k.wobbleX=k.x+10*k.scalar,k.wobbleY=k.y+10*k.scalar,k.tiltSin=0,k.tiltCos=0,k.random=1):(k.wobble+=k.wobbleSpeed,k.wobbleX=k.x+10*k.scalar*Math.cos(k.wobble),k.wobbleY=k.y+10*k.scalar*Math.sin(k.wobble),k.tiltAngle+=.1,k.tiltSin=Math.sin(k.tiltAngle),k.tiltCos=Math.cos(k.tiltAngle),k.random=Math.random()+2);var D=k.tick++/k.totalTicks,I=k.x+k.random*k.tiltCos,B=k.y+k.random*k.tiltSin,q=k.wobbleX+k.random*k.tiltCos,H=k.wobbleY+k.random*k.tiltSin;if(M.fillStyle="rgba("+k.color.r+", "+k.color.g+", "+k.color.b+", "+(1-D)+")",M.beginPath(),l&&k.shape.type==="path"&&typeof k.shape.path=="string"&&Array.isArray(k.shape.matrix))M.fill(G(k.shape.path,k.shape.matrix,k.x,k.y,Math.abs(q-I)*.1,Math.abs(H-B)*.1,Math.PI/10*k.wobble));else if(k.shape.type==="bitmap"){var F=Math.PI/10*k.wobble,j=Math.abs(q-I)*.1,V=Math.abs(H-B)*.1,X=k.shape.bitmap.width*k.scalar,U=k.shape.bitmap.height*k.scalar,ee=new DOMMatrix([Math.cos(F)*j,Math.sin(F)*j,-Math.sin(F)*V,Math.cos(F)*V,k.x,k.y]);ee.multiplySelf(new DOMMatrix(k.shape.matrix));var oe=M.createPattern(c.transform(k.shape.bitmap),"no-repeat");oe.setTransform(ee),M.globalAlpha=1-D,M.fillStyle=oe,M.fillRect(k.x-X/2,k.y-U/2,X,U),M.globalAlpha=1}else if(k.shape==="circle")M.ellipse?M.ellipse(k.x,k.y,Math.abs(q-I)*k.ovalScalar,Math.abs(H-B)*k.ovalScalar,Math.PI/10*k.wobble,0,2*Math.PI):C(M,k.x,k.y,Math.abs(q-I)*k.ovalScalar,Math.abs(H-B)*k.ovalScalar,Math.PI/10*k.wobble,0,2*Math.PI);else if(k.shape==="star")for(var W=Math.PI/2*3,fe=4*k.scalar,ye=8*k.scalar,J=k.x,se=k.y,ue=5,ie=Math.PI/ue;ue--;)J=k.x+Math.cos(W)*ye,se=k.y+Math.sin(W)*ye,M.lineTo(J,se),W+=ie,J=k.x+Math.cos(W)*fe,se=k.y+Math.sin(W)*fe,M.lineTo(J,se),W+=ie;else M.moveTo(Math.floor(k.x),Math.floor(k.y)),M.lineTo(Math.floor(k.wobbleX),Math.floor(B)),M.lineTo(Math.floor(q),Math.floor(H)),M.lineTo(Math.floor(I),Math.floor(k.wobbleY));return M.closePath(),M.fill(),k.tick<k.totalTicks}function P(M,k,D,I,B){var q=k.slice(),H=M.getContext("2d"),F,j,V=d(function(X){function U(){F=j=null,H.clearRect(0,0,I.width,I.height),c.clear(),B(),X()}function ee(){i&&!(I.width===n.width&&I.height===n.height)&&(I.width=M.width=n.width,I.height=M.height=n.height),!I.width&&!I.height&&(D(M),I.width=M.width,I.height=M.height),H.clearRect(0,0,I.width,I.height),q=q.filter(function(oe){return A(H,oe)}),q.length?F=m.frame(ee):U()}F=m.frame(ee),j=U});return{addFettis:function(X){return q=q.concat(X),V},canvas:M,promise:V,reset:function(){F&&m.cancel(F),j&&j()}}}function $(M,k){var D=!M,I=!!h(k||{},"resize"),B=!1,q=h(k,"disableForReducedMotion",Boolean),H=r&&!!h(k||{},"useWorker"),F=H?f():null,j=D?w:L,V=M&&F?!!M.__confetti_initialized:!1,X=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,U;function ee(W,fe,ye){for(var J=h(W,"particleCount",p),se=h(W,"angle",Number),ue=h(W,"spread",Number),ie=h(W,"startVelocity",Number),Fe=h(W,"decay",Number),xt=h(W,"gravity",Number),Ke=h(W,"drift",Number),ct=h(W,"colors",b),Ds=h(W,"ticks",Number),es=h(W,"shapes"),Nr=h(W,"scalar"),Rr=!!h(W,"flat"),Fi=S(W),qi=J,Os=[],Ir=M.width*Fi.x,Br=M.height*Fi.y;qi--;)Os.push(E({x:Ir,y:Br,angle:se,spread:ue,startVelocity:ie,color:ct[qi%ct.length],shape:es[_(0,es.length)],ticks:Ds,decay:Fe,gravity:xt,drift:Ke,scalar:Nr,flat:Rr}));return U?U.addFettis(Os):(U=P(M,Os,j,fe,ye),U.promise)}function oe(W){var fe=q||h(W,"disableForReducedMotion",Boolean),ye=h(W,"zIndex",Number);if(fe&&X)return d(function(ie){ie()});D&&U?M=U.canvas:D&&!M&&(M=T(ye),document.body.appendChild(M)),I&&!V&&j(M);var J={width:M.width,height:M.height};F&&!V&&F.init(M),V=!0,F&&(M.__confetti_initialized=!0);function se(){if(F){var ie={getBoundingClientRect:function(){if(!D)return M.getBoundingClientRect()}};j(ie),F.postMessage({resize:{width:ie.width,height:ie.height}});return}J.width=J.height=null}function ue(){U=null,I&&(B=!1,e.removeEventListener("resize",se)),D&&M&&(document.body.contains(M)&&document.body.removeChild(M),M=null,V=!1)}return I&&!B&&(B=!0,e.addEventListener("resize",se,!1)),F?F.fire(W,J,ue):ee(W,J,ue)}return oe.reset=function(){F&&F.reset(),U&&U.reset()},oe}var O;function R(){return O||(O=$(null,{useWorker:!0,resize:!0})),O}function G(M,k,D,I,B,q,H){var F=new Path2D(M),j=new Path2D;j.addPath(F,new DOMMatrix(k));var V=new Path2D;return V.addPath(j,new DOMMatrix([Math.cos(H)*B,Math.sin(H)*B,-Math.sin(H)*q,Math.cos(H)*q,D,I])),V}function Z(M){if(!l)throw new Error("path confetti are not supported in this browser");var k,D;typeof M=="string"?k=M:(k=M.path,D=M.matrix);var I=new Path2D(k),B=document.createElement("canvas"),q=B.getContext("2d");if(!D){for(var H=1e3,F=H,j=H,V=0,X=0,U,ee,oe=0;oe<H;oe+=2)for(var W=0;W<H;W+=2)q.isPointInPath(I,oe,W,"nonzero")&&(F=Math.min(F,oe),j=Math.min(j,W),V=Math.max(V,oe),X=Math.max(X,W));U=V-F,ee=X-j;var fe=10,ye=Math.min(fe/U,fe/ee);D=[ye,0,0,ye,-Math.round(U/2+F)*ye,-Math.round(ee/2+j)*ye]}return{type:"path",path:k,matrix:D}}function be(M){var k,D=1,I="#000000",B='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof M=="string"?k=M:(k=M.text,D="scalar"in M?M.scalar:D,B="fontFamily"in M?M.fontFamily:B,I="color"in M?M.color:I);var q=10*D,H=""+q+"px "+B,F=new OffscreenCanvas(q,q),j=F.getContext("2d");j.font=H;var V=j.measureText(k),X=Math.ceil(V.actualBoundingBoxRight+V.actualBoundingBoxLeft),U=Math.ceil(V.actualBoundingBoxAscent+V.actualBoundingBoxDescent),ee=2,oe=V.actualBoundingBoxLeft+ee,W=V.actualBoundingBoxAscent+ee;X+=ee+ee,U+=ee+ee,F=new OffscreenCanvas(X,U),j=F.getContext("2d"),j.font=H,j.fillStyle=I,j.fillText(k,oe,W);var fe=1/D;return{type:"bitmap",bitmap:F.transferToImageBitmap(),matrix:[fe,0,0,fe,-X*fe/2,-U*fe/2]}}t.exports=function(){return R().apply(this,arguments)},t.exports.reset=function(){R().reset()},t.exports.create=$,t.exports.shapeFromPath=Z,t.exports.shapeFromText=be})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),Bi,!1);const Ze=Bi.exports;Bi.exports.create;class Na{burst({x:e,y:t,color:i="#ffd166",count:n=20,spread:r=50,startVelocity:l=22}){try{Ze({particleCount:n,spread:r,startVelocity:l,ticks:60,origin:{x:e/window.innerWidth,y:t/window.innerHeight},colors:[i,"#fff8ec","#ffc971"],shapes:["circle","square"],scalar:.7})}catch{}}celebrate({count:e=140,spread:t=80}={}){try{Ze({particleCount:e,spread:t,origin:{y:.55},colors:["#e63946","#f4a261","#ffc971","#b5c99a","#457b9d","#9b5de5"]})}catch{}}fountain({x:e,y:t,color:i="#ffd166",count:n=60}){try{const r={x:e/window.innerWidth,y:t/window.innerHeight};Ze({particleCount:n/2,angle:60,spread:55,origin:r,colors:[i,"#fff8ec"],startVelocity:35}),Ze({particleCount:n/2,angle:120,spread:55,origin:r,colors:[i,"#fff8ec"],startVelocity:35})}catch{}}confettiFromSides({count:e=50}={}){try{Ze({particleCount:e,angle:60,spread:55,origin:{x:0,y:.7}}),Ze({particleCount:e,angle:120,spread:55,origin:{x:1,y:.7}})}catch{}}firework({x:e,y:t,color:i="#ffd166"}={}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};Ze({particleCount:30,spread:360,startVelocity:25,origin:n,colors:[i,"#fff8ec","#ffc971","#9b5de5"],scalar:.8})}catch{}}drop({x:e,y:t,color:i="#a8dadc"}={}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};Ze({particleCount:12,spread:25,startVelocity:18,origin:n,colors:[i,"#fff8ec","#5fa8b5"],scalar:.5})}catch{}}}const Ht=new Na,Qs=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Ra=36,Ks=["C4","D4","E4","F4","G4","A4","B4"],Ia=["B4","A4","G4","F4","E4","D4","C4"],Ba=new Set(["sol","la","si"]),wn=["完美!","真棒!","不错哟!","完整 7 音在聚集!"];function Fa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=7);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Oa(s.stage),s.say("爬上树屋看完整 7 音阶! Fa 和 Si 是新的朋友~ 拖鱼到对应台阶 (Do 最低 → Si 最高)"),s.fishPool=new Ls(s.stage,Qs),s.fishPool.setDragEnabled(!0),s.fishPool.intro();const n=["do","re","mi","fa","sol","la","si"];s._level7Placed=new Set,s._level7Count=0,s.fishPool.onTap=l=>{if(l){try{s.audio.playNote(l.dataset.pitch)}catch{}try{s.audio.hover(l.dataset.id)}catch{}N.fromTo(l,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})}},s.fishPool.onDragStart=l=>{try{s.audio.hover(l.dataset.id)}catch{}},s.fishPool.onDragMove=()=>{},s.fishPool.onDrop=(l,o,a)=>{const d=l.dataset.id;if(s._level7Placed.has(d))return;const c=l.getBoundingClientRect(),m=c.left+c.width/2,f=c.top+c.height/2;let y=null,g=1/0;if(s.scene&&s.scene.background)for(const p of n){const _=s.scene.background.querySelector(`.level7-step[data-note="${p}"]`);if(!_)continue;const v=_.getBoundingClientRect(),b=v.left+v.width/2,x=v.top+v.height/2,S=Math.hypot(b-m,x-f);S<g&&(g=S,y=p)}const u=y&&g<Ra,h=Qs.find(p=>p.id===d);if(u&&d===y){s._level7Placed.add(d),s._level7Count=s._level7Placed.size;try{s.audio.correct()}catch{}const p=s.scene.background.querySelector(`.level7-step[data-note="${y}"]`),_=p.getBoundingClientRect(),v=_.left+_.width/2,b=_.top+_.height/2,x=parseFloat(l.style.left)||0,S=parseFloat(l.style.top)||0,w=v-c.left-x,L=b-c.top-S,T=h&&h.color||"#ffd166";try{s.scene.drawRibbon(y,{x:m,y:f},{x:v,y:b},T)}catch{}N.to(l,{x:w,y:L,scale:.85,duration:.55,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(d)}catch{}try{p.style.setProperty("--step-lit-color",T),p.classList.add("level7-step-lit")}catch{}try{Ht.fountain({x:v,y:b,color:T})}catch{}try{N.fromTo(p,{scale:1},{scale:1.25,duration:.3,yoyo:!0,repeat:1,ease:"power2.out"})}catch{}if(h){try{s.audio.playNote(h.pitch)}catch{}try{s._floatScore(m,f,`${h.solfege} ✓`)}catch{}}try{setTimeout(()=>{try{s.audio.hover(d)}catch{}},220)}catch{}try{const E=s.scene.background.querySelector(".level7-birds path");E&&N.fromTo(E,{y:0},{y:-6,duration:.12,yoyo:!0,repeat:3,ease:"sine.inOut",overwrite:!0})}catch{}if(N.to(l,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>N.to(l,{rotation:0,duration:.2,ease:"power2.out"})}),N.fromTo(l,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),Ba.has(y)){try{const E=l;E.classList.add("level7-fish-lift"),setTimeout(()=>{try{E.classList.remove("level7-fish-lift")}catch{}},900)}catch{}try{p.classList.add("level7-step-glow")}catch{}}const C=wn[Math.min(s._level7Count-1,wn.length-1)]+" "+s._level7Count+" / 7";s.say(C),s._level7Count===7&&setTimeout(()=>r(),800)}})}else{s.wrongCount++;try{s.audio.wrong()}catch{}if(l.classList.add("shake"),setTimeout(()=>l.classList.remove("shake"),400),u&&y&&d!==y){const p=Qs.find(v=>v.id===y),_=y==="fa"?"Fa 在 Mi 和 Sol 之间 (第 4 级台阶)":y==="si"?"Si 在 La 之上, 最高一级台阶 (最接近树屋)":`${p?p.solfege:"这个台阶"}`;s.say(`${h?h.solfege:"这条鱼"} 不是 ${_} 的鱼哦~`)}else d==="fa"?s.say("Fa 是新朋友! 它在 Mi 和 Sol 之间的台阶~"):d==="si"?s.say("Si 是新朋友! 它在 La 之上, 最高的台阶, 最接近树屋~"):s.say(`${h?h.solfege:"这条鱼"} 的家在树上, 找最近的圆圈~`);N.to(l,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}};function r(){const l=s._calcStars();try{s.progress.markLevelComplete(7,l)}catch{}try{s.scene.lightTreehouse()}catch{}try{s.audio.playScale(Ks)}catch{}s.say("完整的 Do Re Mi Fa Sol La Si 上行! 太棒了~"),setTimeout(()=>{try{s.audio.playScale(Ia)}catch{}s.say("再来下行: Si La Sol Fa Mi Re Do")},Ks.length*220+300),setTimeout(()=>{try{s.showWinOverlay(l,7)}catch{}},Ks.length*220*2+1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}if(s.fishPool)try{s.fishPool.pool.innerHTML=""}catch{}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const qa=Object.freeze(Object.defineProperty({__proto__:null,default:Fa},Symbol.toStringTag,{value:"Module"}));class Ha{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level8-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,e.querySelectorAll(".level8-song-card").forEach(r=>{r.addEventListener("click",()=>{const l=r.dataset.song,o=i.find(a=>a.id===l);o&&typeof t=="function"&&t(o)})})}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Zs={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},He=80,Ga={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function Wa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=8);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const n=document.createElement("style");n.dataset.levelStyle="8",n.textContent=`
    #stage { --lv8-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
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
  `,document.head.appendChild(n),s.scene=new Ha(s.stage),s.say("森林音乐会开始! 选一首曲子~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level8-song-stage"></div>');const r=s.stage.querySelector(".level8-song-stage"),l="fps_level8_played_v1";function o(){try{const _=localStorage.getItem(l);if(!_)return new Set;const v=JSON.parse(_);return new Set(Array.isArray(v)?v:[])}catch{return new Set}}function a(_){const v=o();v.add(_);try{localStorage.setItem(l,JSON.stringify(Array.from(v)))}catch{}}o().size>=6&&r.insertAdjacentHTML("beforeend",'<div class="level8-all-played-badge">🎖 全部演奏!</div>'),s.scene.showSongSelector(r,_=>u(_)),s.kb=new gt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level8Seq=null,s._level8Idx=0,s._level8Total=0,s._level8Correct=0,s._level8Accepting=!1,s._level8Done=!1,s._level8Timeouts=[];let c=null,m=null;function f(){const _=document.getElementById("level8-audience");_&&(_.classList.remove("level8-cheer"),_.getBoundingClientRect(),_.classList.add("level8-cheer"),clearTimeout(m),m=setTimeout(()=>_.classList.remove("level8-cheer"),700))}function y(){s.stage.insertAdjacentHTML("beforeend",'<div class="level8-staff-area"></div>'),c=s.stage.querySelector(".level8-staff-area"),c.innerHTML=`
      <svg class="level8-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
        <line class="level8-staff-line" x1="40" y1="${He+40}" x2="760" y2="${He+40}" />
        <line class="level8-staff-line" x1="40" y1="${He+60}" x2="760" y2="${He+60}" />
        <line class="level8-staff-line" x1="40" y1="${He+80}" x2="760" y2="${He+80}" />
        <line class="level8-staff-line" x1="40" y1="${He+100}" x2="760" y2="${He+100}" />
        <line class="level8-staff-line" x1="40" y1="${He+120}" x2="760" y2="${He+120}" />
        <circle class="level8-current-note" cx="400" cy="0" r="16" fill="#ffd166" />
      </svg>
    `}function g(){return c?c.querySelector(".level8-current-note"):null}function u(_){r&&(r.innerHTML=`
        <div class="level8-now-playing">
          <div class="level8-playing-badge">🎼 正在演奏</div>
          <div class="level8-now-emoji">${_.emoji}</div>
          <div class="level8-now-text">演奏: <strong>${_.name}</strong></div>
          <div class="level8-difficulty-badge level8-diff-${_.difficulty}">难度 ${_.diff}</div>
          <div class="level8-progress">1 / ${_.melody.length}</div>
        </div>
      `),c||y(),s.say(`演奏《${_.name}》! 跟着音符按琴键~`),a(_.id),s._level8Song=_,s._level8Seq=[..._.melody],s._level8Total=s._level8Seq.length,s._level8Correct=0,s._level8Idx=0,s._level8Accepting=!1,s._level8Done=!1,setTimeout(h,800)}function h(){if(s._level8Done||s._level8Idx>=s._level8Seq.length)return;const _=s._level8Seq[s._level8Idx],v=Zs[_],b=Ga[v.id],x=g();x&&(N.killTweensOf(x),N.set(x,{scale:1,opacity:1}),x.setAttribute("cy",b),x.dataset.pitch=_,x.classList.remove("incorrect"),s.say(`下一个: ${v.solfege} (${_})`),s._level8Accepting=!0,N.fromTo(x,{attr:{cy:b}},{attr:{cy:b+100},duration:4.5,ease:"none",onComplete:()=>{if(!s._level8Done&&s._level8Accepting){s._level8Accepting=!1,s.wrongCount++;try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),x.classList.add("incorrect"),setTimeout(()=>{x.classList.remove("incorrect"),s._level8Idx++,h()},600)}}}))}s.kb.onPress=_=>{if(!s._level8Accepting||s._level8Done||!s._level8Seq||s._level8Idx>=s._level8Seq.length)return;const v=s._level8Seq[s._level8Idx],b=_.dataset.pitch;if(b===v){s._level8Correct++,s._level8Accepting=!1;try{s.audio.correct()}catch{}try{s.audio.playNote(b)}catch{}const x=g();if(x&&(N.killTweensOf(x),N.to(x,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),r){const w=r.querySelector(".level8-progress");w&&(w.textContent=`${s._level8Idx+1} / ${s._level8Total}`)}f();const S=["完美!","森林在听!","真棒!"];s.say(S[Math.min(s._level8Correct-1,S.length-1)]),s._level8Idx++,s._level8Idx>=s._level8Seq.length?(s._level8Done=!0,s._level8Timeouts.push(setTimeout(p,800))):setTimeout(h,500)}else{s.wrongCount++;try{s.audio.wrong()}catch{}const x=Zs[b];s.say(`这是 ${x?x.solfege:"?"}, 不是 ${Zs[v].solfege}. 再听一下!`);const S=g();S&&S.classList.add("incorrect"),setTimeout(()=>{S&&S.classList.remove("incorrect")},300);try{s.audio.playNote(v)}catch{}}};function p(){const _=s._level8Song,v=_&&_.difficulty||1,b=s.wrongCount||0;let x;v<=1?x=s._calcStars&&s._calcStars()||(b<=0?3:b<=2?2:b<=5?1:0):v===2?x=b<=0?3:b<=3?2:b<=7?1:0:x=b<=1?3:b<=4?2:b<=9?1:0;try{s.progress.markLevelComplete(8,x)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}if(typeof s._flashScreen=="function")try{s._flashScreen()}catch{}if(typeof s._floatScore=="function")try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,"🎉 完美的表演! 🎉")}catch{}s.say("完美的表演! 森林在为你鼓掌!"),setTimeout(()=>{try{s.showWinOverlay(x,8)}catch{}},1200),s.stage.insertAdjacentHTML("beforeend",`
      <div class="level8-snapshot-panel">
        <button class="level8-snapshot-btn" id="level8-snapshot-btn"
                title="保存成就">📸</button>
        <div class="level8-completed-stamp" id="level8-completed-stamp">
          ✅ 完成啦!
        </div>
      </div>
    `),setTimeout(()=>{const w=document.getElementById("level8-completed-stamp");w&&w.classList.add("show")},600);const S=document.getElementById("level8-snapshot-btn");S&&(S.onclick=()=>{S.classList.add("clicked");const w=document.getElementById("level8-completed-stamp");w&&(w.textContent="🎉 成就已记录! 🎉",w.classList.add("show"));try{s.say("🎉 成就已记录!")}catch{}setTimeout(()=>S.classList.remove("clicked"),400)})}return()=>{if(Array.isArray(s._level8Timeouts)&&(s._level8Timeouts.forEach(x=>clearTimeout(x)),s._level8Timeouts=[]),clearTimeout(m),n&&n.parentNode&&n.remove(),s._level8Song=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level8-song-stage, .level8-staff-area, .level8-snapshot-panel").forEach(x=>x.remove());const _=document.getElementById("hud-level2");_&&(_.style.display="none");const v=document.querySelector(".hud__dots");v&&(v.style.display="");const b=document.getElementById("btn-replay");b&&(b.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const ja=Object.freeze(Object.defineProperty({__proto__:null,default:Wa},Symbol.toStringTag,{value:"Module"}));class za{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level9-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${de}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const Xs=[{id:"cs",solfege:"Do#",pitch:"C#4"},{id:"ds",solfege:"Re#",pitch:"D#4"},{id:"fs",solfege:"Fa#",pitch:"F#4"},{id:"gs",solfege:"Sol#",pitch:"G#4"},{id:"as",solfege:"La#",pitch:"A#4"}];function kn(s,e,t,i="rgba(155, 93, 229, 0.7)"){const n=document.createElement("span");n.className="level9-touch-ripple",n.style.left=`${e}px`,n.style.top=`${t}px`,n.style.borderColor=i,s.appendChild(n),n.offsetWidth,n.classList.add("go"),setTimeout(()=>n.remove(),750)}function Js(s,e){const t=document.createElement("div");t.className="level9-combo-float",t.textContent=e;const i=(Math.random()-.5)*120;t.style.left=`calc(50% + ${i}px)`,t.style.top="38%",s.appendChild(t),setTimeout(()=>t.remove(),1200)}function Va(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[1046.5,1318.51,1567.98].forEach((n,r)=>{const l=t+r*.05,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(n,l);const a=e.createGain();a.gain.setValueAtTime(1e-4,l),a.gain.exponentialRampToValueAtTime(.45,l+.008),a.gain.exponentialRampToValueAtTime(1e-4,l+.25),o.connect(a).connect(s._masterGain),o.start(l),o.stop(l+.3)})}catch{}}function Ya(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=9);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.scene=new za(s.stage),s.say("黑键朋友们也想被听见! 按从左到右的顺序听"),s.stage.insertAdjacentHTML("beforeend",'<div class="level9-keys-container"></div>');const i=s.stage.querySelector(".level9-keys-container"),n=document.createElement("div");n.className="level9-combo-meter",n.innerHTML='<span class="level9-combo-meter__num">0</span><span class="level9-combo-meter__x">x</span><span class="level9-combo-meter__label">连击</span>',n.style.display="none",i.appendChild(n);const r=n.querySelector(".level9-combo-meter__num");Xs.forEach((a,d)=>{const c=document.createElement("button");c.className="level9-key",c.dataset.id=a.id,c.dataset.pitch=a.pitch,c.innerHTML=`
      <div class="level9-key__label">${a.solfege}</div>
      <div class="level9-key__ripple"></div>
    `,i.appendChild(c),c.addEventListener("pointerdown",m=>{const f=c.getBoundingClientRect(),y=m.clientX-f.left,g=m.clientY-f.top;c.classList.add("pressed"),setTimeout(()=>c.classList.remove("pressed"),300),s.audio.playNote(a.pitch),a.id===Xs[s._level9Idx].id?(s._level9Idx++,s._level9Correct++,N.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1},{scale:3,opacity:0,duration:.6,ease:"power2.out"}),kn(c,y,g,"rgba(155, 93, 229, 0.85)"),s._level9Combo=(s._level9Combo||0)+1,s._level9Combo>=2&&(n.style.display="",r.textContent=String(s._level9Combo),n.classList.remove("bump"),n.offsetWidth,n.classList.add("bump"),Js(s.stage,`x${s._level9Combo}${s._level9Combo>=5?" 🔥":""}`),s._level9Combo>=5&&s._level9Combo%5===0&&Va(s.audio)),s.say(["对!","完美!","真棒!"][Math.min(s._level9Correct-1,2)]),s._level9Idx>=Xs.length&&(s._level9Done=!0,s._level9Combo>=2&&Js(s.stage,`🎉 x${s._level9Combo} 全连!`),setTimeout(()=>{const u=Math.max(1,3-Math.floor(s.wrongCount/2));try{s.progress.markLevelComplete(9,u)}catch{}s.audio.playScale(["C#4","D#4","F#4","G#4","A#4"]),s.showWinOverlay(u,9)},800))):(s.wrongCount++,s.audio.wrong(),c.classList.add("shake"),setTimeout(()=>c.classList.remove("shake"),400),N.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1,backgroundColor:"#ff5252"},{scale:2.5,opacity:0,duration:.5,ease:"power2.out"}),kn(c,y,g,"rgba(255, 82, 82, 0.9)"),s._level9Combo&&s._level9Combo>=2&&Js(s.stage,"断啦 💔"),s._level9Combo=0,n.style.display="none",n.classList.remove("bump"),s.say("从左到右! 不对, 重来"),s._level9Idx=0)})}),s._level9Idx=0,s._level9Correct=0,s._level9Done=!1,s._level9Combo=0;const l=s.stage.querySelector(".level9-background");l&&l.classList.add("beat-pulse");const o=()=>{l&&l.classList.remove("beat-pulse"),n.classList.remove("bump"),n.style.display="none"};return()=>{o(),s.scene&&s.scene.teardown(),s.stage.querySelectorAll(".level9-keys-container").forEach(d=>d.remove()),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ua=Object.freeze(Object.defineProperty({__proto__:null,default:Ya},Symbol.toStringTag,{value:"Module"})),Tn=1400,Qa=260,ys=80,Xe=160,pt=(Xe-ys)/4,Cs=Xe+pt,Ka=(Xe+Cs)/2,Za={mi:Xe,fa:Xe-pt/2,sol:Xe-pt,la:Xe-pt*1.5,si:Xe-pt*2,re:Ka,do:Cs};class Xa{constructor(e,t){this.root=e,this.notes=t,this.filled=new Set,this.render()}render(){const e=document.createElement("div");e.className="staff-wrap stage__staff-area";const t=[0,1,2,3,4].map(l=>`<line class="staff__line" x1="80" y1="${ys+l*pt}" x2="${Tn-20}" y2="${ys+l*pt}"/>`).join(""),i=200,n=`<line class="staff__ledger" x1="${i-30}" y1="${Cs}" x2="${i+30}" y2="${Cs}"/>`,r=this.notes.map((l,o)=>{const a=200+o*130,d=Za[l.id]??ys;return`
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
      <svg class="staff" xmlns="${de}" viewBox="0 0 ${Tn} ${Qa}"
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
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.slots=new Map,this.svg.querySelectorAll(".staff-slot").forEach(l=>{this.slots.set(l.dataset.id,l)})}fillNote(e){if(this.filled.has(e))return;this.filled.add(e);const t=this.slots.get(e);if(!t)return;const i=this.notes.find(o=>o.id===e);if(!i)return;const n=t.querySelector(".staff__dot");if(!n)return;n.classList.remove("empty"),n.setAttribute("r","23"),n.style.fill=i.color,t.classList.add("filled"),t.querySelectorAll(".staff__label").forEach(o=>o.style.visibility="visible");const r=t.querySelector(".staff__placeholder-ring");r&&(r.style.display="none");const l=t.querySelector(".staff__placeholder-label");l&&(l.style.display="none")}showHint(e){this.clearHint();const t=this.slots.get(e);!t||this.filled.has(e)||t.classList.add("hint")}clearHint(){this.svg.querySelectorAll(".staff-slot.hint").forEach(e=>{e.classList.remove("hint")})}setTarget(e){if(this.clearTarget(),!e)return;const t=this.slots.get(e);if(!t||this.filled.has(e))return;t.classList.add("targeting");const i=this.notes.findIndex(n=>n.id===e);if(i>0){const n=this.notes[i-1].id,r=this.slots.get(n);r&&!this.filled.has(n)&&r.classList.add("targeting-adjacent")}if(i>=0&&i<this.notes.length-1){const n=this.notes[i+1].id,r=this.slots.get(n);r&&!this.filled.has(n)&&r.classList.add("targeting-adjacent")}}clearTarget(){this.svg.querySelectorAll(".staff-slot.targeting, .staff-slot.targeting-adjacent").forEach(e=>{e.classList.remove("targeting","targeting-adjacent")})}flashFill(e){const t=this.slots.get(e);t&&(t.classList.add("filling"),setTimeout(()=>{try{t.classList.remove("filling")}catch{}},900))}reset(){this.filled.clear(),this.svg.querySelectorAll(".staff-slot").forEach(e=>{e.classList.remove("filled","hint","targeting","targeting-adjacent","filling");const t=e.querySelector(".staff__dot");t&&(t.classList.add("empty"),t.setAttribute("r","20"),t.style.fill=""),e.querySelectorAll(".staff__label").forEach(r=>r.style.visibility="hidden");const i=e.querySelector(".staff__placeholder-ring");i&&(i.style.display="");const n=e.querySelector(".staff__placeholder-label");n&&(n.style.display="")})}}const Sn="forest-piano-achievements",us=[{id:"first-graduate",name:"🎓 毕业生",desc:"完成任意一关",emoji:"🎓",check:s=>(s.completedLevels||[]).length>=1},{id:"forest-master",name:"🏆 森林大师",desc:"完成全部 8 关",emoji:"🏆",check:s=>{const e=(s.completedLevels||[]).map(String);return[1,2,3,4,5,6,7,8].every(t=>e.includes(String(t)))}},{id:"perfect-pitch",name:"⭐ 完美演奏",desc:"获得任一关 3 颗星",emoji:"⭐",check:s=>Object.values(s.stars||{}).some(e=>Number(e)>=3)},{id:"diamond-ear",name:"💎 钻石之耳",desc:"全部 8 关都获得 3 颗星",emoji:"💎",check:s=>{const e=s.stars||{};return[1,2,3,4,5,6,7,8].every(t=>Number(e[t]||0)>=3)}},{id:"repeat-master",name:"🔁 重复高手",desc:"累计完成 10 次关卡 (含重玩)",emoji:"🔁",check:s=>Number(s.totalCompletions||0)>=10},{id:"treehouse-climber",name:"🌳 树屋登顶",desc:"完成第 7 关 (完整 7 音阶)",emoji:"🌳",check:s=>(s.completedLevels||[]).map(String).includes("7")},{id:"concert-master",name:"🎵 音乐家",desc:"完成第 8 关 (音乐会)",emoji:"🎵",check:s=>(s.completedLevels||[]).map(String).includes("8")},{id:"drumming-kid",name:"🥁 小鼓手",desc:"完成第 4 关 (节奏)",emoji:"🥁",check:s=>(s.completedLevels||[]).map(String).includes("4")},{id:"mountaineer",name:"🏔️ 山谷行者",desc:"完成第 3 关 (五声音阶)",emoji:"🏔️",check:s=>(s.completedLevels||[]).map(String).includes("3")},{id:"two-hands",name:"🎹 双手钢琴家",desc:"完成第 6 关 (双手协调)",emoji:"🎹",check:s=>(s.completedLevels||[]).map(String).includes("6")},{id:"starter",name:"🌱 萌芽",desc:"完成第 1 关 (入门)",emoji:"🌱",check:s=>(s.completedLevels||[]).map(String).includes("1")},{id:"listener",name:"👂 敏锐耳朵",desc:"完成第 2 关 (听音找鱼)",emoji:"👂",check:s=>(s.completedLevels||[]).map(String).includes("2")}];class Ja{constructor(e){this.progress=e,this.state=this._load(),this.unlocked=new Set(this.state.unlockedIds),this._backfill()}_load(){try{if(typeof localStorage>"u")return{unlockedIds:[]};const e=localStorage.getItem(Sn);if(e){const t=JSON.parse(e);if(t&&Array.isArray(t.unlockedIds))return t}}catch{}return{unlockedIds:[]}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Sn,JSON.stringify({unlockedIds:Array.from(this.unlocked)}))}catch{}}_backfill(){if(!this.progress)return;let e=!1;try{const t=this.progress.getSnapshot();for(const i of us)this.unlocked.has(i.id)||i.check(t)&&(this.unlocked.add(i.id),e=!0);e&&this._save()}catch{}}checkAndUnlock(){let e;try{e=this.progress?this.progress.getSnapshot():null}catch{e=null}if(!e)return[];const t=[];for(const i of us)if(!this.unlocked.has(i.id))try{i.check(e)&&(this.unlocked.add(i.id),t.push(i))}catch{}return t.length>0&&this._save(),t}has(e){return this.unlocked.has(e)}getAll(){return us.map(e=>({...e,unlocked:this.unlocked.has(e.id)}))}getProgressPercent(){const e=us.length;return Math.round(this.unlocked.size/e*100)}getUnlockedCount(){return this.unlocked.size}reset(){this.unlocked=new Set,this._save()}}class ec{static show(e,t={}){if(!e)return;const i=Math.max(1500,Number(t.durationMs)||4500),n=document.querySelector(`.achievement-toast[data-id="${tc(e.id||"")}"]`);n&&n.remove();const r=document.createElement("div");r.className="achievement-toast",e.id&&(r.dataset.id=e.id),r.setAttribute("role","status"),r.setAttribute("aria-live","polite"),r.innerHTML=`
      <div class="achievement-toast__icon">${e.emoji||"🏅"}</div>
      <div class="achievement-toast__body">
        <div class="achievement-toast__title">成就解锁!</div>
        <div class="achievement-toast__name">${Ln(e.name||"")}</div>
        ${e.desc?`<div class="achievement-toast__desc">${Ln(e.desc)}</div>`:""}
      </div>
    `,document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add("show")}),setTimeout(()=>{r.classList.remove("show"),r.classList.add("hide"),setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},500)},i)}}function Ln(s){return s==null?"":String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function tc(s){return String(s).replace(/[^a-zA-Z0-9_-]/g,"_")}class sc{constructor(e){this.stage=e,this.canvas=null,this.ctx=null,this.analyser=null,this.dataArray=null,this._running=!1}init(e){if(!(!e||!e._webAudio))try{this.analyser=e._webAudio.createAnalyser(),this.analyser.fftSize=256,e._masterGain.connect(this.analyser),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount)}catch{}}show(){this.hide()}hide(){this._running=!1,this.canvas&&this.canvas.parentNode&&(this.canvas.parentNode.removeChild(this.canvas),this.canvas=null)}_loop(){if(!this._running||!this.canvas||(requestAnimationFrame(()=>this._loop()),!this.analyser))return;this.analyser.getByteTimeDomainData(this.dataArray);const e=this.canvas.width,t=this.canvas.height;this.ctx.clearRect(0,0,e,t),this.ctx.strokeStyle="rgba(255, 209, 102, 0.5)",this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(0,t/2),this.ctx.lineTo(e,t/2),this.ctx.stroke(),this.ctx.lineWidth=2,this.ctx.strokeStyle="#ffd166",this.ctx.beginPath();const i=e/this.dataArray.length;let n=0;for(let r=0;r<this.dataArray.length;r++){const o=this.dataArray[r]/128*t/2;r===0?this.ctx.moveTo(n,o):this.ctx.lineTo(n,o),n+=i}this.ctx.stroke()}}class Cn{constructor(e){this.root=e,this.render()}render(){const e=document.createElement("div");e.className="bg",e.style.cssText=`
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
    `,this.root.appendChild(e)}}class ic{constructor(e,t={}){this.root=e,this.opts=t||{},this.audio=t.audio||null,this.defaultHint=t.hint||"我帮你找五线谱位置~ 点我一下试试",this.hintTimer=null,this.waveTimer=null,this.sleepTimer=null,this._render(),this._wireInteractions(),this._startIdleLoop(),setTimeout(()=>this.setHint(this.defaultHint),600)}_render(){const e=document.createElement("div");e.className="pip",e.innerHTML=`
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
    `,this.root.appendChild(e),this.element=e,this.bubble=e.querySelector(".pip-speech-bubble"),this.tapTarget=e.querySelector(".pip-tap")}_wireInteractions(){const e=t=>{t.preventDefault?.(),t.stopPropagation?.(),this.react("chip"),this._chirp()};this.tapTarget.addEventListener("click",e),this.tapTarget.addEventListener("touchstart",e,{passive:!1})}_startIdleLoop(){const e=()=>{const t=8e3+Math.random()*6e3;this.waveTimer=setTimeout(()=>{this.react("wave"),e()},t)};e()}react(e){if(!this.element||this.element.classList.contains(`pip-${e}`))return;this.element.classList.add(`pip-${e}`);const t={wave:900,cheer:700,chip:600,sleep:3e3,think:4e3}[e]||700;setTimeout(()=>{this.element.classList.remove(`pip-${e}`)},t)}setHint(e,t=3200){if(this.bubble){if(this.hintTimer&&(clearTimeout(this.hintTimer),this.hintTimer=null),e)this.bubble.textContent=e,this.bubble.classList.add("show");else{this.bubble.classList.remove("show");return}this.hintTimer=setTimeout(()=>{this.bubble.classList.remove("show"),this.hintTimer=null},t)}}_chirp(){if(this.audio){try{this.audio.hover()}catch{}return}try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this._ctx||(this._ctx=new e);const t=this._ctx,i=t.currentTime,n=t.createOscillator(),r=t.createGain();n.type="triangle",n.frequency.setValueAtTime(900,i),n.frequency.exponentialRampToValueAtTime(600,i+.12),r.gain.setValueAtTime(.001,i),r.gain.exponentialRampToValueAtTime(.22,i+.02),r.gain.exponentialRampToValueAtTime(.001,i+.18),n.connect(r).connect(t.destination),n.start(i),n.stop(i+.2)}catch{}}destroy(){if(this.waveTimer&&clearTimeout(this.waveTimer),this.sleepTimer&&clearTimeout(this.sleepTimer),this.hintTimer&&clearTimeout(this.hintTimer),this._ctx){try{this._ctx.close()}catch{}this._ctx=null}this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}}const Mn="forest-piano-last-level",nc={"drag-up":"⬆️🐟","listen-pick":"🎵🐟","mountain-sort":"🏔️🎵","drum-rhythm":"🥁🫧","staff-fall":"⭐🎼","two-hand":"🖐️🎹","treehouse-build":"🌳🏠","concert-stage":"🎭🎶","black-keys":"🖤🎹","octave-pick":"🎹⇅","memory-match":"🎴🃏","tempo-cut":"🥁🍅","metronome-tap":"⏱️🥁","chord-build":"🎶🐟","staff-read":"🎼⚡","speed-ramp":"🚀⚡"},yi=[{id:1,name:"小鱼跳进五线谱",emoji:"🐟",desc:"帮 7 条小鱼找到五线谱的家",theme:"#5fa8b5",mechanic:"drag-up"},{id:2,name:"听!是谁在唱",emoji:"🎵",desc:"系统播音, 找出对应的鱼",theme:"#264653",mechanic:"listen-pick"},{id:3,name:"Mi-Sol 山谷",emoji:"🏔️",desc:"柯尔文爷爷教五声音阶",theme:"#e76f51",mechanic:"mountain-sort"},{id:4,name:"节奏小河",emoji:"🥁",desc:"跟着节拍泡泡敲鼓",theme:"#1a3a4a",mechanic:"drum-rhythm"},{id:5,name:"小星星视奏",emoji:"⭐",desc:"跟着五线谱弹小星星",theme:"#2a2050",mechanic:"staff-fall"},{id:6,name:"双手协调",emoji:"🎹",desc:"钢琴老师教双手按双音",theme:"#d4a574",mechanic:"two-hand"},{id:7,name:"树屋 7 音阶",emoji:"🌳",desc:"爬上树屋看完整七音阶",theme:"#65a30d",mechanic:"treehouse-build"},{id:8,name:"森林音乐会",emoji:"🎭",desc:"选曲并演奏森林音乐会",theme:"#3d0a55",mechanic:"concert-stage"},{id:9,name:"黑键世界",emoji:"🖤",desc:"听声, 按顺序点黑键",theme:"#2a0a55",mechanic:"black-keys"},{id:10,name:"八度之旅",emoji:"🎹",desc:"听音 — 是低八度还是高八度?",theme:"#1e3a5f",mechanic:"octave-pick"},{id:11,name:"翻牌记忆",emoji:"🎴",desc:"翻开两张牌找一样的朋友",theme:"#d96e8a",mechanic:"memory-match"},{id:12,name:"番茄节奏",emoji:"🥁",desc:"跟着摆杆切菜 — 命中节拍!",theme:"#c0392b",mechanic:"tempo-cut"},{id:13,name:"节奏大师",emoji:"⏱️",desc:"跟随节拍器逐渐加速,敲准 30 拍",theme:"#8b4513",mechanic:"metronome-tap"},{id:14,name:"和弦建造",emoji:"🎶",desc:"拖三只鱼组成 C 大调",theme:"#9b5de5",mechanic:"chord-build"},{id:15,name:"视奏大师",emoji:"🎼",desc:"快速读谱 + 按键",theme:"#457b9d",mechanic:"staff-read"},{id:16,name:"节奏阶梯",emoji:"🚀",desc:"速度阶梯挑战",theme:"#f4a261",mechanic:"speed-ramp"}];class rc{constructor(e,{progress:t,onSelect:i}){this.stage=e,this.progress=t,this.onSelect=i,this.element=null}show(){const e=document.createElement("div");e.className="level-map-overlay",e.innerHTML=`
      <div class="level-map-card">
        <div class="level-map-title">🌳 森林钢琴学校 🎹</div>
        <div class="level-map-subtitle">选一个关卡开始~</div>
        <div class="level-map-grid">
          ${yi.map(i=>{const n=this.progress?this.progress.getStars(i.id):0,r=n>0?"⭐".repeat(n)+"☆".repeat(3-n):"☆☆☆",l=nc[i.mechanic]||"",o=i.id<=7?["Do","Re","Mi","Fa","Sol","La","Ti"][i.id-1]:"";return`
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
    `,this.stage.appendChild(e),this.element=e;let t=1;try{const i=localStorage.getItem(Mn),n=parseInt(i,10);Number.isFinite(n)&&n>=1&&n<=yi.length&&(t=n)}catch{}if(t&&t!==1){const i=e.querySelector(".level-map-card"),n=document.createElement("button");n.className="continue-btn",n.type="button",n.innerHTML=`▶ 继续上次: 第 ${t} 关`,n.addEventListener("click",()=>{this.hide(),this.onSelect&&this.onSelect(t)}),i.insertBefore(n,i.firstChild)}e.querySelectorAll(".level-map-tile").forEach(i=>{i.addEventListener("click",()=>{const n=parseInt(i.dataset.id,10);i.classList.add("selected");try{localStorage.setItem(Mn,String(n))}catch{}setTimeout(()=>{this.onSelect&&this.onSelect(n)},200)})})}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null)}}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.LEVEL_META=yi);const lc=Object.assign({"./Level1.js":jr,"./Level10.js":yo,"./Level11.js":So,"./Level12.js":Po,"./Level13.js":Oo,"./Level14.js":Ho,"./Level15.js":Yo,"./Level16.js":Zo,"./Level2.js":Jo,"./Level3.js":ha,"./Level4.js":xa,"./Level5.js":Ca,"./Level6.js":Da,"./Level7.js":qa,"./Level8.js":ja,"./Level9.js":Ua}),Ms=new Map;for(const[s,e]of Object.entries(lc)){const t=s.match(/Level(\d+)\.js$/);t&&typeof e.default=="function"&&Ms.set(parseInt(t[1],10),e.default)}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.levels=Ms);const pe=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],En=["真棒!","太厉害了~","不错哟!","加油加油!","马上就完成了!"];function oc(s,e,t,i){const n=En[Math.floor(Math.random()*En.length)],r=Math.max(0,t-e),l=[`${s} 归位啦! ${n} 还有 ${r} 条~`,`${s} 找到家啦! 🎉 还差 ${r} 条就胜利~`,`耶! ${s} 也安顿好了~ 再来 ${r} 条!`];return i>=3&&(l.push(`没关系, ${s} 归位啦! 还剩 ${r} 条, 慢慢来~`),l.push(`慢慢来, ${s} 已经回家了! 还有 ${r} 条小鱼需要帮忙~`)),r===1?l.push(`${s} 也到家啦! 只剩最后 1 条小鱼咯! ⭐`):r===2&&l.push(`${s} 找到家啦! 再坚持一下, 还有 2 条~`),l[Math.floor(Math.random()*l.length)]}function ac(s,e){if(!s||s.length===0)return"试试别的鱼, 一条一条来~";const t=Math.floor(Math.random()*s.length),i=s[t],n=["最下面那条加线","加线上面那个间","最下面那条线 (si 隔壁)","往上数第 2 条线","往中间数的那个间","中间那条线 (la 隔壁)","中间上面那条线"],l=["mi","fa","sol","la","si","re","do"].indexOf(i.id),o=l>=0?n[l]:"五线谱上的位置",a=[`试试把 ${i.solfege} 拖到 ${o}~`,`${i.solfege} 的家在 ${o} 哦~ 🌟`,`这条 ${i.solfege} 小鱼呢? 它的家在 ${o}!`,`${i.solfege} 的家在 ${o} ✨ 帮它找找~`];return e>=4&&(a.push(`别着急~ 先听 ${i.solfege} 的声音, 再把它拖到 ${o} 上哦~`),a.push(`深呼吸! 把 ${i.solfege} 小心地拖到 ${o} ✨`)),a[Math.floor(Math.random()*a.length)]}class Dr{constructor({stageEl:e,bubbleEl:t,progress:i,audio:n}){ts(this,"_lastWrongHint","");ts(this,"_lastCorrectNote","");ts(this,"_firstCorrectNote",null);this.stage=e,this.bubble=t,this.progress=i,this.audio=n,this.achievements=new Ja(this.progress),this.placed=new Set,this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this.gate=!1,this._lastActivityAt=0,this._idleNudgeScheduled=!1,this._hintTimer=null,this.waveform=new sc(this.stage),this.waveform.init(this.audio),this.waveform.show()}start({levelId:e}){if(document.querySelectorAll(".overlay, .level-map-overlay, .practice-room, .song-library, .song-demo-overlay, .song-play-overlay, .song-score-overlay, .achievements-wall, .settings-panel, .tutorial, .keyboard-help, .streak-toast").forEach(i=>i.remove()),this.fishPool&&typeof this.fishPool.destroy=="function")try{this.fishPool.destroy()}catch{}if(this.stage&&(this.stage.innerHTML=""),this.waveform&&typeof this.waveform.show=="function"&&this.waveform.show(),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this.firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.gate=!1,this._level2AnswerNote=null,this._level2Current=0,this._level2Done=new Set,typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.audio&&typeof this.audio.stop=="function")try{this.audio.stop()}catch{}const t=Ms.get(e);if(t){this._syncStageMode(e);try{const i=t(this);this._teardownCurrentLevel=typeof i=="function"?i:null}catch(i){console.error(`Level ${e} failed to start:`,i),this._syncStageMode(1),this._fallbackToLevel1()}this._updateLevelBadge(e);return}console.warn(`Level ${e} not registered, falling back to Level 1`),this._syncStageMode(1),this._startLevel1(),this._updateLevelBadge(1)}_syncStageMode(e){if(!this.stage)return;const t=e===1||e===2;this.stage.classList.toggle("stage--stack",t)}_updateLevelBadge(e){try{const t=document.getElementById("level-badge");if(!t)return;const i=window.__forestPiano?.LEVEL_META?.find(n=>n.id===e);i&&(t.textContent=`${i.emoji} 第 ${i.id} 关 · ${i.name}`)}catch{}}_fallbackToLevel1(){const e=Ms.get(1)||this._startLevel1.bind(this);try{e(this)}catch(t){console.error(t)}}_startLevel1(){this._showLevel2HUD(!1),this._level1FirstTap=!1,this._lastTapTime=0,this.say("点屏幕开始呀～"),this.bg=new Cn(this.stage),this.staff=new Xa(this.stage,pe),this.kb=new gt(this.stage,pe),this.fishPool=new Ls(this.stage,pe),this.pip=new ic(this.stage),this.fishPool.setDragEnabled(!0),this.fishPool.onDrop=(e,t,i)=>this.onFishDrop(e,t,i),this.fishPool.onDragStart=e=>{this._markActivity(),this.hasStartedDrag||(this.hasStartedDrag=!0),this.audio.hover(e.dataset.id)},this.fishPool.onDragMove=(e,t)=>{if(this._markActivity(),!!this.staff)if(t){const i=t.dataset.id;this.staff.setTarget(i),this.staff.showHint(i)}else this.staff.clearTarget(),this.staff.clearHint()},this.fishPool.onTap=e=>{if(this._level1FirstTap){if(Date.now()-(this._lastTapTime||0)<250&&this._lastTapEl===e)return}else this._level1FirstTap=!0;this._lastTapTime=Date.now(),this._lastTapEl=e,this._markActivity(),this.hasTappedFish||(this.hasTappedFish=!0,this._advanceHint("first_tap"));try{this.audio.playNote(e.dataset.pitch)}catch{}try{this.audio.hover(e.dataset.id)}catch{}N.fromTo(e,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})},this.kb.onPress=e=>{this._markActivity(),this.audio.playNote(e.dataset.pitch),this.kb.glowKey(e)},this._skipStartOverlayOnce?(this._skipStartOverlayOnce=!1,this._beginLevel()):this._showStartOverlay()}_startLevel2(){this._showLevel2HUD(!0),this.say("第二关, 听音找鱼! 系统会播一个音, 找对的小鱼~"),this.bg=new Cn(this.stage),this.kb=new gt(this.stage,pe),this.fishPool=new Ls(this.stage,pe),this.fishPool.setDragEnabled(!1),this._level2Total=5,this._level2Current=0,this._level2AnswerNote=null,this._level2Done=new Set,this.gate=!0,this._level2FirstTap=!1,this._lastTapTime=0,this.fishPool.onTap=t=>{if(this._markActivity(),!t)return;if(this._level2FirstTap){if(Date.now()-(this._lastTapTime||0)<250&&this._lastTapEl===t)return}else this._level2FirstTap=!0;this._lastTapTime=Date.now(),this._lastTapEl=t;const i=t.dataset.id;this._level2AnswerNote&&this._handleLevel2Answer(i,t)},this.fishPool.onDragStart=null,this.fishPool.onDragMove=null,this.fishPool.onDrop=null,this.kb.onPress=t=>{this._markActivity(),this.audio.playNote(t.dataset.pitch),this.kb.glowKey(t)};const e=document.getElementById("btn-replay-q");e&&(e.onclick=()=>this._replayQuestion()),this._updateHudProgress(),setTimeout(()=>this._level2NextQuestion(),800)}_handleLevel2Answer(e,t){if(e===this._level2AnswerNote){try{this.audio.correct()}catch{}this._markLevel2FishCorrect(t);const i=pe.find(n=>n.id===e);this._floatScore(window.innerWidth/2,window.innerHeight/2,(i?i.solfege:"")+" ✓"),this.say(`对啦! 这就是 ${i?i.solfege:""} 🎉`),this._level2AnswerNote=null,setTimeout(()=>this._level2NextQuestion(),1600)}else{this.wrongCount++;try{this.audio.wrong()}catch{}t.classList.add("shake"),setTimeout(()=>t.classList.remove("shake"),400),this.say(`刚才听到的是 ${this._lastPlayedSolfege}, 再找找看? 🎵`),this._replayQuestion()}}_level2NextQuestion(){if(this._level2Current++,this._level2Current>this._level2Total)return this._handleLevel2Win();const e=this._level2Done||new Set,t=pe.filter(r=>!e.has(r.id)),i=t.length?t:pe,n=i[Math.floor(Math.random()*i.length)];this._level2AnswerNote=n.id,this._lastPlayedSolfege=n.solfege,this._updateLevel2HUD(),this.say("听一听, 哪条小鱼是这个音? 🎵");try{this.audio.playNote(n.pitch)}catch{}}_replayQuestion(){if(!this._level2AnswerNote)return;const e=pe.find(t=>t.id===this._level2AnswerNote);if(e)try{this.audio.playNote(e.pitch)}catch{}}_markLevel2FishCorrect(e){this._level2Done||(this._level2Done=new Set),this._level2Done.add(e.dataset.id),e.classList.add("fish--correct"),e.style.pointerEvents="none",this._updateHudProgress()}_updateLevel2HUD(){this._updateHudProgress()}_updateHudProgress(){const e=this._level2Done?this._level2Done.size:0,t=this._level2Total||5,i=document.getElementById("level2-badge");i&&(i.textContent=`第 ${e} / ${t} 题`);const n=document.getElementById("btn-replay-q");n&&(n.style.display=this._level2Current<=t?"":"none")}_handleLevel2Win(){this.gate=!1,this._clearHintTimer();const e=this._calcStars();try{this.progress.markLevelComplete(2,e)}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{Ht.celebrate()}catch{}setTimeout(()=>this.showWinOverlay(e,2),1200)}_showLevel2HUD(e){const t=document.getElementById("hud-level2");t&&(t.style.display=e?"":"none");const i=document.querySelector(".hud__dots");i&&(i.style.display=e?"none":"");const n=document.getElementById("btn-replay");n&&(n.style.display=e?"none":"")}_showStartOverlay(){document.querySelectorAll(".overlay").forEach(i=>i.remove());const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=new rc(this.stage,{progress:this.progress,onSelect:i=>{this.audio.unlockOnGesture().catch(n=>console.warn(n)),t.hide(),this._skipStartOverlayOnce=!0,this.start({levelId:i})}});t.show()}goHome(){try{this.audio.stop()}catch{}if(typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.fishPool&&typeof this.fishPool.destroy=="function"){try{this.fishPool.destroy()}catch{}this.fishPool=null}document.querySelectorAll(".overlay, .level-map-overlay, .practice-room, .song-library, .song-demo-overlay, .song-play-overlay, .song-score-overlay, .achievements-wall, .settings-panel, .tutorial, .keyboard-help, .streak-toast").forEach(i=>i.remove()),this.stage&&(this.stage.innerHTML=""),this.stage&&this.stage.classList.remove("stage--stack"),this._showLevel2HUD(!1);const e=document.querySelector(".hud__dots");e&&(e.style.display="");const t=document.getElementById("btn-replay");if(t&&(t.style.display=""),this.placed.clear(),this.wrongCount=0,this.gate=!1,this._clearHintTimer(),typeof window<"u")try{window.__forestPiano.currentLevelId=null}catch{}this._showStartOverlay()}_beginLevel(){this.gate=!0,this._markActivity(),this.say("欢迎来到森林!🐤 点点小鱼, 听听它们的声音~"),this.fishPool.intro(),this._pulseStaff(),this._enterHint("intro")}_pulseStaff(){if(!this.staff||!this.staff.svg)return;this.staff.svg.querySelectorAll(".staff-slot").forEach((t,i)=>{setTimeout(()=>{t.classList.add("pulse-hint"),setTimeout(()=>t.classList.remove("pulse-hint"),2400)},i*100)})}_markActivity(){this._lastActivityAt=Date.now()}_clearHintTimer(){this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null)}_enterHint(e){if(!this.bubble)return;this._clearHintTimer();let t="";switch(e){case"intro":t="先把手指放在小鱼上, 听听它唱的啥 🎵",this._scheduleIdleNudge(12e3,"idle_1");break;case"hint_listen":t="先随便摸一条鱼听听它的声音吧~ 🐟",this._scheduleIdleNudge(14e3,"idle_1");break;case"first_tap":t="听到了吗? 这种声音在钢琴上也有哦! 🎹",this._scheduleIdleNudge(1e4,"idle_drag");break;case"hint_drag":t="试试长按这条鱼, 拖到上面五线谱 Do 的位置~",this._scheduleIdleNudge(1e4,"idle_drag");break;case"first_correct":{const i=this._placedOnText(this.firstCorrectNote),n=pe.length-1,r=[`${i} 找到家啦! 还有 ${n} 个要帮~`,`耶! ${i} 归位! 🎉 还有 ${n} 条小鱼等着你呢~`,`真棒! ${i} 已经回到五线谱啦! 还差 ${n} 条~`];t=r[Math.floor(Math.random()*r.length)],this._scheduleIdleNudge(12e3,"idle_keep_going");break}case"correct_subsequent":{const i=this._lastCorrectNote;t=oc(i,this.placed.size,pe.length,this.wrongCount),this._scheduleIdleNudge(14e3,"idle_keep_going");break}case"wrong_drop_near":{const i=this._lastWrongHint||"呀, 试试上面那个颜色一样的位置!";t=this.wrongCount>=2?`没关系的! ${i}`:i,this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"wrong_drop_far":{const i=["不对哟~ 拖到上面那条五线谱的家 ✨","鱼还在游呢! 帮它回到上面五线谱的家吧~","呀, 再往上一点! 五线谱在上面等着呢~"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"idle_keep_going":{const i=pe.filter(n=>!this.placed.has(n.id));t=ac(i,this.wrongCount),this._scheduleIdleNudge(12e3,"idle_hard");break}case"idle_hard":{const i=["先听一首钢琴曲怎么样? 试试底下的钢琴键吧! 🎹","需要休息吗? 听听其它音乐, 等下再来! 🎵","先随便摸鱼听听声音, 找找感觉再继续! 🐟"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(2e4,"idle_give_up");break}case"win":return;default:t=e}this.say(t),this.bubble.classList.remove("bubble--pulse"),this.bubble.offsetWidth,this.bubble.classList.add("bubble--pulse")}_advanceHint(e){switch(e){case"first_tap":this._hintTimer=setTimeout(()=>this._enterHint("hint_drag"),4500);break;case"first_correct":this._enterHint("first_correct");break;case"subsequent_correct":this._enterHint("correct_subsequent");break}}_scheduleIdleNudge(e,t){this._idleNudgeScheduled||(this._clearHintTimer(),this._hintTimer=setTimeout(()=>{if(t==="idle_1"&&!this.hasTappedFish||t==="idle_drag"&&!this.hasStartedDrag||t==="idle_keep_going"&&this.placed.size<pe.length||t==="idle_hard"){this._idleNudgeScheduled=!1,this._enterHint(t);return}},e),this._idleNudgeScheduled=!0)}_placedOnText(e){const t=pe.find(i=>i.id===e);return t?t.solfege:"小鱼"}onFishDrop(e,t,i){this.gate&&(this._markActivity(),i&&t?this.handleCorrect(e,t):this.handleWrong(e,t))}handleCorrect(e,t){const i=e.dataset.id;if(this.placed.has(i))return;this.placed.add(i);try{this.fishPool.lockFish(i)}catch{}this._lastCorrectNote=this._placedOnText(i);const n=this.firstCorrectNote===null||this.firstCorrectNote===void 0;n&&(this.firstCorrectNote=i);const r=t.getBoundingClientRect(),l=this.fishPool.root.getBoundingClientRect(),o=r.left-l.left+r.width/2,a=r.top-l.top+r.height/2,d=parseFloat(e.style.left)||0,c=parseFloat(e.style.top)||0,m=o-d-e.offsetWidth/2,f=a-c-e.offsetHeight/2;N.to(e,{x:m,y:f,scale:.85,duration:.5,ease:"back.out(1.7)",onComplete:()=>{try{this.staff.flashFill(i)}catch{}try{this.staff.fillNote(i)}catch{}try{this.staff.clearTarget()}catch{}const y=this.kb&&this.kb.svg?this.kb.svg.querySelector(`.key--white[data-id="${i}"]`):null;if(y){try{this.kb.glowKey(y)}catch{}try{this.audio.playNote(y.dataset.pitch)}catch{}}try{this.audio.correct()}catch{}const g=(pe.find(h=>h.id===i)||{}).color||"#ffc971";this.burst(r.left+r.width/2,r.top+r.height/2,g);try{Ht.burst({x:r.left+r.width/2,y:r.top+r.height/2,color:"#fff8ec",count:10,spread:70,startVelocity:18})}catch{}try{this.kb.markPlaced(i,g)}catch{}this._flashScreen();const u=pe.find(h=>h.id===i);if(u){this._floatScore(r.left+r.width/2,r.top,`${u.solfege} +1`);try{this.audio.playNote(u.pitch)}catch{}}N.to(e,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>N.to(e,{rotation:0,duration:.2,ease:"power2.out"})}),N.fromTo(e,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),this.addStar(),n?this._advanceHint("first_correct"):this._advanceHint("subsequent_correct"),this.placed.size===pe.length&&setTimeout(()=>this.handleWin(),600)}})}handleWrong(e,t){this.wrongCount++;try{this.audio.wrong()}catch{}this.staff&&(this.staff.clearHint(),this.staff.clearTarget()),e.classList.add("shake"),setTimeout(()=>e.classList.remove("shake"),400),N.to(e,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"});const i=e.dataset.id,n=pe.find(r=>r.id===i);t?(this._lastWrongHint=`${n?n.solfege:"这条鱼"} 的家在上面, 看看五线谱上的唱名哦~`,this._enterHint("wrong_drop_near")):(this._lastWrongHint="把鱼拖到上面五线谱的圆圈里~",this._enterHint("wrong_drop_far"))}_calcStars(){return this.wrongCount<=0?3:this.wrongCount<=2?2:this.wrongCount<=5?1:0}applyFinalStars(){return this._calcStars()}handleWin(){this.gate=!1,this._clearHintTimer();const e=this.applyFinalStars();try{this.progress.markLevelComplete(1,e)}catch{}try{this.kb.glowAll()}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}Ht.celebrate(),setTimeout(()=>this.showWinOverlay(e,1),1800)}addStar(){const e=document.querySelectorAll("#hud-dots .dot"),t=this.placed.size-1;t>=0&&t<e.length&&(e[t].classList.remove("on"),e[t].offsetWidth,e[t].classList.add("on"))}showWinOverlay(e,t=1){if(document.querySelectorAll(".overlay").forEach(h=>h.remove()),this.achievements)try{this.achievements.checkAndUnlock().forEach((p,_)=>{setTimeout(()=>{try{ec.show(p)}catch{}},1500+_*800)})}catch{}const i=[0,1,2].map(h=>`<span class="win-star ${h<e?"on":""}">${h<e?"⭐":"☆"}</span>`).join(""),n=this.wrongCount,r=t===1,l=t===2,o=`🎉 第 ${t} 关完成!`,a=r?"你已经认识了 Do Re Mi Fa Sol La Si":l?"你的耳朵越来越灵啦! 听音找鱼全对~":"太棒了! 继续下一关，森林里的新挑战正在等你~",d=l?this._level2Total||5:r?pe.length:"✓",c=l?"答对题数":r?"正确放置":"关卡挑战",m=document.createElement("div");m.className="overlay",m.innerHTML=`
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
    `,document.body.appendChild(m);const f=m.querySelector("#win-share-btn");f&&(f.onclick=async()=>{try{const{Share:h}=await Je(async()=>{const{Share:_}=await import("./Share-BabBseVK.js");return{Share:_}},[],import.meta.url),p=new h(this);m.style.display="none",p.showShareMenu({levelId:t,stars:e,wrongCount:this.wrongCount,totalQuestions:t===2?this._level2Total||5:7},()=>{m.style.display=""})}catch(h){console.warn("[share] 打开分享菜单失败:",h)}});const y=m.querySelector("#next-btn");if(t<16){const h=t+1;y.textContent=`第 ${h} 关 ›`,y.onclick=()=>{m.remove(),this.say(`第 ${h} 关马上来...`),this.start({levelId:h})}}else y.textContent="🎉 全部完成",y.onclick=()=>{m.remove(),this._showAllDoneOverlay()};m.querySelector("#replay-btn").onclick=()=>{m.remove(),this._skipStartOverlayOnce=!0,this.start({levelId:t})};const u=m.querySelector("#achievements-btn");u&&(u.onclick=async()=>{try{const{AchievementsWall:h}=await Je(async()=>{const{AchievementsWall:_}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:_}},[],import.meta.url);m.remove(),new h(document.body,{achievementSystem:this.achievements,onClose:()=>{this.showWinOverlay(e,t)}}).show()}catch(h){console.warn("[achievements] 打开成就墙失败:",h)}})}_showAllDoneOverlay(){document.querySelectorAll(".overlay").forEach(t=>t.remove());const e=document.createElement("div");e.className="overlay",e.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">🌟 森林钢琴大师!</div>
        <div class="overlay__text">你完成了全部 16 关挑战!<br>从认识音符到节奏阶梯，真的太厉害啦~</div>
        <div class="overlay__btns">
          <button class="btn-secondary" id="map-btn">🗺️ 回关卡地图</button>
          <button class="btn-primary" id="replay-btn">↻ 再玩一次 (第 1 关)</button>
        </div>
      </div>
    `,document.body.appendChild(e),e.querySelector("#map-btn").onclick=()=>{e.remove(),this.goHome()},e.querySelector("#replay-btn").onclick=()=>{e.remove(),this._skipStartOverlayOnce=!0,this.start({levelId:1})}}_correctnessComment(e){return e===3?"全对! 你真是个钢琴小天才 ⭐":e===2?"不错! 错一点点, 离完美不远了~":e===1?"完成了! 多练几次就能满分啦~":"没关系, 再来一次一定行!"}restartLevel(){document.querySelectorAll(".overlay").forEach(e=>e.remove()),this._showLevel2HUD(!1),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.kb&&this.kb.resetMarks(),this.staff&&this.staff.reset(),this.fishPool&&this.fishPool.reset(),document.querySelectorAll("#hud-dots .dot").forEach(e=>{e.classList.remove("on")}),this._beginLevel()}burst(e,t,i){Ht.burst({x:e,y:t,color:i})}_flashScreen(){const e=document.createElement("div");e.className="screen-flash",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.remove(),300)},50)}_floatScore(e,t,i){const n=document.createElement("div");n.className="score-float",n.textContent=i,n.style.left=`${e}px`,n.style.top=`${t}px`,document.body.appendChild(n),setTimeout(()=>n.remove(),1400)}say(e){this.bubble&&(this.bubble.textContent=e)}}const Y={MASTER_GAIN_NORMAL:.75,MASTER_GAIN_MUTED:0,TEST_BEEP_PEAK:.6,PLAYNOTE_ATTACK:.65,PLAYNOTE_DECAY:.35,PLAYNOTE_RELEASE:.8,PLAYNOTE_HARMONIC_2:.15,PLAYNOTE_HARMONIC_3:.05,PLAYNOTE_HARMONIC_4:.03,PLAYNOTE_HARMONIC_5:.015,HOVER_PEAK:.35,CORRECT_PEAK:.55,WRONG_PEAK:.45,ARPEGGIO_DEFAULT_PEAK:.5,REVERB_BUS_GAIN:.18,REVERB_WET:1,REVERB_FEEDBACK:.4,REVERB_DELAY:.25,REVERB_SEND:.2,HAMMER_NOISE_PEAK:.15,HAMMER_NOISE_DURATION:.05,ADSR_ATTACK:.01,ADSR_DECAY:.15,ADSR_RELEASE:.85};class $s{constructor(){this.unlocked=!1,this.muted=!1,this._webAudio=null,this._masterGain=null,this._bus=null,this._realPianoLoaded=!1,this._reverbBus=null,this._reverbDelay=null,this._activeOscillators=new Set,this._activeSources=new Set}_trackOsc(e,t){if(!e)return;this._activeOscillators.add(e);const i=()=>{try{this._activeOscillators.delete(e)}catch{}};e.onended=i}_trackSource(e){e&&(this._activeSources.add(e),e.onended=()=>{try{this._activeSources.delete(e)}catch{}})}stop(){if(!this._webAudio)return;const t=this._webAudio.currentTime;this._activeOscillators.forEach(i=>{try{i.disconnect()}catch{}try{i.stop(t)}catch{}}),this._activeOscillators.clear(),this._activeSources.forEach(i=>{try{i.stop(t)}catch{}try{i.disconnect()}catch{}}),this._activeSources.clear()}async unlockOnGesture(){if(!this.unlocked){console.log("[Audio] unlockOnGesture entered");try{const e=window.AudioContext||window.webkitAudioContext;if(!e){console.warn("[Audio] Web Audio API not supported");return}this._webAudio||(this._webAudio=new e,this._masterGain=this._webAudio.createGain(),this._masterGain.gain.value=Y.MASTER_GAIN_NORMAL,this._masterGain.connect(this._webAudio.destination),this._setupReverb())}catch(e){console.warn("[Audio] 创建 AudioContext 失败:",e);return}if(this._webAudio.state==="suspended")try{this._webAudio.resume(),console.log("[Audio] resume() fired, state will become running")}catch(e){console.warn("[Audio] resume() failed:",e)}try{const e=this._webAudio.createOscillator(),t=this._webAudio.createGain();t.gain.value=0,e.connect(t).connect(this._masterGain),e.start(),e.stop(this._webAudio.currentTime+.01),console.log("[Audio] silent osc started (unlocker)")}catch(e){console.warn("[Audio] silent osc failed:",e)}try{const e=this._webAudio.currentTime+.05,t=this._webAudio.createOscillator(),i=this._webAudio.createGain();t.type="sine",t.frequency.setValueAtTime(523.25,e),i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(Y.TEST_BEEP_PEAK,e+.01),i.gain.exponentialRampToValueAtTime(1e-4,e+.4),t.connect(i).connect(this._masterGain),t.start(e),t.stop(e+.45),console.log("[Audio] test tone scheduled at currentTime+0.05")}catch(e){console.warn("[Audio] test tone schedule failed:",e)}try{const e=new $s;e.src="data:audio/mp3;base64,//uQx",e.play().catch(()=>{})}catch{}this.unlocked=!0,this._loadPianoInBackground(),console.log("[Audio] unlocked! state=",this._webAudio.state)}}_resumeWebAudio(){this._webAudio&&this._webAudio.state==="suspended"&&this._webAudio.resume().catch(()=>{})}playNote(e){if(!(!this.unlocked||this.muted)&&(this._playNoteWebAudio(e),this._realPianoLoaded&&this._realPiano&&this._realPiano.triggerAttackRelease))try{this._realPiano.triggerAttackRelease(e,"8n")}catch{}}_setupReverb(){if(!this._webAudio||this._reverbBus)return;const e=this._webAudio;this._reverbBus=e.createGain(),this._reverbBus.gain.value=Y.REVERB_BUS_GAIN,this._reverbDelay=e.createDelay(1),this._reverbDelay.delayTime.value=Y.REVERB_DELAY;const t=e.createGain();t.gain.value=Y.REVERB_FEEDBACK;const i=e.createGain();i.gain.value=Y.REVERB_WET,this._reverbBus.connect(this._reverbDelay),this._reverbDelay.connect(t),t.connect(this._reverbDelay),t.connect(i),i.connect(this._masterGain)}_playNoteWebAudio(e){if(!this._webAudio)return;this._resumeWebAudio();const t=this._webAudio,i=t.currentTime,r={C4:261.63,"C#4":277.18,D4:293.66,"D#4":311.13,E4:329.63,F4:349.23,"F#4":369.99,G4:392,"G#4":415.3,A4:440,"A#4":466.16,B4:493.88}[e];if(!r)return;const l=Math.floor(t.sampleRate*Y.HAMMER_NOISE_DURATION),o=t.createBuffer(1,l,t.sampleRate),a=o.getChannelData(0);for(let L=0;L<l;L++)a[L]=(Math.random()*2-1)*(1-L/l);const d=t.createBufferSource();d.buffer=o;const c=t.createBiquadFilter();c.type="highpass",c.frequency.value=1500;const m=t.createGain();m.gain.value=Y.HAMMER_NOISE_PEAK,d.connect(c),c.connect(m),m.connect(this._masterGain),d.start(i),d.stop(i+Y.HAMMER_NOISE_DURATION),this._trackSource(d);const f=t.createOscillator();f.type="triangle",f.frequency.setValueAtTime(r,i);const y=t.createOscillator();y.type="sine",y.frequency.setValueAtTime(r*2,i);const g=t.createOscillator();g.type="sine",g.frequency.setValueAtTime(r*3,i);const u=t.createOscillator();u.type="sine",u.frequency.setValueAtTime(r*4,i);const h=t.createOscillator();h.type="sine",h.frequency.setValueAtTime(r*5,i);const p=t.createGain();p.gain.setValueAtTime(1e-4,i),p.gain.exponentialRampToValueAtTime(Y.PLAYNOTE_ATTACK,i+Y.ADSR_ATTACK),p.gain.exponentialRampToValueAtTime(Y.PLAYNOTE_DECAY,i+Y.ADSR_DECAY),p.gain.exponentialRampToValueAtTime(1e-4,i+Y.PLAYNOTE_RELEASE);const _=t.createGain();_.gain.value=Y.PLAYNOTE_HARMONIC_2;const v=t.createGain();v.gain.value=Y.PLAYNOTE_HARMONIC_3;const b=t.createGain();b.gain.value=Y.PLAYNOTE_HARMONIC_4;const x=t.createGain();x.gain.value=Y.PLAYNOTE_HARMONIC_5,f.connect(p),y.connect(_),_.connect(p),g.connect(v),v.connect(p),u.connect(b),b.connect(p),h.connect(x),x.connect(p),p.connect(this._masterGain);const S=t.createGain();S.gain.value=Y.REVERB_SEND,p.connect(S),S.connect(this._reverbBus);const w=i+Y.ADSR_RELEASE;f.start(i),f.stop(w),y.start(i),y.stop(w),g.start(i),g.stop(w),u.start(i),u.stop(w),h.start(i),h.stop(w),this._trackOsc(f,w),this._trackOsc(y,w),this._trackOsc(g,w),this._trackOsc(u,w),this._trackOsc(h,w)}hover(e){!this.unlocked||this.muted||this._sfxBubble()}correct(){!this.unlocked||this.muted||this._sfxArpeggio([523.25,659.25,783.99,1046.5],.18,.06,"sine",Y.CORRECT_PEAK)}wrong(){!this.unlocked||this.muted||this._sfxSlide(320,150,.35,"triangle",Y.WRONG_PEAK)}async playScale(e){!this.unlocked||this.muted||(e.forEach((t,i)=>{setTimeout(()=>this._playNoteWebAudio(t),i*220)}),setTimeout(()=>this._sfxArpeggio([1046.5,1567.98,2093],.12,.08,"sine",Y.ARPEGGIO_DEFAULT_PEAK),e.length*220+200))}toggleMute(){if(this.muted=!this.muted,this._masterGain&&(this._masterGain.gain.cancelScheduledValues(this._webAudio.currentTime),this._masterGain.gain.linearRampToValueAtTime(this.muted?Y.MASTER_GAIN_MUTED:Y.MASTER_GAIN_NORMAL,.05)),this.muted)try{this.stop()}catch{}return this.muted}async _loadPianoInBackground(){try{const e=await Je(()=>import("./index-DWHXqSMG.js"),[],import.meta.url);await e.start(),this._bus=new e.Gain(.9).toDestination();const t=new e.Sampler({urls:{A1:"A1.mp3",A2:"A2.mp3",A3:"A3.mp3",A4:"A4.mp3",A5:"A5.mp3",A6:"A6.mp3",C1:"C1.mp3",C2:"C2.mp3",C3:"C3.mp3",C4:"C4.mp3",C5:"C5.mp3",C6:"C6.mp3"},baseUrl:"https://tonejs.github.io/audio/salamander/",release:1.4}).connect(this._bus),i=new Promise(r=>setTimeout(()=>r("timeout"),12e3));await Promise.race([e.loaded(),i])!=="timeout"?(this._realPiano=t,this._realPianoLoaded=!0,console.log("[Audio] Salamander 钢琴加载完成")):console.warn("[Audio] 钢琴采样加载超时, 保持 Web Audio 合成器")}catch(e){console.warn("[Audio] Salamander 加载失败:",e)}}_sfxBubble(){if(!this._webAudio)return;this._resumeWebAudio();const e=this._webAudio,t=e.currentTime,i=e.createOscillator();i.type="sine",i.frequency.setValueAtTime(420,t),i.frequency.exponentialRampToValueAtTime(180,t+.12);const n=e.createGain();n.gain.setValueAtTime(1e-4,t),n.gain.exponentialRampToValueAtTime(Y.HOVER_PEAK,t+.01),n.gain.exponentialRampToValueAtTime(1e-4,t+.14),i.connect(n).connect(this._masterGain),i.start(t),i.stop(t+.18),this._trackOsc(i,t+.18)}_sfxArpeggio(e,t=.18,i=.06,n="sine",r=Y.ARPEGGIO_DEFAULT_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime;e.forEach((a,d)=>{const c=o+d*(t*.5+i),m=l.createOscillator();m.type=n,m.frequency.setValueAtTime(a,c);const f=l.createGain();f.gain.setValueAtTime(1e-4,c),f.gain.exponentialRampToValueAtTime(r,c+.012),f.gain.exponentialRampToValueAtTime(1e-4,c+t),m.connect(f).connect(this._masterGain),m.start(c),m.stop(c+t+.05),this._trackOsc(m,c+t+.05)})}_sfxSlide(e=320,t=150,i=.35,n="triangle",r=Y.WRONG_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime,a=l.createOscillator();a.type=n,a.frequency.setValueAtTime(e,o),a.frequency.exponentialRampToValueAtTime(t,o+i);const d=l.createGain();d.gain.setValueAtTime(1e-4,o),d.gain.exponentialRampToValueAtTime(r,o+.015),d.gain.exponentialRampToValueAtTime(1e-4,o+i),a.connect(d).connect(this._masterGain),a.start(o),a.stop(o+i+.05),this._trackOsc(a,o+i+.05)}}class cc{constructor(e){this.audio=e,this.playing=!1,this.notes=[],this._stopFn=null}start(){if(!this.playing){if(!this.audio||!this.audio._webAudio){console.warn("[BGM] Audio not ready, deferring"),setTimeout(()=>this.start(),500);return}this.playing=!0,this._playLoop()}}stop(){this.playing=!1,this._stopFn&&(clearTimeout(this._stopFn),this._stopFn=null),this.notes.forEach(e=>{try{e.stop()}catch{}}),this.notes=[]}toggle(){return this.playing?this.stop():this.start(),this.playing}_playLoop(){if(!this.playing)return;const e=this.audio._webAudio;if(!e)return;const t=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],i=e.currentTime,n=e.createGain();n.gain.value=0,n.gain.linearRampToValueAtTime(.1,i+2),n.connect(this.audio._masterGain);const r=4,l=t.length*r;t.forEach((o,a)=>{o.forEach(d=>{const c=e.createOscillator(),m=e.createGain();c.type=a%2===0?"sine":"triangle",c.frequency.setValueAtTime(d,i+a*r),c.connect(m).connect(n),m.gain.setValueAtTime(0,i+a*r),m.gain.linearRampToValueAtTime(.5,i+a*r+.5),m.gain.linearRampToValueAtTime(0,i+(a+1)*r),c.start(i+a*r),c.stop(i+(a+1)*r),this.notes.push(c)})}),this._stopFn=setTimeout(()=>{this.notes=[],this._playLoop()},l*1e3)}}const An="forest-piano-progress",dc=["do","re","mi","fa","sol","la","si"];function uc(){const s=new Date,e=s.getFullYear(),t=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${e}-${t}-${i}`}function ms(){return{level:1,stars:{},completedLevels:[],unlockedNotes:[],firstPass:null}}function hc(s){return!s||typeof s!="object"?ms():{level:Number.isFinite(s.level)?s.level:1,stars:s.stars&&typeof s.stars=="object"&&!Array.isArray(s.stars)?s.stars:{},completedLevels:Array.isArray(s.completedLevels)?s.completedLevels.filter(e=>e!=null):[],unlockedNotes:Array.isArray(s.unlockedNotes)?s.unlockedNotes.filter(e=>typeof e=="string"):[],firstPass:typeof s.firstPass=="string"?s.firstPass:null}}class Or{constructor(){this.state=this._load()}_load(){try{if(typeof localStorage>"u")return ms();const e=localStorage.getItem(An);if(!e)return ms();const t=JSON.parse(e);return hc(t)}catch{return ms()}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(An,JSON.stringify(this.state))}catch{}}markLevelComplete(e,t){const i=String(e),n=Math.max(0,Number(t)||0);this.state.completedLevels.includes(i)||(this.state.completedLevels=[...this.state.completedLevels,i]);const r=Number(this.state.stars[i]||0);n>r&&(this.state.stars={...this.state.stars,[i]:n}),this.state.firstPass||(this.state.firstPass=uc());const l=new Set(this.state.unlockedNotes);dc.forEach(a=>l.add(a)),this.state.unlockedNotes=Array.from(l);const o=Number(i);Number.isFinite(o)&&o>=this.state.level&&(this.state.level=o+1),this._save()}getStars(e){const t=String(e);return Number(this.state.stars[t]||0)}getTotalStars(){return Object.values(this.state.stars).reduce((e,t)=>e+(Number(t)||0),0)}getCompletedLevels(){return[...this.state.completedLevels]}isLevelUnlocked(e){return!0}getUnlockedNotes(){return[...this.state.unlockedNotes]}getSnapshot(){return JSON.parse(JSON.stringify(this.state))}}class fc{constructor(e,{onReset:t,onClose:i,version:n}){this.stage=e,this.onReset=t,this.onClose=i,this.version=n,this.element=null}show(){const e=document.createElement("div");e.className="settings-panel",e.innerHTML=`
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
    `,this.stage.appendChild(e),this.element=e,e.querySelector("#settings-close").addEventListener("click",()=>this.hide()),e.querySelector("#settings-reset").addEventListener("click",()=>{if(confirm("确定要重置所有进度吗? 这不可恢复!"))try{localStorage.removeItem("forest-piano-progress"),localStorage.removeItem("forest-piano-achievements"),this.onReset&&this.onReset(),alert("进度已重置! 刷新页面开始新游戏")}catch(r){alert("重置失败: "+r.message)}});const t=e.querySelector("#settings-animations");t.checked=this._loadAnimationsPref(),t.addEventListener("change",()=>{this._saveAnimationsPref(t.checked),document.body.classList.toggle("no-animations",!t.checked)});const i=e.querySelector("#settings-bgm");i.checked=this._loadBgmPref(),i.addEventListener("change",()=>{this._saveBgmPref(i.checked),window.dispatchEvent(new CustomEvent("toggle-bgm"))});const n=e.querySelector("#settings-large-text");n.checked=this._loadLargeTextPref(),n.addEventListener("change",()=>{this._saveLargeTextPref(n.checked),document.body.classList.toggle("large-text",n.checked)}),e.querySelector("#settings-tutorial").addEventListener("click",()=>{this.hide(),Je(async()=>{const{Tutorial:r}=await Promise.resolve().then(()=>pc);return{Tutorial:r}},void 0,import.meta.url).then(({Tutorial:r})=>{new r(document.body,{onDone:()=>{}}).show()})})}_loadAnimationsPref(){try{return localStorage.getItem("forest-piano-animations")!=="false"}catch{return!0}}_saveAnimationsPref(e){try{localStorage.setItem("forest-piano-animations",String(e))}catch{}}_loadBgmPref(){try{return localStorage.getItem("forest-piano-bgm")!=="false"}catch{return!0}}_saveBgmPref(e){try{localStorage.setItem("forest-piano-bgm",String(e))}catch{}}_loadLargeTextPref(){try{return localStorage.getItem("forest-piano-large-text")==="true"}catch{return!1}}_saveLargeTextPref(e){try{localStorage.setItem("forest-piano-large-text",String(e))}catch{}}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onClose&&this.onClose()}}const hs=[{emoji:"🐟🎵",title:"欢迎来到森林钢琴学校",body:"这里的 7 条小鱼 Do Re Mi Fa Sol La Si 住在钢琴里。你来帮它们找到在五线谱和钢琴上的位置吧!",bg:"linear-gradient(135deg, #5fa8b5, #a8dadc)"},{emoji:"👆",title:"手指不离开屏幕",body:"按住一条鱼 (不要松开!) 拖到屏幕上方五线谱对应的位置。松手就放下。如果放错会摇头回弹。",bg:"linear-gradient(135deg, #f4a261, #ffc971)"},{emoji:"⭐",title:"错误少就拿满星",body:"0 错 = 3⭐ / 1-2 错 = 2⭐ / 3-5 错 = 1⭐ / 6+ 错 = 0⭐。每关都能挑战完美!",bg:"linear-gradient(135deg, #ffd166, #f4a261)"},{emoji:"🗺️",title:"16 个关卡等你探索",body:"通关后看左上角关卡徽章, 点一下就能回到地图选别的关卡. 也可以点 🎹 自由演奏 或 🎵 歌曲库随便弹~ 看看你能集齐多少 🏆 成就!",bg:"linear-gradient(135deg, #9b5de5, #6a4c93)"}];class mi{constructor(e,{onDone:t,isFirstTime:i=!1}={}){this.stage=e,this.onDone=t,this.isFirstTime=i,this.element=null,this.currentPage=0}show(){this.element=document.createElement("div"),this.element.className="tutorial",this._render(),this.stage.appendChild(this.element),this.isFirstTime?N.fromTo(this.element.querySelector(".tutorial__card"),{y:40,opacity:0},{y:0,opacity:1,duration:.6,ease:"back.out(1.7)"}):N.fromTo(this.element.querySelector(".tutorial__card"),{scale:.85,opacity:0},{scale:1,opacity:1,duration:.35,ease:"back.out(1.4)"})}_render(){const e=hs[this.currentPage],t=hs.length,i=this.currentPage===t-1,n=this.currentPage===0;this.element.innerHTML=`
      <div class="tutorial__card" style="background: ${e.bg}">
        <div class="tutorial__emoji">${e.emoji}</div>
        <div class="tutorial__title">${e.title}</div>
        <div class="tutorial__body">${e.body}</div>

        <div class="tutorial__dots">
          ${hs.map((d,c)=>`
            <span class="tutorial__dot ${c===this.currentPage?"on":""}"></span>
          `).join("")}
        </div>

        <div class="tutorial__nav">
          ${n?"<div></div>":'<button class="btn-secondary" id="tut-back">‹ 上一步</button>'}
          ${i?'<button class="btn-primary" id="tut-done">🎵 开始游戏 ›</button>':'<button class="btn-primary" id="tut-next">下一步 ›</button>'}
        </div>

        ${this.isFirstTime?"":'<button class="tutorial__skip" id="tut-skip">跳过</button>'}
      </div>
    `;const r=this.element.querySelector("#tut-back"),l=this.element.querySelector("#tut-next"),o=this.element.querySelector("#tut-done"),a=this.element.querySelector("#tut-skip");r&&r.addEventListener("click",()=>this._prev()),l&&l.addEventListener("click",()=>this._next()),o&&o.addEventListener("click",()=>this._done()),a&&a.addEventListener("click",()=>this._done())}_prev(){this.currentPage>0&&(this.currentPage--,this._render())}_next(){this.currentPage<hs.length-1&&(this.currentPage++,this._render())}_done(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onDone&&this.onDone()}hide(){this._done()}}const pc=Object.freeze(Object.defineProperty({__proto__:null,Tutorial:mi},Symbol.toStringTag,{value:"Module"})),ei=[{id:"cream",name:"奶油橙",icon:"🍑",bg:"cream"},{id:"night",name:"夜色",icon:"🌙",bg:"night"},{id:"forest",name:"森林绿",icon:"🌲",bg:"forest"}],_c={cream:"🍑",night:"🌙",forest:"🌲"},Pn="forest-piano-theme",ti={cream:{"--bg-cream":"#fff8ec","--bg-paper":"#faf3e0","--staff-strong":"#3d405b","--warm-cta":"#ffb347","--text-main":"#3d405b","--text-sub":"#6b7280"},night:{"--bg-cream":"#1a1430","--bg-paper":"#251a3f","--staff-strong":"#fdf6e3","--warm-cta":"#ff8fb1","--text-main":"#fdf6e3","--text-sub":"#b8a5d0"},forest:{"--bg-cream":"#1a3a2a","--bg-paper":"#244a3a","--staff-strong":"#fdf6e3","--warm-cta":"#84cc16","--text-main":"#fdf6e3","--text-sub":"#a3c9a8"}};class vc{constructor(e){this.stage=e,this.current=this._load(),this._apply(),this.button=null}_load(){try{return localStorage.getItem(Pn)||"cream"}catch{return"cream"}}_save(e){try{localStorage.setItem(Pn,e)}catch{}}_apply(){const e=ti[this.current]||ti.cream;for(const[t,i]of Object.entries(e))document.documentElement.style.setProperty(t,i);document.body.dataset.theme=this.current}cycle(){const e=ei.findIndex(i=>i.id===this.current),t=ei[(e+1)%ei.length];return this.current=t.id,this._save(this.current),this._apply(),t}set(e){ti[e]&&(this.current=e,this._save(e),this._apply())}}class yc{constructor(e){this.game=e,this.enabled=!0,this._handler=t=>this._onKeyDown(t)}enable(){this.enabled||(this.enabled=!0,document.addEventListener("keydown",this._handler))}disable(){this.enabled&&(this.enabled=!1,document.removeEventListener("keydown",this._handler))}_onKeyDown(e){if(!(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))){if(e.key==="Escape"||e.key==="Esc"){const t=document.querySelectorAll(".overlay, .achievements-wall, .settings-panel, .tutorial");if(t.length>0){const i=t[t.length-1];i.classList.contains("achievements-wall")?i.querySelector("#close-achievements")?.click():i.remove(),e.preventDefault()}else if(this.game&&typeof this.game.goHome=="function"){this.game.goHome(),e.preventDefault();return}else if(this.game&&typeof this.game._showStartOverlay=="function"){this.game._showStartOverlay(),e.preventDefault();return}}if(e.key==="Enter"){const i=document.querySelector(".overlay__card")?.querySelector("#start-btn");if(i){i.click(),e.preventDefault();return}}if(e.key==="m"||e.key==="M"){const t=document.getElementById("btn-sound");t&&t.click(),e.preventDefault()}if(/^[1-9]$/.test(e.key)){const t=parseInt(e.key,10);try{this.game._skipStartOverlayOnce=!0,this.game.audio?.unlockOnGesture?.().catch(()=>{}),this.game.start({levelId:t}),e.preventDefault()}catch{}}if(e.key===" "){const t=document.querySelector(".level4-drum-anchor, .level12-cut-btn");t&&(t.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0})),e.preventDefault())}}}}const $n="forest-piano-streak";function mc(){const s=new Date;return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`}class gc{constructor(){this.state=this._load()}_load(){try{const e=localStorage.getItem($n);if(e)return JSON.parse(e)}catch{}return{lastDate:null,streakCount:0,longestStreak:0}}_save(){try{localStorage.setItem($n,JSON.stringify(this.state))}catch{}}checkIn(){const e=mc();if(this.state.lastDate===e)return{streak:this.state.streakCount,isNew:!1};const t=(()=>{const i=new Date;return i.setDate(i.getDate()-1),`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`})();return this.state.lastDate===t?this.state.streakCount+=1:this.state.lastDate!==null?this.state.streakCount=1:this.state.streakCount=1,this.state.streakCount>this.state.longestStreak&&(this.state.longestStreak=this.state.streakCount),this.state.lastDate=e,this._save(),{streak:this.state.streakCount,isNew:!0}}get(){return{streak:this.state.streakCount,longest:this.state.longestStreak}}}const Dn=new vc,On="forest-piano-tutorial-shown",gi="v19.4";window.__forestPiano={Game:Dr,Audio:$s,Progress:Or,version:gi};document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Nn):Nn();function Nn(){const s=document.getElementById("stage"),e=document.getElementById("bubble-text"),t=document.getElementById("version-tag");t&&(t.textContent=gi),bc();const i=new Dr({stageEl:s,bubbleEl:e,progress:new Or,audio:new $s}),n=new cc(i.audio);i.start({levelId:1});const r=new gc,l=r.checkIn();l.isNew&&l.streak>=3&&setTimeout(()=>{const p=document.createElement("div");p.className="streak-toast",p.innerHTML=`
        <div class="streak-toast__icon">🔥</div>
        <div class="streak-toast__body">
          <div class="streak-toast__title">连续 ${l.streak} 天!</div>
          <div class="streak-toast__hint">坚持就是胜利</div>
        </div>
      `,document.body.appendChild(p),setTimeout(()=>p.classList.add("show"),50),setTimeout(()=>{p.classList.remove("show"),setTimeout(()=>p.remove(),500)},5500)},3e3);const o=document.createElement("span");o.className="level-badge",o.id="level-badge",o.title="点击返回关卡地图",o.setAttribute("role","button"),o.setAttribute("aria-label","当前关卡 - 点击返回地图"),o.textContent="🐟 第 1 关 · 小鱼跳进五线谱";const a=document.querySelector(".hud__left");a&&a.insertBefore(o,a.firstChild),o.addEventListener("click",()=>{i.goHome()});const d=document.createElement("div");d.className="streak-badge",d.textContent=`🔥 ${l.streak}`,d.title=`连续 ${l.streak} 天, 最长 ${r.get().longest}`,document.querySelector(".hud__left")?.appendChild(d);const c=document.getElementById("btn-sound"),m=document.getElementById("btn-replay"),f=document.getElementById("btn-bgm"),y=document.getElementById("btn-home");c&&c.addEventListener("click",()=>{const p=i.audio.toggleMute();c.textContent=p?"🔇":"🔊"}),m&&m.addEventListener("click",()=>{try{i.restartLevel()}catch(p){console.warn("restart 失败:",p)}}),f&&f.addEventListener("click",()=>{const p=n.toggle();f.textContent=p?"🎶":"🔇",f.style.background=p?"rgba(255, 235, 168, 0.4)":""}),y&&y.addEventListener("click",()=>{i.goHome()});const g=document.createElement("button");g.className="hud__btn",g.id="btn-settings",g.setAttribute("aria-label","设置"),g.setAttribute("title","设置"),g.textContent="⚙",document.querySelector(".hud__right")?.appendChild(g),g.addEventListener("click",()=>{new fc(document.body,{version:gi,onReset:()=>location.reload(),onClose:()=>{}}).show()});const u=document.querySelector(".hud__right");if(u&&!document.getElementById("btn-achievements")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-achievements",p.setAttribute("aria-label","成就墙"),p.title="成就墙",p.textContent="🏆",u.insertBefore(p,u.firstChild),p.addEventListener("click",()=>{Je(async()=>{const{AchievementsWall:_}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:_}},[],import.meta.url).then(({AchievementsWall:_})=>{new _(document.body,{achievementSystem:i.achievements,onClose:()=>{}}).show()}).catch(_=>console.warn("[achievements] 加载失败:",_))})}if(u&&!document.getElementById("btn-leaderboard")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-leaderboard",p.setAttribute("aria-label","排行榜"),p.setAttribute("title","我的成就"),p.textContent="📊",u.appendChild(p),p.addEventListener("click",()=>{Je(async()=>{const{Leaderboard:_}=await import("./Leaderboard-D8B94zyK.js");return{Leaderboard:_}},[],import.meta.url).then(({Leaderboard:_})=>{new _(document.body,i.progress,i.achievements).show()}).catch(_=>console.warn("[leaderboard] 加载失败:",_))})}if(u&&!document.getElementById("btn-practice")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-practice",p.setAttribute("aria-label","自由演奏"),p.title="自由演奏",p.textContent="🎹",u.appendChild(p),p.addEventListener("click",()=>{Je(async()=>{const{PracticeRoom:_}=await import("./PracticeRoom-DXLdK_th.js");return{PracticeRoom:_}},[],import.meta.url).then(({PracticeRoom:_})=>{new _(document.body,i).show()}).catch(_=>console.warn("[practice] 加载失败:",_))})}if(u&&!document.getElementById("btn-songs")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-songs",p.setAttribute("aria-label","歌曲库"),p.title="歌曲库",p.textContent="🎵",u.appendChild(p),p.addEventListener("click",()=>{Je(async()=>{const{SongLibrary:_}=await import("./SongLibrary-B_1Gtlvk.js");return{SongLibrary:_}},[],import.meta.url).then(({SongLibrary:_})=>{new _(document.body,i).show()}).catch(_=>console.warn("[songs] 加载失败:",_))})}if(!document.getElementById("btn-help")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-help",p.setAttribute("aria-label","帮助"),p.setAttribute("title","教程"),p.textContent="📖",document.querySelector(".hud__right")?.appendChild(p),p.addEventListener("click",()=>{new mi(document.body,{onDone:()=>{}}).show()})}if(!document.getElementById("btn-theme")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-theme",p.setAttribute("aria-label","主题"),p.title="主题",p.textContent=_c[Dn.current]||"🎨",document.querySelector(".hud__right")?.appendChild(p),p.addEventListener("click",()=>{const _=Dn.cycle();p.textContent=_.icon;const v=document.createElement("div");v.className="theme-flash",v.textContent=`${_.icon} ${_.name}`,document.body.appendChild(v),setTimeout(()=>v.remove(),2e3)})}localStorage.getItem(On)||setTimeout(()=>{new mi(document.body,{isFirstTime:!0,onDone:()=>localStorage.setItem(On,"1")}).show()},1200),window.addEventListener("error",p=>{console.error("[forest-piano] error:",p.error)}),setTimeout(()=>{const p=document.getElementById("splash");p&&p.parentNode&&p.parentNode.removeChild(p)},2200),new yc(i).enable(),document.addEventListener("keydown",p=>{if(p.key==="?"||p.shiftKey&&p.key==="/"){const _=document.createElement("div");_.className="keyboard-help",_.innerHTML=`
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
    `,document.body.appendChild(_);const v=()=>_.remove();_.querySelector("#kb-help-close").addEventListener("click",v),setTimeout(()=>{const b=()=>{v(),document.removeEventListener("keydown",b)};document.addEventListener("keydown",b)},100)}})}function bc(){document.addEventListener("gesturestart",i=>i.preventDefault(),{passive:!1}),document.addEventListener("gesturechange",i=>i.preventDefault(),{passive:!1}),document.addEventListener("gestureend",i=>i.preventDefault(),{passive:!1});let s=null,e=0;const t=i=>{try{return!i||!i.closest?i:i.closest('button, a, .fish, .key, .level-map-tile, [role="button"]')||i}catch{return i}};document.addEventListener("touchstart",i=>{const n=Date.now(),r=t(i.target);n-e<300&&r&&r===s&&i.preventDefault(),s=r,e=n},{passive:!1}),document.addEventListener("dblclick",i=>i.preventDefault(),{passive:!1}),document.addEventListener("touchmove",i=>{i.touches&&i.touches.length>1&&i.preventDefault()},{passive:!1})}export{gt as P,N as g};
