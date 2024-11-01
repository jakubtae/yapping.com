import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="container">
      <h1>Hi Admin!</h1>
      <Link href="/admin/journals">
        <Button variant="link">Journals</Button>
      </Link>
    </div>
  );
}
