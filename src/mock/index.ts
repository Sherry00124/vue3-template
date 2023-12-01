import Mock from "mockjs"; //导入mockjs

Mock.mock("/login", "post", (params) => {
  let newData = JSON.parse(params.body);
  if (newData.mobile == "1234567890" && newData.password == "123456") {
    return {
      code: 200,
      message: "success",
      result: {
        token: "1234567890",
      },
    };
  } else {
    return {
      code: 200,
      message: "error",
    };
  }
});

Mock.mock("/getUserInfo", "get", (params) => {
  return {
    code: 200,
    result: {
      mobile: "1234567890",
    },
  };
});

Mock.mock("/getAccountInfo", "get", (params) => {
  return {
    code: 200,
    result: {
      record: [],
    },
  };
});
