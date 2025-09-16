import { source } from "@/lib/source";
import { createFromSource } from "fumadocs-core/search/server";

export const { GET } = createFromSource(source, {
  // https://docs.orama.com/open-source/supported-languages
  // Use english for all languages since Orama doesn't support Chinese
  language: "english",
});
