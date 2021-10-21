import React, { useState } from 'react';
import { PostIt } from '../../Types/postIt';
import { selectWhiteboard } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import PostItBig from './PostItBig';
import PostItSmall from './PostItSmall';

const Whiteboard: React.FC = () => {
  const [openPostItId, setOpenPostItId] = useState<string | undefined>();
  const whiteboard = useAppSelector(selectWhiteboard);
  const postit = whiteboard?.postits.find(p => p.id === openPostItId);
  return (
    <div>
      {whiteboard?.postits.map(p => {
        if (openPostItId !== p.id) {
          return (
            <PostItSmall onOpen={(postit) => { setOpenPostItId(postit); }} key={p.id} PostIt={p} />)
        }
      })}
      {openPostItId && postit && <PostItBig PostIt={postit} onExit={() => { setOpenPostItId(undefined) }} />}
    </div>
  )
}

export default Whiteboard;