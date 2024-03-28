import { deleteProfile } from "../../../services/operations/profileapi";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("error deleting account : ", error.message);
    }
  }
  return (
    <>
      <div className="my-10 flex flex-col gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-2 sm:p-8 sm:px-12">
        <div className=" flex flex-raw gap-4 items-center">
          <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700 border">
            <FiTrash2 className="text-3xl text-pink-200" />
          </div>
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="sm:w-3/5 w-fit mt-5 mb-5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is
              permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit cursor-pointer p-2 rounded-lg bg-pink-700 italic text-pink-300"
            onClick={handleDeleteAccount}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteAccount;
