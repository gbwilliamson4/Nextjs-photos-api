import { UnsplashImage } from "@/models/unsplash-images"
import Image from "next/image";
import styles from "./TopicPage.module.css"
import { Alert } from "@/components/bootstrap"
import { Metadata } from "next";

// how you disable things being cached for subsequent requests:
// export const revalidate = 0


// How to disable users going to any that are not pre defined:
// export const dynamicParams = false

interface PageProps {
    params: { topic: string }, // this one needs to match the page name in the brackets. In this case its [topic]
    // searchParams: { [key: string]: string | string[] | undefined }, // this would be things used after a question mark in the url. Usually used for a query or filter.

}

export function generateMetadata({ params: {topic} }: PageProps): Metadata {
    return {
        title: topic + " - Image gallery"
    }
}

export function generateStaticParams() {
    return ["health", "fitness", "coding"].map(topic => ({ topic }))
}

export default async function Page({params: { topic } }: PageProps) {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`)
    const images: UnsplashImage[] = await response.json();


    return(
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic paramater. 
                Pages that are not included in generateStaticparams will be fetched & rendered on first access and then <strong>cached for subsequent requests</strong> (this can be disabled)
            </Alert>
            <h1>{topic}</h1>
            {
                images.map(image => (
                    <Image
                        src={image.urls.raw}
                        width={250}
                        height={250}
                        alt={image.description}
                        key={image.urls.raw}
                        className={styles.image}
                    />
                ))
            }
        </div>
    )
}