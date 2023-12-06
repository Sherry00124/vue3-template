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
      message: "User name or password error.",
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
    total: 100,
    result: {
      records: [
        {
          id: 0,
          name: "张三",
          mobile: "111111",
        },
        {
          id: 1,
          name: "张三",
          mobile: "111111",
        },
        {
          id: 2,
          name: "张三",
          mobile: "111111",
        },
        {
          id: 3,
          name: "张三",
          mobile: "111111",
        },
        {
          id: 4,
          name: "张三",
          mobile: "111111",
        },
        {
          id: 5,
          name: "张三",
          mobile: "111111",
        },
        {
          id: 6,
          name: "张三",
          mobile: "111111",
        },
      ],
    },
  };
});
