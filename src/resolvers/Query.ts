import { IContext } from '../types/Context'
import { getUserByToken } from '../utils'

async function feed(_: any, args: any, { prisma }: IContext) {
  const { skip, first } = args
  const posts = await prisma.posts({
    skip,
    first,
  })
  return {
    posts,
  }
}

async function me(_: any, __: any, context: IContext) {
  const user = await getUserByToken(context)
  return user
}

async function getCategory(_: any, args: any, { prisma }: IContext) {
  const { id } = args
  const category = await prisma.category({ id })
  return category
}

async function getPost(_: any, args: any, { prisma }: IContext) {
  const { id } = args
  const post = await prisma.post({ id })
  return post
}

export default {
  feed,
  me,
  getCategory,
  getPost
}
