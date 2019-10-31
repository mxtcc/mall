// vue脚手架3配置文件，添加此文件，和内部设置一同合并
module.exports={
  configureWebpack:{
    resolve:{
      alias:{
        'assets':'@/assets',
        'components':'@/components',
        'views':'@/views',
        'network':'@/network',
        'common':'@/common'
      }
    }
  }
}
