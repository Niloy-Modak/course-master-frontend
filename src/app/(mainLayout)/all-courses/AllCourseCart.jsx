
import React from 'react';
import Button from '../components/Button';
import Link from 'next/link';
import Image from 'next/image';

const AllCourseCart = ({ course }) => {
    const { _id: id, course_title, about_course, category, course_cover_image, price } = course
    return (
        <div className="max-w-[340px] bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100">

            {/* --- Image Section --- */}
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 group">
                <div className="relative w-full overflow-hidden rounded-lg">
                    <Image
                        src={course_cover_image || "/default_cover_images.png"}
                        alt={course_title || "Course thumbnail"}
                        width={400}
                        height={256}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>


            </div>

            {/* --- Content Section --- */}
            <div className="px-1">
                {/* Category Tag */}
                <h4 className="text-emerald-500 font-semibold text-sm mb-2">{category}</h4>

                {/* Title & Arrow */}
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900 leading-tight">
                        {course_title}
                    </h2>
                    <a href="#" className="mt-1 text-gray-900 hover:text-emerald-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                        </svg>
                    </a>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                    {about_course}
                </p>

                {/* --- Footer (Author & Price) --- */}
                <div className="flex items-center justify-between pt-2">
                    <Link href={`/all-courses/${id}`}>
                        <div className="flex items-center gap-3">
                            <Button label={"Course Details"} />
                        </div>
                    </Link>


                    <div className="text-emerald-500 text-xl font-bold">
                        {price === 0 ? "Free" : `$${price}`}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCourseCart;