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


/*-------------------------------------------------------

Usage:

SimpleLib.bind( "init", function(){
	//something to do after all plugins loaded and initialized.
}, true );

SimpleLib.bind( "init_button", function(){
	//something to do after button plugins loaded and initialized.
}, true );

SimpleLib.bind( "load_button", function(){
	//something to do after button plugins loaded.
}, true );


-------------------------------------------------------*/

var SimpleLib = SimpleLib || {};
var SimpleLibSettings = SimpleLibSettings || {};

SimpleLib = $.extend( true, {
	
	debug: false,
	loaded: false,
	numPlubinsToLoad: 0,			//ロードする必要のあるプラグインの数
	numPluginsLoaded: 0,			//ロード完了したプラグインの数
	numPluginsWaitingForInit: 0,	//初期化待ちプラグインの数
	_pluginsLoadStarted: {},		//ロード開始したプラグイン
	_eventListeners: {},			//イベントリスナー
	_onceEventListeners: {},		//1回だけ実行するイベントリスナー
	_eventsOnceTriggered: {},		//1回トリガーされたイベント
	
	jsDir: $("script[src*='simplelib.js'],script[src*='simplelib.min.js']").attr('src').replace(/simplelib\.(min\.)?js.*?$/,""),
	
	//Check if the passed value exsits in the array
	containsInArray: function( i_value, i_array ) {
		for ( var i in i_array ) if ( i_array.hasOwnProperty(i) && i_array[i] === i_value) return true;
		return false;
	},
	
	//Convert url query to array
	queryToArray: function( i_url ) {
		var settings = [];
		var arr = String(i_url).split("?");
		if ( !arr || arr.length < 2 || !arr[1] ) return settings;
		var values = String(arr[1]).split(',');
		$.each(values, function(){ if ( this ) settings.push( String(this) ); });
		return settings;
	},
	
	//isIE
	isIE: function() { return (navigator.userAgent.indexOf("MSIE") != -1); },
	
	//isIE6
	isIE6: function() { return ( '\v'=='v' ); },
	
	//loadCSS
	loadCSS: function( i_url ) {
		if ( SimpleLib.isIE() ) document.createStyleSheet( i_url );
		else $("head").append('<link rel="stylesheet" type="text/css" href="'+i_url+'" />');
	},
	
	//loadJS
	loadJS: function( i_url ) {
		$.ajax({
			type: "GET",
			url: i_url,
			dataType: "script",
			cache:true,
			success:SimpleLib._sccess,
			error: SimpleLib._loadError
		});
	},
	
	//Init
	init: function( i_plugins, i_settings ){
		if ( !i_plugins ) return;
		i_settings = i_settings || {};
		
		//
		if ( SimpleLib.jsDir == "" ) SimpleLib.jsDir = "./";
		
		//Load plugins
		var i, settings;
		var l = i_plugins.length;
		for ( i=0; i<l; i++ ) {
			//IE6
			if( i_plugins[i].substr(0, 3) == 'ie6' && !SimpleLib.isIE6() && !SimpleLib.debug ) continue;
			
			settings = i_settings[i_plugins[i]] || {};
			SimpleLib[i_plugins[i]] = SimpleLib[i_plugins[i]] || {};
			if ( SimpleLib[i_plugins[i]].settings ) settings = $.extend( SimpleLib[i_plugins[i]].settings, settings );
			SimpleLib[i_plugins[i]].settings = settings;
			
			if ( !SimpleLib[i_plugins[i]] || !SimpleLib[i_plugins[i]].init ) SimpleLib.load( i_plugins[i] );
			
		}
	},
	
	// trigger event
	trigger : function( i_type ) {
		SimpleLib._eventsOnceTriggered[i_type] = true;
		if ( SimpleLib._eventListeners[i_type] ) {
			for ( var i in SimpleLib._eventListeners[i_type] ) SimpleLib._eventListeners[i_type][i]();
		}
		if ( SimpleLib._onceEventListeners[i_type] ) {
			for ( var i in SimpleLib._onceEventListeners[i_type] ) SimpleLib._onceEventListeners[i_type][i]();
			SimpleLib._onceEventListeners[i_type] = null;
		}
	},
	
	// bind event listener
	bind : function( i_type, i_func, i_once ) {
		if ( i_once ) {
			if ( SimpleLib._eventsOnceTriggered[i_type] ) {
				i_func();
			} else {
				if ( !SimpleLib._onceEventListeners[i_type] ) SimpleLib._onceEventListeners[i_type] = [];
				SimpleLib._onceEventListeners[i_type].push(i_func);
			}
		} else {
			if ( !SimpleLib._eventListeners[i_type] ) SimpleLib._eventListeners[i_type] = [];
			SimpleLib._eventListeners[i_type].push(i_func);
		}
	},
	
	// unbind event listener
	unbind : function( i_type, i_func ) {
		if ( !SimpleLib._eventListeners[i_type] ) return;
		if ( i_func == null ) {
			SimpleLib._eventListeners[i_type] = null;
			return;
		}
		
		var l = SimpleLib._eventListeners[i_type].length;
		for ( i=l; i>=0; i-- ) {
			if ( SimpleLib._eventListeners[i_type][i] == i_func ) {
				SimpleLib._eventListeners[i_type].splice( i, 1 );
			}
		}
		
		l = SimpleLib._onceEventListeners[i_type].length;
		for ( i=l; i>=0; i-- ) {
			if ( SimpleLib._onceEventListeners[i_type][i] == i_func ) {
				SimpleLib._onceEventListeners[i_type].splice( i, 1 );
			}
		}
	},
	
	//Load
	load: function( i_plugin ) {
		if ( SimpleLib._pluginsLoadStarted[i_plugin] ) return;
		var file = SimpleLib.jsDir + "plugins/"+i_plugin+".js";
		SimpleLib.numPlubinsToLoad++;
		SimpleLib._pluginsLoadStarted[i_plugin] = true;
		SimpleLib.loadJS( file );
	},
	
	//sccess
	_sccess : function(d) {
		SimpleLib._loaded();
	},
	
	//loaded
	_loaded : function() {
		SimpleLib.numPluginsLoaded++;
		if ( SimpleLib.numPluginsLoaded >= SimpleLib.numPlubinsToLoad ) {
			SimpleLib.loaded = true;
			SimpleLib.trigger("load");
			if ( SimpleLib.numPluginsWaitingForInit <= 0 ) SimpleLib.trigger("init");
		}
	},
	
	//onLoadError
	_loadError: function( e ) {
		if  ( SimpleLib.debug ) alert("Load error.");
		SimpleLib._loaded();
	},
	
	//Setup
	setup: function() {
		var plugins = SimpleLib.queryToArray( $("script[src*='simplelib.js']").attr('src') );
		if ( plugins.length ) SimpleLib.init( plugins, SimpleLibSettings );
	},
	
	//extend
	extend: function( i_plugin, i_info ) {
		if ( typeof(SimpleLib[i_plugin]) == "undefined" ) SimpleLib[i_plugin] = {};
		SimpleLib[i_plugin] = $.extend( true, i_info, SimpleLib[i_plugin]);
		SimpleLib.trigger("load_"+i_plugin);
		//check dependency
		if ( SimpleLib[i_plugin]["dependsOn"] ) {
			SimpleLib.numPluginsWaitingForInit++;
			var p;
			for ( var i in SimpleLib[i_plugin]["dependsOn"] ) {
				p = SimpleLib[i_plugin]["dependsOn"][i];
				SimpleLib.bind( "init_"+p, function(){
					//init wher all depended plugins are ready.
					for ( var j in SimpleLib[i_plugin]["dependsOn"] ) {
						if ( !SimpleLib[SimpleLib[i_plugin]["dependsOn"][j]]["ready"] ) return;
					}
					SimpleLib.numPluginsWaitingForInit--;
					SimpleLib._initPlugin(i_plugin);
				}, true);
				SimpleLib.load(p);
			}
		} else {
			SimpleLib._initPlugin(i_plugin);
		}
	},
	
	//initPlugin
	_initPlugin : function( i_plugin ) {
		if ( typeof(SimpleLib[i_plugin].init) == "function" ) {
			SimpleLib[i_plugin].init();
		}
		SimpleLib[i_plugin]["ready"] = true;
		SimpleLib.trigger("init_"+i_plugin);
		if ( SimpleLib.loaded && SimpleLib.numPluginsWaitingForInit <= 0 ) SimpleLib.trigger("init");
	}
	
}, SimpleLib);

SimpleLib.setup();
