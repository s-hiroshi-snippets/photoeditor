/**
 * モジュールtransformはcanvasをアフィン変換する処理を提供する
 *
 * @module image
 * @submodule transform
 */

/**
 * TransformRotateはcanvasを回転する
 *
 * @class TransformRotate
 */
jQuery(function($) {

    var transformRotate = App.namespace('TransformRotate');

    // TransformRotate実装
    (function () {

        /**
         * 回転
         *
         * @method
         * @private
         * @param {Number} angle 度数
         * @param {HtmlCanvasElement} canvas
         * @param {CanvasRenderingContext2D} ctx
         * @param {HtmlImageElement} img
         */
        function rotate(angle, canvas, ctx, img) {
            return function() {
                var width = canvas.width;
                var height = canvas.height;
                // 90度単位の回転なので縦横を入れ替える
                canvas.width = height;
                canvas.height = width;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                // 回転
                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.rotate(angle * Math.PI / 180);
                ctx.translate(-img.width / 2, -img.height / 2);
                // 描画
                ctx.drawImage(img, 0, 0, img.width, img.height);
                $(img).remove();
            };
        }

        /*
         * 回転フィルタを実行
         *
         * @method run
         * @param {Number} angle 度数
         * @param {HtmlCanvasElement} canvas
         * @param {CanvasRenderingContext2D} ctx
         */
        function run(angle, canvas, ctx) {
            var canvasData = canvas.toDataURL();
            var img = $('<img>').get(0);
            img.onload = rotate(angle, canvas, ctx, img);
            img.setAttribute('src', canvasData);
        }

        // メソッド公開処理
        transformRotate.run = run;

    }());

});
