class c{constructor(s,r,d){this.stage=s,this.progress=r,this.achievementSystem=d,this.element=null}show(){const s=this.progress.getSnapshot(),r=Object.values(s.stars).reduce((e,i)=>e+(Number(i)||0),0),d=Object.keys(s.stars).length,t=d>0?(r/(d*3)*100).toFixed(0):0,a=document.createElement("div");a.className="leaderboard-overlay",a.innerHTML=`
      <div class="leaderboard-card">
        <div class="leaderboard-header">
          <div class="leaderboard-title">🏆 我的成就</div>
          <button class="btn-primary" id="leaderboard-close">关闭</button>
        </div>

        <div class="leaderboard-summary">
          <div class="leaderboard-summary__card">
            <div class="leaderboard-summary__value">${r}</div>
            <div class="leaderboard-summary__label">总星数</div>
          </div>
          <div class="leaderboard-summary__card">
            <div class="leaderboard-summary__value">${d}/16</div>
            <div class="leaderboard-summary__label">通过关卡</div>
          </div>
          <div class="leaderboard-summary__card">
            <div class="leaderboard-summary__value">${t}%</div>
            <div class="leaderboard-summary__label">平均完美度</div>
          </div>
        </div>

        <div class="leaderboard-table">
          ${this._renderTable(s.stars)}
        </div>

        ${this.achievementSystem?`
          <div class="leaderboard-achievements">
            <div class="leaderboard-achievements__title">🎯 成就墙</div>
            <div class="leaderboard-achievements__list">
              ${this.achievementSystem.getAll().map(e=>`
                <div class="leaderboard-ach ${e.unlocked?"unlocked":"locked"}">
                  <span class="leaderboard-ach__emoji">${e.unlocked?e.emoji:"🔒"}</span>
                  <span class="leaderboard-ach__name">${e.name}</span>
                </div>
              `).join("")}
            </div>
          </div>
        `:""}
      </div>
    `,this.stage.appendChild(a),this.element=a,a.querySelector("#leaderboard-close").addEventListener("click",()=>this.hide());const l=e=>{(e.key==="Escape"||e.key==="Esc")&&(this.hide(),document.removeEventListener("keydown",l))};document.addEventListener("keydown",l)}_renderTable(s){return Object.entries({1:"🐟 小鱼跳进",2:"🎵 听音找鱼",3:"🏔️ Mi-Sol 山谷",4:"🥁 节奏小河",5:"⭐ 小星星视奏",6:"🎹 双手协调",7:"🌳 树屋 7 音阶",8:"🎭 森林音乐会",9:"🖤 黑键世界",10:"✨ 八度之夜",11:"💕 翻牌记忆",12:"🍅 番茄节拍",13:"⏱️ 节奏大师",14:"🎶 和弦建造",15:"🎼 视奏大师",16:"🚀 节奏阶梯"}).map(([d,t])=>{const a=s[d]||0,l="⭐".repeat(a)+"☆".repeat(3-a);return`
        <div class="leaderboard-row">
          <div class="leaderboard-row__name">${t}</div>
          <div class="leaderboard-row__stars">${l}</div>
        </div>
      `}).join("")}hide(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),this.element=null)}}export{c as Leaderboard};
