import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


new Vue({
    el: '#app',
    data: {
        students: [],
    },	 
    mounted: function(){
        axios.get("http://34.82.81.113:3000/students").then((response) => {
            console.log(response.data);
            this.students = response.data;
        })
    },
    methods: {
       deleteStudent(studId) {
           this.students = this.students.filter(elem => {
               return elem.id != studId;
           });
       },
       addStudent() {
           this.student.id = this.students.length+1;
           this.students.push(this.student);
       }
    },
 
});