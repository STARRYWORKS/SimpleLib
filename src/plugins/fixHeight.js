/*
 * fixHeight - jQuery Plugin
 * http://www.starryworks.co.jp/blog/tips/javascript/fixheightjs.html
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 * 
 * Licensed under the MIT License
 *
 */


(function($){
	
	var isInitialized = false;
	var parents = [];
	var textHeight = 0;
	var $fontSizeDiv;
	
	$.fn.fixHeight = function() {
		this.each(function(){
			var childrenGroups = getChildren( this );
			
			$.each( childrenGroups, function(){
				
				//$childrenのY座標が同じものは同じ高さに
				var $children = $(this);
				if ( !$children.filter(":visible").length ) return;
				
				var row = [];
				var top = 0;
				$children.each(function(){
					if ( top != $(this).position().top ) {
						$(row).sameHeight();
						row = [];
						top = $(this).position().top;
					}
					row.push(this);
				});
				if ( row.length ) $(row).sameHeight();
			});
			
			
		});
		init();
		return this;
	}
	
	//フォントサイズの変更時やウィンドウのリサイズ時に高さを揃える処理を実行
	$.checkFixHeight = function( i_force ) {
		if ( $fontSizeDiv.height() == textHeight && i_force !== true ) return;
		textHeight = $fontSizeDiv.height();
		$(parents).fixHeight();
	}
	
	//同じ高さに揃える
	$.fn.sameHeight = function() {
		var maxHeight = 0;
		this.css("height","auto");
		this.each(function(){
			if ( $(this).height() > maxHeight ) maxHeight = $(this).height();
		});
		return this.height(maxHeight);
	}
	
	//処理すべき子要素のグループを取得
	function getChildren( i_parent ) {
		var $parent = $( i_parent );
		
		//既にデータが存在すればそれを返す
		if ( $parent.data("fixHeightChildrenGroups") ) return $parent.data("fixHeightChildrenGroups");
		
		//子グループを格納する配列
		var childrenGroups = [];
		
		//fixHeightChildクラスを持つ子要素を取得
		var $children = $parent.find(".fixHeightChild");
		if ( $children.length ) childrenGroups.push( $children );
		
		//fixHeightChildXXXクラスを持つ子要素を取得
		var $groupedChildren = $parent.find("*[class*='fixHeightChild']:not(.fixHeightChild)");
		if ( $groupedChildren.length ) {
			var classNames = {};
			$groupedChildren.each(function(){
				var a = $(this).attr("class").split(" ");
				var i;
				var l = a.length;
				var c;
				for ( i=0; i<l; i++ ) {
					c = a[i].match(/fixHeightChild[a-z0-9_-]+/i);
					if ( !c ) continue;
					c = c.toString();
					if ( c ) classNames[c] = c;
				}
			});
			for ( var c in classNames ) childrenGroups.push( $parent.find("."+c) );
		}
		
		//子要素の指定がない場合は直属の子を取得
		if ( !childrenGroups.length ) {
			$children = $parent.children();
			if ( $children.length ) childrenGroups.push( $children );
		}
		
		//子がなければ
		$parent.data("fixHeightChildrenGroups", childrenGroups );
		parents.push( $parent );
		
		return childrenGroups;
	}
	
	//フォントサイズ確認用のDIV追加とタイマーセット
	function init() {
		if ( isInitialized ) return;
		isInitialized = true;
		$fontSizeDiv = $(document).append('<div style="position:absolute;left:-9999px;top:-9999px;">s</div>');
		setInterval($.checkFixHeight,1000);
		$(window).resize($.checkFixHeight);
		$.checkFixHeight();
		$(window).load( function(){ $.checkFixHeight(true); } );
	}
	
})(jQuery);



jQuery(document).ready(function(){
	$(".fixHeight").fixHeight();
});
