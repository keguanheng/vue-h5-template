/*
 * @Author: Heng
 * @Date: 2020-05-22 11:42:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-11 11:13:35
 * @Description:
 */

export const set = (key, value, ttl = 24 * 60 * 60 * 1000 * 3) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      data: value,
      expiredTime: new Date().getTime() + ttl
    })
  );
};

export const get = key => {
  let getItem = localStorage.getItem(key);
  if (getItem && JSON.parse(getItem).expiredTime > new Date().getTime()) {
    return JSON.parse(getItem).data;
  } else {
    return "";
  }
};
