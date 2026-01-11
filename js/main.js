document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------
     ヘッダーのスクロール制御
  --------------------------- */
  const header = document.querySelector("header");
  let prevY = window.pageYOffset;
  let lock = false; // アンカー移動後のスクロール無効化

  window.addEventListener("scroll", () => {
    if (lock) return;

    const currentY = window.pageYOffset;

    if (currentY < prevY) {
      header.classList.remove("hidden"); // 上スクロールで表示
    } else {
      if (currentY > 0) header.classList.add("hidden"); // 下スクロールで非表示
    }

    prevY = currentY;
  });

  // アンカーリンククリック時
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("hidden"); // 強制表示
      lock = true;

      setTimeout(() => {
        prevY = window.pageYOffset;
        lock = false;
      }, 800); // スムーススクロール終了想定時間
    });
  });

  /* --------------------------
     カーソル
  --------------------------- */

  const $bigBall = document.querySelector(".cursor__ball--big");
  const $smallBall = document.querySelector(".cursor__ball--small");
  const $hoverables = document.querySelectorAll(".hoverable");

  let requestId = null;

  document.addEventListener("mousemove", onMouseMove);

  for (let i = 0; i < $hoverables.length; i++) {
    $hoverables[i].addEventListener("mouseenter", onMouseHover);
    $hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
  }

  function onMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;

    if (requestId) cancelAnimationFrame(requestId);

    requestId = requestAnimationFrame(() => {
      TweenMax.to($bigBall, 0.8, {
        x,
        y,
        xPercent: -50,
        yPercent: -38,
      });

      TweenMax.to($smallBall, 0.1, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
      });
    });
  }

  function onMouseHover() {
    TweenMax.to($bigBall, 0.3, { scale: 4 });
  }

  function onMouseHoverOut() {
    TweenMax.to($bigBall, 0.3, { scale: 1 });
  }

  /* --------------------------
     ロード画面
  --------------------------- */
  document.getElementById("loader").addEventListener("click", () => {
    document.getElementById("loader").classList.add("hide");
  });

  function typeText(el, text, delay = 200, callback) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];

      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (callback) callback();
      }
    }, delay);
  }

  window.onload = () => {
    typeText(document.getElementById("typing1"), "takahashi", 200, () => {
      typeText(document.getElementById("typing2"), "tsuzumi", 200, () => {
        typeText(document.getElementById("typing3"), "portfolio", 200, () => {
          setTimeout(() => {
            document.getElementById("loader").classList.add("hide");
          }, 1000);
        });
      });
    });
  };
});
