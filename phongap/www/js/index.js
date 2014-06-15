/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.receivedEvent('deviceready');

      $('#txupinazo').click(function(e){
        app.playAudioTxupinazo();
      });
      $('#encierro').click(function(e){
        app.playAudioEncierro();
      });
      $('#txistularis').click(function(e){
        app.playAudioTxistularis();
      });
      $('#reset').click(function(e){
        app.firebaseReset();
      });
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      // var parentElement = document.getElementById(id);
      // var listeningElement = parentElement.querySelector('.listening');
      // var receivedElement = parentElement.querySelector('.received');

      // listeningElement.setAttribute('style', 'display:none;');
      // receivedElement.setAttribute('style', 'display:block;');

      console.log('Received Event: ' + id);
    },
    firebaseReset: function(){
       var datosMandar = {
        'lat': 0, 
        'lon': 0,
        'agudos': 0,
        'graves': 0,
        'intensidad': 0,
        'reset': 1
      };
      app.enviarServidor(datosMandar, 0);
    },
    playAudioTxupinazo: function(){
      console.log('hola');
      var src = "/sdcard/txupinazo2.mp3";
      var mediaRec = new Media(src, app.onSuccess, app.onError);
      mediaRec.play();

      var lat_x = 42.818331;
      var lat_y = -1.644036;

      var datosMandar = {
        'lat': lat_x, 
        'lon': lat_y,
        'agudos': 25,
        'graves': 0,
        'intensidad': 0,
        'reset': 0
      };
      var datosMandar1 = {
        'lat': lat_x + 0.000300, 
        'lon': lat_y + 0.000300,
        'agudos': 0,
        'graves': 35,
        'intensidad': 0,
        'reset': 0
      };
      var datosMandar2 = {
        'lat': lat_x + 0.000300, 
        'lon': lat_y - 0.000300,
        'agudos': 0,
        'graves': 0,
        'intensidad': 40,
        'reset': 0
      };

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar, 0);
      },2000);

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar1, 0);
      },3000);

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar2, 0);
      },4000);

    },

    playAudioEncierro: function(){
      var lat_x = 42.820078;
      var lat_y = -1.646129;

      var datosMandar = {
        'lat': lat_x, 
        'lon': lat_y,
        'agudos': 20,
        'graves': 0,
        'intensidad': 0,
        'reset': 0
      };
      var datosMandar1 = {
        'lat': lat_x + 0.000300, 
        'lon': lat_y + 0.000300,
        'agudos': 0,
        'graves': 25,
        'intensidad': 0,
        'reset': 0
      };
      var datosMandar2 = {
        'lat': lat_x + 0.000300, 
        'lon': lat_y - 0.000300,
        'agudos': 0,
        'graves': 0,
        'intensidad': 25,
        'reset': 0
      };

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar, 0);
      },2000);

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar1, 0);
      },3000);

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar2, 0);
      },4000);


      var src = "/sdcard/encierro2.mp3";
      var mediaRec = new Media(src, app.onSuccess, app.onError);
      mediaRec.play();
    },

    playAudioTxistularis: function(){

      var lat_x = 42.816907;
      var lat_y = -1.642826;

      var datosMandar = {
        'lat': lat_x, 
        'lon': lat_y,
        'agudos': 40,
        'graves': 0,
        'intensidad': 0,
        'reset': 0
      };
      var datosMandar1 = {
        'lat': lat_x + 0.000300, 
        'lon': lat_y + 0.000300,
        'agudos': 0,
        'graves': 20,
        'intensidad': 0,
        'reset': 0
      };
      var datosMandar2 = {
        'lat': lat_x + 0.000300, 
        'lon': lat_y - 0.000300,
        'agudos': 0,
        'graves': 0,
        'intensidad': 35,
        'reset': 0
      };

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar, 0);
      },2000);

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar1, 0);
      },3000);

      var myVar=setTimeout(function(){
        app.enviarServidor(datosMandar2, 0);
      },4000);

      var src = "/sdcard/txistu.mp3";
      var mediaRec = new Media(src, app.onSuccess, app.onError);
      mediaRec.play();
    },

    enviarServidor: function(position){
          console.log(position);
      //data: "lat="+position.coords.latitude+"&lon="+position.coords.latitude+"&total="+total,  
      //data: "somedata= lat: "+position.coords.latitude+" log: "+position.coords.longitude,
      var nombre = 'karlos_tarde';                      
      $.ajax({
          dataType: 'jsonp',
          data: "lat="+position.lat+"&lon="+position.lon+"&agudos="+position.agudos+"&graves="+position.graves+"&intensidad="+position.intensidad+"&nombre="+nombre+"&reset="+position.reset,
          jsonp: 'callback',
          url: 'http://46.105.116.39:7000/logget?callback=?',                     
          success: function(data) {
            console.log(data.more);
          }
      });
    }, 
    recordAudio: function(){
      var src = "migr1.mp3";
      var mediaRec = new Media(src, app.onSuccess, app.onError);

      // Record audio
      mediaRec.startRecord();

      // Stop recording after 10 sec
      var recTime = 0;
      var recInterval = setInterval(function() {
          recTime = recTime + 1;
          app.setAudioPosition(recTime + " sec");
          if (recTime >= 10) {
              clearInterval(recInterval);
              mediaRec.stopRecord();
              app.playAudio();
          }
      }, 1000);
    },
    onSuccess: function(){
       console.log("recordAudio():Audio Success");
    },
    onError: function(error){
      alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    },
    setAudioPosition: function(position){
       document.getElementById('audio_position').innerHTML = position;
    }
};
