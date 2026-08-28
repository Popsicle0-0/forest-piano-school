class o{constructor(s,l={}){this.stage=s||document.body,this.system=l.achievementSystem,this.onClose=l.onClose,this.element=null}show(){if(!this.system){console.warn("[AchievementsWall] No achievement system given");return}document.querySelectorAll(".overlay").forEach(e=>e.remove());const s=this.system.getAll(),l=s.filter(e=>e.unlocked).length,d=s.length,n=this.system.getProgressPercent(),t=document.createElement("div");t.className="achievements-wall",t.setAttribute("role","dialog"),t.setAttribute("aria-label","成就墙"),t.innerHTML=`
      <div class="achievements-wall__card">
        <div class="achievements-wall__header">
          <div class="achievements-wall__title">🏆 成就墙</div>
          <button class="btn-primary achievements-wall__close" id="close-achievements">关闭</button>
        </div>
        <div class="achievements-wall__progress">
          <div class="achievements-wall__progress-text">
            解锁 ${l} / ${d}  (${n}%)
          </div>
          <div class="achievements-wall__progress-bar">
            <div class="achievements-wall__progress-fill" style="width: ${n}%"></div>
          </div>
        </div>
        <div class="achievements-wall__grid">
          ${s.map(e=>`
            <div class="achievement-badge ${e.unlocked?"unlocked":"locked"}">
              <div class="achievement-badge__emoji">${e.unlocked?e.emoji:"🔒"}</div>
              <div class="achievement-badge__name">${c(e.name)}</div>
              <div class="achievement-badge__desc">${c(e.desc)}</div>
              ${e.unlocked?'<div class="achievement-badge__state">✓ 已解锁</div>':'<div class="achievement-badge__state state-locked">未解锁</div>'}
            </div>
          `).join("")}
        </div>
      </div>
    `,this.stage.appendChild(t),this.element=t;const a=t.querySelector("#close-achievements");a&&a.addEventListener("click",()=>this.hide()),t.addEventListener("click",e=>{e.target===t&&this.hide()}),this._escHandler=e=>{e.key==="Escape"&&this.hide()},document.addEventListener("keydown",this._escHandler)}hide(){if(this._escHandler&&(document.removeEventListener("keydown",this._escHandler),this._escHandler=null),this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null),typeof this.onClose=="function")try{this.onClose()}catch{}}}function c(i){return i==null?"":String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}export{o as AchievementsWall,o as default};
