import LocalService from "utils/local_request.js";
import RemoteService from "utils/remote_request.js";

export const getDataSheetsLocal = (params) => {
  return LocalService({
    url: "/datasheets/" + params,
    method: "get",
    headers: {
      "Content-Type": "text/csv",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
};

export const getDataSheetsRemote = (params) => {
  RemoteService.setServicePara(import.meta.env.VITE_DB, "json");
  return RemoteService.RemoteService({
    method: "get",
    url: params,
    headers: {
      "Content-Type": "text/csv",
      // "Cache-Control": "no-cache",
      // Pragma: "no-cache",
      // Expires: "0",
    },
  });
};
