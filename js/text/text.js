/**
 * サブモジュールtextはテキストをcanvasへ描画するための一連の処理を提供する
 *
 * @module image
 * @submodule text
 */

/**
 * Textクラスはテキストをcanvasへ描画する処理を提供する
 *
 * @class Text
 */
jQuery(function($) {

    var text = App.namespace('Text');

    // Text実装
    (function () {

        /**
         * canvasへ描画するテキスト
         *
         * @property text
         * @private
         * @type HTMLDivElement
         */
        var textOutput;

        /**
         * テキストツール 入力域, 描画, 削除を持つdiv
         *
         * @property textTool
         * @private
         * @type HTMLDivElement
         */
        var textTool;

        /**
         * テキスト出力域、テキストツール表示
         *
         * @method open
         * @param {HTMLCanvasElement} canvas 描画対称のcanvas
         */
        function open(canvas) {
            // テキスト出力域
            var textOutput = $('<div class="text-output">');
            textOutput.appendTo(textTool);
            var parent = $(canvas).parent();
            $(textOutput).appendTo($(parent));

            // テキストツール
            textTool = $('<div class="text-tool">');
            $(textTool).resizable();
            $(textTool).draggable();
            var inputWrapper = $('<div class="text-input-wrapper"><input type="text" class="text-input" value="テキストを入力してください。"></div>');
            $(inputWrapper).appendTo(textTool);
            var buttonWrapper = $('<div class="text-button-wrapper">');
            buttonWrapper.appendTo(textTool);
            var draw = $('<button class="draw-text btn">描画</button>');
            $(draw).appendTo(buttonWrapper);
            var close = $('<button class="close-text-tool btn">閉じる</button>');
            $(close).appendTo(buttonWrapper);
            $(textTool).appendTo($(parent));
        }

        function syncText(input, output) {
    }
        /**
         * テキストレイヤー非表示
         *
         * @method closeLayer
         */
        function closeLayer() {
            if (typeof textOutput !== 'undefined') {
                $(textOutput).remove();
            }
            if (typeof textTool !== 'undefined') {
                $(textTool).remove();
            }
        }

        /**
         * 要素の親要素に対する相対値を取得
         *
         * @method getPosition
         * @param {jQuery} elem 位置を算出する対称
         * @return {Object} 親要素を基準にした相対位置を表すtopとleftを持つオブジェクト
         */
        function getPosition(elem) {
            var position = {};
            position.top = parseInt(elem.css('top'), 10);
            position.left = parseInt(elem.css('left'), 10);
            return position;
        }

        /**
         * テキストをcanvasへ描画
         *
         * @method draw
         * @position {Object} 描画位置
         * @ctx {CanvasRenderingContext2D} ctx
         * @form {HTMLFormElement} form
         */
        function draw(position, ctx, form) {
            var text = $('.text-input', form).val();
            if(text === '')  {
                return false;
            }
            ctx.fillStyle = "red";
            ctx.fillText(text, position.top + 14, position.left+14);
//            ctx.font = '14px' + ' "sans-serif"';
            return false;
        }

        text.getPosition = getPosition;
        text.open = open;
        text.closeLayer = closeLayer;
        text.draw = draw;

    }());

});
