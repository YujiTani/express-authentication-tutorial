import dotenv from "dotenv";

dotenv.config();

const basicAuth = (req, res, next) => {
	const authHeader = req.headers.authorization;

	const auth = {
		username: process.env.USERNAME,
		password: process.env.PASSWORD,
	};
	if (!auth.username || !auth.password) {
		throw new Error("認証情報の設定に失敗しました");
	}

	if (!authHeader || !authHeader.startsWith("Basic ")) {
		// ref: https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/WWW-Authenticate
		res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
		return res.status(401).send("認証用のヘッダーが設定されていません");
	}

	const [username, password] = decodeCredentials(authHeader);

	// ipassの検証
	if (username !== auth.username || password !== auth.password) {
		return res.status(401).send("認証に失敗しました");
	}

	next();
};

// 認証用のヘッダーをデコード
const decodeCredentials = (authHeader) => {
	// console.log("c=========🚀 ~ decodeCredentials ~ authHeader:", authHeader);
	try {
		const token = authHeader.split(" ")[1];
		const decoded = Buffer.from(token, "base64").toString();
		// console.log("c=========🚀 ~ decodeCredentials ~ decoded:", decoded);
		return decoded.split(":");
	} catch (error) {
		throw new Error("認証用のヘッダーのデコードに失敗しました");
	}
};

export default basicAuth;
