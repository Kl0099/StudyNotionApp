import { fetchCourseCategories } from "../../../../services/operations/courseDetails";
import { setStep } from "../../../../slices/course";
import IconBtn from "../../../common/IconBtn";
import ChipInput from "./ChipInput";
import RequirementsField from "./RequirementsField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [fileImage, setFileImage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [courseCategory, setCourseCategory] = useState([]);
  const getCategories = async () => {
    setLoading(true);
    const categories = await fetchCourseCategories();
    if (categories.length > 0) {
      setCourseCategory(categories);
    }
    setLoading(false);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setImageFile(file);
      prevFile(file);
    }
  };
  const prevFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // setPreviewSource(reader.result);
      setAvatar(reader.result);
      // console.log(avatar);
    };
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <form
        className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
        encType="multipart/form-data"
      >
        {/* course title  */}
        <div className=" flex flex-col space-y-2">
          <label htmlFor="courseTitle">
            Course title <sup className=" text-pink-200">*</sup>
          </label>
          <input
            id="courseTitle"
            placeholder="Enter a Course Title"
            {...register("courseTItle", { required: true })}
            className=" form-style w-full"
          />
          {errors.courseTitle && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is required
            </span>
          )}
        </div>

        {/* course description  */}

        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="courseShortDesc"
          >
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseShortDesc"
            placeholder="Enter Description"
            {...register("courseShortDesc", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.courseShortDesc && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )}
        </div>

        {/* course price  */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="coursePrice"
          >
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              id="coursePrice"
              placeholder="Enter Course Price"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
              className="form-style w-full !pl-12"
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          </div>
          {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is required
            </span>
          )}
        </div>

        {/* course category  */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseCategory">
            Course Category <sup className=" text-pink-200">*</sup>
          </label>
          <select
            id="courseCategory"
            defaultValue=""
            {...register("courseCategory", {
              required: true,
            })}
            className="form-style w-full "
          >
            <option
              value=""
              disabled
            >
              Choose a category{" "}
            </option>
            {!loading &&
              courseCategory?.map((category, index) => (
                <option
                  key={index}
                  value={category._id}
                >
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
        </div>
        {/* course tag  */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* chip image upload  */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="imagefile">
            Course Thumbnail <sup className=" text-pink-200">*</sup>
          </label>
          <input
            type="file"
            name="imagefile"
            id="imagefile"
            className=" form-style w-full border"
            onChange={handleFileChange}
          />
          {avatar === "" ? null : (
            <div>
              <img
                src={avatar}
                alt="avatar"
                className=" border rounded-md w-full h-[300px] object-cover"
                {...register("imagefile", { required: true })}
              />
              {errors.imagefile && (
                <span className=" mt-2 ml-2 text-xs tracking-wide text-pink-200">
                  thumbnail is required
                </span>
              )}
            </div>
          )}
        </div>

        {/* course banifits  */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="courseBenefits">
            Benefits of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            placeholder="Enter benifits of the course"
            id="courseBenefits"
            className=" form-style resize-x-none min-h-[130px] w-full "
            {...register("courseBenefits", { required: true })}
          />
          {errors.courseBenefits && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* requirments field  */}
        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />
        {/* Next Button */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          <IconBtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </>
  );
};

export default CourseInformationForm;
