/*
 * simpleTab - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){a.fn.simpleTab=function(f){var b=a.extend(true,{tabSelector:"a.tab",selectedClass:"selected",trigger:"click"},f),c=this.find(b.tabSelector),d=null;c.bind(b.trigger,function(){var e=a(this);c.each(function(){if(this!=e[0]){a(a(this).attr("href")).hide();a(this).removeClass(b.selectedClass)}});a(e.attr("href")).show();e.addClass(b.selectedClass);return false});c.each(function(){if(a(this).hasClass(b.selectedClass)){d=a(this);a(this).trigger(b.trigger)}});if(d==null)d=a(c[0]).trigger(b.trigger);
return this}})(jQuery);

/* SimpleLib Plugin */

SimpleLib&&SimpleLib.extend("tab",{settings:{selector:".tabSet"},init:function(){$(function(){$(SimpleLib.tab.settings.selector).simpleTab(SimpleLib.tab.settings)})}});