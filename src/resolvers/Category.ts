import { IContext } from '../types/Context'

async function posts(parent: any, args: any, { prisma }: IContext) {
  const { id } = parent
  return prisma.category({ id }).posts()
}

export default {
  posts,
}
