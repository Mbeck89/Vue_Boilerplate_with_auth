import { msalInstance } from '../msalInstance'  
 
import { defineStore, acceptHMRUpdate  } from 'pinia'  
const blankPic = new URL('/src/assets/blankProfile.jpg', import.meta.url)
export const useMsalStore = defineStore('msal', {  
  id: 'msalStore',  
  state: () => ({  
    error: null,  
    user: "",  
    userPicture: null 
  }),  
  // getters: {  
  //   isLoggedIn: (state) => {  
  //     const accounts = msalInstance.getAllAccounts()
  //     console.log(accounts)  
  //     return accounts.length > 0  
  //   }      
  // },  
  actions: {  
    async login() {  
      try {  
        const response = await msalInstance.loginPopup({})           
        return response  
      } catch (e) {  
        this.error = e  
      }  
    },  
    async logout() {
      console.log('logging out')  
      await msalInstance.logoutPopup({  
        mainWindowRedirectUri: `${import.meta.env.VITE_API_BASE_URL}/login`  
      })  
    },  
    getUser() {
      console.log('getuser called')  
      const accounts = msalInstance.getAllAccounts();  
      if (accounts.length > 0) {  
        this.user = accounts[0];  
      }
      return  
    },
    isLoggedIn() {  
      const accounts = msalInstance.getAllAccounts()      
      return accounts.length > 0  
    },        
    async getUserPicture() {
      console.log('pic called')  
      const accessToken =  await this.getToken(['User.Read'])
      try {  
        const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {  
          headers: {  
            Authorization: `Bearer ${accessToken.accessToken}`,  
          },  
        })
        if (!response.ok) {  
          this.userPicture = blankPic
        } else {
          const blob = await response.blob()
          this.userPicture = URL.createObjectURL(blob); 
        }
               
    } catch (e) {
      console.log(e)
      this.userPicture = blankPic
    }  
      
    
      
    },  
    async getToken(scope) {
      const tokenRequest = {  
        scopes: scope,  
        account: this.user 
      }    
      try {        
        const accessToken = await msalInstance.acquireTokenSilent(tokenRequest);  
        return accessToken  
      } catch (e) {  
        const accessToken = await msalInstance.acquireTokenPopup(tokenRequest);  
        return accessToken  
      }  
    }
   
    
  }  
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMsalStore, import.meta.hot))
}

