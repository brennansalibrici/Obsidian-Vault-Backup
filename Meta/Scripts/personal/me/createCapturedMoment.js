module.exports = async (params) => {
    const momentName = await params.quickAddApi.inputPrompt("What's the moment about?");
    const dateTime = window.moment().format("YYYY-MM-DD HH:mm");
    const fileName = `${dateTime} ${momentName} Capture`;

    const templatePath = "Templates/Captured Moment Template"; // adjust path if needed

    await params.quickAddApi.createNewNote(fileName, templatePath);
}
