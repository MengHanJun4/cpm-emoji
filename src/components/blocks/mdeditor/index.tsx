"use client";

import MDEditor from "@uiw/react-md-editor";
import React, { useEffect, useState } from "react";

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full md:w-[800px] h-[600px] border rounded-md p-4 bg-muted animate-pulse">
        <div className="text-muted-foreground">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[800px]">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={600}
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
    </div>
  );
}
