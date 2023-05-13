// TIP: ctrl+cmd+t,生成函数注释

/**
 * @description: 刷新页面(window.location.reload)
 */
export const windowReload = () => {
  window.location.reload();
};

/**
 * @description 跳转(window.location.href)
 */
export const hrefToTarget = (url: string) => {
  window.location.href = url;
};

/**
 * @description 判断是否是移动端（判断比较粗糙）
 * @return {*}
 */
export const isMobile = () => {
  // iOS13以前navigator.platform返回"iPhone"或"iPad"；iOS13以后的iPad，navigator.platform返回"MacIntel"
  if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
    return true;
  }
  return /android|ios|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent
  );
};

/**
 * @description 获取地址栏参数(注意:请确保url是http://aaa.com/ds/?aa=1&bb=323这样子的)
 * @return {*}
 */
export const getUrlParams = (key?: string) => {
  const url = decodeURIComponent(window.location.href);
  const str = url.split('?')[1];
  const obj = {};
  if (str) {
    const keys = str.split('&');
    keys.forEach((item) => {
      const arr = item.split('=');
      obj[arr[0]] = arr[1];
    });
  }
  return key ? obj[key] : obj;
};

export class CacheModel {
  /**
   * @description 获取缓存
   * @param {string} key
   * @return {*}
   */
  getStorage = (key: string) => {
    try {
      const res = localStorage.getItem(key);
      if (res) {
        const data = JSON.parse(res);
        // 如果createTime没有值，则判断该缓存不合法；清除
        if (!data.createTime) {
          this.clearStorage(key);
        } else {
          return data.value;
        }
      }
    } catch (error) {
      this.clearStorage(key);
      console.error(error);
    }
    return null;
  };

  /**
   * @description 设置缓存
   * @param {*} key
   * @param {*} value
   */
  setStorage = (key: string, value: any) => {
    try {
      const createTime = +new Date();
      localStorage.setItem(key, JSON.stringify({ value, createTime }));
    } catch (error) {
      this.clearStorage(key);
      console.error(error);
    }
  };

  /**
   * @description 清除缓存
   * @param {*} key
   */
  clearStorage = (key: string) => {
    localStorage.removeItem(key);
  };

  /**
   * @description 获取缓存,如果缓存已过期,会清除该缓存,并返回null
   * @param {*} key
   */
  getStorageExp = (key: string) => {
    try {
      const res = localStorage.getItem(key);
      if (res) {
        const data = JSON.parse(res);
        const expireTime = data.expireTime;
        const isExpired = expireTime < +new Date();
        // 如果expireTime没有值，则判断该缓存不合法；清除
        // 如果expireTime有值，但小于当前时间，则代表已过期；清除
        if (!expireTime || isExpired) {
          this.clearStorage(key);
        } else {
          return data.value;
        }
      }
    } catch (error) {
      this.clearStorage(key);
      console.error(error);
    }
    return null;
  };

  /**
   * @description 设置缓存以及缓存时长
   * @param {*} key
   * @param {*} value
   * @param {*} expires 缓存时长,单位:小时
   */
  setStorageExp = (key: string, value: any, expires: number) => {
    try {
      if ([key, value, expires].includes(undefined)) {
        console.error('setStorageExp失败，请检查传入的参数!');
        return;
      }
      const createTime = +new Date();
      const expireTime = createTime + expires * 60 * 60 * 1000;
      localStorage.setItem(
        key,
        JSON.stringify({ value, createTime, expireTime })
      );
    } catch (error) {
      this.clearStorage(key);
      console.error(error);
    }
  };
}
