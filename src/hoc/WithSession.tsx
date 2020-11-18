import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function withSession<P>(
  WrappedComponent: React.ComponentType<P>,
  roles: 'tutor' | 'enfermero'
): (props: P) => JSX.Element {
  return (props: P) => {
    const [session, loading] = useSession()
    const router = useRouter()

    useEffect(() => {
      if (!session && !loading) {
        router.push('/login')
      }

      if (session && !roles.includes(session.role)) {
        router.push('/_error?error=Unauthorized')
      }
    })
    return <WrappedComponent {...props} />
  }
}

const withSessionServer = (handler: NextApiHandler, roles: Role[]) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!roles.includes(session?.role)) {
      res.status(401)
      res.send(null)
      console.error('Access denied for user', session)
      return
    }

    return handler(req, res)
  }
}

export default withSession
export { withSessionServer }
