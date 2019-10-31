<!--参数-->
<template>
    <div class="param-info" v-if="Object.keys(paramInfo).length!==0">
        <table class="info-size" v-for="(table,index) in paramInfo.size" :key="index">
            <tr v-for="(tr,indexTr) in table" :key="indexTr">
                <td v-for="(td,indexTd) in tr" :key="indexTd">{{td}}</td>
            </tr>
        </table>
        <table class="info-param">
            <tr v-for="(info,index) in paramInfo.infos">
                <td class="info-param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-img" v-if="paramInfo.image.length!==0">
          <img :src="paramInfo.image" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailParamInfo",
        props:{
            paramInfo:{
                type:Object,
                default(){
                    return{}
                }
            }
        }
    }
</script>

<style scoped>
  .param-info{
      padding: 20px 15px;
      font-size: 14px;
      border-bottom: 5px solid #f2f5f8;
  }

  .param-info table{
    width: 100%;
    /*表格设置合并边框模型*/
    border-collapse: collapse;
  }

  .param-info table tr{
    height: 42px;
  }

.param-info table tr td{
  border-bottom: 1px solid rgba(100,100,100,.1);
}

  .info-param-key{
    /*value里面的值比较长时，就会挤压到key，设置key的宽度可以解决*/
    width: 34%;
  }

  .info-param{
    border-top:1px solid rgba(0,0,0,.1);
  }

  .param-value{
    color: #eb4868;
  }

  .info-img img{
    width: 100%;
  }
</style>
