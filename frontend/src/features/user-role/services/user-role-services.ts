// features/user-role/services/user-role.service.ts
import { apiFetch } from '../../../services/api'
import type { Role, Permission, UserRole } from '../types/user-role'

export const roleService = {

    getAll: () => apiFetch<Role[]>('/roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    create: (name: string, description?: string) => apiFetch<Role>('/roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ name, description })
    }),

    update: (id: number, name: string, description?: string) => apiFetch<Role>(`/roles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ name, description })
    }),

    remove: (id: number) => apiFetch<void>(`/roles/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}

export const permissionService = {

    getAll: () => apiFetch<Permission[]>('/permissions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),
}

export const rolePermissionService = {

    // permisos que tiene un rol
    getByRole: (roleId: number) => apiFetch<Permission[]>(`/roles/${roleId}/permissions`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    // reemplaza todos los permisos del rol por la lista indicada
    save: (roleId: number, permissionIds: number[]) => apiFetch<void>(`/roles/${roleId}/permissions`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ permissionIds })
    }),
}

export const userRoleService = {

    getAll: () => apiFetch<UserRole[]>('/user-roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    assign: (userId: number, roleId: number) => apiFetch<UserRole>('/user-roles', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ userId, roleId })
    }),

    remove: (userId: number, roleId: number) => apiFetch<void>(`/user-roles/${userId}/${roleId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'DELETE'
    }),
}