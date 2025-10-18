import { HttpErrorResponse } from "@angular/common/http";

export const errorHelpers = (e: HttpErrorResponse) => {
  console.log(e);
  return;
};
