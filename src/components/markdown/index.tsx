"use client";

import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import "./markdown.css";

export default function Markdown({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="markdown bg-background p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <MDEditor.Markdown
      className="markdown bg-background"
      source={content}
      components={{
        a: ({ children, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    />
  );
}
