interface PaginationInterface {
    currentPage: number;
    totalPage: number;
    pagination: any;
}

const Pagination: React.FC<PaginationInterface> = (props) => {
    const { currentPage, totalPage, pagination } = props;
    const pageList = [];

    if (currentPage === 1) {
        pageList.push(currentPage);
        if (totalPage >= currentPage + 1) {
            pageList.push(currentPage + 1);
        }
        if (totalPage >= currentPage + 2) {
            pageList.push(currentPage + 2);
        }
    }
    else if (currentPage > 1) {
        if (currentPage >= 3) {
            pageList.push(currentPage - 2);
        }
        if (currentPage >= 2) {
            pageList.push(currentPage - 1);
        }
        pageList.push(currentPage);
        if (totalPage >= currentPage + 1) {
            pageList.push(currentPage + 1);
        }
        if (totalPage >= currentPage + 2) {
            pageList.push(currentPage + 2);
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className={"page-item " + (currentPage===1?"disabled":"")} onClick={() => pagination(1)}>
                    <button className="page-link">Trang chủ</button>
                </li>

                {pageList.map((page) => (
                    <li className="page-item" key={page} onClick={() => pagination(page)}>
                        <button className={"page-link " + (currentPage===page?"active":"")}>
                            {page}
                        </button>
                    </li>
                ))}

                <li className={"page-item " + (currentPage===totalPage?"disabled":"")} onClick={() => pagination(totalPage)}>
                    <button className="page-link">Trang cuối</button>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;