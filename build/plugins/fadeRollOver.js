/*
 * fadeRollOver - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(c){var f=navigator.userAgent.indexOf("MSIE")!=-1;c.fn.fadeRollOver=function(j){var d=c.extend(true,{postfix:"-over",fadeInTime:0,fadeOutTime:300},j);c(this).each(function(){var e=c(this),a=e.children("img");if(!a.length&&e.attr("src"))a=e;if(a.length){var g=a.attr("src"),h=g.match(/\.png$/)!="",i=g.replace(/\.([a-zA-Z0-9]+)$/,d.postfix+".$1");if(!f||!h){var b=c('<img style="display:block;position:absolute;" class="over" />').attr("src",i);a.before(b);b.hide()}e.hover(function(){if(f&&h)a.attr("src",
i);else{b.is(":visible")||b.css({opacity:0}).show();b.css("top",a.offset().top+"px");b.css("left",a.offset().left+"px");b.stop().animate({opacity:1},d.fadeInTime);a.stop().animate({opacity:0},d.fadeInTime)}},function(){if(f&&h)a.attr("src",g);else{b.stop().animate({opacity:0},d.fadeOutTime);a.stop().animate({opacity:1},d.fadeOutTime,function(){b.hide()})}})}});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("fadeRollOver",{settings:{selector:".fadeRollOver, .faderollover"},init:function(){$(function(){$(SimpleLib.fadeRollOver.settings.selector).fadeRollOver(SimpleLib.fadeRollOver.settings)})}});