(function() {

	"use strict";

	var spotifyAPI = 'https://api.spotify.com/v1/search';
	var limit = 20;
	var offset = 0;
	var total;

/**
* ------------------------------------------------------------------------
* Callback helper functions and error handling
* ------------------------------------------------------------------------
*/

	function displayAlbums(data) {
		return data.albums.items.map(function (album) {
			return '<li><div class="album-wrap">' +
				'<a href="' + album.external_urls.spotify + '" target = "_blank">' +
				'<img class="album-art" src="' + album.images[0].url + '"></a></div>' +
				'<span class="album-title">'+ album.name + '</span>' +
				'<span class="album-artist">' + album.artists[0].name +
				'</span></li>';
			})
			.reduce(function (carry, album) {
				return carry + album;
			}, '');
	}

	function showError(jqXHR, textStatus) {
		var errorHTML = '<li class="error">';
		errorHTML += '<i class="material-icons icon-help">help_outline</i>';
		errorHTML += jqXHR.statusText;
		errorHTML += '<br>Please try again</li>';
		$('#albums').html(errorHTML);
	}

/**
* ------------------------------------------------------------------------
* Form event handler
* ------------------------------------------------------------------------
*/

	$('form').submit(function(evt){
		evt.preventDefault();
		$(window).scrollTop(0);
		var $search = $('#search').val();
		offset = 0;		
		$.ajax({
			url: spotifyAPI,
			data : {
				q : '"' + $search + '"',
				type : 'album',
				limit : limit,
				offset : offset
			},
			success: function(data) {
				if(data.albums.items.length === 0) {
					var albumHTML = '<li class="no-albums">';
					albumHTML += '<i class="material-icons icon-help">help_outline</i>';
					albumHTML += 'No albums found that match: '+  $search +'</li>';
					$('#albums').html(albumHTML);
					return;
				}
				total = data.albums.total;
				$('#albums').html(displayAlbums(data));
			},
			error: showError

		}); //end ajax request

	});

/**
* ------------------------------------------------------------------------
* Scroll event handler,
* loads more search results (if available)
* ------------------------------------------------------------------------
*/

	$(window).scroll(function(){
		var $window = $(window);
		if($window.scrollTop() + $window.height() < $(document).height() - 100) {
			return;
		}		
		var $search = $('#search').val();
		offset += limit;
		if(offset > total) return;
			$.ajax({
				url: spotifyAPI,
				data : {
				q : '"' + $search + '"',
				type : 'album',
				limit : limit,
				offset : offset
			},
			success: function(data){
				$(displayAlbums(data)).appendTo($('#albums'));
			},
			error: showError
		});
	});
		
})(); 
