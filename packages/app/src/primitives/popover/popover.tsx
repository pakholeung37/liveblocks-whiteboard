import { Popover as KPopover } from '@kobalte/core'
import { ComponentProps, JSXElement, splitProps } from 'solid-js'
import styles from './popover.module.css'
interface Props extends ComponentProps<typeof KPopover.Root> {
  content: JSXElement
  triggerClass?: string
}
export const Popover = (oriProps: Props) => {
  const [props, rootProps] = splitProps(oriProps, [
    'children',
    'content',
    'triggerClass',
  ])
  return (
    <KPopover.Root {...rootProps}>
      <KPopover.Trigger class={props.triggerClass}>
        {props.children}
      </KPopover.Trigger>
      <KPopover.Portal>
        <KPopover.Content class={styles.popover}>
          {props.content}
        </KPopover.Content>
      </KPopover.Portal>
    </KPopover.Root>
  )
}
