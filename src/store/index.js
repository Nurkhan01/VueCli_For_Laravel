import {createStore} from 'vuex'
import axios from "axios";

export default createStore({

    actions: {
        async GET_USERS({commit}) {
            try {
                const {
                    status,
                    data
                } = await axios.get('https://back.uib.kz/api/get-users' + '?access-token=' + localStorage.getItem('ACCESS_TOKEN'));

                if (status === 200) {
                    commit("SET_USERS", data)
                }
            } catch (e) {
                return {
                    data: false,
                    error: e.response
                }
            }
        },

        async GET_ROLES({commit}) {
            try {
                const {
                    status,
                    data
                } = await axios.get('https://back.uib.kz/api/get-roles' + '?access-token=' + localStorage.getItem('ACCESS_TOKEN'));

                if (status === 200) {
                    commit("SET_ROLES", data)
                }
            } catch (e) {
                return {
                    data: false,
                    error: e.response
                }
            }
        },
    },
    mutations: {
        SET_USERS(state, data) {
            state.users = data
        },
        SET_ROLES(state, data) {
            state.roles = data
        }
    },
    state: {
        //users: []
        users: [{
            id: 1,
            lastname: '123',
            firstname: '456',
            username: 'admin',
            email: 'admin@gmail.com',
            roles: [
                {
                    id: 1,
                    item_name: 'admin'
                }
            ]
        }],
        roles: [
            {
                id: 1,
                item_name: 'admin'
            },
            {
                id: 2,
                item_name: 'departmentHead'
            }
        ]
    },
    getters: {},
    modules: {}
})
