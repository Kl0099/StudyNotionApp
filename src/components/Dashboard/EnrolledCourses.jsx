import { getUserEnrolledCourses } from "../../services/operations/profileapi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  // const [laoding, setLoading] = useState(false);
  const getEnrolledCourse = async () => {
    // setLoading(true);
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourse(response);
    } catch (error) {
      console.log("error while enrolled courses");
    }
    // setLoading(false);
  };
  useEffect(() => {
    getEnrolledCourse();
  }, []);
  useEffect(() => {
    console.log("enrolled courses : ", enrolledCourse);
  }, [enrolledCourse]);
  return (
    <div>
      <div>Enrolled Courses</div>
      {!enrolledCourse ? (
        <div>Loading...</div>
      ) : !enrolledCourse.length ? (
        <p>you have not enrolled any course</p>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EnrolledCourses;
