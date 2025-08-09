import React, { useEffect, useState } from 'react'
import { } from '@/app/types'

import { FaCartShopping, FaHeart } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5"
import ReactCountryFlag from "react-country-flag";
import axios from 'axios';
import { Category, SubCategory } from '@/app/types';
const Header = () => {
    const [categoryData, setCategoryData] = useState<Category[]>([])
    const [SubcategoryData, setSubCategoryData] = useState<SubCategory[]>([])
    const [subCategoriesToShow, setSubCategoriesToShow] = useState<string>('')
    useEffect(() => {

        const FetchCategoryData = async () => {
            let Category = await axios.get('http://localhost:8000/api/v1/categories')
            setCategoryData(Category.data.data)
        }
        FetchCategoryData()

    }, [])

    useEffect(() => {

        const FetchSubCategoryData = async () => {
            let SubCategory = await axios.get(`http://localhost:8000/api/v1/categories/${subCategoriesToShow}/subcategories`)
            setSubCategoryData(SubCategory.data.data)
        }
        FetchSubCategoryData()
    }, [subCategoriesToShow])
    return (
        <div style={{width:"100%"}}>
            <div className='Topheader'
                style={{ backgroundColor: "yellowgreen", display: "flex", justifyContent: "space-between" }}>

                <img src="/globe.svg" alt="Logo" width={40} height={40} />
                <div style={{ display: "flex" }}>
                    <ReactCountryFlag countryCode="US" style={{ margin: "20px 5px" }} svg />
                    <div>
                        <p>deilver to </p>
                        <button style={{ color: "GrayText" }}>NewYork</button>
                    </div>
                </div>
                <input type="search" name="search" id="search" placeholder='what are you looking for?' />
                <button>English</button>
                <div
                    style={{ backgroundColor: "yellow", display: "flex", justifyContent: "space-between", padding: "15px 5px" }}>
                    <IoPersonCircleOutline />
                    <p>signUp</p>
                </div>
                <FaHeart style={{ margin: "20px 5px" }} />
                <FaCartShopping style={{ margin: "20px 5px" }} />

            </div>


            <div className='BottomHeader' style={{ backgroundColor: "green" }} onMouseLeave={() => setSubCategoriesToShow('')}>

                <div className='CategoriesTitle' style={{ display: "flex", justifyContent: 'space-between' }}>
                    {
                        categoryData.map((category, i) =>

                            <button key={i} onMouseEnter={() => {
                                setSubCategoriesToShow(category._id)
                            }
                            } > {category.name}</button>

                        )
                    }
                </div>

                <div>
                    {subCategoriesToShow &&
                        <div style={{display:'flex' , justifyContent:"space-between"}}>
                            <ul style={{ display: "flex", backgroundColor:"red",justifyContent: "space-between" }}>
                                {
                                    SubcategoryData.map((SubCategory, i) => (
                                        <li key={i}>
                                            {SubCategory.name}
                                            <ul>
                                                {categoryData.map((category, i) => (
                                                    <li key={i}>
                                                        {category.name}
                                                    </li>
                                                ))}
                                            </ul>

                                        </li>))
                                }
                            </ul>

                            <img src={categoryData.find(cat => cat._id === subCategoriesToShow)?.image} alt=""
                            style={{width:"5rem",height:"5rem"}}/>
                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Header