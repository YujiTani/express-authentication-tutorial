# Basic認証デモアプリケーション

このプロジェクトは、Node.jsとExpressを使用したBasic認証のデモアプリケーションです。シンプルなウェブページにBasic認証を実装し、認証後にモダンなUIのページを表示します。

## 機能

- Basic認証によるアクセス制限
- モダンなUIデザイン
- レスポンシブレイアウト
- 複数ページの実装（メインページとサブページ）
- 環境変数を使用した設定

## インストール方法

```bash
# リポジトリをクローン
git clone https://github.com/yourusername/basic-auth-demo.git
cd basic-auth-demo

# 依存パッケージをインストール
npm install
```

## 使用方法

```bash
# 開発モードで実行（ホットリロード有効）
npm run dev

# 本番モードで実行
npm start
```

サーバーが起動したら、ブラウザで http://localhost:3001 にアクセスします。
Basic認証のダイアログが表示されるので、設定した認証情報を入力してください。

## プロジェクト構造

```
basic-auth-demo/
├── server.js          # メインサーバーファイル
├── auth.js            # Basic認証の実装
├── .env               # 環境変数（gitignoreに追加）
├── package.json       # プロジェクト設定
├── nodemon.json       # 開発用設定
├── public/            # 静的ファイル
│   └── style.css      # スタイルシート
└── views/             # テンプレートファイル
    ├── index.ejs      # メインページ
    ├── about.ejs      # サブページ
    └── error.ejs      # エラーページ
```

## 技術スタック

- Node.js
- Express
- EJS（テンプレートエンジン）
- dotenv（環境変数管理）
- nodemon（開発用ホットリロード）

## Basic認証について

このデモでは、HTTPのBasic認証を実装しています。Basic認証は以下の特徴があります：

- シンプルな実装
- ブラウザ標準のダイアログを使用
- Base64エンコードによる認証情報の送信
- HTTPSと組み合わせることで安全性が向上
