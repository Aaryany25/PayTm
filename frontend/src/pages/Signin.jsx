import React from 'react'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
import InputCard from '../components/InputCard'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
function Signin() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
<div className='flex flex-col justify-center'>
<div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
<Header Lable={"SignIn"}/>
<SubHeader lable={"Enter your credentials to access your account"}/>
<InputCard lable={"Email"} placeholder={"aaryany.2505@gmail.com"}/>
<InputCard lable={"Password"} placeholder={"123456"}/>
 <div className="pt-4">
          <Button label={"Sign in"} />
        </div>
         <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
</div>
</div>
    </div>
  )
}

export default Signin