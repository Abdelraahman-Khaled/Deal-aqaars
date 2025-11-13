import ContainerMedia from '../../Components/ContainerMedia/ContainerMedia'
import HelmetInfo from '../../Components/Helmetinfo/HelmetInfo'
import Places from '../../Components/Ui/Places/Places'
import AqarDetails from '../Aqar/Components/AqarDetails'
import GuideAdminstrative from './GuideAdminstrative'

const Adminstrative = () => {
    return (
        <>
            <HelmetInfo titlePage={"اداري"} />
            <div className="py-4">

                <ContainerMedia >

                    <AqarDetails />
                    <Places />
                    <GuideAdminstrative title={"اداري للبيع في مصر"} compound={false} />

                </ContainerMedia>

            </div>
        </>)
}


export default Adminstrative