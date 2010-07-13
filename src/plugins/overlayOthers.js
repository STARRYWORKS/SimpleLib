/*
 * overlayOthers - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.overlayOthers = function( i_options ) {
	var defaults = {
		opacity:0.8,
		exceptionSelector:".overlayException",
		othersClass:"others",
		overClass:"over",
		time:400
	};
	var options = $.extend( true, defaults, i_options );
	
	
	$(this).each(function(){
		var $parent = $(this);
		var $targets = $parent.find("a").not( options.exceptionSelector );
		
		$targets.each(function(){
			if ( $(this).find("span.overlay").length > 0 ) return;
			var $overlay = $('<span class="overlay" style="display:block;position:absolute;margin:0px;padding:0px;z-index:1;">&nbsp;</span>').prependTo(this);
			if ( ( $overlay.css("background-color") == "rgba(0, 0, 0, 0)" || $overlay.css("background-color") == "rgb(0, 0, 0)" || $overlay.css("background-color") == "transparent" ) && ( $overlay.css("background-image") == "none" ) ) {
				$overlay.css("background-color","#ffffff");
			}
			$overlay.hide();
			$(this).data("$overlay",$overlay);
		});
		
		$targets.hover(
			
			function() {
				$targets.addClass(options.othersClass);
				$targets.each(function(){
				
					var $overlay = $(this).data("$overlay");
					$(this).css("display","block");
					$overlay.width($(this).width());
					$overlay.height($(this).height());
					if ( $overlay.css("display") == "none" ) $overlay.css({opacity:0});
					$overlay.css("display","block").stop().animate( {opacity:options.opacity}, options.time );
				});
				$(this).removeClass(options.othersClass);
				var $overlay = $(this).data("$overlay");
				$overlay.css("display","block").stop().animate({opacity:0},0).hide();
				$(this).addClass(options.overClass);
				$parent.addClass(options.overClass);
			},
			
			function() {
				$targets.find("span.overlay").stop().animate( {opacity:0}, options.time, function(){ $(this).hide(); } );
				$targets.removeClass(options.othersClass);
				$(this).removeClass(options.overClass);
				$parent.removeClass(options.overClass);
			}
		);
		
	});
	
	return this;

}


/* SimpleLib Plugin */

SimpleLib.extend( "overlayOthers", {
	settings: {
		selector:".overlayOthers"
	},
	init: function() {
		$( function(){ $(SimpleLib.overlayOthers.settings.selector).overlayOthers( SimpleLib.overlayOthers.settings ) } );
	}
});
