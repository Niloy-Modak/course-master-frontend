"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import Swal from "sweetalert2";

export default function AddCourseForm() {
    const router = useRouter();
    const { user } = useAuth();

    const [lessons, setLessons] = useState([]);
    const [form, setForm] = useState({
        course_title: "",
        about_course: "",
        category: "",
        price: ""
    });

    const [coverImage, setCoverImage] = useState(null); // optional cover image
    const [uploading, setUploading] = useState(false);

    const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;


    // Handle input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle cover image selection
    const handleCoverChange = (e) => {
        setCoverImage(e.target.files[0] || null);
    };

    // Add new lesson
    const addLesson = () => {
        const newLesson = {
            lesson_no: lessons.length + 1,
            lesson_title: "",
            lesson_description: "",
            lesson_video: "",
            lesson_status: "pending"
        };
        setLessons([...lessons, newLesson]);
    };

    // Remove lesson
    const removeLesson = (index) => {
        const updated = lessons.filter((_, i) => i !== index);
        setLessons(updated);
    };

    // Update lesson field
    const updateLesson = (index, field, value) => {
        const updated = [...lessons];
        updated[index][field] = value;
        setLessons(updated);
    };

    // Upload image to ImgBB
    const uploadImage = async () => {
        if (!coverImage) return null;

        const formData = new FormData();
        formData.append("file", coverImage);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            setUploading(true);

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            setUploading(false);

            return data.secure_url; // Cloudinary image URL
        } catch (error) {
            setUploading(false);
            console.error("Upload failed:", error);

            Swal.fire({
                icon: "error",
                title: "Image upload failed",
                text: error.message,
            });

            return null;
        }
    };


    // Submit course
    const handleSubmit = async (e) => {
        e.preventDefault();

        // upload cover image if provided
        const coverURL = await uploadImage();

        const courseData = {
            ...form,
            price: Number(form.price) || 0,
            lessons,
            course_cover_image: coverURL, // null if not uploaded
            course_added_by: {
                name: user.name,
                email: user.email,
                role: user.role
            }
        };

        try {
            const res = await fetch("http://localhost:5000/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(courseData)
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Course added successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                router.push("/");
            } else {
                console.error("Backend error:", data);
                Swal.fire({
                    icon: "error",
                    title: "Failed to add course",
                    text: data.message || "Unknown error"
                });
            }
        } catch (err) {
            console.error("Fetch error:", err);
            Swal.fire({
                icon: "error",
                title: "Failed to add course",
                text: err.message
            });
        }
    };

    if (user?.role !== "admin") return <p className="text-red-500">Access denied</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 text-center">Add New Course</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Course Title */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Course Title</label>
                    <input
                        type="text"
                        name="course_title"
                        placeholder="Enter course title"
                        className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* About Course */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">About Course</label>
                    <textarea
                        name="about_course"
                        placeholder="Brief description about course"
                        className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                        onChange={handleChange}
                        rows={4}
                        required
                    />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            placeholder="e.g., Web Development"
                            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-1">Price</label>
                        <input
                            type="number"
                            name="price"
                            placeholder="Course Price"
                            className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            value={form.price}
                            onChange={(e) => {
                                const value = Number(e.target.value);
                                setForm({ ...form, price: value < 0 ? 0 : value });
                            }}
                            min={0}
                            required
                        />
                    </div>
                </div>

                {/* Cover Image */}
                <div className="flex flex-col">
                    <label className="text-gray-700 font-semibold mb-1">Course Cover Image (Optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverChange}
                        className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                    />
                    {uploading && <p className="text-blue-500 mt-1">Uploading image...</p>}
                </div>

                {/* Lessons */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-800">Lessons</h2>

                    {lessons.map((lesson, index) => (
                        <div
                            key={index}
                            className="relative border border-gray-200 p-4 rounded-lg bg-gray-50 shadow-sm space-y-3"
                        >
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-600 font-bold text-xl transition"
                                onClick={() => removeLesson(index)}
                            >
                                &times;
                            </button>

                            <p className="font-semibold text-gray-700">Lesson {lesson.lesson_no}</p>

                            <input
                                type="text"
                                placeholder="Lesson Title"
                                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                onChange={(e) => updateLesson(index, "lesson_title", e.target.value)}
                                required
                            />

                            <textarea
                                placeholder="Lesson Description"
                                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                                onChange={(e) => updateLesson(index, "lesson_description", e.target.value)}
                                rows={3}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Lesson Video Link (YouTube)"
                                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                onChange={(e) => updateLesson(index, "lesson_video", e.target.value)}
                                required
                            />

                            <select
                                className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                                onChange={(e) => updateLesson(index, "lesson_status", e.target.value)}
                                value={lesson.lesson_status}
                            >
                                <option value="pending">Pending</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addLesson}
                        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                    >
                        + Add Lesson
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg"
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Submit Course"}
                </button>
            </form>
        </div>
    );
}
