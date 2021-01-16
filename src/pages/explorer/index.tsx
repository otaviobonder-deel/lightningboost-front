import React, { useLayoutEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useApiRequest } from '../../hooks/useApiRequest';
import { Map } from '../../components/Map';

interface IData {
  alias?: string
  publicKey: string
  lat?: number
  long?: number
}

const useStyles = makeStyles({
  container: {
    flex: 1,
  },
});

export const Explorer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const classes = useStyles();

  const { data, error, loading } = useApiRequest<IData[]>({ url: '/lightning/chaingraph', initialLoading: true });

  useLayoutEffect(() => {
    if (containerRef !== null && containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight);
    }
  }, []);

  return (
    <div ref={containerRef} className={classes.container}>
      {data && <Map data={data} height={containerHeight} />}
    </div>
  );
};
