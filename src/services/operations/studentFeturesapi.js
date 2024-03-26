import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { resetCart } from "../../slices/cart";
import { setPaymentLoading } from "../../slices/course";
import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import toast from "react-hot-toast";

// step 1
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// step 2
export const buyCourse = async (
  courses,
  token,
  userDetails,
  navigate,
  dispatch
) => {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast.error("razorpay sdk failed to load");
      return;
    }
    // initae the order
    const orderResponse = await apiConnector(
      "POST",
      studentEndpoints.COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    // options
    const options = {
      key: process.env.RAZORPAY_KEY || "razorepaysecrete",
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank you for purchasing course",

      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log("payment error: " + error.message);
    toast.error("payment error");
  }
  toast.dismiss(toastId);
};
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      studentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("payment success email send error : ", error.message);
  }
}
async function verifyPayment(bodyData, token, navigate, dispatch) {
  //hii
  const toastId = toast.loading("Verifying payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      studentEndpoints.COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("payment Successful , you are added to the course");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("verify payment error : ", error.message);
  }
  toast.error("verify payment error");
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

export const directEnrolled = async (courses, token, navigate, dispatch) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      studentEndpoints.DIRECTENROLLED_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error("fails to direct enroll");
    }
    toast.success("successfuly direct enrolled");
    dispatch(resetCart());
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.log("error while direct enrolled : ", error.message);
  }
  toast.dismiss(toastId);
};
