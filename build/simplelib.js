/*
 * SimpleLib with jQuery
 *
 * http://lab.starryworks.jp/js/simplelib/
 *
 * Copyright (c) 2009 STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under MIT lisence;
 *
 */
 
 var SimpleLib=SimpleLib||{},SimpleLibSettings=SimpleLibSettings||{};
SimpleLib=$.extend(true,{debug:false,jsDir:$("script[src*='simplelib.js'],script[src*='simplelib.min.js']").attr("src").replace(/simplelib\.js.*?$/,""),containsInArray:function(a,c){for(var b in c)if(c.hasOwnProperty(b)&&c[b]===a)return true;return false},queryToArray:function(a){var c=[];a=String(a).split("?");if(!a||a.length<2||!a[1])return c;a=String(a[1]).split(",");$.each(a,function(){this&&c.push(String(this))});return c},isIE:function(){return navigator.userAgent.indexOf("MSIE")!=-1},isIE6:function(){return ('\v'=='v')},loadCSS:function(a){SimpleLib.isIE()?
document.createStyleSheet(a):$("head").append('<link rel="stylesheet" type="text/css" href="'+a+'" />')},loadJS:function(a){$.ajax({type:"GET",url:a,dataType:"script",success:function(){},error:SimpleLib._onLoadError})},init:function(a,c){if(a){c=c||{};if(SimpleLib.jsDir=="")SimpleLib.jsDir="./";var b,d,e=a.length;for(b=0;b<e;b++)if(!(a[b].substr(0,3)=="ie6"&&!SimpleLib.isIE6()&&!SimpleLib.debug)){d=c[a[b]]||{};SimpleLib[a[b]]=SimpleLib[a[b]]||{};if(SimpleLib[a[b]].settings)d=$.extend(SimpleLib[a[b]].settings,
d);SimpleLib[a[b]].settings=d;if(!SimpleLib[a[b]]||!SimpleLib[a[b]].init)SimpleLib._load(a[b])}}},_load:function(a){SimpleLib.loadJS(SimpleLib.jsDir+"plugins/"+a+".js")},_onLoadError:function(){SimpleLib.debug&&alert("Load error.")},setup:function(){var a=SimpleLib.queryToArray($("script[src*='simplelib.js']").attr("src"));a.length&&SimpleLib.init(a,SimpleLibSettings)},extend:function(a,c){if(typeof SimpleLib[a]=="undefined")SimpleLib[a]={};SimpleLib[a]=$.extend(true,c,SimpleLib[a]);typeof SimpleLib[a].init==
"function"&&SimpleLib[a].init()}},SimpleLib);

SimpleLib.setup();