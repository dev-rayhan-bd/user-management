import { useForm } from "react-hook-form";
import SectionTitle from "../../Component/SectionTitle";
import Lottie from "lottie-react";
import animate from "../../assets/user-add.json"
import { toast } from "react-hot-toast";
const AddUser = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    fetch("https://user-management-server-five.vercel.app/addUsers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          toast.success("New User Added");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
  <>

    <div className="md:flex  items-center justify-center min-h-screen  mb-5 ">
         <div className="text-center md:text-left md:w-2/4 bg-gray-100">
            <Lottie animationData={animate} loop={true} height={100} width={100} />
          </div>
      
      <div className="md:w-1/2 px-6 py-8 bg-gray-100 rounded-lg shadow-md ">
      <SectionTitle header={"Add New User"}></SectionTitle>
        <div className="flex flex-col ml-6">
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                User Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
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
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  
  </>
  );
};

export default AddUser;
