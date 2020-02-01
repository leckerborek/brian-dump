"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const item_1 = require("./item");
const items_service_1 = require("./items.service");
const search_service_1 = require("../search/search.service");
const searchResult_1 = require("../models/searchResult");
let ItemsController = class ItemsController {
    constructor(itemsService, searchService) {
        this.itemsService = itemsService;
        this.searchService = searchService;
    }
    async find(query) {
        const results = await this.searchService.search(query);
        return results;
    }
    async find2() {
        return 'find2 will return everything!';
    }
    async create(item) {
        console.table(item);
        const result = await this.itemsService.extract(item.url);
        return result;
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "find", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "find2", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_1.CreateItemDto]),
    __metadata("design:returntype", Promise)
], ItemsController.prototype, "create", null);
ItemsController = __decorate([
    common_1.Controller('items'),
    __metadata("design:paramtypes", [items_service_1.ItemsService, search_service_1.SearchService])
], ItemsController);
exports.ItemsController = ItemsController;
//# sourceMappingURL=items.controller.js.map