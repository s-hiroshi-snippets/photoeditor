jQuery(function() {

    var graphic = App.namespace('Graphic');

    (function() {

        var canvas = graphic.getCanvas();
        $('#save').click(function() {
            $('#save-dialog img').remove();
            var canvasData = canvas.toDataURL();
            var width = canvas.width + 40;
            var height = canvas.height + 80;
            $('#save-dialog').dialog({
                width: width,
                height: height
            });
            var img = $('<img>');
            img.width = canvas.width;
            img.height = canvas.height;
            img.appendTo($('#save-dialog'));
            img.get(0).setAttribute('src', canvasData);
        });

    }());
});