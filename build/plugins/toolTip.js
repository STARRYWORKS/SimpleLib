/*
 * simpleTooltip - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleTooltip=function(h){var c=$.extend(true,{time:200,delay:0,margin:10},h);this.each(function(){var e=$(this).attr("title");if(e){var i=$(this),j=function(){var a=i.attr("class");return a=="toolTip"?"auto":a.replace("toolTip-","")}();$(this).data("hoverType",j);$(this).hover(function(){var a=$(this).position(),f={width:$(this).width(),height:$(this).height()},b=$('<div id="simpleTooltip">'+e+"</div>").css("display","inline-block");$(this).attr("title","");if(e!=""){var d;$("body").append(b);
if($(this).data("hoverType")=="auto"){$(this).data("auto",true);d=$(this).offset().top-$(window).scrollTop();var g=$(this).offset().left-$(window).scrollLeft(),k=d+$(this).height(),l=g+$(this).width();d=d-b.height()<c.margin?"bottom":g-b.width()<c.margin?"right":k+b.height()>=$(window).height()-c.margin?"top":l+b.width()>$(window).width()-c.margin?"left":"top";$(this).data("hoverType",d)}switch($(this).data("hoverType")){case "left":d=a.left-b.width()-c.margin-10;a=a.top-b.height()/2;break;case "right":d=
a.left+f.width+c.margin;a=a.top-b.height()/2;break;case "top":d=a.left+f.width/2-b.width()/2;a=a.top-b.height()-c.margin-10;break;case "bottom":d=a.left+f.width/2-b.width()/2;a=a.top+f.height+c.margin;break;default:return}$("#simpleTooltip").css("position","absolute").css("top",a+"px").css("left",d+"px").css("display","none").animate({dummy:0},c.delay).fadeIn(c.time)}},function(){$(this).data("auto")&&$(this).data("hoverType","auto");$("#simpleTooltip").remove();$(this).attr("title",e)})}})};

/* SimpleLib Plugin */

SimpleLib.extend("toolTip",{settings:{selector:"a[class*='toolTip']"},init:function(){$(function(){$(SimpleLib.toolTip.settings.selector).simpleTooltip(SimpleLib.toolTip.settings)})}});
