import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setApp } from '../redux';
import { path } from '../../../utils';
import { Background } from '../../../components';
import Draggable from 'react-draggable';

const View2 = ({ setApp, stateApp1 }) => {
  const [origin, setOrigin] = useState({ x: 100, y: 100 });
  const destination = { x: 600, y: 0 };
  const ratio = 20;
  const bound = ({ x, y }) => {
    if (
      x > destination.x - ratio &&
      x < destination.x + ratio &&
      y >= destination.y - ratio &&
      y < destination.y + ratio
    ) {
      return true;
    }
    return false;
  };
  const handleDrag = (evt, data) => {
    const { x, y } = data;
    if (bound({ x, y })) setOrigin(destination);
  };

  return (
    <Background background={path.imgs('img.png')}>
      <h2>View2</h2>
      <div style={{ border: 'solid' }}>
        <button onClick={() => setApp('Blop APP')}>Redux test</button>
        <p>stateApp1 : {stateApp1}</p>
      </div>
      <Draggable
        axis='both'
        handle='.handle'
        defaultPosition={origin}
        position={origin}
        bounds='parent'
        scale={1}
        onDrag={handleDrag}
        onStop={handleDrag}
      >
        <div className='handle' style={{ width: '100px', height: '100px', border: 'solid 1px' }}>
          <div>Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>

      <div
        style={{
          border: 'solid 1px',
          width: '100px',
          height: '100px',
          position: 'relative',
          left: `${destination.x}px`,
          top: `${destination.y}px`,
          pointerEvents: 'none',
          padding: `${ratio}px`,
          transform: 'translateY(-100%)',
        }}
      >
        to Here
      </div>
    </Background>
  );
};

const mSTP = ({ stateApp1 }) => {
  return { stateApp1 };
};

export default connect(mSTP, { setApp })(View2);
