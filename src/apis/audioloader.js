import RemoteService from "utils/remote_request.js";
import FetchService from "utils/fetch_request.js";

export const getAudio = (params, cdnon) => {
  //nocors=true 使用fetch从cdn拉取资源
  //nocors=false 使用axios拉取资源
  if (cdnon) {
    return FetchService.getArraybuffer(params);
  } else {
    RemoteService.setServiceURL(params);
    return RemoteService.RemoteService({
      method: "get",
      headers: {},
    });
  }
};
