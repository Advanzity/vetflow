import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface Permission {
  resource: string;
  action: string;
  conditions?: any;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface UserRole {
  id: string;
  role: Role;
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      roles?: UserRole[];
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    roles?: UserRole[];
  }
}
