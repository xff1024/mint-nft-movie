/**
 * url -> 文件流
 * @param {*} url
 * @param {*} file_name
 */
export const parseUrlToBlob = async (url, file_name) => {
  return fetch(url, {
    method: "GET",
    mode: "no-cors",
  })
    .then((r) => r.blob())
    .then(
      (blobFile) =>
        new File([blobFile], file_name || "image.jpg", { type: "image/jpg" })
    );
};
