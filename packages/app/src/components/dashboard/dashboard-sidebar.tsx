import clsx from 'clsx'
import { ComponentProps, createMemo, Index, splitProps } from 'solid-js'
import { useLocation } from 'solid-start'
import {
  DASHBOARD_DRAFTS_URL,
  DASHBOARD_GROUP_URL,
  DASHBOARD_URL,
} from '~/constants'
import { FileIcon, FolderIcon } from '~/icons'
import { LinkButton } from '~/primitives/button/button'
import { Group } from '~/types'
import { normalizeTrailingSlash } from '~/utils'
import styles from './dashboard-sidebar.module.css'

interface Props extends ComponentProps<'div'> {
  groups: Group[]
}

interface SidebarLinkProps
  extends Omit<ComponentProps<typeof LinkButton>, 'href'> {
  href: string
}

function SidebarLink(oriProps: SidebarLinkProps) {
  const [props, rootProps] = splitProps(oriProps, ['href', 'class', 'children'])
  const location = useLocation()
  const $isActive = createMemo(
    () => location.pathname === normalizeTrailingSlash(props.href),
  )

  return (
    <LinkButton
      class={clsx(props.class, styles.sidebarLink)}
      data-active={$isActive() || undefined}
      href={props.href}
      variant="subtle"
      {...rootProps}
    >
      {props.children}
    </LinkButton>
  )
}

export function DashboardSidebar(oriProps: Props) {
  const [props, rootProps] = splitProps(oriProps, ['groups', 'class'])
  return (
    <div class={clsx(props.class, styles.sidebar)} {...rootProps}>
      <nav class={styles.navigation}>
        <div class={styles.category}>
          <ul class={styles.list}>
            <li>
              <SidebarLink href={DASHBOARD_URL} icon={<FileIcon />}>
                All
              </SidebarLink>
            </li>
            <li>
              <SidebarLink href={DASHBOARD_DRAFTS_URL} icon={<FileIcon />}>
                Drafts
              </SidebarLink>
            </li>
          </ul>
        </div>
        <div class={styles.category}>
          <span class={styles.categoryTitle}>Groups</span>
          <ul class={styles.list}>
            <Index each={props.groups}>
              {group => {
                return (
                  <li>
                    <SidebarLink
                      href={DASHBOARD_GROUP_URL(group().id)}
                      icon={<FolderIcon />}
                    >
                      {group().name}
                    </SidebarLink>
                  </li>
                )
              }}
            </Index>
          </ul>
        </div>
      </nav>
    </div>
  )
}
