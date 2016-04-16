/**
 * サブモジュールtextはテキストをcanvasへ描画するための一連の処理を提供する
 *
 * @module image
 * @submodule text
 */

/**
 * TextHandleクラスはcanvasのテキスト処理ハンドル集
 *
 * @class TextHandle
 */
jQuery(function($) {

    // Text実装
    (function () {

        var editData = App.namespace('EditData');
        var text = App.namespace('Text');

        /**
         * テキストレイヤー表示イベントハンドラ
         *
         * @method #show-text.click
         *
         */
        $('#open-text').click(function() {
            var canvas = editData.getCanvas();
            text.open(canvas);
        });

        /**
         * テキストレイヤー削除イベントハンドラ
         *
         * @method #close-text.click
         *
         */
        $('.close-text').live('click', function() {
            text.closeLayer(editData.getForm());
            return false;
        });

        /**
         * text-inputの入力キーイベントをチェックしtext-outputへ出力する
         *
         * @method
         */
        $('.input-text').live('click blur keydown keyup keypress change', function() {
            var input = $(this).val();
            input = input.replace(/\n/g, '<br>');
            var form = $(this).closest('form');
            $('.text-output', form).html(input);
        });
        /**
         * draw text
         */
        $('.draw-text').live('click', function() {
            var ctx = editData.getCtx();
            var form = editData.getForm();
            var elem = $('.text-tool', form);
            var position = text.getPosition($(elem));
            text.draw(position, ctx, form);
            return false;
        });

    }());

});
