import { IContext } from '../types/Context'

async function user(parent: any, args: any, { prisma }: IContext) {
  const { id } = parent
  const user = await prisma.post({ id }).user()
  return user
}

async function category(parent: any, args: any, { prisma }: IContext) {
  const { id } = parent
  const category = await prisma.post({ id }).category()
  return category
}

async function task(parent: any, args: any, { prisma }: IContext) {
  const { id } = parent
  return prisma.post({ id }).task()
}

export default {
  user,
  category,
  task
}
