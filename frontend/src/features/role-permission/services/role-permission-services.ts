// services/role-permission.service.ts
import { apiFetch } from '../../../services/api'
import type { RolePermission } from '../types/role-permission'

export const rolePermissionService = {

    getAll: () => apiFetch<RolePermission[]>('/role-permissions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (data: RolePermission) => apiFetch<RolePermission>('/role-permissions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(data)
    }),

    update: (roleId: number, permissionId: number, newPermissionId: number) =>
        apiFetch<RolePermission>(`/role-permissions/${roleId}/${permissionId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'PUT',
            body: JSON.stringify({ permissionId: newPermissionId })
        }),

    remove: (roleId: number, permissionId: number) =>
        apiFetch<void>(`/role-permissions/${roleId}/${permissionId}`, {
            headers: { 'Content-Type': 'application/json' },
            method: 'DELETE'
        }),
}