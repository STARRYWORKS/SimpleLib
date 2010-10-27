/*
 * fixHeight - jQuery Plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(a){function m(b){b=a(b);if(b.data("fixHeightChildrenGroups"))return b.data("fixHeightChildrenGroups");var d=[],c=b.find(".fixHeightChild");c.length&&d.push(c);c=b.find("*[class*='fixHeightChild']:not(.fixHeightChild)");if(c.length){var e={};c.each(function(){var i=a(this).attr("class").split(" "),g,n=i.length,f;for(g=0;g<n;g++)if(f=i[g].match(/fixHeightChild[a-z0-9_-]+/i))if(f=f.toString())e[f]=f});for(var o in e)d.push(b.find("."+o))}if(!d.length){c=b.children();c.length&&d.push(c)}b.data("fixHeightChildrenGroups",
d);j.push(b);return d}function p(){if(!k){k=true;h=a(document).append('<div style="position:absolute;left:-9999px;top:-9999px;">s</div>');setInterval(a.checkFixHeight,1E3);a(window).resize(a.checkFixHeight);a.checkFixHeight();a(window).load(function(){a.checkFixHeight(true)})}}var k=false,j=[],l=0,h;a.fn.fixHeight=function(){this.each(function(){var b=m(this);a.each(b,function(){var d=a(this);if(d.filter(":visible").length){var c=[],e=0;d.each(function(){if(e!=a(this).position().top){a(c).sameHeight();
c=[];e=a(this).position().top}c.push(this)});c.length&&a(c).sameHeight()}})});p();return this};a.checkFixHeight=function(b){if(!(h.height()==l&&b!==true)){l=h.height();a(j).fixHeight()}};a.fn.sameHeight=function(){var b=0;this.css("height","auto");this.each(function(){if(a(this).height()>b)b=a(this).height()});return this.height(b)}})(jQuery);jQuery(document).ready(function(){$(".fixHeight").fixHeight()});