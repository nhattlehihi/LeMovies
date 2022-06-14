import React from 'react'
import './page-header.scss'
import bg from '../../assets/photo/footer-bg.jpeg';

const PageHeader = props => {
    return (
        <div className="page-header" style={{backgroundImage: `url(${bg})`}}>
            <h1>{props.children}</h1>
        </div>
    )
}

export default PageHeader