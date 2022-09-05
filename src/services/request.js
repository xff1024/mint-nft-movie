import { API_HOST } from "./constant";
export default async (url = "", data = {}, type = "GET") => {
  const baseUrl = API_HOST;
  type = type.toUpperCase();
  url = baseUrl + url;

  if (type === "GET") {
    let dataStr = "";
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });
    if (dataStr !== "") {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }
  let requestConfig = {
    credentials: "same-origin",
    method: type,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    cache: "force-cache",
  };

  if (type === "POST") {
    Object.defineProperty(requestConfig, "body", {
      value: JSON.stringify(data),
    });
  }
  try {
    const response = await fetch(url, requestConfig);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    throw new Error(error);
  }
};
