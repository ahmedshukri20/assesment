<template>
     <div>
        <h3>Wolf Member</h3>
        <div class="wolves">
            
            <div class="wolf">  
                Name: {{ wolf.name }} <br>
                Gender:{{ wolf.gender }}<br>
                DOB: {{ wolf.birthday }}<br>

                <div class="">
                   <i class="fas fa-edit" v-on:click="showEditForm()"></i>
                </div>
                 
            </div>

            <form v-if="!hideEdit"  @submit="editWolf" >
                <div class="add-wolf">
                    <input type="text" v-validate="'required'" name="name" :class="{'has-error': errors.has('name')}" v-model="wolf.name" placeholder="Enter Name">
                    <input type="text" v-validate="'required'" name="gender" :class="{'has-error': errors.has('gender')}" v-model="wolf.gender" placeholder="Enter Gender">
                    <input type="text" v-validate="'required|date_format:yyyy-MM-dd'"  name="birthday" :class="{'has-error': errors.has('birthday')}" v-model="wolf.birthday" placeholder="Enter Birthday">
                    <input type="submit" value="Update">
                 </div>
                  <div>
               <p class="error-label" v-if="errors.has('name') || errors.has('gender') || errors.has('birthday') ">Please fill the required fields!</p>
            </div>
            </form>
           
        </div>
        
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import axios from 'axios';
    
    export default {
        name: "Wolf",
        data() {
            return {
                hideEdit: true,
                hideAddToPack: true,
                wolf: {
                    id: '',
                    name: '',
                    gender: '',
                    birthday: ''
                }
            }
        },
        methods: {
             ...mapActions(["updateWolf", "fetchWolf"]),

             //onclick show add to pack form
            showAddtPackForm(){
                this.hideAddToPack = !this.hideAddToPack;
                this.hideEdit = true
            },

            //on click show edit form
             showEditForm(){
                this.hideEdit = !this.hideEdit;
                this.hideAddToPack = true
            },

            //function to edit a wolf and update
             editWolf(e) {
                 e.preventDefault();

                //  check for validation errors first
                this.$validator.validateAll().then((result) => {
                    if(result){
                          if (this.wolf.name && this.wolf.gender && this.wolf.birthday) {
                            this.updateWolf(this.wolf);
                            e.target.reset()
                            return true;
                        }
                    }}).catch(() => {
                        return false
                });
            },

            // function to fetch a wolf
            //This should happen in the store (to be transfered)
            async fetchWolf(id){
                const config = {headers: { Authorization: "Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6" }};
                const response = await axios.get(`https://join.wolfpackit.nl/api/v1/wolves/${id}`, config);

                return response.data;
            },
        },
        mounted(){
            //when component is mounted get the wolf using the params
            this.fetchWolf(this.$route.params.id).then((response) => {
                this.wolf.id = response.id;
                this.wolf.name = response.name;
                this.wolf.gender = response.gender;
                this.wolf.birthday = response.birthday;
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
.add-wolf {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
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
        background: #70a8d6;
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
     .wolf:hover { background-color: #c45331;transition: 0.5s; color: white}
    
     .fa-edit {
        position: absolute;
        bottom: 10px;
        right: 10px;
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
  /* border: 1px solid #a2aca7; */
  padding: 10px;
  border: 1px solid #70a8d6;
  outline: 0; 
}

.hideEdit{
    display: none;
}
input[type="submit"] {
    border: 1px solid #ccc;
    background: #70a8d6;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: white;
    text-decoration: none;
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