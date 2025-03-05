import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

import basicAuth from "./auth/basicAuth.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// basicAuth middleware app.use(route, middleware)
app.use("*", express.urlencoded({ extended: true }));
app.use("*", express.json());
app.use("*", basicAuth);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("エラーが発生しました");
});

// routes
app.get("/", (_req, res) => {
	try {
		res.render("index", {
			title: "メインページ",
			message: "Basic認証に成功しました！",
			currentTime: new Date().toLocaleString("ja-JP"),
		});
	} catch (error) {
		console.error("レンダリングエラー:", error);
		res.status(500).send("ページの表示中にエラーが発生しました");
	}
});

app.get("/about", (_req, res) => {
	try {
		res.render("about", {
			title: "サブページ",
			currentTime: new Date().toLocaleString("ja-JP"),
		});
	} catch (error) {
		console.error("レンダリングエラー:", error);
		res.status(500).send("ページの表示中にエラーが発生しました");
	}
});

// 404ハンドラー
app.use((_req, res) => {
	res.status(404).render("error", {
		title: "ページが見つかりません",
		message: "お探しのページは存在しません",
	});
});

// start server
app.listen(PORT, () => {
	console.log(`サーバーが起動しました: http://localhost:${PORT}`);
});
