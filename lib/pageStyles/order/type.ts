import {StickerMaterial, StickerSize} from "@/lib/priceTable/priceTable";

export interface FormValues {
    name: string
    phone: string;
    email: string;
    size: StickerSize
    count: string
    material: StickerMaterial
    express: boolean
}