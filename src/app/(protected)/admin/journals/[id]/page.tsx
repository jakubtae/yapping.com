import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  const journalData = await prisma.posts.findFirst({ where: { id: slug } });
  if (!journalData) {
    redirect("/admin/journals/");
  }
  return (
    <div className="flex flex-col gap-2 items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/journals">Journals</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/admin/journals/" + journalData.id}>
              {journalData.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col justify-center items-center pt-4">
        <h1 className="text-4xl font-bold">{journalData?.title}</h1>
        <h2 className="text-sm font-semibold text-gray-700">
          {" "}
          {journalData.createdAt.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          })}
        </h2>
        <div className="flex gap-2 pt-4">
          {journalData.tags.map((tag, i) => (
            <Button key={i} size="sm">
              {tag}
            </Button>
          ))}
        </div>
      </div>

      <div className="w-full text-base font-normal px-4 pt-2">
        {journalData.body}
      </div>
    </div>
  );
}
