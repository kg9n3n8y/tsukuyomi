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