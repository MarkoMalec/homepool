import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import handleServerError from "../server-error-handle";
import { toast } from "react-hot-toast";

type FetchCallback = (data: any) => void;

export const useFetch = (onSuccess?: () => void) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const doFetch = async (
    url: string,
    options: object,
    callback?: FetchCallback,
    onError?: () => void,
    onFinally?: () => void,
  ) => {
    setIsFetching(true);

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.error) {
        handleServerError(data.error);
      } else {
        if (callback) {
          callback(data);
        }

        if (onSuccess) {
          onSuccess();
        }

        if (onFinally) {
          onFinally();
        }

      }
    } catch (error) {
      if (onError) {
        onError();
      } else {
        toast.error(`Something went wrong, please try again later.`);
      }
      console.error("An error occurred:", error);
    }

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
      if (onFinally) {
        onFinally();
      }
    });
  };

  return {
    isMutating,
    doFetch,
  };
};
