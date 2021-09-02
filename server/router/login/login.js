const express = require("express");
const router = express.Router();
const mysql = require("../../middleware/mysql");

router.post("/", async (req, res) => {
  let { name, pwd } = req.body;

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
      res.send({
        code: 6,
        msg: "服务器连接失败",
      });
    } else {
      if (!result.length) {
        res.send({
          code: 3,
          msg: "该用户不存在，请先注册",
        });
      } else {
        // 判断密码是否正确
        if (pwd == result[0].pwd) {
          req.session.userInfo = result[0]; // 将用户信息保存到session中
          res.send({
            code: 0,
            msg: "登录成功",
            data: result[0],
          });
        } else {
          res.send({
            code: 4,
            msg: "密码错误，请重新输入密码",
          });
        }
      }
    }
  });
  // console.log(data);
  // res.send(data)
});

// 检测是否已登录
router.post("/check", async (req, res) => {
  let data = req.session.userInfo;
  // console.log(data);
  if (data) {
    res.send({
      code: 0,
      msg: "用户已登录",
      data: data,
    });
  } else {
    res.send({
      code: 5,
      msg: "用户未登录，请先登录",
    });
  }
});

// 退出登录
router.post("/logout", async (req, res) => {
  req.session.destroy(); //销毁session
  res.send({
    code: 0,
    msg: "退出登录成功",
  });
});
module.exports = router;
