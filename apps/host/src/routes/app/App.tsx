import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useLoaderData, useNavigation, useParams } from "react-router-dom";
import { AppName } from "./types";
import Spinner from "@/components/Spinner";
import { useUser } from "host/context";

// import AppOne from "appOne/App";

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

type Factory = () => any;

interface Container {
  init(shareScope: string): void;

  get(module: string): Factory;
}

interface ModuleLoaderProps {
  url: string;
  scope: AppName;
  module: string;
}

const useDynamicScript = (args: Pick<ModuleLoaderProps, "url">) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = args.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

function loadComponent(scope: AppName, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container: Container = (window as any)[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(module);
    const Module = factory();
    return Module;
  };
}

function ModuleLoader(props: ModuleLoaderProps) {
  const { ready, failed } = useDynamicScript({
    url: props.module && props.url,
  });

  if (!props.module) {
    return <h2>Not system specified</h2>;
  }

  if (!ready) {
    return <Spinner />;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(loadComponent(props.scope, props.module));

  return (
    // <React.Suspense fallback={<Spinner />}>
    <Component />
    // </React.Suspense>
  );
}

export default function App() {
  const [user] = useUser();

  console.log("App user: ", user);

  const app = useLoaderData() as Record<string, any>;

  return <ModuleLoader url={app.url} scope={app.scope} module={"./App"} />;
}
