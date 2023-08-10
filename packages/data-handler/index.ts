export default function delay<T = unknown>(data: T[]) {
    return new Promise((resolve) => setTimeout(() => resolve(data), 1000));
}