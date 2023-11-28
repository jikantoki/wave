// THIS FILE SHOULD NOT BE VERSION CONTROLLED

// https://github.com/NekR/self-destroying-sw

/*
self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  self.registration.unregister()
    .then(function () {
      return self.clients.matchAll()
    })
    .then(function (clients) {
      clients.forEach(client => client.navigate(client.url))
    })
})
*/
var CACHE_NAME = 'pwa-sample-caches'
/**
 * キャッシュしたいコンテンツ
 */
var urlsToCache = []

self.addEventListener('install', function (event) {
  //console.log('sw event: install called')

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})

self.addEventListener('fetch', function (/*event*/) {
  /*console.log('sw event: fetch called')*/
  /*
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response ? response : fetch(event.request)
    })
  )*/
})

//通知がクリックされたときの挙動はこれ
self.addEventListener('notificationclick', function (event) {
  /*console.log('sw event: notification clicked')*/
  event.notification.close()

  clients.openWindow('/')
  if(event.action && event.action !== ''){
  console.log('通知イベント' + event.action + 'を実行しました')
  } else {
    console.log('デフォルトの通知イベントを実行しました')
  }
})

self.addEventListener('push', function (event) {
  //console.log('sw event: push called')
  /**
   * ## 通知の実装
   * notificationDataObjの中身
   * ```json
   * {
   *   "title": "Notification title",
   *   "option": { Option }
   * }
   * ```
   */
  let notificationDataObj
  try {
    notificationDataObj = event.data.json()
  } catch {
    notificationDataObj = {
      title: 'Webサイトからの通知',
      option: {
        body: event.data.text()
      }
    }
  }
  /**
   * titleの中身はstringな必要があります
   */
  let title = notificationDataObj.title
  /**
   * ## 通知オプションの書き方
   * actionsは2つまで実装可能
   *
   * actions.actionの中身をnotificationClickに渡します
   * ```json
   * {
   *   "body": "message",
   *   "icon": "icon_url",
   *   "badge": "badge_url",
   *   "image": "image_url",
   *   "tag": "tag(optional)",
   *   "actions": [
   *     {
   *       "action": "action_name",
   *       "title": "action_title"
   *     }
   *   ]
   * }
   * ```
   */
  const option = notificationDataObj.option
  event.waitUntil(self.registration.showNotification(title, option))

  /**
   * notification example
   * テスト時はこれコピーして使う
   */
  /*
    {
      "title": "通知テスト",
      "option": {
        "body": "メッセージサンプル",
        "icon": "/img/icon192.png",
        "tag": "tag, warn",
        "actions": [
          {
            "action": "testA",
            "title": "アクションA"
          },
          {
            "action": "testB",
            "title": "アクションB"
          }
        ]
      }
    }
   */
})
self.addEventListener('pushsubscriptionchange', (e) => {
  console.log(e)
})
