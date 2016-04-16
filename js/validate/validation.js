/**
 * HTML5 uploader 入力チェック
 *
 * @module client
 * @submodule uploader
 * @class Validation
 */
jQuery(function($) {

    var validation = App.namespace('Validation');

    // Validationオブジェクト実装
    (function () {

        /**
         * undefined, null, 空文字''のときはfalse。
         *
         * @param values  スカラー値または配列
         * 引数なしで呼び出されたときはfalseを返す。
         * ネストは考慮しない。
         */
        var isNotEmpty = function (values) {
            var operands = [];
            var i;
            // 引数なし
            if (typeof values === 'undefined') {
                return false;
            }
            // scalar値は配列へ変換
            if ((values instanceof Array) === false) {
                operands.push(values);

            } else {
                operands = values;
            }
            for (i = 0; i < operands.length; i++) {
                if (typeof operands[i] === 'undefined') {
                    return false;
                }
                if (operands[i] === null) {
                    return false;
                }
                if (operands[i] === '') {
                    return false;
                }
            }
            return true;
        };

        /**
         * 0より大きいかをチェック
         *
         * @param {Number} num
         * 0より大きいときはtrue。それ以外はfalseを返す。
         * 引数なしで呼び出したときはfalse
         */
        var isMoreThan0 = function(num) {
            // キャスト失敗はNaNを返す(エラーではない)
            // undefined, 空文字, nullはNaNを返す
            var result = parseInt(num, 10);
            // 数字以外
            if (isNaN(result)) {
                return false;
            }
            // 0以下
            if ((num <= 0) === true) {
                return false;
            }
            // 0より大きい
            return true;
        };

        /**
         * 0以上かをチェック
         *
         * @param {Number} num
         * 0以上はtrue。それ以外はfalseを返す。
         * 引数なしで呼び出したときはfalse
         */
        var is0AndMore = function(num) {
            // キャスト失敗はNaNを返す(エラーではない)
            // undefined, 空文字, nullはNaNを返す
            var result = parseInt(num, 10);
            // 数字以外
            if (isNaN(result)) {
                return false;
            }
            // 0未満
            if ((num < 0) === true) {
                return false;
            }
            // 0以上
            return true;
        };

        // 公開メソッド
        validation.isNotEmpty = isNotEmpty;
        validation.isMoreThan0 = isMoreThan0;
        validation.is0AndMore = is0AndMore;

    }());

});