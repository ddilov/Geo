function id(element) {
	return document.getElementById(element);
}
 
document.addEventListener("deviceready", onDeviceReady, false);
 
function onDeviceReady() {
	geolocationApp = new geolocationApp();
	geolocationApp.run();
    
}
 
function geolocationApp() {
}

geolocationApp.prototype = {
	_watchID:null,
    
	run:function() {
		var that = this;
		document.getElementById("watchButton").addEventListener("click", function() {
			that._handleWatch.apply(that, arguments);
		}, false);
		document.getElementById("refreshButton").addEventListener("click", function() {
			that._handleRefresh.apply(that, arguments);
		}, false);
	},
    
	_handleRefresh:function() {
		var options = {
			enableHighAccuracy: true
		},
		that = this;
		navigator.geolocation.getCurrentPosition(function() {
			that._onSuccess.apply(that, arguments);
		}, function() {
			that._onError.apply(that, arguments);
		}, options);
	},
    
	_handleWatch:function() {
		var that = this,
		// If watch is running, clear it now. Otherwise, start it.
		button = document.getElementById("watchButton");
                     
		if (that._watchID != null) {
			that._setResults();
			navigator.geolocation.clearWatch(that._watchID);
			that._watchID = null;
                         
			button.innerHTML = "Стартиране на GPS";
		}
		else {
			that._setResults("Изчакване за геолокация с GPS...");
			// Update the watch every second.
			var options = {
				frequency: 1000,
				enableHighAccuracy: true
			};
			that._watchID = navigator.geolocation.watchPosition(function() {
				that._onSuccess.apply(that, arguments);
			}, function() {
				that._onError.apply(that, arguments);
			}, options);
			button.innerHTML = "Изчистване на GPS";
            
		}
	},
    
	_onSuccess:function(position) {
		// Successfully retrieved the geolocation information. Display it all.
        
		this._setResults('Ширина: ' + position.coords.latitude + '<br />' +
						 'Дължина: ' + position.coords.longitude + '<br />' +
						 'Височина: ' + position.coords.altitude + '<br />' +
						 'Точност: ' + position.coords.accuracy + '<br />' +
						 'Височина точност: ' + position.coords.altitudeAccuracy + '<br />' +
						 'Горна позиция: ' + position.coords.heading + '<br />' +
						 'Скорост: ' + position.coords.speed + '<br />' +
						 'Момент: ' + new Date(position.timestamp).toLocaleTimeString().split(" ")[0] + '<br />');
	},
    
	_onError:function(error) {
		this._setResults('Код: ' + error.code + '<br/>' +
						 'съобщение: ' + error.message + '<br/>');
	},
    
	_setResults:function(value) {
		if (!value) {
			document.getElementById("results").innerHTML = "";
		}
		else {
			document.getElementById("results").innerHTML = value;
		}
	},
}