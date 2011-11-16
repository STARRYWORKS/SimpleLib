/*
 * ie6Png2Gif - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){b.fn.ie6Png2Gif=function(e){b.extend(true,{},e);var f=RegExp("\\.(png|PNG)(['\"]? *\\))?$","g");return b(this).each(function(){var a=b(this),c;c=a.is("img")?a.attr("src"):a.css("background-image");var d=c.replace(f,".gif$2");c!=d&&(a.is("img")?a.attr("src",d):a.css("background-image",d))})}})(jQuery);


/* SimpleLib Plugin */

SimpleLib&&SimpleLib.extend("ie6Png2Gif",{settings:{selector:".png2gif, .ie6Png2Gif"},init:function(){$(function(){$(SimpleLib.ie6Png2Gif.settings.selector).ie6Png2Gif(SimpleLib.ie6Png2Gif.settings)})}});