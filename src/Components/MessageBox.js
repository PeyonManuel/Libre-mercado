import React from 'react';

const MessageBox = (props) => {
  return (
    <div
      className={
        'margin-top alert alert-' +
        (props.variant || 'info') +
        (props.block ? ' width-100' : '')
      }
    >
      {props.children}
    </div>
  );
};

export default MessageBox;
