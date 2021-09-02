const express = require("express");
const app = express();
// const mysql = require("./middleware/mysql");
app.listen(3000);

// 数据处理

// 中间件
app.use(require("./middleware/cors"));
app.use(require("./middleware/session"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
// 路由
app.use("/", require("./router/router"));
