jQuery(function() {
    (function() {
        var graphic  = App.namespace('Graphic');
        var original = App.namespace('Original');
        $('#original').click(function() {
            var imageData = original.getOriginal();
            var ctx = graphic.getContext();
            ctx.putImageData(imageData, imageData.width, imageData.height);
            return false;
        });
    }());

});