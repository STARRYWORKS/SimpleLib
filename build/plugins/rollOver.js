/*
 * simpleRollOver - jQuery plugin
 *
 * Author Koji Kimura, Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){b.fn.simpleRollOver=function(f){var g=b.extend(true,{postfix:"-over"},f);b(this).each(function(){var c=b(this),a=c.children("img");if(!a.length&&c.attr("src"))a=c;if(a.length){var d=a.attr("src"),e=d.replace(/\.([a-zA-Z0-9]+)$/,g.postfix+".$1");b("<img />").attr("src",e);c.hover(function(){a.attr("src",e)},function(){a.attr("src",d)})}});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("rollOver",{settings:{selector:".rollover, .rollOver"},init:function(){$(function(){$(SimpleLib.rollOver.settings.selector).simpleRollOver(SimpleLib.rollOver.settings)})}});