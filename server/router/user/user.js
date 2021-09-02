const express = require("express");
const router = express.Router();
const mysql = require("../../middleware/mysql");

router.use((req, res, next) => {
  if (!req.session.userInfo) {
    res.send({
      code: 5,
      msg: "用户未登录",
    });
  } else {
    next();
  }
});

// 修改用户名
router.post("/name", async (req, res) => {
  // 判断数据格式
  let data = req.body;
  // console.log(data);
  if (!/^[a-zA-Z0-9_-]{4,16}$/.test(data.newName)) {
    res.send({
      code: 1,
      msg: "数据格式错误",
    });
  }
  // 判断是否与其他账号同名
  mysql.query(
    "select * from user where name = ?",
    data.oldName,
    (err, result) => {
      if (err) {
        return res.send({
          code: 6,
          msg: "登录失败",
          data: "111",
        });
      } else {
        if (result.length > 1) {
          return res.send({
            code: 2,
            msg: "该用户名已存在",
          });
        } else {
          // 修改用户名
          mysql.query(
            "update user set name = ? where id = ?",
            [data.newName, data.id],
            (err, result) => {
              if (err) {
                return res.send({
                  code: 6,
                  msg: "登录失败",
                });
              } else {
                req.session.userInfo.name = data.newName; // 修改session数据
                return res.send({
                  code: 0,
                  msg: "用户名修改成功",
                });
              }
            }
          );
        }
      }
    }
  );
});

// 修改密码
router.post("/pass", async (req, res) => {
  // 判断数据格式
  let data = req.body;
  // console.log(data);
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/.test(data.newPass)) {
    res.send({
      code: 1,
      msg: "数据格式错误",
    });
  }
  // 修改密码
  mysql.query(
    "update user set pwd = ? where id = ?",
    [data.newPass, data.id],
    (err, result) => {
      if (err) {
        return res.send({
          code: 6,
          msg: "服务器连接失败",
        });
      } else {
        req.session.userInfo.pwd = data.newPass; // 修改session数据
        return res.send({
          code: 0,
          msg: "密码修改成功",
        });
      }
    }
  );
});

// 上传头像
router.use("/avatar", require("./avatar"));

module.exports = router;
