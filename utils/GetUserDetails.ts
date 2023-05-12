export const GetUserDetails = () => {
    const userDetails = localStorage.getItem("userPayload")
    if(userDetails){
        return JSON.parse(userDetails);
    }
    return null
}