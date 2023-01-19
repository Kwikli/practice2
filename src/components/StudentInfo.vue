<template>
  <card class="card">
      <img :src="student.photo" alt="studentPhoto">
      {{student.name}}<br>
      пр {{isDonePrOfStudent}}<br>
      група {{student.group}}<br>
  </card>
  <!-- {{student.name}} - пр {{isDonePrOfStudent}} - {{student.group}} 
  <br><img :src="student.photo" alt="studentPhoto"> -->
</template>

<script>
import axios from 'axios';
export default {
  props: {
    id: '',
  },
  data(){
    return{
      student: {}
    };
  },
  computed: {
    isDonePrOfStudent(){
      return this.student.isDonePr ? 'здана' : 'не здана';
    }
  },
  mounted: function(){
    axios.get("http://34.82.81.113:3000/students/"+this.id).then((response) =>{
      this.student = response.data;
    })
  }
}
</script>

<style>

</style>