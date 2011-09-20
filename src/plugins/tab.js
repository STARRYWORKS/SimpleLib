/*
 * tab - jQuery plugin
 *
 * Author Kazuo Uratani, Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	$.fn.tab = function( i_options ){
		
		var defaults = {
			tabSelector:"a.tab",
			selectedClass:"selected",
			trigger:"click",
			over:true,
			out:true,
			down:false,
			up:false,
			selected:false,
			enableMouseEvents:true,
			enableMouseEventsSelected:false,
			postfix: { over:"-over", out:"", down:"-down", up:"", selected:"-selected" },
			fade:false,
			fadeTime:300
		};
		var options = $.extend( true, defaults, i_options );
		
		var $tabs = this.find(options.tabSelector);
		var $selected = null;
		
		$tabs.bind( options.trigger, function(){
			var $this = $(this);
			$tabs.each(function(){
				if ( this == $this[0] ) return;
				$($(this).attr("href")).hide();
			});
			$($this.attr("href")).show();
			$selected = $tabs.filter("*[href="+$this.attr("href")+"]");
			if ( typeof( $tabs.button ) == "function" ) {
				$tabs.button("selected",false);
				$selected.button("selected",true);
			} else {
				$tabs.removeClass(options.selectedClass);
				$selected.addClass(options.selectedClass);
			}
			return false;
		});
		
		$tabs.each(function(){
			if ( $(this).hasClass(options.selectedClass) ){
				$selected = $(this);
				$(this).trigger( options.trigger );
			}
		});
		
		if ( typeof( $tabs.button ) == "function" ) {
			$tabs.button( {
				over:options.over,
				out:options.out,
				down:options.down,
				up:options.up,
				selected:options.selected,
				enableMouseEvents:options.enableMouseEvents,
				enableMouseEventsSelected:options.enableMouseEventsSelected,
				postfix: options.postfix,
				fade:options.fade,
				fadeTime:options.fadeTime
			} );
		}
		
		if($selected == null) $selected = $($tabs[0]);
		$selected.trigger( options.trigger );
		
		return this;
	};

})(jQuery);

/* SimpleLib Plugin */

if ( SimpleLib ) {
	SimpleLib.extend( "tab", {
		settings: {
			selector:".tabSet"
		},
		dependsOn: ["button"],
		init: function() {
			$( function(){ $(SimpleLib.tab.settings.selector).tab( SimpleLib.tab.settings ) } );
		}
	});
}