// import { useMsal } from '../composables/msal' // Pfad zu Ihrer useMsal.js Datei
import { useMsalStore } from '@/stores/msal'
export function registerGuard (router) {
  router.beforeEach(async (to, from, next) => {
    const msal = useMsalStore()
    console.log("is logged in:" + msal.isLoggedIn() + " user is " + msal.user + " pic is " + msal.userPicture)
    if (to.path === '/login') next()
    else {
    if (to.meta.requiresAuth && !msal.isLoggedIn()) {
      console.log('requires auth and is not logged in')
      next('/login')
    } else if (msal.isLoggedIn() && (!msal.user || !msal.userPicture)) {
      console.log('is logged in but no user')
      msal.getUser()
      await msal.getUserPicture()
      next()
    } else
     {
      console.log('next')
      next()
    }}
  })
}
