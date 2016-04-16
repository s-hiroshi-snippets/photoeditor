jQuery(function($) {

    var navList = $('#edit-dialog li');

    // クリックイベントのコールバック関数
    var clickHandler  = function(targetNo) {
        return function() {
            var tabs = $('.tabs');
            var tabNo;
            for (tabNo = 0; tabNo < tabs.length; tabNo++) {
                if (tabNo === targetNo) {
                    // activeクラスをタブメニューに設定
                    $((navList).get(tabNo)).addClass('active');
                    // タブの表示 一度全て非表示してから表示する
                    tabs.css('display', 'none');
                    var targetTab = tabs.get(tabNo);
                    $(targetTab).css('display', 'block');

                } else {
                    $(navList.get(tabNo)).removeClass('active');
                }
            }
        };
    };

    // クライアント用マイページのタブ切替
    navList.each(function(i) {
        var callbackfunc = clickHandler(i);
        var listItem = navList.get(i);
        $(listItem).click(callbackfunc);
    });

});
