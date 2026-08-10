import { NavLink, Outlet } from "react-router-dom";
import './Layout.css'
import { toggleTheme } from "../features/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export function Layout() {
    const dispatch = useAppDispatch();

    const theme = useAppSelector((state)=> state.theme.mode);
    return(
        <div className={`app-layout  ${theme}`}>
            <nav className="navbar">
                <div className="navbar-brand">
                    API Fetcher
                </div>
                <div className="navbar-links">
                    <NavLink
                    to='/'
                    className={({isActive})=> 
                    isActive
                    ? "nav-link active"
                : "nav-link"
                }>
                    Home
                    </NavLink>
                     <NavLink
                        to="/news"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        News
                    </NavLink>
                    <button
                    type="button"
                    className="theme-toggle"
                    onClick={()=> 
                        dispatch(toggleTheme())
                    }>
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>
                </div>
            </nav>
            <main
            className="page-content">
                <Outlet />
            </main>
        </div>
    )
}