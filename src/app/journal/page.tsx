import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import Link from "next/link";

const JournalsAdminPage = async () => {
  const journals = await prisma.posts.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      tags: true,
    },
  });
  return (
    <div className="flex flex-col gap-2 justify-start items-center">
      <h2 className="text-xl font-bold">Journal</h2>
      <div className="flex-col w-full gap-2">
        <div className="flex flex-col gap-1">
          {journals.map((journal) => (
            <Link
              href={"/journal/" + journal.id}
              key={journal.id}
              className="w-full"
            >
              <Button
                variant="link"
                className="w-full flex justify-between items-center"
              >
                <div className="flex gap-4 items-center">
                  <span className="text-base">{journal.title}</span>
                  <div className="flex gap-2">
                    {journal.tags.map((tag, i) => (
                      <div
                        className="text-xs text-secondary bg-primary rounded-lg py-1 px-2 font-extralight"
                        key={i}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
                <span>
                  {journal.createdAt.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalsAdminPage;
