module.exports = async (params) => {
  const { app } = params;
  const file = app.workspace.getActiveFile();

  if (!file) {
    new Notice("No active file selected.");
    return;
  }

  const content = await app.vault.read(file);
  const fileCache = app.metadataCache.getFileCache(file);
  const frontmatter = { ...(fileCache?.frontmatter || {}) };
  const lines = content.split("\n");

  let updatedLines = [];
  let updatedFields = {};
  let insideMetaBind = false;
  let pendingProgressField = null;
  let originalTags = frontmatter?.tags || [];

  for (let line of lines) {
    // --- Convert Toggles ---
    const toggleMatch = line.match(/^\s*-\s+.*toggle:(.+?)\]\s*(.*)/);
    if (toggleMatch) {
      const field = toggleMatch[1].trim();
      const label = toggleMatch[2].trim();
      let value = Object.hasOwn(frontmatter, field) ? frontmatter[field] === true : false;

      updatedFields[field] = value;
      updatedLines.push(`- ${field}:: ${value} — ${label}`);
      continue;
    }

    // --- Convert Inline Progress Bars ---
    const inlineProgressMatch = line.match(/^\s*-\s+INPUT\[progress:(.+?)\|[0-9]+\|[0-9]+\]/);
    if (inlineProgressMatch) {
      const field = inlineProgressMatch[1].trim();
      const value = typeof frontmatter[field] === "number" ? frontmatter[field] : 0;

      updatedFields[field] = value;
      updatedLines.push(`- ${field}:: ${value}`);
      continue;
    }

    // --- Convert Meta-bind Status Bars ---
    if (line.trim() === "```meta-bind") {
      insideMetaBind = true;
      continue;
    }

    if (insideMetaBind) {
      const matchProgress = line.match(/progressBar\(.*?\):\s*(\w+)/);
      if (matchProgress) {
        pendingProgressField = matchProgress[1];
      }

      if (line.trim() === "```") {
        insideMetaBind = false;
        if (pendingProgressField) {
          const value = typeof frontmatter[pendingProgressField] === "number" ? frontmatter[pendingProgressField] : 0;
          updatedFields[pendingProgressField] = value;
          updatedLines.push(`${pendingProgressField}:: ${value}`);
          pendingProgressField = null;
        }
        continue;
      }

      continue;
    }

    // --- Default line ---
    updatedLines.push(line);
  }

  // --- Rebuild YAML frontmatter ---
  const yamlStart = lines.findIndex(line => line.trim() === "---");
  const yamlEnd = lines.findIndex((line, idx) => idx > yamlStart && line.trim() === "---");

  if (yamlStart !== -1 && yamlEnd !== -1) {
    const yamlLines = lines.slice(yamlStart + 1, yamlEnd);
    let yamlObj = Object.fromEntries(
      yamlLines.map(line => {
        const [key, ...rest] = line.split(":");
        return [key.trim(), rest.join(":").trim()];
      })
    );

    for (let key in updatedFields) {
      yamlObj[key] = updatedFields[key];
    }

    const newYaml = Object.entries(yamlObj).map(([k, v]) => `${k}: ${v}`).join("\n");
    updatedLines = [
      ...lines.slice(0, yamlStart + 1),
      newYaml,
      lines[yamlEnd],
      ...updatedLines.slice(yamlEnd + 1),
    ];
  }

  await app.vault.modify(file, updatedLines.join("\n"));
  
  let tags = frontmatter?.tags || [];

// Remove bad versions first, if somehow present
tags = tags.filter(tag => tag !== "reviews/daily:" && tag !== "reviews/daily");

// Add it back correctly
if (!tags.includes("reviews/daily")) {
  tags.push(["reviews/daily"]);
}

frontmatter.tags = tags;

  new Notice("Toggles and status bars converted, values inserted, and frontmatter updated.");
};

//Remove trailing colon
if (frontmatter.tags) {
  frontmatter.tags = frontmatter.tags.map(tag => 
    tag.replace(/:$/, "")  // strip any trailing colons
  );
}