import React from 'react'

function InputCard({lable,onChange,placeholder}) {
  return (
    <div>
        <div  className="text-sm font-medium text-left py-2">{lable}</div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
  )
}

export default InputCard