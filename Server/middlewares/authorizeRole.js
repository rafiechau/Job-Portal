const jwt = require('jsonwebtoken');

const authenticateRole = (role) => {
    return (req, res, next) => {
        try {
            const roleId = req.user.role;

            if (roleId === role) {
                next(); // Lanjutkan ke route berikutnya
            } else {
                return res.status(403).json({ message: "Access denied. Insufficient permissions." });
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    };
};

const authorizeAdmin = authenticateRole(1);
const authorizeJobRecruiter = authenticateRole(2);
const authorizeJobTalent = authenticateRole(3);

module.exports = {
    authorizeAdmin,
    authorizeJobRecruiter,
    authorizeJobTalent
};
