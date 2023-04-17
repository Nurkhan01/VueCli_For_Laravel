<template>
    <div class="container">

        <div class="row my-4" v-if="users.length > 0">
            <h4 class="text-center my-3">Пользователи</h4>


            <DataTable :value="users" showGridlines stripedRows
                       :globalFilterFields="['username', 'lastname', 'firstname']"
                       v-model:filters="filters"
                       :paginator="true"
                       :rows="10"
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       :rowsPerPageOptions="[10,20,50]"
                       responsiveLayout="scroll"
                       currentPageReportTemplate="Показано с {first} по {last} из {totalRecords}">

                <template #header>
                    <div class="d-flex">
                      <span class="p-input-icon-left">
                        <i class="pi pi-search"/>
                        <InputText v-model="filters['global'].value" placeholder="Поиск"/>
                      </span>
                    </div>
                </template>
                <Column field="username" header="Логин"></Column>
                <Column field="lastname" header="Фамилия"></Column>
                <Column field="firstname" header="Имя"></Column>
                <Column field="email" header="Email"></Column>
                <Column header="Роли">
                    <template #body="{data}">
                        <ul>
                            <li v-for="(item, index) in data.roles"
                                :key="index">
                                {{ item.item_name }}
                            </li>
                        </ul>
                    </template>
                </Column>
                <Column header="Действие">
                    <template #body="{data}">
                        <Button icon="pi pi-sign-in" label="Войти" @click="sign(data.id)"/>
                    </template>
                </Column>

            </DataTable>


        </div>
    </div>
</template>


<script>
import {FilterMatchMode, FilterOperator} from "primevue/api";
import {mapActions, mapState} from 'vuex'

export default {
    name: "Users",
    data() {
        return {
            loading: true,
            search_username: null,
            users: [{
                id: 1,
                lastname: 'Adminbay',
                firstname: 'Adminbek',
                username: 'admin',
                roles: [
                    {
                    id: 1,
                    item_name: 'admin'
                    }
                ]
            }],
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            },
        }
    },
    computed: {
        //...mapState('organization', ['organizations', 'statuses', 'members', 'membersJoin']),
    },
    methods: {
        //...mapActions(['GET_USERS']),
    },
    async created() {
    }
}
</script>

<style scoped>

</style>
