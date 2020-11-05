import { signIn, signOut, useSession } from 'next-auth/client'

const Login = () => {
  const [session, loading] = useSession()
  return !loading && !session ? (
    <a
      href="api/auth/signin"
      onClick={(e) => {
        e.preventDefault()
        signIn('google')
      }}
    >
      Login
    </a>
  ) : (
    <a
      href="api/auth/signout"
      onClick={(e) => {
        e.preventDefault()
        signOut()
      }}
    >
      Logout
    </a>
  )
}

export default Login
