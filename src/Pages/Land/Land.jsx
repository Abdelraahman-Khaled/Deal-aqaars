import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import Places from '../../Components/Ui/Places/Places'
import AqarDetails from '../Aqar/Components/AqarDetails'
import GuideLand from './GuideLand'

const Land = () => {
    return (
        <>
            <HelmetInfo titlePage={"اراضي"} />
            <div className="py-4">

                <ContainerMedia >

                    <AqarDetails />
                    <Places />
                    <GuideLand title={"اراضي للبيع في مصر"} compound={false} />

                </ContainerMedia>

            </div>
        </>)
}


export default Land