type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-[#D9D0C0] bg-white px-6 py-16 text-center shadow-sm">
      <h2 className="font-display text-2xl font-semibold text-[#1A1A1A]">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#666666]">
        {description}
      </p>
    </div>
  );
}
