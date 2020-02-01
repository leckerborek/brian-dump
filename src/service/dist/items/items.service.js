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
const request = require("request-promise-native");
const readability = require("readability-node");
const jsdom = require("jsdom");
const search_service_1 = require("../search/search.service");
let ItemsService = class ItemsService {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async extract(url) {
        console.log('url', url);
        try {
            let body = await request.get(url);
            let doc = jsdom.jsdom(body, {
                features: {
                    FetchExternalResources: false,
                    ProcessExternalResources: false
                }
            });
            const Readability = readability.Readability;
            var article = new Readability({}, doc).parse();
            if (article == null) {
                throw new Error('Readability could not parse url.');
            }
            const webContent = {
                origin: url,
                title: article.title,
                excerpt: article.excerpt,
                author: article.byline,
                content: article.content,
                length: article.length,
                byline: article.byline,
                uri: article.uri
            };
            this.searchService.index(webContent);
            return webContent;
        }
        catch (error) {
            console.error(error);
        }
    }
};
ItemsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map