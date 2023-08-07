import { useEffect, useState } from "react"
import { UserList } from "./UserList"

function App() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(()=>{
    setLoading(true)
    setError(undefined)
    const controller = new AbortController()
    fetch("https://jsonplaceholder.typicode.com/photos", {
      signal: controller.signal,
    })
    .then(res => {
      if(res.status == 200){
        return res.json()
      }else{
        return Promise.reject(res)
      }
    })
    .then(data => {
      setPhotos(data)
    })
    .catch(e=>{
      if(e?.name === "AbortError") return 
      setError(e)
    })
    .finally(()=>{
      setLoading(false)
    })

    return () => {
      controller.abort()
    }
  },[])

  return (
    <>
      <h1>Photos List</h1>
        {loading ? (<h2>Fetching....</h2>) : error != null ? (<h2>Fetching  Error</h2>)  : (<ul>
          {photos.map(photo => {
            return <UserList key={photo.id} {...photo} />
          })}
        </ul>)
        }
    </>
  )
  
}

export default App
