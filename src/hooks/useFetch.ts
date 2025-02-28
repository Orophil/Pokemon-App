import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useFetch = (url: string, redirectUrl: string | null = null) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const fetchPokemon = async (endpoint: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(url || endpoint);
      if (response.status === 200) {
        if (redirectUrl) {
          navigate(redirectUrl);
        }
        return { success: true, data: response.data };
      } else {
        throw new Error("Fetch failed");
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const errorMessage = err?.response?.data?.message || "An error occurred!";
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  return { fetchPokemon, isLoading };
};
export default useFetch;
