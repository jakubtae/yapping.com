"use client";

import { isValidObjectId } from "@/lib/isValidObjectId";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

interface JournalIdParams {
  params: {
    id: string;
  };
}

const LibraryIDPage = ({ params }: JournalIdParams) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/login");
    },
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isValidObjectId(params.id)) {
      router.push("/dashboard/libraries");
    } else {
      setLoading(false);
    }
  }, [params.id, router]); // Dodano zależności

  if (loading || status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {/* Dodaj tutaj komponenty, które mają być renderowane na tej stronie */}
    </div>
  );
};

export default LibraryIDPage;
