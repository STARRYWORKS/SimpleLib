/*
 * showIfScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.showIfScroll = function( i_options ){
	
	var defaults = { offset:0 };
	var options = $.extend( true, defaults, i_options );
	
	var $this = $(this);
	$(window).resize(function(){
		if ( $(document).height() + options.offset <= $(window).height() ) $this.hide();
		else $this.show();
	});
	$(window).resize();
	return this;
};

/*
 * SimpleLib Plugin
 *
 */
if ( typeof("SimpleLib") != "undefined" ) {
	var pluginInfo = {
		settings: {
			selector:".showIfScroll"
		},
		init: function() {
			$( function(){ $(SimpleLib.showIfScroll.settings.selector).showIfScroll( SimpleLib.showIfScroll.settings ) } );
		}
	};
	SimpleLib.extend( "showIfScroll", pluginInfo );
}
