import './sectionHeader.css'
const SectionHeader = ({ text }) => {
    return (
        <div className='section-header'>
            <p className='b-10'>
                {text}
            </p>
        </div>)
}

export default SectionHeader