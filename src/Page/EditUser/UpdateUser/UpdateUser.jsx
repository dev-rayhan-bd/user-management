import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import animate from "../../../../public/lottie.json";
import SectionTitle from "../../../Component/SectionTitle";

const UpdateUser = () => {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`https://user-management-server-five.vercel.app/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
  }, [id]);
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/editUser";
  const onSubmit = (data) => {
    const price = Number(data.price);
    data.price = price;
    const seats = Number(data.seats);
    data.seats = seats;

    // console.log(data);
    fetch(`https://user-management-server-five.vercel.app/updateUser/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          reset();
          navigate(from, { replace: true });
          toast.success("update succesfull");
        }
      });
  };

  return (
    <div className="md:flex items-center justify-center min-h-screen  mb-5 ">
      <div className="text-center lg:text-left md:w-2/4 ">
        <Lottie animationData={animate} loop={true} height={100} width={100} />
      </div>

      <div className="md:w-1/2 px-6 py-8 bg-gray-100 rounded-lg shadow-md ">
        <SectionTitle header={"Update User"}></SectionTitle>
        <div className="flex flex-col ml-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                defaultValue={user.name}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.name && (
                <span className="text-red-600"> User name is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                defaultValue={user.email}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-red-600"> Email is required</span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="number"
                {...register("phoneNumber", { required: true })}
                defaultValue={user.phoneNumber}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.phoneNumber && (
                <span className="text-red-600"> PhoneNumber is required</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-gray-600  "
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
