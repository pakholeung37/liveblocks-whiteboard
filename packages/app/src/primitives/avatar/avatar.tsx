import clsx from 'clsx'
import { ComponentProps, mergeProps, Show, splitProps } from 'solid-js'
import { getInitials } from '~/utils'
// import { Tooltip } from '../Tooltip'
import styles from './avatar.module.css'

const DEFAULT_SIZE = 24
const FONT_SIZE_FACTOR = 0.36

const defaultProps = {
  size: DEFAULT_SIZE,
  outline: false,
}
export interface Props extends Omit<ComponentProps<'div'>, 'color'> {
  src?: string
  name: string
  size?: number
  color?: string
  outline?: boolean
  // tooltip?: boolean
  // tooltipProps?: Omit<ComponentProps<typeof Tooltip>, 'children' | 'content'>
}

export function Avatar(oriProps: Props) {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'class',
    'outline',
    'size',
    'color',
    'style',
    'name',
    'src',
  ])
  return (
    <div
      class={clsx(
        styles.avatar,
        props.class,
        props.outline && styles.avatarOutline,
      )}
      style={{
        width: props.size ? props.size + 'px' : undefined,
        height: props.size ? props.size + 'px' : undefined,
        color: props.color,
      }}
      aria-label={props.name}
      {...rootProps}
    >
      <Show when={props.src}>
        <img
          alt={props.name}
          src={props.src}
          height={props.size}
          width={props.size}
        />
      </Show>
      <span
        style={{
          ['font-size']: props.size
            ? props.size * FONT_SIZE_FACTOR + 'px'
            : undefined,
        }}
        class={styles.label}
      >
        {getInitials(props.name)}
      </span>
    </div>
  )
}

// interface EllipsisProps extends ComponentProps<'div'> {
//   ellipsis: number
//   size?: number
//   outline?: boolean
//   tooltip?: boolean
//   tooltipProps?: Omit<ComponentProps<typeof Tooltip>, 'children' | 'content'>
// }

//
// export function AvatarEllipsis({
//   ellipsis,
//   size = DEFAULT_SIZE,
//   outline = false,
//   tooltip = false,
//   tooltipProps,
//   className,
//   style,
//   ...props
// }: EllipsisProps) {
//   const content = (
//     <div
//       className={clsx(
//         styles.avatar,
//         className,
//         outline && styles.avatarOutline,
//       )}
//       style={{ width: size, height: size, ...style }}
//       {...props}
//     >
//       <span
//         style={{ fontSize: size * FONT_SIZE_FACTOR }}
//         className={styles.label}
//       >
//         +{ellipsis}
//       </span>
//     </div>
//   )
//
//   return tooltip ? (
//     <Tooltip
//       content={`${ellipsis} other${ellipsis > 1 ? 's' : ''}`}
//       {...tooltipProps}
//     >
//       {content}
//     </Tooltip>
//   ) : (
//     content
//   )
// }
