const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/nickname', (req, res) => {
    const nickname = req.body.nickname;
    console.log(nickname);
    res.sendStatus(200);
});

// app.post('/order', (req, res, next) => {
//     try {
//         const orderItems = req.body.orderItems;
//         console.log(orderItems);
//         res.sendStatus(200);
//     } catch (error) {
//         next(error);
//     }
// });

app.post('/order', (req, res, next) => {
    try {
        const orderItems = req.body.orderItems;
        
        orderItems.forEach(item => {
            console.log(`메뉴 이름: ${item.menuName}, 수량: ${item.quantity}`);
        });

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
