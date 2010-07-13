/*
 * showIfScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.showIfScroll=function(b){var c=$.extend(true,{offset:0},b),a=$(this);$(window).resize(function(){$(document).height()+c.offset<=$(window).height()?a.hide():a.show()});$(window).resize();return this};

/* SimpleLib Plugin */

SimpleLib.extend("showIfScroll",{settings:{selector:".showIfScroll"},init:function(){$(function(){$(SimpleLib.showIfScroll.settings.selector).showIfScroll(SimpleLib.showIfScroll.settings)})}});