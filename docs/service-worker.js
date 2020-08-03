/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1cfee117f5a9a679d853d82ee44db410"
  },
  {
    "url": "assets/css/0.styles.605b745b.css",
    "revision": "6f8e88636b23281095b93afcca083413"
  },
  {
    "url": "assets/img/home-bg.7b267d7c.jpg",
    "revision": "7b267d7ce30257a197aeeb29f365065b"
  },
  {
    "url": "assets/js/1.b1a75750.js",
    "revision": "cdb165c63fa51ea5c1e7d51cf8191bb1"
  },
  {
    "url": "assets/js/10.cfb1ba8a.js",
    "revision": "aac3ec1ee0b8999cdbb1eeda5ab97577"
  },
  {
    "url": "assets/js/11.458ea742.js",
    "revision": "dd21573a014548ea646311ecebaa456e"
  },
  {
    "url": "assets/js/12.52f1008d.js",
    "revision": "eb5f8a18cb80db43705bf03f3cf81079"
  },
  {
    "url": "assets/js/13.8752d158.js",
    "revision": "69c4988291613c0586a0166ad3afdc8f"
  },
  {
    "url": "assets/js/14.07d71c19.js",
    "revision": "47af1dd055e37b2af1178ca8876dd436"
  },
  {
    "url": "assets/js/15.bb9b5627.js",
    "revision": "d56dca7aa60a0bd6200e82c81363e5a4"
  },
  {
    "url": "assets/js/4.2d4e4335.js",
    "revision": "8d9db0b10ed21cb54e074893044cee4f"
  },
  {
    "url": "assets/js/5.49037609.js",
    "revision": "fa5916adf5db52ac2d707329ffcbb5ff"
  },
  {
    "url": "assets/js/6.88d6756c.js",
    "revision": "62238a1d9a1211858ca27c77ee035b04"
  },
  {
    "url": "assets/js/7.0e3f4994.js",
    "revision": "a71f4cc8aca03d60a39f24c9d82ab8e0"
  },
  {
    "url": "assets/js/8.521d0228.js",
    "revision": "7ed3a7bd239c005c6132b1093a0e4c6e"
  },
  {
    "url": "assets/js/9.a59fc3df.js",
    "revision": "bbb13da129bebc39243315fbddf9d88a"
  },
  {
    "url": "assets/js/app.e71a02e1.js",
    "revision": "927d3000f04edab49313d102ac423703"
  },
  {
    "url": "assets/js/vendors~flowchart.b1222c5f.js",
    "revision": "ddeae57682a006ba86719462a1926475"
  },
  {
    "url": "blogs/FrontEnd/2020-8/tips.html",
    "revision": "bbd7eae9ca0d748c8f5cb02cf6ffa553"
  },
  {
    "url": "blogs/FrontEnd/2020-8/依托于 GithubPage 的静态博客部署方案.html",
    "revision": "60f43da5e4b66d3225f17a463d27b202"
  },
  {
    "url": "categories/FrondEnd/index.html",
    "revision": "9369d594aa7c81b77728ea88785fe623"
  },
  {
    "url": "categories/index.html",
    "revision": "ca404c7f86e16936fc18482c885ad6f4"
  },
  {
    "url": "index.html",
    "revision": "1d08b41d022f37f5daf5250c25a00374"
  },
  {
    "url": "tag/githubpage/index.html",
    "revision": "3cb40791f3966295e1dd4ec25a6d9d52"
  },
  {
    "url": "tag/index.html",
    "revision": "ff8ff71f639c4f26a5400c041b5f1841"
  },
  {
    "url": "tag/vuepress/index.html",
    "revision": "c0fb3d76e78227261a289384dbe95661"
  },
  {
    "url": "timeline/index.html",
    "revision": "da8621893d6c8660e76e4428f09d5795"
  },
  {
    "url": "web-img/author.jpg",
    "revision": "04df4f219cbf8db1bac55822bb7d15bb"
  },
  {
    "url": "web-img/banner02.png",
    "revision": "d1ac6e2de347a5212489385d7674f5fe"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
