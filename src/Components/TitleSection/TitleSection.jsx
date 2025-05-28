import "./TitleSection.css";

const TitleSection = ({ title, text }) => {
    return (
        <div className="title-section" data-aos="fade-up">
            <h2 className="title">{title}</h2>
            <p className="text">{text}</p>
        </div>
    );
};

export default TitleSection;
