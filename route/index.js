const express = require('express');
const common = require('../libs/common');

module.exports = (db) => {
    const route = express.Router();

    // 封装通用查询函数
    const handleQuery = (sql, params, res) => {
        db.query(sql, params, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('database err');
            }
            if (!data || data.length === 0) return res.status(404).send('no datas');
            res.send(data);
        });
    };

    // --- 业务接口 ---

    route.get('/home', (req, res) => {
        const sql = `SELECT product_id,product_name,product_price,product_img_url,product_uprice FROM product`;
        handleQuery(sql, [], res);
    });

    route.get('/category', (req, res) => {
        const sql = `SELECT * FROM category ORDER BY category_id desc`;
        handleQuery(sql, [], res);
    });

    route.get('/contents', (req, res) => {
        const sql = `select * from product,category where product.category_id=category.category_id`;
        handleQuery(sql, [], res);
    });

    route.get('/categorygoods', (req, res) => {
        let mId = req.query.mId;
        const sql = `select * from product,category where product.category_id=category.category_id and category.category_id=?`;
        handleQuery(sql, [mId], res);
    });

    route.get('/detail', (req, res) => {
        let produId = req.query.mId;
        const imagesStr = `select image_url from product_image where product_id=?`;
        const productStr = `select * from product where product_id=?`;
        
        db.query(imagesStr, [produId], (err, imgDatas) => {
            if (err) return res.status(500).send('db err');
            db.query(productStr, [produId], (err, data) => {
                if (err) return res.status(500).send('db err');
                res.send([imgDatas, data]);
            });
        });
    });

    route.get('/orders', (req, res) => {
        let user_id = req.query.user_id;
        const sql = `SELECT * FROM orders where user_id=?`;
        handleQuery(sql, [user_id], res);
    });

    route.get('/search', (req, res) => {
        let keyWord = `%${req.query.kw}%`;
        const sql = `SELECT * FROM orders where coupon like ?`;
        handleQuery(sql, [keyWord], res);
    });

    route.get('/paylist', (req, res) => {
        let user_openid = req.query.user_openid;
        const sql = `SELECT pay_time, pay_amoney FROM paylist where user_openid=?`;
        handleQuery(sql, [user_openid], res);
    });

    // 订单时间筛选
    route.get('/orders_time', (req, res) => {
        let index = req.query.idx;
        let sql = "";
        let params = [];

        switch (index){
            case '0': sql = `SELECT product_tt, ocount, status FROM orders where CURDATE()=date(build_time)`; break;
            case '1': sql = `SELECT product_tt, ocount, status FROM orders where DATE_SUB(CURDATE(),INTERVAL 1 DAY)=date(build_time)`; break;
            case '2': sql = `SELECT product_tt, ocount, status FROM orders where DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(build_time)`; break;
            case '3': sql = `SELECT product_tt, ocount, status FROM orders WHERE DATE_FORMAT(build_time, '%Y%m') = DATE_FORMAT(CURDATE(), '%Y%m')`; break;
            case '4': 
                sql = `SELECT product_tt, ocount, status FROM orders WHERE build_time >= ? and build_time <= ?`; 
                params = [req.query.st, req.query.et];
                break;
        }
        handleQuery(sql, params, res);
    });

    // --- POST 提交类接口 (去掉了多余的 /dbapi 前缀) ---

    route.post('/setpayinfo', (req, res) => {
        const { payinfo_name, payinfo_zfb, payinfo_phone, payinfo_wxno, payinfo_userid } = req.body;
        const sql = `INSERT INTO payinfo (payinfo_name, payinfo_zfb, payinfo_phone, payinfo_wxno, payinfo_userid) VALUES(?,?,?,?,?)`;
        db.query(sql, [payinfo_name, payinfo_zfb, payinfo_phone, payinfo_wxno, payinfo_userid], (err) => {
            if (err) return res.send({ status: 0, msg: '提交失败' });
            res.send({ status: 1, msg: 'success' });
        });
    });

    route.post('/submit_code', (req, res) => {
        let { order_id, product_tt, coupon, price, ocount, total_price, user_id, status } = req.body;
        // order_id 如果是字符串需要解析
        if(typeof order_id === 'string') order_id = JSON.parse(order_id);
        
        const sql = `INSERT INTO orders (order_id, product_tt, coupon, price, ocount, total_price, user_id, status, build_time) VALUES(?,?,?,?,?,?,?,?,now())`;
        db.query(sql, [order_id, product_tt, coupon, price, ocount, total_price, user_id, status], (err) => {
            if (err) return res.send({ status: 0, msg: err.errno == 1062 ? '重复提交' : '错误' });
            res.send({ status: 1, msg: 'success' });
        });
    });

    route.get('/getuserinfo', (req, res) => {
        let user_openid = req.query.user_openid;
        const sql = `SELECT user_nickname, user_headimgurl, user_credit FROM user where user_id=?`;
        handleQuery(sql, [user_openid], res);
    });

    return route;
};