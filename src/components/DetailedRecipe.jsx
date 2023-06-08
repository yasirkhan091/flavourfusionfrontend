import React from 'react'
import './DetailedRecipe.css'
import CloseIcon from '@mui/icons-material/Close';

const Step=(props)=> {

    return (
      <>
          <li className='mb-2'>
              <h6 className=' d-inline'>Step {props.number}</h6>: {props.step}
              <div className="d-flex mt-1 align-items-center">
              <div className="d-flex me-2 align-items-center justify-content-center">
              <h6 className='me-2 mb-0'>Ingredients Used:</h6><p className='mb-0'>{props.ingredients.length>0 ? props.ingredients.map(element=>(element.name)).join():"None"}</p>
              </div>
              <div className="d-flex align-items-center justify-content-center">
              <h6 className='me-2 mb-0'>Equipments Used:</h6><p className='mb-0'>{props.equipment.length>0? props.equipment.map(element=>(element.name)).join(): "None"}</p>
              </div>
              </div>
          </li>
      </>
    )
  }



export default function DetailedRecipe(props) {
  console.log(props)  ;

    return (
        <>
            <div className="position-absolute  start-0 end-0 bottom-0 m-0 p-0" style={{top:props.offset}}>
                <div className="mainContainerDetailedRecipe d-flex align-item-center justify-content-center">
                    <div className="container detailedRecipe my-auto">
                        <div className="row">
                            <div className="col-10 col-md-8 mx-auto">
                                <div className="detailedRecipeImageAndContent row align-items-center p-3">
                                    <div className="detailedRecipeImage col-md-4 col-12 mb-3">
                                        <img src={props.image} className=' w-100 rounded-circle detailedRecipeImageHeight' alt="Dish" />
                                    </div>
                                    <div className="detailedRecipeContents position-relative col-md-8 col-12">
                                        <h3>{props.title}</h3>
                                        <p><span>Preperation Time:</span> {props.readyInMinutes} mins</p>
                                        <p><span>Serves: {props.servings}</span></p>
                                        <p><span>Summary:{props.summary.substr(0,240).replace( /(<([^>]+)>)/ig, '')+"..."}</span> </p>
                                        
                                    <CloseIcon className='position-absolute closeButtonDetailedRecipe' onClick={()=>{document.body.style.overflow='scroll';props.removeDetailedRecipe(false)}}/>
                                    </div>

                                    <div className="otherContents col-12 text-start">
                                        <h4>Instructions:</h4>
                                        <ul>
                                            {props.analyzedInstructions.length!==0? props.analyzedInstructions[0].steps.map(element=><Step {...element}/>):"Sorry! The Instructions are not provided for this recipe. We are looking in the matter"}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
