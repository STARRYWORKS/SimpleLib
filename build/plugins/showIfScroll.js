/*
 * showIfScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){a.fn.showIfScroll=function(d){function b(){a(document).height()+e.offset<=a(window).height()?c.hide():c.show()}var e=a.extend(true,{offset:0},d),c=a(this);a(window).resize(b);b();return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("showIfScroll",{settings:{selector:".showIfScroll"},init:function(){$(function(){$(SimpleLib.showIfScroll.settings.selector).showIfScroll(SimpleLib.showIfScroll.settings)})}});