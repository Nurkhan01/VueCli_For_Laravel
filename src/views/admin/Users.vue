<template>
    <div class="container">

        <div class="row my-4">
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
                        <Button severity="warning" icon="pi pi-user-edit" @click="openRolesDialog(data.id)" rounded/>
                    </template>
                </Column>

            </DataTable>


            <Dialog v-model:visible="rolesDialogDisplay" modal header="Роли" :style="{ width: '50vw' }"
                    :breakpoints="{ '960px': '75vw', '641px': '100vw' }">
                <!--                <ul>-->
                <!--                    <li v-for="(item, index) in userRoles"-->
                <!--                        :key="index">-->
                <!--                        {{ item }}-->
                <!--                        <Dropdown v-model="item.id" optionValue="id" :options="roles" optionLabel="item_name" class="w-full md:w-14rem" />-->
                <!--                    </li>-->
                <!--                </ul>-->
                <div class="row">
                    <div class="col-md-12">
                        <DataTable class="p-datatable-sm" showGridlines stripedRows :value="users.find(i=>i.id == userId).roles"
                                   tableStyle="min-width: 50rem">

                            <template #header>
                                <div class="d-flex">
                                    <Button label="Добавить роль" icon="pi pi-plus" @click="addRole()" rounded/>
                                </div>
                            </template>
                            <Column header="Название" style="width: 25%">
                                <template #body="{data, index}">
                                    <span v-if="data.item_name != null">{{data.item_name}}</span>
                                    <span v-else>
                                        <Dropdown @change="changeRole(index, $event)" optionValue="id" :options="roles"
                                                  optionLabel="item_name" placeholder="Выберите роль" class="w-full md:w-14rem" />
                                    </span>
                                </template>
                            </Column>
                            <Column header="Удалить" style="width: 25%">
                                <template #body="{data, index}">
                                    <Button severity="danger" icon="pi pi-trash" @click="deleteRole(data.id, index)" rounded/>
                                </template>
                            </Column>
                        </DataTable>
                    </div>

                </div>


                <template #footer>
                    <!--                    <Button label="No" icon="pi pi-times" @click="visible = false" text />-->
                    <!--                    <Button label="Yes" icon="pi pi-check" @click="visible = false" autofocus />-->
                </template>
            </Dialog>


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
            // users: [{
            //     id: 1,
            //     lastname: 'Adminbay',
            //     firstname: 'Adminbek',
            //     username: 'admin',
            //     roles: [
            //         {
            //         id: 1,
            //         item_name: 'admin'
            //         }
            //     ]
            // }],
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            },
            rolesDialogDisplay: false,
            userId: null
        }
    },
    computed: {
        ...mapState(['users', 'roles']),
    },
    methods: {
        ...mapActions(['GET_USERS', 'GET_ROLES']),
        changeRole(index, e) {
            console.log(index, 'index')
            console.log(e, 'EVENT')
            console.log(e.value, 'EVENT value')
            let roleIndex = index
            let roleId = e.value
            let roleName = e.originalEvent.target.ariaLabel

            if (this.users.find(i=>i.id == this.userId).roles.find(i=>i.id == roleId)) {
                console.log('Роль уже есть')
            }
            else {
                this.users.find(i=>i.id == this.userId).roles[roleIndex].id = roleId
                this.users.find(i=>i.id == this.userId).roles[roleIndex].item_name = roleName
            }

            console.log(this.users.find(i=>i.id == this.userId), 'user')

        },
        deleteRole(id, index) {
            if (id) {
                this.DELETE_ROLE()
            }
            else {
                this.users.find(i=>i.id == this.userId).roles.splice(index, 1)
            }

        },
        addRole() {
            this.users.find(i=>i.id == this.userId).roles.push({
                id: null,
                item_name: null
            })
            console.log(this.users.find(i=>i.id == this.userId), 'user')
        },
        openRolesDialog(userId) {
            this.rolesDialogDisplay = true
            this.userId = userId
        },
        closeRolesDialog() {
            this.rolesDialogDisplay = false
        }
    },
    async created() {
        await this.GET_USERS()
        await this.GET_ROLES()
    }
}
</script>

<style scoped>

</style>
