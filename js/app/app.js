/**
 * Appのトップレベルオブジェクト
 *
 * <p>Christian Johansen(著),長尾高弘(翻訳)『テスト駆動JavaScript』ASCII
 * 下記サイトで配布されているスクリプトを変更。</p>
 * <p>http://tddjs.com/</p>
 *
 * @module App
 */
function App() {}
/**
 *  名前空間を設定・管理する。
 *
 *  <p>引数に対応する既存のオブジェクトが存在するときは
 *  そのオブジェクトを返す。存在しないときは空のオブジェクト作成・登録してして返す。</p>
 *
 *  @param {String} name オブジェクト名
 *  @return {Object} 引数にマップされたオブジェクト
 */

/**
 * 名前空間の管理
 * @method 名前空間管理
 * @type {namespace}
 */
App.namespace = function() {
    var objectList = {};
    function namespace(name) {
        if (typeof objectList[name] === "undefined") {
            objectList[name] = {};
        }
        return objectList[name];
    }
    return namespace;
}();