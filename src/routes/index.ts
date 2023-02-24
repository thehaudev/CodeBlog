import authRouter from './auth.router'
import userRouter from './users.router'
import postRouter from './posts.router'
import tagRouter from './tags.router'

export function route(app: any) {
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  // app.use('/api/v1/tags', tagsRouter);
  app.use('/api/v1/posts', postRouter);
};


