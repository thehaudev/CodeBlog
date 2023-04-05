import instance from '../configs/axios'
import { ref } from "vue";


async function votePost(postId,type){
   try {
    const res = await instance.get('/vote_post/'+postId)
    if(res.data.data){
        await instance.delete('/vote_post',{
            data:{
                postId:postId
            }
        })
    }else{
    await instance.post('/vote_post',{
        postId:postId,
        type:type
    })
   }
} catch (error){
    console.log(error)
   }

}

export function useVotePost(){
    return {votePost}
}