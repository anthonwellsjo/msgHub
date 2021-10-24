import React, { createRef, useEffect, useMemo } from 'react';
import { TextBlock } from '../../Types/textBlock';
import { GetRandomColor } from '../../Utils/Utils';
import EditTextBlockButton from './EditTextBlockButton';

interface props {
  block: TextBlock,
  index: number,
  userEditing?: boolean,
  onChangeEventHandler: (value: string, blockId: string) => void,
  editable: boolean,
  onUserEditClicked: (textBlockId: string) => void
}

const PostItTextBlock: React.FC<props> = ({ block, index, userEditing = false, onChangeEventHandler, editable, onUserEditClicked }) => {
  const bcgColor = useMemo(() => GetRandomColor(index), [])
  console.log("is editable", editable, userEditing);
  let inputRef = createRef<HTMLTextAreaElement>();

  useEffect(() => {
    if (userEditing) {
      inputRef?.current?.focus();
    }
  }, [inputRef, userEditing])

  return (
    <div
      onClick={e => { e.stopPropagation(); }}
      style={{
        position: "relative",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: "5px",
        overflow: "hidden",
        height: userEditing ? "100px" : "auto",
        boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)",
        borderRadius: "2px"
      }}>
      <div style={{
        backgroundColor: userEditing ? "white" : bcgColor,
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        padding: "20px 10px",
      }}>
        <main style={{ marginTop: "-20px", display: "flex", flexDirection: "column", justifyContent: "center", }}>
          {!userEditing && editable &&
            <div
              onClick={() => { onUserEditClicked(block.id) }}
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer"
              }}>
              <EditTextBlockButton />
            </div>}
          {userEditing ?
            <textarea ref={inputRef} style={{
              outline: "none",
              resize: "none",
              border: "none",
              width: "100%",
              height: "100%",
              backgroundColor: "transparent"
            }} onChange={(e) => { onChangeEventHandler(e.target.value, block.id); }} value={block.text} />
            :
            <p>
              {block.text}
            </p>
          }
        </main>
        <div style={{ position: "absolute", color: "grey", right: "5px", bottom: "-10px", fontSize: "0.7em" }}>
          <p>{editable ? <strong>You </strong> : <strong>{block.author}</strong>} on {new Date(block.lastUpdated).toDateString()}</p>
        </div>
      </div>
    </div >
  )
}

export default PostItTextBlock;