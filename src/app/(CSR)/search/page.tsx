"use client"

import SearchPage from "./SearchPage"


export const metaata = {
    title: "Search Page"
}


export default function Page() {
    return <><SearchPage /></> // SearchPage is a client component. In this case, all the functionality happens in that component and we import it here for rendering.
}