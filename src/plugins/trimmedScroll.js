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
		var $wrapper = $('<span style="display:block;position:absolute;margin:0px;padding:0px;overflow:hidden"></span>').prependTo($i.parent());
		var $img = $('<img style="margin:0px;padding:0px;border:none;" />').attr("src",scroll).addClass(options.scrollImgClass).appendTo($wrapper);
		$("<img />").attr("src",scroll);
		$wrapper.hide();
		$(this).css("cursor","pointer");
		$(this).hover( _over, _out );
		
		function _over() {
			if ( $wrapper.css("display") == "none" ) {
				$img.css({marginTop:"0"});
				$wrapper.animate({opacity:0},0);
			}
			$wrapper.css("left",$i.offset().left+"px");
			$wrapper.css("top",$i.offset().top+"px");
			$wrapper.width($i.attr("width") ? parseInt($i.attr("width")) : $i.width());
			$wrapper.height($i.attr("height") ? parseInt($i.attr("height")) : $i.height());
			$wrapper.stop().show().animate( {opacity:1}, options.fadeTime );
			$img.css("width","auto").css("height","auto");
			var mt = $i.height() - $img.height();
			$img.css("margin-top",0);
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


/* SimpleLib Plugin */

SimpleLib.extend( "trimmedScroll", {
	settings: {
		selector:".trimmedScroll"
	},
	init: function() {
		$( function(){ $(SimpleLib.trimmedScroll.settings.selector).trimmedScroll( SimpleLib.trimmedScroll.settings ) } );
	}
});
