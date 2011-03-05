/*
 * tab - jQuery plugin
 *
 * Author Kazuo Uratani, Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){b.fn.tab=function(f){var a=b.extend(true,{tabSelector:"a.tab",selectedClass:"selected",trigger:"click",over:true,out:true,down:false,up:false,selected:false,enableMouseEvents:true,enableMouseEventsSelected:false,postfix:{over:"-over",out:"",down:"-down",up:"",selected:"-selected"},fade:false,fadeTime:300},f),c=this.find(a.tabSelector),d=null;c.bind(a.trigger,function(){var e=b(this);c.each(function(){this!=e[0]&&b(b(this).attr("href")).hide()});b(e.attr("href")).show();d=e;if(typeof c.button==
"function"){c.button("selected",false);d.button("selected",true)}else{c.removeClass(a.selectedClass);d.addClass(a.selectedClass)}return false});c.each(function(){if(b(this).hasClass(a.selectedClass)){d=b(this);b(this).trigger(a.trigger)}});typeof c.button=="function"&&c.button({over:a.over,out:a.out,down:a.down,up:a.up,selected:a.selected,enableMouseEvents:a.enableMouseEvents,enableMouseEventsSelected:a.enableMouseEventsSelected,postfix:a.postfix,fade:a.fade,fadeTime:a.fadeTime});if(d==null)d=b(c[0]);
d.trigger(a.trigger);return this}})(jQuery);
/* SimpleLib Plugin */

SimpleLib&&SimpleLib.extend("tab",{settings:{selector:".tabSet"},dependsOn:["button"],init:function(){$(function(){$(SimpleLib.tab.settings.selector).tab(SimpleLib.tab.settings)})}});