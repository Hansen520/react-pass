const { Workbook } = require('exceljs');
const fs = require('fs');

async function main(){
    const workbook = new Workbook();

    const workbook2 = await workbook.xlsx.readFile('./bundle3.xlsx');

    const zhCNBundle = {};
    const enUSBundle = {};
    const jaJPBundle = {};

    workbook2.eachSheet((sheet) => {

        sheet.eachRow((row, index) => {
            if(index === 1) {
                return;
            }
            const key = row.getCell(1).value;
            const zhCNValue = row.getCell(4).value;
            const enUSValue = row.getCell(5).value;
            const jaJPValue = row.getCell(6).value;
            // console.log(key, zhCNValue, enUSValue, jaJPValue, 20);
            console.log(enUSValue, 21);
            zhCNBundle[key] = zhCNValue;
            enUSBundle[key] = enUSValue;
            jaJPBundle[key] = jaJPValue;
        })
    });

    console.log(zhCNBundle);
    console.log(enUSBundle);
    console.log(jaJPBundle);
    fs.writeFileSync('zh-CN.json', JSON.stringify(zhCNBundle, null, 2));
    fs.writeFileSync('en-US.json', JSON.stringify(enUSBundle, null, 2));
    fs.writeFileSync('ja-JP.json', JSON.stringify(jaJPBundle, null, 2));
}

main();