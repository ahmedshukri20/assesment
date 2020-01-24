//this module will only deal with all the logic for the Packs
import axios from 'axios';

const state = {
    packs: []
};

const getters = {
    // getter to get all the packs
    allPacks: state => {
        return state.packs
      },
    
    //  getter to get a specific pack
    //  takes the id as a parameter and will in return get the item from the state 
    wolfPack: state => id => {
        return state.packs.find(pack => pack.id === id)
    }
};

//Api configuration
//To be moved to .ENV file
const config = {
    headers: { Authorization: "Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6" }
};

// a seperate function to fetch packs 
// can be executed whenever needed without interfering with the state
async function fetchPack(id){
    return await axios.get(`https://join.wolfpackit.nl/api/v1/packs/${id}`, config)
    .catch(function (error) {
        if (error.response) {
          // Request made and server responded
        } else if (error.request) {
          // The request was made but no response was received
        } else {
          // Something happened in setting up the request that triggered an Error
        }
      });
}

const actions = {
    async fetchPacks({commit}){
        const response = await axios.get('https://join.wolfpackit.nl/api/v1/packs', config)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
            } else {
              // Something happened in setting up the request that triggered an Error
            }
          });

           //call mutation to update state
            commit('setPacks', response.data)
    },
    async deletePack({commit}, id){
        const response = await axios.delete(`https://join.wolfpackit.nl/api/v1/packs/${id}`, config)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
            } else {
              // Something happened in setting up the request that triggered an Error
            }
          });

           //call mutation to update state
            commit('removePack', response.data)
    },
    async updatePack({commit}, packdata){

        //prepare the params before you do the call
        const params = {
            "name":packdata.name, "lat":packdata.lat, "lng":packdata.lng
        }

        const response = await axios.put(`https://join.wolfpackit.nl/api/v1/packs/${packdata.id}`, params, config)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
            } else {
              // Something happened in setting up the request that triggered an Error
            }
          });

           //call mutation to update state
            commit('updWolf', response.data)
    },
    async addPack({commit}, packdata){

        //prepare the params before you do the call
        const params = {
            "name":packdata.name, "lat":packdata.lat, "lng":packdata.lng
        }
        const response = await axios.post('https://join.wolfpackit.nl/api/v1/packs', params, config)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
            } else {
              // Something happened in setting up the request that triggered an Error
            }
        
          });
          
           //call mutation to update state
            commit('newPack', response.data)
    },

    async addWolfToPack({commit},packdata){
        await axios.post(`https://join.wolfpackit.nl/api/v1/packs/${packdata.id}/wolf/${packdata.wolf_id}`,'', config)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
            } else {
              // Something happened in setting up the request that triggered an Error
            }
          });
         
           //call mutation to update state
          commit('updPack', fetchPack(packdata.id) )
    },

    async deleteWolfToPack({commit},packdata){
        await axios.delete(`https://join.wolfpackit.nl/api/v1/packs/${packdata.id}/wolf/${packdata.wolf_id}`, config)
        .catch(function (error) {
            if (error.response) {
              // Request made and server responded
            } else if (error.request) {
              // The request was made but no response was received
            } else {
              // Something happened in setting up the request that triggered an Error
            }
          });
         
          //call mutation to update state
          commit('updPack', fetchPack(packdata.id) )
    },
};

// mutations to update the state
const mutations = {
    setPacks: (state, packs) => (state.packs = packs),
    removePack: (state, pack) => (state.packs.splice(pack.id, 1)),
    newPack: (state, pack) => (state.packs.unshift(pack)),
    updPack: (state, pack) => {
        const index = state.packs.findIndex(pack => pack.id === pack.id);
        if (index !== -1) {
            state.wolves.splice(index, 1, pack);
        }
    }
};

export default{
    state,
    getters,
    actions,
    mutations
};