var zn=Object.defineProperty;var jn=(s,e,t)=>e in s?zn(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var os=(s,e,t)=>jn(s,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(r){if(r.ep)return;r.ep=!0;const n=t(r);fetch(r.href,n)}})();const Vn="modulepreload",Yn=function(s,e){return new URL(s,e).href},Vi={},it=function(e,t,i){let r=Promise.resolve();if(t&&t.length>0){const l=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),a=o?.nonce||o?.getAttribute("nonce");r=Promise.allSettled(t.map(d=>{if(d=Yn(d,i),d in Vi)return;Vi[d]=!0;const c=d.endsWith(".css"),_=c?'[rel="stylesheet"]':"";if(!!i)for(let g=l.length-1;g>=0;g--){const u=l[g];if(u.href===d&&(!c||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${_}`))return;const m=document.createElement("link");if(m.rel=c?"stylesheet":Vn,c||(m.as="script"),m.crossOrigin="",m.href=d,a&&m.setAttribute("nonce",a),document.head.appendChild(m),c)return new Promise((g,u)=>{m.addEventListener("load",g),m.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${d}`)))})}))}function n(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return r.then(l=>{for(const o of l||[])o.status==="rejected"&&n(o.reason);return e().catch(n)})};function Un(s){return typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=1),s._startLevel1(),()=>{typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),document.querySelectorAll(".staff-slot.targeting, .staff-slot.filling").forEach(r=>{r.classList.remove("targeting","filling")})}}const Qn=Object.freeze(Object.defineProperty({__proto__:null,default:Un},Symbol.toStringTag,{value:"Module"})),oe="http://www.w3.org/2000/svg";class Kn{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level10-background";let t="";for(let i=0;i<40;i++){const r=Math.random()*100,n=Math.random()*60,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level10-twinkle" cx="${r}%" cy="${n}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}function Ze(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Gr(s,e){s.prototype=Object.create(e.prototype),s.prototype.constructor=s,s.__proto__=e}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Re={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Zt={duration:.5,overwrite:!1,delay:0},Li,_e,te,He=1e8,J=1/He,ai=Math.PI*2,Zn=ai/4,Xn=0,Wr=Math.sqrt,Jn=Math.cos,el=Math.sin,he=function(e){return typeof e=="string"},le=function(e){return typeof e=="function"},Je=function(e){return typeof e=="number"},Ci=function(e){return typeof e>"u"},Qe=function(e){return typeof e=="object"},Te=function(e){return e!==!1},Mi=function(){return typeof window<"u"},as=function(e){return le(e)||he(e)},zr=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},me=Array.isArray,tl=/random\([^)]+\)/g,sl=/,\s*/g,Yi=/(?:-?\.?\d|\.)+/gi,jr=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Et=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Gs=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Vr=/[+-]=-?[.\d]+/,il=/[^,'"\[\]\s]+/gi,rl=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ie,Ve,ci,Ei,Ne={},Ss={},Yr,Ur=function(e){return(Ss=Rt(e,Ne))&&Me},Ai=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Xt=function(e,t){return!t&&console.warn(e)},Qr=function(e,t){return e&&(Ne[e]=t)&&Ss&&(Ss[e]=t)||Ne},Jt=function(){return 0},nl={suppressEvents:!0,isStart:!0,kill:!1},gs={suppressEvents:!0,kill:!1},ll={suppressEvents:!0},Pi={},ot=[],di={},Kr,Pe={},Ws={},Ui=30,bs=[],$i="",Di=function(e){var t=e[0],i,r;if(Qe(t)||le(t)||(e=[e]),!(i=(t._gsap||{}).harness)){for(r=bs.length;r--&&!bs[r].targetTest(t););i=bs[r]}for(r=e.length;r--;)e[r]&&(e[r]._gsap||(e[r]._gsap=new gn(e[r],i)))||e.splice(r,1);return e},mt=function(e){return e._gsap||Di(qe(e))[0]._gsap},Zr=function(e,t,i){return(i=e[t])&&le(i)?e[t]():Ci(i)&&e.getAttribute&&e.getAttribute(t)||i},Se=function(e,t){return(e=e.split(",")).forEach(t)||e},ae=function(e){return Math.round(e*1e5)/1e5||0},se=function(e){return Math.round(e*1e7)/1e7||0},Pt=function(e,t){var i=t.charAt(0),r=parseFloat(t.substr(2));return e=parseFloat(e),i==="+"?e+r:i==="-"?e-r:i==="*"?e*r:e/r},ol=function(e,t){for(var i=t.length,r=0;e.indexOf(t[r])<0&&++r<i;);return r<i},Ls=function(){var e=ot.length,t=ot.slice(0),i,r;for(di={},ot.length=0,i=0;i<e;i++)r=t[i],r&&r._lazy&&(r.render(r._lazy[0],r._lazy[1],!0)._lazy=0)},Oi=function(e){return!!(e._initted||e._startAt||e.add)},Xr=function(e,t,i,r){ot.length&&!_e&&Ls(),e.render(t,i,!!(_e&&t<0&&Oi(e))),ot.length&&!_e&&Ls()},Jr=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(il).length<2?t:he(e)?e.trim():e},en=function(e){return e},Ie=function(e,t){for(var i in t)i in e||(e[i]=t[i]);return e},al=function(e){return function(t,i){for(var r in i)r in t||r==="duration"&&e||r==="ease"||(t[r]=i[r])}},Rt=function(e,t){for(var i in t)e[i]=t[i];return e},Qi=function s(e,t){for(var i in t)i!=="__proto__"&&i!=="constructor"&&i!=="prototype"&&(e[i]=Qe(t[i])?s(e[i]||(e[i]={}),t[i]):t[i]);return e},Cs=function(e,t){var i={},r;for(r in e)r in t||(i[r]=e[r]);return i},Ut=function(e){var t=e.parent||ie,i=e.keyframes?al(me(e.keyframes)):Ie;if(Te(e.inherit))for(;t;)i(e,t.vars.defaults),t=t.parent||t._dp;return e},cl=function(e,t){for(var i=e.length,r=i===t.length;r&&i--&&e[i]===t[i];);return i<0},tn=function(e,t,i,r,n){var l=e[r],o;if(n)for(o=t[n];l&&l[n]>o;)l=l._prev;return l?(t._next=l._next,l._next=t):(t._next=e[i],e[i]=t),t._next?t._next._prev=t:e[r]=t,t._prev=l,t.parent=t._dp=e,t},Ns=function(e,t,i,r){i===void 0&&(i="_first"),r===void 0&&(r="_last");var n=t._prev,l=t._next;n?n._next=l:e[i]===t&&(e[i]=l),l?l._prev=n:e[r]===t&&(e[r]=n),t._next=t._prev=t.parent=null},ct=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},gt=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var i=e;i;)i._dirty=1,i=i.parent;return e},dl=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ui=function(e,t,i,r){return e._startAt&&(_e?e._startAt.revert(gs):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,r))},ul=function s(e){return!e||e._ts&&s(e.parent)},Ki=function(e){return e._repeat?Nt(e._tTime,e=e.duration()+e._rDelay)*e:0},Nt=function(e,t){var i=Math.floor(e=se(e/t));return e&&i===e?i-1:i},Ms=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Is=function(e){return e._end=se(e._start+(e._tDur/Math.abs(e._ts||e._rts||J)||0))},Bs=function(e,t){var i=e._dp;return i&&i.smoothChildTiming&&e._ts&&(e._start=se(i._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Is(e),i._dirty||gt(i,e)),e},sn=function(e,t){var i;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(i=Ms(e.rawTime(),t),(!t._dur||ns(0,t.totalDuration(),i)-t._tTime>J)&&t.render(i,!0)),gt(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(i=e;i._dp;)i.rawTime()>=0&&i.totalTime(i._tTime),i=i._dp;e._zTime=-J}},Ye=function(e,t,i,r){return t.parent&&ct(t),t._start=se((Je(i)?i:i||e!==ie?Fe(e,i,t):e._time)+t._delay),t._end=se(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),tn(e,t,"_first","_last",e._sort?"_start":0),hi(t)||(e._recent=t),r||sn(e,t),e._ts<0&&Bs(e,e._tTime),e},rn=function(e,t){return(Ne.ScrollTrigger||Ai("scrollTrigger",t))&&Ne.ScrollTrigger.create(t,e)},nn=function(e,t,i,r,n){if(Ni(e,t,n),!e._initted)return 1;if(!i&&e._pt&&!_e&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&Kr!==$e.frame)return ot.push(e),e._lazy=[n,r],1},hl=function s(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||s(t))},hi=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},fl=function(e,t,i,r){var n=e.ratio,l=t<0||!t&&(!e._start&&hl(e)&&!(!e._initted&&hi(e))||(e._ts<0||e._dp._ts<0)&&!hi(e))?0:1,o=e._rDelay,a=0,d,c,_;if(o&&e._repeat&&(a=ns(0,e._tDur,t),c=Nt(a,o),e._yoyo&&c&1&&(l=1-l),c!==Nt(e._tTime,o)&&(n=1-l,e.vars.repeatRefresh&&e._initted&&e.invalidate())),l!==n||_e||r||e._zTime===J||!t&&e._zTime){if(!e._initted&&nn(e,t,r,i,a))return;for(_=e._zTime,e._zTime=t||(i?J:0),i||(i=t&&!_),e.ratio=l,e._from&&(l=1-l),e._time=0,e._tTime=a,d=e._pt;d;)d.r(l,d.d),d=d._next;t<0&&ui(e,t,i,!0),e._onUpdate&&!i&&De(e,"onUpdate"),a&&e._repeat&&!i&&e.parent&&De(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===l&&(l&&ct(e,1),!i&&!_e&&(De(e,l?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},pl=function(e,t,i){var r;if(i>t)for(r=e._first;r&&r._start<=i;){if(r.data==="isPause"&&r._start>t)return r;r=r._next}else for(r=e._last;r&&r._start>=i;){if(r.data==="isPause"&&r._start<t)return r;r=r._prev}},It=function(e,t,i,r){var n=e._repeat,l=se(t)||0,o=e._tTime/e._tDur;return o&&!r&&(e._time*=l/e._dur),e._dur=l,e._tDur=n?n<0?1e10:se(l*(n+1)+e._rDelay*n):l,o>0&&!r&&Bs(e,e._tTime=e._tDur*o),e.parent&&Is(e),i||gt(e.parent,e),e},Zi=function(e){return e instanceof ke?gt(e):It(e,e._dur)},_l={_start:0,endTime:Jt,totalDuration:Jt},Fe=function s(e,t,i){var r=e.labels,n=e._recent||_l,l=e.duration()>=He?n.endTime(!1):e._dur,o,a,d;return he(t)&&(isNaN(t)||t in r)?(a=t.charAt(0),d=t.substr(-1)==="%",o=t.indexOf("="),a==="<"||a===">"?(o>=0&&(t=t.replace(/=/,"")),(a==="<"?n._start:n.endTime(n._repeat>=0))+(parseFloat(t.substr(1))||0)*(d?(o<0?n:i).totalDuration()/100:1)):o<0?(t in r||(r[t]=l),r[t]):(a=parseFloat(t.charAt(o-1)+t.substr(o+1)),d&&i&&(a=a/100*(me(i)?i[0]:i).totalDuration()),o>1?s(e,t.substr(0,o-1),i)+a:l+a)):t==null?l:+t},Qt=function(e,t,i){var r=Je(t[1]),n=(r?2:1)+(e<2?0:1),l=t[n],o,a;if(r&&(l.duration=t[1]),l.parent=i,e){for(o=l,a=i;a&&!("immediateRender"in o);)o=a.vars.defaults||{},a=Te(a.vars.inherit)&&a.parent;l.immediateRender=Te(o.immediateRender),e<2?l.runBackwards=1:l.startAt=t[n-1]}return new ce(t[0],l,t[n+1])},ht=function(e,t){return e||e===0?t(e):t},ns=function(e,t,i){return i<e?e:i>t?t:i},ye=function(e,t){return!he(e)||!(t=rl.exec(e))?"":t[1]},vl=function(e,t,i){return ht(i,function(r){return ns(e,t,r)})},fi=[].slice,ln=function(e,t){return e&&Qe(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Qe(e[0]))&&!e.nodeType&&e!==Ve},yl=function(e,t,i){return i===void 0&&(i=[]),e.forEach(function(r){var n;return he(r)&&!t||ln(r,1)?(n=i).push.apply(n,qe(r)):i.push(r)})||i},qe=function(e,t,i){return te&&!t&&te.selector?te.selector(e):he(e)&&!i&&(ci||!Bt())?fi.call((t||Ei).querySelectorAll(e),0):me(e)?yl(e,i):ln(e)?fi.call(e,0):e?[e]:[]},pi=function(e){return e=qe(e)[0]||Xt("Invalid scope")||{},function(t){var i=e.current||e.nativeElement||e;return qe(t,i.querySelectorAll?i:i===e?Xt("Invalid scope")||Ei.createElement("div"):e)}},on=function(e){return e.sort(function(){return .5-Math.random()})},an=function(e){if(le(e))return e;var t=Qe(e)?e:{each:e},i=bt(t.ease),r=t.from||0,n=parseFloat(t.base)||0,l={},o=r>0&&r<1,a=isNaN(r)||o,d=t.axis,c=r,_=r;return he(r)?c=_={center:.5,edges:.5,end:1}[r]||0:!o&&a&&(c=r[0],_=r[1]),function(h,m,g){var u=(g||t).length,y=l[u],p,f,v,b,x,T,w,L,S;if(!y){if(S=t.grid==="auto"?0:(t.grid||[1,He])[1],!S){for(w=-He;w<(w=g[S++].getBoundingClientRect().left)&&S<u;);S<u&&S--}for(y=l[u]=[],p=a?Math.min(S,u)*c-.5:r%S,f=S===He?0:a?u*_/S-.5:r/S|0,w=0,L=He,T=0;T<u;T++)v=T%S-p,b=f-(T/S|0),y[T]=x=d?Math.abs(d==="y"?b:v):Wr(v*v+b*b),x>w&&(w=x),x<L&&(L=x);r==="random"&&on(y),y.max=w-L,y.min=L,y.v=u=(parseFloat(t.amount)||parseFloat(t.each)*(S>u?u-1:d?d==="y"?u/S:S:Math.max(S,u/S))||0)*(r==="edges"?-1:1),y.b=u<0?n-u:n,y.u=ye(t.amount||t.each)||0,i=i&&u<0?Al(i):i}return u=(y[h]-y.min)/y.max||0,se(y.b+(i?i(u):u)*y.v)+y.u}},_i=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(i){var r=se(Math.round(parseFloat(i)/e)*e*t);return(r-r%1)/t+(Je(i)?0:ye(i))}},cn=function(e,t){var i=me(e),r,n;return!i&&Qe(e)&&(r=i=e.radius||He,e.values?(e=qe(e.values),(n=!Je(e[0]))&&(r*=r)):e=_i(e.increment)),ht(t,i?le(e)?function(l){return n=e(l),Math.abs(n-l)<=r?n:l}:function(l){for(var o=parseFloat(n?l.x:l),a=parseFloat(n?l.y:0),d=He,c=0,_=e.length,h,m;_--;)n?(h=e[_].x-o,m=e[_].y-a,h=h*h+m*m):h=Math.abs(e[_]-o),h<d&&(d=h,c=_);return c=!r||d<=r?e[c]:l,n||c===l||Je(l)?c:c+ye(l)}:_i(e))},dn=function(e,t,i,r){return ht(me(e)?!t:i===!0?!!(i=0):!r,function(){return me(e)?e[~~(Math.random()*e.length)]:(i=i||1e-5)&&(r=i<1?Math.pow(10,(i+"").length-2):1)&&Math.floor(Math.round((e-i/2+Math.random()*(t-e+i*.99))/i)*i*r)/r})},ml=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return function(r){return t.reduce(function(n,l){return l(n)},r)}},gl=function(e,t){return function(i){return e(parseFloat(i))+(t||ye(i))}},bl=function(e,t,i){return hn(e,t,0,1,i)},un=function(e,t,i){return ht(i,function(r){return e[~~t(r)]})},xl=function s(e,t,i){var r=t-e;return me(e)?un(e,s(0,e.length),t):ht(i,function(n){return(r+(n-e)%r)%r+e})},wl=function s(e,t,i){var r=t-e,n=r*2;return me(e)?un(e,s(0,e.length-1),t):ht(i,function(l){return l=(n+(l-e)%n)%n||0,e+(l>r?n-l:l)})},es=function(e){return e.replace(tl,function(t){var i=t.indexOf("[")+1,r=t.substring(i||7,i?t.indexOf("]"):t.length-1).split(sl);return dn(i?r:+r[0],i?0:+r[1],+r[2]||1e-5)})},hn=function(e,t,i,r,n){var l=t-e,o=r-i;return ht(n,function(a){return i+((a-e)/l*o||0)})},kl=function s(e,t,i,r){var n=isNaN(e+t)?0:function(m){return(1-m)*e+m*t};if(!n){var l=he(e),o={},a,d,c,_,h;if(i===!0&&(r=1)&&(i=null),l)e={p:e},t={p:t};else if(me(e)&&!me(t)){for(c=[],_=e.length,h=_-2,d=1;d<_;d++)c.push(s(e[d-1],e[d]));_--,n=function(g){g*=_;var u=Math.min(h,~~g);return c[u](g-u)},i=t}else r||(e=Rt(me(e)?[]:{},e));if(!c){for(a in t)Ri.call(o,e,a,"get",t[a]);n=function(g){return Fi(g,o)||(l?e.p:e)}}}return ht(i,n)},Xi=function(e,t,i){var r=e.labels,n=He,l,o,a;for(l in r)o=r[l]-t,o<0==!!i&&o&&n>(o=Math.abs(o))&&(a=l,n=o);return a},De=function(e,t,i){var r=e.vars,n=r[t],l=te,o=e._ctx,a,d,c;if(n)return a=r[t+"Params"],d=r.callbackScope||e,i&&ot.length&&Ls(),o&&(te=o),c=a?n.apply(d,a):n.call(d),te=l,c},zt=function(e){return ct(e),e.scrollTrigger&&e.scrollTrigger.kill(!!_e),e.progress()<1&&De(e,"onInterrupt"),e},At,fn=[],pn=function(e){if(e)if(e=!e.name&&e.default||e,Mi()||e.headless){var t=e.name,i=le(e),r=t&&!i&&e.init?function(){this._props=[]}:e,n={init:Jt,render:Fi,add:Ri,kill:Hl,modifier:Fl,rawVars:0},l={targetTest:0,get:0,getSetter:Bi,aliases:{},register:0};if(Bt(),e!==r){if(Pe[t])return;Ie(r,Ie(Cs(e,n),l)),Rt(r.prototype,Rt(n,Cs(e,l))),Pe[r.prop=t]=r,e.targetTest&&(bs.push(r),Pi[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Qr(t,r),e.register&&e.register(Me,r,Le)}else fn.push(e)},X=255,jt={aqua:[0,X,X],lime:[0,X,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,X],navy:[0,0,128],white:[X,X,X],olive:[128,128,0],yellow:[X,X,0],orange:[X,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[X,0,0],pink:[X,192,203],cyan:[0,X,X],transparent:[X,X,X,0]},zs=function(e,t,i){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(i-t)*e*6:e<.5?i:e*3<2?t+(i-t)*(2/3-e)*6:t)*X+.5|0},_n=function(e,t,i){var r=e?Je(e)?[e>>16,e>>8&X,e&X]:0:jt.black,n,l,o,a,d,c,_,h,m,g;if(!r){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),jt[e])r=jt[e];else if(e.charAt(0)==="#"){if(e.length<6&&(n=e.charAt(1),l=e.charAt(2),o=e.charAt(3),e="#"+n+n+l+l+o+o+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return r=parseInt(e.substr(1,6),16),[r>>16,r>>8&X,r&X,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),r=[e>>16,e>>8&X,e&X]}else if(e.substr(0,3)==="hsl"){if(r=g=e.match(Yi),!t)a=+r[0]%360/360,d=+r[1]/100,c=+r[2]/100,l=c<=.5?c*(d+1):c+d-c*d,n=c*2-l,r.length>3&&(r[3]*=1),r[0]=zs(a+1/3,n,l),r[1]=zs(a,n,l),r[2]=zs(a-1/3,n,l);else if(~e.indexOf("="))return r=e.match(jr),i&&r.length<4&&(r[3]=1),r}else r=e.match(Yi)||jt.transparent;r=r.map(Number)}return t&&!g&&(n=r[0]/X,l=r[1]/X,o=r[2]/X,_=Math.max(n,l,o),h=Math.min(n,l,o),c=(_+h)/2,_===h?a=d=0:(m=_-h,d=c>.5?m/(2-_-h):m/(_+h),a=_===n?(l-o)/m+(l<o?6:0):_===l?(o-n)/m+2:(n-l)/m+4,a*=60),r[0]=~~(a+.5),r[1]=~~(d*100+.5),r[2]=~~(c*100+.5)),i&&r.length<4&&(r[3]=1),r},vn=function(e){var t=[],i=[],r=-1;return e.split(at).forEach(function(n){var l=n.match(Et)||[];t.push.apply(t,l),i.push(r+=l.length+1)}),t.c=i,t},Ji=function(e,t,i){var r="",n=(e+r).match(at),l=t?"hsla(":"rgba(",o=0,a,d,c,_;if(!n)return e;if(n=n.map(function(h){return(h=_n(h,t,1))&&l+(t?h[0]+","+h[1]+"%,"+h[2]+"%,"+h[3]:h.join(","))+")"}),i&&(c=vn(e),a=i.c,a.join(r)!==c.c.join(r)))for(d=e.replace(at,"1").split(Et),_=d.length-1;o<_;o++)r+=d[o]+(~a.indexOf(o)?n.shift()||l+"0,0,0,0)":(c.length?c:n.length?n:i).shift());if(!d)for(d=e.split(at),_=d.length-1;o<_;o++)r+=d[o]+n[o];return r+d[_]},at=function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in jt)s+="|"+e+"\\b";return new RegExp(s+")","gi")}(),Tl=/hsl[a]?\(/,yn=function(e){var t=e.join(" "),i;if(at.lastIndex=0,at.test(t))return i=Tl.test(t),e[1]=Ji(e[1],i),e[0]=Ji(e[0],i,vn(e[1])),!0},ts,$e=function(){var s=Date.now,e=500,t=33,i=s(),r=i,n=1e3/240,l=n,o=[],a,d,c,_,h,m,g=function u(y){var p=s()-r,f=y===!0,v,b,x,T;if((p>e||p<0)&&(i+=p-t),r+=p,x=r-i,v=x-l,(v>0||f)&&(T=++_.frame,h=x-_.time*1e3,_.time=x=x/1e3,l+=v+(v>=n?4:n-v),b=1),f||(a=d(u)),b)for(m=0;m<o.length;m++)o[m](x,h,T,y)};return _={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(y){return h/(1e3/(y||60))},wake:function(){Yr&&(!ci&&Mi()&&(Ve=ci=window,Ei=Ve.document||{},Ne.gsap=Me,(Ve.gsapVersions||(Ve.gsapVersions=[])).push(Me.version),Ur(Ss||Ve.GreenSockGlobals||!Ve.gsap&&Ve||{}),fn.forEach(pn)),c=typeof requestAnimationFrame<"u"&&requestAnimationFrame,a&&_.sleep(),d=c||function(y){return setTimeout(y,l-_.time*1e3+1|0)},ts=1,g(2))},sleep:function(){(c?cancelAnimationFrame:clearTimeout)(a),ts=0,d=Jt},lagSmoothing:function(y,p){e=y||1/0,t=Math.min(p||33,e)},fps:function(y){n=1e3/(y||240),l=_.time*1e3+n},add:function(y,p,f){var v=p?function(b,x,T,w){y(b,x,T,w),_.remove(v)}:y;return _.remove(y),o[f?"unshift":"push"](v),Bt(),v},remove:function(y,p){~(p=o.indexOf(y))&&o.splice(p,1)&&m>=p&&m--},_listeners:o},_}(),Bt=function(){return!ts&&$e.wake()},Y={},Sl=/^[\d.\-M][\d.\-,\s]/,Ll=/["']/g,Cl=function(e){for(var t={},i=e.substr(1,e.length-3).split(":"),r=i[0],n=1,l=i.length,o,a,d;n<l;n++)a=i[n],o=n!==l-1?a.lastIndexOf(","):a.length,d=a.substr(0,o),t[r]=isNaN(d)?d.replace(Ll,"").trim():+d,r=a.substr(o+1).trim();return t},Ml=function(e){var t=e.indexOf("(")+1,i=e.indexOf(")"),r=e.indexOf("(",t);return e.substring(t,~r&&r<i?e.indexOf(")",i+1):i)},El=function(e){var t=(e+"").split("("),i=Y[t[0]];return i&&t.length>1&&i.config?i.config.apply(null,~e.indexOf("{")?[Cl(t[1])]:Ml(e).split(",").map(Jr)):Y._CE&&Sl.test(e)?Y._CE("",e):i},Al=function(e){return function(t){return 1-e(1-t)}},bt=function(e,t){return e&&(le(e)?e:Y[e]||El(e))||t},kt=function(e,t,i,r){i===void 0&&(i=function(a){return 1-t(1-a)}),r===void 0&&(r=function(a){return a<.5?t(a*2)/2:1-t((1-a)*2)/2});var n={easeIn:t,easeOut:i,easeInOut:r},l;return Se(e,function(o){Y[o]=Ne[o]=n,Y[l=o.toLowerCase()]=i;for(var a in n)Y[l+(a==="easeIn"?".in":a==="easeOut"?".out":".inOut")]=Y[o+"."+a]=n[a]}),n},mn=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},js=function s(e,t,i){var r=t>=1?t:1,n=(i||(e?.3:.45))/(t<1?t:1),l=n/ai*(Math.asin(1/r)||0),o=function(c){return c===1?1:r*Math.pow(2,-10*c)*el((c-l)*n)+1},a=e==="out"?o:e==="in"?function(d){return 1-o(1-d)}:mn(o);return n=ai/n,a.config=function(d,c){return s(e,d,c)},a},Vs=function s(e,t){t===void 0&&(t=1.70158);var i=function(l){return l?--l*l*((t+1)*l+t)+1:0},r=e==="out"?i:e==="in"?function(n){return 1-i(1-n)}:mn(i);return r.config=function(n){return s(e,n)},r};Se("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,e){var t=e<5?e+1:e;kt(s+",Power"+(t-1),e?function(i){return Math.pow(i,t)}:function(i){return i},function(i){return 1-Math.pow(1-i,t)},function(i){return i<.5?Math.pow(i*2,t)/2:1-Math.pow((1-i)*2,t)/2})});Y.Linear.easeNone=Y.none=Y.Linear.easeIn;kt("Elastic",js("in"),js("out"),js());(function(s,e){var t=1/e,i=2*t,r=2.5*t,n=function(o){return o<t?s*o*o:o<i?s*Math.pow(o-1.5/e,2)+.75:o<r?s*(o-=2.25/e)*o+.9375:s*Math.pow(o-2.625/e,2)+.984375};kt("Bounce",function(l){return 1-n(1-l)},n)})(7.5625,2.75);kt("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});kt("Circ",function(s){return-(Wr(1-s*s)-1)});kt("Sine",function(s){return s===1?1:-Jn(s*Zn)+1});kt("Back",Vs("in"),Vs("out"),Vs());Y.SteppedEase=Y.steps=Ne.SteppedEase={config:function(e,t){e===void 0&&(e=1);var i=1/e,r=e+(t?0:1),n=t?1:0,l=1-J;return function(o){return((r*ns(0,l,o)|0)+n)*i}}};Zt.ease=Y["quad.out"];Se("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return $i+=s+","+s+"Params,"});var gn=function(e,t){this.id=Xn++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:Zr,this.set=t?t.getSetter:Bi},ss=function(){function s(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,It(this,+t.duration,1,1),this.data=t.data,te&&(this._ctx=te,te.data.push(this)),ts||$e.wake()}var e=s.prototype;return e.delay=function(i){return i||i===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+i-this._delay),this._delay=i,this):this._delay},e.duration=function(i){return arguments.length?this.totalDuration(this._repeat>0?i+(i+this._rDelay)*this._repeat:i):this.totalDuration()&&this._dur},e.totalDuration=function(i){return arguments.length?(this._dirty=0,It(this,this._repeat<0?i:(i-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(i,r){if(Bt(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(Bs(this,i),!n._dp||n.parent||sn(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&i<this._tDur||this._ts<0&&i>0||!this._tDur&&!i)&&Ye(this._dp,this,this._start-this._delay)}return(this._tTime!==i||!this._dur&&!r||this._initted&&Math.abs(this._zTime)===J||!this._initted&&this._dur&&i||!i&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=i),Xr(this,i,r)),this},e.time=function(i,r){return arguments.length?this.totalTime(Math.min(this.totalDuration(),i+Ki(this))%(this._dur+this._rDelay)||(i?this._dur:0),r):this._time},e.totalProgress=function(i,r){return arguments.length?this.totalTime(this.totalDuration()*i,r):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(i,r){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-i:i)+Ki(this),r):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(i,r){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(i-1)*n,r):this._repeat?Nt(this._tTime,n)+1:1},e.timeScale=function(i,r){if(!arguments.length)return this._rts===-J?0:this._rts;if(this._rts===i)return this;var n=this.parent&&this._ts?Ms(this.parent._time,this):this._tTime;return this._rts=+i||0,this._ts=this._ps||i===-J?0:this._rts,this.totalTime(ns(-Math.abs(this._delay),this.totalDuration(),n),r!==!1),Is(this),dl(this)},e.paused=function(i){return arguments.length?(this._ps!==i&&(this._ps=i,i?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Bt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==J&&(this._tTime-=J)))),this):this._ps},e.startTime=function(i){if(arguments.length){this._start=se(i);var r=this.parent||this._dp;return r&&(r._sort||!this.parent)&&Ye(r,this,this._start-this._delay),this}return this._start},e.endTime=function(i){return this._start+(Te(i)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(i){var r=this.parent||this._dp;return r?i&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ms(r.rawTime(i),this):this._tTime:this._tTime},e.revert=function(i){i===void 0&&(i=ll);var r=_e;return _e=i,Oi(this)&&(this.timeline&&this.timeline.revert(i),this.totalTime(-.01,i.suppressEvents)),this.data!=="nested"&&i.kill!==!1&&this.kill(),_e=r,this},e.globalTime=function(i){for(var r=this,n=arguments.length?i:r.rawTime();r;)n=r._start+n/(Math.abs(r._ts)||1),r=r._dp;return!this.parent&&this._sat?this._sat.globalTime(i):n},e.repeat=function(i){return arguments.length?(this._repeat=i===1/0?-2:i,Zi(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(i){if(arguments.length){var r=this._time;return this._rDelay=i,Zi(this),r?this.time(r):this}return this._rDelay},e.yoyo=function(i){return arguments.length?(this._yoyo=i,this):this._yoyo},e.seek=function(i,r){return this.totalTime(Fe(this,i),Te(r))},e.restart=function(i,r){return this.play().totalTime(i?-this._delay:0,Te(r)),this._dur||(this._zTime=-J),this},e.play=function(i,r){return i!=null&&this.seek(i,r),this.reversed(!1).paused(!1)},e.reverse=function(i,r){return i!=null&&this.seek(i||this.totalDuration(),r),this.reversed(!0).paused(!1)},e.pause=function(i,r){return i!=null&&this.seek(i,r),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(i){return arguments.length?(!!i!==this.reversed()&&this.timeScale(-this._rts||(i?-J:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-J,this},e.isActive=function(){var i=this.parent||this._dp,r=this._start,n;return!!(!i||this._ts&&this._initted&&i.isActive()&&(n=i.rawTime(!0))>=r&&n<this.endTime(!0)-J)},e.eventCallback=function(i,r,n){var l=this.vars;return arguments.length>1?(r?(l[i]=r,n&&(l[i+"Params"]=n),i==="onUpdate"&&(this._onUpdate=r)):delete l[i],this):l[i]},e.then=function(i){var r=this,n=r._prom;return new Promise(function(l){var o=le(i)?i:en,a=function(){var c=r.then;r.then=null,n&&n(),le(o)&&(o=o(r))&&(o.then||o===r)&&(r.then=c),l(o),r.then=c};r._initted&&r.totalProgress()===1&&r._ts>=0||!r._tTime&&r._ts<0?a():r._prom=a})},e.kill=function(){zt(this)},s}();Ie(ss.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-J,_prom:0,_ps:!1,_rts:1});var ke=function(s){Gr(e,s);function e(i,r){var n;return i===void 0&&(i={}),n=s.call(this,i)||this,n.labels={},n.smoothChildTiming=!!i.smoothChildTiming,n.autoRemoveChildren=!!i.autoRemoveChildren,n._sort=Te(i.sortChildren),ie&&Ye(i.parent||ie,Ze(n),r),i.reversed&&n.reverse(),i.paused&&n.paused(!0),i.scrollTrigger&&rn(Ze(n),i.scrollTrigger),n}var t=e.prototype;return t.to=function(r,n,l){return Qt(0,arguments,this),this},t.from=function(r,n,l){return Qt(1,arguments,this),this},t.fromTo=function(r,n,l,o){return Qt(2,arguments,this),this},t.set=function(r,n,l){return n.duration=0,n.parent=this,Ut(n).repeatDelay||(n.repeat=0),n.immediateRender=!!n.immediateRender,new ce(r,n,Fe(this,l),1),this},t.call=function(r,n,l){return Ye(this,ce.delayedCall(0,r,n),l)},t.staggerTo=function(r,n,l,o,a,d,c){return l.duration=n,l.stagger=l.stagger||o,l.onComplete=d,l.onCompleteParams=c,l.parent=this,new ce(r,l,Fe(this,a)),this},t.staggerFrom=function(r,n,l,o,a,d,c){return l.runBackwards=1,Ut(l).immediateRender=Te(l.immediateRender),this.staggerTo(r,n,l,o,a,d,c)},t.staggerFromTo=function(r,n,l,o,a,d,c,_){return o.startAt=l,Ut(o).immediateRender=Te(o.immediateRender),this.staggerTo(r,n,o,a,d,c,_)},t.render=function(r,n,l){var o=this._time,a=this._dirty?this.totalDuration():this._tDur,d=this._dur,c=r<=0?0:se(r),_=this._zTime<0!=r<0&&(this._initted||!d),h,m,g,u,y,p,f,v,b,x,T,w;if(this!==ie&&c>a&&r>=0&&(c=a),c!==this._tTime||l||_){if(o!==this._time&&d&&(c+=this._time-o,r+=this._time-o),h=c,b=this._start,v=this._ts,p=!v,_&&(d||(o=this._zTime),(r||!n)&&(this._zTime=r)),this._repeat){if(T=this._yoyo,y=d+this._rDelay,this._repeat<-1&&r<0)return this.totalTime(y*100+r,n,l);if(h=se(c%y),c===a?(u=this._repeat,h=d):(x=se(c/y),u=~~x,u&&u===x&&(h=d,u--),h>d&&(h=d)),x=Nt(this._tTime,y),!o&&this._tTime&&x!==u&&this._tTime-x*y-this._dur<=0&&(x=u),T&&u&1&&(h=d-h,w=1),u!==x&&!this._lock){var L=T&&x&1,S=L===(T&&u&1);if(u<x&&(L=!L),o=L?0:c%d?d:c,this._lock=1,this.render(o||(w?0:se(u*y)),n,!d)._lock=0,this._tTime=c,!n&&this.parent&&De(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1,x=u),o&&o!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(d=this._dur,a=this._tDur,S&&(this._lock=2,o=L?d:-1e-4,this.render(o,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(f=pl(this,se(o),se(h)),f&&(c-=h-(h=f._start))),this._tTime=c,this._time=h,this._act=!!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=r,o=0),!o&&c&&d&&!n&&!x&&(De(this,"onStart"),this._tTime!==c))return this;if(h>=o&&r>=0)for(m=this._first;m;){if(g=m._next,(m._act||h>=m._start)&&m._ts&&f!==m){if(m.parent!==this)return this.render(r,n,l);if(m.render(m._ts>0?(h-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(h-m._start)*m._ts,n,l),h!==this._time||!this._ts&&!p){f=0,g&&(c+=this._zTime=-J);break}}m=g}else{m=this._last;for(var M=r<0?r:h;m;){if(g=m._prev,(m._act||M<=m._end)&&m._ts&&f!==m){if(m.parent!==this)return this.render(r,n,l);if(m.render(m._ts>0?(M-m._start)*m._ts:(m._dirty?m.totalDuration():m._tDur)+(M-m._start)*m._ts,n,l||_e&&Oi(m)),h!==this._time||!this._ts&&!p){f=0,g&&(c+=this._zTime=M?-J:J);break}}m=g}}if(f&&!n&&(this.pause(),f.render(h>=o?0:-J)._zTime=h>=o?1:-1,this._ts))return this._start=b,Is(this),this.render(r,n,l);this._onUpdate&&!n&&De(this,"onUpdate",!0),(c===a&&this._tTime>=this.totalDuration()||!c&&o)&&(b===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((r||!d)&&(c===a&&this._ts>0||!c&&this._ts<0)&&ct(this,1),!n&&!(r<0&&!o)&&(c||o||!a)&&(De(this,c===a&&r>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(c<a&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(r,n){var l=this;if(Je(n)||(n=Fe(this,n,r)),!(r instanceof ss)){if(me(r))return r.forEach(function(o){return l.add(o,n)}),this;if(he(r))return this.addLabel(r,n);if(le(r))r=ce.delayedCall(0,r);else return this}return this!==r?Ye(this,r,n):this},t.getChildren=function(r,n,l,o){r===void 0&&(r=!0),n===void 0&&(n=!0),l===void 0&&(l=!0),o===void 0&&(o=-He);for(var a=[],d=this._first;d;)d._start>=o&&(d instanceof ce?n&&a.push(d):(l&&a.push(d),r&&a.push.apply(a,d.getChildren(!0,n,l)))),d=d._next;return a},t.getById=function(r){for(var n=this.getChildren(1,1,1),l=n.length;l--;)if(n[l].vars.id===r)return n[l]},t.remove=function(r){return he(r)?this.removeLabel(r):le(r)?this.killTweensOf(r):(r.parent===this&&Ns(this,r),r===this._recent&&(this._recent=this._last),gt(this))},t.totalTime=function(r,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=se($e.time-(this._ts>0?r/this._ts:(this.totalDuration()-r)/-this._ts))),s.prototype.totalTime.call(this,r,n),this._forcing=0,this):this._tTime},t.addLabel=function(r,n){return this.labels[r]=Fe(this,n),this},t.removeLabel=function(r){return delete this.labels[r],this},t.addPause=function(r,n,l){var o=ce.delayedCall(0,n||Jt,l);return o.data="isPause",this._hasPause=1,Ye(this,o,Fe(this,r))},t.removePause=function(r){var n=this._first;for(r=Fe(this,r);n;)n._start===r&&n.data==="isPause"&&ct(n),n=n._next},t.killTweensOf=function(r,n,l){for(var o=this.getTweensOf(r,l),a=o.length;a--;)rt!==o[a]&&o[a].kill(r,n);return this},t.getTweensOf=function(r,n){for(var l=[],o=qe(r),a=this._first,d=Je(n),c;a;)a instanceof ce?ol(a._targets,o)&&(d?(!rt||a._initted&&a._ts)&&a.globalTime(0)<=n&&a.globalTime(a.totalDuration())>n:!n||a.isActive())&&l.push(a):(c=a.getTweensOf(o,n)).length&&l.push.apply(l,c),a=a._next;return l},t.tweenTo=function(r,n){n=n||{};var l=this,o=Fe(l,r),a=n,d=a.startAt,c=a.onStart,_=a.onStartParams,h=a.immediateRender,m,g=ce.to(l,Ie({ease:n.ease||"none",lazy:!1,immediateRender:!1,time:o,overwrite:"auto",duration:n.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale())||J,onStart:function(){if(l.pause(),!m){var y=n.duration||Math.abs((o-(d&&"time"in d?d.time:l._time))/l.timeScale());g._dur!==y&&It(g,y,0,1).render(g._time,!0,!0),m=1}c&&c.apply(g,_||[])}},n));return h?g.render(0):g},t.tweenFromTo=function(r,n,l){return this.tweenTo(n,Ie({startAt:{time:Fe(this,r)}},l))},t.recent=function(){return this._recent},t.nextLabel=function(r){return r===void 0&&(r=this._time),Xi(this,Fe(this,r))},t.previousLabel=function(r){return r===void 0&&(r=this._time),Xi(this,Fe(this,r),1)},t.currentLabel=function(r){return arguments.length?this.seek(r,!0):this.previousLabel(this._time+J)},t.shiftChildren=function(r,n,l){l===void 0&&(l=0);var o=this._first,a=this.labels,d;for(r=se(r);o;)o._start>=l&&(o._start+=r,o._end+=r),o=o._next;if(n)for(d in a)a[d]>=l&&(a[d]+=r);return gt(this)},t.invalidate=function(r){var n=this._first;for(this._lock=0;n;)n.invalidate(r),n=n._next;return s.prototype.invalidate.call(this,r)},t.clear=function(r){r===void 0&&(r=!0);for(var n=this._first,l;n;)l=n._next,this.remove(n),n=l;return this._dp&&(this._time=this._tTime=this._pTime=0),r&&(this.labels={}),gt(this)},t.totalDuration=function(r){var n=0,l=this,o=l._last,a=He,d,c,_;if(arguments.length)return l.timeScale((l._repeat<0?l.duration():l.totalDuration())/(l.reversed()?-r:r));if(l._dirty){for(_=l.parent;o;)d=o._prev,o._dirty&&o.totalDuration(),c=o._start,c>a&&l._sort&&o._ts&&!l._lock?(l._lock=1,Ye(l,o,c-o._delay,1)._lock=0):a=c,c<0&&o._ts&&(n-=c,(!_&&!l._dp||_&&_.smoothChildTiming)&&(l._start+=se(c/l._ts),l._time-=c,l._tTime-=c),l.shiftChildren(-c,!1,-1/0),a=0),o._end>n&&o._ts&&(n=o._end),o=d;It(l,l===ie&&l._time>n?l._time:n,1,1),l._dirty=0}return l._tDur},e.updateRoot=function(r){if(ie._ts&&(Xr(ie,Ms(r,ie)),Kr=$e.frame),$e.frame>=Ui){Ui+=Re.autoSleep||120;var n=ie._first;if((!n||!n._ts)&&Re.autoSleep&&$e._listeners.length<2){for(;n&&!n._ts;)n=n._next;n||$e.sleep()}}},e}(ss);Ie(ke.prototype,{_lock:0,_hasPause:0,_forcing:0});var Pl=function(e,t,i,r,n,l,o){var a=new Le(this._pt,e,t,0,1,Sn,null,n),d=0,c=0,_,h,m,g,u,y,p,f;for(a.b=i,a.e=r,i+="",r+="",(p=~r.indexOf("random("))&&(r=es(r)),l&&(f=[i,r],l(f,e,t),i=f[0],r=f[1]),h=i.match(Gs)||[];_=Gs.exec(r);)g=_[0],u=r.substring(d,_.index),m?m=(m+1)%5:u.substr(-5)==="rgba("&&(m=1),g!==h[c++]&&(y=parseFloat(h[c-1])||0,a._pt={_next:a._pt,p:u||c===1?u:",",s:y,c:g.charAt(1)==="="?Pt(y,g)-y:parseFloat(g)-y,m:m&&m<4?Math.round:0},d=Gs.lastIndex);return a.c=d<r.length?r.substring(d,r.length):"",a.fp=o,(Vr.test(r)||p)&&(a.e=0),this._pt=a,a},Ri=function(e,t,i,r,n,l,o,a,d,c){le(r)&&(r=r(n||0,e,l));var _=e[t],h=i!=="get"?i:le(_)?d?e[t.indexOf("set")||!le(e["get"+t.substr(3)])?t:"get"+t.substr(3)](d):e[t]():_,m=le(_)?d?Nl:kn:Ii,g;if(he(r)&&(~r.indexOf("random(")&&(r=es(r)),r.charAt(1)==="="&&(g=Pt(h,r)+(ye(h)||0),(g||g===0)&&(r=g))),!c||h!==r||vi)return!isNaN(h*r)&&r!==""?(g=new Le(this._pt,e,t,+h||0,r-(h||0),typeof _=="boolean"?Bl:Tn,0,m),d&&(g.fp=d),o&&g.modifier(o,this,e),this._pt=g):(!_&&!(t in e)&&Ai(t,r),Pl.call(this,e,t,h,r,m,a||Re.stringFilter,d))},$l=function(e,t,i,r,n){if(le(e)&&(e=Kt(e,n,t,i,r)),!Qe(e)||e.style&&e.nodeType||me(e)||zr(e))return he(e)?Kt(e,n,t,i,r):e;var l={},o;for(o in e)l[o]=Kt(e[o],n,t,i,r);return l},bn=function(e,t,i,r,n,l){var o,a,d,c;if(Pe[e]&&(o=new Pe[e]).init(n,o.rawVars?t[e]:$l(t[e],r,n,l,i),i,r,l)!==!1&&(i._pt=a=new Le(i._pt,n,e,0,1,o.render,o,0,o.priority),i!==At))for(d=i._ptLookup[i._targets.indexOf(n)],c=o._props.length;c--;)d[o._props[c]]=a;return o},rt,vi,Ni=function s(e,t,i){var r=e.vars,n=r.ease,l=r.startAt,o=r.immediateRender,a=r.lazy,d=r.onUpdate,c=r.runBackwards,_=r.yoyoEase,h=r.keyframes,m=r.autoRevert,g=e._dur,u=e._startAt,y=e._targets,p=e.parent,f=p&&p.data==="nested"?p.vars.targets:y,v=e._overwrite==="auto"&&!Li,b=e.timeline,x=r.easeReverse||_,T,w,L,S,M,O,R,D,B,W,q,z,ee;if(b&&(!h||!n)&&(n="none"),e._ease=bt(n,Zt.ease),e._rEase=x&&(bt(x)||e._ease),e._from=!b&&!!r.runBackwards,e._from&&(e.ratio=1),!b||h&&!r.stagger){if(D=y[0]?mt(y[0]).harness:0,z=D&&r[D.prop],T=Cs(r,Pi),u&&(u._zTime<0&&u.progress(1),t<0&&c&&o&&!m?u.render(-1,!0):u.revert(c&&g?gs:nl),u._lazy=0),l){if(ct(e._startAt=ce.set(y,Ie({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!u&&Te(a),startAt:null,delay:0,onUpdate:d&&function(){return De(e,"onUpdate")},stagger:0},l))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_e||!o&&!m)&&e._startAt.revert(gs),o&&g&&t<=0&&i<=0){t&&(e._zTime=t);return}}else if(c&&g&&!u){if(t&&(o=!1),L=Ie({overwrite:!1,data:"isFromStart",lazy:o&&!u&&Te(a),immediateRender:o,stagger:0,parent:p},T),z&&(L[D.prop]=z),ct(e._startAt=ce.set(y,L)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(_e?e._startAt.revert(gs):e._startAt.render(-1,!0)),e._zTime=t,!o)s(e._startAt,J,J);else if(!t)return}for(e._pt=e._ptCache=0,a=g&&Te(a)||a&&!g,w=0;w<y.length;w++){if(M=y[w],R=M._gsap||Di(y)[w]._gsap,e._ptLookup[w]=W={},di[R.id]&&ot.length&&Ls(),q=f===y?w:f.indexOf(M),D&&(B=new D).init(M,z||T,e,q,f)!==!1&&(e._pt=S=new Le(e._pt,M,B.name,0,1,B.render,B,0,B.priority),B._props.forEach(function(ge){W[ge]=S}),B.priority&&(O=1)),!D||z)for(L in T)Pe[L]&&(B=bn(L,T,e,q,M,f))?B.priority&&(O=1):W[L]=S=Ri.call(e,M,L,"get",T[L],q,f,0,r.stringFilter);e._op&&e._op[w]&&e.kill(M,e._op[w]),v&&e._pt&&(rt=e,ie.killTweensOf(M,W,e.globalTime(t)),ee=!e.parent,rt=0),e._pt&&a&&(di[R.id]=1)}O&&Ln(e),e._onInit&&e._onInit(e)}e._onUpdate=d,e._initted=(!e._op||e._pt)&&!ee,h&&t<=0&&b.render(He,!0,!0)},Dl=function(e,t,i,r,n,l,o,a){var d=(e._pt&&e._ptCache||(e._ptCache={}))[t],c,_,h,m;if(!d)for(d=e._ptCache[t]=[],h=e._ptLookup,m=e._targets.length;m--;){if(c=h[m][t],c&&c.d&&c.d._pt)for(c=c.d._pt;c&&c.p!==t&&c.fp!==t;)c=c._next;if(!c)return vi=1,e.vars[t]="+=0",Ni(e,o),vi=0,a?Xt(t+" not eligible for reset. Try splitting into individual properties"):1;d.push(c)}for(m=d.length;m--;)_=d[m],c=_._pt||_,c.s=(r||r===0)&&!n?r:c.s+(r||0)+l*c.c,c.c=i-c.s,_.e&&(_.e=ae(i)+ye(_.e)),_.b&&(_.b=c.s+ye(_.b))},Ol=function(e,t){var i=e[0]?mt(e[0]).harness:0,r=i&&i.aliases,n,l,o,a;if(!r)return t;n=Rt({},t);for(l in r)if(l in n)for(a=r[l].split(","),o=a.length;o--;)n[a[o]]=n[l];return n},Rl=function(e,t,i,r){var n=t.ease||r||"power1.inOut",l,o;if(me(t))o=i[e]||(i[e]=[]),t.forEach(function(a,d){return o.push({t:d/(t.length-1)*100,v:a,e:n})});else for(l in t)o=i[l]||(i[l]=[]),l==="ease"||o.push({t:parseFloat(e),v:t[l],e:n})},Kt=function(e,t,i,r,n){return le(e)?e.call(t,i,r,n):he(e)&&~e.indexOf("random(")?es(e):e},xn=$i+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",wn={};Se(xn+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return wn[s]=1});var ce=function(s){Gr(e,s);function e(i,r,n,l){var o;typeof r=="number"&&(n.duration=r,r=n,n=null),o=s.call(this,l?r:Ut(r))||this;var a=o.vars,d=a.duration,c=a.delay,_=a.immediateRender,h=a.stagger,m=a.overwrite,g=a.keyframes,u=a.defaults,y=a.scrollTrigger,p=r.parent||ie,f=(me(i)||zr(i)?Je(i[0]):"length"in r)?[i]:qe(i),v,b,x,T,w,L,S,M;if(o._targets=f.length?Di(f):Xt("GSAP target "+i+" not found. https://gsap.com",!Re.nullTargetWarn)||[],o._ptLookup=[],o._overwrite=m,g||h||as(d)||as(c)){r=o.vars;var O=r.easeReverse||r.yoyoEase;if(v=o.timeline=new ke({data:"nested",defaults:u||{},targets:p&&p.data==="nested"?p.vars.targets:f}),v.kill(),v.parent=v._dp=Ze(o),v._start=0,h||as(d)||as(c)){if(T=f.length,S=h&&an(h),Qe(h))for(w in h)~xn.indexOf(w)&&(M||(M={}),M[w]=h[w]);for(b=0;b<T;b++)x=Cs(r,wn),x.stagger=0,O&&(x.easeReverse=O),M&&Rt(x,M),L=f[b],x.duration=+Kt(d,Ze(o),b,L,f),x.delay=(+Kt(c,Ze(o),b,L,f)||0)-o._delay,!h&&T===1&&x.delay&&(o._delay=c=x.delay,o._start+=c,x.delay=0),v.to(L,x,S?S(b,L,f):0),v._ease=Y.none;v.duration()?d=c=0:o.timeline=0}else if(g){Ut(Ie(v.vars.defaults,{ease:"none"})),v._ease=bt(g.ease||r.ease||"none");var R=0,D,B,W;if(me(g))g.forEach(function(q){return v.to(f,q,">")}),v.duration();else{x={};for(w in g)w==="ease"||w==="easeEach"||Rl(w,g[w],x,g.easeEach);for(w in x)for(D=x[w].sort(function(q,z){return q.t-z.t}),R=0,b=0;b<D.length;b++)B=D[b],W={ease:B.e,duration:(B.t-(b?D[b-1].t:0))/100*d},W[w]=B.v,v.to(f,W,R),R+=W.duration;v.duration()<d&&v.to({},{duration:d-v.duration()})}}d||o.duration(d=v.duration())}else o.timeline=0;return m===!0&&!Li&&(rt=Ze(o),ie.killTweensOf(f),rt=0),Ye(p,Ze(o),n),r.reversed&&o.reverse(),r.paused&&o.paused(!0),(_||!d&&!g&&o._start===se(p._time)&&Te(_)&&ul(Ze(o))&&p.data!=="nested")&&(o._tTime=-J,o.render(Math.max(0,-c)||0)),y&&rn(Ze(o),y),o}var t=e.prototype;return t.render=function(r,n,l){var o=this._time,a=this._tDur,d=this._dur,c=r<0,_=r>a-J&&!c?a:r<J?0:r,h,m,g,u,y,p,f,v;if(!d)fl(this,r,n,l);else if(_!==this._tTime||!r||l||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==c||this._lazy){if(h=_,v=this.timeline,this._repeat){if(u=d+this._rDelay,this._repeat<-1&&c)return this.totalTime(u*100+r,n,l);if(h=se(_%u),_===a?(g=this._repeat,h=d):(y=se(_/u),g=~~y,g&&g===y?(h=d,g--):h>d&&(h=d)),p=this._yoyo&&g&1,p&&(h=d-h),y=Nt(this._tTime,u),h===o&&!l&&this._initted&&g===y)return this._tTime=_,this;g!==y&&this.vars.repeatRefresh&&!p&&!this._lock&&h!==u&&this._initted&&(this._lock=l=1,this.render(se(u*g),!0).invalidate()._lock=0)}if(!this._initted){if(nn(this,c?r:h,l,n,_))return this._tTime=0,this;if(o!==this._time&&!(l&&this.vars.repeatRefresh&&g!==y))return this;if(d!==this._dur)return this.render(r,n,l)}if(this._rEase){var b=h<o;if(b!==this._inv){var x=b?o:d-o;this._inv=b,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=o,this._invRecip=x?(b?-1:1)/x:0,this._invScale=b?-this.ratio:1-this.ratio,this._invEase=b?this._rEase:this._ease}this.ratio=f=this._invRatio+this._invScale*this._invEase((h-this._invTime)*this._invRecip)}else this.ratio=f=this._ease(h/d);if(this._from&&(this.ratio=f=1-f),this._tTime=_,this._time=h,!this._act&&this._ts&&(this._act=1,this._lazy=0),!o&&_&&!n&&!y&&(De(this,"onStart"),this._tTime!==_))return this;for(m=this._pt;m;)m.r(f,m.d),m=m._next;v&&v.render(r<0?r:v._dur*v._ease(h/this._dur),n,l)||this._startAt&&(this._zTime=r),this._onUpdate&&!n&&(c&&ui(this,r,n,l),De(this,"onUpdate")),this._repeat&&g!==y&&this.vars.onRepeat&&!n&&this.parent&&De(this,"onRepeat"),(_===this._tDur||!_)&&this._tTime===_&&(c&&!this._onUpdate&&ui(this,r,!0,!0),(r||!d)&&(_===this._tDur&&this._ts>0||!_&&this._ts<0)&&ct(this,1),!n&&!(c&&!o)&&(_||o||p)&&(De(this,_===a?"onComplete":"onReverseComplete",!0),this._prom&&!(_<a&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(r){return(!r||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(r),s.prototype.invalidate.call(this,r)},t.resetTo=function(r,n,l,o,a){ts||$e.wake(),this._ts||this.play();var d=Math.min(this._dur,(this._dp._time-this._start)*this._ts),c;return this._initted||Ni(this,d),c=this._ease(d/this._dur),Dl(this,r,n,l,o,c,d,a)?this.resetTo(r,n,l,o,1):(Bs(this,0),this.parent||tn(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(r,n){if(n===void 0&&(n="all"),!r&&(!n||n==="all"))return this._lazy=this._pt=0,this.parent?zt(this):this.scrollTrigger&&this.scrollTrigger.kill(!!_e),this;if(this.timeline){var l=this.timeline.totalDuration();return this.timeline.killTweensOf(r,n,rt&&rt.vars.overwrite!==!0)._first||zt(this),this.parent&&l!==this.timeline.totalDuration()&&It(this,this._dur*this.timeline._tDur/l,0,1),this}var o=this._targets,a=r?qe(r):o,d=this._ptLookup,c=this._pt,_,h,m,g,u,y,p;if((!n||n==="all")&&cl(o,a))return n==="all"&&(this._pt=0),zt(this);for(_=this._op=this._op||[],n!=="all"&&(he(n)&&(u={},Se(n,function(f){return u[f]=1}),n=u),n=Ol(o,n)),p=o.length;p--;)if(~a.indexOf(o[p])){h=d[p],n==="all"?(_[p]=n,g=h,m={}):(m=_[p]=_[p]||{},g=n);for(u in g)y=h&&h[u],y&&((!("kill"in y.d)||y.d.kill(u)===!0)&&Ns(this,y,"_pt"),delete h[u]),m!=="all"&&(m[u]=1)}return this._initted&&!this._pt&&c&&zt(this),this},e.to=function(r,n){return new e(r,n,arguments[2])},e.from=function(r,n){return Qt(1,arguments)},e.delayedCall=function(r,n,l,o){return new e(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:r,onComplete:n,onReverseComplete:n,onCompleteParams:l,onReverseCompleteParams:l,callbackScope:o})},e.fromTo=function(r,n,l){return Qt(2,arguments)},e.set=function(r,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new e(r,n)},e.killTweensOf=function(r,n,l){return ie.killTweensOf(r,n,l)},e}(ss);Ie(ce.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Se("staggerTo,staggerFrom,staggerFromTo",function(s){ce[s]=function(){var e=new ke,t=fi.call(arguments,0);return t.splice(s==="staggerFromTo"?5:4,0,0),e[s].apply(e,t)}});var Ii=function(e,t,i){return e[t]=i},kn=function(e,t,i){return e[t](i)},Nl=function(e,t,i,r){return e[t](r.fp,i)},Il=function(e,t,i){return e.setAttribute(t,i)},Bi=function(e,t){return le(e[t])?kn:Ci(e[t])&&e.setAttribute?Il:Ii},Tn=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Bl=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Sn=function(e,t){var i=t._pt,r="";if(!e&&t.b)r=t.b;else if(e===1&&t.e)r=t.e;else{for(;i;)r=i.p+(i.m?i.m(i.s+i.c*e):Math.round((i.s+i.c*e)*1e4)/1e4)+r,i=i._next;r+=t.c}t.set(t.t,t.p,r,t)},Fi=function(e,t){for(var i=t._pt;i;)i.r(e,i.d),i=i._next},Fl=function(e,t,i,r){for(var n=this._pt,l;n;)l=n._next,n.p===r&&n.modifier(e,t,i),n=l},Hl=function(e){for(var t=this._pt,i,r;t;)r=t._next,t.p===e&&!t.op||t.op===e?Ns(this,t,"_pt"):t.dep||(i=1),t=r;return!i},ql=function(e,t,i,r){r.mSet(e,t,r.m.call(r.tween,i,r.mt),r)},Ln=function(e){for(var t=e._pt,i,r,n,l;t;){for(i=t._next,r=n;r&&r.pr>t.pr;)r=r._next;(t._prev=r?r._prev:l)?t._prev._next=t:n=t,(t._next=r)?r._prev=t:l=t,t=i}e._pt=n},Le=function(){function s(t,i,r,n,l,o,a,d,c){this.t=i,this.s=n,this.c=l,this.p=r,this.r=o||Tn,this.d=a||this,this.set=d||Ii,this.pr=c||0,this._next=t,t&&(t._prev=this)}var e=s.prototype;return e.modifier=function(i,r,n){this.mSet=this.mSet||this.set,this.set=ql,this.m=i,this.mt=n,this.tween=r},s}();Se($i+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Pi[s]=1});Ne.TweenMax=Ne.TweenLite=ce;Ne.TimelineLite=Ne.TimelineMax=ke;ie=new ke({sortChildren:!1,defaults:Zt,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Re.stringFilter=yn;var xt=[],xs={},Gl=[],er=0,Wl=0,Ys=function(e){return(xs[e]||Gl).map(function(t){return t()})},yi=function(){var e=Date.now(),t=[];e-er>2&&(Ys("matchMediaInit"),xt.forEach(function(i){var r=i.queries,n=i.conditions,l,o,a,d;for(o in r)l=Ve.matchMedia(r[o]).matches,l&&(a=1),l!==n[o]&&(n[o]=l,d=1);d&&(i.revert(),a&&t.push(i))}),Ys("matchMediaRevert"),t.forEach(function(i){return i.onMatch(i,function(r){return i.add(null,r)})}),er=e,Ys("matchMedia"))},Cn=function(){function s(t,i){this.selector=i&&pi(i),this.data=[],this._r=[],this.isReverted=!1,this.id=Wl++,t&&this.add(t)}var e=s.prototype;return e.add=function(i,r,n){le(i)&&(n=r,r=i,i=le);var l=this,o=function(){var d=te,c=l.selector,_;return d&&d!==l&&d.data.push(l),n&&(l.selector=pi(n)),te=l,_=r.apply(l,arguments),le(_)&&l._r.push(_),te=d,l.selector=c,l.isReverted=!1,_};return l.last=o,i===le?o(l,function(a){return l.add(null,a)}):i?l[i]=o:o},e.ignore=function(i){var r=te;te=null,i(this),te=r},e.getTweens=function(){var i=[];return this.data.forEach(function(r){return r instanceof s?i.push.apply(i,r.getTweens()):r instanceof ce&&!(r.parent&&r.parent.data==="nested")&&i.push(r)}),i},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(i,r){var n=this;if(i?function(){for(var o=n.getTweens(),a=n.data.length,d;a--;)d=n.data[a],d.data==="isFlip"&&(d.revert(),d.getChildren(!0,!0,!1).forEach(function(c){return o.splice(o.indexOf(c),1)}));for(o.map(function(c){return{g:c._dur||c._delay||c._sat&&!c._sat.vars.immediateRender?c.globalTime(0):-1/0,t:c}}).sort(function(c,_){return _.g-c.g||-1/0}).forEach(function(c){return c.t.revert(i)}),a=n.data.length;a--;)d=n.data[a],d instanceof ke?d.data!=="nested"&&(d.scrollTrigger&&d.scrollTrigger.revert(),d.kill()):!(d instanceof ce)&&d.revert&&d.revert(i);n._r.forEach(function(c){return c(i,n)}),n.isReverted=!0}():this.data.forEach(function(o){return o.kill&&o.kill()}),this.clear(),r)for(var l=xt.length;l--;)xt[l].id===this.id&&xt.splice(l,1)},e.revert=function(i){this.kill(i||{})},s}(),zl=function(){function s(t){this.contexts=[],this.scope=t,te&&te.data.push(this)}var e=s.prototype;return e.add=function(i,r,n){Qe(i)||(i={matches:i});var l=new Cn(0,n||this.scope),o=l.conditions={},a,d,c;te&&!l.selector&&(l.selector=te.selector),this.contexts.push(l),r=l.add("onMatch",r),l.queries=i;for(d in i)d==="all"?c=1:(a=Ve.matchMedia(i[d]),a&&(xt.indexOf(l)<0&&xt.push(l),(o[d]=a.matches)&&(c=1),a.addListener?a.addListener(yi):a.addEventListener("change",yi)));return c&&r(l,function(_){return l.add(null,_)}),this},e.revert=function(i){this.kill(i||{})},e.kill=function(i){this.contexts.forEach(function(r){return r.kill(i,!0)})},s}(),Es={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t.forEach(function(r){return pn(r)})},timeline:function(e){return new ke(e)},getTweensOf:function(e,t){return ie.getTweensOf(e,t)},getProperty:function(e,t,i,r){he(e)&&(e=qe(e)[0]);var n=mt(e||{}).get,l=i?en:Jr;return i==="native"&&(i=""),e&&(t?l((Pe[t]&&Pe[t].get||n)(e,t,i,r)):function(o,a,d){return l((Pe[o]&&Pe[o].get||n)(e,o,a,d))})},quickSetter:function(e,t,i){if(e=qe(e),e.length>1){var r=e.map(function(c){return Me.quickSetter(c,t,i)}),n=r.length;return function(c){for(var _=n;_--;)r[_](c)}}e=e[0]||{};var l=Pe[t],o=mt(e),a=o.harness&&(o.harness.aliases||{})[t]||t,d=l?function(c){var _=new l;At._pt=0,_.init(e,i?c+i:c,At,0,[e]),_.render(1,_),At._pt&&Fi(1,At)}:o.set(e,a);return l?d:function(c){return d(e,a,i?c+i:c,o,1)}},quickTo:function(e,t,i){var r,n=Me.to(e,Ie((r={},r[t]="+=0.1",r.paused=!0,r.stagger=0,r),i||{})),l=function(a,d,c){return n.resetTo(t,a,d,c)};return l.tween=n,l},isTweening:function(e){return ie.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=bt(e.ease,Zt.ease)),Qi(Zt,e||{})},config:function(e){return Qi(Re,e||{})},registerEffect:function(e){var t=e.name,i=e.effect,r=e.plugins,n=e.defaults,l=e.extendTimeline;(r||"").split(",").forEach(function(o){return o&&!Pe[o]&&!Ne[o]&&Xt(t+" effect requires "+o+" plugin.")}),Ws[t]=function(o,a,d){return i(qe(o),Ie(a||{},n),d)},l&&(ke.prototype[t]=function(o,a,d){return this.add(Ws[t](o,Qe(a)?a:(d=a)&&{},this),d)})},registerEase:function(e,t){Y[e]=bt(t)},parseEase:function(e,t){return arguments.length?bt(e,t):Y},getById:function(e){return ie.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var i=new ke(e),r,n;for(i.smoothChildTiming=Te(e.smoothChildTiming),ie.remove(i),i._dp=0,i._time=i._tTime=ie._time,r=ie._first;r;)n=r._next,(t||!(!r._dur&&r instanceof ce&&r.vars.onComplete===r._targets[0]))&&Ye(i,r,r._start-r._delay),r=n;return Ye(ie,i,0),i},context:function(e,t){return e?new Cn(e,t):te},matchMedia:function(e){return new zl(e)},matchMediaRefresh:function(){return xt.forEach(function(e){var t=e.conditions,i,r;for(r in t)t[r]&&(t[r]=!1,i=1);i&&e.revert()})||yi()},addEventListener:function(e,t){var i=xs[e]||(xs[e]=[]);~i.indexOf(t)||i.push(t)},removeEventListener:function(e,t){var i=xs[e],r=i&&i.indexOf(t);r>=0&&i.splice(r,1)},utils:{wrap:xl,wrapYoyo:wl,distribute:an,random:dn,snap:cn,normalize:bl,getUnit:ye,clamp:vl,splitColor:_n,toArray:qe,selector:pi,mapRange:hn,pipe:ml,unitize:gl,interpolate:kl,shuffle:on},install:Ur,effects:Ws,ticker:$e,updateRoot:ke.updateRoot,plugins:Pe,globalTimeline:ie,core:{PropTween:Le,globals:Qr,Tween:ce,Timeline:ke,Animation:ss,getCache:mt,_removeLinkedListItem:Ns,reverting:function(){return _e},context:function(e){return e&&te&&(te.data.push(e),e._ctx=te),te},suppressOverwrites:function(e){return Li=e}}};Se("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Es[s]=ce[s]});$e.add(ke.updateRoot);At=Es.to({},{duration:0});var jl=function(e,t){for(var i=e._pt;i&&i.p!==t&&i.op!==t&&i.fp!==t;)i=i._next;return i},Vl=function(e,t){var i=e._targets,r,n,l;for(r in t)for(n=i.length;n--;)l=e._ptLookup[n][r],l&&(l=l.d)&&(l._pt&&(l=jl(l,r)),l&&l.modifier&&l.modifier(t[r],e,i[n],r))},Us=function(e,t){return{name:e,headless:1,rawVars:1,init:function(r,n,l){l._onInit=function(o){var a,d;if(he(n)&&(a={},Se(n,function(c){return a[c]=1}),n=a),t){a={};for(d in n)a[d]=t(n[d]);n=a}Vl(o,n)}}}},Me=Es.registerPlugin({name:"attr",init:function(e,t,i,r,n){var l,o,a;this.tween=i;for(l in t)a=e.getAttribute(l)||"",o=this.add(e,"setAttribute",(a||0)+"",t[l],r,n,0,0,l),o.op=l,o.b=a,this._props.push(l)},render:function(e,t){for(var i=t._pt;i;)_e?i.set(i.t,i.p,i.b,i):i.r(e,i.d),i=i._next}},{name:"endArray",headless:1,init:function(e,t){for(var i=t.length;i--;)this.add(e,i,e[i]||0,t[i],0,0,0,0,0,1)}},Us("roundProps",_i),Us("modifiers"),Us("snap",cn))||Es;ce.version=ke.version=Me.version="3.15.0";Yr=1;Mi()&&Bt();Y.Power0;Y.Power1;Y.Power2;Y.Power3;Y.Power4;Y.Linear;Y.Quad;Y.Cubic;Y.Quart;Y.Quint;Y.Strong;Y.Elastic;Y.Back;Y.SteppedEase;Y.Bounce;Y.Sine;Y.Expo;Y.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var tr,nt,$t,Hi,vt,sr,qi,Yl=function(){return typeof window<"u"},et={},_t=180/Math.PI,Dt=Math.PI/180,Lt=Math.atan2,ir=1e8,Gi=/([A-Z])/g,Ul=/(left|right|width|margin|padding|x)/i,Ql=/[\s,\(]\S/,Ue={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},mi=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Kl=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Zl=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Xl=function(e,t){return t.set(t.t,t.p,e===1?t.e:e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},Jl=function(e,t){var i=t.s+t.c*e;t.set(t.t,t.p,~~(i+(i<0?-.5:.5))+t.u,t)},Mn=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},En=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},eo=function(e,t,i){return e.style[t]=i},to=function(e,t,i){return e.style.setProperty(t,i)},so=function(e,t,i){return e._gsap[t]=i},io=function(e,t,i){return e._gsap.scaleX=e._gsap.scaleY=i},ro=function(e,t,i,r,n){var l=e._gsap;l.scaleX=l.scaleY=i,l.renderTransform(n,l)},no=function(e,t,i,r,n){var l=e._gsap;l[t]=i,l.renderTransform(n,l)},re="transform",Ce=re+"Origin",lo=function s(e,t){var i=this,r=this.target,n=r.style,l=r._gsap;if(e in et&&n){if(this.tfm=this.tfm||{},e!=="transform")e=Ue[e]||e,~e.indexOf(",")?e.split(",").forEach(function(o){return i.tfm[o]=Xe(r,o)}):this.tfm[e]=l.x?l[e]:Xe(r,e),e===Ce&&(this.tfm.zOrigin=l.zOrigin);else return Ue.transform.split(",").forEach(function(o){return s.call(i,o,t)});if(this.props.indexOf(re)>=0)return;l.svg&&(this.svgo=r.getAttribute("data-svg-origin"),this.props.push(Ce,t,"")),e=re}(n||t)&&this.props.push(e,t,n[e])},An=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},oo=function(){var e=this.props,t=this.target,i=t.style,r=t._gsap,n,l;for(n=0;n<e.length;n+=3)e[n+1]?e[n+1]===2?t[e[n]](e[n+2]):t[e[n]]=e[n+2]:e[n+2]?i[e[n]]=e[n+2]:i.removeProperty(e[n].substr(0,2)==="--"?e[n]:e[n].replace(Gi,"-$1").toLowerCase());if(this.tfm){for(l in this.tfm)r[l]=this.tfm[l];r.svg&&(r.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),n=qi(),(!n||!n.isStart)&&!i[re]&&(An(i),r.zOrigin&&i[Ce]&&(i[Ce]+=" "+r.zOrigin+"px",r.zOrigin=0,r.renderTransform()),r.uncache=1)}},Pn=function(e,t){var i={target:e,props:[],revert:oo,save:lo};return e._gsap||Me.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(r){return i.save(r)}),i},$n,gi=function(e,t){var i=nt.createElementNS?nt.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):nt.createElement(e);return i&&i.style?i:nt.createElement(e)},Oe=function s(e,t,i){var r=getComputedStyle(e);return r[t]||r.getPropertyValue(t.replace(Gi,"-$1").toLowerCase())||r.getPropertyValue(t)||!i&&s(e,Ft(t)||t,1)||""},rr="O,Moz,ms,Ms,Webkit".split(","),Ft=function(e,t,i){var r=t||vt,n=r.style,l=5;if(e in n&&!i)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);l--&&!(rr[l]+e in n););return l<0?null:(l===3?"ms":l>=0?rr[l]:"")+e},bi=function(){Yl()&&window.document&&(tr=window,nt=tr.document,$t=nt.documentElement,vt=gi("div")||{style:{}},gi("div"),re=Ft(re),Ce=re+"Origin",vt.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",$n=!!Ft("perspective"),qi=Me.core.reverting,Hi=1)},nr=function(e){var t=e.ownerSVGElement,i=gi("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),r=e.cloneNode(!0),n;r.style.display="block",i.appendChild(r),$t.appendChild(i);try{n=r.getBBox()}catch{}return i.removeChild(r),$t.removeChild(i),n},lr=function(e,t){for(var i=t.length;i--;)if(e.hasAttribute(t[i]))return e.getAttribute(t[i])},Dn=function(e){var t,i;try{t=e.getBBox()}catch{t=nr(e),i=1}return t&&(t.width||t.height)||i||(t=nr(e)),t&&!t.width&&!t.x&&!t.y?{x:+lr(e,["x","cx","x1"])||0,y:+lr(e,["y","cy","y1"])||0,width:0,height:0}:t},On=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Dn(e))},dt=function(e,t){if(t){var i=e.style,r;t in et&&t!==Ce&&(t=re),i.removeProperty?(r=t.substr(0,2),(r==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),i.removeProperty(r==="--"?t:t.replace(Gi,"-$1").toLowerCase())):i.removeAttribute(t)}},lt=function(e,t,i,r,n,l){var o=new Le(e._pt,t,i,0,1,l?En:Mn);return e._pt=o,o.b=r,o.e=n,e._props.push(i),o},or={deg:1,rad:1,turn:1},ao={grid:1,flex:1},ut=function s(e,t,i,r){var n=parseFloat(i)||0,l=(i+"").trim().substr((n+"").length)||"px",o=vt.style,a=Ul.test(t),d=e.tagName.toLowerCase()==="svg",c=(d?"client":"offset")+(a?"Width":"Height"),_=100,h=r==="px",m=r==="%",g,u,y,p;if(r===l||!n||or[r]||or[l])return n;if(l!=="px"&&!h&&(n=s(e,t,i,"px")),p=e.getCTM&&On(e),(m||l==="%")&&(et[t]||~t.indexOf("adius")))return g=p?e.getBBox()[a?"width":"height"]:e[c],ae(m?n/g*_:n/100*g);if(o[a?"width":"height"]=_+(h?l:r),u=r!=="rem"&&~t.indexOf("adius")||r==="em"&&e.appendChild&&!d?e:e.parentNode,p&&(u=(e.ownerSVGElement||{}).parentNode),(!u||u===nt||!u.appendChild)&&(u=nt.body),y=u._gsap,y&&m&&y.width&&a&&y.time===$e.time&&!y.uncache)return ae(n/y.width*_);if(m&&(t==="height"||t==="width")){var f=e.style[t];e.style[t]=_+r,g=e[c],f?e.style[t]=f:dt(e,t)}else(m||l==="%")&&!ao[Oe(u,"display")]&&(o.position=Oe(e,"position")),u===e&&(o.position="static"),u.appendChild(vt),g=vt[c],u.removeChild(vt),o.position="absolute";return a&&m&&(y=mt(u),y.time=$e.time,y.width=u[c]),ae(h?g*n/_:g&&n?_/g*n:0)},Xe=function(e,t,i,r){var n;return Hi||bi(),t in Ue&&t!=="transform"&&(t=Ue[t],~t.indexOf(",")&&(t=t.split(",")[0])),et[t]&&t!=="transform"?(n=rs(e,r),n=t!=="transformOrigin"?n[t]:n.svg?n.origin:Ps(Oe(e,Ce))+" "+n.zOrigin+"px"):(n=e.style[t],(!n||n==="auto"||r||~(n+"").indexOf("calc("))&&(n=As[t]&&As[t](e,t,i)||Oe(e,t)||Zr(e,t)||(t==="opacity"?1:0))),i&&!~(n+"").trim().indexOf(" ")?ut(e,t,n,i)+i:n},co=function(e,t,i,r){if(!i||i==="none"){var n=Ft(t,e,1),l=n&&Oe(e,n,1);l&&l!==i?(t=n,i=l):t==="borderColor"&&(i=Oe(e,"borderTopColor"))}var o=new Le(this._pt,e.style,t,0,1,Sn),a=0,d=0,c,_,h,m,g,u,y,p,f,v,b,x;if(o.b=i,o.e=r,i+="",r+="",r.substring(0,6)==="var(--"&&(r=Oe(e,r.substring(4,r.indexOf(")")))),r==="auto"&&(u=e.style[t],e.style[t]=r,r=Oe(e,t)||r,u?e.style[t]=u:dt(e,t)),c=[i,r],yn(c),i=c[0],r=c[1],h=i.match(Et)||[],x=r.match(Et)||[],x.length){for(;_=Et.exec(r);)y=_[0],f=r.substring(a,_.index),g?g=(g+1)%5:(f.substr(-5)==="rgba("||f.substr(-5)==="hsla(")&&(g=1),y!==(u=h[d++]||"")&&(m=parseFloat(u)||0,b=u.substr((m+"").length),y.charAt(1)==="="&&(y=Pt(m,y)+b),p=parseFloat(y),v=y.substr((p+"").length),a=Et.lastIndex-v.length,v||(v=v||Re.units[t]||b,a===r.length&&(r+=v,o.e+=v)),b!==v&&(m=ut(e,t,u,v)||0),o._pt={_next:o._pt,p:f||d===1?f:",",s:m,c:p-m,m:g&&g<4||t==="zIndex"?Math.round:0});o.c=a<r.length?r.substring(a,r.length):""}else o.r=t==="display"&&r==="none"?En:Mn;return Vr.test(r)&&(o.e=0),this._pt=o,o},ar={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},uo=function(e){var t=e.split(" "),i=t[0],r=t[1]||"50%";return(i==="top"||i==="bottom"||r==="left"||r==="right")&&(e=i,i=r,r=e),t[0]=ar[i]||i,t[1]=ar[r]||r,t.join(" ")},ho=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var i=t.t,r=i.style,n=t.u,l=i._gsap,o,a,d;if(n==="all"||n===!0)r.cssText="",a=1;else for(n=n.split(","),d=n.length;--d>-1;)o=n[d],et[o]&&(a=1,o=o==="transformOrigin"?Ce:re),dt(i,o);a&&(dt(i,re),l&&(l.svg&&i.removeAttribute("transform"),r.scale=r.rotate=r.translate="none",rs(i,1),l.uncache=1,An(r)))}},As={clearProps:function(e,t,i,r,n){if(n.data!=="isFromStart"){var l=e._pt=new Le(e._pt,t,i,0,0,ho);return l.u=r,l.pr=-10,l.tween=n,e._props.push(i),1}}},is=[1,0,0,1,0,0],Rn={},Nn=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},cr=function(e){var t=Oe(e,re);return Nn(t)?is:t.substr(7).match(jr).map(ae)},Wi=function(e,t){var i=e._gsap||mt(e),r=e.style,n=cr(e),l,o,a,d;return i.svg&&e.getAttribute("transform")?(a=e.transform.baseVal.consolidate().matrix,n=[a.a,a.b,a.c,a.d,a.e,a.f],n.join(",")==="1,0,0,1,0,0"?is:n):(n===is&&!e.offsetParent&&e!==$t&&!i.svg&&(a=r.display,r.display="block",l=e.parentNode,(!l||!e.offsetParent&&!e.getBoundingClientRect().width)&&(d=1,o=e.nextElementSibling,$t.appendChild(e)),n=cr(e),a?r.display=a:dt(e,"display"),d&&(o?l.insertBefore(e,o):l?l.appendChild(e):$t.removeChild(e))),t&&n.length>6?[n[0],n[1],n[4],n[5],n[12],n[13]]:n)},xi=function(e,t,i,r,n,l){var o=e._gsap,a=n||Wi(e,!0),d=o.xOrigin||0,c=o.yOrigin||0,_=o.xOffset||0,h=o.yOffset||0,m=a[0],g=a[1],u=a[2],y=a[3],p=a[4],f=a[5],v=t.split(" "),b=parseFloat(v[0])||0,x=parseFloat(v[1])||0,T,w,L,S;i?a!==is&&(w=m*y-g*u)&&(L=b*(y/w)+x*(-u/w)+(u*f-y*p)/w,S=b*(-g/w)+x*(m/w)-(m*f-g*p)/w,b=L,x=S):(T=Dn(e),b=T.x+(~v[0].indexOf("%")?b/100*T.width:b),x=T.y+(~(v[1]||v[0]).indexOf("%")?x/100*T.height:x)),r||r!==!1&&o.smooth?(p=b-d,f=x-c,o.xOffset=_+(p*m+f*u)-p,o.yOffset=h+(p*g+f*y)-f):o.xOffset=o.yOffset=0,o.xOrigin=b,o.yOrigin=x,o.smooth=!!r,o.origin=t,o.originIsAbsolute=!!i,e.style[Ce]="0px 0px",l&&(lt(l,o,"xOrigin",d,b),lt(l,o,"yOrigin",c,x),lt(l,o,"xOffset",_,o.xOffset),lt(l,o,"yOffset",h,o.yOffset)),e.setAttribute("data-svg-origin",b+" "+x)},rs=function(e,t){var i=e._gsap||new gn(e);if("x"in i&&!t&&!i.uncache)return i;var r=e.style,n=i.scaleX<0,l="px",o="deg",a=getComputedStyle(e),d=Oe(e,Ce)||"0",c,_,h,m,g,u,y,p,f,v,b,x,T,w,L,S,M,O,R,D,B,W,q,z,ee,ge,C,k,P,F,N,A;return c=_=h=u=y=p=f=v=b=0,m=g=1,i.svg=!!(e.getCTM&&On(e)),a.translate&&((a.translate!=="none"||a.scale!=="none"||a.rotate!=="none")&&(r[re]=(a.translate!=="none"?"translate3d("+(a.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(a.rotate!=="none"?"rotate("+a.rotate+") ":"")+(a.scale!=="none"?"scale("+a.scale.split(" ").join(",")+") ":"")+(a[re]!=="none"?a[re]:"")),r.scale=r.rotate=r.translate="none"),w=Wi(e,i.svg),i.svg&&(i.uncache?(ee=e.getBBox(),d=i.xOrigin-ee.x+"px "+(i.yOrigin-ee.y)+"px",z=""):z=!t&&e.getAttribute("data-svg-origin"),xi(e,z||d,!!z||i.originIsAbsolute,i.smooth!==!1,w)),x=i.xOrigin||0,T=i.yOrigin||0,w!==is&&(O=w[0],R=w[1],D=w[2],B=w[3],c=W=w[4],_=q=w[5],w.length===6?(m=Math.sqrt(O*O+R*R),g=Math.sqrt(B*B+D*D),u=O||R?Lt(R,O)*_t:0,f=D||B?Lt(D,B)*_t+u:0,f&&(g*=Math.abs(Math.cos(f*Dt))),i.svg&&(c-=x-(x*O+T*D),_-=T-(x*R+T*B))):(A=w[6],F=w[7],C=w[8],k=w[9],P=w[10],N=w[11],c=w[12],_=w[13],h=w[14],L=Lt(A,P),y=L*_t,L&&(S=Math.cos(-L),M=Math.sin(-L),z=W*S+C*M,ee=q*S+k*M,ge=A*S+P*M,C=W*-M+C*S,k=q*-M+k*S,P=A*-M+P*S,N=F*-M+N*S,W=z,q=ee,A=ge),L=Lt(-D,P),p=L*_t,L&&(S=Math.cos(-L),M=Math.sin(-L),z=O*S-C*M,ee=R*S-k*M,ge=D*S-P*M,N=B*M+N*S,O=z,R=ee,D=ge),L=Lt(R,O),u=L*_t,L&&(S=Math.cos(L),M=Math.sin(L),z=O*S+R*M,ee=W*S+q*M,R=R*S-O*M,q=q*S-W*M,O=z,W=ee),y&&Math.abs(y)+Math.abs(u)>359.9&&(y=u=0,p=180-p),m=ae(Math.sqrt(O*O+R*R+D*D)),g=ae(Math.sqrt(q*q+A*A)),L=Lt(W,q),f=Math.abs(L)>2e-4?L*_t:0,b=N?1/(N<0?-N:N):0),i.svg&&(z=e.getAttribute("transform"),i.forceCSS=e.setAttribute("transform","")||!Nn(Oe(e,re)),z&&e.setAttribute("transform",z))),Math.abs(f)>90&&Math.abs(f)<270&&(n?(m*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(g*=-1,f+=f<=0?180:-180)),t=t||i.uncache,i.x=c-((i.xPercent=c&&(!t&&i.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-c)?-50:0)))?e.offsetWidth*i.xPercent/100:0)+l,i.y=_-((i.yPercent=_&&(!t&&i.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-_)?-50:0)))?e.offsetHeight*i.yPercent/100:0)+l,i.z=h+l,i.scaleX=ae(m),i.scaleY=ae(g),i.rotation=ae(u)+o,i.rotationX=ae(y)+o,i.rotationY=ae(p)+o,i.skewX=f+o,i.skewY=v+o,i.transformPerspective=b+l,(i.zOrigin=parseFloat(d.split(" ")[2])||!t&&i.zOrigin||0)&&(r[Ce]=Ps(d)),i.xOffset=i.yOffset=0,i.force3D=Re.force3D,i.renderTransform=i.svg?po:$n?In:fo,i.uncache=0,i},Ps=function(e){return(e=e.split(" "))[0]+" "+e[1]},Qs=function(e,t,i){var r=ye(t);return ae(parseFloat(t)+parseFloat(ut(e,"x",i+"px",r)))+r},fo=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,In(e,t)},ft="0deg",Ht="0px",pt=") ",In=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,l=i.x,o=i.y,a=i.z,d=i.rotation,c=i.rotationY,_=i.rotationX,h=i.skewX,m=i.skewY,g=i.scaleX,u=i.scaleY,y=i.transformPerspective,p=i.force3D,f=i.target,v=i.zOrigin,b="",x=p==="auto"&&e&&e!==1||p===!0;if(v&&(_!==ft||c!==ft)){var T=parseFloat(c)*Dt,w=Math.sin(T),L=Math.cos(T),S;T=parseFloat(_)*Dt,S=Math.cos(T),l=Qs(f,l,w*S*-v),o=Qs(f,o,-Math.sin(T)*-v),a=Qs(f,a,L*S*-v+v)}y!==Ht&&(b+="perspective("+y+pt),(r||n)&&(b+="translate("+r+"%, "+n+"%) "),(x||l!==Ht||o!==Ht||a!==Ht)&&(b+=a!==Ht||x?"translate3d("+l+", "+o+", "+a+") ":"translate("+l+", "+o+pt),d!==ft&&(b+="rotate("+d+pt),c!==ft&&(b+="rotateY("+c+pt),_!==ft&&(b+="rotateX("+_+pt),(h!==ft||m!==ft)&&(b+="skew("+h+", "+m+pt),(g!==1||u!==1)&&(b+="scale("+g+", "+u+pt),f.style[re]=b||"translate(0, 0)"},po=function(e,t){var i=t||this,r=i.xPercent,n=i.yPercent,l=i.x,o=i.y,a=i.rotation,d=i.skewX,c=i.skewY,_=i.scaleX,h=i.scaleY,m=i.target,g=i.xOrigin,u=i.yOrigin,y=i.xOffset,p=i.yOffset,f=i.forceCSS,v=parseFloat(l),b=parseFloat(o),x,T,w,L,S;a=parseFloat(a),d=parseFloat(d),c=parseFloat(c),c&&(c=parseFloat(c),d+=c,a+=c),a||d?(a*=Dt,d*=Dt,x=Math.cos(a)*_,T=Math.sin(a)*_,w=Math.sin(a-d)*-h,L=Math.cos(a-d)*h,d&&(c*=Dt,S=Math.tan(d-c),S=Math.sqrt(1+S*S),w*=S,L*=S,c&&(S=Math.tan(c),S=Math.sqrt(1+S*S),x*=S,T*=S)),x=ae(x),T=ae(T),w=ae(w),L=ae(L)):(x=_,L=h,T=w=0),(v&&!~(l+"").indexOf("px")||b&&!~(o+"").indexOf("px"))&&(v=ut(m,"x",l,"px"),b=ut(m,"y",o,"px")),(g||u||y||p)&&(v=ae(v+g-(g*x+u*w)+y),b=ae(b+u-(g*T+u*L)+p)),(r||n)&&(S=m.getBBox(),v=ae(v+r/100*S.width),b=ae(b+n/100*S.height)),S="matrix("+x+","+T+","+w+","+L+","+v+","+b+")",m.setAttribute("transform",S),f&&(m.style[re]=S)},_o=function(e,t,i,r,n){var l=360,o=he(n),a=parseFloat(n)*(o&&~n.indexOf("rad")?_t:1),d=a-r,c=r+d+"deg",_,h;return o&&(_=n.split("_")[1],_==="short"&&(d%=l,d!==d%(l/2)&&(d+=d<0?l:-l)),_==="cw"&&d<0?d=(d+l*ir)%l-~~(d/l)*l:_==="ccw"&&d>0&&(d=(d-l*ir)%l-~~(d/l)*l)),e._pt=h=new Le(e._pt,t,i,r,d,Kl),h.e=c,h.u="deg",e._props.push(i),h},dr=function(e,t){for(var i in t)e[i]=t[i];return e},vo=function(e,t,i){var r=dr({},i._gsap),n="perspective,force3D,transformOrigin,svgOrigin",l=i.style,o,a,d,c,_,h,m,g;r.svg?(d=i.getAttribute("transform"),i.setAttribute("transform",""),l[re]=t,o=rs(i,1),dt(i,re),i.setAttribute("transform",d)):(d=getComputedStyle(i)[re],l[re]=t,o=rs(i,1),l[re]=d);for(a in et)d=r[a],c=o[a],d!==c&&n.indexOf(a)<0&&(m=ye(d),g=ye(c),_=m!==g?ut(i,a,d,g):parseFloat(d),h=parseFloat(c),e._pt=new Le(e._pt,o,a,_,h-_,mi),e._pt.u=g||0,e._props.push(a));dr(o,r)};Se("padding,margin,Width,Radius",function(s,e){var t="Top",i="Right",r="Bottom",n="Left",l=(e<3?[t,i,r,n]:[t+n,t+i,r+i,r+n]).map(function(o){return e<2?s+o:"border"+o+s});As[e>1?"border"+s:s]=function(o,a,d,c,_){var h,m;if(arguments.length<4)return h=l.map(function(g){return Xe(o,g,d)}),m=h.join(" "),m.split(h[0]).length===5?h[0]:m;h=(c+"").split(" "),m={},l.forEach(function(g,u){return m[g]=h[u]=h[u]||h[(u-1)/2|0]}),o.init(a,m,_)}});var Bn={name:"css",register:bi,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,i,r,n){var l=this._props,o=e.style,a=i.vars.startAt,d,c,_,h,m,g,u,y,p,f,v,b,x,T,w,L,S;Hi||bi(),this.styles=this.styles||Pn(e),L=this.styles.props,this.tween=i;for(u in t)if(u!=="autoRound"&&(c=t[u],!(Pe[u]&&bn(u,t,i,r,e,n)))){if(m=typeof c,g=As[u],m==="function"&&(c=c.call(i,r,e,n),m=typeof c),m==="string"&&~c.indexOf("random(")&&(c=es(c)),g)g(this,e,u,c,i)&&(w=1);else if(u.substr(0,2)==="--")d=(getComputedStyle(e).getPropertyValue(u)+"").trim(),c+="",at.lastIndex=0,at.test(d)||(y=ye(d),p=ye(c),p?y!==p&&(d=ut(e,u,d,p)+p):y&&(c+=y)),this.add(o,"setProperty",d,c,r,n,0,0,u),l.push(u),L.push(u,0,o[u]);else if(m!=="undefined"){if(a&&u in a?(d=typeof a[u]=="function"?a[u].call(i,r,e,n):a[u],he(d)&&~d.indexOf("random(")&&(d=es(d)),ye(d+"")||d==="auto"||(d+=Re.units[u]||ye(Xe(e,u))||""),(d+"").charAt(1)==="="&&(d=Xe(e,u))):d=Xe(e,u),h=parseFloat(d),f=m==="string"&&c.charAt(1)==="="&&c.substr(0,2),f&&(c=c.substr(2)),_=parseFloat(c),u in Ue&&(u==="autoAlpha"&&(h===1&&Xe(e,"visibility")==="hidden"&&_&&(h=0),L.push("visibility",0,o.visibility),lt(this,o,"visibility",h?"inherit":"hidden",_?"inherit":"hidden",!_)),u!=="scale"&&u!=="transform"&&(u=Ue[u],~u.indexOf(",")&&(u=u.split(",")[0]))),v=u in et,v){if(this.styles.save(u),S=c,m==="string"&&c.substring(0,6)==="var(--"){if(c=Oe(e,c.substring(4,c.indexOf(")"))),c.substring(0,5)==="calc("){var M=e.style.perspective;e.style.perspective=c,c=Oe(e,"perspective"),M?e.style.perspective=M:dt(e,"perspective")}_=parseFloat(c)}if(b||(x=e._gsap,x.renderTransform&&!t.parseTransform||rs(e,t.parseTransform),T=t.smoothOrigin!==!1&&x.smooth,b=this._pt=new Le(this._pt,o,re,0,1,x.renderTransform,x,0,-1),b.dep=1),u==="scale")this._pt=new Le(this._pt,x,"scaleY",x.scaleY,(f?Pt(x.scaleY,f+_):_)-x.scaleY||0,mi),this._pt.u=0,l.push("scaleY",u),u+="X";else if(u==="transformOrigin"){L.push(Ce,0,o[Ce]),c=uo(c),x.svg?xi(e,c,0,T,0,this):(p=parseFloat(c.split(" ")[2])||0,p!==x.zOrigin&&lt(this,x,"zOrigin",x.zOrigin,p),lt(this,o,u,Ps(d),Ps(c)));continue}else if(u==="svgOrigin"){xi(e,c,1,T,0,this);continue}else if(u in Rn){_o(this,x,u,h,f?Pt(h,f+c):c);continue}else if(u==="smoothOrigin"){lt(this,x,"smooth",x.smooth,c);continue}else if(u==="force3D"){x[u]=c;continue}else if(u==="transform"){vo(this,c,e);continue}}else u in o||(u=Ft(u)||u);if(v||(_||_===0)&&(h||h===0)&&!Ql.test(c)&&u in o)y=(d+"").substr((h+"").length),_||(_=0),p=ye(c)||(u in Re.units?Re.units[u]:y),y!==p&&(h=ut(e,u,d,p)),this._pt=new Le(this._pt,v?x:o,u,h,(f?Pt(h,f+_):_)-h,!v&&(p==="px"||u==="zIndex")&&t.autoRound!==!1?Jl:mi),this._pt.u=p||0,v&&S!==c?(this._pt.b=d,this._pt.e=S,this._pt.r=Xl):y!==p&&p!=="%"&&(this._pt.b=d,this._pt.r=Zl);else if(u in o)co.call(this,e,u,d,f?f+c:c);else if(u in e)this.add(e,u,d||e[u],f?f+c:c,r,n);else if(u!=="parseTransform"){Ai(u,c);continue}v||(u in o?L.push(u,0,o[u]):typeof e[u]=="function"?L.push(u,2,e[u]()):L.push(u,1,d||e[u])),l.push(u)}}w&&Ln(this)},render:function(e,t){if(t.tween._time||!qi())for(var i=t._pt;i;)i.r(e,i.d),i=i._next;else t.styles.revert()},get:Xe,aliases:Ue,getSetter:function(e,t,i){var r=Ue[t];return r&&r.indexOf(",")<0&&(t=r),t in et&&t!==Ce&&(e._gsap.x||Xe(e,"x"))?i&&sr===i?t==="scale"?io:so:(sr=i||{})&&(t==="scale"?ro:no):e.style&&!Ci(e.style[t])?eo:~t.indexOf("-")?to:Bi(e,t)},core:{_removeProperty:dt,_getMatrix:Wi}};Me.utils.checkPrefix=Ft;Me.core.getStyleSaver=Pn;(function(s,e,t,i){var r=Se(s+","+e+","+t,function(n){et[n]=1});Se(e,function(n){Re.units[n]="deg",Rn[n]=1}),Ue[r[13]]=s+","+e,Se(i,function(n){var l=n.split(":");Ue[l[1]]=r[l[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Se("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Re.units[s]="px"});Me.registerPlugin(Bn);var G=Me.registerPlugin(Bn)||Me;G.core.Tween;const ur="level10-v19-style";function yo(){if(document.getElementById(ur))return;const s=document.createElement("style");s.id=ur,s.textContent=`
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
  `,document.head.appendChild(s)}const mo=["C5","D5","E5","F5","G5","A5","B5"],hr=[{id:"do",solfege:"Do",low:"C4",high:"C5"},{id:"re",solfege:"Re",low:"D4",high:"D5"},{id:"mi",solfege:"Mi",low:"E4",high:"E5"},{id:"fa",solfege:"Fa",low:"F4",high:"F5"},{id:"sol",solfege:"Sol",low:"G4",high:"G5"},{id:"la",solfege:"La",low:"A4",high:"A5"},{id:"si",solfege:"Si",low:"B4",high:"B5"}];function go(s,e){const t=s.audio._webAudio;if(!t||!s.audio.unlocked)return;const i=s.audio._masterGain;if(!i)return;const n={C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,B5:987.77}[e];if(!n)return;const l=t.currentTime,o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(n,l);const a=t.createOscillator();a.type="sine",a.frequency.setValueAtTime(n*2,l);const d=t.createOscillator();d.type="sine",d.frequency.setValueAtTime(n*3,l);const c=t.createGain();c.gain.setValueAtTime(1e-4,l),c.gain.exponentialRampToValueAtTime(.55,l+.01),c.gain.exponentialRampToValueAtTime(1e-4,l+.8);const _=t.createGain();_.gain.value=.15;const h=t.createGain();h.gain.value=.05,o.connect(c).connect(i),a.connect(_).connect(c),d.connect(h).connect(c);const m=l+.85;o.start(l),o.stop(m),a.start(l),a.stop(m),d.start(l),d.stop(m)}function bo(s,e){try{s.audio.playNote(e)}catch{}}function cs(s,e,t){t?go(s,e):bo(s,e)}function fr(s,e,t){const r={C4:{white:["C4","D4","E4","F4","G4","A4","B4"],black:[["C#4",0],["D#4",1],["F#4",3],["G#4",4],["A#4",5]]},C5:{white:["C5","D5","E5","F5","G5","A5","B5"],black:[["C#5",0],["D#5",1],["F#5",3],["G#5",4],["A#5",5]]}}[e],n=38,l=130,o=24,a=80,d=r.white.length*n,c=document.createElementNS(oe,"svg");return c.setAttribute("viewBox",`0 0 ${d} ${l+8}`),c.setAttribute("preserveAspectRatio","xMidYMid meet"),c.classList.add("level10-keys-svg"),r.white.forEach((_,h)=>{const m=h*n,g=document.createElementNS(oe,"rect");if(g.setAttribute("x",m),g.setAttribute("y",0),g.setAttribute("width",n-1),g.setAttribute("height",l),g.setAttribute("rx",4),g.setAttribute("class","level10-white-key"),g.setAttribute("data-pitch",_),g.setAttribute("fill","#fffaf0"),g.setAttribute("stroke",t),g.setAttribute("stroke-width","1.5"),c.appendChild(g),r.black.some(([u,y])=>y===h)){const u=m+n-o/2,y=document.createElementNS(oe,"rect");y.setAttribute("x",u),y.setAttribute("y",0),y.setAttribute("width",o),y.setAttribute("height",a),y.setAttribute("rx",3),y.setAttribute("class","level10-black-key"),y.setAttribute("fill","#1a1a2a"),c.appendChild(y)}}),s.appendChild(c),c}function xo(s){yo(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=10);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Kn(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level10-stage"></div>');const r=s.stage.querySelector(".level10-stage"),n=document.createElement("div");n.className="level10-hud",n.innerHTML=`
    <div class="level10-progress">第 <span class="level10-done">0</span> / <span class="level10-total">8</span> 题</div>
    <div class="level10-question">🎧 听一听, 是低还是高?</div>
    <div class="level10-streak" id="level10-streak" hidden>
      <span class="level10-streak__num">0</span><span class="level10-streak__x">x</span>
    </div>
  `,r.appendChild(n);const l=document.createElement("div");l.className="level10-hint-labels",l.innerHTML=`
    <div class="level10-hint-label level10-hint-label--high">
      <span class="level10-hint-label__arrow">▲</span>
      <span class="level10-hint-label__text">高音</span>
    </div>
    <div class="level10-hint-label level10-hint-label--low">
      <span class="level10-hint-label__text">低音</span>
      <span class="level10-hint-label__arrow">▼</span>
    </div>
  `,r.appendChild(l);const o=document.createElement("div");o.className="level10-regions",o.innerHTML=`
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
  `,r.appendChild(o);const a=document.createElement("button");a.className="level10-preview",a.id="level10-preview",a.innerHTML="🔁 听一次",a.title="再听一次",r.appendChild(a);const d=document.createElement("div");d.className="level10-keyboard";const c=document.createElement("div");c.className="level10-keyboard__row level10-keyboard__row--low",c.innerHTML='<div class="level10-keyboard__row-label">LOW</div>',fr(c,"C4","#e76f51");const _=document.createElement("div");_.className="level10-keyboard__row level10-keyboard__row--high",_.innerHTML='<div class="level10-keyboard__row-label">HIGH</div>',fr(_,"C5","#5fa8b5"),d.appendChild(_),d.appendChild(c),r.appendChild(d),s._level10Total=8,s._level10Done=0,s._level10Current=null,s._level10Answering=!1,s._level10Wrong=0,s._level10Timestamps=[],s._level10Streak=0,s._level10BestStreak=0;function h(v,b){d.querySelectorAll(".level10-key-glow").forEach(L=>L.remove());const x=v?_:c,T=x.querySelector(`[data-pitch="${b}"]`);if(!T)return;const w=document.createElementNS(oe,"rect");w.setAttribute("class","level10-key-glow"),w.setAttribute("x",T.getAttribute("x")),w.setAttribute("y",T.getAttribute("y")),w.setAttribute("width",T.getAttribute("width")),w.setAttribute("height",T.getAttribute("height")),w.setAttribute("rx",T.getAttribute("rx")||4),w.setAttribute("fill",v?"rgba(95,168,181,0.55)":"rgba(231,111,81,0.55)"),x.querySelector("svg").insertBefore(w,x.querySelector("svg").firstChild),setTimeout(()=>{try{w.remove()}catch{}},1800)}function m(){if(s._level10Done>=s._level10Total)return f();s._level10Answering=!1;const v=hr[Math.floor(Math.random()*hr.length)],b=Math.random()<.5;s._level10Current={noteId:v.id,solfege:v.solfege,isHigh:b,pitch:b?v.high:v.low},n.querySelector(".level10-done").textContent=String(s._level10Done),n.querySelector(".level10-question").textContent=`🎧 第 ${s._level10Done+1} 题 — ${v.solfege} 来自哪里?`;const x=r.querySelector("#level10-fish");G.fromTo(x,{y:-20,opacity:0},{y:0,opacity:1,duration:.4,ease:"back.out(1.7)"}),setTimeout(()=>{cs(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0},500)}function g(v){if(!s._level10Answering)return;const b=s._level10Current;if(!b)return;s._level10Answering=!1;const x=b.isHigh===v,T=r.querySelector("#level10-fish"),w=r.querySelector(v?".level10-region--high":".level10-region--low");if(x){s._level10Done++;try{s.audio.correct()}catch{}s._level10Streak++,s._level10Streak>s._level10BestStreak&&(s._level10BestStreak=s._level10Streak);const L=T.getBoundingClientRect(),S=w.getBoundingClientRect(),M=S.left+S.width/2-(L.left+L.width/2),O=S.top+S.height/2-(L.top+L.height/2);if(G.to(T,{x:M,y:O,scale:.7,duration:.5,ease:"back.out(1.5)",onComplete:()=>{try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`${b.solfege} ${b.isHigh?"↑":"↓"} ✓`)}catch{}h(b.isHigh,b.pitch),s.say(`${b.solfege} ${b.isHigh?"高八度":"低八度"}, 对啦! 🎉`)}}),s._level10Streak>=2)try{const R=`x${s._level10Streak}${s._level10Streak>=5?" 🔥":""}`;s._floatScore(window.innerWidth/2,window.innerHeight*.32,R)}catch{}s._level10Streak>=2&&(p.textContent=String(s._level10Streak),y.hidden=!1,y.classList.remove("streak-bump"),y.offsetWidth,y.classList.add("streak-bump")),setTimeout(()=>m(),1500)}else{s.wrongCount++,s._level10Wrong++;try{s.audio.wrong()}catch{}w.classList.add("shake"),setTimeout(()=>w.classList.remove("shake"),400),G.to(T,{x:0,y:0,rotation:"+=12",duration:.15,yoyo:!0,repeat:3}),G.to(T,{rotation:0,duration:.3});const L=b.isHigh?"高":"低";if(s.say(`不对哟~ 这是${L}八度 ${b.solfege}, 再听一次?`),s._level10Streak>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.32,`断啦 💔 (最佳 x${s._level10BestStreak})`)}catch{}s._level10Streak=0,y.hidden=!0,y.classList.remove("streak-bump"),setTimeout(()=>{cs(s,b.pitch,b.isHigh),s._level10Answering=!0},800)}}r.querySelectorAll(".level10-region").forEach(v=>{v.addEventListener("click",()=>{const b=v.dataset.region;g(b==="high")})});const u=r.querySelector("#level10-preview"),y=r.querySelector("#level10-streak"),p=y.querySelector(".level10-streak__num");u.addEventListener("click",()=>{s._level10Current&&(cs(s,s._level10Current.pitch,s._level10Current.isHigh),s._level10Answering=!0,u.classList.remove("flash"),u.offsetWidth,u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),600))}),[c,_].forEach(v=>{v.querySelectorAll("[data-pitch]").forEach(b=>{b.style.cursor="pointer",b.addEventListener("click",()=>{const x=b.getAttribute("data-pitch"),T=mo.includes(x);cs(s,x,T)})})}),s.say("听一听: Do 来自低八度还是高八度? 选对的地方放鱼~"),setTimeout(()=>m(),700);function f(){const v=s.wrongCount||0,b=v<=0?3:v<=2?2:v<=5?1:0;try{s.progress.markLevelComplete(10,b)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{s._flashScreen()}catch{}try{const x=s._level10BestStreak>=2?` (最佳连击 x${s._level10BestStreak})`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 八度完成!${x}`)}catch{}s.say("八度都听出来了! 耳朵升级了~"),setTimeout(()=>{try{s.showWinOverlay(b,10)}catch{}},1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level10-stage").forEach(v=>v.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const wo=Object.freeze(Object.defineProperty({__proto__:null,default:xo},Symbol.toStringTag,{value:"Module"}));class ko{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level11-background";let t="";for(let r=0;r<28;r++){const n=Math.random()*100,l=Math.random()*100,o=2+Math.random()*4,a=Math.random()*4;t+=`<circle class="level11-dot" cx="${n}%" cy="${l}%" r="${o}"
                          style="animation-delay: ${a}s" />`}let i="";for(let r=0;r<6;r++){const n=8+Math.random()*84,l=8+Math.random()*80,o=16+Math.random()*14,a=Math.random()*5;i+=`<g class="level11-heart" transform="translate(${n}, ${l}) scale(${o/30})"
                          style="animation-delay: ${a}s">
        <path d="M0,-2 C-6,-10 -16,-10 -16,0 C-16,8 -8,16 0,22 C8,16 16,8 16,0 C16,-10 6,-10 0,-2 Z"
              fill="rgba(255,182,193,0.55)" />
      </g>`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
        ${t}
        ${i}

        <!-- 标题 -->
        <text x="400" y="58" text-anchor="middle" class="level11-title">🎴 翻牌记忆 🎴</text>
        <text x="400" y="88" text-anchor="middle" class="level11-subtitle">找两个一样的音符朋友</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const pr="level11-v19-style";function To(){if(document.getElementById(pr))return;const s=document.createElement("style");s.id=pr,s.textContent=`
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
  `,document.head.appendChild(s)}const So=[{id:"do",solfege:"Do",pitch:"C4",color:"#e63946",emoji:"🍎"},{id:"re",solfege:"Re",pitch:"D4",color:"#f4a261",emoji:"🍊"},{id:"mi",solfege:"Mi",pitch:"E4",color:"#ffc971",emoji:"🍋"},{id:"fa",solfege:"Fa",pitch:"F4",color:"#b5c99a",emoji:"🥝"}];function Lo(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[{f:1567.98,delay:0,dur:.32,peak:.45},{f:2093,delay:.04,dur:.32,peak:.35}].forEach(({f:r,delay:n,dur:l,peak:o})=>{const a=t+n,d=e.createOscillator();d.type="sine",d.frequency.setValueAtTime(r,a);const c=e.createGain();c.gain.setValueAtTime(1e-4,a),c.gain.exponentialRampToValueAtTime(o,a+.008),c.gain.exponentialRampToValueAtTime(1e-4,a+l),d.connect(c).connect(s._masterGain),d.start(a),d.stop(a+l+.05)})}catch{}}function Co(s,e,t,i="#ffd166"){for(let n=0;n<8;n++){const l=n/8*Math.PI*2+Math.random()*.4,o=60+Math.random()*30,a=Math.cos(l)*o,d=Math.sin(l)*o,c=document.createElement("span");c.className="level11-sparkle",c.style.left=`${e}px`,c.style.top=`${t}px`,c.style.setProperty("--dx",`${a}px`),c.style.setProperty("--dy",`${d}px`),c.style.background=i,s.appendChild(c),setTimeout(()=>c.remove(),800)}}function Mo(s){const e=s.slice();for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}function Eo(s){To(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=11);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new ko(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level11-stage"></div>');const r=s.stage.querySelector(".level11-stage"),n=document.createElement("div");n.className="level11-hud",n.innerHTML=`
    <div class="level11-progress">
      <span class="level11-progress-icon">⭐</span>
      <span class="level11-done">0</span> / 4 对
    </div>
    <div class="level11-timer">⏱ <span class="level11-time">0.0</span>s</div>
  `,r.appendChild(n);const l=document.createElement("div");l.className="level11-time-bar",l.innerHTML='<div class="level11-time-bar__fill" id="level11-time-fill"></div>',r.appendChild(l);const o=l.querySelector("#level11-time-fill"),a=document.createElement("div");a.className="level11-board",r.appendChild(a);const d=[];So.forEach(y=>{d.push({...y,key:y.id+"_a"}),d.push({...y,key:y.id+"_b"})}),Mo(d).forEach(y=>{const p=document.createElement("button");p.className="level11-card",p.dataset.key=y.key,p.dataset.id=y.id,p.dataset.pitch=y.pitch,p.dataset.color=y.color,p.innerHTML=`
      <div class="level11-card__inner">
        <div class="level11-card__face level11-card__back">
          <div class="level11-card__back-pattern">🎵</div>
        </div>
        <div class="level11-card__face level11-card__front"
             style="--card-accent: ${y.color}">
          <div class="level11-card__emoji">${y.emoji}</div>
          <div class="level11-card__name">${y.solfege}</div>
        </div>
      </div>
    `,a.appendChild(p),d.push({el:p,...y})}),s._level11Cards=d,s._level11Flipped=[],s._level11Matched=0,s._level11Locked=!1,s._level11Start=Date.now(),s._level11Tried=0,s._level11Timer=null;const _=n.querySelector(".level11-time"),h=25,m=40;s._level11Timer=setInterval(()=>{if(!s._level11Start)return;const y=(Date.now()-s._level11Start)/1e3;if(_.textContent=y.toFixed(1),o){const p=Math.min(1,y/m);o.style.width=`${p*100}%`,o.classList.remove("warn","danger"),y>=m?o.classList.add("danger"):y>=h&&o.classList.add("warn")}},100);function g(y){if(!s._level11Locked&&!s._level11Flipped.includes(y)&&!y.classList.contains("matched")){y.classList.add("flipped"),s._level11Flipped.push(y);try{s.audio.playNote(y.dataset.pitch)}catch{}if(s._level11Flipped.length===2){s._level11Tried++,s._level11Locked=!0;const[p,f]=s._level11Flipped;p.dataset.id===f.dataset.id?setTimeout(()=>{p.classList.add("matched"),f.classList.add("matched");try{s.audio.correct()}catch{}try{Lo(s.audio)}catch{}try{s._flashScreen()}catch{}s._level11Matched++,n.querySelector(".level11-done").textContent=String(s._level11Matched),s.say(`配对! ${p.dataset.id.toUpperCase()} = ${p.dataset.id.toUpperCase()} 🎉`);try{const v=p.getBoundingClientRect();s._floatScore(v.left+v.width/2,v.top,`${p.dataset.id.toUpperCase()} ✓`)}catch{}try{const v=p.getBoundingClientRect(),b=f.getBoundingClientRect(),x=(v.left+v.width/2+b.left+b.width/2)/2,T=(v.top+v.height/2+b.top+b.height/2)/2,w=r.querySelector(".level11-board"),L=w.getBoundingClientRect(),S=p.dataset.color||"#ffd166";Co(w,x-L.left,T-L.top,S)}catch{}setTimeout(()=>{s._level11Flipped=[],s._level11Locked=!1,s._level11Matched>=4&&u()},600)},350):setTimeout(()=>{try{s.audio.wrong()}catch{}p.classList.add("shake"),f.classList.add("shake"),setTimeout(()=>{p.classList.remove("flipped","shake"),f.classList.remove("flipped","shake"),s._level11Flipped=[],s._level11Locked=!1},450)},750)}}}s._level11Cards.forEach(y=>{y.el.addEventListener("click",()=>g(y.el))}),s.say("翻开两张牌 — 一样的就配对! 4 对就赢~"),s._level11Cards.forEach((y,p)=>{G.fromTo(y.el,{y:30,opacity:0},{y:0,opacity:1,duration:.4,delay:p*.05,ease:"back.out(1.7)"})});function u(){s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null);const y=(Date.now()-s._level11Start)/1e3,p=s._level11Tried;let f;y<=18&&p<=5?f=3:y<=30&&p<=7?f=2:y<=50?f=1:f=0;try{s.progress.markLevelComplete(11,f)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎉 ${y.toFixed(1)}s 完成!`)}catch{}s.say(`🎉 用时 ${y.toFixed(1)}s, 翻 ${p} 次, 你真厉害!`),setTimeout(()=>{try{s.showWinOverlay(f,11)}catch{}},1300)}return()=>{if(s._level11Timer&&(clearInterval(s._level11Timer),s._level11Timer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level11-stage").forEach(y=>y.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ao=Object.freeze(Object.defineProperty({__proto__:null,default:Eo},Symbol.toStringTag,{value:"Module"}));class Po{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level12-background";let t="";const i=["🍅","🧅","🥕","🥒","🌽","🍅","🧄"];for(let n=0;n<10;n++){const l=Math.random()*100,o=Math.random()*100,a=22+Math.random()*22,d=Math.random()*5,c=i[n%i.length];t+=`<g class="level12-veggie" transform="translate(${l}%, ${o}%) scale(${a/30})"
                           style="animation-delay: ${d}s">
        <text text-anchor="middle" dominant-baseline="middle" font-size="30">${c}</text>
      </g>`}const r=`
      <g class="level12-board-shadow" transform="translate(400, 440)">
        <ellipse cx="0" cy="0" rx="240" ry="22" fill="rgba(139, 90, 43, 0.4)" />
        <rect x="-220" y="-40" width="440" height="36" rx="8" fill="#a0673a" />
        <rect x="-220" y="-40" width="440" height="6" rx="3" fill="#c08a55" opacity="0.7" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
        ${t}
        ${r}

        <!-- 标题 -->
        <text x="400" y="50" text-anchor="middle" class="level12-title">🥁 番茄节奏 🥁</text>
        <text x="400" y="80" text-anchor="middle" class="level12-subtitle">跟着摆杆切菜~</text>
      </svg>
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const _r="level12-v19-style";function $o(){if(document.getElementById(_r))return;const s=document.createElement("style");s.id=_r,s.textContent=`
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
  `,document.head.appendChild(s)}const vr=12,ds=35,Do=.15,Oo=.3;function Ro(s){$o(),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=12);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Po(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level12-stage"></div>');const r=s.stage.querySelector(".level12-stage"),n=document.createElement("div");n.className="level12-hud",n.innerHTML=`
    <div class="level12-stats">
      <div class="level12-stat">
        <span class="level12-stat__icon">🥁</span>
        <span class="level12-hits">0</span> / ${vr}
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
  `,r.appendChild(n);const l=document.createElement("div");l.className="level12-metronome",l.innerHTML=`
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
  `,r.appendChild(l);const o=document.createElement("button");o.className="level12-cut",o.innerHTML=`
    <span class="level12-cut__knife">🔪</span>
    <span class="level12-cut__label">切!</span>
  `,r.appendChild(o);const a=document.createElement("div");a.className="level12-combo",a.id="level12-combo",a.hidden=!0,a.innerHTML='<span class="level12-combo__num">0</span><span class="level12-combo__x">x combo</span>',r.appendChild(a);const d=a.querySelector(".level12-combo__num"),c=document.createElement("div");c.className="level12-message",c.textContent="🔪 摆杆到中间时点切!",r.appendChild(c),s._level12Hits=0,s._level12TotalCuts=0,s._level12BPM=60,s._level12Phase=0,s._level12Dir=1,s._level12Running=!1,s._level12Tween=null,s._level12Done=!1,s._level12Combo=0,s._level12BestCombo=0,s._level12Score=0;function _(v){return v<=60?1:v>=140?2:1+(v-60)/80*1}const h=n.querySelector(".level12-hits"),m=n.querySelector(".level12-bpm"),g=n.querySelector(".level12-acc");function u(v){s._level12Tween&&(s._level12Tween.kill(),s._level12Tween=null);const b=60/v,x=G.to({},{duration:b,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const T=x.progress(),w=-ds+T*2*ds,L=l.querySelector(".level12-pendulum");L&&(L.style.transform=`rotate(${w}deg)`),s._level12Phase=(w+ds)/(2*ds),s._level12Dir=w>0?1:-1},onRepeat:()=>{try{const T=s.audio._webAudio;if(T&&s.audio.unlocked){const w=T.currentTime,L=T.createOscillator();L.type="square",L.frequency.setValueAtTime(2400,w);const S=T.createGain();S.gain.setValueAtTime(1e-4,w),S.gain.exponentialRampToValueAtTime(.06,w+.005),S.gain.exponentialRampToValueAtTime(1e-4,w+.04),L.connect(S).connect(s.audio._masterGain),L.start(w),L.stop(w+.05)}}catch{}}});s._level12Tween=x}function y(){const v=Math.abs(s._level12Phase-.5);let b;v<=Do?b="perfect":v<=Oo?b="good":b="miss",s._level12TotalCuts++;const x=r.querySelector("#level12-hit-ring");if(x&&(x.classList.remove("hit-perfect","hit-good","hit-miss"),x.offsetWidth,x.classList.add(`hit-${b}`),setTimeout(()=>x.classList.remove(`hit-${b}`),600)),b==="miss"){s.wrongCount++;try{s.audio.wrong()}catch{}if(c.textContent=["差一点!","再稳点~","跟住摆杆!"][Math.floor(Math.random()*3)],G.fromTo(o,{x:0},{x:8,duration:.06,yoyo:!0,repeat:5}),s._level12Combo>=2)try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,`断啦 💔 (最佳 x${s._level12BestCombo})`)}catch{}s._level12Combo=0,a.hidden=!0,a.classList.remove("combo-flash"),o.classList.remove("combo-glow")}else{s._level12Hits++;try{s.audio.correct()}catch{}try{s._level12Hits%2===0&&(s._level12BPM=Math.min(140,s._level12BPM+8),m.textContent=String(s._level12BPM),u(s._level12BPM))}catch{}const w=b==="perfect"?10:5;s._level12Combo++,s._level12Combo>s._level12BestCombo&&(s._level12BestCombo=s._level12Combo);const L=1+Math.min(s._level12Combo-1,9)*.1,S=_(s._level12BPM),M=Math.round(w*S*L);s._level12Score+=M;try{const O=L>1||S>1.05?`+${M}  (x${S.toFixed(1)}×x${L.toFixed(1)})`:`+${M}`;s._floatScore(window.innerWidth/2,window.innerHeight*.36,O)}catch{}s._level12Combo>=2&&(d.textContent=String(s._level12Combo),a.hidden=!1,a.classList.remove("combo-flash"),a.offsetWidth,a.classList.add("combo-flash"),o.classList.add("combo-glow")),c.textContent=b==="perfect"?"完美! 🎯":"不错! ✨",G.fromTo(o,{scale:1},{scale:.85,duration:.1,yoyo:!0,repeat:1,ease:"power2.out"})}h.textContent=String(s._level12Hits);const T=s._level12TotalCuts>0?Math.round(s._level12Hits/s._level12TotalCuts*100)+"%":"—";g.textContent=T,s._level12Hits>=vr&&!s._level12Done&&(s._level12Done=!0,setTimeout(()=>f(),500))}o.addEventListener("click",()=>{s._level12Done||y()});const p=v=>{s._level12Done||(v.code==="Space"||v.key===" ")&&(v.preventDefault(),y())};window.addEventListener("keydown",p),u(s._level12BPM),s._level12Running=!0,s.say('看摆杆 — 摆到中间时"切"! 按得快又准就是节奏高手~');function f(){s._level12Tween&&(s._level12Tween.kill(),s._level12Tween=null);const v=s._level12TotalCuts>0?s._level12Hits/s._level12TotalCuts:0;let b;v>=.85?b=3:v>=.65?b=2:v>=.4?b=1:b=0;try{s.progress.markLevelComplete(12,b)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{const x=s._level12BestCombo>=2?` 连击 x${s._level12BestCombo}`:"";s._floatScore(window.innerWidth/2,window.innerHeight*.45,`🎵 ${s._level12Score} 分 (命中 ${Math.round(v*100)}%)${x}`)}catch{}s.say(`完美收尾! 命中 ${Math.round(v*100)}% — 你有节奏感! 🎵`),setTimeout(()=>{try{s.showWinOverlay(b,12)}catch{}},1300)}return()=>{if(s._level12Tween){try{s._level12Tween.kill()}catch{}s._level12Tween=null}if(window.removeEventListener("keydown",p),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level12-stage").forEach(v=>v.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const No=Object.freeze(Object.defineProperty({__proto__:null,default:Ro},Symbol.toStringTag,{value:"Module"}));class Io{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level13-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}function Bo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=13);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Io(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level13-stage"></div>');const r=s.stage.querySelector(".level13-stage"),n=document.createElement("div");n.className="level13-hud",n.innerHTML=`
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
  `,r.appendChild(n);const l=n.querySelector(".level13-hits"),o=n.querySelector(".level13-misses"),a=n.querySelector(".level13-bpm"),d=s.stage.querySelector(".level13-metronome"),c=s.stage.querySelector('[data-l13-drum="shadow"]');let _=80,h=0,m=0,g=0,u=!1;const y=Date.now();let p=Date.now()+1e3;function f(){const L=Date.now()-y;if(L>15e3){const M=Math.min((L-15e3)/1e4,1);return Math.round(130+M*50)}if(L>8e3){const M=Math.min((L-8e3)/7e3,1);return Math.round(100+M*30)}const S=Math.min(L/8e3,1);return Math.round(80+S*20)}function v(){if(u)return;_=f(),a.textContent=String(_);const L=s.stage.querySelector("#bpm-count");L&&(L.textContent=String(_)),d&&(d.style.transition="transform 0.08s linear",d.style.transform="rotate(-25deg)",setTimeout(()=>{d&&(d.style.transform="rotate(25deg)")},100),setTimeout(()=>{d&&(d.style.transform="rotate(0)")},200));const S=6e4/_;p=Date.now()+S,setTimeout(v,S)}setTimeout(v,1e3);function b(){if(u)return;const L=Date.now(),S=Math.abs(L-p),M=6e4/_/3,O=M*2;if(S<M){h++,g++;try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}c&&c.parentNode&&G.fromTo(c,{scale:1},{scale:.95,duration:.05,yoyo:!0,repeat:1,transformOrigin:"400px 380px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 完美 ⭐")}catch{}}else if(S<O){h++;try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ✨")}catch{}}else{m++;try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}l.textContent=String(h),o.textContent=String(m),h+m>=30&&(u=!0,setTimeout(()=>w(),600))}c&&c.parentNode&&(c.style.cursor="pointer",c.style.pointerEvents="all",c.addEventListener("pointerdown",L=>{L.preventDefault(),L.stopPropagation(),b()}));const x=document.createElement("div");x.className="level13-tap-zone",x.addEventListener("pointerdown",L=>{L.preventDefault(),b()}),s.stage.appendChild(x);const T=L=>{u||(L.code==="Space"||L.key===" ")&&(L.preventDefault(),b())};window.addEventListener("keydown",T),s.say("跟着拍子敲鼓! 速度会逐渐变快 — 完美一击拿星 ⭐");function w(){u=!0;let L;g>=30?L=3:g>=24?L=2:g>=18?L=1:L=0;try{s.progress.markLevelComplete(13,L)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}const S=h+m,M=S>0?Math.round(h/S*100):0;try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 完美 ${g} 次 (命中 ${M}%)`)}catch{}s.say(`完美 ${g} 次 — 你是节奏大师! 🎵`),setTimeout(()=>{try{s.showWinOverlay(L,13)}catch{}},1300)}return()=>{if(u=!0,window.removeEventListener("keydown",T),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&(s.stage.querySelectorAll(".level13-stage").forEach(L=>L.remove()),s.stage.querySelectorAll(".level13-tap-zone").forEach(L=>L.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Fo=Object.freeze(Object.defineProperty({__proto__:null,default:Bo},Symbol.toStringTag,{value:"Module"}));class Ho{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level14-background";let t="";for(let r=0;r<50;r++){const n=Math.random()*100,l=Math.random()*100,o=1+Math.random()*2.5,a=Math.random()*4;t+=`<circle class="level14-star" cx="${n}%" cy="${l}%" r="${o}"
                            style="animation-delay: ${a}s" />`}const i=`
      <g class="level14-moon">
        <circle cx="680" cy="90" r="46" fill="#fff8dc" />
        <circle cx="696" cy="76" r="42" fill="url(#l14Grad)" />
      </g>
    `;e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Ot=80,Mt=220,ws=48,qt=130,us=12,hs=8,qo=7*Ot,Go=[{id:"do#",pitch:"C#4",note:"C#",solfege:"Di",x:80},{id:"re#",pitch:"D#4",note:"D#",solfege:"Ri",x:160},{id:"fa#",pitch:"F#4",note:"F#",solfege:"Fi",x:320},{id:"sol#",pitch:"G#4",note:"G#",solfege:"Si",x:400},{id:"la#",pitch:"A#4",note:"A#",solfege:"Li",x:480}];function Wo(s){return`M ${s} 0
          H ${s+Ot}
          V ${Mt-us}
          Q ${s+Ot} ${Mt} ${s+Ot-us} ${Mt}
          H ${s+us}
          Q ${s} ${Mt} ${s} ${Mt-us}
          Z`}function zo(s){return`M ${s} 0
          H ${s+ws}
          V ${qt-hs}
          Q ${s+ws} ${qt} ${s+ws-hs} ${qt}
          H ${s+hs}
          Q ${s} ${qt} ${s} ${qt-hs}
          Z`}const yr="touch-action: none; -webkit-user-select: none; user-select: none;";class wt{constructor(e,t){this.root=e,this.notes=t,this.svg=null,this._rawOnPress=null,this._lastKeyTapTime=0,this._lastKeyEl=null,Object.defineProperty(this,"onPress",{configurable:!0,enumerable:!0,get:()=>this._rawOnPress?i=>{if(typeof this._rawOnPress!="function")return;const r=Date.now();if(!(r-this._lastKeyTapTime<250&&this._lastKeyEl===i)){this._lastKeyTapTime=r,this._lastKeyEl=i;try{this._rawOnPress(i)}catch(n){console.warn(n)}}}:null,set:i=>{this._rawOnPress=i}}),this.render()}render(){const e=document.createElement("div");e.className="keyboard-area stage__kb-area";let t="";this.notes.forEach((r,n)=>{const l=n*Ot,o=l+Ot/2,a=Wo(l);t+=`
        <g class="key key--white" data-pitch="${r.pitch}" data-id="${r.id}" style="${yr}">
          <path class="key__shape" d="${a}"
                fill="#fdfbf5" stroke="#d8d2c0" stroke-width="1.2" stroke-linejoin="round"/>
          <text class="key__label key__label--svg" x="${o}" y="184" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="18" font-weight="800" fill="#3d405b"
                style="pointer-events: none;">${r.note}</text>
          <text class="key__label key__label--svg" x="${o}" y="206" text-anchor="middle"
                font-family="'ZCOOL KuaiLe', 'Baloo 2', sans-serif"
                font-size="14" font-weight="500" fill="#6b7280"
                style="pointer-events: none;">${r.solfege}</text>
        </g>
      `}),Go.forEach(r=>{const n=r.x-ws/2,l=zo(n);t+=`
        <g class="key key--black" data-pitch="${r.pitch}" data-id="${r.id}" style="${yr}">
          <path class="key__shape" d="${l}"
                fill="#1f1d1a" stroke="#000000" stroke-width="0.8" stroke-linejoin="round"/>
        </g>
      `});const i=this.notes.map(r=>`
      <span class="keyboard-label" aria-hidden="true">
        <b>${r.note}</b><small>${r.solfege}</small>
      </span>
    `).join("");e.style.setProperty("--key-count",String(this.notes.length)),e.innerHTML=`
      <svg class="keyboard" xmlns="${oe}"
           viewBox="0 0 ${qo} ${Mt}"
           preserveAspectRatio="none"
           aria-label="钢琴键盘(C4-B4)">
        ${t}
      </svg>
      <div class="keyboard-labels">${i}</div>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.bindEvents()}bindEvents(){this.svg.querySelectorAll(".key").forEach(t=>{const i=t.querySelector(".key__shape"),r=i&&i.getAttribute("fill")||"",l=t.classList.contains("key--black")?"#5a4f2a":"#ffd166",o=()=>{t.classList.add("pressed"),i&&i.setAttribute("fill",l)},a=()=>{t.classList.remove("pressed"),i&&i.setAttribute("fill",r)};t.addEventListener("pointerdown",d=>{d.preventDefault(),o();try{t.setPointerCapture(d.pointerId)}catch{}typeof this.onPress=="function"&&this.onPress(t)}),t.addEventListener("pointerup",a),t.addEventListener("pointercancel",a),t.addEventListener("pointerleave",a),t.addEventListener("click",d=>d.preventDefault())})}glowKey(e){if(!e)return;e.classList.add("glow");const t=e.querySelector(".key__shape");t&&typeof t.animate=="function"&&t.animate([{filter:"drop-shadow(0 0 0px rgba(255, 209, 102, 0.95))"},{filter:"drop-shadow(0 0 18px rgba(255, 209, 102, 0.7))"},{filter:"drop-shadow(0 0 28px rgba(255, 209, 102, 0))"}],{duration:600,easing:"ease-out",fill:"forwards"}),setTimeout(()=>e.classList.remove("glow"),700)}glowAll(){Array.from(this.svg.querySelectorAll(".key--white")).forEach((t,i)=>{setTimeout(()=>this.glowKey(t),i*200)})}markPlaced(e,t){if(!this.svg)return;const i=this.svg.querySelector(`.key--white[data-id="${e}"]`);if(!i||i.querySelector(".kb-placed-dot"))return;const r=i.getBBox?i.getBBox():{x:0,y:0,width:80},n=r.x+r.width/2,l=r.y+18,o=document.createElementNS("http://www.w3.org/2000/svg","circle");o.setAttribute("class","kb-placed-dot"),o.setAttribute("cx",n),o.setAttribute("cy",l),o.setAttribute("r","10"),o.setAttribute("fill",t),o.setAttribute("stroke","white"),o.setAttribute("stroke-width","2"),i.appendChild(o)}resetMarks(){this.svg&&this.svg.querySelectorAll(".kb-placed-dot").forEach(e=>e.remove())}}const Ks=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Zs=[{name:"C 大三和弦",solfege:"Do  -  Mi  -  Sol",ids:["do","mi","sol"],color:"#e63946"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#b5c99a"},{name:"G 大三和弦",solfege:"Sol -  Si  -  Re",ids:["sol","si","re"],color:"#457b9d"},{name:"a 小三和弦",solfege:"La  -  Do  -  Mi",ids:["la","do","mi"],color:"#6a4c93"},{name:"F 大三和弦",solfege:"Fa  -  La  -  Do",ids:["fa","la","do"],color:"#ffc971"}];function jo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=14);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const r=document.createElement("style");r.dataset.levelStyle="14",r.textContent=`
    #stage { --lv14-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 6; /* 高于不透明背景(z1)与场景内容(z5)，保证琴键可见可点 */
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
  `,document.head.appendChild(r),s.scene=new Ho(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level14-stage"></div>');const n=s.stage.querySelector(".level14-stage"),l=document.createElement("div");l.className="level14-hud",l.innerHTML=`
    <div class="level14-stat">
      <span class="level14-stat__icon">🎶</span>
      <span class="level14-done">0</span> / 5 和弦
    </div>
    <div class="level14-stat">
      <span class="level14-stat__icon">⭐</span>
      <span class="level14-stars">0</span> 完美
    </div>
  `,n.appendChild(l);const o=l.querySelector(".level14-done"),a=l.querySelector(".level14-stars"),d=document.createElement("div");d.className="level14-card",d.innerHTML=`
    <div class="level14-card__name">C 大三和弦</div>
    <div class="level14-card__slots">
      <div class="level14-slot" data-idx="0">🐟</div>
      <div class="level14-slot" data-idx="1">🐟</div>
      <div class="level14-slot" data-idx="2">🐟</div>
    </div>
    <div class="level14-card__solfege">Do  -  Mi  -  Sol</div>
  `,n.appendChild(d);const c=d.querySelector(".level14-card__name"),_=d.querySelector(".level14-card__solfege"),h=d.querySelectorAll(".level14-slot");s.kb=new wt(s.stage,Ks),s._level14Idx=0,s._level14Perfect=0,s._level14Step=0,s._level14Done=!1,s._level14Failed=!1;function m(p){const f=Zs[p];c.textContent=f.name,c.style.background=`linear-gradient(135deg, ${f.color}, #fff8dc)`,c.style.webkitBackgroundClip="text",c.style.backgroundClip="text",c.style.color="transparent",_.textContent=f.solfege,h.forEach((v,b)=>{v.classList.remove("lit","placed","incorrect"),v.textContent=b===0?"🐟":"❓"})}function g(){s._level14Step=0,s._level14Failed=!1,h.forEach((p,f)=>{p.classList.remove("lit","placed","incorrect"),p.textContent=f===0?"🐟":"❓"})}function u(p,f,v){h[p].textContent=f,h[p].classList.add(v),setTimeout(()=>h[p].classList.remove(v),350)}s.kb.onPress=p=>{if(s._level14Done)return;const f=Zs[s._level14Idx],v=f.ids[s._level14Step],b=p.dataset.id,x=Ks.find(T=>T.id===b);try{s.kb.glowKey(p)}catch{}if(b===v){try{s.audio.correct()}catch{}try{s.audio.playNote(x.pitch)}catch{}if(s._level14Step===0)u(0,x.solfege,"placed"),h[0].style.color=f.color;else{u(s._level14Step,x.solfege,"placed"),h[s._level14Step].style.color=f.color;const T=s._level14Step+1;T<h.length&&(h[T].textContent="🐟")}if(s._level14Step++,s._level14Step>=3){s._level14Failed||(s._level14Perfect++,a.textContent=String(s._level14Perfect)),s._level14Idx++,o.textContent=String(s._level14Idx);try{s.audio.playScale(f.ids.map(T=>Ks.find(w=>w.id===T).pitch))}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.36,"+1 ⭐")}catch{}s._level14Idx>=Zs.length?(s._level14Done=!0,setTimeout(()=>y(),700)):setTimeout(()=>{m(s._level14Idx),g()},800)}}else{try{s.audio.wrong()}catch{}try{s.audio.playNote(x.pitch)}catch{}s._level14Failed=!0,s.wrongCount++,h.forEach(T=>{T.classList.add("incorrect")}),s.say(`错啦 — 应该是 ${f.solfege.split(/-+/).map(T=>T.trim()).filter(Boolean).join(" → ")}, 再来一次~`),setTimeout(()=>{g()},700)}},m(0),g(),s.say("看和弦卡 — 三条小鱼的顺序! 按钢琴键组成和弦~");function y(){const p=s._level14Perfect;let f;p>=5?f=3:p>=4?f=2:p>=3?f=1:f=0;try{s.progress.markLevelComplete(14,f)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 完美 ${p} / 5 和弦`)}catch{}s.say(`和弦大师! ${p} 个和弦完美完成 🎵`),setTimeout(()=>{try{s.showWinOverlay(f,14)}catch{}},1300)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}r&&r.parentNode&&r.remove(),s.stage&&s.stage.querySelectorAll(".level14-stage").forEach(p=>p.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Vo=Object.freeze(Object.defineProperty({__proto__:null,default:jo},Symbol.toStringTag,{value:"Module"}));class Yo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level15-background";const t=`
      <g class="level15-mountain-far">
        <path d="M0,500 L0,400 L100,360 L200,400 L320,350 L420,400 L560,360 L680,400 L800,370 L800,500 Z"
              fill="rgba(30, 60, 95, 0.4)" />
      </g>
      <g class="level15-mountain-mid">
        <path d="M0,500 L0,440 L80,400 L180,440 L300,410 L380,440 L520,400 L640,440 L760,410 L800,430 L800,500 Z"
              fill="rgba(50, 100, 140, 0.5)" />
      </g>
    `;let i="";const r=["♪","♫","♬","🎵"];for(let n=0;n<8;n++){const l=Math.random()*100,o=Math.random()*100,a=16+Math.random()*22,d=Math.random()*6,c=r[n%r.length];i+=`<text x="${l}%" y="${o}%" class="level15-note-deco"
                          style="font-size: ${a}px; animation-delay: ${d}s">${c}</text>`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Gt=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],fs=6,Uo=3500,Qo=1500,Ko={do:175,re:150,mi:120,fa:105,sol:90,la:65,si:45},We=30;function Zo(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=15);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const r=document.createElement("style");r.dataset.levelStyle="15",r.textContent=`
    #stage { --lv15-kb-h: clamp(92px, 24%, 170px); }
    #stage > .keyboard-area {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 6; /* 高于不透明背景(z1)与读谱层(z5)，保证琴键可见可点 */
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
  `,document.head.appendChild(r),s.scene=new Yo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level15-staff-area"></div>');const n=s.stage.querySelector(".level15-staff-area");n.innerHTML=`
    <svg class="level15-staff" viewBox="0 0 800 260" preserveAspectRatio="xMidYMid meet">
      <!-- 5 lines -->
      <line class="level15-staff-line" x1="40" y1="${We+40}"  x2="760" y2="${We+40}" />
      <line class="level15-staff-line" x1="40" y1="${We+60}"  x2="760" y2="${We+60}" />
      <line class="level15-staff-line" x1="40" y1="${We+80}"  x2="760" y2="${We+80}" />
      <line class="level15-staff-line" x1="40" y1="${We+100}" x2="760" y2="${We+100}" />
      <line class="level15-staff-line" x1="40" y1="${We+120}" x2="760" y2="${We+120}" />
      <!-- treble clef (简化, 用 tspan '𝄞' 或 G 字母) -->
      <text x="50" y="${We+95}" class="level15-clef" font-family="serif" font-size="100" fill="#fff8dc">𝄞</text>
      <!-- 当前音符 -->
      <g class="level15-note-grp" transform="translate(400, 0)">
        <ellipse class="level15-current-note" cx="0" cy="0" rx="12" ry="9" fill="#ffd166"
                 stroke="#3d405b" stroke-width="2" />
        <line class="level15-stem" x1="12" y1="0" x2="12" y2="-32"
              stroke="#3d405b" stroke-width="2" />
      </g>
    </svg>
  `;const l=n.querySelector(".level15-current-note"),o=n.querySelector(".level15-stem");s.stage.insertAdjacentHTML("beforeend",`
    <div class="level15-metronome">
      <span class="level15-metronome-label">速度</span>
      <span class="level15-metronome-bpm" id="level15-bpm">1.0x</span>
      <span class="level15-metronome-combo" id="level15-combo"></span>
    </div>
  `),s.kb=new wt(s.stage,Gt);const a={value:1};s._level15Idx=0,s._level15Correct=0,s._level15Accepting=!0,s._level15Done=!1,s._level15ConsecRight=0,s._level15ConsecWrong=0,s._level15Easy=!1;function d(){return Gt[Math.floor(Math.random()*Gt.length)]}function c(f,v){a.value=f;const b=document.getElementById("level15-bpm");b&&(b.textContent=v||`${f.toFixed(1)}x`)}function _(){return Math.max(Qo,Math.round(Uo/a.value))}function h(){if(s._level15Done||s._level15Idx>=fs)return;const f=d(),v=Ko[f.id];if(!l||!o)return;const b=n.querySelector(".level15-note-grp");if(!b)return;b.setAttribute("transform",`translate(400, ${v})`),l.dataset.pitch=f.pitch,l.dataset.id=f.id,l.classList.remove("incorrect"),l.style.opacity="1",l.setAttribute("fill","#ffd166"),s.say(`下一个: ${f.solfege}`),s._level15Accepting=!0;const x=_(),T=Date.now(),w=setTimeout(()=>{!s._level15Done&&s._level15Accepting&&m()},x);s._level15FallTimer=w,s._level15FallStart=T,s._level15FallDur=x}function m(){s._level15Accepting=!1,s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,g();try{s.audio.wrong()}catch{}s.say("漏拍啦 — 看下一个音符~"),l&&l.classList.add("incorrect"),s._level15FallTimer&&clearTimeout(s._level15FallTimer),setTimeout(()=>{l&&l.classList.remove("incorrect"),s._level15Idx++,s._level15Idx>=fs?y():h()},500)}function g(){if(!s._level15Easy&&s._level15ConsecWrong>=3){s._level15Easy=!0,c(1,"1.0x 轻松");try{s.say("进入轻松模式 — 慢慢来!")}catch{}}}function u(){if(a.value>=1.5)return;const f=Math.min(1.5,+(a.value+.1).toFixed(1));c(f);const v=document.getElementById("level15-combo");v&&(v.textContent=`连对 ${s._level15ConsecRight} → 加速!`)}s.kb.onPress=f=>{if(!s._level15Accepting||s._level15Done)return;const v=f.dataset.pitch,b=f.dataset.id,x=l?l.dataset.pitch:null,T=l?l.dataset.id:null;try{s.kb.glowKey(f)}catch{}if(v===x){s._level15Accepting=!1,s._level15Correct++,s._level15ConsecRight++,s._level15ConsecWrong=0,s._level15FallTimer&&clearTimeout(s._level15FallTimer);try{s.audio.correct()}catch{}try{s.audio.playNote(v)}catch{}l&&(l.style.opacity="0");const w=["完美!","棒!","眼睛真快!","看谱高手!"];s.say(w[Math.min(s._level15Correct-1,w.length-1)]),s._level15ConsecRight>=3&&!s._level15Easy&&u(),s._level15Idx++,setTimeout(()=>{s._level15Idx>=fs?y():h()},350)}else{s.wrongCount++,s._level15ConsecWrong++,s._level15ConsecRight=0,g();try{s.audio.wrong()}catch{}try{s.audio.playNote(v)}catch{}const w=Gt.find(S=>S.id===b);s.say(`这是 ${w?w.solfege:"?"}, 不是 ${Gt.find(S=>S.id===T).solfege}. 再看谱!`),l&&l.classList.add("incorrect");const L=l;setTimeout(()=>{L&&L.classList.remove("incorrect")},350)}};function y(){s._level15Done||(s._level15Done=!0,setTimeout(()=>p(),600))}c(1,"1.0x"),setTimeout(h,800),s.say("看 5 线谱上的音符 — 按对应的钢琴键, 越对越快!");function p(){const f=s._level15Correct;let v;f>=5?v=3:f>=4?v=2:f>=3?v=1:v=0;try{s.progress.markLevelComplete(15,v)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.42,`🎵 看谱对了 ${f} / ${fs}`)}catch{}s.say(`视奏大师! 6 音对了 ${f} 个 🎼`),setTimeout(()=>{try{s.showWinOverlay(v,15)}catch{}},1300)}return()=>{if(s._level15FallTimer&&(clearTimeout(s._level15FallTimer),s._level15FallTimer=null),s.scene){try{s.scene.teardown()}catch{}s.scene=null}r&&r.parentNode&&r.remove(),s.stage&&(s.stage.querySelectorAll(".level15-staff-area").forEach(f=>f.remove()),s.stage.querySelectorAll(".level15-metronome").forEach(f=>f.remove())),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Xo=Object.freeze(Object.defineProperty({__proto__:null,default:Zo},Symbol.toStringTag,{value:"Module"}));class Jo{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level16-background";let t="";for(let r=0;r<20;r++){const n=Math.random()*100,l=Math.random()*100,o=6+Math.random()*12,a=Math.random()*5,d=4+Math.random()*4;t+=`<circle class="level16-particle" cx="${n}%" cy="${l}%" r="${o}"
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
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const ps=8,_s=60,mr=10,ea=6,gr=3;function ta(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=16);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Jo(s.stage),s.stage.insertAdjacentHTML("beforeend",'<div class="level16-stage"></div>');const r=s.stage.querySelector(".level16-stage"),n=document.createElement("div");n.className="level16-hud",n.innerHTML=`
    <div class="level16-stat">
      <span class="level16-stat__icon">🎯</span>
      轮 <span class="level16-round">1</span> / ${ps}
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⏱</span>
      <span class="level16-bpm">${_s}</span> BPM
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">🔥</span>
      连击 <span class="level16-combo">0</span>
    </div>
    <div class="level16-stat">
      <span class="level16-stat__icon">⭐</span>
      完美轮 <span class="level16-perf-rounds">0</span>
    </div>
  `,r.appendChild(n);const l=n.querySelector(".level16-round"),o=n.querySelector(".level16-bpm"),a=n.querySelector(".level16-combo"),d=n.querySelector(".level16-perf-rounds"),c=document.createElement("div");c.className="level16-drum-wrap",c.innerHTML=`
    <svg class="level16-drum" viewBox="0 0 200 200">
      <ellipse cx="100" cy="170" rx="80" ry="14" fill="rgba(0,0,0,0.35)" />
      <ellipse cx="100" cy="160" rx="80" ry="22" fill="#5d3a1a" />
      <ellipse data-l16-drum-head cx="100" cy="155" rx="74" ry="18" fill="#8b4513" stroke="#5d3a1a" stroke-width="2" />
      <text class="level16-drum-text" x="100" y="160" text-anchor="middle"
            font-family="ZCOOL KuaiLe" font-size="22" font-weight="900" fill="#fff8dc">🥁 敲!</text>
    </svg>
  `,r.appendChild(c);const _=c.querySelector("svg"),h=_?_.querySelector("[data-l16-drum-head]"):null,m=_?_.querySelector("text"):null,g=document.createElement("div");g.className="level16-meter",g.innerHTML=`
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
  `,r.appendChild(g);const u=document.createElement("div");u.className="level16-ladder";let y="";for(let S=0;S<ps;S++){const M=_s+mr*S;y+=`
      <div class="level16-rung ${S===0?"active":""}" data-bpm="${M}">
        <span class="level16-rung__num">第 ${S+1} 轮</span>
        <span class="level16-rung__bpm">${M} BPM</span>
      </div>
    `}u.innerHTML=`
    <div class="level16-ladder__title">速度阶梯</div>
    ${y}
  `,r.appendChild(u);const p=u.querySelectorAll(".level16-rung");s._level16Round=0,s._level16Bpm=_s,s._level16RoundHits=0,s._level16RoundTaps=0,s._level16Combo=0,s._level16PerfectRounds=0,s._level16Done=!1,s._level16Phase=0,s._level16Tween=null,s._level16PendingTickAt=null,s._level16RunningRound=!1,s._level16Timer=null,s._level16RoundStartAt=0;function f(S){s._level16Tween&&(s._level16Tween.kill(),s._level16Tween=null);const M=60/S,O=30,R=G.to({},{duration:M,repeat:-1,yoyo:!0,ease:"sine.inOut",onUpdate:()=>{const B=R.progress(),W=-O+B*2*O,q=g.querySelector(".level16-pendulum");q&&(q.style.transform=`rotate(${W}deg)`),s._level16Phase=(W+O)/(2*O)},onRepeat:()=>{const B=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+B/2}}),D=6e4/S;s._level16PendingTickAt=Date.now()+D/2,s._level16Tween=R}function v(){const S=6e4/s._level16Bpm;s._level16PendingTickAt=Date.now()+S/2}function b(){if(s._level16Done||!s._level16RunningRound)return;const S=Date.now();6e4/s._level16Bpm;const M=s._level16Phase,O=Math.abs(M-.5);let R;O<=.15?R="perfect":O<=.3?R="good":R="miss",s._level16PendingTickAt||v(),Math.abs(S-s._level16PendingTickAt),s._level16RoundTaps++;const D=document.getElementById("level16-hit-ring");if(D&&(D.classList.remove("hit-perfect","hit-good","hit-miss"),D.offsetWidth,R==="perfect"?D.classList.add("hit-perfect"):R==="good"?D.classList.add("hit-good"):D.classList.add("hit-miss"),setTimeout(()=>D.classList.remove("hit-perfect","hit-good","hit-miss"),500)),R==="perfect"){s._level16RoundHits++,s._level16Combo++,d.textContent=String(s._level16PerfectRounds),a.textContent=String(s._level16Combo);try{s.audio.playNote("C4")}catch{}try{s.audio.correct()}catch{}h&&G.fromTo(h,{scale:1},{scale:.92,duration:.05,yoyo:!0,repeat:1,transformOrigin:"100px 155px"});try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+1 ⭐")}catch{}}else if(R==="good"){try{s.audio.playNote("G4")}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"+0 ✨")}catch{}}else{s._level16Combo=0,a.textContent="0";try{s.audio.wrong()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"漏拍 ✗")}catch{}}v(),s._level16RoundTaps>=ea&&T()}function x(){s._level16RoundHits=0,s._level16RoundTaps=0,s._level16RunningRound=!0,v(),l.textContent=String(s._level16Round+1),o.textContent=String(s._level16Bpm),p.forEach((S,M)=>S.classList.toggle("active",M===s._level16Round)),s.say(`第 ${s._level16Round+1} 轮 — ${s._level16Bpm} BPM!`)}function T(){if(s._level16RunningRound=!1,s._level16RoundHits>=gr&&s._level16PerfectRounds++,d.textContent=String(s._level16PerfectRounds),m&&(m.textContent=s._level16RoundHits>=gr?"🎉":"💪",setTimeout(()=>{m&&(m.textContent="🥁 敲!")},800)),s._level16Round++,s._level16Round>=ps){s._level16Done=!0,s._level16Tween&&(s._level16Tween.kill(),s._level16Tween=null),setTimeout(()=>L(),800);return}s._level16Bpm=_s+mr*s._level16Round,o.textContent=String(s._level16Bpm),f(s._level16Bpm),setTimeout(x,1500)}f(s._level16Bpm),x(),_&&(_.style.cursor="pointer",_.addEventListener("pointerdown",S=>{S.preventDefault(),S.stopPropagation(),b()}));const w=S=>{s._level16Done||(S.code==="Space"||S.key===" ")&&(S.preventDefault(),b())};window.addEventListener("keydown",w),s.say("看摆杆 — 摆到中间时敲鼓! 越爬越快 ⏱");function L(){let S;const M=s._level16PerfectRounds;M>=8?S=3:M>=7?S=2:M>=5?S=1:S=0;try{s.progress.markLevelComplete(16,S)}catch{}try{s.audio.playScale(["C4","E4","G4","C5"])}catch{}try{s._flashScreen()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,`🎵 ${ps} 轮, ${M} 完美轮`)}catch{}s.say(`爬到顶啦! ${M} 轮完美 🎵🚀`),setTimeout(()=>{try{s.showWinOverlay(S,16)}catch{}},1300)}return()=>{if(s._level16Tween){try{s._level16Tween.kill()}catch{}s._level16Tween=null}if(window.removeEventListener("keydown",w),s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level16-stage").forEach(S=>S.remove()),e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const sa=Object.freeze(Object.defineProperty({__proto__:null,default:ta},Symbol.toStringTag,{value:"Module"}));function ia(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=2),s._startLevel2();const e=s.stage;e.insertAdjacentHTML("beforeend",`
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
  `);function t(){const f=e.querySelectorAll(".level2-prog-dot"),v=s._level2Done?s._level2Done.size:0;f.forEach((b,x)=>{x<v?b.classList.add("filled"):b.classList.remove("filled")})}function i(f){if(!f)return;const v=f.getBoundingClientRect(),b=e.getBoundingClientRect(),x=v.left-b.left+v.width/2,T=v.top-b.top,w=document.createElement("div");w.className="level2-correct-bubble",w.textContent="✨ 答对啦! ✨",w.style.left=x+"px",w.style.top=T-36+"px",e.appendChild(w),setTimeout(()=>w.remove(),1400);for(let L=0;L<6;L++){const S=document.createElement("div");S.className="level2-sparkle",S.style.left=x+(Math.random()-.5)*70+"px",S.style.top=T+(Math.random()-.5)*70+"px",S.style.animationDelay=L*.06+"s",e.appendChild(S),setTimeout(()=>S.remove(),1100)}}function r(f,v){const b=document.createElement("div");b.className="level2-big-solfege",v&&b.style.setProperty("--big-solfege-color",v),b.textContent=f,e.appendChild(b),e.classList.add("level2-bg-pulse"),setTimeout(()=>{e.classList.remove("level2-bg-pulse");try{b.remove()}catch{}},1500)}const n={Do:[130.81,261.63,392],Re:[146.83,293.66,440],Mi:[164.81,329.63,493.88],Fa:[174.61,349.23,523.25],Sol:[196,392,587.33],La:[220,440,659.25],Si:[246.94,493.88,739.99]};function l(f){const v=s.audio;if(!v||!v._webAudio||v.muted)return;const b=v._webAudio;try{v._resumeWebAudio&&v._resumeWebAudio()}catch{}const x=n[f]||n.Do,T=b.currentTime+.05;x.forEach((w,L)=>{const S=T+L*.13,M=b.createOscillator();M.type="triangle",M.frequency.setValueAtTime(w,S);const O=b.createGain();O.gain.setValueAtTime(1e-4,S),O.gain.exponentialRampToValueAtTime(.5,S+.02),O.gain.exponentialRampToValueAtTime(1e-4,S+.18),M.connect(O).connect(v._masterGain),M.start(S),M.stop(S+.22),typeof v._trackOsc=="function"&&v._trackOsc(M,S+.22)})}const o=s._markLevel2FishCorrect.bind(s);s._markLevel2FishCorrect=f=>{o(f),t(),i(f);const v=f&&f.dataset?f.dataset.id:null;if(v){const b=a.find(x=>x.id===v);if(b){r(b.solfege,b.color);try{l(b.solfege)}catch{}}}typeof y=="function"&&y()};const a=[{id:"do",pitch:"C4"},{id:"re",pitch:"D4"},{id:"mi",pitch:"E4"},{id:"fa",pitch:"F4"},{id:"sol",pitch:"G4"},{id:"la",pitch:"A4"},{id:"si",pitch:"B4"}],d={C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,B4:493.88};function c(f){const v=s.audio;if(!v||!v._webAudio||!v._masterGain||v.muted)return!1;const b=v._webAudio;try{v._resumeWebAudio&&v._resumeWebAudio()}catch{}const x=b.currentTime,T=d[f];if(!T)return!1;const w=b.createOscillator();w.type="triangle",w.frequency.setValueAtTime(T,x);const L=b.createOscillator();L.type="sine",L.frequency.setValueAtTime(T*2,x);const S=b.createOscillator();S.type="sine",S.frequency.setValueAtTime(T*3,x);const M=b.createGain();M.gain.setValueAtTime(1e-4,x),M.gain.exponentialRampToValueAtTime(1,x+.015),M.gain.exponentialRampToValueAtTime(.7,x+.35),M.gain.exponentialRampToValueAtTime(1e-4,x+2.2);const O=b.createGain();O.gain.value=.18;const R=b.createGain();R.gain.value=.06,w.connect(M).connect(v._masterGain),L.connect(O).connect(M),S.connect(R).connect(M);const D=x+2.3;return w.start(x),w.stop(D),L.start(x),L.stop(D),S.start(x),S.stop(D),!0}const _=s._replayQuestion.bind(s);s._replayQuestion=()=>{const f=s.audio,v=s._level2AnswerNote;if(!v)return;const b=a.find(O=>O.id===v);if(!b){_();return}if(!f||!f._webAudio||!f._masterGain){_();return}const x=f._webAudio,T=f._masterGain,w=x.currentTime,L=f.muted?0:.75,S=f.muted?0:1;try{const O=typeof T.gain.value=="number"?T.gain.value:L;T.gain.cancelScheduledValues(w),T.gain.setValueAtTime(O,w),T.gain.linearRampToValueAtTime(S,w+.06),T.gain.linearRampToValueAtTime(L,w+2.5)}catch{}c(b.pitch);const M=document.getElementById("level2-listen-prompt");M&&(M.classList.add("active"),clearTimeout(M._hideTimer),M._hideTimer=setTimeout(()=>M.classList.remove("active"),2500))};function h(){[3,2,1].forEach((v,b)=>{setTimeout(()=>{const x=document.createElement("div");x.className="level2-countdown",x.textContent=String(v),e.appendChild(x),setTimeout(()=>{try{x.remove()}catch{}},720)},b*650)})}const m=s._level2NextQuestion.bind(s);s._level2NextQuestion=()=>{const f=!s._level2AnswerNote;m(),!f&&s._level2AnswerNote&&h()};let g=null;function u(){g&&clearTimeout(g),g=setTimeout(()=>{if(s._level2AnswerNote&&(s._level2Done||new Set).size<(s._level2Total||5))try{s.say("哪条小鱼刚才唱歌了? 点点它 🎵")}catch{}},1e4)}function y(){u()}const p=s._replayQuestion;if(s._replayQuestion=()=>{try{p()}catch{}y()},typeof s._handleLevel2Answer=="function"){const f=s._handleLevel2Answer.bind(s);s._handleLevel2Answer=(v,b)=>{try{f(v,b)}catch{}y()}}return setTimeout(y,1200),t(),()=>{g&&(clearTimeout(g),g=null),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null);const f=document.getElementById("hud-level2");f&&(f.style.display="");const v=document.querySelector(".hud__dots");v&&(v.style.display="none");const b=document.getElementById("btn-replay");b&&(b.style.display="none");const x=document.getElementById("level2-listen-prompt");x&&x.remove();const T=document.getElementById("level2-progress-dots");T&&T.remove(),e.querySelectorAll(".level2-correct-bubble, .level2-sparkle, .level2-countdown").forEach(w=>w.remove())}}const ra=Object.freeze(Object.defineProperty({__proto__:null,default:ia},Symbol.toStringTag,{value:"Module"})),br=[{id:"do",height:"42%",texture:"moss"},{id:"re",height:"52%",texture:"stone"},{id:"mi",height:"62%",texture:"fern"},{id:"sol",height:"72%",texture:"cloud"},{id:"la",height:"82%",texture:"star"}];class na{constructor(e){this.stage=e,this.background=null,this.targets=null,this.render()}render(){const e=document.createElement("div");e.className="level3-background",e.innerHTML=`
      <!-- meet: 竖屏完整保留左右山景，剩余空间由背景渐变承接，不再 slice 裁边 -->
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e;const t=document.createElement("div");t.className="level3-targets",t.setAttribute("aria-label","五座高低不同的山"),t.innerHTML=br.map((i,r)=>`
      <div class="level3-target level3-target--${i.texture}" data-note="${i.id}" style="--mountain-h:${i.height}; --target-i:${r}">
        <div class="level3-target__halo"></div>
        <div class="level3-target__mountain"><span class="level3-target__peak"></span></div>
      </div>
    `).join(""),this.stage.appendChild(t),this.targets=t}getTarget(e){return this.targets?.querySelector(`[data-note="${e}"]`)||null}getClosestTarget(e){if(!e||!Number.isFinite(e.x)||!Number.isFinite(e.y))return null;let t=null,i=1/0;return this.targets?.querySelectorAll(".level3-target").forEach(r=>{const n=r.getBoundingClientRect(),l=n.left+n.width/2,o=n.top+n.height*.58,a=Math.hypot(e.x-l,e.y-o);a<i&&(t=r,i=a)}),{target:t,distance:i}}setListening(e){this.targets?.classList.toggle("is-listening",!!e)}setHoverTarget(e){this.targets?.querySelectorAll(".is-hover-target").forEach(t=>t.classList.remove("is-hover-target")),e&&e.classList.add("is-hover-target")}markPlaced(e){const t=this.getTarget(e);t&&(t.classList.remove("is-hover-target"),t.classList.add("is-placed"))}setProgress(e){if(!this.background)return;const t=this.background.querySelector(".level3-sunset-overlay");if(!t)return;const i=Math.min(3,Math.ceil(e/br.length*3));t.className=`level3-sunset-overlay level3-progress-${i}`}bloomAt(e,t,i="#ffd166"){if(!this.background)return;const r=this.background.querySelector(".level3-bloom-layer");if(!r)return;const n=this.background.getBoundingClientRect(),l=e-n.left,o=t-n.top;for(let a=0;a<12;a++){const d=document.createElement("div");d.className="level3-bloom-sparkle",d.style.left=`${l}px`,d.style.top=`${o}px`,d.style.background=i;const c=Math.PI*2*a/12,_=45+Math.random()*35;d.style.setProperty("--bx",`${Math.cos(c)*_}px`),d.style.setProperty("--by",`${Math.sin(c)*_}px`),r.appendChild(d),setTimeout(()=>{try{d.remove()}catch{}},1100)}}teardown(){this.background?.remove(),this.targets?.remove(),this.background=null,this.targets=null}}const xr={do:{main:"M2,36 L24,18 L20,30 L20,42 L24,54 Z",stripes:"M10,30 L16,24 M10,42 L16,48"},re:{main:"M2,36 Q22,18 24,36 Q22,54 2,36 Z",stripes:"M8,30 Q14,28 18,32 M8,42 Q14,44 18,40"},mi:{main:"M2,36 L26,20 L26,52 Z",stripes:"M8,32 L22,28 M8,40 L22,44"},fa:{main:"M2,36 Q8,30 14,34 Q20,28 24,36 Q20,44 14,38 Q8,42 2,36 Z",stripes:"M6,36 Q10,34 14,36 M14,36 Q18,34 22,36"},sol:{main:"M2,36 L18,28 L22,34 L26,28 L26,44 L22,40 L18,46 Z",stripes:"M10,34 L16,32 M10,38 L16,40"},la:{main:"M2,36 L24,24 L20,32 L24,40 L2,36 Z M8,28 L18,28 M8,36 L18,36 M8,44 L18,44",stripes:"M4,30 L10,30 M4,36 L10,36 M4,42 L10,42"},si:{main:"M2,36 Q12,28 18,36 Q24,44 2,36 Q12,30 8,38 Z",stripes:"M6,34 L14,34 M6,38 L14,38"}},wr={do:{front:{rx:5.5,ry:6,pupil:2.5},back:{rx:4,ry:4.5,pupil:1.8},extra:"eyelashes"},re:{front:{rx:6,ry:6.5,pupil:3},back:{rx:4.5,ry:5,pupil:2.2},extra:"round"},mi:{front:{rx:5.5,ry:3.5,pupil:2.4},back:{rx:4,ry:2.5,pupil:1.8},extra:"narrow"},fa:{front:{rx:5.5,ry:.5,pupil:0},back:{rx:4,ry:.4,pupil:0},extra:"closed"},sol:{front:{rx:5.5,ry:4,pupil:2.2},back:{rx:4,ry:3,pupil:1.6},extra:"squint"},la:{front:{rx:7,ry:8,pupil:3.2},back:{rx:5,ry:5.5,pupil:2.4},extra:"surprised"},si:{front:{rx:5.5,ry:3,pupil:2.4},back:{rx:4,ry:2,pupil:1.8},extra:"cool"}},la={do:2,re:1,mi:2,fa:1,sol:3,la:2,si:1},oa={do:"bow",mi:"hat",sol:"crown",la:"earring"};function aa(s){return function(){let e=s+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}class ca{constructor(e,{showLabel:t=!0}={}){this.note=e,this.showLabel=t;const i=document.createElement("div");return i.className="fish",i.dataset.id=e.id,i.dataset.pitch=e.pitch,i.dataset.color=e.color,i.style.cssText=["width: 96px","height: 72px","touch-action: manipulation","-webkit-user-select: none","user-select: none","-webkit-tap-highlight-color: transparent"].join(";"),this.el=i,this.render(),i}render(){const{id:e,color:t,solfege:i,pitch:r}=this.note,{showLabel:n}=this,l=(e||"do").toLowerCase();let o=[...l].reduce((j,pe)=>j*31+pe.charCodeAt(0)>>>0,2166136261);const a=()=>{o+=1831565813;let j=o;return j=Math.imul(j^j>>>15,j|1),j^=j+Math.imul(j^j>>>7,j|61),((j^j>>>14)>>>0)/4294967296},d=(a()*8-4).toFixed(1),c=(.94+a()*.08).toFixed(2),_=(a()*1.4).toFixed(2),h=a()>.7,m=(1.7+a()*.5).toFixed(1),g=(.38+a()*.16).toFixed(2),u=(j,pe)=>{const xe=(j||"#999").replace("#","").match(/.{2}/g);if(!xe)return j;const[we,Ge,Tt]=xe.map(St=>parseInt(St,16)),Ke=St=>{const Hs=pe<0?0:255,ls=Math.abs(pe)/100;return Math.round((Hs-St)*ls+St).toString(16).padStart(2,"0")};return`#${Ke(we)}${Ke(Ge)}${Ke(Tt)}`},y=Math.floor(a()*3),p=(8+a()*8).toFixed(0),f={r:0,g:0,b:0};y===0?(f.r=+p,f.g=+Math.floor(p/2)):y===1?(f.b=+p,f.g=+Math.floor(p/2)):(f.r=+Math.floor(p/2),f.g=+Math.floor(p/2),f.b=+Math.floor(p/2));const v=(t||"#999999").replace("#","").match(/.{2}/g);let b=t;if(v){const[j,pe,xe]=v.map(we=>parseInt(we,16));b="#"+[j+f.r,pe+f.g,xe+f.b].map(we=>Math.max(0,Math.min(255,we)).toString(16).padStart(2,"0")).join("")}const x=u(b,-25),T=u(b,22),w=a()>.5?2:1,L=Array.from({length:w}).map((j,pe)=>{const xe=(1.5+a()*1.2).toFixed(1),we=-6-pe*5,Ge=32+(pe%2===0?0:6),Tt=(2.4+a()*1.6).toFixed(2),Ke=(a()*2).toFixed(2);return`
        <circle cx="${we}" cy="${Ge}" r="${xe}" fill="rgba(255,255,255,0.55)">
          <animate attributeName="cy" from="${Ge}" to="${Ge-18}" dur="${Tt}s"
                   begin="${Ke}s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.85;0" keyTimes="0;0.4;1"
                   dur="${Tt}s" begin="${Ke}s" repeatCount="indefinite" />
        </circle>`}).join(""),S=xr[l]?l:"do",M=xr[S],O=`
      <path d="${M.main}"
            style="fill: ${x}; stroke: rgba(0,0,0,0.22); stroke-width: 0.6; stroke-linejoin: round;" />
      <path d="${M.stripes}"
            style="stroke: rgba(0,0,0,0.32); stroke-width: 0.5; stroke-linecap: round; opacity: 0.55;" />`,R=wr[l]?l:"do",D=wr[R],B=68,W=32,q=56,z=32,ee=D.extra==="closed"?"":`<animate attributeName="ry"
                 values="${D.front.ry};${D.front.ry};0.4;${D.front.ry};${D.front.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${_}s"
                 repeatCount="indefinite" />`,ge=D.extra==="closed"?"":`<animate attributeName="ry"
                 values="${D.back.ry};${D.back.ry};0.3;${D.back.ry};${D.back.ry}"
                 keyTimes="0;0.46;0.5;0.54;1"
                 dur="3.6s" begin="${(parseFloat(_)+.15).toFixed(2)}s"
                 repeatCount="indefinite" />`;let C="";D.extra==="eyelashes"?C=`
        <circle cx="66" cy="38" r="0.6" fill="#1a1a1a" />
        <circle cx="70" cy="38" r="0.6" fill="#1a1a1a" />`:D.extra==="surprised"?C='<ellipse cx="68" cy="44" rx="1.2" ry="0.6" fill="rgba(0,0,0,0.5)" />':D.extra==="cool"?C='<path d="M62,28 L74,28" stroke="rgba(0,0,0,0.65)" stroke-width="0.7" stroke-linecap="round" />':D.extra==="squint"&&(C=`
        <path d="M62,38 Q64,40 66,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />
        <path d="M72,38 Q74,40 76,38" stroke="rgba(0,0,0,0.45)" stroke-width="0.5" fill="none" stroke-linecap="round" />`);const k=D.extra==="closed"?`<path d="M${B-D.front.rx},${W} Q${B},${W-.6} ${B+D.front.rx},${W}"
             stroke="rgba(0,0,0,0.7)" stroke-width="1.1" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${B}" cy="${W}" rx="${D.front.rx}" ry="${D.front.ry}"
                 fill="white" stroke="rgba(0,0,0,0.6)" stroke-width="0.5">${ee}</ellipse>`,P=D.extra==="closed"?`<path d="M${q-D.back.rx},${z} Q${q},${z-.4} ${q+D.back.rx},${z}"
             stroke="rgba(0,0,0,0.6)" stroke-width="0.9" fill="none" stroke-linecap="round" />`:`<ellipse class="fish-eye" cx="${q}" cy="${z}" rx="${D.back.rx}" ry="${D.back.ry}"
                 fill="white" stroke="rgba(0,0,0,0.55)" stroke-width="0.4">${ge}</ellipse>`,F=D.extra==="closed"?"":`<circle class="fish-pupil" cx="${B}" cy="${W}" r="${D.front.pupil}" fill="#1a1a1a" />
         <circle cx="${B+1.5}" cy="${W-2}" r="1.3" fill="white" />
         <circle cx="${B-1.5}" cy="${W+1.5}" r="0.6" fill="rgba(255,255,255,0.8)" />`,N=D.extra==="closed"?"":`<circle class="fish-pupil" cx="${q}" cy="${z}" r="${D.back.pupil}" fill="#1a1a1a" />
         <circle cx="${q+1.2}" cy="${z-1.5}" r="0.9" fill="white" />`,A=`
      ${P}${N}
      ${k}${F}
      ${C}`,E=la[l]||1;let $="";h&&($=[{x:78,y:10,r:parseFloat(m)},{x:84,y:4,r:parseFloat(m)*.55},{x:88,y:0,r:parseFloat(m)*.32}].slice(0,E).map((xe,we)=>`<circle cx="${xe.x}" cy="${xe.y}" r="${xe.r.toFixed(1)}"
                 fill="rgba(255,255,255,${(.85-we*.12).toFixed(2)})"
                 stroke="rgba(255,255,255,0.5)" stroke-width="0.4" />`).join(""));const H=(e||"do").split("").reduce((j,pe)=>j+pe.charCodeAt(0),0),I=aa(H*73+17),Q=3+Math.floor(I()*3),U=Array.from({length:Q}).map(()=>{const j=(32+I()*36).toFixed(1),pe=(30+I()*16).toFixed(1),xe=(.5+I()*.9).toFixed(2),we=parseFloat(j),Ge=parseFloat(pe);return we>60&&we<72&&Ge>28&&Ge<36?"":`<circle cx="${j}" cy="${pe}" r="${xe}" fill="rgba(0,0,0,0.42)" />`}).join(""),K=(2+a()*1).toFixed(2),ne=(a()*1).toFixed(2),V=`
      <path d="M40,22 Q34,18 32,24 Q36,26 40,26 Z"
            style="fill: ${T}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 24;-8 40 24;0 40 24;6 40 24;0 40 24"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${K}s" begin="${ne}s" repeatCount="indefinite" />
      </path>`,de=`
      <path d="M40,52 Q34,58 32,52 Q36,50 40,50 Z"
            style="fill: ${x}; stroke: rgba(0,0,0,0.2); stroke-width: 0.5; stroke-linejoin: round; opacity: 0.9;">
        <animateTransform attributeName="transform" type="rotate"
                          values="0 40 52;6 40 52;0 40 52;-6 40 52;0 40 52"
                          keyTimes="0;0.25;0.5;0.75;1"
                          calcMode="spline"
                          keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                          dur="${K}s" begin="${(parseFloat(ne)+.3).toFixed(2)}s" repeatCount="indefinite" />
      </path>`,ve=oa[l];let fe="";const be=(2.4+a()*.8).toFixed(2),Be=(a()*.6).toFixed(2);if(ve==="bow")fe=`
        <g style="transform-origin: 46px 12px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-6 46 12;4 46 12;-6 46 12"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${be}s" begin="${Be}s" repeatCount="indefinite" />
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
        </g>`;else if(ve==="hat")fe=`
        <g style="transform-origin: 48px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-3 48 14;3 48 14;-3 48 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${be}s" begin="${Be}s" repeatCount="indefinite" />
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
        </g>`;else if(ve==="crown"){const j=(1.6+a()*.6).toFixed(2);fe=`
        <g style="transform-origin: 46px 14px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-2 46 14;2 46 14;-2 46 14"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${be}s" begin="${Be}s" repeatCount="indefinite" />
          <!-- 皇冠底座 -->
          <path d="M38,16 L40,8 L44,12 L46,6 L48,12 L52,8 L54,16 Z"
                style="fill: #ffd700; stroke: rgba(0,0,0,0.45); stroke-width: 0.5; stroke-linejoin: round;" />
          <!-- 皇冠底部装饰条 -->
          <rect x="38" y="14" width="16" height="2.4" fill="#ffb300" stroke="rgba(0,0,0,0.4)" stroke-width="0.3" />
          <!-- 中央红宝石 -->
          <circle cx="46" cy="15.2" r="0.9" fill="#e74c3c" stroke="rgba(0,0,0,0.4)" stroke-width="0.25">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="${j}s" repeatCount="indefinite" />
          </circle>
          <!-- 左右小宝石 -->
          <circle cx="41" cy="15.4" r="0.6" fill="#3498db" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <circle cx="51" cy="15.4" r="0.6" fill="#2ecc71" stroke="rgba(0,0,0,0.4)" stroke-width="0.2" />
          <!-- 高光 -->
          <circle cx="45.3" cy="10.5" r="0.5" fill="rgba(255,255,255,0.85)" />
        </g>`}else ve==="earring"&&(fe=`
        <g style="transform-origin: 80px 46px;">
          <animateTransform attributeName="transform" type="rotate"
                            values="-8 80 46;8 80 46;-8 80 46"
                            keyTimes="0;0.5;1"
                            calcMode="spline"
                            keySplines="0.42 0 0.58 1; 0.42 0 0.58 1"
                            dur="${be}s" begin="${Be}s" repeatCount="indefinite" />
          <!-- 耳环钩 -->
          <circle cx="80" cy="46" r="0.8" fill="none" stroke="rgba(80,80,80,0.85)" stroke-width="0.5" />
          <!-- 珍珠 -->
          <circle cx="80" cy="49.5" r="1.6" fill="#fff8dc" stroke="rgba(0,0,0,0.35)" stroke-width="0.35" />
          <!-- 高光 -->
          <circle cx="79.5" cy="49" r="0.55" fill="rgba(255,255,255,0.95)" />
        </g>`);this.el.innerHTML=`
      <svg xmlns="${oe}" viewBox="0 0 96 72"
           style="display: block; width: 100%; height: 100%; overflow: visible;">
        <g class="fish-body" transform="rotate(${d} 48 36) scale(${c})">

          <!-- 身后小水泡 trail (作为最底层,在身体后面) -->
          ${L}

          ${h?`<!-- 思考泡泡 (${E} 颗,大小也随机) -->
          ${$}`:""}

          <!-- 尾巴 (按 note.id 切换形状) -->
          ${O}

          <!-- 上侧鳍 (有摇摆动画) -->
          ${V}

          <!-- 下侧鳍 (有摇摆动画) -->
          ${de}

          <!-- 背鳍 (圆角三角帽) -->
          <path d="M36 18 Q44 4 52 18 Z"
                style="fill: ${T}; stroke: rgba(0,0,0,0.18); stroke-width: 0.5; stroke-linejoin: round;" />

          <!-- 身体 (微调过的色) -->
          <ellipse cx="50" cy="38" rx="32" ry="22"
                   style="fill: ${b}; stroke: rgba(0,0,0,0.22); stroke-width: 0.9;" />

          <!-- 肚白高光 (大肚皮) -->
          <ellipse cx="50" cy="50" rx="22" ry="9" fill="rgba(255,255,255,0.42)" />

          <!-- 闪光鳞片 (波浪装饰) -->
          <path d="M40 32 Q44 28 48 32 M52 28 Q56 24 60 28 M62 28 Q66 24 70 28"
                stroke="rgba(255,255,255,0.55)" stroke-width="0.7" fill="none" stroke-linecap="round" />

          <!-- 鳃线 -->
          <path d="M28 32 Q26 40 28 48" fill="none"
                stroke="rgba(0,0,0,0.28)" stroke-width="0.8" stroke-linecap="round" />

          <!-- 雀斑/小点 (基于 note.id 稳定位置) -->
          ${U}

          <!-- 腮红 (粉嫩小圆点,透明度随机) -->
          <ellipse cx="68" cy="46" rx="3" ry="1.6" fill="rgba(255,140,170,${g})" />

          <!-- 嘴巴 (友好微笑) -->
          <path d="M76 44 Q80 47 76 49" fill="none"
                stroke="rgba(0,0,0,0.65)" stroke-width="1" stroke-linecap="round" />

          <!-- 眼睛 (按 note.id 切换表情) -->
          ${A}

          <!-- 配饰 (按 note.id 切换: 蝴蝶结/帽子/皇冠/耳环) -->
          ${fe}

          ${n?`
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
                  style="pointer-events: none;">${r}</text>
          `:""}
        </g>
      </svg>
    `}}const da=280,ua=50,Fn=68,wi=52,ha=72;function vs(s){const t=Math.max(48,s.height-8)/(wi*2+24),i=Math.max(.62,s.width/520),r=Math.min(1.25,Math.max(.62,Math.min(t,i)));return{slotW:Math.round(Fn*r),slotH:Math.round(wi*r),padX:Math.round(ua*Math.min(1,Math.max(.6,r))),minDist:Math.max(44,Math.round(ha*r)),overY:Math.round(18*r)}}const kr="forest-piano-fishpool-keyframes";function fa(){if(document.getElementById(kr))return;const s=document.createElement("style");s.id=kr,s.textContent=`
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
  `,document.head.appendChild(s)}class $s{constructor(e,t,{fishDisplay:i={}}={}){fa(),this.stage=e,this.notes=t,this.fishDisplay=i,this.fishes=[],this.onDrop=null,this.onDragStart=null,this.onDragMove=null,this.onTap=null,this._dragEnabled=!0,this._lastHoveredSlot=null,this.TAP_THRESHOLD=12,this._renderPool(),requestAnimationFrame(()=>this._placeFishes()),this._onResize=()=>{clearTimeout(this._resizeTimer),this._resizeTimer=setTimeout(()=>this._handleViewportChange(),150)},window.addEventListener("resize",this._onResize),window.addEventListener("orientationchange",this._onResize)}_clampFishesToPool(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2)return;const t=vs(e),i=t.padX,r=e.width-t.padX-t.slotW,n=e.height-t.slotH,l=Math.max(i,r),o=Math.max(0,n);this.fishes.forEach(a=>{if(a.locked||a.el.classList.contains("dragging"))return;const d=Math.min(Math.max(a.originalLeft,i),l),c=Math.min(Math.max(a.originalTop,0),o);d===a.originalLeft&&c===a.originalTop||(a.originalLeft=d,a.originalTop=c,a.el.style.transition="left 200ms ease-out, top 200ms ease-out",a.el.style.left=`${d}px`,a.el.style.top=`${c}px`,setTimeout(()=>{a.el.style.transition=""},220))})}destroy(){this._onResize&&(window.removeEventListener("resize",this._onResize),window.removeEventListener("orientationchange",this._onResize),this._onResize=null),clearTimeout(this._resizeTimer)}_handleViewportChange(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2)return;const t=this._lastPoolH||0;this._lastPoolW,this._lastPoolH=e.height,this._lastPoolW=e.width,t>0&&Math.abs(e.height-t)/Math.max(t,1)>.3&&this.fishes.some(r=>!r.locked)?this._redistributeUnlocked():this._clampFishesToPool()}_redistributeUnlocked(){const e=this.fishes.filter(c=>!c.locked&&!c.el.classList.contains("dragging"));if(!e.length)return;const t=this.pool.getBoundingClientRect(),i=vs(t);this._m=i;const r=[];this.fishes.forEach(c=>{if(c.locked||c.el.classList.contains("dragging")){const _=c.el.getBoundingClientRect(),h=this.pool.getBoundingClientRect();r.push({x:_.left+_.width/2-h.left,y:_.top+_.height/2-h.top})}});const n=Math.max(i.padX,i.slotW/2),l=t.width-i.padX-i.slotW/2,o=i.slotH/2-i.overY,a=t.height-i.slotH/2,d=i.minDist*i.minDist;e.forEach(c=>{let _=null,h=-1/0;for(let u=0;u<70;u++){const y=n+Math.random()*Math.max(1,l-n),p=o+Math.random()*Math.max(1,a-o);let f=1/0;for(const v of r){const b=v.x-y,x=v.y-p;f=Math.min(f,b*b+x*x)}if(f>=d){_={cx:y,cy:p};break}f>h&&(h=f,_={cx:y,cy:p})}if(!_)return;const m=Math.round(_.cx-i.slotW/2),g=Math.round(_.cy-i.slotH/2);c.originalLeft=m,c.originalTop=g,c.el.style.width=`${i.slotW}px`,c.el.style.height=`${i.slotH}px`,c.el.style.transition="left 260ms ease-out, top 260ms ease-out",c.el.style.left=`${m}px`,c.el.style.top=`${g}px`,setTimeout(()=>{c.el.style.transition=""},300),r.push({x:_.cx,y:_.cy})})}_renderPool(){const e=document.createElement("div");e.className="fish-pool",this.fishDisplay.showLabel===!1&&e.classList.add("fish-pool--no-label"),e.setAttribute("aria-label","小鱼池"),this.stage.appendChild(e),this.pool=e,this.root=e}_placeFishes(){const e=this.pool.getBoundingClientRect();if(e.width<2||e.height<2){requestAnimationFrame(()=>this._placeFishes());return}const t=[...this.notes];for(let m=t.length-1;m>0;m--){const g=Math.floor(Math.random()*(m+1));[t[m],t[g]]=[t[g],t[m]]}const i=vs(e);this._m=i;const r=i.padX,n=e.width-i.padX-i.slotW,l=-i.overY,o=e.height-i.slotH,a=i.minDist,d=a*a,c=90,_=[];function h(m,g){for(let u=0;u<_.length;u++){const y=_[u],p=y.x-m,f=y.y-g;if(p*p+f*f<d)return!1}return!0}t.forEach(m=>{const g=document.createElement("div");g.className="fish is-floating",g.dataset.id=m.id,g.dataset.color=m.color,g.dataset.solfege=m.solfege,g.dataset.pitch=m.pitch,g.style.webkitUserSelect="none",g.style.userSelect="none",g.style.webkitTapHighlightColor="transparent";const u=r+i.slotW/2,y=n-i.slotW/2,p=l+i.slotH/2,f=o-i.slotH/2,v=Math.max(1,y-u),b=Math.max(1,f-p);let x=0,T=0,w=!1;for(let q=0;q<c;q++){const z=u+Math.random()*v,ee=p+Math.random()*b;if(h(z,ee)){x=z,T=ee,w=!0;break}}if(!w){let q=-1/0,z=u,ee=p;for(let ge=0;ge<60;ge++){const C=u+Math.random()*v,k=p+Math.random()*b;let P=1/0;for(let F=0;F<_.length;F++){const N=_[F],A=N.x-C,E=N.y-k,$=Math.sqrt(A*A+E*E);$<P&&(P=$)}P>q&&(q=P,z=C,ee=k)}x=z,T=ee}const L=x-i.slotW/2,S=T-i.slotH/2;g.style.left=`${L}px`,g.style.top=`${S}px`,g.style.width=`${i.slotW}px`,g.style.height=`${i.slotH}px`,_.push({x,y:T});const M=(Math.random()-.5)*6,O=3.5+Math.random()*1,R=-Math.random()*O;g.style.setProperty("--fish-float-dur",`${O.toFixed(2)}s`),g.style.setProperty("--fish-float-delay",`${R.toFixed(2)}s`);const D=document.createElement("div");D.className="fish-inner",D.style.setProperty("--fish-rot",`${M.toFixed(2)}deg`);let B=null;try{const q=new ca(m,this.fishDisplay);q&&q.nodeType===1?B=q:B=q?.root||q?.element||q?.svg||null}catch(q){console.warn("[FishPool] Fish creation failed (Agent A 还没就绪?):",q)}B&&B.nodeType===1?D.appendChild(B):D.innerHTML=`
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
        `,g.appendChild(D),this.pool.appendChild(g);const W={el:g,inner:D,note:m,originalLeft:L,originalTop:S,rot:M,locked:!1};this.fishes.push(W),this._bindDrag(W)})}_bindDrag(e){const t=e.el;let i=null,r=0,n=0,l=0,o=0,a=0;const d=h=>{if(e.locked)return;if(this._dragEnabled===!1){const u=Date.now();if(u-(this._lastTapTime||0)<250&&this._lastTapEl===t)return;if(this._lastTapTime=u,this._lastTapEl=t,typeof this.onTap=="function")try{this.onTap(t)}catch(y){console.warn(y)}return}const m=Date.now();if(m-(this._lastTapTime||0)<250&&this._lastTapEl===t||(this._lastTapTime=m,this._lastTapEl=t,i!==null)||h.pointerType==="mouse"&&h.button!==0)return;try{t.setPointerCapture(h.pointerId)}catch{}i=h.pointerId;const g=t.getBoundingClientRect();if(r=h.clientX-g.left,n=h.clientY-g.top,l=h.clientX,o=h.clientY,a=0,t.classList.add("dragging"),t.classList.add("pressing"),e.el.style.animationPlayState="paused",t.style.position="fixed",t.style.left=`${h.clientX-r}px`,t.style.top=`${h.clientY-n}px`,t.style.right="auto",t.style.bottom="auto",t.style.margin="0",t.style.transform="",typeof this.onDragStart=="function")try{this.onDragStart(t)}catch(u){console.warn(u)}},c=h=>{if(i!==h.pointerId)return;h.preventDefault(),t.style.left=`${h.clientX-r}px`,t.style.top=`${h.clientY-n}px`;const m=h.clientX-l,g=h.clientY-o,u=Math.hypot(m,g);if(a=Math.max(a,u),a>this.TAP_THRESHOLD&&t.classList.contains("pressing")&&t.classList.remove("pressing"),typeof this.onDragMove=="function"){const y=document.querySelectorAll(".staff-slot");let p=null,f=1/0;if(y.forEach(v=>{const b=v.getBoundingClientRect(),x=b.left+b.width/2,T=b.top+b.height/2,w=Math.hypot(x-h.clientX,T-h.clientY);w<f&&(f=w,p=v)}),y.length===0||p!==this._lastHoveredSlot){this._lastHoveredSlot=p;try{this.onDragMove(t,p,{x:h.clientX,y:h.clientY})}catch(v){console.warn(v)}}}},_=h=>{if(i!==h.pointerId)return;i=null;try{t.releasePointerCapture(h.pointerId)}catch{}if(a<this.TAP_THRESHOLD){if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null,null)}catch(x){console.warn(x)}}if(typeof this.onTap=="function")try{this.onTap(t)}catch(x){console.warn(x)}return}const m=document.querySelectorAll(".staff-slot");let g=null,u=1/0;const y=t.getBoundingClientRect(),p=y.left+y.width/2,f=y.top+y.height/2;m.forEach(x=>{const T=x.getBoundingClientRect(),w=T.left+T.width/2,L=T.top+T.height/2,S=Math.hypot(w-p,L-f);S<u&&(u=S,g=x)});const v=!!g&&u<da&&g.dataset.id===e.note.id,b={x:p,y:f};if(t.classList.remove("dragging"),t.classList.remove("pressing"),t.style.position="",t.style.left=`${e.originalLeft}px`,t.style.top=`${e.originalTop}px`,t.style.right="",t.style.bottom="",t.style.margin="",t.style.transform="",e.el.style.animationPlayState="",typeof this.onDragMove=="function"){this._lastHoveredSlot=null;try{this.onDragMove(t,null)}catch(x){console.warn(x)}}if(v&&this._spawnSourceShadow(e),typeof this.onDrop=="function")try{this.onDrop(t,g,v,b)}catch(x){console.warn(x)}};t.addEventListener("pointerdown",d),t.addEventListener("pointermove",c),t.addEventListener("pointerup",_),t.addEventListener("pointercancel",_),t.addEventListener("click",h=>{if(e.locked)return;const m=Date.now();if(!(m-(this._lastTapTime||0)<250&&this._lastTapEl===t)&&(this._lastTapTime=m,this._lastTapEl=t,typeof this.onTap=="function"))try{this.onTap(t)}catch(g){console.warn(g)}})}lockFish(e){const t=this.fishes.find(i=>i.note.id===e);t&&(t.locked=!0,t.el.classList.add("fish--locked"))}_spawnSourceShadow(e){if(!this.pool)return;const t=document.createElement("div");t.className="fish-source-shadow";const i=e.note&&e.note.color?e.note.color:"rgba(20,40,70,0.45)";t.style.setProperty("--shadow-color",i);const r=e.el.offsetWidth||(this._m?this._m.slotW:Fn),n=e.el.offsetHeight||(this._m?this._m.slotH:wi);t.style.left=`${e.originalLeft+r/2}px`,t.style.top=`${e.originalTop+n/2}px`,this.pool.appendChild(t),setTimeout(()=>{try{t.remove()}catch{}},1400)}setDragEnabled(e){this._dragEnabled=e!==!1}unlockAll(){this.fishes.forEach(e=>{e.locked=!1,e.el.classList.remove("fish--locked"),e.el.classList.remove("dragging","shake"),e.el.style.position="",e.el.style.left=`${e.originalLeft}px`,e.el.style.top=`${e.originalTop}px`,e.el.style.right="",e.el.style.bottom="",e.el.style.margin="",e.el.style.transform="",e.el.style.animationPlayState=""})}intro(){const e=()=>{if(this.fishes.length<this.notes.length){requestAnimationFrame(e);return}this.fishes.forEach((t,i)=>{G.fromTo(t.el,{y:140,opacity:0,scale:.4},{y:0,opacity:1,scale:1,duration:.6,delay:i*.08,ease:"back.out(1.7)"})})};e()}reset(){if(!this.pool)return;const e=this.pool.getBoundingClientRect();if(e.width>=2&&e.height>=2){const t=vs(e);this._m=t;const i=t.padX,r=e.width-t.padX-t.slotW,n=-t.overY,l=e.height-t.slotH,o=t.minDist,a=o*o,d=90,c=[],_=(h,m)=>{for(let g=0;g<c.length;g++){const u=c[g],y=u.x-h,p=u.y-m;if(y*y+p*p<a)return!1}return!0};this.fishes.forEach(h=>{const m=i+t.slotW/2,g=r-t.slotW/2,u=n+t.slotH/2,y=l-t.slotH/2,p=Math.max(1,g-m),f=Math.max(1,y-u);let v=0,b=0,x=!1;for(let T=0;T<d;T++){const w=m+Math.random()*p,L=u+Math.random()*f;if(_(w,L)){v=w,b=L,x=!0;break}}if(!x){let T=-1/0,w=m,L=u;for(let S=0;S<60;S++){const M=m+Math.random()*p,O=u+Math.random()*f;let R=1/0;for(let D=0;D<c.length;D++){const B=c[D],W=B.x-M,q=B.y-O,z=Math.sqrt(W*W+q*q);z<R&&(R=z)}R>T&&(T=R,w=M,L=O)}v=w,b=L}h.originalLeft=v-t.slotW/2,h.originalTop=b-t.slotH/2,h.el.style.width=`${t.slotW}px`,h.el.style.height=`${t.slotH}px`,c.push({x:v,y:b})})}this.unlockAll(),this.fishes.forEach(t=>{G.fromTo(t.el,{y:60,opacity:.6,scale:.85},{y:0,opacity:1,scale:1,duration:.5,ease:"back.out(1.4)",delay:Math.random()*.15})})}getFishes(){return this.fishes.map(e=>e.el)}}const Vt=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"}];new Set(Vt.map(s=>s.id));const Tr=125;function pa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=3);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new na(s.stage),s.fishPool=new $s(s.stage,Vt,{fishDisplay:{showLabel:!1}}),s.fishPool.setDragEnabled(!0),s.fishPool.intro();const r={activeFishId:null,auditioned:new Set,placed:new Set,resolving:!1};s._level3Total=Vt.length,s._level3Count=0,s.say("👂 先点一条小鱼，听听它唱的声音。听完再把它放到高低合适的山上~");const n=o=>Vt.find(a=>a.id===o),l=o=>{r.activeFishId=null,s.scene.setListening(!1),s.scene.setHoverTarget(null),s.say(o||"再选一条小鱼，先听一听，再帮它找高低合适的山~")};return s.fishPool.onTap=o=>{const a=o?.dataset?.id,d=n(a);if(!(!d||r.placed.has(a)||r.resolving)){r.activeFishId=a,r.auditioned.add(a),s.scene.setListening(!0);try{s.audio.playNote(d.pitch)}catch{}G.fromTo(o,{scale:1},{scale:1.16,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"}),s.say("听到了吗？可以再点一次重听。想想它应该住在低一点，还是高一点的山~")}},s.fishPool.onDragStart=o=>{const a=o?.dataset?.id;if(!(!a||r.placed.has(a))){try{s.audio.hover(a)}catch{}if(!r.auditioned.has(a)){s.scene.setListening(!1),s.say("先松开，点这条小鱼听一听，再帮它找山吧~");return}s.scene.setListening(!0)}},s.fishPool.onDragMove=(o,a,d)=>{const c=o?.dataset?.id;if(!c||!r.auditioned.has(c)||!d){s.scene.setHoverTarget(null);return}const _=s.scene.getClosestTarget(d);s.scene.setHoverTarget(_?.distance<Tr?_.target:null)},s.fishPool.onDrop=(o,a,d,c)=>{const _=o?.dataset?.id,h=n(_);if(!h||r.placed.has(_)||r.resolving)return;if(s.scene.setHoverTarget(null),!r.auditioned.has(_)){l("👂 先点这条小鱼听一听，再来找高低合适的山~"),G.to(o,{x:0,y:0,duration:.45,ease:"elastic.out(1, 0.55)"});return}const m=s.scene.getClosestTarget(c),g=m?.target,u=g?.dataset?.note;if(!!(g&&m.distance<Tr)&&u===_){r.resolving=!0,r.placed.add(_),s._level3Count=r.placed.size,s.scene.markPlaced(_),s.scene.setProgress(r.placed.size);const p=g.getBoundingClientRect(),f=s.fishPool.root.getBoundingClientRect(),v=p.left-f.left+p.width/2,b=p.top-f.top+p.height*.58,x=parseFloat(o.style.left)||0,T=parseFloat(o.style.top)||0,w=v-x-o.offsetWidth/2,L=b-T-o.offsetHeight/2;try{s.audio.correct()}catch{}G.to(o,{x:w,y:L,scale:.78,duration:.52,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(_)}catch{}try{s.audio.playNote(h.pitch)}catch{}try{s.scene.bloomAt(p.left+p.width/2,p.top+p.height/2,h.color)}catch{}try{s._floatScore(p.left+p.width/2,p.top,`听对啦！${h.solfege}`)}catch{}if(r.resolving=!1,r.placed.size===Vt.length){s.say("🌟 五个声音都找到山啦！一起唱：Do Re Mi Sol La~"),setTimeout(()=>{const S=s._calcStars();try{s.progress.markLevelComplete(3,S)}catch{}try{s.audio.playScale(["C4","D4","E4","G4","A4"])}catch{}try{s.showWinOverlay(S,3)}catch{}},850);return}l(`✅ 听对啦，这是 ${h.solfege}！再选一条小鱼，先听后放~`)}});return}s.wrongCount++;try{s.audio.wrong()}catch{}o.classList.add("shake"),setTimeout(()=>o.classList.remove("shake"),400);try{s.audio.playNote(h.pitch)}catch{}G.to(o,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"}),r.activeFishId=_,s.scene.setListening(!0),s.say("再听一次，慢慢比一比它的高低。它应该住在哪一座山呢？")},()=>{try{s.scene?.teardown()}catch{}s.scene=null;const o=document.getElementById("hud-level2");o&&(o.style.display="");const a=document.querySelector(".hud__dots");a&&(a.style.display=""),typeof window<"u"&&(window.__forestPiano.currentLevelId=null)}}const _a=Object.freeze(Object.defineProperty({__proto__:null,default:pa},Symbol.toStringTag,{value:"Module"}));class va{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level4-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e;const t=document.createElement("div");t.className="level4-fx-layer",this.stage.appendChild(t),this.fxLayer=t}getBeatCue(){return this.stage?this.stage.querySelector(".level4-beat-cue"):null}getDrum(){return this.stage?this.stage.querySelector(".level4-drum-hit-area"):null}getDrumVisual(){return this.stage?this.stage.querySelector(".level4-drum-wrap"):null}getDrumAnchor(){return this.stage?this.stage.querySelector(".level4-drum-anchor"):null}getCueLarge(){return this.stage?this.stage.querySelector(".level4-drum-cue-large"):null}getFxLayer(){return this.fxLayer||null}getDrumScreenCenter(){const e=this.getDrumVisual()||this.getDrum();if(!e)return{x:window.innerWidth/2,y:window.innerHeight/2};const t=e.getBoundingClientRect();return{x:t.left+t.width/2,y:t.top+t.height/2}}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null,this.fxLayer&&this.fxLayer.parentNode&&this.fxLayer.parentNode.removeChild(this.fxLayer),this.fxLayer=null}}const ya=[["T","T","tt","T"],["tt","T","T","tt","T","T"],["T","tt","T","tt","tt","T","T","T","tt","T"]],Xs=3800,Sr=260,ma=620;function ga(s,e){return s<=1?3:s<=3?2:s<=5?1:0}function ba(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=4);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.wrongCount=0,s.scene=new va(s.stage),s.say("先看一遍：只有泡泡碰到鼓的时候，才需要敲鼓~");const i=!s.progress?.hasCompletedLevel?.(4),r=[];ya.forEach(A=>{A.forEach(E=>{E==="tt"?(r.push({double:!0,isSecond:!1}),r.push({double:!0,isSecond:!0})):r.push({double:!1})})});const n=r.length;s._level4Total=n,s._level4Processed=0,s._level4Pending=[],s._level4Done=!1,s._level4Correct=0,s._level4Timeouts=[],s._level4CueTimers=[],s._level4Teaching=i,s._level4TutorialStep=i?0:2,s._level4TutorialHits=0,s.stage.insertAdjacentHTML("beforeend",`
    <div class="level4-rhythm-guide" role="status" aria-live="polite">
      <div class="level4-rhythm-guide__label">${i?"第 1 步：先看老师示范":"节奏挑战"}</div>
      <div class="level4-rhythm-guide__state">${i?"👀 泡泡碰到鼓，才敲！":"👀 看泡泡，等它碰到鼓"}</div>
      <div class="level4-rhythm-guide__count">${i?"现在不计分，先观察":`节拍 0 / ${n}`}</div>
    </div>
    <div class="level4-bubbles-container"></div>
  `);const l=s.stage.querySelector(".level4-bubbles-container"),o=s.stage.querySelector(".level4-rhythm-guide"),a=o?.querySelector(".level4-rhythm-guide__state"),d=o?.querySelector(".level4-rhythm-guide__count"),c=(A,E)=>{!o||!a||(o.dataset.state=A,a.textContent=E)},_=()=>{d&&(s._level4TutorialStep===0?d.textContent="现在不计分，先观察":s._level4TutorialStep===1?d.textContent=`跟着试两拍 ${s._level4TutorialHits} / 2`:d.textContent=`节拍 ${s._level4Processed} / ${n}`)},m=(l||s.stage).getBoundingClientRect(),g=m.width;m.height;const u=s.scene.getDrumScreenCenter(),y=u.x-m.left-20,p=u.y-m.top-20,f=-50,v=g+100,b=(y-f)/(v-f),x=s.scene.getFxLayer(),T=s.scene.getDrumAnchor(),w=s.scene.getCueLarge();function L(){const A=s.scene.getDrumScreenCenter();if(!x||typeof A.x!="number")return A;const E=x.getBoundingClientRect();return{x:A.x-E.left,y:A.y-E.top}}function S(){if(!x)return;const A=L();for(let E=0;E<3;E++){const $=document.createElement("div");$.className="level4-drum-ripple level4-drum-ripple--"+(E+1),$.style.left=A.x+"px",$.style.top=A.y+"px",x.appendChild($),setTimeout(()=>$.remove(),900)}}function M(){if(!x)return;const A=L(),E=["#ffd166","#ef476f","#06d6a0","#118ab2","#ff9f1c"],$=12;for(let H=0;H<$;H++){const I=document.createElement("div");I.className="level4-drum-particle";const Q=E[Math.floor(Math.random()*E.length)];I.style.background=Q,I.style.boxShadow="0 0 6px "+Q;const U=Math.PI*2*H/$+Math.random()*.4,K=70+Math.random()*50,ne=Math.cos(U)*K,V=Math.sin(U)*K-30;I.style.setProperty("--dx",ne.toFixed(1)+"px"),I.style.setProperty("--dy",V.toFixed(1)+"px"),I.style.left=A.x+"px",I.style.top=A.y+"px";const de=6+Math.random()*6;I.style.width=de+"px",I.style.height=de+"px",x.appendChild(I),setTimeout(()=>I.remove(),700)}}function O(){if(!x)return;const A=L(),E=document.createElement("div");E.className="level4-floating-score level4-floating-score--plus",E.textContent="+1",E.style.left=A.x+"px",E.style.top=A.y-50+"px",x.appendChild(E),setTimeout(()=>E.remove(),850)}function R(){if(!x)return;const A=L(),E=document.createElement("div");E.className="level4-floating-score level4-floating-score--minus",E.textContent="-1",E.style.left=A.x+"px",E.style.top=A.y-50+"px",x.appendChild(E),setTimeout(()=>E.remove(),850)}function D(){if(s._level4Done)return;T&&T.classList.add("level4-cue-now"),w&&w.classList.add("level4-cue-active");const A=s._level4TutorialStep===0?"👀 看！泡泡碰到鼓了":"🥁 现在敲鼓！";c("hit",A);try{s.audio.hover()}catch{}const E=setTimeout(()=>{T&&T.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active")},ma);s._level4CueTimers.push(E)}let B=0,W=null;const q=()=>{s._level4Done||(s._level4Done=!0,s._level4Timeouts.push(setTimeout(()=>{const A=ga(s.wrongCount);try{s.progress.markLevelComplete(4,A)}catch{}try{s.audio.playScale(["C4","D4","E4","G4","A4"])}catch{}try{s.showWinOverlay(A,4)}catch{}},700)))},z=(A=360)=>{if(s._level4Done)return;if(B>=n){q();return}const E=r[B],$=B++;s._level4Timeouts.push(setTimeout(()=>ge(E,$),A))},ee=A=>{if(!(s._level4Done||!W||W.idx!==A)){if(s._level4Pending=[],W=null,s._level4Processed++,_(),T&&T.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active"),s._level4TutorialStep===0){try{s.audio.playNote("C4")}catch{}S(),M(),c("teach","✨ 看！泡泡碰到鼓，鼓就“咚”"),s.say("看见了吗？泡泡碰到鼓时，鼓亮起来、发出咚声。下一次轮到你试试！"),s._level4TutorialStep=1,o&&(o.querySelector(".level4-rhythm-guide__label").textContent="第 2 步：等鼓亮，再敲两次"),_()}else{s.wrongCount++;try{s.audio.wrong()}catch{}R(),c("miss","❌ 漏了一拍，下一颗再试"),s._level4TutorialStep===1&&s.say("没关系，等鼓亮起来再敲一次~")}z(s._level4TutorialStep===0?800:420)}};function ge(A,E){if(!l||s._level4Done)return;const $=document.createElement("div");$.className="level4-bubble",A.double&&A.isSecond&&$.classList.add("level4-bubble-half"),A.double&&$.classList.add("level4-bubble--double"),$.textContent=A.double?A.isSecond?"2":"1":"●",l.appendChild($);try{$.animate([{transform:`translate(${f}px, ${p}px)`},{transform:`translate(${y}px, ${p}px)`,offset:b},{transform:`translate(${v}px, ${p}px)`}],{duration:Xs,fill:"forwards",easing:"linear"})}catch{$.style.left=`${f}px`,$.style.top=`${p}px`}const H=Xs*b;s._level4Timeouts.push(setTimeout(()=>{s._level4Done||(D(),W={beat:A,idx:E,when:Date.now(),bubble:$},s._level4Pending=[W],s._level4Timeouts.push(setTimeout(()=>ee(E),Sr)))},H)),s._level4Timeouts.push(setTimeout(()=>$.remove(),Xs+80))}z(800);const C=s.scene.getDrumAnchor(),k=s.scene.getDrumVisual();let P=null,F=null,N=null;if(C){C.style.cursor="pointer",C.style.touchAction="manipulation",P=document.createElement("button"),P.type="button",P.className="level4-drum-hit-button",P.setAttribute("aria-label","敲鼓"),P.textContent="",s.stage.appendChild(P),F=()=>{if(!P||!k||!s.stage)return;const E=k.getBoundingClientRect(),$=s.stage.getBoundingClientRect(),H=24;P.style.left=`${E.left-$.left-H}px`,P.style.top=`${E.top-$.top-H}px`,P.style.width=`${E.width+H*2}px`,P.style.height=`${E.height+H*2}px`},F(),N=()=>requestAnimationFrame(F),window.addEventListener("resize",N),window.addEventListener("orientationchange",N);const A=E=>{if(E.preventDefault(),E.stopPropagation(),s._level4Done)return;k&&(k.classList.remove("level4-drum-hit"),k.offsetWidth,k.classList.add("level4-drum-hit"),s._level4Timeouts.push(setTimeout(()=>{k.classList.remove("level4-drum-hit")},280))),T&&(T.classList.remove("level4-drum-character-hit"),T.offsetWidth,T.classList.add("level4-drum-character-hit"),setTimeout(()=>{T&&T.classList.remove("level4-drum-character-hit")},280));const $=Date.now();if(s._level4Pending.filter(I=>Math.abs($-I.when)<Sr).length>0){s._level4TutorialStep===1&&(s._level4TutorialHits++,s._level4TutorialHits>=2&&(s._level4TutorialStep=2,o&&(o.classList.add("level4-rhythm-guide--compact"),o.querySelector(".level4-rhythm-guide__label").textContent="节奏挑战"),c("good","🌟 学会啦，听鼓亮再敲！"),s.say("学会啦！接下来跟着泡泡和亮鼓自己试试~")),_()),s._level4Correct++,s._level4Pending=[],W=null,s._level4Processed++,_();try{s.audio.playNote("C4")}catch{}S(),M(),O(),T&&T.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active");const I=s._level4TutorialStep===2;c("good",I?"✅":"✅ 对上啦！继续看下一颗");const Q=["咚!","咚!咚!","完美!","棒呀!","节拍对!"];(!I||s._level4TutorialHits===2)&&s.say(Q[Math.min(s._level4Correct-1,Q.length-1)]),s._level4Timeouts.push(setTimeout(()=>{c("wait",I?"🎵":"👀 看下一颗泡泡，先等一等")},560)),z(I?300:540)}else{if(s._level4TutorialStep===0){c("teach","👀 先等泡泡碰到鼓"),s.say("现在先看一看，等鼓亮起来再敲~");return}s.wrongCount++;try{s.audio.wrong()}catch{}k&&(k.classList.add("level4-drum-shake"),setTimeout(()=>k.classList.remove("level4-drum-shake"),360)),R(),T&&T.classList.remove("level4-cue-now"),w&&w.classList.remove("level4-cue-active"),c("bad","✋ 现在先别敲，等泡泡到鼓"),s.say("咦, 现在不是节拍! 看泡泡到鼓位再敲"),s._level4Timeouts.push(setTimeout(()=>c("wait","👀 看泡泡，等它碰到鼓"),720))}};P.addEventListener("pointerdown",A),s._level4DrumHandler=A}return()=>{if(Array.isArray(s._level4Timeouts)&&(s._level4Timeouts.forEach(I=>clearTimeout(I)),s._level4Timeouts=[]),Array.isArray(s._level4CueTimers)&&(s._level4CueTimers.forEach(I=>clearTimeout(I)),s._level4CueTimers=[]),Array.isArray(s._level4Pending)&&(s._level4Pending=[]),s._level4Done=!0,s._level4DrumHandler&&P&&P.removeEventListener("pointerdown",s._level4DrumHandler),N&&(window.removeEventListener("resize",N),window.removeEventListener("orientationchange",N)),P&&P.remove(),s._level4DrumHandler=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}(s.stage?s.stage.querySelectorAll(".level4-bubbles-container"):[]).forEach(I=>I.remove());const E=document.getElementById("hud-level2");E&&(E.style.display="none");const $=document.querySelector(".hud__dots");$&&($.style.display="");const H=document.getElementById("btn-replay");H&&(H.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const xa=Object.freeze(Object.defineProperty({__proto__:null,default:ba},Symbol.toStringTag,{value:"Module"}));class wa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level5-background";let t="";for(let i=0;i<40;i++){const r=Math.random()*100,n=Math.random()*50,l=1+Math.random()*2,o=Math.random()*3;t+=`<circle class="level5-stars-tiny" cx="${r}%" cy="${n}%" r="${l}"
                          style="animation-delay: ${o}s" />`}e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const ka=["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"],Js={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},ze=80,Ta=80,Sa=60;function La(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=5);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.createElement("style");i.dataset.levelStyle="5",i.textContent=`
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
  `,document.head.appendChild(i),s.scene=new wa(s.stage),s.say("森林乐团要奏小星星! 看音符掉到哪个键, 就按哪个~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level5-staff-area"></div>');const r=s.stage.querySelector(".level5-staff-area");r.innerHTML=`
    <svg class="level5-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
      <line class="level5-staff-line" x1="40" y1="${ze+40}" x2="760" y2="${ze+40}" />
      <line class="level5-staff-line" x1="40" y1="${ze+60}" x2="760" y2="${ze+60}" />
      <line class="level5-staff-line" x1="40" y1="${ze+80}" x2="760" y2="${ze+80}" />
      <line class="level5-staff-line" x1="40" y1="${ze+100}" x2="760" y2="${ze+100}" />
      <line class="level5-staff-line" x1="40" y1="${ze+120}" x2="760" y2="${ze+120}" />
      <!-- 当前音符位置 -->
      <circle class="level5-current-note" cx="400" cy="0" r="14" fill="#ffd166" />
    </svg>
  `,s.stage.insertAdjacentHTML("beforeend",`
    <div class="level5-metronome" id="level5-metronome">
      <span class="level5-metronome-note">♩=</span>
      <span class="level5-metronome-bpm" id="level5-bpm">${Ta}</span>
      <span class="level5-metronome-mode" id="level5-mode"></span>
    </div>
  `),s.kb=new wt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level5Seq=[...ka],s._level5Total=s._level5Seq.length,s._level5Correct=0,s._level5Idx=0,s._level5Accepting=!0,s._level5Done=!1,s._level5EasyMode=!1,s._level5ConsecWrong=0;const n={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function l(){return r.querySelector(".level5-current-note")}function o(_,h){const m=document.getElementById("level5-bpm"),g=document.getElementById("level5-mode");m&&(m.textContent=String(_)),g&&(g.textContent=h);const u=document.getElementById("level5-metronome");u&&u.classList.toggle("level5-metronome--easy",!0)}function a(){const _=s._level5Idx||0,h=s._level5Total||14,g=4+Math.min(1,_/Math.max(1,h-1))*1.5;return s._level5EasyMode?g+1.5:g}function d(){if(!s._level5EasyMode&&s._level5ConsecWrong>=3){s._level5EasyMode=!0,o(Sa,"轻松模式");try{s.say("进入轻松模式~ 慢慢来不着急!")}catch{}}}function c(){if(s._level5Done||s._level5Idx>=s._level5Seq.length)return;const _=s._level5Seq[s._level5Idx],h=Js[_],m=n[h.id],g=l();if(!g)return;G.killTweensOf(g),G.set(g,{scale:1}),g.setAttribute("cy",m),g.dataset.pitch=_,g.classList.remove("dropping","incorrect"),s.say(`下一个: ${h.solfege} (${_})`),s._level5Accepting=!0;const u=a();G.fromTo(g,{attr:{cy:m},opacity:1},{attr:{cy:m+100},opacity:.9,duration:u,ease:"none",onComplete:()=>{if(!s._level5Done&&s._level5Accepting){s._level5Accepting=!1,s.wrongCount++,s._level5ConsecWrong++,d();try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),g.classList.add("incorrect"),setTimeout(()=>{g.classList.remove("incorrect"),s._level5Idx++,c()},600)}}})}return s.kb.onPress=_=>{if(!s._level5Accepting||s._level5Done)return;const h=s._level5Seq[s._level5Idx],m=_.dataset.pitch;if(m===h){s._level5Correct++,s._level5Accepting=!1,s._level5ConsecWrong=0;try{s.audio.correct()}catch{}try{s.audio.playNote(m)}catch{}const g=l();g&&(G.killTweensOf(g),G.to(g,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),s.say(["完美!","星星在向你眨眼!","小星星~"][Math.min(s._level5Correct-1,2)]),s._level5Idx++,s._level5Idx>=s._level5Seq.length?(s._level5Done=!0,setTimeout(()=>{const u=s._calcStars();try{s.progress.markLevelComplete(5,u)}catch{}try{s.audio.playScale(["C4","C4","G4","G4","A4","A4","G4"])}catch{}s.say("✨ 完美的《小星星》!"),s.showWinOverlay(u,5)},800)):setTimeout(c,500)}else{s.wrongCount++,s._level5ConsecWrong++,d();try{s.audio.wrong()}catch{}const g=Js[m];s.say(`这是 ${g?g.solfege:"?"}, 不是 ${Js[h].solfege}. 再听一下!`);const u=l();u&&u.classList.add("incorrect"),setTimeout(()=>{u&&u.classList.remove("incorrect")},300);try{s.audio.playNote(h)}catch{}}},setTimeout(c,1e3),()=>{s.scene&&typeof s.scene.teardown=="function"&&s.scene.teardown(),i&&i.parentNode&&i.remove();const _=r&&r.querySelector(".level5-current-note");_&&G.killTweensOf(_),s.stage.querySelectorAll(".level5-staff-area").forEach(u=>u.remove());const h=document.getElementById("level5-metronome");h&&h.remove();const m=document.getElementById("hud-level2");m&&(m.style.display="");const g=document.querySelector(".hud__dots");g&&(g.style.display="none"),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ca=Object.freeze(Object.defineProperty({__proto__:null,default:La},Symbol.toStringTag,{value:"Module"}));class Ma{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level6-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}setChordLabel(e){if(!this.background)return;const t=this.background.querySelector(".level6-chord-indicator__chord");t&&(t.textContent=e)}celebrateClap(){if(!this.background)return;const e=this.background.querySelector(".level6-teacher");e&&(e.classList.remove("level6-clap"),e.offsetWidth,e.classList.add("level6-clap"),setTimeout(()=>e.classList.remove("level6-clap"),1200))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const Ee=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],ei=new Set(["do","re","mi"]),Ea=new Set(["fa","sol","la","si"]),Wt=[{high:"fa",low:"do",label:"Fa 上 + Do 下"},{high:"sol",low:"re",label:"Sol 上 + Re 下"},{high:"la",low:"mi",label:"La 上 + Mi 下"},{high:"si",low:"do",label:"Si 上 + Do 下"},{high:"sol",low:"mi",label:"Sol 上 + Mi 下"}],Aa=2e3,Pa=["C4","D4","E4","F4","G4","A4","B4"],Lr=["完美!","双手协作!","和谐!","真厉害!","双手小钢琴家!"];function $a(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=6);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const r=document.querySelectorAll("#hud-dots .dot");r.forEach(h=>h.classList.remove("on")),r.forEach((h,m)=>{m>=5?h.style.display="none":h.style.display=""});const n=document.createElement("style");n.dataset.levelStyle="6",n.textContent=`
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
  `,document.head.appendChild(n),s.scene=new Ma(s.stage),s.kb=new wt(s.stage,Ee),setTimeout(()=>{!s.kb||!s.kb.svg||Ee.forEach(h=>{const m=s.kb.svg.querySelector(`.key--white[data-id="${h.id}"]`);if(!m)return;ei.has(h.id)?m.classList.add("level6-lh"):Ea.has(h.id)&&m.classList.add("level6-rh");const g=m.querySelector(".key__label");if(g){const u=document.createElementNS("http://www.w3.org/2000/svg","text"),y=g.getAttribute("x")||"40";u.setAttribute("x",y),u.setAttribute("y","150"),u.setAttribute("text-anchor","middle"),u.setAttribute("font-family","'ZCOOL KuaiLe', sans-serif"),u.setAttribute("font-size","12"),u.setAttribute("font-weight","900"),u.setAttribute("fill",ei.has(h.id)?"#2d6e3e":"#a06800"),u.setAttribute("class","level6-hand-tag"),u.setAttribute("style","pointer-events: none; paint-order: stroke; stroke: white; stroke-width: 2;"),u.textContent=ei.has(h.id)?"左手":"右手",m.appendChild(u)}})},50),s.say("钢琴老师教双手协调! 左低右高, 同时按下两个键~ 🎹"),s._level6Idx=0,s._level6Total=Wt.length,s._level6Correct=0,s._level6Done=!1,s._level6Current=null,s._level6PressFirst=null,s._level6PairTimer=null,s._level6Locked=!1;function l(h){!s.kb||!s.kb.svg||[h.high,h.low].forEach(m=>{const g=s.kb.svg.querySelector(`.key--white[data-id="${m}"]`);g&&s.kb.glowKey(g)})}function o(h,m){try{s.audio.playNote(h),setTimeout(()=>{try{s.audio.playNote(m)}catch{}},8)}catch{}}function a(h){if(h>=Wt.length)return d();const m=Wt[h];s._level6Current=m,s._level6PressFirst=null,s._level6Locked=!1;const g=Ee.find(y=>y.id===m.high),u=Ee.find(y=>y.id===m.low);s.say(`第 ${h+1} / ${Wt.length} 题: 请同时按 ${g.solfege} (右手) + ${u.solfege} (左手) ✨`);try{s.scene.setChordLabel(m.label)}catch{}setTimeout(()=>l(m),300),setTimeout(()=>{try{o(g.pitch,u.pitch)}catch{}},600)}function d(){s._level6Done=!0;const h=s._calcStars();try{s.progress.markLevelComplete(6,h)}catch{}try{s.audio.playScale(Pa)}catch{}s.say("双手小钢琴家毕业! 🎓🎹");try{s.scene.setChordLabel("毕业啦")}catch{}setTimeout(()=>{try{s.showWinOverlay(h,6)}catch{}},1200)}s.kb.onPress=h=>{if(s._level6Done||s._level6Locked||!s._level6Current||!h||!h.classList.contains("key--white"))return;const m=h.dataset.id,g=s._level6Current,u=new Set([g.high,g.low]),y=s._level6PressFirst;if(y&&y.id!==m){if(u.has(m)&&u.has(y.id)&&y.id!==m){c(h);return}_(h,m);return}if(!y){if(!u.has(m)){_(h,m);return}s._level6PressFirst={id:m,at:Date.now()};try{s.audio.playNote(h.dataset.pitch)}catch{}try{s.kb.glowKey(h)}catch{}h.classList.add("level6-pressed"),setTimeout(()=>h.classList.remove("level6-pressed"),500),s._level6PairTimer&&clearTimeout(s._level6PairTimer),s._level6PairTimer=setTimeout(()=>{const p=s._level6PressFirst;if(p){const f=Ee.find(x=>x.id===p.id),v=Ee.find(x=>x.id===g.high),b=Ee.find(x=>x.id===g.low);s.say(`光按了 ${f?f.solfege:"?"} 还不够哦, 再按 ${v.solfege} (右手) 或 ${b.solfege} (左手)~`),s.wrongCount++}s._level6PressFirst=null},Aa);return}try{s.kb.glowKey(h)}catch{}try{s.audio.playNote(h.dataset.pitch)}catch{}};function c(h){const m=s._level6PressFirst;if(!m||!s._level6Current)return;const g=m.id,u=h.dataset.id,y=Ee.find(v=>v.id===g),p=Ee.find(v=>v.id===u);if(y&&p)o(y.pitch,p.pitch);else try{y&&s.audio.playNote(y.pitch),p&&s.audio.playNote(p.pitch)}catch{}[g,u].forEach(v=>{const b=s.kb.svg.querySelector(`.key--white[data-id="${v}"]`);if(b){b.classList.add("level6-pressed");try{s.kb.glowKey(b)}catch{}setTimeout(()=>b.classList.remove("level6-pressed"),500)}}),s._level6Correct++,s._level6Locked=!0,s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null;const f=Lr[Math.min(s._level6Correct-1,Lr.length-1)];s.say(`${f} 双音 ${s._level6Correct} / ${Wt.length}`),r[s._level6Correct-1]&&r[s._level6Correct-1].classList.add("on");try{s.scene.celebrateClap()}catch{}try{s._floatScore(window.innerWidth/2,window.innerHeight*.45,"🎵 双音!")}catch{}try{const v=document.createElement("div");v.className="level6-flash",document.body.appendChild(v),setTimeout(()=>v.remove(),600)}catch{}try{const v=h.getBoundingClientRect(),b=v.left+v.width/2,x=v.top+v.height/2,T=(Ee.find(w=>w.id===s._level6Current.high)||{}).color||"#ffd166";s.burst(b,x,T)}catch{}try{s.audio.correct()}catch{}s._level6Idx++,setTimeout(()=>a(s._level6Idx),1400)}function _(h,m){s.wrongCount++;try{s.audio.wrong()}catch{}if(h.classList.add("shake"),setTimeout(()=>h.classList.remove("shake"),400),s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),s._level6PressFirst=null,!s._level6Current)return;const g=Ee.find(p=>p.id===s._level6Current.high),u=Ee.find(p=>p.id===s._level6Current.low),y=Ee.find(p=>p.id===m);y?s.say(`${y.solfege} 不在本道题里, 要按 ${g.solfege} (右手) + ${u.solfege} (左手) 同时哦~`):s.say(`要同时按 ${g.solfege} (右手) + ${u.solfege} (左手) 哦~`),setTimeout(()=>l(s._level6Current),800)}return setTimeout(()=>a(0),1200),()=>{if(s._level6PairTimer&&(clearTimeout(s._level6PairTimer),s._level6PairTimer=null),n&&n.parentNode&&n.remove(),s.scene){try{s.scene.teardown()}catch{}s.scene=null}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),r.forEach(h=>{h.classList.remove("on"),h.style.display=""}),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Da=Object.freeze(Object.defineProperty({__proto__:null,default:$a},Symbol.toStringTag,{value:"Module"}));class Oa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level7-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}drawRibbon(e,t,i,r){if(!this.background)return;const n=this.background.querySelector(".level7-ribbon-layer");if(!n)return;const l=this.background.getBoundingClientRect(),o=t.x-l.left,a=t.y-l.top,d=i.x-l.left,c=i.y-l.top,_="http://www.w3.org/2000/svg",h=document.createElementNS(_,"svg");h.setAttribute("viewBox",`0 0 ${l.width} ${l.height}`),h.setAttribute("width",l.width),h.setAttribute("height",l.height),h.style.position="absolute",h.style.inset="0",h.style.pointerEvents="none",h.setAttribute("class","level7-ribbon-svg");const m=(o+d)/2,g=Math.min(a,c)-60-Math.random()*30,u=document.createElementNS(_,"path");u.setAttribute("d",`M ${o},${a} Q ${m},${g} ${d},${c}`),u.setAttribute("stroke",r),u.setAttribute("stroke-width","6"),u.setAttribute("stroke-linecap","round"),u.setAttribute("fill","none"),u.setAttribute("opacity","0.85"),u.setAttribute("class","level7-ribbon-path"),u.setAttribute("stroke-dasharray",`${Math.hypot(d-o,c-a)}`),u.setAttribute("stroke-dashoffset",`${Math.hypot(d-o,c-a)}`),h.appendChild(u),n.appendChild(h),requestAnimationFrame(()=>{u.style.transition="stroke-dashoffset 0.55s ease-out, opacity 0.55s ease-out",u.setAttribute("stroke-dashoffset","0")}),setTimeout(()=>{u.setAttribute("opacity","0"),setTimeout(()=>{try{h.remove()}catch{}},600)},700)}lightTreehouse(){this.background&&(this.background.classList.add("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.add("level7-step-complete")}))}dimTreehouse(){this.background&&(this.background.classList.remove("level7-lit"),this.background.querySelectorAll(".level7-step").forEach(e=>{e.classList.remove("level7-step-complete")}))}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}var zi={};(function s(e,t,i,r){var n=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),l=typeof Path2D=="function"&&typeof DOMMatrix=="function",o=function(){if(!e.OffscreenCanvas)return!1;try{var C=new OffscreenCanvas(1,1),k=C.getContext("2d");k.fillRect(0,0,1,1);var P=C.transferToImageBitmap();k.createPattern(P,"no-repeat")}catch{return!1}return!0}();function a(){}function d(C){var k=t.exports.Promise,P=k!==void 0?k:e.Promise;return typeof P=="function"?new P(C):(C(a,a),null)}var c=function(C,k){return{transform:function(P){if(C)return P;if(k.has(P))return k.get(P);var F=new OffscreenCanvas(P.width,P.height),N=F.getContext("2d");return N.drawImage(P,0,0),k.set(P,F),F},clear:function(){k.clear()}}}(o,new Map),_=function(){var C=Math.floor(16.666666666666668),k,P,F={},N=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(k=function(A){var E=Math.random();return F[E]=requestAnimationFrame(function $(H){N===H||N+C-1<H?(N=H,delete F[E],A()):F[E]=requestAnimationFrame($)}),E},P=function(A){F[A]&&cancelAnimationFrame(F[A])}):(k=function(A){return setTimeout(A,C)},P=function(A){return clearTimeout(A)}),{frame:k,cancel:P}}(),h=function(){var C,k,P={};function F(N){function A(E,$){N.postMessage({options:E||{},callback:$})}N.init=function($){var H=$.transferControlToOffscreen();N.postMessage({canvas:H},[H])},N.fire=function($,H,I){if(k)return A($,null),k;var Q=Math.random().toString(36).slice(2);return k=d(function(U){function K(ne){ne.data.callback===Q&&(delete P[Q],N.removeEventListener("message",K),k=null,c.clear(),I(),U())}N.addEventListener("message",K),A($,Q),P[Q]=K.bind(null,{data:{callback:Q}})}),k},N.reset=function(){N.postMessage({reset:!0});for(var $ in P)P[$](),delete P[$]}}return function(){if(C)return C;if(!i&&n){var N=["var CONFETTI, SIZE = {}, module = {};","("+s.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{C=new Worker(URL.createObjectURL(new Blob([N])))}catch(A){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",A),null}F(C)}return C}}(),m={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function g(C,k){return k?k(C):C}function u(C){return C!=null}function y(C,k,P){return g(C&&u(C[k])?C[k]:m[k],P)}function p(C){return C<0?0:Math.floor(C)}function f(C,k){return Math.floor(Math.random()*(k-C))+C}function v(C){return parseInt(C,16)}function b(C){return C.map(x)}function x(C){var k=String(C).replace(/[^0-9a-f]/gi,"");return k.length<6&&(k=k[0]+k[0]+k[1]+k[1]+k[2]+k[2]),{r:v(k.substring(0,2)),g:v(k.substring(2,4)),b:v(k.substring(4,6))}}function T(C){var k=y(C,"origin",Object);return k.x=y(k,"x",Number),k.y=y(k,"y",Number),k}function w(C){C.width=document.documentElement.clientWidth,C.height=document.documentElement.clientHeight}function L(C){var k=C.getBoundingClientRect();C.width=k.width,C.height=k.height}function S(C){var k=document.createElement("canvas");return k.style.position="fixed",k.style.top="0px",k.style.left="0px",k.style.pointerEvents="none",k.style.zIndex=C,k}function M(C,k,P,F,N,A,E,$,H){C.save(),C.translate(k,P),C.rotate(A),C.scale(F,N),C.arc(0,0,1,E,$,H),C.restore()}function O(C){var k=C.angle*(Math.PI/180),P=C.spread*(Math.PI/180);return{x:C.x,y:C.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:C.startVelocity*.5+Math.random()*C.startVelocity,angle2D:-k+(.5*P-Math.random()*P),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:C.color,shape:C.shape,tick:0,totalTicks:C.ticks,decay:C.decay,drift:C.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:C.gravity*3,ovalScalar:.6,scalar:C.scalar,flat:C.flat}}function R(C,k){k.x+=Math.cos(k.angle2D)*k.velocity+k.drift,k.y+=Math.sin(k.angle2D)*k.velocity+k.gravity,k.velocity*=k.decay,k.flat?(k.wobble=0,k.wobbleX=k.x+10*k.scalar,k.wobbleY=k.y+10*k.scalar,k.tiltSin=0,k.tiltCos=0,k.random=1):(k.wobble+=k.wobbleSpeed,k.wobbleX=k.x+10*k.scalar*Math.cos(k.wobble),k.wobbleY=k.y+10*k.scalar*Math.sin(k.wobble),k.tiltAngle+=.1,k.tiltSin=Math.sin(k.tiltAngle),k.tiltCos=Math.cos(k.tiltAngle),k.random=Math.random()+2);var P=k.tick++/k.totalTicks,F=k.x+k.random*k.tiltCos,N=k.y+k.random*k.tiltSin,A=k.wobbleX+k.random*k.tiltCos,E=k.wobbleY+k.random*k.tiltSin;if(C.fillStyle="rgba("+k.color.r+", "+k.color.g+", "+k.color.b+", "+(1-P)+")",C.beginPath(),l&&k.shape.type==="path"&&typeof k.shape.path=="string"&&Array.isArray(k.shape.matrix))C.fill(z(k.shape.path,k.shape.matrix,k.x,k.y,Math.abs(A-F)*.1,Math.abs(E-N)*.1,Math.PI/10*k.wobble));else if(k.shape.type==="bitmap"){var $=Math.PI/10*k.wobble,H=Math.abs(A-F)*.1,I=Math.abs(E-N)*.1,Q=k.shape.bitmap.width*k.scalar,U=k.shape.bitmap.height*k.scalar,K=new DOMMatrix([Math.cos($)*H,Math.sin($)*H,-Math.sin($)*I,Math.cos($)*I,k.x,k.y]);K.multiplySelf(new DOMMatrix(k.shape.matrix));var ne=C.createPattern(c.transform(k.shape.bitmap),"no-repeat");ne.setTransform(K),C.globalAlpha=1-P,C.fillStyle=ne,C.fillRect(k.x-Q/2,k.y-U/2,Q,U),C.globalAlpha=1}else if(k.shape==="circle")C.ellipse?C.ellipse(k.x,k.y,Math.abs(A-F)*k.ovalScalar,Math.abs(E-N)*k.ovalScalar,Math.PI/10*k.wobble,0,2*Math.PI):M(C,k.x,k.y,Math.abs(A-F)*k.ovalScalar,Math.abs(E-N)*k.ovalScalar,Math.PI/10*k.wobble,0,2*Math.PI);else if(k.shape==="star")for(var V=Math.PI/2*3,de=4*k.scalar,ve=8*k.scalar,fe=k.x,be=k.y,Be=5,j=Math.PI/Be;Be--;)fe=k.x+Math.cos(V)*ve,be=k.y+Math.sin(V)*ve,C.lineTo(fe,be),V+=j,fe=k.x+Math.cos(V)*de,be=k.y+Math.sin(V)*de,C.lineTo(fe,be),V+=j;else C.moveTo(Math.floor(k.x),Math.floor(k.y)),C.lineTo(Math.floor(k.wobbleX),Math.floor(N)),C.lineTo(Math.floor(A),Math.floor(E)),C.lineTo(Math.floor(F),Math.floor(k.wobbleY));return C.closePath(),C.fill(),k.tick<k.totalTicks}function D(C,k,P,F,N){var A=k.slice(),E=C.getContext("2d"),$,H,I=d(function(Q){function U(){$=H=null,E.clearRect(0,0,F.width,F.height),c.clear(),N(),Q()}function K(){i&&!(F.width===r.width&&F.height===r.height)&&(F.width=C.width=r.width,F.height=C.height=r.height),!F.width&&!F.height&&(P(C),F.width=C.width,F.height=C.height),E.clearRect(0,0,F.width,F.height),A=A.filter(function(ne){return R(E,ne)}),A.length?$=_.frame(K):U()}$=_.frame(K),H=U});return{addFettis:function(Q){return A=A.concat(Q),I},canvas:C,promise:I,reset:function(){$&&_.cancel($),H&&H()}}}function B(C,k){var P=!C,F=!!y(k||{},"resize"),N=!1,A=y(k,"disableForReducedMotion",Boolean),E=n&&!!y(k||{},"useWorker"),$=E?h():null,H=P?w:L,I=C&&$?!!C.__confetti_initialized:!1,Q=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,U;function K(V,de,ve){for(var fe=y(V,"particleCount",p),be=y(V,"angle",Number),Be=y(V,"spread",Number),j=y(V,"startVelocity",Number),pe=y(V,"decay",Number),xe=y(V,"gravity",Number),we=y(V,"drift",Number),Ge=y(V,"colors",b),Tt=y(V,"ticks",Number),Ke=y(V,"shapes"),St=y(V,"scalar"),Hs=!!y(V,"flat"),ls=T(V),ji=fe,qs=[],Gn=C.width*ls.x,Wn=C.height*ls.y;ji--;)qs.push(O({x:Gn,y:Wn,angle:be,spread:Be,startVelocity:j,color:Ge[ji%Ge.length],shape:Ke[f(0,Ke.length)],ticks:Tt,decay:pe,gravity:xe,drift:we,scalar:St,flat:Hs}));return U?U.addFettis(qs):(U=D(C,qs,H,de,ve),U.promise)}function ne(V){var de=A||y(V,"disableForReducedMotion",Boolean),ve=y(V,"zIndex",Number);if(de&&Q)return d(function(j){j()});P&&U?C=U.canvas:P&&!C&&(C=S(ve),document.body.appendChild(C)),F&&!I&&H(C);var fe={width:C.width,height:C.height};$&&!I&&$.init(C),I=!0,$&&(C.__confetti_initialized=!0);function be(){if($){var j={getBoundingClientRect:function(){if(!P)return C.getBoundingClientRect()}};H(j),$.postMessage({resize:{width:j.width,height:j.height}});return}fe.width=fe.height=null}function Be(){U=null,F&&(N=!1,e.removeEventListener("resize",be)),P&&C&&(document.body.contains(C)&&document.body.removeChild(C),C=null,I=!1)}return F&&!N&&(N=!0,e.addEventListener("resize",be,!1)),$?$.fire(V,fe,Be):K(V,fe,Be)}return ne.reset=function(){$&&$.reset(),U&&U.reset()},ne}var W;function q(){return W||(W=B(null,{useWorker:!0,resize:!0})),W}function z(C,k,P,F,N,A,E){var $=new Path2D(C),H=new Path2D;H.addPath($,new DOMMatrix(k));var I=new Path2D;return I.addPath(H,new DOMMatrix([Math.cos(E)*N,Math.sin(E)*N,-Math.sin(E)*A,Math.cos(E)*A,P,F])),I}function ee(C){if(!l)throw new Error("path confetti are not supported in this browser");var k,P;typeof C=="string"?k=C:(k=C.path,P=C.matrix);var F=new Path2D(k),N=document.createElement("canvas"),A=N.getContext("2d");if(!P){for(var E=1e3,$=E,H=E,I=0,Q=0,U,K,ne=0;ne<E;ne+=2)for(var V=0;V<E;V+=2)A.isPointInPath(F,ne,V,"nonzero")&&($=Math.min($,ne),H=Math.min(H,V),I=Math.max(I,ne),Q=Math.max(Q,V));U=I-$,K=Q-H;var de=10,ve=Math.min(de/U,de/K);P=[ve,0,0,ve,-Math.round(U/2+$)*ve,-Math.round(K/2+H)*ve]}return{type:"path",path:k,matrix:P}}function ge(C){var k,P=1,F="#000000",N='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof C=="string"?k=C:(k=C.text,P="scalar"in C?C.scalar:P,N="fontFamily"in C?C.fontFamily:N,F="color"in C?C.color:F);var A=10*P,E=""+A+"px "+N,$=new OffscreenCanvas(A,A),H=$.getContext("2d");H.font=E;var I=H.measureText(k),Q=Math.ceil(I.actualBoundingBoxRight+I.actualBoundingBoxLeft),U=Math.ceil(I.actualBoundingBoxAscent+I.actualBoundingBoxDescent),K=2,ne=I.actualBoundingBoxLeft+K,V=I.actualBoundingBoxAscent+K;Q+=K+K,U+=K+K,$=new OffscreenCanvas(Q,U),H=$.getContext("2d"),H.font=E,H.fillStyle=F,H.fillText(k,ne,V);var de=1/P;return{type:"bitmap",bitmap:$.transferToImageBitmap(),matrix:[de,0,0,de,-Q*de/2,-U*de/2]}}t.exports=function(){return q().apply(this,arguments)},t.exports.reset=function(){q().reset()},t.exports.create=B,t.exports.shapeFromPath=ee,t.exports.shapeFromText=ge})(function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}}(),zi,!1);const tt=zi.exports;zi.exports.create;class Ra{burst({x:e,y:t,color:i="#ffd166",count:r=20,spread:n=50,startVelocity:l=22}){try{tt({particleCount:r,spread:n,startVelocity:l,ticks:60,origin:{x:e/window.innerWidth,y:t/window.innerHeight},colors:[i,"#fff8ec","#ffc971"],shapes:["circle","square"],scalar:.7})}catch{}}celebrate({count:e=140,spread:t=80}={}){try{tt({particleCount:e,spread:t,origin:{y:.55},colors:["#e63946","#f4a261","#ffc971","#b5c99a","#457b9d","#9b5de5"]})}catch{}}fountain({x:e,y:t,color:i="#ffd166",count:r=60}){try{const n={x:e/window.innerWidth,y:t/window.innerHeight};tt({particleCount:r/2,angle:60,spread:55,origin:n,colors:[i,"#fff8ec"],startVelocity:35}),tt({particleCount:r/2,angle:120,spread:55,origin:n,colors:[i,"#fff8ec"],startVelocity:35})}catch{}}confettiFromSides({count:e=50}={}){try{tt({particleCount:e,angle:60,spread:55,origin:{x:0,y:.7}}),tt({particleCount:e,angle:120,spread:55,origin:{x:1,y:.7}})}catch{}}firework({x:e,y:t,color:i="#ffd166"}={}){try{const r={x:e/window.innerWidth,y:t/window.innerHeight};tt({particleCount:30,spread:360,startVelocity:25,origin:r,colors:[i,"#fff8ec","#ffc971","#9b5de5"],scalar:.8})}catch{}}drop({x:e,y:t,color:i="#a8dadc"}={}){try{const r={x:e/window.innerWidth,y:t/window.innerHeight};tt({particleCount:12,spread:25,startVelocity:18,origin:r,colors:[i,"#fff8ec","#5fa8b5"],scalar:.5})}catch{}}}const Yt=new Ra,ti=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Na=36,si=["C4","D4","E4","F4","G4","A4","B4"],Ia=["B4","A4","G4","F4","E4","D4","C4"],Ba=new Set(["sol","la","si"]),Cr=["完美!","真棒!","不错哟!","完整 7 音在聚集!"];function Fa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=7);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display=""),s.scene=new Oa(s.stage),s.say("爬上树屋看完整 7 音阶! Fa 和 Si 是新的朋友~ 拖鱼到对应台阶 (Do 最低 → Si 最高)"),s.fishPool=new $s(s.stage,ti),s.fishPool.setDragEnabled(!0),s.fishPool.intro();const r=["do","re","mi","fa","sol","la","si"];s._level7Placed=new Set,s._level7Count=0,s.fishPool.onTap=l=>{if(l){try{s.audio.playNote(l.dataset.pitch)}catch{}try{s.audio.hover(l.dataset.id)}catch{}G.fromTo(l,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})}},s.fishPool.onDragStart=l=>{try{s.audio.hover(l.dataset.id)}catch{}},s.fishPool.onDragMove=()=>{},s.fishPool.onDrop=(l,o,a,d)=>{const c=l.dataset.id;if(s._level7Placed.has(c))return;const _=d?.x,h=d?.y;if(!Number.isFinite(_)||!Number.isFinite(h))return;const m=l.getBoundingClientRect();let g=null,u=1/0;if(s.scene&&s.scene.background)for(const f of r){const v=s.scene.background.querySelector(`.level7-step[data-note="${f}"]`);if(!v)continue;const b=v.getBoundingClientRect(),x=b.left+b.width/2,T=b.top+b.height/2,w=Math.hypot(x-_,T-h);w<u&&(u=w,g=f)}const y=g&&u<Na,p=ti.find(f=>f.id===c);if(y&&c===g){s._level7Placed.add(c),s._level7Count=s._level7Placed.size;try{s.audio.correct()}catch{}const f=s.scene.background.querySelector(`.level7-step[data-note="${g}"]`),v=f.getBoundingClientRect(),b=v.left+v.width/2,x=v.top+v.height/2,T=b-(m.left+m.width/2),w=x-(m.top+m.height/2),L=p&&p.color||"#ffd166";try{s.scene.drawRibbon(g,{x:_,y:h},{x:b,y:x},L)}catch{}G.to(l,{x:T,y:w,scale:.85,duration:.55,ease:"back.out(1.7)",onComplete:()=>{try{s.fishPool.lockFish(c)}catch{}try{f.style.setProperty("--step-lit-color",L),f.classList.add("level7-step-lit")}catch{}try{Yt.fountain({x:b,y:x,color:L})}catch{}try{G.fromTo(f,{scale:1},{scale:1.25,duration:.3,yoyo:!0,repeat:1,ease:"power2.out"})}catch{}if(p){try{s.audio.playNote(p.pitch)}catch{}try{s._floatScore(_,h,`${p.solfege} ✓`)}catch{}}try{setTimeout(()=>{try{s.audio.hover(c)}catch{}},220)}catch{}try{const M=s.scene.background.querySelector(".level7-birds path");M&&G.fromTo(M,{y:0},{y:-6,duration:.12,yoyo:!0,repeat:3,ease:"sine.inOut",overwrite:!0})}catch{}if(G.to(l,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>G.to(l,{rotation:0,duration:.2,ease:"power2.out"})}),G.fromTo(l,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),Ba.has(g)){try{const M=l;M.classList.add("level7-fish-lift"),setTimeout(()=>{try{M.classList.remove("level7-fish-lift")}catch{}},900)}catch{}try{f.classList.add("level7-step-glow")}catch{}}const S=Cr[Math.min(s._level7Count-1,Cr.length-1)]+" "+s._level7Count+" / 7";s.say(S),s._level7Count===7&&setTimeout(()=>n(),800)}})}else{s.wrongCount++;try{s.audio.wrong()}catch{}if(l.classList.add("shake"),setTimeout(()=>l.classList.remove("shake"),400),y&&g&&c!==g){const f=ti.find(b=>b.id===g),v=g==="fa"?"Fa 在 Mi 和 Sol 之间 (第 4 级台阶)":g==="si"?"Si 在 La 之上, 最高一级台阶 (最接近树屋)":`${f?f.solfege:"这个台阶"}`;s.say(`${p?p.solfege:"这条鱼"} 不是 ${v} 的鱼哦~`)}else c==="fa"?s.say("Fa 是新朋友! 它在 Mi 和 Sol 之间的台阶~"):c==="si"?s.say("Si 是新朋友! 它在 La 之上, 最高的台阶, 最接近树屋~"):s.say(`${p?p.solfege:"这条鱼"} 的家在树上, 找最近的圆圈~`);G.to(l,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"})}};function n(){const l=s._calcStars();try{s.progress.markLevelComplete(7,l)}catch{}try{s.scene.lightTreehouse()}catch{}try{s.audio.playScale(si)}catch{}s.say("完整的 Do Re Mi Fa Sol La Si 上行! 太棒了~"),setTimeout(()=>{try{s.audio.playScale(Ia)}catch{}s.say("再来下行: Si La Sol Fa Mi Re Do")},si.length*220+300),setTimeout(()=>{try{s.showWinOverlay(l,7)}catch{}},si.length*220*2+1200)}return()=>{if(s.scene){try{s.scene.teardown()}catch{}s.scene=null}if(s.fishPool)try{s.fishPool.pool.innerHTML=""}catch{}e&&(e.style.display=""),t&&(t.style.display=""),i&&(i.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ha=Object.freeze(Object.defineProperty({__proto__:null,default:Fa},Symbol.toStringTag,{value:"Module"}));class qa{constructor(e){this.stage=e,this.background=null,this.render()}render(){const e=document.createElement("div");e.className="level8-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}showSongSelector(e,t){const i=[{id:"twinkle",name:"小星星",emoji:"⭐",diff:"★",difficulty:1,melody:["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"]},{id:"birthday",name:"生日快乐",emoji:"🎂",diff:"★",difficulty:1,melody:["C4","C4","D4","C4","F4","E4","C4","C4","D4","C4","G4","F4"]},{id:"london",name:"伦敦桥",emoji:"🌉",diff:"★★",difficulty:2,melody:["C4","D4","E4","F4","G4","G4","A4","G4","F4","E4","D4","C4"]},{id:"joy",name:"欢乐颂",emoji:"🎉",diff:"★★",difficulty:2,melody:["E4","E4","F4","G4","G4","F4","E4","D4","C4","C4","D4","E4","E4","D4","D4"]},{id:"frog",name:"小青蛙",emoji:"🐸",diff:"★★",difficulty:2,melody:["C4","D4","E4","F4","E4","D4","C4"]},{id:"molihua",name:"茉莉花",emoji:"🌸",diff:"★★★",difficulty:3,melody:["C4","E4","G4","A4","G4","E4","C4","D4","E4","F4","E4","D4","C4"]}],r=i.map(n=>`
      <button class="level8-song-card level8-diff-${n.difficulty}" data-song="${n.id}">
        <div class="level8-song-emoji">${n.emoji}</div>
        <div class="level8-song-name">${n.name}</div>
        <div class="level8-song-len">${n.melody.length} 音</div>
        <div class="level8-song-diff">${n.diff}</div>
      </button>
    `).join("");e.innerHTML=`
      <div class="level8-song-list">
        <div class="level8-song-list-title">🎼 选一首曲子开始演奏</div>
        <div class="level8-song-cards">${r}</div>
      </div>
    `,e.querySelectorAll(".level8-song-card").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.song,o=i.find(a=>a.id===l);o&&typeof t=="function"&&t(o)})})}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background),this.background=null}}const ii={C4:{id:"do",solfege:"Do"},D4:{id:"re",solfege:"Re"},E4:{id:"mi",solfege:"Mi"},F4:{id:"fa",solfege:"Fa"},G4:{id:"sol",solfege:"Sol"},A4:{id:"la",solfege:"La"},B4:{id:"si",solfege:"Si"}},je=80,Ga={do:180,re:165,mi:120,fa:110,sol:100,la:80,si:70};function Wa(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=8);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display="");const i=document.getElementById("btn-replay");i&&(i.style.display="");const r=document.createElement("style");r.dataset.levelStyle="8",r.textContent=`
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
  `,document.head.appendChild(r),s.scene=new qa(s.stage),s.say("森林音乐会开始! 选一首曲子~"),s.stage.insertAdjacentHTML("beforeend",'<div class="level8-song-stage"></div>');const n=s.stage.querySelector(".level8-song-stage"),l="fps_level8_played_v1";function o(){try{const f=localStorage.getItem(l);if(!f)return new Set;const v=JSON.parse(f);return new Set(Array.isArray(v)?v:[])}catch{return new Set}}function a(f){const v=o();v.add(f);try{localStorage.setItem(l,JSON.stringify(Array.from(v)))}catch{}}o().size>=6&&n.insertAdjacentHTML("beforeend",'<div class="level8-all-played-badge">🎖 全部演奏!</div>'),s.scene.showSongSelector(n,f=>u(f)),s.kb=new wt(s.stage,[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}]),s._level8Seq=null,s._level8Idx=0,s._level8Total=0,s._level8Correct=0,s._level8Accepting=!1,s._level8Done=!1,s._level8Timeouts=[];let c=null,_=null;function h(){const f=document.getElementById("level8-audience");f&&(f.classList.remove("level8-cheer"),f.getBoundingClientRect(),f.classList.add("level8-cheer"),clearTimeout(_),_=setTimeout(()=>f.classList.remove("level8-cheer"),700))}function m(){s.stage.insertAdjacentHTML("beforeend",'<div class="level8-staff-area"></div>'),c=s.stage.querySelector(".level8-staff-area"),c.innerHTML=`
      <svg class="level8-staff" viewBox="0 0 800 280" preserveAspectRatio="xMidYMid meet">
        <line class="level8-staff-line" x1="40" y1="${je+40}" x2="760" y2="${je+40}" />
        <line class="level8-staff-line" x1="40" y1="${je+60}" x2="760" y2="${je+60}" />
        <line class="level8-staff-line" x1="40" y1="${je+80}" x2="760" y2="${je+80}" />
        <line class="level8-staff-line" x1="40" y1="${je+100}" x2="760" y2="${je+100}" />
        <line class="level8-staff-line" x1="40" y1="${je+120}" x2="760" y2="${je+120}" />
        <circle class="level8-current-note" cx="400" cy="0" r="16" fill="#ffd166" />
      </svg>
    `}function g(){return c?c.querySelector(".level8-current-note"):null}function u(f){n&&(n.innerHTML=`
        <div class="level8-now-playing">
          <div class="level8-playing-badge">🎼 正在演奏</div>
          <div class="level8-now-emoji">${f.emoji}</div>
          <div class="level8-now-text">演奏: <strong>${f.name}</strong></div>
          <div class="level8-difficulty-badge level8-diff-${f.difficulty}">难度 ${f.diff}</div>
          <div class="level8-progress">1 / ${f.melody.length}</div>
        </div>
      `),c||m(),s.say(`演奏《${f.name}》! 跟着音符按琴键~`),a(f.id),s._level8Song=f,s._level8Seq=[...f.melody],s._level8Total=s._level8Seq.length,s._level8Correct=0,s._level8Idx=0,s._level8Accepting=!1,s._level8Done=!1,setTimeout(y,800)}function y(){if(s._level8Done||s._level8Idx>=s._level8Seq.length)return;const f=s._level8Seq[s._level8Idx],v=ii[f],b=Ga[v.id],x=g();x&&(G.killTweensOf(x),G.set(x,{scale:1,opacity:1}),x.setAttribute("cy",b),x.dataset.pitch=f,x.classList.remove("incorrect"),s.say(`下一个: ${v.solfege} (${f})`),s._level8Accepting=!0,G.fromTo(x,{attr:{cy:b}},{attr:{cy:b+100},duration:4.5,ease:"none",onComplete:()=>{if(!s._level8Done&&s._level8Accepting){s._level8Accepting=!1,s.wrongCount++;try{s.audio.wrong()}catch{}s.say("漏拍啦! 看下一个音符~"),x.classList.add("incorrect"),setTimeout(()=>{x.classList.remove("incorrect"),s._level8Idx++,y()},600)}}}))}s.kb.onPress=f=>{if(!s._level8Accepting||s._level8Done||!s._level8Seq||s._level8Idx>=s._level8Seq.length)return;const v=s._level8Seq[s._level8Idx],b=f.dataset.pitch;if(b===v){s._level8Correct++,s._level8Accepting=!1;try{s.audio.correct()}catch{}try{s.audio.playNote(b)}catch{}const x=g();if(x&&(G.killTweensOf(x),G.to(x,{opacity:0,scale:2,duration:.4,ease:"back.out(2)"})),n){const w=n.querySelector(".level8-progress");w&&(w.textContent=`${s._level8Idx+1} / ${s._level8Total}`)}h();const T=["完美!","森林在听!","真棒!"];s.say(T[Math.min(s._level8Correct-1,T.length-1)]),s._level8Idx++,s._level8Idx>=s._level8Seq.length?(s._level8Done=!0,s._level8Timeouts.push(setTimeout(p,800))):setTimeout(y,500)}else{s.wrongCount++;try{s.audio.wrong()}catch{}const x=ii[b];s.say(`这是 ${x?x.solfege:"?"}, 不是 ${ii[v].solfege}. 再听一下!`);const T=g();T&&T.classList.add("incorrect"),setTimeout(()=>{T&&T.classList.remove("incorrect")},300);try{s.audio.playNote(v)}catch{}}};function p(){const f=s._level8Song,v=f&&f.difficulty||1,b=s.wrongCount||0;let x;v<=1?x=s._calcStars&&s._calcStars()||(b<=0?3:b<=2?2:b<=5?1:0):v===2?x=b<=0?3:b<=3?2:b<=7?1:0:x=b<=1?3:b<=4?2:b<=9?1:0;try{s.progress.markLevelComplete(8,x)}catch{}try{s.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}if(typeof s._flashScreen=="function")try{s._flashScreen()}catch{}if(typeof s._floatScore=="function")try{s._floatScore(window.innerWidth/2,window.innerHeight*.4,"🎉 完美的表演! 🎉")}catch{}s.say("完美的表演! 森林在为你鼓掌!"),setTimeout(()=>{try{s.showWinOverlay(x,8)}catch{}},1200),s.stage.insertAdjacentHTML("beforeend",`
      <div class="level8-snapshot-panel">
        <button class="level8-snapshot-btn" id="level8-snapshot-btn"
                title="保存成就">📸</button>
        <div class="level8-completed-stamp" id="level8-completed-stamp">
          ✅ 完成啦!
        </div>
      </div>
    `),setTimeout(()=>{const w=document.getElementById("level8-completed-stamp");w&&w.classList.add("show")},600);const T=document.getElementById("level8-snapshot-btn");T&&(T.onclick=()=>{T.classList.add("clicked");const w=document.getElementById("level8-completed-stamp");w&&(w.textContent="🎉 成就已记录! 🎉",w.classList.add("show"));try{s.say("🎉 成就已记录!")}catch{}setTimeout(()=>T.classList.remove("clicked"),400)})}return()=>{if(Array.isArray(s._level8Timeouts)&&(s._level8Timeouts.forEach(x=>clearTimeout(x)),s._level8Timeouts=[]),clearTimeout(_),r&&r.parentNode&&r.remove(),s._level8Song=null,s.scene){try{s.scene.teardown()}catch{}s.scene=null}s.stage&&s.stage.querySelectorAll(".level8-song-stage, .level8-staff-area, .level8-snapshot-panel").forEach(x=>x.remove());const f=document.getElementById("hud-level2");f&&(f.style.display="none");const v=document.querySelector(".hud__dots");v&&(v.style.display="");const b=document.getElementById("btn-replay");b&&(b.style.display=""),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const za=Object.freeze(Object.defineProperty({__proto__:null,default:Wa},Symbol.toStringTag,{value:"Module"}));class ja{constructor(e){this.stage=e,this.render()}render(){const e=document.createElement("div");e.className="level9-background",e.innerHTML=`
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"
           xmlns="${oe}">
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
    `,this.stage.appendChild(e),this.background=e}teardown(){this.background&&this.background.parentNode&&this.background.parentNode.removeChild(this.background)}}const ri=[{id:"cs",solfege:"Do#",pitch:"C#4"},{id:"ds",solfege:"Re#",pitch:"D#4"},{id:"fs",solfege:"Fa#",pitch:"F#4"},{id:"gs",solfege:"Sol#",pitch:"G#4"},{id:"as",solfege:"La#",pitch:"A#4"}];function Mr(s,e,t,i="rgba(155, 93, 229, 0.7)"){const r=document.createElement("span");r.className="level9-touch-ripple",r.style.left=`${e}px`,r.style.top=`${t}px`,r.style.borderColor=i,s.appendChild(r),r.offsetWidth,r.classList.add("go"),setTimeout(()=>r.remove(),750)}function ni(s,e){const t=document.createElement("div");t.className="level9-combo-float",t.textContent=e;const i=(Math.random()-.5)*120;t.style.left=`calc(50% + ${i}px)`,t.style.top="38%",s.appendChild(t),setTimeout(()=>t.remove(),1200)}function Va(s){try{const e=s._webAudio;if(!e||!s.unlocked)return;const t=e.currentTime;[1046.5,1318.51,1567.98].forEach((r,n)=>{const l=t+n*.05,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(r,l);const a=e.createGain();a.gain.setValueAtTime(1e-4,l),a.gain.exponentialRampToValueAtTime(.45,l+.008),a.gain.exponentialRampToValueAtTime(1e-4,l+.25),o.connect(a).connect(s._masterGain),o.start(l),o.stop(l+.3)})}catch{}}function Ya(s){typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=9);const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=document.querySelector(".hud__dots");t&&(t.style.display=""),s.scene=new ja(s.stage),s.say("黑键朋友们也想被听见! 按从左到右的顺序听"),s.stage.insertAdjacentHTML("beforeend",'<div class="level9-keys-container"></div>');const i=s.stage.querySelector(".level9-keys-container"),r=document.createElement("div");r.className="level9-combo-meter",r.innerHTML='<span class="level9-combo-meter__num">0</span><span class="level9-combo-meter__x">x</span><span class="level9-combo-meter__label">连击</span>',r.style.display="none",i.appendChild(r);const n=r.querySelector(".level9-combo-meter__num");ri.forEach((a,d)=>{const c=document.createElement("button");c.className="level9-key",c.dataset.id=a.id,c.dataset.pitch=a.pitch,c.innerHTML=`
      <div class="level9-key__label">${a.solfege}</div>
      <div class="level9-key__ripple"></div>
    `,i.appendChild(c),c.addEventListener("pointerdown",_=>{const h=c.getBoundingClientRect(),m=_.clientX-h.left,g=_.clientY-h.top;c.classList.add("pressed"),setTimeout(()=>c.classList.remove("pressed"),300),s.audio.playNote(a.pitch),a.id===ri[s._level9Idx].id?(s._level9Idx++,s._level9Correct++,G.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1},{scale:3,opacity:0,duration:.6,ease:"power2.out"}),Mr(c,m,g,"rgba(155, 93, 229, 0.85)"),s._level9Combo=(s._level9Combo||0)+1,s._level9Combo>=2&&(r.style.display="",n.textContent=String(s._level9Combo),r.classList.remove("bump"),r.offsetWidth,r.classList.add("bump"),ni(s.stage,`x${s._level9Combo}${s._level9Combo>=5?" 🔥":""}`),s._level9Combo>=5&&s._level9Combo%5===0&&Va(s.audio)),s.say(["对!","完美!","真棒!"][Math.min(s._level9Correct-1,2)]),s._level9Idx>=ri.length&&(s._level9Done=!0,s._level9Combo>=2&&ni(s.stage,`🎉 x${s._level9Combo} 全连!`),setTimeout(()=>{const u=Math.max(1,3-Math.floor(s.wrongCount/2));try{s.progress.markLevelComplete(9,u)}catch{}s.audio.playScale(["C#4","D#4","F#4","G#4","A#4"]),s.showWinOverlay(u,9)},800))):(s.wrongCount++,s.audio.wrong(),c.classList.add("shake"),setTimeout(()=>c.classList.remove("shake"),400),G.fromTo(c.querySelector(".level9-key__ripple"),{scale:0,opacity:1,backgroundColor:"#ff5252"},{scale:2.5,opacity:0,duration:.5,ease:"power2.out"}),Mr(c,m,g,"rgba(255, 82, 82, 0.9)"),s._level9Combo&&s._level9Combo>=2&&ni(s.stage,"断啦 💔"),s._level9Combo=0,r.style.display="none",r.classList.remove("bump"),s.say("从左到右! 不对, 重来"),s._level9Idx=0)})}),s._level9Idx=0,s._level9Correct=0,s._level9Done=!1,s._level9Combo=0;const l=s.stage.querySelector(".level9-background");l&&l.classList.add("beat-pulse");const o=()=>{l&&l.classList.remove("beat-pulse"),r.classList.remove("bump"),r.style.display="none"};return()=>{o(),s.scene&&s.scene.teardown(),s.stage.querySelectorAll(".level9-keys-container").forEach(d=>d.remove()),typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.currentLevelId=null)}}const Ua=Object.freeze(Object.defineProperty({__proto__:null,default:Ya},Symbol.toStringTag,{value:"Module"})),Er=2200,Qa=260,ks=80,st=160,Ar=420,Ka=280,Za=190,yt=(st-ks)/4,Ds=st+yt,Xa=(st+Ds)/2,Ja={mi:st,fa:st-yt/2,sol:st-yt,la:st-yt*1.5,si:st-yt*2,re:Xa,do:Ds};class ec{constructor(e,t){this.root=e,this.notes=t,this.filled=new Set,this.render()}render(){const e=document.createElement("div");e.className="staff-wrap stage__staff-area";const t=[0,1,2,3,4].map(l=>`<line class="staff__line" x1="80" y1="${ks+l*yt}" x2="${Er-20}" y2="${ks+l*yt}"/>`).join(""),i=Ar,r=`<line class="staff__ledger" x1="${i-30}" y1="${Ds}" x2="${i+30}" y2="${Ds}"/>`,n=this.notes.map((l,o)=>{const a=Ar+o*Ka,d=Ja[l.id]??ks;return`
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
      <svg class="staff" xmlns="${oe}" viewBox="0 0 ${Er} ${Qa}"
           preserveAspectRatio="xMidYMid meet" aria-label="五线谱">
        <!-- 高音谱号 -->
        <text class="staff__clef" x="${Za}" y="120" dominant-baseline="middle">𝄞</text>

        <!-- 5 条主线 -->
        ${t}

        <!-- Do 的加线(下方第 1 加线,虚线) -->
        ${r}

        <!-- 7 个占位点 + 标签 -->
        ${n}
      </svg>
    `,this.root.appendChild(e),this.svg=e.querySelector("svg"),this.slots=new Map,this.svg.querySelectorAll(".staff-slot").forEach(l=>{this.slots.set(l.dataset.id,l)})}fillNote(e){if(this.filled.has(e))return;this.filled.add(e);const t=this.slots.get(e);if(!t)return;const i=this.notes.find(o=>o.id===e);if(!i)return;const r=t.querySelector(".staff__dot");if(!r)return;r.classList.remove("empty"),r.setAttribute("r","23"),r.style.fill=i.color,t.classList.add("filled"),t.querySelectorAll(".staff__label").forEach(o=>o.style.visibility="visible");const n=t.querySelector(".staff__placeholder-ring");n&&(n.style.display="none");const l=t.querySelector(".staff__placeholder-label");l&&(l.style.display="none")}showHint(e){this.clearHint();const t=this.slots.get(e);!t||this.filled.has(e)||t.classList.add("hint")}clearHint(){this.svg.querySelectorAll(".staff-slot.hint").forEach(e=>{e.classList.remove("hint")})}setTarget(e){if(this.clearTarget(),!e)return;const t=this.slots.get(e);if(!t||this.filled.has(e))return;t.classList.add("targeting");const i=this.notes.findIndex(r=>r.id===e);if(i>0){const r=this.notes[i-1].id,n=this.slots.get(r);n&&!this.filled.has(r)&&n.classList.add("targeting-adjacent")}if(i>=0&&i<this.notes.length-1){const r=this.notes[i+1].id,n=this.slots.get(r);n&&!this.filled.has(r)&&n.classList.add("targeting-adjacent")}}clearTarget(){this.svg.querySelectorAll(".staff-slot.targeting, .staff-slot.targeting-adjacent").forEach(e=>{e.classList.remove("targeting","targeting-adjacent")})}flashFill(e){const t=this.slots.get(e);t&&(t.classList.add("filling"),setTimeout(()=>{try{t.classList.remove("filling")}catch{}},900))}reset(){this.filled.clear(),this.svg.querySelectorAll(".staff-slot").forEach(e=>{e.classList.remove("filled","hint","targeting","targeting-adjacent","filling");const t=e.querySelector(".staff__dot");t&&(t.classList.add("empty"),t.setAttribute("r","20"),t.style.fill=""),e.querySelectorAll(".staff__label").forEach(n=>n.style.visibility="hidden");const i=e.querySelector(".staff__placeholder-ring");i&&(i.style.display="");const r=e.querySelector(".staff__placeholder-label");r&&(r.style.display="")})}}const Pr="forest-piano-achievements",ys=[{id:"first-graduate",name:"🎓 毕业生",desc:"完成任意一关",emoji:"🎓",check:s=>(s.completedLevels||[]).length>=1},{id:"forest-master",name:"🏆 森林大师",desc:"完成全部 8 关",emoji:"🏆",check:s=>{const e=(s.completedLevels||[]).map(String);return[1,2,3,4,5,6,7,8].every(t=>e.includes(String(t)))}},{id:"perfect-pitch",name:"⭐ 完美演奏",desc:"获得任一关 3 颗星",emoji:"⭐",check:s=>Object.values(s.stars||{}).some(e=>Number(e)>=3)},{id:"diamond-ear",name:"💎 钻石之耳",desc:"全部 8 关都获得 3 颗星",emoji:"💎",check:s=>{const e=s.stars||{};return[1,2,3,4,5,6,7,8].every(t=>Number(e[t]||0)>=3)}},{id:"repeat-master",name:"🔁 重复高手",desc:"累计完成 10 次关卡 (含重玩)",emoji:"🔁",check:s=>Number(s.totalCompletions||0)>=10},{id:"treehouse-climber",name:"🌳 树屋登顶",desc:"完成第 7 关 (完整 7 音阶)",emoji:"🌳",check:s=>(s.completedLevels||[]).map(String).includes("7")},{id:"concert-master",name:"🎵 音乐家",desc:"完成第 8 关 (音乐会)",emoji:"🎵",check:s=>(s.completedLevels||[]).map(String).includes("8")},{id:"drumming-kid",name:"🥁 小鼓手",desc:"完成第 4 关 (节奏)",emoji:"🥁",check:s=>(s.completedLevels||[]).map(String).includes("4")},{id:"mountaineer",name:"🏔️ 山谷行者",desc:"完成第 3 关 (五声音阶)",emoji:"🏔️",check:s=>(s.completedLevels||[]).map(String).includes("3")},{id:"two-hands",name:"🎹 双手钢琴家",desc:"完成第 6 关 (双手协调)",emoji:"🎹",check:s=>(s.completedLevels||[]).map(String).includes("6")},{id:"starter",name:"🌱 萌芽",desc:"完成第 1 关 (入门)",emoji:"🌱",check:s=>(s.completedLevels||[]).map(String).includes("1")},{id:"listener",name:"👂 敏锐耳朵",desc:"完成第 2 关 (听音找鱼)",emoji:"👂",check:s=>(s.completedLevels||[]).map(String).includes("2")}];class tc{constructor(e){this.progress=e,this.state=this._load(),this.unlocked=new Set(this.state.unlockedIds),this._backfill()}_load(){try{if(typeof localStorage>"u")return{unlockedIds:[]};const e=localStorage.getItem(Pr);if(e){const t=JSON.parse(e);if(t&&Array.isArray(t.unlockedIds))return t}}catch{}return{unlockedIds:[]}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Pr,JSON.stringify({unlockedIds:Array.from(this.unlocked)}))}catch{}}_backfill(){if(!this.progress)return;let e=!1;try{const t=this.progress.getSnapshot();for(const i of ys)this.unlocked.has(i.id)||i.check(t)&&(this.unlocked.add(i.id),e=!0);e&&this._save()}catch{}}checkAndUnlock(){let e;try{e=this.progress?this.progress.getSnapshot():null}catch{e=null}if(!e)return[];const t=[];for(const i of ys)if(!this.unlocked.has(i.id))try{i.check(e)&&(this.unlocked.add(i.id),t.push(i))}catch{}return t.length>0&&this._save(),t}has(e){return this.unlocked.has(e)}getAll(){return ys.map(e=>({...e,unlocked:this.unlocked.has(e.id)}))}getProgressPercent(){const e=ys.length;return Math.round(this.unlocked.size/e*100)}getUnlockedCount(){return this.unlocked.size}reset(){this.unlocked=new Set,this._save()}}class sc{static show(e,t={}){if(!e)return;const i=Math.max(1500,Number(t.durationMs)||4500),r=document.querySelector(`.achievement-toast[data-id="${ic(e.id||"")}"]`);r&&r.remove();const n=document.createElement("div");n.className="achievement-toast",e.id&&(n.dataset.id=e.id),n.setAttribute("role","status"),n.setAttribute("aria-live","polite"),n.innerHTML=`
      <div class="achievement-toast__icon">${e.emoji||"🏅"}</div>
      <div class="achievement-toast__body">
        <div class="achievement-toast__title">成就解锁!</div>
        <div class="achievement-toast__name">${$r(e.name||"")}</div>
        ${e.desc?`<div class="achievement-toast__desc">${$r(e.desc)}</div>`:""}
      </div>
    `,document.body.appendChild(n),requestAnimationFrame(()=>{n.classList.add("show")}),setTimeout(()=>{n.classList.remove("show"),n.classList.add("hide"),setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n)},500)},i)}}function $r(s){return s==null?"":String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ic(s){return String(s).replace(/[^a-zA-Z0-9_-]/g,"_")}class rc{constructor(e){this.stage=e,this.canvas=null,this.ctx=null,this.analyser=null,this.dataArray=null,this._running=!1}init(e){if(!(!e||!e._webAudio))try{this.analyser=e._webAudio.createAnalyser(),this.analyser.fftSize=256,e._masterGain.connect(this.analyser),this.dataArray=new Uint8Array(this.analyser.frequencyBinCount)}catch{}}show(){this.hide()}hide(){this._running=!1,this.canvas&&this.canvas.parentNode&&(this.canvas.parentNode.removeChild(this.canvas),this.canvas=null)}_loop(){if(!this._running||!this.canvas||(requestAnimationFrame(()=>this._loop()),!this.analyser))return;this.analyser.getByteTimeDomainData(this.dataArray);const e=this.canvas.width,t=this.canvas.height;this.ctx.clearRect(0,0,e,t),this.ctx.strokeStyle="rgba(255, 209, 102, 0.5)",this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(0,t/2),this.ctx.lineTo(e,t/2),this.ctx.stroke(),this.ctx.lineWidth=2,this.ctx.strokeStyle="#ffd166",this.ctx.beginPath();const i=e/this.dataArray.length;let r=0;for(let n=0;n<this.dataArray.length;n++){const o=this.dataArray[n]/128*t/2;n===0?this.ctx.moveTo(r,o):this.ctx.lineTo(r,o),r+=i}this.ctx.stroke()}}class Dr{constructor(e){this.root=e,this.render()}render(){const e=document.createElement("div");e.className="bg atelier-bg",e.innerHTML=`
      <svg class="atelier-bg__art" viewBox="0 0 1024 600" preserveAspectRatio="xMidYMax slice" xmlns="${oe}" aria-hidden="true">
        <defs>
          <linearGradient id="atelier-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#dce9df"/>
            <stop offset="0.52" stop-color="#b8d1c6"/>
            <stop offset="1" stop-color="#719aa0"/>
          </linearGradient>
          <linearGradient id="atelier-water" x1="0" y1="0" x2="0.9" y2="1">
            <stop offset="0" stop-color="#94c4c4"/>
            <stop offset="0.5" stop-color="#669ba2"/>
            <stop offset="1" stop-color="#385d68"/>
          </linearGradient>
          <linearGradient id="atelier-wood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#79563c"/>
            <stop offset="0.55" stop-color="#533a2f"/>
            <stop offset="1" stop-color="#30272a"/>
          </linearGradient>
          <filter id="atelier-soft-shadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#213f46" flood-opacity=".22"/>
          </filter>
          <filter id="atelier-paper-grain" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="2" seed="11"/>
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 .08 0"/>
          </filter>
        </defs>
        <rect width="1024" height="600" fill="url(#atelier-sky)"/>
        <!-- 远景纸雕山脊 -->
        <path d="M0 238 C110 174 190 208 280 166 S450 176 536 132 S720 170 824 126 S950 168 1024 142 V360 H0Z" fill="#9ebdaf" opacity=".55"/>
        <path d="M0 302 C120 246 208 274 306 226 S490 260 594 206 S770 252 876 210 S970 232 1024 218 V410 H0Z" fill="#789b91" opacity=".72"/>
        <!-- 左上工坊光 -->
        <path d="M0 0 H410 Q300 118 250 278 Q118 238 0 262Z" fill="#fff8e8" opacity=".18"/>
        <circle cx="160" cy="104" r="90" fill="#f7dfad" opacity=".16"/>
        <!-- 木质近岸 -->
        <path d="M0 398 C160 362 260 406 380 382 S620 370 744 396 S910 362 1024 388 V480 H0Z" fill="url(#atelier-wood)" opacity=".9" filter="url(#atelier-soft-shadow)"/>
        <path d="M0 414 C140 382 262 424 386 402 S610 392 760 414 S920 390 1024 406" fill="none" stroke="#a67d55" stroke-width="3" opacity=".38"/>
        <path d="M0 430 C150 402 260 444 390 420 S610 414 760 434 S910 414 1024 426" fill="none" stroke="#2b2530" stroke-width="2" opacity=".34"/>
        <!-- 河玻璃 -->
        <path d="M0 448 C150 420 280 466 412 442 S660 430 780 458 S920 438 1024 450 V600 H0Z" fill="url(#atelier-water)"/>
        <path d="M0 480 C140 460 270 496 410 474 S650 468 790 490 S920 472 1024 482" fill="none" stroke="#d8f0e6" stroke-width="3" opacity=".42"/>
        <path d="M0 522 C160 500 280 536 430 516 S670 506 820 532 S930 514 1024 520" fill="none" stroke="#d8f0e6" stroke-width="2" opacity=".25"/>
        <!-- 手工木桩剪影 -->
        <g fill="#3c3030" opacity=".82">
          <path d="M94 415 V250 Q116 220 138 250 V415Z"/>
          <path d="M70 282 Q116 228 162 282 Q146 272 116 276 Q88 272 70 282Z"/>
          <path d="M884 410 V236 Q908 206 932 236 V410Z"/>
          <path d="M850 270 Q908 202 966 270 Q940 256 908 262 Q876 256 850 270Z"/>
        </g>
        <!-- 克制的水面反光，不使用持续发光粒子 -->
        <g class="atelier-bg__ripples" fill="none" stroke="#f4f0dc" stroke-linecap="round">
          <path d="M118 510 q45 -13 90 0" opacity=".38" stroke-width="3"/>
          <path d="M690 548 q58 -16 116 0" opacity=".3" stroke-width="3"/>
          <path d="M360 570 q34 -9 68 0" opacity=".24" stroke-width="2"/>
        </g>
        <rect width="1024" height="600" filter="url(#atelier-paper-grain)" opacity=".32"/>
      </svg>
      <div class="atelier-bg__vignette" aria-hidden="true"></div>
    `,this.root.appendChild(e),this.layer=e}}class nc{constructor(e,t={}){this.root=e,this.opts=t||{},this.audio=t.audio||null,this.defaultHint=t.hint||"我帮你找五线谱位置~ 点我一下试试",this.hintTimer=null,this.waveTimer=null,this.sleepTimer=null,this._render(),this._wireInteractions(),this._startIdleLoop(),setTimeout(()=>this.setHint(this.defaultHint),600)}_render(){const e=document.createElement("div");e.className="pip",e.innerHTML=`
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
    `,this.root.appendChild(e),this.element=e,this.bubble=e.querySelector(".pip-speech-bubble"),this.tapTarget=e.querySelector(".pip-tap")}_wireInteractions(){const e=t=>{t.preventDefault?.(),t.stopPropagation?.(),this.react("chip"),this._chirp()};this.tapTarget.addEventListener("click",e),this.tapTarget.addEventListener("touchstart",e,{passive:!1})}_startIdleLoop(){const e=()=>{const t=8e3+Math.random()*6e3;this.waveTimer=setTimeout(()=>{this.react("wave"),e()},t)};e()}react(e){if(!this.element||this.element.classList.contains(`pip-${e}`))return;this.element.classList.add(`pip-${e}`);const t={wave:900,cheer:700,chip:600,sleep:3e3,think:4e3}[e]||700;setTimeout(()=>{this.element.classList.remove(`pip-${e}`)},t)}setHint(e,t=3200){if(this.bubble){if(this.hintTimer&&(clearTimeout(this.hintTimer),this.hintTimer=null),e)this.bubble.textContent=e,this.bubble.classList.add("show");else{this.bubble.classList.remove("show");return}this.hintTimer=setTimeout(()=>{this.bubble.classList.remove("show"),this.hintTimer=null},t)}}_chirp(){if(this.audio){try{this.audio.hover()}catch{}return}try{const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this._ctx||(this._ctx=new e);const t=this._ctx,i=t.currentTime,r=t.createOscillator(),n=t.createGain();r.type="triangle",r.frequency.setValueAtTime(900,i),r.frequency.exponentialRampToValueAtTime(600,i+.12),n.gain.setValueAtTime(.001,i),n.gain.exponentialRampToValueAtTime(.22,i+.02),n.gain.exponentialRampToValueAtTime(.001,i+.18),r.connect(n).connect(t.destination),r.start(i),r.stop(i+.2)}catch{}}destroy(){if(this.waveTimer&&clearTimeout(this.waveTimer),this.sleepTimer&&clearTimeout(this.sleepTimer),this.hintTimer&&clearTimeout(this.hintTimer),this._ctx){try{this._ctx.close()}catch{}this._ctx=null}this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}}const Or={map:'<path d="M4 6.5 10 4l6 2.5L22 4v13.5L16 20l-6-2.5L4 20Z"/><path d="M10 4v13.5M16 6.5V20"/>',sound:'<path d="M4 10v4h4l5 4V6l-5 4Z"/><path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7.5 7.5 0 0 1 0 10"/>',muted:'<path d="M4 10v4h4l5 4V6l-5 4Z"/><path d="m18 10 4 4m0-4-4 4"/>',replay:'<path d="M20 11a8 8 0 1 0 1 5"/><path d="M20 5v6h-6"/>',music:'<path d="M9 18V6l10-2v12"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/>',home:'<path d="m4 11 8-7 8 7v8H4Z"/><path d="M9 19v-5h6v5"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.1h-2.6v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6v-2.6h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5V5h2.6v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v2.6h-.1a1.7 1.7 0 0 0-1.5 1Z"/>',trophy:'<path d="M8 4h8v4a4 4 0 0 1-8 0Z"/><path d="M8 6H5v2a3 3 0 0 0 3 3M16 6h3v2a3 3 0 0 1-3 3M12 12v5M8 20h8M9 17h6"/>',chart:'<path d="M5 19V9M12 19V5M19 19v-7"/><path d="M3 19h18"/>',piano:'<rect x="4" y="5" width="16" height="14" rx="2"/><path d="M8 5v9M12 5v9M16 5v9M6 14h12"/>',song:'<path d="M8 18V5l10-2v12"/><circle cx="5" cy="18" r="3"/><circle cx="15" cy="16" r="3"/>',book:'<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21Z"/><path d="M4 5.5v15M8 7h8M8 11h8"/>',palette:'<circle cx="12" cy="12" r="9"/><circle cx="8" cy="10" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="15" cy="8" r="1"/><path d="M17 14c-3-1-5 3-2 5"/>'};function Ae(s,e=""){const t=Or[s]||Or.music;return`<svg class="atelier-icon ${e}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${t}</svg>`}function Ct(s,e){s&&(s.innerHTML=Ae(e))}const Rr="forest-piano-last-level",ki=[{range:[1,4],name:"潮池启蒙",desc:"听见第一束回声",material:"river"},{range:[5,8],name:"月光航线",desc:"沿着灯塔读谱",material:"moon"},{range:[9,12],name:"深林工坊",desc:"触摸节奏机关",material:"workshop"},{range:[13,16],name:"回声高塔",desc:"抵达音乐之巅",material:"tower"}];function lc(s){return ki.find(({range:e})=>s>=e[0]&&s<=e[1])||ki[0]}function oc(s){return Array.from({length:3},(e,t)=>`<span class="route-star ${t<s?"is-earned":""}" aria-hidden="true"></span>`).join("")}const Os=[{id:1,name:"音符归航",emoji:"🐟",desc:"让七枚音色贝灵回到乐谱台",theme:"#5fa8b5",mechanic:"drag-up"},{id:2,name:"回声寻音",emoji:"🎵",desc:"听见声音，找到回应它的贝灵",theme:"#264653",mechanic:"listen-pick"},{id:3,name:"五音山谷",emoji:"🏔️",desc:"先听声音，再走上高低不同的山",theme:"#e76f51",mechanic:"mountain-sort"},{id:4,name:"潮汐鼓点",emoji:"🥁",desc:"等回声抵达鼓面，再轻轻敲下",theme:"#1a3a4a",mechanic:"drum-rhythm"},{id:5,name:"灯塔视奏",emoji:"⭐",desc:"沿着月光航线弹出第一段旋律",theme:"#2a2050",mechanic:"staff-fall"},{id:6,name:"双手灯塔",emoji:"🎹",desc:"让两束灯光同时亮起",theme:"#d4a574",mechanic:"two-hand"},{id:7,name:"音阶树屋",emoji:"🌳",desc:"用七个声音铺出上行阶梯",theme:"#65a30d",mechanic:"treehouse-build"},{id:8,name:"月湾音乐会",emoji:"🎭",desc:"在月光甲板演奏一首歌",theme:"#3d0a55",mechanic:"concert-stage"},{id:9,name:"黑曜琴键",emoji:"🖤",desc:"探索深林工坊里的黑键矿晶",theme:"#2a0a55",mechanic:"black-keys"},{id:10,name:"上下回声",emoji:"🎹",desc:"分辨来自低处还是高处的声音",theme:"#1e3a5f",mechanic:"octave-pick"},{id:11,name:"贝壳记忆",emoji:"🎴",desc:"翻开成对的音色印记",theme:"#d96e8a",mechanic:"memory-match"},{id:12,name:"工坊节拍",emoji:"🥁",desc:"看摆杆抵达中心，再切下节拍",theme:"#c0392b",mechanic:"tempo-cut"},{id:13,name:"回声加速",emoji:"⏱️",desc:"在风铃塔下追随越来越快的节拍",theme:"#8b4513",mechanic:"metronome-tap"},{id:14,name:"和弦铸造",emoji:"🎶",desc:"把三个声音铸成一枚和弦",theme:"#9b5de5",mechanic:"chord-build"},{id:15,name:"星图读谱",emoji:"🎼",desc:"读懂高塔投下的音乐星图",theme:"#457b9d",mechanic:"staff-read"},{id:16,name:"极光阶梯",emoji:"🚀",desc:"登上回声高塔的最后一层",theme:"#f4a261",mechanic:"speed-ramp"}];class ac{constructor(e,{progress:t,onSelect:i}){this.stage=e,this.progress=t,this.onSelect=i,this.element=null}show(){const e=document.createElement("div");e.className="level-map-overlay atelier-route-overlay";const t=ki.map((r,n)=>{const l=Os.filter(o=>lc(o.id)===r);return`
        <section class="route-chapter route-chapter--${r.material}" aria-labelledby="chapter-${n}">
          <header class="route-chapter__header">
            <span class="route-chapter__index">0${n+1}</span>
            <div>
              <h2 id="chapter-${n}">${r.name}</h2>
              <p>${r.desc}</p>
            </div>
            <span class="route-chapter__mark" aria-hidden="true"></span>
          </header>
          <div class="route-nodes">
            ${l.map((o,a)=>{const d=this.progress?this.progress.getStars(o.id):0;return`
                <button class="route-node route-node--${r.material}" data-id="${o.id}" style="--node-accent:${o.theme}; --node-index:${a}" aria-label="第 ${o.id} 关：${o.name}">
                  <span class="route-node__halo" aria-hidden="true"></span>
                  <span class="route-node__seal" aria-hidden="true"><span>${String(o.id).padStart(2,"0")}</span></span>
                  <span class="route-node__copy">
                    <strong>${o.name}</strong>
                    <small>${o.desc}</small>
                  </span>
                  <span class="route-node__stars">${oc(d)}</span>
                </button>
              `}).join("")}
          </div>
        </section>
      `}).join("");e.innerHTML=`
      <div class="atelier-route-atmosphere" aria-hidden="true">
        <span class="atelier-route-atmosphere__mist"></span>
        <span class="atelier-route-atmosphere__light"></span>
      </div>
      <div class="level-map-card atelier-route-card">
        <header class="atelier-route-card__masthead">
          <div class="atelier-route-card__sigil" aria-hidden="true">${Ae("piano")}</div>
          <div>
            <p class="atelier-route-card__eyebrow">PIP 的森林制琴工坊</p>
            <h1>回声航线</h1>
            <p class="atelier-route-card__intro">每弹响一个音，森林就多一束光。</p>
          </div>
        </header>
        <div class="atelier-route-scroll">${t}</div>
        <footer class="atelier-route-card__footer">选择一枚航标，开始今天的音乐工坊。</footer>
      </div>
    `,this.stage.appendChild(e),this.element=e;let i=1;try{const r=parseInt(localStorage.getItem(Rr),10);Number.isFinite(r)&&r>=1&&r<=Os.length&&(i=r)}catch{}if(i>1){const r=document.createElement("button");r.className="continue-btn atelier-continue",r.type="button",r.innerHTML=`${Ae("replay")}<span>继续航行 · 第 ${i} 关</span>`,r.addEventListener("click",()=>{this.hide(),this.onSelect?.(i)}),e.querySelector(".atelier-route-card__masthead").appendChild(r)}e.querySelectorAll(".route-node").forEach(r=>{r.addEventListener("click",()=>{const n=parseInt(r.dataset.id,10);r.classList.add("is-selected");try{localStorage.setItem(Rr,String(n))}catch{}setTimeout(()=>this.onSelect?.(n),160)})})}hide(){this.element?.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null)}}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.LEVEL_META=Os);const cc=Object.assign({"./Level1.js":Qn,"./Level10.js":wo,"./Level11.js":Ao,"./Level12.js":No,"./Level13.js":Fo,"./Level14.js":Vo,"./Level15.js":Xo,"./Level16.js":sa,"./Level2.js":ra,"./Level3.js":_a,"./Level4.js":xa,"./Level5.js":Ca,"./Level6.js":Da,"./Level7.js":Ha,"./Level8.js":za,"./Level9.js":Ua}),Rs=new Map;for(const[s,e]of Object.entries(cc)){const t=s.match(/Level(\d+)\.js$/);t&&typeof e.default=="function"&&Rs.set(parseInt(t[1],10),e.default)}typeof window<"u"&&(window.__forestPiano=window.__forestPiano||{},window.__forestPiano.levels=Rs);const ue=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],Nr=["真棒!","太厉害了~","不错哟!","加油加油!","马上就完成了!"];function dc(s,e,t,i){const r=Nr[Math.floor(Math.random()*Nr.length)],n=Math.max(0,t-e),l=[`${s} 归位啦! ${r} 还有 ${n} 条~`,`${s} 找到家啦! 🎉 还差 ${n} 条就胜利~`,`耶! ${s} 也安顿好了~ 再来 ${n} 条!`];return i>=3&&(l.push(`没关系, ${s} 归位啦! 还剩 ${n} 条, 慢慢来~`),l.push(`慢慢来, ${s} 已经回家了! 还有 ${n} 条小鱼需要帮忙~`)),n===1?l.push(`${s} 也到家啦! 只剩最后 1 条小鱼咯! ⭐`):n===2&&l.push(`${s} 找到家啦! 再坚持一下, 还有 2 条~`),l[Math.floor(Math.random()*l.length)]}function uc(s,e){if(!s||s.length===0)return"试试别的鱼, 一条一条来~";const t=Math.floor(Math.random()*s.length),i=s[t],r=["最下面那条加线","加线上面那个间","最下面那条线 (si 隔壁)","往上数第 2 条线","往中间数的那个间","中间那条线 (la 隔壁)","中间上面那条线"],l=["mi","fa","sol","la","si","re","do"].indexOf(i.id),o=l>=0?r[l]:"五线谱上的位置",a=[`试试把 ${i.solfege} 拖到 ${o}~`,`${i.solfege} 的家在 ${o} 哦~ 🌟`,`这条 ${i.solfege} 小鱼呢? 它的家在 ${o}!`,`${i.solfege} 的家在 ${o} ✨ 帮它找找~`];return e>=4&&(a.push(`别着急~ 先听 ${i.solfege} 的声音, 再把它拖到 ${o} 上哦~`),a.push(`深呼吸! 把 ${i.solfege} 小心地拖到 ${o} ✨`)),a[Math.floor(Math.random()*a.length)]}class Hn{constructor({stageEl:e,bubbleEl:t,progress:i,audio:r}){os(this,"_lastWrongHint","");os(this,"_lastCorrectNote","");os(this,"_firstCorrectNote",null);this.stage=e,this.bubble=t,this.progress=i,this.audio=r,this.achievements=new tc(this.progress),this.placed=new Set,this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this.gate=!1,this._lastActivityAt=0,this._idleNudgeScheduled=!1,this._hintTimer=null,this.waveform=new rc(this.stage),this.waveform.init(this.audio),this.waveform.show()}start({levelId:e}){if(this.currentLevelId=e,document.querySelectorAll(".overlay, .level-map-overlay, .practice-room, .song-library, .song-demo-overlay, .song-play-overlay, .song-score-overlay, .achievements-wall, .settings-panel, .tutorial, .keyboard-help, .streak-toast").forEach(i=>i.remove()),typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.fishPool&&typeof this.fishPool.destroy=="function")try{this.fishPool.destroy()}catch{}if(this.audio&&typeof this.audio.stop=="function")try{this.audio.stop()}catch{}this.stage&&(this.stage.innerHTML=""),this.waveform&&typeof this.waveform.show=="function"&&this.waveform.show(),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this.firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.gate=!1,this._level2AnswerNote=null,this._level2Current=0,this._level2Done=new Set;const t=Rs.get(e);if(t){this._syncStageMode(e);try{const i=t(this);this._teardownCurrentLevel=typeof i=="function"?i:null}catch(i){console.error(`Level ${e} failed to start:`,i),this._syncStageMode(1),this._fallbackToLevel1()}this._updateLevelBadge(e);return}console.warn(`Level ${e} not registered, falling back to Level 1`),this._syncStageMode(1),this._startLevel1(),this._updateLevelBadge(1)}_syncStageMode(e){if(!this.stage)return;const t=e===1||e===2;this.stage.classList.toggle("stage--stack",t)}_updateLevelBadge(e){try{const t=document.getElementById("level-badge");if(!t)return;const i=Os.find(r=>r.id===e);i&&(t.innerHTML=`${Ae("map")}<span>航线地图 · 第 ${i.id} 关</span>`)}catch{}}_fallbackToLevel1(){const e=Rs.get(1)||this._startLevel1.bind(this);try{e(this)}catch(t){console.error(t)}}_startLevel1(){this._showLevel2HUD(!1),this._level1FirstTap=!1,this._lastTapTime=0,this.say("点屏幕开始呀～"),this.bg=new Dr(this.stage),this.staff=new ec(this.stage,ue),this.kb=new wt(this.stage,ue),this.fishPool=new $s(this.stage,ue),this.pip=new nc(this.stage),this.fishPool.setDragEnabled(!0),this.fishPool.onDrop=(e,t,i)=>this.onFishDrop(e,t,i),this.fishPool.onDragStart=e=>{this._markActivity(),this.hasStartedDrag||(this.hasStartedDrag=!0),this.audio.hover(e.dataset.id)},this.fishPool.onDragMove=(e,t)=>{if(this._markActivity(),!!this.staff)if(t){const i=t.dataset.id;this.staff.setTarget(i),this.staff.showHint(i)}else this.staff.clearTarget(),this.staff.clearHint()},this.fishPool.onTap=e=>{if(this._level1FirstTap){if(Date.now()-(this._lastTapTime||0)<250&&this._lastTapEl===e)return}else this._level1FirstTap=!0;this._lastTapTime=Date.now(),this._lastTapEl=e,this._markActivity(),this.hasTappedFish||(this.hasTappedFish=!0,this._advanceHint("first_tap"));try{this.audio.playNote(e.dataset.pitch)}catch{}try{this.audio.hover(e.dataset.id)}catch{}G.fromTo(e,{scale:1},{scale:1.18,duration:.16,yoyo:!0,repeat:1,ease:"power2.out"})},this.kb.onPress=e=>{this._markActivity(),this.audio.playNote(e.dataset.pitch),this.kb.glowKey(e)},this._skipStartOverlayOnce?(this._skipStartOverlayOnce=!1,this._beginLevel()):this._showStartOverlay()}_startLevel2(){this._showLevel2HUD(!0),this.say("第二关, 听音找鱼! 系统会播一个音, 找对的小鱼~"),this.bg=new Dr(this.stage),this.kb=new wt(this.stage,ue),this.fishPool=new $s(this.stage,ue),this.fishPool.setDragEnabled(!1),this._level2Total=5,this._level2Current=0,this._level2AnswerNote=null,this._level2Done=new Set,this.gate=!0,this._level2FirstTap=!1,this._lastTapTime=0,this.fishPool.onTap=t=>{if(this._markActivity(),!t)return;if(this._level2FirstTap){if(Date.now()-(this._lastTapTime||0)<250&&this._lastTapEl===t)return}else this._level2FirstTap=!0;this._lastTapTime=Date.now(),this._lastTapEl=t;const i=t.dataset.id;this._level2AnswerNote&&this._handleLevel2Answer(i,t)},this.fishPool.onDragStart=null,this.fishPool.onDragMove=null,this.fishPool.onDrop=null,this.kb.onPress=t=>{this._markActivity(),this.audio.playNote(t.dataset.pitch),this.kb.glowKey(t)};const e=document.getElementById("btn-replay-q");e&&(e.onclick=()=>this._replayQuestion()),this._updateHudProgress(),setTimeout(()=>this._level2NextQuestion(),800)}_handleLevel2Answer(e,t){if(e===this._level2AnswerNote){try{this.audio.correct()}catch{}this._markLevel2FishCorrect(t);const i=ue.find(r=>r.id===e);this._floatScore(window.innerWidth/2,window.innerHeight/2,(i?i.solfege:"")+" ✓"),this.say(`对啦! 这就是 ${i?i.solfege:""} 🎉`),this._level2AnswerNote=null,setTimeout(()=>this._level2NextQuestion(),1600)}else{this.wrongCount++;try{this.audio.wrong()}catch{}t.classList.add("shake"),setTimeout(()=>t.classList.remove("shake"),400),this.say(`刚才听到的是 ${this._lastPlayedSolfege}, 再找找看? 🎵`),this._replayQuestion()}}_level2NextQuestion(){if(this._level2Current++,this._level2Current>this._level2Total)return this._handleLevel2Win();const e=this._level2Done||new Set,t=ue.filter(n=>!e.has(n.id)),i=t.length?t:ue,r=i[Math.floor(Math.random()*i.length)];this._level2AnswerNote=r.id,this._lastPlayedSolfege=r.solfege,this._updateLevel2HUD(),this.say("听一听, 哪条小鱼是这个音? 🎵");try{this.audio.playNote(r.pitch)}catch{}}_replayQuestion(){if(!this._level2AnswerNote)return;const e=ue.find(t=>t.id===this._level2AnswerNote);if(e)try{this.audio.playNote(e.pitch)}catch{}}_markLevel2FishCorrect(e){this._level2Done||(this._level2Done=new Set),this._level2Done.add(e.dataset.id),e.classList.add("fish--correct"),e.style.pointerEvents="none",this._updateHudProgress()}_updateLevel2HUD(){this._updateHudProgress()}_updateHudProgress(){const e=this._level2Done?this._level2Done.size:0,t=this._level2Total||5,i=document.getElementById("level2-badge");i&&(i.textContent=`第 ${e} / ${t} 题`);const r=document.getElementById("btn-replay-q");r&&(r.style.display=this._level2Current<=t?"":"none")}_handleLevel2Win(){this.gate=!1,this._clearHintTimer();const e=this._calcStars();try{this.progress.markLevelComplete(2,e)}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}try{Yt.celebrate()}catch{}setTimeout(()=>this.showWinOverlay(e,2),1200)}_showLevel2HUD(e){const t=document.getElementById("hud-level2");t&&(t.style.display=e?"":"none");const i=document.querySelector(".hud__dots");i&&(i.style.display=e?"none":"");const r=document.getElementById("btn-replay");r&&(r.style.display=e?"none":"")}_showStartOverlay(){document.querySelectorAll(".overlay").forEach(i=>i.remove());const e=document.getElementById("hud-level2");e&&(e.style.display="none");const t=new ac(this.stage,{progress:this.progress,onSelect:i=>{this.audio.unlockOnGesture().catch(r=>console.warn(r)),t.hide(),this._skipStartOverlayOnce=!0,this.start({levelId:i})}});t.show()}goHome(){try{this.audio.stop()}catch{}if(typeof this._teardownCurrentLevel=="function"){try{this._teardownCurrentLevel()}catch{}this._teardownCurrentLevel=null}if(this.fishPool&&typeof this.fishPool.destroy=="function"){try{this.fishPool.destroy()}catch{}this.fishPool=null}document.querySelectorAll(".overlay, .level-map-overlay, .practice-room, .song-library, .song-demo-overlay, .song-play-overlay, .song-score-overlay, .achievements-wall, .settings-panel, .tutorial, .keyboard-help, .streak-toast").forEach(i=>i.remove()),this.stage&&(this.stage.innerHTML=""),this.stage&&this.stage.classList.remove("stage--stack"),this._showLevel2HUD(!1);const e=document.querySelector(".hud__dots");e&&(e.style.display="");const t=document.getElementById("btn-replay");if(t&&(t.style.display=""),this.placed.clear(),this.wrongCount=0,this.gate=!1,this._clearHintTimer(),typeof window<"u")try{window.__forestPiano.currentLevelId=null}catch{}this._showStartOverlay()}_beginLevel(){this.gate=!0,this._markActivity(),this.say("欢迎来到森林!🐤 点点小鱼, 听听它们的声音~"),this.fishPool.intro(),this._pulseStaff(),this._enterHint("intro")}_pulseStaff(){if(!this.staff||!this.staff.svg)return;this.staff.svg.querySelectorAll(".staff-slot").forEach((t,i)=>{setTimeout(()=>{t.classList.add("pulse-hint"),setTimeout(()=>t.classList.remove("pulse-hint"),2400)},i*100)})}_markActivity(){this._lastActivityAt=Date.now()}_clearHintTimer(){this._hintTimer&&(clearTimeout(this._hintTimer),this._hintTimer=null)}_enterHint(e){if(!this.bubble)return;this._clearHintTimer();let t="";switch(e){case"intro":t="先把手指放在小鱼上, 听听它唱的啥 🎵",this._scheduleIdleNudge(12e3,"idle_1");break;case"hint_listen":t="先随便摸一条鱼听听它的声音吧~ 🐟",this._scheduleIdleNudge(14e3,"idle_1");break;case"first_tap":t="听到了吗? 这种声音在钢琴上也有哦! 🎹",this._scheduleIdleNudge(1e4,"idle_drag");break;case"hint_drag":t="试试长按这条鱼, 拖到上面五线谱 Do 的位置~",this._scheduleIdleNudge(1e4,"idle_drag");break;case"first_correct":{const i=this._placedOnText(this.firstCorrectNote),r=ue.length-1,n=[`${i} 找到家啦! 还有 ${r} 个要帮~`,`耶! ${i} 归位! 🎉 还有 ${r} 条小鱼等着你呢~`,`真棒! ${i} 已经回到五线谱啦! 还差 ${r} 条~`];t=n[Math.floor(Math.random()*n.length)],this._scheduleIdleNudge(12e3,"idle_keep_going");break}case"correct_subsequent":{const i=this._lastCorrectNote;t=dc(i,this.placed.size,ue.length,this.wrongCount),this._scheduleIdleNudge(14e3,"idle_keep_going");break}case"wrong_drop_near":{const i=this._lastWrongHint||"呀, 试试上面那个颜色一样的位置!";t=this.wrongCount>=2?`没关系的! ${i}`:i,this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"wrong_drop_far":{const i=["不对哟~ 拖到上面那条五线谱的家 ✨","鱼还在游呢! 帮它回到上面五线谱的家吧~","呀, 再往上一点! 五线谱在上面等着呢~"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(8e3,"idle_keep_going");break}case"idle_keep_going":{const i=ue.filter(r=>!this.placed.has(r.id));t=uc(i,this.wrongCount),this._scheduleIdleNudge(12e3,"idle_hard");break}case"idle_hard":{const i=["先听一首钢琴曲怎么样? 试试底下的钢琴键吧! 🎹","需要休息吗? 听听其它音乐, 等下再来! 🎵","先随便摸鱼听听声音, 找找感觉再继续! 🐟"];t=i[Math.floor(Math.random()*i.length)],this._scheduleIdleNudge(2e4,"idle_give_up");break}case"win":return;default:t=e}this.say(t),this.bubble.classList.remove("bubble--pulse"),this.bubble.offsetWidth,this.bubble.classList.add("bubble--pulse")}_advanceHint(e){switch(e){case"first_tap":this._hintTimer=setTimeout(()=>this._enterHint("hint_drag"),4500);break;case"first_correct":this._enterHint("first_correct");break;case"subsequent_correct":this._enterHint("correct_subsequent");break}}_scheduleIdleNudge(e,t){this._idleNudgeScheduled||(this._clearHintTimer(),this._hintTimer=setTimeout(()=>{if(t==="idle_1"&&!this.hasTappedFish||t==="idle_drag"&&!this.hasStartedDrag||t==="idle_keep_going"&&this.placed.size<ue.length||t==="idle_hard"){this._idleNudgeScheduled=!1,this._enterHint(t);return}},e),this._idleNudgeScheduled=!0)}_placedOnText(e){const t=ue.find(i=>i.id===e);return t?t.solfege:"小鱼"}onFishDrop(e,t,i){this.gate&&(this._markActivity(),i&&t?this.handleCorrect(e,t):this.handleWrong(e,t))}handleCorrect(e,t){const i=e.dataset.id;if(this.placed.has(i))return;this.placed.add(i);try{this.fishPool.lockFish(i)}catch{}this._lastCorrectNote=this._placedOnText(i);const r=this.firstCorrectNote===null||this.firstCorrectNote===void 0;r&&(this.firstCorrectNote=i);const n=t.getBoundingClientRect(),l=this.fishPool.root.getBoundingClientRect(),o=n.left-l.left+n.width/2,a=n.top-l.top+n.height/2,d=parseFloat(e.style.left)||0,c=parseFloat(e.style.top)||0,_=o-d-e.offsetWidth/2,h=a-c-e.offsetHeight/2;G.to(e,{x:_,y:h,scale:.85,duration:.5,ease:"back.out(1.7)",onComplete:()=>{try{this.staff.flashFill(i)}catch{}try{this.staff.fillNote(i)}catch{}try{this.staff.clearTarget()}catch{}const m=this.kb&&this.kb.svg?this.kb.svg.querySelector(`.key--white[data-id="${i}"]`):null;if(m){try{this.kb.glowKey(m)}catch{}try{this.audio.playNote(m.dataset.pitch)}catch{}}try{this.audio.correct()}catch{}const g=(ue.find(y=>y.id===i)||{}).color||"#ffc971";this.burst(n.left+n.width/2,n.top+n.height/2,g);try{Yt.burst({x:n.left+n.width/2,y:n.top+n.height/2,color:"#fff8ec",count:10,spread:70,startVelocity:18})}catch{}try{this.kb.markPlaced(i,g)}catch{}this._flashScreen();const u=ue.find(y=>y.id===i);if(u){this._floatScore(n.left+n.width/2,n.top,`${u.solfege} +1`);try{this.audio.playNote(u.pitch)}catch{}}G.to(e,{rotation:"+=8",transformOrigin:"50% 50%",duration:.12,yoyo:!0,repeat:5,ease:"sine.inOut",onComplete:()=>G.to(e,{rotation:0,duration:.2,ease:"power2.out"})}),G.fromTo(e,{scale:.85},{scale:1.05,duration:.18,yoyo:!0,repeat:1,ease:"power2.out"}),this.addStar(),r?this._advanceHint("first_correct"):this._advanceHint("subsequent_correct"),this.placed.size===ue.length&&setTimeout(()=>this.handleWin(),600)}})}handleWrong(e,t){this.wrongCount++;try{this.audio.wrong()}catch{}this.staff&&(this.staff.clearHint(),this.staff.clearTarget()),e.classList.add("shake"),setTimeout(()=>e.classList.remove("shake"),400),G.to(e,{x:0,y:0,duration:.55,ease:"elastic.out(1, 0.5)"});const i=e.dataset.id,r=ue.find(n=>n.id===i);t?(this._lastWrongHint=`${r?r.solfege:"这条鱼"} 的家在上面, 看看五线谱上的唱名哦~`,this._enterHint("wrong_drop_near")):(this._lastWrongHint="把鱼拖到上面五线谱的圆圈里~",this._enterHint("wrong_drop_far"))}_calcStars(){return this.wrongCount<=0?3:this.wrongCount<=2?2:this.wrongCount<=5?1:0}applyFinalStars(){return this._calcStars()}handleWin(){this.gate=!1,this._clearHintTimer();const e=this.applyFinalStars();try{this.progress.markLevelComplete(1,e)}catch{}try{this.kb.glowAll()}catch{}try{this.audio.playScale(["C4","D4","E4","F4","G4","A4","B4"])}catch{}Yt.celebrate(),setTimeout(()=>this.showWinOverlay(e,1),1800)}addStar(){const e=document.querySelectorAll("#hud-dots .dot"),t=this.placed.size-1;t>=0&&t<e.length&&(e[t].classList.remove("on"),e[t].offsetWidth,e[t].classList.add("on"))}showWinOverlay(e,t=1){if(document.querySelectorAll(".overlay").forEach(y=>y.remove()),this.achievements)try{this.achievements.checkAndUnlock().forEach((p,f)=>{setTimeout(()=>{try{sc.show(p)}catch{}},1500+f*800)})}catch{}const i=[0,1,2].map(y=>`<span class="win-star ${y<e?"on":""}">${y<e?"⭐":"☆"}</span>`).join(""),r=this.wrongCount,n=t===1,l=t===2,o=`🎉 第 ${t} 关完成!`,a=n?"你已经认识了 Do Re Mi Fa Sol La Si":l?"你的耳朵越来越灵啦! 听音找鱼全对~":"太棒了! 继续下一关，森林里的新挑战正在等你~",d=l?this._level2Total||5:n?ue.length:"✓",c=l?"答对题数":n?"正确放置":"关卡挑战",_=document.createElement("div");_.className="overlay",_.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">${o}</div>
        <div class="win-stars">${i}</div>
        <p class="overlay__text">${a}</p>

        <div class="win-stats">
          <div class="win-stat ${r===0?"good":r<=2?"ok":r<=5?"meh":"bad"}">
            <span class="win-stat__icon">${r===0?"✨":"✋"}</span>
            <span class="win-stat__label">${r===0?"零错误":"错误尝试"}</span>
            <span class="win-stat__value">${r===0?"0 次":r+" 次"}</span>
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
    `,document.body.appendChild(_);const h=_.querySelector("#win-share-btn");h&&(h.onclick=async()=>{try{const{Share:y}=await it(async()=>{const{Share:f}=await import("./Share-NpmDPAfe.js");return{Share:f}},[],import.meta.url),p=new y(this);_.style.display="none",p.showShareMenu({levelId:t,stars:e,wrongCount:this.wrongCount,totalQuestions:t===2?this._level2Total||5:7},()=>{_.style.display=""})}catch(y){console.warn("[share] 打开分享菜单失败:",y)}});const m=_.querySelector("#next-btn");if(t<16){const y=t+1;m.textContent=`第 ${y} 关 ›`,m.onclick=()=>{_.remove(),this.say(`第 ${y} 关马上来...`),this.start({levelId:y})}}else m.textContent="🎉 全部完成",m.onclick=()=>{_.remove(),this._showAllDoneOverlay()};_.querySelector("#replay-btn").onclick=()=>{_.remove(),this._skipStartOverlayOnce=!0,this.start({levelId:t})};const u=_.querySelector("#achievements-btn");u&&(u.onclick=async()=>{try{const{AchievementsWall:y}=await it(async()=>{const{AchievementsWall:f}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:f}},[],import.meta.url);_.remove(),new y(document.body,{achievementSystem:this.achievements,onClose:()=>{this.showWinOverlay(e,t)}}).show()}catch(y){console.warn("[achievements] 打开成就墙失败:",y)}})}_showAllDoneOverlay(){document.querySelectorAll(".overlay").forEach(t=>t.remove());const e=document.createElement("div");e.className="overlay",e.innerHTML=`
      <div class="overlay__card">
        <div class="overlay__title">🌟 森林钢琴大师!</div>
        <div class="overlay__text">你完成了全部 16 关挑战!<br>从认识音符到节奏阶梯，真的太厉害啦~</div>
        <div class="overlay__btns">
          <button class="btn-secondary" id="map-btn">🗺️ 回关卡地图</button>
          <button class="btn-primary" id="replay-btn">↻ 再玩一次 (第 1 关)</button>
        </div>
      </div>
    `,document.body.appendChild(e),e.querySelector("#map-btn").onclick=()=>{e.remove(),this.goHome()},e.querySelector("#replay-btn").onclick=()=>{e.remove(),this._skipStartOverlayOnce=!0,this.start({levelId:1})}}_correctnessComment(e){return e===3?"全对! 你真是个钢琴小天才 ⭐":e===2?"不错! 错一点点, 离完美不远了~":e===1?"完成了! 多练几次就能满分啦~":"没关系, 再来一次一定行!"}restartLevel(){const e=this.currentLevelId||window.__forestPiano?.currentLevelId||1;if(e>2){this._skipStartOverlayOnce=!0,this.start({levelId:e});return}document.querySelectorAll(".overlay").forEach(t=>t.remove()),this._showLevel2HUD(!1),this.placed.clear(),this.wrongCount=0,this.hasTappedFish=!1,this.hasStartedDrag=!1,this._firstCorrectNote=null,this._lastCorrectNote="",this._lastWrongHint="",this._clearHintTimer(),this._idleNudgeScheduled=!1,this.kb&&this.kb.resetMarks(),this.staff&&this.staff.reset(),this.fishPool&&this.fishPool.reset(),document.querySelectorAll("#hud-dots .dot").forEach(t=>{t.classList.remove("on")}),this._beginLevel()}burst(e,t,i){Yt.burst({x:e,y:t,color:i})}_flashScreen(){const e=document.createElement("div");e.className="screen-flash",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>e.remove(),300)},50)}_floatScore(e,t,i){const r=document.createElement("div");r.className="score-float",r.textContent=i,r.style.left=`${e}px`,r.style.top=`${t}px`,document.body.appendChild(r),setTimeout(()=>r.remove(),1400)}say(e){this.bubble&&(this.bubble.textContent=e)}}const Z={MASTER_GAIN_NORMAL:.75,MASTER_GAIN_MUTED:0,TEST_BEEP_PEAK:.6,PLAYNOTE_ATTACK:.65,PLAYNOTE_DECAY:.35,PLAYNOTE_RELEASE:.8,PLAYNOTE_HARMONIC_2:.15,PLAYNOTE_HARMONIC_3:.05,PLAYNOTE_HARMONIC_4:.03,PLAYNOTE_HARMONIC_5:.015,HOVER_PEAK:.35,CORRECT_PEAK:.55,WRONG_PEAK:.45,ARPEGGIO_DEFAULT_PEAK:.5,REVERB_BUS_GAIN:.18,REVERB_WET:1,REVERB_FEEDBACK:.4,REVERB_DELAY:.25,REVERB_SEND:.2,HAMMER_NOISE_PEAK:.15,HAMMER_NOISE_DURATION:.05,ADSR_ATTACK:.01,ADSR_DECAY:.15,ADSR_RELEASE:.85};class Fs{constructor(){this.unlocked=!1,this.muted=!1,this._webAudio=null,this._masterGain=null,this._bus=null,this._realPianoLoaded=!1,this._reverbBus=null,this._reverbDelay=null,this._activeOscillators=new Set,this._activeSources=new Set}_trackOsc(e,t){if(!e)return;this._activeOscillators.add(e);const i=()=>{try{this._activeOscillators.delete(e)}catch{}};e.onended=i}_trackSource(e){e&&(this._activeSources.add(e),e.onended=()=>{try{this._activeSources.delete(e)}catch{}})}stop(){if(!this._webAudio)return;const t=this._webAudio.currentTime;this._activeOscillators.forEach(i=>{try{i.disconnect()}catch{}try{i.stop(t)}catch{}}),this._activeOscillators.clear(),this._activeSources.forEach(i=>{try{i.stop(t)}catch{}try{i.disconnect()}catch{}}),this._activeSources.clear()}async unlockOnGesture(){if(!this.unlocked){console.log("[Audio] unlockOnGesture entered");try{const e=window.AudioContext||window.webkitAudioContext;if(!e){console.warn("[Audio] Web Audio API not supported");return}this._webAudio||(this._webAudio=new e,this._masterGain=this._webAudio.createGain(),this._masterGain.gain.value=Z.MASTER_GAIN_NORMAL,this._masterGain.connect(this._webAudio.destination),this._setupReverb())}catch(e){console.warn("[Audio] 创建 AudioContext 失败:",e);return}if(this._webAudio.state==="suspended")try{this._webAudio.resume(),console.log("[Audio] resume() fired, state will become running")}catch(e){console.warn("[Audio] resume() failed:",e)}try{const e=this._webAudio.createOscillator(),t=this._webAudio.createGain();t.gain.value=0,e.connect(t).connect(this._masterGain),e.start(),e.stop(this._webAudio.currentTime+.01),console.log("[Audio] silent osc started (unlocker)")}catch(e){console.warn("[Audio] silent osc failed:",e)}try{const e=this._webAudio.currentTime+.05,t=this._webAudio.createOscillator(),i=this._webAudio.createGain();t.type="sine",t.frequency.setValueAtTime(523.25,e),i.gain.setValueAtTime(1e-4,e),i.gain.exponentialRampToValueAtTime(Z.TEST_BEEP_PEAK,e+.01),i.gain.exponentialRampToValueAtTime(1e-4,e+.4),t.connect(i).connect(this._masterGain),t.start(e),t.stop(e+.45),console.log("[Audio] test tone scheduled at currentTime+0.05")}catch(e){console.warn("[Audio] test tone schedule failed:",e)}try{const e=new Fs;e.src="data:audio/mp3;base64,//uQx",e.play().catch(()=>{})}catch{}this.unlocked=!0,this._loadPianoInBackground(),console.log("[Audio] unlocked! state=",this._webAudio.state)}}_resumeWebAudio(){this._webAudio&&this._webAudio.state==="suspended"&&this._webAudio.resume().catch(()=>{})}playNote(e){if(!(!this.unlocked||this.muted)&&(this._playNoteWebAudio(e),this._realPianoLoaded&&this._realPiano&&this._realPiano.triggerAttackRelease))try{this._realPiano.triggerAttackRelease(e,"8n")}catch{}}_setupReverb(){if(!this._webAudio||this._reverbBus)return;const e=this._webAudio;this._reverbBus=e.createGain(),this._reverbBus.gain.value=Z.REVERB_BUS_GAIN,this._reverbDelay=e.createDelay(1),this._reverbDelay.delayTime.value=Z.REVERB_DELAY;const t=e.createGain();t.gain.value=Z.REVERB_FEEDBACK;const i=e.createGain();i.gain.value=Z.REVERB_WET,this._reverbBus.connect(this._reverbDelay),this._reverbDelay.connect(t),t.connect(this._reverbDelay),t.connect(i),i.connect(this._masterGain)}_playNoteWebAudio(e){if(!this._webAudio)return;this._resumeWebAudio();const t=this._webAudio,i=t.currentTime,n={C4:261.63,"C#4":277.18,D4:293.66,"D#4":311.13,E4:329.63,F4:349.23,"F#4":369.99,G4:392,"G#4":415.3,A4:440,"A#4":466.16,B4:493.88}[e];if(!n)return;const l=Math.floor(t.sampleRate*Z.HAMMER_NOISE_DURATION),o=t.createBuffer(1,l,t.sampleRate),a=o.getChannelData(0);for(let L=0;L<l;L++)a[L]=(Math.random()*2-1)*(1-L/l);const d=t.createBufferSource();d.buffer=o;const c=t.createBiquadFilter();c.type="highpass",c.frequency.value=1500;const _=t.createGain();_.gain.value=Z.HAMMER_NOISE_PEAK,d.connect(c),c.connect(_),_.connect(this._masterGain),d.start(i),d.stop(i+Z.HAMMER_NOISE_DURATION),this._trackSource(d);const h=t.createOscillator();h.type="triangle",h.frequency.setValueAtTime(n,i);const m=t.createOscillator();m.type="sine",m.frequency.setValueAtTime(n*2,i);const g=t.createOscillator();g.type="sine",g.frequency.setValueAtTime(n*3,i);const u=t.createOscillator();u.type="sine",u.frequency.setValueAtTime(n*4,i);const y=t.createOscillator();y.type="sine",y.frequency.setValueAtTime(n*5,i);const p=t.createGain();p.gain.setValueAtTime(1e-4,i),p.gain.exponentialRampToValueAtTime(Z.PLAYNOTE_ATTACK,i+Z.ADSR_ATTACK),p.gain.exponentialRampToValueAtTime(Z.PLAYNOTE_DECAY,i+Z.ADSR_DECAY),p.gain.exponentialRampToValueAtTime(1e-4,i+Z.PLAYNOTE_RELEASE);const f=t.createGain();f.gain.value=Z.PLAYNOTE_HARMONIC_2;const v=t.createGain();v.gain.value=Z.PLAYNOTE_HARMONIC_3;const b=t.createGain();b.gain.value=Z.PLAYNOTE_HARMONIC_4;const x=t.createGain();x.gain.value=Z.PLAYNOTE_HARMONIC_5,h.connect(p),m.connect(f),f.connect(p),g.connect(v),v.connect(p),u.connect(b),b.connect(p),y.connect(x),x.connect(p),p.connect(this._masterGain);const T=t.createGain();T.gain.value=Z.REVERB_SEND,p.connect(T),T.connect(this._reverbBus);const w=i+Z.ADSR_RELEASE;h.start(i),h.stop(w),m.start(i),m.stop(w),g.start(i),g.stop(w),u.start(i),u.stop(w),y.start(i),y.stop(w),this._trackOsc(h,w),this._trackOsc(m,w),this._trackOsc(g,w),this._trackOsc(u,w),this._trackOsc(y,w)}hover(e){!this.unlocked||this.muted||this._sfxBubble()}correct(){!this.unlocked||this.muted||this._sfxArpeggio([523.25,659.25,783.99,1046.5],.18,.06,"sine",Z.CORRECT_PEAK)}wrong(){!this.unlocked||this.muted||this._sfxSlide(320,150,.35,"triangle",Z.WRONG_PEAK)}async playScale(e){!this.unlocked||this.muted||(e.forEach((t,i)=>{setTimeout(()=>this._playNoteWebAudio(t),i*220)}),setTimeout(()=>this._sfxArpeggio([1046.5,1567.98,2093],.12,.08,"sine",Z.ARPEGGIO_DEFAULT_PEAK),e.length*220+200))}toggleMute(){if(this.muted=!this.muted,this._masterGain&&(this._masterGain.gain.cancelScheduledValues(this._webAudio.currentTime),this._masterGain.gain.linearRampToValueAtTime(this.muted?Z.MASTER_GAIN_MUTED:Z.MASTER_GAIN_NORMAL,.05)),this.muted)try{this.stop()}catch{}return this.muted}async _loadPianoInBackground(){try{const e=await it(()=>import("./index-DWHXqSMG.js"),[],import.meta.url);await e.start(),this._bus=new e.Gain(.9).toDestination();const t=new e.Sampler({urls:{A1:"A1.mp3",A2:"A2.mp3",A3:"A3.mp3",A4:"A4.mp3",A5:"A5.mp3",A6:"A6.mp3",C1:"C1.mp3",C2:"C2.mp3",C3:"C3.mp3",C4:"C4.mp3",C5:"C5.mp3",C6:"C6.mp3"},baseUrl:"https://tonejs.github.io/audio/salamander/",release:1.4}).connect(this._bus),i=new Promise(n=>setTimeout(()=>n("timeout"),12e3));await Promise.race([e.loaded(),i])!=="timeout"?(this._realPiano=t,this._realPianoLoaded=!0,console.log("[Audio] Salamander 钢琴加载完成")):console.warn("[Audio] 钢琴采样加载超时, 保持 Web Audio 合成器")}catch(e){console.warn("[Audio] Salamander 加载失败:",e)}}_sfxBubble(){if(!this._webAudio)return;this._resumeWebAudio();const e=this._webAudio,t=e.currentTime,i=e.createOscillator();i.type="sine",i.frequency.setValueAtTime(420,t),i.frequency.exponentialRampToValueAtTime(180,t+.12);const r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(Z.HOVER_PEAK,t+.01),r.gain.exponentialRampToValueAtTime(1e-4,t+.14),i.connect(r).connect(this._masterGain),i.start(t),i.stop(t+.18),this._trackOsc(i,t+.18)}_sfxArpeggio(e,t=.18,i=.06,r="sine",n=Z.ARPEGGIO_DEFAULT_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime;e.forEach((a,d)=>{const c=o+d*(t*.5+i),_=l.createOscillator();_.type=r,_.frequency.setValueAtTime(a,c);const h=l.createGain();h.gain.setValueAtTime(1e-4,c),h.gain.exponentialRampToValueAtTime(n,c+.012),h.gain.exponentialRampToValueAtTime(1e-4,c+t),_.connect(h).connect(this._masterGain),_.start(c),_.stop(c+t+.05),this._trackOsc(_,c+t+.05)})}_sfxSlide(e=320,t=150,i=.35,r="triangle",n=Z.WRONG_PEAK){if(!this._webAudio)return;this._resumeWebAudio();const l=this._webAudio,o=l.currentTime,a=l.createOscillator();a.type=r,a.frequency.setValueAtTime(e,o),a.frequency.exponentialRampToValueAtTime(t,o+i);const d=l.createGain();d.gain.setValueAtTime(1e-4,o),d.gain.exponentialRampToValueAtTime(n,o+.015),d.gain.exponentialRampToValueAtTime(1e-4,o+i),a.connect(d).connect(this._masterGain),a.start(o),a.stop(o+i+.05),this._trackOsc(a,o+i+.05)}}class hc{constructor(e){this.audio=e,this.playing=!1,this.notes=[],this._stopFn=null}start(){if(!this.playing){if(!this.audio||!this.audio._webAudio){console.warn("[BGM] Audio not ready, deferring"),setTimeout(()=>this.start(),500);return}this.playing=!0,this._playLoop()}}stop(){this.playing=!1,this._stopFn&&(clearTimeout(this._stopFn),this._stopFn=null),this.notes.forEach(e=>{try{e.stop()}catch{}}),this.notes=[]}toggle(){return this.playing?this.stop():this.start(),this.playing}_playLoop(){if(!this.playing)return;const e=this.audio._webAudio;if(!e)return;const t=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],i=e.currentTime,r=e.createGain();r.gain.value=0,r.gain.linearRampToValueAtTime(.1,i+2),r.connect(this.audio._masterGain);const n=4,l=t.length*n;t.forEach((o,a)=>{o.forEach(d=>{const c=e.createOscillator(),_=e.createGain();c.type=a%2===0?"sine":"triangle",c.frequency.setValueAtTime(d,i+a*n),c.connect(_).connect(r),_.gain.setValueAtTime(0,i+a*n),_.gain.linearRampToValueAtTime(.5,i+a*n+.5),_.gain.linearRampToValueAtTime(0,i+(a+1)*n),c.start(i+a*n),c.stop(i+(a+1)*n),this.notes.push(c)})}),this._stopFn=setTimeout(()=>{this.notes=[],this._playLoop()},l*1e3)}}const Ir="forest-piano-progress",fc=["do","re","mi","fa","sol","la","si"];function pc(){const s=new Date,e=s.getFullYear(),t=String(s.getMonth()+1).padStart(2,"0"),i=String(s.getDate()).padStart(2,"0");return`${e}-${t}-${i}`}function Ts(){return{level:1,stars:{},completedLevels:[],unlockedNotes:[],firstPass:null}}function _c(s){return!s||typeof s!="object"?Ts():{level:Number.isFinite(s.level)?s.level:1,stars:s.stars&&typeof s.stars=="object"&&!Array.isArray(s.stars)?s.stars:{},completedLevels:Array.isArray(s.completedLevels)?s.completedLevels.filter(e=>e!=null):[],unlockedNotes:Array.isArray(s.unlockedNotes)?s.unlockedNotes.filter(e=>typeof e=="string"):[],firstPass:typeof s.firstPass=="string"?s.firstPass:null}}class qn{constructor(){this.state=this._load()}_load(){try{if(typeof localStorage>"u")return Ts();const e=localStorage.getItem(Ir);if(!e)return Ts();const t=JSON.parse(e);return _c(t)}catch{return Ts()}}_save(){try{if(typeof localStorage>"u")return;localStorage.setItem(Ir,JSON.stringify(this.state))}catch{}}hasCompletedLevel(e){return this.state.completedLevels.includes(String(e))}markLevelComplete(e,t){const i=String(e),r=Math.max(0,Number(t)||0);this.state.completedLevels.includes(i)||(this.state.completedLevels=[...this.state.completedLevels,i]);const n=Number(this.state.stars[i]||0);r>n&&(this.state.stars={...this.state.stars,[i]:r}),this.state.firstPass||(this.state.firstPass=pc());const l=new Set(this.state.unlockedNotes);fc.forEach(a=>l.add(a)),this.state.unlockedNotes=Array.from(l);const o=Number(i);Number.isFinite(o)&&o>=this.state.level&&(this.state.level=o+1),this._save()}getStars(e){const t=String(e);return Number(this.state.stars[t]||0)}getTotalStars(){return Object.values(this.state.stars).reduce((e,t)=>e+(Number(t)||0),0)}getCompletedLevels(){return[...this.state.completedLevels]}isLevelUnlocked(e){return!0}getUnlockedNotes(){return[...this.state.unlockedNotes]}getSnapshot(){return JSON.parse(JSON.stringify(this.state))}}class vc{constructor(e,{onReset:t,onClose:i,version:r}){this.stage=e,this.onReset=t,this.onClose=i,this.version=r,this.element=null}show(){const e=document.createElement("div");e.className="settings-panel",e.innerHTML=`
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
    `,this.stage.appendChild(e),this.element=e,e.querySelector("#settings-close").addEventListener("click",()=>this.hide()),e.querySelector("#settings-reset").addEventListener("click",()=>{if(confirm("确定要重置所有进度吗? 这不可恢复!"))try{localStorage.removeItem("forest-piano-progress"),localStorage.removeItem("forest-piano-achievements"),this.onReset&&this.onReset(),alert("进度已重置! 刷新页面开始新游戏")}catch(n){alert("重置失败: "+n.message)}});const t=e.querySelector("#settings-animations");t.checked=this._loadAnimationsPref(),t.addEventListener("change",()=>{this._saveAnimationsPref(t.checked),document.body.classList.toggle("no-animations",!t.checked)});const i=e.querySelector("#settings-bgm");i.checked=this._loadBgmPref(),i.addEventListener("change",()=>{this._saveBgmPref(i.checked),window.dispatchEvent(new CustomEvent("toggle-bgm"))});const r=e.querySelector("#settings-large-text");r.checked=this._loadLargeTextPref(),r.addEventListener("change",()=>{this._saveLargeTextPref(r.checked),document.body.classList.toggle("large-text",r.checked)}),e.querySelector("#settings-tutorial").addEventListener("click",()=>{this.hide(),it(async()=>{const{Tutorial:n}=await Promise.resolve().then(()=>yc);return{Tutorial:n}},void 0,import.meta.url).then(({Tutorial:n})=>{new n(document.body,{onDone:()=>{}}).show()})})}_loadAnimationsPref(){try{return localStorage.getItem("forest-piano-animations")!=="false"}catch{return!0}}_saveAnimationsPref(e){try{localStorage.setItem("forest-piano-animations",String(e))}catch{}}_loadBgmPref(){try{return localStorage.getItem("forest-piano-bgm")!=="false"}catch{return!0}}_saveBgmPref(e){try{localStorage.setItem("forest-piano-bgm",String(e))}catch{}}_loadLargeTextPref(){try{return localStorage.getItem("forest-piano-large-text")==="true"}catch{return!1}}_saveLargeTextPref(e){try{localStorage.setItem("forest-piano-large-text",String(e))}catch{}}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onClose&&this.onClose()}}const ms=[{emoji:"🐟🎵",title:"欢迎来到森林钢琴学校",body:"这里的 7 条小鱼 Do Re Mi Fa Sol La Si 住在钢琴里。你来帮它们找到在五线谱和钢琴上的位置吧!",bg:"linear-gradient(135deg, #5fa8b5, #a8dadc)"},{emoji:"👆",title:"手指不离开屏幕",body:"按住一条鱼 (不要松开!) 拖到屏幕上方五线谱对应的位置。松手就放下。如果放错会摇头回弹。",bg:"linear-gradient(135deg, #f4a261, #ffc971)"},{emoji:"⭐",title:"错误少就拿满星",body:"0 错 = 3⭐ / 1-2 错 = 2⭐ / 3-5 错 = 1⭐ / 6+ 错 = 0⭐。每关都能挑战完美!",bg:"linear-gradient(135deg, #ffd166, #f4a261)"},{emoji:"🗺️",title:"16 个关卡等你探索",body:"通关后看左上角关卡徽章, 点一下就能回到地图选别的关卡. 也可以点 🎹 自由演奏 或 🎵 歌曲库随便弹~ 看看你能集齐多少 🏆 成就!",bg:"linear-gradient(135deg, #9b5de5, #6a4c93)"}];class Ti{constructor(e,{onDone:t,isFirstTime:i=!1}={}){this.stage=e,this.onDone=t,this.isFirstTime=i,this.element=null,this.currentPage=0}show(){this.element=document.createElement("div"),this.element.className="tutorial",this._render(),this.stage.appendChild(this.element),this.isFirstTime?G.fromTo(this.element.querySelector(".tutorial__card"),{y:40,opacity:0},{y:0,opacity:1,duration:.6,ease:"back.out(1.7)"}):G.fromTo(this.element.querySelector(".tutorial__card"),{scale:.85,opacity:0},{scale:1,opacity:1,duration:.35,ease:"back.out(1.4)"})}_render(){const e=ms[this.currentPage],t=ms.length,i=this.currentPage===t-1,r=this.currentPage===0;this.element.innerHTML=`
      <div class="tutorial__card" style="background: ${e.bg}">
        <div class="tutorial__emoji">${e.emoji}</div>
        <div class="tutorial__title">${e.title}</div>
        <div class="tutorial__body">${e.body}</div>

        <div class="tutorial__dots">
          ${ms.map((d,c)=>`
            <span class="tutorial__dot ${c===this.currentPage?"on":""}"></span>
          `).join("")}
        </div>

        <div class="tutorial__nav">
          ${r?"<div></div>":'<button class="btn-secondary" id="tut-back">‹ 上一步</button>'}
          ${i?'<button class="btn-primary" id="tut-done">🎵 开始游戏 ›</button>':'<button class="btn-primary" id="tut-next">下一步 ›</button>'}
        </div>

        ${this.isFirstTime?"":'<button class="tutorial__skip" id="tut-skip">跳过</button>'}
      </div>
    `;const n=this.element.querySelector("#tut-back"),l=this.element.querySelector("#tut-next"),o=this.element.querySelector("#tut-done"),a=this.element.querySelector("#tut-skip");n&&n.addEventListener("click",()=>this._prev()),l&&l.addEventListener("click",()=>this._next()),o&&o.addEventListener("click",()=>this._done()),a&&a.addEventListener("click",()=>this._done())}_prev(){this.currentPage>0&&(this.currentPage--,this._render())}_next(){this.currentPage<ms.length-1&&(this.currentPage++,this._render())}_done(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),this.onDone&&this.onDone()}hide(){this._done()}}const yc=Object.freeze(Object.defineProperty({__proto__:null,Tutorial:Ti},Symbol.toStringTag,{value:"Module"})),li=[{id:"cream",name:"奶油橙",icon:"🍑",bg:"cream"},{id:"night",name:"夜色",icon:"🌙",bg:"night"},{id:"forest",name:"森林绿",icon:"🌲",bg:"forest"}],Br="forest-piano-theme",oi={cream:{"--bg-cream":"#fff8ec","--bg-paper":"#faf3e0","--staff-strong":"#3d405b","--warm-cta":"#ffb347","--text-main":"#3d405b","--text-sub":"#6b7280"},night:{"--bg-cream":"#1a1430","--bg-paper":"#251a3f","--staff-strong":"#fdf6e3","--warm-cta":"#ff8fb1","--text-main":"#fdf6e3","--text-sub":"#b8a5d0"},forest:{"--bg-cream":"#1a3a2a","--bg-paper":"#244a3a","--staff-strong":"#fdf6e3","--warm-cta":"#84cc16","--text-main":"#fdf6e3","--text-sub":"#a3c9a8"}};class mc{constructor(e){this.stage=e,this.current=this._load(),this._apply(),this.button=null}_load(){try{return localStorage.getItem(Br)||"cream"}catch{return"cream"}}_save(e){try{localStorage.setItem(Br,e)}catch{}}_apply(){const e=oi[this.current]||oi.cream;for(const[t,i]of Object.entries(e))document.documentElement.style.setProperty(t,i);document.body.dataset.theme=this.current}cycle(){const e=li.findIndex(i=>i.id===this.current),t=li[(e+1)%li.length];return this.current=t.id,this._save(this.current),this._apply(),t}set(e){oi[e]&&(this.current=e,this._save(e),this._apply())}}class gc{constructor(e){this.game=e,this.enabled=!0,this._handler=t=>this._onKeyDown(t)}enable(){this.enabled||(this.enabled=!0,document.addEventListener("keydown",this._handler))}disable(){this.enabled&&(this.enabled=!1,document.removeEventListener("keydown",this._handler))}_onKeyDown(e){if(!(e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))){if(e.key==="Escape"||e.key==="Esc"){const t=document.querySelectorAll(".overlay, .achievements-wall, .settings-panel, .tutorial");if(t.length>0){const i=t[t.length-1];i.classList.contains("achievements-wall")?i.querySelector("#close-achievements")?.click():i.remove(),e.preventDefault()}else if(this.game&&typeof this.game.goHome=="function"){this.game.goHome(),e.preventDefault();return}else if(this.game&&typeof this.game._showStartOverlay=="function"){this.game._showStartOverlay(),e.preventDefault();return}}if(e.key==="Enter"){const i=document.querySelector(".overlay__card")?.querySelector("#start-btn");if(i){i.click(),e.preventDefault();return}}if(e.key==="m"||e.key==="M"){const t=document.getElementById("btn-sound");t&&t.click(),e.preventDefault()}if(/^[1-9]$/.test(e.key)){const t=parseInt(e.key,10);try{this.game._skipStartOverlayOnce=!0,this.game.audio?.unlockOnGesture?.().catch(()=>{}),this.game.start({levelId:t}),e.preventDefault()}catch{}}if(e.key===" "){const t=document.querySelector(".level4-drum-hit-button, .level12-cut-btn");t&&(t.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0})),e.preventDefault())}}}}const Fr="forest-piano-streak";function bc(){const s=new Date;return`${s.getFullYear()}-${String(s.getMonth()+1).padStart(2,"0")}-${String(s.getDate()).padStart(2,"0")}`}class xc{constructor(){this.state=this._load()}_load(){try{const e=localStorage.getItem(Fr);if(e)return JSON.parse(e)}catch{}return{lastDate:null,streakCount:0,longestStreak:0}}_save(){try{localStorage.setItem(Fr,JSON.stringify(this.state))}catch{}}checkIn(){const e=bc();if(this.state.lastDate===e)return{streak:this.state.streakCount,isNew:!1};const t=(()=>{const i=new Date;return i.setDate(i.getDate()-1),`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`})();return this.state.lastDate===t?this.state.streakCount+=1:this.state.lastDate!==null?this.state.streakCount=1:this.state.streakCount=1,this.state.streakCount>this.state.longestStreak&&(this.state.longestStreak=this.state.streakCount),this.state.lastDate=e,this._save(),{streak:this.state.streakCount,isNew:!0}}get(){return{streak:this.state.streakCount,longest:this.state.longestStreak}}}const wc=new mc,Hr="forest-piano-tutorial-shown",Si="v21.0";window.__forestPiano=window.__forestPiano||{};Object.assign(window.__forestPiano,{Game:Hn,Audio:Fs,Progress:qn,version:Si});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",qr):qr();function qr(){const s=document.getElementById("stage"),e=document.getElementById("bubble-text"),t=document.getElementById("version-tag");t&&(t.textContent=Si),kc();const i=new Hn({stageEl:s,bubbleEl:e,progress:new qn,audio:new Fs}),r=new hc(i.audio);i.start({levelId:1});const n=new xc,l=n.checkIn();l.isNew&&l.streak>=3&&setTimeout(()=>{const p=document.createElement("div");p.className="streak-toast",p.innerHTML=`
        <div class="streak-toast__icon">🔥</div>
        <div class="streak-toast__body">
          <div class="streak-toast__title">连续 ${l.streak} 天!</div>
          <div class="streak-toast__hint">坚持就是胜利</div>
        </div>
      `,document.body.appendChild(p),setTimeout(()=>p.classList.add("show"),50),setTimeout(()=>{p.classList.remove("show"),setTimeout(()=>p.remove(),500)},5500)},3e3);const o=document.createElement("span");o.className="level-badge",o.id="level-badge",o.title="回关卡地图",o.setAttribute("role","button"),o.setAttribute("aria-label","回关卡地图"),o.innerHTML=`${Ae("map")}<span>航线地图 · 第 1 关</span>`;const a=document.querySelector(".hud__left");a&&a.insertBefore(o,a.firstChild),o.addEventListener("click",()=>{i.goHome()});const d=document.createElement("div");d.className="streak-badge",d.textContent=`🔥 ${l.streak}`,d.title=`连续 ${l.streak} 天, 最长 ${n.get().longest}`,document.querySelector(".hud__left")?.appendChild(d);const c=document.getElementById("btn-sound"),_=document.getElementById("btn-replay"),h=document.getElementById("btn-bgm"),m=document.getElementById("btn-home");Ct(c,"sound"),Ct(_,"replay"),Ct(h,"music"),Ct(m,"home"),c&&c.addEventListener("click",()=>{const p=i.audio.toggleMute();Ct(c,p?"muted":"sound")}),_&&_.addEventListener("click",()=>{try{i.restartLevel()}catch(p){console.warn("restart 失败:",p)}}),h&&h.addEventListener("click",()=>{const p=r.toggle();Ct(h,p?"music":"muted"),h.style.background=p?"rgba(255, 235, 168, 0.4)":""}),m&&m.addEventListener("click",()=>{i.goHome()});const g=document.createElement("button");g.className="hud__btn",g.id="btn-settings",g.setAttribute("aria-label","设置"),g.setAttribute("title","设置"),g.innerHTML=Ae("settings"),document.querySelector(".hud__right")?.appendChild(g),g.addEventListener("click",()=>{new vc(document.body,{version:Si,onReset:()=>location.reload(),onClose:()=>{}}).show()});const u=document.querySelector(".hud__right");if(u&&!document.getElementById("btn-achievements")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-achievements",p.setAttribute("aria-label","成就墙"),p.title="成就墙",p.innerHTML=Ae("trophy"),u.insertBefore(p,u.firstChild),p.addEventListener("click",()=>{it(async()=>{const{AchievementsWall:f}=await import("./AchievementsWall-Du7sqI7m.js");return{AchievementsWall:f}},[],import.meta.url).then(({AchievementsWall:f})=>{new f(document.body,{achievementSystem:i.achievements,onClose:()=>{}}).show()}).catch(f=>console.warn("[achievements] 加载失败:",f))})}if(u&&!document.getElementById("btn-leaderboard")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-leaderboard",p.setAttribute("aria-label","排行榜"),p.setAttribute("title","我的成就"),p.innerHTML=Ae("chart"),u.appendChild(p),p.addEventListener("click",()=>{it(async()=>{const{Leaderboard:f}=await import("./Leaderboard-D8B94zyK.js");return{Leaderboard:f}},[],import.meta.url).then(({Leaderboard:f})=>{new f(document.body,i.progress,i.achievements).show()}).catch(f=>console.warn("[leaderboard] 加载失败:",f))})}if(u&&!document.getElementById("btn-practice")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-practice",p.setAttribute("aria-label","自由演奏"),p.title="自由演奏",p.innerHTML=Ae("piano"),u.appendChild(p),p.addEventListener("click",()=>{it(async()=>{const{PracticeRoom:f}=await import("./PracticeRoom-CR_Qwxun.js");return{PracticeRoom:f}},[],import.meta.url).then(({PracticeRoom:f})=>{new f(document.body,i).show()}).catch(f=>console.warn("[practice] 加载失败:",f))})}if(u&&!document.getElementById("btn-songs")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-songs",p.setAttribute("aria-label","歌曲库"),p.title="歌曲库",p.innerHTML=Ae("song"),u.appendChild(p),p.addEventListener("click",()=>{it(async()=>{const{SongLibrary:f}=await import("./SongLibrary-C9QleS6S.js");return{SongLibrary:f}},[],import.meta.url).then(({SongLibrary:f})=>{new f(document.body,i).show()}).catch(f=>console.warn("[songs] 加载失败:",f))})}if(!document.getElementById("btn-help")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-help",p.setAttribute("aria-label","帮助"),p.setAttribute("title","教程"),p.innerHTML=Ae("book"),document.querySelector(".hud__right")?.appendChild(p),p.addEventListener("click",()=>{new Ti(document.body,{onDone:()=>{}}).show()})}if(!document.getElementById("btn-theme")){const p=document.createElement("button");p.className="hud__btn",p.id="btn-theme",p.setAttribute("aria-label","主题"),p.title="主题",p.innerHTML=Ae("palette"),document.querySelector(".hud__right")?.appendChild(p),p.addEventListener("click",()=>{const f=wc.cycle();p.innerHTML=Ae("palette");const v=document.createElement("div");v.className="theme-flash",v.textContent=`${f.icon} ${f.name}`,document.body.appendChild(v),setTimeout(()=>v.remove(),2e3)})}localStorage.getItem(Hr)||setTimeout(()=>{new Ti(document.body,{isFirstTime:!0,onDone:()=>localStorage.setItem(Hr,"1")}).show()},1200),window.addEventListener("error",p=>{console.error("[forest-piano] error:",p.error)}),setTimeout(()=>{const p=document.getElementById("splash");p&&p.parentNode&&p.parentNode.removeChild(p)},2200),new gc(i).enable(),document.addEventListener("keydown",p=>{if(p.key==="?"||p.shiftKey&&p.key==="/"){const f=document.createElement("div");f.className="keyboard-help",f.innerHTML=`
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
    `,document.body.appendChild(f);const v=()=>f.remove();f.querySelector("#kb-help-close").addEventListener("click",v),setTimeout(()=>{const b=()=>{v(),document.removeEventListener("keydown",b)};document.addEventListener("keydown",b)},100)}})}function kc(){document.addEventListener("gesturestart",i=>i.preventDefault(),{passive:!1}),document.addEventListener("gesturechange",i=>i.preventDefault(),{passive:!1}),document.addEventListener("gestureend",i=>i.preventDefault(),{passive:!1});let s=null,e=0;const t=i=>{try{return!i||!i.closest?i:i.closest('button, a, .fish, .key, .level-map-tile, [role="button"]')||i}catch{return i}};document.addEventListener("touchstart",i=>{const r=Date.now(),n=t(i.target);r-e<300&&n&&n===s&&i.preventDefault(),s=n,e=r},{passive:!1}),document.addEventListener("dblclick",i=>i.preventDefault(),{passive:!1}),document.addEventListener("touchmove",i=>{i.touches&&i.touches.length>1&&i.preventDefault()},{passive:!1})}export{wt as P,G as g};
