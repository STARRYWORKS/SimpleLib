/*
 * fadeRollOver - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(e){var h=navigator.userAgent.indexOf("MSIE")!=-1;e.fn.fadeRollOver=function(k){var d=e.extend(true,{postfix:"-over",crossFade:false,fadeInTime:0,fadeOutTime:300},k);e(this).each(function(){var g=e(this),a=g.children("img");if(!a.length&&g.attr("src"))a=g;if(a.length){var f=a.attr("src"),i=f.match(/\.png$/)!="",l=f.replace(/\.([a-zA-Z0-9]+)$/,d.postfix+".$1");if(!h||!i){var j=a.css("position"),b=e('<img width="'+a.width()+'" height="'+a.height()+'" class="dummy" />');a.before(b);b.css("position",
j);b.css("display",a.css("display"));b.hide();var c=e('<img style="display:block;position:absolute;" class="over" />').attr("src",f);a.before(c);c.hide()}g.hover(function(){a.attr("src",l);if(!(h&&i)){c.is(":visible")||c.show();a.css("position","absolute");b.show();c.css("top",b.offset().top+"px");c.css("left",b.offset().left+"px");a.css("top",b.offset().top+"px");a.css("left",b.offset().left+"px");a.stop().css({opacity:0}).animate({opacity:1},d.fadeInTime);d.crossFade&&c.stop().animate({opacity:0},
d.fadeInTime)}},function(){if(h&&i)a.attr("src",f);else{a.stop().animate({opacity:0},d.fadeOutTime,function(){c.hide();b.hide();a.attr("src",f).css({position:j,opacity:1})});d.crossFade&&c.stop().animate({opacity:1},d.fadeOutTime)}})}});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("fadeRollOver",{settings:{selector:".fadeRollOver, .faderollover"},init:function(){$(function(){$(SimpleLib.fadeRollOver.settings.selector).fadeRollOver(SimpleLib.fadeRollOver.settings)})}});
