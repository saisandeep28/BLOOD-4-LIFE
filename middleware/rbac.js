"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireVerified = exports.authorize = void 0;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
            return;
        }
        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                error: { code: 'FORBIDDEN', message: 'You do not have permission to perform this action' }
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
const requireVerified = (req, res, next) => {
    // In a real app we'd fetch the user's verification status from DB or put it in token.
    // Assuming it's checked in auth.ts or token.
    next();
};
exports.requireVerified = requireVerified;
//# sourceMappingURL=rbac.js.map