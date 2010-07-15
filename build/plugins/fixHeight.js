/*
 * fixHeight - jQuery Plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(){var d=[],e=0,c;$.checkFixHeight=function(a){if(!(c.height()==e&&a!==true)){e=c.height();$.each(d,function(){$(this).fixHeight()})}};$.fn.fixHeight=function(){this.each(function(){typeof $(this).data("fixHeightChildren")=="undefined"&&$(this).data("fixHeightChildren",$(this).children());if($(this).data("fixHeightChildren")){var a=$(this).data("fixHeightChildren");if(a.filter(":visible").length){var b=[],f=0;a.each(function(){if(f!=$(this).position().top){$(b).fixHeightChildren();b=[];f=
$(this).position().top}b.push(this)});b.length&&$(b).fixHeightChildren()}}})};$.fn.fixHeightChildren=function(){var a=0;this.css("height","auto");this.each(function(){if($(this).height()>a)a=$(this).height()});this.height(a);return this};$.fn.initFixHeight=function(){this.each(function(){var a=$(this),b=a.find(".fixHeightChild");b.length||(b=a.children());if(b.length){a.data("fixHeightChildren",b);d.push(a)}});return this};$(function(){$(".fixHeight").initFixHeight();c=$(document).append('<div style="position:absolute;left:-999px;top:-999px;">s</div>');
setInterval($.checkFixHeight,1E3);$(window).resize($.checkFixHeight);$.checkFixHeight()})})();