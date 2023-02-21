import { ComponentProps } from 'solid-js'

export function EditIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 3H4.11111C3.81643 3 3.53381 3.11706 3.32544 3.32544C3.11706 3.53381 3 3.81643 3 4.11111V11.8889C3 12.1836 3.11706 12.4662 3.32544 12.6746C3.53381 12.8829 3.81643 13 4.11111 13H11.8889C12.1836 13 12.4662 12.8829 12.6746 12.6746C12.8829 12.4662 13 12.1836 13 11.8889V8"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        vector-effect="non-scaling-stroke"
      />
      <path
        d="M11.9485 2.35199C12.1738 2.12661 12.4795 2 12.7982 2C13.117 2 13.4226 2.12661 13.648 2.35199C13.8734 2.57737 14 2.88304 14 3.20177C14 3.5205 13.8734 3.82617 13.648 4.05155L9.04951 8.65005C8.53687 9.16269 7.89455 9.52636 7.19122 9.70219L6.32338 9.91915C6.17691 9.95577 6.04423 9.8231 6.08085 9.67662L6.29781 8.80878C6.47364 8.10545 6.83731 7.46313 7.34995 6.95049L11.9485 2.35199Z"
        fill="currentColor"
      />
    </svg>
  )
}
