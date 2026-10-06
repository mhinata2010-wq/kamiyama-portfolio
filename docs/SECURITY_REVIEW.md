# Portfolio security review — 2026-10-06

対象: kamiyama-portfolio mainのHTML・CSS・JavaScriptと、公開トップページの通常GETで観測したレスポンスヘッダー。侵入テスト・負荷試験・隠しURL探索は実施していません。

## 確認した事実

- 静的HTML/CSS/JavaScript。package.json・lockファイル・API・サーバーコードはありません。依存パッケージのCVE照合対象は見つかりませんでした。
- 外部読み込みはGoogle FontsのCSSとフォント。ローカルJSが画像モーダル、メニュー、スクロール演出を操作します。
- 確認したテキストコードに明らかな秘密鍵/APIキー、eval、innerHTML、ユーザー入力を実行する処理は見つかりませんでした。履歴・画像・Vercel環境変数は未検査です。未検出は安全保証ではありません。
- トップページはHTTPSで200。HSTSは観測済み。CSP、nosniff、Referrer-Policy、X-Frame-Optionsは観測されませんでした。
- Contactフォームはaction="#"、method="post"で、JSに送信ハンドラーはありません。問い合わせを届けるバックエンドはこのリポジトリにありません。

## 変更

vercel.jsonで全パスにCSP、nosniff、Referrer-Policy、X-Frame-Options、Permissions-Policyを設定します。ヘッダー不足は防御設定の改善候補であり、XSSや侵害の証明ではありません。

CSPは同一サイトのJS・画像・CSSとGoogle Fontsだけを許可し、inline script、eval、埋め込み、object、baseを制限します。既存JSはelement.styleの個別プロパティを変更し、style属性文字列やstyleタグは挿入していないため、style-src-attr 'none'との整合性を確認しました。Google Fontsの利用は継続します。将来の解析タグ・外部画像・API・埋め込み追加時は許可元を再検討してください。

フォームは現状の同一オリジン送信だけを許可します。外部フォームサービスへの接続を実装するなら、送信先・個人情報の取扱い・スパム対策を決めた上でform-action/connect-srcを更新してください。現状では実データをフォームへ入力しないでください。

## 検証と公開手順

JSON構文、HTMLの外部資源とCSPの許可元、inline実行要素の有無、JS構文を静的に確認しました。ブラウザでのCSP施行とVercel反映は未検証です。Python等の通常ローカル静的サーバーはvercel.jsonのヘッダーを適用しません。

PRのPreview環境で、フォント・画像・メニュー・画像拡大が動作し、ブラウザConsoleに予期しないCSPエラーがないことを確認してください。Vercel Toolbarなどプレビュー用スクリプトがCSPでブロックされる場合も、本番に不要なホストを安易に許可しないでください。

マージ後の再デプロイで本番へ反映します。反映後はブラウザのNetworkでトップページのResponse Headersを確認してください。現時点では本番サイトに変更を適用していません。

## 限界

Vercelプロジェクトとこのリポジトリの紐付け、Root Directory、環境変数、アカウント権限、デプロイ設定、Git履歴、サーバー側機能は未確認です。Hobby上の侵入テストはVercelポリシーで禁止されています。コードの静的レビューと通常ページのヘッダー確認は侵入テストとは区別しています。

参考:
- https://vercel.com/docs/project-configuration/vercel-json
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/style-src-attr
- https://vercel.com/kb/guide/penetration-testing-on-vercel
