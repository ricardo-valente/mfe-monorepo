const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

export const apps = [
    { name: "about", title: "About", content: "This is the content of About." },
    { name: "solutions", title: "Solutions", content: "This is the content of Solutions." },
    { name: "app-3", title: "App 3", content: "This is the content of App 3." },
]

// export default async function getApps() {
//     await delay();

//     return apps;
// }