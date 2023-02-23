import { getSession as _getSession } from '@auth/solid-start'
import { AuthConfig } from '@auth/core/types'
import { ISODateString } from 'next-auth'
import { User } from '~/types'

type Session = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    info?: User
  }
  expires: ISODateString
}
export const getSession: (
  req: Request,
  options: AuthConfig,
) => Promise<Session | null> = _getSession
