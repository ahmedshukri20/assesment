<template>
    <div>
        <h3>Wolves</h3>
        <div class="wolves">
            <!-- loop the wolves array and print -->
            <div class="wolf" v-for="wolf in allWolves" :key="wolf.id">  
                Name: {{ wolf.name }} <br>
                Gender:{{ wolf.gender }}<br>
                DOB: {{ wolf.birthday }}<br>
                 <i @click="viewWolf(wolf)" class="far fa-eye"></i>
                 <i @click="deleteWolf(wolf.id)" class="fas fa-trash-alt"></i>
            </div>
            
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "Wolves",
        methods: {
            //fetch actions needed from the store (actions)
            ...mapActions(['fetchWolves', 'deleteWolf']),

           //function to redirect to the specific wolf whenever the view icon is clicked
            //we pass the specif wolf and the id
            viewWolf(wolf){
                this.$router.push({name: 'wolf', params: {id: wolf.id, wolf:wolf}})
            }
        },
        computed: {
            //gets all the wolves from the state (getters)
            ...mapGetters(['allWolves'])
        },
        created(){
            //fetch all the wolves from the api
            //important when refreshing the page then state is updated imediately
           this.fetchWolves();
        }
    }
</script>

<style scoped>
    .wolves {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
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
        color: rgb(8, 8, 8)
    }
    .r-link{
         text-decoration: none;
         color: white;
         text-align: center;
    }
     .wolf:hover { background-color: #c45331;transition: 0.5s; color: white}
    .fa-trash-alt {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #fff;
        cursor: pointer;
    }
     .fa-eye {
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
    @media (max-width: 500px) {
        .wolves {
            grid-template-columns: 1fr !important;
        }
    }
</style>