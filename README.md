# Photo editor

JavaScriptでCanvasに表示した画像を加工する機能を提供します。


## 確認ブラウザ

Firefox 16.0.2


## 依存ライブラリ

* jQuery 1.8.2
* jQuery UI


## オブジェクト実装パターン

オブジェクトはApp.namespaceで管理する。

* 1ファイルに１オブジェクトを定義する。

### オブジェクトの実装

実装オブジェクトとはApp.namespaceメソッド(app.js)を使い下記のパターンで定義したオブジェクト(example.js)。

    jQuery(function() {

        /**
         * オブジェクトの実装パターン
         */
        var example = App.namespace('example')

        // 実装の定義
        (function() {
            // プライベート変数の例。
            var privateVar;

            // プライベート関数の例。
            function privateFunction() {};

            /**
             * パブリックな関数の例。
             */
            function publicFunction() {};

            // パブリックメソッドの設定
            example.publicFunction = publicFunction;
       }());

    });


### オブジェクトの利用

    jQuery(function($) {
        var example = App.namespace('example');
        ....
    });


## トップレベル

グローバル変数はjQueryとApp。


## 名前空間

App.namespaceは引数に指定されたオブジェクトが内部オブジェクトリストにあるときはそのオブジェクトを返す。  
無ければ空オブジェクト{}を作成し内部オブジェクトリストに登録して返す。


# Image module

## 依存ライブラリ

* jQuery 1.8.2
* jQuery UI


# canvasの処理

HTMLCanvasElementのgetContext('2d')でCanvasRenderingContext2Dブジェクトを取得する。
CanvasRenderingContext2Dはcanvasのピクセルデータを表すImageDataを取得・設定するメソッドやHTMLImageElement(img要素)をcvnasに描画するメソッドを持つ。

&raquo; [CanvasRenderingContext2D](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/)

    interface CanvasRenderingContext2D {

      // .....................................

      // drawing images
      void drawImage((HTMLImageElement or HTMLCanvasElement or HTMLVideoElement) image, unrestricted double dx, unrestricted double dy);
      void drawImage((HTMLImageElement or HTMLCanvasElement or HTMLVideoElement) image, unrestricted double dx, unrestricted double dy, unrestricted double dw, unrestricted double dh);
      void drawImage((HTMLImageElement or HTMLCanvasElement or HTMLVideoElement) image, unrestricted double sx, unrestricted double sy, unrestricted double sw, unrestricted double sh, unrestricted double dx, unrestricted double dy, unrestricted double dw, unrestricted double dh);

      // pixel manipulation
      // .....................................
      ImageData getImageData(double sx, double sy, double sw, double sh);
      void putImageData(ImageData imagedata, double dx, double dy, double dirtyX, double dirtyY, double dirtyWidth, double dirtyHeight);
      void putImageData(ImageData imagedata, double dx, double dy);
    };



&raquo; [ImageDataインターフェース](http://www.w3.org/html/wg/drafts/2dcontext/html5_canvas/#imagedata)

ImageDataはHTMLCanvasElementのピクセルデータの情報を表す。dataプロパティはcanvasの左上からR,G,B,Aの順にピクセル情報を格納している。

    interface ImageData {
      readonly attribute unsigned long width;
      readonly attribute unsigned long height;
      readonly attribute Uint8ClampedArray data;
    };

ImageDataオブジェクトのdata配列例。

    [
        // 左上 白(FFFFFF)のピクセル情報
        255, // Red
        255, // Green
        255, // Blue
        255,   // Alpha
        // 左中 赤(FF0000)のピクセル情報
        255, // R
        0,   // G
        0,   // B
        255,   // A
    ]


# License

Copyright (c) 2016 Hiroshi Sawai

Licensed under the MIT license, see LICENSE.txt.
