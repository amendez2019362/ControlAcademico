const roleUser = (req, res, next) => {
    if (req.usuario.role !== "TEACHER_ROLE") {
        return res.status(403).json({ error: "Es necesario el rol de maestro" });
    }
    next();
};

module.exports = {
    roleUser
};