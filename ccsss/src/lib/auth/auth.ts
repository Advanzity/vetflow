import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions, User } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import "./types";

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new VetFlowError(
              ErrorCode.INVALID_CREDENTIALS,
              "Invalid email or password"
            );
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              subscription: true,
              userRoles: true
            }
          });

          if (!user) {
            throw new VetFlowError(
              ErrorCode.USER_NOT_FOUND,
              "No user found with this email"
            );
          }

          if (!user.password) {
            throw new VetFlowError(
              ErrorCode.INVALID_CREDENTIALS,
              "Please login using the method you used to create your account"
            );
          }

          const isPasswordValid = await compare(credentials.password, user.password);

          if (!isPasswordValid) {
            throw new VetFlowError(
              ErrorCode.INVALID_CREDENTIALS,
              "Invalid password"
            );
          }

          if (!user.emailVerified) {
            throw new VetFlowError(
              ErrorCode.EMAIL_NOT_VERIFIED,
              "Please verify your email before logging in"
            );
          }

          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            emailVerified: user.emailVerified,
            subscription: user.subscription,
            userRoles: user.userRoles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };
        } catch (error) {
          if (error instanceof VetFlowError) {
            throw error;
          }
          throw new VetFlowError(
            ErrorCode.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred"
          );
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Cache user roles
        const userWithRoles = await prisma.user.findUnique({
          where: { id: user.id },
          include: {
            userRoles: {
              include: {
                role: {
                  include: {
                    permissions: true
                  }
                }
              }
            }
          }
        });
        
        if (userWithRoles) {
          token.roles = userWithRoles.userRoles.map(ur => ({
            id: ur.role.id,
            name: ur.role.name,
            permissions: ur.role.permissions.map(p => ({
              resource: p.resource,
              action: p.action,
              conditions: p.conditions
            }))
          }));
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.roles = token.roles;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === "development",
} satisfies NextAuthOptions;

export function auth(...args:
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse]
  | []
) {
  return getServerSession(...args, config);
}
