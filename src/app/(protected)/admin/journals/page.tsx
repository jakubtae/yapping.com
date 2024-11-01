import { Button } from "@/components/ui/button";
import Link from "next/link";

const JournalsAdminPage = () => {
  return (
    <div className="flex flex-col gap-2 justify-start items-center">
      <h2>Journals Admin Page</h2>
      <Link href="/admin/journals/create">
        <Button variant="link">Create a journal</Button>
      </Link>
    </div>
  );
};

export default JournalsAdminPage;
