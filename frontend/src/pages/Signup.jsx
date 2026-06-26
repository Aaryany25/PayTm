import React from 'react'
import Header from '../components/Header'
import SubHeader from '../components/SubHeader'
import InputCard from '../components/InputCard'
import Button from '../components/Button'
import BottomWarning from '../components/BottomWarning'
function Signup() {
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
<div className='flex flex-col justify-center'>
<div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
<Header Lable={"SignUp"}/>
<SubHeader lable={"Enter your information to make your account"}/>
<InputCard lable={"Email"} placeholder={"aaryany.2505@gmail.com"} onChange={e=>{
    setusername(e.target.value)
}}/>
<InputCard lable={"Password"} placeholder={"123456"} onChange={e=>{
    setpassword(e.target.value)
}}/>
<InputCard lable={"FirstName"} placeholder={"aaryany.2505@gmail.com"} onChange={e=>{
    setusername(e.target.value)
}}/>
<InputCard lable={"LastName"} placeholder={"aaryany.2505@gmail.com"} onChange={e=>{
    setusername(e.target.value)
}}/>
 <div className="pt-4">
          <Button label={"Sign up"} onClick={async()=>{
            const response =await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                password
            });
            localStorage.setItem("token",response.data.token)
navigate("/dashboard")
          }} />
        </div>
         <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
</div>
</div>
    </div>
  )
}

export default Signup