
if (window.ActiveXObject) {
	var ua = navigator.userAgent.toLowerCase();
	var ie=ua.match(/msie ([\d.]+)/)[1]

	if(ie==6.0){
		alert("您的浏览器版本过低，在本系统中不能达到良好的视觉效果，建议升级到IE7以上，推荐使用Chrome、Firefox浏览器，或最新版本IE浏览器。或者您可以访问旧版网站。");
		window.close();
	}
}
var h = 0;
var w = 0;
$(document).ready(function() {
	$("#slideshow").css("overflow", "hidden");
	
	$("ul#slides").cycle({
		fx: 'fade',
		pause: 1,
		prev: '#prev',
		next: '#next',
		pager: '#pager'
	});
	
	$("#slideshow").hover(function() {
    	$("ul#nav").fadeIn();
  	},
  		function() {
    	$("ul#nav").fadeOut();
  	});
	$("div#eventslides").cycle({
		fx: 'scrollUp',
		timeout: 7000,
		pause: 1
	});
	h = getTotalHeight();
	w = getTotalWidth();
	adjustHeight();
	adjustWidth();
	formalizeTopMenu();
	formalizeExpressMenu();
	fixEventListPage();
	listenSearchEnter();
});

$(window).resize(function(){
    h = getTotalHeight();
    adjustHeight();
	w = getTotalWidth();
	adjustWidth();
});
function formalizeTopMenu(){
	if($("ul#index-top-menu")){
		var ul = $("ul#jsddm");
		$("ul#index-top-menu").children("li").each(function(i, val){
			var li=$('<li></li>');
			var cls = '';
			$(val).children("a").each(function(m, aval){
				cls = $(aval).attr('class');
				$(aval).attr('id',cls);
				$(aval).attr('class','top-link');
				li.append($(aval));
			});
			ul.append(li);
			if($("div#d_"+cls+"-div")){
				$(val).children("ul").children("li").each(function(j, subval){
					$("div#d_"+cls+"-div").append($(subval).children("a"));
				});
			}
		})
		$("ul#index-top-menu").remove();
	}
}
function formalizeExpressMenu(){
	if($("ul#express-menu")){
		var div = $("div#quick-links");
		$("ul#express-menu").children("li").each(function(i, val){
			var dl=$('<dl class="dl-horizontal"></dl>');
			var dt=$('<dt></dt>');
			var dd=$('<dd></dd>');
			dt.append($(val).children("a"));
			$(val).children("ul").children("li").each(function(j, subval){
				dd.append($(subval).children("a"));
			});
			dl.append(dt,dd);
			div.append(dl);
		})
		$("ul#express-menu").remove();
	}
}
function fixEventListPage(){
	if($("div#jevents_header")){
		$("div#jevents_header").remove();
	}
	if($("p.event-time") ){
		$("p.event-time").each(function(i, val){
			if( $(val).text() == ' - ')
				$(val).remove();
		});
	}
	// if($("div#jevents_body")){
	// 	$("div#jevents_body").attr("id","jevents_body_fix")
	// }
}
function adjustHeight(){
	if(h<780 && $("body").hasClass("hwindow")){
		$("body").removeClass("hwindow");
		if($("#slides")){
			$("#slides").css("height","292px");
		}
	}else if(h>=780 && !$("body").hasClass("hwindow")){
		$("body").addClass("hwindow");
		if($("#slides")){
			$("#slides").css("height","322px");
		}
	}else{}
}
function adjustWidth(){
	if(w<1200){
		if($("body").hasClass("wwindow")){
			$("body").removeClass("wwindow");
		}
		if(!$("body").hasClass("nwindow")){
			$("body").addClass("nwindow");
		}
	}else if(w>=1200){
		if($("body").hasClass("nwindow")){
			$("body").removeClass("nwindow");
		}
		if(!$("body").hasClass("wwindow")){
			$("body").addClass("wwindow");
		}
	}else{}
}
function getTotalHeight(){ 
	if($.browser.msie){ 
		return document.compatMode == "CSS1Compat"? document.documentElement.clientHeight : document.body.clientHeight; 
	} 
	else { 
		return self.innerHeight; 
	} 
} 
function getTotalWidth (){ 
	if($.browser.msie){ 
		return document.compatMode == "CSS1Compat"? document.documentElement.clientWidth : document.body.clientWidth; 
	} 
	else{ 
		return self.innerWidth; 
	} 
} 
function playSlider(vobj){
	$("#"+vobj).css("display","block");
	$("#dpart").animate({"margin-left":"-255px"},"fast","linear");
}
function playSliderBack(vobj){
	$("#dpart").animate({"margin-left":"0px"},"fast","linear",function(){
		$("#"+vobj).css("display","none");
	});
	
}
function listenSearchEnter(){
	$('input#search-input').keydown(function(e){
		if(e.keyCode==13){
		    doSearch();
		}
	});

}
function doSearch(){
	var s = mytrim($("input#search-input").val());
	if(s!=''){
		window.location.href = $("input#search-url").val() + "?searchword="+s+"&ordering=newest&searchphrase=all";
	}else{
		window.location.href = $("input#search-url").val();
	}
}
function  mytrim(str){
    for(var  i  =  0  ;  i<str.length  &&  str.charAt(i)==" "  ;  i++  )  ;
    for(var  j  =str.length;  j>0  &&  str.charAt(j-1)==" "  ;  j--)  ;
    if(i>j)  return  "";  
    return  str.substring(i,j);  
}
