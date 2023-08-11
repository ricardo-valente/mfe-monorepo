import { ActionFunctionArgs } from "react-router-dom";

const delay = <T>(data: T) => new Promise<T>((resolve) => setTimeout(() => resolve(data), 1000));

const users = {
    'richardo@cenas.com': {
        id: 123,
        name: 'Richardo',
        username: 'richardo',
        email: 'richardo@cenas.com',
        password: '123@321',
        apps: [
            {
                name: 'app-one',
                title: 'App one',
                description: 'This is app one.',
                permissions: ['*']
            },
            {
                name: 'app-two',
                title: 'App Two',
                description: 'This is app two.',
                permissions: ['read']
            },
        ]
    },
    'jarvas@cenas.com': {
        id: 123,
        name: 'Jarvas',
        username: 'jarvas',
        email: 'jarvas@cenas.com',
        password: '123@321',
        apps: [
            {
                name: 'app-one',
                title: 'App one',
                description: 'This is app one.',
                permissions: ['read']
            },
            {
                name: 'app-two',
                title: 'App Two',
                description: 'This is app two.',
                permissions: ['*']
            },
            {
                name: 'app-three',
                title: 'App Three',
                description: 'This is app three.',
                permissions: ['read']
            },
        ]
    }
} as const

const appsVersions = {
    'richardo': {
        'app-one': '1.0.0',
        'app-two': 'latest',
    },
    'jarvas': {
        'app-one': '1.0.1',
        'app-two': '1.0.0',
        'app-three': 'latest',
    }
}

export default async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const userEmail = formData.get('email')

    const getUser = userEmail && `${userEmail}` in users && users[userEmail as keyof typeof users]

    if (getUser) {
        const userData = await delay<typeof getUser>(getUser)
        const versionsData = await delay<typeof appsVersions>(appsVersions)

        const userApps = userData.apps.map(app => ({
            ...app,
            version: versionsData[userData.username][app.name]
        }))

        return {
            ...userData,
            apps: userApps
        }
    }

    return delay({
        code: 404
    })
}