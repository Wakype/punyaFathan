import { useMutation } from "@tanstack/react-query";
import { useNotification } from "../../../components";
import axiosClient from "../../../Api/url";

export const useAuthService = () => {
  const { toastSuccess, toastError, toastWarning } = useNotification();

  const useLogin = () => {
    const { mutate, isLoading } = useMutation(
      (payload) => {
        return axiosClient.post("/admin/login", payload);
      },
      {
        onSuccess: async (response) => {
          toastSuccess(response.data.message);
          console.log("ini dia", response);

          //   await signIn("credentials", {
          //     id: response.data.data.id,
          //     name: response.data.data.username,
          //     email: response.data.data.email,
          //     role: response.data.data.role_id.role_name,
          //     roleId: response.data.data.role_id.id,
          //     accessToken: response.data.data.access_token,
          //     refreshToken: response.data.refresh_token,
          //     redirect: true,
          //   });
        },
        onError: (error) => {
          if (error.response.status === 422) {
            toastWarning(error.response.data.message);
          } else {
            toastError();
            alert(error.response.data.message);
          }
        },
        onSettled: (respose) => {},
      }
    );

    return { mutate, isLoading };
  };

  return {useLogin};
};
