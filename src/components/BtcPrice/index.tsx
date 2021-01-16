import React, { useEffect, useState } from 'react';
import { IMessageEvent, w3cwebsocket as W3CWebSocket } from 'websocket';
import Currency from 'currency.js';
import { makeStyles, Typography } from '@material-ui/core';
import { BsFillCaretUpFill, BsFillCaretDownFill } from 'react-icons/all';

interface IPrice {
  value: string
  direction: string
}

const useStyles = makeStyles({
  text: ({ direction }: {direction: string}) => ({
    color: direction === 'down' ? 'red' : '#7CFC00',
    fontWeight: 600,
  }),
});

export const BtcPrice: React.FC = () => {
  const [price, setPrice] = useState<IPrice>({
    value: '...',
    direction: '',
  });

  const classes = useStyles({ direction: price.direction });

  useEffect(() => {
    const socket = new W3CWebSocket('wss://ws.kraken.com/');

    socket.onopen = () => {
      socket.send(JSON.stringify({
        event: 'subscribe',
        pair: [
          'XBT/USD',
        ],
        subscription: {
          name: 'trade',
        },
      }));
    };

    socket.onmessage = ((message: IMessageEvent) => {
      if (typeof message.data === 'string') {
        const response = JSON.parse(message.data);
        if (Array.isArray(response) && response.includes('trade')) {
          const trades = response[1];
          const lastTrade = trades[trades.length - 1];
          setPrice((currentPrice) => {
            if (Currency(currentPrice.value).value < Currency(lastTrade[0]).value) {
              return {
                value: Currency(lastTrade[0]).format(),
                direction: 'up',
              };
            }
            return {
              value: Currency(lastTrade[0]).format(),
              direction: 'down',
            };
          });
        }
      }
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Typography className={classes.text}>
      BTC
      {' '}
      {price.value}
      {' '}
      {price.direction === 'up' && <BsFillCaretUpFill />}
      {price.direction === 'down' && <BsFillCaretDownFill style={{ verticalAlign: 'middle' }} />}
    </Typography>
  );
};
