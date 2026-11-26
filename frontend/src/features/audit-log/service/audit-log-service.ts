import { apiFetch } from '../../../services/api'
import type { AuditLog } from '../types/audit-log'

export const auditLogService = {

    getAll: () => apiFetch<AuditLog[]>('/audit-logs', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),

    getByEntity: (entity: string, entityId: number) => apiFetch<AuditLog[]>(`/audit-logs?entity=${entity}&entityId=${entityId}`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET'
    }),
}