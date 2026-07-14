import{P as g,g as f}from"./index-v7tYcgbk.js";const b=[{id:"twinkle",name:"小星星",emoji:"⭐",melody:["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"],difficulty:1},{id:"birthday",name:"生日快乐",emoji:"🎂",melody:["C4","C4","D4","C4","F4","E4","C4","C4","D4","C4","G4","F4"],difficulty:1},{id:"london",name:"伦敦桥",emoji:"🌉",melody:["C4","D4","E4","F4","G4","G4","A4","G4","F4","E4","D4","C4"],difficulty:2},{id:"joy",name:"欢乐颂",emoji:"🎉",melody:["E4","E4","F4","G4","G4","F4","E4","D4","C4","C4","D4","E4","E4","D4","D4"],difficulty:2},{id:"frog",name:"小青蛙",emoji:"🐸",melody:["C4","D4","E4","F4","E4","D4","C4"],difficulty:1},{id:"molihua",name:"茉莉花",emoji:"🌸",melody:["C4","E4","G4","A4","G4","E4","C4","D4","E4","F4","E4","D4","C4"],difficulty:3},{id:"donkey",name:"小毛驴",emoji:"🫏",melody:["C4","D4","E4","C4","E4","F4","G4","G4"],difficulty:1},{id:"tigers",name:"两只老虎",emoji:"🐯",melody:["C4","D4","E4","C4","C4","D4","E4","C4","E4","F4","G4","G4"],difficulty:2},{id:"abcsong",name:"字母歌",emoji:"🔤",melody:["C4","C4","G4","G4","A4","A4","G4","F4","F4","E4","E4","D4","D4","C4"],difficulty:1},{id:"threepigs",name:"三只小猪",emoji:"🐷",melody:["C4","E4","G4","C4","E4","G4","G4","A4","G4","F4","E4","D4","C4"],difficulty:2},{id:"painter",name:"粉刷匠",emoji:"🎨",melody:["G4","G4","A4","G4","C5","B4","A4","G4","E4","G4","A4","B4","C5","B4","A4","G4"],difficulty:3},{id:"fishlight",name:"渔光曲",emoji:"🐟",melody:["D4","E4","F4","D4","E4","F4","G4","A4","G4","F4","E4","D4"],difficulty:3}],u={C4:"Do",D4:"Re",E4:"Mi",F4:"Fa",G4:"Sol",A4:"La",B4:"Si",C5:"Do"},p={C4:"do",D4:"re",E4:"mi",F4:"fa",G4:"sol",A4:"la",B4:"si"},E={C4:0,D4:1,E4:2,F4:3,G4:4,A4:5,B4:6,C5:7},v=[{id:"do",solfege:"Do",pitch:"C4",note:"C",color:"#e63946"},{id:"re",solfege:"Re",pitch:"D4",note:"D",color:"#f4a261"},{id:"mi",solfege:"Mi",pitch:"E4",note:"E",color:"#ffc971"},{id:"fa",solfege:"Fa",pitch:"F4",note:"F",color:"#b5c99a"},{id:"sol",solfege:"Sol",pitch:"G4",note:"G",color:"#457b9d"},{id:"la",solfege:"La",pitch:"A4",note:"A",color:"#6a4c93"},{id:"si",solfege:"Si",pitch:"B4",note:"B",color:"#9b5de5"}],C={do:0,re:1,mi:2,fa:3,sol:4,la:5,si:6};class A{constructor(e,t){this.stage=e||document.body,this.game=t||null,this.element=null,this.currentSong=null,this._demoTimer=null,this._demoOverlay=null,this._playOverlay=null,this._scoreOverlay=null,this._kb=null,this._escHandler=null}show(){document.querySelectorAll(".song-library").forEach(i=>i.remove());const e=document.createElement("div");e.className="song-library",e.setAttribute("role","dialog"),e.setAttribute("aria-label","歌曲库"),e.innerHTML=`
      <div class="song-library__hud">
        <button class="btn-secondary song-library__back" id="song-back">🚪 返回</button>
        <div>
          <div class="song-library__title">🎵 歌曲库</div>
          <div class="song-library__hint">选一首歌: 听 / 跟我弹 / 看谱</div>
        </div>
        <span class="song-library__spacer"></span>
      </div>
      <div class="song-library__grid"></div>
    `,this.stage.appendChild(e),this.element=e;const t=e.querySelector(".song-library__grid");b.forEach(i=>{const o=document.createElement("div");o.className="song-library__card",o.dataset.id=i.id,o.innerHTML=`
        <div class="song-library__card-emoji">${i.emoji}</div>
        <div class="song-library__card-name">${i.name}</div>
        <div class="song-library__card-meta">${i.melody.length} 音 · ${"★".repeat(i.difficulty)}</div>
        <div class="song-library__card-actions">
          <button class="song-library__btn listen" data-action="listen">▶ 听</button>
          <button class="song-library__btn play" data-action="play">🎹 跟我弹</button>
          <button class="song-library__btn read" data-action="read">📝 看谱</button>
        </div>
      `,t.appendChild(o),o.querySelectorAll(".song-library__btn").forEach(a=>{a.addEventListener("click",()=>this._action(i,a.dataset.action))})}),e.querySelector("#song-back").addEventListener("click",()=>this.hide())}_action(e,t){this.currentSong=e,t==="listen"?this._playDemo(e):t==="play"?this._playAlong(e):t==="read"&&this._showScore(e)}_audioPlay(e){try{const t=this.game&&this.game.audio;t&&typeof t.playNote=="function"&&t.playNote(e)}catch(t){console.warn("[SongLibrary] 播放失败:",t)}}_playDemo(e){this._closeDemo();const t=document.createElement("div");t.className="song-demo-overlay",t.innerHTML=`
      <h2>🎵 ${e.emoji} ${e.name}</h2>
      <div class="demo-current">准备演奏...</div>
      <button class="btn-secondary" id="demo-stop">⏹ 停止</button>
    `,document.body.appendChild(t),this._demoOverlay=t;let i=0;const o=()=>{if(!this._demoOverlay)return;if(i>=e.melody.length){t.querySelector(".demo-current").textContent="🎉 演奏完毕!",this._demoTimer=setTimeout(()=>this._closeDemo(),1200);return}const a=e.melody[i];this._audioPlay(a),t.querySelector(".demo-current").textContent=`第 ${i+1}/${e.melody.length} 音: ${u[a]||a} (${a})`,i++,this._demoTimer=setTimeout(o,500)};o(),t.querySelector("#demo-stop").addEventListener("click",()=>this._closeDemo())}_closeDemo(){this._demoTimer&&(clearTimeout(this._demoTimer),this._demoTimer=null),this._demoOverlay&&this._demoOverlay.parentNode&&this._demoOverlay.parentNode.removeChild(this._demoOverlay),this._demoOverlay=null}_playAlong(e){this._closePlayAlong();const t=document.createElement("div");t.className="song-play-overlay",t.innerHTML=`
      <div class="song-play__hud">
        <button class="btn-secondary" id="song-play-exit">🚪 退出</button>
        <div class="song-play__title">${e.emoji} ${e.name}</div>
        <div class="song-play__progress" id="song-play-progress">0 / ${e.melody.length}</div>
      </div>
      <div class="song-play__lane" id="song-play-lane">
        <div class="song-play__hitline"></div>
      </div>
      <div class="song-play__kb" id="song-play-kb"></div>
    `,document.body.appendChild(t),this._playOverlay=t;const i=t.querySelector("#song-play-kb"),o=new g(i,v);this._kb=o;const a=t.querySelector("#song-play-progress"),c=t.querySelector("#song-play-lane");let y=0;const h=()=>{o.svg&&o.svg.querySelectorAll(".song-target").forEach(l=>l.classList.remove("song-target"))},m=()=>{if(h(),c.querySelectorAll(".song-play__note").forEach(r=>r.remove()),y>=e.melody.length){this._finishPlayAlong(e);return}a.textContent=`${y} / ${e.melody.length}`;const l=e.melody[y],n=p[l],s=n!=null?C[n]:3,d=document.createElement("div");if(d.className="song-play__note",d.style.left=`${(s+.5)/v.length*100}%`,d.textContent=u[l]||l,c.appendChild(d),f.fromTo(d,{y:-10,opacity:0},{y:"calc(100% - 44px)",opacity:1,duration:1.1,ease:"power1.in"}),n!=null&&o.svg){const r=o.svg.querySelector(`.key--white[data-id="${n}"]`);r&&r.classList.add("song-target")}else this._audioPlay(l),y++,setTimeout(m,700)};o.onPress=l=>{const n=l.dataset.id,s=v.find(r=>r.id===n);s&&this._audioPlay(s.pitch);try{o.glowKey(l)}catch{}const d=p[e.melody[y]];n===d?(y++,m()):(l.classList.add("song-wrong"),setTimeout(()=>l.classList.remove("song-wrong"),300))},this._escHandler=l=>{l.key==="Escape"&&this._closePlayAlong()},document.addEventListener("keydown",this._escHandler),t.querySelector("#song-play-exit").addEventListener("click",()=>this._closePlayAlong()),m()}_finishPlayAlong(e){if(!this._playOverlay)return;const t=this._playOverlay.querySelector("#song-play-lane");t&&(t.innerHTML=`
        <div class="song-play__done">
          <div class="song-play__done-emoji">🎉</div>
          <div class="song-play__done-text">${e.emoji} ${e.name} 弹完啦!</div>
          <div class="song-play__done-actions">
            <button class="btn-primary" id="song-play-again">🔁 再弹一次</button>
            <button class="btn-secondary" id="song-play-back">🚪 返回</button>
          </div>
        </div>
      `,t.querySelector("#song-play-again").addEventListener("click",()=>this._playAlong(e)),t.querySelector("#song-play-back").addEventListener("click",()=>this._closePlayAlong()))}_closePlayAlong(){this._escHandler&&(document.removeEventListener("keydown",this._escHandler),this._escHandler=null),this._playOverlay&&this._playOverlay.parentNode&&this._playOverlay.parentNode.removeChild(this._playOverlay),this._playOverlay=null,this._kb=null}_showScore(e){this._closeScore();const t=52,i=60,o=i+e.melody.length*t+40,a=60,c=18,y=[0,1,2,3,4].map(s=>`<line x1="30" y1="${a+s*c}" x2="${o-20}" y2="${a+s*c}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />`).join(""),h=a+4*c+c,m=s=>h-(E[s]??0)*(c/2),l=e.melody.map((s,d)=>{const r=i+d*t,_=m(s);return`${s==="C4"||s==="C5"?`<line x1="${r-16}" y1="${_}" x2="${r+16}" y2="${_}" stroke="rgba(0,0,0,0.4)" stroke-width="1.5" />`:""}
        <ellipse cx="${r}" cy="${_}" rx="11" ry="9" fill="#3d405b" transform="rotate(-18 ${r} ${_})" />
        <text x="${r}" y="${h+34}" text-anchor="middle" font-size="12" fill="#6a4c93" font-weight="700">${u[s]||s}</text>`}).join(""),n=document.createElement("div");n.className="song-score-overlay",n.innerHTML=`
      <div class="song-score-card">
        <h2>📝 ${e.emoji} ${e.name}</h2>
        <div class="song-score-scroll">
          <svg viewBox="0 0 ${o} 200" preserveAspectRatio="xMidYMid meet" class="song-score-svg" style="min-width:${Math.max(o,320)}px;">
            <text x="20" y="${a+30}" font-size="42" fill="#3d405b" font-family="serif">𝄞</text>
            ${y}
            ${l}
          </svg>
        </div>
        <button class="btn-secondary" id="score-close">关闭</button>
      </div>
    `,document.body.appendChild(n),this._scoreOverlay=n,n.querySelector("#score-close").addEventListener("click",()=>this._closeScore())}_closeScore(){this._scoreOverlay&&this._scoreOverlay.parentNode&&this._scoreOverlay.parentNode.removeChild(this._scoreOverlay),this._scoreOverlay=null}hide(){this._closeDemo(),this._closePlayAlong(),this._closeScore(),this.element&&this.element.parentNode&&this.element.parentNode.removeChild(this.element),this.element=null}}export{A as SongLibrary};
