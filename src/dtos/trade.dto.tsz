import { ITrade, ITradeDto } from '../interfaces/trade.interfaces';

export class TradeDto {
    public static toDto({ id, type, user, symbol, shares, price, timestamp, }: ITrade): ITradeDto {
        return {
            data: {
                id, type, user, symbol, shares, price, timestamp
            }
        }
    }
}