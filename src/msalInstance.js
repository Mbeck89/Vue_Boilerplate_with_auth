import { PublicClientApplication } from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_CLIENTID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_TENANTID}`,
    redirectUri: `${import.meta.env.VITE_API_BASE_URL}/login/`,
    postLogoutRedirectUri: `${import.meta.env.VITE_API_BASE_URL}/login`
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false
  }
}

export const msalInstance = new PublicClientApplication(msalConfig)
