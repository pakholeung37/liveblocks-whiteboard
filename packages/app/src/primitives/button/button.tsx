import clsx from 'clsx'
import {
  ComponentProps,
  JSXElement,
  mergeProps,
  Ref,
  Show,
  splitProps,
  children as memo,
} from 'solid-js'
import styles from './button.module.css'
import { A } from 'solid-start'
import { Dynamic } from 'solid-js/web'

interface Props {
  variant?: 'primary' | 'secondary' | 'subtle' | 'destructive'
  icon?: JSXElement
  ref?: Ref<'button'>
  as?: string
}

const defaultProps: Required<Pick<Props, 'variant'>> = {
  variant: 'primary',
}
export const Button = (oriProps: ComponentProps<'button'> & Props) => {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'as',
    'class',
    'icon',
    'children',
    'variant',
  ])
  const icon = memo(() => props.icon)
  const children = memo(() => props.children)
  return (
    <Dynamic
      component={props.as || 'button'}
      {...rootProps}
      class={clsx(
        props.class,
        styles.button,
        icon() && !children() && styles.iconButton,
        {
          [styles.buttonPrimary]: props.variant === 'primary',
          [styles.buttonSecondary]: props.variant === 'secondary',
          [styles.buttonSubtle]: props.variant === 'subtle',
          [styles.buttonDestructive]: props.variant === 'destructive',
        },
      )}
    >
      <Show when={icon()}>
        <span class={styles.icon}>{icon}</span>
      </Show>
      <Show when={children()}>
        <span class={styles.label}>{children}</span>
      </Show>
    </Dynamic>
  )
}

export function LinkButton(oriProps: ComponentProps<typeof A> & Props) {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'class',
    'icon',
    'children',
    'variant',
  ])
  const icon = memo(() => props.icon)
  const children = memo(() => props.children)
  return (
    <A
      {...rootProps}
      class={clsx(
        props.class,
        styles.button,
        icon() && !children() && styles.iconButton,
        {
          [styles.buttonPrimary]: props.variant === 'primary',
          [styles.buttonSecondary]: props.variant === 'secondary',
          [styles.buttonSubtle]: props.variant === 'subtle',
          [styles.buttonDestructive]: props.variant === 'destructive',
        },
      )}
    >
      <Show when={icon()}>
        <span class={styles.icon}>{icon}</span>
      </Show>
      <Show when={children()}>
        <span class={styles.label}>{children}</span>
      </Show>
    </A>
  )
}
