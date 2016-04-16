/**
 * モジュールoriginalはオリジナルのImageDataを提供する
 *
 * @module original
 */

/**
 * クラスOriginalは画像編集の元画像を管理する
 *
 * @class Original
 */
jQuery(function($) {

    var original = App.namespace('Original');

    // OriginalData実装
    (function () {

        var graphic = App.namespace('Graphic');

        var canvas = graphic.getCanvas();
        var ctx = graphic.getContext();

        /**
         * 元画像のImageData
         *
         * @property imageData
         * @private
         * @type {ImageData}
         */
        var originalData;

        /**
         * 元画像のImageData設定
         *
         * @method setOriginal
         * @param {ImageData} imageData オリジナル画像のImageData
         */
        function setOriginal(imageData) {
           originalData = imageData;
        }

        /**
         * 元画像のImageData取得
         *
         * @method getOriginal
         */
        function getOriginal() {
            return originalData;
        }

        /**
         * 元画像横幅設定
         *
         * @method setOriginalWidth
         * @private
         */
        function setOriginalWidth(width) {
            $('#org-width').val(width);
        }

        /**
         * 元画像縦幅設定
         *
         * @method setOriginalHeight
         * @private
         */
        function setOriginalHeight(height) {
            $('#org-height').val(height);
        }

        /**
         * イベントハンドラ オリジナルimageData表示
         *
         * @method #original.click
         */
        $('#original').click(function () {
            canvas.width = originalData.width;
            canvas.height = originalData.height;
            ctx.clearRect(0, 0, originalData.width, originalData.height);
            ctx.putImageData(originalData, 0, 0);
            $('#org-width').val(originalData.width);
            $('#org-height').val(originalData.height);
        });

        // パブリックメソッド
        original.setOriginal = setOriginal;
        original.getOriginal = getOriginal;
        original.setOriginalWidth = setOriginalWidth;
        original.setOriginalHeight = setOriginalHeight;
    }());

});
