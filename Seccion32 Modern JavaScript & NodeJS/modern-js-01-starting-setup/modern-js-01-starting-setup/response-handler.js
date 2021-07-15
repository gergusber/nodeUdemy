import path, { dirname } from "path";
// import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const resHandler = (req, res, next) => {
  fs.readFile("my-page.html", "utf8")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });

  //   res.sendFile(path.join(__dirname, "my-page.html"));
};

// export default resHandler;
