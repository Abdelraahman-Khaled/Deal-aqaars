
import { Helmet } from "react-helmet-async";

const HelmetInfo = ({ titlePage }) => {
    return (
        <Helmet>
            <title>{titlePage}</title>
            <link rel="shortcut icon" type="image/png" href="/icon/ico.svg" />

            {/* description */}
            <meta
                name="description"
                content="deal Discription Content info deal  Discription Content info deal Discription Content info"
            />

            {/* keywords */}
            <meta
                name="keywords"
                content="deal  KeyWords deal  KeyWords deal  KeyWords"
            />
            {/*  <!-- #author --> */}
            <meta name="author" content="deal Website" />
            {/* <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="deal Link Url" />
            <meta property="og:type" content="deal website" />
            <meta property="og:title" content="deal Services" />
            <meta
                property="og:description"
                content="deal A concise description of your page content"
            />
            <meta property="og:image" content="deal Image" />

            {/* Twitter Meta Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="deal Domain Link Url" />
            <meta property="twitter:url" content="deal Url" />
            <meta name="twitter:title" content="deal" />
            <meta
                name="twitter:description"
                content="deal description of your page content"
            />
            <meta name="twitter:image" content="deal  Image" />

            {/* LINK URL WEBSITE deal */}
            <link rel="canonical" href="https://www.example.com/your-page" />
        </Helmet>
    );
};

export default HelmetInfo;
