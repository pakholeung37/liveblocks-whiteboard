import { useRouteData } from 'solid-start'
import { AuthenticationLayout } from '~/layouts/authentication/authentication'
import { authRouteData } from '~/routes/_shared'

export const routeData = authRouteData
export default function SignIn() {
  const data = useRouteData<typeof routeData>()
  data()
  return <AuthenticationLayout providers={[]} />
}
