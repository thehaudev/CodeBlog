import {createStore} from "vuex"
import auth from './authModule'
import tags from './tagsModule'
import posts from './postsModule'
const store = createStore({
  modules:{
    posts,
    tags,
    auth,
  }
})
export default store