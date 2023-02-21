import { createServerData$, redirect } from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'
import { getSession } from '@auth/solid-start'

export const authRouteData = () => {
  return createServerData$(
    async (_, { request }) => {
      // eslint-disable-next-line
      const session = await getSession(request, authOpts)
      if (session) {
        // @ts-ignore
        throw redirect('/dashboard')
      }
    },
    { key: () => ['auth_user'] },
  )
}
