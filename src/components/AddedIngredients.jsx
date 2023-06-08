import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './AddedIngredients.css'
export default function AddedIngredients(props) {
  return (
    <div className="ingredientBox rounded d-flex align-items-center justify-content-center ">
        {props.name} <span className='closeIcon ms-auto'><CloseIcon className='closeIconButton' onClick={()=>{!props.Empty && props.deleteFunction(props.name)}}/></span>
    </div>
  )
}
