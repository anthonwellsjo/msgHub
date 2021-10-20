import React, { useState } from 'react';
import { PostIt } from '../../Types/postIt';
import { selectWhiteboard } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import PostItBig from './PostItBig';
import PostItSmall from './PostItSmall';

const Whiteboard: React.FC = () => {
  const [openPostIt, setOpenPostit] = useState<PostIt | undefined>();
  const whiteboard = useAppSelector(selectWhiteboard);
  return (
    <div>
      {whiteboard?.postits.map(p => <PostItSmall onOpen={(postit) => { setOpenPostit(postit); }} key={p.id} PostIt={p} />)}
      {openPostIt && <PostItBig PostIt={openPostIt} onExit={() => { setOpenPostit(undefined) }} />}
    </div>
  )
}

export default Whiteboard;