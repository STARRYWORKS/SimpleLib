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
			crossFade:false,
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
				var position = $i.css("position");
				var $dummy = $('<img width="'+$i.width()+'" height="'+$i.height()+'" class="dummy" />');
				$i.before($dummy);
				$dummy.css("position",position);
				$dummy.css("display",$i.css("display"));
				$dummy.hide();
				var $o = $('<img style="display:block;position:absolute;" class="over" />').attr("src",up);
				$i.before($o);
				$o.hide();
			}
			$a.hover(
				function(){
					$i.attr("src",over);
					if ( isIE && isPNG ) return;
					if ( !$o.is(":visible") ) $o.show();
					$i.css("position","absolute");
					$dummy.show();
					$o.css("top",$dummy.offset().top+"px");
					$o.css("left",$dummy.offset().left+"px");
					$i.css("top",$dummy.offset().top+"px");
					$i.css("left",$dummy.offset().left+"px");
					$i.stop().css({opacity:0}).animate({opacity:1},options.fadeInTime);
					if ( options.crossFade ) $o.stop().animate({opacity:0},options.fadeInTime);
				},
				function(){
					if ( isIE && isPNG ) {
						$i.attr("src",up);
						return;
					}
					$i.stop().animate({opacity:0},options.fadeOutTime, function(){
						$o.hide();
						$dummy.hide();
						$i.attr("src",up).css({ position:position, opacity:1 });
					});
					if ( options.crossFade ) $o.stop().animate({opacity:1},options.fadeOutTime);
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