<template>
   <div>
        <input type="text" name="search" v-model="search" placeholder="Пошук..."><br>
		<table class="table table-dark">
			<tr v-for="item in students"  v-bind:key="item.Ref">
                <template v-if="item._id != editSt"> 
                    <td>{{item.name}}</td>
                    <td><input type="checkbox" :class="item.isDonePr" v-model="item.isDonePr"></td>
                    <td>{{item.group}}</td>
                    <td>
                        <up @click="deleteStudent(item._id)"><img src="del.png" alt="delete"></up>
                        <up @click="updateStudent(item._id)"><img src="edit.png" alt="delete"></up>
                    </td>
                </template>
                <template v-else>
                    <td><input type="text" v-model="item.name"></td>
                    <td><input type="checkbox" :class="item.isDonePr" v-model="item.isDonePr"></td>
                    <td>
                        <select v-model="student.group">
                            <option value="" selected>{{item.group}}</option>
                            <option v-if="item.group != 'RPZ 19 1/9'" value="RPZ 19 1/9">RPZ 19 1/9</option>
                            <option v-if="item.group != 'RPZ 19 2/9'" value="RPZ 19 2/9">RPZ 19 2/9</option>
                        </select>
                    </td>
                     <td>
                        <up @click="deleteStudent(item._id)"><img src="del.png" alt="delete"></up>
                        <up @click="updateStudentPut(item._id)"><img src="edit.png" alt="delete"></up>
                    </td>
                </template>
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
           student: {name: "", isDonePr: false, group: ""},
           editSt:0
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
                        console.log(this.students);
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
        updateStudent(id){
            console.log('update - ',id);
            this.editSt = id;
            this.$forceUpdate();
        },
        updateStudentPut(id){
            let foundStudent = this.students.find((element) => {
                return element._id == id;
            });

            axios.put("http://34.82.81.113:3000/students/"+id, {
                name: foundStudent.name,
                group: foundStudent.group,
                isDonePr: foundStudent.isDonePr
            }).then((response) => {
                console.log(response.data);
                this.getData();
                this.$forceUpdate();
            })
            this.editSt = 0;
            
            
        },
        addStudent() {
            console.log('add - ',this.student);
            axios.post("http://34.82.81.113:3000/students", {...this.student})
                .then(data => {
                    console.log(data);
                    this.getData();
                })
            this.$forceUpdate();    
       },
    },
}
 </script>
