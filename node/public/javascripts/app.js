var currentUser = null;
var friends  = {};
var allUsers = {};

var App = function() {
  this.Config = {
    FirebaseURL : "https://oinez.firebaseio.com",
  };
  
  this.Map         = null;
  this.MarkerLayer = null;
  //this.currentUser = null;
};

App.prototype = {
  init: function(currentUserId) {
    var that = this;
    this.Config.usersRef       = new Firebase(App.Config.FirebaseURL + '/users');
    this.Config.currentUserRef = new Firebase(App.Config.FirebaseURL + '/oinez' + '/' + 0);
    this.Config.currentUserRef.once('value', function(snapshot) {
      currentUser = snapshot.val();
      that.renderUI(currentUserId);
      that.renderMap();
      that.fetchAndRenderBookmarks(currentUserId);
      //that.renderBookmarks(currentUser.bookmarks);
    });
    
    this.Config.bookmarksRef = new Firebase(App.Config.FirebaseURL + '/users/' + currentUserId + '/bookmarks');
  },

  renderMap : function() {
    var map = mapbox.map('map');
    map.addLayer(mapbox.layer().id('chawei.map-85tzbb2w'));
    
    this.MarkerLayer = mapbox.markers.layer();
    var markerLayer    = this.MarkerLayer;
    var interaction = mapbox.markers.interaction(markerLayer);
    map.addLayer(markerLayer);
    
    interaction.formatter(function(feature) {
      var o = ['<div class="marker-title" user-id="', feature.properties["user-id"], '" checkin-id="', feature.properties["checkin-id"], '">',
                  feature.properties.title,
                  '<a class="save_btn" href="#">mark it</a>',
                '</div>',
                '<div class="marker-description">',
                  feature.properties.description,
                '</div>'].join('');
      return o;
    });

    map.zoom(10).center({ lat: 37.626, lon: -122.397 });
    
    this.importCheckIns(currentUser.checkins, currentUser.fb_info.id);
    this.initFilterEvents();

    markerLayer.factory(function(f) {
        // Define a new factory function. This takes a GeoJSON object
        // as its input and returns an element - in this case an image -
        // that represents the point.
            var img = document.createElement('p');
            img.className = 'marker-image';
            img.createTextNode(text)
            return img;
        });

    map.ui.zoomer.add();
    map.ui.zoombox.add();

    // Attribute map
    map.ui.attribution.add()
        .content('<a href="http://mapbox.com/about/maps">Terms &amp; Feedback</a>');
  },

  
  importCheckIns : function(checkins, userId) {
    var markerLayer = this.MarkerLayer;
    for (var i=0; i < checkins.length; i++) {
      var checkin = checkins[i];
      var description = checkin.place.location.city + ', ' + checkin.place.location.country;
      var feature = {
        geometry: {
          coordinates: [checkin.coordinates.longitude, checkin.coordinates.latitude]
        },
        properties: {
          //'marker-color': '#000',
          //'marker-symbol': 'star-stroked',
          'user-id': userId,
          'image': 'https://graph.facebook.com/'+userId+'/picture',
          'checkin-id': checkin.id,
          title: checkin.place.name,
          description: description
        }
      }
      markerLayer.add_feature(feature);
    }
  },
};

var App = new App();

var User = function(user) {
  this.facebookId = user.id;
  this.fullName   = user.name;
  this.firstName  = user.first_name;
  this.fbInfo     = user;
  this.checkins   = null;
};
