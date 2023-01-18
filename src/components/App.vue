<template>
    <div class="header">
        Нова пошта
    </div>
    <div class="container">
        
            <label for="Region">Оберіть область</label>
                <select id="Region" v-model="RegionCurrent" @change="sortCity(RegionCurrent)">
                    <option value="" selected>Область</option>
                    <option  v-for="item in RegionArray" v-bind:key="item.Description"  :value="item.Description">
                        {{item.Description}} область
                    </option>
                </select> 
                <!-- {{RegionCurrent}} -->
            <label for="City">Оберіть місто</label>
                <select id="City" v-model="City" @change="getWarehouse()">
                    <option value="" selected>Місто</option>
                    <option v-for="item in CityArrayModifed" v-bind:key="item.Description"  :value="item.Description">
                        {{item.Description}} 
                    </option>
                </select> 
                <!-- {{City}} -->
        <label for="PostOffice">Поштове відділення</label>
            <select id="PostOffice" v-model="PostOffice">
                <option value="" selected>Поштове відділення</option>
                <option v-for="item in Warehouses" v-bind:key="item.Area"  :value="item.Area">
                    {{item.Description}} 
                </option>
            </select>
    </div>
</template>
 
<script>
import axios from 'axios'
var apiKey = "e2b716592c795f9737fade3627785ac8";
var area = 1;
var i = 1;
var ipage = 1;
export default {
    data() {
       return {
            RegionArray: [],
            RegionCurrent: "",
            CityArray: [],
            CityArrayModifed: [],
            Warehouses: [],
            City: "",
            PostOffice: "",
            AreasCenter: "",
            i: "1",
            Area:"",
       }
    },
    mounted() {
        this.getData();  
        this.getNovaposhta();
    },
    methods: {
        sortCity(q){
            this.CityArrayModifed = this.CityArray.filter(elem => {
                return elem.AreaDescription.includes(q);
            });
            console.log('CityArray ',this.CityArrayModifed);
            area = this.CityArrayModifed[0].Area;
            console.log(area);
        },
        // if(this.search){
        //         return this.s.filter(elem =>{
        //         return elem.name.toLowerCase().includes(this.search.toLowerCase());
        //     });
        getData(){
            axios.post("https://api.novaposhta.ua/v2.0/json/", {
                "apiKey": apiKey,
                "modelName": "Address",
                "calledMethod": "getAreas",
                "methodProperties": {  

                    }}).then(data => {
                        this.RegionArray = data.data.data;
                        //this.AreaRef = this.RegionArray[2].Ref;
                        this.$forceUpdate();
                        console.log('1 zapit',data);
                        //console.log('Города - ',data.data.data);
                    })
            },
        getWarehouse(){
            axios.post("https://api.novaposhta.ua/v2.0/json/", {
                "apiKey": apiKey,
                "modelName": "Address",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                    "CityName" : this.City,
                    "Page" : "1",
                    "Limit" : "150",
                    "Language" : "UA",
                }
            }).then(data => {
                console.log(data.data.data);
                this.Warehouses = data.data.data;
            })
        },
        getNovaposhta(AreaRef,page){
            if(AreaRef == "") AreaRef = "";
            if(page == "") page=1;
            //console.log(page);
            axios.post("https://api.novaposhta.ua/v2.0/json/", {
                "apiKey":apiKey,
                "modelName": "Address",
                "calledMethod": "getSettlements",
                "methodProperties": {
                    "AreaRef" :AreaRef,
                    "Ref" : "",
                    "RegionRef" : "",
                    "Page" : page,
                    "Warehouse" : "1",
                    "Limit" : "150"  
                }

            }).then(data => {
                for(i=0;i<150;i++){
                    if(data.data.data[i] == undefined){
                        console.log('Final 2 request: ',this.CityArray);
                        console.log('Total pages: ',ipage);
                        return false;
                    }else{
                        if(data.data.data[i].SettlementTypeDescriptionTranslit == "misto"){
                            this.CityArray.push(data.data.data[i]);
                        }
                    }
                }
                // this.CityArray.push(data.data.data.filter(elem => {
                //     return elem.SettlementTypeDescriptionTranslit.includes("misto");
                // }));
                if(data.data.data[i] == undefined){
                    ipage++;
                    this.getNovaposhta("",ipage);
                }else{
                    console.log('Final 2 request: ',this.CityArray);
                    console.log('Total pages: ',ipage);
                    this.getWarehouse();
                }
                if(AreaRef){
                    return this.CityArray;
                } 
            });

        }
    },
}
 </script>
