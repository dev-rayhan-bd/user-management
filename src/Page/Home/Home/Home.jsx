
import UsersTable from "../../../Component/UsersTable";
import SectionTitle from "../../../Component/SectionTitle";
import useUsers from "../../../hooks/useUsers";
import { FaSpinner } from "react-icons/fa";


const Home = () => {
const [allUsers,loading]=useUsers();

    return (

        <div>
<SectionTitle header={'our users'}></SectionTitle>
{loading? <div className="flex items-center justify-center h-32">
                <FaSpinner className="animate-spin text-gray-500 text-4xl" />
            </div> :
<div className="overflow-x-auto mb-12">
 <table className="table container mx-auto w-1/2">
    {/* head */}
    <thead  className="font-bold text-xl bg-base-300">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody className="">
 
      {
            allUsers?.map((user,idx)=><UsersTable key={user?._id} user={user} idx={idx}></UsersTable>)
           }
  
    </tbody>
  </table>
</div>
}

          
        </div>
    );
};

export default Home;