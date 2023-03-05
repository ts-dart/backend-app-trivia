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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/questions', (_req, res) => {
    fs.readFile('src/database/database.json', (err, data) => {
        if (err)
            throw err;
        const { results: questions } = JSON.parse(data);
        return res.status(200).send(createArrWithTenQuestions(questions));
    });
});
app.listen(3002, () => console.log('online'));
function createArrWithTenQuestions(questions) {
    const arr = new Array();
    const numbers = new Array();
    for (const i in new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)) {
        const randomNum = Math.floor(Math.random() * 108);
        if (!numbers.some((n) => n === randomNum))
            arr.push(questions[randomNum]);
        else
            createArrWithTenQuestions(questions);
        numbers.push(randomNum);
    }
    return arr;
}
