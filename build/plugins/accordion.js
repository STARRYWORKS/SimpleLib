/*
 * simpleAccordion - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleAccordion=function(g){var a=$.extend(true,{selector:".accordion",handleSelector:".handle",selectedClass:"selected",time:300},g);$(this).each(function(){var c=$(this),d=[];c.find(a.handleSelector).each(function(){$(this).parents(a.selector).get(0)==c.get(0)&&d.push(this)});var e=$(d);e.each(function(){var b,f=$(this).attr("href");b=f=="#"?$(this).next():$(f);$(this).data("slave",b);$(this).hasClass(a.selectedClass)||b.hide();$(this).click(function(){if($(this).hasClass(a.selectedClass)){b.css("height",
"auto").slideUp(a.time);$(this).removeClass(a.selectedClass)}else{b.show().css("height","auto").height(b.height()).hide().slideDown(a.time);e.each(function(){if($(this).hasClass(a.selectedClass)){$(this).removeClass(a.selectedClass);$(this).data("slave").slideUp(a.time)}});$(this).addClass(a.selectedClass)}return false})})});return this};

/* SimpleLib Plugin */
SimpleLib.extend("accordion",{settings:{selector:".accordion"},init:function(){$(function(){$(SimpleLib.accordion.settings.selector).simpleAccordion(SimpleLib.accordion.settings)})}});