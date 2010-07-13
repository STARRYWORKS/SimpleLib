/*
 * trimmedScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.trimmedScroll=function(g){var a=$.extend(true,{scrollTimePerPixcel:20,fadeTime:1E3,scrollImgClass:"scroll",scrollImgPostfix:"-scroll"},g);$(this).each(function(){var c=$(this).find("img");if(c.length){var e=c.attr("src");if(a.scrollImgAttribute){e=$(this).attr(a.scrollImgAttribute);$(this).attr(a.scrollImgAttribute,"")}else e=e.replace(/(\.[^\.]+)$/,a.scrollImgPostfix+"$1");var h=c.width(),i=c.height(),d=$('<span style="display:block;width:'+h+"px;height:"+i+'px;overflow:hidden;position:absolute;"></span>').insertBefore(c),
b=$("<img />").attr("src",e).addClass(a.scrollImgClass).appendTo(d);$("<img />").attr("src",e);d.hide();$(this).css("cursor","pointer");$(this).hover(function(){if(d.css("display")=="none"){b.css({marginTop:"0"});d.animate({opacity:0},0)}d.stop().show().animate({opacity:1},a.fadeTime);b.css("width","auto").css("height","auto");var f=c.height()-b.height(),j=(f-parseInt(b.css("margin-top")))*a.scrollTimePerPixcel*-1;if(b.css("margin-top")==f+"px")f=0;b.stop().animate({marginTop:f},j,"linear")},function(){b.queue([]).stop();
d.stop().animate({opacity:0},a.fadeTime,function(){$(this).hide()})})}});return this};


/* SimpleLib Plugin */

SimpleLib.extend("trimmedScroll",{settings:{selector:".trimmedScroll"},init:function(){$(function(){$(SimpleLib.trimmedScroll.settings.selector).trimmedScroll(SimpleLib.trimmedScroll.settings)})}});