# Notes for deploying on Github Pages

## References & Tools
+ https://create-react-app.dev/docs/deployment/#github-pages
+ https://markdowntohtml.com/

## gh-pages分支說明
Github 所提供的Github-Pages服務，就如同一個免費的靜態網頁伺服器

在這裡，所有的html、css、前端js都可以正常地被傳遞與執行

因此，小弟我先透過React的`package.json`安裝gh-pages套件，並執行deploy腳本，順利的在此Repo上自動設立帶有建置好之靜態React HTML文件的`gh-pages`分支

然後我再到此Repo的設定中該改預設Github-Pages所使用的Branch(**如下圖所示**)
![](https://i.imgur.com/PeLT4RB.png)

最後我切換至`gh-pages`分支，並移動建置好的React Production code到`reactjs`資料夾，然後透過線上Markdwon to HTML工具，手動在此分支的`root`建立了`index.html`，Push to Origin並等待GitHub-Pages的建置後，`Ctrl` + `F5`重整網頁即可看到如同我所設想的靜態網頁伺服器的部署結果!