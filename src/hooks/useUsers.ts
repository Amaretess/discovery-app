import { useEffect } from "react";

const useUsers = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const { request, cancel } = userService.getAllUsers()
        request.then(({ data: allUsers }) => {
          setUsers(allUsers)
          setLoading(false);
        })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
          })
        return () => cancel();
      }, [])


}

export default useUsers();