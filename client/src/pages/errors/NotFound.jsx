import { Link } from "react-router-dom"


function NotFound() {
  return (
    <div>Url not found. Please return to <Link to="/">Home</Link></div>
  )
}

export default NotFound