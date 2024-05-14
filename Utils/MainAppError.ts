export enum HTTPCODES {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    REDIRECTED = 300,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    UNPROCESSABLE_IDENTITY = 422,
    CONFLICT = 409,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTED = 406,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 508,
    NETWORK_TIMEOUT = 599,
  }
  
  interface ErrorTags {
    name?: string;
    isOperational?: boolean;
    message?: string;
    httpcode: HTTPCODES;
  }
  
  export class MainAppError extends Error {
    public readonly name: string;
    public readonly isOperational: boolean = true;
    public readonly httpcode: HTTPCODES;
  
    constructor(args: ErrorTags) {
      super(args.message);
  
      Object.setPrototypeOf(this, new.target.prototype);
  
      this.httpcode = args.httpcode;
      this.name = args.name || "Error";
  
      if (args.isOperational !== undefined) {
        this.isOperational = args.isOperational;
      }
  
      Error.captureStackTrace(this);
    }
  }