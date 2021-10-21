import React from 'react';
import { TextBlock } from '../../Types/textBlock';
import EditTextBlockButton from './EditTextBlockButton';

interface props {
  block: TextBlock,
  color?: string,
  userEditing?: boolean,
  onChangeEventHandler: (value: string, blockId: string) => void,
  editable: boolean,
  onUserEditClicked: (textBlockId: string) => void
}

const PostItTextBlock: React.FC<props> = ({ block, color, userEditing = false, onChangeEventHandler, editable, onUserEditClicked }) => {

  return (
    <div
      onClick={e => { e.stopPropagation(); }}
      style={{
        position: "relative",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "100%",
        marginBottom: "5px",
        overflow:"hidden",
        borderRadius:"3px"
      }}>
      <div style={{
        backgroundColor: userEditing ? "white" : color, width: "100%", height: "100%",
        boxSizing: "border-box",
        
        padding: "20px 10px",
      }}>
        <main style={{ marginTop: "-20px", display: "flex", flexDirection: "column", justifyContent: "center", }}>
          {!userEditing && editable &&
            <div
              onClick={() => { onUserEditClicked(block.id) }}
              style={{
                position: "absolute",
                right: "-25px",
                cursor: "pointer"
              }}>
              <EditTextBlockButton />
            </div>}
          {userEditing ?
            <textarea style={{
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
          <p>{editable ? "You " : block.author} on {new Date(block.lastUpdated).toDateString()}</p>
        </div>
      </div>
    </div >
  )
}

export default PostItTextBlock;