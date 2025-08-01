// -----------------------------
// ハンバーガーメニュー
// -----------------------------
document.getElementById('menu-toggle').addEventListener('click', function() {
  const navUl = document.querySelector('nav ul');
  navUl.classList.toggle('active');
});

// -----------------------------
// フォームバリデーション
// -----------------------------
document.getElementById('contact-form').addEventListener('submit', function(e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  let isValid = true;

  // エラーメッセージ初期化
  ['error-name', 'error-email', 'error-message'].forEach(id => document.getElementById(id).textContent = '');

  if (!name) {
    document.getElementById('error-name').textContent = 'お名前を入力してください。';
    isValid = false;
  }
  if (!email) {
    document.getElementById('error-email').textContent = 'メールアドレスを入力してください。';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('error-email').textContent = '正しいメールアドレスを入力してください。';
    isValid = false;
  }
  if (!message) {
    document.getElementById('error-message').textContent = 'メッセージを入力してください。';
    isValid = false;
  }

  if (!isValid) e.preventDefault();
});

// -----------------------------
// ページ内リンク スムーススクロール
// -----------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// -----------------------------
// Contactボタン → カード表示
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('contact-info-btn');
  const card = document.getElementById('contact-card');
  const closeBtn = card?.querySelector('.close-btn');

  if (btn && card && closeBtn) {
    btn.addEventListener('click', () => {
      card.classList.toggle('show');
    });
    closeBtn.addEventListener('click', () => {
      card.classList.remove('show');
    });

    // Copyボタン
    document.querySelectorAll('.copy-btn').forEach(copyBtn => {
      copyBtn.addEventListener('click', () => {
        const targetId = copyBtn.getAttribute('data-copy-target');
        const text = document.getElementById(targetId)?.textContent.trim();
        if (text) {
          navigator.clipboard.writeText(text).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
          });
        }
      });
    });
  }
});

// -----------------------------
// スクロールスパイ（ナビの現在位置ハイライト）
/**
 * セクションの位置を見てナビリンクに active 付与
 */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.25 && rect.bottom >= window.innerHeight * 0.25) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
});

// -----------------------------
// セクションをフェードインさせる
// -----------------------------
const sections = document.querySelectorAll('section');

function revealSections() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    if (section.getBoundingClientRect().top < triggerBottom) {
      section.classList.add('visible');
    }
  });
}

// 初回＋スクロール時
window.addEventListener('scroll', revealSections);

// -----------------------------
// Preloader フェードアウト
// -----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.style.display = 'none', 500); // CSS transitionと合わせる
    }, 2000); // 表示時間：2秒
  }
});
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
setTimeout(() => {
  preloader.classList.add('hide'); // CSSで opacity + visibility
}, 1500);

const slides = document.querySelector('.slides');
const slideItems = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let currentIndex = 0;

// ドット作成
slideItems.forEach((_, index) => {
  const button = document.createElement('button');
  if (index === 0) button.classList.add('active');
  button.addEventListener('click', () => goToSlide(index));
  dots.appendChild(button);
});

// スライドを移動
function goToSlide(index) {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
  dots.children[index].classList.add('active');
  currentIndex = index;
}

// 次のスライド
function nextSlide() {
  let nextIndex = (currentIndex + 1) % slideItems.length;
  goToSlide(nextIndex);
}
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    galleryItems.forEach(item => {
      item.style.display = (filter === 'all' || item.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// 前のスライド
function prevSlide() {
  let prevIndex = (currentIndex - 1 + slideItems.length) % slideItems.length;
  goToSlide(prevIndex);
}

// ボタンイベント
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// 自動スライド
setInterval(nextSlide, 5000); // 5秒ごと
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");

      // プレローダーが完全に消えた後にスクロール許可
      document.body.classList.remove("preloading");
    }, 1500); // プレローダーの表示時間と合わせる
  }
});
