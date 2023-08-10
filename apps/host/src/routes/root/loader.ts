const delay = <T>(data: T[]) => new Promise((resolve) => setTimeout(() => resolve(data), 1000));

export const apps = [
    { name: "app-one", title: "App One", content: "This is the content of App One." },
    { name: "app-two", title: "App Two", content: "This is the content of App Two." },
    { name: "app-three", title: "App Three", content: "This is the content of App Three." },
]

export default async function loader() {
    return delay(apps)
}
