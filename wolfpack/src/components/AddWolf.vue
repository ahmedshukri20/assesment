<template>
  <div class="padding">
      <h3>
         <p>Add a Wolf</p>
         
         <div>
            <form @submit="onSubmit" >
                <div class="add-wolf">
                    <input type="text" v-validate="'required'" :class="{'has-error': errors.has('name')}" name="name" v-model="wolfData.name" placeholder="Enter Name">
                    <input type="text" v-validate="'required'" :class="{'has-error': errors.has('gender')}" name="gender" v-model="wolfData.gender" placeholder="Enter Gender">
                    <input type="text"  v-validate="'required|date_format:yyyy-MM-dd'" :class="{'has-error': errors.has('birthday')}" name="birthday" v-model="wolfData.birthday" placeholder="Enter Birthday (yyyy-MM-dd)">
                    <input type="submit" value="submit">
                 </div>
            </form>
         </div>
            
            <div>
               <p class="error-label" v-if="errors.has('name') || errors.has('gender') || errors.has('birthday') ">Please fill the required fields!</p>
            </div>
      </h3>
  </div>
</template>

<script>

import {mapActions} from 'vuex';

export default {
    name: "AddWolf",
    data() {
        return {
          wolfData:{
              name: '',
              gender: '',
              birthday: ''
          }
        }
    },

    methods: {
       // get actions to add a wolf
      ...mapActions(["addWolf"]),

      //on form submit function add wolf to db
      onSubmit(e){
        //prevent form to refresh page
        e.preventDefault();
          // check if any validations first
        this.$validator.validateAll().then((result) => {

           //if no validations
            if (result){

            //check if all the fields are field in
            if (this.wolfData.name && this.wolfData.gender && this.wolfData.birthday) {

               // call function to do the api call
                this.addWolf(this.wolfData);

                // reset the form
                e.target.reset()
                return true;
              }
            }
        }).catch(() => {
          return false
        });
    }},
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

input[type="text"] {
  /* border: 1px solid #a2aca7; */
  padding: 10px;
  border: 1px solid #70a8d6;
  outline: 0; 
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
</style>