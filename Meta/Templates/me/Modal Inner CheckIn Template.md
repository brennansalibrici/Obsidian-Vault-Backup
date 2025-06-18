<%*
//Open the modal form and it's api
const modalForm = app.plugins.plugins.modalforms.api;
const result = await modalForm.openForm("Create New Inner Check-In")

// Create innerCheckIn Object (for reading metadata)
const innerCheckIn = window.customJS.createModalFormUtilsInstance();
innerCheckIn.init({app, tp, fileType: "inner check-in", context1: result.data.context, useContextAsLink: false});

//Determine whether to auto-generate the date/time or use the date picker
let dateTime;
if (result.data.past === true) {
  // User selected a past event, use their chosen date/time
  dateTime = result.data.date_time;
} else {
  // Default behavior — autogenerate timestamp
  const now = window.moment();
  dateTime = now.format("YYYY-MM-DD HH:mm");
}
await innerCheckIn.createFileWithFrontmatter({
  event_date_time: dateTime,
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