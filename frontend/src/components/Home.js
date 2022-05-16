import React, { Fragment, useState, useEffect } from 'react';
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import  Pagination from 'react-js-pagination';
import {useDispatch, useSelector} from 'react-redux';
import { useAlert } from 'react-alert';
import {allVendors} from"../actions/vendorActions";
import { getProducts } from '../actions/productActions';


import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);  //tool tip is an additional information to slider


const Home = ({match}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);
  const [category, setCategory] = useState('');
  const categories = [
    "Electronics",
    "Laptops",
    "Mobiles",
    "Computers",
    "Accessories",
    "MotherBoards",
    "Processors",
    "GraphicCards",
    "Ram",
    "HardDisks",
    "SSD",
    "KeyBoards",
    "Mouse",
    "Headphones",
    "Cpu",
    "PowerSupply",
    "Case",
    "Monitor",
  ]
  const alert = useAlert();
  const dispatch = useDispatch();
   
  const {loading, products, error, productsCount, resPerPage, filteredProductCount } = useSelector(state => state.products);

  const {vendors} = useSelector(state => state.allVendors);

  const keyword = match.params.keyword; //we are using param beacuse we are setting keywords in params in search component 
    
  useEffect(() => {
    if(error){
     

      alert.success('success');
     return alert.error(error);
     
     }

  dispatch(getProducts(keyword, currentPage, price, category));  

   

  },[dispatch, alert, error, keyword, currentPage, price, category]); //this is dependencies array


  function setCurrentPageNo(pageNumber){
    setCurrentPage(pageNumber);
   }

   let count = productsCount;
   if(keyword){
     count = filteredProductCount;
   }


  return (
    
    <Fragment>
      
  


      {loading ? <Loader /> : null}
      <MetaData title={'buy best product online'} />
      
      
       <h1 id="products_heading">Latest Products</h1>
       <section id="products" class="container mt-5">
      <div className="row">

      {keyword ? (           //if filter exist like keyword/mouse then we have to show the slider else 
                             //show the products
        <Fragment>

          
            <div className="col-6 col-md-3 mt-12 mb-12 ">
              <div className="px-5">
                <Range
                  marks={{
                    1: `Rs 1`,
                    100000: `Rs 100000`
                  }}

                  min ={1}
                  max={100000}
                  defaultValue={[1, 100000]}
                  tipFormatter={value => `Rs ${value}`}
                  tipProps={{
                    placement: 'top',
                    visible: true
                  }}

                  value={price}
                  onChange={price => setPrice(price)}

                
                
                />

              
                    <hr className="my-5" /> {/* this is a horizontal line for margin top and bottom */}

                    <div className="mt-5">
                        <h4 className="mb-3">
                            Categories
                        </h4>

                        <ul className="pl-0">
                            {categories.map(category => (
                                <li
                                    style={{
                                        cursor: 'pointer',
                                        listStyleType: 'none'
                                    }}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>
                    </div>

              </div>
              
              </div>  

              <div className="col-6 col-md-9">
              <div className="row">

             { products && products.map(product => (

              <Product product={product} key={product._id} col={4} />

                //using key because we are using map function 
   
                  ))}
                </div>

                </div>
                

        </Fragment>

      ): (
        products && products.map(product => (

          <Product product={product} key={product._id} col={3} />

          //using key because we are using map function 
             
        ))
        
      )}

        
     

        
       
      </div>
    </section> 

    {resPerPage < count && (
      <div className="d-flex justify-content-center mt-5">
      
      <Pagination
        activePage = {currentPage}
        itemsCountPerPage = {resPerPage}
        totalItemsCount = {productsCount}
        onChange = {setCurrentPageNo}
        nextPageText = 'Next'
        prevPageText = 'Prev'
        firstPageText = 'First'
        lastPageText = 'Last'
        itemClass = 'page-item' //bootstrap class we don't have to handle them in css
        linkClass = 'page-link' //bootstrap class we don't have to handle them in css

      
      />
      </div>
    )}
    
      
       
      
    </Fragment>
  )
}

export default Home
