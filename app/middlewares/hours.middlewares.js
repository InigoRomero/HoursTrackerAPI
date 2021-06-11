const middlewares = {

    isTime : function (req, res, next) {
        var date = new Date();
        if (date.getHours() > 13)
        return next();

        res.redirect('/');
    }
};
module.exports = middlewares;