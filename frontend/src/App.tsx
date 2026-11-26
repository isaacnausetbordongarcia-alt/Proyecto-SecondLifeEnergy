// src/App.tsx
import { useEffect, useState } from 'react'
import AuthPage from './features/auth/pages/AuthPage'
import { clearSession, getSession, SESSION_EVENT } from './services/session'

// Cuando tengas cada página, impórtala aquí y úsala en `pages`:
// import RolePermissionsPage from './features/role-permission/pages/RolePermissionsPage'

type PageId =
  | 'roles'
  | 'permissions'
  | 'user-role'
  | 'role-permissions'
  | 'kit-components'
  | 'article-image'
  | 'invitations'
  | 'stock-movements'

const NAV: { id: PageId; label: string }[] = [
  { id: 'roles', label: 'Roles' },
  { id: 'permissions', label: 'Permisos' },
  { id: 'user-role', label: 'Usuarios y roles' },
  { id: 'role-permissions', label: 'Permisos por rol' },
  { id: 'kit-components', label: 'Componentes del kit' },
  { id: 'article-image', label: 'Imágenes' },
  { id: 'invitations', label: 'Invitaciones' },
  { id: 'stock-movements', label: 'Stock' },
  
]

// Página provisional hasta que exista la real
function Placeholder({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-slate-600">Página pendiente de desarrollar.</p>
    </main>
  )
}

function App() {
  const [session, setSession] = useState(getSession)
  const [page, setPage] = useState<PageId>('roles')

  useEffect(() => {
    const sync = () => setSession(getSession())
    window.addEventListener(SESSION_EVENT, sync)
    return () => window.removeEventListener(SESSION_EVENT, sync)
  }, [])

  useEffect(() => {
    if (!session) return
    const timeout = window.setTimeout(clearSession, Math.max(0, session.expiresAt - Date.now()))
    return () => window.clearTimeout(timeout)
  }, [session])

  if (!session) return <AuthPage />

  // Aquí sustituyes cada Placeholder por tu página real
  const pages: Record<PageId, React.ReactNode> = {
    'roles': <Placeholder title="Roles" />,
    'permissions': <Placeholder title="Permisos" />,
    'user-role': <Placeholder title="Usuarios y roles" />,
    'role-permissions': <Placeholder title="Permisos por rol" />,
    'kit-components': <Placeholder title="Componentes del kit" />,
    'article-image': <Placeholder title="Imágenes de artículos" />,
    'invitations': <Placeholder title="Invitaciones" />,
    'stock-movements': <Placeholder title="Movimientos de stock" />,
  }

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-4">
        <span className="font-semibold text-emerald-700">Second Life Energy · {session.username}</span>
        <button
          type="button"
          onClick={clearSession}
          className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
        >
          Cerrar sesión
        </button>
      </header>

      <nav aria-label="Administración" className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 pt-6 sm:px-6">
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-current={page === id ? 'page' : undefined}
            onClick={() => setPage(id)}
            className={`rounded px-4 py-2 ${page === id ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            {label}
          </button>
        ))}
      </nav>

      {pages[page]}
    </>
  )
}

export default App