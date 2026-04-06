interface EditorialPageHeaderProps {
  overline: string
  title: string
  description: string
}

export function EditorialPageHeader({ overline, title, description }: EditorialPageHeaderProps) {
  return (
    <>
      <header className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-10 md:pb-12">
        <p className="overline mb-3 md:mb-4">{overline}</p>
        <h1
          className="font-display font-light text-foreground text-3xl md:text-4xl lg:text-5xl mb-4 md:mb-5 max-w-3xl leading-[1.12]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">{description}</p>
      </header>
      <div className="h-px w-full bg-border relative" aria-hidden>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-24 h-px bg-secondary" />
      </div>
    </>
  )
}
