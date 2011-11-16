/*
 * gaEventTracker - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

/*

To Do:

最大スクロール量のトラッキング

*/

var _gaq = _gaq || [];

(function($){
	
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	
	var scrolled = false;
	var maxScrollTop = 0;
	var maxScrollLeft = 0;
	var scrollTop = 0;
	var scrollLeft = 0;
	var bannerIndex = 1;
	var banners = [];
	var unloadTracked = false;
	
	/*------------------------------
	Scroll & Load Event Tracking
	------------------------------*/
	if ( typeof(gaLoadingStartedOn) == "undefined" ) gaLoadingStartedOn = new Date().getTime();
	
	// on scroll
	function _scroll() {
		
		// track scroll
		if ( !scrolled ) {
			_gaq.push(["_trackEvent", "Scrolling", "Scroll", document.location.href]);
			scrolled = true;
		}
		
		// save max scroll position
		
		scrollTop = $(window).scrollTop();
		if ( scrollTop > maxScrollTop ) maxScrollTop = scrollTop;
		
		scrollLeft = $(window).scrollLeft();
		if ( scrollLeft > maxScrollLeft ) maxScrollLeft = scrollLeft;
		
		
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
				_gaq.push(["_trackEvent", "Ads", "RealImpression", id]);
				banners.splice( i, 1 );
				i--;
			}
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
		
		
		// track scroll bar existace
		
		var dh = $(document).height();
		if ( dh > windowHeight ) {
			_gaq.push(["_trackEvent", "Scrolling", "VerticalScrollbarExists", document.location.href]);
		}
		
		var dw = $(document).width();
		if ( dw > windowWidth ) {
			_gaq.push(["_trackEvent", "Scrolling", "HorizontalScrollbarExists", document.location.href]);
		}
		
		// check banner position again
		var i;
		for ( i=0; i<banners.length; i++ ) {
			banners[i].data( "Top", banners[i].offset().top );
			banners[i].data( "Left", banners[i].offset().left );
		}
		
		// check real impression
		_checkRealImpression();
		
	}
	
	// on unload
	function _unload() {
		if ( unloadTracked ) return;
		unloadTracked = true;
		
		var dh = $(document).height() - windowHeight;
		var dw = $(document).width() - windowWidth;
		var t = dh <= 0 ? 1 : maxScrollTop / dh;
		var l = dw <= 0 ? 1 : maxScrollLeft / dw;
		
		if ( t > 1 ) t = 1;
		if ( l > 1 ) l = 1;
		
		_gaq.push(["_trackEvent", "Scrolling", "MaxScrollTop", t]);
		_gaq.push(["_trackEvent", "Scrolling", "MaxScrollLeft", l]);
		
		return "unloading";
	}
	
	// on resize
	function _resize() {
		windowHeight = $(window).height();
		windowWidth = $(window).width();
	}
	_resize();
	
	//assign events
	$(window).bind( "resize", _resize );
	$(window).bind( "scroll", _scroll );
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
				_gaq.push(["_trackEvent", "Ads", "Click", id]);
				return true;
			}
			
			function _over() {
				$(this).unbind( "mouseover", _over );
				_gaq.push(["_trackEvent", "Ads", "MouseOver", id]);
				return true;
			}
			
			// Assign Events
			$(this).bind( "click", _click );
			$(this).bind( "mouseover", _over );
			_gaq.push(["_trackEvent", "Ads", "Impression", id]);
			
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
