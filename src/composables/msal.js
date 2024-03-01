// import { ref, onMounted } from 'vue'
// import { msalInstance } from '../msalInstance'
// import router from '@/router'



// export function useMsal () {

//   const error = ref(null)
//   const user = ref(null)
//   const userPicture = ref(null)

//   async function login () {
//     try {
//       console.log('login called')
//       const response = await msalInstance.loginPopup({})
//       router.push('/')
//       return response
//     } catch (e) {
//       console.log(e)
//       error.value = e
//     }
//   }

//   async function logout () {
//     //const logoutHint = await msalInstance.accounts[0].idTokenClaims.login_hint
//     await msalInstance.logoutPopup({
//       //logoutHint: logoutHint,
//       mainWindowRedirectUri: `${import.meta.env.VITE_API_BASE_URL}/logout`
//     })
//   }
//   function isLoggedIn () {
//     const accounts = msalInstance.getAllAccounts()
//     console.log(accounts)
//     return accounts.length > 0
//   }

//   function getUser() {
//     console.log("get user was cvalled")
//     const accounts = msalInstance.getAllAccounts();
//     if (accounts.length > 0) {
//       user.value = accounts[0];
//     }
//   }

//   const getUserPicture = async () => {
//     console.log("get userpic was cvalled")
//     const accessToken =  getToken(['User.Read'])
//     const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const blob = await response.blob();
//     userPicture.value = URL.createObjectURL(blob);
//   };

//   const getToken = async (scope) => {
//     // scope is like ['User.Read']
//     try {
//       const tokenRequest = {
//         scopes: scope,
//         account: user.value,
//       }
//       const accessToken = await msalInstance.acquireTokenSilent(tokenRequest);
//       return accessToken
//   } catch (e) {
//     const accessToken = await msalInstance.acquireTokenPopup(tokenRequest);
//     return accessToken
//   }
//   }

//   onMounted(async () => {
//     if (isLoggedIn) {
//       if(!user.value || !userPicture.value) {
//         getUser();
//         await getUserPicture();
//       }      
//     } else {
//       await msalInstance.loginPopup({})
//       getUser();
//       await getUserPicture();
//     }
//   });

//   return { login, logout, error, isLoggedIn, getUser, user, userPicture }
// }
