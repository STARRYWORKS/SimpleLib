/*
 * trimmedScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){b.fn.trimmedScroll=function(h){var d=b.extend(true,{scrollTimePerPixcel:20,fadeTime:1E3,scrollImgClass:"scroll",scrollImgPostfix:"-scroll"},h);b(this).each(function(){var a=b(this).find("img");if(a.length){var f=a.attr("src");if(d.scrollImgAttribute){f=b(this).attr(d.scrollImgAttribute);b(this).attr(d.scrollImgAttribute,"")}else f=f.replace(/(\.[^\.]+)$/,d.scrollImgPostfix+"$1");a.width();a.height();var c=b('<span style="display:block;position:absolute;margin:0px;padding:0px;overflow:hidden"></span>').prependTo(a.parent()),
e=b('<img style="margin:0px;padding:0px;border:none;" />').attr("src",f).addClass(d.scrollImgClass).appendTo(c);b("<img />").attr("src",f);c.hide();b(this).css("cursor","pointer");b(this).hover(function(){if(c.css("display")=="none"){e.css({marginTop:"0"});c.animate({opacity:0},0)}c.css("left",a.offset().left+"px");c.css("top",a.offset().top+"px");c.width(a.attr("width")?parseInt(a.attr("width")):a.width());c.height(a.attr("height")?parseInt(a.attr("height")):a.height());c.stop().show().animate({opacity:1},
d.fadeTime);e.css("width","auto").css("height","auto");var g=a.height()-e.height();e.css("margin-top",0);var i=(g-parseInt(e.css("margin-top")))*d.scrollTimePerPixcel*-1;if(e.css("margin-top")==g+"px")g=0;e.stop().animate({marginTop:g},i,"linear")},function(){e.queue([]).stop();c.stop().animate({opacity:0},d.fadeTime,function(){b(this).hide()})})}});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("trimmedScroll",{settings:{selector:".trimmedScroll"},init:function(){$(function(){$(SimpleLib.trimmedScroll.settings.selector).trimmedScroll(SimpleLib.trimmedScroll.settings)})}});