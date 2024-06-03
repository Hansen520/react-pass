/*
 * @Date: 2024-06-03 16:30:59
 * @Description: description
 */
const { Workbook } = require("exceljs");
const fs = require("fs");

const languages = ["zh-CN", "en-US", "ja-JP"];

async function main() {
  const workbook = new Workbook();

  const worksheet = workbook.addWorksheet("test");

  const bundleData = languages.map((item) => {
    return JSON.parse(fs.readFileSync(`./${item}.json`, "utf8"));
  });

  const data = [];

  const messages = JSON.parse(fs.readFileSync("./messages.json"));

  bundleData.forEach((item, index) => {
    for (let key in item) {
      const foundItem = data.find((item) => item.id === key);
      if (foundItem) {
        foundItem[languages[index]] = item[key];
      } else {
        data.push({
          id: key,
          defaultMessage: messages[key].defaultMessage,
          description: messages[key].description,
          [languages[index]]: item[key],
        });
      }
    }
  });

  console.log(data, 35);

  worksheet.columns = [
    { header: "ID", key: "id", width: 30 },
    { header: "defaultMessage", key: "defaultMessage", width: 30 },
    { header: "description", key: "description", width: 50 },
    ...languages.map((item) => {
      return {
        header: item,
        key: item,
        width: 30,
      };
    }),
  ];

  worksheet.addRows(data);

  workbook.xlsx.writeFile("./bundle3.xlsx");
}

main();
