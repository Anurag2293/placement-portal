import { authMiddleware } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
    publicRoutes: ["/", "/developer", "/developer/apply", "/products", "/solutions", "/resources", "/pricing"],
    ignoredRoutes: ["/hire(/.*)?", "/api/company(/.*)?", "/api/process(/.*)?", "/api/auth(/.*)?", "/api/developer(/.*)?",  
    "/access-account"],
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/developer" ],
};
