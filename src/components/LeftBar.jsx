import React from 'react'
import './LeftBar.css'
import Description from './Description'
import Info from './Info'
import ListOfAccounts from './ListOfAccounts'
import SideOptions from './SideOptions'
export default function LeftBar(props) {
  return (
    <>
      {props.Profile?<Info/>:<Description/>}
      {props.Profile ? <ListOfAccounts Profile {...props}/> :<SideOptions/>}
      {/* <ListOfAccounts Profile/> */}
    </>
  )
}
