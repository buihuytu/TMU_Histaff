import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError(error: Error) {
        // do something with the exception
        switch (error.message) {
            case "Cannot read properties of undefined (reading 'pvtData')":
                console.log("Grid header checkbox error when persistSelection = true")
                console.log(error.message)
                console.log(error.name)
                console.log(error.stack)
                break
            default:
                console.error("AppErrorHandler: ", error);
        }
        
    }
  }