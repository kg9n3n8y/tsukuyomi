window.onload = function(){
  createTable();
}

// 読み札テーブルの作成
function createTable() {
  const table = document.createElement('table');
  table.id = 'tableData';
  
  let yomifudalist = shuffleExceptFirst(fudalist);

  yomifudalist.forEach((content, index) => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    // テンプレート要素を使用してHTMLを解析
    const template = document.createElement('template');
    template.innerHTML = content.trim();
    cell.appendChild(template.content);
    row.appendChild(cell);
    table.appendChild(row);
  });
  
  const targetElement = document.getElementById("insert_hyo");
  // 既存の内容をクリア
  targetElement.innerHTML = '';
  targetElement.appendChild(table);
}


// 配列の2〜101番目のシャッフル
function shuffleExceptFirst(array) {
  // 配列のコピーを作成
  const result = [...array];
  
  // 2番目の要素から最後までをシャッフル
  for (let i = array.length - 1; i > 1; i--) {
      const j = Math.floor(Math.random() * (i - 1)) + 1;
      [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}


// ページのリロード
function reloadPage(){
  let flag = window.confirm("読み札をシャッフルしますが，いいですか？");
  if(flag) {
    location.reload();
  }
}


// URLのコピー
function copyUrl(url = "https://kg9n3n8y.github.io/tsukuyomi/") {
  const textarea = document.createElement('textarea');
  textarea.value = url;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  alert('URLをコピーしました')
}


// タイマー
class CircleProgress {
  constructor() {
      this.canvas = document.querySelector('.circle-progress');
      this.ctx = this.canvas.getContext('2d');
      this.button = document.querySelector('.float-button');
      
      this.canvas.width = 72;
      this.canvas.height = 72;
      
      this.colors = ['#008000', '#dc143c', '#0000cd', '#ff8c00'];
      this.ratios = [6, 1, 3, 5];
      this.total = this.ratios.reduce((a, b) => a + b, 0);
      
      this.isAnimating = false;
      this.button.addEventListener('click', () => {
          if (!this.isAnimating) {
              this.animateDisappearance();
          }
      });
      
      this.drawCircle();
  }

  drawCircle(currentEndAngle = Math.PI * 2) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let startAngle = -Math.PI / 2;
      let totalRatio = 0;
      
      this.ratios.forEach((ratio, index) => {
          const portion = ratio / this.total;
          const segmentEndAngle = startAngle + (portion * Math.PI * 2);
          
          // 現在のアニメーション位置までのみ描画
          if (startAngle < currentEndAngle) {
              this.ctx.beginPath();
              this.ctx.arc(
                  35, 
                  35, 
                  32, 
                  startAngle,
                  Math.min(segmentEndAngle, currentEndAngle),
                  false
              );
              this.ctx.lineWidth = 5;
              this.ctx.strokeStyle = this.colors[index];
              this.ctx.stroke();
          }
          
          startAngle = segmentEndAngle;
          totalRatio += portion;
      });
  }

  async animateDisappearance() {
      this.isAnimating = true;
      const duration = 15000; // 15秒
      const startTime = Date.now();

      const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = elapsed / duration;
          
          if (progress < 1) {
              // 時計回りにアニメーション（-Math.PI/2から開始）
              const currentAngle = (Math.PI * 2) * (1 - progress) - Math.PI / 2;
              this.drawCircle(currentAngle);
              requestAnimationFrame(animate);
          } else {
              setTimeout(() => {
                  this.drawCircle();
                  this.isAnimating = false;
              }, 100);
          }
      };

      animate();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CircleProgress();
});