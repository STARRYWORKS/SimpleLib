/*
 * checkAll - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	$.fn.checkAll = function( i_options ){
		
		var defaults = {};
		var options = $.extend( true, defaults, i_options );
		return this.change(function(){
			var $this = $(this);
			var $target = $($this.attr("value"));
			if ( !$target.length ) $target = $this.parents("form").find("input[type=checkbox]").not(this);
			$target.attr("checked", $(this).is(":checked") ? "checked" : "" );
		});
	};
	
})(jQuery);

/* SimpleLib Plugin */

if ( SimpleLib ) {
	SimpleLib.extend( "checkAll", {
		settings: {
			selector:".checkAll"
		},
		init: function() {
			$( function(){ $(SimpleLib.checkAll.settings.selector).checkAll( SimpleLib.checkAll.settings ) } );
		}
	});
}
