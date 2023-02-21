import { Select as KSelect } from '@kobalte/core'
import {
  splitProps,
  createSignal,
  createEffect,
  JSX,
  Index,
  Show,
} from 'solid-js'
import clsx from 'clsx'
import { CheckIcon, SelectIcon } from '~/icons'
import styles from './select.module.css'

interface Item extends KSelect.SelectItemOptions {
  value: string
  title?: string
  description?: string
}

interface Props extends Omit<KSelect.SelectRootOptions, 'onValueChange'> {
  initialValue?: string
  value?: string
  items: Item[]
  onChange?: KSelect.SelectRootOptions['onValueChange']
  placeholder?: KSelect.SelectValueOptions['placeholder']
  aboveOverlay?: boolean
  class?: string
}
export function Select(oriProps: Props) {
  const [props, rootProps] = splitProps(oriProps, [
    'initialValue',
    'value',
    'items',
    'onChange',
    'placeholder',
    'aboveOverlay',
    'class',
  ])

  const [internalValue, setInternalValue] = createSignal(props.initialValue)
  const handleValueChange = (newValue: string) => {
    if (newValue !== undefined) {
      setInternalValue(newValue)
      props.onChange?.(newValue)
    }
  }

  createEffect(() => {
    setInternalValue(props.value)
  })

  return (
    <KSelect.Root
      value={internalValue()}
      onValueChange={handleValueChange}
      defaultValue={props.initialValue}
      {...rootProps}
    >
      <KSelect.Trigger class={clsx(props.class, styles.trigger)}>
        <KSelect.Value
          placeholder={props.placeholder}
          class={styles.triggerValue}
        />
        <KSelect.Icon class={styles.triggerIcon}>
          <SelectIcon />
        </KSelect.Icon>
      </KSelect.Trigger>
      <KSelect.Portal>
        <KSelect.Content
          class={styles.select}
          style={
            {
              zIndex: props.aboveOverlay ? 'var(--z-overlay)' : undefined,
            } as JSX.CSSProperties
          }
        >
          <KSelect.Listbox>
            <Index each={props.items}>
              {_item => {
                const [item, rootProps] = splitProps(_item(), [
                  'value',
                  'title',
                  'description',
                ])
                return (
                  <KSelect.Item
                    class={styles.item}
                    value={item.value}
                    {...rootProps}
                  >
                    <div class={styles.itemIndicator}>
                      <KSelect.ItemIndicator>
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <CheckIcon />
                        </svg>
                      </KSelect.ItemIndicator>
                    </div>
                    <div class={styles.itemInfo}>
                      <KSelect.ItemLabel class={styles.itemTitle}>
                        <Show when={item.title} fallback={item.value}>
                          {item.title}
                        </Show>
                      </KSelect.ItemLabel>
                      <KSelect.Description class={styles.itemDescription}>
                        <Show when={item.description}>
                          <span class={styles.itemDescription}>
                            {item.description}
                          </span>
                        </Show>
                      </KSelect.Description>
                    </div>
                  </KSelect.Item>
                )
              }}
            </Index>
          </KSelect.Listbox>
        </KSelect.Content>
      </KSelect.Portal>
    </KSelect.Root>
  )
}
