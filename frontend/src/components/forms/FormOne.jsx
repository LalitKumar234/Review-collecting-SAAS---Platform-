import React from 'react'

const FormOne = () => {
    return (
        <form action="" className='flex flex-col max-w-[500px]'>
            <label htmlFor="">Your name</label>
            <input type="text" placeholder='Your name' />
            <label htmlFor="">Your Email</label>
            <input type="text" placeholder='Your Email' />
            <label htmlFor="">Your Address</label>
            <input type="text" placeholder='Address' />
            <button>Submit</button>
        </form>
    )
}

export default FormOne