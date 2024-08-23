import React from 'react'
import { ImQuotesLeft } from "react-icons/im";

const Testimonial2 = ({ testimonials }) => {
  return (
    <div className='grid gap-5'>
      {
        testimonials.map((testimonial) => (
          <div className='flex items-center gap-4' key={testimonial.id}>
            <img src={testimonial.avatarLink} className='w-[10rem] h-[13rem] object-cover rounded-md' alt="" />
            <div>
              <ImQuotesLeft size={25} className='mb-3 bg-green-300 rounded-lg text-green-500 p-2 w-[2rem] h-[2rem]'/>
              <h1>"You will find everything you need to get started to collect testimonials and build a wall of love"</h1>
              <div>
                <p>Ravi</p>
                <p className='mt-4'>CEO Venturepact</p>
              </div>
            </div>
          </div>
        ))
      }

    </div>
  )
}

export default Testimonial2