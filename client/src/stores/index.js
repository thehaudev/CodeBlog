import {createStore} from "vuex"
import auth from './authModule'
import tags from './tagsModule'
import posts from './postsModule'
import postDetail from './postModule'
import comments from "./commentModule"
const store = createStore({
  modules:{
    postDetail,
    posts,
    tags,
    auth,
    comments
  }
})
export default store