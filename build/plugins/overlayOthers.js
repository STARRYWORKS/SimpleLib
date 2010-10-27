/*
 * overlayOthers - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){b.fn.overlayOthers=function(h){var a=b.extend(true,{opacity:0.8,exceptionSelector:".overlayException",othersClass:"others",overClass:"over",time:400,afterTime:0},h);b(this).each(function(){var g=b(this),e=g.find("a").not(a.exceptionSelector);e.each(function(){if(!(b(this).find("span.overlay").length>0)){var c=b('<span class="overlay" style="display:block;position:absolute;margin:0px;padding:0px;">&nbsp;</span>').prependTo(this);if((c.css("background-color")=="rgba(0, 0, 0, 0)"||c.css("background-color")==
"rgb(0, 0, 0)"||c.css("background-color")=="transparent")&&c.css("background-image")=="none")c.css("background-color","#ffffff");c.hide()}});e.hover(function(){e.addClass(a.othersClass);e.each(function(){var f=b(this),d=f.find("span.overlay");d.css("left",f.offset().left+"px");d.css("top",f.offset().top+"px");d.css("width",f.width()+"px");d.css("height",f.height()+"px");d.css("display")=="none"&&d.css({opacity:0});d.css("display","block").stop().animate({opacity:a.opacity},a.time,function(){a.afterTime&&
f.css("display","block").stop().animate({opacity:1},a.afterTime)})});var c=b(this);c.removeClass(a.othersClass);c.find("span.overlay").css("display","block").stop().animate({opacity:0},0).hide();c.addClass(a.overClass);g.addClass(a.overClass)},function(){e.find("span.overlay").stop().animate({opacity:0},a.time,function(){b(this).hide()});e.removeClass(a.othersClass);b(this).removeClass(a.overClass);g.removeClass(a.overClass)})});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib.extend("overlayOthers",{settings:{selector:".overlayOthers"},init:function(){$(function(){$(SimpleLib.overlayOthers.settings.selector).overlayOthers(SimpleLib.overlayOthers.settings)})}});