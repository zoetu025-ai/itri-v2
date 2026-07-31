"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SearchPage } from "storybook";
import { startConversation } from "../lib/conversation";

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  return (
    <SearchPage
      searchProps={{
        value: query,
        onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setQuery(event.target.value);
        },
        onSubmit: () => {
          const trimmed = query.trim();
          if (!trimmed) return;
          startConversation(trimmed);
          router.push("/result");
        },
      }}
    />
  );
}
