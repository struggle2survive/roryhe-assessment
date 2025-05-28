import { RefObject, useEffect } from "react";

const useIntersection = (fn: (isIntersected: boolean) => void, ref: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        let intersectionObserver: IntersectionObserver | undefined = new IntersectionObserver((entries) => {
            fn(entries[0]?.isIntersecting)
        })
        ref.current && intersectionObserver.observe(ref.current)

        return () => {
            ref.current && intersectionObserver?.unobserve(ref.current)
        }
    }, [])
}

export default useIntersection