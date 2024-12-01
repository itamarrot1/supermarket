import React from 'react'
import { useAppSelector } from '../hooks'
import { selectLoggedUser, selectUsername } from '../slicers/loginSlice'

const Header = () => {

  const username = useAppSelector(selectLoggedUser)
  return (
    <div>
     <div className="jumbotron">
        <div className="container text-center">
          <h1>Welcome {username} to our supermarket!</h1>
          <p>Here you can find the best products with the best prices</p>
        </div>
      </div>

    </div>
  )
}

export default Header