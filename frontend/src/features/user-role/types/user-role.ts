export interface Role {
  id: number;
  name: string;
  description?: string | null;
}

export interface Permission {
  id: number;
  code: string;            // p. ej. "users.read"
  description: string | null;
}

export interface UserRole {
  userId: number;
  roleId: number;
}

export interface RolePermissionsPayload {
  roleId: number;
  permissionIds: number[];
}