# TodoApp

.NET 8 Web API と Angular を使用したフルスタック Todo アプリケーションです。JWT認証機能付きで、ユーザー登録・ログイン・Todoの管理が可能です。

## 🚀 機能

- **ユーザー認証**
  - ユーザー登録
  - ログイン・ログアウト
  - JWT トークンベース認証

- **Todo管理**
  - Todo の作成・編集・削除
  - 完了/未完了の切り替え
  - リアルタイム更新

## 🛠 技術スタック

### バックエンド
- .NET 8.0 Web API
- Entity Framework Core (In-Memory Database)
- JWT Bearer Authentication
- BCrypt（パスワードハッシュ化）
- Swagger UI

### フロントエンド
- Angular (最新版)
- TypeScript
- RxJS
- Bootstrap/CSS

## 📋 前提条件

以下のソフトウェアがインストールされている必要があります：

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (LTS版推奨)
- [Angular CLI](https://angular.io/cli)

## 🔧 セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd TodoApp
```

### 2. バックエンドのセットアップ

```bash
cd TodoApp.Api

# 必要なパッケージのインストール
dotnet restore

# プロジェクトのビルド
dotnet build
```

### 3. フロントエンドのセットアップ

```bash
cd ../TodoApp.Client

# 依存関係のインストール
npm install
```

## 🚀 アプリケーションの起動

### バックエンド（Web API）の起動

```bash
cd TodoApp.Api
dotnet run
```

バックエンドは以下のURLで起動します：
- HTTP: `http://localhost:5004`
- HTTPS: `https://localhost:5004`
- Swagger UI: `http://localhost:5004/swagger`

### フロントエンド（Angular）の起動

```bash
cd TodoApp.Client
ng serve
```

フロントエンドは以下のURLで起動します：
- `http://localhost:4200`

## 📱 使用方法

1. ブラウザで `http://localhost:4200` にアクセス
2. 新規ユーザー登録またはログイン
3. Todo の追加・編集・削除・完了切り替えが可能

## 🏗 プロジェクト構造

```
TodoApp/
├── TodoApp.Api/                 # バックエンド (.NET Web API)
│   ├── Controllers/             # APIコントローラー
│   │   ├── AuthController.cs
│   │   └── TodosController.cs
│   ├── Data/                    # データベースコンテキスト
│   │   └── TodoContext.cs
│   ├── Models/                  # データモデル
│   │   ├── Todo.cs
│   │   ├── User.cs
│   │   ├── LoginRequest.cs
│   │   ├── RegisterRequest.cs
│   │   └── AuthResponse.cs
│   ├── Services/                # ビジネスロジック
│   │   └── AuthService.cs
│   └── Program.cs               # アプリケーション設定
└── TodoApp.Client/              # フロントエンド (Angular)
    ├── src/app/
    │   ├── components/          # Angularコンポーネント
    │   │   └── login/
    │   ├── models/              # TypeScript型定義
    │   │   ├── todo.ts
    │   │   └── auth.ts
    │   ├── services/            # Angular サービス
    │   │   ├── todo.service.ts
    │   │   └── auth.service.ts
    │   ├── app.component.*      # メインコンポーネント
    │   ├── app.config.ts        # アプリケーション設定
    │   └── app.routes.ts        # ルーティング設定
    └── package.json
```

## 🔌 API エンドポイント

### 認証
- `POST /api/auth/login` - ユーザーログイン
- `POST /api/auth/register` - ユーザー登録

### Todo
- `GET /api/todos` - 全Todo取得
- `GET /api/todos/{id}` - 特定Todo取得
- `POST /api/todos` - Todo作成
- `PUT /api/todos/{id}` - Todo更新
- `DELETE /api/todos/{id}` - Todo削除

## 🔧 開発・カスタマイズ

### データベースの変更

現在はIn-Memoryデータベースを使用していますが、SQL ServerやPostgreSQLに変更可能です：

```csharp
// Program.cs で以下のように変更
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(connectionString));
```

### CORS設定の変更

本番環境では、`Program.cs`のCORS設定を適切なドメインに変更してください：

```csharp
policy.WithOrigins("https://yourdomain.com")
```

### JWT設定のカスタマイズ

`appsettings.json`でJWT設定をカスタマイズできます：

```json
{
  "JwtSettings": {
    "SecretKey": "your-super-secret-key-here",
    "ExpirationHours": 24
  }
}
```

## 🐛 トラブルシューティング

### CORSエラーが発生する場合
1. バックエンドが正しく起動しているか確認
2. フロントエンドのAPIエンドポイントURL確認
3. CORS設定の確認

### パッケージエラーが発生する場合
```bash
# バックエンド
cd TodoApp.Api
dotnet restore
dotnet build

# フロントエンド
cd TodoApp.Client
npm install
```

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 貢献

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📞 サポート

問題や質問がある場合は、GitHubのIssuesを使用してください。