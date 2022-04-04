import RemoteService from "utils/remote_request.js";

export const getAudio = (params) => {
  RemoteService.setServicePara(params, "blob");
  return RemoteService.RemoteService({
    method: "get",
    headers: {},
  });
};
