

export default function useMediaQuery(query:string): boolean {
    if (typeof window !== "undefined"){
        return window.matchMedia(query).matches
    }
    return false

}