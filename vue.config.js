module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/NotionList/' // test20200915 為 repo 名稱
      : '/'
  }