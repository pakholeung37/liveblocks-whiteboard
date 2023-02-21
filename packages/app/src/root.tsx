// @refresh reload
import { Suspense } from 'solid-js'
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
} from 'solid-start'
import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import './styles/globals.css'
import './root.css'
import { Badge } from '~/components/badge/badge'

const queryClient = new QueryClient()
export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <title>Starter Kit</title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
              <Routes>
                <FileRoutes />
              </Routes>
            </QueryClientProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
        <Badge />
      </Body>
    </Html>
  )
}
