/*
 * fixHeight - jQuery Plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(b){function j(a){a=b(a);if(a.data("fixHeightChildrenGroups"))return a.data("fixHeightChildrenGroups");var e=[],c=a.find(".fixHeightChild");c.length&&e.push(c);c=a.find("*[class*='fixHeightChild']:not(.fixHeightChild)");if(c.length){var f={};c.each(function(){var a=b(this).attr("class").split(" "),c,e=a.length,d;for(c=0;c<e;c++)if(d=a[c].match(/fixHeightChild[a-z0-9_-]+/i))(d=d.toString())&&(f[d]=d)});for(var d in f)e.push(a.find("."+d))}e.length||(c=a.children(),c.length&&e.push(c));a.data("fixHeightChildrenGroups",
e);g.push(a);return e}function k(){h||(h=!0,d=b(document).append('<div style="position:absolute;left:-9999px;top:-9999px;">s</div>'),setInterval(b.checkFixHeight,1E3),b(window).resize(b.checkFixHeight),b.checkFixHeight(),b(window).load(function(){b.checkFixHeight(!0)}))}var h=!1,g=[],i=0,d;b.fn.fixHeight=function(){this.each(function(){var a=j(this);b.each(a,function(){var a=b(this);if(a.filter(":visible").length){var c=[],d=0;a.each(function(){if(d!=b(this).position().top)b(c).sameHeight(),c=[],
d=b(this).position().top;c.push(this)});c.length&&b(c).sameHeight()}})});k();return this};b.checkFixHeight=function(a){typeof d!="undefined"&&!(d.height()==i&&a!==!0)&&(i=d.height(),b(g).fixHeight())};b.fn.sameHeight=function(){var a=0;this.css("height","auto");this.each(function(){b(this).height()>a&&(a=b(this).height())});return this.height(a)}})(jQuery);jQuery(document).ready(function(){$(".fixHeight").fixHeight()});