import React from 'react';
import AllCourseCart from './AllCourseCart';

const AllCoursePage = async () => {
    const res = await fetch('http://localhost:5000/api/courses', {
        next: { revalidate: 10 },
    });

    if (!res.ok) throw new Error('Failed to fetch courses');

    const coursesArray = await res.json();

    // Debug: log to check API response
    // console.log('coursesArray:', coursesArray);

    if (!coursesArray || !Array.isArray(coursesArray)) return <p>No courses found</p>;

    const courses = coursesArray.map(course => ({
        ...course,
        _id: course._id.toString(),
    }));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
                <AllCourseCart key={course._id} course={course} />
            ))}
        </div>
    );
};

export default AllCoursePage;