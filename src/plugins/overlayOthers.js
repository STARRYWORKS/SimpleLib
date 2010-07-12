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
		time:400,
		afterTime:0
	};
	var options = $.extend( true, defaults, i_options );
	
	
	$(this).each(function(){
		var $parent = $(this);
		var $targets = $parent.find("a").not( options.exceptionSelector );
		
		$targets.each(function(){
			if ( $(this).find("span.overlay").length > 0 ) return;
			var $overlay = $('<span class="overlay" style="display:block;position:absolute;margin:0px;padding:0px;z-index:99;">&nbsp;</span>').prependTo(this);
			if ( ( $overlay.css("background-color") == "rgba(0, 0, 0, 0)" || $overlay.css("background-color") == "rgb(0, 0, 0)" || $overlay.css("background-color") == "transparent" ) && ( $overlay.css("background-image") == "none" ) ) {
				$overlay.css("background-color","#ffffff");
			}
/* 			$overlay.after('<span style="display:block;"></span>') */
			$overlay.hide();
		});
		
		$targets.hover(
			
			function() {
				$targets.addClass(options.othersClass);
				$targets.each(function(){
				
				
					var $overlay = $(this).find("span.overlay");
					$overlay.css("width",$(this).width()+"px");
					$overlay.css("height",$(this).height()+"px");
					if ( $overlay.css("display") == "none" ) $overlay.css({opacity:0});
					$overlay.css("display","block").stop().animate( {opacity:options.opacity}, options.time, function() {
						if ( options.afterTime ) $(this).css("display","block").stop().animate( {opacity:1}, options.afterTime );
					} );
				});
				$(this).removeClass(options.othersClass);
				$(this).find("span.overlay").css("display","block").stop().animate({opacity:0},0).hide();
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


/*
 * SimpleLib Plugin
 *
 */
if ( typeof("SimpleLib") != "undefined" ) {
	var pluginInfo = {
		settings: {
			selector:".overlayOthers"
		},
		init: function() {
			$( function(){ $(SimpleLib.overlayOthers.settings.selector).overlayOthers( SimpleLib.overlayOthers.settings ) } );
		}
	};
	SimpleLib.extend( "overlayOthers", pluginInfo );
}
