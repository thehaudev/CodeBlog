import instance from '../configs/axios'
import { ref } from "vue";
const error = ref(null)
const isPending = ref(false)

async function createComment(postId,content){
    isPending.value = true;
    error.value = null
    try {
        const res = await instance.post('/posts/'+postId+'/comments',{
            content:content
        })
        console.log(res)
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}

export function useComment(){
    return {error,isPending,createComment}
}