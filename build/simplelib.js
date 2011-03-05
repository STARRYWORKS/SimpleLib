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
SimpleLib=$.extend(true,{debug:false,loaded:false,numPlubinsToLoad:0,numPluginsLoaded:0,numPluginsWaitingForInit:0,_pluginsLoadStarted:{},_eventListeners:{},_onceEventListeners:{},_eventsOnceTriggered:{},jsDir:$("script[src*='simplelib.js'],script[src*='simplelib.min.js']").attr("src").replace(/simplelib\.(min\.)?js.*?$/,""),containsInArray:function(a,b){for(var c in b)if(b.hasOwnProperty(c)&&b[c]===a)return true;return false},queryToArray:function(a){var b=[];a=String(a).split("?");if(!a||a.length<
2||!a[1])return b;a=String(a[1]).split(",");$.each(a,function(){this&&b.push(String(this))});return b},isIE:function(){return navigator.userAgent.indexOf("MSIE")!=-1},isIE6:function(){return false},loadCSS:function(a){SimpleLib.isIE()?document.createStyleSheet(a):$("head").append('<link rel="stylesheet" type="text/css" href="'+a+'" />')},loadJS:function(a){$.ajax({type:"GET",url:a,dataType:"script",success:SimpleLib._sccess,error:SimpleLib._loadError})},init:function(a,b){if(a){b=b||{};if(SimpleLib.jsDir==
"")SimpleLib.jsDir="./";var c,d,e=a.length;for(c=0;c<e;c++)if(!(a[c].substr(0,3)=="ie6"&&!SimpleLib.isIE6()&&!SimpleLib.debug)){d=b[a[c]]||{};SimpleLib[a[c]]=SimpleLib[a[c]]||{};if(SimpleLib[a[c]].settings)d=$.extend(SimpleLib[a[c]].settings,d);SimpleLib[a[c]].settings=d;if(!SimpleLib[a[c]]||!SimpleLib[a[c]].init)SimpleLib.load(a[c])}}},trigger:function(a){SimpleLib._eventsOnceTriggered[a]=true;if(SimpleLib._eventListeners[a])for(var b in SimpleLib._eventListeners[a])SimpleLib._eventListeners[a][b]();
if(SimpleLib._onceEventListeners[a]){for(b in SimpleLib._onceEventListeners[a])SimpleLib._onceEventListeners[a][b]();SimpleLib._onceEventListeners[a]=null}},bind:function(a,b,c){if(c)if(SimpleLib._eventsOnceTriggered[a])b();else{SimpleLib._onceEventListeners[a]||(SimpleLib._onceEventListeners[a]=[]);SimpleLib._onceEventListeners[a].push(b)}else{SimpleLib._eventListeners[a]||(SimpleLib._eventListeners[a]=[]);SimpleLib._eventListeners[a].push(b)}},unbind:function(a,b){if(SimpleLib._eventListeners[a])if(b==
null)SimpleLib._eventListeners[a]=null;else{var c=SimpleLib._eventListeners[a].length;for(i=c;i>=0;i--)SimpleLib._eventListeners[a][i]==b&&SimpleLib._eventListeners[a].splice(i,1);for(i=c=SimpleLib._onceEventListeners[a].length;i>=0;i--)SimpleLib._onceEventListeners[a][i]==b&&SimpleLib._onceEventListeners[a].splice(i,1)}},load:function(a){if(!SimpleLib._pluginsLoadStarted[a]){var b=SimpleLib.jsDir+"plugins/"+a+".js";SimpleLib.numPlubinsToLoad++;SimpleLib._pluginsLoadStarted[a]=true;SimpleLib.loadJS(b)}},
_sccess:function(){SimpleLib._loaded()},_loaded:function(){SimpleLib.numPluginsLoaded++;if(SimpleLib.numPluginsLoaded>=SimpleLib.numPlubinsToLoad){SimpleLib.loaded=true;SimpleLib.trigger("load");SimpleLib.numPluginsWaitingForInit<=0&&SimpleLib.trigger("init")}},_loadError:function(){SimpleLib.debug&&alert("Load error.");SimpleLib._loaded()},setup:function(){var a=SimpleLib.queryToArray($("script[src*='simplelib.js']").attr("src"));a.length&&SimpleLib.init(a,SimpleLibSettings)},extend:function(a,b){if(typeof SimpleLib[a]==
"undefined")SimpleLib[a]={};SimpleLib[a]=$.extend(true,b,SimpleLib[a]);SimpleLib.trigger("load_"+a);if(SimpleLib[a].dependsOn){SimpleLib.numPluginsWaitingForInit++;var c,d;for(d in SimpleLib[a].dependsOn){c=SimpleLib[a].dependsOn[d];SimpleLib.bind("init_"+c,function(){for(var e in SimpleLib[a].dependsOn)if(!SimpleLib[SimpleLib[a].dependsOn[e]].ready)return;SimpleLib.numPluginsWaitingForInit--;SimpleLib._initPlugin(a)},true);SimpleLib.load(c)}}else SimpleLib._initPlugin(a)},_initPlugin:function(a){typeof SimpleLib[a].init==
"function"&&SimpleLib[a].init();SimpleLib[a].ready=true;SimpleLib.trigger("init_"+a);SimpleLib.loaded&&SimpleLib.numPluginsWaitingForInit<=0&&SimpleLib.trigger("init")}},SimpleLib);SimpleLib.setup();
