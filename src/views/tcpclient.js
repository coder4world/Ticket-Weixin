function senddata2db_tcp(){
		var net = require("net");
		/* 创建TCP客户端 */
		var client = net.Socket();

		/* 设置连接的服务器 */
		client.connect(8000, '192.168.0.101', function () {
			console.log("connect the server");

			/* 向服务器发送数据 */
			client.write("message from client");
		})

		/* 监听服务器传来的data数据 */
		client.on("data", function (data) {
			console.log("tcpclient send:" + data.toString());
		})

		/* 监听end事件 */
		client.on("end", function () {
			console.log("data end");
		})
}

function tcpclient(){
		var net = require("net");
		const client = net.createConnection({
		port: 8000, // 端口需要和服务端保持一致
		host: 'tcp://192.168.0.101' //服务端的ip地址
		});
		client.setEncoding('utf8');
		//当套字节与服务端连接成功时触发connect事件
		client.on('connect', () => {
		client.write('xxxxxxxxxxxx');//向服务端发送数据
		});
		client.on('data', function (data) {
		console.log(data,'服务端发送的消息')
		})
		client.on('error', function (err) {
		console.log('连接失败'+err)
		client.destroy();
		})
}

//export {senddata2db_tcp,tcpclient};

export default tcpclient;
/*module.export ={
	senddata2db_tcp:senddata2db_tcp
};*/