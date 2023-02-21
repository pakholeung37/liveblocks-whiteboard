import { getSession } from '@auth/solid-start'
import { authOpts } from '~/routes/api/auth/[...solidauth]'

export const getServerSession = (request: any, _res: any) => {
  return getSession(request, authOpts)
}
