console.log("PUBLIC_KEY_IMAGE_KIT:", process.env.PUBLIC_KEY_IMAGE_KIT);
console.log("PRIVATE_KEY_IMAGE_KIT:", process.env.PRIVATE_KEY_IMAGE_KIT);
console.log("URL_ENDPOINT_IMAGE_KIT:", process.env.URL_ENDPOINT_IMAGE_KIT);

const ImageKit = require("imagekit");

const imageKitConfig = new ImageKit({
  publicKey: process.env.PUBLIC_KEY_IMAGE_KIT,
  privateKey: process.env.PRIVATE_KEY_IMAGE_KIT,
  urlEndpoint: process.env.URL_ENDPOINT_IMAGE_KIT,
});

module.exports = imageKitConfig;
