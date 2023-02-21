import clsx from 'clsx'
import { ComponentProps } from 'solid-js'
import styles from './badge.module.css'

export function Badge(props: Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <a
      class={clsx(props.class, styles.badge)}
      href="https://liveblocks.io"
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      <picture>
        <source
          src-set="https://liveblocks.io/badge-dark.svg"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="https://liveblocks.io/badge-dark.svg"
          alt="Made with Liveblocks"
          class={styles.image}
        />
      </picture>
    </a>
  )
}
