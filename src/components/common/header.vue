<template>
    <div class="header">
        内容管理系统
        <div class="m-logbar">
            <span class="logInfo" admin="admin">username </span>您好 |
            <span class="logout" @click="handleLogout">退出</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
       return {
        sName: 'abcd'
       }
    },
    created() {
       let arr = document.cookie.split('; ');
       let bArr = arr[arr.length - 1];
       let sArr = bArr.split('=');
       let sUserName = sArr[0];
       this.sName = sUserName;
    },
    methods: {
        handleLogout() {
            let self = this,param = {
                username: 'admin',
                password: 'admin'
            }
            self.$http.post(server + '/user/logout',param).then((res) => {
                if(res.ok){
                    let response = res.data;
                    if(response.code == '200') {
                        location.href = '#/login';
                        this.removeCookie(this.sName)
                    }else {
                        location.href = '#/login';
                    }
                }
            })
        },
        removeCookie(name) {
            setCookie(name, '1', -1);
        }
    }
}
</script>
<style scoped>
.header {
    position: relative;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    padding-left: 50px;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
    background-color: #242f42;
}
.m-logbar {
    float: right;
    padding-right: 20px;
    font-size: 16px;
    color: #fff;
}
</style>
