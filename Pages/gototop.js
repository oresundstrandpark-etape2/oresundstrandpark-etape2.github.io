/* Scroll function */
$(function() {
	$(document).on('scroll', function()
	{
	    if (typeof gotoTop !== "undefined")
	    {
  		    if($(window).scrollTop() > 450) 
		    {
			    $(gotoTop).fadeIn();
    		}
	    	else
		    {
			    $(gotoTop).fadeOut();
		    }
		}
	});
	
    if (typeof gotoTop !== "undefined")
    {
    	if ($(gotoTop).length)
	    {
		    $(gotoTop).on('click', scrollToTop);
	    }
	}
});
function scrollToTop() 
{
	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
    $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}

// Scroll to section
$(function () {
$(".sidebar > li > a").click(function(e) 
{
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    
    // Scroll
    var id = $(this).attr("id");
    var y = $("." + id).offset().top;
    
    y = y - 75;
    
    $('html,body').animate({scrollTop: y},700);
});
});

// DropDown menu
var menuopen = false;
$(function () {
$('.js--nav-icon').click(function(e)
{
    var nav = $('.js--main-nav');
    var icon = $('.js--nav-icon i');
    var navli = $('.js--main-nav li.menuitem');
    navli.css("margin-top","10px");
    
    nav.slideToggle(200);
    
    if (icon.hasClass("ion-navicon-round")) 
    {
        icon.addClass("ion-close-round");
        icon.removeClass("ion-navicon-round");
        menuopen = true;
    }
    else
    {
        icon.addClass("ion-navicon-round");
        icon.removeClass("ion-close-round");
        menuopen = false;
    }
});
});

// Listen for orientation changes
window.addEventListener("orientationchange", function() {
    var navli = $('.js--main-nav li.menuitem');
    navli.css("margin-top", "10px");
    orientchange = 1;
}, false);

var maxwin = 960;
var prevwidth = 0, prevheight = 0, orientchange = 0;
window.onresize = function() {
    var nav = $('.js--main-nav');
    var icon = $('.js--nav-icon i');
    var navli = $('.js--main-nav li.menuitem');
    
    var width = window.innerWidth;
    var height = window.innerHeight;
    
    if (prevwidth != 0)
    {
        if (width < maxwin && menuopen)
        {
            nav.stop().slideUp(0); 
            if (icon.hasClass("ion-close-round")) {
                icon.addClass("ion-navicon-round");
                icon.removeClass("ion-close-round");
            }
            menuopen = false;
        }
        if (width > maxwin && !menuopen)
        {
            nav.stop().slideDown(0); 
            menuopen = true;
        }
        
        if (width > maxwin) {
            if (icon.hasClass("ion-close-round")) {
                icon.addClass("ion-navicon-round");
                icon.removeClass("ion-close-round");
            }
            navli.css("margin-top", "-5px");
        }
        console.log(width+" "+prevwidth);
    }
    prevwidth = width;
    prevheight = height;
    orientchange = 0;
}

$(document).ready(function()
{
    // Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-80327728-1', 'auto');
          ga('send', 'pageview');
});
