import { ITrade, ITradeListDto } from "../interfaces/trade.interfaces";

export class TradeListDto {
    public static toDTO(trades: ITrade[]): ITradeListDto {
        return {
            data: trades.map(({ id, type, user, symbol, shares, price, timestamp, }) => ({
                id, type, user, symbol, shares, price, timestamp,
            }))
        };
    }
}