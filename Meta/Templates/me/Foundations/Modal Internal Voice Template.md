<%*
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Internal Voice");

// Initialize Internal Voice object
const voice = window.customJS.createModalFormUtilsInstance();
voice.init({
  app,
  tp,
  fileType: "internal voice",
  context1: result.data.voice_name || "",
  useContextAsLink: false
});

// Extract voice_type from whichever 'type_' field is filled
const voiceType = [
  result.data.type_protective,
  result.data.type_crtical,
  result.data.type_fear,
  result.data.type_exiled
].find(val => val && val.length > 0) || null;

// Extract voice_style from whichever 'style_' field is filled (multi)
const voiceStyle = [
  result.data.style_protective,
  result.data.style_critical,
  result.data.style_fear,
  result.data.style_exiled
].flat().filter(Boolean);

// Generate file name
voice.createNewFileName();

// Create the Internal Voice file
await voice.createFileWithFrontmatter({
  title: voice.newCreatedFileName,
  voice_group: result.data.voice_group,
  voice_type: voiceType,
  voice_style: voiceStyle,
  tone: result.data.tone,
  recurring_phrase: result.data.recurring_phrase,
  created: voice.formatUtils.db_formatDateTime(new Date()),
  last_modified: voice.formatUtils.db_formatDateTime(new Date()),
  status: "🟩 complete",
  entered: false,
  export_to_inputs: false
});
-%>
