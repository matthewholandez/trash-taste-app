type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-background px-6 py-16 text-center shadow-sm">
      <div
        aria-hidden
        className="absolute top-0 right-0 h-16 w-32 bg-brand-purple"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
      />
      <h2 className="relative font-display text-2xl tracking-tight text-foreground uppercase">
        {title}
      </h2>
      <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        {description}
      </p>
    </div>
  );
}
