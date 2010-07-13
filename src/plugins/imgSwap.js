/*
 * imgSwap - jQuery plugin
 *
 * Author Koji Kimura, Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.imgSwap = function( i_options ){
	var defaults = { trigger:"click", attribute:"href", scrolling:false, scrollingTime:400 };
	var options = $.extend( true, defaults, i_options );
	$(this).each(function(){
		var href = String($(this).attr(options.attribute));
		var rs = href.match(/#(.+)$/);
		
		if ( rs ) {
			var $display = $("#"+rs[1]);
			$('<img>').attr('src',href);
			$(this).bind( options.trigger, function(){
				$display.attr('src', href).css({width:"auto",height:"auto"});
				if ( options.scrolling ) {
					var dt = $display.offset().top;
					var st = $(window).scrollTop();
					var wh = $(window).height();
					if ( st+wh < dt || st > dt ) $("html,body").animate( {scrollTop:dt}, options.scrollingTime );
				}
				return false;
			});
		}
	});
};

/* SimpleLib Plugin */

SimpleLib.extend( "imgSwap", {
	settings :{
		selector:".imgswap, .imgSwap"
	},
	init: function() {
		$( function(){ $(SimpleLib.imgSwap.settings.selector).imgSwap( SimpleLib.imgSwap.settings ) } );
	}
});
