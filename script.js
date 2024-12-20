window.onload = function(){
  createTable();
}

// 読み札テーブルの作成
function createTable() {
  const table = document.createElement('table');
  table.id = 'tableData';
  
  let yomifudalist = shuffleExceptFirst(fudalist);
  yomifudalist = concatNumberTag(yomifudalist);

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
  for (let i = 100; i > 1; i--) {
    let j = Math.floor(Math.random() * (i - 1)) + 1;
    [result[i], result[j]] = [result[j], result[i]];
  }
  
  return result;
}

// タグと数字をつける
function concatNumberTag(array) {
  // 配列のコピーを作成
  const result = [...array];
  
  // 配列にタグとタグを付与する
  for (let i = 1; i < 101; i++) {
    let tag = "<input type='checkbox' id='fuda" + i + "'><label for='fuda" + i + "'><span class='num'>" + i;
    result[i] = tag.concat(result[i]);
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
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.float-button');

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          const circle = button.querySelector('circle') || button.querySelector('.main-circle');
          const quarterCircle = button.querySelector('.quarter-circle');
          let duration;
          
          switch(button.id) {
              case 'top-button':
                  duration = 5;
                  animateCircle(circle, duration);
                  break;
              case 'middle-button':
                  animateMiddleButton(circle, quarterCircle);
                  break;
              case 'bottom-button':
                  duration = 6;
                  animateCircle(circle, duration);
                  break;
          }
      });
  });

  const toggleButton = document.getElementById('toggle-button');
  const floatButtons = document.querySelector('.float-buttons');

  toggleButton.addEventListener('click', () => {
    floatButtons.classList.toggle('visible');
  });
});

function animateCircle(circle, duration) {
  circle.style.animation = `disappear ${duration}s linear forwards`;
  
  setTimeout(() => {
      circle.style.animation = '';
  }, duration * 1000);
}

function animateMiddleButton(mainCircle, quarterCircle) {
  mainCircle.style.animation = 'disappear-main 4s linear forwards';
  
  setTimeout(() => {
      quarterCircle.style.animation = 'disappear-quarter 1s linear forwards';
      
      setTimeout(() => {
          mainCircle.style.animation = '';
          quarterCircle.style.animation = '';
      }, 1000);
  }, 3000);
}