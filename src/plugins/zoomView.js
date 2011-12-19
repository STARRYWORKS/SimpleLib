/*
 * zoomView - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function($){
	
	// options
	var options;
	
	// const
	var BIG_IMAGE_PATH = "bigImagePath";
	
	// private variables
	var initialized = false;
	
	var $window;
	var $wrapper;
	var $imgContainer;
	var $bigImg;
	var $currentTarget;
	
	var enterFrameTimer;
	var loadedImages = {};
	
	var desLeft;
	var desTop;
	var previewMinY;
	var previewMaxY;
	var containerWidth;
	var containerHeight;
	
	var targetWidth;
	var targetHeight;
	var bigImageWidth;
	var bigImageHeight;
	var mouseX;
	var mouseY;
	
	/*-------------------------------------------------------
	initialize
	-------------------------------------------------------*/
	function init() {
		if ( initialized ) return;
		initialized = true;
		
		$window = $( window );
		
		// prepare html nodes
		$(options.viewParent).append('<div id="ZoomView"><div id="ZoomViewInner"><div id="ZoomViewMask"><img /></div></div></div>');
		$wrapper = $("#ZoomView").hide();
		$imgContainer = $("#ZoomViewMask");
		$bigImg = $wrapper.find("img");
		
		// bind events
		$bigImg.bind( "load", function(){
			$( this ).stop( true, true ).fadeIn( 100 );
			bigImageWidth = $(this).width();
			bigImageHeight = $(this).height();
			setDestinationPosition( mouseX, mouseY );
		} );
		
		$window.bind( "resize", resize );
		$window.bind( "scroll", resize );
		$window.trigger( "resize" );
	}
	
	/*-------------------------------------------------------
	event handlers
	-------------------------------------------------------*/

	/*-----------------------------------
	on resize
	-----------------------------------*/
	function resize() {
		previewMAXY = $window.height() + $window.scrollTop() - $wrapper.height() - options.margin;
		previewMinY = $window.scrollTop() + options.margin;
	}
	
	/*-----------------------------------
	on mouseover
	-----------------------------------*/
	function onMouseOver( i_event ) {
		
		$target = $(this);
		
		targetWidth = $target.width();
		targetHeight = $target.height();
		
		//現在のプレビューと同じ場合
		if( $target && $currentTarget && $currentTarget.get(0) == $target.get(0) ) return;
		
		$currentTarget = $target;
		
		//大きい画像が未ロード画像の時
		if ( !loadedImages[$target.data(BIG_IMAGE_PATH)] ) {
			loadedImages[$target.data(BIG_IMAGE_PATH)] = true;
			$bigImg.stop( true, true ).hide();
		} else {
			bigImageWidth = $bigImg.width();
			bigImageHeight = $bigImg.height();
		}
		$bigImg.attr( "src", $target.data(BIG_IMAGE_PATH) );
		
		//プレビュー枠の位置を適応
		var pos = $target.position();
		var left = pos.left;
		if ( left > $window.width() * 0.5 ) {
			$wrapper.removeClass("left");
			$wrapper.addClass("right");
			left -= $wrapper.width() + options.margin;
		} else {
			$wrapper.removeClass("right");
			$wrapper.addClass("left");
			left += targetWidth + options.margin;
		}
		
		var top = pos.top - ( $wrapper.height() - targetHeight ) * 0.5;
		if( top > previewMAXY ) {
			top = previewMAXY;
		}else if( top < previewMinY ) {
			top = previewMinY;
		}
		
		
		$wrapper.css( { left : left + "px", top : top + "px" } );
		$wrapper.stop( true, true ).fadeIn( 100 );
		containerWidth = $imgContainer.width();
		containerHeight = $imgContainer.height();
		
		// 拡大画像の位置設定
		mouseX = i_event.offsetX;
		mouseY = i_event.offsetY;
		// for firefox
		if ( !mouseX ) mouseX = i_event.pageX - $currentTarget.offset().left;
		if ( !mouseY ) mouseY = i_event.pageY - $currentTarget.offset().top;
		setDestinationPosition( mouseX, mouseY );
		$bigImg.css( { left : desLeft + "px", top : desTop + "px" } );
		
		enterFrameTimer = setInterval( onEnterFrame, 30 );
	}
	
	/*-----------------------------------
	on mouseout
	-----------------------------------*/
	function onMouseOut( i_event ) {
		clearInterval( enterFrameTimer );
		$currentTarget = null;
		$wrapper.stop( true, true ).fadeOut( options.fadeTime );
	}
	
	/*-----------------------------------
	on mousemove
	-----------------------------------*/
	function onMouseMove( i_event ) {
		mouseX = i_event.offsetX;
		mouseY = i_event.offsetY;
		// for firefox
		if ( !mouseX ) mouseX = i_event.pageX - $currentTarget.offset().left;
		if ( !mouseY ) mouseY = i_event.pageY - $currentTarget.offset().top;
		setDestinationPosition( mouseX, mouseY );
	}
	
	function setDestinationPosition( x, y ) {
		
		//0〜1の割合を取得
		var x = x / targetWidth;
		var y = y / targetHeight;
		
		if ( x > 1 ) x = 1;
		else if ( x < 0 ) x = 0;
		if ( y > 1 ) y = 1;
		else if ( y < 0 ) y = 0;
		
		
		//プレビュー画像位置を特定
		if ( !bigImageWidth ) bigImageWidth = $bigImg.width();
		if ( !bigImageHeight ) bigImageHeight = $bigImg.height();
		var left = ( bigImageWidth * -x ) + ( containerWidth * 0.5 );
		var top = ( bigImageHeight * -y ) + ( containerHeight * 0.5 );
		
		if ( left > 0 ) left = 0;
		else if ( left < containerWidth - bigImageWidth ) left = containerWidth - bigImageWidth;
		if ( top > 0 ) top = 0;
		else if ( top < containerHeight - bigImageHeight ) top = containerHeight - bigImageHeight;
		
		desLeft = left;
		desTop = top;
	}
	
	/*-----------------------------------
	on enterframe
	-----------------------------------*/
	function onEnterFrame() {
		var pos = $bigImg.position();
		var tx = pos.left;
		var ty = pos.top;
		
		var left = tx + ( desLeft - tx ) * options.easing;
		var top = ty + ( desTop - ty ) * options.easing;
		
		$bigImg.css( { left : left + "px", top : top + "px" } );
	}
	
	/*-------------------------------------------------------
	jQuery plugin
	-------------------------------------------------------*/
	$.fn.zoomView = function( i_options ) {
		
		/*-----------------------------------
		options
		-----------------------------------*/
		var defaults = {
			easing			: 0.4,
			margin			: 20,
			fadeTime		: 200,
			bigImagePostFix	: "-big",
			viewParent		: "body"
		};
		options = $.extend( true, defaults, i_options );
		
		//
		init();
		
		/*-----------------------------------
		Process each objects
		-----------------------------------*/
		return $(this).each(function(){
			var $this = $(this);
			var imagePath = $this.attr("src");
			$this.data( BIG_IMAGE_PATH, imagePath.replace( /^(.*)\.([a-zA-Z0-9]+)$/, "$1"+options.bigImagePostFix+".$2") );
			$this.bind( "mouseenter", onMouseOver );
			$this.bind( "mouseleave", onMouseOut );
			$this.bind( "mousemove", onMouseMove );
		});
		
		
	}
	
	
})(jQuery);


/* SimpleLib Plugin */
if ( SimpleLib ) {
	SimpleLib.extend( "zoomView", {
			settings: {
				cssPath		: SimpleLib.jsDir + "plugins/zoomView/zoomView.css",
				selector	: ".zoomView"
			},
			init: function() {
				if ( SimpleLib.zoomView.settings.cssPath ) SimpleLib.loadCSS( SimpleLib.zoomView.settings.cssPath );
				$( function(){ $(SimpleLib.zoomView.settings.selector).zoomView( SimpleLib.zoomView.settings ) } );
			}
	});
}
