import axios from 'axios'
import { useEffect, useState } from 'react'
import { FixedSizeList } from 'react-window'

const VirtualizeList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      setData(response.data)
    })
  }, [])
  return (
    <div style={{ width: '800px', height: '1000' }}>
      <FixedSizeList
        height={800}
        itemCount={data.length}
        itemSize={50}
        width={1000}
      >
        {(index, style) => (
          <div style={style}>
            {data[index] ? <p>{data[index].title}</p> : <p>Loading...+ </p>}
          </div>
        )}
      </FixedSizeList>
    </div>
  )
}
export default VirtualizeList
