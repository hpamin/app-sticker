import type from "ajv/lib/vocabularies/jtd/type";

export const priceTable = {
    "2": {glossy: 0.05, matt: 0.06, transparent: 0.07},
    "4": {glossy: 0.08, matt: 0.09, transparent: 0.1},
    "6": {glossy: 0.11, matt: 0.12, transparent: 0.13},
    "8": {glossy: 0.14, matt: 0.15, transparent: 0.16},
    "10": {glossy: 0.17, matt: 0.18, transparent: 0.19},
} as const
export type StickerSize = keyof typeof priceTable
export type MaterialPrices = typeof priceTable[keyof typeof priceTable];
export type StickerMaterial = keyof MaterialPrices;
