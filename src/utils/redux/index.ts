// types
import { PAGE_PROPS } from "@/types/common";

export function generateInitialState(this: PAGE_PROPS) {
  const { page, apiResponse } = this;
  const isInitialPageFromAPI = !!apiResponse;
  const initialState = isInitialPageFromAPI
    ? { [page]: { pageData: apiResponse.data } }
    : {};

  return initialState;
}
