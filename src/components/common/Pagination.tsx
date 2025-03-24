import React from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const createPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage =
      currentPage < 5
        ? Math.min(currentPage + 6, totalPages)
        : Math.min(currentPage + 2, totalPages);

    // 첫 번째 페이지 표시
    pages.push(1);

    if (startPage > 2) pages.push("..."); // 첫 번째 생략

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (endPage < totalPages - 1) pages.push("..."); // 마지막 생략

    // 마지막 페이지 표시
    if (totalPages !== 1) pages.push(totalPages);

    return pages;
  };

  return (
    <PaginationWrapper>
      <PaginationButtonWrapper>
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <img
            src="/assets/icons/arrow_double_left.svg"
            width={32}
            height={36}
          />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src="/assets/icons/arrow_left.svg" width={32} height={36} />
        </PaginationButton>
      </PaginationButtonWrapper>

      {createPageNumbers().map((page, index) => (
        <PageNumber
          key={index}
          isCurrent={page === currentPage}
          onClick={() => {
            if (page !== "...") handlePageChange(Number(page));
          }}
        >
          {page}
        </PageNumber>
      ))}
      <PaginationButtonWrapper>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src="/assets/icons/arrow_right.svg" width={32} height={36} />
        </PaginationButton>
        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <img
            src="/assets/icons/arrow_double_right.svg"
            width={32}
            height={36}
          />
        </PaginationButton>
      </PaginationButtonWrapper>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  gap: 6px;
`;

const PaginationButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PaginationButton = styled.button`
  border-radius: 4px;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const PageNumber = styled.button<{ isCurrent: boolean }>`
  background-color: ${(props) =>
    props.isCurrent ? theme.colors.white : "transparent"};
  color: ${theme.colors.gray700};
  ${theme.fonts.medium14};
  border-radius: 4px;
  padding: 6px 12px;
`;
