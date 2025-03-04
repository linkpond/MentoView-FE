import { useQuery } from "@tanstack/react-query";

const fetchGoogleAuthUrl = async () => {
  const response = await fetch("http://localhost:8080/api/auth/google");
  if (!response.ok) throw new Error("Failed to fetch Google Auth URL");
  return response.json();
};

export const useGoogleAuth = () => {
  return useQuery({
    queryKey: ["googleAuthUrl"],
    queryFn: fetchGoogleAuthUrl,
    enabled: false,
  });
};