# CC Chat

CC Chat はコマンドラインからどこからでもClaude Code チャットインターフェースを起動できるグローバルCLIツールです。

## インストール

### NPMでグローバルインストール (推奨)

```bash
npm install -g @s4k4r1/cc-chat
```

### 代替方法: ローカルでのリンク

```bash
git clone https://github.com/yourusername/cc-chat.git
cd cc-chat
bun install
bun link
```

## 使用方法

### 基本的な使用方法

どこからでもCC Chatを起動できます：

```bash
# どこからでも実行可能（サーバー起動）
cc-chat

# カスタムポートで起動
cc-chat --port 8080
cc-chat start -p 8080

# 手動でビルドを実行
cc-chat init

# ヘルプメッセージを表示
cc-chat --help
cc-chat -h
```

### コマンド

- **start** (デフォルト): CC Chatサーバーを起動
- **init**: CC Chatプロジェクトをビルド

### 機能

- **どこからでも起動**: ディレクトリに関係なくCC Chatを起動
- **自動ビルド**: 初回起動時やビルドが存在しない場合は自動でビルド
- **手動ビルド**: `init`コマンドで明示的にビルドを実行
- **カスタムポート**: `--port` オプションで任意のポートを指定
- **グレースフルシャットダウン**: Ctrl+C で安全にサーバーを停止
- **作業ディレクトリ対応**: コマンドを実行したディレクトリをプロジェクトディレクトリとして認識

### 例

```bash
# どこからでもCC Chatを起動
cc-chat

# 手動でビルドを実行
cc-chat init

# ポート8080でCC Chatを起動
cc-chat --port 8080

# startコマンドを明示的に使用
cc-chat start -p 8080

# サーバーにアクセス
# ブラウザで http://localhost:3004 (または指定したポート) を開く
```

## トラブルシューティング

### cc-chat コマンドが見つからない場合

NPMでインストールした場合：
```bash
npm install -g @s4k4r1/cc-chat
```

ローカルリンクの場合：
```bash
bun link  # プロジェクトディレクトリで再実行
```

### ポートが使用中の場合

```bash
cc-chat --port 3005
```

別のポートを指定してください。

## 開発者向け

CLIスクリプトは `bin/cc-chat` にあります。Node.js で実装されており、引数解析とプロセス管理を行います。

## ライセンス

MIT
