<template>
       <div class="header">
          Weather header
        <router-link :to="'/'">
          Home
        </router-link>
        <router-link :to="'/weather-forecast-by-location/'+yourcity" style="left:100px;">
          Ваше місто
        </router-link>
       </div>
       <div class="content">
           <router-view></router-view>
       </div>
</template>

<script>

</script>

