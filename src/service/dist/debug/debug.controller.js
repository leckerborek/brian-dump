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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const search_service_1 = require("../search/search.service");
const items_service_1 = require("../items/items.service");
let DebugController = class DebugController {
    constructor(items, search) {
        this.items = items;
        this.search = search;
    }
    async generate() {
        const urls = [
            "https://docs.nestjs.com/controllers",
            "https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript.html",
            "https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html",
            "https://www.npmjs.com/package/nestjs-command",
            "https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html",
            "https://www.typescriptlang.org/docs/handbook/classes.html",
            "https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/typescript_examples.html"
        ];
        for (let url of urls) {
            await this.items.extract(url);
        }
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DebugController.prototype, "generate", null);
DebugController = __decorate([
    common_1.Controller('debug'),
    __metadata("design:paramtypes", [items_service_1.ItemsService, search_service_1.SearchService])
], DebugController);
exports.DebugController = DebugController;
//# sourceMappingURL=debug.controller.js.map