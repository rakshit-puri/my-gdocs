import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";

export const getCachedSession = cache(async () => {
  const { sessionClaims, getToken } = await auth();
  const token = await getToken({ template: "convex" });
  return { sessionClaims, token };
});

export const getCachedUser = cache(async () => {
  return await currentUser();
});