import clsx from 'clsx'
import { ComponentProps, splitProps } from 'solid-js'
import { GitHubIcon } from '~/icons'
import { LinkButton } from '~/primitives/button/button'
import { Container } from '~/primitives/container/container'
import styles from './marketing-footer.module.css'

export function MarketingFooter(oriProps: ComponentProps<'footer'>) {
  const [props, rootProps] = splitProps(oriProps, ['class'])
  const year = new Date().getFullYear()

  return (
    <footer class={clsx(props.class, styles.footer)} {...rootProps}>
      <Container class={styles.container}>
        <span class={styles.copyright}>© {year} Liveblocks Inc.</span>
        <LinkButton
          href="https://github.com/liveblocks/liveblocks/tree/main/starter-kits/nextjs-starter-kit"
          icon={<GitHubIcon />}
          target="_blank"
          variant="secondary"
        >
          View on GitHub
        </LinkButton>
      </Container>
    </footer>
  )
}
