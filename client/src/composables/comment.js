import instance from '../configs/axios'
import { ref } from "vue";
const error = ref(null)
const isPending = ref(false)

async function createComment(inReplyToComment,inReplyToUser,postId,content){
    isPending.value = true;
    error.value = null
    try {
        console.log(inReplyToComment,inReplyToUser)
        const res = await instance.post('/posts/'+postId+'/comments',{
            content:content,inReplyToComment:inReplyToComment,inReplyToUser:inReplyToUser
        })
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}

export function useComment(){
    return {error,isPending,createComment}
}