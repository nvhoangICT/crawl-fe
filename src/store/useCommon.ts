import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CommonState {
  isLoading: boolean;
  isRefresh: boolean;
  setIsLoading: (value: boolean) => void;
  setIsRefresh: (value: boolean) => void;
}

const useCommon = create<CommonState>()(
  devtools(
    (set) => ({
      isLoading: false,
      isRefresh: false,
      setIsLoading: (value: boolean) =>
        set(
          { isLoading: value },
          false,
          "common/setIsLoading"
        ),
      setIsRefresh: (value: boolean) =>
        set(
          { isRefresh: value },
          false,
          "common/setIsRefresh"
        ),
    }),
    {
      enabled: true,
      name: "common",
    }
  )
);

export default useCommon;
