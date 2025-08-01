window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // ページ読み込み完了から3秒後にフェードアウト
  setTimeout(() => {
    preloader.classList.add('fade-out');

    // フェードアウト終了後に非表示
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600); // CSSアニメーション時間と一致
  }, 3000); // ← 3秒待機してから開始
});
