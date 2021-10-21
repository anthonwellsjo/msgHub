import React, { useState } from 'react';
import { PostIt } from '../../Types/postIt';
import { selectWhiteboard } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import PostItBig from './PostItBig';
import PostItSmall from './PostItSmall';
import PostItTrashCan from './PostItTrashCan';

const Whiteboard: React.FC = () => {
  const [openPostItId, setOpenPostItId] = useState<string | undefined>();
  const whiteboard = useAppSelector(selectWhiteboard);
  const postit = whiteboard?.postits.find(p => p.id === openPostItId);
  const postItMoving = whiteboard?.postits.find(p => p.position.isMoving);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {whiteboard?.postits.map(p => {
        if (openPostItId !== p.id) {
          return (
            <PostItSmall onOpen={(postit) => { setOpenPostItId(postit); }} key={p.id} PostIt={p} />)
        }
      })}
      {openPostItId && postit && <PostItBig PostIt={postit} onExit={() => { setOpenPostItId(undefined) }} />}
      {postItMoving && <PostItTrashCan />}
    </div>
  )
}

export default Whiteboard;