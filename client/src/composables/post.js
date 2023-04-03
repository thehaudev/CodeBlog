import instance from '../configs/axios'
import { ref } from "vue";
const error = ref(null)
const isPending = ref(false)

async function createPost(title,content,tags){
    isPending.value = true;
    error.value = null
    try {
        const res = await instance.post('/posts',{
            title:title,
            content:content
        })
        const id = res.data.data._id
        const newTags = tags.map(e=>{
            const obj = {
                postId:id,
                tagId:e
            }
            return obj
        })
        await instance.post('/post_tag',newTags)
    } catch (err) {
        error.value = err.response.data.message
    } finally{
        isPending.value = false
    }
}
export function usePost(){
    return {error,isPending,createPost}
}