'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@elastic/elasticsearch");
const webContent_1 = require("../models/webContent");
const searchResult_1 = require("../models/searchResult");
const IndexName = 'brian';
let SearchService = class SearchService {
    constructor() {
        this.client = new elasticsearch_1.Client({ node: 'http://localhost:9200' });
    }
    async index(data) {
        const doc = {
            index: IndexName,
            body: data
        };
        await this.client.index(doc);
    }
    async search(query) {
        const params = {
            index: IndexName,
            body: {
                query: {
                    match: {
                        content: query
                    }
                }
            }
        };
        const result = await this.client.search(params);
        console.log(result.body.hits.hits);
        const hits = result.body.hits.hits;
        return hits.map(hit => {
            return {
                score: hit._score,
                url: hit._source.origin
            };
        });
    }
    async example() {
        const doc1 = {
            index: 'game-of-thrones',
            body: {
                character: 'Ned Stark',
                quote: 'Winter is coming.'
            }
        };
        await this.client.index(doc1);
        const doc2 = {
            index: 'game-of-thrones',
            body: {
                character: 'Daenerys Targaryen',
                quote: 'I am the blood of the dragon.'
            }
        };
        await this.client.index(doc2);
        const doc3 = {
            index: 'game-of-thrones',
            refresh: 'true',
            body: {
                character: 'Tyrion Lannister',
                quote: 'A mind needs books like a sword needs a whetstone.'
            }
        };
        await this.client.index(doc3);
        const params = {
            index: 'game-of-thrones',
            body: {
                query: {
                    match: {
                        quote: 'winter'
                    }
                }
            }
        };
        this.client
            .search(params)
            .then((result) => {
            console.log(result.body.hits.hits);
        })
            .catch((err) => {
            console.log(err);
        });
    }
};
SearchService = __decorate([
    common_1.Injectable()
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map