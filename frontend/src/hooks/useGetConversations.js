import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async (name = "") => {
      setLoading(true);
      try {
        const res = await fetch(`/api/v1/users/usersByName?name=${name}`);
        const data = await res.json();
        console.log(data.users);
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data.users);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);
  return { loading, conversations };
};

export default useGetConversations;
