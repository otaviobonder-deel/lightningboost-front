import currencyLib from "currency.js";

interface IOptions {
  symbol?: string;
  separator?: string;
  decimal?: string;
  errorOnInvalid?: boolean;
  precision?: number;
  increment?: number;
  useVedic?: boolean;
  pattern?: string;
  negativePattern?: string;
  format?: currency.Format;
  fromCents?: boolean;
}

const Currency = (value: number, options?: IOptions) =>
  currencyLib(value, { symbol: "", ...options });

export default Currency;
