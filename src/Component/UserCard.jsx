
import AOS from 'aos';
import 'aos/dist/aos.css';

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
const UserCard = ({user,refetch}) => {
    // console.log(user._id);
    useEffect(() => {
        AOS.init();
    }, []);



    const handleDelete=(id)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://user-management-server-five.vercel.app/deleteUser/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
   <>
        <div
        
        className="bg-gray-100 rounded-md p-4 mb-4"
        data-aos="zoom-in-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-offset="200"
    >
  <div className="card w-96 bg-neutral text-neutral-content">
  <div className="card-body items-center text-center">
    <h2 className="card-title">{user?.name}</h2>
    <p> {user?.phoneNumber} </p>
    <p> {user?.email} </p>
    <div className="card-actions justify-end">
   <Link to={`/update/${user?._id}`}>   <button className="btn btn-primary">Edit</button></Link>
      <button onClick={()=>handleDelete(user?._id)} className="btn btn-warning">Delete</button>
    </div>

  </div>
</div>

    </div>
   
   
   </>
    );
};

export default UserCard;