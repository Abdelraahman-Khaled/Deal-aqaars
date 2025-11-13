import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import Places from '../../Components/Ui/Places/Places'
import AqarDetails from '../Aqar/Components/AqarDetails'
import GuideBuilding from './GuideBuilding'

const Building = () => {
    return (
        <>
            <HelmetInfo titlePage={"مباني"} />
            <div className="py-4">

                <ContainerMedia >

                    <AqarDetails />
                    <Places />
                    <GuideBuilding title={"مباني للبيع في مصر"} compound={false} />

                </ContainerMedia>

            </div>
        </>)
}


export default Building