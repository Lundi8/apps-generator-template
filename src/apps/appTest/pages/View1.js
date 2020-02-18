import React from 'react';
import { path } from '../../../utils';
import { Background } from '../../../components';

export default () => {
  return (
    <Background background={path.imgs('temp.jpg')}>
      <p>1 public folder</p>
      <img style={{ width: '100px' }} src={`${process.env.PUBLIC_URL}/img.png`} alt='not found'></img>
      <p>2 webpack import</p>
      <img style={{ width: '100px' }} src={path.imgs('img.png')} alt='not found'></img>
    </Background>
  );
};
