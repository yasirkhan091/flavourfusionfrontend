import React from 'react'
import './RightBar.css'
// import ListOfAccounts from './ListOfAccounts';
import SavedRecipes from './SavedRecipes';
import Ads from './Ads';
export default function RightBar(props) {
  return (
    <>
       {props.Profile?"":<Ads/>} 
       {props.Profile?<SavedRecipes Profile/>:<SavedRecipes/>} 
    </>
  )
}
