import instance from '../configs/axios'
import { ref } from "vue";
const error = ref(null)
const isPending = ref(false)

async function getAllTags(){
    isPending.value = true;
    error.value = null
    try {
        const res = await instance.get('/tags')
        return res.data.data
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}
export function userTags(){
    return {error,isPending,getAllTags}
}