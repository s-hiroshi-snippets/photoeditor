/**
 * サブモジュールtrimはcanvas画像のトリミング処理を提供する
 *
 * @module image
 * @submodule trim
 */

/**
 * Trimクラスはcanvasをトリミングする処理を提供する
 *
 * @class Trim
 */
jQuery(function($) {

    var trim = App.namespace('Trim');

    // Trim実装
    (function () {

        /**
         * 選択範囲表示
         *
         * @method openSelection
         * @param {jQuery} form 対象form
         */
        function openSelection(form) {
            $('.trim-selection', form).resizable();
            $('.trim-selection', form).draggable();
            $('.trim-selection', form).css({
                'display': 'block'
            });
        }

        /**
         * 選択範囲削除
         *
         * @method closeSelection
         * @param {jQuery} form 対象form
         */
        function closeSelection(form) {
            $('.trim-selection', form).css('display', 'none');
        }

        /**
         * 選択範囲変更
         *
         * @method resizeSelection
         * @param {jQuery} form 対象form
         */
        function resizeSelection(form) {
            $('#image-edit-trim-width').val($('.trim-selection', form).width());
            $('#image-edit-trim-height').val($('.trim-selection', form).height());
        }

        /**
         * トリムエリア横幅設定
         *
         * @method setWidth
         * @param target HTMLInputElement
         * @param {jQuery} form 対象form
         */
        function setWidth(target, form) {
            // 未入力はなにもしない
            if ($(target).val() === '') {
                return false;
            }
            // キャスト(キャストできないときはエラーではなくNaNが返る)
            var width = parseInt($(target).val(), 10);
            // 0より大きい数字以外はアラート
            if ((width > 0) === false) {
                alert('0より大きい整数を入力してください。');
                return false;
            }
            // DOM要素のstyleプロパティでサイズ指定。!importantを除いて最優先で提要。
            // $('#trim-selection').css()ではうまくいかない
            $('.trim-selection', form).get(0).style.width = $(target).val() + 'px';
            // #rtrim-selection要素のresizeイベントを発生させる
            $('.trim-selection', form).trigger('resize');
        }

        /**
         * トリムエリア縦幅設定
         *
         * @method setHeight
         * @param target HTMLInputElement
         * @param {jQuery} form 対象form
         */
        function setHeight(target, form) {
            // 未入力はなにもしない
            if ($(target).val() === '') {
                return false;
            }
            // キャスト(キャストできないときはエラーではなくNaNが返る)
            var height = parseInt($(target).val(), 10);
            // 0より大きい数字以外はアラート
            if ((height > 0) === false) {
                alert('0より大きい数字を入力してください。');
                return false;
            }
            // DOM要素のstyleプロパティでサイズ指定。!importantを除いて最優先で提要。
            // $('#trim-selection').css()ではうまくいかない
            $('.trim-selection', form).get(0).style.height = $(target).val() + 'px';
            // #trim-selection要素のresizeイベントを発生させる
            $('.trim-selection', form).trigger('resize');
        }

        /**
         * トリミング処理
         *
         * @method run
         * @param {HTMLCanvasElement} canvas 対象canvas
         * @param {CanvasRenderingContext2D} ctx 対象context
         * @param {jQuery} form 対象form
         * @return {Function}
         */
        function run(canvas, ctx, form) {
                var rect = {};
                var data;
                // trim-selectionの位置・サイズ取得
                rect.top = parseInt($('.trim-selection', form).css('top'), 10);
                rect.left = parseInt($('.trim-selection', form).css('left'), 10);
                rect.width = $('.trim-selection', form).width();
                rect.height = $('.trim-selection', form).height();
                $('.trim-selection', form).css({
                    'display': 'none'
                });
                // 選択範囲画像取得
                data = ctx.getImageData(rect.left, rect.top, rect.width, rect.height);
                // 画像出力
                canvas.width = data.width;
                canvas.height = data.height;
                ctx.putImageData(data, 0, 0);
        }

        // パブリックメソッド
        trim.openSelection = openSelection;
        trim.closeSelection = closeSelection;
        trim.resizeSelection = resizeSelection;
        trim.setWidth = setWidth;
        trim.setHeight = setHeight;
        trim.run = run;

    }());

});
