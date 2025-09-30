import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-center">
        <p className="flex justify-center items-center font-bold w-14 h-14 rounded-full bg-gray-400 text-gray-900">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-900 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button className="h-10">
            <Link
              to="/"
              className="rounded-md px-2 text-sm font-semibold text-white shadow-xs"
            >
              Go back home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
