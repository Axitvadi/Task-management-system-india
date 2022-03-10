const mongoose = require('mongoose');
const USER = mongoose.model('user');
const DETAIL = mongoose.model('detail');

exports.data = {
    createDetail: async (req, res) => {
        let obj = req.body
        const finded = await USER.findOne({
            username: obj.developer
        })
        try {
            if (!finded) {
                return res.json({
                    isSuccess: false,
                    message: 'detatls not added'
                })
            } else {
                const created = await DETAIL.create(obj);
                if (!created) {
                    return res.json({
                        isSuccess: false,
                        message: 'Failed to create',
                    })
                }
                return res.json({
                    isSuccess: false,
                    message: 'Successful to create!',
                    created: created
                })
            }
        } catch (error) {
            return res.json(error)
        }
    },
    Getall: async (req, res) => {
        try {
            const get = await USER.find({})
            if (!get) {
                return res.json({
                    isSuccess: false,
                    message: 'Fail to get USERs'
                })
            } else {
                return res.json({
                    isSuccess: true,
                    Result: get
                })
            }
        } catch (error) {
            return res.json(error)
        }
    },
    Getbyid: async (req, res) => {
        try {
            const get = await USER.findById({
                _id: req.body._id
            })
            if (!get) {
                return res.json({
                    isSuccess: false,
                    message: 'USER not exists'
                })
            } else {
                return res.json({
                    isSuccess: true,
                    Result: get
                })
            }
        } catch (error) {
            return res.json(error)
        }
    },
    updateuser: async (req, res) => {
        try {
            const update = await USER.findOneAndUpdate({
                username: req.body.developer
                },
                req.body, {
                    new: true
                }
            )
            if (!update) {
                return res.json({
                    isSuccess: false,
                    message: 'failed to update'
                })
            }
            return res.json({
                isSuccess: true,
                Result: update
            })
        } catch (err) {
            return res.json({
                isSuccess: false,
                message: err
            })
        }
    },
    updateDetail: async (req, res) => {
        try {
            const Update = await DETAIL.findOneAndUpdate({
                developer: req.body.developer
            }, req.body)
            console.log(Update);
            if (!Update) {
                return res.json({
                    isSuccess: false,
                    message: 'user not updated'
                })
            } else {
                return res.json({
                    isSuccess: true,
                    message: 'updated successful',
                })
            }

        } catch (error) {
            return res.json(error)
        }
    },
    Delete: async (req, res) => {
        try {
            const finded = await USER.findById({
                _id: req.params.id
            })
            finded.work.shift();
            const Update = await USER.findByIdAndUpdate({
                _id: req.params.id
            }, finded, {
                'new': true
            })
            if (!Update) {
                return res.json({
                    isSuccess: false,
                    message: 'failed to delete'
                })
            } else {
                return res.json({
                    isSuccess: true,
                    Result: Update
                })
            }
        } catch (error) {
            return res.json(error)
        }
    },
}