/*
 * imgSwap - jQuery plugin
 *
 * Author Koji Kimura, Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.imgSwap=function(g){var a=$.extend(true,{trigger:"click",attribute:"href",scrolling:false,scrollingTime:400},g);$(this).each(function(){var b=String($(this).attr(a.attribute)),d=b.match(/#(.+)$/);if(d){var e=$("#"+d[1]);$("<img>").attr("src",b);$(this).bind(a.trigger,function(){e.attr("src",b).css({width:"auto",height:"auto"});if(a.scrolling){var c=e.offset().top,f=$(window).scrollTop(),h=$(window).height();if(f+h<c||f>c)$("html,body").animate({scrollTop:c},a.scrollingTime)}return false})}})};

/* SimpleLib Plugin */

SimpleLib.extend("imgSwap",{settings:{selector:".imgswap, .imgSwap"},init:function(){$(function(){$(SimpleLib.imgSwap.settings.selector).imgSwap(SimpleLib.imgSwap.settings)})}});