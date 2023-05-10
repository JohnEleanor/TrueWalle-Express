require('dotenv').config();
const {PHONE,PORT} = process.env;
const twvoucher = require('@fortune-inc/tw-voucher');
const express = require('express');
const port = PORT;
const phone = PHONE;

const app = express()


app.listen(port, () => {
    console.log(`\x1b[33mApp run on port ${port} Have Fun`);
});

app.get('/', (req,res) => {
    res.send('This is API True Wallet');
});
app.use(express.json());

app.post("/api/v1/topup", async (req,res)=>{

    const data = req.body;

    twvoucher(phone,data.code).then(redeemed => {

        return res.json({
            success: true,
            amount: redeemed.amount
        })
    }).catch((err) => { 
        console.log(err)
        return res.json({
            msg: "ลิ้งอั่งเปาไม่ถูกต้อง"
        })
    })

})