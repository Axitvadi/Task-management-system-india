const mongoose = require('mongoose');
const DETAIL = mongoose.model('detail');

const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return {
        limit,
        offset
    };
};

exports.data = {
    GetallDetailswithoutpagination: async (req, res) => {
        try {
            const get = await DETAIL.find({});
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
    GetallDetails: async (req, res) => {
        try {
            const {
                page,
                size,
                title
            } = req.query;

            const {
                limit,
                offset
            } = getPagination(page, size);

            const get = await DETAIL.paginate({}, {
                offset,
                limit
            })
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
    GetoneDetail: async (req, res) => {
        try {
            const get = await DETAIL.find({
                _id: req.body._id
            })
            if (!get) {
                return res.json({
                    isSuccess: false,
                    message: 'Fail to get Detail'
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
    findDetailsByname: async (req, res) => {
        try {
            const get = await DETAIL.find({
                developer: req.body.developer
            })
            if (!get) {
                return res.json({
                    isSuccess: false,
                    message: 'Fail to get Detail'
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
    findDetailsByStatus: async (req, res) => {
        try {
            const {
                page,
                size,
                title
            } = req.query;
            const {
                limit,
                offset
            } = getPagination(page, size);
            
            const get = await DETAIL.paginate({
                Projectstatus: req.body.status
            }, {
                offset,
                limit
            })
            if (!get) {
                return res.json({
                    isSuccess: false,
                    message: 'Fail to get Detail'
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
    updateDetail: async (req, res) => {
        try {
            const Update = await DETAIL.findByIdAndUpdate({
                _id: req.body._id
            }, req.body);
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
            console.log(error);
            return res.json(error)
        }
    },
    DeleteDetail: async (req, res) => {
        try {
            const deleted = await DETAIL.deleteOne({
                _id: req.params.id
            })
            if (!deleted) {
                return res.json({
                    isSuccess: false,
                    Message: 'Failed To Deleted'
                })
            }
            return res.json({
                isSuccess: true,
                Message: 'Successfully Deleted'
            })
        } catch (error) {
            return res.json({
                isSuccess: false,
                Message: error,
            })
        }
    },
}