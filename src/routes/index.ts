import authRouter from './auth.router'
import userRouter from './users.router'
import postRouter from './posts.router'
import tagRouter from './tags.router'
import imageRouter from './images.router'
import post_tagRouter from './post_tag.router'
import bookmarkRouter from './bookmarks.router'
import vote_postRouter from './vote_post.router'

export function route(app: any) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/tags', tagRouter);
  app.use('/api/v1/posts', postRouter);
  app.use('/api/v1/images', imageRouter)
  app.use('/api/v1/post_tag', post_tagRouter)
  app.use('/api/v1/bookmarks', bookmarkRouter)
  app.use('/api/v1/vote_post', vote_postRouter)

};


