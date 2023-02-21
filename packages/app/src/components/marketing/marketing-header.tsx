import clsx from 'clsx'
import { ComponentProps } from 'solid-js'
import { signIn } from '@auth/solid-start/client'
import { SignInIcon } from '~/icons'
import { Button } from '~/primitives/button/button'
import { Container } from '~/primitives/container/container'
import { Logo } from '../logo/logo'
import styles from './marketing-header.module.css'
import { A } from 'solid-start'

export function MarketingHeader(props: ComponentProps<'header'>) {
  return (
    <header {...props} class={clsx(props.class, styles.header)}>
      <Container class={styles.container}>
        <A href="/">
          <Logo />
        </A>
        <Button icon={<SignInIcon />} onClick={() => signIn()}>
          Sign in
        </Button>
      </Container>
    </header>
  )
}
