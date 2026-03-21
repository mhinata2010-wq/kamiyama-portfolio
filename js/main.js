// ============================================
// 画像拡大機能 (Works Image Modal)
// ============================================
function initImageModal() {
  const overlay = document.getElementById('image-overlay');
  const expandedImg = document.getElementById('expanded-image');
  const closeBtn = document.querySelector('.close-btn');
  const clickableImages = document.querySelectorAll('.clickable-img');

  if (!overlay || !expandedImg) return;

  // 画像をクリックしたら拡大表示
  clickableImages.forEach(img => {
    img.addEventListener('click', () => {
      overlay.style.display = "block";
      expandedImg.src = img.src;
      // 背景スクロールを止める
      document.body.style.overflow = "hidden";
    });
  });

  // ×ボタンを押したら閉じる
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    });
  }

  // 背景の黒い部分を押しても閉じる
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    }
  });
}

// ============================================
// Scroll Reveal
// ============================================
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    ".section__header, .about__content, .work-card, .skill-item, .contact__content"
  );

  reveals.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => observer.observe(el));
}

// ============================================
// Active Nav Highlight
// ============================================
function initActiveNav() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ============================================
// Smooth Scroll for Nav Links
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('.nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

// ============================================
// Hero Image Fallback (placeholder gradient)
// ============================================
function initHeroFallback() {
  const heroImg = document.querySelector(".hero__image img");
  if (heroImg) {
    heroImg.addEventListener("error", () => {
      heroImg.style.display = "none";
      heroImg.parentElement.style.background =
        "linear-gradient(135deg, #c9a96e 0%, #8b7355 40%, #5a4a3a 100%)";
    });
  }
}

// ============================================
// Mobile Hamburger Menu
// ============================================
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!hamburger || !mobileMenu) return;

  // ハンバーガーボタンのクリックでメニュー開閉
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("is-open");
    mobileMenu.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", isOpen);
    // メニューが開いている間はスクロールを無効化
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // メニュー内のリンククリックで閉じる
  mobileMenu.querySelectorAll(".mobile-menu__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));

      // メニューを閉じる
      hamburger.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";

      // スムーズスクロール
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  });
}

// ============================================
// Scroll Header (透明 → 白へ切り替え)
// ============================================
function initScrollHeader() {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const heroSection = document.querySelector(".hero");
  const threshold = heroSection ? heroSection.offsetHeight * 0.85 : 100;

  window.addEventListener("scroll", () => {
    if (window.scrollY > threshold) {
      sidebar.classList.add("sidebar--scrolled");
    } else {
      sidebar.classList.remove("sidebar--scrolled");
    }
  });
}

// ============================================
// Init (オープニング演出を含む)
// ============================================
window.addEventListener('load', () => {
  // --- 他の機能を動かす ---
  initHeroFallback();
  initScrollReveal();
  initActiveNav();
  initSmoothScroll();
  initMobileMenu();
  initScrollHeader();
  initImageModal();

  // --- オープニングの2秒タイマー ---
  const opening = document.getElementById('opening-overlay');
  if (opening) {
    setTimeout(() => {
      // bodyにloadedクラスをつけて、CSSで幕を消す
      document.body.classList.add('loaded');
      
      // アニメーションが終わる頃に要素自体を非表示にする
      setTimeout(() => {
        opening.style.display = 'none';
      }, 1200);
    }, 2000); // 2000 = 2秒待機
  }
});

