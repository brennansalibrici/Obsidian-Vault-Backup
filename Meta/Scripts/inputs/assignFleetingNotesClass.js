module.exports = async () => {
  new Notice("🟡 Running fleetingNote fileClass assignment...");

  const file = app.workspace.getActiveFile();
  if (!file) {
    new Notice("❌ No active file found.");
    return;
  }

  const content = await app.vault.read(file);
  const fileCache = app.metadataCache.getFileCache(file);
  const hasFrontmatter = fileCache?.frontmatter;
  const lines = content.split("\n");

  if (hasFrontmatter) {
    const start = lines.findIndex(line => line.trim() === "---");
    const end = lines.findIndex((line, i) => i > start && line.trim() === "---");

    let frontmatter = lines.slice(start + 1, end);
    const existingIndex = frontmatter.findIndex(line => line.trim().startsWith("fileClass:"));

    if (existingIndex !== -1) {
      frontmatter[existingIndex] = "fileClass: fleetingNote";
    } else {
      frontmatter.push("fileClass: fleetingNote");
    }

    const newContent = [
      "---",
      ...frontmatter,
      "---",
      ...lines.slice(end + 1)
    ].join("\n");

    await app.vault.modify(file, newContent);
    new Notice("✅ fileClass updated inside existing frontmatter.");
  } else {
    const newContent = [
      "---",
      "fileClass: fleetingNote",
      "---",
      content
    ].join("\n");

    await app.vault.modify(file, newContent);
    new Notice("✅ Added new frontmatter with fileClass: fleetingNote.");
  }
};
