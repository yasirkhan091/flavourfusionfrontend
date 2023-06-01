import React, { useRef } from 'react'
import "./Login.css"
import { Link } from 'react-router-dom';

const SignUp=()=>{
    const username=useRef('');
    const email=useRef('');
    const password=useRef('');
    const confirmPassword=useRef('');
    return (<>
        <div className="loginPageInputFieldsContainer d-flex flex-column align-items-center justify-content-center mx-auto ">
                    <h2>SignUp Page</h2>
                    <input type='text' id='input3' className='loginPageInputTag' ref={username} required/>
                    <label for="input3" alt="Full Name" className='me-auto InputTagLabel' placeholder="Full Name"></label>
                    <input type='email' id='input1' className='loginPageInputTag' ref={email} required/>
                    <label for="input1" alt="Email" className='me-auto InputTagLabel' placeholder="Email"></label>
                    <input type='password'  id="input2" className='loginPageInputTag' ref={password} required/>
                    <label for="input2" alt="Password" className='me-auto InputTagLabel' placeholder="Password"></label>
                    <input type='password'  id="input4" className='loginPageInputTag' ref={confirmPassword} required/>
                    <label for="input4" alt="Confirm Password" className='me-auto InputTagLabel' placeholder="Confirm Password"></label>
                    <button type="button" class="btn btn-primary loginButton">Sign Up</button>
                    <p className='mt-2'>Already have an account? Go to <Link to="/login">LogIn</Link> Page</p>
        </div>
    </>);
}
const LoginComp=()=>{
    const email=useRef('');
    const password=useRef('');
    return (<>
            <div className="loginPageInputFieldsContainer d-flex flex-column align-items-center justify-content-center mx-auto ">
                    <h2 className='mb-3'>Login Page</h2>
                    <input type='email' id='input1' className='loginPageInputTag' ref={email} required/>
                    <label for="input1" alt="Email" className='me-auto InputTagLabel' placeholder="Email"></label>
                    <input type='password'  id="input2" className='loginPageInputTag' ref={password} required/>
                    <label for="input2" alt="Password" className='me-auto InputTagLabel' placeholder="Password"></label>
                    <button type="button" class="btn btn-primary loginButton">Log In</button>
                    <p className='mt-2'>Don't have an account? Go to <Link to="/signup">SignUp</Link> Page</p>
            </div>
    </>);
}

export default function Login(props) {
        const images=["Post4.jpg","Post3.jpg","Post2.jpg","Dish2.jpg"]
  return (
    <>
        <div className="loginPageContainer d-flex align-items-center justify-content-center">
            <div className="loginPageInnerContainer d-flex">
                <div className="loginPageImage mx-auto ">
                    <h2>Welcome To Flavour Fusion</h2>
                    <p className="text-capitalize">Find Your Best Recipes Here and Share with your friends whatever you cook</p>
                    <div className="d-flex loginPageImageInnerContainer">
                    {
                        images.map((element)=>{
                            return (<img src={`/images/${element}`} className=" img-fluid " alt='LoginImage'/>)
                        })
                    }
                    </div>
                </div>
                {props.signup?<SignUp/>:<LoginComp/>}

            </div>
        </div>
    </>
  )
}
