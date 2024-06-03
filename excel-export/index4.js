/*
 * @Date: 2024-06-03 17:32:59
 * @Description: description
 */
const { stringify } = require("csv-stringify");
const fs = require("fs");

const languages = ["zh-CN", "en-US", "ja-JP"];

async function main() {
  const bundleData = languages.map((item) => {
    return JSON.parse(fs.readFileSync(`./${item}.json`));
  });

  const data = [];

  const messages = JSON.parse(fs.readFileSync("./messages.json"));

  bundleData.forEach((item, index) => {
    for (let key in messages) {
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

  console.log(data);

  const columns = {
    id: "Message ID",
    defaultMessage: "Default Message",
    description: "Description",
    "zh-CN": "zh-CN",
    "en-US": "en-US",
    "ja-JP": "ja-JP",
  };

  stringify(data, { header: true, columns }, function (err, output) {
    fs.writeFileSync("./messages1.csv", output);
  });
}

main();
