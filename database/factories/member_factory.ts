import User from '#models/user'
import Structure from '#models/structure'
import factory from '@adonisjs/lucid/factories'
import Member from '#models/member'
import { Permissions } from '#app/commons/services/permission_service'

export function MemberFactory(user: User, structure: Structure, permissions?: Permissions[]) {
  return factory
    .define(Member, async ({}) => {
      return Member.create({
        userId: user.id,
        structureId: structure.id,
        permissions: permissions ? permissions.reduce((acc, permission) => permission | acc, 0) : 0,
      })
    })
    .build()
}
