## 动态作品集模板

作品集由 `script.js` 顶部的 `portfolioItems` 数组驱动。新增或修改作品时，复制一个对象并调整这些字段：

- `title`：作品标题
- `author`：作者
- `year`：创作或展出年份
- `medium`：作品媒介
- `category`：筛选分类
- `image`：作品图片地址
- `description`：作品简介
- `location`：展览地点或所属项目

图片可以直接使用远程地址，也可以放入项目目录，例如 `assets/work-01.jpg`，然后将 `image` 改为该路径。页面会自动生成作品卡片、分类筛选和详情弹窗，不需要手动复制 HTML。
