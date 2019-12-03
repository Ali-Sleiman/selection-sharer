/* @author: Xavier Damman (@xdamman) - http://github.com/xdamman/selection-sharer - @license: MIT */!function(a){function b(a,b){b&&b.length<0||b.forEach(function(b){a.find(b.query).click(b.action)})}function c(a){return a.replace(/<p[^>]*>/gi,"\n").replace(/<\/p>| {2}/gi,"").trim()}function d(){var b=a('meta[property="og:url"]').attr("content")||a('meta[property="og:url"]').attr("value"),c=window.location.href;return c!==b?c:b}var e=function(e){var f=this;e=e||{},"string"==typeof e&&(e={elements:e}),this.sel=null,this.textSelection="",this.htmlSelection="",this.optionalShare=["telegram"],this.url2share=d(),this.appId=a('meta[property="fb:app_id"]').attr("content")||a('meta[property="fb:app_id"]').attr("value"),this.updateURL2Share=function(){this.url2share=d()},this.getSelectionText=function(a){var b="",c="";if(a=a||window.getSelection(),a.rangeCount){for(var d=document.createElement("div"),e=0,g=a.rangeCount;g>e;++e)d.appendChild(a.getRangeAt(e).cloneContents());c=d.textContent,b=d.innerHTML}return f.textSelection=c,f.htmlSelection=b||c,c},this.selectionDirection=function(a){var b=a||window.getSelection(),c=document.createRange();if(!b.anchorNode)return 0;c.setStart(b.anchorNode,b.anchorOffset),c.setEnd(b.focusNode,b.focusOffset);var d=c.collapsed?"backward":"forward";return c.detach(),d},this.showPopunder=function(){f.popunder=f.popunder||document.getElementById("selectionSharerPopunder");var a=window.getSelection(),b=f.getSelectionText(a);if(a.isCollapsed||b.length<10||!b.match(/ /))return f.hidePopunder();if(f.popunder.classList.contains("fixed"))return f.popunder.style.bottom=0,f.popunder.style.bottom;var c=a.getRangeAt(0),d=c.endContainer.parentNode;if(f.popunder.classList.contains("show")){if(Math.ceil(f.popunder.getBoundingClientRect().top)==Math.ceil(d.getBoundingClientRect().bottom))return;return f.hidePopunder(f.showPopunder)}if(d.nextElementSibling)f.pushSiblings(d);else{f.placeholder||(f.placeholder=document.createElement("div"),f.placeholder.className="selectionSharerPlaceholder");var e=window.getComputedStyle(d).marginBottom;f.placeholder.style.height=e,f.placeholder.style.marginBottom=-2*parseInt(e,10)+"px",d.parentNode.insertBefore(f.placeholder)}var g=window.pageYOffset+d.getBoundingClientRect().bottom;f.popunder.style.top=Math.ceil(g)+"px",setTimeout(function(){f.placeholder&&f.placeholder.classList.add("show"),f.popunder.classList.add("show")},0)},this.pushSiblings=function(a){for(;a=a.nextElementSibling;)a.classList.add("selectionSharer"),a.classList.add("moveDown")},this.hidePopunder=function(a){if(a=a||function(){},"fixed"==f.popunder)return f.popunder.style.bottom="-50px",a();f.popunder.classList.remove("show"),f.placeholder&&f.placeholder.classList.remove("show");for(var b,c=document.getElementsByClassName("moveDown");b=c[0];)b.classList.remove("moveDown");setTimeout(function(){f.placeholder&&document.body.insertBefore(f.placeholder),a()},600)},this.show=function(a){this.updateURL2Share(),setTimeout(function(){var b=window.getSelection(),c=f.getSelectionText(b);if(!b.isCollapsed&&c&&c.length>10&&c.match(/ /)){var d=b.getRangeAt(0),e=d.getBoundingClientRect().top-5,g=e+f.getPosition().y-f.$popover.height(),h=0;if(a)h=a.pageX;else{var i=b.anchorNode.parentNode;h+=i.offsetWidth/2;do h+=i.offsetLeft;while(i=i.offsetParent)}switch(f.selectionDirection(b)){case"forward":h-=f.$popover.width();break;case"backward":h+=f.$popover.width();break;default:return}f.$popover.removeClass("anim").css("top",g+10).css("left",h).show(),setTimeout(function(){f.$popover.addClass("anim").css("top",g)},0)}},10)},this.hide=function(){f.$popover.hide()},this.smart_truncate=function(a,b){if(!a||!a.length)return a;var c=a.length>b,d=c?a.substr(0,b-1):a;return d=c?d.substr(0,d.lastIndexOf(" ")):d,c?d+"...":d},this.getRelatedTwitterAccounts=function(){var b=[],c=a('meta[name="twitter:creator"]').attr("content")||a('meta[name="twitter:creator"]').attr("value");c&&b.push(c);for(var d=document.getElementsByTagName("a"),e=0,f=d.length;f>e;e++)if(d[e].attributes.href&&"string"==typeof d[e].attributes.href.value){var g=d[e].attributes.href.value.match(/^https?:\/\/twitter\.com\/([a-z0-9_]{1,20})/i);g&&g.length>1&&-1==["widgets","intent"].indexOf(g[1])&&b.push(g[1])}return b.length>0?b.join(","):""},this.shareTwitter=function(a){a.preventDefault();var b="“"+f.smart_truncate(f.textSelection.trim(),114)+"”",c="http://twitter.com/intent/tweet?text="+encodeURIComponent(b)+"&related="+f.getRelatedTwitterAccounts()+"&url="+encodeURIComponent(f.url2share);f.viaTwitterAccount&&b.length<114-f.viaTwitterAccount.length&&(c+="&via="+f.viaTwitterAccount);var d=640,e=440,g=screen.width/2-d/2,h=screen.height/2-e/2-100;return window.open(c,"share_twitter","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+d+", height="+e+", top="+h+", left="+g),f.hide(),!1},this.shareFacebook=function(a){a.preventDefault();var b=c(f.htmlSelection),d="https://www.facebook.com/dialog/feed?app_id="+f.appId+"&display=popup&caption="+encodeURIComponent(b)+"&link="+encodeURIComponent(f.url2share)+"&href="+encodeURIComponent(f.url2share)+"&redirect_uri="+encodeURIComponent(f.url2share),e=640,g=440,h=screen.width/2-e/2,i=screen.height/2-g/2-100;window.open(d,"share_facebook","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+e+", height="+g+", top="+i+", left="+h)},this.shareLinkedIn=function(a){a.preventDefault();var b=c(f.htmlSelection),d="https://www.linkedin.com/shareArticle?mini=true&url="+encodeURIComponent(f.url2share)+"&title="+encodeURIComponent(b),e=640,g=440,h=screen.width/2-e/2,i=screen.height/2-g/2-100;window.open(d,"share_linkedin","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+e+", height="+g+", top="+i+", left="+h)},this.shareTelegram=function(a){a.preventDefault();var b=c(f.htmlSelection),d="https://www.telegram.me/share/share/?url="+encodeURIComponent(f.url2share)+"&text="+encodeURIComponent(b),e=640,g=440,h=screen.width/2-e/2,i=screen.height/2-g/2-100;window.open(d,"share_telegram","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+e+", height="+g+", top="+i+", left="+h)},this.shareEmail=function(){var b=c(f.textSelection),d={};return d.subject=encodeURIComponent("Quote from "+document.title),d.body=encodeURIComponent("“"+b+"”")+"%0D%0A%0D%0AFrom: "+document.title+"%0D%0A"+window.location.href,a(this).attr("href","mailto:?subject="+d.subject+"&body="+d.body),f.hide(),!0},this.render=function(){var b=function(a){var b=a.charAt(0).toUpperCase()+a.substring(1);return'<li><a class="action '+a+'" href="" title="Share this selection on '+b+'" target="_blank">'+b+"</a></li>"},c={telegram:{icon:b("telegram"),query:"a.telegram",action:this.shareTelegram}},d=this.optionalShare.map(function(a){return c[a]}),e=d.reduce(function(a,b){return a.concat(b.icon).concat("\n")},""),g='    <ul>      <li><a class="action tweet" href="" title="Share this selection on Twitter" target="_blank">Tweet</a></li>      <li><a class="action facebook" href="" title="Share this selection on Facebook" target="_blank">Facebook</a></li>      <li><a class="action linkedin" href="" title="Share this selection on LinkedIn" target="_blank">LinkedIn</a></li>'+e+'      <li><a class="action email" href="" title="Share this selection by email" target="_blank"><svg width="20" height="20"><path stroke="%23FFF" stroke-width="6" d="m16,25h82v60H16zl37,37q4,3 8,0l37-37M16,85l30-30m22,0 30,30"/></svg></a></li>    </ul>  </div>',h='<div class="selectionSharer" id="selectionSharerPopover" style="position:absolute;">  <div id="selectionSharerPopover-inner">'+g+'  <div class="selectionSharerPopover-clip"><span class="selectionSharerPopover-arrow"></span></div></div>',i='<div id="selectionSharerPopunder" class="selectionSharer">  <div id="selectionSharerPopunder-inner">'+g+"  </div></div>";f.$popover=a(h),f.$popunder=a(i);var j=d.map(function(a){return{query:a.query,action:a.action}});f.attachHandlers([f.$popover,f.$popunder],[{query:"a.tweet",action:f.shareTwitter},{query:"a.facebook",action:f.shareFacebook},{query:"a.linkedin",action:f.shareLinkedIn},{query:"a.email",action:f.shareEmail}].concat(j)),a("body").append(f.$popover),a("body").append(f.$popunder),f.appId&&f.url2share&&a(".selectionSharer a.facebook").css("display","inline-block")},this.attachHandlers=function(a,c){a&&a.length<0||a.forEach(function(a){b(a,c)})},this.setElements=function(b){"string"==typeof b&&(b=a(b)),f.$elements=b instanceof a?b:a(b),f.$elements.mouseup(f.show.bind(this)).mousedown(f.hide).addClass("selectionShareable"),f.$elements.bind("touchstart",function(){f.isMobile=!0}),document.onselectionchange=f.selectionChanged},this.selectionChanged=function(a){f.isMobile&&(f.lastSelectionChanged&&clearTimeout(f.lastSelectionChanged),f.lastSelectionChanged=setTimeout(function(){f.showPopunder(a)},300))},this.getPosition=function(){var a=void 0!==window.pageXOffset,b="CSS1Compat"===(document.compatMode||""),c=a?window.pageXOffset:b?document.documentElement.scrollLeft:document.body.scrollLeft,d=a?window.pageYOffset:b?document.documentElement.scrollTop:document.body.scrollTop;return{x:c,y:d}},this.render(),e.elements&&this.setElements(e.elements)};a.fn.selectionSharer=function(){var a=arguments,b=new e.apply(null,a);return b.setElements(this),this},"function"==typeof define?define(function(){return e.load=function(a,b,c){var d=new e;d.setElements("p"),c()},e}):"object"==typeof module&&module.exports?module.exports=e:window.SelectionSharer=e}(jQuery);
