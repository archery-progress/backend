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

  async findByStructureId(structureId: string): Promise<Role[]> {
    return Role.query().where('structure_id', structureId)
  }

  async findById(id: string): Promise<Role> {
    return Role.findOrFail(id)
  }

  async deleteById(id: string): Promise<void> {
    const role = await this.findById(id)
    await role.delete()
  }
}
