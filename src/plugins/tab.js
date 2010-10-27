/*
 * simpleTab - jQuery plugin
 *
 * Author Kazuo Uratani @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

$.fn.simpleTab = function( i_options ){
	
	var defaults = {
		tabSelector:"a.tab",
		selectedClass:"selected",
		trigger:"click"
	};
	var options = $.extend( true, defaults, i_options );
	
	var $tabs = this.find(options.tabSelector);
	var $selected = null;
	
	$tabs.bind( options.trigger, function(){
		var $this = $(this);
		$tabs.each(function(){
			if ( this == $this[0] ) return;
			$($(this).attr("href")).hide();
			$(this).removeClass(options.selectedClass);
		});
		$($this.attr("href")).show();
		$this.addClass(options.selectedClass);
		return false;
	});
	
	$tabs.each(function(){
		if ( $(this).hasClass(options.selectedClass) ){
			$selected = $(this);
			$(this).trigger( options.trigger );
		}
	});
	
	if($selected == null) $selected = $($tabs[0]).trigger( options.trigger );
	
	return this;
};

/* SimpleLib Plugin */

SimpleLib.extend( "tab", {
	settings: {
		selector:".tabSet"
	},
	init: function() {
		$( function(){ $(SimpleLib.tab.settings.selector).simpleTab( SimpleLib.tab.settings ) } );
	}
});
