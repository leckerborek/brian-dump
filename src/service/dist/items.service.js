"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const request = require("request-promise-native");
const readability = require("readability-node");
const jsdom = require("jsdom");
let ItemsService = class ItemsService {
    async extract(url) {
        let body = await request.get(url);
        console.log('body', body);
        let doc = jsdom.jsdom(body, {
            features: {
                FetchExternalResources: false,
                ProcessExternalResources: false
            }
        });
        console.log('doc', doc);
        const Readability = readability.Readability;
        var article = new Readability({}, doc).parse();
        console.log('article', article);
        return {
            title: article.title,
            excerpt: article.excerpt,
            author: article.byline,
            content: article.content,
            length: article.length,
            byline: article.byline,
            uri: article.uri
        };
    }
};
ItemsService = __decorate([
    common_1.Injectable()
], ItemsService);
exports.ItemsService = ItemsService;
//# sourceMappingURL=items.service.js.map