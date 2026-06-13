import React from 'react'

type RichTextProps = {
  content: string | Record<string, unknown> | null | undefined
  className?: string
}

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  format?: number | string
  listType?: 'number' | 'bullet' | 'check'
  url?: string
  newTab?: boolean
  fields?: { url?: string; newTab?: boolean; linkType?: string }
  children?: LexicalNode[]
  [k: string]: unknown
}

// Lexical text format bitmask
const IS_BOLD = 1
const IS_ITALIC = 1 << 1
const IS_STRIKETHROUGH = 1 << 2
const IS_UNDERLINE = 1 << 3
const IS_CODE = 1 << 4

function renderText(node: LexicalNode, key: number): React.ReactNode {
  let text: React.ReactNode = node.text ?? ''
  const format = typeof node.format === 'number' ? node.format : 0
  if (format & IS_CODE) text = <code key={key}>{text}</code>
  if (format & IS_BOLD) text = <strong key={key}>{text}</strong>
  if (format & IS_ITALIC) text = <em key={key}>{text}</em>
  if (format & IS_UNDERLINE) text = <u key={key}>{text}</u>
  if (format & IS_STRIKETHROUGH) text = <s key={key}>{text}</s>
  return <React.Fragment key={key}>{text}</React.Fragment>
}

function renderNodes(nodes: LexicalNode[] | undefined): React.ReactNode {
  if (!nodes) return null
  return nodes.map((node, i) => {
    switch (node.type) {
      case 'text':
        return renderText(node, i)
      case 'linebreak':
        return <br key={i} />
      case 'paragraph':
        return <p key={i}>{renderNodes(node.children)}</p>
      case 'heading': {
        const Tag = node.tag === 'h3' ? 'h3' : 'h2'
        return <Tag key={i}>{renderNodes(node.children)}</Tag>
      }
      case 'list': {
        const Tag = node.listType === 'number' ? 'ol' : 'ul'
        return <Tag key={i}>{renderNodes(node.children)}</Tag>
      }
      case 'listitem':
        return <li key={i}>{renderNodes(node.children)}</li>
      case 'quote':
        return <blockquote key={i}>{renderNodes(node.children)}</blockquote>
      case 'link':
      case 'autolink': {
        const url = node.fields?.url ?? node.url ?? '#'
        const external = /^https?:\/\//.test(url)
        // Only http(s), mailto, and relative URLs — anything else (e.g.
        // javascript:) renders as plain text
        const safe = external || /^mailto:/.test(url) || /^[/#]/.test(url)
        if (!safe) {
          return (
            <React.Fragment key={i}>{renderNodes(node.children)}</React.Fragment>
          )
        }
        return (
          <a
            key={i}
            href={url}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {renderNodes(node.children)}
          </a>
        )
      }
      case 'horizontalrule':
        return <hr key={i} />
      default:
        // Unknown block nodes: render their children so content degrades gracefully
        return node.children ? (
          <React.Fragment key={i}>{renderNodes(node.children)}</React.Fragment>
        ) : null
    }
  })
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null

  if (typeof content === 'string') {
    return (
      <div
        className={`prose prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight ${className ?? ''}`}
      >
        <p>{content}</p>
      </div>
    )
  }

  const root = (content as { root?: LexicalNode }).root
  if (!root?.children) return null

  return (
    <div
      className={`prose prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight ${className ?? ''}`}
    >
      {renderNodes(root.children)}
    </div>
  )
}
