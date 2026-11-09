export type certs = {
    image: string;
    title: string;
    issuer: string;
    dateAwarded: string; 
}

export const certsData : certs[] = [
    {
        image: "/certs-images/cert-responsive-web-design.png",
        title: "Responsive Web Design",
        issuer: "FreeCodeCamp",
        dateAwarded: "Feb 2026"
    },
    {
        image: "/certs-images/cert-java-fundamentals.png",
        title: "Java Fundamentals",
        issuer: "Oracle",
        dateAwarded: "June 2024"
    },
];