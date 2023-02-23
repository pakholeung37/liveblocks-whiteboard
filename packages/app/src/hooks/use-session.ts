// import { createServerData$ } from 'solid-start/server'
// import { authOpts } from '~/routes/api/auth/[...solidauth]'
// import { getSession } from '~/utils/get-session'
import { useRouteData } from 'solid-start'
import { routeData } from '~/routes/dashboard'
import { createMemo } from 'solid-js'

export const useSession = () => {
  // return createServerData$(
  //   async (_, { request }) => {
  //     // eslint-disable-next-line
  //     const session = await getSession(request, authOpts)
  //     return session
  //   },
  //   { key: () => ['auth_user'] },
  // )
  const data = useRouteData<typeof routeData>()
  const session = createMemo(() => data()?.session ?? undefined)
  return session
}
