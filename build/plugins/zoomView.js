/*
 * zoomView - jQuery plugin
 *
 * Author Koji Kimura @ STARRYWORKS inc.
 * http://www.starryworks.co.jp/
 *
 * Licensed under the MIT License
 *
 */

(function(c){function B(){x||(x=!0,j=c(window),c(g.viewParent).append('<div id="ZoomView"><div id="ZoomViewInner"><div id="ZoomViewMask"><img /></div></div></div>'),e=c("#ZoomView").hide(),q=c("#ZoomViewMask"),f=e.find("img"),f.bind("load",function(){c(this).stop(!0,!0).fadeIn(100);l=c(this).width();m=c(this).height();r(h,i)}),j.bind("resize",y),j.bind("scroll",y),j.trigger("resize"))}function y(){previewMAXY=j.height()+j.scrollTop()-e.height()-g.margin;s=j.scrollTop()+g.margin}function C(a){$target=
c(this);t=$target.width();u=$target.height();if(!$target||!(k&&k.get(0)==$target.get(0))){k=$target;z[$target.data(n)]?(l=f.width(),m=f.height()):(z[$target.data(n)]=!0,f.stop(!0,!0).hide());f.attr("src",$target.data(n));var b=$target.position(),d=b.left;d>0.5*j.width()?(e.removeClass("left"),e.addClass("right"),d-=e.width()+g.margin):(e.removeClass("right"),e.addClass("left"),d+=t+g.margin);b=b.top-0.5*(e.height()-u);b>previewMAXY?b=previewMAXY:b<s&&(b=s);e.css({left:d+"px",top:b+"px"});e.stop(!0,
!0).fadeIn(100);o=q.width();p=q.height();h=a.offsetX;i=a.offsetY;h||(h=a.pageX-k.offset().left);i||(i=a.pageY-k.offset().top);r(h,i);f.css({left:v+"px",top:w+"px"});A=setInterval(D,30)}}function E(){clearInterval(A);k=null;e.stop(!0,!0).fadeOut(g.fadeTime)}function F(a){h=a.offsetX;i=a.offsetY;h||(h=a.pageX-k.offset().left);i||(i=a.pageY-k.offset().top);r(h,i)}function r(a,b){a/=t;b/=u;1<a?a=1:0>a&&(a=0);1<b?b=1:0>b&&(b=0);l||(l=f.width());m||(m=f.height());var d=l*-a+0.5*o,c=m*-b+0.5*p;0<d?d=0:d<
o-l&&(d=o-l);0<c?c=0:c<p-m&&(c=p-m);v=d;w=c}function D(){var a=f.position(),b=a.left,a=a.top;f.css({left:b+(v-b)*g.easing+"px",top:a+(w-a)*g.easing+"px"})}var g,n="bigImagePath",x=!1,j,e,q,f,k,A,z={},v,w,s,o,p,t,u,l,m,h,i;c.fn.zoomView=function(a){g=c.extend(!0,{easing:0.4,margin:20,fadeTime:200,bigImagePostFix:"-big",viewParent:"body"},a);B();return c(this).each(function(){var a=c(this),d=a.attr("src");a.data(n,d.replace(/^(.*)\.([a-zA-Z0-9]+)$/,"$1"+g.bigImagePostFix+".$2"));a.bind("mouseenter",
C);a.bind("mouseleave",E);a.bind("mousemove",F)})}})(jQuery);

/* SimpleLib Plugin */
SimpleLib&&SimpleLib.extend("zoomView",{settings:{cssPath:SimpleLib.jsDir+"plugins/zoomView/zoomView.css",selector:".zoomView"},init:function(){SimpleLib.zoomView.settings.cssPath&&SimpleLib.loadCSS(SimpleLib.zoomView.settings.cssPath);$(function(){$(SimpleLib.zoomView.settings.selector).zoomView(SimpleLib.zoomView.settings)})}});