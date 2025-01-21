import User from '#models/user'
import Structure from '#models/structure'
import factory from '@adonisjs/lucid/factories'
import Member from '#models/member'

export function MemberFactory(user: User, structure: Structure) {
  return factory
    .define(Member, async ({}) => {
      return Member.create({
        userId: user.id,
        structureId: structure.id,
      })
    })
    .build()
}
