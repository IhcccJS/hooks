
function QueryPage (getInstance) {
  // 能获取用户配置
  // 能获取操作方法

  const apiInstance = getInstance();

  console.log(apiInstance);

  // 请求之前
  function onBefore () {
    // 能获取请求参数
    // 能处理用户配置
    console.log("before");
  }

  // 请求结束
  function onFinish () {
    // 能获取响应结果和错误
    console.log("finish");
  }

  // 请求成功
  function onSuccess () {
    // 能获取响应结果
    console.log("success");
  }

  // 请求失败
  function onFail () {
    // 能获取错误信息
    console.log("fail");
  }

  return {
    onBefore,
    onFinish,
    onSuccess,
    onFail,
  }
}

export default QueryPage;
