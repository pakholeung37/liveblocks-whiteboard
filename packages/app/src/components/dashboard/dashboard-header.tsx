import clsx from 'clsx'
import { ComponentProps, JSX, Show, splitProps } from 'solid-js'
import { CrossIcon, MenuIcon, SignOutIcon } from '~/icons'
import { Button } from '~/primitives/button/button'
import { Avatar } from '~/primitives/avatar/avatar'
import { Popover } from '~/primitives/popover/popover'
import { Logo } from '../logo/logo'
import styles from './dashboard-header.module.css'
import { useSession } from '~/hooks/use-session'
import { A } from 'solid-start'
import { signOut } from '@auth/solid-start/client'

interface Props extends ComponentProps<'header'> {
  isOpen: boolean
  onMenuClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
}

export function DashboardHeader(oriProps: Props) {
  const [props, rootProps] = splitProps(oriProps, [
    'class',
    'isOpen',
    'onMenuClick',
  ])
  const session = useSession()
  return (
    <header class={clsx(props.class, styles.header)} {...rootProps}>
      <div class={styles.menu}>
        <button class={styles.menuToggle} onclick={props.onMenuClick}>
          <Show when={props.isOpen} fallback={<MenuIcon />}>
            <CrossIcon />
          </Show>
        </button>
      </div>
      <div class={styles.logo}>
        <A href="/" class={styles.logoLink}>
          <Logo />
        </A>
      </div>
      <div class={styles.profile}>
        <Popover
          placement="bottom-end"
          gutter={6}
          content={
            <div class={styles.profilePopover}>
              <div class={styles.profilePopoverInfo}>
                <span class={styles.profilePopoverName}>
                  {session()?.user?.info?.name}
                </span>
                <span class={styles.profilePopoverId}>
                  {session()?.user?.info?.id}
                </span>
              </div>
              <div class={styles.profilePopoverActions}>
                <Button
                  class={styles.profilePopoverButton}
                  icon={<SignOutIcon />}
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </div>
            </div>
          }
        >
          <div class={styles.profileButton}>
            <Avatar
              class={styles.profileAvatar}
              name={session()?.user?.info?.name ?? 'Anonymous'}
              size={32}
              src={session()?.user?.info?.avatar}
            />
          </div>
        </Popover>
      </div>
    </header>
  )
}
