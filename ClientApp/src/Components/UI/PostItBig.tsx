import React, { useContext, useEffect, useState } from 'react';
import { EditTextBlockTextFromClient } from '../../Types/editTextBlockText';
import { NewBlockTextPayloadFromClient } from '../../Types/newBlockTextPayload';
import { PostIt } from '../../Types/postIt';
import { postTextBlock } from '../../Utils/api';
import { HubConnectionContext } from '../../Utils/Context/HubConnectionContext';
import { selectUserName } from '../../Utils/Redux/features/msgHub/userSlice';
import { useAppSelector } from '../../Utils/Redux/hooks';
import { GetRandomColor, whiteBoardName } from '../../Utils/Utils';
import AddTextBlockButton from './AddTextBlockButton';
import Loader from './Loader';
import PostItTextBlock from './PostItTextBlock';

interface props {
  PostIt: PostIt,
  onExit: () => void
}

const PostItBig: React.FC<props> = (props) => {
  const [editBlock, setEditBlock] = useState<number | undefined>(undefined);
  const [showLoaderIfThisNumberIsSameAsNumberOfPostIts, setshowLoaderIfThisNumberIsSameAsNumberOfPostIts] = useState<number | undefined>(undefined);
  const [hubConnection] = useContext(HubConnectionContext);
  const user = useAppSelector(selectUserName);

  const onNewTextBlockClickEventHandler = () => {
    if (user) {
      const newBlock: NewBlockTextPayloadFromClient = { author: user, postItId: props.PostIt.id }
      postTextBlock(newBlock)
        .then(() => {
          const index = props.PostIt.body.length;
          setEditBlock(index);
          console.log("index", index);
          setshowLoaderIfThisNumberIsSameAsNumberOfPostIts(props.PostIt.body.length);
        })
        .catch((error) => {
          throw error;
        })

    } else {
      throw new Error("Error, no user logged in to create text block");
    }

  }

  const onTextBlockChangeEventHandler = (value: string, blockId: string) => {
    console.log("event");
    const payload: EditTextBlockTextFromClient = { value: value, textBlockId: blockId, postItId: props.PostIt.id };
    (hubConnection as signalR.HubConnection).send("editTextBlockText", payload, whiteBoardName);

  }


  useEffect(() => {
    console.log("rerender big postit")
  })

  return (
    <div
      onClick={props.onExit}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255,255,255,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div
        onClick={(e) => { e.stopPropagation(); }}
        style={{
          zIndex: 1,
          background: "#FFF09F",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "2px",
          width: "492px",
          height: "564px",
          padding: "0px 40px",
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}>
        <header>
          <h3 style={{ fontFamily: "handwriting", fontSize: "2em", textAlign: "center" }}>{props.PostIt.header}</h3>
        </header>
        <main>
          {props.PostIt.body.map((b, i, a) => <PostItTextBlock onChangeEventHandler={onTextBlockChangeEventHandler} editable={props.PostIt.body[i].author === user && i === editBlock ? true : false} key={b.id} block={b} color={a.length > 1 ? GetRandomColor(i) : undefined} />)}
          <AddTextBlockButton onClick={onNewTextBlockClickEventHandler} color={GetRandomColor(props.PostIt.body.length)} />
          {showLoaderIfThisNumberIsSameAsNumberOfPostIts == props.PostIt.body.length && <div style={{
            position: "relative",
            boxSizing: "border-box",
            padding: "20px 10px",
            marginBottom: "5px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height:"50px",
            maxWidth: "100%"
          }}><Loader title="Getting a text box." /></div>}
        </main>
      </div>
    </div >
  )
}

export default PostItBig;