export function loginUser(name: string, whiteBoardName: string, connectionId: string) {
  return fetch(`/User/Login?username=${name}&whiteBoardName=${whiteBoardName}&connectionId=${connectionId}`, {
    method: "post",
  })
}
export function getWhiteboard(id: string) {
  return fetch(`/Whiteboard?id=${id}`)
    .then(res => res.json())
}