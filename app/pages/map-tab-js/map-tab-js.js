import {Page, Geolocation, Events, NavController, NavParams} from 'ionic-angular';
import {DetailsPage} from '../details/details';
import {GlobalVars} from '../../global-vars';

const defaultZoom = 16;
const defaultPos = {lat: 48.896685, lng: 2.318357};  // 42

@Page({
  templateUrl: 'build/pages/map-tab-js/map-tab-js.html'
})
export class MapTabJsPage {
  static get parameters() {
    return [[GlobalVars], [Events], [NavController], [NavParams]];
  }
  constructor(glob, events, nav, navParams) {
    this.nav = nav;
    this.glob = glob;
    this.centerMarker = null;
    this.lastInfoWin = null;
    this.loading = navParams.data;
    this.poiMarkers = [];

    events.subscribe('locateUser', () => {
      this.setCurrentPos();
    });
  }

  onPageLoaded() {
		this.initMap();
		this.initSearchBox();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      window.dispatchEvent(new Event('resize'))
      if (this.glob.coords === null) {
        this.setCurrentPos();
      }
      else {
        document.getElementById('map-input').value = this.glob.address;
        this.updateCenter();
      }

      this.putPoiMarkers();

      if (this.loading !== undefined) {
        setTimeout(() => {
          this.loading.dismiss()
        }, 1000);
      }
    });
  }

  putPoiMarkers() {
    for (let count = 0; count < this.glob.pois.length; count++) {
      let poi = this.glob.pois[count];

    	let poiMarker = new google.maps.Marker({
    	  map: this.map,
    	  animation: google.maps.Animation.DROP,
    	  position: poi.coords,
        icon: {
          url: 'img/map-icons/' + poi.type + '.png',
          scaledSize: new google.maps.Size(36, 36)
        }
    	});

      let convert = function(value) {
        if (isNaN(parseInt(value)))
          return value;

        let hours = Math.floor(value / 60);
        let minutes = value % 60;
        return hours + 'h' + minutes;
      };

      let divContent =
      '<div class="infowindow">' +
        '<div class="infoleft">' +
          '<p class="infotitle">' + poi.name + '</p>' +
          '<p class="infodist">' + poi.dist + 'm</p>' +
        '</div>' +
        '<div class="inforight">' +
          '<p class="infoaduration">' +  convert(poi.duration) + '</p>' +
          '<p class="infopromo">-' + poi.promo + '%</p>' +
        '</div>' +
      '</div>';

      let infoWin = new google.maps.InfoWindow({
        content: divContent
      });

      poiMarker.addListener('click', () => {
          if (this.lastInfoWin) {
            this.lastInfoWin.close();
          }
          infoWin.open(this.map, poiMarker);
          google.maps.event.addListener(infoWin, 'domready', () => {
            let rootDiv = jQuery('.gm-style-iw');
            let infoDiv = rootDiv.prev().children(':nth-child(4)');
            let infoWinDiv = jQuery('.infowindow');
            let arrowLeftDiv = rootDiv.prev().children(':nth-child(3)').children(':nth-child(1)').children(':nth-child(1)');
            let arrowRightDiv = rootDiv.prev().children(':nth-child(3)').children(':nth-child(2)').children(':nth-child(1)');

            infoDiv.css('background-color', '#3d4d6e');
            arrowLeftDiv.css('background-color', '#3d4d6e');
            arrowRightDiv.css('background-color', '#3d4d6e');

            let lock = false;
            rootDiv.next().hide();
            rootDiv.click(() => {
              if (lock === false)
                lock = true;
              else
                return;
              this.nav.push(DetailsPage, {index: count});
            });
            infoWinDiv.parent().css('overflow', '');
            infoWinDiv.parent().parent().css('overflow', '');
            infoWinDiv.click(() => {
              if (lock === false)
                lock = true;
              else
                return;
              this.nav.push(DetailsPage, {index: count});
            });
          });
          this.lastInfoWin = infoWin;
      });

      this.poiMarkers.push(poiMarker);
    }
  }

  initMap() {
    let startPos = (this.glob.coords !== null) ? this.glob.coords : defaultPos;
    let mapOptions = {
        center: startPos,
        zoom: defaultZoom,
        disableDefaultUI: true,
        streetViewControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    let mapDiv = document.getElementById("map");
    this.map = new google.maps.Map(map, mapOptions);

    let inputDiv = document.getElementById("map-input");
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputDiv);
  }

  initSearchBox() {
    let inputDiv = document.getElementById('map-input');
    let options = {
      types: ['geocode']
    };
    this.searchBox = new google.maps.places.Autocomplete(inputDiv, options);

    this.map.addListener('bounds_changed', () => {
      this.searchBox.setBounds(this.map.getBounds());
    });

    this.searchBox.addListener('place_changed', () => {
      this.glob.address = inputDiv.value;
      let place = this.searchBox.getPlace();
      if (!place.geometry)
        return;
      else {
        this.glob.coords = place.geometry.location;
        this.updateCenter();
      }
    });

    inputDiv.addEventListener('focus', () => {
      inputDiv.value = '';

      let count = 840;
      let removeLogo = () => {
        let dropDownDiv = document.getElementsByClassName('pac-container')[0];
        if (dropDownDiv === undefined && count--)
          setTimeout(removeLogo, 42);
        else
          dropDownDiv.className = dropDownDiv.className.replace(/\bpac-logo\b/,'');
      };
      removeLogo();
    });
    inputDiv.addEventListener('blur', () => {
      setTimeout(() => {
        inputDiv.value = this.glob.address;
      }, 142);
    });
  }

  setCurrentPos(changeInput) {
    document.getElementById("map-input").value = this.glob.address = "Ma position"
    let options = {timeout: 10000, enableHighAccuracy: true};

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.glob.coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.updateCenter();
      },
      (error) => {
        console.error(error);
      }, options
    );
  }

  updateCenter() {
    this.map.panTo(this.glob.coords);
    this.map.setZoom(defaultZoom);

    if (this.centerMarker !== null) {
      this.centerMarker.setMap(null);
    }

  	this.centerMarker = new google.maps.Marker({
  	  map: this.map,
  	  animation: google.maps.Animation.DROP,
  	  position: this.map.getCenter()
  	});
  }
}
