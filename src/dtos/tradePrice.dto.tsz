import { ITrade, ITradePriceDto } from "../interfaces/trade.interfaces";

export class TradePriceDto {
    public static toDto(trades: ITrade[], symbol: string): ITradePriceDto {
        let min: number= trades[0].price, max: number =0;
        trades.map(({ price }) => {
            price < min ? min = price: 0;
            price > max ? max = price: 0;
        });
        return {
            data: {
                symbol,
                min,
                max,
            }
        }
    }
}