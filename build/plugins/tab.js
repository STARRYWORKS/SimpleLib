/*
 * tab - jQuery plugin
 *
 * Author Kazuo Uratani, Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){b.fn.tab=function(e){var a=b.extend(!0,{tabSelector:"a.tab",selectedClass:"selected",trigger:"click",over:!0,out:!0,down:!1,up:!1,selected:!1,enableMouseEvents:!0,enableMouseEventsSelected:!1,postfix:{over:"-over",out:"",down:"-down",up:"",selected:"-selected"},fade:!1,fadeTime:300},e),c=this.find(a.tabSelector),d=null;c.bind(a.trigger,function(){var f=b(this);c.each(function(){this!=f[0]&&b(b(this).attr("href")).hide()});b(f.attr("href")).show();d=c.filter("*[href="+f.attr("href")+"]");
typeof c.button=="function"?(c.button("selected",!1),d.button("selected",!0)):(c.removeClass(a.selectedClass),d.addClass(a.selectedClass));if(typeof b.checkFixHeight=="function"){b.checkFixHeight();var e=setTimeout(function(){clearTimeout(e);b.checkFixHeight()},200)}return!1});c.each(function(){b(this).hasClass(a.selectedClass)&&(d=b(this),b(this).trigger(a.trigger))});typeof c.button=="function"&&c.button({over:a.over,out:a.out,down:a.down,up:a.up,selected:a.selected,enableMouseEvents:a.enableMouseEvents,
enableMouseEventsSelected:a.enableMouseEventsSelected,postfix:a.postfix,fade:a.fade,fadeTime:a.fadeTime});d==null&&(d=b(c[0]));d.trigger(a.trigger);return this}})(jQuery);

/* SimpleLib Plugin */

SimpleLib&&SimpleLib.extend("tab",{settings:{selector:".tabSet"},dependsOn:["button"],init:function(){$(function(){$(SimpleLib.tab.settings.selector).tab(SimpleLib.tab.settings)})}});