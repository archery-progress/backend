import Role from '#models/role'
import { CreateRoleSchema } from '#domains/roles/validators/role_validators'

export default class RoleService {
  async create({ name, permissions, structureId }: CreateRoleSchema): Promise<Role> {
    return Role.create({
      name,
      permissions,
      structureId,
    })
  }
}
