'use strict';
// Display real media only after the browser confirms it can load.
document.querySelectorAll('[data-portfolio-src]').forEach((media) => {
  const fallback = media.parentElement.querySelector('[data-media-fallback]');
  const show = () => {
    media.hidden = false;
    if (fallback) fallback.hidden = true;
  };
  const fail = () => {
    media.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = media.tagName === 'VIDEO'
        ? '映像を読み込めません。掲載準備中、または通信エラーです。'
        : '作品画像を読み込めません。掲載準備中、または通信エラーです。';
    }
  };
  media.addEventListener(media.tagName === 'VIDEO' ? 'loadedmetadata' : 'load', show, { once: true });
  media.addEventListener('error', fail);
  media.src = media.dataset.portfolioSrc;
});
