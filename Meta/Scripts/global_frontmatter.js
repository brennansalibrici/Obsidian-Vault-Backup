module.exports = async function (tp) {
  const file = await tp.frontmatter.find_tfile_data("Templates/_global/globalTemplate");

  let output = "";
  for (const key in file) {
    const value = file[key];
    if (typeof value === "string") {
      output += `${key}: "${value}"\n`;
    } else if (Array.isArray(value)) {
      output += `${key}: ${JSON.stringify(value)}\n`;
    } else {
      output += `${key}: ${value}\n`;
    }
  }

  return output;
};
