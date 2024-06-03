/*
 * @Date: 2024-06-03 17:36:39
 * @Description: description
 */
const { execSync } = require('child_process');
const { parse } = require("csv-parse/sync");
const fs = require('fs');

const sheetUrl = "https://docs.google.com/spreadsheets/d/1FgCNmoTz9FWuR6Jv1SJ9ioWd2bBfrtRAeoi5CYpmXBA";

execSync(`curl -L ${sheetUrl}/export?format=csv -o ./message1.csv`, {
    stdio: 'ignore'
});

const input = fs.readFileSync("./message1.csv");

const records = parse(input, { columns: true });

console.log(records);