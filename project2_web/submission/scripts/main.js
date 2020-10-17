	$(document).ready(function () {		
		$('.nav-icon').on('click', toggleNav);
		$('#cancel').on('click', toggleNav);
		

	});
	
	    /*$(window).scroll(function() {    
        
		var header = $("#navWrapper");
		var scroll = $(window).scrollTop();
		var winHeight = $(window).height();
    
        if (scroll >= (winHeight - 200)) {
            header.addClass('navShadow');
        } else {
            header.removeClass('navShadow');
        }
    });*/
	
	function toggleNav() {	
			if($('#links').hasClass('toggle-on')){
				$('#links').removeClass('toggle-on');
				leadOutLinks();
				$('.hamburger-line-1').css('transform', 'translateY(0px) rotate(0deg)');
				$('.hamburger-line-2').css('transform', 'scale(1)');
				$('.hamburger-line-3').css('transform', 'translateY(0px) rotate(0deg)');
			}
			else {
				
				$('#links').addClass('toggle-on');
				leadInLinks();
				$('.hamburger-line-1').css('transform', 'translateY(8px) rotate(135deg)');
				$('.hamburger-line-2').css('transform', 'scale(0)');
				$('.hamburger-line-3').css('transform', 'translateY(-8px) rotate(-135deg)');
				
			}
	}

	function leadInLinks() {
		console.log("lead in");
		anime({
			targets: '#links .nav-link',
			translateY: 100,
			delay: function(el, i, l) {
				return i * 100;
			}
						
		});
	}
	
	function leadOutLinks() {
		console.log("lead in");
		anime({
			targets: '#links .nav-link',
			translateY: -100,
			delay: function(el, i, l) {
				return i * 100;
			}
						
		});
	}
	