import { Component } from 'solid-js'
import {
  AiFillMacCommand,
  AiOutlineBell,
  AiOutlineSearch,
} from 'solid-icons/ai'

import {
  bottom_group,
  logo,
  logo_container,
  sidebar,
  text_button,
} from './sidebar.css'
import { Nav } from './Nav'
import { Avatar } from '../Avatar'
import { IconButton } from '../Button'

export type SidebarProps = {
  onSearchClick: () => void
}

export const Sidebar: Component<SidebarProps> = props => {
  return (
    <div class={`${sidebar}`}>
      <div class={logo_container}>
        <a class={logo}>
          <AiFillMacCommand size={32} color="currentColor" />
        </a>
      </div>
      <Nav></Nav>
      <div class={bottom_group}>
        <IconButton
          class={text_button}
          variant="text"
          size="sm"
          icon={<AiOutlineBell size={20} />}
        ></IconButton>
        <IconButton
          class={text_button}
          variant="text"
          size="sm"
          icon={<AiOutlineSearch size={20} />}
          onClick={props.onSearchClick}
        ></IconButton>
        <Avatar
          name="Pakho Leung"
          src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1003.jpg"
          size="md"
        />
      </div>
    </div>
  )
}
