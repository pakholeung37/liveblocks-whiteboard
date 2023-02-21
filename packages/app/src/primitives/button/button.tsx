import clsx from 'clsx'
import {
  ComponentProps,
  JSXElement,
  mergeProps,
  Ref,
  Show,
  splitProps,
} from 'solid-js'
import styles from './button.module.css'
import { A } from 'solid-start'

interface Props {
  variant?: 'primary' | 'secondary' | 'subtle' | 'destructive'
  icon?: JSXElement
  ref?: Ref<'button'>
}

const defaultProps: Required<Pick<Props, 'variant'>> = {
  variant: 'primary',
}
export const Button = (oriProps: ComponentProps<'button'> & Props) => {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'class',
    'icon',
    'children',
    'variant',
  ])
  return (
    <button
      {...rootProps}
      class={clsx(
        props.class,
        styles.button,
        props.icon && !props.children && styles.iconButton,
        {
          [styles.buttonPrimary]: props.variant === 'primary',
          [styles.buttonSecondary]: props.variant === 'secondary',
          [styles.buttonSubtle]: props.variant === 'subtle',
          [styles.buttonDestructive]: props.variant === 'destructive',
        },
      )}
    >
      <Show when={props.icon}>
        <span class={styles.icon}>{props.icon}</span>
      </Show>
      <Show when={props.children} keyed>
        <span class={styles.label}>{props.children}</span>
      </Show>
    </button>
  )
}

export function LinkButton(oriProps: ComponentProps<typeof A> & Props) {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'class',
    'icon',
    'children',
    'variant',
  ])
  return (
    <A
      {...rootProps}
      class={clsx(
        props.class,
        styles.button,
        props.icon && !props.children && styles.iconButton,
        {
          [styles.buttonPrimary]: props.variant === 'primary',
          [styles.buttonSecondary]: props.variant === 'secondary',
          [styles.buttonSubtle]: props.variant === 'subtle',
          [styles.buttonDestructive]: props.variant === 'destructive',
        },
      )}
    >
      <Show when={props.icon}>
        <span class={styles.icon}>{props.icon}</span>
      </Show>
      <Show when={props.children}>
        <span class={styles.label}>{props.children}</span>
      </Show>
    </A>
  )
}
