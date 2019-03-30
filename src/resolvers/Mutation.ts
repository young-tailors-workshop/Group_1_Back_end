import * as Bcrypt from 'bcryptjs'
import { IContext } from '../types/Context'
import { SECRET_JWT, signToken, getUserByToken } from '../utils'

async function createPost(_: any, args: any, { prisma, request }: IContext) {
  try {
    const user = await getUserByToken({ prisma, request })
    const { title, description, categoryID } = args
    const post = await prisma.createPost({
      title,
      description,
      user: {
        connect: {
          id: user.id,
        },
      },
      category: {
        connect: {
          id: categoryID
        }
      }
    })
    return post
  } catch (e) {
    throw e
  }
}

async function createTask(_: any, args: any, { prisma, request }: IContext) {
  try {
    const { content, process, postID } = args
    const task = await prisma.createTask({
      content,
      process,
      post: {
        connect: {
          id: postID,
        },
      },
    })
    return task
  } catch (e) {
    throw e
  }
}

async function editTask(_: any, args: any, { prisma, request }: IContext) {
  try {
    const { content, process, taskID } = args
    const task = await prisma.updateTask({
      data: { content, process },
      where: { id: taskID }
    })
    return task
  } catch (e) {
    throw e
  }
}

async function editPost(_: any, args: any, { prisma, request }: IContext) {
  try {
    const { title, description, postID } = args
    const post = await prisma.updatePost({
      data: { title, description },
      where: { id: postID }
    })
    return post
  } catch (e) {
    throw e
  }
}

async function signUp(_: any, args: any, { prisma }: IContext) {
  try {
    const { username, password, avatar } = args
    const hashPassword = await Bcrypt.hash(password, 10)
    const user = await prisma.createUser({
      username,
      password: hashPassword,
      avatar,
    })

    const token = signToken(user.id)
    return {
      user,
      token,
    }
  } catch (e) {
    throw e
  }
}

async function login(_: any, args: any, { prisma }: IContext) {
  try {
    const { username, password } = args
    const user = await prisma.user({
      username,
    })
    if (!user) {
      throw 'User not exists'
    }
    const verify = await Bcrypt.compare(password, user.password)
    if (!verify) {
      throw 'Wrong password'
    }
    const token = signToken(user.id)
    return {
      user,
      token,
    }
  } catch (e) {
    throw e
  }
}

export default {
  createPost,
  createTask,
  signUp,
  login,
  editPost,
  editTask,
}
