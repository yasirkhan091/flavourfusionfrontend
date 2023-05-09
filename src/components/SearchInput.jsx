import React from 'react'
import './SearchInput.css'

export default function SearchInput(props) {
  return (
    <>
        <div class="container">

<div class="row d-flex justify-content-center mt-3">

  <div class="col-md-6">

    <div class="search">
      <i class="fa fa-search"></i>
      <input type="text" class="form-control" placeholder={props.placeholder} />
      <button class="btn btn-primary">{props.buttonName}</button>
    </div>

  </div>

</div>
</div>
    </>
  )
}
