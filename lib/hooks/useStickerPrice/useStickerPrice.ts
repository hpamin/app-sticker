import {useMemo} from "react";
import {priceTable, StickerMaterial, StickerSize} from "@/lib/priceTable/priceTable";

export default function useStickerPrice(
    size: StickerSize,
    count: number,
    material: StickerMaterial,
    express: boolean,
) {
    return useMemo(() => {
        if (!size || !count || !material) {
            return 0
        }
        const unitPrice = priceTable[size][material]
        const basePrice =
            count < 100
                ? 10
                : 0
        const subtotal = basePrice + unitPrice * count
        return express
            ? subtotal * 1.2
            : subtotal
    }, [size, count, material, express])
}