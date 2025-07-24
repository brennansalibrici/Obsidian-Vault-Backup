<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("File Checker");

const folders = {
  emotion_links: "ME/🏛️ Foundations/🎭 Emotions",
  voices_links: "ME/🏛️ Foundations/📢 Internal Voices",
  wounds_links: "ME/🏛️ Foundations/🌀 Emotional Wounds",
  resources_links: "ME/🏛️ Foundations/🩹 Soothing Resources",
  needs_links: "ME/🏛️ Foundations/🛡️ Emotional Needs",
  triggers_links: "ME/🏛️ Foundations/⚡ Triggers",
  tradeoffs_links: "ME/🏛️ Foundations/⚖️Trade-Offs",
  functions_links: "ME/🏛️ Foundations/🐾 Behavior Functions",
  strategies_links: "ME/🏛️ Foundations/🪖 Protective Strategies",
  theory_links: "ME/🏛️ Foundations/🕸️ Attachment/💖 Theory",
  style_links: "ME/🏛️ Foundations/🕸️ Attachment/🔗 Styles",
  attachment_needs_links: "ME/🏛️ Foundations/🕸️ Attachment/🗝️ Needs"
};

let created = [];
let existing = [];

// Clean wikilink -> filename
const cleanLink = (raw) =>
  raw.trim().replace(/^\[\[/, "").replace(/\]\]$/, "").trim();

for (const field in folders) {
  const folder = folders[field];
  const rawValue = result?.data?.[field];

  if (!rawValue || typeof rawValue !== 'string' || rawValue.trim() === '') continue;

  const values = rawValue.split(',').map(cleanLink).filter(Boolean);

  for (const name of values) {
    const filePath = `${folder}/${name}.md`;
    const exists = await app.vault.getAbstractFileByPath(filePath);

    if (!exists) {
      await app.vault.create(filePath, "");
      created.push(name);
    } else {
      existing.push(name);
    }
  }
}

// Show notification
const message = `🆕 Created: ${created.join(', ') || 'None'}\n✅ Already existed: ${existing.join(', ') || 'None'}`;
new Notice(message);
%>
