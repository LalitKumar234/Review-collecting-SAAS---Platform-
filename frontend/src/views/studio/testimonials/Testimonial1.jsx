import React from 'react'
import { Card } from "@/components/ui/card"

const Testimonial1 = ({ testimonials }) => {
    return (
        <>

            <div class="columns-4 grid">

                {
                    testimonials.map((card) => (
                        <div key={card.id} class="aspect-video w-full p-8 border border-gray-100 rounded-2xl bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 dark:shadow-none">
                            <div class="flex gap-4">
                                <img class="w-12 h-12 rounded-full" src={card.avatarLink} alt="" width="" height="" loading="lazy" />
                                <div>
                                    <h6 class="text-lg font-medium text-gray-700 dark:text-white">{card.name}{card.id}</h6>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">{card.CompanyRole}</p>
                                </div>
                            </div>
                            <p class="mt-8">{card.testimonialText}</p>
                        </div>
                    ))
                }
            </div>
 
        </>

    )
}

export default Testimonial1