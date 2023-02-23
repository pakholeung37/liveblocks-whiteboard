import {
  DocumentType,
  Group,
  GetDocumentsProps,
  GetDocumentsResponse,
} from '~/types'
// import { usePaginatedDocumentsSWR } from '../../lib/client'
// import {
//   DocumentCreatePopover,
//   DocumentRowSkeleton,
// } from '../../components/Documents'
import clsx from 'clsx'
import { Container } from '~/primitives/container/container'
import { PlusIcon } from '~/icons'
import { Button } from '~/primitives/button/button'
// import { Select } from '~/primitives/Select'
// import { Spinner } from '~/primitives/Spinner'
import styles from './documents.module.css'
// import { DocumentRowGroup } from '~/components/Documents/DocumentRowGroup'
import { capitalize } from '~/utils'
import {
  ComponentProps,
  createMemo,
  createSignal,
  Match,
  mergeProps,
  Show,
  splitProps,
  Switch,
} from 'solid-js'
import { useSession } from '~/hooks/use-session'
import { Select } from '~/primitives/select/select'
import { DocumentCreatePopover } from '~/components/documents/document-create-popover'

// Load `x` documents at a time
const DOCUMENT_LOAD_LIMIT = 10

interface Props extends ComponentProps<'div'> {
  filter?: 'all' | 'drafts' | 'group'
  group?: Group
}

const defaultProps = {
  filter: 'all',
}
export function DocumentsLayout(oriProps: Props) {
  const [props, rootProps] = splitProps(mergeProps(defaultProps, oriProps), [
    'filter',
    'group',
    'class',
  ])
  const session = useSession()
  const [$documentType, setDocumentType] = createSignal<DocumentType | 'all'>(
    'all',
  )

  const createDocumentButton = (
    <DocumentCreatePopover
      userId={session()?.user?.info?.id ?? ''}
      groupIds={props.group?.id ? [props.group.id] : undefined}
      draft={props.filter === 'drafts' || props.filter === 'all'}
      isModal
      placement={'bottom-end'}
      gutter={12}
    >
      <Button as={'div'} icon={<PlusIcon />}>
        <Show when={props.group?.id} fallback={'New draft'}>
          New document
        </Show>
      </Button>
    </DocumentCreatePopover>
  )

  return (
    <Switch>
      <Match when={!session}>
        <Container
          size="small"
          class={clsx(props.class, styles.documents)}
          {...rootProps}
        >
          <div class={styles.container}>
            <div class={styles.emptyState}>
              <p>You don’t have access to these documents.</p>
            </div>
          </div>
        </Container>
      </Match>
      <Match when={true}>
        <Container
          size="small"
          class={clsx(props.class, styles.documents)}
          {...rootProps}
        >
          <div class={styles.header}>
            <h1 class={styles.headerTitle}>
              {props.group?.name ?? capitalize(props.filter)}
            </h1>
            <div class={styles.headerActions}>
              <Select
                initialValue="all"
                items={[
                  { value: 'all', title: 'All' },
                  { value: 'text', title: 'Text', isDisabled: true },
                  { value: 'whiteboard', title: 'Whiteboard' },
                  {
                    value: 'spreadsheet',
                    title: 'Spreadsheet',
                    isDisabled: true,
                  },
                ]}
                onChange={(value: string) => {
                  setDocumentType(value as 'all' | DocumentType)
                  // revalidateDocuments()
                }}
                class={styles.headerSelect}
              />
              {createDocumentButton}
            </div>
          </div>

          {/*<div class={styles.container}>*/}
          {/*  {!isLoadingInitialData ? (*/}
          {/*    !isEmpty ? (*/}
          {/*      <>*/}
          {/*        {documentsPages.map(documentPage => (*/}
          {/*          <DocumentRowGroup*/}
          {/*            key={documentPage.nextPage}*/}
          {/*            documents={documentPage.documents}*/}
          {/*            revalidateDocuments={revalidateDocuments}*/}
          {/*          />*/}
          {/*        ))}*/}
          {/*        {!isReachingEnd ? (*/}
          {/*          <div class={styles.actions}>*/}
          {/*            <Button*/}
          {/*              disabled={isLoadingMore}*/}
          {/*              onClick={() => setSize(size + 1)}*/}
          {/*              icon={isLoadingMore ? <Spinner /> : null}*/}
          {/*            >*/}
          {/*              {isLoadingMore ? 'Loading…' : 'Show more'}*/}
          {/*            </Button>*/}
          {/*          </div>*/}
          {/*        ) : null}*/}
          {/*      </>*/}
          {/*    ) : (*/}
          {/*      <div class={styles.emptyState}>*/}
          {/*        <p>No documents yet.</p>*/}
          {/*        {createDocumentButton}*/}
          {/*      </div>*/}
          {/*    )*/}
          {/*  ) : (*/}
          {/*    <>*/}
          {/*      /!*<DocumentRowSkeleton className={styles.row} />*!/*/}
          {/*      /!*<DocumentRowSkeleton className={styles.row} />*!/*/}
          {/*      /!*<DocumentRowSkeleton className={styles.row} />*!/*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*</div>*/}
        </Container>
      </Match>
    </Switch>
  )
}
