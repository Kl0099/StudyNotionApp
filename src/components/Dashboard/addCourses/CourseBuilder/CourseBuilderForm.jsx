import React from "react";
import { useForm } from "react-hook-form";

const CourseBuilderForm = () => {
  const {
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </div>
  );
};

export default CourseBuilderForm;
