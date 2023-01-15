<template>
   <div>
        <input type="text" name="search" v-model="search" placeholder="Пошук..."><br>
		<table class="table table-dark">
			<tr :id="item._id" v-for="item in students"  v-bind:key="item._id"> 
				<td>{{item.name}}</td>
				<td><input type="checkbox" :class="item.isDonePr" v-model="item.isDonePr"></td>
				<td>{{item.group}}</td>
                <td>
                    <up @click="deleteStudent(item._id)"><img src="del.png" alt="delete"></up>
                    <up @click="updateStudent(item._id)"><img src="edit.png" alt="delete"></up>
                </td>
                
			</tr>
		</table>
        
		<input v-model="student.name" placeholder="ПІБ"><br>
		<b style="margin-left: 135px;">ПР</b> <input type="checkbox" v-model="student.isDonePr"><br>
		<select v-model="student.group">
            <option value="" selected disabled hidden>Виберіть групу</option>
			<option value="RPZ 19 1/9">RPZ 19 1/9</option>
			<option value="RPZ 19 2/9">RPZ 19 2/9</option>
		</select>
		<br><button @click="addStudent()">Додати студента</button>
        
   </div>
</template>
 
<script>
import axios from 'axios'
 
export default {
    data() {
       return {
           students: [],
           search:'',
           student: {name: "", isDonePr: false, group: ""}
       }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData(){
            axios.get("http://34.82.81.113:3000/students")
                    .then(data => {
                        this.students =  data.data;
                        this.mounted;
                    })
        },
        deleteStudent(studId) {
            console.log('delete - ',studId);
            axios.delete("http://34.82.81.113:3000/students/"+studId)
                .then(data => {
                    console.log(data); 
                    this.getData();
                })
            this.$forceUpdate();
        },
        updateStudent(studId){
            console.log('update - ',studId);
            var updatetmpl = `<td><input type="text" :value="item.name"></td>
				<td><input type="checkbox" :class="item.isDonePr" v-model="item.isDonePr"></td>
				<td>
                    <select v-model="student.group">
                        <option value="" selected>{{item.group}}</option>
                        <option v-if="item.group != 'RPZ 19 1/9'" value="RPZ 19 1/9">RPZ 19 1/9</option>
                        <option v-if="item.group != 'RPZ 19 2/9'" value="RPZ 19 2/9">RPZ 19 2/9</option>
                    </select>
                </td>`;
            axios.put("http://34.82.81.113:3000/students/"+studId).then(data => {
                console.log(data); 
                this.getData();
            });
            this.$forceUpdate();
        },
        addStudent() {
            console.log('add - ',this.student);
            axios.post("http://34.82.81.113:3000/students", {...this.student})
                .then(data => {
                    console.log(data);
                    this.getData();
                })
            this.$forceUpdate();    
       }
    },
}
 </script>
