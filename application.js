 $(document).ready(function() {
            $('.fancybox').fancybox();
        });

var Instagram = {};

// Small object for holding important configuration data.
Instagram.Config = {
  clientID: '6ebe06b55f854d908ed98560172980ca',
  apiHost: 'https://api.instagram.com'
};


// ************************
// ** Main Application Code
// ************************
(function(){
  var photoTemplate, resource;

  function init(){
    bindEventHandlers();
    photoTemplate = _.template($('#photo-template').html());
  }

  function toTemplate(photo){
   

   photo = {
   count: photo.likes.count,
   avatar: photo.user.profile_picture,
    photo: photo.images.low_resolution.url,
    url: photo.link,
    thumb: photo.images.thumbnail.url
   };

    return photoTemplate(photo);
  }

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

//      photos_html += toTemplate(photo);
//    });

//    $('div#photos-wrap').append(photos_html);
  }

  function generateResource(tag){
    var config = Instagram.Config, url;

    if(typeof tag === 'undefined'){
      throw new Error("Resource requires a tag. Try searching for cats.");
    } else {
      // Make sure tag is a string, trim any trailing/leading whitespace and take only the first 
      // word, if there are multiple.
      tag = String(tag).trim().split(" ")[0];
    }

    url = config.apiHost + "/v1/tags/" + tag + "/media/recent?callback=?&client_id=" + config.clientID;

    return function(max_id){
      var next_page;
      if(typeof max_id === 'string' && max_id.trim() !== '') {
        next_page = url + "&max_id=" + max_id;
      }
      return next_page || url;
    };
  }

  function paginate(max_id){    
    $.getJSON(generateUrl(tag), toScreen);
  }

  function search(tag){
    resource = generateResource(tag);
    $('.paginate a').hide();
    $('#photos-wrap *').remove();
    fetchPhotos();
  }

  function fetchPhotos(max_id){
    $.getJSON(resource(max_id), toScreen);
  }

  function bindEventHandlers(){
    $('body').on('click', '.paginate a.btn', function(){
      var tagID = $(this).attr('data-max-tag-id');
      fetchPhotos(tagID);
      return false;
    });

    // Bind an event handler to the `submit` event on the form
    $('form').on('submit', function(e){

      // Stop the form from fulfilling its destinty.
      e.preventDefault();

      // Extract the value of the search input text field.
      var tag = $('input.search-tag').val().trim();

      // Invoke `search`, passing `tag` (unless tag is an empty string).
      if(tag) {
        search(tag);
      };

    });

  }

  function showPhoto(p){
    $(p).fadeIn();
  }

  // Public API
  Instagram.App = {
    search: search,
    showPhoto: showPhoto,
    init: init
  };
}());

$(function(){
  Instagram.App.init();
  
  // Start with a search on cats; we all love cats.
  Instagram.App.search('supercar');  
});

