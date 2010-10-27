<?php

//----------------------------------------
//	config
//----------------------------------------
$jsDir = "../build/";
$pluginsDir = "{$jsDir}plugins/";
$setup = "SimpleLib.setup();";
$thirdPartyPlugins = array("lightBox","ie6PngFix","ie6PositionFixed");

//----------------------------------------
//	lsit of plugins
//----------------------------------------

$plugins = getPlugins($pluginsDir);

function getPlugins( $i_pluginsDir ) {
	$p = array();
	$d = dir($i_pluginsDir);
	while ( $f = $d->read() ) {
		if ( !is_file($i_pluginsDir.$f) || !preg_match( "/\.js\$/",$f ) ) continue;
		$p[] = preg_replace("/^(.+)\.js\$/", "\\1", $f );
	}
	return $p;
}

//----------------------------------------
//	Get request params.
//----------------------------------------
$i_plugins = $_POST["plugins"];
$o_plugins = array();

//----------------------------------------
//	Check request params.
//----------------------------------------
if ( !$i_plugins ) $i_plugins = $plugins;
if ( !is_array($i_plugins) ) $i_plugins = array( $i_plugins );
foreach( $i_plugins as $p ) {
	if ( in_array( $p, $plugins ) ) {
		//サードパーティ製のものを後に
		if ( in_array( $p, $thirdPartyPlugins ) ) $o_plugins[] = $p;
		else array_unshift( $o_plugins, $p );
	}
}
if ( !count($o_plugins) ) {
	echo("Error : invalid request.");
	exit;
}

//----------------------------------------
//	Generate output script
//----------------------------------------
$o_str = "/*\nSimpleLib & plugins\n\n".join(",\n",$i_plugins)."\n\n*/\n\n";

//まずSimpleLib本体のコードを挿入
if( file_exists($jsDir."simplelib.js") ) {
	$o_str .= str_replace($setup, "", file_get_contents( $jsDir."simplelib.js" ) )."\n";
} else {
	echo("SimpleLib is not found");
	exit;
}

//プラグインコードを挿入
foreach ( $o_plugins as $p ) {
	$js = file_get_contents($pluginsDir.$p.".js");
	//サードパーティ製のものでなければ重複するライセンス表記を消す
	if ( !in_array( $p, $thirdPartyPlugins ) ) {
		$js = preg_replace( "/^\/\*.*?\*\//", "", str_replace( "\r", "", str_replace( "\n", "", $js ) ) )."\n";
		//$js = preg_replace( "/^\/\*.*?\*\//ms", "", $js )."\n";
	}
	$o_str .= $js;
}

$o_str .= "\n\n/*SimpleLib SetUp*/\n{$setup}";

//----------------------------------------
//	Output
//----------------------------------------
//header('Content-Disposition: attachment; filename="simplelib.min.js"');
header("Content-type: application/x-javascript");
echo $o_str;

?>