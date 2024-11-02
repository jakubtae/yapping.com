import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import Link from "next/link";

const JournalsAdminPage = async () => {
  const journals = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });
  return (
    <div className="flex flex-col gap-2 justify-start items-center">
      <h2>Journals Admin Page</h2>
      <div className="grid grid-rows-1 grid-cols-2 w-full justify-between">
        <div className="flex flex-col gap-1">
          {journals.map((journal) => (
            <Link
              href={"/admin/journals/" + journal.id}
              key={journal.id}
              className="w-full"
            >
              <Button
                variant="link"
                className="w-full flex justify-between items-center"
              >
                <span>{journal.title}</span>
                {journal.createdAt.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </Button>
            </Link>
          ))}
        </div>
        <Link href="/admin/journals/create">
          <Button variant="link">Create a journal</Button>
        </Link>
      </div>
    </div>
  );
};

export default JournalsAdminPage;
