/**
 * サブモジュールtransformはcanvasをアフィン変換する処理を提供する
 *
 * @module image
 * @submodule transform
 */

/**
 * TransformHandleクラスはcanvasをアフィン変換するイベントハンドル集
 *
 * @class TransformHandle
 */
jQuery(function($) {

    // TransformHandle実装
    (function () {

        var graphic = App.namespace('Graphic');
        var transformResize = App.namespace('TransformResize');
        var transformRotate = App.namespace('TransformRotate');

        var canvas = graphic.getCanvas();
        var ctx = graphic.getContext();

        /**
         * イベントハンドラ resize
         *
         * @method #image-edit-resize.click
         */
        $('#resize').click(function () {
            transformResize.run();
            return false;
        });

        /**
         * 右90度回転
         *
         * @method #image-edit-rotate-right.click
         */
        $('#rotate-right').click(function () {
            transformRotate.run(90, canvas, ctx);
            return false;
        });

        /**
         * 左90度回転
         *
         * @method #image-edit-rotate-left.click
         */
        $('#rotate-left').click(function () {
            transformRotate.run(-90, canvas, ctx);
            return false;
        });

    }());

});
