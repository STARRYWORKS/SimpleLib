/*
 * jQuery ifixpng plugin
 * (previously known as pngfix)
 * Version 2.1  (23/04/2008)
 * @requires jQuery v1.1.3 or above
 *
 * Examples at: http://jquery.khurshid.com
 * Copyright (c) 2007 Kush M.
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
 
 
(function($){$.ifixpng=function(a){$.ifixpng.pixel=a};$.ifixpng.getPixel=function(){return $.ifixpng.pixel||'images/pixel.gif'};var e={ltie7:$.browser.msie&&$.browser.version<7,filter:function(a){return"progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true,sizingMethod=crop,src='"+a+"')"}};$.fn.ifixpng=e.ltie7?function(){return this.each(function(){var a=$(this);var b=$('base').attr('href');if(b){b=b.replace(/\/[^\/]+$/,'/')}if(a.is('img')||a.is('input')){if(a.attr('src')){if(a.attr('src').match(/.*\.png([?].*)?$/i)){var c=(b&&a.attr('src').search(/^(\/|http:)/i))?b+a.attr('src'):a.attr('src');a.css({filter:e.filter(c),width:a.width(),height:a.height()}).attr({src:$.ifixpng.getPixel()}).positionFix()}}}else{var d=a.css('backgroundImage');if(d.match(/^url\(["']?(.*\.png([?].*)?)["']?\)$/i)){d=RegExp.$1;d=(b&&d.substring(0,1)!='/')?b+d:d;a.css({backgroundImage:'none',filter:e.filter(d)}).children().children().positionFix()}}})}:function(){return this};$.fn.iunfixpng=e.ltie7?function(){return this.each(function(){var a=$(this);var b=a.css('filter');if(b.match(/src=["']?(.*\.png([?].*)?)["']?/i)){b=RegExp.$1;if(a.is('img')||a.is('input')){a.attr({src:b}).css({filter:''})}else{a.css({filter:'',background:'url('+b+')'})}}})}:function(){return this};$.fn.positionFix=function(){return this.each(function(){var a=$(this);var b=a.css('position');if(b!='absolute'&&b!='relative'){a.css({position:'relative'})}})}})(jQuery);

/* SimpleLib Plugin */

SimpleLib.extend("ie6PngFix",{settings:{selector:".pngfix, .pngFix",pixelGIF:SimpleLib.jsDir+"plugins/ie6PngFix/pixel.gif"},init:function(){$.ifixpng.pixel=SimpleLib.ie6PngFix.settings.pixelGIF;$(window).load(function(){$(SimpleLib.ie6PngFix.settings.selector).ifixpng()})}});

