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

var SimpleLib = SimpleLib || {};
var SimpleLibSettings = SimpleLibSettings || {};

SimpleLib = $.extend( true, {
	
	debug: false,
	jsDir: $("script[src*='simplelib.js']").attr('src').replace(/simplelib\.js.*?$/,""),
	
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
			
			if ( SimpleLib[i_plugins[i]] && SimpleLib[i_plugins[i]].init ) SimpleLib[i_plugins[i]].init();
			else SimpleLib._load( i_plugins[i] );
			
		}
	},
	
	//Load
	_load: function( i_plugin ) {
		var file = SimpleLib.jsDir + "plugins/"+i_plugin+".js";
		$.ajax({
			type: "GET",
			url: file,
			dataType: "script",
			success:function(d) {},
			error: SimpleLib._onLoadError
		});
	},
	
	//onLoadError
	_onLoadError: function( e ) {
		if  ( SimpleLib.debug ) alert("Load error.");
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
		if ( typeof(SimpleLib[i_plugin].init) == "function" ) SimpleLib[i_plugin].init();
	}
	
}, SimpleLib);

SimpleLib.setup();

