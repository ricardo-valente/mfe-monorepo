import { LoaderFunction } from "react-router-dom";
import { AppName } from "./types";

const delay = <T>(data: T) => new Promise((resolve) => setTimeout(() => resolve(data), 1000));

// console.log(process.env)

export const apps =
{
    "app-one": {
        name: 'app-one',
        scope: 'appOne',
        url: `${APP_ONE_DOMAIN_URL}/appOneRemoteEntry.js?version=1.0.0`,
        version: '1.0.0',
    },
    "app-two": {
        name: 'appTwo',
        scope: 'appTwo',
        url: `${APP_TWO_DOMAIN_URL}/appTwoRemoteEntry.js?version=latest`,
        version: 'latest',
    },
    "app-three": {
        name: 'appThree',
        scope: 'appTwo',
        url: `${APP_THREE_DOMAIN_URL}/appTwoRemoteEntry.js?version=1.0.2`,
        version: '1.0.2',
    },
}

interface AppLoaderProps {
    params: {
        name: AppName
    }
}

export default async function loader({ params }: AppLoaderProps) {
    return delay(apps[params.name])
}