"use strict";
var _a;
exports.__esModule = true;
var client_1 = require("@prisma/client");
var prismaClientSingleton = function () {
    return new client_1.PrismaClient();
};
var prisma = (_a = globalThis.prisma) !== null && _a !== void 0 ? _a : prismaClientSingleton();
exports["default"] = prisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = prisma;
