/*
 * textHint - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){

	$.fn.textHint = function( i_options ) {
		
		var defaults = {
			attribute: "title",
			blurClass: "blur"
		};
		var $$ = this;
		var options = $.extend( true, i_options, defaults );
		
		return $$.each(function(){
			var $input = $(this);
			var hint = $input.attr(options.attribute);
			if ( !hint ) return;
			var $form = $input.parents("form");
			
			function _onFocus() {
				$(this).removeClass(options.blurClass);
				if ( $(this).val() === hint ) $(this).val("");
				return true;
			}
			
			function _onBlur() {
				if ( $(this).val() === "" ) {
					$(this).addClass(options.blurClass);
					$(this).val(hint);
				}
			}
			
			function _onSubmit() {
				$$.each( function(){
					if ( $(this).val() === hint ) $(this).val("");
				});
			}
			
			$input.focus(_onFocus).blur(_onBlur);
			$input.blur();
			$form.submit(_onSubmit);
			$(window).unload(_onFocus);
		});
	}

})(jQuery);

/* SimpleLib Plugin */

if ( SimpleLib ) {
	SimpleLib.extend( "textHint", {
		settings: {
			selector:"input.hint, textarea.hint"
		},
		init: function() {
			$( function(){ $(SimpleLib.textHint.settings.selector).textHint( SimpleLib.textHint.settings ) } );
		}
	});
}