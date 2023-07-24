export const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://placement-portal-anurag2293.vercel.app";

    return base_url;
};