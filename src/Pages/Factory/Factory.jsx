import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import Places from '../../Components/Ui/Places/Places'
import AqarDetails from '../Aqar/Components/AqarDetails'
import GuideFactory from './GuideFactory'

const Factory = () => {
    return (
        <>
            <HelmetInfo titlePage={"مصانع"} />
            <div className="py-4">

                <ContainerMedia >

                    <AqarDetails />
                    <Places />
                    <GuideFactory title={"مصانع للبيع في مصر"} compound={false} />

                </ContainerMedia>

            </div>
        </>)
}


export default Factory