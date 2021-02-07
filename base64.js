const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const convertToBase64 = function (str) {
  return Buffer.from(str, "utf8").toString("base64");
};

rl.question(
  "Type the name of the file. Name can be: text1 , text2 , text3 -  ",
  (answer) => {
    if (answer === "text1" || answer === "text2" || answer === "text3") {
      fs.readFile(`./Texts/${answer}.txt`, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        const result = convertToBase64(data);
        fs.writeFile(`./Texts/${answer}toBase64.txt`, result, (err) => {
          if (err) throw err;
          console.log("File saved!");
        });
      });
    } else {
      console.log("You typed wrong name of the file");
    }

    rl.close();
  }
);
