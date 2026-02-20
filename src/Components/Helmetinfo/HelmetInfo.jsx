
import { Helmet } from "react-helmet-async";

const HelmetInfo = ({
    title,
    titlePage, // Backward compatibility
    description,
    keywords,
    image,
    url,
    type = "website"
}) => {
    const defaultTitle = "Deal | ديل - Real Estate";
    const defaultDescription = "Find your dream home with Deal (ديل). The best real estate platform in Egypt.";
    const defaultKeywords = "Deal, ديل, real estate, homes, apartments, rent, sale, egypt";
    const defaultImage = "/icon/ico.svg"; // Adjust path if needed, maybe a full URL is better for OG
    const defaultUrl = "https://www.dealaqar.com"; // Replace with actual domain

    const siteTitle = (title || titlePage) ? `${title || titlePage} | Deal` : defaultTitle;
    const siteDescription = description || defaultDescription;
    const siteKeywords = keywords || defaultKeywords;
    const siteImage = image || defaultImage;
    const siteUrl = url || defaultUrl;

    return (
        <Helmet>
            <title>{siteTitle}</title>
            <link rel="shortcut icon" type="image/png" href="/icon/ico.svg" />
            <link rel="canonical" href={siteUrl} />

            {/* Standard Metadata */}
            <meta name="description" content={siteDescription} />
            <meta name="keywords" content={siteKeywords} />
            <meta name="author" content="Deal Real Estate" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={siteDescription} />
            <meta name="twitter:image" content={siteImage} />
        </Helmet>
    );
};

export default HelmetInfo;
