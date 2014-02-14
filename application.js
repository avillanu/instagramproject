var Instagram = {};

(function(){

 function toScreen(photos){
  $.each(photos.data, function(index,photo){
  	photo = "<img src='" + photo.images.low_resolution.url + "' />";
  	$('div#photos-wrap').append(photo);
}); 


  }

function search(tag){
  var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=6ebe06b55f854d908ed98560172980ca"
  $.getJSON(url, toScreen);
}

  Instagram.search = search;
})();

Instagram.search('supercar');

