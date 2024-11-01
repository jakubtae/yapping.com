"use server";

import { PostsSchema } from "../../prisma/generated/zod";
import { prisma } from "@/prisma";

interface ValueTypes {
  title: string;
  tags: { tagId: string; text: string }[];
  body: string;
}

export const newPost = async (values: ValueTypes, id: string) => {
  const validatedFields = await PostsSchema.safeParseAsync(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  if (!id) {
    return { error: "Must provide userId" };
  }

  const { title, body, tags } = validatedFields.data;

  const createPost = await prisma.posts.create({
    data: {
      title,
      body,
      tags: tags.map((tag) => {
        return tag.text;
      }),
    },
  });
  if (!createPost) {
    console.error("Error creating a post", createPost);
    return {
      error: "An error occurred while creating a post",
    };
  } else {
    return { success: "Post created", id: createPost.id };
  }
};

// export const deleteLibrary = async (id: string) => {
//   try {
//     const delLib = await deleteALibrary(id);
//     if (!delLib) {
//       return { error: "Error deleting the library" };
//     }
//     // ! IS A WORKING CACHE
//     revalidateTag("getUserLibarries");
//     return { success: "Library deleted" };
//   } catch (error: any) {
//     console.error("Error deleting library:", error);
//     return { error: error.message };
//   }
// };
