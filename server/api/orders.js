const router = require('express').Router();
const nodemailer = require('nodemailer');

const Order = require('../db/models/order');
const BookOrder = require('../db/models/bookOrder');

router.post('/add-order',
    (req, res, next) => {
        let order = req.body;
        const userId = req.body.userId || null;
        order.userId = userId;
        order.sid = req.session.id;
        Order.create({
            sid: order.sid,
            orderStatus: order.orderStatus,
            orderRecipient: order.orderRecipient,
            orderEmail: order.orderEmail,
            orderAddress: order.orderAddress,
            userId: order.userId
        })
            .then((createdOrder) => {
                let cart = [];
                for (var key in req.session.cart) {
                    cart.push(req.session.cart[key]);
                }
                let bookOrder = cart.map((item) => {
                    let entry = {
                        quantity: item.qty,
                        bookId: item.id,
                    };
                    return entry;
                });
                Order.findOne({
                    where: {
                        sid: req.session.id
                    }
                })
                    .then((order) => {
                        let finalOrder = bookOrder.map((item) => {
                            item.orderId = order.id;
                            const createEntry = BookOrder.create(item);
                            return createEntry;
                        })
                        Promise.all(finalOrder);
                    })
                    next();
            })
            .catch(next);
    })

router.post('/add-order',
    (req, res, next) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER || 'fullstack.toyshopper@gmail.com',
                pass: process.env.GMAIL_PASS || 'Fullst@ck'
            }
        });

        let mailOptions = {
            from: '"Max" <fullstack.toyshopper@gmail.com>',
            to: req.body.orderEmail,
            subject: 'Your boook order is on its way!',
            text: 'boook ORDER ON THE WAY!',
            html: '<b>boook ORDER ON THE WAY!</b>'
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
        });
        res.status(201).send('success');
    })

module.exports = router;