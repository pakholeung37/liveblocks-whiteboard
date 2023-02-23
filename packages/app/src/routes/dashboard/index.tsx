import { createServerData$, redirect } from 'solid-start/server'
import { authOpts } from '~/routes/api/auth/[...solidauth]'
import * as Server from '../../lib/server'
import { useRouteData } from 'solid-start'
import { getSession } from '~/utils/get-session'
import { DashboardLayout } from '~/layouts/dashboard/dashboard'
import { DocumentsLayout } from '~/layouts/documents/documents'

export default function Dashboard() {
  const data = useRouteData<typeof routeData>()

  return (
    <DashboardLayout groups={data()?.groups ?? []}>
      <DocumentsLayout filter="all" />
    </DashboardLayout>
  )
}

export const routeData = () => {
  return createServerData$(
    async (_, { request }) => {
      // eslint-disable-next-line
      const session = await getSession(request, authOpts)
      if (!session) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw redirect('/')
      }
      const groups = await Server.getGroups(session?.user?.info?.groupIds ?? [])
      return { groups, session }
    },
    { key: () => ['auth_user_with_group'] },
  )
}
