import clsx from 'clsx'
import { ComponentProps } from 'solid-js'
import styles from './Logo.module.css'

export function Logo(props: ComponentProps<'div'>) {
  return (
    <div {...props} class={clsx(props.class, styles.logo)}>
      <svg
        class={styles.mark}
        fill="none"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          d="M21.657 8H2l5.657 5.6v7.733L21.657 8ZM10.343 24H30l-5.657-5.6v-7.733L10.343 24Z"
          fill="currentColor"
          fill-rule="evenodd"
        />
      </svg>
      <span class={styles.wordmark}>Starter Kit</span>
    </div>
  )
}
