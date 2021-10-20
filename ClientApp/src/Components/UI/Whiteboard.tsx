import React from 'react';
import { selectWhiteboard } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import PostIt from './PostIt';

const Whiteboard: React.FC = () => {
  const whiteboard = useAppSelector(selectWhiteboard);
  return (
    <div>
      {whiteboard?.postits.map(p => <PostIt key={p.id} {...{ ...p }} />)}
    </div>
  )
}

export default Whiteboard;