/*
 * overlayOthers - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.overlayOthers=function(e){var b=$.extend(true,{opacity:0.8,exceptionSelector:".overlayException",othersClass:"others",overClass:"over",time:400},e);$(this).each(function(){var d=$(this),c=d.find("a").not(b.exceptionSelector);c.each(function(){if(!($(this).find("span.overlay").length>0)){var a=$('<span class="overlay" style="display:block;position:absolute;margin:0px;padding:0px;z-index:1;">&nbsp;</span>').prependTo(this);if((a.css("background-color")=="rgba(0, 0, 0, 0)"||a.css("background-color")==
"rgb(0, 0, 0)"||a.css("background-color")=="transparent")&&a.css("background-image")=="none")a.css("background-color","#ffffff");a.hide();$(this).data("$overlay",a)}});c.hover(function(){c.addClass(b.othersClass);c.each(function(){var a=$(this).data("$overlay");$(this).css("display","block");a.width($(this).width());a.height($(this).height());a.css("display")=="none"&&a.css({opacity:0});a.css("display","block").stop().animate({opacity:b.opacity},b.time)});$(this).removeClass(b.othersClass);$(this).data("$overlay").css("display",
"block").stop().animate({opacity:0},0).hide();$(this).addClass(b.overClass);d.addClass(b.overClass)},function(){c.find("span.overlay").stop().animate({opacity:0},b.time,function(){$(this).hide()});c.removeClass(b.othersClass);$(this).removeClass(b.overClass);d.removeClass(b.overClass)})});return this};

/* SimpleLib Plugin */

SimpleLib.extend("overlayOthers",{settings:{selector:".overlayOthers"},init:function(){$(function(){$(SimpleLib.overlayOthers.settings.selector).overlayOthers(SimpleLib.overlayOthers.settings)})}});