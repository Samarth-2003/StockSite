export interface StockValue{
    date : StockData;
}
interface StockData{
      open: number;
         high:number;
        low:number,
        close: number;
        adjustedClose: number;
        volume: number;
        dividend:number;
}