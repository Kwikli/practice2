import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './components/App.vue'
import WeatherForecast from './components/WeatherForecast.vue'
import WeatherForecastCity from './components/WeatherForecastCity.vue'
import WeatherForecastCityByGeo from './components/WeatherForecastCityByGeo.vue'

const routes = [
  {path: "/", component: WeatherForecast},
  {path: "/weather-forecast/:id", component: WeatherForecastCity, props: true},
  {path: "/weather-forecast-by-location/:yourcity", component: WeatherForecastCityByGeo, props: true}
];
  
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app');
