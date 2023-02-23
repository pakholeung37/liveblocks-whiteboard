import clsx from 'clsx'
import { ComponentProps, createSignal, JSXElement, splitProps } from 'solid-js'
import { Group } from '~/types'
import { DashboardHeader } from '~/components/dashboard/dashboard-header'
import { DashboardSidebar } from '~/components/dashboard/dashboard-sidebar'
import styles from './dashboard.module.css'

interface Props extends ComponentProps<'div'> {
  groups: Group[]
  children?: JSXElement
}

export function DashboardLayout(oriProps: Props) {
  const [props, rootProps] = splitProps(oriProps, [
    'class',
    'groups',
    'children',
  ])
  const [$isMenuOpen, setMenuOpen] = createSignal(false)

  const handleMenuClick = () => {
    setMenuOpen(isOpen => !isOpen)
  }

  return (
    <div class={clsx(props.class, styles.container)} {...rootProps}>
      <header class={styles.header}>
        <DashboardHeader isOpen={$isMenuOpen()} onMenuClick={handleMenuClick} />
      </header>
      <aside class={styles.aside} data-open={$isMenuOpen() || undefined}>
        <DashboardSidebar groups={props.groups} />
      </aside>
      <main class={styles.main}>{props.children}</main>
    </div>
  )
}
