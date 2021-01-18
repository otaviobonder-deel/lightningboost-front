import { SliderProps } from "@material-ui/core";

export interface IProps {
  walletBalance: number;
}

export interface IForm {
  publicKey: string;
  socket: string;
  tokens: number;
  private: boolean;
}

export interface ISliderProps extends SliderProps {
  label?: string;
  valueLabel?: string;
  error?: boolean;
  helperText?: string;
}

export interface IChannelResponse {
  transactionId: string;
}
