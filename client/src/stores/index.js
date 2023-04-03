import {createStore} from "vuex"
import auth from './authModule'
import tags from './tagsModule'
import posts from './postsModule'
import postDetail from './postModule'
const store = createStore({
  modules:{
    postDetail,
    posts,
    tags,
    auth,
  }
})
export default store