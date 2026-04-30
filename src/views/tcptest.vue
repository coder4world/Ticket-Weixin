<template>
	<p @click="gopage">hello test </p>
</template>

<script>

export default {
  data() {
    return {
			websocket: null,
            isConnect : false,
            rec: null,
			BASE_URL_WS: '192.168.0.101'
    };
  },
  created() {
	//var that = this;

	//页面刚进入时开启长连接
	//this.createWebSocket()
    this.wsclient();
  },
  destroyed: function() {
        //页面销毁时关闭长连接
        this.websocketclose();
	},
  methods: {//（以vue为例）

    wsclient(){
        var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket('ws://70c9z95967.imdo.co:24890', 'echo-protocol');

client.onerror = function() {
    console.log('Connection Error');
};

client.onopen = function() {
    console.log('WebSocket Client Connected');

    function sendNumber() {
        if (client.readyState === client.OPEN) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            client.send(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        console.log("Received: '" + e.data + "'");
    }
};
    },
    gopage(){
        console.log("hello");
    },
	createWebSocket(){
            try {
                //尝试连接
 //               const wsuri = this.BASE_URL_WS; //ws地址
                console.log(this.BASE_URL_WS)
                this.websocket = new WebSocket("ws://192.168.0.101:8100",'echo-protocol');
                this.initWebSocket();
            } catch (e) {
                console.log('尝试创建连接失败');
                //如果无法连接上webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
                //this.reConnect();
            }
        },
        initWebSocket() {
            // 初始化weosocket
            this.isConnect = true;
            this.websocket.onopen = this.websocketonopen;      
            this.websocket.onerror = this.websocketonerror;     
            this.websocket.onmessage = this.websocketonmessage; 
            this.websocket.onclose = this.websocketclose;
        },
        reConnect(){
            //重连函数
            var that = this
            console.log("reConnect this.isConnect:"+this.isConnect);
            if(this.isConnect){
                return;
            }
              
            this.rec&&clearTimeout(this.rec);
            // 延迟5秒重连  避免过多次过频繁请求重连
            this.rec=setTimeout(function(){
                that.createWebSocket();
            },5000);
        },
            //连接成功提示字样
        websocketonopen() {
            console.log("WebSocket连接成功");
        },
            //连接错误
        websocketonerror(e) {
            console.log("WebSocket连接发生错误"+e);
            //this.isConnect=false;
            //调用重连函数
            //this.reConnect();

        },
            //数据接收
        websocketonmessage(e) {
            console.log("websocketonmessage:"+e);
            if(e !== undefined){
                console.log(e);
                this.msg = e.data;
                var json = JSON.parse(e.data);
                console.log(json);
                    this.setCache('carOut',json )
            }
        },
            //服务关闭
        websocketclose(e) {
            // this.initWebSocket();
            this.isConnect=false;
            //重连
            //this.reConnect();
            console.log("connection closed (" + e.code + ")");
        },

	}
};
</script>

<style>

</style>
