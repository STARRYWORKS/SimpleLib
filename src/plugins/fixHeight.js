/*
 * fixHeight - jQuery Plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */


(function(){
	
	var groups = [];
	var textHeight = 0;
	var $fontSizeDiv;
	
	$.checkFixHeight = function( i_force ) {
		if ( $fontSizeDiv.height() == textHeight && i_force !== true ) return;
		textHeight = $fontSizeDiv.height();
		$.each( groups, function(){
			$(this).fixHeight();
		});
	}
	
	$.fn.fixHeight = function() {
		this.each(function(){
		
			//add100526
			//IEだとinitFixHeightが全ての要素に走りきってないため、ここで要素を取得
			if(typeof $(this).data("fixHeightChildren") == "undefined") {
				$(this).data("fixHeightChildren", $(this).children());
			}
			
			if ( !$(this).data("fixHeightChildren") ) return;
			var $children = $(this).data("fixHeightChildren");
			if ( !$children.find(":visible").length ) return;
			
			//$childrenのY座標が同じものは同じ高さに
			var childrenGroup = [];
			var top = 0;
			$children.each(function(){
				if ( top != $(this).position().top ) {
					$(childrenGroup).fixHeightChildren();
					childrenGroup = [];
					top = $(this).position().top;
				}
				childrenGroup.push(this);
			});
			if ( childrenGroup.length ) $(childrenGroup).fixHeightChildren();
		});
	}
	
	$.fn.fixHeightChildren = function() {
		var maxHeight = 0;
		this.css("height","auto");
		this.each(function(){
			if ( $(this).height() > maxHeight ) maxHeight = $(this).height();
		});
		this.height(maxHeight);
		return this;
	}
	
	$.fn.initFixHeight = function() {
		this.each(function(){
			var $this = $(this);
			var $children = $this.find(".fixHeightChild");
			
			if ( !$children.length ) {
				$children = $this.children();
			}
			if ( !$children.length ) {
				return;
			}
			$this.data("fixHeightChildren",$children);
			groups.push($this);
		});
		return this;
	}
	
	function init() {
		$(".fixHeight").initFixHeight();
		$fontSizeDiv = $(document).append('<div style="position:absolute;left:-999px;top:-999px;">s</div>');
		setInterval($.checkFixHeight,1000);
		$(window).resize($.checkFixHeight);
		$.checkFixHeight();
	}
	
	$(init);
	
})();
