import React from 'react'
import './Market.css'

export default function Market() {
    const marketlisting = [
        {
            img: "https://media.ed.edmunds-media.com/saturn/ion/2003/oem/2003_saturn_ion_coupe_2_fq_oem_1_500.jpg",
            description: "2005 Saturn ION",
            price: "$3500",
            location: "Anaheim, CA"
        },
        {
            img: "https://s.yimg.com/uu/api/res/1.2/hX7zfE.noop2A2HPJ4gYlw--~B/aD0xMjAwO3c9MTgwMDthcHBpZD15dGFjaHlvbg--/https://s.yimg.com/os/creatr-uploaded-images/2020-11/1fa5a901-1fee-11eb-b6fd-ecc1bfdbf55f.cf.webp",
            description: "Brand new ps5",
            price: "$500",
            location: "Los Angeles, CA"
        }
    ]
    return (
        <div>
            Hi from market
            {
                marketlisting.map(({img, description, price, location})=>(
                    <div className="itemlisting">
                    <img className="itemimage" src={img} alt={description}/>
                    <h2>{price}</h2>
                    <p className="iteminfo">{description}  <br></br> 
                    <div className="itemaddress">{location}</div>
                    </p>
                    </div>
    ))
            }
        </div>
    )
}
