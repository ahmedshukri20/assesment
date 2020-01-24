/* eslint-disable no-console */
/* eslint-disable no-undef */
<template>
     <div>
        <h3>Pack</h3>
        <div class="wolves">
            
            <div class="wolf">  
                Name: {{ pack.name }} <br>
                Lat:{{ pack.lat }}<br>
                Lng: {{ pack.lng }}<br>

                 <div class="">
                     <i class="fas fa-user-plus" v-on:click="showAddtPackForm()"></i>
                </div>
                <div class="">
                   <i class="fas fa-edit" v-on:click="showEditForm()"></i>
                </div>
                 
            </div>

            <form v-if="!hideEdit"  @submit="editPack" >

                <div class="add-wolf">
                    <input type="text" v-validate="'required'" :class="{'has-error': errors.has('name')}" name="name" v-model="pack.name" placeholder="Name">
                    <input type="text" v-validate="'required'" :class="{'has-error': errors.has('lat')}" name="lat" v-model="pack.lat" placeholder="Latitude">
                    <input type="text" v-validate="'required'" :class="{'has-error': errors.has('lng')}" name="lng" v-model="pack.lng" placeholder="Longitude">
                    <input type="submit" value="Update">
                 </div>
                 
                   <div>
                        <p class="error-label" v-if="!updated && errors.has('name') || errors.has('lat') || errors.has('lng') ">Please fill the required fields!</p>
                        <p class="success-label" v-if="updated">Pack is successfully is updated</p>
                    </div>
            </form>

            <div v-if="!hideAddToPack" class="padding" >
                <form @submit="addToPack">
                    <label for=""><h3>Non-Member wolves</h3></label>
                    <div class="add-wolf">
                       <select @change="getWolfId">   
                            <option v-for="wolf in nonMemberWolves" :value="wolf.id" :key="wolf.id" >{{wolf.name}}</option>
                        </select>
                        <input type="submit"  value="Add to Pack">
                    </div>
                </form>

        
                 <form @submit="removeFromPack" class="padding">
                    <label for=""><h3>Member wolves</h3></label>
                    <div class="add-wolf">
                        <select @change="getWolfId">
                            <option v-for="wolfy in memberWolves" :value="wolfy.id" :key="wolfy.id" >{{wolfy.name}}</option>
                        </select>
                        <input type="submit" class="remove" value="Remove from Pack">
                    </div>
                </form>
            </div>
        </div>
        

    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import axios from 'axios';
    
    export default {
        name: "Pack",
        data() {
            return {
                hideEdit: true,
                hideAddToPack: true,
                packUpdated : false,
                updated: false,
                selectedOptionId: '',
                pack: {
                    id: '',
                    name: '',
                    lat: '',
                    lng: '',
                    wolves: ''
                }
            }
        },
        methods: {
             ...mapActions(["updatePack", "fetchPack", 'fetchWolves', 'addWolfToPack', 'deleteWolfToPack']),
             //onclick show add form
            showAddtPackForm(){
                this.hideAddToPack = !this.hideAddToPack;
                this.hideEdit = true
            },
            //onclick show edit form
            showEditForm(){
                this.hideEdit = !this.hideEdit;
                this.hideAddToPack = true
            },

            // function to update a pack
            editPack(e) {
                 e.preventDefault();

                 //check if validator for errors
                 this.$validator.validateAll().then(() => {

                    //  check if all fields are filled
                    //then do the call the  updatePack action
                    if (this.pack.name && this.pack.lat && this.pack.lng) {
                       this.updatePack(this.pack);
                       e.target.reset()
                       this.updated = true;
                        return true;
                    }else{
                        this.updated = false;
                    }
                }).catch(() => {
                    return false
                });
            },
            getWolfId(event) {
               this.selectedOptionId = event.target.value
            },

            //function to add a wolf to the pack
            addToPack() {
                //prepare params
                let wolfD = {
                    id : parseInt(this.pack.id),
                    wolf_id :  parseInt(this.selectedOptionId)
                }
                //call action to do the api call
                this.addWolfToPack(wolfD);
                window.location.reload()
            },
            removeFromPack() {
                //prepare params
                let wolfD = {
                    id : parseInt(this.pack.id),
                    wolf_id :  parseInt(this.selectedOptionId)
                }

                //call action to do the api call
                this.deleteWolfToPack(wolfD);
            },

            async fetchPack(id){
                const config = {headers: { Authorization: "Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6" }};
                const response = await axios.get(`https://join.wolfpackit.nl/api/v1/packs/${id}`, config);

                return response.data;
            }
          
        },
        computed: {
            ...mapGetters(['allWolves', 'wolvesNotInPack', 'wolvesInPack']),

            // getter to return only wolves that are not in this pack
            nonMemberWolves () {
                return this.wolvesNotInPack(this.pack.wolves)
            },
            // getter to return only wolves that are in this pack
            memberWolves() {
                return this.wolvesInPack(this.pack.wolves)
            }
        },
        created(){
            //on created call get all the wolves
            //will be used when suer wants to add a wolf to a pack
            this.fetchWolves();
        },
        mounted(){
            this.fetchPack(this.$route.params.id).then((response) => {
                this.pack.id = response.id;
                this.pack.name = response.name;
                this.pack.lat = response.lat;
                this.pack.lng = response.lng;
                this.pack.wolves = response.wolves;
            });
            
        }
    }
</script>

<style scoped>
.alert-danger {
  color: red;
}
.padding{
  padding-bottom: 30px;
  padding-top: 30px;
}
.success-label{
     font-size: 15px;
    line-height: 3;
    font-weight: normal;
    text-align: center;
    color: green;
}   
.error-label{
      font-size: 15px;
       text-align: center;
    line-height: 3;
    font-weight: normal;
    color: red;
}
.has-error {
  border-color: red !important;
}
    .container{
        overflow: hidden;
    }
   .wolves {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 1rem;
    }
    .wolf {
        border: 1px solid #ccc;
        background: #bebd4d;
        padding: 1rem;
        border-radius: 5px;
        text-align: center;
        position: relative;
        cursor: pointer;
        text-decoration: none;
        color: rgb(8, 8, 8);
        line-height: 40px;
    }
    .r-link{
         text-decoration: none;
         color: white;
         text-align: center;
    }
     .wolf:hover { background-color: #df8468;transition: 0.5s; color: white}
    .fa-user-plus {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #fff;
        cursor: pointer;
    }
     .fa-edit {
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: #fff;
        cursor: pointer;
    }
    .legend {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;
    }
    .complete-box {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #35495e;
    }
    .incomplete-box {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #41b883;
    }
    .is-complete {
        background: #35495e;
        color: #fff;
    }
    .add-wolf {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
}

input[type="text"] {
  border: 1px solid #a2aca7;
  padding: 10px;
  border: 1px solid #70a8d6;
  outline: 0; 
}
select {
  border: 1px solid #a2aca7;
  padding: 10px;
  border: 1px solid #70a8d6;
  outline: 0; 
}
.hideEdit{
    display: none;
}
input[type="submit"] {
    border: 1px solid #ccc;
    background: green;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: white;
    text-decoration: none;
}
.remove{
    background: red !important
}
@media (max-width: 730px) {
    .add-wolf {
       grid-template-columns: 1fr !important;
    }
}
    @media (max-width: 500px) {
        .wolves {
            grid-template-columns: 1fr !important;
        }
    }
</style>