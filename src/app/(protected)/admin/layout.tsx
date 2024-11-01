import { auth } from "@/auth";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return <div>Not authenticated</div>;
  }
  return <>{children}</>;
}
