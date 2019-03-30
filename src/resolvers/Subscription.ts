import { IContext } from '../types/Context'

async function newPostSubscribe(_: any, __: any, { prisma }: IContext) {
  return prisma.$subscribe
    .post({
      mutation_in: ['CREATED'],
    })
    .node()
}

const newPost = {
  subscribe: newPostSubscribe,
  resolve: (payload: any) => payload,
}

export default {
  newPost,
}
