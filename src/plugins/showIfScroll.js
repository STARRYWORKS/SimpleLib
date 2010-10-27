/*
 * showIfScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	$.fn.showIfScroll = function( i_options ){
		
		var defaults = { offset:0 };
		var options = $.extend( true, defaults, i_options );
		
		var $this = $(this);
		
		function _onResize() {
			if ( $(document).height() + options.offset <= $(window).height() ) $this.hide();
			else $this.show();
		}
		
		$(window).resize(_onResize);
		_onResize();
		return this;
	};

})(jQuery);

/* SimpleLib Plugin */

if ( SimpleLib ) {
	SimpleLib.extend( "showIfScroll", {
		settings: {
			selector:".showIfScroll"
		},
		init: function() {
			$( function(){ $(SimpleLib.showIfScroll.settings.selector).showIfScroll( SimpleLib.showIfScroll.settings ) } );
		}
	});
}