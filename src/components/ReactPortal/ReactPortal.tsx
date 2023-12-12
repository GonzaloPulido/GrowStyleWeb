import ReactDOM from "react-dom"

interface Props {
    children: React.ReactNode,
    nodeID : string
}

const ReactPortal: React.FC<Props> = ({children, nodeID}) => {
  const node : HTMLElement | null = document.getElementById(`${nodeID}`)
  return node ? ReactDOM.createPortal(children,node) : null
}

export default ReactPortal