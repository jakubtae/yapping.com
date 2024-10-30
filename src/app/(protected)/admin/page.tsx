import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="container">
      <h1>Hi Admin!</h1>
    </div>
  );
}
