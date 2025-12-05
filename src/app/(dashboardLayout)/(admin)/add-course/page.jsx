import React from 'react';
import AddCourseFrom from './AddCourseFrom';

const AddCoursePage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-full md:min-h-[calc(100vh-64px)]'>
            <div className=' w-full '>
                <AddCourseFrom />
            </div>
        </div>
    );
};

export default AddCoursePage;