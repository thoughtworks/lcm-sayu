import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function withSession<P>(
  WrappedComponent: React.ComponentType<P>,
  roles: ('tutor' | 'enfermero')[]
): (props: P) => JSX.Element {
  return (props: P) => {
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!session && !loading) {
        router.push('/login')
      }

      if (session && !roles.includes(session.rol)) {
        router.push('/_error?error=Unauthorized')
      }
    })
    return (
      <main>
        {!loading && session && (
          <header>
            <span>
              <small>Signed in as: </small>
              <strong>{session.user.email || session?.user.name}</strong>
            </span>
          </header>
        )}
        <WrappedComponent {...props} />
      </main>
    )
  }
}
