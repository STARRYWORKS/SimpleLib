/*
 * simpleAccordion - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){a.fn.simpleAccordion=function(h){var b=a.extend(true,{selector:".accordion",handleSelector:".handle",selectedClass:"selected",time:300},h);a(this).each(function(){var d=a(this),e=[];d.find(b.handleSelector).each(function(){a(this).parents(b.selector).get(0)==d.get(0)&&e.push(this)});var f=a(e);f.each(function(){var c,g=a(this).attr("href");c=g=="#"?a(this).next():a(g);a(this).data("slave",c);a(this).hasClass(b.selectedClass)||c.hide();a(this).click(function(){if(a(this).hasClass(b.selectedClass)){c.css("height",
"auto").slideUp(b.time);a(this).removeClass(b.selectedClass)}else{c.show().css("height","auto").height(c.height()).hide().slideDown(b.time);f.each(function(){if(a(this).hasClass(b.selectedClass)){a(this).removeClass(b.selectedClass);a(this).data("slave").slideUp(b.time)}});a(this).addClass(b.selectedClass)}return false})})});return this}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("accordion",{settings:{selector:".accordion"},init:function(){$(function(){$(SimpleLib.accordion.settings.selector).simpleAccordion(SimpleLib.accordion.settings)})}});
