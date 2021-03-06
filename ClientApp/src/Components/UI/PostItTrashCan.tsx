import React, { useContext, useState } from 'react';
import { TrashPostItFromClient } from '../../Types/trashPostIt';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { selectUserName } from '../../Utils/Redux/features/msgHub/userSlice';
import { selectWhiteboard } from '../../Utils/Redux/features/msgHub/whiteboardSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import { SendToHub } from '../../Utils/SignalR/SignalRHub';

const PostItTrashCan: React.FC = () => {
  const [hover, setHover] = useState(false);
  const [hubConnection] = useContext(HubConnectionContext);
  const whiteboard = useAppSelector(selectWhiteboard);
  const username = useAppSelector(selectUserName);

  const TrashPostItEventHandler = () => {
    const postItId = whiteboard?.postits.find(p => p.position.isMoving)?.id;
    if (postItId !== undefined && username) {
      const payload: TrashPostItFromClient = { postItId: postItId, user: username };
      SendToHub(payload, "trashPostIt", (hubConnection as signalR.HubConnection));
    }
  }

  return (
    <div
      onMouseUp={TrashPostItEventHandler}
      onMouseLeave={() => { setHover(false) }}
      onMouseEnter={() => { setHover(true) }}
      style={{ position: "absolute", bottom: 0, left: 0, padding: "20px", display: "flex", justifyContent: "center" }}>
      <svg style={{ transform: `scale(${hover ? 1 : 0.5})` }} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="4em" width="4em" xmlns="http://www.w3.org/2000/svg"><path d="M2.037 3.225l1.684 10.104A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"></path><path fillRule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z" clipRule="evenodd"></path></svg>
    </div>
  )
}

export default PostItTrashCan;