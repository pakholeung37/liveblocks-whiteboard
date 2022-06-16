import {
  Component,
  JSX,
  JSXElement,
  Match,
  mergeProps,
  Show,
  splitProps,
  Switch,
  VoidComponent,
} from 'solid-js'
import { BiLoaderAlt } from 'solid-icons/bi'
import { rounded } from '../../style/utilities.css'
import {
  button,
  ghost,
  outline,
  primary,
  neutral,
  text,
  xs,
  sm,
  md,
  lg,
  icon_only,
  left_icon,
  right_icon,
  loading_icon,
} from './button.css'

export type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: JSX.Element
  variant?: 'neutral' | 'primary' | 'outline' | 'ghost' | 'text'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  class?: string
  style?: string | JSX.CSSProperties
  leftIcon?: JSXElement
  rightIcon?: JSXElement
  rounded?: boolean
  loading?: boolean
}

const variantMap = {
  neutral,
  primary,
  outline,
  ghost,
  text,
}

const sizeMap = {
  xs,
  sm,
  md,
  lg,
}

const defaultProps: Required<Pick<ButtonProps, 'size' | 'variant'>> = {
  size: 'sm',
  variant: 'neutral',
}

export const Button: Component<ButtonProps> = oriProps => {
  const [props, restProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'class',
    'size',
    'rounded',
    'variant',
    'disabled',
    'loading',
    'leftIcon',
    'rightIcon',
    'children',
  ])

  return (
    <button
      class={`${button} ${variantMap[props.variant]} ${sizeMap[props.size]} ${
        props.class ?? ''
      } ${props.rounded ? rounded : ''}`}
      disabled={props.disabled}
      {...restProps}
    >
      <Switch>
        <Match when={props.loading}>
          <span class={`${left_icon} ${loading_icon}`}>
            <BiLoaderAlt />
          </span>
        </Match>
        <Match when={props.leftIcon}>
          <span class={`${left_icon}`}>{props.leftIcon}</span>
        </Match>
      </Switch>
      {props.children}
      <Show when={props.rightIcon}>
        <span class={`${right_icon}`}>{props.rightIcon}</span>
      </Show>
    </button>
  )
}

export type IconButtonProps = Omit<ButtonProps, 'leftIcon' | 'rightIcon'> & {
  icon?: JSX.Element
}

export const IconButton: VoidComponent<IconButtonProps> = oriProps => {
  const [props, restProps] = splitProps(oriProps, ['class', 'icon'])
  return (
    <Button class={`${icon_only} ${props.class ?? ''}`} {...restProps}>
      {props.icon}
    </Button>
  )
}
