<template>
<!--  <nav>-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link> |-->
<!--    <router-link to="/admin/users">Users</router-link> |-->
<!--  </nav>-->

    <div class="card relative z-2">
        <Menubar :model="items">
            <template #start>
                <img alt="logo" src="https://primefaces.org/cdn/primevue/images/logo.svg" height="40" class="mr-2" />
            </template>
            <template #end>
                <InputText placeholder="Поиск" type="text" />
            </template>
        </Menubar>
    </div>
  <router-view/>
</template>
<script>
import Menubar from 'primevue/menubar';
export default {
    name: "App",
    components: {
        Menubar
    },
    data() {
        return {
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    to: '/',
                },
                {
                    label: 'About',
                    icon: 'pi pi-fw pi-info-circle',
                    to: '/about',
                },
                {
                    label: 'Users',
                    icon: 'pi pi-fw pi-users',
                    to: '/admin/users',
                }
            ]
        }
    },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  //color: #2c3e50;
}

/*nav {*/
/*  padding: 30px;*/
/*}*/

/*nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>
