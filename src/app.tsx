import React, { useEffect } from 'react';
import { Button, Space, Typography } from 'antd';
import { auto } from '@tylerlong/use-proxy/lib/react';

import { Store } from './store';
import CONSTS from './constants';

const { Text, Title } = Typography;

const App = (props: { store: Store }) => {
  useEffect(() => {
    const removeListner = global.ipcRenderer.on(CONSTS.HELLO_TO_RENDERER, (event: any, args: any) => {
      console.log(args);
    });
    return () => {
      removeListner();
    };
  }, []);
  const render = () => {
    const { store } = props;
    return (
      <>
        <Title>Untitled App</Title>
        <Space>
          <Button
            onClick={() => {
              store.count -= 1;
            }}
          >
            -
          </Button>
          <Text>{store.count}</Text>
          <Button
            onClick={() => {
              store.count += 1;
            }}
          >
            +
          </Button>
          <Button onClick={() => global.ipcRenderer.invoke(CONSTS.HELLO_TO_MAIN, 'Hello from renderer')}>Hello</Button>
        </Space>
      </>
    );
  };
  return auto(render, props);
};

export default App;
