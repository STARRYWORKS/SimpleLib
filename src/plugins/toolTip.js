/*
 * simpleTooltip - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleTooltip = function( i_options ) {
	
	var defaults = {
		time:200,
		delay:0,
		margin:10
	};
	var options = $.extend( true, defaults, i_options );
	
	//var content;
	this.each(function(){
		var title = $(this).attr('title');
		if(!title) return;
		
		var $this = $(this);
		var hoverType = (function(){
				var className = $this.attr('class');
				if(className == 'toolTip') {
					return 'auto';
				} else {
					return className.replace('toolTip-', '');
				}
			})();
			
			
		$(this).data('hoverType', hoverType);
		$(this).hover(function(){
			var pos = $(this).position();
			var scale = { width : $(this).width(), height : $(this).height() };

			//とりあえず今は中身に表示できるのはtitleだけにしとく
			//bug : #simpleTooltipにwidthが指定されてないと、高さと幅が正確にとれない！
			//css側で#simpleTooltipにwidthを必ず付与しておくこと。
			var $toolTipBody = $('<div id="simpleTooltip">' + title + '</div>').css('display', 'inline-block'); 
			
			$(this).attr("title", "");
			if(title != '') {
				var posHorizontal;
				var posVertical;
				$('body').append($toolTipBody);
				
				if($(this).data('hoverType') == 'auto') {
					$(this).data('auto', true);
					var tPos = ($(this).offset().top) - ($(window).scrollTop());
					var lPos = ($(this).offset().left) - ($(window).scrollLeft());
					var bPos = tPos + $(this).height();
					var rPos = lPos + $(this).width();
					
					var type =	((tPos - $toolTipBody.height()) < options.margin) ? "bottom" : 
								((lPos - $toolTipBody.width()) < options.margin) ? "right" :
								((bPos + $toolTipBody.height()) >= $(window).height() - options.margin) ? "top" :
								((rPos + $toolTipBody.width()) > $(window).width() - options.margin) ? "left" :
								"top";
					$(this).data('hoverType', type);
				}
				
				switch($(this).data('hoverType')) {
					case 'left' : 
						posHorizontal = pos.left - $toolTipBody.width() - options.margin - 10;
						posVertical = (pos.top - $toolTipBody.height() / 2);
						break;
						
					case 'right' :
						posHorizontal = (pos.left + scale.width + options.margin);
						posVertical = (pos.top - $toolTipBody.height() / 2);
						break;
						
					case 'top' : 
						posHorizontal = (pos.left + (scale.width / 2)) - $toolTipBody.width() / 2;
						posVertical = pos.top - $toolTipBody.height() - options.margin - 10;
						break;
						
					case 'bottom' : 
						posHorizontal = (pos.left + (scale.width / 2)) - $toolTipBody.width() / 2;
						posVertical = (pos.top + scale.height + options.margin);
						break;
						
					default : 
						return;
						break;
				}
				
				$('#simpleTooltip')
					.css("position","absolute")
					.css("top", posVertical + 'px')
					.css("left", posHorizontal + 'px')
					.css("display", "none")
					.animate({dummy:0},options.delay)
					.fadeIn(options.time);
			}
		}, function(){
			if($(this).data('auto')) {
				$(this).data('hoverType', 'auto');
			}
			$('#simpleTooltip').remove();
			$(this).attr("title", title);
		});
	});
}


/*
 * SimpleLib Plugin
 *
 */
if ( typeof("SimpleLib") != "undefined" ) {
	var pluginInfo = {
		settings: {
			selector:"a[class*='toolTip']"
		},
		init: function() {
			$( function(){ $(SimpleLib.toolTip.settings.selector).simpleTooltip( SimpleLib.toolTip.settings ) } );
		}
	};
	SimpleLib.extend( "toolTip", pluginInfo );
}
