const fs = require("fs");
const path = require("path");
const readline = require("readline");

const createFile = (fileName, content) => {
  const filePath = path.join(__dirname, "Files", fileName);
  fs.writeFile(filePath, content, { flag: "a" }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`File ${fileName} created!`);
  });
};

const readFile = (fileName) => {
  const filePath = path.join(__dirname, "Files", fileName);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  });
};

const updateFile = (fileName, newContent) => {
  const filePath = path.join(__dirname, "Files", fileName);

  fs.writeFile(filePath, newContent, { flag: "a" }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`File ${fileName} updated!`);
  });
};

const deleteFile = (fileName) => {
  const filePath = path.join(__dirname, "Files", fileName);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`File ${fileName} deleted!`);
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = () => {
  rl.question(
    "Choose an operation: Create, Read, Update, Delete, Exit\n",
    (operation) => {
      switch (operation.toLowerCase()) {
        case "create":
          rl.question("Enter file name: ", (fileName) => {
            rl.question("Enter content for the file created: ", (content) => {
              createFile(fileName, content);
              promptUser();
            });
          });
          break;
        case "read":
          rl.question("Enter file name to read: ", (fileName) => {
            readFile(fileName);
            promptUser();
          });
          break;
        case "update":
          rl.question("Enter file name to update: ", (fileName) => {
            rl.question("Enter new content: ", (newContent) => {
              updateFile(fileName, newContent);
              promptUser();
            });
          });
          break;
        case "delete":
          rl.question("Enter file name to delete: ", (fileName) => {
            deleteFile(fileName);
            promptUser();
          });
          break;
        case "exit":
          rl.close();
          break;
        default:
          console.log("Invalid operation");
          promptUser();
      }
    }
  );
};

promptUser();
