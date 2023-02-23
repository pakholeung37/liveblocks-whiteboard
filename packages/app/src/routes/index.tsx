import { MarketingLayout } from '~/layouts/marketing/marketing'
import { Container } from '~/primitives/container/container'
import styles from './index.module.css'
import { Button, LinkButton } from '~/primitives/button/button'
import { SignInIcon } from '~/icons'
import { ComponentProps, JSX, splitProps } from 'solid-js'
import clsx from 'clsx'
import { authRouteData } from '~/routes/_shared'
import { useRouteData } from 'solid-start'

export const routeData = authRouteData
export default function Index() {
  const data = useRouteData<typeof routeData>()
  data()
  return (
    <MarketingLayout>
      <Container class={styles.section}>
        <div class={styles.heroInfo}>
          <h1 class={styles.heroTitle}>
            Kickstart your collaborative&nbsp;app
          </h1>
          <p class={styles.heroLead}>
            Use the Liveblocks Starter Kit to build your document-based
            collaborative app in&nbsp;minutes.
          </p>
        </div>
        <div class={styles.heroActions}>
          <Button icon={<SignInIcon />} onClick={() => {}}>
            Sign in
          </Button>
          <LinkButton
            href="https://liveblocks.io/docs/guides/nextjs-starter-kit"
            target="_blank"
            variant="secondary"
          >
            Learn more
          </LinkButton>
        </div>
      </Container>
      <Container class={styles.section}>
        <h2 class={styles.sectionTitle}>Features</h2>
        <div class={styles.featuresGrid}>
          <Feature
            description={
              <>
                A collaborative whiteboard app with included share menu,
                documents listing, users, groups, permissions, and more.
              </>
            }
            title="Liveblocks"
          />
          <Feature
            description={
              <>
                Best practices followed, using a mixture of SSR and custom API
                endpoints. Modify documents from both client and server.
              </>
            }
            title="Next.js"
          />
          <Feature
            description={
              <>
                Adjust our reusable interface & design system to fit your needs.
              </>
            }
            title="User Interface"
          />
          <Feature
            description={
              <>
                All custom client and server functions are fully typed, and easy
                to update.
              </>
            }
            title="TypeScript"
          />
          <Feature
            description={
              <>
                Complete authentication, compatible with any NextAuth provider,
                including GitHub, Google, Auth0, and many more.
              </>
            }
            title="NextAuth.js"
          />
          <Feature
            description={
              <>
                See data update live using the SWR (state-while-revalidate)
                library.
              </>
            }
            title="SWR"
          />
        </div>
      </Container>
    </MarketingLayout>
  )
}

interface FeatureProps extends Omit<ComponentProps<'div'>, 'title'> {
  description: JSX.Element
  title: JSX.Element
}

function Feature(oriProps: FeatureProps) {
  const [props, rootProps] = splitProps(oriProps, ['title', 'description'])
  return (
    <div {...rootProps} class={clsx(rootProps.class, styles.featuresFeature)}>
      <h4 class={styles.featuresFeatureTitle}>{props.title}</h4>
      <p class={styles.featuresFeatureDescription}>{props.description}</p>
    </div>
  )
}
