/*
 * textHint - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){a.fn.textHint=function(g){var e=this,d=a.extend(true,g,{attribute:"title",blurClass:"blur"});return e.each(function(){function f(){a(this).removeClass(d.blurClass);a(this).val()===b&&a(this).val("");return true}var c=a(this),b=c.attr(d.attribute);if(b){var h=c.parents("form");c.focus(f).blur(function(){if(a(this).val()===""){a(this).addClass(d.blurClass);a(this).val(b)}});c.blur();h.submit(function(){e.each(function(){a(this).val()===b&&a(this).val("")})});a(window).unload(f)}})}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("textHint",{settings:{selector:"input.hint, textarea.hint"},init:function(){$(function(){$(SimpleLib.textHint.settings.selector).textHint(SimpleLib.textHint.settings)})}});