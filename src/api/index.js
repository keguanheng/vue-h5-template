// 引入接口
import { getRequest, postRequest } from "../util/axios";

// 接口名称 示例接口
export const _getClolum = params => {
  return getRequest("/get/colum", params);
};
// 接口名称 示例接口
export const _getSave = params => {
  return postRequest("/vo/save", params);
};
