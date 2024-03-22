import IconBtn from "../../../common/IconBtn";
import NestedView from "./NestedView";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const CourseBuilderForm = () => {
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const onSubmit = () => {};
  const goBack = () => {};
  const goToNext = () => {};
  const cencelEdit = () => {};
  const handleChangeEditSectionname = () => {};
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="sectionName"
          >
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex my-4 items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline
              size={20}
              className="text-yellow-50"
            />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cencelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionname={handleChangeEditSectionname} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn
          disabled={loading}
          text="Next"
          onclick={goToNext}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
