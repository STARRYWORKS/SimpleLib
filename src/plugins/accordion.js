/*
 * simpleAccordion - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */


(function($){
	$.fn.simpleAccordion = function( i_options ) {
	
		var defaults = {
			selector:".accordion",
			handleSelector:".handle",
			selectedClass:"selected",
			time:300
		};
		var options = $.extend( true, defaults, i_options );
		
		
		$(this).each(function(){
			var $parent = $(this);
			var handles = [];
			
			$parent.find( options.handleSelector ).each( function() {
				if ( $(this).parents(options.selector).get(0) == $parent.get(0) ) handles.push(this);
			});
			
			var $handles = $(handles);
			
			$handles.each(function() {
				var $slave;
				var key = $(this).attr("href");
				
				if(key == "#") $slave = $(this).next();
				else $slave = $(key);
					
				$(this).data("slave", $slave);
				if( !$(this).hasClass(options.selectedClass) ) $slave.hide();
					
				$(this).click(function() {
					if($(this).hasClass(options.selectedClass)) {
						$slave.css("height","auto").slideUp( options.time );
						$(this).removeClass(options.selectedClass);
					} else {
						$slave.show().css("height","auto").height($slave.height()).hide().slideDown( options.time );
						$handles.each(function() {
							if($(this).hasClass(options.selectedClass)) {
								$(this).removeClass(options.selectedClass);
								$(this).data("slave").slideUp( options.time );
							}
						});
						$(this).addClass(options.selectedClass);
					}
					return false;
				});
			});
		
		});
		
		return this;
	
	}
	
})(jQuery);

/* SimpleLib Plugin */
if ( SimpleLib ) {
	SimpleLib.extend( "accordion", {
			settings: {
				selector:".accordion"
			},
			init: function() {
				$( function(){ $(SimpleLib.accordion.settings.selector).simpleAccordion( SimpleLib.accordion.settings ) } );
			}
	});
}
