const sizeOf = require('image-size');
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas')
const assert = require('assert').strict;
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


const [,,outputFile,image, topLeftSquare, widthInSquares, heightInSquares, url, title] = process.argv;
const csvWriter = createCsvWriter({
    path: outputFile,
    header: [
        {id: 'square', title: 'SQUARE'},
        {id: 'title', title: 'TITLE'},
        {id: 'url', title: 'URL'},
        {id: 'rgbdata', title: 'RGBDATA'}
    ]
});

convert();
async function convert(){
  let dimensions = await sizeOf(image);
  width = dimensions.width;
  height = dimensions.height;
  assert(width === widthInSquares * 10);
  assert(height === heightInSquares * 10);

  loadedImage = await loadImage(image);
  let canvas = createCanvas(width, height),
      ctx = canvas.getContext('2d', { alpha: false });
  let csvData = []

  for(let y = 0 ; y < height/10; y++){
    for(let x = 0; x < width/10; x++){
      //console.log(x,y)
      ctx.drawImage(loadedImage,0,0);
      let squareNum = parseInt(topLeftSquare) + x + (y * 100)
      const rgbaData = ctx.getImageData(x * 10, y * 10, 10, 10).data;
      let rgbData = [];
      for (let i = 0; i < rgbaData.length; i += 4) {
        const [red, green, blue, alpha] = rgbaData.slice(i, i+4);
        assert(alpha === 255, "No transparency is allowed");
        rgbData.push(red, green, blue);
      }
      rgbData = "0x" + rgbData.map(x => x.toString(16).padStart(2, '0')).join('');
      csvData.push({
        square:squareNum,
        title:title,
        url:url,
        rgbdata:rgbData
      });
      console.log(squareNum);
      console.log(url);
      console.log(title);
      console.log(rgbData);
    }
  }
  csvWriter.writeRecords(csvData)       // returns a promise
    .then(() => {
        console.log('...Done');
    });
}
