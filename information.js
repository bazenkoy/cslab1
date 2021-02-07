const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "Type the name of the file. Name can be: text1 , text2 , text3 -  ",
  (answer) => {
    if (answer === "text1" || answer === "text2" || answer === "text3") {
      fs.readFile(`./Texts/${answer}toBase64.tar.bz2`, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
				}
				
        let stats = fs.statSync(`./Texts/${answer}toBase64.tar.bz2`);
				let { size } = stats;
				
        const frecOfOc = data
          .toLowerCase()
          .split("")
          .reduce((acc, value) => {
            if (!!acc[value]) {
              acc[value] = acc[value] + 1;
            } else {
              acc[value] = 1;
            }
            return acc;
					}, {});
					
        const frecOfOcObject = Object.keys(frecOfOc).reduce(
          (acc, value) => {
            acc[value] = acc[`${value}`] / data.length;
            return acc;
          },
          { ...frecOfOc }
        );

        const enrtopy = Object.keys(frecOfOcObject).reduce((acc, value) => {
          acc += frecOfOcObject[value] * Math.log2(1 / frecOfOcObject[value]);
          return acc;
        }, 0);

        const countOfInformation = enrtopy * data.length;

        console.log(`File size ${size} bytes`);
        console.log(`Entropy =  ${enrtopy}`);
        console.log(`Info quantity ${countOfInformation / 8} bytes, ${countOfInformation} bits`);
				console.log(`Info quantity ${countOfInformation / 8} bytes, ${countOfInformation} bits`);
				console.log(`Symbols count ${data.length}`);
				console.log(frecOfOcObject);
      });
    } else {
      console.log("You typed wrong name of the file");
    }

    rl.close();
  }
);
