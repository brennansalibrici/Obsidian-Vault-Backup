module.exports = async (params) => {
  const { app } = params;
  const files = app.vault.getMarkdownFiles();
  const now = window.moment();

  const oldDailyNotes = files.filter(f => {
    const basename = f.basename;
    return /^\d{4}-\d{2}-\d{2}$/.test(basename) &&
           now.diff(window.moment(basename, "YYYY-MM-DD"), 'days') > 7;
  });

  for (const file of oldDailyNotes) {
    const content = await app.vault.read(file);
    const fileCache = app.metadataCache.getFileCache(file);
    const frontmatter = { ...(fileCache?.frontmatter || {}) };
    const lines = content.split("\n");

    let updatedLines = [];
    let updatedFields = {};
    let insideMetaBind = false;
    let pendingProgressField = null;

    for (let line of lines) {
      const toggleMatch = line.match(/^\s*-\s+.*toggle:(.+?)\]\s*(.*)/);
      if (toggleMatch) {
        const field = toggleMatch[1].trim();
        const label = toggleMatch[2].trim();
        let value = Object.hasOwn(frontmatter, field) ? frontmatter[field] === true : false;
        updatedFields[field] = value;
        updatedLines.push(`- ${field}:: ${value} — ${label}`);
        continue;
      }

      const inlineProgressMatch = line.match(/^\s*-\s+INPUT\[progress:(.+?)\|[0-9]+\|[0-9]+\]/);
      if (inlineProgressMatch) {
        const field = inlineProgressMatch[1].trim();
        const value = typeof frontmatter[field] === "number" ? frontmatter[field] : 0;
        updatedFields[field] = value;
        updatedLines.push(`- ${field}:: ${value}`);
        continue;
      }

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

      updatedLines.push(line);
    }

    // ✅ FIX TAGS before YAML rebuild
    let tags = frontmatter?.tags || [];

    tags = tags.map(tag =>
      typeof tag === "string" ? tag.replace(/:\s*$/, "") : tag
    );

    tags = [...new Set(tags.filter(tag => tag.trim() !== ""))];

    if (!tags.includes("reviews/daily")) {
      tags.push("reviews/daily");
    }

    frontmatter.tags = tags;
    updatedFields["tags"] = tags;

    // 🔁 Rebuild YAML frontmatter
    const yamlStart = lines.findIndex(line => line.trim() === "---");
    const yamlEnd = lines.findIndex((line, idx) => idx > yamlStart && line.trim() === "---");

    if (yamlStart !== -1 && yamlEnd !== -1) {
      const yamlLines = lines.slice(yamlStart + 1, yamlEnd).filter(line =>
        !/^\s*-\s*reviews\/daily:/.test(line.trim()) // remove malformed tag line
      );

      let yamlObj = Object.fromEntries(
        yamlLines
          .filter(line => line.includes(":"))
          .map(line => {
            const [key, ...rest] = line.split(":");
            return [key.trim(), rest.join(":").trim()];
          })
      );

      for (let key in updatedFields) {
        yamlObj[key] = updatedFields[key];
      }

      const newYaml = Object.entries(yamlObj).map(([k, v]) => {
        if (Array.isArray(v)) {
          return `${k}:\n${v.map(item => `  - ${item}`).join("\n")}`;
        }
        return `${k}: ${v}`;
      }).join("\n");

      updatedLines = [
        ...lines.slice(0, yamlStart + 1),
        newYaml,
        lines[yamlEnd],
        ...updatedLines.slice(yamlEnd + 1),
      ];
    }

    await app.vault.modify(file, updatedLines.join("\n"));
  }

  new Notice("All old Daily Notes updated: toggles, progress bars, and tags cleaned.");
};
