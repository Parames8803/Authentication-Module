import React from 'react'

const Module = () => {

  let username = localStorage.getItem('user')



  return (
    <div>
        <div className="card">
          <div className="bg">
            <img src="P:\Projects\formicApp\Formic\images\undraw_Male_avatar_g98d.png" alt="" srcset="" />
          </div>
          <div className="content">
            <h2>{username}</h2>
          </div>
        </div>
    </div>
  )
}

export default Module