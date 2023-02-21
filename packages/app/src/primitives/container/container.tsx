import clsx from 'clsx'
import { ComponentProps, mergeProps } from 'solid-js'
import styles from './Container.module.css'

interface Props extends ComponentProps<'div'> {
  size?: 'small' | 'medium' | 'large'
}

const defaultProps: Required<Pick<Props, 'size'>> = {
  size: 'medium',
}
export function Container(oriProps: Props) {
  const props = mergeProps(defaultProps, oriProps)
  return (
    <div
      {...props}
      class={clsx(props.class, styles.container, {
        [styles.containerSmall]: props.size === 'small',
        [styles.containerMedium]: props.size === 'medium',
        [styles.containerLarge]: props.size === 'large',
      })}
    >
      {props.children}
    </div>
  )
}
