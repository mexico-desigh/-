const express = require("express");
const router = express.Router();
const mysql = require("../../middleware/mysql");

router.post("/", async (req, res) => {
  let { name, pwd } = req.body;
  // console.log(name, pwd);
  var name1 = /^[a-zA-Z0-9_-]{4,16}$/;
  var pwd1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
  // 判断数据格式是否有错
  if (!name1.test(name) && !pwd1.test(pwd)) {
    res.send({
      code: 1,
      msg: "数据格式错误",
    });
  }

  // 判断用户是否已存在
  mysql.query("select * from user where name = ?", name, (err, result) => {
    if (err) {
      return res.send({
        code: 7,
        msg: "注册失败",
      });
    }
    if (result.length) {
      return res.send({
        code: 2,
        msg: "该用户已存在，请前往登录",
      });
    }
  });
  mysql.query(
    "insert into user(id,name,pwd) values(0,?,?)",
    [name, pwd],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send({
          code: 7,
          msg: "注册失败",
        });
      } else {
        return res.send({
          code: 0,
          msg: "注册成功，请登录",
        });
      }
    }
  );
  // console.log(data);
  // res.send(data)
});

module.exports = router;
