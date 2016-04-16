/**
 * 画像アップロード処理
 *
 * @module client
 * @submodule uploader
 * @class UploaderHTML5
 */
jQuery(function($) {

    var uploader = App.namespace('UploaderHTML5');

    // uploader実装
    (function () {
        var canvas;
        var original = App.namespace('Original');

        // 対象キャンバスを取得
        (function() {
            canvas = $('#main-canvas').get(0);
        }());

        /**
         * 圧縮方式のチェック
         *
         * png, jpegならばtrue。対応していないタイプならばアラートを表示してfalseを返す
         * @method checkFormat
         * @param {String} format 画像フォーマット
         * @return {Boolean}
          */
        function checkFormat(format) {
            // ファイルタイプの確認
            if (format.match(/^image\/(png|jpeg)$/) === null) {
                return false;
            }
            return true;
        }

        /**
         * imgの画像データーをcanvasへ描画
         *
         * @private
         * @method imgToCanvas
         * @param {HTMLImgElement} img canvasへ描画するimg要素
         */
        function imgToCanvas(img) {
            return function() {
                var ctx = canvas.getContext('2d');
                try {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    $(img).remove();
                    // オリジナルデータの設定
                    var originalData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    original.setOriginal(originalData);
                    original.setOriginalWidth(canvas.width);
                    original.setOriginalHeight(canvas.height)
                } catch (e) {
                    alert('imgデータをcanvasへ描画できません。');
                }
            };
        }

        /**
         * 画像読込
         *
         * @private
         * @method readFile
         * @param {Object} reader
         * reader{FileReader}: reader<br>
         * img: img
         */
        function readFile(reader) {
            return function() {
                // 一時的にデータを読み込むimg要素
                var img = $('<img>').get(0);
                img.onload = imgToCanvas(img);
                // 画像読み込み
                img.setAttribute('src', reader.result);
            };
        }

        /**
         *  画像ファイル描画
         *
         * @private
         * @method drawFile
         * @param {Object} file
         *
         */
        function drawFile(file) {
            var reader = new FileReader();
            reader.onload = readFile(reader);
            reader.readAsDataURL(file);
        }

        /**
         * イベントハンドラ 参照ボタンで読込処理
         *
         * @method .image.live
          */
        $('#upload').bind('change', function() {
            $('#drop-message').remove();
            var file = this.files[0];
            // ファイルタイプの確認
            if (checkFormat(file.type) === false) {
                alert('対応していないファイル形式です。\nファイルはPNG, JPEG, GIFに対応しています。');
            }
            drawFile(file);
        });

        /**
         * ドラッグイベントのdefault処理をキャンセルする為にfalseを返す
         */
        $(canvas).parent().get(0).ondragover = function() {
            return false;
        };

        /**
         * ドラッグアンドドロップ読込ハンドラ
         *
         * @private
         * @method
         */
        $(canvas).parent().get(0).ondrop = function(e) {
            $('#drop-message').remove();
            var file;
            if (e.dataTransfer.files.length === 0) {
                alert('画像を開けませんでした。');
                return false;
            }
            file = e.dataTransfer.files[0];
            // ファイルタイプの確認
            if (checkFormat(file.type) === false) {
               aleft('対応していないファイル形式です。\nファイルはPNG, JPEG, GIFに対応しています。');
            }
            drawFile(file);
            return false;

        };

    }());

});
