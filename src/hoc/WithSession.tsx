import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function withSession<P>(
  WrappedComponent: React.ComponentType<P>
): (props: P) => JSX.Element {
  return (props: P) => {
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!session && !loading) {
        router.push('/login')
      }
    })
    return (
      <main>
        {!loading && session && (
          <header>
            <span>
              <small>Signed in as: </small>
              <strong>{session.user.email || session?.user.name}</strong>
              <img src={session.user.image} />
            </span>
          </header>
        )}
        <WrappedComponent {...props} />
      </main>
    )
  }
}
