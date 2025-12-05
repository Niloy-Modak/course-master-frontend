"use client";

import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import { useAuth } from "@/providers/AuthProvider";
import Swal from "sweetalert2";

const EnrollNowButton = ({ courseId }) => {
    const { user } = useAuth();
    const [enrolled, setEnrolled] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check if already enrolled
    useEffect(() => {
        const checkEnrollment = async () => {
            if (!user?.email) return;
            if (user.role === "admin") return; // admins don't enroll

            try {
                const res = await fetch(
                    `http://localhost:5000/api/courses/${courseId}?user_email=${user.email}`
                );
                const data = await res.json();

                if (data.lessons && data.lessons.length > 0) {
                    setEnrolled(true);
                }
            } catch (err) {
                console.error(err);
            }
        };

        checkEnrollment();
    }, [courseId, user?.email, user?.role]);

    const handleEnroll = async () => {
        if (!user?.email) {
            Swal.fire({
                icon: "warning",
                title: "Oops!",
                text: "Please login to enroll in this course!",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        }

        if (user.role === "admin") return; // admins cannot enroll

        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/purchases/buy", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // send JWT cookie
                body: JSON.stringify({ course_id: courseId }),
            });

            const data = await res.json();

            if (data.success) {
                setEnrolled(true);
                Swal.fire({
                    icon: "success",
                    title: "Enrolled!",
                    text: "You have successfully enrolled in this course.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: data.message || "Enrollment failed.",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        } catch (err) {
            console.error("Enrollment error:", err);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong!",
                timer: 1500,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    };

    // Hide button for admins
    if (user?.role === "admin") return null;

    return (
        <div className="pt-5">
            <Button
                label={enrolled ? "Enrolled" : loading ? "Enrolling..." : "Enroll Now"}
                onClick={handleEnroll}
                disabled={enrolled || loading}
                className={
                    enrolled
                        ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
                        : " "
                }
            />
        </div>
    );
};

export default EnrollNowButton;
