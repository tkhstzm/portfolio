document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------
     ヘッダーのスクロール制御
  --------------------------- */
  const header = document.querySelector('header');
  let prevY = window.pageYOffset;
  let lock = false; // アンカー移動後のスクロール無効化

  window.addEventListener('scroll', () => {
    if (lock) return;

    const currentY = window.pageYOffset;

    if (currentY < prevY) {
      header.classList.remove('hidden'); // 上スクロールで表示
    } else {
      if (currentY > 0) header.classList.add('hidden'); // 下スクロールで非表示
    }

    prevY = currentY;
  });

  // アンカーリンククリック時
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('hidden'); // 強制表示
      lock = true;

      setTimeout(() => {
        prevY = window.pageYOffset;
        lock = false;
      }, 800); // スムーススクロール終了想定時間
    });
  });


  /* --------------------------
     カーソ
  --------------------------- */

    // クラスをJSで使えるように準備
    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('.hoverable');

    // マウスの位置を確認
    let lastX = 0;
    let lastY = 0;
    let requestId = null;

    //ホバー時の処理方法を設定
    document.addEventListener('mousemove', onMouseMove);
    for (let i = 0; i < $hoverables.length; i++) {
        $hoverables[i].addEventListener('mouseenter', onMouseHover);
        $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
    }

    // マウス移動時の処理
    function onMouseMove(e) {
        const x = e.clientX; // 画面内のX座標（スクロール影響なし）
        const y = e.clientY; // 画面内のY座標（スクロール影響なし）

        if (requestId) {
            cancelAnimationFrame(requestId);  // 以前のアニメーションをキャンセル
        }

        // リクエストアニメーションフレームを使ってスムーズにアニメーション
        requestId = requestAnimationFrame(() => {
            TweenMax.to($bigBall, 0.8, { 
                x: x - ($bigBall.offsetWidth / 2), 
                y: y - ($bigBall.offsetHeight / 2.5) 
            });

            TweenMax.to($smallBall, 0.1, { 
                x: x - ($smallBall.offsetWidth / 2), 
                y: y - ($smallBall.offsetHeight / 2) 
            });
        });
    }

    // ホバー時の処理
    function onMouseHover() {
        TweenMax.to($bigBall, 0.3, { scale: 4 });
    }
    function onMouseHoverOut() {
        TweenMax.to($bigBall, 0.3, { scale: 1 });
    }

    // .slick-prev, .slick-nextに対するカーソルの動き
    $(document).on('mouseenter', '.slick-prev, .slick-next', function () {
        onMouseHover();
    });

    $(document).on('mouseleave', '.slick-prev, .slick-next', function () {
        onMouseHoverOut();
    });


// document.querySelectorAll('img').forEach(img => {
//     img.addEventListener('mouseenter', () => {
//         $bigBall.style.mixBlendMode = 'normal';   // ← 反転OFFで黒が消えない
//         $bigBall.querySelector('circle').style.fill = '#4a4a4a';
//     });

//     img.addEventListener('mouseleave', () => {
//         $bigBall.style.mixBlendMode = 'difference';  // ← 元に戻す
//         $bigBall.querySelector('circle').style.fill = '#ffffff';
//     });
// });


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
                    typeText(document.getElementById("typing4"), ". . .", 500, () => {

                        setTimeout(() => {
                            document.getElementById("loader").classList.add("hide");
                        }, 1000);
                    });
                });
            });
        });
    };

    




    


});
