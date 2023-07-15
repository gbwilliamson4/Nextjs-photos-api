import { UnsplashImage } from "@/models/unsplash-images";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Incremental Static Regeneration"
}

// This revalidate variable makes it grab a new image after 15 seconds. Thats the only difference between this and the dynamic one.
// export const revalidate = 15;

// also notice the next: { revalidate: 15 } in the fetch function


export default async function Page() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY, {
        next: {revalidate: 15}
    });
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page fetches data dynamically with a timer. Every 15 seconds if you refresh, a new image will be fetched from the Unsplash API.
            </Alert>


            <Image
                src={image.urls.raw}
                width={width}
                height={height}
                alt={image.description}
                className="rounded shadow mw-100 h-100"
            />
            by <Link href={"/users/" + image.user.username}>{image.user.username}</Link>
        </div>
    )
}