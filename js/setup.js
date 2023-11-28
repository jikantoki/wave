//主にサーバーサイドでSEO対策する用

import PackageJson from '~/package.json'
import Functions from '~/js/Functions'
export default {
  /**
   * いい感じのタイトルを付ける
   * @param {string} newTitle 新しく付けたいタイトル
   * @returns 引数に合わせて設定したら0、デフォルトのまま設定したら1
   */
  setTitle: (newTitle) => {
    let siteName = PackageJson.name
    siteName = Functions.ifEnglishStartUpper(siteName)
    let pageTitle
    let returnCode
    if (newTitle) {
      pageTitle = `${newTitle} | ${siteName}`
      returnCode = 0
    } else {
      pageTitle = siteName
      returnCode = 1
    }
    useServerHead({
      title: pageTitle,
    })
    useServerSeoMeta({
      ogTitle: pageTitle,
    })
    return returnCode
  },
  /** 新しいWebサイトの説明文をつける */
  setDescription: (newDescription) => {
    if (!newDescription) {
      useServerSeoMeta({
        description: '',
        ogDescription: '',
      })
      return null
    } else {
      useServerSeoMeta({
        description: newDescription,
        ogDescription: newDescription,
      })
      return newDescription
    }
  },
  /** 新しいWebサイトのOGP画像をつける */
  setImage: (fullURL) => {
    let isURL
    try {
      const url = new URL(fullURL)
    } catch (e) {
      isURL = false
    }
    if (!fullURL || !isURL) {
      useServerSeoMeta({
        ogImage: '',
      })
      return null
    } else {
      useServerSeoMeta({
        ogImage: fullURL,
      })
      return fullURL
    }
  },
}
