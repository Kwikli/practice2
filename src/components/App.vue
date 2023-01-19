<template>
       <div class="header">
        Constant header
        <router-link :to="'/'">
          Home
        </router-link>
       </div>
       <div class="content">
           <router-view></router-view>
       </div>
</template>
