export function CommunityNotice() {
  return (
    <div
      role="note"
      className="border-b border-brand-purple/20 bg-surface px-6 py-3"
    >
      <p className="mx-auto max-w-6xl text-center text-sm leading-6 text-muted">
        This is a{" "}
        <span className="font-medium text-foreground">community-made fan archive</span>
        . It is not affiliated with, endorsed by, or an official product of Trash
        Taste or any of its hosts.
      </p>
    </div>
  );
}
