/*
 * gaEventTracker - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

var _gaq = _gaq || [];
var gaLoadingStartedOn = gaLoadingStartedOn || new Date().getTime();

(function($){
	
	var windowHeight;
	var windowWidth;
	var documentHeight;
	var documentWidth;
	
	var scrolled = false;
	var maxScrollTop = 0;
	var maxScrollLeft = 0;
	
	var scrollTop = 0;
	var scrollLeft = 0;
	var bannerIndex = 1;
	var banners = [];
	var unloadTracked = false;
	
	var verticalScrollbarExists = false;
	var horizontalScrollbarExists = false;
	
	var scrollLeft20 = false;
	var scrollLeft40 = false;
	var scrollLeft60 = false;
	var scrollLeft80 = false;
	var scrollLeft100 = false;
	
	var scrollTop20 = false;
	var scrollTop40 = false;
	var scrollTop60 = false;
	var scrollTop80 = false;
	var scrollTop100 = false;
	
	/*------------------------------
	Scroll & Load Event Tracking
	------------------------------*/
	
	// on scroll
	function _scroll() {
		
		// track scroll
		if ( !scrolled ) {
			_gaq.push(["_trackEvent", "Scrolling", "Scroll", document.location.href]);
			scrolled = true;
		}
		
		// save max scroll position
		
		if ( verticalScrollbarExists ) {
			scrollTop = $(window).scrollTop();
			if ( scrollTop > maxScrollTop ) maxScrollTop = scrollTop;
			
			var t = documentHeight <= 0 ? 100 : Math.round( scrollTop / documentHeight * 100 );
			
			if ( !scrollTop20 && t >= 20 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollTop20", document.location.href] );
				scrollTop20 = true;
			}
			
			if ( !scrollTop40 && t >= 40 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollTop40", document.location.href] );
				scrollTop40 = true;
			}
			
			if ( !scrollTop60 && t >= 60 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollTop60", document.location.href] );
				scrollTop60 = true;
			}
			
			if ( !scrollTop80 && t >= 80 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollTop80", document.location.href] );
				scrollTop80 = true;
			}
			
			if ( !scrollTop100 && t >= 100 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollTop100", document.location.href] );
				_gaq.push( ["_trackEvent", "Scrolling", "MaxScrollTop", document.location.href, 100] );
				scrollTop100 = true;
			}
			
		}
		
		if ( horizontalScrollbarExists ) {
			scrollLeft = $(window).scrollLeft();
			if ( scrollLeft > maxScrollLeft ) maxScrollLeft = scrollLeft;
			
			var l = documentWidth <= 0 ? 100 : Math.round( maxScrollLeft / documentWidth * 100 );
			
			if ( !scrollLeft20 && t >= 20 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollLeft20", document.location.href] );
				scrollLeft20 = true;
			}
			
			if ( !scrollLeft40 && t >= 40 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollLeft40", document.location.href] );
				scrollLeft40 = true;
			}
			
			if ( !scrollLeft60 && t >= 60 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollLeft60", document.location.href] );
				scrollLeft60 = true;
			}
			
			if ( !scrollLeft80 && t >= 80 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollLeft80", document.location.href] );
				scrollLeft80 = true;
			}
			
			if ( !scrollLeft100 && t >= 100 ) {
				_gaq.push( ["_trackEvent", "Scrolling", "ScrollLeft100", document.location.href] );
				_gaq.push( ["_trackEvent", "Scrolling", "MaxScrollLeft", document.location.href, 100] );
				scrollLeft100 = true;
			}
			
		}
		
		
		// check real impression
		_checkRealImpression();
		
	}
	
	// check real impression
	function _checkRealImpression() {
		
		var i,t,id;
		var st = scrollTop + windowHeight;
		var sl = scrollLeft + windowWidth;
		
		for ( i=0; i<banners.length; i++ ) {
			t = banners[i].data( "Top" );
			l = banners[i].data( "Left" );
			if ( st > t && sl > l ) {
				id = banners[i].attr("id");
				_gaq.push(["_trackEvent", "Banner", "RealImpression", id]);
				banners.splice( i, 1 );
				i--;
			}
		}
	
	}
	
	// on dom ready
	function _ready() {
		// track scroll bar existace
		_resize();
		
		var dh = $(document).height();
		if ( !verticalScrollbarExists && dh > windowHeight ) {
			_gaq.push(["_trackEvent", "Scrolling", "VerticalScrollbarExists", document.location.href]);
			verticalScrollbarExists = true;
		}
		
		var dw = $(document).width();
		if ( !horizontalScrollbarExists && dw > windowWidth ) {
			_gaq.push(["_trackEvent", "Scrolling", "HorizontalScrollbarExists", document.location.href]);
			horizontalScrollbarExists = true;
		}
	
	}
	
	// on load
	function _load() {
		
		_resize();
		
		// track load
		$(window).unbind( "load", _load );
		if ( typeof(gaLoadingStartedOn) != "undefined" ) {
			var d = new Date();
			var timeToLoad = d.getTime() - gaLoadingStartedOn;
			_gaq.push(["_trackEvent", "Loading", "Load", document.location.href, timeToLoad ]);
		}
		
		// check banner position again
		var i;
		for ( i=0; i<banners.length; i++ ) {
			banners[i].data( "Top", banners[i].offset().top );
			banners[i].data( "Left", banners[i].offset().left );
		}
		
		_ready();
		
		// check real impression
		_checkRealImpression();
		
	}
	
	// on unload
	function _unload() {
		if ( unloadTracked ) return;
		unloadTracked = true;
		
		if ( typeof(_gat) == "undefined" ) return;
		var tracker = _gat._getTrackerByName();
		
		if ( verticalScrollbarExists && !scrollTop100 ) {
			var dh = $(document).height() - windowHeight;
			var t = dh <= 0 ? 100 : Math.round( maxScrollTop / dh * 100 );
			if ( t > 100 ) t = 100;
			tracker._trackEvent( "Scrolling", "MaxScrollTop", document.location.href, t );
		}
		
		if ( horizontalScrollbarExists && !scrollLeft100 ) {
			var dw = $(document).width() - windowWidth;
			var l = dw <= 0 ? 100 : Math.round( maxScrollLeft / dw * 100 );
			if ( l > 100 ) l = 100;
			tracker._trackEvent( "Scrolling", "MaxScrollLeft", document.location.href, l );
		}
		
		return "unloading";
	}
	
	// on resize
	function _resize() {
		windowHeight = $(window).height();
		windowWidth = $(window).width();
		documentHeight = $(document).height() - windowHeight;
		documentWidth = $(document).width() - windowWidth;
	}
	_resize();
	
	//assign events
	$(window).bind( "resize", _resize );
	$(window).bind( "scroll", _scroll );
	$(document).bind( "ready", _ready );
	$(window).bind( "load", _load );
	$(window).bind( "unload", _unload );
	
	var onBeforeUnload = window.onbeforeunload;
	window.onbeforeunload = function() {
		if ( typeof(onBeforeUnload) == "function" ) onBeforeUnload();
		_unload();
	};
	
	/*------------------------------
	Mouse Event Tracking
	------------------------------*/
	$.fn.gaBanner = function( i_options ) {
		
		var defaults = {};
		var $$ = this;
		var options = $.extend( true, i_options, defaults );
		
		return this.each(function() {
			
			var id = $(this).attr("id");
			
			if ( !id ) {
				id = "gaBanner" + bannerIndex;
				$(this).attr("id",id);
				bannerIndex++;
			}
			
			// Event Handlers
			function _click() {
				$(this).unbind( "click", _click );
				_gaq.push(["_trackEvent", "Banner", "Click", id]);
				return true;
			}
			
			function _over() {
				$(this).unbind( "mouseover", _over );
				_gaq.push(["_trackEvent", "Banner", "MouseOver", id]);
				return true;
			}
			
			// Assign Events
			$(this).bind( "click", _click );
			$(this).bind( "mouseover", _over );
			_gaq.push(["_trackEvent", "Banner", "Impression", id]);
			
			// push to banners for Real Impression tracking
			$(this).data( "Top", $(this).offset().top );
			$(this).data( "Left", $(this).offset().left );
			banners.push( $(this) );
			
		});
	};
	
})(jQuery);

/* SimpleLib Plugin */
if ( SimpleLib ) {
	SimpleLib.extend( "gaEventTracker", {
			settings: {
				bannerSelector:".gaBanner"
			},
			init: function() {
				$( function(){ $(SimpleLib.gaEventTracker.settings.bannerSelector).gaBanner( SimpleLib.gaEventTracker.settings ) } );
			}
	});
}
