import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "../../App.css";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
// Icons
import { FaStar } from "react-icons/fa";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper";

const ReviewSlider = () => {
  const fakereviews = [
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magnam deleniti illo quidem voluptatem recusandae dicta sunt, doloremque est excepturi nam nesciunt iste minus accusantium veritatis sed repellendus quasi iusto.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magnam deleniti illo quidem voluptatem recusandae dicta sunt, doloremque est excepturi nam nesciunt iste minus accusantium veritatis sed repellendus quasi iusto.",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magnam deleniti illo quidem voluptatem recusandae dicta sunt, doloremque est excepturi nam nesciunt iste minus accusantium veritatis sed repellendus quasi iusto.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit magnam deleniti illo quidem voluptatem recusandae dicta sunt, doloremque est excepturi nam nesciunt iste minus accusantium veritatis sed repellendus quasi iusto.",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
    {
      course: {
        courseName: "machine learning course",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
      rating: 5,

      reviews:
        "wow ! very dangerous course \nthis is the best course in the world",
      user: {
        email: "loadhakrunal@gmail.com",
        firstName: "kranal",
        image:
          "https://res.cloudinary.com/dkzp8h6xw/image/upload/v1710513662/codeHelp/ewrsuonnzwsk5qthu9e7.jpg",
        lastName: "loadha",
        _id: "6603f5a8c10f4f7469f7dda2",
      },
    },
  ];
  const [reviews, setReviews] = useState(fakereviews);
  const truncateWords = 30;
  useEffect(() => {
    // (async () => {
    //   const { data } = await apiConnector(
    //     "GET",
    //     ratingsEndpoints.REVIEWS_DETAILS_API
    //   );
    //   if (data?.success) {
    //     setReviews(data?.data);
    //     console.log(data?.data);
    //   }
    // })();
  }, []);
  // useEffect(() => {
  //   console.log("reviews :", reviews[0].reviews);
  // }, [reviews]);
  return (
    <div className=" text-white">
      <div className=" my-[50px] h-[250px] max-w-xs md:max-w-3xl sm:max-w-maxContentTab lg:max-w-5xl xl:max-w-maxContent">
        <Swiper
          style={{
            "--swiper-pagination-color": "#FFBA08",
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "7px",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
          }}
          slidesPerView={
            window.innerWidth < 600
              ? 1
              : window.innerWidth > 600 && window.innerWidth < 800
              ? 2
              : window.innerWidth > 800 && window.innerWidth < 960
              ? 3
              : 4
          }
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={true}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full  pb-10"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25 overflow-y-scroll  border-richblack-400 mx-4 h-[250px]">
                  {/* tital  */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-xl text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  {/* stars  */}
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                  {/* reviews  */}
                  <p className="font-medium text-richblack-25">
                    {review?.reviews?.split(" ").length > truncateWords
                      ? `${review?.reviews
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.reviews}`}
                    {/* {review.reviews} */}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
