import { createServerData$, redirect } from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'
import { getSession } from '~/utils/get-session'

export const authRouteData = () => {
  return createServerData$(
    async (_, { request }) => {
      // eslint-disable-next-line
      const session = await getSession(request, authOpts)
      if (session) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect('/dashboard')
      }
      return session
    },
    { key: () => ['auth_user'] },
  )
}
