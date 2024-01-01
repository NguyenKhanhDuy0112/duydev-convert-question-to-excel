import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  return {
    pathname: location.pathname,
    search: location.search,
    searchParams,
    params,
    navigate,
    setSearchParams,
  };
}

export default useRouter;
