<script setup>
import { RouterView, useRouter } from 'vue-router'
import { computed, watchEffect, ref } from 'vue'
import { useMsalStore } from '@/stores/msal'


const msal = useMsalStore()


// Handles the display of the navbar depending of the route
function navbar() {
  const doNot = ['/login', '/logout']
  const route = useRouter()
  const showNav = computed(() => {
  const check = doNot.find(path => path === route.currentRoute.value.path)
    if (check === undefined) {
      return true
    } else return false
  })
  return {showNav}
}
const {showNav} = navbar()
// Menu on UserIcon
const menu = ref();
const items = ref([
    {
        label: "Options",
        items: [
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => {msal.logout()}
            },
            {
                label: 'Settings',
                icon: 'pi pi-cog'
                
            }
        ]
    }
]);
watchEffect(() => {
  if (msal.user.name) {
    items.value = [
      {
        label: msal.user.name,
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {msal.logout()}
          },
          {
            label: 'Settings',
            icon: 'pi pi-cog'
          }
        ]
      }
    ];
  }
});
const toggle = (event) => {
    menu.value.toggle(event);
};


</script>

<template>
  <div class="layout" :class="{ noNavbar: !showNav }">
   
    <Toolbar v-if="showNav" class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--bluegray-500), var(--bluegray-800))">
      <template #start>
        <div class="text-white">My Demo App</div>
      </template>
     
      <template #end>
        <div class="flex align-items-center gap-2">
            <Avatar :image="msal.userPicture" shape="circle" @click="toggle"/>            
            <!-- <span class="font-bold text-bluegray-50">{{msal.user.name}}</span> -->            
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />            
        </div>
        
      </template>
    </Toolbar>
   

  <RouterView v-slot="{ Component }" class="main">
    <template v-if="Component">
      <Transition name="slide-fade" mode="out-in">
       <KeepAlive>
        <Suspense> 
          <!-- main content -->
          <component :is="Component"></component>

           <!-- loading state -->
           <template #fallback>
            Loading...
          </template>
        </Suspense>
      </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</div>
</template>

<style>
html,
body {  
  padding: 0;
  margin: 0;
  -webkit-text-size-adjust: none;
  /* for iOS Safari */
  text-size-adjust: none;
  /* for other mobile browsers */
  font-family: var(--font-family);
  font-weight: normal;
  background: var(--surface-ground);
  color: var(--text-color);    
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

*,
*::before,
*::after {
  box-sizing: border-box;

}

img {
  display: block;
  max-width: 100%;
}

.layout {
  display: grid;
  position: relative;
  grid-template-areas:
    "navigation navigation"
    "main main";
  grid-template-columns: 1fr;
  grid-template-rows: 75px 1fr;
  min-height: 100%;
}

.navbar {
  grid-area: navigation;
  /* width: 100%; */
}

.main {
  grid-area: main;
  position: absolute;
  inset: 0;
}

.noNavbar {
  grid-template-columns: 1fr;
  grid-template-areas: "main";
  height: 100%
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
