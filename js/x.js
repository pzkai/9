/*
$(document).pngFix();ie6 png fix
$(this).lightBox();jq lightbox
$(this).fxFile(70);input type="file"
$(this).fxSlide(5, 300, 'v');slide can be vertical'v' or horizontal'h'
$(this).fxCss(target); clone target's css
$(this).mousewheel(function(e, delta){}); mousewheel event
$(this).bgiframe();
getUrlVars()["id"];
getAjaxVars(e)["me"];
--------jq effect
$(this).effect('blind');
blind bounce clip drop explode fade fold highlight pulsate scale shake slide transfer puff
--------jq easing 
$(this).animate({left:''}, 500, 'easeInQuad', callback);
easeInQuad	easeOutQuad	easeInOutQuad	easeInCubic	easeOutCubic	easeInOutCubic	easeInQuart	easeOutQuart	easeInOutQuart	easeInQuint	easeOutQuint	easeInOutQuint	easeInSine	easeOutSine	easeInOutSine	easeInExpo	easeOutExpo	easeInOutExpo	easeInCirc	easeOutCirc	easeInOutCirc	easeInElastic	easeOutElastic	easeInOutElastic	easeInBack	easeOutBack	easeInOutBack	easeInBounce	easeOutBounce	easeInOutBounce
--------share
anteaterAddBookmark("FaceBook");
anteaterAddBookmark("Twitter");
anteaterAddBookmark("Plurk");
--------outside event
clickoutside, dblclickoutside, focusoutside, bluroutside, mousemoveoutside, mousedownoutside, mouseupoutside, mouseoveroutside, mouseoutoutside, keydownoutside, keypressoutside, keyupoutside, changeoutside, selectoutside, submitoutside
--------own selector
$.extend($.expr[':'], {  
    over100pixels: function(a) {  
        return $(a).height() > 100;  
    }  
}); 
*/
var b;
var w;
$(document).ready(function(){
	if( $.browser.version == '6.0' && $.browser.msie ){ 
		$('#BG').bgiframe();
		$(document).pngFix();
	};
	b = $('#Box');
	b = id('Box');
	
	w = $('#Wrap');
	var nowLeft = 0;
	var intLeft = 0;
	var nowR = 31;
	var intR = 0;
	var moved;
	var rotated;
	var dot = $('#dot');
	var ty = 1000;
	


	

	//-webkit-transform:rotateX(31deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY(-3000px) translateX(500px);
	w.mousedown(function(e){
		intLeft = e.clientX;
		intR = e.clientY;
		//nowLeft = b.position().left;
		document.title = 'intLeft:'+intLeft + "// nowLeft:"+nowLeft;
		w.bind('mousemove', move);
		return false;
	});
	$(window).mouseup(function(){
		w.unbind('mousemove', move);
		nowLeft = moved;
		nowR = rotated;
	});
	function move(ee){
		moved = ee.clientX - intLeft+nowLeft;
		rotated = (ee.clientY-intR)+nowR;
		//b.css({left:moved+'px'});
		//b.style.webkitTransform  = 'rotateX('+rotated+'deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY(-3000px) translateX('+(500+moved)+'px)';
		//b.style.webkitTransform  = 'rotateX(31deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY('+(-3000+rotated)+'px) translateX('+(500+moved)+'px)';
		if($.browser.msie){
			b.style.MsTransform  = 'rotateX(31deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY('+(-ty+rotated)+'px) translateX('+(500+moved)+'px)';
		} else if($.browser.webkit){
			b.style.webkitTransform  = 'rotateX(31deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY('+(-ty+rotated)+'px) translateX('+(500+moved)+'px)';
		} else if($.browser.opera){
			b.style.OTransform  = 'rotateX(31deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY('+(-ty+rotated)+'px) translateX('+(500+moved)+'px)';
		} else if($.browser.mozilla){
			b.style.transform  = 'rotateX(31deg) rotateY(0deg) rotateZ(-40deg) translateZ(300px) translateY('+(-ty+rotated)+'px) translateX('+(500+moved)+'px)';
		}
		

	}

});

