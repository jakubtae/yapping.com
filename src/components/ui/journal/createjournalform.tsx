"use client";
import { z } from "zod";
import { PostsSchema } from "../../../../prisma/generated/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { newPost } from "@/actions/entryCreate";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/local/form-error";
import { FormSuccess } from "@/components/ui/local/form-success";

const CreateJournalForm = () => {
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof PostsSchema>>({
    resolver: zodResolver(PostsSchema),
    defaultValues: {
      id: "123",
      title: "",
      body: "",
      tags: [{ tagId: "1", text: "" }],
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  });

  const { control, handleSubmit, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (values: z.infer<typeof PostsSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    const id = session?.user.id as string;
    try {
      const data = await newPost(values, id);
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess("Post created successfully.");
        if (data.id) {
          router.push(`/admin/journals/${data.id}`, { scroll: true });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error creating post:", error);
    }
  };

  return (
    <Card className="w-full max-w-[600px] shadow-none border-none py-10">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit((vaues) => {
              console.log("What");
              onSubmit(vaues);
            })}
            className="space-y-6"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Journal Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={form.formState.isSubmitting}
                      placeholder="Journal Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Tags</FormLabel>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input
                    {...register(`tags.${index}.text` as const)}
                    defaultValue={field.text}
                    placeholder="Enter a tag"
                    disabled={form.formState.isSubmitting}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      disabled={form.formState.isSubmitting}
                      variant="destructive"
                      className="px-2 text-xs md:text-small md:px-4 lg:text-base lg:px-6"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append({ tagId: "new", text: "" })}
                disabled={form.formState.isSubmitting}
                className="w-full"
              >
                Add Tag
              </Button>
              <FormMessage />
            </FormItem>
            <FormField
              control={control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={form.formState.isSubmitting}
                      placeholder="Write content here"
                    />
                  </FormControl>
                  <FormDescription>
                    Content of the journal entry
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              Create Journal
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateJournalForm;
