import {createStore} from "vuex"
import auth from './authModule'
import tags from './tagsModule'
import posts from './postsModule'
import postDetail from './postModule'
import comments from "./commentModule"
import users from "./userModule"
const store = createStore({
  modules:{
    users,
    postDetail,
    posts,
    tags,
    auth,
    comments
  }
})
export default store