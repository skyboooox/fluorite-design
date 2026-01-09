import { readFile, writeFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const sections = await Promise.all(
  ["DESIGN.md", "REVIEW.md"].map(async (file) => {
    const source = await readFile(new URL(file, root), "utf8");
    return source
      .replace(/^#/gm, "##")
      .replace(/\[REVIEW\.md\]\(REVIEW\.md\)/g, "[Delivery checklist](#delivery-checklist)")
      .trim();
  }),
);

const header = `# Fluorite Design

[Live examples](https://fluorite-design.sassylark8.chatgpt.site/) · [Figma designs](https://www.figma.com/design/zRND6JG1dfnxrT4djl7qY8/Fluorite-Design)

Generated from DESIGN.md / REVIEW.md.\n`;

await writeFile(
  new URL("../public/Fluorite-Design.md", import.meta.url),
  `${header}\n${sections.join("\n\n")}\n`,
);
console.log("Synced guidelines and delivery checklist: public/Fluorite-Design.md");
