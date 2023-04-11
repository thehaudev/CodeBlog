import instance from '../configs/axios'


async function follow(followingId){
   try {
    const res = await instance.get('/follow_user/',{
        params:{
            userId:followingId
        }
    })
    if(res.data.data){
        await instance.delete('/follow_user',{
            data:{
                userId:followingId
            }
        })
    }else{
        await instance.post('/follow_user',{
            userId:followingId
        })
    }
   } catch (error) {
        console.log(error)
    }
}
export function useFollow(){
    return {follow}
}