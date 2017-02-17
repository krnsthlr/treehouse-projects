(function() {
	var spotifyAPI = 'https://api.spotify.com/v1/search';
	$('form').submit(function(evt){
		evt.preventDefault();
		var $searchField = $('#search');
		var $search = $searchField.val();
		$.getJSON(spotifyAPI, {
			q : $search,
			type : 'album'
		},
		function(data){
			var albumHTML = '';
			if(data.albums.items.length > 0) {
				$.each(data.albums.items, function(i,album) {
					albumHTML += '<li><div class="album-wrap">';
					albumHTML += '<img class="album-art" src="' + album.images[0].url + '"></div>';
					albumHTML += '<span class="album-title">';
					albumHTML += album.name;
					albumHTML += '</span>';
					albumHTML += '<span class="album-artist">';
					albumHTML += album.artists[0].name;
					albumHTML += '</span></li>';
				}); //end each
			} else {
				albumHTML += '<li class="no-albums">';
				albumHTML += '<i class="material-icons icon-help">help_outline</i>';
				albumHTML += 'No albums found that match: ';
				albumHTML += $search;
				albumHTML += '</li>';
			}
			$("#albums").html(albumHTML);
			
		}); //end getJSON*

	});//end submit event handler

})(); 
