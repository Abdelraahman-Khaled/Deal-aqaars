import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import MenuArrow from '../../assets/Icons/MenuArrow'
import OrganizeIcon from '../../assets/Icons/OrganizeIcon'

const DropDown = ({ title, details, rotate, setRotate }) => {
    const [detail, setDetails] = useState(title);

    return (
        <Dropdown className="nav-drop-down custom-dropdown" onClick={() => setRotate(!rotate)}  >
            <Dropdown.Toggle className="nav-link b-11" >
                <div className='d-flex align-items-center gap-4'>
                    <div className='d-flex space-1 align-items-center'>
                        <OrganizeIcon />
                        {detail}
                    </div>
                    <MenuArrow rotate={rotate} />
                </div>
            </Dropdown.Toggle>
            <Dropdown.Menu >
                {details.map((item, index) => (
                    <Dropdown.Item className="finishing" onClick={() => setDetails(item)}>
                        <p key={index} className=" b-11" style={{ color: " var(--netural-1000)" }}>
                            {item}
                        </p>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DropDown