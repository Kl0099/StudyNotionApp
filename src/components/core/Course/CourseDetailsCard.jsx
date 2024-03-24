import copy from "copy-to-clipboard";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState(null);
  //   const {
  //     thumbnail: ThumbnailImage,
  //     price: CurrentPrice,
  //     _id: courseId,
  //   } = course;
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };
  const handleAddToCart = () => {};
  useEffect(() => {
    console.log("useEffect working : ", courses);
    setCourses(course);
  }, [course]);

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={courses?.thumbnail}
          alt={courses?.courseName}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {courses?.price}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton hover:scale-95"
              onClick={
                user && courses?.studentsEnroled?.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && courses?.studentsEnroled?.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !courses?.studentsEnroled?.includes(user?._id)) && (
              <button
                onClick={handleAddToCart}
                className="blackButton"
              >
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
              30-Day Money-Back Guarantee
            </p>
          </div>

          <div className={``}>
            <p className={`my-2 text-xl font-semibold `}>
              This Course Includes :
            </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
              {courses?.instructions?.map((item, i) => {
                return (
                  <p
                    className={`flex gap-2`}
                    key={i}
                  >
                    <BsFillCaretRightFill />
                    <span>{item}</span>
                  </p>
                );
              })}
            </div>
          </div>
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-yellow-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetailsCard;
