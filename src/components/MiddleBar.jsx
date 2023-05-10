import React from 'react'
import Share from './Share'
import './MiddleBar.css'
import Post from './Post'
import Description from './Description'
export default function MiddleBar(props) {
  return (
    <>
      {props.Profile?<Description Profile/>:<Share/>}
      <Post/>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  )
}
