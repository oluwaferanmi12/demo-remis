export const saveUserDetails = (userData:{isLoggedIn:boolean}) => {
    userData.isLoggedIn = true
    const userObject = JSON.stringify(userData)
    localStorage.setItem("userPayload" , userObject)
}