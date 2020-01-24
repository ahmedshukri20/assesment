<template>
    <div>
        <h3>Wolf Packs</h3>
        <div class="wolves">
            <!-- loop all the packs and print -->
            <div class="wolf" v-for="wolfPack in allPacks" :key="wolfPack.id">  
                Name: {{ wolfPack.name }} <br>
                Lat:{{ wolfPack.lat }}<br>
                Lng: {{ wolfPack.lng }}<br>
                  <i @click="viewPack(wolfPack)" class="far fa-eye"></i>
                 <i @click="deletePack(wolfPack.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "WolfPack",
        methods: {
            //get all the needed actions from the state (actions)
            ...mapActions(['fetchPacks', 'deletePack']),

            //function to redirect to the specific wolf whenever the view icon is clicked
            //we pass the specif pack and the id
             viewPack(pack){
                this.$router.push({name: 'pack', params: {id: pack.id, pack:pack}})
            }
        },
        computed: {
            //get all the packs from the state (getter)
            ...mapGetters(['allPacks'])
        },
        created(){
            //do api call to fetch all the packs 
           this.fetchPacks();
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
        background: #bebd4d;
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
     .wolf:hover { background-color: #df8468;transition: 0.5s; color: white}
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