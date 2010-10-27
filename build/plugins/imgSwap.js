/*
 * imgSwap - jQuery plugin
 *
 * Author Koji Kimura, Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){a.fn.imgSwap=function(h){var b=a.extend(true,{trigger:"click",attribute:"href",scrolling:false,scrollingTime:400},h);a(this).each(function(){var c=String(a(this).attr(b.attribute)),e=c.match(/#(.+)$/);if(e){var f=a("#"+e[1]);a("<img>").attr("src",c);a(this).bind(b.trigger,function(){f.attr("src",c).css({width:"auto",height:"auto"});if(b.scrolling){var d=f.offset().top,g=a(window).scrollTop(),i=a(window).height();if(g+i<d||g>d)a("html,body").animate({scrollTop:d},b.scrollingTime)}return false})}})}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("imgSwap",{settings:{selector:".imgswap, .imgSwap"},init:function(){$(function(){$(SimpleLib.imgSwap.settings.selector).imgSwap(SimpleLib.imgSwap.settings)})}});