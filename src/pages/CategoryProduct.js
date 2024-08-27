import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helper.js/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll('category');

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    // Format URL change when checkbox state changes
    const urlFormat = arrayOfCategory
      .map((el) => `category=${el}`)
      .join('&');

    navigate(`/product-category?${urlFormat}`);
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === 'dsc') {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className='container mx-auto p-4'>
      {/* Desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr] gap-4'>
        {/* Left side */}
        <div className='bg-white p-4 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/* Sort by */}
          <div className='mb-4'>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Sort by
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value={'asc'}
                />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value={'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Category
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='checkbox'
                    name={'category'}
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right side (Product) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>
            Search Results: {data.length}
          </p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile version */}
      <div className='lg:hidden'>
        {/* Mobile left side */}
        <div className='bg-white p-4 mb-4'>
          {/* Sort by */}
          <div className='mb-4'>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Sort by
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value={'asc'}
                />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3'>
                <input
                  type='radio'
                  name='sortBy'
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value={'dsc'}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by */}
          <div className='mt-4'>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>
              Category
            </h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {productCategory.map((categoryName, index) => (
                <div className='flex items-center gap-3' key={index}>
                  <input
                    type='checkbox'
                    name={'category'}
                    checked={selectCategory[categoryName?.value]}
                    value={categoryName?.value}
                    id={categoryName?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={categoryName?.value}>
                    {categoryName?.label}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Mobile right side (Product) */}
        <div className='px-2'>
          <p className='font-medium text-slate-800 text-lg mb-2'>
            Search Results: {data.length}
          </p>
          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
