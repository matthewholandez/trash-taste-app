import { CommunityNotice } from "@/components/community-notice";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteShellProps = {
  children: React.ReactNode;
  showCommunityNotice?: boolean;
  mainClassName?: string;
};

export function SiteShell({
  children,
  showCommunityNotice = false,
  mainClassName = "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 bg-background px-6 py-10",
}: SiteShellProps) {
  return (
    <>
      <SiteHeader />
      {showCommunityNotice ? <CommunityNotice /> : null}
      <main className={mainClassName}>{children}</main>
      <SiteFooter />
    </>
  );
}
