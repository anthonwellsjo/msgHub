import { NewBlockTextPayloadFromClient } from "../Types/newBlockTextPayload"

export function loginUser(name: string, whiteBoardName: string, connectionId: string) {
  return fetch(`/User/Login?username=${name}&whiteBoardName=${whiteBoardName}&connectionId=${connectionId}`, {
    method: "post",
  })
}
export function getWhiteboard(id: string) {
  return fetch(`/Whiteboard?id=${id}`)
    .then(res => res.json())
}
export function postTextBlock(newBlock: NewBlockTextPayloadFromClient) {
  return fetch("/PostIt/textblock?whiteboardName=redrum", {
    method: "post",
    body: JSON.stringify(newBlock),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })

}