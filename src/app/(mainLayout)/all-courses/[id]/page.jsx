// app/all-courses/[id]/page.jsx
import Image from "next/image";
import React from "react";
import EnrollNowButton from "./EnrollNowButton";


const CourseDetailPage = async ({ params }) => {
    
    const { id } = await params; // <-- important

    console.log("Course ID:", id);

    // Fetch course by id
    const res = await fetch(`http://localhost:5000/api/courses/${id}`, {
        next: { revalidate: 10 },
    });

    if (!res.ok) {
        return (
            <div className="text-center mt-20">
                <h1 className="text-3xl font-bold text-red-600">Course Not Found</h1>
            </div>
        );
    }

    const course = await res.json();

    return (
        
<div className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="relative overflow-hidden rounded-lg h-64 sm:h-80 md:h-96">
        <Image
            src={course.course_cover_image || "/default_cover_images.png"}
            alt={course.course_title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 768px"
        />
    </div>

    <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{course.course_title}</h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg">{course.about_course}</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
            <p className="text-gray-600 font-medium text-sm sm:text-base">
                Category: <span className="text-indigo-600">{course.category}</span>
            </p>
            
        </div>
        <div>
            <p className={`text-xl font-semibold mt-2 sm:mt-0 ${course.price === 0 ? "text-green-600" : "text-indigo-700"}`}>
                {course.price === 0 ? "Free" : `$${course.price}`}
            </p>
            <EnrollNowButton courseId={id}/>
        </div>
    </div>
</div>
    );
};

export default CourseDetailPage;
