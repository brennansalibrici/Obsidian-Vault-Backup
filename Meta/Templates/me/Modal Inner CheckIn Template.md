<%*
//Open the modal form and it's api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Inner Check-In")

// Create innerCheckIn Object (for reading metadata)
const innerCheckIn = window.customJS.createModalFormUtilsInstance();
innerCheckIn.init({app, tp, fileType: "inner check-in", context1: result.data.context, useContextAsLink: false});

//Determine whether to auto-generate the date/time or use the date picker
let rawDateTime;
if (result.data.past === true) {
  // User selected a past event, use their chosen date/time
  rawDateTime = window.moment(result.data.date_time);
} else {
  // Default behavior — autogenerate timestamp
  rawDateTime = window.moment();
}

await innerCheckIn.createFileWithFrontmatter({
  event_date_time: innerCheckIn.formatUtils.db_formatDateTime(rawDateTime),
  created: innerCheckIn.formatUtils.db_formatDateTime(new Date()),
  last_modified: innerCheckIn.formatUtils.db_formatDateTime(new Date()),
  status: "🟧 in progress",
  driver: result.data.driver,
  motive: result.data.motive,
  response_alignment: result.data.response_alignment,
  context: result.data.context,
  emotions: result.data.emotions,
  notes: result.data.notes,
  export_to_inputs: false,
  people: Array.isArray(result.data.people) ? result.data.people : [],
 });

-%>