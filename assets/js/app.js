if(typeof jQuery !== 'undefined'){
    $(window).scroll(function(){
        var topSize = $(this).scrollTop();
        
        if (topSize > 400) {
            $(".social-icon").addClass("scroll");
        }
            else if (topSize < 400) {
            $(".social-icon").removeClass("scroll");
        }
    });
}