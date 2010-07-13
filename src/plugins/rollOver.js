/*
 * simpleRollOver - jQuery plugin
 *
 * Author Koji Kimura, Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleRollOver = function( i_options ){
	
	var defaults = {
		postfix:"-over"
	};
	var options = $.extend( true, defaults, i_options );
	
	$(this).each(function(){
		var $a = $(this);
		var $i = $a.children('img');
		if(!$i.length && $a.attr("src")) $i = $a;
		if(!$i.length) return;
		
		var up = $i.attr("src");
		var over = up.replace(/\.([a-zA-Z0-9]+)$/,options.postfix+".$1");
		
		$("<img />").attr("src",over);
		$a.hover(
			function(){ $i.attr("src",over); },
			function(){ $i.attr("src",up); }
		);
	});
	
	return this;
};

/* SimpleLib Plugin */
SimpleLib.extend( "rollOver", {
	settings: {
		selector:".rollover, .rollOver"
	},
	init: function() {
		$( function(){ $(SimpleLib.rollOver.settings.selector).simpleRollOver( SimpleLib.rollOver.settings ) } );
	}
});
