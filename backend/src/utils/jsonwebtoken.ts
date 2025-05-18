import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";
import HttpException from "./http-error";
import { HttpStatus } from "./http-status";


// Define the payload to handle both students and tutors
export interface UserPayload {
  id: string;
  role: 'superAdmin'|'student' | 'tutor' | 'admin' | 'guardian'| 'parent';
  
}

declare global {
  namespace Express {
    interface Request {
      student?: UserPayload; // student payload with role
      tutor?: UserPayload;   // tutor payload with role
      admin?:UserPayload;
      guardian?: UserPayload;
      parent?: UserPayload;
      superAdmin?: UserPayload;
    }
  }
}



export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  const token = authHeader?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return next(
          new HttpException(HttpStatus.FORBIDDEN, "Invalid token")
        );
      }
      // Attach the user to the request based on role
      if (decoded && (decoded as UserPayload).role === "student") {
        req.student = decoded as UserPayload;
      } else if (decoded && (decoded as UserPayload).role === "tutor") {
        req.tutor = decoded as UserPayload;
      }else if (decoded && (decoded as UserPayload).role === "guardian") {
        req.guardian = decoded as UserPayload;
      } else if (decoded && (decoded as UserPayload).role === "parent") {
        req.parent = decoded as UserPayload;
      }
      else if (decoded && (decoded as UserPayload).role === "superAdmin") {
        req.superAdmin = decoded as UserPayload;
      
      }else if (decoded && (decoded as UserPayload).role === "admin"){
        req.admin = decoded as UserPayload;
      }
      next();
    });
  } else {
    next(new HttpException(HttpStatus.FORBIDDEN, "No token found"));
  }

};


// Function to sign a JWT token with the student payload

export const signToken = (payload: UserPayload): string => {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN;

  if (!secret || !expiresIn) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT configuration is missing"
    );
  }

  return jwt.sign(payload, secret as jwt.Secret, {
    expiresIn: expiresIn as string | number,
  });
};





// Function to create a short-lived invalid token
export const setInvalidToken = (): string => {
  if (!process.env.JWT_SECRET) {
    throw new HttpException(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "JWT secret is missing"
    );
  }
  return jwt.sign({ logout: "logout" }, process.env.JWT_SECRET, {
    expiresIn: "1hr", // Short-lived token
  });
};


export const authorizeRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.student || req.tutor || req.admin || req.guardian;
    
    if (!user || !allowedRoles.includes(user.role)) {
      return next(new HttpException(HttpStatus.FORBIDDEN, "Access denied"));
    }

    next();
  };
};


