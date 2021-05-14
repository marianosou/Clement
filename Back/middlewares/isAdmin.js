const checkAdmin = (req, res, next) => {
    req.params.isAdmin === 'true' ? next() : res.sendStatus(401);
};

const checkAdminBody = (req, res, next) => {
    req.body.user.isAdmin === 'true'? next() : res.sendStatus(401);
};

module.exports = { checkAdmin, checkAdminBody };