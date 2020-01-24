/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Validator } from 'vee-validate';
const state = {
    wolves: []
};

const getters = {
    // getter to get all the wolves from the state
    allWolves: state => {
        return state.wolves
    },
    // getter to get a specific wolf from the state
    wolf: state => id => {
        return state.wolves.find(wolf => wolf.id === id)
    },

    //getter to get wolves that are not in the pack
    //takes an array of wolves as a parameter
    wolvesNotInPack: state => arr => {
        let wolfMen = []
        state.wolves.forEach(wolf => {
            let v = arr.find(wolfy => wolfy.id === wolf.id);
            if (v === undefined) {
                wolfMen.push(wolf)
            }
        });
        return wolfMen;
    },

    //getter to get wolves that are in the pack
    //takes an array of wolves as a parameter
    wolvesInPack: state => arr => {
        let wolfMen = []
        state.wolves.forEach(wolf => {
            let v = arr.find(wolfy => wolfy.id === wolf.id);
            if (v != undefined) {
                wolfMen.push(wolf)
            }
        });
        return wolfMen;
    }
};

//Api configuration
//To be moved to .ENV file
const config = {
    headers: {
        Authorization: "Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6"
    }
};

const actions = {
    async fetchWolf({commit}, id) {
        const response = axios.get(`https://join.wolfpackit.nl/api/v1/packs/${id}`, config)
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
        commit('setWolves', response.data)
    },

    // action to fetch all the wolves
    async fetchWolves({commit}) {
        const response = await axios.get('https://join.wolfpackit.nl/api/v1/wolves', config)
            .catch(function(error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });

        //call mutation to update state
        commit('setWolves', response.data)
    },

    // action to add a wolf
    async addWolf({commit}, wolfdata) {
        //prepare the params before you do the call
        const params = {
            "name": wolfdata.name,
            "gender": wolfdata.gender,
            "birthday": wolfdata.birthday
        }
        console.log(params)
        const response = await axios.post('https://join.wolfpackit.nl/api/v1/wolves', params, config)
            .catch(function(error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });

        //call mutation to update state
        commit('newWolf', response.data)
    },

    // action to update a wolf
    async updateWolf({commit}, wolfdata) {
        //prepare the params before you do the call
        const params = {
            "name": wolfdata.name,
            "gender": wolfdata.gender,
            "birthday": wolfdata.birthday
        }

        const response = await axios.put(`https://join.wolfpackit.nl/api/v1/wolves/${wolfdata.id}`, params, config)
            .catch(function(error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });

        //call mutation to update state
        commit('updWolf', response.data)
    },

    // action to delete a wolf
    async deleteWolf({commit}, id) {
        const response = await axios.delete('https://join.wolfpackit.nl/api/v1/wolves/' + id, config)
            .catch(function(error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });

        //call mutation to update state
        commit('removeWolf', response.data)
    },
};

// mutations to update the state
const mutations = {
    setWolves: (state, wolves) => (state.wolves = wolves),
    removeWolf: (state, wolf) => (state.wolves.splice(wolf.id, 1)),
    newWolf: (state, wolf) => (state.wolves.unshift(wolf)),
    updWolf: (state, wolf) => {
        const index = state.wolves.findIndex(wolf => wolf.id === wolf.id);
        if (index !== -1) {
            state.wolves.splice(index, 1, wolf);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};