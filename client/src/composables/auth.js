import axios from "axios";
import { ref } from "vue";
const error = ref(null)
const isPending = ref(false)

async function login(email, password){
    isPending.value = true;
    error.value = null
    try {

        const res = await axios.post('http://localhost:3000/api/v1/auth/login',{
            email:email,password:password
        })
        const {user,auth} = res.data
        return {user,auth}
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}

async function signUp(email, password,displayName){
    isPending.value = true;
    error.value = null
    try {
         await axios.post('http://localhost:3000/api/v1/auth/register',{
            display_name:displayName,email:email,password:password
        })
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}
async function accountRecovery(email){
    isPending.value = true;
    error.value = null
    try {
        const res = await axios.post('http://localhost:3000/api/v1/auth/forgotPassword',{
            email:email
        })
        return res.data
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}


export function useLogin(){
    return {error,isPending,login}
}

export function useSignUp(){
    return {error,isPending,signUp}
}

export function useRecovery(){
    return {error,isPending,accountRecovery}
}


