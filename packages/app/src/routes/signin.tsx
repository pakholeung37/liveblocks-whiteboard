import { AuthenticationLayout } from '~/layouts/authentication/authentication'
import { useRouteData } from 'solid-start'
import { authRouteData } from '~/routes/_shared'

export const routeData = authRouteData
export default function SignIn() {
  useRouteData<typeof routeData>()
  return (
    <>
      {/*<div>{data()}</div>*/}
      <AuthenticationLayout providers={[]} />
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = await Server.getServerSession(req, res)
//
//   // If logged in, go to dashboard
//   if (session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }
//
//   // Get NextAuth providers from your [...nextAuth.ts] file
//   const providers = await getProviders()
//
//   return {
//     props: { providers },
//   }
// }
