import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  
  // read query params
  const type = query.get("unauthorized")
    ? "unauthorized"
    : query.get("notfound")
    ? "notfound"
    : "default";

  // default values
  let statusCode = 500;
  let title = "Something went wrong";
  let message = "Sorry, an unexpected error has occurred.";
  let redirectTo = "/";
  let redirectText = "Go back home";

  // overwrite based on query
  if (type === "unauthorized") {
    statusCode = 401;
    title = "Unauthorized";
    message = "You don’t have permission to view this page.";
    redirectTo = "/login";
    redirectText = "Login";
  } else if (type === "notfound") {
    statusCode = 404;
    title = "Page not found";
    message = "Sorry, we couldn’t find the page you’re looking for.";
  }

  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <p className="flex justify-center items-center font-bold w-14 h-14 rounded-full bg-gray-400 text-gray-900">
          {statusCode}
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900 dark:text-red-600 sm:text-7xl">
          {title}
        </h1>
        <p className="mt-6 text-lg font-medium text-gray-600 sm:text-xl">
          {message}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button  className="h-10">
            <Link
              to={redirectTo}
              className="rounded-md px-2 text-sm font-semibold text-white dark:text-black shadow-xs"
            >
              {redirectText}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
