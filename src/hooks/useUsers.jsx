import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useUsers = () => {
    const [loading, setLoading] = useState(true);
    const { data: allUsers = [],refetch} = useQuery(["allUsers"], async () => {
        const res = await fetch(
          "https://user-management-server-five.vercel.app/users"
        );
        setLoading(false)
        return res.json();
      });
    return [allUsers,loading,refetch]
};

export default useUsers;