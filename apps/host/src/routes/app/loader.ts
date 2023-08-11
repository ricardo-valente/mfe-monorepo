import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { AppName } from "./types";

const delay = <T>(data: T) => new Promise((resolve) => setTimeout(() => resolve(data), 1000));

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

export default async function loader({ params }: LoaderFunctionArgs) {
    return params.name && params.name in apps && delay(apps[params.name as keyof typeof apps])
}