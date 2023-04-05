import instance from '../configs/axios'


async function bookmark(id){
   try {
    const res =await instance.get('/bookmarks/'+id)
    if(res.data.data){
        await instance.delete('/bookmarks/'+id)
    }else{
        await instance.post('/bookmarks/'+id)
    }
   } catch (error) {
        console.log(error)
    }
}
export function useBookmark(){
    return {bookmark}
}