/**
 * モジュールfilteringはCanvasのフィルター処理を提供する
 *
 * @module filtering
 */

/**
 * イベントハンドラ集
 *
 * @class Handle
 */
jQuery(function($) {

    // Handle
    (function() {

        var graphic = App.namespace('Graphic');
        var scan = App.namespace('Scan');


        /**
         * フィルターハンドラ
         *
         * 1. process.initで処理対象のImageDataを設定する
         * 2. ImageDataをprocess.runへ投げる。
         * 3. 戻り値としてフィルタ処理後のピクセル配列を受け取る。
         * 4. ピクセル配列をImageDataにセットしてImageDataをCanvasへ描画する。
         *
         * @method button.click
         * @private
         */
        $('.filtering').click(function() {
            var name = $(this).attr('id');
            var canvas = graphic.getCanvas();
            var ctx = graphic.getContext();
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            scan.init(imageData);
            imageData.data.set(scan.run(name));
            ctx.putImageData(imageData, 0, 0);
            return false;
        });

    }());

});
