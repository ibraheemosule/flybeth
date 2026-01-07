"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttractionsStore = exports.createPackagesStore = exports.createCarsStore = exports.createHotelsStore = exports.createUserStore = exports.createFlightsStore = exports.createAuthStore = void 0;
// Export all store factories
var authStore_1 = require("./authStore");
Object.defineProperty(exports, "createAuthStore", { enumerable: true, get: function () { return authStore_1.createAuthStore; } });
var flightsStore_1 = require("./flightsStore");
Object.defineProperty(exports, "createFlightsStore", { enumerable: true, get: function () { return flightsStore_1.createFlightsStore; } });
var userStore_1 = require("./userStore");
Object.defineProperty(exports, "createUserStore", { enumerable: true, get: function () { return userStore_1.createUserStore; } });
var hotelsStore_1 = require("./hotelsStore");
Object.defineProperty(exports, "createHotelsStore", { enumerable: true, get: function () { return hotelsStore_1.createHotelsStore; } });
var carsStore_1 = require("./carsStore");
Object.defineProperty(exports, "createCarsStore", { enumerable: true, get: function () { return carsStore_1.createCarsStore; } });
var packagesStore_1 = require("./packagesStore");
Object.defineProperty(exports, "createPackagesStore", { enumerable: true, get: function () { return packagesStore_1.createPackagesStore; } });
var attractionsStore_1 = require("./attractionsStore");
Object.defineProperty(exports, "createAttractionsStore", { enumerable: true, get: function () { return attractionsStore_1.createAttractionsStore; } });
//# sourceMappingURL=index.js.map