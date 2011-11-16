/*
 * ie6Png2Gif - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	$.fn.ie6Png2Gif = function( i_options ){
		
		var defaults = {};
		var options = $.extend( true, defaults, i_options );
		var reg = new RegExp( "\\.(png|PNG)(['\"]? *\\))?$", "g" );
		
		return $(this).each(function(){
			var $this = $(this);
			var src;
			if ( $this.is("img") ) src = $this.attr("src");
			else src = $this.css("background-image");
			
			var replaced = src.replace(reg,".gif$2");
			if ( src != replaced ) {
				if ( $this.is("img") ) $this.attr("src",replaced);
				else $this.css("background-image",replaced);
			}
		});
	};
	
})(jQuery);

/* SimpleLib Plugin */

if ( SimpleLib ) {
	SimpleLib.extend( "ie6Png2Gif", {
		settings: {
			selector:".png2gif, .ie6Png2Gif"
		},
		init: function() {
			$( function(){ $(SimpleLib.ie6Png2Gif.settings.selector).ie6Png2Gif( SimpleLib.ie6Png2Gif.settings ) } );
		}
	});
}
