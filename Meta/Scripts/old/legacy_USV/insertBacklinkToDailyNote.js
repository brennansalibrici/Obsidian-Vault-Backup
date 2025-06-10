module.exports = async (tp) => {
    const currentDate = tp.date.now("YYYY-MM-DD");
    const backlink = `🔙 Back to [[${currentDate}]]`;
    await tp.file.insertAt(backlink + '\n\n', 0);
};
