// A simple (it does the job) function for template parsing.
 $(document).ready(function() {
            $('.fancybox').fancybox();

  $('body').on('click', '.paginate a.btn', function(){
      var tagID = $(this).attr('data-max-tag-id');
      fetchPhotos(tagID);
      return false;
    });

 $("#manual2").click(function() {
		$.fancybox([
			'http://farm5.static.flickr.com/4044/4286199901_33844563eb.jpg',
			'http://farm3.static.flickr.com/2687/4220681515_cc4f42d6b9.jpg',
			{
				'href'	: 'http://farm5.static.flickr.com/4005/4213562882_851e92f326.jpg',
				'title'	: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
			}
		], {
			'padding'			: 0,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'type'              : 'image',
			'changeFade'        : 0
		});
	});
  



        });




var Instagram = {};
Instagram.Template = {};

Instagram.Template.Views = {

  "photo": "<div class='photo'>" +
            "<a href='{instagram.images.thumbnail.url}' class='fancybox'><img class='main' src='{photo_url}' width='250' height='250' /></a>" +
            "<img class='avatar_url' width='40' height='40' src='{avatar}' />" +
            "<span class='heart'><strong>{like_count}</strong></span>" +
          "</div>"
};
function toTemplate(photo){
	photo = {
		like_count: photo.likes.count,
		avatar_url: photo.user.profile_picture,
		photo_url: photo.images.low_resolution.url,
		url:photo.link
};
  function init(){
    bindEventHandlers();
}
  function paginate(max_id){    
    $.getJSON(generateUrl(tag), toScreen);
  }
return Instagram.Template.generate('photo', Instagram.Template.View['photo']);
}
(function(){


 function toScreen(photos){
 	var photos_html = '';
    $('.paginate a').attr('data-max-tag-id', photos.pagination.next_max_id)
                    .fadeIn();
	  $.each(photos.data, function(index, photo){
  
  	photo = "<div class='photo'>" +
    "<a href='"+ photo.images.low_resolution.url + "' class='fancybox' rel='gallery'>"+
      "<img class='main' src='" + photo.images.thumbnail.url + "' width='250' height='250' />" +
    "</a>" +
    "<img class='avatar' width='40' height='40' src='"+photo.user.profile_picture+"' />" +
    "<span class='heart'><strong>"+photo.likes.count+"</strong></span>" +
  "</div>";
  $('div#photos-wrap').append(photo);
});
  }

function fetchPhotos(max_id){
    $.getJSON(resource(max_id), toScreen);
  }

 function paginate(max_id){    
    $.getJSON(generateUrl(tag), toScreen);
  }

    function bindEventHandlers(){
    $('body').on('click', '.paginate a.btn', function(){
      var tagID = $(this).attr('data-max-tag-id');
      fetchPhotos(tagID);
      return false;
    });
  }

function search(tag){
  var url = "https://api.instagram.com/v1/tags/" + tag + "/media/recent?callback=?&amp;client_id=6ebe06b55f854d908ed98560172980ca"
  $.getJSON(url, toScreen);

}



  Instagram.search = search;
})();
Instagram.search('supercar');

