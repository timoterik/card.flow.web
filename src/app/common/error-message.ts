/*
 * Copyright © 2022-2023, DCCTech, Hungary
 */

export class ErrorMessage {
  constructor(public message: string,
              public code?: string,
              public httpStatus?: number,
              public httpStatusText?: string) {
  }
}
