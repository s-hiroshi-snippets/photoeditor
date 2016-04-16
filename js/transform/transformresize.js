/**
 * モジュールtransformはcanvasをアフィン変換する処理を提供する
 *
 * @module image
 * @submodule transform
 */

/**
 * TransformResizeはcanvasをリサイズする処理を提供する
 *
 * @class TransformResize
 */
jQuery(function($) {

    var transformResize = App.namespace('TransformResize');

    // FilterResize実装
    (function () {

        var graphic = App.namespace('Graphic');
        var validation = App.namespace('Validation');

        var canvas = graphic.getCanvas();
        var ctx = graphic.getContext();

        /**
         * リサイズ後の縦横さを返す
         *
         * @method getNoFixSize
         * @private
         * @param {Object} params key/value pair<br>
         *     width: リサイズ前の横幅<br>
         *     height: リサイズ後の高さ<br>
         *     isRatio: 縦横固定フラグ
         * @return {Object} リサイズ後の縦横
         */
        function getNoFixSize(params) {
            // 横または縦にプラスの値が入力されているか。
            if (params.isRatio === false &&
                (validation.isMoreThan0(params.width) === false  || validation.isMoreThan0(params.height) === false)) {
                alert('縦横比固定にチェックがないときは横・縦の両方入力ください。' + '\n' + 'または定型変形をチェックください。');
                return false;
            }

            if (params.isRatio === true &&
                (validation.isMoreThan0(params.width) === false && validation.isMoreThan0(params.height) === false)) {
                alert('縦横比固定の場合は横または縦を入ください。' + '\n' + 'または定型変形をチェックください。');
                return false;
            }

            // 縦横比固定優先
            // 縦横比固定のときは横幅優先
            if (params.isRatio === true && validation.isMoreThan0(params.width) === true) {
                params.height = Math.round(canvas.height * (params.width / canvas.width));
                $('#height').val(params.height);
            }
            else if (params.isRatio ===  true && validation.isMoreThan0(params.height) === true) {
                params.width = Math.round(canvas.width * (params.height / canvas.height));
                $('#width').val(params.width);
            }

            return params;
        }

        /**
         * リサイズ後の縦横さを返す
         *
         * @method getFixSize
         * @private
         * @return {Object} リサイズ後の縦横
         */
        function getFixSize() {
            var scale = width / canvas.width;
            var after = {
                width: Math.round(canvas.width * scale),
                height: Math.round(canvas.height * scale)
            };
            return after;
        }

        /**
         * 画像を拡大・縮小して描画
         *
         * @method draw
         * @private
         * @param {Object} before リサイズ前の縦・横
         * @param {Object} after リサイズ後の縦・横
         */
        function draw(before, after) {
            // 回転して描画
            // 1. 画像をimgに読み込む
            // 2. 現在のcanvasデータを一度img要素に読み込む
            // 3. canvasを変形
            // 4. imgデータをcanvasに再描画
            // 5. imgの削除
            var canvasData = canvas.toDataURL();
            var img = $('<img>').get(0);
            img.onload = (function() {
                return function() {
                    canvas.width = after.width;
                    canvas.height = after.height;
                    img.width = after.width;
                    img.height = after.height;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.setTransform(after.width/before.width, 0, 0, after.height/before.height, 0, 0);
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    $(img).remove();
                };
            }());
            img.setAttribute('src', canvasData);
        }

        /**
         * リサイズフィルタの実行
         *
         * @method run
         * @return {Boolean} 処理を失敗したとき
         */
        function run() {
            // 現在の画像サイズ
            var before = {
                width: $('#width').val(),
                height: $('#height').val()
            };

            // リサイズ後の画像サイズを取得
            var args = {
                width: before.width,
                height: before.height,
                isRatio: $('#ratio').is(':checked')
            };
            var bootstrap = parseInt($('input[name="bootstrap"]:checked').val(), 10);
            var after;
            if (isNaN(bootstrap) === true) {
                after = getNoFixSize(args);
            }
            if (isNaN(bootstrap) === false) {
                after = getFixSize(bootstrap);
            }
            if (after === false) {
                return false;
            }

            // リサイズして描画
            draw(before, after);
        }

        transformResize.run = run;

    }());

});
