import axios from "axios";
import fs from "fs";
import data from './data.json' with {type: 'json'}

const filenameList = ['Image1.jpeg','Image2.jpeg','Image3.jpeg','Image4.jpeg','Image5.jpeg','Image6.jpeg','Image7.jpeg','Image8.jpeg','Image9.jpeg','Image10.jpeg','Image11.jpeg','Image12.jpeg']

async function downloadImage(url, filename) {
  const response = await axios.get(url, { responseType: "arraybuffer" });

  fs.writeFile(filename, response.data, (err) => {
    if (err) throw err;
    console.log("Image downloaded successfully!");
  });
}

data.forEach((imgUrl, idx) => {
  downloadImage(imgUrl.src, filenameList[idx])
})