/**
 * モジュールgraphicは処理対象HTMLCanvasElement, CanvasRenderingContext2Dの管理を提供する
 *
 * @module graphic
 */

/**
 * 処理対象のHTMLCanvasElement, CanvasRenderingContext2D
 *
 * @class Graphic
 */
jQuery(function($) {

    var graphic = App.namespace('Graphic');

    // Canvas
    (function () {

        /**
         * canvas
         *
         * @property canvas
         * @private
         * @type HHTMLCanvasElement
         *
         */
        var canvas;

        /**
         * canvas
         *
         * @method setCanvas
         * @param {HTMLCanvasElement} srcCanvas
         */
        function setCanvas(srcCanvas) {
            canvas = srcCanvas;
        }

        /**
         * 処理対象canvas取得
         *
         * @method getCanvas
         * @private
         * @return {HTMLCanvasElement}
         */
        function getCanvas() {
            return canvas;
        }

        /**
         * context
         *
         * getContext('2d')で取得したオブジェクト
         *
         * @property ctx
         * @private
         * @type {CanvasRenderingContext2D}
         *
         */
        var ctx;

        /**
         * 処理対象CanvasRenderingContext2D設定
         *
         * @method setContext
         * @param {HTMLCanvasElement} context
         */
        function setContext(context) {
            ctx = context;
        }

        /**
         * 処理対象CanvasRenderingContext2Dを取得
         *
         * @method getCtx
         * @private
         * @return {Object} CanvasRenderingContext2D
         */
        function getContext() {
            return ctx;
        }

        /**
         * initialize
         *
         * @method
         * @private
         */
        (function() {
            setCanvas($('#main-canvas').get(0));
            setContext(canvas.getContext('2d'));
        }());

        // パブリックメソッド
        graphic.setCanvas = setCanvas;
        graphic.getCanvas = getCanvas;
        graphic.setContext = setContext;
        graphic.getContext = getContext;

    }());

});
