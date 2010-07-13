/*
 * textHint - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.textHint=function(f){var d=this,c=$.extend(true,f,{attribute:"title",blurClass:"blur"});return d.each(function(){function e(){$(this).removeClass(c.blurClass);$(this).val()===a&&$(this).val("");return true}var b=$(this),a=b.attr(c.attribute);if(a){var g=b.parents("form");b.focus(e).blur(function(){if($(this).val()===""){$(this).addClass(c.blurClass);$(this).val(a)}});b.blur();g.submit(function(){d.each(function(){$(this).val()===a&&$(this).val("")})});$(window).unload(e)}})};

/* SimpleLib Plugin */

SimpleLib.extend("textHint",{settings:{selector:"input.hint, textarea.hint"},init:function(){$(function(){$(SimpleLib.textHint.settings.selector).textHint(SimpleLib.textHint.settings)})}});