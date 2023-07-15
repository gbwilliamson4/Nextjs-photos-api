import { UnsplashImage } from "@/models/unsplash-images";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

export const metadata = {
    title: "Dynamic Fetching"
}

// This revalidate variable makes it grab a new image every time. Thats the only difference between this and the static one.
// export const revalidate = 0;

// or, if you put cache: "no-cache" like I did below, it has the same effect but it will only be applicable to that fetch, not the whole page
// or, next: { revalidate: 0}

export default async function Page() {
    const response = await fetch("https://api.unsplash.com/photos/random?client_id=" + process.env.UNSPLASH_ACCESS_KEY, {
        cache: "no-cache"
        // next: {revalidate: 0}
    });
    const image: UnsplashImage = await response.json();

    const width = Math.min(500, image.width);
    const height = (width / image.width) * image.height;

    return(
        <div className="d-flex flex-column align-items-center">
            <Alert>
                This page fetches data dynamically. Every time you refresh the page, you get a new image from the Unsplash API.
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