$(window).load(function(){

});


function id(d){
	return document.getElementById(d);
}
jQuery.fn.extend({
	fxSlide2: function (showAtOnce, animateSpeed, fxDirect, SORT){
		$(this).each(function(){
			if (!fxDirect) {
				alert('fxSlide error (showAtOnce『1,2,3』, animateSpeed『10,100,1000』, fxDirect『"h" or "v"』)');
			};
			var _this = $(this);
			var itemNum = $('.aItem > div', _this).length;
			
			var maxId = itemNum - showAtOnce;
			var itemWidth;
			var cId = 0;
			
			if(fxDirect == 'h'){
				itemWidth = $('.aItem > div', _this).outerWidth(true);
				$('.aItem', _this).css({width : itemWidth * itemWidth + 10 + "px"});
			} else if(fxDirect == 'v') {
				itemWidth = $('.aItem > div', _this).outerHeight(true);
				$('.aItem', _this).css({height : itemWidth * itemWidth + 10 + "px"});
			};
			var slideWidth = itemNum * itemWidth;
			
			if (itemNum <= showAtOnce){
				$('.aLeft > a', _this).remove();
				$('.aRight > a', _this).remove();
			} else {
				/*_this.mousewheel(function(e, delta){
					if(delta > 0){
						cId--;
					} else if (delta < 0){
						cId++;
					};
					sliding (cId);
					return false;
				});*/
			};
			$('.aLeft > a', _this).click(function () {
				cId --;
				sliding (cId);
				$(this).blur();
				return false;
			});
			$('.aRight > a', _this).click(function () {
				cId ++;
				sliding (cId);
				$(this).blur();
				return false;
			});
			function sliding (SID, NUM){
				if(cId >= maxId && maxId > 0) {
					$('.aRight > a', _this).hide();
					$('.aLeft > a', _this).show();
					cId = maxId;
				} else if(cId <= 0) {
					$('.aRight > a', _this).show();
					$('.aLeft > a', _this).hide();
					cId = 0;
				} else {
					$('.aRight > a, .aLeft > a', _this).show();
				};
				if (fxDirect == 'h') $('.aItem', _this).stop().animate( { marginLeft: - itemWidth * cId + "px" }, animateSpeed);
				if (fxDirect == 'v') $('.aItem', _this).stop().animate( { marginTop: - itemWidth * cId + "px" }, animateSpeed);
				if( NUM != 1){
					$('.aItem > div', _this).eq(cId).children('div').each(function(i){
						$(this).css({position:'relative', top:'150px', left:'150px', opacity:0}).delay(i*50).animate({left:'0px', top:'0px', opacity:1}, 500, function(){$(this).css({position:'static'});});
					});
				}
				$('#indexPage > a').removeClass().eq(cId).addClass('on');
				if( SORT == 'campwork'){
					$('.aNum i').text( (cId*10 + 1) + ' - ' + ((cId+1)*10) );
				};
				
			};
			sliding(cId, 1);
			$('#indexPage > a').click(function(){
				cId = $('#indexPage > a').index(this);
				sliding();
				return false;
			});
		});
	}, 	fxSlide3: function (showAtOnce, animateSpeed, fxDirect){
		$(this).each(function(){
			if (!fxDirect) {
				alert('fxSlide error (showAtOnce『1,2,3』, animateSpeed『10,100,1000』, fxDirect『"h" or "v"』)');
			};
			var _this = $(this);
			var itemNum = $('.aItem > div', _this).length;
			
			var maxId = itemNum - showAtOnce;
			var itemWidth;
			var cId = 0;
			
			if(fxDirect == 'h'){
				itemWidth = $('.aItem > div', _this).outerWidth(true);
				$('.aItem', _this).css({width : itemWidth * itemWidth + 10 + "px"});
			} else if(fxDirect == 'v') {
				itemWidth = $('.aItem > div', _this).outerHeight(true);
				$('.aItem', _this).css({height : itemWidth * itemWidth + 10 + "px"});
			};
			var slideWidth = itemNum * itemWidth;
			
			if (itemNum <= showAtOnce){
				$('.aLeft > a', _this).remove();
				$('.aRight > a', _this).remove();
			} else {
				/*_this.mousewheel(function(e, delta){
					if(delta > 0){
						cId--;
					} else if (delta < 0){
						cId++;
					};
					sliding (cId);
					return false;
				});*/
			};
			$('.aLeft > a', _this).click(function () {
				cId --;
				sliding (cId);
				$(this).blur();
				return false;
			});
			$('.aRight > a', _this).click(function () {
				cId ++;
				sliding (cId);
				$(this).blur();
				return false;
			});
			function sliding (SID, NUM){
				if(cId >= maxId && maxId > 0) {
					$('.aRight > a', _this).hide();
					$('.aLeft > a', _this).show();
					cId = maxId;
				} else if(cId <= 0) {
					$('.aRight > a', _this).show();
					$('.aLeft > a', _this).hide();
					cId = 0;
				} else {
					$('.aRight > a, .aLeft > a', _this).show();
				};
				if (fxDirect == 'h') $('.aItem', _this).stop().animate( { marginLeft: - itemWidth * cId + "px" }, animateSpeed);
				if (fxDirect == 'v') $('.aItem', _this).stop().animate( { marginTop: - itemWidth * cId + "px" }, animateSpeed);
				$('#indexPage > a').removeClass().eq(cId).addClass('on');
			};
			sliding(cId, 1);
			$('#indexPage > a').click(function(){
				cId = $('#indexPage > a').index(this);
				sliding();
				return false;
			});
		});
	}, delight : function() {
		return this.each(function(){
			if($.browser.mozilla){
				$(this).css('MozUserSelect','none');
			}else if($.browser.msie){
				$(this).bind('selectstart',function(){return false;});
			}else{
				$(this).mousedown(function(){return false;});
			}
		});
	}, adllClass2 : function(STR){
		_tagName = this.tagName.toString().toLowerCase();
		$(this).parent().children(_tagName).removeClass(STR);
		$(this).addClass(STR);
		_tagName = null;
		return this;
	}, fxScroll: function(){
		$(this).each(function(){
			var _this = this;
			var fxSin2 = $(_this).children('div.fxSin2');	
			var selfHeight = fxSin2.children('div.fxSinBox').outerHeight(true);
			if( fxSin2.height() < selfHeight ){
				var scrollExpand = (($(document).width() - 880)*0.1 < 30)?30:($(document).width() - 880)*0.1;
				var scrollPX = Math.round($(document).height()/3);
				var difAmount;
				var fxSscroll = $(_this).children('div.fxSscroll').show();
				difAmount = selfHeight - fxSin2.outerHeight(true);
				var fxBoth = $('.fxSscroll, .fxSbarBG', fxSscroll);
				var fxSbar= $('.fxSbar', fxSscroll);
				var fxSinBox= fxSin2.children('div.fxSinBox');
				//fxBoth.css({height: $(_this).height() - 60 + 'px'});
				//scrollSize = scrollGrid - Math.floor(difAmount/scrollGrid);
				/*if( scrollSize < scrollMinSize){
					fxSbar.css({height:scrollMinSize+'%'});
				} else {
					fxSbar.css({height:scrollSize+'%'});
				};*/
				var barCenter = fxSbar.height() / 2;
				var barCenter2 = fxSscroll.height() - fxSbar.height();
				var topPoint = fxSscroll.offset().top + barCenter;
				var endPoint = fxSscroll.offset().top + fxSscroll.height() - (fxSbar.height()/2);
				var totalCanMove;
				//alert('barCenter:'+barCenter +'\nbarCenter2:' + barCenter2+ '\ntopPoint:' + topPoint + '\nendPoint:' + endPoint);
				var topClicked;
				var nowPoint = 0;
				var boxTop;
				fxSscroll.hover(function(){
					$(this)/*.bind('mousemove', fxScrollMoving)*/.css({width:scrollExpand+'px'}).children('div.fxSbarBG').stop().animate({opacity:0.7}, 500);
					//fxSbar.css({backgroundColor:'#0693f0'});
				}, function(){
					$(this)/*.unbind('mousemove', fxScrollMoving)*/.css({width:''}).children('div.fxSbarBG').stop().animate({opacity:0}, 500);
					//fxSbar.css({backgroundColor:''});
				})
				fxSinBox.resize(function(){
					selfHeight = $(this).outerHeight(true);
					difAmount = selfHeight - fxSin2.outerHeight(true);
				});
				$(window).resize(function(){
					difAmount = selfHeight - fxSin2.outerHeight(true);
					//fxBoth.css({height: $(_this).height() - 60 + 'px'});
					barCenter2 = fxSscroll.height() - fxSbar.height();
					topPoint = fxSscroll.offset().top + barCenter;
					endPoint = fxSscroll.offset().top + fxSscroll.height() - (fxSbar.height()/2);
				});
				fxSin2.resize(function(){
					difAmount = selfHeight - $(this).height();
				});
				$('.fxSbar, .fxSbarBG', fxSscroll).mousedown(function(e){
					if( e.pageY < topPoint){
						nowPoint = 0;
					} else if(e.pageY > endPoint){
						nowPoint = barCenter2;
					} else{
						nowPoint = e.pageY - topPoint;
					};
					fxSbar.css({backgroundColor:'#0693f0'});
					actingEv();
					$('body').bind('mousemove', fxScrollMoving);
					return false;
				});
				$('body').mouseup(function(){
					fxSbar.css({backgroundColor:''});
					$(this).unbind('mousemove', fxScrollMoving);
				});
				$('.fxSarrowUp a', fxSscroll).click(function(){
					nowPoint -= scrollPX;
					if(nowPoint < 0){
						nowPoint = 0;
					} else if( nowPoint > barCenter2 ){
						nowPoint = barCenter2;
					}
					actingEv();
				});
				$('.fxSarrowDown a', fxSscroll).click(function(){
					nowPoint += scrollPX;
					if(nowPoint < 0){
						nowPoint = 0;
					} else if( nowPoint > barCenter2 ){
						nowPoint = barCenter2;
					}
					actingEv();
				});
				$(_this).mousewheel(function(e, delta){
					if(delta > 0){
						actingEv2(1);
					} else if( delta < 0){
						actingEv2(0);
					};
				});
				function fxScrollMoving (e){
					if( e.pageY < topPoint){
						nowPoint = 0;
					} else if(e.pageY > endPoint){
						nowPoint = barCenter2;
					} else{
						nowPoint = e.pageY - topPoint;
					};
					actingEv();
					return false;
				};
				function actingEv (){
					fxSbar.css({top:nowPoint + 'px'});
					fxSinBox.css({top: -(difAmount * nowPoint / barCenter2 ) + 'px'});
				};
				function actingEv2(NUM){
					if( NUM == 0){
						NUM = fxSinBox.position().top - scrollPX;
					} else {
						NUM = fxSinBox.position().top + scrollPX;
					}
					if(NUM < -difAmount){
						NUM = -difAmount;
					} else if(NUM > 0){
						NUM = 0;
					}
					nowPoint = (-NUM)*barCenter2/difAmount;
					//document.title = nowPoint;
					fxSinBox.css({top: NUM + 'px'});
					fxSbar.css({top:nowPoint + 'px'});
					//document.title = nowPoint+'//'+fxSinBox.position().top;
					//fxSbar.css({top:nowPoint + 'px'});
					//fxSinBox.css({top: -(difAmount * nowPoint / barCenter2 ) + 'px'});
				};
			};
		});
		return this;
	},fxImgSlide : function(optionObj){
		var animateTypes = 11;
		$(this).each(function(){
			if( optionObj.style >= 0 && optionObj.style <= animateTypes){
			} else {
				alert('optionObj.style n/a');
				return;
			}
			var chopX = optionObj.chopX || 5;
			var chopY = optionObj.chopY || 5;
			var chopW;
			var chopH;
			var chopLeft;
			var chopTop;
			var choper;
			var animateDOM;
			
			var animateAmount = 100;
			var animateDelay = optionObj.delay || 100;
			var animateSpeed = optionObj.speed || 500;
			var arr=new Array();
			var newAr=new Array();
			var newArLen = chopX+chopY -1;
			var indexNUM = 0;
			var thisZindex = 2;
			var wheel = optionObj.wheel | false;
			choper = $('div.aItem > div', this);
			chopW = Math.floor( choper.width() / chopX);
			chopH = Math.floor( choper.height() / chopY);
			choper.each(function(i){
				if(i==0){
					$(this).css({zIndex:thisZindex});
				}
				var _this = this;
				if( optionObj.style != 11){
					for(var i=0;i<chopX;i++){
						chopLeft = i*chopW;
						$(_this).append('<div style="background:url('+$(_this).children('img').attr('src')+') -'+ chopLeft +'px 0;left:'+chopLeft+'px;top:0;width:'+chopW+'px;height:100%;"></div>');
					}
					for(var i=0;i<chopY;i++){
						chopTop = i*chopH;
						$(_this).append('<span style="background:url('+$(_this).children('img').attr('src')+') 0 -'+ chopTop +'px;left:0;top:'+chopTop+'px;width:100%;height:'+chopH+'px;"></span>');
					}
				} else {
					for(var i=0;i<chopY;i++){
						for(var j=0;j<chopX;j++){
							chopLeft = j*chopW;
							chopTop = i*chopH;
							$(_this).append('<p style="background:url('+$(_this).children('img').attr('src')+') -'+ chopLeft +'px -'+chopTop+'px;width:'+chopW+'px;height:'+chopH+'px;left:'+chopLeft+'px;top:'+chopTop+'px;"></p>');
						}
					}
				}
				$('img',_this).hide();
			});
			if( optionObj.style == 11){
				for(var i = 0; i < newArLen; i++){
					for(var j = Math.min(chopY,i+1)-1; j >= Math.max(0,i-chopX+1); j--){
						arr.push((j*chopX)+i-j);
					}  
				}
				for(var i = 0;i <newArLen;i++){
					if (i<chopY){
						newAr.push(arr.splice(0, (i+1)) );
					} else if(i> newArLen-chopX){
						newAr.push(arr.splice(0, (chopY - (i-(newArLen-chopY)) )));
					} else {
						newAr.push(arr.splice(0, chopY) );
					}
				}
				arr = null;
			}
			chopY = chopX = chopLeft = chopTop = chopW = chopH = null;
			var thisA = $('.aPage a', this);
			thisA.click(function(){
				indexNUM = $(this).index();
				pageTab();
			});
			$('.aLeft a', this).click(function(){
				indexNUM--;
				pageTab();
			});
			$('.aRight a', this).click(function(){
				indexNUM++;
				pageTab();
			});
			if(wheel){
				$(this).mousewheel(function(e, delta){
					if(delta > 0){
						indexNUM--;	
					} else if(delta < 0){
						indexNUM++;
					}
					pageTab();
				});
			}
			function pageTab(){
				if(indexNUM < 0){
					indexNUM = choper.length -1;
				} if(indexNUM > choper.length -1 ){
					indexNUM = 0;
				}
				thisZindex++;
				thisA.removeClass('ON').eq(indexNUM).addClass('ON');
				animateDOM = choper.eq(indexNUM).css({zIndex:thisZindex});
				animateDOM.children('div,span, p').css({opacity:0, fontSize:'12px'});
				switch(optionObj.style){
					case 0:
						animateDOM.children('div,span').each(function(i){
							if( i  < chopX ){
								$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:0.3}, animateSpeed);
								});
							} else {
								$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1}, animateSpeed);
								});
							}
						});
						break;
					case 1:
						animateDOM.children('div').each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1}, animateSpeed);
							});
						});
						animateDOM.children('span').each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1}, animateSpeed);
							});
						});
						break;
					case 2:
						animateDOM.children('span').css({opacity:0}).each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1}, animateSpeed);
							});
						});
						break;
					case 3:
						animateDOM.children('div').css({opacity:0}).each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1}, animateSpeed);
							});
						});
						break;
					case 4:
						animateDOM.children('img').css({opacity:0.2, display:'block'});
						animateDOM.children('span').each(function(i){
							if(i%2 == 0){
								$(this).css({left:'-'+animateAmount+'px'}).animate({opacity:1, left:'0px'}, animateSpeed);
							} else {
								$(this).css({left:animateAmount+'px'}).animate({opacity:1, left:'0px'}, animateSpeed);
							}
						});
						animateDOM.children('div').each(function(i){
							if( i%2 == 0){
								$(this).css({top:'-'+animateAmount+'px'}).animate({opacity:1, top:'0px'}, animateSpeed);
							} else {
								$(this).css({top:animateAmount+'px'}).animate({opacity:1, top:'0px'}, animateSpeed);
							}
						});
						
						break;
					case 5:
						animateDOM.children('span').css({left:animateAmount+'px'}).each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1, left:'0px'}, animateSpeed);
							});
						});
						break;
					case 6:
						animateDOM.children('div').css({top:-animateAmount+'px'}).each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1, top:'0px'}, animateSpeed);
							});
						});
						break;
					case 7:
						animateDOM.children('span').each(function(i){
							if(i%2 == 0){
								$(this).css({left:'-'+animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, left:'0px'}, animateSpeed);
								});
							} else {
								$(this).css({left:animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, left:'0px'}, animateSpeed);
								});
							}
							
						});
						break;
					case 8:
						animateDOM.children('div').each(function(i){
							if( i%2 == 0){
								$(this).css({top:'-'+animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, top:'0px'}, animateSpeed);
								});
							} else {
								$(this).css({top:animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, top:'0px'}, animateSpeed);
								});
							}
						});
						break;
					case 9:
						animateDOM.children('span').each(function(i){
							if(i%2 == 0){
								$(this).css({left:'-'+animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, left:'0px'}, animateSpeed);
								});
							} else {
								$(this).css({left:animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, left:'0px'}, animateSpeed);
								});
							}
							
						});
						animateDOM.children('div').each(function(i){
							if( i%2 == 0){
								$(this).css({top:'-'+animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, top:'0px'}, animateSpeed);
								});
							} else {
								$(this).css({top:animateAmount+'px'}).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1, top:'0px'}, animateSpeed);
								});
							}
						});
						break;
					case 10:
						animateDOM.children('span').css({left:'-'+animateAmount+'px'}).each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1, left:'0px'}, animateSpeed);
							});
						});
						animateDOM.children('div').css({top:animateAmount+'px'}).each(function(i){
							$(this).animate({fontSize:'20px'}, i*animateDelay, function(){
								$(this).animate({opacity:1, top:'0px'}, animateSpeed);
							});
						});
						break;
					case 11:
						for(var i in newAr){
							for( var j in newAr[i]){
								animateDOM.children('p').eq(newAr[i][j]).animate({fontSize:'20px'}, i*animateDelay, function(){
									$(this).animate({opacity:1}, animateSpeed);
								});
							};
						};
						break;
				}
			}
		});
		return this;
	}
});

