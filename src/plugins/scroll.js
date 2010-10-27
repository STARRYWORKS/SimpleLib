/*
 * simpleScroll - jQuery plugin
 *
 * Version 1.0.2 on 2010.02.05
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	$.fn.simpleScroll = function( i_options ){
		
		var defaults = {
			time:600
		};
		var options = $.extend( true, defaults, i_options );
		
		$(this).click(function(){ 
			var key = $(this).attr('href');
			var dest = 0;
			if(key != "#") {
				if ( $(key).length == 0 ) return false;
				dest = $(key).offset().top;
			}
			$("html,body").animate( {scrollTop:dest}, options.time );
			return false;
		});
		
		return this;
	};

})(jQuery);


/* SimpleLib Plugin */

if ( SimpleLib ) {
	SimpleLib.extend( "scroll", {
		settings: {
			selector:".scroll"
		},
		init: function() {
			$( function(){ $(SimpleLib.scroll.settings.selector).simpleScroll( SimpleLib.scroll.settings ) } );
		}
	});
}