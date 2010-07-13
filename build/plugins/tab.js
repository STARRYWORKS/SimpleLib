/*
 * simpleTab - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleTab=function(d){var a=$.extend(true,{tabSelector:"a.tab",selectedClass:"selected",trigger:"click"},d),b=this.find(a.tabSelector),c=null;b.bind(a.trigger,function(){b.each(function(){$($(this).attr("href")).hide();$(this).removeClass(a.selectedClass)});$($(this).attr("href")).show();$(this).addClass(a.selectedClass);return false});b.each(function(){if($(this).hasClass(a.selectedClass)){c=$(this);$(this).trigger(a.trigger)}});if(c==null)c=$(b[0]).trigger(a.trigger);return this};

/* SimpleLib Plugin */

SimpleLib.extend("tab",{settings:{selector:".tabSet"},init:function(){$(function(){$(SimpleLib.tab.settings.selector).simpleTab(SimpleLib.tab.settings)})}});