function fxCirSlide(DOM) {
	var _this = $(DOM);
	var _thisAR = $('.htmlArray', _this);
    var maxDivision = $('.tvcfCenter > div', _this).length;
	var cHigher = 100;//current target higher X axis
	var smallCwidth = 200;
	var bigCwidth = 300;
    var radiusX = 200;
    var radiusY = 80;
    var cPI = Math.PI * 2 / 4;
    var xPI = Math.PI * 2 / maxDivision;
    var dId = 0;
	var cArray = new Array();
    $('.tvcfCenter > div', _this).each(function(i) {
        var seta = xPI * i + cPI;
        var tY = Math.floor((Math.sin(seta)) * radiusY);
        var tX = Math.floor((Math.cos(seta)) * radiusX);
        var opa = Math.floor((tY + (radiusY + (radiusY*0.1))) / (radiusY*2) * 1000) / 1000;
		var cObj;
        if (i != 0) {
			cObj = {
				ty: tY,
				tx: tX,
				wid: smallCwidth,
				zin:Math.floor(tY),
				opa:opa,
				ord:i
			};/*
            $('<b ty="' + tY + '" tx="' + tX + '" wid="' + smallCwidth + '" zin="' + Math.floor(tY) + '" opa="' + opa + '"></b>').appendTo(_thisAR);*/
            $(this).css({ zIndex: Math.floor(tY), top: tY + 'px', left: tX + 'px' });
            $('img', this).css({ width: smallCwidth + 'px' });
            $('a', this).css({ left: -(smallCwidth/ 2) + 'px', opacity: opa });
        } else {
			cObj = {
				ty: tY-cHigher,
				tx: tX,
				wid: bigCwidth,
				zin:Math.floor(tY),
				opa:opa,
				ord:i
			};/*
            $('<b ty="' + (tY - 100) + '" tx="' + tX + '" wid="' + bigCwidth + '" zin="' + Math.floor(tY) + '" opa="' + opa + '"></b>').appendTo(_thisAR);**/
            //$(this).css({zIndex:Math.floor(tY), top:tY - 100 +'px', left:tX+'px', width:'222px'});
            $(this).css({ zIndex: Math.floor(tY), top: tY - 100 + 'px', left: tX + 'px' });
            $('img', this).css({ width: bigCwidth + 'px' });
            $('a', this).css({ width: -(bigCwidth/2) + '0px', opacity: opa });
        };
		cArray.push(cObj);
    });
	$('.aNum i', _this).text( cArray[0].ord + 1 + ' / '+ maxDivision);
    $('.aLeft', _this).click(function() {
        //$('.htmlArray b:last-child').prependTo(_thisAR);
		cArray.unshift( cArray.pop() );
        run3D();
        $(this).blur();
        return false;
    });
    $('.aRight', _this).click(function() {
        //$('.htmlArray b:first-child').appendTo(_thisAR);
		cArray.push( cArray.shift() );
        run3D();
        $(this).blur();
        return false;
    });
    $(_this).mousewheel(function(e, delta) {
        if (delta > 0) {
            //$('b:last-child', _thisAR).prependTo(_thisAR);
			cArray.unshift( cArray.pop() );
        } else {
            //$('b:first-child', _thisAR).appendTo(_thisAR);
			cArray.push( cArray.shift() );
        };
        run3D();
        return false;
    });
    function run3D() {
        $('.tvcfCenter > div', _this).each(function(j) {/*
            $(this).stop().animate({
                top: $('.htmlArray b').eq(j).attr('ty') + 'px',
                left: $('.htmlArray b').eq(j).attr('tx') + 'px'
            }, 300).css({ zIndex: $('b', _thisAR).eq(j).attr('zin') });
            $('img', this).stop().animate({ width: $('b', _thisAR).eq(j).attr('wid') + 'px' }, 200);
            $('a', this).stop().animate({ left: -($('b', _thisAR).eq(j).attr('wid') / 2) + 'px', opacity: $('b', _thisAR).eq(j).attr('opa') }, 200);*/
            $(this).stop().animate({
                top: cArray[j].ty + 'px',
                left: cArray[j].tx + 'px'
            }, 300).css({ zIndex: cArray[j].zin });
            $('img', this).stop().animate({ width: cArray[j].wid + 'px' }, 200);
            $('a', this).stop().animate({ left: -( cArray[j].wid / 2) + 'px', opacity: cArray[j].opa }, 200);
        });
		$('.aNum i', _this).text( cArray[0].ord + 1 + ' / '+ maxDivision);
    };
	
};

