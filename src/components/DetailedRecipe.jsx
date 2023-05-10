import React from 'react'
import Step from './Step'
import './DetailedRecipe.css'
import CloseIcon from '@mui/icons-material/Close';

export default function DetailedRecipe(props) {

    return (
        <>
            <div className="position-absolute  start-0 end-0 bottom-0 m-0 p-0" style={{top:props.offset}}>


                <div className="mainContainerDetailedRecipe d-flex align-item-center justify-content-center">
                    <div className="container detailedRecipe my-auto">
                        <div className="row">
                            <div className="col-10 col-md-8 mx-auto">
                                <div className="detailedRecipeImageAndContent row align-items-center p-3">
                                    <div className="detailedRecipeImage col-md-4 col-12 mb-3">
                                        <img src="/images/Dish1.png" className=' w-100 rounded-circle' alt="Dish" />
                                    </div>
                                    <div className="detailedRecipeContents position-relative col-md-8 col-12">
                                        <h3>Banana Shake</h3>
                                        <p><span>Preperation Time:</span> 20 mins</p>
                                        <p><span>Serves: 1</span></p>
                                        <p><span>Summary: This is a very good banana shake</span> </p>
                                        
                                    <CloseIcon className='position-absolute closeButtonDetailedRecipe' onClick={()=>{document.body.style.overflow='scroll';props.removeDetailedRecipe(false)}}/>
                                    </div>

                                    <div className="otherContents col-12">
                                        <h4>Ingredients Used With their quantity:</h4>
                                        <ul>
                                            <li>Milk</li>
                                            <li>Banana,</li>
                                            <li> Sugar</li>
                                        </ul>
                                        <h4>Instructions:</h4>
                                        <ul>
                                            <Step stepNum='1' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='2' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='3' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='4' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='5' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='6' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='7' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />
                                            <Step stepNum='8' stepContent="Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quod esse iste, dicta provident commodi et?" />

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
