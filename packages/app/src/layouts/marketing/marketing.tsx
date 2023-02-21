import clsx from 'clsx'
import { ComponentProps } from 'solid-js'
import { MarketingHeader } from '~/components/marketing/marketing-header'
import { MarketingFooter } from '~/components/marketing/marketing-footer'
import styles from './marketing.module.css'

export function MarketingLayout(props: ComponentProps<'div'>) {
  return (
    <div class={clsx(props.class, styles.layout)} {...props}>
      <MarketingHeader />
      <main>{props.children}</main>
      <MarketingFooter class={styles.footer} />
    </div>
  )
}
