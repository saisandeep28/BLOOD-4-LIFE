"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestsController = __importStar(require("./requests.controller"));
const auth_1 = require("../../middleware/auth");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const zod_1 = require("zod");
const validate_1 = require("../../middleware/validate");
const validators_1 = require("../../utils/validators");
const types_1 = require("@life-for-all/types");
const router = (0, express_1.Router)();
const createSchema = zod_1.z.object({
    body: zod_1.z.object({
        bloodGroup: validators_1.bloodGroupSchema,
        unitsNeeded: zod_1.z.number().min(1).max(10),
        urgencyLevel: zod_1.z.nativeEnum(types_1.UrgencyLevel),
        location: zod_1.z.object({
            type: zod_1.z.literal('Point'),
            coordinates: zod_1.z.tuple([zod_1.z.number(), zod_1.z.number()])
        }),
        city: zod_1.z.string(),
        reason: zod_1.z.string().optional(),
        patientName: zod_1.z.string().optional(),
        patientAge: zod_1.z.number().optional(),
    })
});
router.use(auth_1.authenticate);
router.post('/', rateLimiter_1.createRequestLimiter, (0, validate_1.validate)(createSchema), requestsController.createRequest);
router.get('/nearby', requestsController.getNearbyRequests);
router.patch('/:id/status', requestsController.updateStatus);
exports.default = router;
//# sourceMappingURL=requests.routes.js.map