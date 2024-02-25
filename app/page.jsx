import { Suspense } from "react";
import Login from "./auth/login/page";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <div>
          <Login />
        </div>
      </Suspense>
    </main>
  );
}
