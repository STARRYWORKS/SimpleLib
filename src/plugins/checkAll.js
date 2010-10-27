/*
 * checkAll - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */


$.fn.checkAll = function( i_options ){
	
	var defaults = {};
	var options = $.extend( true, defaults, i_options );
	return this.change(function(){
		var $this = $(this);
		var $target = $($this.attr("value"));
		if ( !$target.length ) $target = $this.parents("form").find("input[type=checkbox]");
		$target.attr("checked", $(this).is(":checked") ? "checked" : "" );
	});
};

/* SimpleLib Plugin */

SimpleLib.extend( "checkAll", {
	settings: {
		selector:".checkAll"
	},
	init: function() {
		$( function(){ $(SimpleLib.checkAll.settings.selector).checkAll( SimpleLib.checkAll.settings ) } );
	}
});
