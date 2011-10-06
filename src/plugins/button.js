/*
 * button - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */


/*-------------------------------------------------------

Usage:

//init
$("#selector").button( { over:true, down:true } ); // preload images and bind events

//set status
$("#selector").button("over");
$("#selector").button("out");
$("#selector").button("down");
$("#selector").button("up");

//
$("#selector").button("enable");
$("#selector").button("disable");
$("#selector").button("clear");


//selected
$("#selector").button("selected",true); //add "selected" class, and change image source ( if selected option is true )
$("#selector").button("selected","toggle"); //toggle "selected"
var selected = $("#selector").button("selected"); //same as hasClass("selected")

-------------------------------------------------------*/

(function($){
	
	/*-----------------------------------
	Global Variables
	-----------------------------------*/
	var isIE = ( navigator.userAgent.indexOf("MSIE") != -1 );
	var listeners = {
		over	:function() { $(this).button( "over" ); },
		out		:function() { $(this).button( "out" ); },
		down	:function() { $(this).button( "down" ); },
		up		:function() { $(this).button( "up" ); }
	};
	
	var postfixReg;
	
	
	/*-----------------------------------
	jQuery Plugin
	-----------------------------------*/
	$.fn.button = function( i_options ) {
		
		
		/*-----------------------------------
		Settings
		-----------------------------------*/
		var defaults = {
			over:true,
			out:true,
			down:false,
			up:false,
			selected:false,
			enableMouseEvents:true,
			enableMouseEventsSelected:true,
			postfix: { over:"-over", out:"", down:"-down", up:"", selected:"-selected" },
			fade:false,
			fadeTime:200
		};
		
		var events = { over:"mouseenter", out:"mouseleave", down:"mousedown", up:"mouseup" }
		var statuses = [ "over", "out", "down", "up" ];
		
		/*-----------------------------------
		internal functions
		-----------------------------------*/
		
		
		//init
		function init( $i_button ) {
			var options = $i_button.data("button_options");
			var selected = $i_button.hasClass("selected");
			clear( $i_button );
			if ( !initStatus( $i_button ) ) return false;
			var i;
			var button_statuses = [];
			if ( ( selected && options.enableMouseEventsSelected ) || ( !selected && options.enableMouseEvents ) ) {
				for ( i in statuses ) {
					if ( options[statuses[i]] ) {
						if ( addStatus( $i_button, statuses[i] )  ) button_statuses.push(statuses[i]);
					}
				}
			}
			$i_button.data("button_statuses",button_statuses);
			enableMouseEvents( $i_button );
		}
		
		//mouse enabled
		function enableMouseEvents( $i_button ) {
			var button_statuses = $i_button.data("button_statuses");
			for ( var i in button_statuses ) $i_button.bind( events[button_statuses[i]], listeners[button_statuses[i]] );
		}
		
		function disableMouseEvents( $i_button ) {
			var button_statuses = $i_button.data("button_statuses");
			for ( var i in button_statuses ) $i_button.unbind( events[button_statuses[i]], listeners[button_statuses[i]] );
		}
		
		//init status
		function initStatus( $i_button ) {
			var options = $i_button.data("button_options");
			var $img = getImage( $i_button );
			if ( $img.length <= 0 ) return false;
			if ( $img.data( "button_default" ) && $img.data( "button_selected" ) ) return true;
			var src = $img.attr("src");
			src = src.replace(postfixReg,".$2").replace(postfixReg,".$2");
			var selected_src = src.replace(/\.([a-zA-Z0-9]+)$/,options.postfix["selected"]+".$1");
			var isPNG = ( src.match(/\.png$/) != "" );
			$img.data( "isPNG", isPNG );
			$img.data( "button_default", src );
			$img.data( "button_selected", selected_src );
			var selected = $i_button.hasClass("selected");
			$img.attr("src", selected ? selected_src : src );
			
			//preload
			if ( !options || options.selected ) {
				$("<img />").attr("src",src);
				$("<img />").attr("src",selected_src);
			}
			
			//fade
			if ( options.fade && $i_button.is("a") && !$i_button.find("img.buttonFade").length ) {
				var position = $img.css("position");
				var $fade = $('<img width="'+$img.width()+'" height="'+$img.height()+'" class="buttonFade" />');
				$img.before($fade);
				$fade.css( { position:"absolute", display:"none" } );
				$img.data( "$button_fade", $fade );
			}
			return true;
		}
		
		//add status
		function addStatus( $i_button, i_status ) {
			var selected = $i_button.hasClass("selected");
			var options = $i_button.data("button_options");
			if ( ( selected && !options.enableMouseEventsSelected ) || ( !selected && !options.enableMouseEvents ) ) return false;
			if ( !initStatus($i_button) ) return false;
			var options = $i_button.data("button_options");
			if ( !options || !options[i_status] || !options.postfix || !options.postfix.hasOwnProperty(i_status) ) return false;
			var data_key = "button_"+i_status;
			var $img = getImage( $i_button );
			if ( $img.length <= 0 ) return;
			if ( $img.data(data_key) ) return true;
			
			//set data
			var selected = $i_button.hasClass("selected");
			var url = $img.data("button_default").replace(/\.([a-zA-Z0-9]+)$/,options.postfix[i_status]+".$1");;
			var selected_url = $img.data("button_selected").replace(/\.([a-zA-Z0-9]+)$/,options.postfix[i_status]+".$1");;
			$img.data( data_key, ( selected && options.postfix[i_status] != options.postfix["selected"] ) ? selected_url : url );
			
			//preload image
			if ( url != $img.data("button_default") ) $("<img />").attr("src",url);
			if ( options.selected && options.enableMouseEventsSelected && selected_url != $img.data("button_selected") ) $("<img />").attr("src",selected_url);
			
			return true;
		}
		
		//get image
		function getImage( $i_button ) {
			if ( $i_button.data( "$button_img" ) ) return $i_button.data( "$button_img" );
			var $img = $i_button.children("img:not(img.buttonFade)");
			if(!$img.length && $i_button.attr("src")) $img = $i_button;
			$i_button.data( "$button_img", $img );
			return $img;
		}
		
		//clear
		function clear( $i_button ) {
			var $img = getImage( $i_button );
			var d = $img.data("button_default");
			if ( d ) $img.attr("src",d);
			var i;
			for ( i in statuses ) {
				$img.data( "button_"+statuses[i], "" );
				$i_button.unbind( events[statuses[i]], listeners[statuses[i]] );
			}
			$i_button.data( "$button_img","" );
			$img.data("button_selected","");
			$img.data("button_default","");
			$i_button.data("button_status","");
			$i_button.find("img.buttonFade").remove();
		}
		
		//set status and change image
		function setStatus( $i_button, i_status ) {
			var status = $i_button.data("button_status");
			if ( status == i_status ) return;
			if ( status ) $i_button.removeClass(status);
			var before_status = status;
			$i_button.data("button_status",i_status);
			
			if ( !addStatus( $i_button, i_status ) ) return false;
			var data_key = "button_"+i_status;
			var $img = getImage( $i_button );
			
			//
			var options = $i_button.data("button_options");
			var isPNG = $img.data("isPNG");
			if ( options.fade && $i_button.is("a") && $i_button.find("img.buttonFade").length && !( isIE && isPNG ) ) {
				if ( options.postfix[i_status] ) {
					$img.attr( "src", $img.data("button_"+before_status) );
					var $fade = $img.data( "$button_fade" );
					var o = $img.offset();
					$fade.parents().each(function(){
						var p = $(this).css("position");
						if ( p == "fixed" || p == "absolute" ) {
							var po = $(this).offset();
							o.top -= po.top;
							o.left -= po.left;
						}
					});
					$fade.css( { top:o.top+"px", left:o.left+"px" } );
					$fade.attr( "src", $img.data( data_key ) );
					$fade.stop( true, true ).fadeIn( options.fadeTime );
				} else {
					var $fade = $img.data( "$button_fade" );
					$img.attr( "src", $img.data( data_key ) );
					$fade.stop( true, true ).fadeOut( options.fadeTime );
				}
			} else {
				$img.attr( "src", $img.data( data_key ) );
				if ( options.postfix[i_status] ) {
					$img.css( "background-image", "url("+$img.data("button_default")+")" );
				} else {
					$img.css( "background-image", "none" );
				}
			}
			
			return true;
		}
		
		//select
		function select( $i_button, i_value ) {
			var selected = $i_button.hasClass("selected");
			if ( selected == i_value ) return;
			selected = i_value;
			if ( selected ) $i_button.addClass("selected");
			else $i_button.removeClass("selected");
			init($i_button);
		}
		
		function isString( i_obj ) {
			return ( typeof( i_obj ) == "string" || i_obj instanceof String );
		}
		
		
		/*-----------------------------------
		Main
		-----------------------------------*/
		
		if ( arguments.length > 0 && isString( arguments[0] ) ) {
			var status = arguments[0];
			if ( status == "selected" ) {
				if ( arguments.length > 1 ) {
					var val = arguments[1];
					return $(this).each( function(){ select( $(this), val == "toggle" ? !$(this).hasClass("selected") : val ); } );
				} else {
					return $(this).hasClass("selected");
				}
				
			} else if ( status == "enable" ) {
				return $(this).each( function(){ enableMouseEvents( $(this) ); } );
			} else if ( status == "disable" ) {
				return $(this).each( function(){ disableMouseEvents( $(this) ); } );
			} else if ( status == "clear" ) {
				return $(this).each( function(){ clear( $(this) ); } );
			} else {
				return $(this).each( function(){ setStatus( $(this), status ); } );
			}
		}
		
		i_options = arguments.length && typeof( arguments[0] ) != "String" > 0 ? arguments[0] : {};
		var options = $.extend( true, defaults, i_options );
		//
		var postfixes = [];
		for ( var p in options.postfix ) if ( options.postfix[p] ) postfixes.push( options.postfix[p] );
		postfixReg = new RegExp( "("+postfixes.join("|")+")\.([a-zA-Z0-9]+)$", "g" );
		//
		$(this).data( "button_options", options );
		return $(this).each(function(){ init( $(this) ); });
		
	}
	
})(jQuery);



/* SimpleLib Plugin */
if ( SimpleLib ) {
	SimpleLib.extend( "button", {
		settings: {
			buttonSelector:"a.button, input.button",
			rollOverSelector:"a.rollover, a.rollOver, input.rollover, input.rollOver",
			fadeRollOverSelector:"a.faderollover, a.fadeRollOver, input.faderollover, input.fadeRollOver"
		},
		init: function() {
			var buttonSettings = {}, rollOverSettings = {}, fadeRollOverSettings = {};
			$.extend( true, buttonSettings, SimpleLib.button.settings, { over:true, down:true, up:true } );
			$.extend( true, rollOverSettings, SimpleLib.button.settings, { over:true, down:false, up:false, fade:false } );
			$.extend( true, fadeRollOverSettings, SimpleLib.button.settings, { over:true, down:false, up:false, fade:true } );
			$( function(){ 
				$(SimpleLib.button.settings.buttonSelector).button( buttonSettings );
				$(SimpleLib.button.settings.rollOverSelector).button( rollOverSettings );
				$(SimpleLib.button.settings.fadeRollOverSelector).button( fadeRollOverSettings );
			});
		}
	});
}