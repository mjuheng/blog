module.exports = {
  title: "QiJieH\'s Blog",
  description: "于朝阳升起处,我将踏上旅程",
  base: "/blog/",
  dest: ".vuepress/dist",
  head: [
    [
      "link",
      {
        "rel": "icon",
        "href": "/web-img/author.jpg"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],

  theme: "reco",
  themeConfig: {


    nav: [
      // {
      //   "text": "Home",
      //   "link": "/",
      //   "icon": "reco-home"
      // },
      // {
      //   "text": "TimeLine",
      //   "link": "/timeline/",
      //   "icon": "reco-date"
      // },
      // {
      //   "text": "Contact",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "GitHub",
      //       "link": "https://github.com/recoluan",
      //       "icon": "reco-github"
      //     }
      //   ]
      // }
    ],


    sidebar: "auto",
    type: "blog",
    blogConfig: {
    //   "category": {
    //     "location": 2,
    //     "text": "Category"
    //   },
    //   "tag": {
    //     "location": 3,
    //     "text": "Tag"
    //   }
    },
    friendLink: [
      // {
      //   "title": "午后南杂",
      //   "desc": "Enjoy when you can, and endure when you must.",
      //   "email": "1156743527@qq.com",
      //   "link": "https://www.recoluan.com"
      // },
      // {
      //   "title": "vuepress-theme-reco",
      //   "desc": "A simple and beautiful vuepress Blog & Doc theme.",
      //   "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   "link": "https://vuepress-theme-reco.recoluan.com"
      // }
    ],
    vssueConfig: {
      platform: 'github',
      owner: 'QiJieH',
      repo: 'blog',
      clientId: process.env.VSSUEID,
      clientSecret: process.env.VSSUESECRET
    },
    logo: "/web-img/author.jpg",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "QiJieH",
    authorAvatar: "/web-img/author.jpg",
    record: "1.0.0",
    startYear: "2020",

    modePicker: false, // 默认 true，false 不显示模式调节按钮，true 则显示
    mode : 'light' // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    
  },
  plugins: [
    [
      "meting", {
        meting: {
          auto: "https://music.163.com/#/playlist?id=5156784198"
        },
        aplayer: {
          lrcType: 0
        },
        mobile: {
          cover: false,
          lrc: false
        }
      }
    ],
    [
      '@vuepress/pwa', {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    ],
    [
      "vuepress-plugin-nuggets-style-copy", {
        copyText: "copy",
        tip: {
          content: "复制成功!"
        }
      }
    ],
    [
      'flowchart'
    ],
    [
      '@vuepress-reco/vuepress-plugin-loading-page',false
    ],
    // [
    //   '@vuepress-reco/comments', {
    //     solution: 'vssue',
    //     options: {
    //       title: 'QiJieH\'s blog comments',
    //       platform: 'github',
    //       owner: 'QiJieH',
    //       repo: 'blog',
    //       clientId: process.env.VSSUEID,
    //       clientSecret: process.env.VSSUESECRET,
    //     }
    //   }
    // ],
    [
      'img-lazy'
    ],

  ],
  markdown: {
    lineNumbers: false
  }
}