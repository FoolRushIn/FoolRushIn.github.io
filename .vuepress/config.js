module.exports = {

  "plugins": [
	["@vuepress/last-updated"],
    [
      "dynamic-title",
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 2000
      }
    ],
    [
    "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    {
      theme: ["wanko"],
      clean: false,
      messages: {
        welcome: '我是lookroot欢迎你的关注 ',
        home: '菠萝菠萝蜜',
        theme: '好吧，希望你能喜欢我的其他小伙伴。',
        close: '再见哦'
      }
    }
  ]
  ],


  "title": "Suelcun-blog",
  "description": "Suelcun-blog",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/logo1.ico"
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
  "theme": "reco",
  "themeConfig": {
    "lastUpdated": "Last Updated",
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/FoolRushIn",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },

    "logo": "/logo1.png",
    "search": true,
    "searchMaxSuggestions": 10,
    
    "author": "Suelcun",
    "authorAvatar": "/logo1.png",
    "record": "",
    "startYear": ""
  },
  "markdown": {
    "lineNumbers": true
  }
}