
import React from 'react'
import Link from 'next/link'
const Home = () => {
  return (
    <div>
        <button> 
            <Link href={"/addProducts"}>
              add product
            </Link>
        </button>
    </div>
  )
}

export default Home