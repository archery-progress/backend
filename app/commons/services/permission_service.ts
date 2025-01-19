export enum Permissions {
  INTERNAL_PLATFORM = 1 << 0,
  INTERNAL_MANAGER = 1 << 1,

  ADMINISTRATOR = 1 << 10,
  MANAGE_STRUCTURE = 1 << 11,
  MANAGE_ROLES = 1 << 12,
  MANAGE_MEMBERS = 1 << 14,
  VIEW_MEMBERS = 1 << 14,
  MANAGE_PRACTICES = 1 << 15,
  VIEW_LOGS = 1 << 16,
  MANAGE_NOTIFICATIONS = 1 << 17,
}

export class PermissionService {
  async fromBitfield(bitfield: number): Promise<Permissions[]> {
    return Object.entries(Permissions)
      .filter(([_key, value]) => typeof value === 'number' && (bitfield & value) === value)
      .map(([key]) => Permissions[key as keyof typeof Permissions])
  }
}
