import Structure from '#models/structure'
import { Permissions } from '#app/commons/services/permission_service'
import Member from '#models/member'
import factory from '@adonisjs/lucid/factories'
import Role from '#models/role'

export function RoleFactory(structure: Structure, permissions: Permissions[], member?: Member) {
  return factory
    .define(Role, async ({}) => {
      const bitfield = permissions.reduce((acc, permission) => acc | permission, 0)
      const role = await Role.create({
        structureId: structure.id,
        name: 'role',
        permissions: bitfield,
      })

      if (member) {
        await role.related('members').attach([member.id])
      }

      return role
    })
    .build()
}
