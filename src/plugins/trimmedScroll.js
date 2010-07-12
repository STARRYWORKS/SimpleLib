/*
 * trimmedScroll - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.trimmedScroll = function( i_options ) {

	var defaults = {
		scrollTimePerPixcel:20,
		fadeTime:1000,
		scrollImgClass:"scroll",
		scrollImgPostfix:"-scroll"
	};
	var options = $.extend( true, defaults, i_options );
	
	
	$(this).each(function(){
		var $i = $(this).find("img");
		if ( !$i.length ) return;
		var src = $i.attr("src");
		var scroll;
		if ( options.scrollImgAttribute ) {
			scroll = $(this).attr(options.scrollImgAttribute);
			$(this).attr(options.scrollImgAttribute,"");
		} else {
			scroll = src.replace(/(\.[^\.]+)$/,options.scrollImgPostfix+"$1");
		}
		var w = $i.width();
		var h = $i.height();
		var $wrapper = $('<span style="display:block;width:'+w+'px;height:'+h+'px;overflow:hidden;position:absolute;"></span>').insertBefore($i);
		var $img = $('<img />').attr("src",scroll).addClass(options.scrollImgClass).appendTo($wrapper);
		$("<img />").attr("src",scroll);
		$wrapper.hide();
		$(this).css("cursor","pointer");
		$(this).hover( _over, _out );
		
		function _over() {
			if ( $wrapper.css("display") == "none" ) {
				$img.css({marginTop:"0"});
				$wrapper.animate({opacity:0},0);
			}
			$wrapper.stop().show().animate( {opacity:1}, options.fadeTime );
			$img.css("width","auto").css("height","auto");
			var mt = $i.height() - $img.height();
			var time = ( mt - parseInt($img.css("margin-top")) ) * options.scrollTimePerPixcel * -1;
			if ( $img.css("margin-top") == mt+"px" ) mt = 0;
			$img.stop().animate( {marginTop:mt}, time, "linear" );
		}
		
		function _out() {
			$img.queue([]).stop();
			$wrapper.stop().animate( {opacity:0}, options.fadeTime, function(){ $(this).hide(); } );
		}
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
			selector:".trimmedScroll"
		},
		init: function() {
			$( function(){ $(SimpleLib.trimmedScroll.settings.selector).trimmedScroll( SimpleLib.trimmedScroll.settings ) } );
		}
	};
	SimpleLib.extend( "trimmedScroll", pluginInfo );
}
