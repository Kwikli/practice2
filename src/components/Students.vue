<template>
   
</template>
 
<script>
import axios from 'axios'
 
export default {
    data() {
       return {
           weather:[]
       }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData(){
            axios.get("http://34.82.81.113:3000/students").then(data => {
                        
            })
        },
    },
}
 </script>
