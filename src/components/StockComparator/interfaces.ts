export interface IResult {
  image: string;
  stock: string;
  amount: number;
  type: string;
  total: number;
  profit: number;
  invested: number;
}

export interface IProps {
  amountBitcoin: number;
  totalBitcoin: number;
  profitBitcoin: number;
  invested: number;
  stock: string;
  amountStock: number;
  totalStock: number;
  profitStock: number;
}
