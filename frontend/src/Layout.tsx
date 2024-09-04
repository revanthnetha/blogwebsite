import React from 'react'
import Appbar from './components/Appbar'

const Layout = ({children}:{children : React.ReactNode}) => {
  return (
    <div>
     <Appbar/>
      {children}
    </div>
  )
}

export default Layout
