/*
 * checkAll - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){a.fn.checkAll=function(d){a.extend(true,{},d);return this.change(function(){var c=a(this),b=a(c.attr("value"));b.length||(b=c.parents("form").find("input[type=checkbox]").not(this));b.attr("checked",a(this).is(":checked")?"checked":"")})}})(jQuery);

/* SimpleLib Plugin */

SimpleLib&&SimpleLib.extend("checkAll",{settings:{selector:".checkAll"},init:function(){$(function(){$(SimpleLib.checkAll.settings.selector).checkAll(SimpleLib.checkAll.settings)})}});