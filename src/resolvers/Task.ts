import { IContext } from '../types/Context'

async function post(parent: any, args: any, { prisma }: IContext) {
  const { id } = parent

  const getPost = await prisma.task({ id }).post()
  return getPost
}

export default {
  post
}