<template>
   <div class="weather_content">
        <img src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" class="phone_img" alt="">
        <div class="row">
            <div class="coll">{{name}}</div>
            <div class="col">{{sys.country}}-<b>Координати:</b></div>
            <div class="col">{{coord.lon}} - {{coord.lat}}</div>
        </div>
        <div class="row">
            <div class="coll"><img src="https://cdn-icons-png.flaticon.com/512/3313/3313952.png" alt=""></div>
            <div class="col">вологість</div>
            <div class="col">{{main.humidity}}</div>
        </div>
        <div class="row">
            <div class="coll"><img src="https://cdn-icons-png.flaticon.com/512/107/107818.png" alt=""></div>
            <div class="col">температура</div>
            <div class="col">{{main.temp}} K - {{(main.temp - 273,15)}} °C</div>
        </div>
        <div class="row">
            <div class="coll"><img src="https://cdn-icons-png.flaticon.com/512/72/72579.png" alt=""></div>
            <div class="col">вітер</div>
            <div class="col">{{wind.speed}}</div>
        </div>
        <div class="row">
            <div class="coll"><img src="https://img.icons8.com/material/480/atmospheric-pressure.png" alt=""></div>
            <div class="col">тиск</div>
            <div class="col">{{main.pressure}}</div>
        </div>
        <div class="row">
            <div class="coll"><img src="https://cdn-icons-png.flaticon.com/512/4804/4804190.png" alt=""></div>
            <div class="col">погода</div>
            <div class="col">{{weather.main}}</div>
        </div>
    </div>
</template>
 
<script>
import axios from 'axios'

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude +" - Longitude: " + position.coords.longitude);
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=7914d5a440960cfd5df3bd0388a7ad0f").then(data => {
        console.log(data);
        var yourcity = data.data.name;
    });
}

getLocation();

export default {
    props: {
        id: '',
        yourcity:''
    },
    data() {
       return {
           weather:'',
           info: '',
           main:'',
           sys:'',
           wind:'',
           defaultCity:'',
           name:'',
           coord:'',
           searchCity:'',
           citys:[],
           city:'',
           yourcity:''
       }
    },
    mounted() {
        this.getByCordinate();
        this.getLocation();
        //showPosition();
    },
    methods: {
        getByCordinate(){
            
        },
        getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.showPosition);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        },
        showPosition(position) {
            console.log("Latitude: " + position.coords.latitude +" - Longitude: " + position.coords.longitude);
            axios.get("https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=7914d5a440960cfd5df3bd0388a7ad0f").then(data => {
                console.log(data);
                this.yourcity = data.data.name;
                this.weather = data.data.weather[0];  
                this.info = data.data;
                this.main = data.data.main; 
                this.sys = data.data.sys; 
                this.wind = data.data.wind;  
                this.name = data.data.name; 
                this.coord = data.data.coord; 
            });
        },

    },
}
 </script>
