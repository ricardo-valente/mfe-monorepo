import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: string };

type Factory = () => any;

interface Container {
  init(shareScope: string): void;

  get(module: string): Factory;
}

type Scope = "about" | "solutions";

interface ModuleLoaderProps {
  url: string;
  scope: Scope;
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

function loadComponent(scope: Scope, module: string) {
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
    // return <h2>Loading dynamic script: {props.url}</h2>;
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {props.url}</h2>;
  }

  const Component = React.lazy(loadComponent(props.scope, props.module));

  return (
    // <React.Suspense fallback="Loading Module">
    <Component />
    // </React.Suspense>
  );
}

const paths = {
  about: "3001",
  solutions: "3002",
};

export default function App() {
  const { name } = useParams() as { name: Scope };

  return (
    <ModuleLoader
      url={`http://localhost:${paths[name]}/${name}RemoteEntry.js`}
      scope={name}
      module={"./App"}
    />
  );
}
