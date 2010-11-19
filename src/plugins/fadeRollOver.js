/*
 * fadeRollOver - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	var isIE = navigator.userAgent.indexOf("MSIE") != -1;

	$.fn.fadeRollOver = function( i_options ){
		
		var defaults = {
			postfix:"-over",
			fadeInTime:0,
			fadeOutTime:300
		};
		var options = $.extend( true, defaults, i_options );
		
		$(this).each(function(){
			var $a = $(this);
			var $i = $a.children('img');
			if(!$i.length && $a.attr("src")) $i = $a;
			if(!$i.length) return;
			
			var up = $i.attr("src");
			var isPNG = up.match(/\.png$/) != "";
			var over = up.replace(/\.([a-zA-Z0-9]+)$/,options.postfix+".$1");
			
			if ( !isIE || !isPNG ) {
				var $o = $('<img style="display:block;position:absolute;" class="over" />').attr("src",over);
				$i.before($o);
				$o.hide();
			}
			$a.hover(
				function(){
					if ( isIE && isPNG ) {
						$i.attr("src",over);
						return;
					}
					if ( !$o.is(":visible") ) $o.css({opacity:0}).show();
					$o.css("top",$i.offset().top+"px");
					$o.css("left",$i.offset().left+"px");
					$o.stop().animate({opacity:1},options.fadeInTime);
					$i.stop().animate({opacity:0},options.fadeInTime);
				},
				function(){
					if ( isIE && isPNG ) {
						$i.attr("src",up);
						return;
					}
					$o.stop().animate({opacity:0},options.fadeOutTime);
					$i.stop().animate({opacity:1},options.fadeOutTime, function(){ $o.hide(); });
				}
			);
		});
		
		return this;
	};

})(jQuery);

/* SimpleLib Plugin */
if ( SimpleLib ) {
	SimpleLib.extend( "fadeRollOver", {
		settings: {
			selector:".fadeRollOver, .faderollover"
		},
		init: function() {
			$( function(){ $(SimpleLib.fadeRollOver.settings.selector).fadeRollOver( SimpleLib.fadeRollOver.settings ) } );
		}
	});
}