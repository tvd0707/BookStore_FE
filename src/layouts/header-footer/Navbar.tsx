import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CategoryModel from '../../models/CategoryModel';
import { getAllCategory } from '../../api/CategoryApi';
import { Search } from 'react-bootstrap-icons';

interface NavbarProps {
  keyword: string;
  setKeyword: (keyword: string) => void;

}
function Navbar({ keyword, setKeyword }: NavbarProps) {
  const [tmpText, setTmpText] = useState('');
  const [categories, setcategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    getAllCategory().then(
      data => {
        setcategories(data);
      }
    ).catch(
      error => {
        console.log(error);
      }
    )
  }, []);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTmpText(e.target.value);
  }

  const handleSearch = () => {
    setKeyword(tmpText);
  }

  const onEnterDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeyword(tmpText);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="_">Bookstore</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="_navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Trang chủ</NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle" to="_" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Thể loại sách
              </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                {categories.map(category => (
                  <li key={category.categoryId}><NavLink className="dropdown-item" to={`/${category.categoryId}`} >{category.categoryName}</NavLink></li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="_" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Quy định bán hàng
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li><a className="dropdown-item" href="_">Quy định 1</a></li>
                <li><a className="dropdown-item" href="_">Quy định 2</a></li>
                <li><a className="dropdown-item" href="_">Quy định 3</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="_">Liên hệ</a>
            </li>
          </ul>
        </div>

        {/* Tìm kiếm */}
        <div className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={tmpText} onKeyDown={onEnterDown} />
          <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
            <Search />
          </button>
        </div>

        {/* Biểu tượng giỏ hàng */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="_">
              <i className="fas fa-shopping-cart"></i>
            </a>
          </li>
        </ul>

        {/* Biểu tượng đăng nhập */}
        <ul className="navbar-nav me-1">
          <li className="nav-item">
            <a className="nav-link" href="_">
              <i className="fas fa-user"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;