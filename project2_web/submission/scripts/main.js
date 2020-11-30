	$(document).ready(function () {	
		var popup = $('#popup');
	
		$('#emailSignup').on('click', togglePopup);
		$('.close').on('click', togglePopup);
		
		window.onclick = function(event) {
		  if (event.target == popup) {
			togglePopup();
			}
		}

	});
	
	function togglePopup() {	
	console.log("toggle");
		var popup = $('#popup');
		if (popup.hasClass('hide')) {
			popup.removeClass('hide');
		} else {
			popup.addClass('hide');
		}
	}
	