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
	var verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	var element = $('body');
	var offset = element.offset();
	var offsetTop = offset.top;
    $('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}
