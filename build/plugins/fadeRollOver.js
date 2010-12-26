/*
 * fadeRollOver - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(e){var h=navigator.userAgent.indexOf("MSIE")!=-1;e.fn.fadeRollOver=function(j){var d=e.extend(true,{postfix:"-over",crossFade:false,fadeInTime:0,fadeOutTime:300},j);e(this).each(function(){var g=e(this),a=g.children("img");if(!a.length&&g.attr("src"))a=g;if(a.length){var f=a.attr("src"),i=f.match(/\.png$/)!="",k=f.replace(/\.([a-zA-Z0-9]+)$/,d.postfix+".$1");if(!h||!i){var c=e('<img width="'+a.width()+'" height="'+a.height()+'" class="dummy" />');a.before(c);c.hide();var b=e('<img style="display:block;position:absolute;" class="over" />').attr("src",
f);a.before(b);b.hide();var l=a.css("position")}g.hover(function(){a.attr("src",k);if(!(h&&i)){b.is(":visible")||b.show();a.css("position","absolute");c.show();b.css("top",c.offset().top+"px");b.css("left",c.offset().left+"px");a.css("top",c.offset().top+"px");a.css("left",c.offset().left+"px");a.stop().css({opacity:0}).animate({opacity:1},d.fadeInTime);d.crossFade&&b.stop().animate({opacity:0},d.fadeInTime)}},function(){if(h&&i)a.attr("src",f);else{a.stop().animate({opacity:0},d.fadeOutTime,function(){b.hide();
c.hide();a.attr("src",f).css({position:l,opacity:1})});d.crossFade&&b.stop().animate({opacity:1},d.fadeOutTime)}})}});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("fadeRollOver",{settings:{selector:".fadeRollOver, .faderollover"},init:function(){$(function(){$(SimpleLib.fadeRollOver.settings.selector).fadeRollOver(SimpleLib.fadeRollOver.settings)})}});
