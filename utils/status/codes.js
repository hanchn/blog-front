// 状态码和消息集中管理
module.exports = {
  SUCCESS: { code: 0, msg: '操作成功' },
  FAIL: { code: 1, msg: '操作失败' },
  NOT_FOUND: { code: 404, msg: '资源未找到' },
  UNAUTHORIZED: { code: 401, msg: '未授权' },
  FORBIDDEN: { code: 403, msg: '禁止访问' },
  SERVER_ERROR: { code: 500, msg: '服务器错误' }
};