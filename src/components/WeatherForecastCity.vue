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
       }
    },
    mounted() {
        this.getData();
        this.defaultCity = window.localStorage.getItem('defaultcity');
        if(localStorage.citys)this.citys = JSON.parse(localStorage.citys);
    },
    methods: {
        searchWeatherCity(){
            axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.id+"&appid=7914d5a440960cfd5df3bd0388a7ad0f").then(data => {
                if(data){
                    console.log('data');
                    if(localStorage.citys){
                        this.citys=JSON.parse(localStorage.citys);
                        this.citys.push(data.data.name);
                        localStorage.citys = JSON.stringify(this.citys);
                    }else{
                        this.citys.push(data.data.name);
                        localStorage.citys = JSON.stringify(this.citys);
                    }
                    this.searchCity = '';
                    this.citys = JSON.parse(localStorage.citys);
                    console.log('this.citys',this.citys);
                }
            })
        },
        getCordinate(){
            
        },
        getData(){
            console.log(this.id);
            axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.id+"&appid=7914d5a440960cfd5df3bd0388a7ad0f").then(data => {
                this.weather = data.data.weather[0];  
                this.info = data.data;
                this.main = data.data.main; 
                this.sys = data.data.sys; 
                this.wind = data.data.wind;  
                this.name = data.data.name; 
                this.coord = data.data.coord;  
            })
        },
        setDefaultCity(){
            window.localStorage.setItem('defaultcity',this.defaultCity);
            console.log('setDefaultCity');
        }
    },
}
 </script>
