<template>
    <div>
        <section>
            <div class="header">
                <div style="display: flex; justify-content: flex-start; padding-left: 20px; align-items: center;">
                    <div style="height: 60px; width: 60px; background: #fff; border-radius: 50%; overflow: hidden;">
                        <img :src="headimgurl" alt="头像" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="header-name" style="margin-left: 15px; text-align: left;">
                        <div class="font-16" style="color: #fff; font-weight: bold;">{{nickname}}</div>
                        <div class="header-name_credit van-badge" style="margin-top: 5px;">信用值 {{credit}}</div>
                    </div>
                </div>
                
                <div class="header-info">
                    <ul class="header-money m-top">
                        <li class="text-center">
                            <p style="font-size:24px;">￥{{mtrd.toFixed(2)}}</p>
                            <p>待结算</p>
                        </li>
                        <li class="text-center">
                            <p style="font-size:24px;">￥{{mpayed.toFixed(2)}}</p>
                            <p>已打款</p>
                        </li>
                        <li class="text-center">
                            <p style="font-size:24px;">￥{{margue.toFixed(2)}}</p>
                            <p>纠纷中</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <van-cell-group class="van-hairline" style="margin-top: 10px;">
            <van-cell title="信用值说明" is-link @click="show = true"/>
            <van-cell title="绑定收款账户" is-link @click="zfb"/>
            <van-cell title="打款记录" is-link @click="payshow"/>
            <van-cell title="交易查询" is-link @click="trdquery"/>
        </van-cell-group>

        <van-dialog v-model="show" title="信用值说明" confirmButtonText="确定">
            <div style="padding: 20px; font-size: 14px; color: #666; line-height: 1.6; text-align: left;">
                为减少坏品率，保护各方利益，平台引入信用值机制：
                <br>1. 每次成功交易，信用值 <b>+1</b> 分；
                <br>2. 发生用户原因纠纷，信用值 <b>-10</b> 分；
                <br>3. 信用值低于 50 分将无法进行交易。
            </div>
        </van-dialog>
        
        <tabbra_nav></tabbra_nav>
    </div>
</template>

<script>
import tabbra_nav from "./tabbar_nav"

export default {
    components: { tabbra_nav },
    data() {
        return {
            show: false,
            mtrd: 0,
            mpayed: 0,
            margue: 0,
            headimgurl: "",
            nickname: "加载中...",
            user_id: '',
            credit: 0
        };
    },
    created() {
        // 从 localStorage 初始化
        this.user_id = localStorage.getItem("openid");
        this.nickname = localStorage.getItem("nickname") || "微信用户";
        this.headimgurl = localStorage.getItem("headimgurl") || "https://img.yzcdn.cn/vant/cat.jpeg";

        if (this.user_id) {
            this.getuserinfo_db();
            this.getorder_db();
        } else {
            console.warn("No OpenID found, redirecting may be needed.");
        }
    },
    methods: {
        trdquery() { this.$router.push("/trdsch"); },
        payshow() { this.$router.push({ path: "/paylist", query: { user_openid: this.user_id } }); },
        zfb() { this.$router.push("/zhifubao"); },

        // 从后端同步最新的用户信息（包括信用值、头像）
        async getuserinfo_db() {
            try {
                const res = await this.$http.get('/dbapi/getuserinfo', { params: { user_openid: this.user_id } });
                if (res.data && res.data.length > 0) {
                    const info = res.data[0];
                    this.nickname = info.user_nickname;
                    this.headimgurl = info.user_headimgurl;
                    this.credit = info.user_credit;
                    
                    // 同步到本地缓存防止失效
                    localStorage.setItem("nickname", info.user_nickname);
                    localStorage.setItem("headimgurl", info.user_headimgurl);
                }
            } catch (err) {
                console.error("Fetch User Info Error:", err);
            }
        },

        // 获取订单统计
        async getorder_db() {
            try {
                const res = await this.$http.get('/dbapi/orders', { params: { user_id: this.user_id } });
                this.mtrd = 0; this.mpayed = 0; this.margue = 0;
                
                res.data.forEach(order => {
                    const status = parseInt(order.status);
                    const price = parseFloat(order.total_price) || 0;
                    if (status === 0 || status === 1) this.mtrd += price;
                    else if (status === 2) this.margue += price;
                    else if (status === 4) this.mpayed += price;
                });
            } catch (err) {
                console.error("Fetch Orders Error:", err);
            }
        }
    }
}
</script>

<style scoped>
.header {
    background: #9fc5e8;
    padding: 30px 0 10px 0;
    color: #fff;
}
.header-money {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px 0;
}
.text-center p { margin: 5px 0; }
.van-badge {
    background-color: #ff976a;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 11px;
}
</style>