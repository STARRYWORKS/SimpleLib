/*
 * simpleRollOver - jQuery plugin
 *
 * Author Koji Kimura, Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleRollOver=function(e){var f=$.extend(true,{postfix:"-over"},e);$(this).each(function(){var b=$(this),a=b.children("img");if(!a.length&&b.attr("src"))a=b;if(a.length){var c=a.attr("src"),d=c.replace(/\.([a-zA-Z0-9]+)$/,f.postfix+".$1");$("<img />").attr("src",d);b.hover(function(){a.attr("src",d)},function(){a.attr("src",c)})}});return this};

/* SimpleLib Plugin */
SimpleLib.extend("rollOver",{settings:{selector:".rollover, .rollOver"},init:function(){$(function(){$(SimpleLib.rollOver.settings.selector).simpleRollOver(SimpleLib.rollOver.settings)})}});