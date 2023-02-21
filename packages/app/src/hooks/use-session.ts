import { createContext, Resource, useContext } from 'solid-js'

const SessionContext = createContext<Resource<any | null>>()

export const SessionProvider = SessionContext.Provider

export const useSession = () => {
  return useContext(SessionContext)
}
