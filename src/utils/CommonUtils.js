class CommonUtils {
  static getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  
  static HandleBufferToBase64 = (file) =>
    new Promise(async(resolve, reject) => {  
      try {
        // const dataUrl = new FileReader();
        console.log(file)
        const dataUrl = await new Buffer(file, "base64").toString("binary");
        resolve(dataUrl)
      } catch (error) {
        reject(error)
        console.log(error)
      }
    // dataUrl.onload = () => resolve(dataUrl.result);
    // dataUrl.onerror = reject;
    // Row.dataUrl = dataUrl;
  });
}

export default CommonUtils;
