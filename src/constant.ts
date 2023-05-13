export const GITHUB_REPO = 'https://github.com/galaxy-s10/vue3-naive-admin';

export const QINIU_CDN_URL = 'https://resource.hsslive.cn/';
export const QINIU_BUCKET = 'hssblog'; // 七牛云bucket
export const QINIU_PREFIX = {
  'image/': 'image/',
  'backupsDatabase/': 'backupsDatabase/',
  'media/': 'media/',
  'nuxt-blog-client/': 'nuxt-blog-client/',
};

// 全局的localStorage的key
export const LOCALSTORAGE_KEY = {
  currEnv: 'currEnv',
};

// 全局的cookie的key
export const COOKIE_KEY = {
  loginEnv: 'loginEnv',
};

export const envList = [
  {
    value: 'beta',
    label: '测试环境',
  },
  {
    value: 'prod',
    label: '正式环境',
  },
  {
    value: 'development',
    label: '本地开发环境',
  },
];

export const ROUTE_ROLES = { SUPER_ADMIN: 'SUPER_ADMIN' };

export const USER_ROLE = { SUPER_ADMIN: 'SUPER_ADMIN' };

// 路由sort，值越大越往上
export const ROUTE_SORT = {
  dashboard: 300,

  log: 200,
  blacklist: 200,

  nest: 180,
  setting: 180,

  user: 120,
  auth: 110,
  role: 110,
  thirdUser: 100,

  // comment: 80,
  // star: 80,

  qiniu: 70,

  error: 10,
};