var WEB_SITE_HREF="";
var WEB_SITE_TITLE="";
var FAVORITES="Favorites";
var FACEBOOK="FaceBook";
var GOOGLE="Google";
var PLURK="Plurk";
var SINA="Sina";
var TWITTER="Twitter";
var QQ="QQ";
var HAPPY="Happy";
var SO="So";
var REN = "Ren";
var ICON_IMAGE_PATH="images/anteaterBookmark/";
var FILE_NAME_EXTENSION=".png";
var bookmarkList=[FAVORITES,SINA,QQ,HAPPY,SO,REN,FACEBOOK,GOOGLE,PLURK,TWITTER];
function getBookmarkList(){return bookmarkList;}
function getBookmarkListIcon(){var _array=bookmarkList.concat();for(var i=0;i<_array.length;i++){_array[i]=ICON_IMAGE_PATH+_array[i]+FILE_NAME_EXTENSION;};return _array;};
function anteaterAddBookmark(pType,DOM){
	var _locationHref=(WEB_SITE_HREF=="")?window.location.href:WEB_SITE_HREF;
	_locationHref=encodeURIComponent(_locationHref);var _title=(WEB_SITE_TITLE=="")?document.title:WEB_SITE_TITLE;
	_title=encodeURIComponent(_title);var _href;
	switch(pType){
	case FAVORITES:
		anteaterAddFavorites();
		return;
		break;
	case SINA:
		_href="http://v.t.sina.com.cn/share/share.php?url="+_locationHref+"&title="+_title;
		break;
	case QQ:
		_href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+_locationHref+"&title="+_title;
		break;
	case HAPPY:
		_href="http://www.kaixin001.com/repaste/share.php??rurl="+_locationHref+"&rtitle="+_title;
		break;
	case SO:
		_href="http://t.sohu.com/third/post.jsp?url="+_locationHref+"&title="+_title;
		break;
	case REN:
		_href = "http://share.renren.com/share/buttonshare.do?link="+_locationHref+"&title="+_title;
		break;
		
	case FACEBOOK:
		_href="http://www.facebook.com/sharer.php?u="+_locationHref+"&title="+_title;
		break;
	case GOOGLE:
		_href="http://www.google.com/bookmarks/mark?op=add&bkmk="+_locationHref+"&title="+_title;
		break;
	case PLURK:
		_href="http://www.plurk.com/?qualifier=shares&status=".concat(_locationHref).concat(' ').concat('(').concat(_title).concat(')');
		break;
	case TWITTER:
		_href="http://twitter.com/home/?status="+_title+" "+_locationHref;
		break;
	};
	window.open(_href,"_blank");return false;
};
function anteaterAddFavorites(){var _title=(WEB_SITE_TITLE=="")?document.title:WEB_SITE_TITLE;var _locationHref=(WEB_SITE_HREF=="")?window.location.href:WEB_SITE_HREF;if(window.sidebar&&window.sidebar.addPanel){window.sidebar.addPanel(_title,_locationHref,'');}else if(window.external){window.external.AddFavorite(_locationHref,_title);}else if(document.layers){window.alert('Please click OK then press Ctrl+D to create a bookmark');}else{window.alert('Please use your browsers\' bookmarking facility to create a bookmark');}};
function echo(o){var s = "";for (var a in o) {if( o[a] instanceof Object ){s += a + " :" + echo( o[a] ) + '\n';}else{s += a + " = " + o[a] + '\n';}	}return s;}