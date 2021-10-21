import React from 'react';
import { TextBlock } from '../../Types/textBlock';

interface props {
  block: TextBlock,
  color?: string,
  editable?: boolean,
  onChangeEventHandler: (value: string, blockId: string) => void
}

const PostItTextBlock: React.FC<props> = ({ block, color, editable = false, onChangeEventHandler }) => {

  return (
    <div style={{
      position: "relative",
      backgroundColor: editable ? "white" : color,
      boxSizing: "border-box",
      padding: "20px 10px",
      marginBottom: "5px",
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "100%"
    }}>
      <main style={{ marginTop: "-20px" }}>
        {editable ?
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
        <p>{block.author} on {new Date(block.lastUpdated).toDateString()}</p>
      </div>
    </div >
  )
}

export default PostItTextBlock;