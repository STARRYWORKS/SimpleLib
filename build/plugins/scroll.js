/*
 * simpleScroll - jQuery plugin
 *
 * Version 1.0.2 on 2010.02.05
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleScroll=function(c){var d=$.extend(true,{time:600},c);$(this).click(function(){var a=$(this).attr("href"),b=0;if(a!="#")b=$(a).offset().top;$("html,body").animate({scrollTop:b},d.time);return false});return this};

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("scroll",{settings:{selector:".scroll"},init:function(){$(function(){$(SimpleLib.scroll.settings.selector).simpleScroll(SimpleLib.scroll.settings)})}});