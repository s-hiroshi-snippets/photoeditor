/**
 * サブモジュールtrimはcanvas画像のトリミング処理を提供する
 *
 * @module image
 * @submodule trim
 */

/**
 * クラスTrimHandleはcanvasをトリム処理するイベントハンドル群
 *
 * @class TrimHandle
 */
jQuery(function($) {


    // TrimHandle実装
    (function () {

        var trim = App.namespace('Trim');
        var editData = App.namespace('EditData');

        /**
         * イベントハンドラ トリムエリア表示
         *
         * @method #open-trim-selection.click.
         */
        $('#open-trim-selection').click(function() {
            trim.openSelection(editData.getForm());
            return false;
        });

        /**
         * イベントハンドラ トリムエリア削除
         *
         * @method #trim-height.click.
         */
        $('#close-trim-selection').click(function() {
            trim.closeSelection(editData.getForm());
            return false;
        });

        /**
         * イベントハンドラ 選択範囲の変更に応じて縦・横を表示
         *
         * 選択範囲(.trim-selection要素)を変更したとき発生する。
         * triggerでも呼び出すのでbindを使う。
         *
         * @method .trim-selection.bind
         */
        $('.trim-selection').bind('resize', function() {
            trim.resizeSelection(editData.getForm());
            return false;
        });

        /**
         * イベントハンドラ トリムエリア横幅
         *
         * @method #image-edit-trim-width.keyup.
         */
        $('#image-edit-trim-width').keyup(function() {
            trim.setWidth(this, editData.getForm());
            return false;
        });

        /**
         * イベントハンドラ トリムエリア縦幅
         *
         * @method #trim-height.keyup.
         */
        $('#image-edit-trim-height').keyup(function() {
            trim.setHeight(this, editData.getForm());
            return false;
        });

        /**
         * イベントハンドラトリミング実行
         *
         * @method #image-edit-trim.click
         */
        $('#image-edit-trim').click(function() {
            trim.run(editData.getCanvas(), editData.getCtx(), editData.getForm());
            return false;
        });


    }());

});
