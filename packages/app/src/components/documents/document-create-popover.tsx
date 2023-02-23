import { ComponentProps, mergeProps, splitProps } from 'solid-js'
import { DOCUMENT_URL } from '~/constants'
import { PlusIcon } from '~/icons'
import { createDocument } from '~/lib/client'
import { Document, DocumentGroup, DocumentType, DocumentUser } from '~/types'
import styles from './document-create-popover.module.css'
import { Popover } from '~/primitives/popover/popover'
import { useNavigate } from '@solidjs/router'
import { Button } from '~/primitives/button/button'

interface Props extends Omit<ComponentProps<typeof Popover>, 'content'> {
  documentName?: Document['name']
  draft: Document['draft']
  groupIds?: DocumentGroup['id'][]
  userId: DocumentUser['id']
}

const defaultProps = {
  documentName: 'Untitled',
}
export function DocumentCreatePopover(oriProps: Props) {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'documentName',
    'draft',
    'groupIds',
    'userId',
    'children',
  ])

  const navigate = useNavigate()

  // Create a new document, then navigate to the document's URL location
  async function createNewDocument(name: string, type: DocumentType) {
    const { data, error } = await createDocument({
      name: props.documentName,
      type: type,
      userId: props.userId,
      draft: props.draft,
      groupIds: props.draft ? undefined : props.groupIds,
    })

    if (error || !data) {
      return
    }

    const newDocument: Document = data
    navigate(DOCUMENT_URL(newDocument.type, newDocument.id))
  }

  return (
    <Popover
      content={
        <div class={styles.popover}>
          <Button
            disabled
            icon={<PlusIcon />}
            onClick={() => {
              createNewDocument(props.documentName, 'text')
            }}
            variant="subtle"
          >
            Text
          </Button>
          <Button
            icon={<PlusIcon />}
            onClick={() => {
              createNewDocument(props.documentName, 'whiteboard')
            }}
            variant="subtle"
          >
            Whiteboard
          </Button>
          <Button
            disabled
            icon={<PlusIcon />}
            onClick={() => {
              createNewDocument(props.documentName, 'spreadsheet')
            }}
            variant="subtle"
          >
            Spreadsheet
          </Button>
        </div>
      }
      {...rootProps}
    >
      {props.children}
    </Popover>
  )
}
