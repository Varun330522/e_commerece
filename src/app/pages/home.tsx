import React, { useState, useEffect } from 'react';
import { api } from '~/trpc/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const queryClient = new QueryClient();

export function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const itemsPerPage = 6;
  const maxPageNumbersToShow = 5;

  const token = Cookies.get('jwt_token');
  const decodedToken = jwtDecode<{ user_id: string }>(token ?? '');
  const userId = decodedToken?.user_id;

  const { data, isLoading, error } = api.renderCategories.getAll.useQuery({
    page: currentPage,
    pageSize: itemsPerPage,
  });

  const { data: userCategories } = api.renderCategories.getUserCategories.useQuery({ userId }, { enabled: !!userId });

  const selectCategoryMutation = api.renderCategories.selectCategory.useMutation();

  useEffect(() => {
    if (userCategories) {
      setSelectedCategories(userCategories);
    }
  }, [userCategories]);

  const handleCheckboxChange = async (categoryId: number) => {
    await selectCategoryMutation.mutateAsync({ userId, categoryId });
    setSelectedCategories((prevState) => {
      if (prevState.includes(categoryId)) {
        return prevState.filter((id) => id !== categoryId);
      } else {
        return [...prevState, categoryId];
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching categories</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { categories, totalCategories } = data;
  const totalPages = Math.ceil(totalCategories / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button key={1} onClick={() => handlePageClick(1)} className={`px-2 ${currentPage === 1 ? 'font-bold' : ''}`}>
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageClick(i)} className={`px-2 ${currentPage === i ? 'font-bold' : ''}`}>
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button key={totalPages} onClick={() => handlePageClick(totalPages)} className={`px-2 ${currentPage === totalPages ? 'font-bold' : ''}`}>
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center overflow-hidden">
        <div className="mt-3 w-[500px] h-[500px] border-[#c1c1c1] rounded-lg border-[1px] p-4">
          <h2 className="mt-6 text-2xl font-semibold text-center">Please mark your interests!</h2>
          <h3 className="mt-6 text-xl font-medium text-center">We will keep you notified.</h3>
          <p className="text mt-6 font-semibold">My saved interests!</p>
          <ul>
            {categories.map((category) => (
              <li key={category.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCheckboxChange(category.id)}
                  className="mr-2"
                />
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4 space-x-2">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              &lt;
            </button>
            {renderPageNumbers()}
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}
