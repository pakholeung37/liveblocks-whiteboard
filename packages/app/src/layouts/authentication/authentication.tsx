import clsx from 'clsx'
import { ComponentProps, Show, splitProps } from 'solid-js'
import { signIn } from '@auth/solid-start/client'
import { users } from '~/data/users'
import { Button } from '~/primitives/button/button'
import { Select } from '~/primitives/select/select'
import styles from './Authentication.module.css'

interface Props extends ComponentProps<'div'> {
  providers?: any[]
}

export function AuthenticationLayout(oriProps: Props) {
  const [props, rootProps] = splitProps(oriProps, ['providers', 'class'])
  return (
    <div class={clsx(props.class, styles.container)} {...rootProps}>
      <main class={styles.main}>
        <h2 class={styles.title}>Sign in to your account</h2>
        <Show
          when={true}
          fallback={<NextAuthLogin providers={props.providers} />}
        >
          <DemoLogin />
        </Show>
      </main>
      <aside class={styles.aside} />
    </div>
  )
}

function NextAuthLogin({ providers }: Props) {
  if (!providers) {
    return <h4 class={styles.error}>No NextAuth providers enabled</h4>
  }

  return (
    <div class={styles.actions}>
      <Button onClick={() => signIn('github')}>Sign in with Github</Button>
    </div>
  )
}

// === EVERYTHING BELOW ONLY NECESSARY FOR DEMO AUTH ===========================

function DemoLogin() {
  return (
    <div class={styles.actions}>
      <Select
        items={users.map(user => ({ value: user.id, title: user.name }))}
        onChange={email => {
          signIn('credentials', { email })
        }}
        placeholder="Choose a profile…"
      />
    </div>
  )
}
