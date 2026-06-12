type RichTextProps = {
  content: string | Record<string, unknown> | null | undefined
  className?: string
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

  // Phase 2: Lexical AST renderer
  return (
    <div
      className={`prose prose-neutral max-w-none prose-headings:font-medium prose-headings:tracking-tight ${className ?? ''}`}
    >
      {/* TODO: implement Lexical AST renderer in Phase 2 */}
    </div>
  )
}
