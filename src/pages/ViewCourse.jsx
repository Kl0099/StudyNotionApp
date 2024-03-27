import ReviewModal from "../components/Dashboard/VideoDetails/ReviewModal";
import VideoDetailsSideBar from "../components/Dashboard/VideoDetails/VideoDetailsSideBar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetails";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  updateCompletedLectures,
} from "../slices/viewCourseSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      if (courseData) {
        dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
        dispatch(setEntireCourseData(courseData.courseDetails));
        dispatch(setCompletedLectures(courseData.completedVideos));
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec.subSection.length;
        });
        dispatch(setTotalNoOfLectures(lectures));
      }
      console.log(courseData);
    };
    getCourseSpecificDetails();
    // console.log("hellow");
  }, []);
  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSideBar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
