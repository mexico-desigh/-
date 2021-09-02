const express = require("express");
const router = express.Router();
const mysql = require("../../middleware/mysql");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/file/avatar"));
  },
  filename: function (req, file, cb) {
    let { ext } = path.parse(file.originalname);
    let name = req.session.userInfo.id;
    req.filename = name + ext;
    cb(null, name + ext);
    // console.log(file);
    // console.log(req.session);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/", (req, res) => {
  upload(req, res, async (err) => {
    // 上传失败
    if (err) {
      return res.send({
        code: 7,
        msg: "上传失败",
      });
    }
    // 上传成功
    // 修改数据库信息
    let id = req.session.userInfo.id;
    let avatar = `/file/avatar/${req.filename}`;
    await mysql.query(
      "update user set avatar = ? where id = ?",
      [avatar, id],
      (err, result) => {
        if (err) {
          return res.send({
            code: 8,
            msg: "上传失败",
          });
        }
      }
    );
    // 修改session
    req.session.userInfo.avatar = avatar;

    res.send({
      code: 0,
      msg: "头像上传成功",
      data: req.session.userInfo,
    });
  });
});

module.exports = router;
