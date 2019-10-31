<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
        name: "Toast",
        data(){
            return{
                message:'',
                isShow:false
            }
        },
        methods:{
            show(message,duration=2000){
                this.isShow=true;
                this.message=message;
                setTimeout(()=>{
                    this.isShow=false;
                    this.message='';
                },duration)
            }
        }
    }
</script>

<style scoped>
.toast{
  position: fixed;
  text-align: center;
  width: 150px;
  height: 40px;
  background-color:rgba(0,0,0,.75);
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 5px;
  line-height: 40px;
  color: #fff;
  z-index: 20;
}
</style>
