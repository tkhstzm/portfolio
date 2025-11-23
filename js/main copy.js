//header
      const header = document.querySelector('header');
      let prevY = window.pageYOffset;
      let lock = false; // ← アンカー移動後のスクロール無効化フラグ

      // スクロールイベント
      window.addEventListener('scroll', () => {
        if (lock) return; // ← アンカー移動後は動作しない

        const currentY = window.pageYOffset;

        if (currentY < prevY) {
          // 上スクロール → 表示
          header.classList.remove('hidden');
        } else {
          // 下スクロール → 非表示
          if (currentY > 0) {
            header.classList.add('hidden');
          }
        }

        prevY = currentY;
      });

      // アンカーリンククリック時
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
          header.classList.remove('hidden'); // まずは表示
          lock = true;                       // スクロール判定を一時停止

          // スムーススクロール終了後に解除
          setTimeout(() => {
            prevY = window.pageYOffset; // ← 現在位置を基準に再スタート
            lock = false;
          }, 800); // ← 0.8秒ならほぼ確実にスムーススクロール終了
        });
      });



        // ページ内スクロール
        $('a[href^="#"]').click(function () {
          const speed = 600;
          let href = $(this).attr("href");
          let target = $(href == "#" || href == "" ? "html" : href);
          let position = target.offset().top;
          $("body,html").animate({ scrollTop: position }, speed, "swing");
          return false;
        });


        // ふわっ
        function fadeAnime(){
            $('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
            var elemPos = $(this).offset().top-50;//要素より、50px上の
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll >= elemPos - windowHeight){
            $(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
            }else{
            $(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
            }
            });
            }

            // 画面をスクロールをしたら動かしたい場合の記述
            $(window).scroll(function (){
            fadeAnime();/* アニメーション用の関数を呼ぶ*/
            });// ここまで画面をスクロールをしたら動かしたい場合の記述



            






    // カーソル要素の取得
    const $bigBall = document.querySelector('.cursor__ball--big');
    const $smallBall = document.querySelector('.cursor__ball--small');
    const $hoverables = document.querySelectorAll('.hoverable');

    // マウスムーブ時のリスナー
    let lastX = 0;
    let lastY = 0;
    let requestId = null;

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
            TweenMax.to($bigBall, 0.4, { x: x - ($bigBall.offsetWidth / 2), y: y - ($bigBall.offsetHeight / 2) });
            TweenMax.to($smallBall, 0.1, { x: x - ($smallBall.offsetWidth / 2), y: y - ($smallBall.offsetHeight / 2) });
        });
    }

    // ホバー時の処理
    function onMouseHover() {
        TweenMax.to($bigBall, 0.3, { scale: 3 });
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